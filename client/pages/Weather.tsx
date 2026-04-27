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
          <div className="text-center py-40 space-y-6">
            <div className="relative inline-block">
               <Loader2 className="h-24 w-24 text-emerald-600 animate-spin mx-auto" />
               <Satellite className="h-10 w-10 text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-2xl font-black text-emerald-600 uppercase italic tracking-widest animate-pulse">Syncing with orbital satellites...</p>
          </div>
        ) : weather ? (
          <div className="space-y-12">
            {/* Horizontal 7-Day Navigation */}
            <div className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
              <div className="flex gap-4 min-w-max">
                {weather.daily.slice(0, 7).map((day, i) => (
                  <button
                    key={day.dt}
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

            {/* Weather Insights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: "Temperature Trend", value: "Rising from 17.5°C to 18.5°C over the week", color: "from-orange-400 to-amber-200", percent: 65, icon: <Thermometer className="h-5 w-5" /> },
                { label: "Precipitation", value: "Low chance of precipitation through the week (5-10%)", color: "from-blue-400 to-blue-100", percent: 15, icon: <CloudRain className="h-5 w-5" /> },
                { label: "Wind Conditions", value: "Gentle breeze throughout the week, ranging from 8-14 km/h", color: "from-emerald-400 to-emerald-100", percent: 40, icon: <Wind className="h-5 w-5" /> }
              ].map((insight) => (
                <Card key={insight.label} className="bg-white border-white rounded-[2.5rem] p-8 shadow-lg hover:shadow-xl transition-all group overflow-hidden relative">
                  <div className={cn("absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-[0.03] rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150", insight.color)} />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br shadow-lg", insight.color)}>
                      {insight.icon}
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{insight.label}</h3>
                      <p className="text-sm font-bold text-slate-800 italic leading-tight">{insight.value}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span>Intensity</span>
                      <span className="text-slate-600">{insight.percent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${insight.percent}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={cn("h-full rounded-full", insight.color)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Daily Breakdown & Advisory */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Daily Breakdown */}
              <Card className="lg:col-span-8 bg-white border-white rounded-[3rem] p-10 shadow-xl overflow-hidden relative">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-xl font-black text-slate-800 italic uppercase tracking-tighter">Daily Breakdown</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Temperature & Conditions per period</p>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center">
                    <RefreshCw className="h-5 w-5 text-slate-400" />
                  </div>
                </div>

                {/* Day Breakdown Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { label: "Morning", time: "06:00", temp: weather.daily[selectedDay].temp.morn, icon: <Sunrise className="h-8 w-8 text-orange-400" /> },
                    { label: "Afternoon", time: "12:00", temp: weather.daily[selectedDay].temp.day, icon: <Sun className="h-8 w-8 text-amber-400" /> },
                    { label: "Evening", time: "18:00", temp: weather.daily[selectedDay].temp.eve, icon: <Sunset className="h-8 w-8 text-rose-400" /> },
                    { label: "Night", time: "22:00", temp: weather.daily[selectedDay].temp.night, icon: <Moon className="h-8 w-8 text-indigo-400" /> }
                  ].map((time) => (
                    <div key={time.label} className="bg-white rounded-3xl p-6 flex flex-col items-center gap-4 border border-slate-50 shadow-sm transition-all hover:shadow-md hover:scale-105">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{time.label}</p>
                      <div className="py-2">{time.icon}</div>
                      <div className="text-center">
                        <p className="text-2xl font-black text-slate-800 italic">{Math.round(time.temp)}°C</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{time.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Weather Advisory */}
              <Card className="lg:col-span-4 bg-[#2D4534] border-[#2D4534] rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                      <Sprout className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Weather Advisory</h3>
                  </div>

                  <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <p className="text-sm font-bold text-white/90 italic leading-relaxed">
                      {weather.advisory || "Optimal conditions for crop growth. Ideal for fertilizer application."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Agricultural Insight</p>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-400 mt-1.5 animate-pulse" />
                      <p className="text-xs font-bold text-white/60 italic">Stable humidity levels predicted for the next 48 hours. Good for sensitive saplings.</p>
                    </div>
                  </div>

                  <Button className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase italic tracking-widest text-xs shadow-xl shadow-emerald-950/20">
                    Detailed PDF Report
                  </Button>
                </div>
              </Card>
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
