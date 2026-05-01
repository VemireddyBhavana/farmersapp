import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Leaf, 
  BookOpen, 
  Lightbulb, 
  Beaker, 
  Calculator,
  X,
  ChevronRight,
  Info,
  CheckCircle2,
  Search,
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Play,
  Star,
  Loader2,
  AlertCircle,
  Clock,
  Settings,
  ShieldCheck,
  Zap,
  TrendingUp,
  Bird,
  Fish,
  Landmark,
  Sprout,
  Sun,
  Shrimp,
  Beef,
  GlassWater
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { AgriModal } from "@/components/AgriModal";
import { cn } from "@/lib/utils";

import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";

// --- Types & Data ---

import { GUIDES_DATA, AgriGuide, GuideStep } from "@/lib/data/guidesData";



// --- Smart Assistant Components ---
function SaveGuideBtn({ guideId }: { guideId: string }) {
  const { t } = useLanguage();
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('agriSavedGuides') || '[]');
      setIsSaved(saved.includes(guideId));
    } catch(e) {}
  }, [guideId]);

  const toggleSave = () => {
    try {
      let saved = JSON.parse(localStorage.getItem('agriSavedGuides') || '[]');
      if (saved.includes(guideId)) {
        saved = saved.filter((id: string) => id !== guideId);
        setIsSaved(false);
      } else {
        saved.push(guideId);
        setIsSaved(true);
      }
      localStorage.setItem('agriSavedGuides', JSON.stringify(saved));
    } catch(e) {}
  };

  return (
    <Button 
      variant={isSaved ? "default" : "outline"}
      onClick={(e) => { e.stopPropagation(); toggleSave(); }}
      className={cn(
        "rounded-full px-5 py-2 font-black transition-all shadow-md group border-2 outline-none focus:ring-4 focus:ring-amber-500/10",
        isSaved 
          ? "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200" 
          : "bg-white text-slate-700 hover:text-amber-600 hover:bg-amber-50 border-slate-200 hover:border-amber-200"
      )}
    >
      <Star className={cn("w-4 h-4 mr-2", isSaved && "fill-amber-500 text-amber-500")} />
      {isSaved ? t('savedGuideBtn') : t('saveGuideBtn')}
    </Button>
  );
}

function EggProfitCalculator() {
  const { t } = useLanguage();
  const [birds, setBirds] = useState("");
  const [feed, setFeed] = useState("");
  const totalFeed = (parseFloat(birds) || 0) * (parseFloat(feed) || 0);

  return (
    <div className="bg-slate-50 border border-slate-200 p-6 rounded-[24px] mt-10 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
          <Calculator className="w-5 h-5" />
        </div>
        <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight">{t('eggProfitCalculatorTitle')}</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-[10px] font-black uppercase text-slate-500">{t('numberOfBirds')}</label>
          <input type="number" placeholder="1000" className="w-full mt-2 rounded-xl border border-slate-200 py-3 px-4 font-bold outline-none focus:border-blue-500 transition-colors" value={birds} onChange={e => setBirds(e.target.value)} />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase text-slate-500">{t('feedPerBird')}</label>
          <input type="number" placeholder="0.12" className="w-full mt-2 rounded-xl border border-slate-200 py-3 px-4 font-bold outline-none focus:border-blue-500 transition-colors" value={feed} onChange={e => setFeed(e.target.value)} />
        </div>
      </div>
      <div className="mt-6 p-5 bg-blue-600 text-white rounded-2xl text-center shadow-lg shadow-blue-200">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-80">{t("dailyFeedRequirement")}</p>
        <p className="text-4xl font-black mt-1">{totalFeed.toFixed(2)} kg</p>
      </div>
    </div>
  );
}

