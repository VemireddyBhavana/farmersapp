import { Request, Response } from "express";
import NodeCache from "node-cache";

const API_KEY = process.env.VITE_OPENWEATHER_API_KEY;
const weatherCache = new NodeCache({ stdTTL: 600 }); // 10 minutes cache

export const handleWeather = async (req: Request, res: Response) => {
  const { lat, lon, city } = req.query;

  try {
    let queryLat = lat as string;
    let queryLon = lon as string;
    let locationName = "";

    // 1. Handle Geocoding if city is provided instead of lat/lon
    if (city && (!lat || !lon)) {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city as string)}&limit=1&appid=${API_KEY}`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      if (!geoData || geoData.length === 0) {
        return res.status(404).json({ error: "Location not found" });
      }

      queryLat = geoData[0].lat.toString();
      queryLon = geoData[0].lon.toString();
      locationName = `${geoData[0].name}, ${geoData[0].country}`;
    }

    if (!queryLat || !queryLon) {
      return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    // 2. Check Cache
    const cacheKey = `weather_${queryLat}_${queryLon}`;
    const cachedData = weatherCache.get(cacheKey);
    if (cachedData) {
      console.log(`[Weather] Serving from cache: ${cacheKey}`);
      return res.json(cachedData);
    }

    // 3. Fetch from One Call 3.0
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${queryLat}&lon=${queryLon}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    // Handle 401 Unauthorized smoothly (Demo Fallback)
    if (response.status === 401) {
      console.warn("⚠️ One Call 3.0 API Key is invalid or unpaid. Using demo fallback.");
      const demoData = getDemoWeather(queryLat, queryLon, locationName);
      return res.json(demoData);
    }

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    
    // Add location name if we have it
    if (locationName) {
      data.locationName = locationName;
    } else {
        // Reverse geocoding to get location name if only lat/lon provided
        try {
            const revGeoUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${queryLat}&lon=${queryLon}&limit=1&appid=${API_KEY}`;
            const revRes = await fetch(revGeoUrl);
            const revData = await revRes.json();
            if (revData && revData.length > 0) {
                data.locationName = revData[0].name || "Current Location";
            }
        } catch (e) {
            data.locationName = "Current Location";
        }
    }

    // 4. Update Cache
    weatherCache.set(cacheKey, data);
    res.json(data);

  } catch (error: any) {
    console.error("[Weather Error]", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 🏛️ HIGH-FIDELITY DEMO FALLBACK
function getDemoWeather(lat: string, lon: string, locationName: string) {
  const now = Math.floor(Date.now() / 1000);
  return {
    lat: parseFloat(lat),
    lon: parseFloat(lon),
    timezone: "UTC",
    current: {
      dt: now,
      temp: 28,
      feels_like: 30,
      pressure: 1012,
      humidity: 65,
      uvi: 6,
      visibility: 10000,
      wind_speed: 12,
      weather: [{ main: "Clouds", description: "scattered clouds", icon: "03d" }]
    },
    hourly: Array.from({ length: 48 }).map((_, i) => ({
      dt: now + i * 3600,
      temp: 25 + Math.sin(i / 4) * 5,
      weather: [{ main: "Clouds", description: "scattered clouds", icon: "03d" }]
    })),
    daily: Array.from({ length: 8 }).map((_, i) => ({
      dt: now + i * 86400,
      temp: { min: 22, max: 32 },
      pop: 0.2, // Probability of precipitation
      weather: [{ main: i % 3 === 0 ? "Rain" : "Clear", description: "scattered clouds", icon: i % 3 === 0 ? "10d" : "01d" }]
    })),
    locationName: locationName || "Hyderabad, TS (DEMO MODE)"
  };
}
