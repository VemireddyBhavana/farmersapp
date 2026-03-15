import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, ArrowLeft, Thermometer, Wind, CloudRain, Info, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";

export default function IrrigationCalculator() {
  const { t } = useLanguage();
  const [area, setArea] = useState<string>("1");
  const [soilType, setSoilType] = useState("");
  const [cropType, setCropType] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    waterPerDay: number;
    frequency: string;
    advice: string;
  } | null>(null);

  const calculateIrrigation = () => {
    setLoading(true);
    setTimeout(() => {
      const fArea = parseFloat(area) || 1;
      let baseWater = 5000; // liters per acre
      
      if (soilType === "sandy") baseWater *= 1.3;
      if (soilType === "black") baseWater *= 0.8;
      
      // Highly simplified logic
      setResult({
        waterPerDay: Math.round(baseWater * fArea),
        frequency: soilType === "sandy" ? "Every 2 days" : "Every 4-5 days",
        advice: "Recommend using Drip Irrigation to save up to 40% water."
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
              <Droplets className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black">{t('smartIrrigationCalculator')}</h1>
              <p className="text-emerald-100 font-medium">{t('smartIrrigationCalculatorDesc')}</p>
            </div>
          </div>
        </div>
        <div className="absolute right-[-5%] bottom-[-20%] opacity-10">
           <Droplets className="h-64 w-64 text-white -rotate-12" />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-1 border-emerald-100 shadow-lg h-fit">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-emerald-800">{t('irrigationParameters') || "Irrigation Parameters"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">{t('farmArea')}</label>
                <Input type="number" value={area} onChange={(e) => setArea(e.target.value)} />
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
                <label className="text-sm font-bold text-slate-700">{t('cropType')}</label>
                <Select onValueChange={setCropType}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectCrop')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paddy">{t('paddy')}</SelectItem>
                    <SelectItem value="wheat">{t('wheat')}</SelectItem>
                    <SelectItem value="maize">{t('maize')}</SelectItem>
                    <SelectItem value="cotton">{t('cotton') || "Cotton"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold h-12"
                onClick={calculateIrrigation}
                disabled={!soilType || !cropType || loading}
              >
                {loading ? "Calculating..." : t('calculate')}
              </Button>
            </CardContent>
          </Card>

          <div className="md:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {!result && !loading ? (
                <div className="bg-white rounded-[2rem] border-2 border-dashed border-emerald-200 p-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center">
                    <Droplets className="h-10 w-10 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-400">Ready to Optimize?</h3>
                    <p className="text-slate-400 max-w-xs">Fill in your farm conditions to calculate precise water needs.</p>
                  </div>
                </div>
              ) : loading ? (
                <div className="space-y-4">
                  <div className="h-48 w-full bg-emerald-100/50 animate-pulse rounded-[2rem]" />
                  <div className="h-24 w-full bg-slate-100/50 animate-pulse rounded-2xl" />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <Card className="rounded-[2rem] border-blue-100 bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl overflow-hidden relative">
                    <CardContent className="p-8 relative z-10 flex flex-col items-center text-center">
                      <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80 mb-2">{t('waterRequirement')}</p>
                      <h2 className="text-5xl font-black mb-4">{result.waterPerDay.toLocaleString()} <span className="text-xl opacity-70">L/Day</span></h2>
                      <Badge className="bg-white/20 text-white border-none px-4 py-1 rounded-full text-sm font-black italic">
                        {t('frequency')}: {result.frequency}
                      </Badge>
                    </CardContent>
                    <Droplets className="absolute right-[-5%] bottom-[-5%] h-48 w-48 opacity-10" />
                  </Card>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex flex-col items-center text-center group">
                      <Thermometer className="h-6 w-6 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-[10px] font-black text-slate-400 uppercase">Temp</p>
                      <p className="font-bold">32Â°C</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex flex-col items-center text-center group">
                      <Wind className="h-6 w-6 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-[10px] font-black text-slate-400 uppercase">Humidity</p>
                      <p className="font-bold">65%</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex flex-col items-center text-center group">
                      <CloudRain className="h-6 w-6 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-[10px] font-black text-slate-400 uppercase">Forecast</p>
                      <p className="font-bold">Sunny</p>
                    </div>
                  </div>

                  <Card className="rounded-3xl border-emerald-100 shadow-md">
                    <CardContent className="p-6 flex gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-black text-emerald-800">AI Advice</h4>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">{result.advice}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 italic">
                    <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800 leading-relaxed font-medium">
                      Note: Water requirements can change based on real-time weather fluctuations. We recommend monitoring soil moisture levels manually.
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
