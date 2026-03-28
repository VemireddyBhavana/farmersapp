import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleNDVI, initEarthEngine } from "./routes/ndvi";
import { handleWeather } from "./routes/weather";

export function createServer() {
  const app = express();

  // Initialize Earth Engine asynchronously
  initEarthEngine().catch(err => {
    console.warn("Continuing server startup despite Earth Engine failure. NDVI features will be unavailable.");
  });

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.get("/api/ndvi", handleNDVI);
  app.get("/api/weather", handleWeather);

  return app;
}
