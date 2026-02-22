import { motion } from "framer-motion";
import { Leaf, Target, Users, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";

export default function About() {
    const { t } = useLanguage();

    return (
        <div className="container mx-auto px-4 py-16 space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                    {t('aboutTitle')}
                </h1>
                <p className="text-muted-foreground text-lg">
                    {t('aboutDesc')}
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <Card className="rounded-[2rem] border-primary/5 bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-950/20">
                    <CardContent className="p-8 space-y-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white">
                            <Target className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">{t('ourMission')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('ourMissionDesc')}
                        </p>
                    </CardContent>
                </Card>

                <Card className="rounded-[2rem] border-primary/5 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20">
                    <CardContent className="p-8 space-y-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white">
                            <Users className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">{t('ourCommunity')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('ourCommunityDesc')}
                        </p>
                    </CardContent>
                </Card>

                <Card className="rounded-[2rem] border-primary/5 bg-gradient-to-br from-amber-50 to-transparent dark:from-amber-950/20">
                    <CardContent className="p-8 space-y-4">
                        <div className="h-12 w-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">{t('ourPromise')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('ourPromiseDesc')}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="glass p-12 rounded-[3rem] border-primary/5 space-y-8">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-black">{t('whyTechSpark')}</h2>
                        <div className="space-y-4">
                            {[
                                t('aiCropDisease'),
                                t('realtimeMarketPricing'),
                                t('smartFarmingCalendar'),
                                t('directGovAccess'),
                                t('communityRental')
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    </div>
                                    <span className="font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <div className="aspect-square rounded-[2rem] overflow-hidden rotate-3 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800"
                                alt="Farming Tech"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 aspect-square w-48 rounded-[2rem] overflow-hidden -rotate-6 shadow-2xl border-4 border-white dark:border-slate-900">
                            <img
                                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=400"
                                alt="Tractor"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
