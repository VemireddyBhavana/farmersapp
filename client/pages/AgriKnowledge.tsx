import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Leaf, ArrowRight, CheckCircle, Sprout, Droplets, Zap, X, 
    Thermometer, ChevronDown, Calculator, MessageSquare, 
    TrendingUp, Info, Calendar
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

// Hero Image Path (Generated)

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface KnowledgeCard {
    id: string;
    titleKey: string;
    image: string;
    summary?: {
        climate: string;
        water: string;
        harvest: string;
        profit: string;
    };
    bullets: string[];
    category: string;
    stepsPrefix?: string;
    stepCount?: number;
}


const CATEGORY_COLORS: Record<string, string> = {
    Agriculture:  "bg-green-100 text-green-700",
    Fruit:        "bg-red-100 text-red-700",
    Exotic:       "bg-purple-100 text-purple-700",
    Luxury:       "bg-yellow-100 text-yellow-700",
    Medicinal:    "bg-green-100 text-green-700",
    Vegetable:    "bg-orange-100 text-orange-700",
    Grain:        "bg-blue-100 text-blue-700",
};

const KNOWLEDGE_SECTIONS = [
    {
        id: "crops",
        titleKey: "sectionCrops",
        descriptionKey: "sectionCropsDesc",
        icon: Sprout,
        color: "bg-emerald-500",
        cards: [
            { id: "mango", titleKey: "mango", image: "https://images.unsplash.com/photo-1553134834-441801c3c9ef?w=800&q=80", bullets: ["planting", "pruning", "flowering", "fruitDev"], category: "Fruit", stepsPrefix: "mangoStep", stepCount: 10, summary: { climate: "Tropical", water: "Medium", harvest: "4-5 Years", profit: "Legacy" } },
            { id: "avocado", titleKey: "avocado", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80", bullets: ["soilDrainage", "varietySelect", "pollination", "harvesting"], category: "Exotic", stepsPrefix: "avocadoStep", stepCount: 10, summary: { climate: "Mild", water: "Medium", harvest: "3-4 Years", profit: "Top Tier" } },
            { id: "saffron", titleKey: "saffron", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80", bullets: ["cormSelection", "plantingTime", "bloomHarvest", "drying"], category: "Luxury", stepsPrefix: "saffronStep", stepCount: 10, summary: { climate: "Cold/Dry", water: "Low", harvest: "1 Year", profit: "Highest" } },
            { id: "wheat", titleKey: "wheat", image: "https://images.unsplash.com/photo-1501265976582-c1e1b0bbaf63?w=800&q=80", bullets: ["wheatBullet1", "wheatBullet2", "wheatBullet3", "wheatBullet4"], category: "Grain", stepsPrefix: "wheatStep", stepCount: 10, summary: { climate: "Cool", water: "Medium", harvest: "5 Months", profit: "Stable" } },
            { id: "rice", titleKey: "rice", image: "https://images.unsplash.com/photo-1536630596251-b01c332fca73?w=800&q=80", bullets: ["riceBullet1", "riceBullet2", "riceBullet3", "riceBullet4"], category: "Grain", stepsPrefix: "riceStep", stepCount: 10, summary: { climate: "Wet/Humid", water: "Very High", harvest: "4 Months", profit: "Moderate" } },
            { id: "maize", titleKey: "maize", image: "https://images.unsplash.com/photo-1551727041-5b347d65b633?w=800&q=80", bullets: ["maizeBullet1", "maizeBullet2", "maizeBullet3", "maizeBullet4"], category: "Grain", stepsPrefix: "maizeStep", stepCount: 10, summary: { climate: "Warm", water: "Medium", harvest: "4 Months", profit: "High" } },
            { id: "sugarcane", titleKey: "sugarcane", image: "https://images.unsplash.com/photo-1593113638586-5ad01ca63f4c?w=800&q=80", bullets: ["sugarcaneBullet1", "sugarcaneBullet2", "sugarcaneBullet3", "sugarcaneBullet4"], category: "Agriculture", stepsPrefix: "sugarcaneStep", stepCount: 10, summary: { climate: "Tropical", water: "High", harvest: "12 Months", profit: "Very High" } },
            { id: "cotton", titleKey: "cotton", image: "https://images.unsplash.com/photo-1594900572651-460334057884?w=800&q=80", bullets: ["cottonBullet1", "cottonBullet2", "cottonBullet3", "cottonBullet4"], category: "Agriculture", stepsPrefix: "cottonStep", stepCount: 10, summary: { climate: "Hot/Dry", water: "Medium", harvest: "6 Months", profit: "High" } },
            { id: "potato", titleKey: "potato", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80", bullets: ["potatoBullet1", "potatoBullet2", "potatoBullet3", "potatoBullet4"], category: "Vegetable", stepsPrefix: "potatoStep", stepCount: 10, summary: { climate: "Cool", water: "Medium", harvest: "4 Months", profit: "High" } },
            { id: "onion", titleKey: "onion", image: "https://images.unsplash.com/photo-1508747703725-7197771375a0?w=800&q=80", bullets: ["onionBullet1", "onionBullet2", "onionBullet3", "onionBullet4"], category: "Vegetable", stepsPrefix: "onionStep", stepCount: 10, summary: { climate: "Tolerant", water: "Low", harvest: "5 Months", profit: "Stable" } },
            { id: "aloe", titleKey: "aloeVera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=800&q=80", bullets: ["soilPrep", "irrigation", "pestControl", "harvesting"], category: "Medicinal", stepsPrefix: "aloeStep", stepCount: 10, summary: { climate: "Dry/Hot", water: "Low", harvest: "8 Months", profit: "High" } },
        ]
    }
];

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────


function KnowledgeCardItem({ card, onOpen, t }: { card: KnowledgeCard, onOpen: () => void, t: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-3xl transition-all duration-700"
        >
            <div className="relative h-64 overflow-hidden">
                <img src={card.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={card.id} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-6 left-6">
                    <span className={cn("px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl backdrop-blur-md", CATEGORY_COLORS[card.category] || "bg-slate-100 text-slate-700")}>
                        {card.category}
                    </span>
                </div>
            </div>
            <div className="p-8 space-y-6">
                <h4 className="text-2xl font-black text-slate-950 dark:text-white leading-none uppercase italic tracking-tighter">{t(card.titleKey)}</h4>
                <div className="space-y-3">
                    {card.bullets.slice(0, 3).map((b, i) => (
                        <div key={i} className="flex items-start gap-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                            {t(b)}
                        </div>
                    ))}
                </div>
                <button 
                    onClick={onOpen}
                    className="w-full py-4 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white transition-all duration-500 flex items-center justify-center gap-3 group/btn"
                >
                    {t("viewDetails")}
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
}

function DetailModuleOverlay({ card, onClose, t }: { card: KnowledgeCard, onClose: () => void, t: any }) {
    const [expandedStep, setExpandedStep] = useState<number | null>(0);
    const stepsCount = card.stepCount || 10; // Default to 10 as per rules

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "auto"; };
    }, []);

    const navigate = useNavigate();

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-0 md:p-8"
        >
            <motion.div 
                initial={{ y: "100%" }} 
                animate={{ y: 0 }} 
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="relative bg-white dark:bg-slate-900 w-full max-w-7xl h-full md:h-[95vh] md:rounded-[3rem] overflow-hidden flex flex-col shadow-2xl"
            >
                {/* Section 1: Header (Crop Image Banner) */}
                <div className="relative h-[25vh] md:h-[35vh] shrink-0 overflow-hidden">
                    <img src={card.image} className="w-full h-full object-cover" alt={t(card.titleKey)} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    <button 
                        onClick={onClose} 
                        className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all z-50 group"
                    >
                        <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-500" />
                    </button>

                    <div className="absolute bottom-8 left-8 right-8 text-white">
                        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter drop-shadow-xl mb-2">
                            {t(card.titleKey)}
                        </h2>
                        <p className="text-sm md:text-lg font-bold text-emerald-400 uppercase tracking-widest opacity-90 italic">
                            {t("agriHubSubtitle") || "Complete Cultivation Guide"}
                        </p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 dark:bg-slate-950/30">
                    <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-12">
                        
                        {/* Section 2: Quick Summary Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { k: "climate", v: card.summary?.climate || "Tropical", i: Thermometer, c: "text-amber-500", b: "bg-amber-500/5 border-amber-500/10" },
                                { k: "water", v: card.summary?.water || "Medium", i: Droplets, c: "text-blue-500", b: "bg-blue-500/5 border-blue-500/10" },
                                { k: "harvest", v: card.summary?.harvest || "6 Months", i: Calendar, c: "text-emerald-500", b: "bg-emerald-500/5 border-emerald-500/10" },
                                { k: "profit", v: card.summary?.profit || "High", i: Zap, c: "text-violet-500", b: "bg-violet-500/5 border-violet-500/10" },
                            ].map((s, i) => (
                                <div key={i} className={cn("p-6 rounded-[2rem] border flex flex-col items-center gap-2 text-center", s.b)}>
                                    <s.i className={cn("w-6 h-6", s.c)} />
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t(s.k)}</p>
                                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase italic">{t(s.v) || s.v}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Section 3: Step-by-Step Guide (CORE) */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
                                <h4 className="text-2xl font-black text-slate-950 dark:text-white uppercase italic tracking-tighter">Implementation Roadmap</h4>
                                {/* Section 5: Progress Indicator */}
                                <div className="px-6 py-2 rounded-full bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                                    Step {expandedStep !== null ? expandedStep + 1 : 0} of {stepsCount}
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                {Array.from({ length: stepsCount }).map((_, idx) => (
                                    <div key={idx} className={cn(
                                        "border transition-all duration-300 rounded-[2rem] overflow-hidden",
                                        expandedStep === idx ? "border-emerald-500 shadow-xl bg-white dark:bg-slate-900" : "border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50"
                                    )}>
                                        <button 
                                            onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                                            className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className={cn(
                                                    "h-12 w-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all",
                                                    expandedStep === idx ? "bg-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-emerald-100"
                                                )}>
                                                    {idx + 1}
                                                </div>
                                                <h5 className="text-xl md:text-2xl font-black text-slate-950 dark:text-white uppercase italic tracking-tight">
                                                    {t(`${card.stepsPrefix}${idx + 1}Title`) || `Process Stage ${idx + 1}`}
                                                </h5>
                                            </div>
                                            <ChevronDown className={cn("h-6 w-6 text-slate-400 transition-transform duration-300", expandedStep === idx && "rotate-180")} />
                                        </button>
                                        
                                        <AnimatePresence>
                                            {expandedStep === idx && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }} 
                                                    animate={{ height: "auto", opacity: 1 }} 
                                                    exit={{ height: 0, opacity: 0 }} 
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-6 md:px-8 pb-8 pt-2 space-y-8">
                                                        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-bold leading-relaxed max-w-3xl border-l-4 border-emerald-500/20 pl-6 italic">
                                                            {t(`${card.stepsPrefix}${idx + 1}Body`) || "Learn the scientific methods for this specific agricultural phase to maximize your yields and ensure quality."}
                                                        </p>

                                                        {/* Step Cards Grid */}
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                                            {/* Farmer Tip Card */}
                                                            <div className="bg-emerald-50 dark:bg-emerald-500/10 p-8 rounded-[2rem] border border-emerald-100 dark:border-emerald-500/20 space-y-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                                                                        <Info className="h-5 w-5 text-white" />
                                                                    </div>
                                                                    <h6 className="font-black text-emerald-900 dark:text-emerald-400 text-sm uppercase tracking-widest italic">Farmer Tip</h6>
                                                                </div>
                                                                <p className="text-emerald-800 dark:text-emerald-200 font-bold leading-relaxed italic">
                                                                    {t(`${card.stepsPrefix}${idx + 1}Tip`) || "Consider local soil conditions and moisture levels before starting this phase."}
                                                                </p>
                                                            </div>

                                                            {/* Best Practices Card */}
                                                            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 space-y-6">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-10 w-10 rounded-xl bg-slate-950 dark:bg-white flex items-center justify-center">
                                                                        <CheckCircle className="h-5 w-5 text-white dark:text-slate-950" />
                                                                    </div>
                                                                    <h6 className="font-black text-slate-950 dark:text-white text-sm uppercase tracking-widest italic">Best Practices</h6>
                                                                </div>
                                                                <ul className="space-y-3">
                                                                    {[1, 2, 3].map((b) => (
                                                                        <li key={b} className="flex items-start gap-3 text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight italic">
                                                                            <Sprout className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                                                            {t(`${card.stepsPrefix}${idx + 1}Bullet${b}`) || `Detailed practice guide ${b} for this specific stage.`}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section 6: Final Actions (Bottom CTAs) */}
                        <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
                            <h4 className="text-2xl font-black text-slate-950 dark:text-white uppercase italic tracking-tighter mb-8 text-center">Next Strategic steps</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <button 
                                    onClick={() => navigate("/market-place")}
                                    className="h-16 bg-slate-100 dark:bg-slate-800 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                                >
                                    <TrendingUp className="h-5 w-5" />
                                    Check Market Prices
                                </button>
                                <button 
                                    onClick={() => navigate("/finance")}
                                    className="h-16 bg-slate-100 dark:bg-slate-800 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                                >
                                    <Calculator className="h-5 w-5" />
                                    Calculate Profit
                                </button>
                                <button 
                                    onClick={() => navigate("/crop-doctor")}
                                    className="h-16 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-white transition-all shadow-2xl"
                                >
                                    <MessageSquare className="h-5 w-5" />
                                    Ask AI Expert
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page component
// ─────────────────────────────────────────────────────────────────────────────

export default function AgriKnowledge() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [selectedCard, setSelectedCard] = useState<KnowledgeCard | null>(null);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-emerald-500 selection:text-white overflow-x-hidden">
            <main className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {KNOWLEDGE_SECTIONS[0].cards.map((card) => (
                        <KnowledgeCardItem 
                            key={card.id} 
                            card={card} 
                            onOpen={() => setSelectedCard(card as any)} 
                            t={t} 
                        />
                    ))}
                </div>
            </main>

            <AnimatePresence>
                {selectedCard && (
                    <DetailModuleOverlay 
                        card={selectedCard} 
                        onClose={() => setSelectedCard(null)} 
                        t={t} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// UI Components
// ─────────────────────────────────────────────────────────────────────────────

function Button({ className, variant, ...props }: any) {
    return (
        <button
            {...props}
            className={cn(
                "inline-flex items-center justify-center transition-all disabled:opacity-50 active:scale-95",
                variant === "ghost" ? "bg-transparent" : "",
                className
            )}
        />
    )
}

function Badge({ children, className }: any) {
    return (
        <span className={cn("inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", className)}>
            {children}
        </span>
    )
}

