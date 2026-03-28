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

export default function Weather() {
  const { 
    weather, 
    loading, 
    loadingStage, 
    error, 
    refreshWeather, 
    getLocationAndFetch, 
    fetchWeather 
  } = useWeather();
  
  const [manualLocation, setManualLocation] = useState("");
  const [showManualInput, setShowManualInput] = useState(false);
  const [mapMode, setMapMode] = useState<"weather" | "satellite">("weather");
  const [weatherLayer, setWeatherLayer] = useState<"precipitation_new" | "clouds_new" | "temp_new">("precipitation_new");
  
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualLocation.trim()) {
      fetchWeather(undefined, undefined, manualLocation);
      setManualLocation("");
      setShowManualInput(false);
    }
  };

  // --- MAP INITIALIZATION ---
  useEffect(() => {
    if (weather && mapContainerRef.current && !loading) {
        if (mapRef.current) {
            mapRef.current.remove();
        }

        const lat = weather.lat || 17.385;
        const lon = weather.lon || 78.4867;

        mapRef.current = L.map(mapContainerRef.current, {
            center: [lat, lon],
            zoom: 12,
            zoomControl: false,
            attributionControl: false
        });

        if (mapMode === "satellite") {
             L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: '© Esri'
            }).addTo(mapRef.current);
            
            // Add NDVI Point indicator
            const circle = L.circle([lat, lon], {
                color: weather.satellite?.ndvi > 0.6 ? '#10b981' : weather.satellite?.ndvi > 0.3 ? '#f59e0b' : '#f43f5e',
                fillColor: weather.satellite?.ndvi > 0.6 ? '#10b981' : weather.satellite?.ndvi > 0.3 ? '#f59e0b' : '#f43f5e',
                fillOpacity: 0.5,
                radius: 1000
            }).addTo(mapRef.current);
            circle.bindPopup(`<b>Satellite Vigor:</b> ${(weather.satellite?.ndvi || 0).toFixed(3)}`).openPopup();
        } else {
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
            const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
            L.tileLayer(`https://tile.openweathermap.org/map/${weatherLayer}/{z}/{x}/{y}.png?appid=${API_KEY}`, {
                opacity: 0.7
            }).addTo(mapRef.current);
        }

        L.marker([lat, lon]).addTo(mapRef.current);
    }

    return () => {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
    };
  }, [weather, mapMode, weatherLayer, loading]);

  const chartData = useMemo(() => {
    if (!weather?.hourly) return [];
    return weather.hourly.slice(0, 24).map(h => ({
        time: new Date(h.dt * 1000).toLocaleTimeString([], { hour: '2-digit' }),
        temp: Math.round(h.temp),
        pop: Math.round(h.pop * 100)
    }));
  }, [weather]);

  const formatDate = (dt: number) => {
    return new Date(dt * 1000).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
  };

  const formatTime = (dt: number) => {
    return new Date(dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020817] pb-24 overflow-x-hidden selection:bg-emerald-200">
      
      {/* --- TOP NAVIGATION BREATHER --- */}
      <div className="container mx-auto px-6 pt-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">
              Agri-Weather Intel
            </h1>
            <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
              <Satellite className="h-4 w-4 text-emerald-500 animate-pulse" />
              Satellite Unified Intelligence System
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 w-full md:w-auto">
            <AnimatePresence mode="wait">
              {showManualInput ? (
                <motion.form 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  onSubmit={handleManualSearch}
                  className="flex gap-2 flex-grow md:flex-grow-0"
                >
                  <Input 
                    autoFocus
                    value={manualLocation}
                    onChange={(e) => setManualLocation(e.target.value)}
                    placeholder="Search Global Farms..." 
                    className="h-16 rounded-3xl bg-white border-0 shadow-2xl px-8 font-bold text-lg"
                  />
                  <Button type="submit" className="h-16 w-16 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-3xl transform active:scale-90 transition-all">
                    <Search className="h-7 w-7" />
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setShowManualInput(false)} className="h-16 px-6 font-black uppercase text-xs italic tracking-widest text-slate-400">Cancel</Button>
                </motion.form>
              ) : (
                <div className="flex gap-6 w-full md:w-auto">
                  <Button 
                    onClick={refreshWeather}
                    variant="outline" 
                    className="h-16 px-10 rounded-[2rem] border-0 shadow-xl bg-white dark:bg-slate-900 font-black flex items-center gap-4 transition-all hover:translate-y-[-2px] hover:shadow-2xl"
                  >
                    <RefreshCw className={cn("h-6 w-6 text-emerald-600", loading && "animate-spin")} />
                    RE-SYNC FEED
                  </Button>
                  <Button 
                    onClick={() => setShowManualInput(true)}
                    className="h-16 px-10 rounded-[2rem] bg-slate-950 dark:bg-emerald-600 text-white shadow-3xl hover:translate-y-[-2px] transition-all font-black italic tracking-tight"
                  >
                    IDENTIFY LOCATION
                  </Button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* --- MAIN CONTENT --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 bg-white/50 backdrop-blur-3xl rounded-[5rem] border border-white shadow-2xl space-y-10">
             <div className="relative">
                <div className="h-40 w-40 rounded-[3rem] border-4 border-emerald-100 border-t-emerald-600 animate-spin" />
                <Satellite className="h-16 w-16 text-emerald-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
             </div>
             <div className="text-center space-y-3">
                <p className="text-3xl font-black text-slate-800 animate-pulse tracking-tighter uppercase italic">{loadingStage || "Establishing Satellite Uplink..."}</p>
                <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">Processing Multi-Spectral Imagery</p>
             </div>
          </div>
        ) : weather ? (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-20"
          >
            
            {/* 1. STARTUP-LEVEL ₹10L PREMIUM HERO SECTION */}
            <section className="max-w-7xl mx-auto w-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "circOut" }}
                className={cn(
                  "relative rounded-[4rem] p-10 md:px-12 md:py-16 text-white overflow-hidden flex flex-col justify-between transition-all duration-1000",
                  "bg-gradient-to-br bg-[length:200%_200%] animate-gradient-shift",
                  getBgGradient(weather.current?.weather?.[0]?.main),
                  "shadow-[0_0_80px_rgba(255,255,255,0.1),0_40px_100px_rgba(0,0,0,0.5)] border border-white/20"
                )}
              >
                {/* ADVANCED LAYERS: Particles, Glows, Glass */}
                <WeatherParticles />
                <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl pointer-events-none z-0" />
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-white/20 rounded-full blur-[150px] animate-pulse pointer-events-none z-0" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.15),transparent)] pointer-events-none z-0" />
                
                {/* TOP ROW: STATUS & LOCATION */}
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8 w-full">
                  <div className="space-y-3">
                    <Badge className="bg-white/10 backdrop-blur-2xl border-white/20 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black tracking-[0.3em] uppercase italic flex items-center gap-3">
                       <div className="h-2 w-2 bg-emerald-400 rounded-full animate-ping" />
                       REAL-TIME AGRI-FEED ACTIVE
                    </Badge>
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-3 text-white"
                    >
                      <MapPin className="h-6 w-6 text-emerald-400" />
                      <h3 className="text-3xl font-black italic tracking-[-0.04em] uppercase drop-shadow-xl leading-none">
                        {weather.location}
                      </h3>
                    </motion.div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[12px] font-black text-white/70 uppercase tracking-widest italic flex items-center gap-3 justify-end leading-none">
                      Updated: {formatTime(weather.current?.dt)}
                    </p>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-tighter italic leading-none">Core-Sys V5.1 Intelligence</p>
                  </div>
                </div>

                {/* MAIN CONTENT SPLIT (VISUAL BALANCE) */}
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full mt-20 mb-20 gap-16">
                  {/* LEFT: TEMP & STATE (FIXED BLOCK SIZING) */}
                  <div className="flex-1 flex flex-col items-center md:items-start">
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[140px] md:text-[220px] font-black tracking-[-0.1em] leading-none select-none italic text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                    >
                      <AnimatedTemp value={Math.round(weather.current?.temp || 0)} />°
                    </motion.h2>
                    <div className="mt-[-20px] space-y-2">
                      <p className="text-4xl md:text-7xl font-black italic tracking-[0.08em] uppercase leading-none opacity-95 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
                        {weather.current?.weather?.[0]?.description}
                      </p>
                      <div className="flex items-center gap-6 text-2xl font-bold text-white/80 italic tracking-tight">
                        <p>Feels like <span className="text-white font-black">{Math.round(weather.current?.feels_like || 0)}°</span></p>
                        <div className="h-2 w-2 bg-white/20 rounded-full" />
                        <p>H: {Math.round(weather.daily[0]?.temp.max || 0)}° L: {Math.round(weather.daily[0]?.temp.min || 0)}°</p>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: ICON HERO (CENTERED VERTICALLY) */}
                  <div className="flex-1 flex justify-center lg:justify-end pr-0 lg:pr-10">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ 
                          opacity: 1,
                          scale: [1, 1.05, 1],
                          y: [0, -30, 0]
                        }}
                        transition={{ 
                          opacity: { duration: 1 },
                          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                          y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-[140px] scale-150 animate-pulse pointer-events-none" />
                        {getWeatherIcon(weather.current?.weather?.[0]?.main, "h-80 w-80 md:h-[520px] md:w-[520px] relative z-20 drop-shadow-[0_45px_120px_rgba(0,0,0,0.7)]")}
                      </motion.div>
                  </div>
                </div>

                {/* BOTTOM: METRIC CARDS (EVENLY SPACED GRID) */}
                <motion.div 
                   initial="hidden"
                   animate="visible"
                   variants={{
                     visible: { transition: { staggerChildren: 0.1 } }
                   }}
                   className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mt-10"
                >
                  <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ scale: 1.05 }}
                    className="backdrop-blur-[60px] bg-white/10 border border-white/30 rounded-[3rem] p-10 flex items-center justify-between group transition-all duration-500 shadow-2xl relative overflow-hidden"
                  >
                     <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-7 relative z-10">
                      <div className="p-5 bg-white/10 rounded-3xl shadow-lg border border-white/5">
                        <Wind className="h-10 w-10 text-white" />
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-white/60 uppercase tracking-[0.4em] mb-1">Wind Speed</p>
                        <p className="text-4xl font-black italic tracking-tighter leading-none">{Math.round((weather.current?.wind_speed || 0) * 3.6)} <span className="text-xs">KM/H</span></p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ scale: 1.05 }}
                    className="backdrop-blur-[60px] bg-white/10 border border-white/30 rounded-[3rem] p-10 flex items-center justify-between group transition-all duration-500 shadow-2xl relative overflow-hidden"
                  >
                     <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-200/0 via-blue-200 to-blue-200/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-7 relative z-10">
                      <div className="p-5 bg-white/10 rounded-3xl shadow-lg border border-white/5">
                        <Droplets className="h-10 w-10 text-sky-200" />
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-white/60 uppercase tracking-[0.4em] mb-1">Air Moisture</p>
                        <p className="text-4xl font-black italic tracking-tighter leading-none">{weather.current?.humidity}%</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ scale: 1.05 }}
                    className="backdrop-blur-[60px] bg-white/10 border border-white/30 rounded-[3rem] p-10 flex items-center justify-between group transition-all duration-500 shadow-2xl relative overflow-hidden"
                  >
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-200/0 via-amber-200 to-amber-200/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-7 relative z-10">
                      <div className="p-5 bg-white/10 rounded-3xl shadow-lg border border-white/5">
                        <SunMedium className="h-10 w-10 text-amber-300" />
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-white/60 uppercase tracking-[0.4em] mb-1">Solar Radiation</p>
                        <p className="text-4xl font-black italic tracking-tighter leading-none">{weather.current?.uvi} <span className="text-xs uppercase">UV</span></p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

              </motion.div>
            </section>

            {/* 2. ADVISORY PANEL (Combined Intel) */}
            <section className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 shadow-2xl border border-slate-100 flex flex-col lg:flex-row gap-12 items-center transition-all hover:border-emerald-200">
                 <div className="h-28 w-28 bg-emerald-50 dark:bg-emerald-950/30 rounded-[2.5rem] flex items-center justify-center flex-shrink-0 animate-bounce shadow-inner">
                    <Sprout className="h-14 w-14 text-emerald-600" />
                 </div>
                 <div className="flex-1 space-y-3 text-center lg:text-left">
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter leading-none">Unified Crop Advisory</h3>
                    <p className="text-2xl font-bold text-slate-500 italic leading-snug">
                       "{weather.advisory || "Scanning for precision recommendations..."}"
                    </p>
                 </div>
                 <div className="flex gap-6">
                    <Badge className="bg-emerald-100 text-emerald-700 h-14 px-8 rounded-full font-black border-0 text-lg shadow-sm">NDVI: {(weather.satellite?.ndvi || 0).toFixed(2)}</Badge>
                    <Badge className="bg-blue-100 text-blue-700 h-14 px-8 rounded-full font-black border-0 text-lg shadow-sm">Soil: {(weather.satellite?.soil?.moisture || 0).toFixed(1)}%</Badge>
                 </div>
            </section>

            <div className="grid lg:grid-cols-12 gap-12">
                
                {/* 3. HOURLY ANALYTICS (Left Column) */}
                <div className="lg:col-span-8 space-y-16">
                    
                    {/* Temperature Curve Chart */}
                    <Card className="rounded-[4.5rem] border-0 shadow-2xl bg-white dark:bg-slate-900 overflow-hidden group">
                        <CardHeader className="p-12 pb-0 flex flex-row items-center justify-between">
                            <CardTitle className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-5 italic uppercase tracking-tighter">
                                <div className="h-12 w-12 bg-orange-50 dark:bg-orange-900/10 rounded-2xl flex items-center justify-center">
                                    <Thermometer className="h-8 w-8 text-orange-500" />
                                </div>
                                Thermal Trend High-Scan
                            </CardTitle>
                            <Badge variant="outline" className="rounded-full border-slate-100 font-black italic px-5 py-2">LIVE 24H CYCLE</Badge>
                        </CardHeader>
                        <CardContent className="p-6 h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis 
                                        dataKey="time" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}}
                                    />
                                    <YAxis hide />
                                    <Tooltip 
                                        contentStyle={{borderRadius: '30px', border: 'none', boxShadow: '0 30px 60px rgba(0,0,0,0.2)', fontWeight: 'black', background: 'rgba(255,255,255,0.9)'}}
                                        formatter={(val) => [`${val}°C`, 'Temperature']}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="temp" 
                                        stroke="#f97316" 
                                        strokeWidth={5} 
                                        fillOpacity={1} 
                                        fill="url(#colorTemp)" 
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Hourly Strip (MSN Style) */}
                    <section className="space-y-8">
                        <div className="flex justify-between items-end px-6">
                            <h3 className="text-4xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter leading-none">Hourly Intelligence</h3>
                            <div className="flex gap-3">
                                <Button size="icon" variant="outline" onClick={() => scrollRef.current?.scrollBy({left: -300, behavior: 'smooth'})} className="rounded-full h-12 w-12 border-slate-100 shadow-md hover:scale-110 active:scale-95 transition-all"><ChevronLeft className="h-6 w-6" /></Button>
                                <Button size="icon" variant="outline" onClick={() => scrollRef.current?.scrollBy({left: 300, behavior: 'smooth'})} className="rounded-full h-12 w-12 border-slate-100 shadow-md hover:scale-110 active:scale-95 transition-all"><ChevronRight className="h-6 w-6" /></Button>
                            </div>
                        </div>
                        <div 
                            ref={scrollRef}
                            className="flex gap-8 overflow-x-auto pb-10 px-6 scrollbar-hide snap-x"
                        >
                            {weather.hourly.map((h, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -15, scale: 1.1 }}
                                    className="flex-shrink-0 w-44 bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 rounded-[3rem] p-10 shadow-xl flex flex-col items-center gap-8 group snap-center transition-all cursor-default"
                                >
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{i === 0 ? "Now" : formatTime(h.dt)}</p>
                                    <div className="transform group-hover:rotate-12 transition-transform duration-500">
                                        {getWeatherIcon(h.weather[0]?.main, "h-16 w-16")}
                                    </div>
                                    <div className="space-y-2 text-center">
                                        <p className="text-4xl font-black text-slate-800 dark:text-white italic leading-none">{Math.round(h.temp)}°</p>
                                        {h.pop > 0 && <p className="text-[10px] font-black text-blue-500 uppercase tracking-tighter">{Math.round(h.pop * 100)}% CLO</p>}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* INTERACTIVE INTELLIGENCE MAP */}
                    <Card className="rounded-[5rem] border-0 shadow-[0_50px_100px_rgba(0,0,0,0.3)] bg-white dark:bg-slate-900 overflow-hidden relative group">
                         <div className="absolute top-10 left-10 z-30 flex flex-col gap-4">
                            <div className="flex gap-3 bg-white/90 backdrop-blur-3xl p-3 rounded-2xl shadow-3xl border border-slate-100">
                                <Button 
                                    onClick={() => setMapMode("weather")} 
                                    variant={mapMode === "weather" ? "default" : "ghost"}
                                    className="h-12 px-6 rounded-xl font-black uppercase italic tracking-tighter"
                                >ATMOSPHERE SCAN</Button>
                                <Button 
                                    onClick={() => setMapMode("satellite")} 
                                    variant={mapMode === "satellite" ? "default" : "ghost"}
                                    className="h-12 px-6 rounded-xl font-black uppercase italic tracking-tighter"
                                >SURFACE INTELLIGENCE</Button>
                            </div>

                            {mapMode === "weather" && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-3 bg-white/90 backdrop-blur-3xl p-3 rounded-2xl shadow-3xl border border-slate-100"
                                >
                                    <Button onClick={() => setWeatherLayer("precipitation_new")} size="sm" variant={weatherLayer === "precipitation_new" ? "secondary" : "ghost"} className="rounded-lg font-bold">Rainfall</Button>
                                    <Button onClick={() => setWeatherLayer("clouds_new")} size="sm" variant={weatherLayer === "clouds_new" ? "secondary" : "ghost"} className="rounded-lg font-bold">Cloud Density</Button>
                                    <Button onClick={() => setWeatherLayer("temp_new")} size="sm" variant={weatherLayer === "temp_new" ? "secondary" : "ghost"} className="rounded-lg font-bold">Thermal Scan</Button>
                                </motion.div>
                            )}
                         </div>

                        <div ref={mapContainerRef} className="h-[600px] w-full z-0 grayscale-[0.1] contrast-[1.05]" />
                    </Card>
                </div>

                {/* 4. DAILY FORECAST (Right Column) */}
                <div className="lg:col-span-4 space-y-12">
                    
                    {/* SATELLITE HUD CARDS */}
                    <div className="grid gap-8">
                        <Card className="rounded-[3.5rem] border-0 shadow-2xl bg-gradient-to-br from-[#106A3A] to-[#15803d] text-white p-10 relative overflow-hidden group">
                           <div className="absolute top-[-20%] left-[-20%] w-60 h-60 bg-white/10 rounded-full blur-[80px]" />
                            <div className="flex items-center justify-between mb-10 relative z-10">
                                <Satellite className="h-12 w-12 opacity-40 group-hover:rotate-45 transition-transform duration-700" />
                                <Badge className="bg-white/20 border-0 font-black italic tracking-widest px-5 py-2 rounded-xl text-[10px]">REAL-TIME SCAN</Badge>
                            </div>
                            <div className="space-y-3 mb-10 relative z-10">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] opacity-60">Vegetation Index (NDVI)</h4>
                                <div className="flex items-end gap-4">
                                    <span className="text-7xl font-black italic tracking-tighter">{(weather.satellite?.ndvi || 0.65).toFixed(3)}</span>
                                    <Leaf className="h-12 w-12 text-emerald-300 mb-3 animate-pulse" />
                                </div>
                            </div>
                            <div className="space-y-3 relative z-10">
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-60">
                                    <span>Plant Stress</span>
                                    <span>Optimal Vigor</span>
                                </div>
                                <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden shadow-inner">
                                     <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(weather.satellite?.ndvi || 0.65) * 100}%` }}
                                        transition={{ duration: 2, ease: "circOut" }}
                                        className="h-full bg-emerald-400 rounded-full shadow-[0_0_20px_rgba(52,211,153,0.6)]"
                                     />
                                </div>
                            </div>
                        </Card>

                        <Card className="rounded-[3.5rem] border-0 shadow-2xl bg-white dark:bg-slate-900 p-10 group transition-all hover:translate-y-[-5px]">
                            <div className="flex items-center justify-between mb-8">
                                <Waves className="h-10 w-10 text-blue-500 group-hover:animate-bounce" />
                                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 italic">Soil Moisture Metric</span>
                            </div>
                            <div className="flex items-center gap-7">
                                <span className="text-6xl font-black text-slate-800 dark:text-white italic tracking-tighter leading-none">
                                    {(weather.satellite?.soil?.moisture || 35).toFixed(1)}%
                                </span>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-emerald-500 uppercase tracking-widest">Hydration Balance</p>
                                    <p className="text-[11px] font-bold text-slate-400 italic">Optimal for Cultivation</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <h3 className="text-4xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter px-6">10-Day Horizon</h3>
                    <div className="bg-white dark:bg-slate-900 rounded-[4.5rem] shadow-2xl border border-slate-50 dark:border-slate-800 overflow-hidden">
                        {weather.daily.map((day, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={cn(
                                    "flex items-center justify-between p-8 last:border-0 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 transition-colors cursor-default group",
                                    i === 0 && "bg-emerald-50/20"
                                )}
                            >
                                <div className="flex items-center gap-8">
                                    <p className="w-12 text-[11px] font-black text-slate-400 uppercase tracking-widest">{i === 0 ? "NOW" : formatDate(day.dt).split(",")[0].substring(0,3).toUpperCase()}</p>
                                    <div className="group-hover:scale-125 transition-transform duration-300">
                                        {getWeatherIcon(day.weather[0]?.main, "h-10 w-10")}
                                    </div>
                                </div>
                                <div className="flex-1 px-4 text-center">
                                     {day.pop > 0.3 && <p className="text-[11px] font-black text-blue-500 italic uppercase tracking-tighter">Rain Prob: {Math.round(day.pop * 100)}%</p>}
                                </div>
                                <div className="flex items-center gap-8 w-28 justify-end">
                                    <span className="text-2xl font-black text-slate-800 dark:text-white italic">{Math.round(day.temp.max)}°</span>
                                    <span className="text-xl font-bold text-slate-300 italic">{Math.round(day.temp.min)}°</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* PRECISION STATS CARD */}
                    <Card className="rounded-[4.5rem] border-0 shadow-3xl bg-slate-950 text-white p-12 space-y-10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                         <div className="flex justify-between items-center bg-white/5 backdrop-blur-xl p-8 rounded-[3rem] border border-white/5">
                            <div className="flex items-center gap-5">
                                <Sunrise className="h-8 w-8 text-amber-500" />
                                <div>
                                    <p className="text-[11px] font-black opacity-40 uppercase tracking-[0.2em]">Solar Peak</p>
                                    <p className="text-2xl font-black italic tracking-tight">{formatTime(weather.current?.sunrise || 0)}</p>
                                </div>
                            </div>
                            <div className="h-12 w-[1px] bg-white/10" />
                            <div className="flex items-center gap-5 text-right">
                                <div>
                                    <p className="text-[11px] font-black opacity-40 uppercase tracking-[0.2em]">Nightfall</p>
                                    <p className="text-2xl font-black italic tracking-tight">{formatTime(weather.current?.sunset || 0)}</p>
                                </div>
                                <Sunset className="h-8 w-8 text-orange-500" />
                            </div>
                         </div>

                         <div className="grid grid-cols-2 gap-8">
                            <div className="p-8 bg-white/5 rounded-[3rem] space-y-3 border border-white/5 group-hover:bg-white/10 transition-colors">
                                <Gauge className="h-8 w-8 text-indigo-400 opacity-40" />
                                <div>
                                    <p className="text-[11px] font-black opacity-40 uppercase tracking-[0.3em]">Barometric</p>
                                    <p className="text-2xl font-black italic tracking-tighter">{weather.current?.pressure}<span className="text-xs opacity-40 ml-1">hPa</span></p>
                                </div>
                            </div>
                            <div className="p-8 bg-white/5 rounded-[3rem] space-y-3 border border-white/5 group-hover:bg-white/10 transition-colors">
                                <Eye className="h-8 w-8 text-blue-400 opacity-40" />
                                <div>
                                    <p className="text-[11px] font-black opacity-40 uppercase tracking-[0.3em]">Sight Range</p>
                                    <p className="text-2xl font-black italic tracking-tighter">{(weather.current?.visibility || 0) / 1000}<span className="text-xs opacity-40 ml-1">km</span></p>
                                </div>
                            </div>
                         </div>
                    </Card>
                </div>
            </div>

          </motion.div>
        ) : error ? (
            <div className="flex flex-col items-center justify-center py-40 border-4 border-dashed border-rose-100 rounded-[5rem] bg-rose-50 text-center px-10 space-y-10">
                <div className="h-32 w-32 bg-white rounded-full flex items-center justify-center shadow-xl">
                    <AlertTriangle className="h-16 w-16 text-rose-500 animate-pulse" />
                </div>
                <div className="space-y-3">
                    <h3 className="text-5xl font-black text-rose-600 tracking-tighter uppercase italic leading-none">Feed Synchronization Failed</h3>
                    <p className="text-slate-500 font-bold max-w-md italic text-lg">{error}</p>
                </div>
                <Button onClick={getLocationAndFetch} className="h-20 px-16 rounded-[2.5rem] bg-rose-600 text-white font-black hover:scale-105 transition-all shadow-3xl text-lg tracking-tight uppercase italic">Re-Establish Lock</Button>
            </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-40 bg-white/80 backdrop-blur-3xl rounded-[6rem] border-2 border-white shadow-[0_50px_100px_rgba(0,0,0,0.1)] text-center px-10"
          >
            <div className="h-36 w-36 bg-emerald-50 rounded-[3rem] flex items-center justify-center mb-10 shadow-inner group transition-all hover:scale-110">
                <Navigation className="h-16 w-16 text-emerald-600 animate-bounce group-hover:text-emerald-700" />
            </div>
            <div className="space-y-5 max-w-lg mb-16">
                <h3 className="text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">Hyper-Precision Agri-Intel</h3>
                <p className="text-slate-500 font-bold italic text-xl">Establish satellite coordinate lock to activate production-grade atmospheric and vegetation metrics.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
                <Button onClick={getLocationAndFetch} className="h-24 px-16 rounded-[3rem] bg-emerald-600 hover:bg-emerald-700 shadow-[0_30px_60px_rgba(16,106,58,0.3)] text-xl font-black italic tracking-tighter transition-all hover:translate-y-[-5px] active:translate-y-[2px]">SYNC COORDINATES</Button>
                <Button variant="outline" onClick={() => setShowManualInput(true)} className="h-24 px-16 rounded-[3rem] border-0 shadow-2xl bg-white font-black text-xl italic tracking-tighter transition-all hover:translate-y-[-5px] active:translate-y-[2px]">MANUAL OVERRIDE</Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
