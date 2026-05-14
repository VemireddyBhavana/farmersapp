import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertCircle, FiDroplet, FiSun, FiWind, FiActivity } from "react-icons/fi";
import { Bug } from "lucide-react";

interface FarmerAlertsProps {
  weather: any;
}

const FarmerAlerts: React.FC<FarmerAlertsProps> = ({ weather }) => {
  const alerts = [
    {
      id: "rain",
      title: "Heavy Rain Expected",
      priority: "CRITICAL",
      msg: "45mm rain expected soon. Check field drainage and avoid fertilization.",
      icon: <FiDroplet />,
      color: "border-red-500/30 bg-red-500/10 text-red-500",
      accent: "bg-red-500"
    },
    {
      id: "heat",
      title: "Heat Warning",
      priority: "WARNING",
      msg: "Temp above 38°C today. Increase watering for young crops.",
      icon: <FiSun />,
      color: "border-amber-500/30 bg-amber-500/10 text-amber-500",
      accent: "bg-amber-500"
    },
    {
      id: "wind",
      title: "Strong Winds",
      priority: "ADVISORY",
      msg: "32km/h winds detected. Secure equipment and nursery covers.",
      icon: <FiWind />,
      color: "border-blue-500/30 bg-blue-500/10 text-blue-500",
      accent: "bg-blue-500"
    },
    {
      id: "pest",
      title: "Pest Risk",
      priority: "INFO",
      msg: "Current humidity levels increase risk of fungal growth in Zone C.",
      icon: <Bug />,
      color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
      accent: "bg-emerald-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
            <FiAlertCircle className="text-red-500 text-xl" />
            <h3 className="text-white font-black text-xl tracking-tighter uppercase italic">Agricultural Alerts</h3>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {alerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-5 rounded-3xl border-l-4 ${alert.color.split(' ')[0]} ${alert.color.split(' ')[1]} backdrop-blur-xl relative overflow-hidden group shadow-lg transition-all`}
            >
              <div className="flex items-start gap-4 relative z-10">
                <div className={`p-3 rounded-2xl ${alert.accent}/20 text-2xl ${alert.color.split(' ')[2]}`}>
                  {alert.icon}
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <p className={`text-xs font-black uppercase tracking-widest ${alert.color.split(' ')[2]}`}>{alert.title}</p>
                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${alert.accent} text-white`}>
                            {alert.priority}
                        </span>
                    </div>
                    <p className="text-xs font-medium text-white/70 leading-relaxed">
                        {alert.msg}
                    </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button className="w-full mt-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
         Acknowledge All Alerts
      </button>
    </div>
  );
};

export default FarmerAlerts;

