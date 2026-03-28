import { useState, useEffect, useCallback } from "react";

const CACHE_KEY = "ismigs_weather_intel_cache";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes (MSN Refresh cycle)

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  uvi: number;
  visibility: number;
  wind_speed: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  weather: WeatherCondition[];
}

export interface HourlyWeather {
  dt: number;
  temp: number;
  weather: WeatherCondition[];
  pop: number; // Probability of precipitation
}

export interface DailyWeather {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: WeatherCondition[];
  pop: number;
}

export interface SatelliteData {
  ndvi: number;
  soil: {
    moisture: number;
    carbon: number;
  };
  status: string;
  timestamp: string;
}

export interface WeatherData {
  lat: number;
  lon: number;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  satellite: SatelliteData;
  location: string;
  advisory: string;
  timestamp: number;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (lat?: number, lon?: number, manualLocation?: string) => {
    setLoading(true);
    setLoadingStage("Initializing Satellite Link...");
    setError(null);

    try {
      let queryLat = lat;
      let queryLon = lon;
      let displayLocation = "";

      // 1. Optional Geocoding on Frontend (User Implementation Strategy 2)
      if (manualLocation) {
        setLoadingStage("Geocoding Location Coordinates...");
        const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(manualLocation)}&limit=1&appid=${API_KEY}`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (!geoData || geoData.length === 0) {
          throw new Error(`Location not found: ${manualLocation}`);
        }

        queryLat = geoData[0].lat;
        queryLon = geoData[0].lon;
        displayLocation = geoData[0].state ? `${geoData[0].name}, ${geoData[0].state}, ${geoData[0].country}` : `${geoData[0].name}, ${geoData[0].country}`;
        setLoadingStage("Locking GPS Composition...");
      }

      if (queryLat === undefined || queryLon === undefined) {
        throw new Error("No coordinate lock found.");
      }

      setLoadingStage("Scanning Atmospheric Composition...");
      const params = new URLSearchParams({
        lat: queryLat.toString(),
        lon: queryLon.toString()
      });

      const response = await fetch(`/api/weather?${params.toString()}`);
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Intelligence feed interrupted.");
      }

      setLoadingStage("Processing Geospatial Imagery...");
      const data = await response.json();
      
      const processedData: WeatherData = {
        ...data,
        lat: queryLat,
        lon: queryLon,
        location: displayLocation || data.locationName || "Monitored Region",
        timestamp: Date.now()
      };

      setWeather(processedData);
      localStorage.setItem(CACHE_KEY, JSON.stringify(processedData));

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingStage("");
    }
  }, []);

  const getLocationAndFetch = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation hardware not detected.");
      return;
    }

    setLoading(true);
    setLoadingStage("Locking GPS Coordinates...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setError("Location access denied. Please manual-lock your region.");
        setLoading(false);
        setLoadingStage("");
      },
      { timeout: 10000 }
    );
  }, [fetchWeather]);

  const refreshWeather = useCallback(() => {
    if (weather?.lat !== undefined && weather?.lon !== undefined) {
      fetchWeather(weather.lat, weather.lon);
    } else {
      getLocationAndFetch();
    }
  }, [weather, fetchWeather, getLocationAndFetch]);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const data = JSON.parse(cached);
        if (Date.now() - data.timestamp < CACHE_TTL) {
          setWeather(data);
        } else {
          getLocationAndFetch();
        }
      } catch (e) {
        getLocationAndFetch();
      }
    } else {
      getLocationAndFetch();
    }
  }, [getLocationAndFetch]);

  // AUTO-REFRESH EVERY 5 MINUTES (MSN Style)
  useEffect(() => {
    const interval = setInterval(() => {
      refreshWeather();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshWeather]);

  return { 
    weather, 
    loading, 
    loadingStage,
    error, 
    fetchWeather, 
    getLocationAndFetch,
    refreshWeather
  };
};
