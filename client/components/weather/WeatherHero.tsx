import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { WiHumidity, WiStrongWind, WiSunrise, WiSunset, WiDaySunny, WiCloudy, WiRain, WiThunderstorm } from "react-icons/wi";

interface WeatherHeroProps {
  weather: any;
  location: string;
}

const HUDGauge: React.FC<{ value: number; label: string; unit: string; color: string; max?: number }> = ({ value, label, unit, color, max = 100 }) => {
  const percentage = (value / max) * 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Outer Static Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="64" cy="64" r={radius} fill="transparent" stroke="currentColor" strokeWidth="2" className="text-white/10" />
          <circle cx="64" cy="64" r={radius} fill="transparent" stroke={color} strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
        </svg>
        {/* Inner Dashed Ring */}
        <div className="absolute inset-2 border-2 border-dashed border-white/5 rounded-full animate-radar" />
        <div className="text-center z-10">
          <p className="text-xs font-bold text-white/40 uppercase tracking-tighter">{unit}</p>
          <p className="text-3xl font-black text-white leading-none">{value}</p>
        </div>
      </div>
      <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">{label}</p>
    </div>
  );
};

const SunArc: React.FC<{ sunrise: number; sunset: number }> = ({ sunrise, sunset }) => {
  const { t } = useTranslation();
  const formatTime = (dt: number) => {
    if (!dt) return "--:--";
    return new Date(dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div className="relative w-full h-32 mt-8 flex flex-col items-center justify-end overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 200 100">
        <path d="M 10 90 A 90 90 0 0 1 190 90" fill="transparent" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
        {/* Progress Arc */}
        <motion.path 
            d="M 10 90 A 90 90 0 0 1 190 90" 
            fill="transparent" 
            stroke="url(#sun-grad)" 
            strokeWidth="2" 
            strokeDasharray="282" 
            strokeDashoffset="141" 
            className="opacity-60"
        />
        <defs>
          <linearGradient id="sun-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        {/* Sun Indicator */}
        <motion.circle 
            cx="100" cy="10" r="4" fill="#fbbf24" 
            animate={{ x: [-90, 90], y: [90, 0, 90] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="shadow-[0_0_10px_#fbbf24]"
        />
      </svg>
      <div className="absolute bottom-0 w-full flex justify-between px-4 text-[10px] font-black text-white/40 uppercase tracking-widest">
        <div className="flex flex-col items-start">
            <span>{formatTime(sunrise)}</span>
            <WiSunrise className="text-xl text-amber-500" />
        </div>
        <div className="flex flex-col items-end">
            <span>{formatTime(sunset)}</span>
            <WiSunset className="text-xl text-rose-500" />
        </div>
      </div>
    </div>
  );
};

const RadarComponent: React.FC = () => {
  return (
    <div className="relative w-24 h-24 lg:w-32 lg:h-32">
        <div className="absolute inset-0 border border-emerald-500/20 rounded-full" />
        <div className="absolute inset-2 border border-emerald-500/10 rounded-full" />
        <div className="absolute inset-4 border border-emerald-500/5 rounded-full" />
        <div className="absolute inset-0 border-l-2 border-emerald-500/40 rounded-full animate-radar" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-emerald-500/10" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-emerald-500/10" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
    </div>
  );
};

const WeatherHero: React.FC<WeatherHeroProps> = ({ weather, location }) => {
  const { t } = useTranslation();
  if (!weather || !weather.current) return null;

  const current = weather.current;
  const condition = current.weather?.[0]?.main || "Clear";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-[600px] flex flex-col justify-between p-8 lg:p-12 overflow-hidden"
    >
      {/* Background with Scan Lines */}
      <div className="absolute inset-0 -z-10 bg-black/20 backdrop-blur-sm pointer-events-none" />
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[length:100%_4px] animate-scan" />

      {/* Top Section: Radar & Location */}
      <div className="flex justify-between items-start">
        <RadarComponent />
        <div className="text-right">
            <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="inline-flex items-center gap-3 px-4 py-1 rounded-sm bg-emerald-500/20 border-r-4 border-emerald-500 text-emerald-400 mb-4"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.4em] uppercase">{location}</span>
            </motion.div>
            <h2 className="text-6xl lg:text-8xl font-black text-white tracking-tighter leading-none opacity-90">
                {Math.round(current.temp)}<span className="text-2xl text-emerald-500 ml-1">°C</span>
            </h2>
            <p className="text-emerald-500 font-bold uppercase tracking-[0.5em] text-[10px] mt-2">
                {t(current.weather?.[0]?.description || "weather_data.stable")}
            </p>
        </div>
      </div>

      {/* Center Section: Focused Scan Effect (Target Overlay) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-96 lg:h-96 pointer-events-none">
          <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-float-slow" />
          <div className="absolute inset-[10%] border border-white/5 rounded-full" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white/5" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-white/5" />
          {/* Target Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-emerald-500/40" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-emerald-500/40" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-emerald-500/40" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-emerald-500/40" />
      </div>

      {/* Bottom Section: HUD Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10">
        {/* Left Stats */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg flex items-center gap-4 group hover:border-emerald-500/40 transition-all">
                <div className="p-3 bg-emerald-500/10 rounded-full text-2xl text-emerald-500 group-hover:scale-110 transition-transform">
                    <WiStrongWind />
                </div>
                <div>
                    <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">{t('weather_data.velocity')}</p>
                    <p className="text-xl font-black text-white">{current.wind_speed} <span className="text-[10px] text-emerald-500">KM/H</span></p>
                </div>
            </div>
            <div className="p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg flex items-center gap-4 group hover:border-emerald-500/40 transition-all">
                <div className="p-3 bg-amber-500/10 rounded-full text-2xl text-amber-500 group-hover:scale-110 transition-transform">
                    <WiDaySunny />
                </div>
                <div>
                    <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">{t('weather_data.solar_uv')}</p>
                    <p className="text-xl font-black text-white">{current.uvi || 0} <span className="text-[10px] text-amber-500">INDEX</span></p>
                </div>
            </div>
        </div>

        {/* Center: Sun Arc */}
        <div className="lg:col-span-4 px-8">
            <SunArc sunrise={current.sunrise} sunset={current.sunset} />
        </div>

        {/* Right: Gauges Panel */}
        <div className="lg:col-span-4 flex justify-end gap-8 bg-black/20 p-6 rounded-3xl backdrop-blur-xl border border-white/5">
            <HUDGauge value={current.humidity} label={t('weather_data.humidity')} unit="%" color="#10b981" />
            <HUDGauge value={Math.round(current.pressure || 1013)} label={t('weather_data.pressure')} unit="MBAR" color="#3b82f6" max={1100} />
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherHero;
