import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Sprout, Droplets, ShieldCheck, Info, Calendar, Thermometer, Shovel, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const guides: Record<string, any> = {
    rice: {
        name: "Rice (Paddy)",
        scientificName: "Oryza sativa",
        description: "Rice is the primary staple food for more than half of the world's population. It is a labor-intensive crop that requires high rainfall or irrigation.",
        idealTemp: "20°C - 35°C",
        waterReq: "150cm - 200cm",
        soilType: "Clayey or heavy loamy",
        stages: [
            {
                title: "Seedling Stage",
                days: "Day 1-25",
                icon: Sprout,
                advice: "Ensure the nursery bed is well-drained. Soften the seeds by soaking for 24h before sowing."
            },
            {
                title: "Transplanting",
                days: "Day 25-30",
                icon: Shovel,
                advice: "Plant 2-3 seedlings per hill at a depth of 2-3 cm. Maintain standing water of 2cm."
            },
            {
                title: "Vegetative Phase",
                days: "Day 30-60",
                icon: Droplets,
                advice: "Increase water depth to 5cm. Apply first dose of Nitrogen fertilizer (Urea)."
            },
            {
                title: "Ripening",
                days: "Day 90-120",
                icon: Calendar,
                advice: "Drain the field 10 days before expected harvest to ensure uniform ripening."
            }
        ]
    },
    cotton: {
        name: "Cotton",
        scientificName: "Gossypium",
        description: "Cotton is a major fiber crop. It requires a long frost-free period, plenty of sunshine, and moderate rainfall.",
        idealTemp: "21°C - 30°C",
        waterReq: "50cm - 110cm",
        soilType: "Deep black soil (Regur)",
        stages: [
            {
                title: "Sowing",
                days: "Day 1-10",
                icon: Sprout,
                advice: "Ensure soil moisture is adequate at sowing. Maintain 60-70cm spacing between rows."
            },
            {
                title: "Squaring",
                days: "Day 40-50",
                icon: Thermometer,
                advice: "First floral buds appear. Watch for bollworm activity. Avoid over-watering."
            },
            {
                title: "Flowering",
                days: "Day 60-80",
                icon: Sparkles,
                advice: "Plants need maximum water and nutrients. Apply balanced NPK fertilizer."
            },
            {
                title: "Boll Opening",
                days: "Day 100-140",
                icon: ShieldCheck,
                advice: "Pick the cotton when bolls are fully open. Ensure picking is done in dry weather."
            }
        ]
    },
    pulses: {
        name: "Pulses (Legumes)",
        scientificName: "Fabaceae",
        description: "Pulses are vital for protein and soil health due to their nitrogen-fixing properties.",
        idealTemp: "15°C - 25°C",
        waterReq: "30cm - 50cm",
        soilType: "Well-drained sandy loam",
        stages: [
            {
                title: "Pre-sowing",
                days: "Preparation",
                icon: Shovel,
                advice: "Treat seeds with Rhizobium culture to enhance nitrogen fixation."
            },
            {
                title: "Early Growth",
                days: "Day 15-30",
                icon: Sprout,
                advice: "Perform first weeding. These crops are very sensitive to weed competition initially."
            },
            {
                title: "Flowering",
                days: "Day 45-60",
                icon: Droplets,
                advice: "Avoid water stress during flowering as it can cause significant yield loss."
            },
            {
                title: "Maturity",
                days: "Day 90-110",
                icon: Calendar,
                advice: "Harvest when pods turn brown and seeds rattle inside. Do not over-dry in the sun."
            }
        ]
    }
};

export default function GrowingGuide() {
    const { id } = useParams();
    const guide = guides[id || "rice"];

    if (!guide) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold">Guide not found</h1>
                <Link to="/dashboard" className="text-primary hover:underline mt-4 block">Back to Dashboard</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-8 min-h-screen">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/dashboard">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">{guide.name}</h1>
                    <p className="text-muted-foreground italic">{guide.scientificName}</p>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8 space-y-6">
                    <Card className="rounded-[2.5rem] border-primary/10 overflow-hidden shadow-sm">
                        <CardHeader className="p-8 pb-4">
                            <CardTitle className="text-xl font-bold">Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                {guide.description}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                                <div className="p-4 rounded-2xl bg-muted/50 border border-primary/5 space-y-1">
                                    <div className="flex items-center gap-2 text-primary">
                                        <Thermometer className="h-4 w-4" />
                                        <span className="text-[10px] uppercase font-bold tracking-widest">Ideal Temp</span>
                                    </div>
                                    <p className="font-bold">{guide.idealTemp}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-muted/50 border border-primary/5 space-y-1">
                                    <div className="flex items-center gap-2 text-blue-500">
                                        <Droplets className="h-4 w-4" />
                                        <span className="text-[10px] uppercase font-bold tracking-widest">Water Req</span>
                                    </div>
                                    <p className="font-bold">{guide.waterReq}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-muted/50 border border-primary/5 space-y-1">
                                    <div className="flex items-center gap-2 text-amber-600">
                                        <Shovel className="h-4 w-4" />
                                        <span className="text-[10px] uppercase font-bold tracking-widest">Soil Prefer</span>
                                    </div>
                                    <p className="font-bold text-sm">{guide.soilType}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-black px-2">Growth Phases</h2>
                        <div className="grid gap-4">
                            {guide.stages.map((stage: any, idx: number) => (
                                <motion.div
                                    key={stage.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="glass p-6 rounded-[2rem] border-primary/5 flex flex-col md:flex-row gap-6 relative overflow-hidden"
                                >
                                    <div className="h-16 w-16 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <stage.icon className="h-8 w-8" />
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-bold">{stage.title}</h3>
                                            <Badge variant="outline" className="rounded-full text-[10px]">{stage.days}</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {stage.advice}
                                        </p>
                                    </div>
                                    <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-bl-[4rem] -z-10" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="lg:col-span-4 space-y-6">
                    <Card className="rounded-[2.5rem] border-none bg-gradient-to-br from-primary to-emerald-700 text-primary-foreground shadow-xl">
                        <CardHeader className="p-8 pb-4">
                            <CardTitle className="flex items-center gap-2 text-xl font-bold">
                                <ShieldCheck className="h-5 w-5" /> Smart Protection
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 space-y-6">
                            <p className="text-sm opacity-90 leading-relaxed">
                                Integrated Pest Management (IPM) is crucial for a healthy {guide.name} yield.
                            </p>
                            <div className="space-y-3">
                                <div className="flex gap-3 text-sm font-medium">
                                    <div className="h-1.5 w-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                                    Apply bio-pesticides as first line of defense.
                                </div>
                                <div className="flex gap-3 text-sm font-medium">
                                    <div className="h-1.5 w-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                                    Check for egg masses in early morning.
                                </div>
                            </div>
                            <Link to="/pest-alerts">
                                <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-2xl py-6 h-auto font-bold mt-4">
                                    View Local Pest Alerts
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2.5rem] border-primary/10">
                        <CardHeader className="p-8 pb-4">
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <Info className="h-5 w-5 text-primary" /> Expert Tip
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-0">
                            <p className="text-sm text-muted-foreground italic leading-relaxed">
                                "Timing is everything. For {guide.name}, the first 30 days determine 60% of your final harvest potential. Focus strongly on soil health and initial watering."
                            </p>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
