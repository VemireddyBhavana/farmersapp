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
    { name: "Whiteflies", icon: "🦟", risk: "high", desc: "Tiny white flying insects that cause yellowing leaves", action: "Immediate monitoring and treatment recommended" },
    { name: "Spider Mites", icon: "🕷️", risk: "high", desc: "Microscopic pests that cause stippling on leaves", action: "Immediate monitoring and treatment recommended" },
    { name: "Armyworms", icon: "🐛", risk: "high", desc: "Caterpillars that destroy crops by eating leaves and stems", action: "Immediate monitoring and treatment recommended" },
    { name: "Bollworm", icon: "🐛", risk: "high", desc: "Larvae that bore into bolls and fruits", action: "Immediate monitoring and treatment recommended" },
    { name: "Brown Planthopper", icon: "🦗", risk: "high", desc: "Sucks plant sap and transmits viral diseases", action: "Immediate monitoring and treatment recommended" },
    { name: "Aphids", icon: "🦟", risk: "medium", desc: "Small sap-sucking insects that transmit viruses", action: "Regular monitoring and soap-based spray recommended" },
    { name: "Thrips", icon: "🦟", risk: "low", desc: "Insects that cause scarring and distortion", action: "Check undersides of leaves" }
  ];

  const ALL_DISEASES = [
    { name: "Blight", icon: "🍂", risk: "high", desc: "Fungal disease causing brown spots and wilting", action: "Preventive measures should be taken immediately" },
    { name: "Powdery Mildew", icon: "🌫️", risk: "medium", desc: "White powdery fungal growth on leaves", action: "Improve air circulation" },
    { name: "Root Rot", icon: "💧", risk: "high", desc: "Decay of roots due to excess moisture", action: "Improve drainage immediately" },
    { name: "Mosaic Virus", icon: "🧬", risk: "high", desc: "Viral infection causing mottled leaves", action: "Remove infected plants" },
    { name: "Wilt", icon: "🥀", risk: "high", desc: "Vascular disease causing sudden wilting", action: "Check soil moisture and root health" }
  ];

  const INITIAL_ALERTS = [
    { title: "High Risk: Whiteflies", desc: "Tiny white flying insects that cause yellowing leaves", risk: "high", action: "Immediate monitoring and treatment recommended" },
    { title: "High Risk: Spider Mites", desc: "Microscopic pests that cause stippling on leaves", risk: "high", action: "Immediate monitoring and treatment recommended" },
    { title: "High Risk: Armyworms", desc: "Caterpillars that destroy crops by eating leaves and stems", risk: "high", action: "Immediate monitoring and treatment recommended" },
    { title: "High Risk: Bollworm", desc: "Larvae that bore into bolls and fruits", risk: "high", action: "Immediate monitoring and treatment recommended" },
    { title: "High Risk: Brown Planthopper", desc: "Sucks plant sap and transmits viral diseases", risk: "high", action: "Immediate monitoring and treatment recommended" },
    { title: "High Risk: Blight", desc: "Fungal disease causing brown spots and wilting", risk: "high", action: "Preventive measures should be taken immediately" }
  ];

  const [currentData, setCurrentData] = useState({
    alerts: INITIAL_ALERTS,
    pests: ALL_PESTS.map(p => ({ ...p, risk: t(p.risk) || p.risk })),
    diseases: ALL_DISEASES.map(d => ({ ...d, risk: t(d.risk) || d.risk })),
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
        filteredPests = ALL_PESTS.filter(p => p.name === "Spider Mites");
        filteredDiseases = ALL_DISEASES.filter(d => d.name === "Wilt" || d.name === "Mosaic Virus");
        alerts = [
          { title: "High Risk: Spider Mites", desc: "Microscopic pests that cause stippling on leaves", action: "Immediate monitoring and treatment recommended", risk: "high" },
          { title: "High Risk: Wilt", desc: "Vascular disease causing plant wilting and death", action: "Preventive measures should be taken immediately", risk: "high" },
          { title: "High Risk: Mosaic Virus", desc: "Viral disease causing mottled leaf patterns", action: "Infected plants should be removed to prevent spread", risk: "high" }
        ];
        stats = { pests: "1", diseases: "2", threats: "3", alerts: "3" };
      } else if (selectedCrop === "cotton" && (weatherCondition === "humid" || weatherCondition === "wet-rainy")) {
        filteredPests = [];
        filteredDiseases = [];
        alerts = [];
        stats = { pests: "0", diseases: "0", threats: "0", alerts: "0" };
      } else if (selectedCrop === "banana") {
        filteredPests = ALL_PESTS.filter(p => p.name === "Aphids" || p.name === "Thrips");
        filteredDiseases = ALL_DISEASES.filter(d => d.name === "Wilt" || d.name === "Blight");
        alerts = [
          { title: "High Risk: Panama Disease (Wilt)", desc: "Soil-borne fungal disease affecting banana roots.", action: "Preventive measures should be taken immediately", risk: "high" },
          { title: "High Risk: Blight", desc: "Fungal disease causing brown spots and wilting", action: "Preventive measures should be taken immediately", risk: "high" }
        ];
        stats = { pests: "2", diseases: "2", threats: "4", alerts: "2" };
      } else {
        alerts = INITIAL_ALERTS;
        filteredPests = ALL_PESTS;
        filteredDiseases = ALL_DISEASES;
        stats = { pests: "7", diseases: "5", threats: "12", alerts: "6" };
      }

      // Dynamic Strategy Selection based on BOTH Crop and Weather
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
            {t("pestsAndDisease") || "Pest & Disease Management"}
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {t("pest_management_desc") || "Early warning system for pests and diseases with prevention strategies and treatment recommendations"}
          </p>
        </div>

        {/* Monitoring Setup Card */}
        <Card className="bg-white border-none shadow-sm rounded-2xl mb-12 overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-8">
              <Eye className="h-6 w-6 text-orange-500" />
              <h3 className="text-xl font-bold text-slate-900">{t("fieldInputCenter") || "Monitoring Setup"}</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">{t("selectYourCrop") || "Select Your Crop"}</label>
                <Select value={selectedCrop} onValueChange={(val) => { setSelectedCrop(val); setIsAnalyzing(false); }}>
                  <SelectTrigger className="bg-white border-slate-200 h-12 rounded-xl focus:ring-orange-500 text-slate-700">
                    <SelectValue placeholder={t("selectCrop") || "Select Crop"} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl max-h-[300px]">
                    <SelectItem value="all">{t("allCrops") || "All Crops"}</SelectItem>
                    <SelectItem value="banana">{t("banana") || "Banana"}</SelectItem>
                    <SelectItem value="tomato">{t("tomato") || "Tomato"}</SelectItem>
                    <SelectItem value="cotton">{t("cotton") || "Cotton"}</SelectItem>
                    <SelectItem value="maize">{t("maize") || "Maize"}</SelectItem>
                    <SelectItem value="wheat">{t("wheat") || "Wheat"}</SelectItem>
                    <SelectItem value="pepper">{t("pepper") || "Pepper"}</SelectItem>
                    <SelectItem value="rice">{t("rice") || "Rice"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">{t("currentWeather") || "Current Weather"}</label>
                <Select value={weatherCondition} onValueChange={(val) => { setWeatherCondition(val); setIsAnalyzing(false); }}>
                  <SelectTrigger className="bg-white border-slate-200 h-12 rounded-xl focus:ring-orange-500 text-slate-700">
                    <SelectValue placeholder={t("weatherCondition") || "Weather Condition"} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">{t("allConditions") || "All Conditions"}</SelectItem>
                    <SelectItem value="hot-dry">{t("hotAndDry") || "Hot & Dry"}</SelectItem>
                    <SelectItem value="humid">{t("humid") || "Humid"}</SelectItem>
                    <SelectItem value="wet-rainy">{t("wetRainy") || "Wet/Rainy"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Button 
                  onClick={getRecommendations}
                  className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  {isAnalyzing ? <RefreshCcw className="h-5 w-5 animate-spin" /> : <Bug className="h-5 w-5" />}
                  {isAnalyzing ? "Analyzing..." : t("fetchAdvisory") || "Get Recommendations"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts (Styled exactly as per image) */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h3 className="text-2xl font-bold text-slate-900">{t("activeAlerts") || "Active Alerts"} ({currentData.alerts.length})</h3>
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
                      <h4 className="text-xl font-bold text-red-600">{alert.title}</h4>
                      <p className="text-red-500 font-medium leading-relaxed">{alert.desc}</p>
                      <div className="pt-2">
                        <span className="text-red-800 font-bold">Action Required: </span>
                        <span className="text-red-800 font-medium">{alert.action}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-12 bg-white border border-dashed border-slate-200 rounded-2xl text-center text-slate-400">
                <FileSearch className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No active alerts found for this combination.</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Powered Recommendations Strategy */}
        <div className="space-y-8 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-6 w-6 text-orange-500" />
            <h3 className="text-2xl font-bold text-slate-900">{t("expertAiStrategy") || "AI-Powered Recommendations"}</h3>
          </div>
          
          {currentData.prevention ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: t("preventionStrategy") || "Prevention Strategies", content: currentData.prevention, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
                { title: t("organicTreatment") || "Organic Treatments", content: currentData.organic, icon: Leaf, color: "text-green-600", bg: "bg-green-50" },
                { title: t("monitoringTips") || "Monitoring Tips", content: currentData.monitoring, icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
                { title: t("ipmStrategy") || "Integrated Pest Management", content: currentData.ipm, icon: Stethoscope, color: "text-purple-600", bg: "bg-purple-50" }
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
               Input your field details above and click "Get Recommendations" to generate a tailored pest management strategy using our AI models.
            </div>
          )}
        </div>

        {/* Chemical Warning Banner */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 mb-12">
          <div className="h-14 w-14 rounded-full bg-red-600 flex items-center justify-center shrink-0 shadow-lg shadow-red-200">
            <ShieldAlert className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-1 text-center md:text-left flex-1">
            <h4 className="text-xl font-bold text-red-600">{t("chemicalWarningTitle") || "Chemical Treatment Warning"}</h4>
            <p className="text-sm text-red-700 leading-relaxed">
              Chemical treatments should be used as a last resort. Always wear protective gear and follow the manufacturer's safety instructions.
            </p>
          </div>
          <Button variant="outline" className="border-red-200 text-red-600 font-bold hover:bg-red-100 rounded-xl shrink-0">
            Read Protocols
          </Button>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Pests Identified", value: currentData.stats.pests, icon: Bug, color: "text-red-600", bg: "bg-red-50" },
            { label: "Disease Risks", value: currentData.stats.diseases, icon: Leaf, color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Total Threats", value: currentData.stats.threats, icon: ShieldAlert, color: "text-green-600", bg: "bg-green-50" },
            { label: "Active Alerts", value: currentData.stats.alerts, icon: AlertTriangle, color: "text-blue-600", bg: "bg-blue-50" }
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
              <h3 className="text-2xl font-bold text-slate-900">{t("commonPests") || "Common Pests"}</h3>
            </div>
            <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {currentData.pests.length > 0 ? currentData.pests.map((item, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-stone-50 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.name}</h4>
                      <div className="flex gap-2 mt-1">
                        {item.tags?.map(tag => <span key={tag} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md uppercase">{tag}</span>)}
                      </div>
                    </div>
                  </div>
                  <Badge className={cn("px-2 py-1 rounded-md text-[10px] font-black uppercase", item.risk === "high" || item.risk === t("high") ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600")}>
                    {item.risk === "high" || item.risk === t("high") ? <XCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                    {String(item.risk).toUpperCase()}
                  </Badge>
                </div>
              )) : <div className="p-8 bg-white border border-dashed rounded-2xl text-center text-slate-300">No pests found.</div>}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-green-100 rounded-xl">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{t("plantDiseases") || "Plant Diseases"}</h3>
            </div>
            <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {currentData.diseases.length > 0 ? currentData.diseases.map((item, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-stone-50 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.name}</h4>
                      <div className="flex gap-2 mt-1">
                        {item.tags?.map(tag => <span key={tag} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md uppercase">{tag}</span>)}
                      </div>
                    </div>
                  </div>
                  <Badge className={cn("px-2 py-1 rounded-md text-[10px] font-black uppercase", item.risk === "high" || item.risk === t("high") ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600")}>
                    {item.risk === "high" || item.risk === t("high") ? <XCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                    {String(item.risk).toUpperCase()}
                  </Badge>
                </div>
              )) : <div className="p-8 bg-white border border-dashed rounded-2xl text-center text-slate-300">No diseases found.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
