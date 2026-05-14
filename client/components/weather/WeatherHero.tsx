import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  WiHumidity, WiStrongWind, WiSunrise, WiSunset, 
  WiThermometer, WiBarometer 
} from "react-icons/wi";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Sun, Wind, Droplets, Thermometer, Gauge } from "lucide-react";

interface WeatherHeroProps {
  weather: any;
  location: string;
}

const WeatherHero: React.FC<WeatherHeroProps> = ({ weather, location }) => {
  const { t } = useTranslation();
  if (!weather || !weather.current) return null;

  const current = weather.current;
  const description = current.weather?.[0]?.description || "stable";

  return (
    <Card className="rounded-[2.5rem] bg-primary text-primary-foreground p-8 md:p-12 overflow-hidden relative border border-primary/20 shadow-2xl flex flex-col justify-center min-h-[400px] hover-lift group">
      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Temperature & Condition */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-card/10 text-primary-foreground/90 rounded text-xs font-semibold tracking-wider uppercase border border-white/20">
            <Sun className="w-4 h-4 text-amber-400" /> {t('live')} Updates
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">{location}</h1>
            <p className="text-xl font-bold text-primary-foreground/70 capitalize italic tracking-tight leading-none">
              {t(description)}
            </p>
          </div>
          <div className="relative inline-block">
            <div className="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter flex items-start">
              {Math.round(current.temp)}<span className="text-4xl md:text-6xl mt-8">°</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xl font-bold text-primary-foreground/80">
            <span className="flex items-center gap-1">H: {Math.round(weather.daily[0]?.temp.max || 0)}°</span>
            <span className="opacity-20">|</span>
            <span className="flex items-center gap-1">L: {Math.round(weather.daily[0]?.temp.min || 0)}°</span>
          </div>
        </div>

        {/* Right Side: Detailed Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Humidity", value: `${current.humidity}%`, icon: <Droplets className="w-5 h-5" />, color: "bg-blue-500/20" },
            { label: "Wind Speed", value: `${current.wind_speed} km/h`, icon: <Wind className="w-5 h-5" />, color: "bg-emerald-500/20" },
            { label: "Feels Like", value: `${Math.round(current.feels_like)}°`, icon: <Thermometer className="w-5 h-5" />, color: "bg-orange-500/20" },
            { label: "Pressure", value: `${current.pressure} hPa`, icon: <Gauge className="w-5 h-5" />, color: "bg-indigo-500/20" }
          ].map((item, i) => (
            <div 
              key={item.label}
              className="bg-card/10 backdrop-blur-md rounded-3xl p-6 flex flex-col gap-3 border border-white/10 hover:bg-card/20 transition-all"
            >
              <div className={`p-2 rounded-xl w-fit ${item.color}`}>
                {item.icon}
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary-foreground/40">{item.label}</p>
                <p className="text-xl font-bold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Background Pattern */}
      <div className="absolute right-0 top-0 w-64 h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>
      <Sun className="absolute right-[-40px] top-[-40px] h-80 w-80 text-primary-foreground/5 opacity-30 -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
    </Card>
  );
};

export default WeatherHero;



