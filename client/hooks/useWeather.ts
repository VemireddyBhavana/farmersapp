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
    morn: number;
    day: number;
    eve: number;
    night: number;
  };
  humidity: number;
  wind_speed: number;
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
      let url = "";

      if (manualLocation) {
        // Use backend geocoding — server already handles ?city= using its API key
        setLoadingStage("Geocoding Location Coordinates...");
        url = `/api/weather?city=${encodeURIComponent(manualLocation)}`;
      } else if (lat !== undefined && lon !== undefined) {
        setLoadingStage("Locking GPS Composition...");
        url = `/api/weather?lat=${lat}&lon=${lon}`;
      } else {
        throw new Error("No coordinate or location provided.");
      }

      setLoadingStage("Scanning Atmospheric Composition...");
      const response = await fetch(url);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Intelligence feed interrupted.");
      }

      setLoadingStage("Processing Geospatial Imagery...");
      const data = await response.json();

      const processedData: WeatherData = {
        ...data,
        lat: data.lat ?? lat ?? 0,
        lon: data.lon ?? lon ?? 0,
        location: data.locationName || manualLocation || "Monitored Region",
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
      console.warn("Geolocation hardware not detected. Using fallback location.");
      fetchWeather(17.3850, 78.4867);
      return;
    }

    setLoading(true);
    setLoadingStage("Locking GPS Coordinates...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        console.warn("Location access denied or timeout. Using default fallback location.");
        fetchWeather(17.3850, 78.4867);
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
