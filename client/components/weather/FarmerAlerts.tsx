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
      title: "Heavy Rain Alert",
      priority: "CRITICAL",
      msg: "Expect 45mm precipitation within the next 6 hours. High risk of field runoff.",
      risk: 85,
      icon: <FiDroplet />,
      color: "border-red-500/30 text-red-500 bg-red-500/5",
      accent: "bg-red-500"
    },
    {
      id: "heat",
      title: "Heatwave Alert",
      priority: "WARNING",
      msg: "Solar peak exceeding 38°C. Immediate irrigation required for sensitive seedlings.",
      risk: 72,
      icon: <FiSun />,
      color: "border-amber-500/30 text-amber-500 bg-amber-500/5",
      accent: "bg-amber-500"
    },
    {
      id: "wind",
      title: "Wind Warning",
      priority: "ADVISORY",
      msg: "Gale force winds detected (32km/h). Secure all greenhouse structures.",
      risk: 45,
      icon: <FiWind />,
      color: "border-blue-500/30 text-blue-500 bg-blue-500/5",
      accent: "bg-blue-500"
    },
    {
      id: "pest",
      title: "Pest Risk Alert",
      priority: "AI INTEL",
      msg: "Humidity levels favor Locust swarm migration in Zone C-12.",
      risk: 92,
      icon: <Bug />,
      color: "border-emerald-500/30 text-emerald-500 bg-emerald-500/5",
      accent: "bg-emerald-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            <h3 className="text-emerald-950 dark:text-white font-black text-xl tracking-tighter uppercase italic">Alert Protocol</h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[8px] font-black text-red-500 uppercase tracking-widest">
            {alerts.length} Active Events
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {alerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className={`p-8 rounded-[3rem] border-t border-l border-white/20 border-b border-r border-white/5 ${alert.color} backdrop-blur-[40px] relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all cursor-pointer`}
            >
              {/* Refractive border effect */}
              <div className="absolute inset-0 border border-white/10 rounded-[3rem] pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              
              <div className="flex items-start gap-6 relative z-10">
                <div className={`p-5 rounded-3xl ${alert.accent}/20 border border-white/10 text-3xl shadow-inner`}>
                  {alert.icon}
                </div>
                <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/80">{alert.title}</p>
                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${alert.accent}/30 border border-white/10 text-white`}>
                            {alert.priority}
                        </span>
                    </div>
                    <p className="text-sm font-medium text-white/70 leading-relaxed italic">
                        {alert.msg}
                    </p>
                    
                    {/* Risk Level Bar */}
                    <div className="pt-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Risk Intensity</span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{alert.risk}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${alert.risk}%` }}
                                transition={{ duration: 1.5, delay: i * 0.2 }}
                                className={`h-full ${alert.accent} shadow-[0_0_15px_rgba(255,255,255,0.3)]`} 
                            />
                        </div>
                    </div>
                </div>
              </div>

              {/* Decorative scan line */}
              <motion.div 
                animate={{ top: ["-100%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className={`absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-white/5 to-transparent blur-2xl pointer-events-none`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button className="w-full mt-6 py-4 rounded-[2rem] bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20">
         Acknowledge All
      </button>
    </div>
  );
};

export default FarmerAlerts;
