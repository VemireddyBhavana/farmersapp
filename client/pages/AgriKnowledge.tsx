import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    BookOpen, Leaf, Fish, Bird, Landmark, ArrowRight, 
    Tractor as TractorIcon, Clock, Calendar, User, 
    CheckCircle, Sprout, Droplets, Recycle, ShieldCheck, 
    Activity, ClipboardList, Zap, Beef, Wind, Sun, X
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

interface KnowledgeCard {
    id: string;
    titleKey: string;
    image: string;
    bullets: string[];
    category: string;
    stepsPrefix?: string;
    stepCount?: number;
}

const KNOWLEDGE_SECTIONS = [
    {
        id: "crops",
        titleKey: "sectionCrops",
        icon: Sprout,
        cards: [
            { id: "aloe", titleKey: "aloeVeraTitle", image: "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?auto=format&fit=crop&q=80&w=800", bullets: ["aloeBullet1", "aloeBullet2", "aloeBullet3", "aloeBullet4"], category: "Horticulture", stepsPrefix: "aloeStep", stepCount: 10 },
            { id: "curry", titleKey: "curryLeavesTitle", image: "https://images.unsplash.com/photo-1626139575936-78488221544c?auto=format&fit=crop&q=80&w=800", bullets: ["curryBullet1", "curryBullet2", "curryBullet3", "curryBullet4"], category: "Gardening", stepsPrefix: "curryStep", stepCount: 10 },
            { id: "rice", titleKey: "riceTitle", image: "https://images.unsplash.com/photo-1536644244474-51e0646be9f3?auto=format&fit=crop&q=80&w=800", bullets: ["riceBullet1", "riceBullet2", "riceBullet3", "riceBullet4"], category: "Agriculture", stepsPrefix: "riceStep", stepCount: 5 },
            { id: "cotton", titleKey: "cottonTitle", image: "https://images.unsplash.com/photo-1594913785162-e6785b42dfdc?auto=format&fit=crop&q=80&w=800", bullets: ["cottonBullet1", "cottonBullet2", "cottonBullet3", "cottonBullet4"], category: "Agriculture", stepsPrefix: "cottonStep", stepCount: 5 },
            { id: "tomato", titleKey: "tomatoTitle", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800", bullets: ["tomatoBullet1", "tomatoBullet2", "tomatoBullet3", "tomatoBullet4"], category: "Horticulture", stepsPrefix: "tomatoStep", stepCount: 5 },
            { id: "saffron", titleKey: "indoorSaffronTitle", image: "https://images.unsplash.com/photo-1508747703725-71977713d5ca?auto=format&fit=crop&q=80&w=800", bullets: ["saffronBullet1", "saffronBullet2", "saffronBullet3", "saffronBullet4"], category: "New Age", stepsPrefix: "saffronStep", stepCount: 9 },
        ]
    },
    {
        id: "knowledge",
        titleKey: "sectionKnowledge",
        icon: BookOpen,
        cards: [
            { id: "soilPh", titleKey: "soilPhTitle", image: "https://images.unsplash.com/photo-1592185157642-d6fc706f9790?auto=format&fit=crop&q=80&w=800", bullets: ["soilPhBullet1", "soilPhBullet2", "soilPhBullet3", "soilPhBullet4"], category: "Soil Science" },
            { id: "fertility", titleKey: "fertilityTitle", image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=800", bullets: ["fertilityBullet1", "fertilityBullet2", "fertilityBullet3"], category: "Soil Science" },
            { id: "drip", titleKey: "dripTitle", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800", bullets: ["dripBullet1", "dripBullet2", "dripBullet3"], category: "Irrigation" },
            { id: "rotation", titleKey: "rotationTitle", image: "https://images.unsplash.com/photo-1500382017468-9049efa8c964?auto=format&fit=crop&q=80&w=800", bullets: ["rotationBullet1", "rotationBullet2", "rotationBullet3"], category: "Management" },
            { id: "organic", titleKey: "organicTitle", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800", bullets: ["organicBullet1", "organicBullet2", "organicBullet3"], category: "Sustainable" },
        ]
    },
    {
        id: "livestock",
        titleKey: "sectionLivestock",
        icon: Bird,
        cards: [
            { id: "egg", titleKey: "eggTitle", image: "https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?auto=format&fit=crop&q=80&w=800", bullets: ["eggBullet1", "eggBullet2", "eggBullet3", "eggBullet4"], category: "Poultry" },
            { id: "dairy", titleKey: "dairyTitle", image: "https://images.unsplash.com/photo-1543362906-acfc16c623a2?auto=format&fit=crop&q=80&w=800", bullets: ["dairyBullet1", "dairyBullet2", "dairyBullet3"], category: "Livestock" },
            { id: "goat", titleKey: "goatTitle", image: "https://images.unsplash.com/photo-1524388664796-2555be56196a?auto=format&fit=crop&q=80&w=800", bullets: ["goatBullet1", "goatBullet2", "goatBullet3"], category: "Livestock" },
            { id: "fish", titleKey: "fishTitle", image: "https://images.unsplash.com/photo-1522069150046-778971f16fab?auto=format&fit=crop&q=80&w=800", bullets: ["fishBullet1", "fishBullet2", "fishBullet3"], category: "Aquaculture" },
            { id: "bee", titleKey: "beeTitle", image: "https://images.unsplash.com/photo-1473973266408-ed4e27f35e73?auto=format&fit=crop&q=80&w=800", bullets: ["beeBullet1", "beeBullet2", "beeBullet3"], category: "Livestock" },
        ]
    },
    {
        id: "schemes",
        titleKey: "sectionSchemes",
        icon: Landmark,
        cards: [
            { id: "pmKusum", titleKey: "solarSummary", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800", bullets: ["pmKusumBullet1", "pmKusumBullet2", "pmKusumBullet3"], category: "Subsidy" },
            { id: "pmKisan", titleKey: "pmKisanTitle", image: "https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?auto=format&fit=crop&q=80&w=800", bullets: ["pmKisanBullet1", "pmKisanBullet2"], category: "Direct Pay" },
            { id: "pmFasal", titleKey: "pmFasalTitle", image: "https://images.unsplash.com/photo-1557234195-bd9f290f0e4d?auto=format&fit=crop&q=80&w=800", bullets: ["pmFasalBullet1", "pmFasalBullet2"], category: "Insurance" },
            { id: "soilHealth", titleKey: "soilHealthTitle", image: "https://images.unsplash.com/photo-1592185157642-d6fc706f9790?auto=format&fit=crop&q=80&w=800", bullets: ["soilHealthBullet1", "soilHealthBullet2"], category: "Testing" },
        ]
    }
];

const DetailModuleOverlay = ({ card, onBack }: { card: KnowledgeCard, onBack: () => void }) => {
    const { t } = useLanguage();
    
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "auto"; };
    }, []);

    const steps = card.stepCount 
        ? Array.from({ length: card.stepCount }, (_, i) => ({
            title: t(`${card.stepsPrefix}${i + 1}Title`) || `${t("step")} ${i + 1}`,
            body: t(`${card.stepsPrefix}${i + 1}Body`) || "Detailed guidance coming soon..."
          }))
        : card.bullets.map((bulletKey, i) => ({
            title: t(bulletKey).replace(/^•\s*/, ""), 
            body: t(bulletKey).includes("requirements") ? "Optimizing climate conditions is crucial for yield." : "Implement best practices for superior results."
          }));

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8 overflow-hidden"
        >
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl" onClick={onBack} />
            
            <motion.div 
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                className="relative bg-white/10 border border-white/20 p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] w-full max-w-7xl h-[95vh] md:h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                <div className="flex justify-between items-start mb-8 md:mb-12 relative z-10">
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="bg-emerald-600 p-3 md:p-5 rounded-[1.2rem] md:rounded-[2rem] shadow-2xl shadow-emerald-500/40">
                            <Leaf className="w-6 h-6 md:w-10 md:h-10 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-5xl font-black text-white tracking-tighter leading-none pr-12 md:pr-0">
                                {t(card.titleKey)}
                            </h2>
                            <p className="text-emerald-400 font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-xs mt-2 md:mt-3">Premium Learning Module</p>
                        </div>
                    </div>
                    <button 
                        onClick={onBack} 
                        className="bg-white/10 hover:bg-emerald-600 p-3 md:p-5 rounded-full transition-all border border-white/10 group shadow-xl"
                    >
                        <X className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] hover:bg-white/20 transition-all group shadow-lg flex flex-col h-full"
                            >
                                <div className="space-y-4 md:space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="h-8 w-8 md:h-12 md:w-12 rounded-[0.8rem] md:rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 md:w-7 md:w-7 text-emerald-500" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-black text-white leading-tight">
                                        {step.title
                                            .replace(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]*\s*/u, "") // Strip emojis at start
                                            .replace(/^\d+[\s.]*\s*/, "") // Strip numbers and dots at start
                                            .replace(/^Step\s*\d+\s*[:.-]\s*/i, "") // Strip "Step X:" prefixes
                                            .trim()}
                                    </h3>
                                    <p className="text-emerald-50/80 text-sm font-semibold leading-relaxed">
                                        {step.body}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const FloatingGlassCard = ({ card, onOpen }: { card: KnowledgeCard, onOpen: (c: KnowledgeCard) => void }) => {
    const { t } = useLanguage();
    
    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="group relative flex flex-col bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2rem] md:rounded-[3rem] p-5 md:p-7 shadow-2xl shadow-emerald-900/5 hover:shadow-emerald-600/20 transition-all overflow-hidden h-full"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-30 pointer-events-none" />
            
            <div className="relative h-40 md:h-48 w-full rounded-[1.5rem] md:rounded-[2.2rem] overflow-hidden mb-5 md:mb-7 shadow-inner">
                <img 
                    src={card.image} 
                    alt={t(card.titleKey)} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                />
                <div className="absolute top-3 left-3">
                    <span className="bg-emerald-600/80 backdrop-blur-xl text-white text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full shadow-2xl border border-white/10">
                        {card.category}
                    </span>
                </div>
            </div>

            <div className="relative space-y-4 md:space-y-5 flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-dense group-hover:text-emerald-700 transition-colors">
                    {t(card.titleKey)}
                </h3>
                
                <ul className="space-y-2 md:space-y-4 flex-1">
                    {card.bullets.map((bulletKey, idx) => (
                        <li key={idx} className="flex items-start gap-3 md:gap-4">
                            <div className="mt-1.5 md:mt-2 h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)] flex-shrink-0" />
                            <span className="text-[13px] md:text-sm font-bold text-slate-600 leading-tight">
                                {t(bulletKey)}
                            </span>
                        </li>
                    ))}
                </ul>

                <button 
                    onClick={() => onOpen(card)}
                    className="w-full h-12 md:h-14 rounded-[1rem] md:rounded-[1.8rem] bg-slate-950 text-white font-black text-xs md:text-sm tracking-widest uppercase flex items-center justify-center gap-2 md:gap-3 active:scale-95 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30"
                >
                    {t("viewCultivationGuide") || "View Cultivation Guide"}
                    <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-24 md:w-32 h-24 md:h-32 bg-emerald-100 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" />
        </motion.div>
    );
};

