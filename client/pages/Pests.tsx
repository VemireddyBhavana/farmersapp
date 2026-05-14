import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, Bug, Leaf, Search, MapPin, ArrowRight, ShieldCheck, Activity, Eye, Info, AlertTriangle,
  ChevronDown, Droplets, Wind, Zap, FlaskConical, Sprout, X, Plus, ArrowUpRight, TrendingUp,
  Microscope, Stethoscope, Lightbulb, RefreshCcw, CheckCircle2, AlertCircle, XCircle, FileSearch,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

export default function Pests() {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState("all");
  const [weatherCondition, setWeatherCondition] = useState("all");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const ALL_PESTS = [
    { id: "whiteflies", icon: "🦟", risk: "high" },
    { id: "spiderMites", icon: "🕷️", risk: "high" },
    { id: "armyworms", icon: "🐛", risk: "high" },
    { id: "bollworm", icon: "🐛", risk: "high" },
    { id: "brownPlanthopper", icon: "🦗", risk: "high" },
    { id: "aphids", icon: "🦟", risk: "medium" },
    { id: "thrips", icon: "🦟", risk: "low" }
  ];

  const ALL_DISEASES = [
    { id: "blight", icon: "🍂", risk: "high" },
    { id: "powderyMildew", icon: "🌫️", risk: "medium" },
    { id: "rootRot", icon: "💧", risk: "high" },
    { id: "mosaicVirus", icon: "🧬", risk: "high" },
    { id: "wilt", icon: "🥀", risk: "high" }
  ];

  const INITIAL_ALERTS = [
    { id: "whiteflies", risk: "high" },
    { id: "spiderMites", risk: "high" },
    { id: "armyworms", risk: "high" },
    { id: "bollworm", risk: "high" },
    { id: "brownPlanthopper", risk: "high" },
    { id: "blight", risk: "high" }
  ];

  const [currentData, setCurrentData] = useState({
    alerts: INITIAL_ALERTS,
    pests: ALL_PESTS,
    diseases: ALL_DISEASES,
    stats: { pests: "10", diseases: "8", threats: "18", alerts: "10" },
    prevention: "",
    organic: "",
    monitoring: "",
    ipm: ""
  });

  const getRecommendations = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      let filteredPests = ALL_PESTS;
      let filteredDiseases = ALL_DISEASES;
      let alerts: any[] = [];
      let stats = { pests: "10", diseases: "8", threats: "18", alerts: "10" };

      const weatherKeyMap: Record<string, string> = {
        "hot-dry": "Dry",
        "humid": "Humid",
        "wet-rainy": "Wet",
        "monsoon": "Humid"
      };
      
      const weatherSuffix = weatherKeyMap[weatherCondition] || "";

      if (selectedCrop === "tomato" && weatherCondition === "hot-dry") {
        filteredPests = ALL_PESTS.filter(p => p.id === "spiderMites");
        filteredDiseases = ALL_DISEASES.filter(d => d.id === "wilt" || d.id === "mosaicVirus");
        alerts = [
          { id: "spiderMites", risk: "high" },
          { id: "wilt", risk: "high" },
          { id: "mosaicVirus", risk: "high" }
        ];
        stats = { pests: "1", diseases: "2", threats: "3", alerts: "3" };
      } else if (selectedCrop === "cotton" && (weatherCondition === "humid" || weatherCondition === "wet-rainy")) {
        filteredPests = [];
        filteredDiseases = [];
        alerts = [];
        stats = { pests: "0", diseases: "0", threats: "0", alerts: "0" };
      } else if (selectedCrop === "banana") {
        filteredPests = ALL_PESTS.filter(p => p.id === "aphids" || p.id === "thrips");
        filteredDiseases = ALL_DISEASES.filter(d => d.id === "wilt" || d.id === "blight");
        alerts = [
          { id: "panamaDisease", risk: "high" },
          { id: "sigatoka", risk: "high" }
        ];
        stats = { pests: "2", diseases: "2", threats: "4", alerts: "2" };
      } else {
        alerts = INITIAL_ALERTS;
        filteredPests = ALL_PESTS;
        filteredDiseases = ALL_DISEASES;
        stats = { pests: "7", diseases: "5", threats: "12", alerts: "6" };
      }

      const getStrategy = (type: string) => {
        const specific = t(`${selectedCrop}${type}${weatherSuffix}`);
        const cropOnly = t(`${selectedCrop}${type}`);
        const defaultStrat = t(`default${type}`);

        if (specific && specific !== `${selectedCrop}${type}${weatherSuffix}`) return specific;
        if (cropOnly && cropOnly !== `${selectedCrop}${type}`) return cropOnly;
        return defaultStrat || "";
      };

      setCurrentData({
        alerts,
        pests: filteredPests,
        diseases: filteredDiseases,
        stats,
        prevention: getStrategy("Prevention"),
        organic: getStrategy("Organic"),
        monitoring: getStrategy("Monitoring"),
        ipm: getStrategy("Ipm")
      });

      setIsAnalyzing(false); 
    }, 1200);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase italic leading-none">
          {t("pestsAndDisease")}
        </h1>
        <p className="text-muted-foreground text-lg font-medium">
          {t("pestAdvisoryDesc")}
        </p>
      </div>

      {/* Field Input Center - Matching AgriSchemes Search Card */}
      <Card className="rounded-[2.5rem] border-primary/5 bg-white shadow-sm overflow-hidden">
        <CardContent className="p-10 md:p-14 text-center">
          <div className="space-y-4 mb-10">
            <div className="flex items-center justify-center gap-3 text-2xl font-black text-emerald-600 uppercase italic tracking-tight">
              <Search className="h-7 w-7" />
              {t("fieldInputCenter")}
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto font-medium italic">
              {t("analyzing")}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 max-w-5xl mx-auto">
             <div className="flex-1 text-left space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-2 block">{t("selectYourCrop")}</label>
                <Select value={selectedCrop} onValueChange={(val) => { setSelectedCrop(val); setIsAnalyzing(false); }}>
                  <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none font-black text-sm uppercase tracking-wider focus:ring-2 focus:ring-primary/20 shadow-sm">
                    <SelectValue placeholder={t("selectYourCrop")} />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-primary/10">
                    <SelectItem value="all" className="font-bold uppercase text-xs">{t("allCrops")}</SelectItem>
                    <SelectItem value="banana" className="font-bold uppercase text-xs">{t("banana")}</SelectItem>
                    <SelectItem value="tomato" className="font-bold uppercase text-xs">{t("tomato")}</SelectItem>
                    <SelectItem value="cotton" className="font-bold uppercase text-xs">{t("cotton")}</SelectItem>
                  </SelectContent>
                </Select>
             </div>

             <div className="flex-1 text-left space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-2 block">{t("currentWeather")}</label>
                <Select value={weatherCondition} onValueChange={(val) => { setWeatherCondition(val); setIsAnalyzing(false); }}>
                  <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none font-black text-sm uppercase tracking-wider focus:ring-2 focus:ring-primary/20 shadow-sm">
                    <SelectValue placeholder={t("currentWeather")} />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-primary/10">
                    <SelectItem value="all" className="font-bold uppercase text-xs">{t("allSeasons")}</SelectItem>
                    <SelectItem value="hot-dry" className="font-bold uppercase text-xs">{t("hotAndDry")}</SelectItem>
                    <SelectItem value="humid" className="font-bold uppercase text-xs">{t("humidAndRainy")}</SelectItem>
                  </SelectContent>
                </Select>
             </div>

             <div className="flex-1 text-left space-y-3 flex flex-col justify-end">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-transparent ml-2 block hidden md:block">.</label>
                <Button
                  onClick={getRecommendations}
                  disabled={isAnalyzing}
                  className="rounded-2xl bg-primary hover:bg-emerald-700 h-14 w-full text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 transition-all active:scale-95"
                >
                  {isAnalyzing ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4 fill-current" />}
                  {isAnalyzing ? t("analyzing") : t("fetchAdvisory")}
                </Button>
             </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-4 items-start">
        <div className="lg:col-span-3 space-y-12">
          {/* Active Alerts */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
               <h2 className="text-2xl font-black tracking-tight flex items-center gap-3 uppercase italic text-slate-800">
                  <AlertTriangle className="h-7 w-7 text-red-600" />
                  {t("activeAlerts")}
               </h2>
               <div className="h-px flex-1 mx-8 bg-slate-200 hidden md:block" />
            </div>
            <div className="grid gap-4">
              {currentData.alerts.length > 0 ? currentData.alerts.map((alert, i) => (
                <motion.div 
                  layout
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="rounded-[2.5rem] border-primary/5 hover:border-red-500/20 transition-all hover:shadow-xl cursor-default group overflow-hidden bg-white">
                    <CardHeader className="p-6 md:p-8 pb-4">
                      <div className="flex justify-between items-start mb-4">
                         <div className="p-4 rounded-2xl bg-red-50 text-red-600 transition-transform group-hover:scale-110 shadow-sm">
                            <ShieldAlert className="h-7 w-7" />
                         </div>
                         <Badge className="rounded-full bg-red-600 text-white border-none font-black text-[10px] uppercase tracking-[0.2em] px-5 py-2 shadow-lg shadow-red-600/20">{alert.risk} risk</Badge>
                      </div>
                      <CardTitle className="text-2xl font-black group-hover:text-red-600 transition-colors leading-tight uppercase italic">{t(`${alert.id}Name`)}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                         <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                         <CardDescription className="text-xs font-black text-red-600 uppercase tracking-widest">{t("actionRequiredLabel")}: {t(`${alert.id}Action`)}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 md:p-8 pt-0">
                       <p className="text-muted-foreground font-medium leading-relaxed italic border-l-4 border-red-100 pl-4 py-2 bg-red-50/30 rounded-r-xl">"{t(`${alert.id}Desc`)}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )) : (
                <div className="p-20 text-center bg-muted/10 rounded-[3rem] border-2 border-dashed border-muted/30">
                   <p className="text-xl font-black text-muted-foreground/30 uppercase italic tracking-widest">Clean Zone - No Threats Detected</p>
                </div>
              )}
            </div>
          </div>

          {/* Expert Strategy */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
               <h2 className="text-2xl font-black tracking-tight flex items-center gap-3 uppercase italic text-slate-800">
                  <Lightbulb className="h-7 w-7 text-amber-500" />
                  {t("expertAiStrategy")}
               </h2>
               <div className="h-px flex-1 mx-8 bg-slate-200 hidden md:block" />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
               {[
                 { title: t("preventionStrategy"), content: currentData.prevention, icon: ShieldCheck, color: "bg-blue-50 text-blue-600", shadow: "shadow-blue-500/10" },
                 { title: t("organicTreatment"), content: currentData.organic, icon: Leaf, color: "bg-emerald-50 text-emerald-600", shadow: "shadow-emerald-500/10" },
                 { title: t("monitoringTips"), content: currentData.monitoring, icon: Eye, color: "bg-amber-50 text-amber-600", shadow: "shadow-amber-500/10" },
                 { title: t("ipmStrategy"), content: currentData.ipm, icon: Activity, color: "bg-indigo-50 text-indigo-600", shadow: "shadow-indigo-500/10" }
               ].map((strat, i) => (
                 <Card key={i} className="rounded-[2.5rem] border-primary/5 p-8 md:p-10 space-y-6 hover:shadow-2xl transition-all h-full bg-white group">
                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-12 group-hover:scale-110", strat.color, strat.shadow)}>
                       <strat.icon className="h-8 w-8" />
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-xl font-black uppercase italic tracking-tight">{strat.title}</h4>
                       <p className="text-sm text-muted-foreground font-medium leading-relaxed italic border-t border-muted/20 pt-4">
                         "{strat.content || "Input field details above to generate specialized strategy"}"
                       </p>
                    </div>
                 </Card>
               ))}
            </div>
          </div>
        </div>

        {/* Sidebar Stats & Library */}
        <aside className="space-y-6 lg:sticky lg:top-24">
          <Card className="rounded-[2.5rem] border-none shadow-2xl bg-slate-900 text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
               <Zap className="h-32 w-32 rotate-12 fill-current text-emerald-500" />
            </div>
            <CardContent className="p-8 space-y-8 relative z-10">
              <div className="space-y-2 text-center">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">{t("totalThreats")}</p>
                 <p className="text-7xl font-black tracking-tighter tabular-nums">{currentData.stats.threats}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-6">
                 <div className="text-center space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40">{t("pests")}</p>
                    <p className="text-3xl font-black text-white">{currentData.stats.pests}</p>
                 </div>
                 <div className="text-center space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40">{t("diseases")}</p>
                    <p className="text-3xl font-black text-white">{currentData.stats.diseases}</p>
                 </div>
              </div>
              <Button 
                onClick={getRecommendations}
                disabled={isAnalyzing}
                className="w-full rounded-2xl h-16 font-black uppercase tracking-[0.2em] bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-xl shadow-emerald-500/20 gap-3"
              >
                {isAnalyzing ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
                {t("fetchAdvisory")}
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-primary/10 shadow-xl p-8 space-y-6 bg-white">
             <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground italic border-b pb-4 flex items-center gap-3">
                <Microscope className="h-5 w-5 text-primary" /> {t("commonPests")}
             </h3>
             <div className="space-y-5 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {currentData.pests.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between group cursor-pointer hover:translate-x-2 transition-transform">
                     <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-xl group-hover:bg-primary/10 transition-colors">{p.icon}</div>
                        <div>
                           <p className="text-xs font-black uppercase italic leading-none group-hover:text-primary transition-colors">{t(`${p.id}Name`)}</p>
                           <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-1">{p.risk} risk</p>
                        </div>
                     </div>
                     <ChevronRight className="h-4 w-4 text-muted-foreground opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all" />
                  </div>
                ))}
             </div>
          </Card>

          <Card className="rounded-[2.5rem] border-primary/10 shadow-xl p-8 space-y-6 bg-white">
             <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground italic border-b pb-4 flex items-center gap-3">
                <FlaskConical className="h-5 w-5 text-emerald-600" /> {t("plantDiseases")}
             </h3>
             <div className="space-y-5 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {currentData.diseases.map((d, idx) => (
                  <div key={idx} className="flex items-center justify-between group cursor-pointer hover:translate-x-2 transition-transform">
                     <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-xl group-hover:bg-emerald-100 transition-colors">{d.icon}</div>
                        <div>
                           <p className="text-xs font-black uppercase italic leading-none group-hover:text-emerald-600 transition-colors">{t(`${d.id}Name`)}</p>
                           <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-1">{d.risk} risk</p>
                        </div>
                     </div>
                     <ChevronRight className="h-4 w-4 text-muted-foreground opacity-20 group-hover:opacity-100 group-hover:text-emerald-600 transition-all" />
                  </div>
                ))}
             </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
