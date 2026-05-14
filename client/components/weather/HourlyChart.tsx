import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FiClock, FiCloud, FiSun, FiCloudRain, FiArrowUp } from "react-icons/fi";
import { motion } from "framer-motion";

interface HourlyChartProps {
  hourly: any[];
}

const HourlyChart: React.FC<HourlyChartProps> = ({ hourly }) => {
  if (!hourly) return null;

  return (
    <Card className="rounded-xl border-none bg-white dark:bg-slate-900 shadow-sm overflow-hidden h-full border border-slate-100 dark:border-white/5">
      <CardHeader className="p-6 pb-4 border-b border-slate-50 dark:border-white/5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold text-[#004d73] dark:text-white flex items-center gap-2">
            <FiClock className="text-[#004d73] dark:text-[#ffcc00]" /> Hourly Weather
          </CardTitle>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Next 24 Hours
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex overflow-x-auto gap-0 scrollbar-hide">
          {hourly.slice(0, 24).map((hour, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.02 }}
              className="flex flex-col items-center min-w-[85px] py-6 border-r border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
            >
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2">
                {new Date(hour.dt * 1000).getHours()}:00
              </p>
              
              <p className="text-xl font-black text-[#333] dark:text-white tabular-nums mb-3">
                {Math.round(hour.temp)}°
              </p>

              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                {hour.weather[0].main === 'Rain' ? <FiCloudRain className="text-blue-400" /> : hour.weather[0].main === 'Clear' ? <FiSun className="text-amber-500" /> : <FiCloud className="text-slate-400" />}
              </div>

              <div className="flex flex-col items-center gap-1">
                 <FiArrowUp 
                   className="text-slate-300 dark:text-slate-600 transition-transform duration-500" 
                   style={{ transform: `rotate(${hour.wind_deg}deg)` }} 
                 />
                 <span className="text-[9px] font-bold text-slate-400 uppercase">{Math.round(hour.wind_speed)}</span>
              </div>
              
              {i === 0 && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#004d73] dark:bg-[#ffcc00]" />
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyChart;
