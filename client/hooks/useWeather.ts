import { useState, useEffect, useCallback } from "react";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const CACHE_KEY = "ismigs_weather_cache";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes in milliseconds

export interface WeatherData {
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
    location: string;
    rainProbability: number;
    cloudCoverage: number;
    uvIndex: number;
    timestamp: number;
}

export interface ForecastData {
    day: string;
    temp: number;
    condition: string;
    icon: string;
}

export const useWeather = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = useCallback(async (lat?: number, lon?: number, manualLocation?: string) => {
        setLoading(true);
        setError(null);

        try {
            // Check cache first
            if (!manualLocation) {
                const cached = localStorage.getItem(CACHE_KEY);
                if (cached) {
                    const { data, forecast: cachedForecast, timestamp } = JSON.parse(cached);
                    if (Date.now() - timestamp < CACHE_TTL) {
                        setWeather(data);
                        setForecast(cachedForecast);
                        setLoading(false);
                        return;
                    }
                }
            }

            let queryLat = lat;
            let queryLon = lon;
            let locationName = "Current Location";

            if (manualLocation) {
                const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(manualLocation)}&count=1&language=en&format=json`;
                const geoRes = await fetch(geoUrl);
                if (!geoRes.ok) throw new Error("Failed to fetch location data");
                const geoData = await geoRes.json();
                if (!geoData.results || geoData.results.length === 0) {
                    throw new Error("Location not found");
                }
                queryLat = geoData.results[0].latitude;
                queryLon = geoData.results[0].longitude;
                locationName = `${geoData.results[0].name}, ${geoData.results[0].country}`;
            } else if (lat === undefined || lon === undefined) {
                throw new Error("No location provided");
            } else {
                // Try to reverse geocode if lat/lon is provided
                try {
                    const revGeoUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
                    const revRes = await fetch(revGeoUrl);
                    if (revRes.ok) {
                        const revData = await revRes.json();
                        locationName = revData.address?.city || revData.address?.town || revData.address?.village || revData.address?.county || "Current Location";
                    }
                } catch (e) {
                    console.log("Reverse geocoding failed, using fallback name");
                }
            }

            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${queryLat}&longitude=${queryLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,cloud_cover&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

            const weatherRes = await fetch(weatherUrl);

            if (!weatherRes.ok) {
                throw new Error("Failed to fetch weather data.");
            }

            const weatherData = await weatherRes.json();

            // Open-Meteo Weather Codes Mapping
            const getWeatherDescription = (code: number) => {
                const codes: Record<number, string> = {
                    0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
                    45: "Fog", 48: "Depositing rime fog",
                    51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
                    61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
                    71: "Slight snow fall", 73: "Moderate snow fall", 75: "Heavy snow fall",
                    95: "Thunderstorm", 96: "Thunderstorm with slight hail", 99: "Thunderstorm with heavy hail"
                };
                return codes[code] || "Unknown";
            };

            const getIcon = (code: number) => {
                if (code === 0 || code === 1) return "01d";
                if (code === 2) return "02d";
                if (code === 3) return "03d";
                if (code >= 50 && code <= 65) return "09d";
                if (code >= 70 && code <= 75) return "13d";
                if (code >= 95) return "11d";
                return "03d";
            };

            // Process current weather
            const processedWeather: WeatherData = {
                temp: Math.round(weatherData.current.temperature_2m),
                feelsLike: Math.round(weatherData.current.apparent_temperature),
                humidity: weatherData.current.relative_humidity_2m,
                windSpeed: Math.round(weatherData.current.wind_speed_10m),
                description: getWeatherDescription(weatherData.current.weather_code),
                icon: getIcon(weatherData.current.weather_code),
                location: locationName,
                rainProbability: weatherData.current.precipitation > 0 ? 100 : 0, // Simplified for current
                cloudCoverage: weatherData.current.cloud_cover,
                uvIndex: 0,
                timestamp: Date.now()
            };

            // Process daily forecast
            const dailyForecast: ForecastData[] = [];
            for (let i = 0; i < 5; i++) {
                if (weatherData.daily.time[i]) {
                    const date = new Date(weatherData.daily.time[i]);
                    dailyForecast.push({
                        day: date.toLocaleDateString("en-US", { weekday: "short" }),
                        temp: Math.round(weatherData.daily.temperature_2m_max[i]),
                        condition: getWeatherDescription(weatherData.daily.weather_code[i]),
                        icon: getIcon(weatherData.daily.weather_code[i])
                    });
                }
            }

            setWeather(processedWeather);
            setForecast(dailyForecast);

            // Save to cache
            if (!manualLocation) {
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    data: processedWeather,
                    forecast: dailyForecast,
                    timestamp: Date.now()
                }));
            }

        } catch (err: any) {
            setError(err.message || "An error occurred");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const getLocationAndFetch = useCallback(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            (err) => {
                setError("Location permission denied or unavailable. Please select manually.");
                setLoading(false);
            }
        );
    }, [fetchWeather]);

    useEffect(() => {
        // Initial fetch if cache exists, otherwise wait for manual or auto trigger
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const { data, forecast: cachedForecast, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_TTL) {
                setWeather(data);
                setForecast(cachedForecast);
            } else {
                getLocationAndFetch();
            }
        } else {
            getLocationAndFetch();
        }
    }, [getLocationAndFetch]);

    return { weather, forecast, loading, error, fetchWeather, getLocationAndFetch };
};