function ShrimpGrowthEstimator() {
  const { t } = useLanguage();
  const [count, setCount] = useState("");
  const [rate, setRate] = useState("");
  const [days, setDays] = useState("");
  const growth = (parseFloat(count) || 0) * ((parseFloat(rate) || 0)/100) * (parseFloat(days) || 0) * 0.015;

  return (
    <div className="bg-slate-50 border border-slate-200 p-6 rounded-[24px] mt-10 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center">
          <Calculator className="w-5 h-5" />
        </div>
        <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight">{t('shrimpGrowthEstimatorTitle')}</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="text-[10px] font-black uppercase text-slate-500">{t('fishCount')} (Shrimp)</label>
          <input type="number" placeholder="100000" className="w-full mt-2 rounded-xl border border-slate-200 py-3 px-4 font-bold outline-none focus:border-cyan-500 transition-colors" value={count} onChange={e => setCount(e.target.value)} />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase text-slate-500">{t('feedRate')}</label>
          <input type="number" placeholder="2.5" className="w-full mt-2 rounded-xl border border-slate-200 py-3 px-4 font-bold outline-none focus:border-cyan-500 transition-colors" value={rate} onChange={e => setRate(e.target.value)} />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase text-slate-500">{t('daysGrowth')}</label>
          <input type="number" placeholder="30" className="w-full mt-2 rounded-xl border border-slate-200 py-3 px-4 font-bold outline-none focus:border-cyan-500 transition-colors" value={days} onChange={e => setDays(e.target.value)} />
        </div>
      </div>
      <div className="mt-6 p-5 bg-cyan-600 text-white rounded-2xl text-center shadow-lg shadow-cyan-200">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-80">{t("estimatedBiomassGain")}</p>
        <p className="text-4xl font-black mt-1">{growth.toFixed(2)} kg</p>
      </div>
    </div>
  );
}

// --- Atomic UI Components ---
const AgriCard = ({ title, children, color = "white" }: { title: string, children: React.ReactNode, color?: string }) => (
  <div className={cn("rounded-2xl shadow-lg p-6 border transition-all hover:shadow-xl", `bg-${color}`)}>
    <h3 className="font-black text-lg mb-4 uppercase tracking-tight text-slate-900 border-b border-slate-100 pb-2">{title}</h3>
    <div className="text-slate-600 font-medium leading-relaxed">{children}</div>
  </div>
);

