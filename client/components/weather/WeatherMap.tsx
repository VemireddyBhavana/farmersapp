import React from "react";
import { Card } from "@/components/ui/card";
import { FiMaximize2, FiLayers, FiPlay } from "react-icons/fi";
import { motion } from "framer-motion";

const WeatherMap: React.FC = () => {
  return (
    <Card className="rounded-[2.5rem] border-none bg-card/40 backdrop-blur-xl shadow-xl overflow-hidden relative group h-[400px]">
      {/* Map Image */}
      <img 
        src="/weather_radar_map_1778740324092.png" 
        alt="Live Radar" 
        className="w-full h-full object-cover transition-transform duration-[10000ms] group-hover:scale-110"
      />
      
      {/* Overlay UI */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      
      <div className="absolute top-6 left-6 flex flex-col gap-2">
        <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live Satellite Radar
        </div>
        <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/60">
          Sync: 1.2s ago
        </div>
      </div>

      <div className="absolute top-6 right-6 flex flex-col gap-2">
        <button className="p-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 text-white hover:bg-white/10 transition-colors pointer-events-auto">
          <FiLayers />
        </button>
        <button className="p-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 text-white hover:bg-white/10 transition-colors pointer-events-auto">
          <FiMaximize2 />
        </button>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md p-2 pl-4 rounded-2xl border border-white/10 flex-1 mr-4">
           <div className="flex-1">
              <div className="flex justify-between text-[8px] font-black uppercase text-white/40 mb-1">
                <span>00:00</span>
                <span>NOW</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full relative overflow-hidden">
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-emerald-500 w-1/3 rounded-full"
                />
              </div>
           </div>
           <button className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
             <FiPlay />
           </button>
        </div>
      </div>
    </Card>
  );
};

export default WeatherMap;
