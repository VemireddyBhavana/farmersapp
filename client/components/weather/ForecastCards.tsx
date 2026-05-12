import React from "react";
import { motion } from "framer-motion";
import { WiDaySunny, WiCloudy, WiRain, WiThunderstorm, WiSnow, WiDayCloudy, WiStrongWind } from "react-icons/wi";
import { useTranslation } from "react-i18next";

interface ForecastCardsProps {
  daily: any[];
}

const ForecastCards: React.FC<ForecastCardsProps> = ({ daily }) => {
  const { t } = useTranslation();

  const getIcon = (condition: string) => {
    const iconClass = "text-6xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]";
    switch (condition.toLowerCase()) {
      case 'rain': return <WiRain className={`${iconClass} text-blue-400`} />;
      case 'clouds': return <WiCloudy className={`${iconClass} text-slate-300`} />;
      case 'clear': return <WiDaySunny className={`${iconClass} text-amber-400`} />;
      case 'snow': return <WiSnow className={`${iconClass} text-white`} />;
      default: return <WiDayCloudy className={`${iconClass} text-emerald-300`} />;
    }
  };

  const getDayName = (dt: number) => {
    return new Date(dt * 1000).toLocaleDateString(undefined, { weekday: 'short' });
  };

  const getDayNum = (dt: number) => {
    return new Date(dt * 1000).getDate();
  };

  return (
    <div className="mt-20">
      <div className="flex items-end justify-between mb-12">
        <div className="space-y-2">
            <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em]"
            >
                Orbital Projection
            </motion.p>
            <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-black text-emerald-950 dark:text-white tracking-tighter italic"
            >
                7-Day <span className="text-emerald-500 underline decoration-emerald-500/30 underline-offset-8">Forecast</span>
            </motion.h3>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[10px] text-black/40 dark:text-white/40 font-black tracking-widest uppercase">
            <span>Mar 12 — 19</span>
            <div className="h-px w-12 bg-black/10 dark:bg-white/10" />
            <span>Telemetry Active</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-6">
        {daily.slice(1, 8).map((day, i) => (
          <motion.div
            key={day.dt}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            whileHover={{ y: -8 }}
            className="relative group p-6 lg:p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/[0.03] backdrop-blur-[50px] border border-white/20 dark:border-white/5 flex flex-col items-center gap-6 cursor-pointer overflow-hidden"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)] animate-slow-spin" />
            </div>

            <div className="text-center relative z-10">
              <p className="text-[11px] font-black text-black/40 dark:text-white/30 uppercase tracking-[0.3em] mb-1 group-hover:text-emerald-500 transition-colors">
                {getDayName(day.dt)}
              </p>
              <p className="text-lg font-black text-emerald-950 dark:text-white/60 group-hover:text-white transition-colors">
                {getDayNum(day.dt)}
              </p>
            </div>

            <div className="py-2 group-hover:scale-110 transition-transform duration-700 ease-out relative z-10">
              {getIcon(day.weather[0].main)}
              {/* Rain Drop Overlay */}
              {day.pop > 0 && (
                 <div className="absolute -bottom-2 -right-2 bg-blue-500/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-blue-500/20 flex items-center gap-1">
                    <span className="text-[9px] font-black text-blue-400">{Math.round(day.pop * 100)}%</span>
                 </div>
              )}
            </div>

            <div className="space-y-4 w-full relative z-10">
                <div className="flex flex-col items-center">
                    <p className="text-4xl font-black text-emerald-950 dark:text-white group-hover:text-emerald-400 transition-colors">
                        {Math.round(day.temp.max)}°
                    </p>
                    <p className="text-sm font-bold text-black/20 dark:text-white/20">
                        {Math.round(day.temp.min)}°
                    </p>
                </div>

                <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-center gap-2 text-black/30 dark:text-white/20">
                    <WiStrongWind className="text-xl" />
                    <p className="text-[10px] font-black uppercase tracking-widest">{Math.round(day.wind_speed)} km/h</p>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCards;
