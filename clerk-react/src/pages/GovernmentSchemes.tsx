import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowLeft, BadgeIndianRupee, Sprout, Droplets, Zap, Home,
    ArrowUpRight, CheckCircle2, Clock, Users, FileText, ExternalLink, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";

const schemes = [
    {
        id: 1,
        name: "PM-Kisan Samman Nidhi",
        shortName: "PM-Kisan",
        benefit: "₹6,000 / year",
        installments: "3 installments of ₹2,000",
        icon: BadgeIndianRupee,
        color: "bg-green-100 text-green-700",
        headerColor: "from-green-600 to-emerald-500",
        status: "Active",
        eligibility: "Small & marginal farmers with land up to 2 hectares",
        description: "Direct income support of ₹6,000 per year to all landholding farmers in 3 equal installments.",
        deadline: "Rolling Application",
        portal: "https://pmkisan.gov.in/",
        applyType: "income"
    },
    {
        id: 2,
        name: "Rythu Bharosa",
        shortName: "Rythu Bharosa",
        benefit: "₹13,500 / year",
        installments: "AP State Scheme",
        icon: Sprout,
        color: "bg-amber-100 text-amber-700",
        headerColor: "from-amber-500 to-orange-400",
        status: "Active",
        eligibility: "Registered farmers in Andhra Pradesh with valid Rythu Bharosa card",
        description: "Andhra Pradesh state scheme providing ₹13,500 annually for agricultural inputs, cultivation costs, and investment support.",
        deadline: "Dec 2026",
        portal: "https://ysrrythubharosa.ap.gov.in/",
        applyType: "income"
    },
    {
        id: 3,
        name: "PM Fasal Bima Yojana",
        shortName: "Crop Insurance",
        benefit: "Up to ₹2 Lakh",
        installments: "Claim based",
        icon: Droplets,
        color: "bg-blue-100 text-blue-700",
        headerColor: "from-blue-600 to-cyan-500",
        status: "Active",
        eligibility: "All farmers growing notified crops in notified areas",
        description: "Comprehensive crop insurance scheme protecting farmers against crop loss due to natural calamities, pests & diseases.",
        deadline: "Jul 31, 2026",
        portal: "https://pmfby.gov.in/",
        applyType: "risk"
    },
    {
        id: 4,
        name: "Soil Health Card Scheme",
        shortName: "Soil Health",
        benefit: "Free Testing",
        installments: "Every 2 years",
        icon: Sprout,
        color: "bg-lime-100 text-lime-700",
        headerColor: "from-lime-600 to-green-500",
        status: "Active",
        eligibility: "All farmers with agricultural land",
        description: "Free soil testing and soil health card providing recommendations on fertilizers and micronutrients for better crop yield.",
        deadline: "Ongoing",
        portal: "https://soilhealth.dac.gov.in/",
        applyType: "income"
    },
    {
        id: 5,
        name: "PM Kusum Yojana",
        shortName: "Solar Pump",
        benefit: "60% Subsidy",
        installments: "On solar pumps",
        icon: Zap,
        color: "bg-yellow-100 text-yellow-700",
        headerColor: "from-yellow-500 to-amber-400",
        status: "Active",
        eligibility: "Individual farmers / SHGs / Cooperatives",
        description: "60% government subsidy on solar-powered agricultural pumps, reducing electricity costs and providing reliable irrigation.",
        deadline: "Mar 31, 2026",
        portal: "https://pmkusum.mnre.gov.in/",
        applyType: "income"
    },
    {
        id: 6,
        name: "Pradhan Mantri Awas Yojana - Gramin",
        shortName: "Rural Housing",
        benefit: "₹1.3 Lakh",
        installments: "For construction",
        icon: Home,
        color: "bg-purple-100 text-purple-700",
        headerColor: "from-purple-600 to-violet-500",
        status: "Active",
        eligibility: "Houseless rural families & those with kutcha houses",
        description: "Financial assistance of ₹1.3 lakh for construction of pucca houses with basic amenities in rural areas.",
        deadline: "Rolling",
        portal: "https://pmayg.nic.in/",
        applyType: "income"
    },
];

const statsData = [
    { label: "Active Schemes", value: "6", icon: FileText },
    { label: "Beneficiaries", value: "12M+", icon: Users },
    { label: "Total Benefit", value: "₹850Cr", icon: BadgeIndianRupee },
    { label: "Avg. Wait Time", value: "< 30 days", icon: Clock },
];

