import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen, Leaf, Bird, Landmark, ArrowRight,
    CheckCircle, Sprout, Droplets, Recycle, ShieldCheck,
    Zap, X, Thermometer, FlaskConical,
    Shovel, Wheat, Bug, PackageOpen, ChevronDown,
    Flower2, Star, BarChart3
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

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

interface StepCard {
    title: string;
    body: string;
    icon: React.ElementType;
    color: string;
    accent: string;
}

function getStepImage(stepIndex: number, cropId: string): string {
    const images: Record<string, string[]> = {
        aloe: [
            "https://images.unsplash.com/photo-1596547609652-9cf5d8d76ae8?w=800&q=80", // Climate
            "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80", // Material
            "https://images.unsplash.com/photo-1592321675774-3de57f3ee0dc?w=800&q=80", // Preparation
            "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80", // Method
            "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80", // Irrigation
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80", // Fertilizers
            "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80", // Pest
            "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80", // Harvesting
            "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80", // Post
            "https://images.unsplash.com/photo-1473976339452-16f057d3c019?w=800&q=80", // Market
        ],
        // Default falling back to meaningful category images
        default: [
            "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80", // Climate
            "https://images.unsplash.com/photo-1530836361253-efad5cb2fe17?w=800&q=80", // Material
            "https://images.unsplash.com/photo-1592321675774-3de57f3ee0dc?w=800&q=80", // Preparation
            "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80", // Method
            "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80", // Irrigation
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80", // Fertilizers
            "https://images.unsplash.com/photo-1530133532239-eda0f515f187?w=800&q=80", // Pest
            "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80", // Harvesting
            "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80", // Post
            "https://images.unsplash.com/photo-1473976339452-16f057d3c019?w=800&q=80"  // Market
        ]
    };
    const cropImages = images[cropId] || images.default;
    return cropImages[stepIndex % 10];
}

