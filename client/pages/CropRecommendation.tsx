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

export default function CropRecommendation() {
  const { t } = useLanguage();
  const [soilType, setSoilType] = useState("");
  const [season, setSeason] = useState("");
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<null | any[]>(null);

  const handleRecommend = () => {
    setLoading(true);
    // Simulate AI Processing
    setTimeout(() => {
      setRecommendations([
        { crop: t('paddy'), yield: "25-30 Qtl/Acre", demand: "High", suitability: "95%" },
        { crop: t('sugarcane'), yield: "350-400 Qtl/Acre", demand: "Medium", suitability: "88%" },
        { crop: t('maize'), yield: "20-25 Qtl/Acre", demand: "High", suitability: "82%" },
      ]);
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
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
          <Card className="md:col-span-1 border-emerald-100 shadow-lg h-fit">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-emerald-800">{t('farmDetails') || "Farm Details"}</CardTitle>
              <CardDescription>{t('enterFarmData') || "Provide soil and location details"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">{t('district')}</label>
                <Input 
                  placeholder={t('selectDistrict')} 
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">{t('soilType')}</label>
                <Select onValueChange={setSoilType}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectSoil')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="black">{t('blackSoil')}</SelectItem>
                    <SelectItem value="red">{t('redSoil')}</SelectItem>
                    <SelectItem value="sandy">{t('sandySoil')}</SelectItem>
                    <SelectItem value="loamy">{t('loamySoil')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">{t('season')}</label>
                <Select onValueChange={setSeason}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectSeason')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kharif">{t('kharif')}</SelectItem>
                    <SelectItem value="rabi">{t('rabi')}</SelectItem>
                    <SelectItem value="zaid">{t('zaid')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold h-12"
                onClick={handleRecommend}
                disabled={!soilType || !season || !district || loading}
              >
                {loading ? "Analyzing..." : t('calculate')}
              </Button>
            </CardContent>
          </Card>

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
                    <CheckCircle2 className="h-6 w-6 text-emerald-500" /> {t('recommendedCrops')}
                  </h2>
                  {recommendations.map((item, idx) => (
                    <Card key={idx} className="overflow-hidden border-emerald-100 hover:border-emerald-500 transition-all group shadow-md hover:shadow-xl">
                      <CardContent className="p-0 flex flex-col sm:flex-row items-stretch">
                        <div className="bg-emerald-50 p-6 flex flex-col items-center justify-center sm:w-32 group-hover:bg-emerald-600 transition-colors">
                          <Sprout className="h-10 w-10 text-emerald-600 group-hover:text-white" />
                        </div>
                        <div className="p-6 flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                          <div className="col-span-1 md:col-span-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('crop')}</p>
                            <h4 className="text-lg font-black text-slate-800">{item.crop}</h4>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('yieldGrowth') || "Exp. Yield"}</p>
                            <p className="font-bold text-emerald-700">{item.yield}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('marketPrice') || "Demand"}</p>
                            <Badge className="bg-emerald-100 text-emerald-700 border-none">{item.demand}</Badge>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('suitability') || "Suitability"}</p>
                             <p className="text-2xl font-black text-emerald-600">{item.suitability}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
