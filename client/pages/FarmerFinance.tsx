import { useState } from "react";
import { motion } from "framer-motion";
import { 
    CreditCard, TrendingUp, Wallet, Receipt, 
    ArrowUpRight, ArrowDownRight, IndianRupee,
    History, ShieldCheck, Landmark, ArrowLeft,
    CheckCircle2, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/lib/LanguageContext";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function FarmerFinance() {
    const { t } = useLanguage();
    
    const transactions = [
        { id: 1, type: "income", category: "Wheat Sale", amount: 45000, date: "2024-03-15", status: "Received" },
        { id: 2, type: "expense", category: "Urea Purchase", amount: 1200, date: "2024-03-12", status: "Paid" },
        { id: 3, type: "expense", category: "Tactor Rental", amount: 3500, date: "2024-03-10", status: "Paid" },
        { id: 4, type: "income", category: "Subisdy (PM-Kisan)", amount: 2000, date: "2024-03-05", status: "Received" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            {/* Header */}
            <div className="bg-slate-900 text-white py-12 px-4 mb-8">
                <div className="container mx-auto max-w-6xl">
                    <Link to="/dashboard">
                        <Button variant="ghost" className="text-white hover:bg-white/10 p-0 h-auto font-bold flex items-center gap-2 mb-4">
                            <ArrowLeft className="h-5 w-5" /> {t('navDashboard')}
                        </Button>
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-500 rounded-2xl">
                                <Wallet className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black">{t('digitalLedger')}</h1>
                                <p className="text-slate-400 font-medium tracking-tight">Financial Insights & Credit Score</p>
                            </div>
                        </div>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 h-14 rounded-2xl px-8 font-black text-lg gap-2">
                            <ArrowUpRight className="h-5 w-5" /> Download Statement
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Credit Score Card */}
                    <Card className="lg:col-span-1 rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white dark:bg-slate-900 p-8 flex flex-col items-center text-center">
                        <h3 className="text-xl font-black mb-1">{t('creditScore')}</h3>
                        <p className="text-sm font-medium text-slate-400 mb-8">{t('creditScoreDesc')}</p>
                        
                        <div className="relative h-48 w-48 mb-8">
                            <svg className="h-full w-full rotate-[-90deg]">
                                <circle cx="96" cy="96" r="80" fill="none" stroke="currentColor" strokeWidth="12" className="text-slate-100 dark:text-slate-800" />
                                <circle cx="96" cy="96" r="80" fill="none" stroke="currentColor" strokeWidth="12" className="text-emerald-500" strokeDasharray="502" strokeDashoffset="125" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black">742</span>
                                <span className="text-xs font-black uppercase tracking-widest text-emerald-600">Excellent</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full mb-8">
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{t('creditLimit')}</p>
                                <p className="text-lg font-bold">₹2.5L</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Potential</p>
                                <p className="text-lg font-bold">₹5.0L</p>
                            </div>
                        </div>

                        <Button className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 font-bold text-white">
                            {t('applyLoan')}
                        </Button>
                    </Card>

                    {/* Ledger & Transactions */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="rounded-3xl border-none shadow-sm p-6 bg-white dark:bg-slate-900">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                                        <ArrowUpRight className="h-5 w-5" />
                                    </div>
                                    <span className="text-xs font-black uppercase text-slate-400 tracking-wider font-bold">{t('totalRevenue')}</span>
                                </div>
                                <div className="text-2xl font-black">₹1,24,000</div>
                                <div className="text-xs font-black text-emerald-500 mt-1">+12% vs last year</div>
                            </Card>
                            <Card className="rounded-3xl border-none shadow-sm p-6 bg-white dark:bg-slate-900">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-red-100 text-red-600 rounded-xl">
                                        <ArrowDownRight className="h-5 w-5" />
                                    </div>
                                    <span className="text-xs font-black uppercase text-slate-400 tracking-wider font-bold">{t('totalExpense')}</span>
                                </div>
                                <div className="text-2xl font-black">₹42,500</div>
                                <div className="text-xs font-black text-slate-400 mt-1">Managed well</div>
                            </Card>
                            <Card className="rounded-3xl border-none shadow-sm p-6 bg-emerald-600 text-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-white/20 rounded-xl text-white">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <span className="text-xs font-black uppercase opacity-80 tracking-wider font-bold">{t('netSavings')}</span>
                                </div>
                                <div className="text-2xl font-black">₹81,500</div>
                                <div className="text-xs font-black opacity-60 mt-1">Ready for re-investment</div>
                            </Card>
                        </div>

                        {/* Recent Transactions */}
                        <Card className="rounded-[2.5rem] border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
                            <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl font-black flex items-center gap-3">
                                        <History className="h-6 w-6 text-emerald-600" /> Recent History
                                    </CardTitle>
                                    <CardDescription>All your agricultural inflows and outflows</CardDescription>
                                </div>
                                <Button variant="outline" className="rounded-xl font-bold">View All</Button>
                            </CardHeader>
                            <CardContent className="p-8 pt-4">
                                <div className="space-y-4">
                                    {transactions.map((tx) => (
                                        <div key={tx.id} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 group hover:shadow-md transition-all">
                                            <div className="flex items-center gap-6">
                                                <div className={cn(
                                                    "h-14 w-14 rounded-2xl flex items-center justify-center font-bold",
                                                    tx.type === "income" ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-600"
                                                )}>
                                                    {tx.type === "income" ? <ArrowUpRight className="h-7 w-7" /> : <ArrowDownRight className="h-7 w-7" />}
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-lg">{tx.category}</h4>
                                                    <p className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                                        <Clock className="h-3 w-3" /> {tx.date}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={cn(
                                                    "text-xl font-black flex items-center justify-end gap-1 mb-1",
                                                    tx.type === "income" ? "text-emerald-600" : "text-slate-900 dark:text-white"
                                                )}>
                                                    {tx.type === "income" ? "+" : "-"} ₹{tx.amount.toLocaleString()}
                                                </div>
                                                <Badge className={cn(
                                                    "rounded-lg font-bold border-none",
                                                    tx.status === "Received" ? "bg-emerald-50 text-emerald-700" : "bg-slate-200 text-slate-700"
                                                )}>
                                                    {tx.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
