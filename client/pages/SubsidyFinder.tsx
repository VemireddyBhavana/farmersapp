import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  XCircle, 
  Sprout, 
  ChevronDown, 
  ArrowRight, 
  Zap, 
  Search,
  MapPin,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ShieldCheck = ({ className }: { className?: string }) => <FileText className={className} />;
const Landmark = ({ className, size }: { className?: string, size?: number }) => <CheckCircle2 className={className} size={size} />;

// --- SIMPLE FARMER DATA ---
const SCHEMES = [
  {
    name: "PM-KISAN Cash Support",
    benefit: "₹6,000 / Year",
    rule: (f: any) => f.land <= 5,
    reason: "Land size must be below 5 acres for this aid.",
    icon: <Zap className="text-amber-500" />
  },
  {
    name: "KCC Agriculture Loan",
    benefit: "₹3 Lakh @ 4% Interest",
    rule: (f: any) => f.land <= 12,
    reason: "Your land holding is too large for this credit line.",
    icon: <Sprout className="text-emerald-500" />
  },
  {
    name: "Solar Pump Subsidy",
    benefit: "75% Off Solar Pump",
    rule: (f: any) => f.irrigation !== "Rain-fed",
    reason: "Only for farmers with existing water sources.",
    icon: <Zap className="text-sky-500" />
  },
  {
    name: "Crop Insurance (PMFBY)",
    benefit: "100% Risk Cover",
    rule: (f: any) => f.land >= 1,
    reason: "Minimal land holding required: 1 Acre.",
    icon: <ShieldCheck className="text-blue-500" />
  }
];


const SubsidyFinder = () => {
  const [land, setLand] = useState(2);
  const [crop, setCrop] = useState("Rice");
  const [irrigation, setIrrigation] = useState("Borewell");
  const [results, setResults] = useState<any[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const checkEligibility = () => {
    setIsChecking(true);
    
    setTimeout(() => {
      const farmer = { land, crop, irrigation };
      const evaluated = SCHEMES.map(s => ({
        ...s,
        eligible: s.rule(farmer)
      }));
      
      setResults(evaluated);
      setIsChecking(false);
      
      // Auto-scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-green-50 font-sans p-4 md:p-10 pb-32">
      
      {/* --- TITLE SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center py-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-black text-xs uppercase tracking-widest mb-4">
          <Sprout size={16} />
          Government Support Portal
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-none">
          🌾 Check Your <br /> 
          <span className="text-emerald-600">Government Benefits</span>
        </h1>
        <p className="mt-4 text-slate-500 font-bold text-lg">Simple. Fast. For every Farmer.</p>
      </motion.div>

      {/* --- INPUT CARD --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 mb-12 border-b-8 border-emerald-100"
      >
        <div className="space-y-10">
          
          {/* LAND SLIDER */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
               <label className="text-sm font-black uppercase text-slate-400 tracking-widest">How much land do you have?</label>
               <span className="text-4xl font-black text-emerald-600 italic">{land} <span className="text-sm">Acres</span></span>
            </div>
            <input 
              type="range"
              min="0.5"
              max="15"
              step="0.5"
              value={land}
              onChange={(e) => setLand(parseFloat(e.target.value))}
              className="w-full h-4 bg-emerald-50 rounded-full appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-xs font-bold text-slate-300">
               <span>Small Area</span>
               <span>Large Farm</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* CROP SELECT */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Main Crop</label>
              <div className="relative">
                <select 
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full bg-slate-50 border-0 rounded-2xl p-5 text-base font-bold text-slate-700 focus:ring-4 focus:ring-emerald-100 transition-all appearance-none outline-none"
                >
                  <option>Rice</option>
                  <option>Wheat</option>
                  <option>Cotton</option>
                  <option>Pulse</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
              </div>
            </div>

            {/* IRRIGATION SELECT */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Irrigation Type</label>
              <div className="relative">
                <select 
                  value={irrigation}
                  onChange={(e) => setIrrigation(e.target.value)}
                  className="w-full bg-slate-50 border-0 rounded-2xl p-5 text-base font-bold text-slate-700 focus:ring-4 focus:ring-emerald-100 transition-all appearance-none outline-none"
                >
                  <option>Borewell</option>
                  <option>Canal</option>
                  <option>Rain-fed</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
              </div>
            </div>
          </div>

          <Button 
            onClick={checkEligibility}
            disabled={isChecking}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full py-8 text-xl font-black shadow-2xl shadow-emerald-200 transition-all active:scale-95 space-x-3"
          >
            {isChecking ? (
              <span className="animate-pulse">Checking Government Data...</span>
            ) : (
              <>
                <Search />
                <span>Check Your Benefits</span>
              </>
            )}
          </Button>

        </div>
      </motion.div>

      {/* --- RESULTS DASHBOARD --- */}
      <div ref={resultsRef} className="max-w-3xl mx-auto space-y-6 pt-10">
        <AnimatePresence mode="popLayout">
          {results.length > 0 && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="mb-8 text-center"
            >
               <h2 className="text-2xl font-black text-slate-700">Scheme Search Results</h2>
               <p className="text-slate-400 text-sm font-bold mt-1">Based on {land} Acres and {crop} Farming</p>
            </motion.div>
          )}

          {results.map((res: any, i: number) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={res.name}
              className={`rounded-[2rem] p-8 border-4 transition-all shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 ${
                res.eligible 
                ? "bg-white border-emerald-200 shadow-emerald-100" 
                : "bg-slate-100 border-slate-200 opacity-60"
              }`}
            >
              <div className="flex items-center gap-6">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl shadow-lg ${res.eligible ? "bg-emerald-100" : "bg-slate-200"}`}>
                  {res.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 uppercase leading-none tracking-tight">{res.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                     <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${res.eligible ? "bg-emerald-600 text-white" : "bg-slate-400 text-white"}`}>
                        {res.eligible ? "✅ Verified" : "❌ Ineligible"}
                     </div>
                     <span className="text-sm font-black text-emerald-600 italic">{res.benefit}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end gap-3">
                {res.eligible ? (
                  <Button className="rounded-full px-10 py-6 bg-slate-900 border-none text-white font-black hover:bg-black group">
                    Apply Now <ArrowRight className="ml-2 group-hover:translate-x-1 transition-all" size={18} />
                  </Button>
                ) : (
                  <p className="max-w-[200px] text-center md:text-right text-[10px] font-bold text-slate-400 italic">
                    Reason: {res.reason}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {results.length === 0 && !isChecking && (
          <div className="text-center opacity-20 py-20 pointer-events-none">
             <Landmark size={120} className="mx-auto" />
             <p className="text-sm font-black uppercase mt-4 tracking-tighter">Enter Details to Search Registry</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default SubsidyFinder;
