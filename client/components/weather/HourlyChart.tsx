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
    <Card className="rounded-[2.5rem] border-none bg-card/40 backdrop-blur-xl shadow-xl overflow-hidden h-full">
      <CardHeader className="p-8 pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
            <FiClock className="text-primary" /> Hourly Outlook
          </CardTitle>
          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
            Next 24 Hours
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {hourly.slice(0, 24).map((hour, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center min-w-[80px] space-y-4 p-4 rounded-3xl hover:bg-primary/5 transition-colors group"
            >
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                {new Date(hour.dt * 1000).getHours()}:00
              </p>
              <div className="text-3xl text-primary group-hover:scale-110 transition-transform">
                {hour.weather[0].main === 'Rain' ? <FiCloudRain /> : hour.weather[0].main === 'Clear' ? <FiSun /> : <FiCloud />}
              </div>
              <p className="text-xl font-black text-foreground italic tracking-tighter">
                {Math.round(hour.temp)}°
              </p>
              <div className="text-[8px] font-black text-blue-500 uppercase">
                {Math.round(hour.pop * 100)}% <span className="opacity-40 text-muted-foreground">Rain</span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyChart;
