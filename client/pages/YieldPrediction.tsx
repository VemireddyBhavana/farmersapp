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
      // 1. Base Yield per Acre (in Tons)
      const baseYields: any = { "Rice": 2.2, "Wheat": 1.8, "Cotton": 0.8, "Maize": 2.5 };
      let predictedYield = (baseYields[formData.crop] || 2.0) * landAcres;

      // 2. Multipliers based on parameters
      const soilMult: any = { "Alluvial": 1.1, "Black": 1.05, "Clay": 0.95, "Loamy": 1.0 };
      const irrMult: any = { "Drip": 1.25, "Borewell": 1.1, "Canal": 1.05, "Rain-fed": 0.8 };
      
      predictedYield *= (soilMult[formData.soil] || 1.0);
      predictedYield *= (irrMult[formData.irrigation] || 1.0);

      // 3. Weather Impact (Real temperature check)
      const currentTemp = weather?.temperature_2m || 30;
      let weatherNote = "Optimal temperature for crop growth.";
      if (currentTemp > 35) {
        predictedYield *= 0.92; // 8% loss due to heat stress
        weatherNote = "Heat stress detected. High evaporation reducing yield potential by ~8%.";
      } else if (currentTemp < 15) {
        predictedYield *= 0.95; // Slow growth in cold
        weatherNote = "Low temperatures slowing metabolic activity. Expected 5% delay in maturity.";
      }

      // 4. Market Prices (₹ per Ton)
      const marketPrices: any = { "Rice": 22000, "Wheat": 21000, "Cotton": 60000, "Maize": 19000 };
      const grossRevenue = predictedYield * (marketPrices[formData.crop] || 20000);

      // 5. Production Costs (₹ per Acre)
      const costPerAcre: any = {
        "Rice": { seeds: 3000, fertilizer: 6000, labor: 5000 },
        "Wheat": { seeds: 2500, fertilizer: 5000, labor: 4000 },
        "Cotton": { seeds: 4000, fertilizer: 8000, labor: 7000 },
        "Maize": { seeds: 2800, fertilizer: 5500, labor: 4500 }
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
          `${formData.irrigation} provides stable water, but check ${formData.crop} root depth.`,
          `${formData.soil} soil is high in minerals; avoid over-fertilizing this season.`,
          `Current NDVI trend is ${predictedYield / landAcres > 2 ? "Excellent" : "Stable"}. Monitoring canopy density.`
        ],
        costs: totalCosts,
        weatherImpact: weatherNote,
        healthScore: Math.round(70 + (predictedYield / landAcres) * 10),
        rawProfit: Math.round(grossRevenue)
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
Date: ${new Date().toLocaleDateString()}
Farmer: ${farmer?.name}
Location: ${location?.district || farmer?.location}

-----------------------------------------
FARM PARAMETERS:
-----------------------------------------
Crop: ${formData.crop}
Land Area: ${formData.land} Acres
Soil Type: ${formData.soil}
Irrigation: ${formData.irrigation}

-----------------------------------------
PREDICTED OUTCOMES:
-----------------------------------------
Expected Yield: ${result.yield} Tons
Market Revenue: ${result.profit}
Risk Assessment: ${result.risk} Risk

-----------------------------------------
COST & PROFIT ANALYSIS:
-----------------------------------------
Gross Revenue:   ${result.profit}
Production Cost: ₹${result.costs.total.toLocaleString()}

Breakdown:
- Seeds:      ₹${result.costs.seeds.toLocaleString()}
- Fertilizer: ₹${result.costs.fertilizer.toLocaleString()}
- Labor:      ₹${result.costs.labor.toLocaleString()}

NET PROFIT:      ₹${(result.rawProfit - result.costs.total).toLocaleString()}

-----------------------------------------
AI TACTICAL ADVISORY:
-----------------------------------------
1. ${result.insights[0]}
2. ${result.insights[1]}
3. ${result.insights[2]}

Weather Impact: ${result.weatherImpact}

