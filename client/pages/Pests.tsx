import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiShield, FiBug, FiType, FiSearch, FiMapPin, FiArrowRight, 
  FiCheckCircle, FiActivity, FiEye, FiInfo, FiAlertTriangle,
  FiChevronDown, FiDroplet, FiWind, FiZap, FiBox, 
  FiTrendingUp, FiCheck, FiAlertCircle, FiXCircle, FiRefreshCw,
  FiChevronRight, FiNavigation, FiPlay, FiLeaf
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b111a] pb-24">
      {/* Hero Section - Matching Home Index UI */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_rice_field.png"
            alt="Pest Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-6"
          >
            <div className="w-16 h-16 rounded-[2rem] bg-emerald-600 flex items-center justify-center text-white shadow-2xl">
               <FiShield className="text-3xl" />
            </div>
            <div className="space-y-2">
               <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight uppercase italic">
                 {t('pestsAndDisease')}
               </h1>
               <p className="max-w-2xl mx-auto text-lg text-white/80 font-medium italic">
                 {t('pestAdvisoryDesc')}
               </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Stats Section - Matching Home Style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 -mt-24 relative z-20">
          {[
            { label: t("pestsIdentified"), value: currentData.stats.pests, icon: FiBug, color: "text-red-600", bg: "bg-red-100" },
            { label: t("diseaseRisks"), value: currentData.stats.diseases, icon: FiLeaf, color: "text-emerald-600", bg: "bg-emerald-100" },
            { label: t("totalThreats"), value: currentData.stats.threats, icon: FiAlertTriangle, color: "text-amber-600", bg: "bg-amber-100" },
            { label: t("activeAlertsCount"), value: currentData.stats.alerts, icon: FiZap, color: "text-blue-600", bg: "bg-blue-100" }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className="bg-card rounded-[2.5rem] p-8 border border-primary/5 shadow-xl transition-all"
            >
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4", stat.bg, stat.color)}>
                <stat.icon />
              </div>
              <p className="text-4xl font-black text-foreground tabular-nums">{stat.value}</p>
              <p className="font-bold text-slate-500 uppercase tracking-widest text-[10px] mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Input Center - Matching Home Glass Look */}
        <Card className="rounded-[3rem] bg-white dark:bg-slate-900 border-none shadow-2xl p-8 mb-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <FiBug className="text-[12rem] rotate-12" />
          </div>
          <CardContent className="p-0 relative z-10">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-lg">
                  <FiSearch />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic">{t("fieldInputCenter")}</h3>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-[0.2em]">{t("analyzing")}</p>
               </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-end">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t("selectYourCrop")}</label>
                <Select value={selectedCrop} onValueChange={(val) => { setSelectedCrop(val); setIsAnalyzing(false); }}>
                  <SelectTrigger className="h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border-none font-bold text-lg focus:ring-emerald-500">
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

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t("currentWeather")}</label>
                <Select value={weatherCondition} onValueChange={(val) => { setWeatherCondition(val); setIsAnalyzing(false); }}>
                  <SelectTrigger className="h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border-none font-bold text-lg focus:ring-emerald-500">
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
                className="h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-600/20 gap-3"
              >
                {isAnalyzing ? <FiRefreshCw className="animate-spin" /> : <FiZap />}
                {isAnalyzing ? t("analyzing") : t("fetchAdvisory")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts - High Contrast Like Home CTA */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-1 h-10 bg-red-600 rounded-full" />
             <h3 className="text-3xl font-black text-slate-800 dark:text-white uppercase italic">{t("activeAlerts")}</h3>
          </div>

          <div className="grid gap-6">
            {currentData.alerts.length > 0 ? currentData.alerts.map((alert, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-[2.5rem] bg-white dark:bg-slate-900 p-8 border border-red-500/10 shadow-xl flex flex-col md:flex-row gap-8 items-start md:items-center relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 h-full w-2 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-16 h-16 rounded-3xl bg-red-50 dark:bg-red-900/20 text-red-600 flex items-center justify-center text-3xl shrink-0">
                   <FiAlertTriangle />
                </div>
                <div className="flex-1 space-y-2">
                   <div className="flex items-center gap-3">
                      <h4 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">{t(`${alert.id}Name`)}</h4>
                      <Badge className="bg-red-600 text-white border-none px-3 py-1 font-black uppercase text-[10px] tracking-widest">{alert.risk} risk</Badge>
                   </div>
                   <p className="text-slate-500 dark:text-white/60 font-medium italic leading-relaxed">{t(`${alert.id}Desc`)}</p>
                   <div className="pt-4 flex items-center gap-4 text-sm">
                      <span className="font-black text-red-600 uppercase tracking-widest">{t("actionRequiredLabel")}:</span>
                      <span className="font-bold text-slate-700 dark:text-white/80">{t(`${alert.id}Action`)}</span>
                   </div>
                </div>
                <Button className="rounded-full bg-slate-900 text-white px-8 h-12 font-black uppercase text-xs tracking-widest hover:bg-emerald-600 transition-colors">
                   Analyze
                </Button>
              </motion.div>
            )) : (
              <div className="rounded-[3rem] p-20 text-center bg-slate-50 dark:bg-white/5 border-2 border-dashed border-slate-200">
                 <p className="text-xl font-black text-slate-300 uppercase italic">Clean Zone - No Active Alerts</p>
              </div>
            )}
          </div>
        </div>

        {/* Expert AI Strategy - Grid Like Home Features */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-1 h-10 bg-emerald-600 rounded-full" />
             <h3 className="text-3xl font-black text-slate-800 dark:text-white uppercase italic">{t("expertAiStrategy")}</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t("preventionStrategy"), content: currentData.prevention, icon: FiShield, color: "bg-blue-600", shadow: "shadow-blue-500/20" },
              { title: t("organicTreatment"), content: currentData.organic, icon: FiLeaf, color: "bg-emerald-600", shadow: "shadow-emerald-500/20" },
              { title: t("monitoringTips"), content: currentData.monitoring, icon: FiEye, color: "bg-amber-600", shadow: "shadow-amber-500/20" },
              { title: t("ipmStrategy"), content: currentData.ipm, icon: FiActivity, color: "bg-indigo-600", shadow: "shadow-indigo-500/20" }
            ].map((strat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="rounded-[2.5rem] bg-white dark:bg-slate-900 p-8 shadow-xl border border-primary/5 h-full space-y-6 group"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-white shadow-2xl transition-transform group-hover:rotate-12", strat.color, strat.shadow)}>
                   <strat.icon />
                </div>
                <div className="space-y-3">
                   <h4 className="text-lg font-black text-slate-800 dark:text-white uppercase italic">{strat.title}</h4>
                   <p className="text-sm font-medium text-slate-500 dark:text-white/60 leading-relaxed italic">
                     "{strat.content || "Analyze environment for specific guidance"}"
                   </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Library Section - Vertical Tabular List */}
        <div className="grid lg:grid-cols-2 gap-12 pt-16 border-t border-slate-200">
           {[
             { title: t("commonPests"), icon: FiBug, data: currentData.pests, color: "text-red-600" },
             { title: t("plantDiseases"), icon: FiLeaf, data: currentData.diseases, color: "text-emerald-600" }
           ].map((section, i) => ( section.data.length > 0 && 
             <div key={i} className="space-y-8">
                <div className="flex items-center gap-3">
                   <section.icon className={cn("text-3xl", section.color)} />
                   <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic">{section.title}</h3>
                </div>
                <div className="space-y-4">
                   {section.data.map((item, idx) => (
                     <div key={idx} className="rounded-3xl bg-white dark:bg-slate-900 p-6 flex items-center justify-between border border-primary/5 hover:shadow-xl transition-all group">
                        <div className="flex items-center gap-6">
                           <div className="text-4xl group-hover:scale-110 transition-transform">{item.icon}</div>
                           <div>
                              <h4 className="text-lg font-black text-slate-800 dark:text-white uppercase italic">{t(`${item.id}Name`)}</h4>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.risk} Risk Level</p>
                           </div>
                        </div>
                        <FiChevronRight className="text-slate-300 group-hover:translate-x-2 transition-transform" />
                     </div>
                   ))}
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
