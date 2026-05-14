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
    <Card className="rounded-[2.5rem] bg-[#004d73] text-white p-8 md:p-10 overflow-hidden relative border-none shadow-2xl h-full flex flex-col justify-between group">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#ffcc00] rounded-md text-[10px] font-black uppercase tracking-wider text-[#004d73] shadow-lg">
              {t('live')} Radar
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-none">{location}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg font-bold text-white/90 capitalize">{description}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
          <div className="text-right">
             <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mb-1">Humidity</p>
                <p className="text-3xl font-black">{current.humidity}%</p>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mt-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <span className="text-8xl md:text-[10rem] font-black leading-none tracking-tighter tabular-nums">
                {Math.round(current.temp)}
              </span>
              <span className="text-4xl md:text-6xl font-black absolute top-4 -right-10 opacity-40">°C</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-[450px]">
            {[
              { label: "Wind Speed", value: `${current.wind_speed} km/h`, icon: <Wind className="w-4 h-4" /> },
              { label: "Feels Like", value: `${Math.round(current.feels_like)}°C`, icon: <Thermometer className="w-4 h-4" /> },
              { label: "Pressure", value: `${current.pressure} hPa`, icon: <Gauge className="w-4 h-4" /> },
              { label: "Visibility", value: `${(current.visibility / 1000).toFixed(1)} km`, icon: <Zap className="w-4 h-4" /> }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-4 group/item">
                <div className="p-2 bg-white/10 rounded-xl text-[#ffcc00] group-hover/item:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40 leading-none mb-1">{item.label}</p>
                  <p className="text-base font-black text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Weather Icon */}
      <div className="absolute right-[5%] bottom-[10%] opacity-10 pointer-events-none group-hover:scale-110 transition-transform [transition-duration:3s]">
         {iconCode.includes('d') ? <Sun className="w-64 h-64" /> : <Cloud className="w-64 h-64" />}
      </div>
    </Card>
  );
};

export default WeatherHero;




