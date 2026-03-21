import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  MapPin, 
  BarChart3, 
  Zap, 
  ArrowRight,
  Info,
  ChevronDown,
  LayoutDashboard,
  Sprout,
  Wheat,
  CloudRain,
  Sun
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

const YieldPrediction = () => {
  const { t } = useLanguage();
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionData, setPredictionData] = useState<any>(null);

  const handlePredict = () => {
    setIsPredicting(true);
    setTimeout(() => {
      setPredictionData({
        yield: "12.5",
        unit: "Tons",
        confidence: 94,
        comparison: "+15%",
        marketValue: "ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹2.5L",
        breakdown: [
          { month: "Apr", growth: 20 },
          { month: "May", growth: 45 },
          { month: "Jun", growth: 70 },
          { month: "Jul", growth: 95 }
        ]
      });
      setIsPredicting(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 pt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6"
          >
            <Zap className="h-4 w-4 fill-amber-500" />
            <span>AI Predictive Engine v4.0</span>
          </motion.div>
          <h1 className="text-4xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic leading-[0.9] mb-6">
            {t('yieldPredictionTitle')}
          </h1>
          <p className="text-xl text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
            {t('yieldPredictionDesc')}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          
          {/* Input Form Card */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-white dark:bg-slate-900">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-8 flex items-center gap-2">
                <LayoutDashboard className="h-6 w-6 text-emerald-500" /> 
                Farm Configuration
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Select Crop</label>
                  <div className="relative group">
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl p-4 text-sm font-bold italic appearance-none cursor-pointer outline-none transition-all">
                      <option>Rice (Paddy)</option>
                      <option>Wheat</option>
                      <option>Cotton</option>
                      <option>Maize</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none group-hover:text-emerald-500 transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Farm Area (Acre)</label>
                  <input type="number" defaultValue="5" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl p-4 text-sm font-bold italic outline-none transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Sowing Date</label>
                  <input type="date" defaultValue="2026-03-20" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl p-4 text-sm font-bold italic outline-none transition-all cursor-pointer" />
                </div>

                <Button 
                  onClick={handlePredict}
                  disabled={isPredicting}
                  className="w-full h-20 bg-slate-900 hover:bg-emerald-600 text-white font-black rounded-3xl italic text-lg shadow-2xl transition-all active:scale-95 group"
                >
                  {isPredicting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                      <Zap className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  ) : (
                    <span className="flex items-center gap-3">
                      Calculate Yield <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </div>
            </Card>

            <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-slate-900 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Info className="h-24 w-24" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-4 italic">How it works</p>
              <p className="text-sm font-medium leading-relaxed italic opacity-80">
                Our model analyzes 10+ years of local weather data, soil moisture levels from satellite imagery, and crop germination rates to predict your harvest with 90% accuracy.
              </p>
            </Card>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!predictionData && !isPredicting ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 rounded-[3.5rem] bg-white border-4 border-dashed border-slate-100"
                >
                  <BarChart3 className="h-24 w-24 text-slate-100 mb-6" />
                  <h4 className="text-2xl font-black text-slate-300 italic uppercase">Provide farm config to run AI model</h4>
                </motion.div>
              ) : isPredicting ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900 rounded-[3.5rem] p-12 text-center"
                >
                  <div className="relative w-64 h-64 mb-12">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-4 border-dashed border-white/10"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-4 rounded-full border-4 border-dashed border-emerald-500/20"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Zap className="h-20 w-20 text-emerald-500 animate-pulse fill-emerald-500/20" />
                    </div>
                  </div>
                  <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">Analyzing Multi-Source Data...</h4>
                  <p className="text-emerald-400 font-black uppercase tracking-widest text-xs">Crunching Weather, Soil & Satellite Inputs</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  {/* Top Stats */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-white dark:bg-slate-900 group">
                      <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-[1.5rem] flex items-center justify-center mb-6">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 italic">{t('expectedHarvest')}</p>
                      <h4 className="text-5xl font-black text-slate-900 dark:text-white italic tracking-tighter leading-none">
                        {predictionData.yield} <span className="text-xl font-bold uppercase">{predictionData.unit}</span>
                      </h4>
                    </Card>

                    <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-slate-900 text-white group overflow-hidden relative">
                      <div className="h-12 w-12 bg-white/10 text-white rounded-[1.5rem] flex items-center justify-center mb-6">
                        <Target className="h-6 w-6" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1 italic">{t('confidenceScore')}</p>
                      <h4 className="text-5xl font-black italic tracking-tighter leading-none">
                        {predictionData.confidence}%
                      </h4>
                      {/* Gauge simulation */}
                      <div className="absolute bottom-4 left-8 right-8 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${predictionData.confidence}%` }}
                          className="h-full bg-emerald-500"
                        />
                      </div>
                    </Card>

                    <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-white dark:bg-slate-900 group">
                      <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-[1.5rem] flex items-center justify-center mb-6">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 italic">Comparison to Avg</p>
                      <h4 className="text-5xl font-black text-emerald-600 italic tracking-tighter leading-none">
                        {predictionData.comparison}
                      </h4>
                    </Card>
                  </div>

                  {/* Charts & Graphs Area */}
                  <Card className="p-10 rounded-[4rem] border-none shadow-2xl bg-slate-900 text-white overflow-hidden relative min-h-[400px]">
                    <div className="flex items-center justify-between mb-12">
                      <div>
                        <h4 className="text-2xl font-black uppercase italic tracking-tighter leading-none mb-2">Estimated Market Value</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Based on current NCDEX index</p>
                      </div>
                      <div className="text-right">
                        <h5 className="text-5xl font-black italic tracking-tighter leading-none text-emerald-500">{predictionData.marketValue}</h5>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 items-end gap-6 h-48 relative">
                      {predictionData.breakdown.map((bar: any, i: number) => (
                        <div key={i} className="space-y-4">
                          <div className="relative group">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${bar.growth}%` }}
                              transition={{ duration: 1.5, delay: i * 0.1 }}
                              className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] relative group-hover:brightness-110 transition-all"
                            />
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black italic bg-white text-slate-900 px-2 py-1 rounded-md">
                              {bar.growth}%
                            </div>
                          </div>
                          <p className="text-center text-[10px] font-black uppercase tracking-widest opacity-60 italic">{bar.month}</p>
                        </div>
                      ))}
                      {/* Grid Lines */}
                      <div className="absolute inset-0 border-b border-white/10 flex flex-col justify-between pointer-events-none">
                        <div className="border-t border-white/5 w-full h-px" />
                        <div className="border-t border-white/5 w-full h-px" />
                        <div className="border-t border-white/5 w-full h-px" />
                      </div>
                    </div>

                    <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/10">
                       <div className="flex gap-12">
                         <div className="flex items-center gap-3">
                           <CloudRain className="h-5 w-5 text-blue-400" />
                           <span className="text-[10px] font-black uppercase tracking-tight italic">Optimized Rain</span>
                         </div>
                         <div className="flex items-center gap-3">
                           <Sun className="h-5 w-5 text-yellow-500" />
                           <span className="text-[10px] font-black uppercase tracking-tight italic">Max Solar Input</span>
                         </div>
                       </div>
                       <Button variant="outline" className="rounded-2xl border-white/20 bg-white/5 hover:bg-white/10 font-black italic uppercase tracking-widest px-8">Export Dataset</Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;
