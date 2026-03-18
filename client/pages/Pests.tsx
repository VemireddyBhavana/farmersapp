import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Bug, Leaf, Search, MapPin, ArrowRight, ArrowLeft, Thermometer, ShieldCheck, Microscope, Camera, Zap, AlertTriangle, Eye, Activity, Droplet, Sprout, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import DiseaseDetection from "@/components/DiseaseDetection";
import { useLanguage } from "@/lib/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const pestData = [
  {
    name: "Aphids",
    risk: "High",
    crops: ["tomato", "cotton", "rice"],
    desc: "Small sap-sucking insects that cause curled leaves and stunted growth.",
    treatment: "High-pressure water spray or Neem oil application.",
    pesticide: "Imidacloprid (0.5ml/L)",
    organic: "Ladybugs (natural predator) or Soap-Water spray."
  },
  {
    name: "Whiteflies",
    risk: "High",
    crops: ["cotton", "Vegetables"],
    desc: "Tiny white flying insects that excrete honeydew, leading to sooty mold.",
    treatment: "Use of yellow sticky traps and removal of host weeds.",
    pesticide: "Acetamiprid (0.4g/L)",
    organic: "Neem based formulations (3000 PPM)."
  },
  {
    name: "Spider Mites",
    risk: "Medium",
    crops: ["cotton", "pulses"],
    desc: "Microscopic pests that cause yellow stippling and webbing on leaf undersides.",
    treatment: "Keep leaves well-hydrated; remove heavily infested parts.",
    pesticide: "Abamectin (1.5ml/L)",
    organic: "Predatory mites or Garlic extract."
  },
  {
    name: "Cutworms",
    risk: "High",
    crops: ["rice", "Corn"],
    desc: "Caterpillars that cut young seedlings at the soil surface during night.",
    treatment: "Manual collection in evenings and tillage after harvest.",
    pesticide: "Chlorpyrifos (2ml/L as soil drench)",
    organic: "Diatomaceous earth around stem bases."
  },
  {
    name: "Thrips",
    risk: "High",
    crops: ["Chilli", "Onion", "cotton"],
    desc: "Slender insects that rasp plant tissue, causing silvering/streaking of leaves.",
    treatment: "Blue sticky traps and overhead irrigation to wash them off.",
    pesticide: "Spinosad (0.5ml/L)",
    organic: "Neem oil or Spinosad-based biological sprays."
  },
  {
    name: "Armyworms",
    risk: "Critical",
    crops: ["Maize", "rice", "Sugarcane"],
    desc: "Caterpillars that march across fields in large numbers, devouring all foliage.",
    treatment: "Deep plowing to destroy pupae; bird perches in fields.",
    pesticide: "Emamectin Benzoate (0.4g/L)",
    organic: "Bacillus thuringiensis (Bt) sprays."
  },
  {
    name: "Bollworm",
    risk: "High",
    crops: ["cotton", "tomato", "pulses"],
    desc: "Larvae that bore into cotton bolls and fruits, causing massive yield loss.",
    treatment: "Use pheromone traps (5/acre); intercropping with marigold.",
    pesticide: "Indoxacarb (0.5ml/L)",
    organic: "NPV (Nuclear Polyhedrosis Virus) @ 250 LE/ha."
  },
  {
    name: "Brown Planthopper",
    risk: "Critical",
    crops: ["rice"],
    desc: "Small brown insects that suck sap at the base of plants, causing 'hopper burn'.",
    treatment: "Ensure 'alley-ways' in paddy fields; drain water periodically.",
    pesticide: "Pymetrozine (0.6g/L)",
    organic: "Metarhizium anisopliae (Fungal drench)."
  },
  {
    name: "Stem Borer",
    risk: "High",
    crops: ["rice", "Maize", "Sugarcane"],
    desc: "Larvae that tunnel inside stems, causing 'dead heart' in young plants.",
    treatment: "Release Trichogramma egg parasites; destroy stubbles after harvest.",
    pesticide: "Chlorantraniliprole (0.4ml/L)",
    organic: "Pheromone traps and light traps."
  },
  {
    name: "Leafhopper",
    risk: "Medium",
    crops: ["rice", "cotton"],
    desc: "Small wedge-shaped insects that cause 'hopper burn' (yellowing of leaf tips).",
    treatment: "Inter-cropping and use of light traps.",
    pesticide: "Buprofezin (1.5g/L)",
    organic: "Beauveria bassiana (Fungal bio-pesticide)."
  }
];

