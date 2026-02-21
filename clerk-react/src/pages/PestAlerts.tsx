import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft, AlertTriangle, Info, Zap, ShieldCheck, Bug, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const alerts = [
    {
        id: 1,
        title: "Rice Blast Alert",
        crop: "Paddy",
        severity: "High",
        location: "Chittoor West",
        date: "Oct 18, 2023",
        symptoms: "Diamond-shaped spots with gray centers on leaves.",
        action: "Spray Tricyclazole 75 WP @ 0.6 g/l of water.",
        color: "bg-red-50 border-red-100 dark:bg-red-950/20 dark:border-red-900/30",
        badge: "bg-red-500 text-white",
        icon: Bug,
    },
    {
        id: 2,
        title: "Fall Armyworm Warning",
        crop: "Maize",
        severity: "Moderate",
        location: "Kuppam Region",
        date: "Oct 19, 2023",
        symptoms: "Ragged holes on leaves and presence of greenish larvae.",
        action: "Apply Neem oil 1500 ppm @ 5 ml/l as a preventive measure.",
        color: "bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30",
        badge: "bg-amber-500 text-white",
        icon: AlertTriangle,
    },
    {
        id: 3,
        title: "Pink Bollworm Detection",
        crop: "Cotton",
        severity: "Low",
        location: "Madanapalle",
        date: "Oct 20, 2023",
        symptoms: "Rosette flowers and entry holes on bolls.",
        action: "Install Pheromone traps @ 5 per acre for monitoring.",
        color: "bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30",
        badge: "bg-blue-500 text-white",
        icon: Zap,
    },
];

export default function PestAlerts() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8 min-h-screen">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/dashboard">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Pest & Disease Alerts</h1>
                    <p className="text-muted-foreground">Stay informed about agricultural threats in your local area</p>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Active Alerts List */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShieldAlert className="h-5 w-5 text-red-500" /> Active Threat Level
                    </h2>

                    <div className="grid gap-6">
                        {alerts.map((alert, idx) => (
                            <motion.div
                                key={alert.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`rounded-[2.5rem] border p-1 md:p-1 overflow-hidden shadow-sm transition-all hover:shadow-md ${alert.color}`}
                            >
                                <div className="p-6 md:p-8 space-y-6">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="space-y-1">
                                            <Badge className={`${alert.badge} border-none font-bold uppercase text-[10px] px-3`}>
                                                {alert.severity} Risk
                                            </Badge>
                                            <h3 className="text-2xl font-black mt-2">{alert.title}</h3>
                                            <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
                                                Targeting: <span className="text-foreground font-bold">{alert.crop}</span> • {alert.location}
                                            </p>
                                        </div>
                                        <div className="h-16 w-16 rounded-3xl bg-white/50 backdrop-blur-md flex items-center justify-center shadow-inner">
                                            <alert.icon className={`h-8 w-8 ${alert.badge.includes('red') ? 'text-red-500' : alert.badge.includes('amber') ? 'text-amber-500' : 'text-blue-500'}`} />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Observable Symptoms</p>
                                            <div className="bg-white/40 p-4 rounded-2xl text-sm border border-white/20">
                                                {alert.symptoms}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] uppercase font-bold text-primary tracking-widest">Recommended Action</p>
                                            <div className="bg-primary/5 p-4 rounded-2xl text-sm border border-primary/10 font-medium">
                                                {alert.action}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex items-center justify-between border-t border-white/20">
                                        <p className="text-xs text-muted-foreground italic">Reported on {alert.date}</p>
                                        <Button variant="ghost" className="rounded-full text-xs font-bold gap-2">
                                            Detailed Management Guide <ShieldCheck className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Insights */}
                <div className="space-y-6">
                    <Card className="rounded-[2.5rem] border-none bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Wind className="h-48 w-48 rotate-45" />
                        </div>
                        <CardHeader className="p-8 pb-4 relative z-10">
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-green-400" /> Prevention Tips
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-4 space-y-6 relative z-10">
                            <div className="space-y-4">
                                {[
                                    "Monitor fields daily during high humidity.",
                                    "Ensure balanced fertilizer application.",
                                    "Remove and destroy infected plant parts.",
                                    "Use resistant varieties for next sowing."
                                ].map((tip, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="mt-1 h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                        <p className="text-sm font-medium text-slate-300 leading-relaxed">{tip}</p>
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full bg-green-600 hover:bg-green-500 text-white border-none rounded-2xl py-6 h-auto font-bold mt-4 shadow-lg shadow-green-900/20">
                                Full Prevention Guide
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2.5rem] border-primary/10 shadow-sm">
                        <CardHeader className="p-8 pb-4 border-b">
                            <CardTitle className="text-lg font-bold">Expert Hotline</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Info className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-bold">Speak to Pathologist</p>
                                    <p className="font-bold">1800-425-1100</p>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Upload a photo of your infected crop to get an instant AI diagnosis and customized treatment plan.
                            </p>
                            <Link to="/ai-assistant">
                                <Button variant="outline" className="w-full rounded-xl py-4 h-auto text-xs font-bold mt-2">
                                    Open Camera AI
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