// --- Main Component ---
export default function AgriKnowledgeHub() {
  const { guideId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // States: AI Planning
  const [cropSoil, setCropSoil] = useState("");
  const [cropSeason, setCropSeason] = useState("");
  const [cropWater, setCropWater] = useState("");
  const [isPlanning, setIsPlanning] = useState(false);
  const [cropSuggestion, setCropSuggestion] = useState<{ crop: string, tip: string } | null>(null);

  const getCropSuggestion = () => {
    if (!cropSoil || !cropSeason || !cropWater) return;
    setIsPlanning(true);
    setTimeout(() => {
      if (cropSoil === "Black" && cropSeason === "Kharif") {
        setCropSuggestion({ crop: "Cotton 🌾", tip: "Requires deep black soil with good moisture retention. Maintain consistent nitrogen levels." });
      } else if (cropSoil === "Red" && cropSeason === "Rabi") {
        setCropSuggestion({ crop: "Groundnut 🌱", tip: "Thrives in well-drained red sandy loam soils. Ensure proper calcium application." });
      } else if (cropSoil === "Sandy" && cropSeason === "Summer") {
        setCropSuggestion({ crop: "Watermelon 🍉", tip: "Needs frequent light irrigation in sandy soils. High potassium requirement for sweetness." });
      } else {
        setCropSuggestion({ crop: "Try Seasonal Crops", tip: "Consult local agronomy experts for specific varieties suitable for current conditions." });
      }
      setIsPlanning(false);
    }, 1000);
  };

  // States: Profit Calculator
  const [investment, setInvestment] = useState("");
  const [expenses, setExpenses] = useState("");
  const [revenue, setRevenue] = useState("");
  const [profitResult, setProfitResult] = useState<number | null>(null);
  const [calcError, setCalcError] = useState("");
  const isCalcValid = investment && expenses && revenue;

  const calculateProfit = () => {
    setCalcError("");
    const rev = parseFloat(revenue);
    const exp = parseFloat(expenses);
    if (isNaN(rev) || isNaN(exp)) {
      setCalcError("Invalid numbers detected. Please re-check inputs.");
      return;
    }
    setProfitResult(rev - exp);
  };

  // States: Nutrient Optimization
  const [fertSoil, setFertSoil] = useState("");
  const fertMap: Record<string, { crop: string, fertilizer: string, tip: string }> = {
    Black: { crop: "Cotton / Soyabean", fertilizer: "Urea, DAP, and Potash (NPK)", tip: "Black soil retains moisture well but needs deep plowing in summer." },
    Red: { crop: "Groundnut / Pulses", fertilizer: "SSP, Gypsum, and Organic Manure", tip: "Red soil lacks nitrogen and phosphorus; supplement with green manure." },
    Sandy: { crop: "Watermelon / Melons", fertilizer: "Water Soluble NPK via Fertigation", tip: "Sandy soil drains quickly; apply fertilizers in small, frequent doses." }
  };

  // States: Visual Knowledge Guides
  const [guideSearch, setGuideSearch] = useState("");
  const [selectedGuide, setSelectedGuide] = useState<AgriGuide | null>(null);
  const [expandedStepId, setExpandedStepId] = useState<number | null>(null);
  const [isGridLoading, setIsGridLoading] = useState(false);

  // Sync URL with Modal State
  useEffect(() => {
    if (guideId) {
      const guide = GUIDES_DATA.find(g => g.id === guideId);
      if (guide) {
        setSelectedGuide(guide);
        setExpandedStepId(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      setSelectedGuide(null);
    }
  }, [guideId]);

  const handleOpenGuide = (guide: AgriGuide) => {
    navigate(`/guide/${guide.id}`);
  };

  const handleCloseGuide = () => {
    navigate("/knowledge");
  };

  useEffect(() => {
    setIsGridLoading(true);
    const timer = setTimeout(() => setIsGridLoading(false), 400);
    return () => clearTimeout(timer);
  }, [guideSearch]);

  const filteredGuides = useMemo(() => {
    return GUIDES_DATA.filter(guide => 
      guide.name.toLowerCase().includes(guideSearch.toLowerCase()) ||
      guide.category.toLowerCase().includes(guideSearch.toLowerCase())
    );
  }, [guideSearch]);



  // --- Sub-Components (Internal) ---

  const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
    <div className="flex flex-col gap-2 mb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center shadow-sm">
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{title}</h2>
      </div>
      <p className="text-sm font-medium text-slate-500 max-w-2xl">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 via-white to-white py-16 scroll-smooth overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-5 py-2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 shadow-2xl shadow-emerald-200/50">
            {t("intelligentFarmingPlatform")}
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9] lg:max-w-4xl mx-auto flex items-center justify-center gap-6">
            <BookOpen className="w-12 h-12 md:w-20 md:h-20 text-emerald-600" />
            <span>{t("agriFarmingKnowledgeHubTitle")}</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
            {t("agriFarmingHubDesc")}
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 md:px-8 space-y-32 mb-40"
      >
        
        {/* 🛠️ SECTION 1: SMART FARMING TOOLS */}
        <section className="space-y-12">
          <SectionHeader 
            icon={Settings} 
            title={t("smartFarmingToolsTitle")} 
            subtitle={t("smartFarmingToolsSubtitle")} 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 🎯 AI Crop Planning */}
            <FeatureCard className="p-8 border-emerald-100 shadow-emerald-100/20 group hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">{t("aiCropPlanningTitle")}</h3>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400">{t("soilTypeLabel")}</label>
                     <select className="w-full rounded-xl border border-slate-200 text-sm py-2 px-3 bg-white font-bold outline-none focus:border-emerald-500" value={cropSoil} onChange={e => setCropSoil(e.target.value)}>
                      <option value="">{t("typePlaceholder")}</option>
                      <option value="Black">{t("blackSoilSimple")}</option>
                      <option value="Red">{t("redSoilSimple")}</option>
                      <option value="Sandy">{t("sandySoilSimple")}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400">{t("seasonLabel")}</label>
                     <select className="w-full rounded-xl border border-slate-200 text-sm py-2 px-3 bg-white font-bold outline-none focus:border-emerald-500" value={cropSeason} onChange={e => setCropSeason(e.target.value)}>
                      <option value="">{t("selectSeason")}</option>
                      <option value="Kharif">{t("kharifLabel")}</option>
                      <option value="Rabi">{t("rabiLabel")}</option>
                      <option value="Summer">{t("summerLabel")}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400">{t("waterLabel")}</label>
                     <select className="w-full rounded-xl border border-slate-200 text-sm py-2 px-3 bg-white font-bold outline-none focus:border-emerald-500" value={cropWater} onChange={e => setCropWater(e.target.value)}>
                      <option value="">{t("selectWaterAvailability")}</option>
                      <option value="Low">{t("lowWaterLabel")}</option>
                      <option value="Medium">{t("mediumWaterLabel")}</option>
                      <option value="High">{t("highWaterLabel")}</option>
                    </select>
                  </div>
                </div>
                <Button 
                  onClick={getCropSuggestion} 
                  disabled={isPlanning || !cropSoil || !cropSeason || !cropWater} 
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-lg shadow-emerald-200/50 flex items-center justify-center gap-2"
                >
                  {isPlanning ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t("processingAiData")}</span>
                    </>
                  ) : t("analyzeSoilPotential")}
                </Button>
                <AnimatePresence>
                  {cropSuggestion && !isPlanning && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 10 }} 
                      animate={{ opacity: 1, scale: 1, y: 0 }} 
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="bg-emerald-50 border-2 border-emerald-200 p-5 rounded-2xl relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-2 opacity-10">
                        <Leaf className="w-12 h-12" />
                      </div>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">{t("recommendedCropLabel")}</p>
                      <p className="text-2xl font-black text-emerald-900">{cropSuggestion.crop}</p>
                      <p className="text-xs text-emerald-800/70 mt-2 font-medium leading-relaxed">{cropSuggestion.tip}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FeatureCard>

            {/* 💰 Profit Calculator */}
            <FeatureCard className="p-8 border-slate-100 group hover:shadow-xl transition-all">
               <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900">{t("profitLossAnalyzerTitle")}</h3>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400">{t("totalInvestmentLabel")}</label>
                    <input type="number" placeholder="₹ Value" className="w-full rounded-xl border border-slate-200 py-2.5 px-4 text-sm font-bold outline-none focus:border-slate-900 transition-colors" value={investment} onChange={e => setInvestment(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400">{t("recurringExpensesLabel")}</label>
                    <input type="number" placeholder="₹ Value" className="w-full rounded-xl border border-slate-200 py-2.5 px-4 text-sm font-bold outline-none focus:border-slate-900 transition-colors" value={expenses} onChange={e => setExpenses(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">{t("projectedGrossRevenueLabel")}</label>
                  <input type="number" placeholder="₹ Total Earnings" className="w-full rounded-xl border border-slate-200 py-2.5 px-4 text-sm font-bold outline-none focus:border-slate-900 transition-colors" value={revenue} onChange={e => setRevenue(e.target.value)} />
                </div>
                <Button 
                  onClick={calculateProfit} 
                  disabled={!isCalcValid} 
                  className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl shadow-lg transition-transform active:scale-95"
                >
                  {t("runFiscalAnalysis")}
                </Button>
                <AnimatePresence>
                  {profitResult !== null && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: 20 }}
                      className={cn(
                        "p-5 rounded-2xl border-2 text-center", 
                        profitResult >= 0 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
                      )}
                    >
                      <p className={cn("text-3xl font-black mb-1", profitResult >= 0 ? "text-emerald-900" : "text-red-900")}>
                        {profitResult >= 0 ? "₹ " : "- ₹ "}
                        {Math.abs(profitResult).toLocaleString('en-IN')}
                      </p>
                      <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", profitResult >= 0 ? "text-emerald-600" : "text-red-600")}>
                        {profitResult >= 0 ? t("netProfitProjected") : t("operatingDeficit")}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FeatureCard>

            {/* 🧪 Nutrient Optimization (Full Width on Mobile) */}
            <FeatureCard className="lg:col-span-2 p-8 border-emerald-50 bg-emerald-50/20 group">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200 ring-4 ring-emerald-50">
                      <Beaker className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">{t("nutrientOptimizationTitle")}</h3>
                      <p className="text-sm text-slate-500 font-medium max-w-sm">{t("nutrientOptimizationDesc")}</p>
                    </div>
                 </div>
                 <div className="flex-1 max-w-sm">
                    <select className="w-full rounded-2xl border-2 border-emerald-100 py-3.5 px-5 text-sm font-bold outline-none bg-white shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all" value={fertSoil} onChange={e => setFertSoil(e.target.value)}>
                      <option value="">{t("selectSoilComposition")}</option>
                      <option value="Black">{t("blackSoilLabel")}</option>
                      <option value="Red">{t("redSoilLabel")}</option>
                      <option value="Sandy">{t("sandySoilLabel")}</option>
                    </select>
                 </div>
               </div>
               <AnimatePresence mode="wait">
                 {fertSoil && (
                  <motion.div 
                    key={fertSoil}
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -15 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
                  >
                    <div className="bg-white p-5 rounded-2xl border-2 border-emerald-50 shadow-sm">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">{t("priorityCropLabel")}</p>
                      <p className="text-lg font-black text-slate-900 uppercase tracking-tight">{fertMap[fertSoil].crop}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border-2 border-emerald-50 shadow-sm">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">{t("recommendedNpkLabel")}</p>
                      <p className="text-lg font-black text-slate-900 tracking-tight">{fertMap[fertSoil].fertilizer}</p>
                    </div>
                    <div className="bg-slate-900 p-6 rounded-2xl text-emerald-50 flex items-center">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                           <Info className="w-4 h-4 text-emerald-400" />
                           <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">{t("agronomyTipLabel")}</span>
                        </div>
                        <p className="text-xs font-medium leading-relaxed italic opacity-90">"{fertMap[fertSoil].tip}"</p>
                      </div>
                    </div>
                  </motion.div>
                 )}
               </AnimatePresence>
            </FeatureCard>
          </div>
        </section>

        <div className="h-px bg-slate-100 w-full" />

        {/* 📚 SECTION 2: FARMING KNOWLEDGE HUB */}
        <section className="space-y-16">
          <SectionHeader 
            icon={BookOpen} 
            title={t("agriFarmingKnowledgeHubTitle")} 
            subtitle={t("agriFarmingHubDesc")} 
          />

          {/* 🔍 SEARCH AND FILTERS */}
          <div className="flex flex-col md:flex-row gap-4 items-center mb-10">
            <div className="relative flex-1 w-full group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
               <input 
                type="text" 
                placeholder={t("searchCultivationLibrary")} 
                className="w-full rounded-2xl border border-slate-200 py-4 pl-12 pr-6 text-sm font-semibold outline-none bg-white shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all" 
                value={guideSearch} 
                onChange={e => setGuideSearch(e.target.value)} 
               />
            </div>
          </div>

          {/* 📖 GUIDES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {isGridLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-slate-100 animate-pulse h-80 rounded-2xl" />
                ))
              ) : filteredGuides.length > 0 ? (
                filteredGuides.map((guide, idx) => (
                  <motion.div 
                    key={guide.id} 
                    layout 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    className={cn(
                      "group cursor-pointer",
                      guide.featured ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                    )}
                    onClick={() => handleOpenGuide(guide)}
                  >
                    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full relative group">
                      {guide.featured && (
                        <div className="absolute top-6 left-6 z-10 px-4 py-2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl shadow-emerald-200/50">
                          {t("featuredGuideBadge")}
                        </div>
                      )}
                      <div className="aspect-[16/9] overflow-hidden relative">
                        <img 
                          src={guide.image} 
                          alt={t(guide.name)} 
                          loading="lazy" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Category Badge on Image */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-md text-slate-900 rounded-xl border border-white/20 shadow-xl z-10 transition-transform group-hover:scale-105">
                          <guide.icon className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-[10px] font-black uppercase tracking-wider">{t(`cat_${guide.category.toLowerCase()}`)}</span>
                        </div>
                      </div>
                      <div className="p-8 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-4">
                          <span className={cn(
                            "px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg border",
                            guide.tag === "tagNew" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                            guide.tag === "tagExpert" ? "bg-amber-50 text-amber-700 border-amber-100" :
                            guide.tag === "tagGuide" ? "bg-blue-50 text-blue-700 border-blue-100" :
                            guide.tag === "tagScheme" ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                            guide.tag === "tagBusiness" ? "bg-purple-50 text-purple-700 border-purple-100" :
                            "bg-slate-50 text-slate-700 border-slate-100"
                          )}>
                            {t(guide.tag)}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 lowercase">{t('today')}</span>
                        </div>
                        <h3 className={cn("font-black text-slate-900 leading-tight mb-6 transition-colors group-hover:text-emerald-700", guide.featured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl")}>
                          {t(guide.name)}
                        </h3>
                        <div className="mt-auto flex items-center justify-between text-emerald-600 text-[11px] font-black pt-6 border-t border-slate-50 group-hover:border-emerald-100 transition-colors uppercase tracking-[0.1em]">
                          <span className="flex items-center gap-2">
                             {t('cultivationGuideBtn')}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Search className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">{t("noGuidesFound")}</h3>
                  <p className="text-slate-500 font-medium">{t("tryAdjustingSearch")}</p>
                </div>
              )}
            </AnimatePresence>
          </div>



        </section>
      </motion.div>

      {/* --- MODALS --- */}
      <AgriModal 
        isOpen={!!selectedGuide} 
        onClose={handleCloseGuide} 
        title={selectedGuide?.name || ""} 
        subtitle={selectedGuide?.category}
        icon={BookOpen}
        maxWidth="max-w-5xl"
      >
         {selectedGuide && (
           <div className="space-y-12 py-6">
             {/* New Header Overrides (Difficulty & Save) */}
             <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
               <div className="flex items-center gap-3">
                 {selectedGuide.difficulty && (
                   <div className={cn(
                     "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border flex items-center gap-1.5 shadow-sm",
                     selectedGuide.difficulty === 'Beginner' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                     selectedGuide.difficulty === 'Intermediate' ? "bg-amber-50 text-amber-700 border-amber-200" :
                     "bg-rose-50 text-rose-700 border-rose-200"
                   )}>
                     <div className={cn(
                       "w-1.5 h-1.5 rounded-full",
                       selectedGuide.difficulty === 'Beginner' ? "bg-emerald-500" :
                       selectedGuide.difficulty === 'Intermediate' ? "bg-amber-500" :
                       "bg-rose-500"
                     )} />
                     {t(`difficulty${selectedGuide.difficulty}`)}
                   </div>
                 )}
               </div>
               <SaveGuideBtn guideId={selectedGuide.id} />
             </div>

             {/* Video Embed */}
             {selectedGuide.videoUrl && (
               <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-xl border-4 border-slate-50 relative group">
                  <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full flex items-center gap-2">
                    <Play className="w-3 h-3 text-emerald-400" />
                    {t('watchDemoTitle')}
                  </div>
                  <iframe 
                    src={selectedGuide.videoUrl} 
                    className="w-full h-full object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
               </div>
             )}

             <div className="grid grid-cols-1 gap-12">
               {selectedGuide.steps.map((step, i) => {
                 const isExpanded = expandedStepId === step.id;
                 return (
                 <div key={step.id} className="flex flex-col gap-6">
                   {/* Step Header -> Now a Standalone Card */}
                   <div 
                     className={cn(
                       "flex flex-col md:flex-row gap-8 items-start cursor-pointer select-none bg-white rounded-xl shadow p-4 border border-slate-200 transition-all duration-500 group",
                       isExpanded ? "ring-2 ring-emerald-500/20 border-emerald-100 shadow-md" : "hover:shadow-xl hover:border-slate-200"
                     )}
                     onClick={() => setExpandedStepId(isExpanded ? null : step.id)}
                   >
                     <div className="shrink-0 w-full md:w-80 h-48 overflow-hidden rounded-[24px] shadow-xl border border-slate-100 relative">
                        <img src={step.image} alt={step.title} loading="lazy" className={cn("w-full h-full object-cover transition-transform duration-700", isExpanded ? "scale-105" : "group-hover:scale-105")} />
                        <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-lg ring-4 ring-white">
                          {i + 1}
                        </div>
                     </div>
                     <div className="flex-1 py-2 space-y-4 pr-8">
                        <div className="flex items-start justify-between">
                          <h4 className="text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">
                            {step.title}
                          </h4>
                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 border border-slate-200"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </motion.div>
                        </div>
                        <p className="text-slate-500 font-medium text-lg leading-relaxed">{step.description}</p>
                     </div>
                   </div>

                   {/* Accordion Sub-Steps -> Each will render as standalone sibling cards */}
                   <AnimatePresence>
                     {isExpanded && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         className="overflow-hidden"
                       >
                         <div className="space-y-4 pt-10">
                             {step.subSteps?.map((sub, sIdx) => (
                                <motion.div 
                                  key={sIdx}
                                  initial={{ opacity: 0, y: 20 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: sIdx * 0.1, duration: 0.5 }}
                                  className="space-y-5 pt-10 border-t border-slate-100/50 first:border-0 first:pt-4"
                                >
                                  {/* 📘 PROCESS CARD */}
                                  <div className="backdrop-blur-lg bg-white/20 border border-white/40 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                                    <h3 className="flex items-center gap-3 font-black text-xl text-slate-900 mb-6 uppercase tracking-tight">
                                      <span className="text-2xl">📘</span> Step Details: {sub.title}
                                    </h3>
                                    
                                    <div className="space-y-6">
                                      <div className="p-4 bg-white/40 backdrop-blur-md rounded-xl border border-white/50 shadow-inner">
                                        <p className="text-[11px] font-black uppercase text-emerald-700 tracking-[0.2em] mb-2">Technical Overview</p>
                                        <p className="text-slate-800 text-[16px] font-bold leading-relaxed italic border-l-4 border-emerald-500 pl-4">
                                          {sub.simpleExplanation}
                                        </p>
                                      </div>

                                      <div className="space-y-2 px-1">
                                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">In-Depth Cultivation Logic</p>
                                        <p className="text-slate-600 text-[15px] font-medium leading-relaxed">
                                          {sub.detailedExplanation}
                                        </p>
                                      </div>

                                      {sub.instructions.length > 0 && (
                                        <div className="space-y-4">
                                          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Step-by-Step implementation</p>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {sub.instructions.map((inst, iIdx) => (
                                              <div key={iIdx} className="flex gap-4 items-start bg-white/30 p-4 rounded-xl border border-white/40 shadow-sm hover:bg-white/50 transition-colors">
                                                <div className="w-8 h-8 rounded-lg bg-white/80 border border-slate-200 flex items-center justify-center shrink-0 font-black text-emerald-600 text-sm shadow-sm">
                                                  {iIdx + 1}
                                                </div>
                                                <p className="text-slate-700 text-sm font-bold leading-tight pt-1">{inst}</p>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {sub.materials.length > 0 && (
                                        <div className="pt-5 border-t border-slate-200/30">
                                          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-3">Required Resources</p>
                                          <div className="flex flex-wrap gap-2">
                                            {sub.materials.map((mat, mIdx) => (
                                              <span key={mIdx} className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl border border-slate-800 uppercase tracking-widest shadow-lg hover:scale-105 transition-transform">
                                                {mat}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* TIP + PRACTICES GRID */}
                                  <div className="grid md:grid-cols-2 gap-5">
                                    {/* 🌱 FARMER TIP */}
                                    <div className="backdrop-blur-lg bg-green-50/60 border border-green-100/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex flex-col justify-between">
                                      <div>
                                        <h4 className="flex items-center gap-2 font-black text-green-700 uppercase tracking-tight text-sm mb-4">
                                          <span className="text-lg">🌱</span> Farmer Tip
                                        </h4>
                                        <div className="space-y-3">
                                          {sub.proTips.map((tip, tIdx) => (
                                            <p key={tIdx} className="text-[14px] text-green-900 font-bold leading-relaxed flex gap-3">
                                              <span className="text-green-500">•</span>
                                              {tip}
                                            </p>
                                          ))}
                                        </div>
                                      </div>
                                    </div>

                                    {/* ✅ BEST PRACTICES */}
                                    <div className="backdrop-blur-lg bg-slate-50/60 border border-slate-200/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                                      <h4 className="flex items-center gap-2 font-black text-slate-800 uppercase tracking-tight text-sm mb-4">
                                        <span className="text-lg">✅</span> Best Practices
                                      </h4>
                                      <ul className="space-y-3">
                                        {sub.bestPractices.map((bp, bIdx) => (
                                          <li key={bIdx} className="text-[14px] font-bold text-slate-600 flex gap-3 items-start leading-tight">
                                            <span className="text-emerald-500">✔</span>
                                            {bp}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>

                                  {/* ⚠ COMMON MISTAKES */}
                                  {sub.mistakes.length > 0 && (
                                    <div className="backdrop-blur-lg bg-red-50/60 border border-red-100/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                      <h4 className="flex items-center gap-2 font-black text-red-600 uppercase tracking-tight text-sm mb-4">
                                        <span className="text-lg">⚠</span> Common Mistakes
                                      </h4>
                                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {sub.mistakes.map((mistake, eIdx) => (
                                          <li key={eIdx} className="flex gap-3 items-start font-bold text-red-900/80 text-[14px] leading-tight bg-white/20 p-3 rounded-lg border border-red-100/30">
                                            <span className="text-red-500">✖</span>
                                            {mistake}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </motion.div>
                             ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  );
                })}
              </div>

             {/* Interactive Calculators */}
             {selectedGuide.id === "egg-production" && <EggProfitCalculator />}
             {selectedGuide.id === "vannamei-shrimp" && <ShrimpGrowthEstimator />}

             {/* Real-World Data & Farmer Tips */}
             {(selectedGuide.realWorldData || selectedGuide.farmerTips) && (
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-10 border-t border-slate-100">
                 
                 {selectedGuide.realWorldData && (
                   <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl shadow-slate-200 flex flex-col justify-between hover:shadow-emerald-900/20 transition-shadow">
                     <div>
                       <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 border border-slate-700">
                         <TrendingUp className="w-6 h-6 text-emerald-400" />
                       </div>
                       <h4 className="text-xl font-black mb-6 uppercase tracking-tight text-white">Economic Viability</h4>
                       <div className="space-y-4">
                         <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                           <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('estimatedCostTitle')}</span>
                           <span className="font-black text-emerald-400">{selectedGuide.realWorldData.cost}</span>
                         </div>
                         <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                           <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('expectedProfitTitle')}</span>
                           <span className="font-black text-emerald-400">{selectedGuide.realWorldData.profit}</span>
                         </div>
                         <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                           <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('timeDurationTitle')}</span>
                           <span className="font-black text-white">{selectedGuide.realWorldData.duration}</span>
                         </div>
                       </div>
                     </div>
                     <div className="mt-6">
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-3">{t('requiredResourcesTitle')}</p>
                       <div className="flex flex-wrap gap-2">
                         {selectedGuide.realWorldData.resources.map(res => (
                           <span key={res} className="px-3 py-1.5 bg-slate-800 text-slate-300 text-[10px] font-bold rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors cursor-default">{res}</span>
                         ))}
                       </div>
                     </div>
                   </div>
                 )}

                 {selectedGuide.farmerTips && (
                   <div className="bg-emerald-50/50 rounded-[32px] p-8 border border-emerald-100 shadow-sm flex flex-col justify-between group hover:bg-emerald-50 transition-colors">
                     <div>
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
                         <Info className="w-6 h-6 text-emerald-600" />
                       </div>
                       <h4 className="text-xl font-black mb-6 text-emerald-950 uppercase tracking-tight">{t('farmerTipsTitle')}</h4>
                       
                       <div className="space-y-4">
                         <div className="space-y-3">
                           <div className="flex items-center gap-2">
                             <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">{t('dosTitle')}</span>
                           </div>
                           <ul className="space-y-2">
                             {selectedGuide.farmerTips.dos.map(doo => (
                               <li key={doo} className="text-sm font-medium text-emerald-900/80 leading-relaxed">• {doo}</li>
                             ))}
                           </ul>
                         </div>
                         
                         <div className="space-y-3">
                           <div className="flex items-center gap-2">
                             <AlertCircle className="w-4 h-4 text-rose-500" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-rose-700">{t('dontsTitle')}</span>
                           </div>
                           <ul className="space-y-2">
                             {selectedGuide.farmerTips.donts.map(dont => (
                               <li key={dont} className="text-sm font-medium text-rose-900/80 leading-relaxed">• {dont}</li>
                             ))}
                           </ul>
                         </div>
                       </div>
                     </div>
                   </div>
                 )}
               </div>
             )}
             
             <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <Button onClick={handleCloseGuide} variant="outline" className="rounded-2xl font-black border-2 border-slate-900 px-8 py-6 hover:bg-slate-900 hover:text-white transition-all group">
                  <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-2 transition-transform" />
                  Back to Knowledge Hub
                </Button>
                <div className="flex items-center gap-3 bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-100">
                   <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                   <span className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em]">End of Road-map</span>
                </div>
             </div>
           </div>
         )}
      </AgriModal>


    </div>
  );
}
