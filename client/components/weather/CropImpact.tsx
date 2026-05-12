import React from "react";
import { motion } from "framer-motion";
import { FiActivity, FiArrowUpRight, FiArrowDownRight, FiShield } from "react-icons/fi";

interface CropImpactProps {
  weather: any;
}

const CropImpact: React.FC<CropImpactProps> = ({ weather }) => {
  const crops = [
    { name: "Basmati Rice", health: 92, status: "Optimal", impact: "High humidity favoring rapid leaf development.", trend: "up" },
    { name: "Wheat (HD-2967)", health: 78, status: "Stress", impact: "Temperature surge detected. Monitoring for terminal heat stress.", trend: "down" },
    { name: "Organic Corn", health: 85, status: "Stable", impact: "Solar radiation levels ideal for photosynthesis.", trend: "up" }
  ];

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
            <FiActivity className="text-emerald-500 text-xl" />
            <h3 className="text-white font-black text-xl tracking-tighter uppercase italic">Crop Weather Impact</h3>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest">
            <FiShield className="text-emerald-500" />
            AI Protection Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {crops.map((crop, i) => (
          <motion.div
            key={crop.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-[3rem] bg-white/5 border border-white/5 backdrop-blur-3xl relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-6">
                {crop.trend === 'up' ? 
                    <FiArrowUpRight className="text-emerald-500 text-2xl drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> : 
                    <FiArrowDownRight className="text-red-500 text-2xl drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                }
            </div>

            <div className="space-y-6">
                <div>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">{crop.status}</p>
                    <h4 className="text-2xl font-black text-white tracking-tighter">{crop.name}</h4>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Health Index</span>
                        <span className="text-xl font-black text-white">{crop.health}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${crop.health}%` }}
                            transition={{ duration: 1.5, delay: i * 0.2 }}
                            className={`h-full ${crop.health > 80 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]'} rounded-full`} 
                        />
                    </div>
                </div>

                <p className="text-xs font-medium text-white/60 leading-relaxed italic border-t border-white/5 pt-6">
                    "{crop.impact}"
                </p>
            </div>

            {/* Neon Glow Corner */}
            <div className={`absolute -bottom-10 -left-10 w-32 h-32 ${crop.health > 80 ? 'bg-emerald-500/10' : 'bg-amber-500/10'} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CropImpact;
