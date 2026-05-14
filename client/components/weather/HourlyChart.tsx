import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FiClock, FiCloud, FiSun, FiCloudRain } from "react-icons/fi";
import { motion } from "framer-motion";

interface HourlyChartProps {
  hourly: any[];
}

const HourlyChart: React.FC<HourlyChartProps> = ({ hourly }) => {
  if (!hourly) return null;

  return (
    <Card className="rounded-[2.5rem] border-none bg-white dark:bg-slate-900 shadow-xl overflow-hidden h-full">
      <CardHeader className="p-8 pb-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-[#004d73] dark:text-white flex items-center gap-2">
            <FiClock className="text-primary" /> Hourly Outlook
          </CardTitle>
          <div className="text-[10px] font-black uppercase tracking-widest text-[#004d73] bg-[#ffcc00] px-3 py-1 rounded-lg shadow-sm">
            Live Timeline
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex overflow-x-auto gap-0 scrollbar-hide">
          {hourly.slice(0, 24).map((hour, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center min-w-[100px] space-y-4 p-6 border-r border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group relative overflow-hidden"
            >
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {new Date(hour.dt * 1000).getHours()}:00
              </p>
              <div className="text-3xl text-[#004d73] dark:text-[#ffcc00] group-hover:scale-110 transition-transform">
                {hour.weather[0].main === 'Rain' ? <FiCloudRain /> : hour.weather[0].main === 'Clear' ? <FiSun /> : <FiCloud />}
              </div>
              <p className="text-2xl font-black text-slate-700 dark:text-white tabular-nums">
                {Math.round(hour.temp)}°
              </p>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-[10px] font-black text-blue-500 uppercase">
                  <FiCloudRain className="text-[9px]" /> {Math.round((hour.pop || 0) * 100)}%
                </div>
              </div>
              
              {/* Highlight for "Now" */}
              {i === 0 && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#ffcc00] shadow-[0_0_10px_#ffcc00]" />
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyChart;
