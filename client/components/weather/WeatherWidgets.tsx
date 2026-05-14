import React from "react";
import { motion } from "framer-motion";
import { WiHumidity, WiCloudyWindy, WiSunrise, WiUmbrella, WiBarometer, WiRaindrop } from "react-icons/wi";

interface WeatherWidgetsProps {
  weather: any;
}

const WeatherWidgets: React.FC<WeatherWidgetsProps> = ({ weather }) => {
  const widgets = [
    {
      label: "Rain Chance",
      value: `${Math.round(weather.hourly[0].pop * 100)}%`,
      icon: <WiUmbrella className="text-3xl text-indigo-400" />,
      subValue: "Next 1 Hour",
      color: "bg-indigo-500"
    },
    {
      label: "Air Quality",
      value: "Good",
      icon: <WiCloudyWindy className="text-3xl text-emerald-400" />,
      subValue: "Clear Atmosphere",
      color: "bg-emerald-500"
    },
    {
      label: "Visibility",
      value: `${(weather.current.visibility / 1000).toFixed(1)} km`,
      icon: <WiSunrise className="text-3xl text-amber-400" />,
      subValue: "Clear Horizon",
      color: "bg-amber-500"
    },
    {
      label: "Pressure",
      value: `${weather.current.pressure} hPa`,
      icon: <WiBarometer className="text-3xl text-rose-400" />,
      subValue: "Stable Pressure",
      color: "bg-rose-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {widgets.map((w, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="p-5 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-xl flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
              {w.icon}
            </div>
            <div>
              <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">{w.label}</p>
              <h4 className="text-lg font-black text-white">{w.value}</h4>
              <p className="text-[8px] font-bold text-white/20 uppercase tracking-tighter mt-0.5">{w.subValue}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WeatherWidgets;

