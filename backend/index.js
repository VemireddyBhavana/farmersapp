import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import ee from "@google/earthengine";
import { handleWeather } from "./weather.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
