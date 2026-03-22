import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Leaf, 
  TrendingUp, 
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
  ArrowLeft,
  Play,
  Star,
  Loader2,
  AlertCircle,
  Clock,
  Settings,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { AgriModal } from "@/components/AgriModal";
import { cn } from "@/lib/utils";

// --- Types & Data ---

// 1. Crop Guides Data
interface CropStep {
  title: string;
  description: string;
  image: string;
}

interface CropGuide {
  id: string;
  name: string;
  category: "Food Crops" | "Vegetables" | "Fruits" | "Cash Crops" | "Special Crops";
  image: string;
  tag?: "Popular" | "New";
  steps: CropStep[];
}

const CROP_GUIDES_DATA: CropGuide[] = [
  {
    id: "rice",
    name: "Rice",
    category: "Food Crops",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    tag: "Popular",
    steps: [
      { title: "Step 1: Land Preparation", description: "Prepare soil and level field. Ensure proper drainage and water retention.", image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600" },
      { title: "Step 2: Sowing", description: "Use quality seeds and maintain proper nursery beds for healthy growth.", image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600" },
      { title: "Step 3: Irrigation", description: "Maintain water level consistently, especially during the flowering stage.", image: "https://images.unsplash.com/photo-1590682603211-19349896792f?auto=format&fit=crop&q=80&w=600" },
      { title: "Step 4: Fertilizers", description: "Apply nitrogen-based fertilizers in recommended doses for optimal yield.", image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=600" },
      { title: "Step 5: Harvesting", description: "Harvest after maturity when grains turn straw-colored and moisture is low.", image: "https://images.unsplash.com/photo-1536633310183-500e572886f4?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  { id: "wheat", name: "Wheat", category: "Food Crops", image: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?auto=format&fit=crop&q=80&w=800", steps: [] },
  { id: "maize", name: "Maize", category: "Food Crops", image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=800", steps: [] },
  { id: "millets", name: "Millets", category: "Food Crops", image: "https://images.unsplash.com/photo-1647891941746-95ce671dfc83?auto=format&fit=crop&q=80&w=800", steps: [] },
  { id: "tomato", name: "Tomato", category: "Vegetables", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800", tag: "Popular", steps: [] },
  { id: "onion", name: "Onion", category: "Vegetables", image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=800", steps: [] },
  { id: "potato", name: "Potato", category: "Vegetables", image: "https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?auto=format&fit=crop&q=80&w=800", steps: [] },
  { id: "chilli", name: "Chilli", category: "Vegetables", image: "https://images.unsplash.com/photo-1588253518679-119c312dd512?auto=format&fit=crop&q=80&w=800", steps: [] },
  { id: "cotton", name: "Cotton", category: "Cash Crops", image: "https://images.unsplash.com/photo-1621460244017-949179d6757b?auto=format&fit=crop&q=80&w=800", tag: "Popular", steps: [] },
  { id: "sugarcane", name: "Sugarcane", category: "Cash Crops", image: "https://images.unsplash.com/photo-1594911776722-6e8dd1224d06?auto=format&fit=crop&q=80&w=800", steps: [] },
  { id: "mango", name: "Mango", category: "Fruits", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800", steps: [] },
  { id: "banana", name: "Banana", category: "Fruits", image: "https://images.unsplash.com/photo-1571771894821-ad99026.png?auto=format&fit=crop&q=80&w=800", steps: [] },
  { id: "grapes", name: "Grapes", category: "Fruits", image: "https://images.unsplash.com/photo-1537640538966-79f369b4018c?auto=format&fit=crop&q=80&w=800", steps: [] },
  { id: "saffron", name: "Saffron", category: "Special Crops", image: "https://images.unsplash.com/photo-1615485290382-440344d93025?auto=format&fit=crop&q=80&w=800", tag: "Popular", steps: [] },
  { id: "flowers", name: "Flowers (Rose/Marigold)", category: "Special Crops", image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&q=80&w=800", steps: [] },
];

const CROP_CATEGORIES = ["All", "Food Crops", "Vegetables", "Fruits", "Cash Crops", "Special Crops"] as const;

// 2. Success Protocols Data
interface ProtocolGuide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  benefits: string[];
  usageTip: string;
  steps: { title: string; desc: string }[];
}

const SUCCESS_PROTOCOLS_DATA: ProtocolGuide[] = [
  {
    id: "drip",
    title: "Drip Irrigation",
    subtitle: "Precision water management system",
    image: "https://images.unsplash.com/photo-1592982537447-6f23f669e4ce?auto=format&fit=crop&q=80&w=600",
    benefits: ["Saves 40-70% water", "Reduces weed growth", "Improves crop quality"],
    usageTip: "Best for orchard crops and wide-spaced vegetables.",
    steps: [
      { title: "Installation", desc: "Set up the main pump, filters, and lateral lines across the field." },
      { title: "Usage", desc: "Operate during early morning or late evening for minimal evaporation." },
      { title: "Monitoring", desc: "Check drippers regularly for clogging or pressure drops." },
      { title: "Maintenance", desc: "Flush lines weekly with acid treatment to remove mineral scale." }
    ]
  },
  {
    id: "rotation",
    title: "Crop Rotation",
    subtitle: "Soil health & pest management",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=600",
    benefits: ["Breaks pest cycles", "Improves soil structure", "Balances nutrient levels"],
    usageTip: "Always alternate heavy feeders with nitrogen fixers.",
    steps: [
      { title: "Planning", desc: "Map your fields and historical crop sequences for the last 3 years." },
      { title: "Strategy", desc: "Plant legumes after cereals to restore nitrogen naturally." },
      { title: "Execution", desc: "Ensure diverse root depths are used in subsequent rotations." },
      { title: "Analysis", desc: "Monitor yield trends and soil health indicators after each cycle." }
    ]
  },
  {
    id: "compost",
    title: "Organic Compost",
    subtitle: "Sustainable soil enrichment",
    image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=600",
    benefits: ["Enhances microbial life", "Improves water retention", "Low cost solution"],
    usageTip: "Use fully decomposed matter to avoid fungal issues.",
    steps: [
      { title: "Collection", desc: "Gather green waste (nitrogen) and brown waste (carbon) in 1:2 ratio." },
      { title: "Processing", desc: "Turn the pile weekly to ensure proper aeration and heating." },
      { title: "Curing", desc: "Let the compost sit for 4-6 weeks until it smells earthy and is dark." },
      { title: "Application", desc: "Apply 5-10 tons per hectare during land preparation phase." }
    ]
  },
  {
    id: "monitoring",
    title: "Regular Monitoring",
    subtitle: "Proactive field scouting SOP",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600",
    benefits: ["Early disease detection", "Optimized pest control", "Precise harvest timing"],
    usageTip: "Maintain a digital or paper log of every field visit.",
    steps: [
      { title: "Schedule", desc: "Visit fields early morning twice a week during critical stages." },
      { title: "Path", desc: "Walk in a 'Z' or 'X' pattern to cover representative areas fairly." },
      { title: "Tools", desc: "Use a hand lens to inspect undersides of leaves for tiny pests." },
      { title: "Action", desc: "Photograph anomalies and consult experts if issues cross thresholds." }
    ]
  }
];

// 3. Industry Trends Data
interface IndustryTrend {
  id: string;
  title: string;
  summary: string;
  description: string;
  benefits: string[];
  usage: string;
}

const INDUSTRY_TRENDS_DATA: IndustryTrend[] = [
  {
    id: "precision",
    title: "Precision Smart Farming",
    summary: "High-tech sensors & IoT",
    description: "Using IoT sensors for real-time monitoring of soil moisture, temperature, and nutrient levels directly from your smartphone.",
    benefits: ["Optimized inputs", "Reduced waste", "Higher precision"],
    usage: "Install sensors 30cm deep across different field zones for best data mapping."
  },
  {
    id: "drones",
    title: "Agri-Drone Delivery",
    summary: "Automated aerial spraying",
    description: "UAVs equipped with multi-spectral cameras to detect crop stress and spray pesticides only where needed.",
    benefits: ["80% faster spraying", "Better coverage", "Zero soil compaction"],
    usage: "Schedule flights early morning on low-wind days for maximum spray efficiency."
  },
  {
    id: "climate",
    title: "Climate-Resilient Seeds",
    summary: "Drought & heat tolerant",
    description: "New hybrid varieties designed to maintain high yields even under extreme heat or restricted water conditions.",
    benefits: ["Stable productivity", "Heat resistance", "Risk mitigation"],
    usage: "Purchase only from certified labs and test a small patch before full-scale use."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// --- Main Component ---

export default function AgriKnowledgeHub() {
  
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

  // States: Visual Crop Guides
  const [cropSearch, setCropSearch] = useState("");
  const [activeCropCategory, setActiveCropCategory] = useState<typeof CROP_CATEGORIES[number]>("All");
  const [selectedCropGuide, setSelectedCropGuide] = useState<CropGuide | null>(null);
  const [isGridLoading, setIsGridLoading] = useState(false);

  useEffect(() => {
    setIsGridLoading(true);
    const timer = setTimeout(() => setIsGridLoading(false), 400);
    return () => clearTimeout(timer);
  }, [cropSearch, activeCropCategory]);

  const filteredCrops = useMemo(() => {
    return CROP_GUIDES_DATA.filter(crop => {
      const matchesSearch = crop.name.toLowerCase().includes(cropSearch.toLowerCase());
      const matchesCategory = activeCropCategory === "All" || crop.category === activeCropCategory;
      return matchesSearch && matchesCategory;
    });
  }, [cropSearch, activeCropCategory]);

  // States: Protocol Modal
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolGuide | null>(null);

  // States: Industry Trends
  const [activeTrendId, setActiveTrendId] = useState<string | null>(null);

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
    <div className="min-h-screen bg-slate-50/50 py-16 scroll-smooth overflow-x-hidden">
      
      {/* 🚀 Main Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block px-4 py-1.5 bg-white text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6 shadow-sm border border-emerald-100/50">
            Professional Farmer Tools
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
            Agri Knowledge Hub
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Production-grade intelligence and precision tools designed to help growers scale efficiency and sustainable profitability.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-32 mb-32">
        
        {/* --- SECTION 1: AI Crop Planning & SECTION 2: P&L Calculator (Dual Grid) --- */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 🎯 1. AI Crop Planning */}
          <div className="space-y-6">
            <SectionHeader icon={Leaf} title="AI Crop Planning" subtitle="Data-driven seasonal crop selection powered by agronomy models" />
            <FeatureCard className="p-8">
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Soil Condition</label>
                    <select className="w-full rounded-2xl border border-slate-200 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 py-3.5 px-5 bg-white outline-none transition-all font-bold text-slate-700" value={cropSoil} onChange={e => setCropSoil(e.target.value)}>
                      <option value="">Select Soil Type</option>
                      <option value="Black">Medium-Deep Black Soil</option>
                      <option value="Red">Laterite Red Soil</option>
                      <option value="Sandy">Alluvial Sandy Soil</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Current Season</label>
                    <select className="w-full rounded-2xl border border-slate-200 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 py-3.5 px-5 bg-white outline-none transition-all font-bold text-slate-700" value={cropSeason} onChange={e => setCropSeason(e.target.value)}>
                      <option value="">Select Season</option>
                      <option value="Kharif">Kharif (Monsoon)</option>
                      <option value="Rabi">Rabi (Winter)</option>
                      <option value="Summer">Summer (Zaid)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Water Access</label>
                    <select className="w-full rounded-2xl border border-slate-200 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 py-3.5 px-5 bg-white outline-none transition-all font-bold text-slate-700" value={cropWater} onChange={e => setCropWater(e.target.value)}>
                      <option value="">Water Availability</option>
                      <option value="Low">Low (Rain-fed)</option>
                      <option value="Medium">Moderate (Canal/Well)</option>
                      <option value="High">High (Unlimited)</option>
                    </select>
                  </div>
                </div>
                <Button onClick={getCropSuggestion} disabled={isPlanning || !cropSoil || !cropSeason || !cropWater} className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center">
                  {isPlanning ? <Loader2 className="w-6 h-6 animate-spin" /> : "Generate Intelligence Report"}
                </Button>

                <AnimatePresence mode="wait">
                  {cropSuggestion && !isPlanning && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-emerald-50 border border-emerald-100 p-6 rounded-[28px] relative overflow-hidden ring-1 ring-emerald-500/10 shadow-inner">
                       <div className="relative z-10 flex gap-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm ring-1 ring-emerald-100 flex-shrink-0">
                            {cropSuggestion.crop.includes("Cotton") ? "🌱" : cropSuggestion.crop.includes("Groundnut") ? "🥜" : cropSuggestion.crop.includes("Watermelon") ? "🍉" : "🌾"}
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Recommended Cultivation</p>
                            <h4 className="text-2xl font-black text-slate-900 mb-3">{cropSuggestion.crop}</h4>
                            <p className="text-sm text-emerald-900/70 font-medium leading-relaxed bg-white/50 p-4 rounded-xl border border-emerald-100">
                              {cropSuggestion.tip}
                            </p>
                          </div>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FeatureCard>
          </div>

          {/* 💰 2. Profit & Loss Calculator */}
          <div className="space-y-6">
            <SectionHeader icon={Calculator} title="P&L Performance" subtitle="Real-time financial analysis tool for precision farming ROI" />
            <FeatureCard className="p-8">
              <div className="space-y-5">
                 <div className="space-y-4">
                    <div className="relative group/input">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm transition-colors group-focus-within/input:text-emerald-500">₹</span>
                       <input type="number" placeholder="Fixed Capital Investment" className="w-full rounded-2xl border border-slate-200 py-3.5 pl-9 pr-6 text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500" value={investment} onChange={e => setInvestment(e.target.value)} />
                    </div>
                    <div className="relative group/input">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm transition-colors group-focus-within/input:text-emerald-500">₹</span>
                       <input type="number" placeholder="Direct Operating Expenses" className="w-full rounded-2xl border border-slate-200 py-3.5 pl-9 pr-6 text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500" value={expenses} onChange={e => setExpenses(e.target.value)} />
                    </div>
                    <div className="relative group/input">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm transition-colors group-focus-within/input:text-emerald-500">₹</span>
                       <input type="number" placeholder="Gross Projected Revenue" className="w-full rounded-2xl border border-slate-200 py-3.5 pl-9 pr-6 text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500" value={revenue} onChange={e => setRevenue(e.target.value)} />
                    </div>
                 </div>

                 <Button onClick={calculateProfit} disabled={!isCalcValid} className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-black text-lg rounded-2xl shadow-xl transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed">
                   Analyze Fiscal ROI
                 </Button>

                 <AnimatePresence mode="wait">
                   {calcError ? (
                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3">
                       <AlertCircle className="w-5 h-5 text-red-500" />
                       <p className="text-red-700 text-xs font-bold leading-tight">{calcError}</p>
                     </motion.div>
                   ) : profitResult !== null ? (
                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={cn(
                       "p-6 rounded-[32px] border ring-1 transition-all shadow-inner text-center",
                       profitResult >= 0 ? "bg-emerald-50 border-emerald-200 ring-emerald-500/10" : "bg-red-50 border-red-200 ring-red-500/10"
                     )}>
                        <p className={cn("text-[10px] font-black uppercase tracking-widest mb-1", profitResult >= 0 ? "text-emerald-600" : "text-red-600")}>
                          Net Operating Margin
                        </p>
                        <p className={cn("text-4xl font-black mb-3", profitResult >= 0 ? "text-emerald-900" : "text-red-900")}>
                          ₹ {Math.abs(profitResult).toLocaleString('en-IN')}
                        </p>
                        <span className={cn(
                          "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2",
                          profitResult >= 0 ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
                        )}>
                          {profitResult >= 0 ? <ShieldCheck className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          {profitResult >= 0 ? "Favorable Growth" : "Deficit Warning"}
                        </span>
                     </motion.div>
                   ) : null}
                 </AnimatePresence>
              </div>
            </FeatureCard>
          </div>
        </motion.div>

        {/* --- SECTION 3: Nutrient Optimization --- */}
        <div className="space-y-6">
          <SectionHeader icon={Beaker} title="Nutrient Optimization" subtitle="Precise fertilization roadmap tailored to your specific soil composition" />
          <FeatureCard className="p-8 max-w-2xl">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Primary Soil Classification</label>
                <select className="w-full rounded-2xl border border-slate-200 py-3.5 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all" value={fertSoil} onChange={e => setFertSoil(e.target.value)}>
                  <option value="">Identify Soil Character...</option>
                  <option value="Black">Medium-Deep Black Soil</option>
                  <option value="Red">Laterite Red Soil</option>
                  <option value="Sandy">Alluvial Sandy Soil</option>
                </select>
              </div>

              <AnimatePresence mode="wait">
                {fertSoil ? (
                  <motion.div key={fertSoil} initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
                        <p className="text-[10px] font-black text-emerald-600 uppercase mb-2">Suitable Companion</p>
                        <p className="text-xl font-black text-slate-900">{fertMap[fertSoil].crop}</p>
                     </div>
                     <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
                        <p className="text-[10px] font-black text-emerald-600 uppercase mb-2">Fertilizer Protocol</p>
                        <p className="text-xl font-black text-slate-900">{fertMap[fertSoil].fertilizer}</p>
                     </div>
                     <div className="col-span-full bg-slate-900 p-5 rounded-2xl shadow-xl">
                        <div className="flex items-center gap-3 mb-2 text-emerald-400">
                           <Lightbulb className="w-5 h-5" />
                           <p className="text-[10px] font-black uppercase tracking-widest">Management Strategy</p>
                        </div>
                        <p className="text-slate-300 font-medium text-sm leading-relaxed">{fertMap[fertSoil].tip}</p>
                     </div>
                  </motion.div>
                ) : (
                  <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-3xl">
                    <p className="text-sm font-bold text-slate-400">Enter soil data to generate nutrient roadmap</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </FeatureCard>
        </div>

        {/* --- SECTION 4: Visual Crop Guides --- */}
        <div className="space-y-8">
          <SectionHeader icon={BookOpen} title="Visual Crop Guides" subtitle="High-yield growing roadmaps with image-driven step-by-step learning" />
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative flex-1 group">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search cultivation library..." 
                 className="w-full rounded-2xl border border-slate-200 py-4 pl-14 pr-6 text-sm font-bold outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 bg-white transition-all shadow-sm"
                 value={cropSearch} onChange={e => setCropSearch(e.target.value)}
               />
            </div>
            <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto no-scrollbar gap-1">
               {CROP_CATEGORIES.map(cat => (
                 <button key={cat} onClick={() => setActiveCropCategory(cat)} className={cn("px-6 py-2.5 text-xs font-black rounded-xl transition-all whitespace-nowrap uppercase tracking-widest", activeCropCategory === cat ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100 rotate-1 scale-105" : "text-slate-500 hover:bg-slate-50")}>
                   {cat}
                 </button>
               ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {isGridLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <motion.div key={i} className="h-72 rounded-[32px] bg-white border border-slate-100 animate-pulse" />
                ))
              ) : (
                filteredCrops.map((crop, idx) => (
                  <motion.div key={crop.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.05 }} className="group" onClick={() => setSelectedCropGuide(crop)}>
                     <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 cursor-pointer flex flex-col h-full ring-1 ring-slate-100">
                        <div className="h-48 overflow-hidden relative">
                           <img src={crop.image} alt={crop.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                           {crop.tag && (
                             <span className={cn("absolute top-5 left-5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest z-10 shadow-sm flex items-center gap-1.5", crop.tag === "Popular" ? "bg-amber-400 text-amber-950" : "bg-emerald-600 text-white")}>
                               {crop.tag === "Popular" && <Star className="w-3 h-3 fill-amber-950" />} {crop.tag}
                             </span>
                           )}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                           <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.1em] mb-2">{crop.category}</span>
                           <h3 className="text-xl font-black text-slate-900 mb-6">{crop.name} Cultivation</h3>
                           <div className="mt-auto flex items-center justify-between text-emerald-600">
                              <span className="text-xs font-black uppercase tracking-widest">Guide Details</span>
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                           </div>
                        </div>
                     </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* --- SECTION 5: Success Protocols (Visual) --- */}
        <div className="space-y-8">
           <SectionHeader icon={ShieldCheck} title="Success Protocols" subtitle="Operational blueprints for maximum farm efficiency and risk mitigation" />
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {SUCCESS_PROTOCOLS_DATA.map((proto, idx) => (
                <motion.div key={proto.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="group" onClick={() => setSelectedProtocol(proto)}>
                  <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-2 hover:shadow-xl transition-all h-full cursor-pointer flex flex-col ring-1 ring-slate-100 group-hover:-translate-y-1">
                    <div className="h-40 rounded-[28px] overflow-hidden relative">
                      <img src={proto.image} alt={proto.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-slate-900/10" />
                      <div className="absolute top-4 left-4">
                        <div className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur shadow-sm flex items-center justify-center">
                          <Zap className="w-4 h-4 text-emerald-600" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col pt-6">
                      <h3 className="text-lg font-black text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{proto.title}</h3>
                      <p className="text-[11px] text-slate-500 font-bold mb-5 leading-tight">{proto.subtitle}</p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {proto.benefits.slice(0, 2).map((b, i) => (
                          <span key={i} className="text-[9px] font-bold bg-slate-50 text-slate-500 px-2 py-0.5 rounded-md border border-slate-100">{b}</span>
                        ))}
                      </div>
                      <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                        <span>Deploy Protocol</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* --- SECTION 6: Industry Trends (Interactive) --- */}
        <div className="space-y-8">
           <SectionHeader icon={TrendingUp} title="Industry Trends" subtitle="Global technological shifts reshaping the future of modern agriculture" />
           <div className="grid grid-cols-1 gap-6 max-w-4xl">
              {INDUSTRY_TRENDS_DATA.map((trend, idx) => {
                const isActive = activeTrendId === trend.id;
                return (
                  <motion.div key={trend.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                    <div 
                      className={cn(
                        "rounded-[28px] border transition-all cursor-pointer overflow-hidden ring-1 shadow-sm",
                        isActive ? "bg-slate-900 border-slate-800 ring-slate-800 shadow-2xl" : "bg-white border-slate-100 ring-slate-50 hover:border-emerald-200"
                      )}
                      onClick={() => setActiveTrendId(isActive ? null : trend.id)}
                    >
                      <div className="p-7 flex items-center justify-between">
                         <div className="flex items-center gap-5">
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center font-black transition-colors", isActive ? "bg-emerald-500 text-white" : "bg-emerald-50 text-emerald-600 ")}>
                               {idx + 1}
                            </div>
                            <div>
                               <h3 className={cn("text-xl font-black transition-colors", isActive ? "text-white" : "text-slate-900")}>{trend.title}</h3>
                               <p className={cn("text-xs font-bold transition-colors uppercase tracking-[0.1em]", isActive ? "text-emerald-400" : "text-slate-400")}>{trend.summary}</p>
                            </div>
                         </div>
                         <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-all", isActive ? "bg-white/10 text-white rotate-180" : "bg-slate-50 text-slate-400")}>
                            <ChevronRight className="w-6 h-6" />
                         </div>
                      </div>
                      
                      <AnimatePresence>
                        {isActive && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-800">
                             <div className="p-8 space-y-8">
                                <div className="space-y-4">
                                   <p className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em] mb-2 flex items-center gap-2">
                                     <Info className="w-3 h-3" /> Core Concept
                                   </p>
                                   <p className="text-slate-300 font-medium text-lg leading-relaxed max-w-2xl">{trend.description}</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                   <div className="space-y-4">
                                      <p className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em]">Efficiency Benefits</p>
                                      <div className="flex flex-wrap gap-2">
                                         {trend.benefits.map((b, i) => (
                                           <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-emerald-200 text-xs font-bold leading-none">{b}</span>
                                         ))}
                                      </div>
                                   </div>
                                   <div className="space-y-4">
                                      <p className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em]">Practical Implementation</p>
                                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                                         <p className="text-emerald-300 text-xs font-bold italic leading-relaxed">{trend.usage}</p>
                                      </div>
                                   </div>
                                </div>
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
           </div>
        </div>
      </div>

      {/* --- MODALS (Uses Reusable Component) --- */}

      {/* 1. Crop Guide Modal */}
      <AgriModal 
        isOpen={!!selectedCropGuide} 
        onClose={() => setSelectedCropGuide(null)}
        title={selectedCropGuide?.name ? `${selectedCropGuide.name} Cultivation roadmap` : ""}
        subtitle={selectedCropGuide ? `${selectedCropGuide.category} • High Yield Protocol` : ""}
        icon={BookOpen}
        maxWidth="max-w-5xl"
      >
        {selectedCropGuide && selectedCropGuide.steps.length > 0 ? (
          <div className="space-y-20 py-8">
            {selectedCropGuide.steps.map((step, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div className="space-y-5 order-2 md:order-1">
                    <div className="flex items-center gap-4">
                       <span className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black shadow-lg">{i + 1}</span>
                       <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{step.title}</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-lg leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm">{step.description}</p>
                 </div>
                 <div className="aspect-video rounded-[40px] overflow-hidden shadow-2xl ring-12 ring-slate-50 group order-1 md:order-2">
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 </div>
              </div>
            ))}
            <div className="pt-20 border-t border-slate-100 text-center">
               <Button onClick={() => setSelectedCropGuide(null)} className="h-14 px-12 bg-emerald-600 text-white font-black text-lg rounded-2xl hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all active:scale-95">
                 Activate roadmap
               </Button>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center">
             <div className="w-24 h-24 bg-emerald-50 rounded-[40px] flex items-center justify-center mb-6 shadow-inner ring-1 ring-emerald-100">
               <Clock className="w-10 h-10 text-emerald-600" />
             </div>
             <h3 className="text-3xl font-black text-slate-900 mb-2 mt-4">Module Preparation In Progress</h3>
             <p className="text-slate-500 max-w-sm mx-auto font-medium text-lg leading-snug">Our agronomy team is finalizing the image-based steps for {selectedCropGuide?.name}.</p>
             <Button onClick={() => setSelectedCropGuide(null)} className="mt-12 h-14 px-10 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all">Explore Available Modules</Button>
          </div>
        )}
      </AgriModal>

      {/* 2. Protocol Guide Modal */}
      <AgriModal
        isOpen={!!selectedProtocol}
        onClose={() => setSelectedProtocol(null)}
        title={selectedProtocol?.title ? `${selectedProtocol.title} SOP` : ""}
        subtitle={selectedProtocol?.subtitle}
        icon={ShieldCheck}
      >
        {selectedProtocol && (
          <div className="space-y-12">
            <div className="rounded-[40px] overflow-hidden aspect-[21/9] shadow-2xl ring-1 ring-slate-200">
               <img src={selectedProtocol.image} alt={selectedProtocol.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               {selectedProtocol.benefits.map((b, i) => (
                 <div key={i} className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex flex-col items-center text-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800">{b}</span>
                 </div>
               ))}
               <div className="md:col-span-1 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex flex-col items-center text-center">
                  <Star className="w-5 h-5 text-amber-600 mb-2 fill-amber-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">Critical Insight</span>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-6">
                  <h4 className="text-xl font-black text-slate-900 border-b-2 border-emerald-500 w-fit pb-1">Execution Roadmap</h4>
                  <div className="space-y-6">
                    {selectedProtocol.steps.map((step, i) => (
                      <div key={i} className="flex gap-5 group">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center font-black flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 transition-all shadow-sm">
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-base font-bold text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{step.title}</p>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
               <div className="space-y-6">
                  <h4 className="text-xl font-black text-slate-900 border-b-2 border-amber-500 w-fit pb-1">Practical Usage Tip</h4>
                  <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 shadow-inner">
                     <p className="text-slate-600 text-lg font-medium leading-relaxed italic">
                       &quot;{selectedProtocol.usageTip}&quot;
                     </p>
                  </div>
                  <div className="p-8 rounded-[40px] bg-slate-900 text-emerald-400 flex items-start gap-4 shadow-2xl">
                     <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                     <p className="text-sm font-bold leading-relaxed">
                       Compliance with these steps ensures minimum risk during high-stress climate conditions. Use this SOP as your primary field reference.
                     </p>
                  </div>
               </div>
            </div>
          </div>
        )}
      </AgriModal>
    </div>
  );
}
