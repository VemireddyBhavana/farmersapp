import React from "react";
import { motion } from "framer-motion";
import { FiDroplet, FiZap, FiTarget, FiBox, FiCpu, FiTrendingUp, FiLayers, FiCalendar } from "react-icons/fi";
import { WiDaySunny } from "react-icons/wi";

interface AIRecommendationsProps {
  weather: any;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ weather }) => {
  const insights = [
    {
      id: "irrigation",
      title: "Irrigation Advice",
      value: "70%",
      status: "Optimal Range",
      desc: "Watering recommended at 05:00 AM for maximum absorption.",
      icon: <FiDroplet className="text-blue-400" />,
      color: "border-blue-500/20"
    },
    {
      id: "crops",
      title: "Crop Suggestions",
      value: "High Yield",
      status: "Wheat & Barley",
      desc: "Atmospheric pressure favors deep-root grain cultivation today.",
      icon: <FiTrendingUp className="text-emerald-400" />,
      color: "border-emerald-500/20"
    },
    {
      id: "tips",
      title: "Weather Farming Tips",
      value: "Safe Phase",
      status: "Nominal Conditions",
      desc: "Wind speeds are low; ideal for canopy management and pruning.",
      icon: <FiZap className="text-amber-400" />,
      color: "border-amber-500/20"
    },
    {
      id: "fertilizer",
      title: "Soil Nutrition",
      value: "Balanced",
      status: "N: 120 | P: 60 | K: 80",
      desc: "Optimal nutrient profile. Next application scheduled for June 15.",
      icon: <FiLayers className="text-indigo-400" />,
      color: "border-indigo-500/20"
    }
  ];

  const irrigationSchedule = [
    { date: "Sat, Jun 7", et: "5.2mm", qty: "25mm", time: "06:00-08:00", pop: "5%" },
    { date: "Tue, Jun 10", et: "4.8mm", qty: "20mm", time: "05:30-07:30", pop: "30%" },
    { date: "Fri, Jun 13", et: "5.5mm", qty: "30mm", time: "06:00-08:30", pop: "10%" },
  ];

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Agricultural AI</p>
          <h3 className="text-3xl font-black text-emerald-950 dark:text-white tracking-tighter italic uppercase">Smart Farming <span className="text-emerald-500">Insights</span></h3>
        </div>
        <div className="h-12 w-12 rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center">
            <FiCpu className="text-2xl text-emerald-500 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className={`p-8 rounded-[3rem] bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl border ${insight.color} flex flex-col gap-6 group transition-all`}
          >
            <div className="flex items-start justify-between">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 group-hover:scale-110 transition-transform">
                {insight.icon}
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-black/30 dark:text-white/30 uppercase tracking-widest">{insight.title}</p>
                <h4 className="text-2xl font-black text-emerald-950 dark:text-white tracking-tight">{insight.value}</h4>
              </div>
            </div>

            <div className="space-y-3">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{insight.status}</span>
               </div>
               <p className="text-sm font-bold text-black/60 dark:text-white/60 leading-relaxed italic group-hover:text-emerald-950 dark:group-hover:text-white transition-colors">
                 "{insight.desc}"
               </p>
            </div>

            <div className="pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
               <span className="text-[8px] font-black text-black/20 dark:text-white/20 uppercase tracking-[0.3em]">Telemetry Phase: 0{i + 1}</span>
               <div className="flex -space-x-2">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="h-6 w-6 rounded-full border-2 border-white dark:border-black bg-emerald-500/10 flex items-center justify-center overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${j + 20}`} alt="AI" className="w-full h-full object-cover grayscale" />
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hero Insight Card: Growth & Yield */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <motion.div 
            whileHover={{ scale: 1.01 }}
            className="lg:col-span-7 relative h-[450px] rounded-[4rem] overflow-hidden border border-white/20 shadow-2xl group"
        >
            <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                alt="Nature" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent opacity-80" />
            
            <div className="absolute bottom-0 left-0 p-12 space-y-4">
                <div className="flex items-center gap-4">
                <span className="h-10 w-1 bg-emerald-500" />
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.5em]">Executive Summary</p>
                </div>
                <h4 className="text-4xl font-black text-white tracking-tighter italic">Growth & Yield <br/>Projection Matrix</h4>
                
                <div className="grid grid-cols-2 gap-8 mt-8 pt-8 border-t border-white/10">
                    <div>
                        <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Planting Date</p>
                        <p className="text-xl font-black text-white">Mar 15, 2025</p>
                    </div>
                    <div>
                        <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Expected Harvest</p>
                        <p className="text-xl font-black text-white">Jul 25, 2025</p>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Irrigation Schedule Table */}
        <div className="lg:col-span-5 p-10 rounded-[4rem] bg-white/40 dark:bg-white/[0.03] backdrop-blur-3xl border border-white/20 dark:border-white/5 flex flex-col justify-between">
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Hydration Ops</p>
                        <h4 className="text-xl font-black text-emerald-950 dark:text-white">Irrigation Schedule</h4>
                    </div>
                    <button className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">+</button>
                </div>

                <div className="space-y-4">
                    {irrigationSchedule.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-white/40 dark:bg-white/[0.02] border border-white/20 dark:border-white/5 group hover:bg-emerald-500/5 transition-all">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest">{item.date}</p>
                                <p className="text-sm font-black text-emerald-950 dark:text-white">{item.time}</p>
                            </div>
                            <div className="text-right space-y-1">
                                <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[8px] font-black uppercase tracking-widest">
                                    Rain: {item.pop}
                                </div>
                                <p className="text-xs font-black text-black/60 dark:text-white/60">{item.qty}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className="w-full mt-8 py-5 rounded-[2rem] border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-white transition-all">
                Update Schedule Feed
            </button>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