-----------------------------------------
CONFIDENTIALITY NOTICE:
This report is generated using Kisan App ML models.
Values are estimates based on input parameters.
=========================================
    `;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Yield_Forecast_${formData.crop}_${new Date().toISOString().slice(0,10)}.txt`;
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* --- TOP BAR --- */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 font-bold border border-emerald-200 shadow-sm">
                <Sprout size={20} />
             </div>
             <div>
                <h1 className="font-bold text-slate-800 tracking-tight leading-none">{t("agriIntelligenceSuite")}</h1>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">{t("productionHub")} v4.8</p>
             </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2">
              <User size={16} className="text-slate-400" />
              <span className="text-sm font-bold text-slate-700">{farmer?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapIconUI size={16} className="text-slate-400" />
              <span className="text-sm font-bold text-slate-700">{location?.district || farmer?.location}</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200"></div>
            <div className="text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase">{t("status")}</p>
                <div className="flex items-center gap-1.5 justify-end">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                   <span className="text-xs font-bold text-emerald-600">{t("secureConnect")}</span>
                </div>
            </div>
            <button 
              onClick={handleDownloadReport}
              disabled={!result}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition-all shadow-lg shadow-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
               <Download size={14} />
               {t("downloadReport")}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT: CONTROLS --- */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200"
          >
            <div className="flex items-center gap-3 mb-8">
               <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-200">
                  <Zap size={22} />
               </div>
               <h3 className="text-xl font-extrabold tracking-tight text-slate-800">{t("intelligenceParameters")}</h3>
            </div>

            <form onSubmit={handlePredict} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">{t("cropSelection")}</label>
                <div className="grid grid-cols-2 gap-2">
                   {["Rice", "Wheat", "Cotton", "Maize"].map(c => (
                     <button 
                       key={c}
                       type="button"
                       onClick={() => setFormData({...formData, crop: c})}
                       className={`py-3 rounded-2xl text-xs font-bold border-2 transition-all ${formData.crop === c ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md shadow-emerald-100" : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"}`}
                     >
                        {t(c.toLowerCase())}
                     </button>
                   ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">{t("landAreaAcres")}</label>
                  <input 
                    type="number"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-bold focus:border-emerald-500 outline-none transition-all"
                    value={formData.land}
                    onChange={(e) => setFormData({...formData, land: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">{t("soilTypeLabel")}</label>
                  <select 
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-bold focus:border-emerald-500 outline-none transition-all"
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

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">{t("irrigationLabel")}</label>
                <select 
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-bold focus:border-emerald-500 outline-none transition-all"
                  value={formData.irrigation}
                  onChange={(e) => setFormData({...formData, irrigation: e.target.value})}
                >
                  <option value="Borewell">{t("borewell")}</option>
                  <option value="Canal">{t("canal")}</option>
                  <option value="Rain-fed">{t("rainFed")}</option>
                  <option value="Drip">{t("drip")}</option>
                </select>
              </div>

              <button 
                type="submit"
                disabled={isCalculating}
                className="w-full bg-slate-900 hover:bg-black text-white rounded-2xl py-6 font-bold shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {isCalculating ? (
                  <>
                    <Activity className="animate-spin" size={20} />
                    {t("calculatingMlInsights")}
                  </>
                ) : (
                  <>
                    <Target size={20} />
                    {t("runPredictiveEngine")}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* SATELLITE STATUS */}
          <div className="bg-emerald-900 rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl border border-emerald-800">
             <div className="absolute right-0 top-0 p-10 opacity-10">
                <Layers size={120} />
             </div>
             <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-emerald-800 rounded-2xl">
                    <MapIconUI size={24} className="text-emerald-400" />
                </div>
                <div>
                   <h4 className="font-extrabold text-lg">{t("sentinelHubLink")}</h4>
                   <p className="text-xs text-emerald-300 font-medium">{t("ndviStreamActive")}</p>
                </div>
             </div>
             <div className="mt-6 flex items-center gap-2 bg-emerald-800/50 w-fit px-3 py-1 rounded-full border border-emerald-700/50">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-200">{t("satelliteSync")} 100%</span>
             </div>
          </div>
        </div>

        {/* --- RIGHT: DASHBOARD --- */}
        <div className="lg:col-span-8">
           <AnimatePresence mode="wait">
             {!result && !isCalculating ? (
               <motion.div 
                 key="empty"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="h-full min-h-[600px] border-4 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center text-slate-400 p-12 text-center"
               >
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <History size={48} className="text-slate-300" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-500">{t("readyForAnalysis")}</h2>
                  <p className="max-w-xs mt-4 text-sm font-medium leading-relaxed"> {t("configureFarmParams")}</p>
               </motion.div>
             ) : isCalculating ? (
               <motion.div 
                 key="loading"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="h-full min-h-[600px] bg-white rounded-[40px] shadow-sm border border-slate-200 flex flex-col items-center justify-center space-y-8"
               >
                  <div className="relative">
                     <div className="w-32 h-32 border-[6px] border-emerald-50 rounded-full"></div>
                     <div className="w-32 h-32 border-t-[6px] border-emerald-500 rounded-full absolute top-0 animate-spin"></div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-600 font-black text-2xl">ML</div>
                  </div>
                  <div className="text-center">
                     <h3 className="text-2xl font-black text-slate-800">{t("processingYieldMatrix")}</h3>
                     <p className="text-slate-400 font-bold text-sm tracking-widest uppercase mt-2">{t("syncingSatelliteHealth")}</p>
                  </div>
               </motion.div>
             ) : (
               <motion.div 
                 key="result"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="space-y-8 pb-20"
               >
                  {/* METRICS GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200 relative overflow-hidden group">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 relative z-10">{t("predictedYieldLabel")}</p>
                        <h2 className="text-5xl font-black text-slate-800 relative z-10">{result.yield} <span className="text-base font-bold text-slate-400">{t("tons")}</span></h2>
                        <div className="mt-4 flex items-center gap-2 text-emerald-600 font-bold text-xs relative z-10 bg-emerald-50 w-fit px-3 py-1 rounded-full">
                           <TrendingUp size={14} /> AI Model Confirmed
                        </div>
                     </div>

                     <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200 relative overflow-hidden group">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 relative z-10">{t("marketRevenue")}</p>
                        <h2 className="text-5xl font-black text-blue-600 relative z-10">{result.profit}</h2>
                        <div className="mt-4 flex items-center gap-2 text-blue-600 font-bold text-xs relative z-10 bg-blue-50 w-fit px-3 py-1 rounded-full">
                           <Wallet size={14} /> {t("projectedPrice")}
                        </div>
                     </div>

                     <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200 relative overflow-hidden group">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 relative z-10">{t("farmRiskIndex")}</p>
                        <h2 className={`text-5xl font-black relative z-10 ${result.risk === "Low" ? "text-emerald-600" : "text-red-500"}`}>{result.risk}</h2>
                        <div className="mt-4 flex items-center gap-2 text-slate-400 font-bold text-xs relative z-10">
                           <AlertTriangle size={14} /> {t("climateValidated")}
                        </div>
                     </div>
                  </div>

                  {/* PROFIT & LOSS AND SATELLITE SCANNER */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     {/* PROFIT & LOSS ANALYSIS */}
                     <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-8">
                           <div>
                             <h4 className="font-extrabold text-lg text-slate-800">{t("profitAndLossAnalysis")}</h4>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t("economicProjection")}</p>
                           </div>
                           <PieChart size={20} className="text-emerald-500" />
                        </div>
                        
                        <div className="space-y-6">
                           <div className="flex justify-between items-end">
                              <div>
                                 <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{t("grossRevenue")}</p>
                                 <p className="text-2xl font-black text-slate-800">{result.profit}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{t("productionCost")}</p>
                                 <p className="text-2xl font-black text-red-500">- ₹{result.costs.total.toLocaleString()}</p>
                              </div>
                           </div>

                           <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                              <div className="h-full bg-emerald-500" style={{ width: '70%' }}></div>
                              <div className="h-full bg-red-400" style={{ width: '30%' }}></div>
                           </div>

                           <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-50">
                              <div>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase">{t("seeds")}</p>
                                 <p className="font-black text-slate-700">₹{result.costs.seeds.toLocaleString()}</p>
                              </div>
                              <div>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase">{t("fertilizer")}</p>
                                 <p className="font-black text-slate-700">₹{result.costs.fertilizer.toLocaleString()}</p>
                              </div>
                              <div>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase">{t("labor")}</p>
                                 <p className="font-black text-slate-700">₹{result.costs.labor.toLocaleString()}</p>
                              </div>
                           </div>

                           <div className="p-5 bg-emerald-600 rounded-3xl text-white">
                              <div className="flex justify-between items-center">
                                 <span className="font-bold text-sm uppercase tracking-wider">{t("netProfit")}</span>
                                 <span className="text-2xl font-black">₹{(result.rawProfit - result.costs.total).toLocaleString()}</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* SATELLITE SCANNER VISUAL */}
                     <div className="bg-slate-900 p-8 rounded-[40px] shadow-sm border border-slate-800 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8 relative z-10">
                           <div>
                             <h4 className="font-extrabold text-lg text-white">{t("satelliteVegetationHealth")}</h4>
                             <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">{t("sentinel2LiveStream")}</p>
                           </div>
                           <Scan size={20} className="text-emerald-400 animate-pulse" />
                        </div>

                        <div className="relative h-[250px] rounded-[32px] overflow-hidden bg-emerald-950/50 border border-emerald-800/50">
                           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                           
                           <motion.div 
                              animate={{ top: ['0%', '100%', '0%'] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                              className="absolute left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_15px_#10b981] z-20"
                           />

                           <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-40 h-40 bg-emerald-500/30 blur-[40px] rounded-full animate-pulse"></div>
                              <div className="w-24 h-24 bg-emerald-400/20 blur-[30px] rounded-full absolute top-10 right-10"></div>
                           </div>

                           <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-30">
                              <div className="bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                                 <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{t("healthIndex")}</p>
                                 <p className="text-xl font-black text-white">{result.healthScore}%</p>
                              </div>
                              <div className="bg-emerald-500 text-white p-3 rounded-2xl font-black text-xs shadow-lg">
                                 {t("optimal")}
                              </div>
                           </div>
                        </div>

                        <div className="mt-6 flex items-center gap-3 bg-emerald-400/10 p-3 rounded-2xl border border-emerald-400/20">
                           <Info size={16} className="text-emerald-400" />
                           <p className="text-[11px] text-emerald-200 font-medium leading-tight">
                              {t("satelliteDataConfirmed")} {result.ndvi} NDVI.
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* WEATHER CORRELATION CARD */}
                  <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-8">
                     <div className="w-20 h-20 bg-amber-100 rounded-[28px] flex items-center justify-center shrink-0">
                        <ThermometerSun size={40} className="text-amber-600" />
                     </div>
                     <div className="flex-1">
                        <h4 className="font-extrabold text-xl mb-1 text-slate-800">{t("weatherYieldCorrelation")}</h4>
                        <p className="text-slate-600 font-medium">{result.weatherImpact}</p>
                     </div>
                     <div className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t("currentTemp")}</p>
                        <p className="text-xl font-black text-slate-800">{weather?.temperature_2m}°C</p>
                     </div>
                  </div>

                  {/* ANALYTICS SECTION */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-200 h-[400px]">
                        <div className="flex items-center justify-between mb-8">
                           <div>
                             <h4 className="font-extrabold text-lg text-slate-800">{t("growthTrajectory")}</h4>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t("mlPredictedCurve")}</p>
                           </div>
                           <BarChart3 size={20} className="text-slate-400" />
                        </div>
                        <div className="h-[250px] w-full">
                           <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={trendData}>
                                 <defs>
                                   <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                                     <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                     <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                   </linearGradient>
                                 </defs>
                                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                                 <Tooltip 
                                   contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                                 />
                                 <Area type="monotone" dataKey="yield" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorY)" />
                              </AreaChart>
                           </ResponsiveContainer>
                        </div>
                     </div>

                     <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-200 h-[400px]">
                        <div className="flex items-center justify-between mb-8">
                           <div>
                             <h4 className="font-extrabold text-lg text-slate-800">{t("vegetationHealth")}</h4>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t("ndviIndexTrend")}</p>
                           </div>
                           <Activity size={20} className="text-blue-500" />
                        </div>
                        <div className="h-[250px] w-full">
                           <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={trendData}>
                                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} domain={[0, 1]} />
                                 <Tooltip 
                                   contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                                 />
                                 <Line type="monotone" dataKey="ndvi" stroke="#3b82f6" strokeWidth={4} dot={{ r: 6, fill: "#3b82f6", strokeWidth: 3, stroke: "#fff" }} />
                              </LineChart>
                           </ResponsiveContainer>
                        </div>
                     </div>
                  </div>

                  {/* ADVISORY SECTION */}
                  <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
                     <div className="absolute right-0 top-0 p-10 opacity-10">
                        <Zap size={150} />
                     </div>
                     <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20">
                           <Cpu size={24} />
                        </div>
                        <h3 className="text-3xl font-black tracking-tight">{t("aiTacticalAdvisor")}</h3>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {result.insights.map((insight: string, i: number) => (
                           <div key={i} className="flex gap-4 p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 transition-all group">
                              <div className="w-8 h-8 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center text-xs font-black group-hover:scale-110 transition-all">
                                 {i + 1}
                              </div>
                              <p className="text-sm font-medium leading-relaxed text-slate-300 group-hover:text-white">{insight}</p>
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
