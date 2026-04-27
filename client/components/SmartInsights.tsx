import { motion } from "framer-motion";
import { Sprout, CloudSun, MapPin, TrendingUp, Info, ChevronRight, ThermometerSun, Wind, CloudRain, Sun, CloudSnow } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFarmerLocation } from "@/lib/LocationContext";
import { useWeather } from "@/hooks/useWeather";
import { getCropRecommendations } from "@/lib/recommendations";
import { getWeatherAdvisory } from "@/lib/advisory";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

const IconMap: Record<string, any> = {
    ThermometerSun, Wind, CloudRain, Sun, CloudSnow, Info
};

export default function SmartInsights() {
    const { farmerLocation } = useFarmerLocation();
    const { weather, loading: weatherLoading } = useWeather();
    const { t } = useLanguage();

    const recommendations = getCropRecommendations(farmerLocation);
    const advisories = getWeatherAdvisory(farmerLocation, weather);

    if (!farmerLocation.district) return null;

    return (
        <section className="py-24 bg-[#F0F4F2]/50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <Badge className="bg-emerald-100 text-emerald-700 border-none font-black px-4 py-1.5 rounded-full uppercase tracking-tighter">
                            Hyper-Local Intelligence
                        </Badge>
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                            Smart Farming Insights for <span className="text-emerald-600">{farmerLocation.district}</span>
                        </h2>
                        <p className="text-lg text-muted-foreground font-medium">
                            Tailored crop recommendations and weather advisories based on your specific region and current climate conditions.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white rounded-3xl border border-emerald-100 shadow-sm">
                        <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Region</p>
                            <p className="font-bold text-slate-900">{farmerLocation.district}, {farmerLocation.state}</p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Weather Advisory Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="rounded-[2.5rem] border-none shadow-2xl bg-slate-900 text-white overflow-hidden relative h-full">
                            <CardContent className="p-8 relative z-10 space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400">
                                        <CloudSun className="h-8 w-8" />
                                    </div>
                                    {weatherLoading ? (
                                        <div className="h-4 w-20 bg-white/10 animate-pulse rounded-full" />
                                    ) : (
                                        <div className="text-right">
                                            <p className="text-3xl font-black">{weather?.current?.temp}°C</p>
                                            <p className="text-xs font-bold opacity-60 uppercase tracking-widest">{weather?.current?.weather[0]?.description}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-2xl font-black">Weather Advisory</h3>
                                    <div className="space-y-4">
                                        {advisories.map((adv, idx) => {
                                            const Icon = IconMap[adv.icon] || Info;
                                            return (
                                                <div key={idx} className={cn(
                                                    "p-5 rounded-3xl border flex gap-4 transition-all",
                                                    adv.severity === "Critical" ? "bg-red-500/20 border-red-500/30 text-red-200" :
                                                    adv.severity === "Warning" ? "bg-amber-500/20 border-amber-500/30 text-amber-200" :
                                                    "bg-white/5 border-white/10 text-emerald-100"
                                                )}>
                                                    <div className="shrink-0 h-10 w-10 rounded-xl bg-black/20 flex items-center justify-center">
                                                        <Icon className="h-5 w-5" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="font-bold text-sm uppercase tracking-wider">{adv.condition}</p>
                                                        <p className="text-xs font-medium opacity-80 leading-relaxed">{adv.advice}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl py-6 font-black text-sm mt-auto">
                                    Full Weather Report <ChevronRight className="h-4 w-4 ml-2" />
                                </Button>
                            </CardContent>
                            <div className="absolute -bottom-20 -right-20 h-64 w-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
                        </Card>
                    </div>

                    {/* Crop Recommendations */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {recommendations.map((rec, idx) => (
                                <Card key={idx} className="rounded-[2.5rem] border-none shadow-xl bg-white hover:shadow-2xl transition-all group overflow-hidden">
                                    <CardContent className="p-8 space-y-6">
                                        <div className="flex items-start justify-between">
                                            <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                                <Sprout className="h-8 w-8" />
                                            </div>
                                            <Badge className={cn(
                                                "px-4 py-1.5 rounded-full border-none font-black text-[10px] uppercase tracking-widest",
                                                rec.suitability === "High" ? "bg-emerald-100 text-emerald-700" : 
                                                rec.suitability === "Medium" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-700"
                                            )}>
                                                {rec.suitability} Suitability
                                            </Badge>
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="text-2xl font-black text-slate-900">{rec.crop}</h4>
                                            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                                                {rec.reason}
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                                                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Best Sowing Period</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {rec.bestMonths.map((month, i) => (
                                                    <span key={i} className="px-3 py-1 rounded-lg bg-slate-50 text-slate-600 text-[10px] font-black border border-slate-100">
                                                        {month}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <Button variant="ghost" className="w-full text-emerald-600 font-black hover:bg-emerald-50 rounded-xl">
                                            Open Cultivation Guide
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Info Card */}
                            <Card className="rounded-[2.5rem] border-emerald-100 border-2 border-dashed bg-emerald-50/20 p-8 flex flex-col items-center justify-center text-center space-y-4">
                                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
                                    <Info className="h-8 w-8" />
                                </div>
                                <h4 className="text-xl font-black text-emerald-900">Custom Soil Analysis</h4>
                                <p className="text-sm text-emerald-700/60 font-medium">
                                    Want more accuracy? Upload your latest Soil Health Card for personalized advice.
                                </p>
                                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black px-8">
                                    Upload Soil Card
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
