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

  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolGuide | null>(null);
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
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block px-4 py-1.5 bg-white text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6 shadow-sm border border-emerald-100/50">
            Educational Resources
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 🎯 1. AI Crop Planning */}
          <div className="space-y-6">
            <SectionHeader 
              icon={Leaf} 
              title="AI Crop Planning" 
              subtitle="Data-driven seasonal crop selection powered by agronomy models" 
            />
            <FeatureCard className="p-8">
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Select Soil Type</label>
                    <select className="w-full rounded-2xl border border-slate-200 text-sm py-3.5 px-5 bg-white outline-none transition-all font-bold text-slate-700" value={cropSoil} onChange={e => setCropSoil(e.target.value)}>
                      <option value="">Select Soil Type...</option>
                      <option value="Black">Medium-Deep Black Soil</option>
                      <option value="Red">Laterite Red Soil</option>
                      <option value="Sandy">Alluvial Sandy Soil</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Select Season</label>
                    <select className="w-full rounded-2xl border border-slate-200 text-sm py-3.5 px-5 bg-white outline-none transition-all font-bold text-slate-700" value={cropSeason} onChange={e => setCropSeason(e.target.value)}>
                      <option value="">Select Season...</option>
                      <option value="Kharif">Kharif (Monsoon)</option>
                      <option value="Rabi">Rabi (Winter)</option>
                      <option value="Summer">Summer (Zaid)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Water Availability</label>
                    <select className="w-full rounded-2xl border border-slate-200 text-sm py-3.5 px-5 bg-white outline-none transition-all font-bold text-slate-700" value={cropWater} onChange={e => setCropWater(e.target.value)}>
                      <option value="">Water Availability...</option>
                      <option value="Low">Low (Rain-fed)</option>
                      <option value="Medium">Moderate (Canal/Well)</option>
                      <option value="High">High (Unlimited)</option>
                    </select>
                  </div>
                </div>
                <Button onClick={getCropSuggestion} disabled={isPlanning || !cropSoil || !cropSeason || !cropWater} className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-lg transition-all active:scale-[0.98]">
                  {isPlanning ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Generate Intelligence Report"}
                </Button>
                {cropSuggestion && !isPlanning && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-50 border border-emerald-100 p-6 rounded-[28px] mt-4">
                     <h4 className="text-2xl font-black text-slate-900 mb-3">{cropSuggestion.crop}</h4>
                     <p className="text-sm text-emerald-900/70 font-medium leading-relaxed bg-white/50 p-4 rounded-xl border border-emerald-100">{cropSuggestion.tip}</p>
                  </motion.div>
                )}
              </div>
            </FeatureCard>
          </div>

          {/* 💰 2. Profit & Loss Calculator */}
          <div className="space-y-6">
            <SectionHeader 
              icon={Calculator} 
              title="P&L Performance" 
              subtitle="Real-time financial analysis tool for precision farming ROI" 
            />
            <FeatureCard className="p-8">
              <div className="space-y-5">
                <div className="space-y-4">
                  <input type="number" placeholder="Fixed Capital Investment" className="w-full rounded-2xl border border-slate-200 py-3.5 px-6 text-sm font-bold outline-none" value={investment} onChange={e => setInvestment(e.target.value)} />
                  <input type="number" placeholder="Direct Operating Expenses" className="w-full rounded-2xl border border-slate-200 py-3.5 px-6 text-sm font-bold outline-none" value={expenses} onChange={e => setExpenses(e.target.value)} />
                  <input type="number" placeholder="Gross Projected Revenue" className="w-full rounded-2xl border border-slate-200 py-3.5 px-6 text-sm font-bold outline-none" value={revenue} onChange={e => setRevenue(e.target.value)} />
                </div>
                <Button onClick={calculateProfit} disabled={!isCalcValid} className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-black text-lg rounded-2xl">Analyze Fiscal ROI</Button>
                {profitResult !== null && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={cn("p-6 rounded-[32px] border text-center mt-4", profitResult >= 0 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200")}>
                    <p className={cn("text-4xl font-black", profitResult >= 0 ? "text-emerald-900" : "text-red-900")}>₹ {Math.abs(profitResult).toLocaleString('en-IN')}</p>
                    <span className="text-[10px] font-black uppercase tracking-widest mt-2 block">{profitResult >= 0 ? "Favorable Growth" : "Deficit Warning"}</span>
                  </motion.div>
                )}
              </div>
            </FeatureCard>
          </div>
        </div>

        {/* 🧪 3. Nutrient Optimization */}
        <div className="space-y-6">
          <SectionHeader 
            icon={Beaker} 
            title="Nutrient Optimization" 
            subtitle="Precise fertilization roadmap tailored to your specific soil composition" 
          />
          <FeatureCard className="p-8 max-w-2xl">
            <select className="w-full rounded-2xl border border-slate-200 py-3.5 px-6 text-sm font-bold outline-none" value={fertSoil} onChange={e => setFertSoil(e.target.value)}>
              <option value="">Select Soil Type...</option>
              <option value="Black">Medium-Deep Black Soil</option>
              <option value="Red">Laterite Red Soil</option>
              <option value="Sandy">Alluvial Sandy Soil</option>
            </select>
            {fertSoil && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white border p-5 rounded-2xl shadow-sm"><p className="text-[10px] font-black text-emerald-600 uppercase mb-2">Suitable Crop</p><p className="text-xl font-black text-slate-900">{fertMap[fertSoil].crop}</p></div>
                <div className="bg-white border p-5 rounded-2xl shadow-sm"><p className="text-[10px] font-black text-emerald-600 uppercase mb-2">Fertilizer</p><p className="text-xl font-black text-slate-900">{fertMap[fertSoil].fertilizer}</p></div>
                <div className="col-span-full bg-slate-900 p-5 rounded-2xl text-slate-300 text-sm font-medium">{fertMap[fertSoil].tip}</div>
              </motion.div>
            )}
          </FeatureCard>
        </div>

        {/* 🌾 4. Visual Crop Guides */}
        <div className="space-y-8">
          <SectionHeader 
            icon={BookOpen} 
            title="Visual Crop Guides" 
            subtitle="High-yield growing roadmaps with image-driven step-by-step learning" 
          />
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative flex-1 group">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
               <input type="text" placeholder="Search cultivation library..." className="w-full rounded-2xl border border-slate-200 py-4 pl-14 pr-6 text-sm font-bold outline-none bg-white shadow-sm" value={cropSearch} onChange={e => setCropSearch(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCrops.map((crop, idx) => (
              <motion.div key={crop.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="group" onClick={() => setSelectedCropGuide(crop)}>
                <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-2xl cursor-pointer flex flex-col h-full ring-1 ring-slate-100 p-4">
                  <img src={crop.image} alt={crop.name} loading="lazy" className="h-40 w-full object-cover rounded-2xl group-hover:scale-105 transition-transform" />
                  <h3 className="text-xl font-black text-slate-900 mt-4 mb-2">{crop.name}</h3>
                  <div className="mt-auto flex items-center justify-between text-emerald-600 text-[10px] font-black uppercase tracking-widest pt-4 border-t border-slate-50">
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 🌿 5. Success Protocols */}
        <div className="space-y-8">
          <SectionHeader 
            icon={ShieldCheck} 
            title="Success Protocols" 
            subtitle="Operational blueprints for maximum farm efficiency and risk mitigation" 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SUCCESS_PROTOCOLS_DATA.map((proto, idx) => (
              <motion.div key={proto.id} onClick={() => setSelectedProtocol(proto)} className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-4 hover:shadow-xl transition-all cursor-pointer ring-1 ring-slate-100">
                <img src={proto.image} alt={proto.title} loading="lazy" className="h-32 w-full object-cover rounded-2xl" />
                <h3 className="text-lg font-black text-slate-900 mt-4">{proto.title}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{proto.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      <AgriModal 
        isOpen={!!selectedCropGuide} 
        onClose={() => setSelectedCropGuide(null)} 
        title={selectedCropGuide ? `${selectedCropGuide.name} Activate Roadmap` : ""} 
        icon={BookOpen}
      >
         {selectedCropGuide && selectedCropGuide.steps.length > 0 ? (
           <div className="space-y-12 py-4">
             {selectedCropGuide.steps.map((step, i) => (
               <div key={i} className="flex gap-6 items-start">
                 <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black flex-shrink-0">{i+1}</span>
                 <div><h4 className="text-lg font-black text-slate-900 mb-2">{step.title}</h4><p className="text-slate-500 font-medium">{step.description}</p></div>
               </div>
             ))}
           </div>
         ) : (
           <div className="py-20 text-center flex flex-col items-center">
             <h3 className="text-2xl font-black text-slate-900 mb-2">Module Preparation In Progress</h3>
             <p className="text-slate-500 font-medium">Our agronomy team is finalizing the image-based steps.</p>
             <Button onClick={() => setSelectedCropGuide(null)} className="mt-8 bg-slate-900 text-white font-black rounded-2xl px-8 h-12">Back to Crops</Button>
           </div>
         )}
      </AgriModal>

      <AgriModal isOpen={!!selectedProtocol} onClose={() => setSelectedProtocol(null)} title={selectedProtocol?.title || ""} icon={ShieldCheck}>
        {selectedProtocol && (
          <div className="space-y-8">
            <p className="text-slate-600 font-medium italic">"{selectedProtocol.usageTip}"</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {selectedProtocol.steps.map((step, i) => (
                <div key={i} className="flex gap-4"><span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black flex-shrink-0 text-[10px]">{i+1}</span><div><p className="font-bold text-slate-900 uppercase tracking-tight">{step.title}</p><p className="text-xs text-slate-500 font-medium">{step.desc}</p></div></div>
              ))}
            </div>
          </div>
        )}
      </AgriModal>
    </div>
  );
}
