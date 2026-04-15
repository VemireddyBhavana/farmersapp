import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  IndianRupee, 
  Wallet, 
  TrendingDown, 
  Landmark, 
  ShieldCheck, 
  ArrowRight,
  PieChart as PieChartIcon,
  Calendar,
  Percent,
  CheckCircle2,
  Zap,
  Info,
  ChevronDown,
  ArrowUpRight,
  Download
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/lib/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const AgriLoanCalculator = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Basic Loan State
  const [amount, setAmount] = useState(500000);
  const [interest, setInterest] = useState(7.0);
  const [tenure, setTenure] = useState(36);
  const [loanType, setLoanType] = useState<"kcc" | "tractor" | "solar" | "custom">("kcc");
  const [isSubsidyActive, setIsSubsidyActive] = useState(true);
  
  // UI State
  const [activeTab, setActiveTab] = useState<"summary" | "timeline">("summary");

  // Effective Interest Calculation
  const effectiveInterest = useMemo(() => {
    let rate = interest;
    if (isSubsidyActive && loanType === "kcc") {
      rate = Math.max(4.0, rate - 3.0); // Standard 3% subvention for prompt repayment
    }
    return rate;
  }, [interest, isSubsidyActive, loanType]);

  // Financial Engine
  const financialData = useMemo(() => {
    const P = amount;
    const r = effectiveInterest / (12 * 100);
    const n = tenure;
    
    const emi = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;
    
    // Generate Amortization Data
    const timeline = [];
    let remainingBalance = P;
    for (let i = 1; i <= n; i++) {
        const interestPaid = remainingBalance * r;
        const principalPaid = emi - interestPaid;
        remainingBalance = Math.max(0, remainingBalance - principalPaid);
        
        timeline.push({
            month: i,
            balance: Math.round(remainingBalance),
            principal: Math.round(principalPaid),
            interest: Math.round(interestPaid)
        });
    }

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      timeline,
      chartData: [
        { name: 'Principal', value: P, color: '#10b981' },
        { name: 'Interest', value: Math.round(totalInterest), color: '#f59e0b' }
      ]
    };
  }, [amount, effectiveInterest, tenure]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const setPreset = (type: "kcc" | "tractor" | "solar") => {
    setLoanType(type);
    if (type === "kcc") {
      setAmount(300000);
      setInterest(7.0);
      setTenure(12);
      setIsSubsidyActive(true);
      toast({ title: "Kisan Credit Card Applied", description: "Interest rate locked at 7% pre-subsidy." });
    } else if (type === "tractor") {
      setAmount(800000);
      setInterest(10.5);
      setTenure(60);
      setIsSubsidyActive(false);
      toast({ title: "Commercial Equipment Mode", description: "Optimized for high-value machinery." });
    } else if (type === "solar") {
      setAmount(150000);
      setInterest(5.0);
      setTenure(48);
      setIsSubsidyActive(true);
      toast({ title: "Solar Subsidy Active", description: "Reflecting PM-KUSUM low-interest rates." });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12 overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* HEADING SECTION */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest italic border border-emerald-500/20">
                    <ShieldCheck className="h-4 w-4" /> NABARD RECOGNIZED CALCULATOR
                </div>
                <h1 className="text-6xl lg:text-8xl font-black tracking-tight text-slate-800 dark:text-white uppercase italic leading-[0.85]">
                   Financial <br /><span className="text-emerald-500">Intelligence</span>
                </h1>
            </div>
            <div className="text-right">
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Effective APR</p>
                <div className="text-6xl font-black text-slate-900 dark:text-white italic tracking-tighter flex items-center justify-end gap-2">
                    {effectiveInterest.toFixed(1)}% <Percent className="h-8 w-8 text-emerald-500" />
                </div>
            </div>
        </div>

        {/* PRESET CHIPS */}
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 mb-12">
            {[
                { id: "kcc", label: "Kisan Credit Card", icon: Landmark },
                { id: "tractor", label: "Tractor Loan", icon: Zap },
                { id: "solar", label: "Solar Pump", icon: Calendar }
            ].map(chip => (
                <button
                    key={chip.id}
                    onClick={() => setPreset(chip.id as any)}
                    className={`h-14 px-8 rounded-2xl flex items-center gap-3 transition-all font-black uppercase italic tracking-widest text-xs ${
                        loanType === chip.id 
                        ? "bg-slate-900 text-white shadow-2xl scale-105" 
                        : "bg-white text-slate-400 hover:bg-slate-100 dark:bg-slate-900"
                    }`}
                >
                    <chip.icon className="h-5 w-5" /> {chip.label}
                </button>
            ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* CONTROL PANEL (LEFT) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-10 rounded-[4rem] border-none shadow-2xl bg-white dark:bg-slate-900 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700">
                  <Calculator className="h-[200px] w-[200px]" />
               </div>
               
               <div className="space-y-12 relative z-10">
                  {/* Amount Slider */}
                  <div className="space-y-6">
                     <div className="flex justify-between items-center">
                        <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Principal Investment</Label>
                        <span className="text-2xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">{formatCurrency(amount)}</span>
                     </div>
                     <input 
                       type="range" min="10000" max="5000000" step="10000"
                       value={amount} onChange={(e) => { setAmount(Number(e.target.value)); setLoanType("custom"); }}
                       className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-emerald-500"
                     />
                     <div className="flex justify-between text-[10px] font-bold text-slate-300">
                        <span>₹10K</span>
                        <span>₹5M</span>
                     </div>
                  </div>

                  {/* Interest Slider */}
                  <div className="space-y-6">
                     <div className="flex justify-between items-center">
                        <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Base Interest (p.a)</Label>
                        <span className="text-2xl font-black text-amber-500 italic uppercase tracking-tighter">{interest}%</span>
                     </div>
                     <input 
                       type="range" min="1" max="24" step="0.5"
                       value={interest} onChange={(e) => { setInterest(Number(e.target.value)); setLoanType("custom"); }}
                       className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-amber-500"
                     />
                  </div>

                  {/* Tenure Slider */}
                  <div className="space-y-6">
                     <div className="flex justify-between items-center">
                        <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Tenure Duration</Label>
                        <span className="text-2xl font-black text-blue-500 italic uppercase tracking-tighter">{tenure} Months</span>
                     </div>
                     <input 
                       type="range" min="3" max="120" step="3"
                       value={tenure} onChange={(e) => { setTenure(Number(e.target.value)); setLoanType("custom"); }}
                       className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-500"
                     />
                  </div>

                  {/* Subsidy Toggle */}
                  <div 
                    onClick={() => setIsSubsidyActive(!isSubsidyActive)}
                    className={`p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isSubsidyActive ? "border-emerald-500 bg-emerald-500/5" : "border-slate-100 dark:border-slate-800"
                    }`}
                  >
                     <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-colors ${isSubsidyActive ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"}`}>
                           <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                           <h4 className="font-black italic uppercase text-sm -mb-1">Prompt Repayment</h4>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">3% GOI Subvention</p>
                        </div>
                     </div>
                     <div className={`h-6 w-12 rounded-full relative transition-colors ${isSubsidyActive ? "bg-emerald-500" : "bg-slate-200"}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isSubsidyActive ? "left-7" : "left-1"}`} />
                     </div>
                  </div>
               </div>
            </Card>
          </div>

          {/* DASHBOARD (RIGHT) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
               {/* Main EMI View */}
               <Card className="p-10 rounded-[4rem] border-none shadow-[0_50px_100px_rgba(0,0,0,0.1)] bg-slate-900 text-white relative overflow-hidden group">
                  <div className="absolute -bottom-10 -right-10 opacity-[0.05] group-hover:scale-125 transition-transform duration-1000">
                     <IndianRupee className="h-[200px] w-[200px]" />
                  </div>
                  <div className="flex items-center gap-3 mb-8">
                     <div className="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                        <Wallet className="h-5 w-5" />
                     </div>
                     <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400 italic">Projected Monthly EMI</span>
                  </div>
                  <h4 className="text-7xl font-black italic tracking-tighter leading-none mb-4">{formatCurrency(financialData.emi)}</h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-10">Total Commitment: {formatCurrency(financialData.totalPayment)}</p>
                  <Button className="w-full bg-white hover:bg-emerald-500 hover:text-white text-slate-900 h-16 rounded-[2rem] font-black uppercase tracking-widest italic text-xs transition-all flex items-center justify-center gap-3">
                     Finalize Loan Package <ArrowUpRight className="h-5 w-5" />
                  </Button>
               </Card>

               {/* Donut Chart Breakout */}
               <Card className="p-8 rounded-[4rem] border-none shadow-xl bg-white dark:bg-slate-900 flex flex-col items-center justify-center">
                  <div className="h-[200px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={financialData.chartData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={8}
                          dataKey="value"
                        >
                          {financialData.chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                       <span className="text-[10px] font-black text-slate-400 uppercase italic">Interest Ratio</span>
                       <span className="text-xl font-black text-amber-500 italic">{Math.round((financialData.totalInterest / financialData.totalPayment) * 100)}%</span>
                    </div>
                  </div>
                  <div className="w-full space-y-3 mt-4">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase italic tracking-widest">
                        <span className="text-emerald-500 flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-emerald-500" /> Principal</span>
                        <span className="text-slate-900 dark:text-white">{formatCurrency(amount)}</span>
                     </div>
                     <div className="flex justify-between items-center text-[10px] font-black uppercase italic tracking-widest">
                        <span className="text-amber-500 flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-amber-500" /> Interest</span>
                        <span className="text-slate-900 dark:text-white">{formatCurrency(financialData.totalInterest)}</span>
                     </div>
                  </div>
               </Card>
            </div>

            {/* TAB SYSTEM */}
            <div className="bg-white dark:bg-slate-900 p-3 rounded-[2.5rem] flex gap-2 shadow-xl">
               <button 
                 onClick={() => setActiveTab("summary")}
                 className={`flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs italic transition-all ${activeTab === "summary" ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-400 hover:text-slate-600"}`}
               >
                 <TrendingDown className="inline-block mr-2 h-4 w-4" /> Debt Progress
               </button>
               <button 
                 onClick={() => setActiveTab("timeline")}
                 className={`flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs italic transition-all ${activeTab === "timeline" ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-400 hover:text-slate-600"}`}
               >
                 <Calendar className="inline-block mr-2 h-4 w-4" /> Amortization
               </button>
            </div>

            <AnimatePresence mode="wait">
               {activeTab === "summary" ? (
                 <motion.div
                   key="summary"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                 >
                    <Card className="p-8 rounded-[4rem] border-none shadow-xl bg-white dark:bg-slate-900 h-[300px] overflow-hidden">
                       <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-6 italic">Balance Reduction Map</h4>
                       <ResponsiveContainer width="100%" height="80%">
                          <AreaChart data={financialData.timeline}>
                             <defs>
                                <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                             </defs>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                             <XAxis dataKey="month" hide />
                             <YAxis hide />
                             <RechartsTooltip />
                             <Area type="monotone" dataKey="balance" stroke="#10b981" fillOpacity={1} fill="url(#colorBal)" strokeWidth={4} />
                          </AreaChart>
                       </ResponsiveContainer>
                    </Card>
                 </motion.div>
               ) : (
                 <motion.div
                   key="timeline"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                 >
                    <Card className="p-8 rounded-[4rem] border-none shadow-xl bg-white dark:bg-slate-900 h-[400px] scrollbar-hide overflow-y-auto">
                       <div className="flex justify-between items-center mb-8 sticky top-0 bg-white dark:bg-slate-900 py-2 z-10">
                          <h4 className="text-xl font-black italic uppercase tracking-tighter">Full Payment Schedule</h4>
                          <Button variant="ghost" size="sm" className="rounded-xl border border-slate-100 h-10 px-4 text-[10px] font-black italic uppercase italic tracking-widest">
                             <Download className="h-4 w-4 mr-2" /> Export PDF
                          </Button>
                       </div>
                       <div className="space-y-4">
                          {financialData.timeline.filter((_, i) => i % (tenure > 24 ? 3 : 1) === 0).map((row) => (
                             <div key={row.month} className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border border-transparent hover:border-emerald-500 transition-colors">
                                <div className="flex items-center gap-6">
                                   <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-xs font-black italic text-slate-400">
                                      M{row.month}
                                   </div>
                                   <div>
                                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Principal / Interest</p>
                                      <p className="text-sm font-black text-slate-900 dark:text-white tracking-tighter italic">
                                         {formatCurrency(row.principal)} <span className="text-amber-500">/ {formatCurrency(row.interest)}</span>
                                      </p>
                                   </div>
                                </div>
                                <div className="text-right">
                                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Closing Balance</p>
                                   <p className="text-lg font-black text-slate-900 dark:text-white tracking-tighter italic leading-none">{formatCurrency(row.balance)}</p>
                                </div>
                             </div>
                          ))}
                       </div>
                    </Card>
                 </motion.div>
               )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgriLoanCalculator;
