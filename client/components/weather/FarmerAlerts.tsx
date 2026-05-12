import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle, FiDroplet, FiSun, FiWind } from "react-icons/fi";

interface FarmerAlertsProps {
  weather: any;
}

const FarmerAlerts: React.FC<FarmerAlertsProps> = ({ weather }) => {
  const current = weather.current;
  const alerts = [];

  // Dynamic alert logic based on weather data
  if (current.temp > 35) alerts.push({ type: "high-temp", msg: "High temperature detected. Ensure extra hydration for crops.", icon: <FiSun />, color: "border-orange-500/50 text-orange-400" });
  if (current.wind_speed > 25) alerts.push({ type: "high-wind", msg: "Strong winds detected. Avoid delicate spraying today.", icon: <FiWind />, color: "border-blue-500/50 text-blue-400" });
  if (weather.daily[0].pop > 0.5) alerts.push({ type: "rain", msg: "Heavy rain expected tomorrow. Avoid pesticide application.", icon: <FiDroplet />, color: "border-blue-400/50 text-blue-300" });
  
  // Default advice if no alerts
  if (alerts.length === 0) {
    alerts.push({ type: "info", msg: "Conditions are stable. Best irrigation time: Evening 6 PM.", icon: <FiAlertTriangle />, color: "border-emerald-500/50 text-emerald-400" });
  }

  return (
    <div className="mt-12">
      <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
        <span className="h-6 w-1 bg-emerald-500 rounded-full" />
        Smart Farming Alerts
      </h3>
      <div className="space-y-4">
        <AnimatePresence>
          {alerts.map((alert, i) => (
            <motion.div
              key={alert.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-3xl bg-white/5 backdrop-blur-md border ${alert.color} flex items-start gap-4 relative overflow-hidden group shadow-lg`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
              <div className="text-2xl mt-1">
                {alert.icon}
              </div>
              <div>
                <p className="text-sm font-bold tracking-tight leading-relaxed">
                  {alert.msg}
                </p>
                <div className="mt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60">
                  <span className="h-1 w-1 rounded-full bg-current animate-pulse" />
                  Live Notification
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FarmerAlerts;