const diseaseData = [
  {
    name: "Powdery Mildew",
    risk: "High",
    crops: ["Vegetables", "pulses"],
    desc: "White flour-like patches on leaves and stems inhibiting photosynthesis.",
    plan: "Regular leaf inspection; ensure balanced nitrogen application.",
    fertilizer: "High Potassium (K) to boost immunity.",
    prevention: "Sulfur dust application before peak humidity."
  },
  {
    name: "Blight (Early/Late)",
    risk: "Critical",
    crops: ["tomato", "rice"],
    desc: "Rapid drying and browning of leaves; can destroy crops in 48 hours.",
    plan: "Remove infected leaves; spray copper-based fungicides immediately.",
    fertilizer: "Zinc-fortified foliar sprays.",
    prevention: "Ensure 3-year crop rotation; use clean planting material."
  },
  {
    name: "Root Rot",
    risk: "High",
    crops: ["Soybean", "pulses", "Vegetables"],
    desc: "Decay of the root system, leading to wilting and death above ground.",
    plan: "Improve field drainage; use Trichoderma viride seed treatment.",
    fertilizer: "Avoid excessive irrigation; use organic manure.",
    prevention: "Solarization of soil before sowing; use resistant varieties."
  },
  {
    name: "Leaf Spot",
    risk: "Medium",
    crops: ["groundnut", "tomato", "cotton"],
    desc: "Small dark spots with yellow halos on leaves. Can lead to premature defoliation.",
    plan: "Spray Mancozeb (2.5g/L) if spots appear on >10% of leaves.",
    fertilizer: "Balanced N-P-K application; Micronutrient sprays.",
    prevention: "Deep summer plowing; destroy crop residues from previous season."
  },
  {
    name: "Rust",
    risk: "Medium",
    crops: ["wheat", "groundnut"],
    desc: "Orange/Red pustules on leaf surface that drain plant nutrients.",
    plan: "Use resistant varieties; monitor closely during high humidity.",
    fertilizer: "Iron and Magnesium supplements.",
    prevention: "Eliminate alternative hosts (weeds) nearby."
  },
  {
    name: "Blast",
    risk: "High",
    crops: ["rice"],
    desc: "Diamond shaped spots on leaves and rot at the neck of grain panicles.",
    plan: "Deep summer plowing; avoid excessive nitrogen late in season.",
    fertilizer: "Silicon-based fertilizers.",
    prevention: "Seed treatment with Tricyclazole."
  },
  {
    name: "Wilt (Fusarium/Verticillium)",
    risk: "Critical",
    crops: ["cotton", "Chilli", "tomato"],
    desc: "Sudden drooping and yellowing followed by permanent wilting of the plant.",
    plan: "Apply bio-control agents like Trichoderma; drench soil with Carbendazim.",
    fertilizer: "Ammonium Nitrate reduction; use Potash.",
    prevention: "Long term crop rotation; field sanitation."
  },
  {
    name: "Mosaic Virus",
    risk: "High",
    crops: ["tomato", "Okra", "Chilli"],
    desc: "Mottled and stunted leaves with yellow/green patterns. Spread by insects.",
    plan: "Immediately remove and burn infected plants. Control vector insects.",
    fertilizer: "Foliar nutrition to sustain plant vigor.",
    prevention: "Control Aphids and Whiteflies; use virus-free seeds."
  }
];

