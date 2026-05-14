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
        <CardContent className="p-12 text-center space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-3 text-2xl font-black text-emerald-600 uppercase italic">
              <Search className="h-7 w-7" />
              {t("fieldInputCenter")}
            </div>
            <p className="text-muted-foreground max-w-2xl font-medium">
              {t("analyzing")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto items-end">
             <div className="text-left space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t("selectYourCrop")}</label>
                <Select value={selectedCrop} onValueChange={(val) => { setSelectedCrop(val); setIsAnalyzing(false); }}>
                  <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-none font-bold text-base focus:ring-primary">
                    <SelectValue placeholder={t("selectYourCrop")} />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="all">{t("allCrops")}</SelectItem>
                    <SelectItem value="banana">{t("banana")}</SelectItem>
                    <SelectItem value="tomato">{t("tomato")}</SelectItem>
                    <SelectItem value="cotton">{t("cotton")}</SelectItem>
                  </SelectContent>
                </Select>
             </div>

             <div className="text-left space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t("currentWeather")}</label>
                <Select value={weatherCondition} onValueChange={(val) => { setWeatherCondition(val); setIsAnalyzing(false); }}>
                  <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-none font-bold text-base focus:ring-primary">
                    <SelectValue placeholder={t("currentWeather")} />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="all">{t("allSeasons")}</SelectItem>
                    <SelectItem value="hot-dry">{t("hotAndDry")}</SelectItem>
                    <SelectItem value="humid">{t("humidAndRainy")}</SelectItem>
                  </SelectContent>
                </Select>
             </div>

             <Button
                onClick={getRecommendations}
                disabled={isAnalyzing}
                className="rounded-2xl bg-primary hover:bg-primary/90 h-14 text-base font-black shadow-xl shadow-primary/20 flex items-center gap-3"
              >
                {isAnalyzing ? <RefreshCcw className="h-5 w-5 animate-spin" /> : <Bug className="h-5 w-5" />}
                {isAnalyzing ? t("analyzing") : t("fetchAdvisory")}
              </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-12">
          {/* Active Alerts */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
               <AlertTriangle className="h-8 w-8 text-red-600" />
               {t("activeAlerts")}
            </h2>
            <div className="grid gap-6">
              {currentData.alerts.length > 0 ? currentData.alerts.map((alert, i) => (
                <motion.div 
                  layout
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="rounded-[2.5rem] border-primary/5 hover:border-red-500/20 transition-all hover:shadow-xl cursor-default group overflow-hidden">
                    <CardHeader className="p-8 pb-4">
                      <div className="flex justify-between items-start mb-4">
                         <div className="p-4 rounded-2xl bg-red-100 text-red-600 transition-transform group-hover:scale-110">
                            <ShieldAlert className="h-8 w-8" />
                         </div>
                         <Badge className="rounded-full bg-red-600 text-white border-none font-black text-[10px] uppercase tracking-widest px-4 py-1">{alert.risk} risk</Badge>
                      </div>
                      <CardTitle className="text-2xl font-black group-hover:text-red-600 transition-colors leading-tight uppercase italic">{t(`${alert.id}Name`)}</CardTitle>
                      <CardDescription className="text-sm font-bold text-red-600 mt-1">{t("actionRequiredLabel")}: {t(`${alert.id}Action`)}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                       <p className="text-muted-foreground font-medium leading-relaxed italic">"{t(`${alert.id}Desc`)}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )) : (
                <div className="p-20 text-center bg-muted/20 rounded-[2.5rem] border-2 border-dashed border-muted">
                   <p className="text-lg font-black text-muted-foreground uppercase italic opacity-40">No threats detected in your area</p>
                </div>
              )}
            </div>
          </div>

          {/* Expert Strategy */}
          <div className="space-y-8 pt-8">
            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
               <Lightbulb className="h-8 w-8 text-amber-500" />
               {t("expertAiStrategy")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
               {[
                 { title: t("preventionStrategy"), content: currentData.prevention, icon: ShieldCheck, color: "bg-blue-100 text-blue-600" },
                 { title: t("organicTreatment"), content: currentData.organic, icon: Leaf, color: "bg-emerald-100 text-emerald-600" },
                 { title: t("monitoringTips"), content: currentData.monitoring, icon: Eye, color: "bg-amber-100 text-amber-600" },
                 { title: t("ipmStrategy"), content: currentData.ipm, icon: Activity, color: "bg-indigo-100 text-indigo-600" }
               ].map((strat, i) => (
                 <Card key={i} className="rounded-[2.5rem] border-primary/5 p-8 space-y-6 hover:shadow-lg transition-all h-full">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", strat.color)}>
                       <strat.icon className="h-7 w-7" />
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-xl font-black uppercase italic">{strat.title}</h4>
                       <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">
                         "{strat.content || "Input field details above to generate specialized strategy"}"
                       </p>
                    </div>
                 </Card>
               ))}
            </div>
          </div>
        </div>

        {/* Sidebar Stats & Library */}
        <aside className="space-y-8">
          <Card className="rounded-[2.5rem] border-primary/10 shadow-lg bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4 text-center">
                 <p className="text-xs font-black uppercase tracking-widest text-primary/60">{t("totalThreats")}</p>
                 <p className="text-6xl font-black text-primary tabular-nums">{currentData.stats.threats}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t("pestsIdentified")}</p>
                    <p className="text-2xl font-black">{currentData.stats.pests}</p>
                 </div>
                 <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t("diseaseRisks")}</p>
                    <p className="text-2xl font-black">{currentData.stats.diseases}</p>
                 </div>
              </div>
              <Button className="w-full rounded-2xl h-14 font-black shadow-lg shadow-primary/20">
                 {t("fetchAdvisory")}
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-primary/10 shadow-lg p-8 space-y-6">
             <h3 className="text-lg font-black uppercase italic border-b pb-4 flex items-center gap-2">
                <Microscope className="h-5 w-5 text-primary" /> {t("commonPests")}
             </h3>
             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                {currentData.pests.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-transform">
                     <div className="flex items-center gap-3">
                        <div className="text-2xl">{p.icon}</div>
                        <div>
                           <p className="text-sm font-black uppercase italic leading-none">{t(`${p.id}Name`)}</p>
                           <p className="text-[10px] font-bold text-muted-foreground uppercase">{p.risk} risk</p>
                        </div>
                     </div>
                     <ChevronRight className="h-4 w-4 text-muted-foreground opacity-30 group-hover:opacity-100" />
                  </div>
                ))}
             </div>
          </Card>

          <Card className="rounded-[2.5rem] border-primary/10 shadow-lg p-8 space-y-6">
             <h3 className="text-lg font-black uppercase italic border-b pb-4 flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-emerald-600" /> {t("plantDiseases")}
             </h3>
             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                {currentData.diseases.map((d, idx) => (
                  <div key={idx} className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-transform">
                     <div className="flex items-center gap-3">
                        <div className="text-2xl">{d.icon}</div>
                        <div>
                           <p className="text-sm font-black uppercase italic leading-none">{t(`${d.id}Name`)}</p>
                           <p className="text-[10px] font-bold text-muted-foreground uppercase">{d.risk} risk</p>
                        </div>
                     </div>
                     <ChevronRight className="h-4 w-4 text-muted-foreground opacity-30 group-hover:opacity-100" />
                  </div>
                ))}
             </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
