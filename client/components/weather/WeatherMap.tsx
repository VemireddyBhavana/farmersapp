import React from "react";
import { Card } from "@/components/ui/card";
import { FiMaximize2, FiLayers, FiPlay } from "react-icons/fi";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

const WeatherMap: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState('now');
  
  return (
    <Card className="rounded-xl border-none bg-[#0b111a] overflow-hidden relative group h-[500px] shadow-xl border border-white/5">
      {/* Map Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/weather_radar_map_1778740324092.png" 
          alt={t("weatherRadar")} 
          className="w-full h-full object-cover transition-transform [transition-duration:15s] group-hover:scale-110 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b111a] via-transparent to-[#0b111a]/20" />
      </div>
      
      {/* HUD: Top Controls */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
        <div className="flex flex-col gap-2">
           <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-lg shadow-2xl flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8bc34a] animate-pulse shadow-[0_0_10px_#8bc34a]" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">{t("weatherRadar")}</span>
           </div>
           <div className="text-[10px] font-bold text-white/40 ml-1">
              Live updates every 5 mins
           </div>
        </div>

        <div className="flex gap-2">
          <button className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg flex items-center justify-center text-white hover:bg-[#ffcc00] hover:text-[#004d73] transition-all group/btn">
            <FiLayers className="group-hover/btn:scale-110 transition-transform" />
          </button>
          <button className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg flex items-center justify-center text-white hover:bg-[#ffcc00] hover:text-[#004d73] transition-all group/btn">
            <FiMaximize2 className="group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Signature Control Bar */}
      <div className="absolute bottom-8 left-8 right-8 flex items-center gap-6">
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl h-14 flex-1 flex p-1.5 shadow-2xl border border-white/10">
           {['now', 'today', 'tomorrow'].map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={cn(
                 "flex-1 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                 activeTab === tab 
                   ? "bg-white text-[#004d73] shadow-lg" 
                   : "text-white/60 hover:text-white hover:bg-white/5"
               )}
             >
               {t(tab)}
             </button>
           ))}
        </div>
        
        <button className="w-14 h-14 bg-[#8bc34a] rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(139,195,74,0.4)] hover:scale-105 active:scale-95 transition-all border-b-4 border-[#689f38]">
           <FiPlay className="ml-1 fill-current text-2xl" />
        </button>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-28 right-8 flex flex-col gap-1">
         <div className="h-40 w-1.5 bg-gradient-to-t from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full" />
         <span className="text-[8px] font-black text-white/60 text-center">MAX</span>
      </div>
    </Card>
  );
};


export default WeatherMap;
