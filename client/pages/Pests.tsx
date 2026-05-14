import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiShield, FiBug, FiType, FiSearch, FiMapPin, FiArrowRight, 
  FiCheckCircle, FiActivity, FiEye, FiInfo, FiAlertTriangle,
  FiChevronDown, FiDroplet, FiWind, FiZap, FiBox, 
  FiTrendingUp, FiCheck, FiAlertCircle, FiXCircle, FiRefreshCw,
  FiChevronRight, FiNavigation, FiPlay
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
    <div className="min-h-screen bg-[#f1f2f3] dark:bg-[#0b111a] font-['Open_Sans'] pb-20">
      {/* Exact Header Style from Weather Page */}
      <nav className="bg-[#004d73] shadow-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
             <div className="text-white font-black text-xl tracking-tighter italic flex items-center gap-1">
                Pest<span className="text-[#ffcc00]">&</span>Disease
             </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-white text-[11px] font-bold uppercase tracking-wider">
             <a href="#" className="hover:text-[#ffcc00]">{t("allCrops")}</a>
             <a href="#" className="hover:text-[#ffcc00]">{t("activeAlerts")}</a>
             <a href="#" className="hover:text-[#ffcc00]">{t("organicTreatment")}</a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-8">
           <span className="hover:text-[#004d73] cursor-pointer">{t("home")}</span>
           <FiChevronRight />
           <span className="text-[#004d73]">{t("pestsAndDisease")}</span>
        </div>

        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-[#004d73] dark:text-white mb-4 tracking-tight uppercase italic leading-none">
            {t("pestsAndDisease")}
          </h1>
          <p className="text-sm font-semibold text-slate-500 max-w-2xl dark:text-white/60">
            {t("pestAdvisoryDesc")}
          </p>
        </div>

        {/* Summary Statistics - Matching Weather Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: t("pestsIdentified"), value: currentData.stats.pests, icon: FiBug, color: "text-[#004d73]", bg: "bg-white" },
            { label: t("diseaseRisks"), value: currentData.stats.diseases, icon: FiActivity, color: "text-[#004d73]", bg: "bg-white" },
            { label: t("totalThreats"), value: currentData.stats.threats, icon: FiAlertTriangle, color: "text-[#ef4444]", bg: "bg-white" },
            { label: t("activeAlertsCount"), value: currentData.stats.alerts, icon: FiZap, color: "text-[#ffcc00]", bg: "bg-[#004d73]" }
          ].map((stat, i) => (
            <div key={i} className={cn("rounded-xl p-6 shadow-sm border border-slate-100 dark:border-white/5", stat.bg)}>
              <div className="flex justify-between items-start mb-4">
                 <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center text-lg", i === 3 ? "bg-white/10 text-white" : "bg-slate-50 dark:bg-white/5", stat.color)}>
                    <stat.icon />
                 </div>
                 {i === 3 && <div className="text-[10px] font-black text-[#ffcc00] uppercase tracking-widest">Live</div>}
              </div>
              <div className={cn("text-3xl font-black mb-1", i === 3 ? "text-white" : "text-[#333] dark:text-white")}>{stat.value}</div>
              <div className={cn("text-[10px] font-bold uppercase tracking-widest", i === 3 ? "text-white/60" : "text-slate-400")}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Monitoring Setup Card */}
        <Card className="bg-white dark:bg-slate-900 border-none shadow-sm rounded-xl mb-8 overflow-hidden border border-slate-100 dark:border-white/5">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#004d73] rounded-lg flex items-center justify-center text-white shadow-lg">
                 <FiEye className="text-xl" />
              </div>
              <div>
                 <h3 className="text-lg font-black text-[#004d73] dark:text-white uppercase tracking-tight">{t("fieldInputCenter")}</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Environmental Analysis</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 items-end">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t("selectYourCrop")}</label>
                <Select value={selectedCrop} onValueChange={(val) => { setSelectedCrop(val); setIsAnalyzing(false); }}>
                  <SelectTrigger className="bg-slate-50 dark:bg-white/5 border-none h-12 rounded-lg focus:ring-[#004d73] text-[#333] dark:text-white font-bold">
                    <SelectValue placeholder={t("selectYourCrop")} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl max-h-[300px]">
                    <SelectItem value="all">{t("allCrops")}</SelectItem>
                    <SelectItem value="banana">{t("banana")}</SelectItem>
                    <SelectItem value="tomato">{t("tomato")}</SelectItem>
                    <SelectItem value="cotton">{t("cotton")}</SelectItem>
                    <SelectItem value="maize">{t("maize")}</SelectItem>
                    <SelectItem value="wheat">{t("wheat")}</SelectItem>
                    <SelectItem value="pepper">{t("pepper")}</SelectItem>
                    <SelectItem value="rice">{t("rice")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t("currentWeather")}</label>
                <Select value={weatherCondition} onValueChange={(val) => { setWeatherCondition(val); setIsAnalyzing(false); }}>
                  <SelectTrigger className="bg-slate-50 dark:bg-white/5 border-none h-12 rounded-lg focus:ring-[#004d73] text-[#333] dark:text-white font-bold">
                    <SelectValue placeholder={t("currentWeather")} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">{t("allSeasons")}</SelectItem>
                    <SelectItem value="hot-dry">{t("hotAndDry")}</SelectItem>
                    <SelectItem value="humid">{t("humidAndRainy")}</SelectItem>
                    <SelectItem value="wet-rainy">{t("coolAndMoist")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Button 
                  onClick={getRecommendations}
                  className="w-full h-12 bg-[#004d73] hover:bg-[#003a57] text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg"
                >
                  {isAnalyzing ? <FiRefreshCw className="h-4 w-4 animate-spin" /> : <FiSearch className="h-4 w-4" />}
                  {isAnalyzing ? t("analyzing") : t("fetchAdvisory")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-between mb-8 px-1">
             <div className="flex items-center gap-3">
                <FiAlertTriangle className="text-xl text-[#ef4444]" />
                <h3 className="text-lg font-black text-[#333] dark:text-white uppercase tracking-tight">{t("activeAlerts")}</h3>
             </div>
             <span className="bg-[#ef4444] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{currentData.alerts.length} Detected</span>
          </div>

          <div className="grid gap-4">
            {currentData.alerts.length > 0 ? (
              currentData.alerts.map((alert, i) => (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  className="bg-white dark:bg-slate-900 border-none rounded-xl p-6 shadow-sm border border-slate-100 dark:border-white/5 flex gap-6 group hover:border-[#ef4444]/20 transition-all"
                >
                  <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center text-red-600 text-xl shrink-0 group-hover:scale-110 transition-transform">
                    <FiAlertTriangle />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex justify-between items-start">
                       <h4 className="text-lg font-black text-[#333] dark:text-white leading-none">
                         {t(`${alert.id}Name`)}
                       </h4>
                       <span className="text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-50 dark:bg-red-900/40 px-2 py-0.5 rounded">
                          {t(`${alert.risk}RiskPrefix`)}
                       </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-white/60 leading-relaxed">{t(`${alert.id}Desc`)}</p>
                    <div className="pt-3 flex items-center gap-3 border-t border-slate-50 dark:border-white/5">
                      <span className="text-[10px] font-black text-[#004d73] dark:text-[#ffcc00] uppercase tracking-widest">{t("actionRequiredLabel")}:</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-white/80">{t(`${alert.id}Action`)}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-20 bg-white dark:bg-slate-900 rounded-xl text-center shadow-sm border border-dashed border-slate-200 dark:border-white/10">
                <FiSearch className="h-12 w-12 mx-auto mb-4 text-slate-200" />
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t("noAnalysisResults")}</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Powered Recommendations Strategy */}
        <div className="space-y-8 mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#ffcc00] rounded-lg flex items-center justify-center text-[#004d73] shadow-lg">
               <FiZap className="text-xl" />
            </div>
            <div>
               <h3 className="text-lg font-black text-[#004d73] dark:text-white uppercase tracking-tight">{t("expertAiStrategy")}</h3>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Curated Treatment Plan</p>
            </div>
          </div>
          
          {currentData.prevention ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: t("preventionStrategy"), content: currentData.prevention, icon: FiShield, color: "text-emerald-600", bg: "bg-emerald-50" },
                { title: t("organicTreatment"), content: currentData.organic, icon: FiDroplet, color: "text-blue-600", bg: "bg-blue-50" },
                { title: t("monitoringTips"), content: currentData.monitoring, icon: FiEye, color: "text-[#004d73]", bg: "bg-slate-50" },
                { title: t("ipmStrategy"), content: currentData.ipm, icon: FiActivity, color: "text-[#ffcc00]", bg: "bg-[#004d73]" }
              ].map((strat, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className={cn("bg-white dark:bg-slate-900 rounded-xl p-6 space-y-6 shadow-sm border border-slate-100 dark:border-white/5 h-full group hover:shadow-md transition-all", i === 3 && "bg-[#004d73] border-none")}
                >
                  <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center text-xl transition-transform group-hover:scale-110", i === 3 ? "bg-white/10 text-[#ffcc00]" : strat.bg, strat.color)}>
                    <strat.icon />
                  </div>
                  <div className="space-y-2">
                    <h4 className={cn("text-xs font-black uppercase tracking-widest", i === 3 ? "text-white" : "text-[#004d73]")}>{strat.title}</h4>
                    <p className={cn("text-xs font-bold leading-relaxed italic", i === 3 ? "text-white/80" : "text-slate-500 dark:text-white/60")}>
                      "{strat.content}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-white/10 rounded-xl p-16 text-center shadow-sm">
               <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">{t("inputFieldDetailsPlaceholder")}</p>
            </div>
          )}
        </div>



        {/* Pest Library Section */}
        <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-slate-200 dark:border-white/5">
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8 px-1">
               <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center text-[#004d73] shadow-sm border border-slate-100 dark:border-white/5">
                  <FiBug className="text-xl" />
               </div>
               <div>
                  <h3 className="text-lg font-black text-[#004d73] dark:text-white uppercase tracking-tight">{t("commonPests")}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entomological Database</p>
               </div>
            </div>
            <div className="grid gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {currentData.pests.length > 0 ? currentData.pests.map((item, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 border-none rounded-xl p-4 flex items-center justify-between group shadow-sm border border-slate-100 dark:border-white/5 hover:border-[#004d73]/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-slate-50 dark:bg-white/5 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                    <div>
                      <h4 className="text-sm font-black text-[#333] dark:text-white leading-none mb-1">{t(`${item.id}Name`)}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        {t(`${item.id}Desc`).substring(0, 30)}...
                      </p>
                    </div>
                  </div>
                  <Badge className={cn("px-2 py-1 rounded border-none text-[9px] font-black uppercase tracking-widest", item.risk === "high" ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600")}>
                    {item.risk} risk
                  </Badge>
                </div>
              )) : <div className="p-12 bg-white dark:bg-slate-900 rounded-xl text-center border border-dashed border-slate-200 dark:border-white/10 text-slate-400 text-xs font-bold uppercase">{t("noPestsFound")}</div>}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8 px-1">
               <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100 dark:border-white/5">
                  <FiActivity className="text-xl" />
               </div>
               <div>
                  <h3 className="text-lg font-black text-[#004d73] dark:text-white uppercase tracking-tight">{t("plantDiseases")}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pathology Archive</p>
               </div>
            </div>
            <div className="grid gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {currentData.diseases.length > 0 ? currentData.diseases.map((item, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 border-none rounded-xl p-4 flex items-center justify-between group shadow-sm border border-slate-100 dark:border-white/5 hover:border-emerald-500/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-slate-50 dark:bg-white/5 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                    <div>
                      <h4 className="text-sm font-black text-[#333] dark:text-white leading-none mb-1">{t(`${item.id}Name`)}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        {t(`${item.id}Desc`).substring(0, 30)}...
                      </p>
                    </div>
                  </div>
                  <Badge className={cn("px-2 py-1 rounded border-none text-[9px] font-black uppercase tracking-widest", item.risk === "high" ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600")}>
                    {item.risk} risk
                  </Badge>
                </div>
              )) : <div className="p-12 bg-white dark:bg-slate-900 rounded-xl text-center border border-dashed border-slate-200 dark:border-white/10 text-slate-400 text-xs font-bold uppercase">{t("noDiseasesFound")}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