const categories = ["All", "Income Support", "Crop Insurance", "Mechanization", "Other"];

export default function GovernmentSchemes() {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredSchemes = schemes.filter(s => {
        const matchesCategory = activeCategory === "All" ||
            (activeCategory === "Income Support" && (s.shortName === "PM-Kisan" || s.shortName === "Rythu Bharosa")) ||
            (activeCategory === "Crop Insurance" && s.shortName === "Crop Insurance") ||
            (activeCategory === "Mechanization" && s.shortName === "Solar Pump") ||
            (activeCategory === "Other" && (s.shortName === "Soil Health" || s.shortName === "Rural Housing"));

        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container mx-auto px-4 py-8 space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link to="/dashboard">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight">{t('nav.government-services')}</h1>
                        <p className="text-muted-foreground">{t('schemes.subtitle', 'Central & State agricultural welfare programs')}</p>
                    </div>
                </div>

                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder={t('common.search_schemes', 'Search schemes...')}
                        className="pl-10 rounded-full bg-primary/5 border-primary/10 focus-visible:ring-primary"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat) => (
                    <Button
                        key={cat}
                        variant={activeCategory === cat ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => setActiveCategory(cat)}
                    >
                        {t(`categories.${cat.toLowerCase().replace(' ', '_')}`, cat)}
                    </Button>
                ))}
            </div>

            {/* Stats Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {statsData.map((stat, idx) => (
                    <div key={idx} className="glass rounded-3xl p-5 flex items-center gap-4 border-primary/10">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <stat.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t(`stats.${stat.label.toLowerCase().replace(' ', '_')}`, stat.label)}</p>
                            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Schemes Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSchemes.map((scheme, idx) => (
                    <motion.div
                        key={scheme.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.4 }}
                        whileHover={{ y: -6 }}
                    >
                        <Card className="rounded-[2rem] border-primary/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden h-full group cursor-pointer">
                            <div className={cn("bg-gradient-to-r p-6 text-white", scheme.headerColor)}>
                                <div className="flex items-start justify-between">
                                    <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                                        <scheme.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <Badge className="bg-white/20 border-none text-white text-[10px] px-3">
                                        <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                                        {t(`status.${scheme.status.toLowerCase()}`, scheme.status)}
                                    </Badge>
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs text-white/70 uppercase tracking-widest">{scheme.installments}</p>
                                    <h3 className="text-xl font-black mt-1">{scheme.shortName}</h3>
                                    <p className="text-3xl font-black mt-1">{scheme.benefit}</p>
                                </div>
                            </div>

                            <CardContent className="p-6 space-y-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{t('common.eligibility', 'Eligibility')}</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{scheme.eligibility}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{t('common.about', 'About')}</p>
                                    <p className="text-sm text-foreground leading-relaxed">{scheme.description}</p>
                                </div>
                                <div className="flex flex-col gap-3 pt-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground font-medium">{t('common.deadline', 'Deadline')}: {scheme.deadline}</span>
                                        </div>
                                        <Link to={`/apply/${scheme.applyType}`}>
                                            <Button size="sm" className="rounded-full px-4 gap-1 hover:translate-x-1 transition-transform">
                                                {t('common.apply_now', 'Apply Now')} <ArrowUpRight className="h-3 w-3" />
                                            </Button>
                                        </Link>
                                    </div>
                                    <a href={scheme.portal} target="_blank" rel="noopener noreferrer" className="w-full">
                                        <Button variant="outline" size="sm" className="w-full rounded-full gap-2 border-primary/20 text-primary hover:bg-primary/5">
                                            <ExternalLink className="h-3 w-3" /> {t('common.visit_portal', 'Visit Official Portal')}
                                        </Button>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Helpline Banner */}
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-[2.5rem] bg-primary p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-primary-foreground"
            >
                <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-2xl font-extrabold">{t('schemes.help_title', 'Need Help Applying?')}</h3>
                    <p className="text-primary-foreground/80 max-w-md">
                        {t('schemes.help_desc', 'Call Kisan Call Centre at 1800-180-1551 (free, 24x7) or ask KisanAI for step-by-step guidance.')}
                    </p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                    <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer">
                        <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-6 font-bold gap-2">
                            <ExternalLink className="h-4 w-4" /> PM-Kisan Portal
                        </Button>
                    </a>
                    <Link to="/ai-assistant">
                        <Button variant="outline" className="rounded-full px-6 border-white/30 text-white hover:bg-white/10 font-bold">
                            {t('nav.ai-assistant')}
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
