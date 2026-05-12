import React from "react";
import { motion } from "framer-motion";

interface SoilMoistureProps {
  value: number;
}

const SoilMoisture: React.FC<SoilMoistureProps> = ({ value = 65 }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="mt-20">
      <h3 className="text-emerald-950 dark:text-white font-black text-3xl mb-10 flex items-center gap-4 uppercase tracking-tighter italic transition-colors duration-700">
        <span className="h-10 w-2 bg-emerald-500 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.8)]" />
        Soil Intelligence
      </h3>
      <div className="p-12 rounded-[4rem] bg-white/70 dark:bg-black/60 backdrop-blur-[50px] border border-emerald-500/10 dark:border-white/10 flex flex-col sm:flex-row items-center gap-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_0_80px_rgba(0,0,0,0.4)] overflow-hidden relative group transition-colors duration-700">
        {/* Technical Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
        
        {/* Floating Scanline Animation (Dark Only) */}
        <motion.div 
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.05] to-transparent h-40 w-full pointer-events-none hidden dark:block"
        />

        <div className="relative flex items-center justify-center">
          <div className="absolute w-56 h-56 rounded-full border border-emerald-500/10 dark:border-emerald-500/20 animate-pulse" />
          <div className="absolute w-64 h-64 rounded-full border border-emerald-500/5 dark:border-emerald-500/10 scale-110" />
          
          <svg className="w-56 h-56 transform -rotate-90">
            <circle
              cx="112"
              cy="112"
              r={radius}
              stroke="rgba(0,0,0,0.02)"
              strokeWidth="20"
              fill="transparent"
              className="dark:stroke-white/[0.03]"
            />
            <motion.circle
              cx="112"
              cy="112"
              r={radius}
              stroke="url(#hyperEmerald)"
              strokeWidth="20"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 3, ease: "circOut" }}
              strokeLinecap="round"
              className="drop-shadow-[0_0_20px_rgba(16,185,129,0.5)] dark:drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]"
            />
            <defs>
              <linearGradient id="hyperEmerald" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-black text-emerald-950 dark:text-white tracking-tighter drop-shadow-sm dark:drop-shadow-glow transition-colors duration-700">{value}%</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.4em] mt-2">H2O Level</span>
          </div>
        </div>

        <div className="flex-1 space-y-8 relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[11px] font-black uppercase tracking-widest">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              Telemetry: Nominal
            </div>
            <p className="text-emerald-900/70 dark:text-white/70 text-lg leading-relaxed font-bold italic transition-colors duration-700">
              Quantum sensors confirm <span className="text-emerald-950 dark:text-white">68.4%</span> moisture saturation in root zone A-12.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 border-t border-black/5 dark:border-white/10 pt-8 transition-colors duration-700">
            <div className="space-y-1">
              <p className="text-black/30 dark:text-white/30 text-[9px] font-black uppercase tracking-[0.2em]">Retentivity</p>
              <p className="text-2xl font-black text-emerald-950 dark:text-white tracking-tight">84.2<span className="text-xs text-emerald-500/60 ml-1">PSI</span></p>
            </div>
            <div className="space-y-1">
              <p className="text-black/30 dark:text-white/30 text-[9px] font-black uppercase tracking-[0.2em]">Drainage</p>
              <p className="text-2xl font-black text-emerald-950 dark:text-white tracking-tight italic">Low <span className="text-xs text-blue-500/60 ml-1 dark:text-blue-400/60">v1.2</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilMoisture;
