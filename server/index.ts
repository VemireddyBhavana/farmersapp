import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root directory (one level up)
dotenv.config({ path: path.join(__dirname, "../.env") });
import express from "express";
import cors from "cors";
import { connectDB } from "./db/connection";
import { handleDemo } from "./routes/demo";
import { handleNDVI, initEarthEngine } from "./routes/ndvi";
import { handleWeather } from "./routes/weather";
import { handleMarketPrices, handleMarketPredict, handleMarketStates, handleMarketDistricts, handleMarketMarkets, handleCropTrends } from "./routes/market";
import { handleDiseaseDetect } from "./routes/disease";
import { handleSoilAnalyze } from "./routes/soil";
import { handleExpertConsult, handleSmartAssistant } from "./routes/assistant";
import { handleYieldPredict, handleYieldHistory } from "./routes/yield";
import { handleSaveHistory, handleGetHistory } from "./routes/history";

export function createServer() {
  const app = express();

  // Connect to Database (Async)
  connectDB();

  // Initialize Earth Engine asynchronously
  initEarthEngine().catch(err => {
    console.warn("Continuing server startup despite Earth Engine failure. NDVI features will be unavailable.");
  });

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // API Routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Agri Intelligence Server Active", time: new Date().toISOString() });
  });

  app.get("/api/demo", handleDemo);
  app.get("/api/ndvi", handleNDVI);
  app.get("/api/farm-data", handleNDVI); // Reuse NDVI logic or specific handler
  app.get("/api/weather", handleWeather);
  
  // Market Module
  app.get("/api/market/states", handleMarketStates);
  app.get("/api/market/districts", handleMarketDistricts);
  app.get("/api/market/mandi", handleMarketMarkets);
  app.get("/api/market/prices", handleMarketPrices);
  app.post("/api/market/predict/:crop", handleMarketPredict);

  // Disease Module
  app.post("/api/disease/detect", handleDiseaseDetect);

  // Soil Module
  app.post("/api/soil/analyze", handleSoilAnalyze);

  // Assistant & Expert Modules
  app.post("/api/expert-consult", handleExpertConsult);
  app.post("/api/smart-assistant", handleSmartAssistant);

  // Yield Prediction Module
  app.post("/api/predict", handleYieldPredict); // Matches frontend path
  app.get("/api/yield/history", handleYieldHistory);

  // History Tracking
  app.post("/api/history", handleSaveHistory);
  app.get("/api/history", handleGetHistory);

  // Trends
  app.get("/api/crop-trends", handleCropTrends);

  // Farmer Profile
  app.get("/api/farmer", (_req, res) => {
    res.json({
        id: "F-9908",
        name: "Pratap Reddy",
        location: "Anantapur, Andhra Pradesh",
        experience: "12 Years",
        farmSize: "15 Acres",
        primaryCrops: ["Cotton", "Groundnut", "Paddy"]
    });
  });

  return app;
}
