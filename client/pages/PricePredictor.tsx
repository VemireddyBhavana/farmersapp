import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  AlertCircle,
  Calendar,
  IndianRupee,
  BarChart3,
  BrainCircuit,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

const PricePredictor = () => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePredict = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2500);
  };

  const crops = ["Wheat", "Rice", "Cotton", "Onion", "Potato", "Soybean"];
  const marketFactorsList = ["heavyRainfall", "exportBansLifted", "festiveDemand"];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 pt-10">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-indigo-100 text-indigo-600 mb-6">
             <BrainCircuit className="h-8 w-8" />
          </div>
          <h1 className="text-4xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic leading-[0.9] mb-4">
            {t('predictPriceTitle') || "Mandi Price Predictor AI"}
          </h1>
          <p className="text-xl text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
            {t('predictPriceDesc') || "AI market intelligence to help you decide whether to hold or sell."}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-white dark:bg-slate-900">
               <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-6">{t("selectCommodity")}</h3>
               <div className="flex flex-wrap gap-3 mb-8">
                 {crops.map(c => (
                   <button 
                     key={c}
                     onClick={() => { setSelectedCrop(c); handlePredict(); }}
                     className={cn("px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest italic transition-all", selectedCrop === c ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200")}
                   >
                     {t(c.toLowerCase())}
                   </button>
                 ))}
               </div>

               <div className="relative group mb-6">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input type="text" placeholder={t("searchOtherCrops")} className="w-full h-14 pl-14 pr-6 bg-slate-50 dark:bg-slate-800 border-none shadow-inner rounded-2xl text-xs font-bold italic outline-none focus:ring-2 focus:ring-indigo-500/50" />
               </div>

               <Button onClick={handlePredict} className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest italic shadow-xl shadow-indigo-500/20">
                 {t("runAiForecast")}
               </Button>
            </Card>

            <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-indigo-600 text-white space-y-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 italic">{t("currentMandiRate")}</p>
               <h4 className="text-5xl font-black italic tracking-tighter leading-none flex items-center">
                 <IndianRupee className="h-8 w-8 mr-1 opacity-80" /> 2,450
               </h4>
               <p className="text-xs font-bold text-indigo-100 uppercase tracking-widest">{t("perQuintal")}</p>
            </Card>
          </div>

          {/* Forecast Area */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="p-10 rounded-[3rem] border-none shadow-xl bg-white dark:bg-slate-900 min-h-[400px] flex flex-col">
               <div className="flex items-center justify-between mb-12">
                 <div className="flex items-center gap-4">
                   <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                     <BarChart3 className="h-6 w-6" />
                   </div>
                   <div>
                     <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{t("thirtyDayForecast")}</h3>
                     <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{t("analysisFor")} {t(selectedCrop.toLowerCase())}</p>
                   </div>
                 </div>
                 <div className="flex gap-2">
                   {['7D', '14D', '30D'].map(d => (
                     <button key={d} className="h-8 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors uppercase">{d}</button>
                   ))}
                 </div>
               </div>

               <AnimatePresence mode="wait">
                 {isAnalyzing ? (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center space-y-6">
                     <div className="relative w-20 h-20">
                       <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-indigo-600" />
                       <BrainCircuit className="absolute inset-0 m-auto h-8 w-8 text-indigo-600 animate-pulse" />
                     </div>
                     <p className="text-xs font-black uppercase tracking-widest text-indigo-600 italic animate-pulse">{t("processingMarketData")}</p>
                   </motion.div>
                 ) : (
                   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col">
                     {/* Simulated Chart */}
                     <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-8 mb-8 border-b border-slate-100 dark:border-slate-800 relative">
                        {/* Trend Line (Simulated via SVG) */}
                        <svg className="absolute inset-0 h-full w-full pointer-events-none drop-shadow-lg" preserveAspectRatio="none" viewBox="0 0 100 100">
                           <path d="M0,80 Q25,70 50,40 T100,20" fill="none" stroke="currentColor" className="text-indigo-500" strokeWidth="2" strokeLinecap="round" />
                        </svg>

                        {[45, 55, 60, 48, 70, 85, 95].map((height, i) => (
                          <div key={i} className="flex flex-col items-center gap-4 z-10 w-full group">
                            <motion.div 
                              initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ duration: 0.5, delay: i * 0.1 }}
                              className={cn("w-full max-w-[40px] rounded-t-xl transition-all", i === 6 ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-800 group-hover:bg-indigo-400")}
                            />
                            <span className="text-[9px] font-black uppercase text-slate-400 italic">{t("dayLabel")} {i * 5}</span>
                          </div>
                        ))}
                     </div>

                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-900/10 border-2 border-emerald-500/20">
                           <div className="flex justify-between items-start mb-4">
                             <TrendingUp className="h-8 w-8 text-emerald-600" />
                             <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">{t("expectedRise")}</span>
                           </div>
                           <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase italic mb-2">{t("aiVerdictHold")}</h4>
                           <p className="text-xs font-bold text-slate-600 dark:text-slate-400 leading-relaxed italic">{t("pricePredictorInsight")}</p>
                        </div>

                        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700">
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 italic flex items-center gap-2"><AlertCircle className="h-4 w-4" /> {t("marketFactors")}</h4>
                           <ul className="space-y-3">
                             {marketFactorsList.map((f, i) => (
                               <li key={i} className="flex items-start gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 italic">
                                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                                 {t(f)}
                               </li>
                             ))}
                           </ul>
                        </div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePredictor;
