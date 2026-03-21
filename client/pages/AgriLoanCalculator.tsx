import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  IndianRupee, 
  Wallet, 
  TrendingDown, 
  Landmark, 
  ShieldCheck, 
  ArrowRight,
  PieChart,
  Calendar,
  Percent
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";

const AgriLoanCalculator = () => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState(500000);
  const [interest, setInterest] = useState(7.5);
  const [tenure, setTenure] = useState(36);
  
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const principal = amount;
    const ratePerMonth = interest / (12 * 100);
    const months = tenure;
    
    if (ratePerMonth === 0) {
      setEmi(principal / months);
      setTotalInterest(0);
      setTotalPayment(principal);
    } else {
      const emiValue = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, months)) / (Math.pow(1 + ratePerMonth, months) - 1);
      setEmi(Math.round(emiValue));
      setTotalPayment(Math.round(emiValue * months));
      setTotalInterest(Math.round((emiValue * months) - principal));
    }
  }, [amount, interest, tenure]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 pt-10">
          <h1 className="text-4xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic leading-[0.9] mb-6">
            {t('loanCalcTitle') || "Agri-Loan Calculator"}
          </h1>
          <p className="text-xl text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
            {t('loanCalcDesc') || "Calculate EMIs for equipment and find the best crop insurance schemes."}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Calculator Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-white dark:bg-slate-900">
              <div className="flex items-center gap-4 mb-8">
                 <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                   <Calculator className="h-6 w-6" />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Loan Details</h3>
              </div>

              <div className="space-y-8">
                 {/* Loan Amount */}
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic flex items-center gap-2">
                        <IndianRupee className="h-3 w-3" /> Loan Amount
                      </label>
                      <span className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tighter">{formatCurrency(amount)}</span>
                    </div>
                    <input 
                      type="range" min="10000" max="2000000" step="10000"
                      value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                 </div>

                 {/* Interest Rate */}
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic flex items-center gap-2">
                        <Percent className="h-3 w-3" /> Interest Rate (p.a)
                      </label>
                      <span className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tighter">{interest}%</span>
                    </div>
                    <input 
                      type="range" min="4" max="15" step="0.1"
                      value={interest} onChange={(e) => setInterest(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                 </div>

                 {/* Tenure */}
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic flex items-center gap-2">
                        <Calendar className="h-3 w-3" /> Loan Tenure (Months)
                      </label>
                      <span className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tighter">{tenure} M</span>
                    </div>
                    <input 
                      type="range" min="6" max="120" step="6"
                      value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                 </div>
              </div>
            </Card>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
               <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-emerald-600 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Wallet className="h-24 w-24" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100 mb-2 italic">Monthly EMI</p>
                  <h4 className="text-5xl font-black italic tracking-tighter leading-none mb-4">{formatCurrency(emi)}</h4>
                  <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 h-14 rounded-2xl font-black uppercase tracking-widest text-xs italic">
                    Apply Now
                  </Button>
               </Card>

               <div className="space-y-6">
                 <Card className="p-6 rounded-[2rem] border-none shadow-xl bg-white dark:bg-slate-900 flex items-center justify-between group hover:-translate-y-1 transition-transform">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 italic">Total Interest</p>
                      <h5 className="text-2xl font-black text-amber-500 italic tracking-tighter">{formatCurrency(totalInterest)}</h5>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center">
                      <PieChart className="h-5 w-5 text-amber-500" />
                    </div>
                 </Card>

                 <Card className="p-6 rounded-[2rem] border-none shadow-xl bg-white dark:bg-slate-900 flex items-center justify-between group hover:-translate-y-1 transition-transform">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 italic">Total Payment</p>
                      <h5 className="text-2xl font-black text-rose-500 italic tracking-tighter">{formatCurrency(totalPayment)}</h5>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-rose-50 flex items-center justify-center">
                      <TrendingDown className="h-5 w-5 text-rose-500" />
                    </div>
                 </Card>
               </div>
            </div>

            {/* Suggested Schemes */}
            <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-slate-900 text-white">
               <div className="flex justify-between items-center mb-6">
                 <div>
                   <h4 className="text-xl font-black uppercase italic tracking-tighter mb-1">Recommended Schemes</h4>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Based on your input</p>
                 </div>
                 <Landmark className="h-8 w-8 text-slate-600" />
               </div>

               <div className="space-y-4">
                 {[
                   { name: "Kisan Credit Card (KCC)", desc: "Lowest interest rate for farming needs", rate: "4.0% p.a.", icon: ShieldCheck },
                   { name: "PMFBY Crop Insurance", desc: "Premium starting at just 1.5%", rate: "1.5%", icon: Calculator }
                 ].map((scheme, i) => (
                   <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center hover:bg-white/10 transition-colors cursor-pointer group">
                      <div className="flex gap-4 items-center">
                         <div className="h-12 w-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                            <scheme.icon className="h-6 w-6" />
                         </div>
                         <div>
                           <p className="text-sm font-black italic tracking-tighter uppercase">{scheme.name}</p>
                           <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{scheme.desc}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className="text-emerald-400 font-black italic">{scheme.rate}</span>
                         <ArrowRight className="h-4 w-4 ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
                      </div>
                   </div>
                 ))}
               </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgriLoanCalculator;
