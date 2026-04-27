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
  ChevronLeft
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

  const [selectedDay, setSelectedDay] = useState(0);

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
            {/* Today Overview */}
            <Card className="bg-white border-white shadow-xl rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-0 opacity-50" />
              
              <div className="relative z-10 space-y-4 text-center md:text-left mb-8 md:mb-0">
                <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  <MapPin className="h-4 w-4 text-emerald-500" />
                  {weather.location}
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-bold text-slate-600 italic">Today • {formatDate(weather.current?.dt)}</p>
                  <h2 className="text-8xl font-black text-[#2D4534] tracking-tighter italic">
                    {Math.round(weather.current?.temp || 0)}°C
                  </h2>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <Badge className="bg-emerald-100 text-emerald-700 border-none font-bold px-4 py-1.5 rounded-full text-xs">
                    {weather.current?.weather?.[0]?.main}
                  </Badge>
                  <div className="flex items-center gap-1 text-slate-400 font-bold text-xs uppercase tracking-widest">
                    <Droplets className="h-4 w-4" />
                    {weather.current?.humidity}% Humidity
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-100 rounded-full blur-2xl scale-150 opacity-40 animate-pulse" />
                  {getWeatherIcon(weather.current?.weather?.[0]?.main, "h-48 w-48 relative z-10")}
                </div>
              </div>
            </Card>

            {/* Weather Insights */}
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

            {/* 7-Day Forecast Tabs */}
            <div className="space-y-8">
              <div className="flex justify-between items-center px-4">
                <h3 className="text-2xl font-black text-[#2D4534] italic uppercase tracking-tighter">7-Day Forecast</h3>
                <Cloud className="h-6 w-6 text-emerald-600 opacity-20" />
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide">
                {weather.daily.slice(0, 7).map((day, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDay(i)}
                    className={cn(
                      "flex-shrink-0 w-32 h-44 rounded-[2.5rem] p-6 flex flex-col items-center justify-between transition-all relative overflow-hidden group",
                      selectedDay === i 
                        ? "bg-[#2D4534] text-white shadow-2xl scale-105" 
                        : "bg-white text-slate-600 hover:bg-emerald-50 shadow-md"
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

              {/* Day Detail Card */}
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

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                      { label: "Morning", temp: Math.round(weather.daily[selectedDay].temp.morn), icon: <Sunrise className="h-6 w-6" /> },
                      { label: "Afternoon", temp: Math.round(weather.daily[selectedDay].temp.day), icon: <SunMedium className="h-6 w-6" /> },
                      { label: "Evening", temp: Math.round(weather.daily[selectedDay].temp.eve), icon: <Sunset className="h-6 w-6" /> },
                      { label: "Night", temp: Math.round(weather.daily[selectedDay].temp.night), icon: <Moon className="h-6 w-6 text-slate-400" /> }
                    ].map((time) => (
                      <div key={time.label} className="bg-white/50 rounded-3xl p-6 flex flex-col items-center gap-4 border border-white/50 shadow-sm">
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

                  <div className="mt-12 grid md:grid-cols-3 gap-8">
                    <div className="flex items-center gap-4 bg-white/50 p-6 rounded-3xl border border-white/50">
                        <Droplets className="h-8 w-8 text-blue-500" />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Humidity</p>
                            <p className="text-xl font-black text-slate-800 italic">{weather.daily[selectedDay].humidity}%</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/50 p-6 rounded-3xl border border-white/50">
                        <Wind className="h-8 w-8 text-emerald-500" />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Wind Speed</p>
                            <p className="text-xl font-black text-slate-800 italic">{Math.round(weather.daily[selectedDay].wind_speed * 3.6)} KM/H</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/50 p-6 rounded-3xl border border-white/50">
                        <CloudRain className="h-8 w-8 text-blue-600" />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Precipitation</p>
                            <p className="text-xl font-black text-slate-800 italic">{Math.round(weather.daily[selectedDay].pop * 100)}%</p>
                        </div>
                    </div>
                  </div>

                  <div className="mt-12 p-8 bg-[#2D4534] rounded-3xl text-white">
                    <div className="flex items-center gap-4 mb-3">
                        <AlertTriangle className="h-6 w-6 text-amber-400" />
                        <h5 className="font-black uppercase italic tracking-tighter">Weather Advisory</h5>
                    </div>
                    <p className="text-sm font-bold italic opacity-90">
                      {weather.daily[selectedDay].weather[0].main === "Rain" 
                        ? "Expected precipitation may affect harvesting. Ensure proper drainage in fields." 
                        : "Ideal conditions for field activities. Maintain regular irrigation schedule."}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
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
iv>
  );
}
