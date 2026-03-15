import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowLeft, PiggyBank, TrendingUp, Wallet, ArrowRight, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";

export default function ProfitCalculator() {
  const { t } = useLanguage();
  const [area, setArea] = useState<string>("1");
  const [seedCost, setSeedCost] = useState<string>("");
  const [fertilizerCost, setFertilizerCost] = useState<string>("");
  const [labourCost, setLabourCost] = useState<string>("");
  const [yieldVal, setYieldVal] = useState<string>("");
  const [marketPrice, setMarketPrice] = useState<string>("");
  
  const [results, setResults] = useState<{
    totalCost: number;
    grossRevenue: number;
    netProfit: number;
    roi: string;
  } | null>(null);

  const calculateProfit = () => {
    const sCost = parseFloat(seedCost) || 0;
    const fCost = parseFloat(fertilizerCost) || 0;
    const lCost = parseFloat(labourCost) || 0;
    const yVal = parseFloat(yieldVal) || 0;
    const mPrice = parseFloat(marketPrice) || 0;
    const fArea = parseFloat(area) || 1;

    const totalCost = (sCost + fCost + lCost) * fArea;
    const grossRevenue = (yVal * mPrice) * fArea;
    const netProfit = grossRevenue - totalCost;
    const roi = totalCost > 0 ? ((netProfit / totalCost) * 100).toFixed(1) : "0";

    setResults({ totalCost, grossRevenue, netProfit, roi });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <div className="bg-[#106A3A] text-white py-12 px-4 mb-8 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <Link to="/dashboard">
            <Button variant="ghost" className="text-white hover:bg-white/10 p-0 h-auto font-bold flex items-center gap-2 mb-4">
              <ArrowLeft className="h-5 w-5" /> {t('navDashboard')}
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black">{t('farmProfitCalculator')}</h1>
              <p className="text-emerald-100 font-medium">{t('farmProfitCalculatorDesc')}</p>
            </div>
          </div>
        </div>
        <div className="absolute right-[-5%] bottom-[-20%] opacity-10">
           <Calculator className="h-64 w-64 text-white -rotate-12" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="border-emerald-100 shadow-xl rounded-[2rem] overflow-hidden">
            <CardHeader className="p-8 bg-emerald-50/50">
              <CardTitle className="text-2xl font-black text-emerald-800">{t('productionCosts') || "Production Costs"}</CardTitle>
              <CardDescription>{t('costInputDesc') || "Enter expenses per acre to estimate your returns"}</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">{t('farmArea')}</label>
                  <Input type="number" value={area} onChange={(e) => setArea(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">{t('seedCost')} (â‚¹)</label>
                  <Input type="number" value={seedCost} onChange={(e) => setSeedCost(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">{t('fertilizerCost')} (â‚¹)</label>
                  <Input type="number" value={fertilizerCost} onChange={(e) => setFertilizerCost(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">{t('labourCost')} (â‚¹)</label>
                  <Input type="number" value={labourCost} onChange={(e) => setLabourCost(e.target.value)} />
                </div>
              </div>
              
              <hr className="border-emerald-100" />
              
              <CardTitle className="text-2xl font-black text-emerald-800 pt-2">{t('expectedReturns') || "Expected Returns"}</CardTitle>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">{t('expectedYield')}</label>
                  <Input type="number" value={yieldVal} onChange={(e) => setYieldVal(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">{t('marketPrice')} (â‚¹)</label>
                  <Input type="number" value={marketPrice} onChange={(e) => setMarketPrice(e.target.value)} />
                </div>
              </div>

              <Button 
                onClick={calculateProfit}
                className="w-full bg-emerald-600 hover:bg-emerald-700 h-14 text-lg font-black rounded-2xl shadow-lg shadow-emerald-500/20 mt-4"
              >
                {t('calculate')}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {!results ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full bg-white rounded-[2rem] border-2 border-dashed border-emerald-200 flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="h-24 w-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                    <PiggyBank className="h-12 w-12 text-emerald-300" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">{t('readyToCalculate') || "Ready to Calculate?"}</h3>
                  <p className="text-slate-500 max-w-xs">{t('calcInstruction') || "Fill in your costs and expected yield to see your projected net profit."}</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <p className="text-sm font-black uppercase tracking-[0.2em] opacity-80 mb-2">{t('netProfit')}</p>
                      <h2 className="text-5xl font-black mb-4">â‚¹{results.netProfit.toLocaleString()}</h2>
                      <div className="flex gap-4">
                        <Badge variant="outline" className="bg-white/10 border-white/20 text-white rounded-full px-4 py-1 text-sm font-black italic">
                          ROI: {results.roi}%
                        </Badge>
                      </div>
                    </div>
                    <TrendingUp className="absolute right-[-10%] bottom-[-10%] h-48 w-48 opacity-10" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="rounded-3xl border-emerald-100 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-red-50 rounded-xl">
                            <Wallet className="h-5 w-5 text-red-500" />
                          </div>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('totalCost')}</p>
                        </div>
                        <p className="text-2xl font-black text-slate-800">â‚¹{results.totalCost.toLocaleString()}</p>
                      </CardContent>
                    </Card>
                    <Card className="rounded-3xl border-emerald-100 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-emerald-50 rounded-xl">
                            <TrendingUp className="h-5 w-5 text-emerald-500" />
                          </div>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('grossRevenue')}</p>
                        </div>
                        <p className="text-2xl font-black text-slate-800">â‚¹{results.grossRevenue.toLocaleString()}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="rounded-[2rem] border-emerald-100 shadow-lg bg-slate-900 text-white hover:bg-[#106A3A] transition-colors group cursor-pointer">
                    <CardContent className="p-8 flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="text-xl font-bold">{t('needFunding') || "Need Funding?"}</h4>
                        <p className="text-sm text-slate-400 group-hover:text-emerald-100">{t('loanAdvisoryDesc') || "Explore low-interest agricultural loans"}</p>
                      </div>
                      <div className="h-12 w-12 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-emerald-600 group-hover:border-white transition-all">
                        <ArrowRight className="h-6 w-6" />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-3 italic">
                    <Info className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                      Note: Calculations are based on your inputs and current market data. Real-world results may vary due to weather, pests, and local market fluctuations.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
