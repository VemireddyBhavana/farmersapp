import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  Sun, 
  Wind, 
  Droplets, 
  Thermometer, 
  Navigation, 
  Search, 
  RefreshCw, 
  AlertTriangle, 
  MapPin, 
  Sunrise, 
  Sunset, 
  Eye, 
  Gauge, 
  SunMedium,
  Satellite,
  Leaf,
  Sprout,
  Waves,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWeather } from "@/hooks/useWeather";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

// --- HELPERS ---

const getWeatherIcon = (main: string = "Clouds", size = "h-12 w-12") => {
  const c = main.toLowerCase();
  const props = { className: cn(size, "drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"), strokeWidth: 1.1 };
  
  if (c.includes("clear") || c.includes("sun")) return <Sun {...props} className={cn(props.className, "text-amber-400")} />;
  if (c.includes("cloud") && c.includes("sun")) return <Sun {...props} className={cn(props.className, "text-blue-200")} />;
  if (c.includes("cloud")) return <Cloud {...props} className={cn(props.className, "text-slate-100")} />;
  if (c.includes("rain") || c.includes("drizzle")) return <CloudRain {...props} className={cn(props.className, "text-blue-300")} />;
  if (c.includes("thunder") || c.includes("storm")) return <CloudLightning {...props} className={cn(props.className, "text-indigo-400")} />;
  return <Cloud {...props} className={cn(props.className, "text-slate-100")} />;
};

const getBgGradient = (main: string = "Clouds") => {
  const c = main.toLowerCase();
  if (c.includes("clear") || c.includes("sun")) return "from-[#FF8C00] via-[#FFA500] to-[#FFD700]";
  if (c.includes("rain") || c.includes("drizzle")) return "from-[#0f172a] via-[#1e293b] to-[#334155]";
  if (c.includes("cloud")) return "from-[#4facfe] via-[#00c6ff] to-[#4facfe]";
  if (c.includes("storm")) return "from-[#0f0c29] via-[#302b63] to-[#24243e]";
  return "from-[#106A3A] via-[#15803d] to-[#166534]";
};

// --- MINI COMPONENTS ---

function WeatherParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[3px] w-[3px] bg-white rounded-full"
          initial={{ 
            opacity: Math.random() * 0.3 + 0.1,
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%" 
          }}
          animate={{ 
            y: [null, "-10%", "110%"],
            x: [null, (Math.random() - 0.5) * 200 + "px"] 
          }}
          transition={{ 
            duration: Math.random() * 20 + 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      ))}
    </div>
  );
}

function AnimatedTemp({ value }: { value: number }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, value, { duration: 1.5, ease: "circOut" });
        return animation.stop;
    }, [value]);

    return <motion.span>{rounded}</motion.span>;
}

