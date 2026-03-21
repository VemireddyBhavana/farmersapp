import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  ArrowRight,
  IndianRupee,
  FileText,
  PieChart,
  Calendar,
  Download
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

const FarmerFinance = () => {
  const { t } = useLanguage();
  const [showAdd, setShowAdd] = useState(false);

  const transactions = [
    { id: 1, type: "income", category: "Crop Sale (Wheat)", amount: 85000, date: "2026-03-20", status: "completed" },
    { id: 2, type: "expense", category: "Tractor Rental", amount: 4500, date: "2026-03-18", status: "completed" },
    { id: 3, type: "expense", category: "Urea Fertilizer", amount: 2800, date: "2026-03-15", status: "completed" },
    { id: 4, type: "income", category: "Govt Subsidy", amount: 6000, date: "2026-03-10", status: "completed" }
  ];

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const netProfit = totalIncome - totalExpense;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pt-10">
          <div>
            <h1 className="text-4xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic leading-[0.9] mb-4">
              {t('financeTitle') || "Digital Khata"}
            </h1>
            <p className="text-xl text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
              {t('financeDesc') || "Smart Farm Ledger & Profit Tracker"}
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="h-14 px-6 rounded-2xl border-slate-200 text-xs font-black uppercase tracking-widest italic group">
              <Download className="mr-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" /> Export Statement
            </Button>
            <Button onClick={() => setShowAdd(true)} className="h-14 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest italic shadow-xl shadow-emerald-500/20">
              <Plus className="mr-2 h-4 w-4" /> Add Record
            </Button>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
           <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-slate-900 text-white group overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
               <Wallet className="h-32 w-32" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2 italic">Net Farm Profit / Season</p>
             <h4 className="text-5xl font-black italic tracking-tighter leading-none mb-4">{formatCurrency(netProfit)}</h4>
             <div className="flex items-center gap-2">
               <TrendingUp className="h-4 w-4 text-emerald-400" />
               <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest">+18% vs Last Year</span>
             </div>
           </Card>

           <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-white dark:bg-slate-900 flex justify-between flex-col">
             <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-[1.5rem] flex items-center justify-center mb-6">
               <TrendingUp className="h-6 w-6" />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 italic">Total Revenue</p>
               <h4 className="text-4xl font-black text-slate-900 dark:text-white italic tracking-tighter leading-none">{formatCurrency(totalIncome)}</h4>
             </div>
           </Card>

           <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-white dark:bg-slate-900 flex justify-between flex-col">
             <div className="h-12 w-12 bg-rose-100 text-rose-600 rounded-[1.5rem] flex items-center justify-center mb-6">
               <TrendingDown className="h-6 w-6" />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 italic">Total Expenses</p>
               <h4 className="text-4xl font-black text-slate-900 dark:text-white italic tracking-tighter leading-none">{formatCurrency(totalExpense)}</h4>
             </div>
           </Card>
        </div>

        {/* Transactions List */}
        <Card className="p-10 rounded-[3rem] border-none shadow-xl bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Recent Ledger Entries</h3>
            </div>
            <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {transactions.map((t) => (
              <div key={t.id} className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-6">
                  <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center font-black", t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600')}>
                    {t.type === 'income' ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-1">{t.category}</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 italic flex items-center gap-1"><Calendar className="h-3 w-3" /> {t.date}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md italic">{t.status}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={cn("text-2xl font-black italic tracking-tighter", t.type === 'income' ? 'text-emerald-600' : 'text-slate-900 dark:text-white')}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
};

export default FarmerFinance;