// ─────────────────────────────────────────────────────────────────────────────
// Data — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const KNOWLEDGE_SECTIONS = [
    {
        id: "crops",
        titleKey: "sectionCrops",
        icon: Sprout,
        cards: [
            { id: "aloe", titleKey: "aloeVeraTitle", image: "https://planetdesert.com/cdn/shop/articles/587654299891.jpg?v=1772639438", summary: { climate: "hotDry", water: "low", harvest: "10-12 Months", profit: "high" }, bullets: ["aloeBullet1", "aloeBullet2", "aloeBullet3", "aloeBullet4"], category: "Horticulture", stepsPrefix: "aloeStep", stepCount: 10 },
            { id: "curry", titleKey: "curryLeavesTitle", image: "https://www.shutterstock.com/image-photo/fresh-organic-curry-leaves-tree-260nw-2593564315.jpg", summary: { climate: "warmHumid", water: "medium", harvest: "12-15 Months", profit: "medium" }, bullets: ["curryBullet1", "curryBullet2", "curryBullet3", "curryBullet4"], category: "Gardening", stepsPrefix: "curryStep", stepCount: 10 },
            { id: "rice", titleKey: "riceTitle", image: "https://www.agrifarming.in/wp-content/uploads/2022/04/Boost-Rice-Yield2.jpg", summary: { climate: "warmHumid", water: "high", harvest: "4 Months", profit: "medium" }, bullets: ["riceBullet1", "riceBullet2", "riceBullet3", "riceBullet4"], category: "Agriculture", stepsPrefix: "riceStep", stepCount: 10 },
            { id: "cotton", titleKey: "cottonTitle", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQggsehAILLPTBdlDWdULNE9Fsz3SEXjAHbcg&s", summary: { climate: "warmHumid", water: "medium", harvest: "6 Months", profit: "high" }, bullets: ["cottonBullet1", "cottonBullet2", "cottonBullet3", "cottonBullet4"], category: "Agriculture", stepsPrefix: "cottonStep", stepCount: 10 },
            { id: "tomato", titleKey: "tomatoTitle", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800", summary: { climate: "warmHumid", water: "medium", harvest: "3-4 Months", profit: "veryHigh" }, bullets: ["tomatoBullet1", "tomatoBullet2", "tomatoBullet3", "tomatoBullet4"], category: "Horticulture", stepsPrefix: "tomatoStep", stepCount: 10 },
            { id: "saffron", titleKey: "indoorSaffronTitle", image: "https://static.wixstatic.com/media/d4401d_9ee5e3f41e20438fb58c739fda508240~mv2.jpg/v1/fill/w_568,h_244,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/d4401d_9ee5e3f41e20438fb58c739fda508240~mv2.jpg", summary: { climate: "coolDry", water: "low", harvest: "1 Year", profit: "veryHigh" }, bullets: ["saffronBullet1", "saffronBullet2", "saffronBullet3", "saffronBullet4"], category: "New Age", stepsPrefix: "saffronStep", stepCount: 10 },
        ]
    },
    {
        id: "knowledge",
        titleKey: "sectionKnowledge",
        icon: BookOpen,
        cards: [
            { id: "soilPh", titleKey: "soilPhTitle", image: "https://bonnieplants.com/cdn/shop/articles/soil-in-hands_984a3870-c32e-444a-a4f1-6f4fe68223f6.jpg?v=1642541552", bullets: ["soilPhBullet1", "soilPhBullet2", "soilPhBullet3", "soilPhBullet4"], category: "Soil Science" },
            { id: "fertility", titleKey: "fertilityTitle", image: "https://eos.com/wp-content/uploads/2021/03/cover-crops-to-preserve-soil-fertility-loss.jpg.webp", bullets: ["fertilityBullet1", "fertilityBullet2", "fertilityBullet3"], category: "Soil Science" },
            { id: "drip", titleKey: "dripTitle", image: "https://plus.unsplash.com/premium_photo-1661818305309-dd2145095cb2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZHJpcCUyMGlycmlnYXRpb258ZW58MHx8MHx8fDA%3D", bullets: ["dripBullet1", "dripBullet2", "dripBullet3"], category: "Irrigation" },
            { id: "rotation", titleKey: "rotationTitle", image: "https://www.csuchico.edu/regenerativeagriculture/_assets/images/ra101/crop-rotation.jpg", bullets: ["rotationBullet1", "rotationBullet2", "rotationBullet3"], category: "Management" },
            { id: "organic", titleKey: "organicTitle", image: "https://media.istockphoto.com/id/1346744481/photo/anonymous-chef-harvesting-fresh-vegetables-on-a-farm.jpg?s=612x612&w=0&k=20&c=U9h4fAi68nwVndAJW8TF-f2lFFCO2Y-XrZWA2gah1Xw=", bullets: ["organicBullet1", "organicBullet2", "organicBullet3"], category: "Sustainable" },
        ]
    },
    {
        id: "livestock",
        titleKey: "sectionLivestock",
        icon: Bird,
        cards: [
            { id: "egg", titleKey: "eggTitle", image: "https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?auto=format&fit=crop&q=80&w=800", bullets: ["eggBullet1", "eggBullet2", "eggBullet3", "eggBullet4"], category: "Poultry" },
            { id: "dairy", titleKey: "dairyTitle", image: "https://img.freepik.com/free-photo/cows-green-field_335224-509.jpg", bullets: ["dairyBullet1", "dairyBullet2", "dairyBullet3"], category: "Livestock" },
            { id: "goat", titleKey: "goatTitle", image: "https://t3.ftcdn.net/jpg/05/85/46/90/360_F_585469003_4jgH57a56z5CeDIekZRZjQ2QqXgxZ2AK.jpg", bullets: ["goatBullet1", "goatBullet2", "goatBullet3"], category: "Livestock" },
            { id: "fish", titleKey: "fishTitle", image: "https://static.vecteezy.com/system/resources/thumbnails/046/908/143/small/scoop-net-with-the-many-fresh-fish-photo.jpg", bullets: ["fishBullet1", "fishBullet2", "fishBullet3"], category: "Aquaculture" },
            { id: "bee", titleKey: "beeTitle", image: "https://jaguzafarm.com/support/wp-content/uploads/2019/04/bee-farming.jpg", bullets: ["beeBullet1", "beeBullet2", "beeBullet3"], category: "Livestock" },
        ]
    },
    {
        id: "schemes",
        titleKey: "sectionSchemes",
        icon: Landmark,
        cards: [
            { id: "pmKusum", titleKey: "solarSummary", image: "https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2023/06/08123158/kusum-scheme.jpg", bullets: ["pmKusumBullet1", "pmKusumBullet2", "pmKusumBullet3"], category: "Subsidy" },
            { id: "pmKisan", titleKey: "pmKisanTitle", image: "https://newsd.in/wp-content/uploads/cwv-webp-images/2023/11/PM-KISAN-scheme-When-will-Centre-release-16th-instalment-how-to-apply-and-more-1280x720.jpg.webp", bullets: ["pmKisanBullet1", "pmKisanBullet2"], category: "Direct Pay" },
            { id: "pmFasal", titleKey: "pmFasalTitle", image: "https://akm-img-a-in.tosshub.com/aajtak/images/story/202106/farmers8999887_1-sixteen_nine.jpg?size=948:533", bullets: ["pmFasalBullet1", "pmFasalBullet2"], category: "Insurance" },
            { id: "soilHealth", titleKey: "soilHealthTitle", image: "https://phycoterra.com/wp-content/uploads/2023/06/featuredimage_SoilHealthIndicators_82226407-1024x684.jpg", bullets: ["soilHealthBullet1", "soilHealthBullet2"], category: "Testing" },
        ]
    },
    {
        id: "smartFarming",
        titleKey: "sectionSmartFarming",
        icon: Zap,
        cards: [
            { id: "seasonal", titleKey: "seasonalCropGuide", image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80", bullets: ["kharifCrops", "rabiCrops", "zaidCrops"], category: "Seasonal", stepsPrefix: "seasonalStep", stepCount: 3 },
            { id: "water", titleKey: "waterManagementGuide", image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80", bullets: ["dripIrrigation", "sprinklerIrrigation", "rainwaterHarvesting"], category: "Irrigation", stepsPrefix: "waterStep", stepCount: 3 },
            { id: "fertilizer", titleKey: "fertilizerNutrientGuide", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80", bullets: ["npkBalance", "nutrientDeficiency"], category: "Nutrition", stepsPrefix: "fertilizerStep", stepCount: 2 },
            { id: "machinery", titleKey: "farmMachineryGuide", image: "https://images.unsplash.com/photo-1473976339452-16f057d3c019?w=800&q=80", bullets: ["seedDrillInstr", "harvesterInstr", "sprayerInstr"], category: "Machinery", stepsPrefix: "machineryStep", stepCount: 3 },
            { id: "storage", titleKey: "storagePostHarvest", image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80", bullets: ["grainStorage", "coldStorage"], category: "Storage", stepsPrefix: "storageStep", stepCount: 2 },
        ]
    },
    {
        id: "sustainability",
        titleKey: "sectionSustainability",
        icon: Recycle,
        cards: [
            { id: "sustainable", titleKey: "sustainableFarming", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80", bullets: ["cropRotation", "coverCrops", "noTill"], category: "Eco" },
            { id: "organic2", titleKey: "organicFarming", image: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?w=800&q=80", bullets: ["composting", "bioFertilizers"], category: "Eco" },
            { id: "precision", titleKey: "precisionAg", image: "https://images.unsplash.com/photo-1594894512411-e6ce14de72b3?w=800&q=80", bullets: ["droneMonitoring", "iotSoilSensors"], category: "Smart" },
        ]
    },
    {
        id: "protection",
        titleKey: "sectionProtection",
        icon: ShieldCheck,
        cards: [
            { id: "integrated", titleKey: "integratedPest", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80", bullets: ["biologicalControl", "culturalControl"], category: "Protection" },
            { id: "diseases", titleKey: "diseaseMgmt", image: "https://images.unsplash.com/photo-1530836361253-efad5cb2fe17?w=800&q=80", bullets: ["fungalDiseases", "viralDiseases"], category: "Protection" },
        ]
    },
    {
        id: "resources",
        titleKey: "sectionResourceCenter",
        icon: BookOpen,
        cards: [
            { id: "fertilizerGuide", titleKey: "fertilizerUsage", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80", bullets: ["applicationMethods", "timingGuide"], category: "Nutrition" },
        ]
    },
    {
        id: "livestock_plus",
        titleKey: "sectionLivestockPlus",
        icon: Bird,
        cards: [
            { id: "poultry", titleKey: "poultryTitle", image: "https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=800&q=80", bullets: ["broilerMgmt", "layerMgmt"], category: "Livestock" },
            { id: "dairy_mgmt", titleKey: "dairyMgmtTitle", image: "https://img.freepik.com/free-photo/cows-green-field_335224-509.jpg", bullets: ["milkProduction", "fodderMgmt"], category: "Livestock" },
            { id: "mushroom", titleKey: "mushroomTitle", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80", bullets: ["buttonMushroom", "oysterMushroom"], category: "Specialized" },
            { id: "hydroponics", titleKey: "hydroponicsTitle", image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&q=80", bullets: ["nutrientFilm", "deepWaterCulture"], category: "Specialized" },
        ]
    }
];

// Step icon palette
const STEP_ICONS: Array<{ icon: React.ElementType; color: string; accent: string }> = [
    { icon: Thermometer,    color: "bg-amber-50",   accent: "text-amber-600 bg-amber-100" },
    { icon: Shovel,         color: "bg-orange-50",  accent: "text-orange-600 bg-orange-100" },
    { icon: Flower2,        color: "bg-pink-50",    accent: "text-pink-600 bg-pink-100" },
    { icon: Sprout,         color: "bg-green-50",   accent: "text-green-600 bg-green-100" },
    { icon: Droplets,       color: "bg-blue-50",    accent: "text-blue-600 bg-blue-100" },
    { icon: FlaskConical,   color: "bg-violet-50",  accent: "text-violet-600 bg-violet-100" },
    { icon: Bug,            color: "bg-red-50",     accent: "text-red-600 bg-red-100" },
    { icon: Wheat,          color: "bg-yellow-50",  accent: "text-yellow-700 bg-yellow-100" },
    { icon: PackageOpen,    color: "bg-teal-50",    accent: "text-teal-600 bg-teal-100" },
    { icon: Star,           color: "bg-indigo-50",  accent: "text-indigo-600 bg-indigo-100" },
];

// Category badge colours
const CATEGORY_COLORS: Record<string, string> = {
    Horticulture: "bg-pink-100 text-pink-700",
    Agriculture:  "bg-green-100 text-green-700",
    Gardening:    "bg-lime-100 text-lime-700",
    "New Age":    "bg-violet-100 text-violet-700",
    "Soil Science":"bg-orange-100 text-orange-700",
    Irrigation:   "bg-blue-100 text-blue-700",
    Management:   "bg-teal-100 text-teal-700",
    Sustainable:  "bg-emerald-100 text-emerald-700",
    Poultry:      "bg-yellow-100 text-yellow-700",
    Livestock:    "bg-amber-100 text-amber-700",
    Aquaculture:  "bg-cyan-100 text-cyan-700",
    Subsidy:      "bg-purple-100 text-purple-700",
    "Direct Pay": "bg-indigo-100 text-indigo-700",
    Insurance:    "bg-rose-100 text-rose-700",
    Testing:      "bg-slate-100 text-slate-700",
    Seasonal:     "bg-green-100 text-green-700",
    Nutrition:    "bg-lime-100 text-lime-700",
    Machinery:    "bg-gray-100 text-gray-700",
    Storage:      "bg-stone-100 text-stone-700",
    Eco:          "bg-emerald-100 text-emerald-700",
    Smart:        "bg-sky-100 text-sky-700",
    Protection:   "bg-red-100 text-red-700",
    Specialized:  "bg-fuchsia-100 text-fuchsia-700",
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers for inline expanded content
// ─────────────────────────────────────────────────────────────────────────────
function getFarmerTip(stepIndex: number): string {
    const tips = [
        "Monitor temperature daily during early growth. Simple thermometers placed in the field can save your entire crop.",
        "Always test your soil before adding amendments. A soil test card costs very little but saves thousands in wasted inputs.",
        "Use certified planting material from government nurseries to ensure disease-free, high-yield varieties.",
        "Plant in the evening hours to reduce transplanting shock and improve seedling survival by up to 30%.",
        "Install moisture sensors or use the finger-test: push your finger 2 inches into soil — if dry, irrigate.",
        "Apply fertilizers in splits — never all at once. Split applications improve uptake by 40% and reduce waste.",
        "Inspect crops at dawn for pest activity. Early detection allows lower-cost organic interventions.",
        "Harvest in cool morning hours to preserve quality. Avoid harvesting after rain to prevent post-harvest rots.",
        "Dry produce to proper moisture levels before storage. Wet grain in storage leads to total loss.",
        "Keep records of every input and output. Farmers who maintain records earn 20–30% more over time.",
    ];
    return tips[stepIndex % tips.length];
}

function getBestPractices(stepIndex: number): string[] {
    const practices = [
        ["Record daily temperature extremes", "Use shade nets during extreme heat", "Plant wind-breaks on the field border"],
        ["Plough to 20–25 cm depth for aeration", "Add organic matter before each season", "Avoid compaction by limiting heavy machinery"],
        ["Purchase only certified planting material", "Inspect for diseases before planting", "Store material in cool, dry conditions"],
        ["Maintain uniform row spacing for machinery", "Inoculate legume seeds with Rhizobium", "Use transplanting tools for uniform depth"],
        ["Water early morning or late evening only", "Mulch to retain moisture", "Check irrigation pipes weekly"],
        ["Follow soil test recommendations strictly", "Prefer organic over chemical fertilizers", "Apply micronutrients as foliar spray"],
        ["Use yellow sticky traps for monitoring", "Release biological agents like Trichogramma", "Rotate pesticides to avoid resistance"],
        ["Test grain moisture before harvest (ideal 14–18%)", "Use sharp blades to minimise crop damage", "Harvest before rains to avoid field losses"],
        ["Clean storage units before use", "Use hermetically sealed bags for grain", "Monitor stored produce weekly"],
        ["Keep field diary of all operations", "Take photos of pest symptoms", "Share knowledge with neighbouring farmers"],
    ];
    return practices[stepIndex % practices.length];
}

// ─────────────────────────────────────────────────────────────────────────────
// Inline expandable step card (used inside DetailModuleOverlay)
// ─────────────────────────────────────────────────────────────────────────────
const StepCardItem = ({
    step,
    index,
    expanded,
    onToggle,
    cropId,
}: {
    step: StepCard;
    index: number;
    expanded: boolean;
    onToggle: () => void;
    cropId: string;
}) => {
    const Icon = step.icon;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className={cn(
                "rounded-[2.5rem] border transition-all duration-500 overflow-hidden bg-white",
                expanded
                    ? "border-emerald-200 shadow-2xl shadow-emerald-50/50 scale-[1.01] z-10"
                    : "border-slate-100 shadow-sm hover:border-emerald-100 hover:shadow-lg translate-y-0",
            )}
        >
            <button
                onClick={onToggle}
                className="w-full text-left p-6 md:p-8 flex items-center gap-6 group relative"
            >
                <div className={cn("h-16 w-16 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:rotate-6 shadow-sm", step.accent)}>
                    <Icon className="w-8 h-8" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50">
                            Step {index + 1}
                        </span>
                    </div>
                    <h3 className={cn(
                        "text-xl md:text-2xl font-black leading-tight transition-colors",
                        expanded ? "text-emerald-900" : "text-slate-900 group-hover:text-emerald-700"
                    )}>
                        {step.title}
                    </h3>
                </div>

                <div className={cn(
                    "h-12 w-12 rounded-full flex items-center justify-center transition-all duration-500",
                    expanded ? "bg-emerald-600 rotate-180 shadow-lg" : "bg-slate-50"
                )}>
                    <ChevronDown className={cn("w-6 h-6", expanded ? "text-white" : "text-slate-400")} />
                </div>
            </button>

            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="px-8 pb-10 pt-2 space-y-10">
                            {/* Description - Now at the top */}
                            <div className="max-w-3xl">
                                <p className="text-slate-600 font-bold text-lg leading-relaxed border-l-4 border-emerald-500 pl-6 py-1">
                                    {step.body}
                                </p>
                            </div>

                            {/* Structured Content - 2 Column Grid */}
                            <div className="grid gap-6 md:grid-cols-2 items-stretch">
                                {/* Farmer Tip - Left */}
                                <div className="rounded-[2rem] bg-emerald-600 p-8 shadow-xl shadow-emerald-200/40 text-white relative overflow-hidden group/tip flex flex-col min-h-[220px]">
                                    <Leaf className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10 group-hover/tip:rotate-12 transition-transform duration-700 pointer-events-none" />
                                    
                                    <div className="flex items-center gap-3 mb-5 relative z-10">
                                        <div className="h-10 w-10 rounded-2xl bg-white/20 flex items-center justify-center border border-white/20 backdrop-blur-sm">
                                            <Leaf className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-50">
                                            Farmer Tip
                                        </span>
                                    </div>
                                    
                                    <p className="text-lg font-bold leading-relaxed relative z-10 text-emerald-50/90 italic">
                                        "{getFarmerTip(index)}"
                                    </p>
                                </div>

                                {/* Best Practices - Right */}
                                <div className="rounded-[2rem] bg-slate-50 p-8 border border-slate-100 flex flex-col min-h-[220px] shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-10 w-10 rounded-2xl bg-emerald-100 flex items-center justify-center border border-emerald-200/50">
                                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                            Best Practices
                                        </span>
                                    </div>
                                    
                                    <ul className="space-y-4">
                                        {getBestPractices(index).map((tip, i) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <div className="h-6 w-6 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <ArrowRight className="w-3 h-3 text-emerald-600" />
                                                </div>
                                                <span className="text-[15px] text-slate-700 font-bold leading-tight">{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// Detail Modal — hero image header + inline expandable step cards
// ─────────────────────────────────────────────────────────────────────────────
const DetailModuleOverlay = ({
    card,
    onBack,
}: {
    card: KnowledgeCard;
    onBack: () => void;
}) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [expandedStep, setExpandedStep] = useState<number | null>(0); // Default open first step

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "auto"; };
    }, []);

    const steps: StepCard[] = card.stepCount
        ? Array.from({ length: card.stepCount }, (_, i) => {
            const m = STEP_ICONS[i % STEP_ICONS.length];
            return {
                title: t(`${card.stepsPrefix}${i + 1}Title`) || `Step ${i + 1}`,
                body:  t(`${card.stepsPrefix}${i + 1}Body`)  || "Detailed guidance coming soon.",
                icon: m.icon, color: m.color, accent: m.accent,
            };
        })
        : card.bullets.map((bulletKey, i) => {
            const m = STEP_ICONS[i % STEP_ICONS.length];
            return {
                title: t(bulletKey).replace(/^•\s*/, "").trim(),
                body:  t(bulletKey).replace(/^•\s*/, "").trim(),
                icon: m.icon, color: m.color, accent: m.accent,
            };
        });

    const toggleStep = (idx: number) =>
        setExpandedStep(prev => (prev === idx ? null : idx));

    const progress = expandedStep !== null ? ((expandedStep + 1) / steps.length) * 100 : 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6 overflow-hidden"
        >
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
                onClick={onBack}
            />

            <motion.div
                initial={{ scale: 0.9, y: 100, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 24 }}
                className="relative bg-[#F8FAFC] rounded-[3rem] w-full max-w-6xl h-[94vh] md:h-[90vh] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/20"
            >
                {/* ── Hero Image Banner ── */}
                <div className="relative h-56 md:h-64 flex-shrink-0 overflow-hidden">
                    <img
                        src={card.image}
                        alt={t(card.titleKey)}
                        className="w-full h-full object-cover"
                    />
                    {/* Stronger, more refined gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC]/40 to-transparent" />

                    <div className="absolute top-6 left-6 md:top-8 md:left-10 z-20">
                         <motion.button
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            onClick={onBack}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl text-slate-900 font-black text-xs uppercase tracking-widest shadow-lg hover:bg-white transition-all active:scale-95 border border-white"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" />
                            {t('backToHome') || 'Back'}
                        </motion.button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-8">
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-3"
                        >
                            <div className="flex items-center gap-3">
                                <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full bg-emerald-600 text-white shadow-lg">
                                    {card.category}
                                </span>
                                <div className="h-1 w-8 rounded-full bg-emerald-500/30" />
                                <p className="text-emerald-700 text-[10px] font-black uppercase tracking-widest">
                                    {t('completeCultivationGuide') || 'Complete Cultivation Guide'}
                                </p>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-950 leading-none tracking-tighter">
                                {t(card.titleKey)}
                            </h2>
                        </motion.div>
                    </div>

                    <button
                        onClick={onBack}
                        className="absolute top-6 right-6 md:top-8 md:right-10 bg-slate-950/10 hover:bg-slate-950/20 backdrop-blur-md p-3 rounded-2xl transition-all border border-white/20 group z-20"
                    >
                        <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="px-6 md:px-12 py-10 space-y-12">
                        
                        {/* ── Quick Summary Section ── */}
                        {card.summary && (
                            <section className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-white flex items-center justify-center shadow-lg border border-slate-100">
                                        <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase italic">{t('quickSummary')}</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { label: t('climateLabel'), value: t(card.summary.climate), icon: Thermometer, color: "text-amber-600", bg: "bg-amber-50" },
                                        { label: t('waterRequirementLabel'), value: t(card.summary.water), icon: Droplets, color: "text-blue-600", bg: "bg-blue-50" },
                                        { label: t('harvestTimeLabel'), value: card.summary.harvest, icon: Sprout, color: "text-emerald-600", bg: "bg-emerald-50" },
                                        { label: t('profitLevelLabel'), value: t(card.summary.profit), icon: Zap, color: "text-violet-600", bg: "bg-violet-50" },
                                    ].map((item, i) => (
                                        <motion.div 
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                            className={cn("p-6 rounded-[2rem] border border-white shadow-sm flex flex-col items-center text-center gap-3", item.bg)}
                                        >
                                            <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow-md">
                                                <item.icon className={cn("w-6 h-6", item.color)} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                                                <p className="text-base font-black text-slate-900">{item.value}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ── Step-by-Step Guide ── */}
                        <section className="space-y-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-white flex items-center justify-center shadow-lg border border-slate-100">
                                        <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase italic">{t('agriKnowledge')}</h3>
                                </div>
                                
                                <div className="flex-1 max-w-md bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100">
                                    <div className="flex justify-between items-center mb-2 px-2">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            {t('stepXofY').replace('{current}', String(expandedStep !== null ? expandedStep + 1 : 0)).replace('{total}', String(steps.length))}
                                        </span>
                                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{Math.round(progress)}% Complete</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 pb-12">
                                {steps.map((step, idx) => (
                                    <StepCardItem
                                        key={idx}
                                        step={step}
                                        index={idx}
                                        expanded={expandedStep === idx}
                                        onToggle={() => toggleStep(idx)}
                                        cropId={card.id}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* ── Final Actions ── */}
                        <section className="bg-slate-950 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="text-center md:text-left space-y-2">
                                    <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight">{t('readyToStart') || 'Ready to start planting?'}</h3>
                                    <p className="text-slate-400 font-bold text-sm md:text-base">{t('takeTheNextStep') || 'Take the next step in your farming journey with our advanced tools.'}</p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-4">
                                     <button 
                                        onClick={() => navigate('/market')}
                                        className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 hover:text-white transition-all active:scale-95 shadow-xl"
                                    >
                                        {t('checkMarketPrices')}
                                    </button>
                                    <button 
                                        onClick={() => navigate('/market')}
                                        className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all active:scale-95 shadow-xl"
                                    >
                                        {t('calculateProfit')}
                                    </button>
                                    <button 
                                        onClick={() => navigate('/chat')}
                                        className="px-8 py-4 bg-white/10 text-white border border-white/10 backdrop-blur-md rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95"
                                    >
                                        {t('askAiExpert')}
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// Crop card on the main hub page
// ─────────────────────────────────────────────────────────────────────────────
const KnowledgeCardItem = ({
    card,
    onOpen,
    delay = 0,
}: {
    card: KnowledgeCard;
    onOpen: (c: KnowledgeCard) => void;
    delay?: number;
}) => {
    const { t } = useLanguage();
    const categoryClass = CATEGORY_COLORS[card.category] || "bg-slate-100 text-slate-700";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-emerald-200 h-full"
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={card.image}
                    alt={t(card.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                <div className="absolute top-3 left-3">
                    <span className={cn("text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full", categoryClass)}>
                        {card.category}
                    </span>
                </div>

            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="text-lg font-black text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors leading-tight">
                    {t(card.titleKey)}
                </h3>
                <ul className="space-y-2 flex-1 mb-5">
                    {card.bullets.map((bulletKey, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
                            <span className="text-[13px] font-semibold text-slate-600 leading-snug">
                                {t(bulletKey)}
                            </span>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={() => onOpen(card)}
                    className="w-full h-12 rounded-2xl bg-slate-950 text-white font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-95"
                >
                    {t("viewCultivationGuide") || "View Cultivation Guide"}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// Stats bar in hero
// ─────────────────────────────────────────────────────────────────────────────
const StatsBar = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
            { icon: Leaf,       value: "50+",  label: "Crop Guides",      color: "text-emerald-600", bg: "bg-emerald-50" },
            { icon: BookOpen,   value: "200+", label: "Farming Articles", color: "text-blue-600",    bg: "bg-blue-50" },
            { icon: Bug,        value: "30+",  label: "Pest Solutions",   color: "text-red-600",     bg: "bg-red-50" },
            { icon: BarChart3,  value: "10+",  label: "Govt. Schemes",    color: "text-violet-600",  bg: "bg-violet-50" },
        ].map((stat, i) => {
            const Icon = stat.icon;
            return (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={cn("rounded-2xl p-4 flex items-center gap-3", stat.bg)}
                >
                    <div className="p-2.5 rounded-xl bg-white shadow-sm">
                        <Icon className={cn("w-5 h-5", stat.color)} />
                    </div>
                    <div>
                        <p className="text-xl font-black text-slate-900">{stat.value}</p>
                        <p className="text-[11px] font-bold text-slate-500">{stat.label}</p>
                    </div>
                </motion.div>
            );
        })}
    </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────
export default function AgriKnowledgeHub() {
    const { t } = useLanguage();
    const [selectedCard, setSelectedCard] = useState<KnowledgeCard | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-24 md:pb-40 selection:bg-emerald-100 selection:text-emerald-900">

            {/* ── Hero ── */}
            <div className="relative bg-white border-b border-emerald-50 overflow-hidden pt-12 md:pt-20 pb-16 md:pb-24">
                <div className="absolute top-[-20%] left-[-10%] w-[55%] h-[55%] bg-emerald-50/80 rounded-full blur-[120px] animate-pulse pointer-events-none" />
                <div className="absolute bottom-[-15%] right-[-10%] w-[40%] h-[40%] bg-blue-50/60 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col items-center text-center gap-6 md:gap-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-emerald-100 rounded-full text-emerald-700 shadow-lg"
                        >
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">
                                {t("agriHubSubtitle") || "Farmer Education Portal"}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-8xl font-black text-slate-950 tracking-tighter leading-[0.88]"
                        >
                            AgriKnowledge<span className="text-emerald-600">Hub</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                            className="text-lg md:text-xl text-slate-500 font-semibold max-w-2xl leading-relaxed"
                        >
                            Modern agricultural excellence — structured guides, step-by-step instructions, and expert knowledge for every farmer.
                        </motion.p>

                        <div className="w-full mt-2">
                            <StatsBar />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Sections ── */}
            <div className="container mx-auto px-4 mt-12 md:mt-20 space-y-20 md:space-y-32">
                {KNOWLEDGE_SECTIONS.map((section, sectionIdx) => (
                    <motion.section
                        key={section.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: sectionIdx * 0.08, duration: 0.5 }}
                        className="relative"
                    >
                        {/* Section header */}
                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-8 md:mb-12">
                            <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-slate-950 flex items-center justify-center shadow-xl flex-shrink-0">
                                <section.icon className="h-6 w-6 md:h-8 md:w-8 text-emerald-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-5xl font-black text-slate-950 tracking-tight leading-none uppercase italic">
                                    {t(section.titleKey)}
                                </h2>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="h-1 w-10 rounded-full bg-emerald-500" />
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        {section.cards.length} {section.cards.length === 1 ? "guide" : "guides"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Cards grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {section.cards.map((card, cardIdx) => (
                                <KnowledgeCardItem
                                    key={card.id}
                                    card={card}
                                    onOpen={setSelectedCard}
                                    delay={sectionIdx * 0.05 + cardIdx * 0.07}
                                />
                            ))}
                        </div>
                    </motion.section>
                ))}
            </div>

            {/* ── CTA Banner ── */}
            <div className="container mx-auto px-4 mt-28 md:mt-40">
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                    <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 space-y-6 md:space-y-8">
                        <h2 className="text-3xl md:text-7xl font-black text-white leading-tight tracking-tighter">
                            Grow Smarter. <br className="hidden md:block" />Harvest Better.
                        </h2>
                        <p className="text-emerald-100 text-base md:text-xl font-semibold max-w-xl mx-auto">
                            Access 50+ cultivation guides, step-by-step instructions, and government scheme details — all in one place.
                        </p>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="px-8 md:px-12 py-3.5 md:py-5 bg-white text-emerald-900 font-black rounded-full text-base md:text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all"
                        >
                            Explore All Guides
                        </button>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px]">
                        AgriKnowledgeHub © 2026 Future Agriculture Labs
                    </p>
                </div>
            </div>

            {/* ── Detail Modal ── */}
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
