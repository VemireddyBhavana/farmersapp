import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiRefreshCw, FiMapPin, FiCalendar, FiSun, FiWind, 
  FiDroplet, FiEye, FiTrendingUp, FiSunrise, FiSunset, 
  FiCloud, FiNavigation, FiZap, FiTarget, FiChevronRight,
  FiClock, FiCloudRain, FiArrowUp, FiPlay
} from "react-icons/fi";
import { useWeather } from "@/hooks/useWeather";
import WeatherHero from "@/components/weather/WeatherHero";
import ForecastCards from "@/components/weather/ForecastCards";
import HourlyChart from "@/components/weather/HourlyChart";
import WeatherMap from "@/components/weather/WeatherMap";
import CropImpact from "@/components/weather/CropImpact";
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

  if (loading && !weather) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#004d73]">
        <FiZap className="text-4xl text-[#ffcc00] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f2f3] dark:bg-[#0b111a] font-['Open_Sans']">
      {/* Exact Header Style */}
      <nav className="bg-[#004d73] shadow-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
             <div className="text-white font-black text-xl tracking-tighter italic flex items-center gap-1">
                {t("weatherRadarTitle")}
             </div>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative group">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full h-10 bg-white border-none rounded px-4 text-sm font-bold text-[#333] focus:ring-2 focus:ring-[#ffcc00] transition-all"
            />
            <button type="submit" className="absolute right-0 top-0 h-10 w-12 bg-[#ffcc00] rounded-r flex items-center justify-center text-[#004d73] hover:bg-[#ffb300] transition-colors">
              <FiNavigation className="text-lg" />
            </button>
          </form>

          <div className="hidden md:flex items-center gap-6 text-white text-[11px] font-bold uppercase tracking-wider">
             <a href="#" className="hover:text-[#ffcc00]">{t("navRain")}</a>
             <a href="#" className="hover:text-[#ffcc00]">{t("navWind")}</a>
             <a href="#" className="hover:text-[#ffcc00]">{t("navRadar")}</a>
             <a href="#" className="hover:text-[#ffcc00]">{t("nav14Day")}</a>
          </div>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-[11px] font-bold text-slate-400">
         <span className="hover:text-[#004d73] cursor-pointer">{t("world")}</span>
         <FiChevronRight />
         <span className="hover:text-[#004d73] cursor-pointer">{weather?.country || 'India'}</span>
         <FiChevronRight />
         <span className="text-[#004d73]">{weather?.locationName}</span>
      </div>

      <div className="container mx-auto px-4 py-4">
        {error ? (
          <Card className="rounded-xl p-12 text-center space-y-6 bg-white shadow-sm border-none">
            <h2 className="text-2xl font-black text-[#004d73] uppercase tracking-tight">{t("feedInterrupted")}</h2>
            <Button onClick={getLocationAndFetch} className="bg-[#004d73] hover:bg-[#003a57] text-white rounded px-8">{t("retry")}</Button>
          </Card>
        ) : weather && (
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-6">
               <WeatherHero weather={weather} location={weather.locationName} />
               
               <CropImpact />
               
               <HourlyChart hourly={weather.hourly} />

               <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                     <h3 className="text-sm font-bold text-[#004d73] dark:text-white">{t("weatherRadarSection")}</h3>
                     <a href="#" className="text-xs font-bold text-blue-500 hover:underline">{t("interactiveMap")}</a>
                  </div>
                  <WeatherMap />
               </div>

               <ForecastCards daily={weather.daily} />
               
               {/* Health & Pollen (Mimicking the reference style) */}
               <div className="grid md:grid-cols-2 gap-6">
                  <Card className="rounded-xl bg-white dark:bg-slate-900 shadow-sm border-none p-6">
                     <h4 className="text-sm font-bold text-[#333] dark:text-white mb-6 flex items-center gap-2">
                        <FiDroplet className="text-blue-500" /> {t("aqiPollen")}
                     </h4>
                     <div className="space-y-6">
                        <div className="flex items-center justify-between">
                           <span className="text-xs font-bold text-slate-500 uppercase">{t("aqiIndex")}</span>
                           <span className="text-sm font-black text-[#ff9900]">260 {t("aqiPoor")}</span>
                        </div>
                        <div className="space-y-4">
                           {['grass', 'birch', 'ragweed'].map((type, i) => (
                             <div key={i} className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                                   <span>{t(type)}</span>
                                   <span>{i === 0 ? t("low") : t("none")}</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                   <div className={cn("h-full rounded-full", i === 0 ? "bg-emerald-500 w-1/4" : "bg-slate-200 w-0")} />
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>
                  </Card>
                  
                  <Card className="rounded-xl bg-white dark:bg-slate-900 shadow-sm border-none p-6">
                     <h4 className="text-sm font-bold text-[#333] dark:text-white mb-6 flex items-center gap-2">
                        <FiSun className="text-amber-500" /> {t("uvIndex")}
                     </h4>
                     <div className="space-y-8 pt-4">
                        <div className="relative h-2 w-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 rounded-full">
                           <div className="absolute top-[-12px] left-[70%] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#333] dark:border-t-white" />
                           <div className="absolute top-4 left-[70%] -translate-x-1/2 text-center">
                              <p className="text-lg font-black text-[#333] dark:text-white">8</p>
                              <p className="text-[10px] font-bold text-red-500 uppercase">{t("veryHigh")}</p>
                           </div>
                        </div>
                        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed pt-8">
                           {t("uvProtectionAdvice")}
                        </p>
                     </div>
                  </Card>
               </div>
            </div>

            {/* Side Column Widgets */}
            <div className="lg:col-span-4 space-y-6">
               <AstroWidget current={weather.current} />
               
               {/* Regional News / Text Section */}
               <Card className="rounded-xl bg-[#004d73] dark:bg-slate-800 text-white p-6 shadow-sm border-none overflow-hidden relative">
                  <FiZap className="absolute top-[-20px] right-[-20px] text-8xl opacity-10" />
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-4">{t("regionalWeatherNews")}</h4>
                  <p className="text-xs font-bold leading-relaxed text-white/80 italic mb-6">
                    "{t("heatwaveAlertText")}"
                  </p>
                  <Button className="w-full bg-[#ffcc00] text-[#004d73] font-black text-[11px] uppercase tracking-widest h-10 hover:bg-[#ffb300]">
                    {t("readMore")}
                  </Button>
               </Card>

               <Card className="rounded-xl bg-white dark:bg-slate-900 p-6 shadow-sm border-none">
                  <h4 className="text-sm font-bold text-[#333] dark:text-white mb-4">{t("nearbyLocations")}</h4>
                  <div className="space-y-4">
                     {[
                       { name: 'Gurgaon', temp: 37, icon: <FiSun /> },
                       { name: 'Noida', temp: 38, icon: <FiSun /> },
                       { name: 'Faridabad', temp: 37, icon: <FiCloud /> },
                       { name: 'Ghaziabad', temp: 39, icon: <FiSun /> }
                     ].map((loc, i) => (
                       <div key={i} className="flex items-center justify-between border-b border-slate-50 dark:border-white/5 pb-3 last:border-0 last:pb-0">
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{loc.name}</span>
                          <div className="flex items-center gap-3">
                             <span className="text-xs font-bold text-amber-500">{loc.icon}</span>
                             <span className="text-sm font-black text-[#333] dark:text-white">{loc.temp}°</span>
                          </div>
                       </div>
                     ))}
                  </div>
               </Card>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-[#004d73] text-white/40 py-12 mt-12">
         <div className="container mx-auto px-4 text-center space-y-4">
            <div className="text-white font-black text-lg tracking-tighter italic">
               {t("weatherRadarTitle")}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em]">{t("allRightsReserved")} • 2026</p>
            <p className="text-[10px] font-medium max-w-lg mx-auto leading-relaxed">
               {t("weatherDataSource")}
            </p>
         </div>
      </footer>
    </div>
  );
};

export default Weather;






