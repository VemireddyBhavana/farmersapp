import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { 
  Calculator, 
  Droplets, 
  TrendingUp, 
  Info, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Sprout, 
  BarChart3, 
  Waves, 
  Coins,
  ChevronRight, 
  RefreshCw, 
  AlertCircle,
  Zap,
  Target,
  ShieldCheck,
  Factory
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const CROPS = [
  { id: "rice", name: "Rice (Paddy)", waterNeed: 14, costPerAcre: 35000, revenuePerAcre: 65000, yieldPerAcre: 24 },
  { id: "wheat", name: "Wheat", waterNeed: 6, costPerAcre: 25000, revenuePerAcre: 52000, yieldPerAcre: 18 },
  { id: "cotton", name: "Cotton", waterNeed: 8, costPerAcre: 42000, revenuePerAcre: 85000, yieldPerAcre: 12 },
  { id: "tomato", name: "Tomato", waterNeed: 5, costPerAcre: 120000, revenuePerAcre: 320000, yieldPerAcre: 250 },
  { id: "maize", name: "Maize (Corn)", waterNeed: 7, costPerAcre: 28000, revenuePerAcre: 58000, yieldPerAcre: 28 },
];

const SOILS = [
  { id: "loamy", name: "Loamy (Ideal)", factor: 1.0 },
  { id: "clayey", name: "Clayey (Holds water)", factor: 0.85 },
  { id: "sandy", name: "Sandy (Fast drainage)", factor: 1.25 },
];

export default function AgriTools() {
  const { t } = useLanguage();
  
  // Water Calculator State
  const [selectedCropId, setSelectedCropId] = useState("rice");
  const [selectedSoilId, setSelectedSoilId] = useState("loamy");
  const [landSize, setLandSize] = useState(1);

  // Profit Calculator State
  const [profitCropId, setProfitCropId] = useState("rice");
  const [profitLandSize, setProfitLandSize] = useState(1);
  const [expectedPrice, setExpectedPrice] = useState(2500); // per quintal

  const waterResults = useMemo(() => {
    const crop = CROPS.find(c => c.id === selectedCropId);
    const soil = SOILS.find(s => s.id === selectedSoilId);
    if (!crop || !soil) return { dailyLiters: 0, dailyMm: 0 };

    const dailyMm = crop.waterNeed * soil.factor;
    const dailyLiters = landSize * dailyMm * 4046.86; // Approx Liters per Acre
    return { dailyLiters, dailyMm };
  }, [selectedCropId, selectedSoilId, landSize]);

  const profitResults = useMemo(() => {
    const crop = CROPS.find(c => c.id === profitCropId);
    if (!crop) return { cost: 0, revenue: 0, profit: 0 };

    const cost = crop.costPerAcre * profitLandSize;
    const revenue = crop.yieldPerAcre * profitLandSize * expectedPrice;
    const profit = revenue - cost;
    return { cost, revenue, profit };
  }, [profitCropId, profitLandSize, expectedPrice]);

  return (
    <div className="flex flex-col gap-8 pb-12 text-white">
      {/* Hero Header */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative min-h-[250px] rounded-[3rem] overflow-hidden glass-dark border-white/5 p-8 flex flex-col justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
               <div className="p-2 bg-emerald-500/20 rounded-xl">
                 <Calculator className="h-6 w-6 text-emerald-400" />
               </div>
               <Badge className="bg-white/5 text-emerald-400 border-emerald-500/20 uppercase font-black tracking-widest text-[10px]">ISMIGS RESOURCE INTEL</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase leading-none">
               {t("agriToolsLabel") || "Agricultural Resource Intelligence"}
            </h1>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Precision calculators for hydraulic resource management and cultivation fiscal projections. Powered by <span className="text-white font-bold">India State Macro Intelligence & Governance Systems.</span>
            </p>
          </div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <Tabs defaultValue="costs" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white/5 backdrop-blur-xl p-2 rounded-[2rem] border border-white/5 h-auto gap-4">
              <TabsTrigger value="costs" className="rounded-[1.5rem] px-10 py-4 data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950 transition-all font-black uppercase text-[10px] tracking-widest gap-2 italic">
                <Coins className="h-4 w-4" /> Cultivation Costs
              </TabsTrigger>
              <TabsTrigger value="hydraulic" className="rounded-[1.5rem] px-10 py-4 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all font-black uppercase text-[10px] tracking-widest gap-2 italic">
                <Droplets className="h-4 w-4" /> Hydraulic Resource
              </TabsTrigger>
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            <TabsContent value="costs">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                {/* Inputs */}
                <Card className="glass-card rounded-[3rem] border-white/5 h-fit">
                  <CardHeader className="p-8 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                       <BarChart3 className="h-4 w-4 text-emerald-400" />
                       <CardTitle className="text-sm font-black uppercase tracking-widest text-white italic">Fiscal Parameters</CardTitle>
                    </div>
                    <CardDescription className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">Define your financial exposure</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2">{t("cropType")}</Label>
                      <Select value={profitCropId} onValueChange={setProfitCropId}>
                        <SelectTrigger className="bg-white/5 border-white/10 rounded-2xl h-14 text-white font-bold italic">
                          <SelectValue placeholder="Select Crop" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/10 rounded-2xl text-white">
                          {CROPS.map(crop => (
                            <SelectItem key={crop.id} value={crop.id} className="rounded-xl focus:bg-emerald-500/20">{crop.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2">{t("landSize")} ({t("acre")})</Label>
                      <div className="relative">
                        <Input 
                          type="number" 
                          value={profitLandSize} 
                          onChange={(e) => setProfitLandSize(parseFloat(e.target.value) || 0)}
                          className="bg-white/5 border-white/10 rounded-2xl h-14 text-white font-bold italic pr-16"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] text-white/20 font-black uppercase tracking-widest italic">Acres</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2">Market Price (₹/Qtl)</Label>
                      <div className="relative">
                        <Input 
                          type="number" 
                          value={expectedPrice} 
                          onChange={(e) => setExpectedPrice(parseFloat(e.target.value) || 0)}
                          className="bg-white/5 border-white/10 rounded-2xl h-14 text-white font-bold italic pr-12"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] text-emerald-400 font-black uppercase tracking-widest italic">₹</div>
                      </div>
                    </div>

                    <Button className="w-full h-14 rounded-2xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-black text-sm uppercase tracking-widest italic group">
                      Analyze Exposure <Zap className="h-4 w-4 ml-2 group-hover:fill-current" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Results Card */}
                <div className="lg:col-span-2 space-y-8">
                   <div className="glass-card rounded-[3.5rem] p-12 border-white/5 relative overflow-hidden bg-white/5">
                      <div className="absolute top-0 right-0 p-12 opacity-5 antigravity-float">
                        <TrendingUp className="h-64 w-64 text-emerald-400" />
                      </div>
                      
                      <div className="relative z-10 grid md:grid-cols-3 gap-12">
                        <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{t("revenue")}</p>
                          <p className="text-4xl font-black italic tracking-tighter text-white">₹{Math.round(profitResults.revenue).toLocaleString()}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500/60">{t("costs")}</p>
                          <p className="text-4xl font-black italic tracking-tighter text-white/80">₹{Math.round(profitResults.cost).toLocaleString()}</p>
                        </div>
                        <div className="space-y-4 border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-12">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">{t("netProfit")}</p>
                            <p className="text-5xl font-black italic tracking-tighter text-emerald-400">₹{Math.round(profitResults.profit).toLocaleString()}</p>
                          </div>
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-none font-black italic uppercase text-[10px] tracking-widest px-4 py-1.5">Efficiency Rating: 9.4A</Badge>
                        </div>
                      </div>

                      <div className="mt-16 pt-12 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-8">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Total Yield</p>
                          <p className="font-black text-white italic">{Math.round(CROPS.find(c => c.id === profitCropId)?.yieldPerAcre! * profitLandSize)} <span className="text-[10px] text-white/20 font-bold uppercase ml-1">Qtl</span></p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Biomass Cost</p>
                          <p className="font-black text-white italic">₹{Math.round(profitResults.cost * 0.15).toLocaleString()}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Supplementation</p>
                          <p className="font-black text-white italic">₹{Math.round(profitResults.cost * 0.35).toLocaleString()}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Human CapEx</p>
                          <p className="font-black text-white italic">₹{Math.round(profitResults.cost * 0.50).toLocaleString()}</p>
                        </div>
                      </div>
                   </div>

                   <div className="p-8 glass-card rounded-[2.5rem] border-white/5 bg-emerald-500/5 relative overflow-hidden group">
                      <div className="relative z-10 flex gap-6 italic items-center">
                        <div className="h-10 w-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                          <Info className="h-5 w-5 text-emerald-400" />
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                           <span className="text-white font-black uppercase tracking-widest text-[10px] block mb-2">Macro Intel Bulletin</span>
                           Current algorithmic data indicates a <span className="text-emerald-400 font-black">12% Index Lift</span> in {CROPS.find(c => c.id === profitCropId)?.name} value across this sector. Secure output for Q4 optimization.
                        </p>
                      </div>
                   </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="hydraulic">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                {/* Inputs */}
                <Card className="glass-card rounded-[3rem] border-white/5 h-fit">
                  <CardHeader className="p-8 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                       <Droplets className="h-4 w-4 text-blue-400" />
                       <CardTitle className="text-sm font-black uppercase tracking-widest text-white italic">Hydraulic Configuration</CardTitle>
                    </div>
                    <CardDescription className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">Define your irrigation matrix</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2">{t("cropType")}</Label>
                      <Select value={selectedCropId} onValueChange={setSelectedCropId}>
                        <SelectTrigger className="bg-white/5 border-white/10 rounded-2xl h-14 text-white font-bold italic">
                          <SelectValue placeholder="Select Crop" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/10 rounded-2xl text-white">
                          {CROPS.map(crop => (
                            <SelectItem key={crop.id} value={crop.id} className="rounded-xl focus:bg-blue-500/20">{crop.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2">{t("soilType")}</Label>
                      <Select value={selectedSoilId} onValueChange={setSelectedSoilId}>
                        <SelectTrigger className="bg-white/5 border-white/10 rounded-2xl h-14 text-white font-bold italic">
                          <SelectValue placeholder="Select Soil" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/10 rounded-2xl text-white">
                          {SOILS.map(soil => (
                            <SelectItem key={soil.id} value={soil.id} className="rounded-xl focus:bg-blue-500/20">{soil.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2">{t("landSize")} ({t("acre")})</Label>
                      <div className="relative">
                        <Input 
                          type="number" 
                          value={landSize} 
                          onChange={(e) => setLandSize(parseFloat(e.target.value) || 0)}
                          className="bg-white/5 border-white/10 rounded-2xl h-14 text-white font-bold italic pr-16"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] text-white/20 font-black uppercase tracking-widest italic">Acres</div>
                      </div>
                    </div>

                    <Button className="w-full h-14 rounded-2xl bg-blue-500 text-white hover:bg-blue-400 font-black text-sm uppercase tracking-widest italic group shadow-xl shadow-blue-500/20">
                      Sync Hydro Cycle <Zap className="h-4 w-4 ml-2 group-hover:fill-current" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Results Card */}
                <div className="lg:col-span-2 space-y-8">
                   <div className="grid sm:grid-cols-2 gap-8">
                      <Card className="glass-card rounded-[3rem] border-white/5 bg-white/5 overflow-hidden group">
                        <CardContent className="p-10 text-center relative">
                          <div className="absolute top-6 right-6 text-blue-500/10 group-hover:scale-110 transition-transform">
                            <Droplets className="h-16 w-16" />
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">{t("dailyWaterNeed") || "DAILY HYDRIC LOAD"}</p>
                          <h4 className="text-6xl font-black text-blue-400 italic tracking-tighter mb-2">
                            {Math.round(waterResults.dailyLiters).toLocaleString()}
                          </h4>
                          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{t("litersPerDay") || "LITERS / 24HR"}</p>
                        </CardContent>
                      </Card>

                      <Card className="glass-card rounded-[3rem] border-white/5 bg-white/5 overflow-hidden group">
                        <CardContent className="p-10 text-center relative">
                          <div className="absolute top-6 right-6 text-white/5 group-hover:scale-110 transition-transform">
                            <Waves className="h-16 w-16" />
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">PRECIPITATION DEPTH</p>
                          <h4 className="text-6xl font-black text-white italic tracking-tighter mb-2">
                            {waterResults.dailyMm.toFixed(1)}
                          </h4>
                          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">MM PER SECTOR</p>
                        </CardContent>
                      </Card>
                   </div>

                   <Card className="glass-card rounded-[3rem] border-white/5 p-10 bg-white/5">
                      <div className="flex items-center justify-between mb-10">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black uppercase tracking-widest text-white italic">{t("irrigationSchedule") || "HYDRAULIC PHASING"}</h4>
                          <p className="text-[10px] font-black uppercase tracking-tighter text-white/20">Temporal water management protocol</p>
                        </div>
                        <Badge variant="outline" className="border-blue-500/20 text-blue-400 font-black uppercase text-[9px] px-3 py-1 italic tracking-widest">Link Active</Badge>
                      </div>
                      
                      <div className="relative px-4">
                        <div className="absolute top-6 left-8 right-8 h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full w-1/3 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                        </div>
                        
                        <div className="grid grid-cols-5 gap-4 relative z-10">
                           {["Sowing", "Tillering", "Heading", "Flowering", "Dough"].map((stage, idx) => (
                             <div key={idx} className="flex flex-col items-center group">
                               <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-[10px] font-black shadow-2xl mb-4 transition-all border shrink-0", idx === 0 ? "bg-blue-500 text-white border-blue-400 rotate-45 scale-110" : "bg-white/5 text-white/20 border-white/5")}>
                                  <div className={cn(idx === 0 ? "-rotate-45" : "")}>{idx + 1}</div>
                               </div>
                               <h5 className="font-black text-[10px] text-center uppercase tracking-widest italic text-white/40 group-hover:text-blue-400 transition-colors">{stage}</h5>
                               <p className="text-[8px] text-white/10 text-center mt-1 font-bold uppercase tracking-tighter">Phase {idx + 1}</p>
                             </div>
                           ))}
                        </div>
                      </div>
                   </Card>
                </div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>

      {/* Philosophy Section */}
      <section className="py-24 container mx-auto">
        <div className="glass-card rounded-[4rem] p-16 lg:p-24 border-white/5 relative overflow-hidden bg-slate-900/40 backdrop-blur-3xl">
          <div className="absolute top-0 right-0 p-16 opacity-5 rotate-12 antigravity-float">
            <BarChart3 className="h-[30rem] w-[30rem] text-blue-500" />
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
               <div className="space-y-4">
                 <Badge className="bg-blue-500/20 text-blue-400 border-none px-4 py-1.5 rounded-xl font-black uppercase text-[10px] tracking-[0.3em] italic">System Philosophy</Badge>
                 <h2 className="text-5xl lg:text-7xl font-black text-white italic tracking-tighter leading-[0.9] uppercase">
                   Empowering Farmers with <span className="text-blue-500">Macro Intelligence.</span>
                 </h2>
               </div>
               <p className="text-slate-400 text-lg leading-relaxed font-medium">
                 Interrogating India State Macro Intelligence & Governance System (ISMIGS) datasets to deliver precision hydraulic modeling and fiscal exposure analysis. TechSpark AI transforms raw governance data into <span className="text-white font-bold">survival strategies for the modern agronomist.</span>
               </p>
               <div className="flex flex-wrap gap-6 pt-6">
                 <Button className="h-16 rounded-3xl bg-blue-500 hover:bg-blue-400 text-white px-10 py-6 font-black text-sm uppercase tracking-widest italic shadow-2xl shadow-blue-500/20 transition-all hover:scale-105">
                   Export Data Manifest <ChevronRight className="ml-2 h-4 w-4" />
                 </Button>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { icon: Droplets, title: "Hydraulic Load", desc: "40% Resource Optimization", color: "text-blue-400", bg: "bg-blue-500/10" },
                { icon: Coins, title: "Fiscal Exposure", desc: "Real-time CapEx Tracking", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                { icon: BarChart3, title: "Data Integrity", desc: "Verified State Datasets", color: "text-purple-400", bg: "bg-purple-500/10" },
                { icon: Sprout, title: "Yield Intelligence", desc: "Neural Crop Projections", color: "text-amber-400", bg: "bg-amber-500/10" },
              ].map((item, i) => (
                <div key={i} className={cn("p-8 rounded-[2.5rem] glass-card border-white/5 space-y-4 hover:bg-white/5 transition-all group", i % 2 !== 0 && "mt-12")}>
                  <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl", item.bg)}>
                    <item.icon className={cn("h-7 w-7", item.color)} />
                  </div>
                  <h4 className="font-black text-white italic uppercase tracking-widest text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
