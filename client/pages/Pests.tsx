import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  Bug, 
  Leaf, 
  Search, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  Eye, 
  Info, 
  AlertTriangle,
  ChevronDown,
  Droplets,
  Wind,
  Zap,
  FlaskConical,
  Sprout,
  X,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Microscope,
  Stethoscope,
  Lightbulb,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileSearch
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="min-h-screen bg-stone-50 text-slate-900 pb-20 font-sans">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            {t("pestsAndDisease")}
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {t("pestAdvisoryDesc")}
          </p>
        </div>

        {/* Monitoring Setup Card */}
        <Card className="bg-white border-none shadow-sm rounded-2xl mb-12 overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-8">
              <Eye className="h-6 w-6 text-orange-500" />
              <h3 className="text-xl font-bold text-slate-900">{t("fieldInputCenter")}</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">{t("selectYourCrop")}</label>
                <Select value={selectedCrop} onValueChange={(val) => { setSelectedCrop(val); setIsAnalyzing(false); }}>
                  <SelectTrigger className="bg-white border-slate-200 h-12 rounded-xl focus:ring-orange-500 text-slate-700">
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
                <label className="text-sm font-bold text-slate-700 ml-1">{t("currentWeather")}</label>
                <Select value={weatherCondition} onValueChange={(val) => { setWeatherCondition(val); setIsAnalyzing(false); }}>
                  <SelectTrigger className="bg-white border-slate-200 h-12 rounded-xl focus:ring-orange-500 text-slate-700">
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
                  className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  {isAnalyzing ? <RefreshCcw className="h-5 w-5 animate-spin" /> : <Bug className="h-5 w-5" />}
                  {isAnalyzing ? t("analyzing") : t("fetchAdvisory")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h3 className="text-2xl font-bold text-slate-900">{t("activeAlerts")} ({currentData.alerts.length})</h3>
          </div>

          <div className="grid gap-6">
            {currentData.alerts.length > 0 ? (
              currentData.alerts.map((alert, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  className="bg-white border border-red-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex gap-4">
                    <div className="mt-1">
                      <AlertTriangle className="h-6 w-6 text-red-600 shrink-0" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-red-600">
                        {t(`${alert.risk}RiskPrefix`)}: {t(`${alert.id}Name`)}
                      </h4>
                      <p className="text-red-500 font-medium leading-relaxed">{t(`${alert.id}Desc`)}</p>
                      <div className="pt-2">
                        <span className="text-red-800 font-bold">{t("actionRequiredLabel")}: </span>
                        <span className="text-red-800 font-medium">{t(`${alert.id}Action`)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-12 bg-white border border-dashed border-slate-200 rounded-2xl text-center text-slate-400">
                <FileSearch className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>{t("noAnalysisResults")}</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Powered Recommendations Strategy */}
        <div className="space-y-8 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-6 w-6 text-orange-500" />
            <h3 className="text-2xl font-bold text-slate-900">{t("expertAiStrategy")}</h3>
          </div>
          
          {currentData.prevention ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: t("preventionStrategy"), content: currentData.prevention, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
                { title: t("organicTreatment"), content: currentData.organic, icon: Leaf, color: "text-green-600", bg: "bg-green-50" },
                { title: t("monitoringTips"), content: currentData.monitoring, icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
                { title: t("ipmStrategy"), content: currentData.ipm, icon: Stethoscope, color: "text-purple-600", bg: "bg-purple-50" }
              ].map((strat, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-white rounded-2xl p-6 space-y-4 shadow-sm border border-slate-100 h-full"
                >
                  <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", strat.bg)}>
                    <strat.icon className={cn("h-6 w-6", strat.color)} />
                  </div>
                  <h4 className="font-bold text-slate-900">{strat.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed italic">
                    "{strat.content}"
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-stone-50 border border-dashed border-slate-200 rounded-xl p-12 text-center text-slate-400">
               {t("inputFieldDetailsPlaceholder")}
            </div>
          )}
        </div>

        {/* Chemical Warning Banner */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 mb-12">
          <div className="h-14 w-14 rounded-full bg-red-600 flex items-center justify-center shrink-0 shadow-lg shadow-red-200">
            <ShieldAlert className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-1 text-center md:text-left flex-1">
            <h4 className="text-xl font-bold text-red-600">{t("chemicalWarningTitle")}</h4>
            <p className="text-sm text-red-700 leading-relaxed">
              {t("chemicalWarningDesc")}
            </p>
          </div>
          <Button variant="outline" className="border-red-200 text-red-600 font-bold hover:bg-red-100 rounded-xl shrink-0">
            {t("readSafetyProtocols")}
          </Button>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: t("pestsIdentified"), value: currentData.stats.pests, icon: Bug, color: "text-red-600", bg: "bg-red-50" },
            { label: t("diseaseRisks"), value: currentData.stats.diseases, icon: Leaf, color: "text-orange-600", bg: "bg-orange-50" },
            { label: t("totalThreats"), value: currentData.stats.threats, icon: ShieldAlert, color: "text-green-600", bg: "bg-green-50" },
            { label: t("activeAlertsCount"), value: currentData.stats.alerts, icon: AlertTriangle, color: "text-blue-600", bg: "bg-blue-50" }
          ].map((stat, i) => (
            <div key={i} className={cn("rounded-2xl p-6 text-center space-y-2 border border-slate-100", stat.bg)}>
              <div className={cn("mx-auto h-10 w-10 rounded-full flex items-center justify-center bg-white shadow-sm")}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
              <div className={cn("text-3xl font-black", stat.color)}>{stat.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Pest Library Section */}
        <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-slate-200">
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-orange-100 rounded-xl">
                <Bug className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{t("commonPests")}</h3>
            </div>
            <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {currentData.pests.length > 0 ? currentData.pests.map((item, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-stone-50 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-slate-900">{t(`${item.id}Name`)}</h4>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md uppercase tracking-tighter">
                          {t(`${item.id}Desc`).substring(0, 15)}...
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className={cn("px-2 py-1 rounded-md text-[10px] font-black uppercase", item.risk === "high" ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600")}>
                    {item.risk === "high" ? <XCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                    {t(`${item.risk}RiskPrefix`)}
                  </Badge>
                </div>
              )) : <div className="p-8 bg-white border border-dashed rounded-2xl text-center text-slate-300">{t("noPestsFound")}</div>}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-green-100 rounded-xl">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{t("plantDiseases")}</h3>
            </div>
            <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {currentData.diseases.length > 0 ? currentData.diseases.map((item, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-stone-50 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-slate-900">{t(`${item.id}Name`)}</h4>
                      <div className="flex gap-2 mt-1">
                         <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md uppercase tracking-tighter">
                          {t(`${item.id}Desc`).substring(0, 15)}...
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className={cn("px-2 py-1 rounded-md text-[10px] font-black uppercase", item.risk === "high" ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600")}>
                    {item.risk === "high" ? <XCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                    {t(`${item.risk}RiskPrefix`)}
                  </Badge>
                </div>
              )) : <div className="p-8 bg-white border border-dashed rounded-2xl text-center text-slate-300">{t("noDiseasesFound")}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