export default function Pests() {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState("");
  const [weather, setWeather] = useState("");
  const [showRecs, setShowRecs] = useState(false);

  const filteredPests = selectedCrop
    ? pestData.filter(p => p.crops.some(c => c.toLowerCase().includes(selectedCrop.toLowerCase())))
    : pestData;

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case "High": return t('riskHigh');
      case "Medium": return t('riskMedium');
      case "Critical": return t('riskCritical');
      default: return risk;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          {t('pestsTitle')}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t('pestsDesc')}
        </p>
      </div>

      {/* Disease Detection Camera Section */}
      <section id="detection" className="scroll-mt-24">
        <DiseaseDetection />
      </section>

      {/* Monitoring Setup Section */}
      <Card className="rounded-[2.5rem] border-primary/10 bg-white shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full opacity-50 -z-0" />
        <CardHeader className="p-8 pb-4 relative z-10">
          <CardTitle className="text-2xl font-black flex items-center gap-3 text-orange-600">
            <Activity className="h-7 w-7" />
            {t('pestRecommendation')}
          </CardTitle>
          <CardDescription>{t('pestRecommendationDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="p-8 relative z-10">
          <div className="grid gap-6 md:grid-cols-3 items-end">
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t('chooseCrop')}</label>
              <Select onValueChange={(val) => { setSelectedCrop(val); setShowRecs(false); }}>
                <SelectTrigger className="rounded-xl border-primary/10 h-14 bg-white font-medium focus:ring-orange-500/20">
                  <SelectValue placeholder={t('chooseCrop')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tomato">{t('tomato')}</SelectItem>
                  <SelectItem value="rice">{t('paddy')}</SelectItem>
                  <SelectItem value="cotton">{t('cotton')}</SelectItem>
                  <SelectItem value="pulses">{t('pulses')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t('weatherCondition')}</label>
              <Select onValueChange={(val) => { setWeather(val); setShowRecs(false); }}>
                <SelectTrigger className="rounded-xl border-primary/10 h-14 bg-white font-medium focus:ring-orange-500/20">
                  <SelectValue placeholder={t('currentWeather')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clear">{t('clearSkies')}</SelectItem>
                  <SelectItem value="rain">{t('highHumidityRainy')}</SelectItem>
                  <SelectItem value="hot">{t('hotDry')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => setShowRecs(true)}
              disabled={!selectedCrop || !weather}
              className="rounded-xl bg-orange-600 hover:bg-orange-700 h-14 font-black flex items-center gap-2 shadow-xl shadow-orange-500/20 transition-all active:scale-95"
            >
              <Bug className="h-5 w-5" />
              {t('analyzeRisks')}
            </Button>
          </div>

          <AnimatePresence>
            {showRecs && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8 pt-8 border-t border-dashed border-orange-100"
              >
                <div className="bg-orange-50/50 rounded-3xl p-8 border border-orange-100">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                          <ShieldAlert className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-orange-900">{t('pestRiskAnalysis')}</h3>
                          <p className="text-sm font-bold text-orange-600 uppercase tracking-tighter">
                            {selectedCrop} • {weather}
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
                          <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">{t('currentRiskLevel')}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={cn(
                              "text-xs px-3 py-1 rounded-full border-none font-black",
                              weather === "rain" || (selectedCrop === "cotton" && weather === "hot") 
                                ? "bg-red-500 text-white" 
                                : weather === "hot" 
                                  ? "bg-orange-500 text-white" 
                                  : "bg-emerald-500 text-white"
                            )}>
                              {weather === "rain" || (selectedCrop === "cotton" && weather === "hot") 
                                ? t('pestRiskCritical') 
                                : weather === "hot" 
                                  ? t('pestRiskHigh') 
                                  : t('pestRiskLow')}
                            </Badge>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
                          <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">{t('recommendation')}</p>
                          <p className="text-sm font-bold flex items-center gap-1">
                            <FlaskConical className="h-4 w-4 text-blue-500" />
                            {weather === "rain" ? t('treatmentPlan') : t('preventiveCare')}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-orange-600" />
                          <h4 className="text-sm font-black uppercase text-orange-900 tracking-wider">
                            {t('tailoredAdvice')}
                          </h4>
                        </div>
                        <p className="text-base font-medium text-orange-800 leading-relaxed bg-white/50 p-6 rounded-2xl border border-orange-100">
                          {t(`rec_${selectedCrop}_${weather}`)}
                        </p>
                      </div>
                    </div>

                    <div className="w-full md:w-64 space-y-4">
                      <div className="aspect-square rounded-3xl bg-white border border-orange-100 p-6 flex flex-col items-center justify-center text-center shadow-sm">
                        <Thermometer className="h-10 w-10 text-orange-600 mb-3" />
                        <p className="text-xs font-black text-muted-foreground uppercase mb-1">{t('weatherAlert')}</p>
                        <p className="text-lg font-black text-orange-950">
                          {weather === 'hot' ? '38°C' : weather === 'rain' ? 'High Humidity' : '24°C'}
                        </p>
                      </div>
                      <Button variant="outline" className="w-full rounded-2xl border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 font-bold border-2">
                        {t('expertAdvice')}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Pest Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <Bug className="h-8 w-8 text-red-600" />
            <h2 className="text-3xl font-black tracking-tight">{t('pestIdentification')}</h2>
          </div>

          <div className="space-y-6">
            {filteredPests.map((pest, i) => (
              <motion.div key={i} layout>
                <Card className="rounded-2xl border-primary/5 shadow-sm hover:shadow-md transition-all overflow-hidden">
                  <div className={cn(
                    "h-1.5 w-full",
                    pest.risk === "High" ? "bg-red-500" : "bg-orange-500"
                  )} />
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{pest.name}</h3>
                        <div className="flex gap-2 mt-1">
                          {pest.crops.map(c => (
                            <Badge key={c} variant="outline" className="text-[10px]">
                              {t(c.toLowerCase()) || c}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge className={cn(
                        "rounded-lg px-3 py-1 border-none",
                        pest.risk === "High" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                      )}>
                        {getRiskLabel(pest.risk)} {t('risk')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium italic">{pest.desc}</p>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3 text-emerald-500" /> {t('treatmentPlan')}
                        </p>
                        <p className="text-xs font-bold leading-tight">{pest.treatment}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-1">
                          <FlaskConical className="h-3 w-3 text-blue-500" /> {t('recommendedPesticide')}
                        </p>
                        <p className="text-xs font-bold leading-tight">{pest.pesticide}</p>
                      </div>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                      <p className="text-[10px] font-black uppercase text-emerald-600 mb-1">{t('organicSolution')}</p>
                      <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">{pest.organic}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Disease Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <Microscope className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-black tracking-tight">{t('diseaseManagement')}</h2>
          </div>

          <div className="space-y-6">
            {diseaseData.map((disease, i) => (
              <motion.div key={i} layout>
                <Card className="rounded-2xl border-primary/5 shadow-sm hover:shadow-md transition-all overflow-hidden border-t-4 border-t-blue-500">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{disease.name}</h3>
                        <div className="flex gap-2 mt-1">
                          {disease.crops.map(c => (
                            <Badge key={c} variant="outline" className="text-[10px]">
                              {t(c.toLowerCase()) || c}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 border-none rounded-lg">{getRiskLabel(disease.risk)}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium italic">{disease.desc}</p>
                    <div className="space-y-3 pt-2">
                      <div className="flex gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-blue-50 flex items-center justify-center">
                          <Sprout className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-muted-foreground">{t('treatmentPlan')}</p>
                          <p className="text-sm font-bold leading-tight">{disease.plan}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-50 flex items-center justify-center">
                          <FlaskConical className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-muted-foreground">{t('fertilizerRec')}</p>
                          <p className="text-sm font-bold leading-tight">{disease.fertilizer}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-orange-50 flex items-center justify-center">
                          <ShieldCheck className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-muted-foreground">{t('preventionSteps')}</p>
                          <p className="text-sm font-bold leading-tight">{disease.prevention}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
