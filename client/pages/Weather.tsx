import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBell, FiUser, FiSearch, FiRefreshCw, FiNavigation } from "react-icons/fi";
import { useWeather } from "@/hooks/useWeather";
import WeatherBackground from "@/components/weather/WeatherBackground";
import WeatherHero from "@/components/weather/WeatherHero";
import ForecastCards from "@/components/weather/ForecastCards";
import HourlyChart from "@/components/weather/HourlyChart";
import FarmerAlerts from "@/components/weather/FarmerAlerts";
import AIRecommendations from "@/components/weather/AIRecommendations";
import WeatherWidgets from "@/components/weather/WeatherWidgets";
import WeatherAnalytics from "@/components/weather/WeatherAnalytics";
import SoilAnalytics from "@/components/weather/SoilAnalytics";
import { Button } from "@/components/ui/button";

const Weather: React.FC = () => {
  const { weather, loading, error, getLocationAndFetch, refreshWeather } = useWeather();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Sunrise Phase");
    else if (hour < 18) setGreeting("Solar Peak");
    else setGreeting("Eventide Phase");
  }, []);

  if (loading && !weather) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] flex flex-col items-center justify-center p-6 space-y-12 transition-colors duration-1000">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-40 h-40 border-[0.5px] border-emerald-500/20 border-t-emerald-500 rounded-full flex items-center justify-center relative"
        >
          <div className="absolute inset-4 border-[0.5px] border-emerald-500/10 rounded-full animate-reverse-spin" />
          <span className="text-5xl">🛰️</span>
        </motion.div>
        <div className="text-center space-y-3">
          <h2 className="text-emerald-950 dark:text-white text-3xl font-light tracking-[0.3em] uppercase">Synchronizing</h2>
          <p className="text-emerald-600/40 dark:text-emerald-400/40 text-[10px] font-black uppercase tracking-[0.5em]">Establishing Orbital Link</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-20 bg-[#f8fafc] dark:bg-[#020617] transition-colors duration-1000 selection:bg-emerald-500/30 overflow-hidden font-sans">
      <WeatherBackground condition={weather?.current.weather[0].main || "Clear"} />

      {/* Minimal Header */}
      <div className="relative z-20 container mx-auto px-12 pt-12">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
        >
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            <h1 className="text-emerald-950 dark:text-white font-black text-2xl tracking-[0.3em] uppercase italic">Weather</h1>
        </motion.div>
      </div>

      <main className="container mx-auto px-8 lg:px-20 py-8 max-w-[1600px] relative z-10">
        {error ? (
          <div className="max-w-2xl mx-auto py-32 text-center space-y-8 bg-white/50 dark:bg-black/50 backdrop-blur-3xl rounded-[4rem] border border-red-500/10 p-20">
            <span className="text-7xl block">⛈️</span>
            <h2 className="text-3xl font-light text-emerald-950 dark:text-white tracking-widest uppercase">Atmospheric Conflict</h2>
            <p className="text-black/40 dark:text-white/40 max-w-md mx-auto">{error}</p>
            <Button onClick={getLocationAndFetch} className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-12 h-16 uppercase tracking-widest text-xs font-black">Re-Sync</Button>
          </div>
        ) : weather ? (
          <div className="grid grid-cols-12 gap-10">
            {/* Left Column: Technical Readouts */}
            <div className="col-span-12 lg:col-span-3 space-y-10">
              <div className="p-8 rounded-[3rem] bg-white/40 dark:bg-white/[0.03] backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-sm">
                <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.4em] mb-6">Atmospheric Telemetry</p>
                <WeatherWidgets weather={weather} />
              </div>
            </div>

            {/* Middle Column: Central Command */}
            <div className="col-span-12 lg:col-span-6 space-y-10">
              <WeatherHero weather={weather} location={weather.locationName || weather.location} />
              <div className="p-10 rounded-[4rem] bg-white/40 dark:bg-white/[0.03] backdrop-blur-[60px] border border-white/20 dark:border-white/5 shadow-xl">
                 <div className="flex items-center justify-between mb-10">
                    <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.4em]">Atmospheric Trends</p>
                    <div className="flex gap-4">
                       <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[10px] text-black/40 dark:text-white/40 font-black uppercase tracking-widest">Real-time Feed</span>
                    </div>
                 </div>
                 <HourlyChart hourly={weather.hourly} />
              </div>
            </div>

            {/* Right Column: Forecast & Alerts */}
            <div className="col-span-12 lg:col-span-3 space-y-10">
               <div className="p-8 rounded-[3rem] bg-white/40 dark:bg-white/[0.03] backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-sm">
                <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.4em] mb-6">Alert Protocol</p>
                <FarmerAlerts weather={weather} />
              </div>
              <div className="p-8 rounded-[3rem] bg-emerald-500/[0.02] dark:bg-emerald-500/[0.05] backdrop-blur-3xl border border-emerald-500/10 shadow-sm relative overflow-hidden group">
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                 <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.4em] mb-6">Orbital View</p>
                 <div className="aspect-square rounded-[2rem] bg-black/20 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Satellite" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                       <p className="text-[9px] font-black text-white uppercase tracking-widest">Zone A-12</p>
                       <p className="text-[7px] text-white/40 uppercase tracking-[0.3em]">Lat: {weather.lat.toFixed(4)} | Lon: {weather.lon.toFixed(4)}</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Bottom: Analytics, Insights & Extended Forecast */}
            <div className="col-span-12 mt-10 space-y-32">
               <WeatherAnalytics weather={weather} />
               <SoilAnalytics weather={weather} />
               <AIRecommendations weather={weather} />
               <ForecastCards daily={weather.daily} />
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default Weather;
