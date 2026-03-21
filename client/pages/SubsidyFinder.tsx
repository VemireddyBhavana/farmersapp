import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  MapPin, 
  Landmark, 
  History,
  Info,
  ArrowRight,
  ShieldCheck,
  Sprout,
  Users
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

const SubsidyFinder = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any>(null);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const findSubsidies = () => {
    setIsSearching(true);
    setTimeout(() => {
      setResults([
        {
          title: "PM-Kisan Samman Nidhi",
          match: 100,
          benefit: "ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹6,000 / Year",
          category: "Income Support",
          deadline: "Ongoing"
        },
        {
          title: "Micro-Irrigation Fund",
          match: 85,
          benefit: "45% Subsidy on Drip",
          category: "Irrigation",
          deadline: "Oct 20, 2026"
        },
        {
          title: "National Bamboo Mission",
          match: 60,
          benefit: "50% Planting Subsidy",
          category: "Horticulture",
          deadline: "Dec 15, 2026"
        }
      ]);
      setIsSearching(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16 pt-10">
          <h1 className="text-4xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic leading-[0.9] mb-6">
            {t('subsidyFinderTitle')}
          </h1>
          <p className="text-xl text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
            {t('subsidyFinderDesc')}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-4 mb-12">
           {[1, 2, 3].map((s) => (
             <div key={s} className="flex items-center gap-2">
               <div className={cn(
                 "h-10 w-10 rounded-xl flex items-center justify-center font-black transition-all",
                 step === s ? "bg-emerald-600 text-white shadow-xl scale-110" : 
                 step > s ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"
               )}>
                 {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
               </div>
               {s < 3 && <div className={cn("w-12 h-1 rounded-full", step > s ? "bg-emerald-600" : "bg-slate-200")} />}
             </div>
           ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="p-10 rounded-[3rem] border-none shadow-2xl bg-white dark:bg-slate-900 space-y-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Farmer Profile</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Select State</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl p-4 text-sm font-bold italic appearance-none outline-none">
                      <option>Maharashtra</option>
                      <option>Andhra Pradesh</option>
                      <option>Punjab</option>
                      <option>Karnataka</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Land Size (Acres)</label>
                    <input type="number" placeholder="e.g. 5" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl p-4 text-sm font-bold italic outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Farmer Category</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl p-4 text-sm font-bold italic appearance-none outline-none">
                      <option>Small & Marginal</option>
                      <option>Regular</option>
                      <option>Tenant Farmer</option>
                    </select>
                  </div>
                </div>

                <div className="pt-8 flex justify-end">
                   <Button onClick={nextStep} className="bg-slate-900 hover:bg-emerald-600 text-white font-black px-10 h-16 rounded-2xl italic group">
                     Next Stage <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                   </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="p-10 rounded-[3rem] border-none shadow-2xl bg-white dark:bg-slate-900 space-y-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
                    <Sprout className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Crop & Asset Details</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Major Crops</label>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {["Rice", "Wheat", "Cotton", "Mango"].map(crop => (
                        <button key={crop} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-emerald-500 hover:text-white transition-all">
                          {crop}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Existing Assets</label>
                     <div className="flex gap-4 pt-2">
                       <div className="flex items-center gap-2">
                         <input type="checkbox" id="tractor" className="h-4 w-4 rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                         <label htmlFor="tractor" className="text-xs font-bold uppercase tracking-tight text-slate-600 italic">Tractor</label>
                       </div>
                       <div className="flex items-center gap-2">
                         <input type="checkbox" id="drip" className="h-4 w-4 rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                         <label htmlFor="drip" className="text-xs font-bold uppercase tracking-tight text-slate-600 italic">Drip System</label>
                       </div>
                     </div>
                  </div>
                </div>

                <div className="pt-8 flex justify-between">
                   <Button variant="ghost" onClick={prevStep} className="font-black text-slate-400 hover:text-slate-900 italic">
                     <ChevronLeft className="mr-2 h-5 w-5" /> Go Back
                   </Button>
                   <Button 
                    onClick={findSubsidies} 
                    disabled={isSearching}
                    className="bg-slate-900 hover:bg-emerald-600 text-white font-black px-10 h-16 rounded-2xl italic shadow-2xl transition-all"
                   >
                     {isSearching ? "Searching Databases..." : "Find Eligible Schemes"}
                   </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 3 && results && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-8 rounded-[2.5rem] bg-emerald-600 text-white text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1 italic">Best Match</p>
                  <h4 className="text-3xl font-black italic uppercase tracking-tighter tabular-nums">100%</h4>
                </Card>
                <Card className="p-8 rounded-[2.5rem] bg-white border-none shadow-xl text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 italic">Schemes Found</p>
                  <h4 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 tabular-nums">{results.length}</h4>
                </Card>
                <Card className="p-8 rounded-[2.5rem] bg-white border-none shadow-xl text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 italic">Est. Benefits</p>
                  <h4 className="text-3xl font-black italic uppercase tracking-tighter text-emerald-600 tabular-nums">ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹15k+</h4>
                </Card>
              </div>

              <div className="space-y-6">
                {results.map((res: any, i: number) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i}
                  >
                    <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-white dark:bg-slate-900 group hover:translate-x-2 transition-transform">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex gap-6 items-center">
                          <div className="h-16 w-16 rounded-[1.5rem] bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center text-xl font-black italic">
                            {res.match}%
                          </div>
                          <div>
                            <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none mb-1 group-hover:text-emerald-600 transition-colors">
                              {res.title}
                            </h4>
                            <div className="flex gap-3">
                               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">{res.category}</span>
                               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 italic">Deadline: {res.deadline}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                           <div className="text-right">
                             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Potential Benefit</p>
                             <p className="text-xl font-black text-slate-900 dark:text-white italic tracking-tighter">{res.benefit}</p>
                           </div>
                           <Button className="h-14 px-8 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-black italic uppercase tracking-widest text-xs">
                              Apply Now
                           </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="text-center pt-8">
                <Button variant="ghost" onClick={() => setStep(1)} className="font-black text-slate-400 hover:text-emerald-600 uppercase tracking-widest text-xs italic">
                  Run New Search
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Stats Footer */}
        <div className="mt-24 grid md:grid-cols-3 gap-12 text-center opacity-40">
           <div className="space-y-4">
              <Landmark className="h-10 w-10 mx-auto text-slate-400" />
              <p className="text-xs font-bold uppercase tracking-widest italic">100+ Gov Databases</p>
           </div>
           <div className="space-y-4">
              <ShieldCheck className="h-10 w-10 mx-auto text-slate-400" />
              <p className="text-xs font-bold uppercase tracking-widest italic">Direct Benefit Transfer</p>
           </div>
           <div className="space-y-4">
              <History className="h-10 w-10 mx-auto text-slate-400" />
              <p className="text-xs font-bold uppercase tracking-widest italic">Real-time Updates</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SubsidyFinder;
