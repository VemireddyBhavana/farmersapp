import { useState, useRef } from "react";
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
  X
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
  const [selectedCrop, setSelectedCrop] = useState("tomato");
  const [weatherCondition, setWeatherCondition] = useState("hot-dry");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const DEFAULT_DATA = {
    alerts: [
      { title: t("lowRiskMonitoring") || "Low Risk: General Monitoring", desc: t("noSpecificThreats") || "No specific threats detected.", action: t("continueInspections") || "Continue inspections." }
    ],
    pests: [{ name: t("noMajorPests") || "No major pests", icon: "✅", desc: t("pestLevelsWithinThreshold") || "Safe levels.", risk: t("low") || "Low" }],
    diseases: [{ name: t("noMajorDiseases") || "No major diseases", icon: "✅", desc: t("cropShowsHealthyGrowth") || "Healthy signs.", risk: t("low") || "Low" }],
    stats: { pests: "0", diseases: "0", threats: "0", alerts: "1" },
    prevention: t("maintainFieldHygiene") || "Maintain hygiene.",
    organic: t("regularMonitoringOrganic") || "Monitor regularly."
  };

  const CROP_DATA: Record<string, any> = {
    tomato: {
      pests: [
        { name: t("pest_fruit_borer"), icon: "🐛", desc: t("pest_fruit_borer_desc"), risk: t("high") },
        { name: t("pest_whitefly"), icon: "🦟", desc: t("pest_whitefly_desc"), risk: t("medium") }
      ],
      diseases: [
        { name: t("dis_early_blight"), icon: "🍂", desc: t("dis_early_blight_desc"), risk: t("high") },
        { name: t("dis_fusarium_wilt"), icon: "🥀", desc: t("dis_fusarium_wilt_desc"), risk: t("medium") }
      ],
      stats: { pests: "2", diseases: "2", threats: "4", alerts: "2" }
    },
    cotton: {
      pests: [
        { name: t("pest_pink_bollworm"), icon: "🐛", desc: t("pest_pink_bollworm_desc"), risk: t("high") },
        { name: t("pest_jassids"), icon: "🦗", desc: t("pest_jassids_desc"), risk: t("medium") }
      ],
      diseases: [
        { name: t("dis_bacterial_blight"), icon: "💧", desc: t("dis_bacterial_blight_desc"), risk: t("medium") },
        { name: t("dis_grey_mildew"), icon: "🌫️", desc: t("dis_grey_mildew_desc"), risk: t("low") }
      ],
      stats: { pests: "2", diseases: "2", threats: "4", alerts: "1" }
    },
    maize: {
      pests: [
        { name: t("pest_fall_armyworm"), icon: "🐛", desc: t("pest_fall_armyworm_desc"), risk: t("high") },
        { name: t("pest_stem_borer"), icon: "🦗", desc: t("pest_stem_borer_desc"), risk: t("medium") }
      ],
      diseases: [
        { name: t("dis_turcicum_blight"), icon: "🍂", desc: t("dis_turcicum_blight_desc"), risk: t("medium") },
        { name: t("dis_downy_mildew"), icon: "🌿", desc: t("dis_downy_mildew_desc"), risk: t("low") }
      ],
      stats: { pests: "2", diseases: "2", threats: "4", alerts: "1" }
    },
    wheat: {
      pests: [
        { name: t("pest_aphids"), icon: "🦟", desc: t("pest_aphids_desc"), risk: t("medium") },
        { name: t("pest_termites"), icon: "🐜", desc: t("pest_termites_desc"), risk: t("low") }
      ],
      diseases: [
        { name: t("dis_yellow_rust"), icon: "🟧", desc: t("dis_yellow_rust_desc"), risk: t("high") },
        { name: t("dis_loose_smut"), icon: "⬛", desc: t("dis_loose_smut_desc"), risk: t("medium") }
      ],
      stats: { pests: "2", diseases: "2", threats: "4", alerts: "2" }
    }
  };

  const [currentData, setCurrentData] = useState(DEFAULT_DATA);
  const [analysisMetrics, setAnalysisMetrics] = useState({ confidence: 0, timestamp: "" });
  const recommendationsRef = useRef<HTMLDivElement>(null);

  const getRecommendations = () => {
    setIsAnalyzing(true);
    setShowRecommendations(false); 
    
    setTimeout(() => {
      const cropInfo = CROP_DATA[selectedCrop] || DEFAULT_DATA;
      const weatherKey = weatherCondition === "hot-dry" ? "hot" : weatherCondition === "humid" ? "rain" : "clear";
      const recKey = `rec_${selectedCrop}_${weatherKey}`;
      
      setCurrentData({
        ...cropInfo,
        alerts: [
          { 
            title: t("expertRecommendation") || "AI Expert Advisory", 
            desc: t(recKey) || t("noSpecificThreats"), 
            action: t("followIpmsGuidelines") || "Follow IPM Guidelines" 
          }
        ],
        prevention: t(`${selectedCrop}Prevention`) || t("maintainFieldHygiene"),
        organic: t(`${selectedCrop}Organic`) || t("regularMonitoringOrganic")
      });

      setAnalysisMetrics({
        confidence: Number((94 + Math.random() * 5).toFixed(1)),
        timestamp: new Date().toLocaleTimeString()
      });
      setIsAnalyzing(false);
      setShowRecommendations(true);
      
      setTimeout(() => {
        recommendationsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            {t("pestsAndDisease")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("pestAdvisoryDesc")}
          </p>
        </div>

        {/* Monitoring Setup */}
        <Card className="bg-card border-border shadow-sm rounded-2xl mb-10 overflow-hidden ring-1 ring-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Eye className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-foreground">{t("fieldInputCenter")}</h3>
            </div>
            
            <div className="grid md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-4 space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">{t("selectYourCrop")}</label>
                <Select value={selectedCrop} onValueChange={(val) => { setSelectedCrop(val); setShowRecommendations(false); }}>
                  <SelectTrigger className="bg-background border-border h-12 rounded-xl focus:ring-primary">
                    <SelectValue placeholder={t("selectCrop")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tomato">{t("tomatoWithScript")}</SelectItem>
                    <SelectItem value="cotton">{t("cottonWithScript")}</SelectItem>
                    <SelectItem value="maize">{t("maizeWithScript")}</SelectItem>
                    <SelectItem value="wheat">{t("wheatWithScript")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-4 space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">{t("currentWeather")}</label>
                <Select value={weatherCondition} onValueChange={(val) => { setWeatherCondition(val); setShowRecommendations(false); }}>
                  <SelectTrigger className="bg-background border-border h-12 rounded-xl focus:ring-primary">
                    <SelectValue placeholder={t("weatherCondition")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot-dry">{t("hotAndDry")}</SelectItem>
                    <SelectItem value="humid">{t("humidAndRainy")}</SelectItem>
                    <SelectItem value="cool">{t("coolAndMoist")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-4">
                <Button 
                  onClick={getRecommendations}
                  disabled={isAnalyzing}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
                >
                  {isAnalyzing ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Zap className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <Bug className="h-4 w-4" />
                  )}
                  {isAnalyzing ? t("analyzingEnv") : t("fetchAdvisory")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <AnimatePresence mode="wait">
          {showRecommendations ? (
            <motion.div
              key={`${selectedCrop}-${weatherCondition}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-10"
              ref={recommendationsRef}
            >
              {/* Active Alerts */}
              <Card className="bg-card border border-destructive/20 shadow-sm rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="h-6 w-6 text-destructive" />
                      <h3 className="text-xl font-bold text-foreground">{t("criticalAlertsFor")} {t(selectedCrop)}</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Badge className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1">
                        <Activity className="h-3 w-3" /> {analysisMetrics.confidence}% {t("aiConfidence")}
                      </Badge>
                      <Badge variant="outline" className="text-muted-foreground border-border font-normal">
                        {t("lastScan")}: {analysisMetrics.timestamp}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {currentData.alerts.map((alert: any, i: number) => (
                      <div key={i} className="bg-card border border-destructive/10 rounded-2xl p-6 relative overflow-hidden group hover:border-destructive/30 transition-all">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-destructive" />
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-destructive/10 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                          </div>
                          <div>
                            <h4 className="font-bold text-destructive mb-1">{alert.title}</h4>
                            <p className="text-muted-foreground text-sm mb-2">{alert.desc}</p>
                            <p className="text-destructive font-bold text-sm flex items-center gap-2">
                              <ShieldCheck className="h-4 w-4" /> {alert.action}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pests & Diseases Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-card border-none shadow-sm rounded-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <Bug className="h-6 w-6 text-destructive" />
                      <h3 className="text-xl font-bold text-foreground">{t("targetPests")}</h3>
                    </div>
                    <div className="space-y-4">
                      {currentData.pests.map((pest: any, i: number) => (
                        <div key={i} className="border border-border rounded-2xl p-6 bg-card hover:shadow-md transition-all">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-4">
                              <div className="h-12 w-12 bg-muted rounded-xl flex items-center justify-center text-2xl">{pest.icon}</div>
                              <div>
                                <h4 className="font-bold text-foreground text-lg">{pest.name}</h4>
                                <p className="text-sm text-muted-foreground">{pest.desc}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className={cn("px-3 py-1", pest.risk === t("high") ? "text-destructive border-destructive/20 bg-destructive/10" : "text-orange-600 border-orange-200 bg-orange-50")}>
                              {pest.risk} {t("risk")}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-none shadow-sm rounded-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <Leaf className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-bold text-foreground">{t("potentialDiseases")}</h3>
                    </div>
                    <div className="space-y-4">
                      {currentData.diseases.map((disease: any, i: number) => (
                        <div key={i} className="border border-border rounded-2xl p-6 bg-card hover:shadow-md transition-all">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-4">
                              <div className="h-12 w-12 bg-muted rounded-xl flex items-center justify-center text-2xl">{disease.icon}</div>
                              <div>
                                <h4 className="font-bold text-foreground text-lg">{disease.name}</h4>
                                <p className="text-sm text-muted-foreground">{disease.desc}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-destructive border-destructive/20 bg-destructive/10 px-3 py-1">
                              {disease.risk}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Recommendations */}
              <Card className="bg-card border-none shadow-sm rounded-2xl overflow-hidden ring-1 ring-primary/10">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <Zap className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">{t("expertAiStrategy")}</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        <h4 className="font-bold text-foreground underline decoration-primary/20">{t("preventionStrategy")}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed italic">
                        "{currentData.prevention}"
                      </p>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <FlaskConical className="h-5 w-5 text-primary" />
                        <h4 className="font-bold text-foreground underline decoration-primary/20">{t("organicTreatment")}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed italic">
                        "{currentData.organic}"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Summary */}
              <Card className="bg-card border-none shadow-sm rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-8 text-primary">
                    <Info className="h-6 w-6" />
                    <h3 className="text-xl font-bold text-foreground">{t("riskAssessmentSummary")}</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: t("pestsIdentified"), value: currentData.stats.pests, bg: "bg-destructive/10", text: "text-destructive" },
                      { label: t("diseaseRisks"), value: currentData.stats.diseases, bg: "bg-orange-500/10", text: "text-orange-600" },
                      { label: t("totalThreats"), value: currentData.stats.threats, bg: "bg-primary/10", text: "text-primary" },
                      { label: t("criticalAlerts"), value: currentData.stats.alerts, bg: "bg-secondary/10", text: "text-secondary" }
                    ].map((stat, i) => (
                      <div key={i} className={cn("rounded-2xl p-6 text-center shadow-sm", stat.bg)}>
                        <div className={cn("text-3xl font-black mb-1", stat.text)}>{stat.value}</div>
                        <div className={cn("text-xs font-bold uppercase tracking-widest opacity-60", stat.text)}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center space-y-4"
            >
              <div className="p-6 bg-primary/10 rounded-full">
                <Bug className="h-12 w-12 text-primary/40" />
              </div>
              <div className="max-w-xs">
                <h4 className="font-bold text-foreground">{t("noAnalysisResults")}</h4>
                <p className="text-sm text-muted-foreground">{t("selectCropDesc")}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
