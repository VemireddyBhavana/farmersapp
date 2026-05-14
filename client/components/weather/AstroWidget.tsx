import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
    <div className="grid gap-6">
      {/* Sun Card */}
      <Card className="rounded-xl border-none bg-white dark:bg-slate-900 shadow-sm overflow-hidden border border-slate-100 dark:border-white/5">
        <CardHeader className="p-6 pb-2">
           <CardTitle className="text-sm font-bold text-[#333] dark:text-white flex items-center gap-2">
              <FiSun className="text-amber-500" /> Sun
           </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-2">
           <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded bg-amber-50 flex items-center justify-center text-xl text-amber-500">
                    <FiSunrise />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Sunrise</p>
                    <p className="text-lg font-black text-slate-700 dark:text-white">{sunrise}</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded bg-indigo-50 flex items-center justify-center text-xl text-indigo-500">
                    <FiSunset />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Sunset</p>
                    <p className="text-lg font-black text-slate-700 dark:text-white">{sunset}</p>
                 </div>
              </div>
           </div>
           <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-3 border border-slate-100 dark:border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Daylight duration</span>
              <span className="text-xs font-black text-[#333] dark:text-white">13h 33m</span>
           </div>
        </CardContent>
      </Card>

      {/* Moon Card */}
      <Card className="rounded-xl border-none bg-white dark:bg-slate-900 shadow-sm overflow-hidden border border-slate-100 dark:border-white/5">
        <CardHeader className="p-6 pb-2">
           <CardTitle className="text-sm font-bold text-[#333] dark:text-white flex items-center gap-2">
              <FiMoon className="text-slate-400" /> Moon
           </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-2">
           <div className="flex items-center justify-between">
              <div className="space-y-4">
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Moonrise</p>
                    <p className="text-lg font-black text-slate-700 dark:text-white">10:42 AM</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Moonset</p>
                    <p className="text-lg font-black text-slate-700 dark:text-white">11:58 PM</p>
                 </div>
                 <div className="pt-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Moon phase</p>
                    <p className="text-xs font-bold text-[#004d73] dark:text-[#ffcc00]">Waxing Gibbous</p>
                 </div>
              </div>
              <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center text-5xl text-white shadow-2xl relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                 <FiMoon className="relative z-10 opacity-40" />
                 <div className="absolute top-2 left-2 w-full h-full bg-slate-800 rounded-full blur-xl opacity-50" />
              </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AstroWidget;
