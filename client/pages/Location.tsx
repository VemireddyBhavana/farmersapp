import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Tractor, Calendar, Phone, Star, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";

export default function LocationPage() {
    const [searchParams] = useSearchParams();
    const area = searchParams.get("area") || "Chittoor";
    const { t } = useLanguage();

    const mockTractorOwners = [
        {
            id: 1,
            name: "Ramesh Reddy",
            distance: "1.2 km away",
            mobile: "+91 9845X XXXXX",
            experience: "8 years",
            verified: true,
            equipment: ["John Deere 5310", "Rotavator"],
            rating: 4.9,
        },
        {
            id: 2,
            name: "Anil Kumar",
            distance: "2.5 km away",
            mobile: "+91 7412X XXXXX",
            experience: "5 years",
            verified: true,
            equipment: ["Mahindra 275 DI", "Seeder"],
            rating: 4.7,
        },
        {
            id: 3,
            name: "Suresh Babu",
            distance: "4.0 km away",
            mobile: "+91 9123X XXXXX",
            experience: "12 years",
            verified: true,
            equipment: ["Swaraj 855 FE"],
            rating: 4.8,
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/dashboard">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-4xl font-black tracking-tight">{area} Rental Hub</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-red-500" /> Nearby Tractor Owners & Service Centers
                    </p>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Map Visualization (Placeholder) */}
                <div className="lg:col-span-2">
                    <Card className="rounded-[3rem] border-primary/10 overflow-hidden h-[400px] shadow-2xl relative bg-slate-100">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center space-y-4">
                                <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary animate-pulse">
                                    <MapPin className="h-8 w-8" />
                                </div>
                                <p className="font-black text-xl text-primary/40 uppercase tracking-widest">Live Map Visualization</p>
                                <p className="text-muted-foreground text-sm max-w-xs">{area} District Hub - Active Connections Loaded</p>
                            </div>
                        </div>
                        {/* Simulated map points */}
                        <div className="absolute top-1/4 left-1/3 h-4 w-4 bg-primary rounded-full shadow-lg shadow-primary/50" />
                        <div className="absolute top-1/2 right-1/4 h-4 w-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
                        <div className="absolute bottom-1/3 left-1/2 h-4 w-4 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
                    </Card>

                    <div className="mt-8 space-y-6">
                        <h3 className="text-2xl font-black">{t("availableOwners") || "Available Owners"}</h3>
                        <div className="grid gap-4">
                            {mockTractorOwners.map((owner) => (
                                <Card key={owner.id} className="rounded-3xl border-primary/5 hover:border-primary/20 transition-all hover:shadow-xl group overflow-hidden bg-white">
                                    <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-6">
                                            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center text-primary font-black text-xl">
                                                {owner.name[0]}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-lg font-bold">{owner.name}</h4>
                                                    {owner.verified && <ShieldCheck className="h-4 w-4 text-emerald-500" />}
                                                </div>
                                                <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                                    <span className="flex items-center gap-1 text-primary"><Star className="h-3 w-3 fill-primary" /> {owner.rating}</span>
                                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {owner.experience} Exp.</span>
                                                    <span className="flex items-center gap-1 text-red-500"><MapPin className="h-3 w-3" /> {owner.distance}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 w-full md:w-auto">
                                            <Button variant="outline" className="flex-1 md:flex-none rounded-xl font-bold py-6">
                                                <Phone className="h-4 w-4 mr-2" /> {owner.mobile}
                                            </Button>
                                            <Button className="flex-1 md:flex-none rounded-xl font-bold py-6 px-8 shadow-lg shadow-primary/20">
                                                View Details
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <aside className="space-y-8">
                    <Card className="rounded-[2.5rem] bg-primary text-white p-8 border-none overflow-hidden relative shadow-2xl">
                        <div className="relative z-10 space-y-4">
                            <Tractor className="h-12 w-12 opacity-30" />
                            <h3 className="text-2xl font-black">Booking Assistance</h3>
                            <p className="opacity-80 text-sm font-medium leading-relaxed">
                                Call our local district coordinator for direct assistance with multiple equipment bookings in {area}.
                            </p>
                            <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-2xl py-6 font-black text-lg">
                                Talk to Coordinator
                            </Button>
                        </div>
                        <div className="absolute -bottom-10 -right-10 h-64 w-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
                    </Card>

                    <Card className="rounded-[2.5rem] border-primary/10 p-8 space-y-4 shadow-sm bg-muted/20">
                        <h4 className="font-black text-lg flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-emerald-600" /> Safety Standards
                        </h4>
                        <ul className="space-y-4">
                            {[
                                "Verified equipment quality",
                                "Background checked owners",
                                "Secure digital transactions",
                                "On-site support available"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm font-medium text-muted-foreground">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
