import React from "react";
import { Card } from "@/components/ui/card";
import { FiMaximize2, FiLayers, FiPlay } from "react-icons/fi";
import { motion } from "framer-motion";

const WeatherMap: React.FC = () => {
  return (
    <Card className="rounded-xl border-none bg-slate-900 overflow-hidden relative group h-[450px] shadow-sm border border-slate-200 dark:border-white/5">
      {/* Map Image */}
      <img 
        src="/weather_radar_map_1778740324092.png" 
        alt="Live Radar" 
        className="w-full h-full object-cover transition-transform [transition-duration:10s] group-hover:scale-110 opacity-90"
      />
      
      {/* HUD Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
      
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded shadow-sm text-[10px] font-bold uppercase tracking-widest text-[#004d73] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          WeatherRadar
        </div>
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
        <button className="p-2 bg-white/90 backdrop-blur-md rounded shadow-sm text-[#004d73] hover:bg-[#ffcc00] transition-all">
          <FiLayers />
        </button>
        <button className="p-2 bg-white/90 backdrop-blur-md rounded shadow-sm text-[#004d73] hover:bg-[#ffcc00] transition-all">
          <FiMaximize2 />
        </button>
      </div>

      {/* Signature Toggle Bar */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
        <div className="bg-[#004d73] rounded-full h-12 flex-1 flex p-1 shadow-2xl border border-white/10">
           <button className="flex-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/30 transition-all">
             now
           </button>
           <button className="flex-1 rounded-full text-white/60 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all">
             today
           </button>
           <button className="flex-1 rounded-full text-white/60 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all">
             tomorrow
           </button>
        </div>
        
        <button className="w-12 h-12 bg-[#8bc34a] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform border-4 border-white/20">
           <FiPlay className="ml-1 fill-current text-xl" />
        </button>
      </div>
    </Card>
  );
};

export default WeatherMap;
