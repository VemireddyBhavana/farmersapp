import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ArrowLeft, MapPin, Tractor, ShieldCheck, Clock, 
    Globe, Landmark, Navigation2, Search, CheckCircle2,
    Phone, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";
import { useFarmerLocation } from "@/lib/LocationContext";
import { cn } from "@/lib/utils";

const COUNTRIES = ["India", "USA", "Brazil", "Vietnam"];
const STATES: Record<string, string[]> = {
    "India": ["Andhra Pradesh", "Punjab", "Maharashtra", "Gujarat", "Karnataka"],
    "USA": ["California", "Iowa", "Texas", "Nebraska"],
    "Brazil": ["Mato Grosso", "Paraná", "Rio Grande do Sul"],
    "Vietnam": ["Đồng Bằng Sông Cửu Long", "Tây Nguyên"]
};
const DISTRICTS: Record<string, string[]> = {
    "Andhra Pradesh": ["Guntur", "Chittoor", "Kurnool", "Anantapur"],
    "Punjab": ["Ludhiana", "Amritsar", "Patiala"],
    "California": ["Fresno", "Tulare", "Monterey", "Kern"],
    "Iowa": ["Des Moines", "Cedar Rapids", "Davenport"]
};

export default function LocationPage() {
    const { t } = useLanguage();
    const { location: farmerLocation, setLocation, detectLocation, isLoading: isDetecting } = useFarmerLocation();
    
    const [selectedCountry, setSelectedCountry] = useState(farmerLocation.country);
    const [selectedState, setSelectedState] = useState(farmerLocation.state);
    const [selectedDistrict, setSelectedDistrict] = useState(farmerLocation.district);

    const handleSaveLocation = () => {
        setLocation({
            country: selectedCountry,
            state: selectedState,
            district: selectedDistrict
        });
    };

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
        }
    ];

    return (
        <div className="min-h-screen bg-[#F8FAF9] pb-20">
            {/* Header */}
            <div className="bg-white border-b border-emerald-100 pt-8 pb-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex items-center gap-4 mb-6">
                        <Link to="/dashboard">
                            <Button variant="ghost" size="icon" className="rounded-full bg-muted/50">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                                <MapPin className="h-8 w-8 text-emerald-600" />
                                {t("globalLocationSystem") || "Global Location System"}
                            </h1>
                            <p className="text-muted-foreground font-bold italic">
                                {t("locationDesc") || "Adapting agriculture intelligence to your region"}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Location Selection */}
                        <Card className="rounded-[2.5rem] border-emerald-100 shadow-xl overflow-hidden bg-white/50 backdrop-blur-sm">
                            <CardContent className="p-8 space-y-8">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600 px-1">Country</label>
                                            <select 
                                                value={selectedCountry}
                                                onChange={(e) => {
                                                    setSelectedCountry(e.target.value);
                                                    setSelectedState("");
                                                    setSelectedDistrict("");
                                                }}
                                                className="w-full h-14 rounded-2xl border-emerald-100 bg-emerald-50/30 px-4 font-bold focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer"
                                            >
                                                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600 px-1">State / Province</label>
                                            <select 
                                                value={selectedState}
                                                onChange={(e) => {
                                                    setSelectedState(e.target.value);
                                                    setSelectedDistrict("");
                                                }}
                                                className="w-full h-14 rounded-2xl border-emerald-100 bg-emerald-50/30 px-4 font-bold focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer"
                                                disabled={!selectedCountry}
                                            >
                                                <option value="">Select State</option>
                                                {(STATES[selectedCountry] || []).map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600 px-1">District / Region</label>
                                            <select 
                                                value={selectedDistrict}
                                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                                className="w-full h-14 rounded-2xl border-emerald-100 bg-emerald-50/30 px-4 font-bold focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer"
                                                disabled={!selectedState}
                                            >
                                                <option value="">Select District</option>
                                                {(DISTRICTS[selectedState] || []).map(d => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4">
                                    <Button 
                                        onClick={handleSaveLocation}
                                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl py-7 font-black text-lg shadow-lg shadow-emerald-500/20"
                                        disabled={!selectedDistrict}
                                    >
                                        <CheckCircle2 className="mr-2 h-5 w-5" />
                                        Update Local Agriculture Data
                                    </Button>
                                    <Button 
                                        onClick={() => detectLocation()}
                                        variant="outline"
                                        className="rounded-2xl py-7 font-bold border-emerald-200 hover:bg-emerald-50"
                                        disabled={isDetecting}
                                    >
                                        <Navigation2 className={cn("mr-2 h-5 w-5", isDetecting && "animate-spin")} />
                                        {isDetecting ? "Detecting..." : "Auto Detect"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Visual Pulse */}
                        <div className="hidden lg:flex flex-col items-center justify-center p-8 space-y-6">
                            <div className="relative">
                                <div className="h-32 w-32 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                    <Globe className="h-16 w-16 animate-[spin_10s_linear_infinite]" />
                                </div>
                                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-black text-slate-900 leading-none">Global Smart Farming</h3>
                                <p className="text-sm font-medium text-muted-foreground max-w-xs mx-auto leading-relaxed">
                                    Your agricultural intelligence is now being synced with the climate, soil, and market data of <span className="text-emerald-600 font-bold">{farmerLocation.district || "your selected region"}</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Localized Insights */}
            <div className="container mx-auto px-4 max-w-6xl mt-12 grid gap-8 lg:grid-cols-3">
                <main className="lg:col-span-2 space-y-12">
                    {/* Active Hub */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black flex items-center gap-3">
                                <Landmark className="h-6 w-6 text-emerald-600" />
                                {farmerLocation.district} Rental Hub
                            </h2>
                            <Badge className="bg-emerald-100 text-emerald-700 font-bold border-none">Active Connections</Badge>
                        </div>
                        
                        <div className="grid gap-6">
                            {mockTractorOwners.map((owner) => (
                                <Card key={owner.id} className="rounded-3xl border-none shadow-sm hover:shadow-md transition-all group overflow-hidden bg-white">
                                    <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-6">
                                            <div className="h-16 w-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-black text-xl">
                                                {owner.name[0]}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-lg font-bold">{owner.name}</h4>
                                                    {owner.verified && <ShieldCheck className="h-4 w-4 text-emerald-500" />}
                                                </div>
                                                <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                                    <span className="flex items-center gap-1 text-emerald-600"><Star className="h-3 w-3 fill-emerald-600" /> {owner.rating}</span>
                                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {owner.experience} Exp.</span>
                                                    <span className="flex items-center gap-1 text-red-500"><MapPin className="h-3 w-3" /> {owner.distance}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 w-full md:w-auto">
                                            <Button variant="outline" className="flex-1 md:flex-none rounded-xl font-bold h-12">
                                                <Phone className="h-4 w-4 mr-2" /> Contact
                                            </Button>
                                            <Button className="flex-1 md:flex-none rounded-xl font-bold h-12 bg-slate-900 border-none">
                                                View Equipment
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                </main>

                <aside className="space-y-8">
                    <Card className="rounded-[2.5rem] bg-emerald-600 text-white p-8 border-none overflow-hidden relative shadow-2xl">
                        <div className="relative z-10 space-y-6">
                            <Tractor className="h-12 w-12 opacity-30" />
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black">Regional Coordinator</h3>
                                <p className="opacity-80 text-sm font-medium leading-relaxed">
                                    Need help with bookings in {farmerLocation.district}? Our local expert is available 24/7.
                                </p>
                            </div>
                            <Button className="w-full bg-white text-emerald-900 hover:bg-white/90 rounded-2xl py-6 font-black text-lg">
                                Call Coordinator
                            </Button>
                        </div>
                        <div className="absolute -bottom-10 -right-10 h-64 w-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
                    </Card>

                    <Card className="rounded-[2.5rem] border-emerald-100 p-8 space-y-6 shadow-sm bg-white">
                        <h4 className="font-black text-lg flex items-center gap-2">
                            <Navigation2 className="h-5 w-5 text-emerald-600" /> Nearby Hubs
                        </h4>
                        <div className="space-y-4">
                            {["Service Center", "Seed Bank", "Mandi"].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group cursor-pointer hover:bg-emerald-50 hover:border-emerald-100 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                                            <Landmark className="h-5 w-5" />
                                        </div>
                                        <p className="font-bold text-sm">{item}</p>
                                    </div>
                                    <ArrowLeft className="h-4 w-4 rotate-180 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </aside>
            </div>
        </div>
    );
}

