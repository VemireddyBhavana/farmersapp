import React from "react";
import { motion } from "framer-motion";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiDayCloudy } from "react-icons/wi";

interface ForecastCardsProps {
  daily: any[];
}

const ForecastCards: React.FC<ForecastCardsProps> = ({ daily }) => {
  const getIcon = (condition: string) => {
    const iconClass = "text-6xl text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-1000";
    switch (condition.toLowerCase()) {
      case 'rain': return <WiRain className={iconClass} />;
      case 'clouds': return <WiCloudy className={iconClass} />;
      case 'clear': return <WiDaySunny className={iconClass} />;
      case 'snow': return <WiSnow className={iconClass} />;
      default: return <WiDayCloudy className={iconClass} />;
    }
  };

  const getDayName = (dt: number) => {
    return new Date(dt * 1000).toLocaleDateString(undefined, { weekday: 'short' });
  };

  const getFullDate = (dt: number) => {
    return new Date(dt * 1000).toLocaleDateString(undefined, { day: '2-digit', month: 'short' });
  };

  return (
    <div className="mt-32">
      <div className="flex items-end justify-between mb-16">
        <div className="space-y-1">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em]">Future Projections</p>
            <h3 className="text-4xl font-black text-emerald-950 dark:text-white tracking-tighter uppercase italic">7-Day <span className="text-emerald-500">Timeline</span></h3>
        </div>
        <div className="h-px flex-1 mx-12 bg-black/5 dark:bg-white/5 hidden lg:block" />
        <div className="text-right space-y-1">
            <p className="text-[10px] font-black text-black/30 dark:text-white/30 uppercase tracking-widest">Active Forecast</p>
            <p className="text-xs font-bold text-black/60 dark:text-white/60 italic">"Plan your harvest window"</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 lg:gap-8">
        {daily.slice(1, 8).map((day, i) => (
          <motion.div
            key={day.dt}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 1 }}
            whileHover={{ y: -15, scale: 1.05 }}
            className="group relative aspect-[1/2] rounded-[3.5rem] bg-gradient-to-b from-white/20 to-white/5 dark:from-white/10 dark:to-transparent backdrop-blur-[40px] border-t border-l border-white/30 border-b border-r border-white/10 flex flex-col items-center justify-between p-8 cursor-pointer overflow-hidden shadow-2xl transition-all"
          >
            {/* Refractive border effect */}
            <div className="absolute inset-0 border border-white/5 rounded-[3.5rem] pointer-events-none" />
            
            {/* Background Glow */}
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] animate-slow-spin opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* Top: Day & Date */}
            <div className="text-center space-y-1 relative z-10">
              <p className="text-[10px] font-black text-black/30 dark:text-white/30 uppercase tracking-[0.3em] group-hover:text-emerald-400 transition-colors">
                {getDayName(day.dt)}
              </p>
              <p className="text-xs font-black text-emerald-950 dark:text-white/60">
                {getFullDate(day.dt)}
              </p>
            </div>

            {/* Middle: Icon & Temp */}
            <div className="flex flex-col items-center gap-6 relative z-10 w-full">
              <div className="relative group-hover:scale-125 transition-transform duration-1000 ease-out">
                {getIcon(day.weather[0].main)}
                {day.pop > 0 && (
                   <motion.div 
                     animate={{ y: [0, -5, 0] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="absolute -bottom-2 -right-2 bg-blue-500/30 backdrop-blur-md px-2 py-1 rounded-full border border-white/10"
                   >
                     <span className="text-[8px] font-black text-white">{Math.round(day.pop * 100)}%</span>
                   </motion.div>
                )}
              </div>
              <div className="text-center">
                <h4 className="text-6xl font-black text-emerald-950 dark:text-white group-hover:text-emerald-400 transition-colors tracking-tighter">
                    {Math.round(day.temp.max)}°
                </h4>
                <p className="text-[10px] font-black text-black/20 dark:text-white/20 uppercase tracking-[0.2em] mt-1">
                    Forecast
                </p>
              </div>
            </div>

            {/* Bottom: Subtext */}
            <div className="w-full relative z-10 pt-6 border-t border-white/10">
                <p className="text-[8px] font-black text-black/30 dark:text-white/20 uppercase text-center tracking-[0.4em]">
                    Bio-Sync Active
                </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCards;
