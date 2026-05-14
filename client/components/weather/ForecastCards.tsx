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
    <Card className="rounded-[2.5rem] border-none bg-card/40 backdrop-blur-xl shadow-xl overflow-hidden h-full">
      <CardHeader className="p-8">
        <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
          <FiCalendar className="text-primary" /> 7-Day Outlook
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <div className="space-y-4">
          {daily.slice(0, 7).map((day, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-4 rounded-3xl hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-center gap-4 w-1/3">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest w-10">
                  {i === 0 ? "TODAY" : new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short' }).toUpperCase()}
                </p>
                <div className="text-2xl text-primary group-hover:scale-110 transition-transform">
                  {day.weather[0].main === 'Rain' ? <FiCloudRain /> : day.weather[0].main === 'Clear' ? <FiSun /> : <FiCloud />}
                </div>
              </div>

              <div className="flex items-center gap-4 w-1/3 justify-center">
                 <div className="flex items-center gap-1">
                    <FiDroplet className="text-[10px] text-blue-500" />
                    <span className="text-[10px] font-black text-blue-500">{Math.round(day.pop * 100)}%</span>
                 </div>
                 <div className="flex items-center gap-1">
                    <FiWind className="text-[10px] text-muted-foreground/40" />
                    <span className="text-[10px] font-black text-muted-foreground/40">{Math.round(day.wind_speed)}</span>
                 </div>
              </div>

              <div className="flex items-center gap-3 w-1/3 justify-end">
                <span className="text-lg font-black text-foreground italic">{Math.round(day.temp.max)}°</span>
                <span className="text-lg font-black text-muted-foreground/30 italic">{Math.round(day.temp.min)}°</span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCards;
