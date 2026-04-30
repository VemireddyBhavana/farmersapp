import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, ArrowLeft, Info, CheckCircle2, FlaskRound as Flask, Zap, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { SoilImageUpload } from "@/components/SoilImageUpload";

export default function FertilizerRecommendation() {
  const { t } = useLanguage();
  const [soilType, setSoilType] = useState("");
  const [cropType, setCropType] = useState("");
  const [loading, setLoading] = useState(false);
  const [n, setN] = useState<number | "">("");
  const [p, setP] = useState<number | "">("");
  const [k, setK] = useState<number | "">("");
  const [result, setResult] = useState<{
    npk: string;
    description: string;
    advice: string[];
    organicAlternatives: string[];
    explanation?: string;
  } | null>(null);

  const handleSoilDetected = (data: any) => {
    setSoilType(data.type.toLowerCase());
    setN(data.n);
    setP(data.p);
    setK(data.k);
  };

  const calculateFertilizer = () => {
    setLoading(true);
    
    // Logic Upgrade: Rule-based explanation
    let explanation = "";
    if (n !== "" && n < 80) explanation += "Nitrogen (N) is low, so Urea is recommended. ";
    if (p !== "" && p < 40) explanation += "Phosphorus (P) is low, so DAP is recommended. ";
    if (k !== "" && k < 40) explanation += "Potassium (K) is low, so MOP is recommended. ";
    
    if (!explanation) explanation = "Nutrient levels are balanced. Maintain with organic compost.";

    setTimeout(() => {
      setResult({
        npk: n !== "" ? `${n}:${p}:${k} (Current)` : "120:60:40 (Recommended)",
        description: "Recommended dosage per hectare based on average nutrient uptake for the selected crop and soil.",
        explanation: explanation,
        advice: [
          "Apply 50% of Nitrogen as basal dose during transplanting.",
          "Apply Phosphorus and Potassium full dose as basal.",
          "Apply remaining 50% Nitrogen in two splits at tillering and panicle initiation stages."
        ],
        organicAlternatives: [
          "Vermicompost: 5-10 tons/hectare",
          "Neem Cake: 250 kg/hectare (reduces nitrogen leaching)",
          "Bio-fertilizers: Azospirillum and Phosphobacteria"
        ]
      });
      setLoading(false);
    }, 1500);
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
              <FlaskConical className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black">{t('fertilizerRequirement')}</h1>
              <p className="text-emerald-100 font-medium">{t('fertilizerRequirementDesc')}</p>
            </div>
          </div>
        </div>
        <div className="absolute right-[-5%] bottom-[-20%] opacity-10">
           <FlaskConical className="h-64 w-64 text-white -rotate-12" />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1 space-y-6">
            <SoilImageUpload onSoilDetected={handleSoilDetected} />
            
            <Card className="border-emerald-100 shadow-lg h-fit">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-emerald-800">Nutrient Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">{t('cropType')}</label>
                  <Select value={cropType} onValueChange={setCropType}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectCrop')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paddy">{t('paddy')}</SelectItem>
                      <SelectItem value="wheat">{t('wheat')}</SelectItem>
                      <SelectItem value="maize">{t('maize')}</SelectItem>
                      <SelectItem value="chilling">Chilli</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">{t('soilType')}</label>
                  <Select value={soilType} onValueChange={setSoilType}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectSoil')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black">{t('blackSoil')}</SelectItem>
                      <SelectItem value="red">{t('redSoil')}</SelectItem>
                      <SelectItem value="sandy">{t('sandySoil')}</SelectItem>
                      <SelectItem value="loamy">{t('loamySoil')}</SelectItem>
                      <SelectItem value="clay">Clay Soil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {n !== "" && (
                  <div className="grid grid-cols-3 gap-2 py-2 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="text-center">
                      <p className="text-[8px] font-black text-slate-400 uppercase">N</p>
                      <p className="text-xs font-black text-emerald-600">{n}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] font-black text-slate-400 uppercase">P</p>
                      <p className="text-xs font-black text-emerald-600">{p}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] font-black text-slate-400 uppercase">K</p>
                      <p className="text-xs font-black text-emerald-600">{k}</p>
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold h-12"
                  onClick={calculateFertilizer}
                  disabled={!soilType || !cropType || loading}
                >
                  {loading ? "Analyzing..." : t('calculate')}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {!result && !loading ? (
                <div className="bg-white rounded-[2rem] border-2 border-dashed border-emerald-200 p-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="h-20 w-20 rounded-full bg-purple-50 flex items-center justify-center">
                    <Flask className="h-10 w-10 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-400">Soil Condition Unknown</h3>
                    <p className="text-slate-400 max-w-xs">Provide crop and soil type to get precise fertilizer dosage recommendations.</p>
                  </div>
                </div>
              ) : loading ? (
                <div className="space-y-4">
                  <div className="h-64 w-full bg-purple-50/50 animate-pulse rounded-[2rem]" />
                  <div className="grid grid-cols-2 gap-4">
                     <div className="h-32 bg-slate-100/50 animate-pulse rounded-2xl" />
                     <div className="h-32 bg-slate-100/50 animate-pulse rounded-2xl" />
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <Card className="rounded-[2rem] border-purple-100 bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-xl overflow-hidden relative">
                    <CardContent className="p-8 relative z-10">
                      <div className="flex flex-col items-center text-center">
                        <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80 mb-2">Recommended Dosage</p>
                        <h2 className="text-5xl font-black mb-4">{result.npk}</h2>
                        <p className="text-sm text-purple-100 max-w-md italic opacity-90">{result.description}</p>
                        
                        {result.explanation && (
                          <div className="mt-4 p-3 bg-white/10 rounded-xl border border-white/20 text-xs font-bold italic">
                            {result.explanation}
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <FlaskConical className="absolute right-[-5%] bottom-[-5%] h-48 w-48 opacity-10" />
                  </Card>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="rounded-3xl border-emerald-100 shadow-md">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-black text-emerald-800 flex items-center gap-2">
                          <Zap className="h-5 w-5 text-emerald-500" /> Application Schedule
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {result.advice.map((item, i) => (
                            <li key={i} className="text-xs font-medium flex gap-3 text-slate-600 leading-relaxed">
                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="rounded-3xl border-emerald-100 shadow-md">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-black text-emerald-800 flex items-center gap-2">
                          <ShieldCheck className="h-5 w-5 text-emerald-500" /> Organic Options
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {result.organicAlternatives.map((item, i) => (
                            <li key={i} className="text-xs font-medium flex gap-3 text-slate-600 leading-relaxed">
                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-100 rounded-2xl flex gap-3 italic">
                    <Info className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-purple-800 leading-relaxed font-medium">
                      Note: These are general recommendations. For precise fertilizer management, please refer to your latest Soil Health Card (SHC) report.
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
