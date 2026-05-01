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
  BarChart3
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
      const res = await axios.post("/api/predict", formData);
      setResult(res.data);
      setHistory(prev => [res.data, ...prev].slice(0, 5));
    } catch (err) {
      console.error("Prediction failed");
    } finally {
      setIsCalculating(false);
    }
  };

  const trendData = [
    { name: "Week 1", yield: 2.1, ndvi: 0.65 },
    { name: "Week 2", yield: 2.4, ndvi: 0.68 },
    { name: "Week 3", yield: 2.8, ndvi: 0.72 },
    { name: "Week 4", yield: result?.yield || 3.2, ndvi: result?.ndvi || 0.75 },
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
              <MapIcon size={16} className="text-slate-400" />
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
                    <MapIcon size={24} className="text-emerald-400" />
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

                 {/* ANALYTICS SECTION */}
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-200 h-[400px]">
                       <div className="flex items-center justify-between mb-8">
                          <div>
                            <h4 className="font-extrabold text-lg">{t("growthTrajectory")}</h4>
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
                            <h4 className="font-extrabold text-lg">{t("vegetationHealth")}</h4>
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
