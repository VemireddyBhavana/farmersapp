import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FiClock, FiCloud, FiSun, FiCloudRain, FiArrowUp, FiDroplet } from "react-icons/fi";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

interface HourlyChartProps {
  hourly: any[];
}

const HourlyChart: React.FC<HourlyChartProps> = ({ hourly }) => {
  const { t } = useLanguage();
  if (!hourly) return null;

  return (
    <Card className="rounded-xl border-none bg-white dark:bg-slate-900 shadow-sm overflow-hidden h-full border border-slate-100 dark:border-white/5">
      <CardHeader className="p-6 pb-4 border-b border-slate-50 dark:border-white/5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold text-[#004d73] dark:text-white flex items-center gap-2">
            <FiClock className="text-[#004d73] dark:text-[#ffcc00]" /> {t("hourlyWeather")}
          </CardTitle>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {t("next24Hours")}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex overflow-x-auto gap-0 scrollbar-hide">
          {hourly.slice(0, 24).map((hour, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.01 }}
              className="flex flex-col items-center min-w-[75px] py-8 border-r border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer group"
            >
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-4">
                {new Date(hour.dt * 1000).getHours()}:00
              </p>
              
              <div className="text-2xl mb-6 group-hover:scale-125 transition-transform duration-300">
                {hour.weather[0].main === 'Rain' ? <FiCloudRain className="text-blue-400" /> : hour.weather[0].main === 'Clear' ? <FiSun className="text-amber-500" /> : <FiCloud className="text-slate-300" />}
              </div>

              <p className="text-xl font-black text-[#004d73] dark:text-white tabular-nums mb-6">
                {Math.round(hour.temp)}°
              </p>

              <div className="flex flex-col items-center gap-2 mt-auto">
                 <div className="flex items-center gap-1">
                    <FiDroplet className="text-blue-300 text-[10px]" />
                    <span className="text-[9px] font-bold text-slate-400">{Math.round((hour.pop || 0) * 100)}%</span>
                 </div>
                 <div 
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" 
                    title="Good AQI"
                 />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyChart;
