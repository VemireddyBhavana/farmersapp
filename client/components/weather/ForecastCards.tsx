import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FiCalendar, FiSun, FiCloud, FiCloudRain, FiDroplet, FiWind } from "react-icons/fi";
import { motion } from "framer-motion";

interface ForecastCardsProps {
  daily: any[];
}

const ForecastCards: React.FC<ForecastCardsProps> = ({ daily }) => {
  if (!daily) return null;

  return (
    <Card className="rounded-[2.5rem] border-none bg-white dark:bg-slate-900 shadow-xl overflow-hidden h-full">
      <CardHeader className="p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
        <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-[#004d73] dark:text-white flex items-center gap-2">
          <FiCalendar className="text-primary" /> 7-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-4">
        <div className="space-y-1">
          {daily.slice(0, 7).map((day, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group border-b border-slate-50 last:border-0 dark:border-white/5"
            >
              <div className="flex items-center gap-4 w-1/4">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight w-10">
                  {i === 0 ? "Today" : new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short' })}
                </p>
                <div className="text-2xl text-[#004d73] dark:text-[#ffcc00] group-hover:scale-110 transition-transform">
                  {day.weather[0].main === 'Rain' ? <FiCloudRain /> : day.weather[0].main === 'Clear' ? <FiSun /> : <FiCloud />}
                </div>
              </div>

              <div className="flex items-center gap-4 w-1/3 justify-center">
                 <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <FiDroplet className="text-[9px] text-blue-500" />
                      <span className="text-[10px] font-black text-blue-500">{Math.round((day.pop || 0) * 100)}%</span>
                    </div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Rain</p>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <FiWind className="text-[9px] text-slate-400" />
                      <span className="text-[10px] font-black text-slate-600 dark:text-slate-300">{Math.round(day.wind_speed)}</span>
                    </div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">km/h</p>
                 </div>
              </div>

              <div className="flex items-center gap-4 w-1/4 justify-end">
                <div className="text-right">
                  <span className="text-base font-black text-[#004d73] dark:text-white">{Math.round(day.temp.max)}°</span>
                  <div className="text-[9px] font-bold text-slate-400 uppercase">High</div>
                </div>
                <div className="text-right border-l border-slate-100 dark:border-white/10 pl-4">
                  <span className="text-base font-black text-slate-400">{Math.round(day.temp.min)}°</span>
                  <div className="text-[9px] font-bold text-slate-400 uppercase">Low</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCards;
