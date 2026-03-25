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
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { AgriModal } from "@/components/AgriModal";
import { cn } from "@/lib/utils";

import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";

// --- Types & Data ---

interface GuideStep {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface AgriGuide {
  id: string;
  name: string;
  category: "Agriculture" | "Poultry" | "Aquaculture" | "Horticulture" | "Subsidies" | "Gardening";
  image: string;
  featured?: boolean;
  tag: string;
  icon: any;
  steps: GuideStep[];
}

const GUIDES_DATA: AgriGuide[] = [
  {
    id: "saffron",
    name: "indoorSaffronTitle",
    category: "Agriculture",
    tag: "tagNew",
    icon: Leaf,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY1evynbsc_tYbIqXBMj7q4v_WG56ve2SSCA&s",
    steps: [
      { id: 1, title: "Setup Growing Area", image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=600", description: "Prepare trays and specialized indoor climate-controlled soil." },
      { id: 2, title: "Plant Bulbs", image: "https://images.unsplash.com/photo-1599395155160-b6e9a7e04f6c?auto=format&fit=crop&q=80&w=600", description: "Place high-quality saffron bulbs correctly in the substrate." },
      { id: 3, title: "Maintain Temperature", image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=600", description: "Keep the proper climate for optimal flower and thread growth." },
      { id: 4, title: "Harvest", image: "https://images.unsplash.com/photo-1615485290382-440344d93025?auto=format&fit=crop&q=80&w=600", description: "Collect the delicate saffron threads during the flowering window." }
    ]
  },
  {
    id: "egg-production",
    name: "eggProductionTitle",
    category: "Poultry",
    tag: "tagGuide",
    icon: Bird,
    image: "https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?auto=format&fit=crop&q=80&w=800",
    steps: [
      { id: 1, title: "Setup Poultry Farm", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600", description: "Construct well-ventilated housing with proper nesting stations." },
      { id: 2, title: "Select Good Breeds", image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600", description: "Choose high-yield layer breeds resistant to local diseases." },
      { id: 3, title: "Feed & Care", image: "https://images.unsplash.com/photo-1582769923195-c6e60dc1d8bc?auto=format&fit=crop&q=80&w=600", description: "Maintain a strict feeding schedule and monitor bird health daily." },
      { id: 4, title: "Egg Collection", image: "https://images.unsplash.com/photo-1529511582893-2d7e684dd128?auto=format&fit=crop&q=80&w=600", description: "Gather eggs twice daily to maintain freshness and hygiene." }
    ]
  },
  {
    id: "vannamei-shrimp",
    name: "shrimpFarmingTitle",
    category: "Aquaculture",
    tag: "tagExpert",
    icon: Fish,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQrho1VB3WThsItYUa1WLYOugvC4LCfv7mAg&s",
    steps: [
      { id: 1, title: "Pond Preparation", image: "https://images.unsplash.com/photo-1599940824399-b87980ba9715?auto=format&fit=crop&q=80&w=600", description: "Prepare, clean, and lime the aquaculture ponds for shrimp stocking." },
      { id: 2, title: "Seed Selection", image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=600", description: "Acquire healthy, disease-free seed batches from certified sources." },
      { id: 3, title: "Feeding", image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=600", description: "Optimize feed cycles to promote rapid, sustainable growth." },
      { id: 4, title: "Harvesting", image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&q=80&w=600", description: "Harvest shrimps during night or early morning for best quality." }
    ]
  },
  {
    id: "solar-pump",
    name: "solarPumpTitle",
    category: "Subsidies",
    tag: "tagScheme",
    icon: Landmark,
    image: "https://solarizeindia.in/wp-content/uploads/2024/07/kusum-solar-pump-yojana.jpg",
    steps: [
      { id: 1, title: "Eligibility Check", image: "https://solarizeindia.in/wp-content/uploads/2024/07/kusum-solar-pump-yojana.jpg", description: "Verify you meet the land and farming status criteria for the subsidy." },
      { id: 2, title: "Application Submission", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800", description: "Apply online or at a district-level agriculture office with required docs." },
      { id: 3, title: "Site Inspection", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800", description: "Authorities will inspect the farm site for solar installation feasibility." },
      { id: 4, title: "System Installation", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800", description: "Get the solar pump system installed by approved government vendors." }
    ]
  },
  {
    id: "aloe-vera",
    name: "aloeVeraTitle",
    category: "Horticulture",
    tag: "tagBusiness",
    icon: Sprout,
    image: "https://pbs.twimg.com/media/FMLdOWGXsAUOIkY.jpg",
    steps: [
      { id: 1, title: "Soil Preparation", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=600", description: "Ensure well-draining soil with proper organic matter content." },
      { id: 2, title: "Planting Suckers", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=600", description: "Plant healthy aloe vera suckers or offsets from mother plants." },
      { id: 3, title: "Minimal Watering", image: "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?auto=format&fit=crop&q=80&w=600", description: "Avoid overwatering; keep soil moderately dry to prevent root rot." },
      { id: 4, title: "Harvesting Leaves", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=600", description: "Cut outer mature leaves directly from the plant base as needed." }
    ]
  },
  {
    id: "curry-leaves",
    name: "curryLeavesTitle",
    category: "Gardening",
    tag: "tagTips",
    icon: Sun,
    image: "https://blog.suvie.com/wp-content/uploads/2021/08/kadipatta-2701445_1920-1360x907.jpg",
    steps: [
      { id: 1, title: "Sapling Selection", image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&q=80&w=600", description: "Select healthy nursery saplings for transplanting." },
      { id: 2, title: "Field Planting", image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600", description: "Transplant saplings into prepared pits during favorable seasons." },
      { id: 3, title: "Pruning Control", image: "https://images.unsplash.com/photo-1592150621344-79e5085f3ac2?auto=format&fit=crop&q=80&w=600", description: "Regularly prune branch tips to encourage lush, bushy leaf growth." },
      { id: 4, title: "Pest Management", image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=600", description: "Apply organic neem-based solutions to manage leaf-eating pests." }
    ]
  }
];



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
  const [isGridLoading, setIsGridLoading] = useState(false);

  // Sync URL with Modal State
  useEffect(() => {
    if (guideId) {
      const guide = GUIDES_DATA.find(g => g.id === guideId);
      if (guide) {
        setSelectedGuide(guide);
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
            Intelligent Farming Platform
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9] lg:max-w-4xl mx-auto flex items-center justify-center gap-6">
            <BookOpen className="w-12 h-12 md:w-20 md:h-20 text-emerald-600" />
            <span>Agri <span className="text-emerald-600">Farming</span> Knowledge Hub</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
            Latest farming techniques, project reports, and livestock management guides.
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
            title="Smart Farming Tools" 
            subtitle="Use AI-powered tools to improve your farming decisions and maximize ROI" 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 🎯 AI Crop Planning */}
            <FeatureCard className="p-8 border-emerald-100 shadow-emerald-100/20 group hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">AI Crop Planning</h3>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400">Soil Type</label>
                     <select className="w-full rounded-xl border border-slate-200 text-sm py-2 px-3 bg-white font-bold outline-none focus:border-emerald-500" value={cropSoil} onChange={e => setCropSoil(e.target.value)}>
                      <option value="">Type...</option>
                      <option value="Black">Black Soil</option>
                      <option value="Red">Red Soil</option>
                      <option value="Sandy">Sandy Soil</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400">Season</label>
                     <select className="w-full rounded-xl border border-slate-200 text-sm py-2 px-3 bg-white font-bold outline-none focus:border-emerald-500" value={cropSeason} onChange={e => setCropSeason(e.target.value)}>
                      <option value="">Select...</option>
                      <option value="Kharif">Kharif</option>
                      <option value="Rabi">Rabi</option>
                      <option value="Summer">Summer</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400">Water</label>
                     <select className="w-full rounded-xl border border-slate-200 text-sm py-2 px-3 bg-white font-bold outline-none focus:border-emerald-500" value={cropWater} onChange={e => setCropWater(e.target.value)}>
                      <option value="">Availability...</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
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
                      <span>Processing AI Data...</span>
                    </>
                  ) : "Analyze Soil Potential"}
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
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Recommended Crop</p>
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
                <h3 className="text-xl font-black text-slate-900">Profit & Loss Analyzer</h3>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400">Total Investment</label>
                    <input type="number" placeholder="₹ Value" className="w-full rounded-xl border border-slate-200 py-2.5 px-4 text-sm font-bold outline-none focus:border-slate-900 transition-colors" value={investment} onChange={e => setInvestment(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400">Recurring Expenses</label>
                    <input type="number" placeholder="₹ Value" className="w-full rounded-xl border border-slate-200 py-2.5 px-4 text-sm font-bold outline-none focus:border-slate-900 transition-colors" value={expenses} onChange={e => setExpenses(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">Projected Gross Revenue</label>
                  <input type="number" placeholder="₹ Total Earnings" className="w-full rounded-xl border border-slate-200 py-2.5 px-4 text-sm font-bold outline-none focus:border-slate-900 transition-colors" value={revenue} onChange={e => setRevenue(e.target.value)} />
                </div>
                <Button 
                  onClick={calculateProfit} 
                  disabled={!isCalcValid} 
                  className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl shadow-lg transition-transform active:scale-95"
                >
                  Run Fiscal Analysis
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
                        {profitResult >= 0 ? "Net Profit Projected" : "Operating Deficit"}
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
                      <h3 className="text-2xl font-black text-slate-900">Nutrient Optimization</h3>
                      <p className="text-sm text-slate-500 font-medium max-w-sm">Get precise fertilization roadmaps based on your unique soil profile</p>
                    </div>
                 </div>
                 <div className="flex-1 max-w-sm">
                    <select className="w-full rounded-2xl border-2 border-emerald-100 py-3.5 px-5 text-sm font-bold outline-none bg-white shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all" value={fertSoil} onChange={e => setFertSoil(e.target.value)}>
                      <option value="">Select Soil Composition...</option>
                      <option value="Black">Deep Black (Regur) Soil</option>
                      <option value="Red">Laterite Red Soil</option>
                      <option value="Sandy">Alluvial Sandy Soil</option>
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
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Priority Crop</p>
                      <p className="text-lg font-black text-slate-900 uppercase tracking-tight">{fertMap[fertSoil].crop}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border-2 border-emerald-50 shadow-sm">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Recommended NPK</p>
                      <p className="text-lg font-black text-slate-900 tracking-tight">{fertMap[fertSoil].fertilizer}</p>
                    </div>
                    <div className="bg-slate-900 p-6 rounded-2xl text-emerald-50 flex items-center">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                           <Info className="w-4 h-4 text-emerald-400" />
                           <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Agronomy Tip</span>
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
            title="AgriFarming Knowledge Hub" 
            subtitle="Latest farming techniques, project reports, and livestock management guides." 
          />

          {/* 🔍 SEARCH AND FILTERS */}
          <div className="flex flex-col md:flex-row gap-4 items-center mb-10">
            <div className="relative flex-1 w-full group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
               <input 
                type="text" 
                placeholder="Search cultivation library by name or category..." 
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
                          Featured Guide
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
                  <h3 className="text-2xl font-black text-slate-900">No guides found</h3>
                  <p className="text-slate-500 font-medium">Try adjusting your search terms to find specific cultivation roadmaps</p>
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
             <div className="grid grid-cols-1 gap-12">
               {selectedGuide.steps.map((step, i) => (
                 <div key={step.id} className="flex flex-col md:flex-row gap-8 items-start group">
                   <div className="shrink-0 w-full md:w-80 h-48 overflow-hidden rounded-[24px] shadow-xl border border-slate-100 relative">
                      <img src={step.image} alt={step.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-lg ring-4 ring-white">
                        {i + 1}
                      </div>
                   </div>
                   <div className="flex-1 py-2">
                      <h4 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">
                        {step.title}
                      </h4>
                      <p className="text-slate-500 font-medium text-lg leading-relaxed">{step.description}</p>
                   </div>
                 </div>
               ))}
             </div>
             
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
