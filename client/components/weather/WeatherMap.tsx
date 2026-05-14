import React from "react";
import { Card } from "@/components/ui/card";
import { FiMaximize2, FiLayers, FiPlay } from "react-icons/fi";
import { motion } from "framer-motion";

const WeatherMap: React.FC = () => {
  return (
    <Card className="rounded-[2.5rem] border-none bg-slate-900 overflow-hidden relative group h-[400px] shadow-2xl">
      {/* Map Image */}
      <img 
        src="/weather_radar_map_1778740324092.png" 
        alt="Live Radar" 
        className="w-full h-full object-cover transition-transform [transition-duration:10s] group-hover:scale-110 opacity-80"
      />
      
      {/* HUD Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 border-[16px] border-slate-900/20 pointer-events-none" />
      
      <div className="absolute top-6 left-6 flex flex-col gap-3">
        <div className="bg-[#ffcc00] px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-[#004d73] flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#004d73] animate-ping" />
          Live WeatherRadar
        </div>
        <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/60">
          Scan interval: 5m
        </div>
      </div>

      <div className="absolute top-6 right-6 flex flex-col gap-2">
        {[FiLayers, FiMaximize2].map((Icon, i) => (
          <button key={i} className="p-3 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/10 text-white hover:bg-[#ffcc00] hover:text-[#004d73] transition-all pointer-events-auto shadow-xl">
            <Icon className="text-lg" />
          </button>
        ))}
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-4 bg-slate-900/90 backdrop-blur-xl p-3 pl-5 rounded-2xl border border-white/10 flex-1 mr-4 shadow-2xl">
           <div className="flex-1">
              <div className="flex justify-between text-[8px] font-black uppercase text-white/40 mb-2 tracking-tighter">
                <span>-3h</span>
                <span>-2h</span>
                <span>-1h</span>
                <span className="text-[#ffcc00]">NOW</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full relative overflow-hidden">
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-[#ffcc00] w-1/4 rounded-full shadow-[0_0_10px_#ffcc00]"
                />
              </div>
           </div>
           <button className="w-12 h-12 bg-[#ffcc00] rounded-xl flex items-center justify-center text-[#004d73] shadow-lg hover:scale-105 transition-transform">
             <FiPlay className="text-xl fill-current" />
           </button>
        </div>
      </div>
    </Card>
  );
};

export default WeatherMap;
