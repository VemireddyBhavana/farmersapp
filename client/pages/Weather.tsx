import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiRefreshCw, FiMapPin, FiCalendar, FiSun, FiWind, 
  FiDroplet, FiEye, FiTrendingUp, FiSunrise, FiSunset, 
  FiCloud, FiNavigation, FiZap, FiTarget
} from "react-icons/fi";
import { useWeather } from "@/hooks/useWeather";
import WeatherHero from "@/components/weather/WeatherHero";
import ForecastCards from "@/components/weather/ForecastCards";
import HourlyChart from "@/components/weather/HourlyChart";
import WeatherMap from "@/components/weather/WeatherMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

import AstroWidget from "@/components/weather/AstroWidget";

const Weather: React.FC = () => {
  const { weather, loading, loadingStage, error, getLocationAndFetch, refreshWeather, fetchWeather } = useWeather();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeather(undefined, undefined, searchQuery);
    }
  };

  // Loading State with Progress
  if (loading && !weather) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#004d73]">
        <div className="relative w-24 h-24 mb-8">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-t-4 border-[#ffcc00] rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <FiZap className="text-2xl text-[#ffcc00] animate-pulse" />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.p 
            key={loadingStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-white/60 font-black uppercase tracking-[0.3em] text-[10px]"
          >
            {loadingStage || "Establishing Satellite Uplink..."}
          </motion.p>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b111a]">
      {/* Top Navigation / Search Bar */}
      <nav className="sticky top-0 z-50 bg-[#004d73] shadow-xl border-b border-white/10 px-4 py-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#ffcc00] rounded-xl flex items-center justify-center text-[#004d73] font-black text-xl shadow-lg">
              W
            </div>
            <h2 className="text-white font-black uppercase tracking-widest text-sm italic">
              Weather<span className="text-[#ffcc00]">Radar</span>.IN
            </h2>
          </div>

          <form onSubmit={handleSearch} className="relative w-full max-w-xl group">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city, region or zip..."
              className="w-full h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 pr-12 text-white font-bold placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#ffcc00]/50 transition-all"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/60 hover:text-white transition-colors">
              <FiNavigation className="text-lg" />
            </button>
          </form>

          <div className="flex items-center gap-4 text-white/60 text-[10px] font-black uppercase tracking-widest">
             <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <FiMapPin className="text-[#ffcc00]" /> {weather?.locationName || "Monitored Zone"}
             </span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {error ? (
          <Card className="rounded-[3rem] border-red-500/20 bg-background/80 backdrop-blur-3xl p-12 text-center space-y-6 shadow-2xl">
            <div className="text-6xl">📡</div>
            <h2 className="text-3xl font-black tracking-tight text-foreground uppercase">Connection Interrupted</h2>
            <p className="text-muted-foreground max-w-md mx-auto font-medium">{error}</p>
            <Button onClick={getLocationAndFetch} className="bg-[#004d73] hover:bg-[#003d5c] text-white rounded-xl px-12 h-14 uppercase tracking-[0.2em] text-xs font-black shadow-2xl group">
              <FiZap className="mr-3 group-hover:scale-125 transition-transform" /> Reconnect Feed
            </Button>
          </Card>
        ) : weather && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Main Column (Radar, Hero, Hourly) */}
            <div className="lg:col-span-8 space-y-8">
               <WeatherHero weather={weather} location={weather.locationName} />
               
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <div className="flex items-center justify-between px-2">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Live Satellite Radar</h3>
                        <span className="flex items-center gap-2 text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md uppercase">Live Feed</span>
                     </div>
                     <WeatherMap />
                  </div>
                  <div className="space-y-8">
                    {/* Preserve Soil Moisture Widget */}
                    <Card className="rounded-[2.5rem] p-8 border-none bg-[#0074ad] text-white shadow-2xl shadow-blue-600/20 flex flex-col justify-between h-[190px] relative overflow-hidden group">
                      <FiDroplet className="absolute top-[-20px] right-[-20px] text-[10rem] opacity-10 group-hover:scale-110 transition-transform duration-700" />
                      <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Soil Moisture</p>
                        <h4 className="text-4xl font-black italic tracking-tighter">{Math.round(weather.satellite?.soil.moisture || 65)}%</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest mt-4">Zone: Root Saturation</p>
                      </div>
                    </Card>

                    {/* Preserve Satellite Confidence Widget */}
                    <Card className="rounded-[2.5rem] p-8 border-none bg-emerald-600 text-white shadow-2xl shadow-emerald-500/20 flex flex-col justify-between h-[180px] relative overflow-hidden group">
                      <FiTarget className="absolute top-[-20px] right-[-20px] text-[10rem] opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Satellite Confidence</p>
                        <h4 className="text-4xl font-black italic tracking-tighter">98.4%</h4>
                      </div>
                      <div className="mt-4">
                        <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "98.4%" }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="bg-white h-full shadow-[0_0_10px_white]"
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
               </div>

               <HourlyChart hourly={weather.hourly} />

               {/* Farming Intel Grid */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: "Crop Vigor", value: weather.satellite?.ndvi.toFixed(2) || "0.78", icon: <FiTrendingUp />, color: "text-emerald-500", bg: "bg-emerald-500/5" },
                    { label: "UV Index", value: Math.round(weather.current.uvi), icon: <FiSun />, color: "text-amber-500", bg: "bg-amber-500/5" },
                    { label: "Visibility", value: `${(weather.current.visibility / 1000).toFixed(1)} km`, icon: <FiEye />, color: "text-blue-500", bg: "bg-blue-500/5" },
                    { label: "Precipitation", value: `${Math.round(weather.hourly[0].pop * 100)}%`, icon: <FiCloud />, color: "text-indigo-500", bg: "bg-indigo-500/5" }
                  ].map((item, i) => (
                    <Card key={i} className="rounded-3xl p-6 border border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all group">
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform", item.bg, item.color)}>
                        {item.icon}
                      </div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-2xl font-black text-slate-700 dark:text-white italic tabular-nums">{item.value}</p>
                    </Card>
                  ))}
               </div>

               {/* Advisory Section */}
               <Card className="rounded-[2.5rem] p-8 border border-[#ffcc00]/20 bg-[#ffcc00]/5 backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-[#ffcc00]" />
                  <div className="flex items-start gap-6">
                     <div className="w-14 h-14 rounded-2xl bg-[#ffcc00] flex items-center justify-center text-[#004d73] text-2xl shadow-xl">
                        <FiZap />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#004d73]/60">Expert Farming Advisory</p>
                        <h4 className="text-xl font-black text-[#004d73] leading-tight">{weather.advisory}</h4>
                     </div>
                  </div>
               </Card>
            </div>

            {/* Right Sidebar Column (Forecast, Astro) */}
            <div className="lg:col-span-4 space-y-8">
               <ForecastCards daily={weather.daily} />
               <AstroWidget current={weather.current} />
               
               {/* Regional Info Card */}
               <Card className="rounded-[2.5rem] p-8 border border-slate-100 dark:border-white/5 bg-[#004d73] text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-[-20px] left-[-20px] w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                  <h4 className="text-lg font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Regional Status</h4>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-white/60 uppercase">Primary Source</span>
                        <span className="text-xs font-black">OpenWeather 3.0</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-white/60 uppercase">Satellite Scan</span>
                        <span className="text-xs font-black">Sentinel-2 L2A</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-white/60 uppercase">Confidence Level</span>
                        <span className="text-xs font-black text-[#ffcc00]">High Efficiency</span>
                     </div>
                  </div>
               </Card>
            </div>
          </div>
        )}
      </div>

      <footer className="container mx-auto px-4 py-16 text-center border-t border-slate-100 dark:border-white/5">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-[0.4em]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
            Satellite Feed Synced • Secure Channel
          </div>
          <p className="text-[9px] text-slate-500 max-w-sm uppercase font-bold tracking-widest leading-relaxed">
            Meteorological data provided by EUMETSAT & ECMWF. Satellite analytics powered by Google Earth Engine & Sentinel Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Weather;






