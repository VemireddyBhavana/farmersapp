import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FiSunrise, FiSunset, FiMoon, FiSun } from "react-icons/fi";
import { motion } from "framer-motion";

interface AstroWidgetProps {
  current: any;
}

const AstroWidget: React.FC<AstroWidgetProps> = ({ current }) => {
  if (!current) return null;

  const sunrise = new Date(current.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(current.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Card className="rounded-[2.5rem] border-none bg-white dark:bg-slate-900 shadow-xl overflow-hidden h-full flex flex-col">
      <div className="p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#004d73] dark:text-white flex items-center gap-2">
           Astro & Sun Cycles
        </h3>
      </div>
      <CardContent className="p-8 flex-1 flex flex-col justify-between space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-2xl text-amber-500">
              <FiSunrise />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sunrise</p>
              <p className="text-xl font-black text-slate-700 dark:text-white">{sunrise}</p>
            </div>
          </div>
          <div className="w-px h-10 bg-slate-100 dark:bg-white/10" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl text-indigo-500">
              <FiSunset />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sunset</p>
              <p className="text-xl font-black text-slate-700 dark:text-white">{sunset}</p>
            </div>
          </div>
        </div>

        <div className="relative h-20 flex items-end justify-center">
           <div className="absolute inset-x-0 bottom-0 h-px bg-slate-100 dark:bg-white/10" />
           <motion.div 
             animate={{ rotate: [0, 180] }}
             transition={{ duration: 2, ease: "easeInOut" }}
             className="absolute bottom-[-10px] left-0 right-0 h-40 border-t-2 border-dashed border-amber-500/30 rounded-t-full pointer-events-none"
           />
           <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 dark:bg-white/5 rounded-full border border-slate-100 dark:border-white/10 z-10">
              <FiSun className="text-amber-500 animate-pulse" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">12h 45m of daylight</span>
           </div>
        </div>

        <div className="bg-slate-50 dark:bg-white/5 rounded-3xl p-6 border border-slate-100 dark:border-white/10 flex items-center justify-between">
          <div className="space-y-1">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Moon Phase</p>
             <h4 className="text-lg font-black text-slate-700 dark:text-white">Waxing Gibbous</h4>
          </div>
          <FiMoon className="text-4xl text-slate-300 dark:text-slate-600" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AstroWidget;
