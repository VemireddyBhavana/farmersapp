import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ArrowLeft, Send, Sprout, Info, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { SoilImageUpload } from "@/components/SoilImageUpload";

export default function CropRecommendation() {
  const { t } = useLanguage();
  const [n, setN] = useState("50");
  const [p, setP] = useState("50");
  const [k, setK] = useState("50");
  const [ph, setPh] = useState("6.5");
  const [moisture, setMoisture] = useState("150");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<null | any>(null);

  const handleSoilDetected = (data: any) => {
    if (data.suggested_values) {
      setN(data.suggested_values.n.toString());
      setP(data.suggested_values.p.toString());
      setK(data.suggested_values.k.toString());
      setPh(data.suggested_values.ph.toString());
      setMoisture(data.suggested_values.moisture.toString());
    }
  };

  const handleRecommend = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/soil/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ n, p, k, ph, moisture })
      });
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setLoading(false);
    }
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
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black">{t('smartCropRecommendation')}</h1>
              <p className="text-emerald-100 font-medium">{t('smartCropRecommendationDesc')}</p>
            </div>
          </div>
        </div>
        <div className="absolute right-[-5%] bottom-[-20%] opacity-10">
           <Lightbulb className="h-64 w-64 text-white -rotate-12" />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1 space-y-6">
            <SoilImageUpload onSoilDetected={handleSoilDetected} />
            
            <Card className="border-emerald-100 shadow-lg h-fit">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-emerald-800">{t('farmDetails') || "Farm Details"}</CardTitle>
              <CardDescription>{t('enterFarmData') || "Provide soil and location details"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Nitrogen (N)</label>
                  <Input type="number" value={n} onChange={(e) => setN(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Phosphorus (P)</label>
                  <Input type="number" value={p} onChange={(e) => setP(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Potassium (K)</label>
                  <Input type="number" value={k} onChange={(e) => setK(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">pH Level</label>
                  <Input type="number" step="0.1" value={ph} onChange={(e) => setPh(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Moisture Content</label>
                <Input type="number" value={moisture} onChange={(e) => setMoisture(e.target.value)} />
              </div>
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold h-12"
                onClick={handleRecommend}
                disabled={loading}
              >
                {loading ? "Analyzing Soil..." : "Analyze Soil"}
              </Button>
            </CardContent>
          </Card>
          </div>
          <div className="md:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {!recommendations && !loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-3xl border-2 border-dashed border-emerald-200 p-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Sprout className="h-10 w-10 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-400">{t('waitingForDetails') || "Waiting for Farm Details"}</h3>
                    <p className="text-slate-400 max-w-xs">{t('fillFormDesc') || "Fill in the details to receive AI-powered crop recommendations."}</p>
                  </div>
                </motion.div>
              ) : loading ? (
                <motion.div
                   key="loading"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="space-y-4"
                >
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-24 w-full bg-emerald-100/50 animate-pulse rounded-2xl" />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500" /> Analysis Results
                  </h2>
                  <Card className="rounded-[2rem] border-emerald-100 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-xl overflow-hidden p-8">
                     <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Soil Fertility</p>
                     <h2 className="text-5xl font-black mb-4">{recommendations.fertility_level} Level</h2>
                     <p className="text-sm font-bold italic opacity-90">{recommendations.fertilizer_recommendation}</p>
                  </Card>
                  
                  <div className="grid gap-6">
                    {recommendations.suitable_crops.map((crop: string, idx: number) => (
                      <Card key={idx} className="overflow-hidden border-emerald-100 hover:border-emerald-500 transition-all group shadow-md hover:shadow-xl">
                        <CardContent className="p-0 flex items-center">
                          <div className="bg-emerald-50 p-6 flex flex-col items-center justify-center w-24 group-hover:bg-emerald-600 transition-colors">
                            <Sprout className="h-8 w-8 text-emerald-600 group-hover:text-white" />
                          </div>
                          <div className="p-6 flex-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recommended Crop</p>
                            <h4 className="text-xl font-black text-slate-800">{crop}</h4>
                          </div>
                          <div className="pr-8 text-right">
                             <Badge className="bg-emerald-100 text-emerald-700 border-none font-black">High Suitability</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 italic">
                    <Info className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 leading-relaxed font-medium">
                      Disclaimer: Suggestions are based on regional historical data and generalized soil profiles. We recommend conducting a professional soil test for precise planning.
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
