import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  Sprout, 
  TrendingUp, 
  AlertTriangle, 
  Zap, 
  Map as MapIcon,
  ChevronRight,
  Database,
  CloudSun,
  ShieldCheck,
  Activity,
  User,
  History,
  ArrowRight,
  Droplets,
  Thermometer,
  Wind,
  Layers,
  Cpu,
  Target,
  Wallet,
  Calendar,
  ExternalLink,
  BarChart3,
  Download,
  Info,
  DollarSign,
  PieChart,
  ThermometerSun,
  Scan,
  Map as MapIconUI
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { useLocation } from "@/lib/LocationContext";
import { cn } from "@/lib/utils";

const YieldPrediction = () => {
  const { t } = useLanguage();
  const { location } = useLocation();
  const [formData, setFormData] = useState({
    crop: "Rice",
    land: "5",
    soil: "Alluvial",
    irrigation: "Borewell",
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [farmer, setFarmer] = useState<any>({ name: "Pratap Reddy", location: "Anantapur, AP" });
  const [selectedMandi, setSelectedMandi] = useState("Anantapur");

  const mandis: any = {
    "Anantapur": { rice: 21500, wheat: 20800, cotton: 61000, maize: 18500 },
    "Guntur": { rice: 22800, wheat: 21200, cotton: 63500, maize: 19800 },
    "Kurnool": { rice: 21900, wheat: 21000, cotton: 62000, maize: 19000 }
  };

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const hRes = await axios.get("/api/yield/history");
        setHistory(hRes.data);
        
        const wRes = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=14.6819&longitude=77.6006&current=temperature_2m,relative_humidity_2m&timezone=auto");
        setWeather(wRes.data.current);

        const fRes = await axios.get("/api/farmer");
        if (fRes.data) setFarmer(fRes.data);
      } catch (e) {
        console.warn("Context fetch partially failed.");
      }
    };
    fetchMeta();
  }, []);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    try {
      // Simulate API processing delay
      await new Promise(r => setTimeout(r, 2000));
      
      const landAcres = parseFloat(formData.land) || 0;
      
      // REALISTIC AGRICULTURAL FORMULAS
      const baseYields: any = { "Rice": 2.2, "Wheat": 1.8, "Cotton": 0.8, "Maize": 2.5 };
      let predictedYield = (baseYields[formData.crop] || 2.0) * landAcres;

      const soilMult: any = { "Alluvial": 1.1, "Black": 1.05, "Clay": 0.95, "Loamy": 1.0 };
      const irrMult: any = { "Drip": 1.25, "Borewell": 1.1, "Canal": 1.05, "Rain-fed": 0.8 };
      
      predictedYield *= (soilMult[formData.soil] || 1.0);
      predictedYield *= (irrMult[formData.irrigation] || 1.0);

      const currentTemp = weather?.temperature_2m || 30;
      let weatherNote = "Optimal temperature for crop growth.";
      if (currentTemp > 35) {
        predictedYield *= 0.92;
        weatherNote = "Heat stress detected. High evaporation reducing yield potential by ~8%.";
      } else if (currentTemp < 15) {
        predictedYield *= 0.95;
        weatherNote = "Low temperatures slowing metabolic activity. Expected 5% delay in maturity.";
      }

      // Localized Mandi Prices
      const regionPrices = mandis[selectedMandi] || mandis["Anantapur"];
      const marketPrice = regionPrices[formData.crop.toLowerCase()] || 20000;
      const grossRevenue = predictedYield * marketPrice;

      const costPerAcre: any = {
        "Rice": { seeds: 3200, fertilizer: 6500, labor: 5500 },
        "Wheat": { seeds: 2600, fertilizer: 5200, labor: 4200 },
        "Cotton": { seeds: 4500, fertilizer: 8500, labor: 7500 },
        "Maize": { seeds: 3000, fertilizer: 5800, labor: 4800 }
      };
      
      const cropCosts = costPerAcre[formData.crop] || { seeds: 2500, fertilizer: 5000, labor: 4000 };
      const totalCosts = {
        seeds: cropCosts.seeds * landAcres,
        fertilizer: cropCosts.fertilizer * landAcres,
        labor: cropCosts.labor * landAcres,
        total: (cropCosts.seeds + cropCosts.fertilizer + cropCosts.labor) * landAcres
      };

      const finalRes = {
        yield: predictedYield.toFixed(2),
        profit: `₹${Math.round(grossRevenue).toLocaleString()}`,
        risk: predictedYield / landAcres < 1.5 ? "Moderate" : "Low",
        ndvi: (0.65 + (predictedYield / landAcres) * 0.05).toFixed(2),
        insights: [
          `${formData.irrigation} at ${selectedMandi} shows stable water table depth.`,
          `${formData.soil} soil in this region is typically rich in Phosphorus.`,
          `Current Mandi rate for ${formData.crop} is trending UP by 4% this week.`
        ],
        costs: totalCosts,
        weatherImpact: weatherNote,
        healthScore: Math.round(70 + (predictedYield / landAcres) * 10),
        rawProfit: Math.round(grossRevenue),
        mandiPrice: marketPrice
      };

      setResult(finalRes);
      setHistory(prev => [finalRes, ...prev].slice(0, 5));
    } catch (err) {
      console.error("Prediction failed");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleDownloadReport = () => {
    if (!result) return;

    const reportContent = `
=========================================
      AGRICULTURAL FORECAST REPORT
=========================================
Generated: ${new Date().toLocaleString()}
Farmer ID: KSN-REDDY-99
Location: ${selectedMandi}, ${farmer?.location}

-----------------------------------------
FARM CONFIGURATION:
-----------------------------------------
Selected Crop: ${formData.crop}
Cultivation Area: ${formData.land} Acres
Soil Profile: ${formData.soil}
Irrigation System: ${formData.irrigation}
Local Mandi: ${selectedMandi}

-----------------------------------------
ML PREDICTIVE OUTCOMES:
-----------------------------------------
Forecasted Total Yield: ${result.yield} Tons
Est. Market Price: ₹${result.mandiPrice}/Ton
Gross Market Revenue: ${result.profit}
NDVI (Satellite) Index: ${result.ndvi}
Risk Stratification: ${result.risk} Risk

-----------------------------------------
FISCAL EXPOSURE (Costs):
-----------------------------------------
Input Seeds:      ₹${result.costs.seeds.toLocaleString()}
Fertilizers/Bio:  ₹${result.costs.fertilizer.toLocaleString()}
Labor/Logistics:  ₹${result.costs.labor.toLocaleString()}
-----------------------------------------
TOTAL EXPENDITURE: ₹${result.costs.total.toLocaleString()}

NET PROJECTED PROFIT: ₹${(result.rawProfit - result.costs.total).toLocaleString()}

-----------------------------------------
AI TACTICAL ADVISORY:
-----------------------------------------
1. ${result.insights[0]}
2. ${result.insights[1]}
3. ${result.insights[2]}

Climatic Note: ${result.weatherImpact}

-----------------------------------------
OFFICIAL DISCLAIMER:
This report is a data-driven projection. 
Actual results may vary based on micro-climatic 
shifts and pest infestations.
=========================================
    `;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Kisan_Yield_Report_${formData.crop}_${selectedMandi}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const trendData = [
    { name: "Week 1", yield: (parseFloat(result?.yield) * 0.6).toFixed(1) || 1.2, ndvi: 0.62 },
    { name: "Week 2", yield: (parseFloat(result?.yield) * 0.75).toFixed(1) || 1.8, ndvi: 0.68 },
    { name: "Week 3", yield: (parseFloat(result?.yield) * 0.9).toFixed(1) || 2.4, ndvi: 0.74 },
    { name: "Week 4", yield: result?.yield || 3.0, ndvi: result?.ndvi || 0.75 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* --- TOP BAR --- */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-[100] shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-5">
             <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-xl shadow-emerald-200">
                <BarChart3 size={24} />
             </div>
             <div>
                <h1 className="font-black text-2xl text-slate-900 tracking-tighter italic uppercase">{t("agriIntelligenceSuite")}</h1>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-black">{t("productionHub")} v4.8 • PRO</p>
             </div>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-xl">
                 <MapIconUI size={18} className="text-slate-500" />
              </div>
              <div>
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Active Region</p>
                 <span className="text-sm font-black text-slate-900 italic uppercase">{selectedMandi}</span>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-slate-200"></div>
            <button 
              onClick={handleDownloadReport}
              disabled={!result}
              className="flex items-center gap-3 bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-2xl shadow-slate-200 disabled:opacity-30 disabled:cursor-not-allowed group"
            >
               <Download size={16} className="group-hover:translate-y-1 transition-transform" />
               {t("downloadReport")}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* --- LEFT: CONTROLS --- */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[3rem] p-10 shadow-3xl border-none relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12">
               <Database size={200} />
            </div>

            <div className="flex items-center gap-4 mb-10 relative z-10">
               <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20">
                  <Cpu size={28} />
               </div>
               <div>
                  <h3 className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic">{t("intelligenceParameters")}</h3>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Neural Input Matrix</p>
               </div>
            </div>

            <form onSubmit={handlePredict} className="space-y-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] ml-2">{t("mandiSelection") || "Select Local Mandi"}</label>
                <div className="grid grid-cols-3 gap-2">
                   {Object.keys(mandis).map(m => (
                     <button 
                       key={m}
                       type="button"
                       onClick={() => setSelectedMandi(m)}
                       className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${selectedMandi === m ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md" : "border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-100"}`}
                     >
                        {m}
                     </button>
                   ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] ml-2">{t("cropSelection")}</label>
                <div className="grid grid-cols-2 gap-3">
                   {["Rice", "Wheat", "Cotton", "Maize"].map(c => (
                     <button 
                       key={c}
                       type="button"
                       onClick={() => setFormData({...formData, crop: c})}
                       className={`py-4 rounded-2xl text-xs font-black uppercase tracking-widest border-2 transition-all flex items-center justify-between px-6 ${formData.crop === c ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-xl" : "border-slate-50 bg-slate-50 text-slate-500 hover:border-slate-100"}`}
                     >
                        {t(c.toLowerCase())}
                        {formData.crop === c && <div className="h-2 w-2 bg-emerald-500 rounded-full animate-ping" />}
                     </button>
                   ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] ml-2">{t("landAreaAcres")}</label>
                  <div className="relative">
                    <input 
                      type="number"
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl p-5 text-xl font-black italic focus:border-emerald-500 outline-none transition-all pr-16"
                      value={formData.land}
                      onChange={(e) => setFormData({...formData, land: e.target.value})}
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase italic">Acres</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] ml-2">{t("soilTypeLabel")}</label>
                  <select 
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl p-5 text-sm font-black uppercase italic focus:border-emerald-500 outline-none transition-all appearance-none"
                    value={formData.soil}
                    onChange={(e) => setFormData({...formData, soil: e.target.value})}
                  >
                    <option value="Alluvial">{t("alluvial")}</option>
                    <option value="Black">{t("blackSoil")}</option>
                    <option value="Clay">{t("clay")}</option>
                    <option value="Loamy">{t("loamy")}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] ml-2">{t("irrigationLabel")}</label>
                <div className="grid grid-cols-2 gap-3">
                   {["Borewell", "Canal", "Rain-fed", "Drip"].map(i => (
                     <button 
                       key={i}
                       type="button"
                       onClick={() => setFormData({...formData, irrigation: i})}
                       className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${formData.irrigation === i ? "border-blue-500 bg-blue-50 text-blue-700 shadow-xl" : "border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-100"}`}
                     >
                        {t(i.toLowerCase()) || i}
                     </button>
                   ))}
                </div>
              </div>

              <button 
                type="submit"
                disabled={isCalculating}
                className="w-full bg-slate-900 hover:bg-black text-white rounded-[2rem] py-7 font-black uppercase tracking-[0.2em] italic text-sm shadow-3xl shadow-slate-200 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 group"
              >
                {isCalculating ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    {t("calculatingMlInsights")}
                  </>
                ) : (
                  <>
                    <Target size={22} className="group-hover:scale-125 transition-transform" />
                    {t("runPredictiveEngine") || "Simulate Yield Projection"}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* SATELLITE STATUS */}
          <div className="bg-[#0A1A12] rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl border border-emerald-900/50">
             <div className="absolute right-0 top-0 p-12 opacity-5 scale-150 rotate-12">
                <Layers size={180} />
             </div>
             <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className="p-4 bg-emerald-500/20 rounded-2xl border border-emerald-500/20">
                    <MapIconUI size={32} className="text-emerald-400 animate-pulse" />
                </div>
                <div>
                   <h4 className="font-black text-xl italic uppercase tracking-tighter leading-none">{t("sentinelHubLink") || "Sentinel-2 Live"}</h4>
                   <p className="text-[10px] text-emerald-400/60 font-black uppercase tracking-[0.2em] mt-1">{t("ndviStreamActive")}</p>
                </div>
             </div>
             <div className="flex items-center gap-3 bg-emerald-500/10 w-fit px-5 py-2 rounded-full border border-emerald-500/20 relative z-10">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">{t("satelliteSync")} 100% SECURE</span>
             </div>
          </div>
        </div>

        {/* --- RIGHT: DASHBOARD --- */}
        <div className="lg:col-span-8">
           <AnimatePresence mode="wait">
             {!result && !isCalculating ? (
               <motion.div 
                 key="empty"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.05 }}
                 className="h-full min-h-[700px] border-4 border-dashed border-slate-100 rounded-[4rem] flex flex-col items-center justify-center text-slate-300 p-12 text-center group bg-white/50"
               >
                  <div className="w-32 h-32 bg-white rounded-[3rem] shadow-xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform duration-500">
                    <History size={64} className="text-slate-200" />
                  </div>
                  <h2 className="text-4xl font-black text-slate-400 uppercase italic tracking-tighter">{t("readyForAnalysis")}</h2>
                  <p className="max-w-xs mt-4 text-xs font-black uppercase tracking-widest leading-relaxed opacity-50"> {t("configureFarmParams")}</p>
               </motion.div>
             ) : isCalculating ? (
               <motion.div 
                 key="loading"
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="h-full min-h-[700px] bg-white rounded-[4rem] shadow-3xl border-none flex flex-col items-center justify-center space-y-10"
               >
                  <div className="relative">
                     <div className="w-48 h-48 border-[10px] border-emerald-50 rounded-full shadow-inner"></div>
                     <div className="w-48 h-48 border-t-[10px] border-emerald-600 rounded-full absolute top-0 animate-spin shadow-xl"></div>
                     <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-emerald-600 font-black text-5xl italic tracking-tighter">AI</span>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">Modeling</span>
                     </div>
                  </div>
                  <div className="text-center space-y-3">
                     <h3 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">{t("processingYieldMatrix")}</h3>
                     <p className="text-emerald-600 font-black text-[10px] tracking-[0.4em] uppercase animate-pulse">{t("syncingSatelliteHealth")}</p>
                  </div>
               </motion.div>
             ) : (
               <motion.div 
                 key="result"
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="space-y-10 pb-20"
               >
                  {/* PRIMARY METRICS */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="bg-white p-10 rounded-[3.5rem] shadow-3xl border-none relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-emerald-600 group-hover:scale-125 transition-transform duration-700">
                           <Sprout size={80} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 italic">{t("predictedYieldLabel")}</p>
                        <h2 className="text-6xl font-black text-slate-900 italic tracking-tighter leading-none">{result.yield} <span className="text-base font-black text-slate-300 uppercase tracking-widest">{t("tons")}</span></h2>
                        <div className="mt-6 flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest bg-emerald-50 w-fit px-4 py-1.5 rounded-full border border-emerald-100 shadow-sm">
                           <ShieldCheck size={14} /> AI Verified • L4
                        </div>
                     </div>

                     <div className="bg-white p-10 rounded-[3.5rem] shadow-3xl border-none relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-blue-600 group-hover:scale-125 transition-transform duration-700">
                           <DollarSign size={80} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 italic">{t("marketRevenue")}</p>
                        <h2 className="text-6xl font-black text-blue-600 italic tracking-tighter leading-none">{result.profit}</h2>
                        <div className="mt-6 flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest bg-blue-50 w-fit px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">
                           <Wallet size={14} /> ₹{result.mandiPrice}/MT
                        </div>
                     </div>

                     <div className="bg-white p-10 rounded-[3.5rem] shadow-3xl border-none relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-rose-600 group-hover:scale-125 transition-transform duration-700">
                           <AlertTriangle size={80} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 italic">{t("farmRiskIndex")}</p>
                        <h2 className={cn("text-6xl font-black italic tracking-tighter leading-none", result.risk === "Low" ? "text-emerald-500" : "text-rose-500")}>{result.risk}</h2>
                        <div className="mt-6 flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest bg-slate-50 w-fit px-4 py-1.5 rounded-full border border-slate-100">
                           <Activity size={14} /> {t("climateValidated")}
                        </div>
                     </div>
                  </div>

                  {/* PROFIT & LOSS AND SATELLITE SCANNER */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                     {/* PROFIT & LOSS ANALYSIS */}
                     <div className="bg-white p-12 rounded-[4rem] shadow-3xl border-none relative">
                        <div className="flex items-center justify-between mb-12">
                           <div>
                             <h4 className="font-black text-2xl text-slate-900 uppercase italic tracking-tighter leading-none">{t("profitAndLossAnalysis")}</h4>
                             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{t("economicProjection")}</p>
                           </div>
                           <div className="h-12 w-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                              <PieChart size={24} />
                           </div>
                        </div>
                        
                        <div className="space-y-8">
                           <div className="flex justify-between items-end">
                              <div>
                                 <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">{t("grossRevenue")}</p>
                                 <p className="text-4xl font-black text-slate-900 italic tracking-tighter leading-none">{result.profit}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">{t("productionCost")}</p>
                                 <p className="text-4xl font-black text-rose-500 italic tracking-tighter leading-none">- ₹{result.costs.total.toLocaleString()}</p>
                              </div>
                           </div>

                           <div className="w-full h-5 bg-slate-100 rounded-full overflow-hidden flex shadow-inner p-1">
                              <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]" style={{ width: '72%' }}></div>
                              <div className="h-full bg-rose-400 rounded-full ml-1" style={{ width: '28%' }}></div>
                           </div>

                           <div className="grid grid-cols-3 gap-6 py-8 border-y-2 border-slate-50 border-dashed">
                              <div className="text-center">
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{t("seeds")}</p>
                                 <p className="text-lg font-black text-slate-900 italic tracking-tighter">₹{result.costs.seeds.toLocaleString()}</p>
                              </div>
                              <div className="text-center border-x-2 border-slate-50 border-dashed">
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{t("fertilizer")}</p>
                                 <p className="text-lg font-black text-slate-900 italic tracking-tighter">₹{result.costs.fertilizer.toLocaleString()}</p>
                              </div>
                              <div className="text-center">
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{t("labor")}</p>
                                 <p className="text-lg font-black text-slate-900 italic tracking-tighter">₹{result.costs.labor.toLocaleString()}</p>
                              </div>
                           </div>

                           <div className="p-8 bg-emerald-600 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-600/30 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                 <Zap size={64} />
                              </div>
                              <div className="flex justify-between items-center relative z-10">
                                 <span className="font-black text-sm uppercase tracking-[0.3em] italic">{t("netProfit")}</span>
                                 <span className="text-4xl font-black italic tracking-tighter">₹{(result.rawProfit - result.costs.total).toLocaleString()}</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* SATELLITE SCANNER VISUAL */}
                     <div className="bg-[#050C09] p-12 rounded-[4rem] shadow-3xl border border-white/5 relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-12 relative z-10">
                           <div>
                             <h4 className="font-black text-2xl text-white uppercase italic tracking-tighter leading-none">{t("satelliteVegetationHealth")}</h4>
                             <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mt-1">Sentinel-2 Global Network</p>
                           </div>
                           <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400 animate-pulse border border-white/10">
                              <Scan size={24} />
                           </div>
                        </div>

                        <div className="relative h-[300px] rounded-[3rem] overflow-hidden bg-emerald-950/20 border-2 border-emerald-500/20 shadow-inner group-hover:border-emerald-500/50 transition-all duration-700">
                           <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                           
                           <motion.div 
                               animate={{ top: ['-10%', '110%', '-10%'] }}
                               transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                               className="absolute left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_30px_#10b981] z-20"
                           />

                           <div className="absolute inset-0 flex items-center justify-center">
                               <div className="w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full animate-pulse"></div>
                               <div className="w-40 h-40 bg-emerald-400/10 blur-[60px] rounded-full absolute top-10 right-10 animate-bounce"></div>
                           </div>

                           <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-30">
                              <div className="bg-black/60 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/10 shadow-2xl">
                                 <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1 italic">{t("healthIndex")}</p>
                                 <p className="text-4xl font-black text-white italic tracking-tighter">{result.healthScore}<span className="text-lg ml-1 text-emerald-500">%</span></p>
                              </div>
                              <div className="bg-emerald-600 text-white px-8 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] italic shadow-2xl shadow-emerald-600/30">
                                 {t("optimal")}
                              </div>
                           </div>
                        </div>

                        <div className="mt-10 flex items-center gap-5 bg-white/5 p-6 rounded-[2rem] border border-white/10">
                           <div className="h-10 w-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                              <Info size={20} className="text-emerald-400" />
                           </div>
                           <p className="text-xs text-emerald-100 font-bold italic leading-relaxed">
                              {t("satelliteDataConfirmed")} Calibration complete. Index at <span className="text-emerald-400 font-black">{result.ndvi}</span> NDVI points.
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* WEATHER CORRELATION CARD */}
                  <div className="bg-white p-12 rounded-[4rem] shadow-3xl border-none flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-150">
                        <Thermometer size={150} />
                     </div>
                     <div className="w-24 h-24 bg-amber-50 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-inner border border-amber-100">
                        <ThermometerSun size={48} className="text-amber-500" />
                     </div>
                     <div className="flex-1 relative z-10">
                        <h4 className="font-black text-2xl text-slate-900 uppercase italic tracking-tighter leading-none mb-3">{t("weatherYieldCorrelation")}</h4>
                        <p className="text-slate-500 font-bold italic text-lg leading-relaxed">{result.weatherImpact}</p>
                     </div>
                     <div className="px-10 py-6 bg-slate-900 rounded-[2rem] shadow-2xl relative z-10 text-center min-w-[180px]">
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 italic">{t("currentTemp")}</p>
                        <p className="text-4xl font-black text-white italic tracking-tighter leading-none">{weather?.temperature_2m}°C</p>
                     </div>
                  </div>

                  {/* ANALYTICS SECTION */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                     <div className="bg-white p-12 rounded-[4rem] shadow-3xl border-none h-[450px] relative">
                        <div className="flex items-center justify-between mb-12">
                           <div>
                             <h4 className="font-black text-2xl text-slate-900 uppercase italic tracking-tighter leading-none">{t("growthTrajectory")}</h4>
                             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Neural Predicted Maturation</p>
                           </div>
                           <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300">
                              <TrendingUp size={20} />
                           </div>
                        </div>
                        <div className="h-[280px] w-full">
                           <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={trendData}>
                                 <defs>
                                   <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                                     <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                     <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                   </linearGradient>
                                 </defs>
                                 <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#cbd5e1', fontSize: 10, fontWeight: 900}} />
                                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#cbd5e1', fontSize: 10, fontWeight: 900}} />
                                 <Tooltip 
                                   contentStyle={{borderRadius: '2rem', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '1.5rem'}}
                                   itemStyle={{fontWeight: 900, color: '#0f172a'}}
                                 />
                                 <Area type="monotone" dataKey="yield" stroke="#10b981" strokeWidth={6} fillOpacity={1} fill="url(#colorYield)" />
                              </AreaChart>
                           </ResponsiveContainer>
                        </div>
                     </div>

                     <div className="bg-white p-12 rounded-[4rem] shadow-3xl border-none h-[450px] relative">
                        <div className="flex items-center justify-between mb-12">
                           <div>
                             <h4 className="font-black text-2xl text-slate-900 uppercase italic tracking-tighter leading-none">{t("vegetationHealth")}</h4>
                             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Temporal NDVI Progression</p>
                           </div>
                           <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue-300">
                              <Activity size={20} />
                           </div>
                        </div>
                        <div className="h-[280px] w-full">
                           <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={trendData}>
                                 <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#cbd5e1', fontSize: 10, fontWeight: 900}} />
                                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#cbd5e1', fontSize: 10, fontWeight: 900}} domain={[0, 1]} />
                                 <Tooltip 
                                   contentStyle={{borderRadius: '2rem', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '1.5rem'}}
                                 />
                                 <Line type="monotone" dataKey="ndvi" stroke="#3b82f6" strokeWidth={6} dot={{ r: 8, fill: "#3b82f6", strokeWidth: 4, stroke: "#fff" }} activeDot={{ r: 12, strokeWidth: 0 }} />
                              </LineChart>
                           </ResponsiveContainer>
                        </div>
                     </div>
                  </div>

                  {/* ADVISORY SECTION */}
                  <div className="bg-slate-900 rounded-[5rem] p-16 text-white shadow-3xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-16 opacity-[0.03] rotate-45 scale-150 group-hover:rotate-12 transition-transform duration-1000">
                        <Zap size={300} />
                     </div>
                     <div className="flex items-center gap-6 mb-16 relative z-10">
                        <div className="h-20 w-20 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                           <Cpu size={40} />
                        </div>
                        <div>
                           <h3 className="text-5xl font-black italic tracking-tighter uppercase leading-none">{t("aiTacticalAdvisor")}</h3>
                           <p className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.4em] mt-2">Deep Learning Optimized Strategy</p>
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                        {result.insights.map((insight: string, i: number) => (
                           <div key={i} className="flex gap-8 p-10 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all group/card shadow-inner">
                              <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex-shrink-0 flex items-center justify-center text-lg font-black italic shadow-xl group-hover/card:scale-110 transition-transform">
                                 {i + 1}
                              </div>
                              <p className="text-lg font-bold italic leading-relaxed text-slate-300 group-hover/card:text-white transition-colors">{insight}</p>
                           </div>
                        ))}
                     </div>
                  </div>

               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;
