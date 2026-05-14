import React from "react";
import { motion } from "framer-motion";
import { WiDaySunny, WiCloudy, WiRain, WiDayCloudy, WiRaindrops } from "react-icons/wi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface HourlyChartProps {
  hourly: any[];
}

const HourlyChart: React.FC<HourlyChartProps> = ({ hourly }) => {
  const getIcon = (condition: string) => {
    const iconClass = "text-3xl";
    switch (condition.toLowerCase()) {
      case 'rain': return <WiRain className={`${iconClass} text-blue-500`} />;
      case 'clouds': return <WiCloudy className={`${iconClass} text-slate-400`} />;
      case 'clear': return <WiDaySunny className={`${iconClass} text-amber-500`} />;
      default: return <WiDayCloudy className={`${iconClass} text-emerald-500`} />;
    }
  };

  return (
    <Card className="rounded-[2rem] border border-border/50 shadow-xl bg-card overflow-hidden flex flex-col hover-lift">
      <CardHeader className="bg-muted border-b border-border px-8 py-4">
        <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-bold text-foreground uppercase tracking-widest">Hourly Forecast</CardTitle>
            <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground/40">Next 24 Hours</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="flex gap-2 overflow-x-auto p-6 scrollbar-hide">
            {hourly.slice(0, 24).map((h, i) => (
            <motion.div
                key={h.dt}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.02 }}
                className="flex-shrink-0 min-w-[90px] p-4 rounded-2xl flex flex-col items-center gap-3 hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
            >
                <p className="text-[10px] font-bold text-muted-foreground">
                {i === 0 ? "Now" : new Date(h.dt * 1000).toLocaleTimeString([], { hour: 'numeric', hour12: true })}
                </p>
                <div className="flex flex-col items-center gap-1">
                <div className="text-4xl">
                    {getIcon(h.weather[0].main)}
                </div>
                {h.pop > 0 && (
                    <div className="flex items-center gap-0.5 text-blue-500">
                    <WiRaindrops className="text-lg" />
                    <span className="text-[9px] font-black">{Math.round(h.pop * 100)}%</span>
                    </div>
                )}
                </div>
                <p className="text-xl font-black text-foreground">{Math.round(h.temp)}°</p>
            </motion.div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyChart;


