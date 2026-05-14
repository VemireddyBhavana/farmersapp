import React from "react";
import { motion } from "framer-motion";
import { 
  FiSun, FiCloud, FiPlay, FiChevronRight, FiSunrise, FiSunset
} from "react-icons/fi";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

interface WeatherHeroProps {
  weather: any;
  location: string;
}

const WeatherHero: React.FC<WeatherHeroProps> = ({ weather, location }) => {
  const { t } = useLanguage();
  if (!weather || !weather.current) return null;

  const current = weather.current;
  const description = current.weather?.[0]?.description || "stable";
  
  return (
    <Card className="rounded-xl border-none bg-gradient-to-br from-[#f5f7f8] to-[#e8eef2] dark:from-slate-800 dark:to-slate-900 text-[#333] dark:text-white p-6 md:p-8 shadow-sm overflow-hidden relative group h-full flex flex-col justify-between border border-slate-200 dark:border-white/5">
      {/* Top Section: City & Time */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#004d73] dark:text-white flex items-center gap-2">
            {location} · {weather.country || 'India'}
          </h1>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: '2-digit' })} {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
           <div className="bg-[#ff9900] text-white px-3 py-1 rounded-md text-[11px] font-black flex items-center gap-2 shadow-sm">
             <span>{Math.round(weather.current.aqi || 260)}</span>
             <span className="opacity-80 uppercase tracking-tighter">{t("aqiPoor")}</span>
           </div>
        </div>
      </div>

      {/* Middle Section: Temp & Description */}
      <div className="flex items-center justify-between py-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="absolute -top-6 left-0 bg-[#004d73] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">{t("now")}</div>
            <span className="text-[6rem] md:text-[8rem] font-black leading-none tracking-tighter text-[#333] dark:text-white tabular-nums">
              {Math.round(current.temp)}°
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-1">
             <div className="text-2xl font-bold text-slate-700 dark:text-white/90 capitalize leading-none">{description}</div>
             <div className="text-sm font-semibold text-slate-400 dark:text-slate-500">{t("feelsLike")} {Math.round(current.feels_like)}°</div>
          </div>
        </div>
        
        {/* Large Weather Icon Placeholder */}
        <div className="w-32 h-32 bg-white/40 dark:bg-white/5 rounded-3xl flex items-center justify-center text-6xl shadow-inner">
           {current.weather[0].main === 'Clear' ? <FiSun className="text-amber-500" /> : <FiCloud className="text-slate-400" />}
        </div>
      </div>

      {/* Bottom Section: 90min & Astro */}
      <div className="grid md:grid-cols-2 gap-4 border-t border-slate-200 dark:border-white/5 pt-6 mt-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-white/10 flex items-center justify-between group/90">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#004d73] rounded-full flex items-center justify-center text-white shadow-lg group-hover/90:scale-110 transition-transform">
                 <FiPlay className="ml-1 fill-current" />
              </div>
              <div className="space-y-0.5">
                 <p className="text-[10px] font-bold uppercase text-[#004d73] dark:text-[#ffcc00] tracking-widest">{t("ninetyMinWeather")}</p>
                 <p className="text-[11px] font-black text-slate-500 dark:text-slate-400">{t("liveForecast")}</p>
              </div>
           </div>
           <FiChevronRight className="text-slate-300 group-hover/90:translate-x-1 transition-transform" />
        </div>

        <div className="flex items-center justify-around bg-slate-100 dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-100 dark:border-white/10">
           <div className="flex items-center gap-2">
              <FiSunrise className="text-amber-500 text-lg" />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {new Date(current.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
           </div>
           <div className="w-px h-6 bg-slate-200 dark:bg-white/10" />
           <div className="flex items-center gap-2">
              <FiSunset className="text-indigo-500 text-lg" />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {new Date(current.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
           </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherHero;




