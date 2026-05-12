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
    const cacheKey = `weather_v2_${queryLat}_${queryLon}`;
    const cachedData = weatherCache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    // 3. Fetch REAL DATA using Free 2.5 API (Supported by all keys)
    // A. Current Weather
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${queryLat}&lon=${queryLon}&units=metric&appid=${API_KEY}`;
    const currentRes = await fetch(currentUrl);
    const currentData = await currentRes.json();

    if (!currentRes.ok) throw new Error(currentData.message || "Failed to fetch current weather");

    // B. 5-Day Forecast (3-hour intervals)
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${queryLat}&lon=${queryLon}&units=metric&appid=${API_KEY}`;
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();

    if (!forecastRes.ok) throw new Error(forecastData.message || "Failed to fetch forecast");

    // 4. TRANSFORM DATA to match expected frontend structure
    const combinedData: any = {
      lat: parseFloat(queryLat),
      lon: parseFloat(queryLon),
      locationName: locationName || currentData.name || "Current Location",
      current: {
        dt: currentData.dt,
        temp: currentData.main.temp,
        feels_like: currentData.main.feels_like,
        pressure: currentData.main.pressure,
        humidity: currentData.main.humidity,
        uvi: 0, // Not available in 2.5 Free
        visibility: currentData.visibility,
        wind_speed: currentData.wind.speed,
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset,
        weather: currentData.weather
      },
      // Map 3-hour forecast to hourly (first 24 hours)
      hourly: forecastData.list.slice(0, 8).map((item: any) => ({
        dt: item.dt,
        temp: item.main.temp,
        pop: item.pop || 0,
        weather: item.weather
      })),
      // Map to Daily (pick one entry per day)
      daily: []
    };

    // Filter for daily forecast (one per day, around noon)
    const dailyMap = new Map();
    forecastData.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          dt: item.dt,
          temp: {
            max: item.main.temp_max,
            min: item.main.temp_min,
            day: item.main.temp // Approximation
          },
          pop: item.pop || 0,
          weather: item.weather,
          humidity: item.main.humidity,
          wind_speed: item.wind.speed
        });
      }
    });
    combinedData.daily = Array.from(dailyMap.values());

    // 5. Add Advisory
    combinedData.advisory = getFarmingAdvisory(combinedData);
    combinedData.alerts = getFarmingAlerts(combinedData);

    // 6. Update Cache
    weatherCache.set(cacheKey, combinedData);
    res.json(combinedData);

  } catch (error: any) {
    console.error("[Weather Error]", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
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
      temp: { 
        min: 22, 
        max: 32,
        morn: 24,
        day: 30,
        eve: 27,
        night: 23
      },
      humidity: 60 + Math.random() * 20,
      wind_speed: 10 + Math.random() * 10,
      pop: 0.2, // Probability of precipitation
      weather: [{ main: i % 3 === 0 ? "Rain" : "Clear", description: "scattered clouds", icon: i % 3 === 0 ? "10d" : "01d" }]
    })),
    locationName: locationName || "Hyderabad, TS (DEMO MODE)"
  };
}
// 🌾 AGRI-INTEL ADVISORY LOGIC
function getFarmingAdvisory(data: any) {
  const temp = data.current?.temp;
  const humidity = data.current?.humidity;
  const desc = data.current?.weather?.[0]?.main?.toLowerCase();

  if (desc?.includes("rain")) return "High moisture detected. Delay irrigation and check drainage channels.";
  if (temp > 35) return "Heat stress alert! Increase irrigation frequency and monitor soil moisture levels.";
  if (humidity > 80) return "High humidity. Risk of fungal diseases like Blast or Blight. Apply preventive fungicide.";
  return "Optimal conditions for crop growth. Ideal for fertilizer application.";
}

function getFarmingAlerts(data: any) {
  const alerts = [];
  const temp = data.current?.temp;
  const wind = data.current?.wind_speed;

  if (temp > 40) alerts.push({ type: "Heat Warning", level: "Critical", suggestion: "Provide shade for young saplings." });
  if (wind > 20) alerts.push({ type: "High Wind", level: "Caution", suggestion: "Secure tall crops and delay spraying." });
  
  // Predict from daily forecast
  if (data.daily?.[0]?.pop > 0.7) {
    alerts.push({ type: "Heavy Rain", level: "Warning", suggestion: "Expected rainfall > 70%. Stop irrigation." });
  }

  return alerts;
}
