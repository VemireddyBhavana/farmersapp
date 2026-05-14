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
      title: "Watering Advice",
      value: "Morning Shift",
      desc: "Best time to water is tomorrow morning between 5:00 AM and 7:00 AM.",
      icon: <FiDroplet className="text-blue-400" />,
      color: "border-blue-500/20"
    },
    {
      id: "crops",
      title: "Planting Window",
      value: "Good",
      desc: "Current soil moisture is ideal for transplanting seedlings.",
      icon: <FiTrendingUp className="text-emerald-400" />,
      color: "border-emerald-500/20"
    },
    {
      id: "tips",
      title: "Fertilizer Tip",
      value: "Safe to Apply",
      desc: "Low wind speeds and no rain expected. Good window for spraying.",
      icon: <FiZap className="text-amber-400" />,
      color: "border-amber-500/20"
    },
    {
      id: "health",
      title: "Crop Health",
      value: "Stable",
      desc: "Vegetation vigor is holding steady. No immediate threats detected.",
      icon: <FiLayers className="text-indigo-400" />,
      color: "border-indigo-500/20"
    }
  ];

  const irrigationSchedule = [
    { date: "Sat, Jun 7", qty: "25mm", time: "06:00 AM", rain: "5%" },
    { date: "Tue, Jun 10", qty: "20mm", time: "05:30 AM", rain: "30%" },
    { date: "Fri, Jun 13", qty: "30mm", time: "06:00 AM", rain: "10%" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Smart Advisor</p>
          <h3 className="text-3xl font-black text-white tracking-tighter italic uppercase">Farming Recommendations</h3>
        </div>
        <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <FiCpu className="text-xl text-emerald-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-4 group transition-all hover:bg-white/10`}
          >
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                {insight.icon}
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">{insight.title}</p>
                <h4 className="text-xl font-black text-white">{insight.value}</h4>
              </div>
            </div>

            <p className="text-xs font-medium text-white/60 leading-relaxed italic">
              "{insight.desc}"
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12 p-8 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Hydration Schedule</p>
                    <h4 className="text-xl font-black text-white italic">Irrigation Tasks</h4>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {irrigationSchedule.map((item, i) => (
                    <div key={i} className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:bg-emerald-500/5 transition-all">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">{item.date}</p>
                        <p className="text-lg font-black text-white mb-3">{item.time}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                            <span className="text-[9px] font-black text-blue-400 uppercase">Rain: {item.rain}</span>
                            <span className="text-[9px] font-black text-white/60 uppercase">{item.qty} Water</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;

