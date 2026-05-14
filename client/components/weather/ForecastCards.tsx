import React from "react";
import { motion } from "framer-motion";
import { WiDaySunny, WiCloudy, WiRain, WiDayCloudy, WiRaindrops } from "react-icons/wi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ForecastCardsProps {
  daily: any[];
}

const ForecastCards: React.FC<ForecastCardsProps> = ({ daily }) => {
  const getIcon = (condition: string) => {
    const iconClass = "text-3xl";
    switch (condition.toLowerCase()) {
      case 'rain': return <WiRain className={`${iconClass} text-blue-500`} />;
      case 'clouds': return <WiCloudy className={`${iconClass} text-slate-400`} />;
      case 'clear': return <WiDaySunny className={`${iconClass} text-amber-500`} />;
      default: return <WiDayCloudy className={`${iconClass} text-slate-400`} />;
    }
  };

  const getDayName = (dt: number) => {
    return new Date(dt * 1000).toLocaleDateString(undefined, { weekday: 'long' });
  };

  return (
    <Card className="rounded-[2rem] border border-border/50 shadow-xl bg-card overflow-hidden flex flex-col hover-lift h-full">
      <CardHeader className="bg-muted border-b border-border px-8 py-4">
        <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-bold text-foreground uppercase tracking-widest">7-Day Forecast</CardTitle>
            <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground/40">Outlook</span>
        </div>
      </CardHeader>

      <CardContent className="p-2 divide-y divide-border/50">
        {daily.slice(0, 7).map((day, i) => (
          <motion.div
            key={day.dt}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors group"
          >
            <div className="w-1/3">
              <p className="text-sm font-bold text-foreground">
                {i === 0 ? "Today" : getDayName(day.dt)}
              </p>
            </div>

            <div className="flex items-center gap-3 w-1/3 justify-center">
              <div>
                {getIcon(day.weather[0].main)}
              </div>
              {day.pop > 0 && (
                <div className="flex items-center gap-0.5 text-blue-500 min-w-[40px]">
                  <span className="text-[10px] font-black">{Math.round(day.pop * 100)}%</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 w-1/3 justify-end text-sm font-black">
              <span className="text-foreground">{Math.round(day.temp.max)}°</span>
              <span className="text-muted-foreground/40">{Math.round(day.temp.min)}°</span>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ForecastCards;



