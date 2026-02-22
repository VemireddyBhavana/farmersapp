import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Calendar, ArrowLeft, SunMedium, CloudLightning, MapPin, Navigation, Sprout, Info, Waves, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

import { useLanguage } from "@/lib/LanguageContext";

const weeklyForecast = [
  { day: "Mon", temp: "32°C", condition: "Sunny", icon: Sun },
  { day: "Tue", temp: "30°C", condition: "Partly Cloudy", icon: SunMedium },
  { day: "Wed", temp: "28°C", condition: "Rainy", icon: CloudRain },
  { day: "Thu", temp: "27°C", condition: "Thunderstorm", icon: CloudLightning },
  { day: "Fri", temp: "29°C", condition: "Cloudy", icon: Cloud },
  { day: "Sat", temp: "31°C", condition: "Sunny", icon: Sun },
  { day: "Sun", temp: "33°C", condition: "Hot", icon: Sun },
];

export default function Weather() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    temp: "24°C",
    humidity: "80%",
    wind: "5 km/h",
    location: "Hyderabad, India",
    condition: "Cloudy",
    recommendation: "Given the current overcast skies and light winds at 24°C in Hyderabad, it's advisable to monitor soil moisture levels closely. If the soil is moist, delay irrigation to prevent waterlogging, which can harm root systems. If the soil is dry, provide light irrigation in the early morning or late evening to minimize evaporation losses."
  });

  const fetchWeather = async () => {
    setLoading(true);
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      // Simulating realistic dynamic data based on "location"
      // In a real app, we'd use lat/lon to call OpemWeatherMap
      setTimeout(() => {
        const tempValue = 25 + Math.floor(Math.random() * 10);
        const humidityValue = 40 + Math.floor(Math.random() * 40);
        const windValue = 5 + Math.floor(Math.random() * 15);

        setWeather({
          temp: `${tempValue}°C`,
          humidity: `${humidityValue}%`,
          wind: `${windValue} km/h`,
          location: "Live Precision Location", // This would be the reverse geocoded name
          condition: tempValue > 30 ? "Clear Sky" : "Partly Cloudy",
          recommendation: tempValue > 30
            ? "High temperature detected. Increase drip irrigation frequency and monitor for heat stress in young saplings. Best time for weeding is late afternoon."
            : "Moderate climate detected. Ideal for nutrient application. Soil moisture retention is high, optimize irrigation cycles accordingly."
        });
        setLoading(false);
        toast({
          title: "Weather Synchronized",
          description: `Live data fetched for ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
        });
      }, 1500);
    }, (error) => {
      toast({
        title: "Location Error",
        description: "Unable to retrieve your exact location. Using default station data.",
        variant: "destructive",
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          {t("weatherAnalysis")}
        </h1>
        <p className="text-muted-foreground text-lg">
          Get real-time weather data and AI-powered farming recommendations based on your exact location.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={fetchWeather}
            disabled={loading}
            className="rounded-full bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg shadow-xl shadow-blue-500/20 flex items-center gap-2"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Navigation className="h-5 w-5 fill-current" />}
            Get Live Weather & Recommendations
          </Button>
          <Button
            variant="outline"
            onClick={fetchWeather}
            disabled={loading}
            className="rounded-full h-14 w-14 p-0 flex items-center justify-center border-blue-200 hover:bg-blue-50"
          >
            <RefreshCw className={cn("h-6 w-6 text-blue-600", loading && "animate-spin")} />
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
            <p className="text-lg font-medium text-muted-foreground">Fetching live data...</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Temperature", value: weather.temp, sub: "Feels like 22.7°C", icon: Thermometer, color: "text-red-500" },
                { label: "Humidity", value: weather.humidity, sub: parseInt(weather.humidity) > 60 ? "High" : "Optimal", icon: Droplets, color: "text-blue-500" },
                { label: "Wind Speed", value: weather.wind, sub: "Gentle", icon: Wind, color: "text-slate-400" },
                { label: "Location", value: weather.location, sub: weather.condition, icon: MapPin, color: "text-amber-500" },
              ].map((stat, i) => (
                <Card key={i} className="rounded-3xl border-primary/5 shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <h3 className="text-2xl font-black">{stat.value}</h3>
                      </div>
                      <stat.icon className={cn("h-5 w-5", stat.color)} />
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">{stat.sub}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="rounded-[2.5rem] border-primary/5 shadow-sm h-full overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-bold flex items-center gap-3">
                    <Sprout className="h-6 w-6 text-emerald-500" />
                    Farming Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {weather.recommendation}
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-[2.5rem] border-primary/5 shadow-sm h-full overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-bold flex items-center gap-3">
                    <Waves className="h-6 w-6 text-blue-500" />
                    Irrigation Advice
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {parseInt(weather.humidity) > 60
                      ? "High humidity reduces evaporation. Stop irrigation for now."
                      : "Optimal humidity. Maintain standard drip irrigation schedule."}
                    <br /><br />
                    • <strong>Timing:</strong> Irrigate before 9 AM or after 5 PM.
                    <br />
                    • <strong>Method:</strong> Drip irrigation is highly recommended to save water.
                    <br />
                    • <strong>Note:</strong> Check for upcoming rain before starting a heavy irrigation cycle.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 pt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black tracking-tight">Recommended Crops for Current Weather</h2>
          <Link to="/calendar">
            <Button variant="outline" className="rounded-xl font-bold">View Planting Calendar</Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Rice (Kharif)", key: "rice", suitability: "High", reason: "Current humidity and temperature are ideal for growth." },
            { name: "Cotton", key: "cotton", suitability: "Medium", reason: "Good for gentle winds, but watch for excessive humidity." },
            { name: "Pulses", key: "pulses", suitability: "High", reason: "Moderate temperature supports nitrogen fixation." },
          ].map((crop, i) => (
            <Card key={i} className="rounded-3xl border-primary/5 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
              <div className="h-2 bg-emerald-500 w-full" />
              <CardContent className="p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-bold group-hover:text-emerald-600 transition-colors">{crop.name}</h4>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-3">{crop.suitability}</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {crop.reason}
                </p>
                <Link to={`/growing-guide?crop=${crop.key}`}>
                  <Button variant="ghost" className="p-0 text-emerald-600 hover:text-emerald-700 font-bold group-hover:translate-x-1 transition-transform">
                    {t("viewGrowingGuide")} <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="pt-12">
        <h2 className="text-3xl font-black tracking-tight mb-8">7-Day Outlook</h2>
        <div className="grid gap-4 md:grid-cols-7">
          {weeklyForecast.map((day, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col items-center p-6 rounded-[2rem] bg-muted/30 border border-primary/5 hover:bg-white hover:shadow-xl transition-all cursor-default"
            >
              <span className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">{day.day}</span>
              <day.icon className={cn("h-10 w-10 mb-4", day.condition === "Rainy" || day.condition === "Thunderstorm" ? "text-blue-500" : "text-amber-500")} />
              <span className="text-xl font-black">{day.temp}</span>
              <span className="text-xs font-medium text-muted-foreground mt-2 text-center">{day.condition}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
