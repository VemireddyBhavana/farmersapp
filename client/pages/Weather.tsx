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
import WeatherSidebar from "@/components/weather/WeatherSidebar";
import CropImpact from "@/components/weather/CropImpact";
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
    <div className="relative min-h-screen bg-[#020617] transition-colors duration-1000 selection:bg-emerald-500/30 overflow-hidden font-sans flex">
      <WeatherBackground condition={weather?.current.weather[0].main || "Clear"} />
      
      <WeatherSidebar />

      <div className="flex-1 ml-24 relative z-10 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="h-24 px-12 flex items-center justify-between border-b border-white/5 bg-[#020617]/40 backdrop-blur-3xl sticky top-0 z-50">
            <div className="flex items-center gap-12">
                <div className="space-y-1">
                    <p className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.4em]">Environmental Intelligence</p>
                    <h1 className="text-xl font-black text-white tracking-tighter uppercase italic flex items-center gap-3">
                        <span className="text-white/40">Status:</span> Live Feed <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    </h1>
                </div>

                <div className="relative hidden md:block">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                    <input 
                        type="text" 
                        placeholder="Search for regional telemetry..." 
                        className="bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 py-3 w-80 text-xs font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/30 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-8">
                <button className="h-12 w-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-emerald-500 transition-all relative">
                    <FiBell className="text-xl" />
                    <div className="absolute top-3 right-3 h-2 w-2 bg-red-500 rounded-full border-2 border-[#020617]" />
                </button>
                <div className="flex items-center gap-4 pl-8 border-l border-white/5">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Farmer Admin</p>
                        <p className="text-[8px] font-medium text-emerald-500/60 uppercase tracking-widest mt-1">NSSA0002</p>
                    </div>
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-[1px]">
                        <div className="h-full w-full rounded-2xl bg-[#020617] flex items-center justify-center overflow-hidden">
                            <img src="https://i.pravatar.cc/150?u=farmer" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <main className="px-12 py-10 max-w-[1800px]">
            {error ? (
            <div className="max-w-2xl mx-auto py-32 text-center space-y-8 bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-red-500/10 p-20">
                <span className="text-7xl block">⛈️</span>
                <h2 className="text-3xl font-light text-white tracking-widest uppercase">Atmospheric Conflict</h2>
                <p className="text-white/40 max-w-md mx-auto">{error}</p>
                <Button onClick={getLocationAndFetch} className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-12 h-16 uppercase tracking-widest text-xs font-black">Re-Sync</Button>
            </div>
            ) : weather ? (
            <div className="grid grid-cols-12 gap-10">
                {/* Left Pod: Weather Hero & Primary Charts */}
                <div className="col-span-12 lg:col-span-8 space-y-10">
                    <WeatherHero weather={weather} location={weather.locationName || weather.location} />
                    
                    <div className="grid grid-cols-2 gap-10">
                        <div className="p-10 rounded-[4rem] bg-white/5 backdrop-blur-[60px] border border-white/5 shadow-xl">
                            <div className="flex items-center justify-between mb-10">
                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Atmospheric Trends</p>
                            </div>
                            <HourlyChart hourly={weather.hourly} />
                        </div>
                        <div className="p-10 rounded-[4rem] bg-white/5 backdrop-blur-[60px] border border-white/5 shadow-xl overflow-hidden relative group">
                            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-8">Satellite Imagery</p>
                            <div className="aspect-video rounded-[2.5rem] bg-black/40 overflow-hidden relative">
                                <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Satellite" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-6 left-6">
                                    <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Sector A-4</p>
                                    <p className="text-[8px] text-white/40 uppercase tracking-[0.3em]">GPS: {weather.lat.toFixed(4)}, {weather.lon.toFixed(4)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <WeatherAnalytics weather={weather} />
                    <CropImpact weather={weather} />
                    <SoilAnalytics weather={weather} />
                    <AIRecommendations weather={weather} />
                    <ForecastCards daily={weather.daily} />
                </div>

                {/* Right Pod: Telemetry & Alerts */}
                <div className="col-span-12 lg:col-span-4 space-y-10">
                    <div className="p-8 rounded-[3rem] bg-white/5 border border-white/5 shadow-xl">
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-8">System Telemetry</p>
                        <WeatherWidgets weather={weather} />
                    </div>
                    
                    <div className="p-8 rounded-[3rem] bg-white/5 border border-white/5 shadow-xl">
                        <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] mb-8">Alert Protocol</p>
                        <FarmerAlerts weather={weather} />
                    </div>

                    {/* Operational Summary */}
                    <div className="p-10 rounded-[4rem] bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 shadow-xl space-y-6">
                        <h4 className="text-xl font-black text-white tracking-tighter italic uppercase">Daily Ops <span className="text-emerald-500">Summary</span></h4>
                        <div className="space-y-4">
                            {[
                                { label: 'Crop Health', value: '94%', color: 'bg-emerald-500' },
                                { label: 'Soil Water', value: '72%', color: 'bg-blue-500' },
                                { label: 'Pest Risk', value: 'LOW', color: 'bg-emerald-500/40' },
                            ].map(stat => (
                                <div key={stat.label} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{stat.label}</span>
                                        <span className="text-xs font-black text-white">{stat.value}</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className={`h-full ${stat.color} rounded-full`} style={{ width: stat.value.includes('%') ? stat.value : '20%' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 py-4 rounded-2xl border border-emerald-500/30 text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
                            Review Protocols
                        </button>
                    </div>
                </div>
            </div>
            ) : null}
        </main>
      </div>
    </div>
  );
};

export default Weather;
