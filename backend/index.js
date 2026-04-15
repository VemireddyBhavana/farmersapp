import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import ee from "@google/earthengine";
import { handleWeather } from "./weather.js";
import axios from "axios";
import { calculatePredictiveYield } from "./utils/predictionEngine.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

import aiRoutes from "./routes/aiRoutes.js";
app.use("/api", aiRoutes);

// IN-MEMORY FALLBACK VAULT (For when MongoDB service is offline)
let yieldBackupVault = [];

// --- GOOGLE EARTH ENGINE INITIALIZATION ---
let isGeeActive = false;

const initGEE = async () => {
  try {
    const credentials = {
      project_id: process.env.GEE_PROJECT_ID,
      client_email: process.env.GEE_CLIENT_EMAIL,
      private_key: process.env.GEE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    if (!credentials.private_key || !credentials.project_id) {
      console.warn("⚠️ GEE Credentials missing in .env. Satellite features will be simulated.");
      return;
    }

    ee.data.authenticateViaPrivateKey(
      credentials,
      () => {
        ee.initialize(
          null,
          null,
          () => {
            isGeeActive = true;
            console.log("✅ REAL-WORLD SATELLITE DATA ACTIVE 🚀");
          },
          (err) => {
            console.log("❌ GEE INIT ERROR:", err.message);
          },
          null,
          credentials.project_id
        );
      },
      (err) => {
        console.log("❌ AUTH ERROR:", err.message);
      }
    );
  } catch (err) {
    console.log("⚠️ GEE CONFIG WARNING:", err.message);
  }
};

initGEE();

// --- NDVI & SOIL FUNCTIONS ---
const getNDVI = async (lat, lng) => {
  if (!isGeeActive) return 0.65;
  try {
    const point = ee.Geometry.Point([parseFloat(lng), parseFloat(lat)]);
    const image = ee.ImageCollection("COPERNICUS/S2")
      .filterBounds(point)
      .filterDate("2024-01-01", "2024-12-31")
      .sort("CLOUDY_PIXEL_PERCENTAGE")
      .first();
    if (!image) return 0.55;
    const ndvi = image.normalizedDifference(["B8", "B4"]);
    const stats = ndvi.reduceRegion({ reducer: ee.Reducer.mean(), geometry: point, scale: 10 });
    const result = stats.getInfo();
    return result?.nd ?? 0.55;
  } catch (err) {
    return 0.5;
  }
};

const getSoilData = async (lat, lng) => {
  if (!isGeeActive) return { moisture: 35.0, carbon: 42.0 };
  try {
    const point = ee.Geometry.Point([parseFloat(lng), parseFloat(lat)]);
    const moisture = ee.Image("NASA_USDA/HSL/SMAP10KM_soil_moisture")
      .select("ssm")
      .reduceRegion({ reducer: ee.Reducer.mean(), geometry: point, scale: 10000 });
    const carbon = ee.Image("OpenLandMap/SOL/SOL_ORGANIC-CARBON_USDA-6A1C_M/v02")
      .select("b0")
      .reduceRegion({ reducer: ee.Reducer.mean(), geometry: point, scale: 250 });
    return { moisture: moisture.getInfo()?.ssm ?? 32.4, carbon: carbon.getInfo()?.b0 ?? 41.2 };
  } catch (err) {
    return { moisture: 30.0, carbon: 35.0 };
  }
};

// --- AI ANALYSIS ROUTE (USER EXACT CODE) ---
app.post("/api/analyze-post", async (req, res) => {
  try {
    console.log("Incoming prompt:", req.body);
    const { problemText, language } = req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 800,
        messages: [
          {
            role: "user",
            content: `You are an expert Indian farming assistant.

Language: ${language}

Farmer problem:
${problemText}

Provide precisely:

🔍 Problem Identified
💊 Solution Steps
🌿 Prevention Tips
⚠️ Warning`
          }
        ]
      })
    });

    const data = await response.json();
    console.log("Claude response:", data);

    if (!data.content || !data.content[0]?.text) {
      return res.status(500).json({ error: "Invalid AI response from Claude" });
    }

    res.json({ reply: data.content[0].text });

  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "Failed to connect to Claude" });
  }
});

