import React from "react";
import { motion } from "framer-motion";
import { 
  Cloud, Sun, Wind, Droplets, Thermometer, Gauge, Zap
} from "lucide-react";
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
  const iconCode = current.weather?.[0]?.icon || "01d";

  return (
    <Card className="rounded-[3rem] bg-gradient-to-br from-emerald-600 to-blue-700 text-white p-10 md:p-14 overflow-hidden relative border-none shadow-2xl h-full flex flex-col justify-between group">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
      </div>

      <div className="relative z-10 space-y-12">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-emerald-300">
              <Zap className="w-3 h-3 fill-current" /> {t('live')} Updates
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic drop-shadow-xl">{location}</h1>
            <p className="text-xl font-bold text-white/70 capitalize italic tracking-tight flex items-center gap-2">
               {description}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-black opacity-40 uppercase tracking-widest leading-none mb-1">Humidity</p>
            <p className="text-2xl font-black">{current.humidity}%</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="relative inline-block">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter flex items-start select-none"
            >
              {Math.round(current.temp)}<span className="text-5xl md:text-7xl mt-8 opacity-40">°</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:w-1/2">
            {[
              { label: "Wind", value: `${current.wind_speed} km/h`, icon: <Wind className="w-4 h-4" /> },
              { label: "Feels Like", value: `${Math.round(current.feels_like)}°`, icon: <Thermometer className="w-4 h-4" /> },
              { label: "High/Low", value: `${Math.round(weather.daily[0]?.temp.max)}° / ${Math.round(weather.daily[0]?.temp.min)}°`, icon: <Gauge className="w-4 h-4" /> },
              { label: "Pressure", value: `${current.pressure} hPa`, icon: <Gauge className="w-4 h-4" /> }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/10 hover:bg-white/20 transition-all group/item">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/10 rounded-xl text-white group-hover/item:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/50">{item.label}</p>
                </div>
                <p className="text-lg font-black text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-[-10%] bottom-[-10%] opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-[3s]">
         {iconCode.includes('d') ? <Sun className="w-96 h-96" /> : <Cloud className="w-96 h-96" />}
      </div>
    </Card>
  );
};

export default WeatherHero;




