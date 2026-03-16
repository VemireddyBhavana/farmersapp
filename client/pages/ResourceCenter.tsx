import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    ArrowLeft, Sprout, Droplets, Tractor, ShieldCheck, 
    BookOpen, Microscope, Zap, ThermometerSun, Leaf,
    CheckCircle2, Info, ChevronRight, GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";

const RESOURCE_GUIDES = [
    {
        id: "seeds",
        title: "Seed Selection Guide",
        description: "Learn how to choose the right seeds for your soil and climate.",
        icon: Sprout,
        color: "emerald",
        topics: ["Hybrid vs Desi", "Germination Testing", "Storage Tips"]
    },
    {
        id: "fertilizer",
        title: "Fertilizer & Nutrition",
        description: "Optimal nutrient management for maximum crop yield.",
        icon: Droplets,
        color: "blue",
        topics: ["NPK Ratios", "Organic Options", "Soil Testing"]
    },
    {
        id: "machinery",
        title: "Farm Machinery",
        description: "Modern equipment guides for efficient farming operations.",
        icon: Tractor,
        color: "orange",
        topics: ["Tractor Maintenance", "Implements Guide", "Fuel Efficiency"]
    },
    {
        id: "protection",
        title: "Crop Protection",
        description: "Integrated pest management and disease control strategies.",
        icon: ShieldCheck,
        color: "red",
        topics: ["Pest Scouting", "Organic Bio-pesticides", "Sprayer Safety"]
    },
    {
        id: "harvesting",
        title: "Post-Harvest Handling",
        description: "Reduce losses with proper harvesting and storage techniques.",
        icon: Zap,
        color: "amber",
        topics: ["Maturity Indicators", "Cooling & Drying", "Mandi Standards"]
    }
];

export default function AgriResourceCenter() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-[#F8FAF9] pb-20">
            {/* Hero Section */}
            <div className="bg-white border-b border-emerald-100 pt-12 pb-20 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <Link to="/dashboard">
                            <Button variant="ghost" size="sm" className="rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold px-6">
                                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
                            </Button>
                        </Link>
                        <Badge className="bg-emerald-600 text-white border-none py-1.5 px-4 rounded-full font-black tracking-widest uppercase text-[10px]">
                            Educational Platform
                        </Badge>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900">
                            Agri <span className="text-emerald-600">Resource</span> Center
                        </h1>
                        <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                            A global smart farming library providing adaptive knowledge, expert guides, and modern agricultural wisdom.
                        </p>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50 -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -ml-48 -mb-48" />
            </div>

            <div className="container mx-auto px-4 max-w-6xl -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {RESOURCE_GUIDES.map((guide, idx) => (
                        <motion.div
                            key={guide.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="rounded-[2.5rem] border-none shadow-xl hover:shadow-2xl transition-all group overflow-hidden bg-white h-full flex flex-col">
                                <CardContent className="p-8 flex-1">
                                    <div className={`h-16 w-16 rounded-2xl bg-${guide.color}-50 flex items-center justify-center text-${guide.color}-600 mb-6 group-hover:scale-110 transition-transform`}>
                                        <guide.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-3">{guide.title}</h3>
                                    <p className="text-muted-foreground font-medium mb-6 text-sm leading-relaxed">
                                        {guide.description}
                                    </p>
                                    <div className="space-y-3 mb-8">
                                        {guide.topics.map((topic, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                                <div className={`h-1.5 w-1.5 rounded-full bg-${guide.color}-500`} />
                                                {topic}
                                            </div>
                                        ))}
                                    </div>
                                    <Button className={`w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl py-6 font-black text-sm mt-auto`}>
                                        Open Guide <ChevronRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}

                    {/* Certifications Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Card className="rounded-[2.5rem] border-dashed border-2 border-emerald-200 bg-emerald-50/30 p-8 h-full flex flex-col items-center justify-center text-center space-y-6">
                            <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                                <GraduationCap className="h-10 w-10" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-black text-emerald-900">Agri Certification</h3>
                                <p className="text-sm font-medium text-emerald-700/70">
                                    Complete these guides to earn digital recognition for your smart farming skills.
                                </p>
                            </div>
                            <Button variant="outline" className="rounded-2xl border-emerald-200 text-emerald-700 font-bold hover:bg-emerald-100 px-8">
                                Start Learning
                            </Button>
                        </Card>
                    </motion.div>
                </div>

                {/* FAQ / Info Section */}
                <div className="mt-20">
                    <div className="max-w-3xl mx-auto space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-black text-slate-900">Expert Knowledge for Higher Yield</h2>
                            <p className="text-muted-foreground font-medium">
                                Our content is verified by agricultural scientists and progressive farmers worldwide.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {[
                                { q: "How are the guides adapted to my region?", a: "We analyze your location-specific soil data, weather patterns, and local market trends to prioritize relevant knowledge modules." },
                                { q: "Can I access these guides offline?", a: "Yes, once downloaded via our mobile app, all educational guides are available without an internet connection." },
                                { q: "Are there localized language versions?", a: "The Agri Resource Center supports all 10 regional languages with culturally adapted examples and terminology." }
                            ].map((faq, i) => (
                                <div key={i} className="p-6 rounded-3xl bg-white border border-slate-100 space-y-2 hover:border-emerald-200 transition-colors">
                                    <h4 className="font-black text-slate-900 flex items-center gap-2">
                                        <Info className="h-4 w-4 text-emerald-600" />
                                        {faq.q}
                                    </h4>
                                    <p className="text-sm text-muted-foreground font-medium pl-6 leading-relaxed">
                                        {faq.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
