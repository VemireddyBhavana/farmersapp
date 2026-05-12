import React from "react";
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { WiDaySunny, WiCloudy, WiRain, WiDayCloudy, WiCloud } from "react-icons/wi";

interface HourlyChartProps {
  hourly: any[];
}

const HourlyChart: React.FC<HourlyChartProps> = ({ hourly }) => {
  const chartData = hourly.slice(0, 12).map((h) => ({
    time: new Date(h.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: Math.round(h.temp),
  }));

  const getIcon = (condition: string) => {
    const iconClass = "text-2xl";
    switch (condition.toLowerCase()) {
      case 'rain': return <WiRain className={`${iconClass} text-blue-400`} />;
      case 'clouds': return <WiCloudy className={`${iconClass} text-slate-300`} />;
      case 'clear': return <WiDaySunny className={`${iconClass} text-amber-400`} />;
      default: return <WiDayCloudy className={`${iconClass} text-emerald-400`} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="h-[180px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f87171" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 p-2 rounded-xl text-[10px] text-white">
                      {payload[0].value}°
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="temp" 
              stroke="#f87171" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#chartGradient)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {hourly.slice(0, 12).map((h, i) => (
          <motion.div
            key={h.dt}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex-shrink-0 min-w-[100px] p-4 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center gap-3 hover:bg-white/10 transition-colors"
          >
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">
              {new Date(h.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-xl font-black text-white">{Math.round(h.temp)}°</p>
            <div className="text-3xl">
              {getIcon(h.weather[0].main)}
            </div>
            <p className="text-[8px] font-bold text-white/20 uppercase tracking-tighter">
              {h.weather[0].description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HourlyChart;
