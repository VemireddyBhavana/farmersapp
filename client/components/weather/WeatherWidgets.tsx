import React from "react";
import { motion } from "framer-motion";
import { WiHumidity, WiCloudyWindy, WiSunrise, WiUmbrella } from "react-icons/wi";

interface WeatherWidgetsProps {
  weather: any;
}

const WeatherWidgets: React.FC<WeatherWidgetsProps> = ({ weather }) => {
  const widgets = [
    {
      label: "Humidity",
      value: `${weather.current.humidity}%`,
      icon: <WiHumidity className="text-3xl text-blue-400" />,
      subValue: "Atmosphere Saturation",
      status: "Optimal",
      color: "bg-blue-500"
    },
    {
      label: "Air Quality",
      value: "Good",
      icon: <WiCloudyWindy className="text-3xl text-emerald-400" />,
      subValue: "PM 2.5: 12 µg/m³",
      status: "Healthy",
      color: "bg-emerald-500",
      isStatus: true
    },
    {
      label: "Visibility",
      value: `${(weather.current.visibility / 1000).toFixed(1)} km`,
      icon: <WiSunrise className="text-3xl text-amber-400" />,
      subValue: "Clear Horizon",
      status: "High",
      color: "bg-amber-500"
    },
    {
      label: "Rain Potential",
      value: `${Math.round(weather.hourly[0].pop * 100)}%`,
      icon: <WiUmbrella className="text-3xl text-indigo-400" />,
      subValue: "Next 1 Hour",
      status: "Low",
      color: "bg-indigo-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {widgets.map((w, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -5 }}
          className="p-6 rounded-[2rem] bg-white/40 dark:bg-white/[0.03] backdrop-blur-3xl border border-white/20 dark:border-white/5 flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform">
              {w.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-black/30 dark:text-white/30 uppercase tracking-widest">{w.label}</p>
              <h4 className="text-xl font-black text-emerald-950 dark:text-white">{w.value}</h4>
              <p className="text-[8px] font-bold text-black/20 dark:text-white/20 uppercase tracking-tighter mt-0.5">{w.subValue}</p>
            </div>
          </div>

          <div className="text-right flex flex-col items-end gap-2">
            {w.isStatus ? (
               <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <div className={`h-1.5 w-1.5 rounded-full ${w.color} animate-pulse`} />
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{w.status}</span>
               </div>
            ) : (
                <div className="w-16 h-1 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        className={`h-full ${w.color}`} 
                    />
                </div>
            )}
            <p className="text-[7px] font-black text-black/10 dark:text-white/10 uppercase tracking-[0.3em]">Telemetry Link</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WeatherWidgets;