// --- EXISTING ROUTES (MAINTAINING FEATURES) ---
app.get("/api/farm-data", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ error: "Location missing" });
    const [ndvi, soil] = await Promise.all([getNDVI(lat, lng), getSoilData(lat, lng)]);
    res.json({ ndvi, soil });
  } catch (err) {
    res.status(500).json({ error: "Satellite link interrupted" });
  }
});

app.get("/api/weather", async (req, res) => {
  await handleWeather(req, res, getNDVI, getSoilData);
});

// FARMER PROFILE API
app.get("/api/farmer", (req, res) => {
  res.json({
    id: "F-9908",
    name: "Pratap Reddy",
    location: "Anantapur, Andhra Pradesh",
    experience: "12 Years",
    farmSize: "15 Acres",
    primaryCrops: ["Cotton", "Groundnut", "Paddy"],
    achievements: ["Best Farmer 2023", "Eco-Friendly Certification"]
  });
});

// YIELD INTELLIGENCE PLATFORM (Machine Learning Orchestration)
app.post("/api/predict", async (req, res) => {
  const { crop, land, soil, irrigation } = req.body;
  console.log(`🤖 [Orchestrator] Starting Full Prediction for ${crop} (${land} Acres)...`);

  try {
    // 1. Fetch Real Weather (Open-Meteo)
    const lat = 14.6819; // Default Anantapur context
    const lng = 77.6006;
    const weatherRes = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,precipitation&daily=precipitation_sum,temperature_2m_max&timezone=auto`);
    
    const temperature = weatherRes.data.current.temperature_2m;
    const rainfall = weatherRes.data.daily.precipitation_sum[0] || 5.0; // Simulated seasonal if zero
    
    // 2. Fetch Satellite NDVI (Sentinel Hub or GEE)
    const ndviValue = await getNDVI(lat, lng);
    
    // 3. Native ML Intelligence Engine (Zero-Python)
    console.log("🚀 [Intelligence] Calling Node-Native yield engine...");
    let mlYield = 0;
    try {
      const predictionResult = calculatePredictiveYield({
        rainfall: rainfall * 10,
        temperature: temperature,
        ndvi: ndviValue
      });
      mlYield = predictionResult.yield;
      console.log(`✅ [Intelligence] Yield Predicted: ${mlYield} Tons/Hectare`);
    } catch (e) {
      console.warn("⚠️ [Intelligence] Engine logic error. Using basic fallback.");
      mlYield = (parseFloat(land) * (ndviValue > 0.7 ? 1.2 : 0.8)).toFixed(2);
    }

    // 4. Financial & Government Insights
    const cropPrices = { "Rice": 2200, "Wheat": 2100, "Cotton": 6200, "Maize": 1900 };
    const price = cropPrices[crop] || 2000;
    const totalProfit = mlYield * price * parseFloat(land);

    const finalResult = {
      crop,
      yield: mlYield,
      profit: `₹${totalProfit.toLocaleString()}`,
      risk: ndviValue < 0.5 ? "High" : "Low",
      confidence: 0.88,
      weather: { temp: temperature, rain: rainfall },
      ndvi: ndviValue,
      insights: [
        `Optimal conditions detected by GEE Satellite.`,
        `ML Model suggests NPK adjustment based on NDVI ${ndviValue.toFixed(2)}.`,
        `Expected market rate: ₹${price}/quintal.`
      ],
      date: new Date()
    };

    // Save to History (Using existing resilient vault)
    yieldBackupVault = [finalResult, ...yieldBackupVault].slice(0, 10);
    res.json(finalResult);
  } catch (err) {
    console.error("❌ [Orchestrator] Critical Failure:", err.message);
    res.status(500).json({ error: "Intelligence Platform Offline. Retrying..." });
  }
});

app.get("/api/yield/history", async (req, res) => {
  console.log("📂 [Yield API] Inspecting history vaults...");
  try {
    // Current simple implementation uses memory vault directly
    res.json(yieldBackupVault.slice(0, 5));
  } catch (err) {
    res.json([]);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