export default function Weather() {
  const { weather, loading, error, getLocationAndFetch } = useWeather();
  const [selectedDay, setSelectedDay] = useState(0);

  const formatDate = (dt: number) => {
    return new Date(dt * 1000).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#F1F5F2] text-slate-800 font-sans selection:bg-emerald-200">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl font-black text-[#2D4534] flex items-center gap-3 italic uppercase tracking-tighter">
            <Cloud className="h-8 w-8 text-emerald-600" />
            Weather Forecast
          </h1>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 bg-white/50 backdrop-blur-3xl rounded-3xl border border-white shadow-xl space-y-10">
             <Loader2 className="h-12 w-12 text-emerald-600 animate-spin" />
             <p className="text-xl font-black text-slate-800 animate-pulse tracking-tighter uppercase italic">Syncing Atmosphere Data...</p>
          </div>
        ) : weather ? (
          <div className="space-y-12">
            
            {/* 7-Day Forecast Tabs (Top Priority) */}
            <div className="space-y-8">
              <div className="flex gap-4 overflow-x-auto pb-4 px-1 scrollbar-hide">
                {weather.daily.slice(0, 7).map((day, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDay(i)}
                    className={cn(
                      "flex-shrink-0 w-32 h-44 rounded-[2.5rem] p-6 flex flex-col items-center justify-between transition-all relative overflow-hidden group border-2",
                      selectedDay === i 
                        ? "bg-[#2D4534] border-[#2D4534] text-white shadow-2xl scale-105" 
                        : "bg-white border-white text-slate-600 hover:bg-emerald-50 shadow-md"
                    )}
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                      {i === 0 ? "Today" : formatDate(day.dt).split(",")[0]}
                    </p>
                    <div className={cn("transition-transform group-hover:scale-110", selectedDay === i ? "drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" : "")}>
                      {getWeatherIcon(day.weather[0]?.main, "h-12 w-12")}
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-black italic tracking-tighter">{Math.round(day.temp.max)}°</p>
                      <p className="text-[10px] font-bold opacity-40 italic">{Math.round(day.temp.min)}°</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Weather Insights (Middle Section) */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { label: "Temperature Trend", value: "Rising from 17.5°C to 18.5°C over the week", color: "from-orange-400 to-amber-200", percent: 65, icon: <Thermometer className="h-5 w-5" /> },
                { label: "Precipitation", value: "Low chance of precipitation through the week (5-10%)", color: "from-blue-400 to-blue-100", percent: 15, icon: <CloudRain className="h-5 w-5" /> },
                { label: "Wind Conditions", value: "Gentle breeze throughout the week, ranging from 8-14 km/h", color: "from-emerald-400 to-emerald-100", percent: 40, icon: <Wind className="h-5 w-5" /> }
              ].map((insight) => (
                <Card key={insight.label} className="bg-white border-white shadow-lg rounded-[2.5rem] p-8 space-y-6 transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600">
                      {insight.icon}
                    </div>
                    <h4 className="font-black text-slate-800 uppercase italic tracking-tighter text-sm">{insight.label}</h4>
                  </div>
                  <p className="text-xs font-bold text-slate-400 italic leading-relaxed">
                    {insight.value}
                  </p>
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${insight.percent}%` }}
                      transition={{ duration: 1, ease: "circOut" }}
                      className={cn("h-full rounded-full bg-gradient-to-r", insight.color)}
                    />
                  </div>
                </Card>
              ))}
            </div>

            {/* Day Detail Card (Bottom Section) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDay}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/70 backdrop-blur-xl border-white shadow-2xl rounded-[3.5rem] p-10"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                  <div className="space-y-1">
                    <h4 className="text-3xl font-black text-[#2D4534] italic uppercase tracking-tighter">
                      {formatDate(weather.daily[selectedDay].dt)}
                    </h4>
                    <p className="text-sm font-bold text-slate-400 italic">
                      {weather.daily[selectedDay].weather[0].description} throughout the day.
                    </p>
                  </div>
                </div>

                {/* Day Breakdown Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { label: "Morning", temp: Math.round(weather.daily[selectedDay].temp.morn), icon: <Sunrise className="h-6 w-6" /> },
                    { label: "Afternoon", temp: Math.round(weather.daily[selectedDay].temp.day), icon: <SunMedium className="h-6 w-6" /> },
                    { label: "Evening", temp: Math.round(weather.daily[selectedDay].temp.eve), icon: <Sunset className="h-6 w-6" /> },
                    { label: "Night", temp: Math.round(weather.daily[selectedDay].temp.night), icon: <Moon className="h-6 w-6 text-slate-400" /> }
                  ].map((time) => (
                    <div key={time.label} className="bg-white rounded-3xl p-6 flex flex-col items-center gap-4 border border-slate-50 shadow-sm transition-all hover:shadow-md hover:scale-105">
                      <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        {time.icon}
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{time.label}</p>
                        <p className="text-2xl font-black text-slate-800 italic">{time.temp}°C</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Stats Strip */}
                <div className="mt-12 grid md:grid-cols-3 gap-8">
                  <div className="flex items-center gap-4 bg-white/50 p-6 rounded-3xl border border-white/50 shadow-sm">
                      <Droplets className="h-8 w-8 text-blue-500" />
                      <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Humidity</p>
                          <p className="text-xl font-black text-slate-800 italic">{weather.daily[selectedDay].humidity}%</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/50 p-6 rounded-3xl border border-white/50 shadow-sm">
                      <Wind className="h-8 w-8 text-emerald-500" />
                      <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Wind Speed</p>
                          <p className="text-xl font-black text-slate-800 italic">{Math.round(weather.daily[selectedDay].wind_speed * 3.6)} KM/H</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/50 p-6 rounded-3xl border border-white/50 shadow-sm">
                      <CloudRain className="h-8 w-8 text-blue-600" />
                      <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Precipitation</p>
                          <p className="text-xl font-black text-slate-800 italic">{Math.round(weather.daily[selectedDay].pop * 100)}%</p>
                      </div>
                  </div>
                </div>

                {/* Weather Advisory Card */}
                <div className="mt-12 p-8 bg-[#2D4534] rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -z-0 group-hover:scale-110 transition-transform duration-700" />
                  <div className="flex items-center gap-4 mb-3 relative z-10">
                      <AlertTriangle className="h-6 w-6 text-amber-400" />
                      <h5 className="font-black uppercase italic tracking-tighter text-lg">Weather Advisory</h5>
                  </div>
                  <p className="text-sm font-bold italic opacity-90 relative z-10 leading-relaxed max-w-2xl">
                    {weather.daily[selectedDay].weather[0].main === "Rain" 
                      ? "Expected precipitation may affect harvesting. Ensure proper drainage in fields and protect harvested crops." 
                      : "Ideal conditions for field activities. Maintain regular irrigation schedule and monitor soil moisture levels."}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        ) : error ? (
          <div className="text-center py-40">
             <AlertTriangle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
             <p className="text-rose-500 font-bold">{error}</p>
             <Button onClick={getLocationAndFetch} className="mt-6 bg-emerald-600 text-white font-bold rounded-full px-8 h-12">Try Again</Button>
          </div>
        ) : (
          <div className="text-center py-40 bg-white/50 rounded-3xl border border-white">
            <Navigation className="h-12 w-12 text-emerald-600 mx-auto mb-6 animate-bounce" />
            <h3 className="text-2xl font-black text-slate-800 italic uppercase mb-4">Establish Coordinate Lock</h3>
            <Button onClick={getLocationAndFetch} className="bg-[#2D4534] hover:bg-[#1A2E1F] text-white font-black rounded-full px-12 h-16 text-lg italic uppercase tracking-tighter">Sync Coordinates</Button>
          </div>
        )}
      </div>
    </div>
  );
}
