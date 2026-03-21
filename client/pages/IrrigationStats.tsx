import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Droplets, Power, Activity, Clock, Droplet, AlertTriangle, CheckCircle2, Waves, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/lib/LanguageContext";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function IrrigationStats() {
    const { t } = useLanguage();
    const [isPumpOn, setIsPumpOn] = useState(false);
    const [isAutoMode, setIsAutoMode] = useState(true);
    const [moisture, setMoisture] = useState(65);
    const [waterUsage, setWaterUsage] = useState(1240);

    // Simulate moisture changes
    useEffect(() => {
        const interval = setInterval(() => {
            setMoisture(prev => {
                if (isPumpOn) {
                    return Math.min(prev + 0.5, 85);
                } else {
                    return Math.max(prev - 0.2, 30);
                }
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [isPumpOn]);

    // Auto mode logic
    useEffect(() => {
        if (isAutoMode) {
            if (moisture < 40) setIsPumpOn(true);
            if (moisture > 75) setIsPumpOn(false);
        }
    }, [moisture, isAutoMode]);

    const getMoistureStatus = () => {
        if (moisture < 40) return { label: t('moistureDry'), color: "text-red-500", bg: "bg-red-500" };
        if (moisture > 80) return { label: t('moistureWet'), color: "text-blue-500", bg: "bg-blue-500" };
        return { label: t('moistureOptimal'), color: "text-emerald-500", bg: "bg-emerald-500" };
    };

    const status = getMoistureStatus();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            {/* Header */}
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
                            <h1 className="text-3xl md:text-4xl font-black">{t('smartIrrigation')}</h1>
                            <p className="text-emerald-100 font-medium">{t('smartIrrigationDesc')}</p>
                        </div>
                    </div>
                </div>
                <div className="absolute right-[-5%] bottom-[-20%] opacity-10">
                    <Waves className="h-64 w-64 text-white -rotate-12" />
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Status Card */}
                    <Card className="rounded-[2.5rem] border-emerald-100 shadow-xl overflow-hidden md:col-span-2">
                        <CardHeader className="p-8 pb-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-2xl font-black text-slate-800 dark:text-white">{t('soilMoisture')}</CardTitle>
                                    <CardDescription>{t('liveMeteorologicalData')}</CardDescription>
                                </div>
                                <Badge className={cn("px-4 py-1 rounded-full text-white text-sm font-bold border-none", status.bg)}>
                                    {status.label}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="flex flex-col items-center justify-center py-10 relative">
                                <div className="text-7xl font-black text-slate-900 dark:text-white mb-2 flex items-baseline">
                                    {Math.round(moisture)}
                                    <span className="text-3xl text-slate-400 ml-1">%</span>
                                </div>
                                <div className="w-full max-w-md h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div 
                                        className={cn("h-full rounded-full transition-all duration-1000", status.bg)}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${moisture}%` }}
                                    />
                                </div>
                                <div className="flex justify-between w-full max-w-md mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <span>0% Dry</span>
                                    <span>100% Saturated</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                                        <Droplet className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase">{t('waterUsage')}</p>
                                        <p className="text-xl font-bold">{waterUsage} L</p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
                                        <Clock className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase">{t('lastIrrigated')}</p>
                                        <p className="text-xl font-bold">2h 15m ago</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Control Card */}
                    <div className="space-y-6">
                        <Card className="rounded-[2.5rem] border-emerald-100 shadow-xl overflow-hidden bg-gradient-to-br from-white to-emerald-50/30 dark:from-slate-900 dark:to-emerald-950/10">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-2xl font-black">{t('pumpStatus')}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="font-bold">{t('autoPump')}</p>
                                        <p className="text-xs text-muted-foreground">AI-controlled based on moisture</p>
                                    </div>
                                    <Switch 
                                        checked={isAutoMode} 
                                        onCheckedChange={setIsAutoMode}
                                        className="data-[state=checked]:bg-emerald-600"
                                    />
                                </div>

                                <div className="h-px bg-slate-200 dark:bg-slate-800 w-full" />

                                <div className="flex flex-col items-center gap-6">
                                    <motion.div 
                                        animate={isPumpOn ? { scale: [1, 1.1, 1] } : {}}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className={cn(
                                            "h-32 w-32 rounded-full border-8 flex items-center justify-center transition-all duration-500",
                                            isPumpOn ? "border-emerald-500 shadow-2xl shadow-emerald-500/30 bg-emerald-50" : "border-slate-200 bg-slate-50"
                                        )}
                                    >
                                        <Power className={cn("h-16 w-16", isPumpOn ? "text-emerald-600" : "text-slate-300")} />
                                    </motion.div>
                                    
                                    <Button 
                                        size="lg"
                                        disabled={isAutoMode}
                                        onClick={() => setIsPumpOn(!isPumpOn)}
                                        className={cn(
                                            "w-full h-16 rounded-2xl text-xl font-bold transition-all shadow-xl",
                                            isPumpOn ? "bg-red-500 hover:bg-red-600 shadow-red-500/20" : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
                                        )}
                                    >
                                        {isPumpOn ? t('pumpOff') : t('pumpOn')}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recommendation */}
                        <Card className="rounded-[2.5rem] bg-emerald-600 text-white shadow-xl overflow-hidden border-none p-8">
                           <div className="flex gap-4">
                               <div className="p-3 bg-white/20 rounded-2xl h-fit">
                                   <CheckCircle2 className="h-6 w-6" />
                               </div>
                               <div className="space-y-2">
                                   <h4 className="font-bold text-lg">AI Suggestion</h4>
                                   <p className="text-sm text-emerald-50 leading-relaxed font-medium">
                                       Forecast predicts rain in 6 hours. Automatic mode has paused the next irrigation cycle to save 500L of water.
                                   </p>
                               </div>
                           </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
