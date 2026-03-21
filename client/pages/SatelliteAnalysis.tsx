import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Search, 
  Calendar, 
  MapPin, 
  Info, 
  ShieldCheck, 
  Zap, 
  CloudRain, 
  Sun,
  History,
  Scan,
  Maximize2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

const SatelliteAnalysis = () => {
  const { t } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("2026-03-21 08:30 AM");

  const runScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setLastUpdate(new Date().toLocaleString());
    }, 3000);
  };

  const healthData = [
    { label: t('healthyZones'), value: "68%", color: "bg-emerald-500", icon: ShieldCheck },
    { label: t('stressedZones'), value: "22%", color: "bg-amber-500", icon: AlertTriangle },
    { label: t('lowVegetation'), value: "10%", color: "bg-rose-500", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
              {t('satelliteAnalysisTitle')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">
              {t('satelliteAnalysisDesc')}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={runScan}
              disabled={isScanning}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-6 rounded-2xl shadow-xl transition-all active:scale-95"
            >
              <Scan className={cn("mr-2 h-5 w-5", isScanning && "animate-spin")} />
              {isScanning ? "Scanning..." : t('scanFarmArea')}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Map Area */}
          <Card className="lg:col-span-3 h-[70vh] relative overflow-hidden rounded-[3rem] border-none shadow-2xl bg-slate-900 group">
            {/* Satellite Image */}
            <img 
              src="/satellite_farm_health.png" 
              alt="Satellite Farm Map"
              className={cn(
                "w-full h-full object-cover transition-all duration-1000",
                showOverlay ? "brightness-100" : "brightness-75 contrast-125"
              )}
            />

            {/* Scanning Effect Overlay */}
            <AnimatePresence>
              {isScanning && (
                <motion.div 
                  initial={{ top: "-100%" }}
                  animate={{ top: "100%" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] z-10"
                />
              )}
            </AnimatePresence>

            {/* NDVI Legend Overlay */}
            {showOverlay && (
              <div className="absolute top-8 left-8 p-6 rounded-[2rem] bg-slate-900/80 backdrop-blur-xl border border-white/10 text-white space-y-4 shadow-2xl">
                <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  {t('ndviVegetationIndex')}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-md bg-[#22c55e]" />
                    <span className="text-[10px] font-bold uppercase tracking-tight">{t('healthyZones')} (0.7 - 0.9)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-md bg-[#eab308]" />
                    <span className="text-[10px] font-bold uppercase tracking-tight">{t('stressedZones')} (0.3 - 0.6)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-md bg-[#ef4444]" />
                    <span className="text-[10px] font-bold uppercase tracking-tight">{t('lowVegetation')} (0.0 - 0.2)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Map Controls */}
            <div className="absolute bottom-8 right-8 flex flex-col gap-3">
              <button 
                onClick={() => setShowOverlay(!showOverlay)}
                className={cn(
                  "h-14 w-14 rounded-2xl flex items-center justify-center transition-all shadow-2xl backdrop-blur-md border border-white/20",
                  showOverlay ? "bg-emerald-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
                )}
              >
                <Maximize2 className="h-6 w-6" />
              </button>
            </div>

            {/* Location Badge */}
            <div className="absolute bottom-8 left-8 px-6 py-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-white flex items-center gap-3">
              <MapPin className="h-5 w-5 text-emerald-500" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Farm Coordinates</p>
                <p className="text-sm font-bold tracking-tighter italic">18Ã‚Â°31' N, 73Ã‚Â°55' E</p>
              </div>
            </div>
          </Card>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-white dark:bg-slate-900">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                  {t('farmHealthStatus')}
                </h3>
              </div>
              
              <div className="space-y-6">
                {healthData.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                      <span className="text-xl font-black text-slate-900 dark:text-white italic">{item.value}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: item.value }}
                        transition={{ duration: 1, delay: idx * 0.2 }}
                        className={cn("h-full rounded-full", item.color)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <History className="h-24 w-24" />
              </div>
              <div className="relative z-10 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 italic">
                  {t('lastSatelliteUpdate')}
                </p>
                <p className="text-2xl font-black leading-none italic uppercase">
                  {lastUpdate}
                </p>
                <Button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all">
                  View History
                </Button>
              </div>
            </Card>

            <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-white dark:bg-slate-900">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <CloudRain className="h-6 w-6" />
                </div>
                <h4 className="font-black text-slate-900 dark:text-white uppercase italic tracking-tight">Environmental AI</h4>
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                Cloud coverage is expected to be 15% for the next 48 hours. Solar radiation is high, favoring rapid photosynthesis.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder for missing icon in some envs
const AlertTriangle = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
);

export default SatelliteAnalysis;
