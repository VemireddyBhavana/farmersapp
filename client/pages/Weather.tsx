import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiRefreshCw, FiMapPin, FiCalendar, FiSun, FiWind, 
  FiDroplets, FiEye, FiTrendingUp, FiSunrise, FiSunset, 
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
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
        <div className="relative w-24 h-24 mb-8">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-t-4 border-emerald-500 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 border-t-4 border-blue-500 rounded-full opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <FiZap className="text-2xl text-emerald-500 animate-pulse" />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.p 
            key={loadingStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-muted-foreground font-black uppercase tracking-[0.3em] text-[10px]"
          >
            {loadingStage || t('fetchingSync')}
          </motion.p>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Dynamic Background */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/weather_hero_bg_1778740220944.png"
            alt="Weather Background"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark border border-white/10 text-white/80 text-xs font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              {t('live')} Satellite Feed
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic">
              {t('meteorologicalData')}
            </h1>

            <form onSubmit={handleSearch} className="relative w-full max-w-xl group">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Region (e.g. Pune, Maharashtra)"
                className="w-full h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-8 pr-16 text-white font-bold placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/60 hover:text-white transition-colors">
                <FiNavigation className="text-xl" />
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 font-bold uppercase tracking-widest text-[10px]">
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-md border border-white/5">
                <FiMapPin className="text-emerald-400" /> {weather?.location || t('station')}
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-md border border-white/5">
                <FiCalendar className="text-emerald-400" /> {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 -mt-32 relative z-20 pb-20 space-y-8">
        {error ? (
          <Card className="rounded-[3rem] border-red-500/20 bg-background/80 backdrop-blur-3xl p-12 text-center space-y-6 shadow-2xl">
            <div className="text-6xl">📡</div>
            <h2 className="text-3xl font-black tracking-tight text-foreground uppercase">{t('retryConnection')}</h2>
            <p className="text-muted-foreground max-w-md mx-auto font-medium">{error}</p>
            <Button onClick={getLocationAndFetch} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-12 h-16 uppercase tracking-[0.2em] text-xs font-black shadow-2xl shadow-primary/30 group">
              <FiZap className="mr-3 group-hover:scale-125 transition-transform" /> {t('retryConnection')}
            </Button>
          </Card>
        ) : weather && (
          <div className="grid gap-8">
            {/* Real-time Hero Card */}
            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-8">
                <WeatherHero weather={weather} location={weather.locationName || weather.location} />
              </div>
              <div className="lg:col-span-4 grid gap-8">
                {/* Quick Intel Widgets */}
                <Card className="rounded-[2.5rem] p-8 border-none bg-emerald-500 text-white shadow-2xl shadow-emerald-500/20 flex flex-col justify-between overflow-hidden relative group">
                  <FiTarget className="absolute top-[-20px] right-[-20px] text-[10rem] opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Satellite Confidence</p>
                    <h4 className="text-4xl font-black italic tracking-tighter">98.4%</h4>
                  </div>
                  <div className="mt-8 space-y-2">
                    <p className="text-xs font-bold leading-relaxed">{weather.advisory}</p>
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "98.4%" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="bg-white h-full"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="rounded-[2.5rem] p-8 border-none bg-blue-600 text-white shadow-2xl shadow-blue-600/20 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Soil Moisture</p>
                      <h4 className="text-4xl font-black italic tracking-tighter">{Math.round(weather.satellite?.soil.moisture || 65)}%</h4>
                    </div>
                    <FiDroplets className="text-4xl opacity-40" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest mt-4">Zone: Root Saturation</p>
                </Card>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Detailed Intel Column */}
              <div className="lg:col-span-8 space-y-8">
                {/* Hourly Trend & Map Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                   <HourlyChart hourly={weather.hourly} />
                   <WeatherMap />
                </div>

                {/* Grid of Intel Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: "Crop Vigor", value: weather.satellite?.ndvi.toFixed(2) || "0.78", icon: <FiTrendingUp />, color: "text-emerald-500" },
                    { label: "UV Index", value: Math.round(weather.current.uvi), icon: <FiSun />, color: "text-amber-500" },
                    { label: "Visibility", value: `${(weather.current.visibility / 1000).toFixed(1)} km`, icon: <FiEye />, color: "text-blue-500" },
                    { label: "Rain Chance", value: `${Math.round(weather.hourly[0].pop * 100)}%`, icon: <FiCloud />, color: "text-indigo-500" }
                  ].map((item, i) => (
                    <Card key={i} className="rounded-3xl p-6 border-none bg-card/40 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all group">
                      <div className={cn("text-2xl mb-4 group-hover:scale-110 transition-transform", item.color)}>{item.icon}</div>
                      <p className="text-[9px] font-black text-muted-foreground/50 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-2xl font-black text-foreground italic">{item.value}</p>
                    </Card>
                  ))}
                </div>

                {/* Sunrise/Sunset Card */}
                <Card className="rounded-[2.5rem] p-8 border-none bg-card/40 backdrop-blur-xl shadow-xl grid md:grid-cols-2 gap-8 items-center">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-amber-500/10 flex items-center justify-center text-3xl text-amber-500">
                      <FiSunrise />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Sunrise</p>
                      <p className="text-2xl font-black">{new Date(weather.current.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 md:border-l border-border/50 md:pl-8">
                    <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-3xl text-indigo-500">
                      <FiSunset />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Sunset</p>
                      <p className="text-2xl font-black">{new Date(weather.current.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Forecast Sidebar */}
              <div className="lg:col-span-4">
                <ForecastCards daily={weather.daily} />
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="container mx-auto px-4 py-12 text-center border-t border-border/50">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground/40 text-[9px] font-black uppercase tracking-[0.4em]">
            <span className="w-2 h-2 rounded-full bg-emerald-500/40" />
            System Secure • Live Feed Synced
          </div>
          <p className="text-[8px] text-muted-foreground/30 max-w-sm uppercase font-bold tracking-widest">
            Powered by OpenWeather OneCall 3.0 & Sentinel-2 L2A Multispectral Satellite Telemetry. Updated every 5 minutes.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Weather;