export default function AgriKnowledgeHub() {
    const { t } = useLanguage();
    const [selectedCard, setSelectedCard] = useState<KnowledgeCard | null>(null);
    const dashboardRef = useRef<HTMLDivElement>(null);

    const scrollToDashboard = () => {
        dashboardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="min-h-screen bg-[#F8FAF9] pb-24 md:pb-40 selection:bg-emerald-100 selection:text-emerald-900">
            {/* Header / Hero Section */}
            <div className="relative bg-white pt-12 md:pt-24 pb-20 md:pb-32 overflow-hidden border-b border-emerald-50">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-50/50 rounded-full blur-[100px] md:blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50/40 rounded-full blur-[120px]" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-6 md:space-y-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 md:gap-4 px-4 md:px-6 py-2 md:py-2.5 bg-white border border-emerald-100 rounded-full text-emerald-700 shadow-xl shadow-emerald-900/5 backdrop-blur-sm"
                        >
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] md:tracking-[0.3em]">{t("agriHubSubtitle") || "Farmer Education Portal"}</span>
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-9xl font-black text-slate-950 tracking-tighter leading-[0.9] md:leading-[0.8]"
                        >
                            AgriKnowledge<span className="text-emerald-600">Hub</span>
                        </motion.h1>
                        
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg md:text-2xl text-slate-600 font-bold max-w-2xl leading-relaxed px-4"
                        >
                            Modern agricultural excellence and innovative learning for sustainable prosperity.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Dashboard Sections */}
            <div ref={dashboardRef} className="container mx-auto px-4 mt-12 md:mt-24 space-y-24 md:space-y-40">
                {KNOWLEDGE_SECTIONS.map((section) => (
                    <section key={section.id} className="relative">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-10 md:mb-16">
                            <div className="h-16 w-16 md:h-24 md:w-24 rounded-[1.25rem] md:rounded-[2rem] bg-slate-950 flex items-center justify-center shadow-2xl shrink-0">
                                <section.icon className="h-7 w-7 md:h-10 md:w-10 text-emerald-400" />
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-3xl md:text-6xl font-black text-slate-950 tracking-tight leading-none uppercase italic">
                                    {t(section.titleKey)}
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                            {section.cards.map((card) => (
                                <FloatingGlassCard key={card.id} card={card} onOpen={setSelectedCard} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* Platform Branding */}
            <div className="container mx-auto px-4 mt-40 md:mt-60">
                <div className="bg-emerald-600 rounded-[3rem] md:rounded-[4rem] p-10 md:p-32 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                    <div className="relative z-10 space-y-8 md:space-y-10">
                        <h2 className="text-4xl md:text-8xl font-black text-white leading-tight md:leading-none tracking-tighter">
                            Grow Smarter. <br/>Harvest Better.
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                            <button 
                                onClick={scrollToDashboard}
                                className="px-10 md:px-16 py-4 md:py-6 bg-white text-emerald-900 font-black rounded-full text-lg md:text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="mt-12 md:mt-20 text-center space-y-4">
                    <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px] md:text-xs">AgriKnowledgeHub © 2026 Future Agriculture Labs</p>
                </div>
            </div>

            <AnimatePresence>
                {selectedCard && (
                    <DetailModuleOverlay 
                        card={selectedCard} 
                        onBack={() => setSelectedCard(null)} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
