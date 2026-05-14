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
    <Card className="rounded-xl border-none bg-white dark:bg-slate-900 text-[#333] dark:text-white p-6 md:p-8 shadow-sm overflow-hidden relative group h-full flex flex-col justify-between border border-slate-200 dark:border-white/5">
      {/* Top Section: City & Time */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[#004d73] dark:text-white flex items-center gap-2">
            {location}
          </h1>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'long' })}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
           <div className={cn(
             "px-3 py-1.5 rounded text-[11px] font-black flex items-center gap-2 shadow-sm text-white",
             (weather.current.aqi || 260) > 100 ? "bg-[#ff9900]" : "bg-emerald-500"
           )}>
             <span>AQI {Math.round(weather.current.aqi || 260)}</span>
             <span className="opacity-80 uppercase tracking-tighter">{(weather.current.aqi || 260) > 100 ? t("aqiPoor") : t("aqiGood")}</span>
           </div>
        </div>
      </div>

      {/* Middle Section: Temp & Description */}
      <div className="flex flex-col md:flex-row items-center justify-between py-10 gap-8">
        <div className="flex items-start gap-4">
          <div className="relative">
            <span className="text-[8rem] md:text-[10rem] font-black leading-[0.8] tracking-tighter text-[#004d73] dark:text-white tabular-nums drop-shadow-sm">
              {Math.round(current.temp)}
            </span>
            <span className="text-4xl md:text-6xl font-black text-[#004d73] dark:text-white align-top mt-4 inline-block">°</span>
          </div>
          <div className="mt-8 flex flex-col gap-1">
             <div className="text-3xl font-black text-slate-800 dark:text-white/90 capitalize leading-none tracking-tight">{description}</div>
             <div className="text-sm font-bold text-slate-400">{t("feelsLike")} {Math.round(current.feels_like)}°</div>
          </div>
        </div>
        
        <div className="w-48 h-48 flex items-center justify-center text-8xl transition-transform hover:scale-110 duration-500">
           {current.weather[0].main === 'Clear' ? <FiSun className="text-amber-500 drop-shadow-xl" /> : <FiCloud className="text-slate-300 drop-shadow-lg" />}
        </div>
      </div>

      {/* Bottom Section: Astro & Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-100 dark:border-white/5 pt-8 mt-4">
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/10">
           <div className="w-10 h-10 bg-[#004d73] rounded-full flex items-center justify-center text-white shadow-lg">
              <FiPlay className="ml-1 fill-current" />
           </div>
           <div>
              <p className="text-[10px] font-bold uppercase text-[#004d73] dark:text-[#ffcc00] tracking-widest">{t("weatherRadar")}</p>
              <p className="text-[11px] font-black text-slate-500">{t("viewLive")}</p>
           </div>
        </div>

        <div className="flex items-center justify-around bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-100 dark:border-white/10 col-span-2">
           <div className="flex items-center gap-4">
              <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg">
                 <FiSunrise className="text-amber-500 text-xl" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-slate-400 uppercase">{t("sunrise")}</span>
                 <span className="text-sm font-black text-slate-700 dark:text-slate-200">
                   {new Date(current.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </span>
              </div>
           </div>
           <div className="w-px h-8 bg-slate-200 dark:bg-white/10" />
           <div className="flex items-center gap-4">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
                 <FiSunset className="text-indigo-500 text-xl" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-slate-400 uppercase">{t("sunset")}</span>
                 <span className="text-sm font-black text-slate-700 dark:text-slate-200">
                   {new Date(current.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </span>
              </div>
           </div>
        </div>
      </div>
    </Card>

  );
};

export default WeatherHero;




