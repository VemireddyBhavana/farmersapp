import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
    Search,
    Filter,
    Sprout,
    Star,
    ChevronRight,
    Leaf,
    Droplets,
    Sun,
    TrendingUp,
    MapPin,
    ArrowUpRight,
    BadgeCheck,
    ArrowRight,
    BookOpen,
    ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const seedsData = [
    {
        id: 1,
        name: "Golden King Hybrid Tomato",
        brand: "Mahyco",
        crop: "tomato",
        category: "Vegetables",
        variety: "Hybrid FI",
        price: 450,
        unit: "100g",
        rating: 4.9,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1592841608241-949f6eb2bf78?q=80&w=800&auto=format&fit=crop",
        tags: ["High Yield", "Disease Resistant"],
        description: "Superior quality hybrid tomato seeds with 95% germination rate. High resistance to leaf curl virus."
    },
    {
        id: 2,
        name: "Premium Basmati Rice PB1121",
        brand: "Kaveri Seeds",
        crop: "rice",
        category: "Grains",
        variety: "Foundations",
        price: 3200,
        unit: "10kg",
        rating: 4.8,
        reviews: 256,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop",
        tags: ["Aromatic", "Long Grain"],
        description: "Certified foundation seeds for premium long-grain Basmati rice. Ideal for kharif season."
    },
    {
        id: 3,
        name: "Super Sonalika Wheat",
        brand: "Nuziveedu",
        crop: "wheat",
        category: "Grains",
        variety: "Certified",
        price: 1800,
        unit: "40kg",
        rating: 4.7,
        reviews: 512,
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop",
        tags: ["Fast Growth", "Robust"],
        description: "High-protein wheat seeds with excellent drought tolerance. Best for Rabi sowing."
    },
    {
        id: 4,
        name: "Green Wonder Chili",
        brand: "Syngenta",
        crop: "chili",
        category: "Vegetables",
        variety: "Hybrid",
        price: 850,
        unit: "50g",
        rating: 5.0,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=800&auto=format&fit=crop",
        tags: ["Hot Variety", "Heavy Bearing"],
        description: "Very spicy and high-yielding chili seeds. Prolific bearing throughout the season."
    },
    {
        id: 5,
        name: "Premium Alphonso Mango Graft",
        brand: "FarmDirect",
        crop: "mango",
        category: "Fruits",
        variety: "Grafted Sapling",
        price: 350,
        unit: "sapling",
        rating: 4.9,
        reviews: 42,
        image: "https://images.unsplash.com/photo-1553334820-10550eeb5431?q=80&w=800&auto=format&fit=crop",
        tags: ["Premium Quality", "Fruitful"],
        description: "Healthy grafted Alphonso mango saplings. High survival rate and disease resistance."
    },
    {
        id: 6,
        name: "Sweet Corn Gold-66",
        brand: "Advanta",
        crop: "sweetcorn",
        category: "Vegetables",
        variety: "Hybrid",
        price: 1200,
        unit: "1kg",
        rating: 4.8,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800&auto=format&fit=crop",
        tags: ["High Germination", "Sweet"],
        description: "Uniform cob size and excellent sweetness. Market leader in sweet corn seeds."
    },
    {
        id: 7,
        name: "Organic Mustard Black",
        brand: "Heritage",
        crop: "mustard",
        category: "Grains",
        variety: "Organic",
        price: 250,
        unit: "500g",
        rating: 4.7,
        reviews: 84,
        image: "https://images.unsplash.com/photo-1626139868297-4001968137f8?q=80&w=800&auto=format&fit=crop",
        tags: ["Oil Rich", "Pure"],
        description: "Non-GMO organic black mustard seeds. High oil content and bold flavor."
    },
    {
        id: 8,
        name: "Hybrid Papaya Red Lady",
        brand: "Known-You",
        crop: "papaya",
        category: "Fruits",
        variety: "786 Hybrid",
        price: 2100,
        unit: "10g",
        rating: 4.9,
        reviews: 112,
        image: "https://images.unsplash.com/photo-1517282001574-fbf5215bc88a?q=80&w=800&auto=format&fit=crop",
        tags: ["Dwarf Variety", "High Yield"],
        description: "Productive dwarf papaya variety. Fruits are large, red-fleshed and very sweet."
    }
];

const SeedsBuyer = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [mobileNumber, setMobileNumber] = useState("");
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleGetAdvice = () => {
        // Strict 10-digit validation
        if (!/^\d{10}$/.test(mobileNumber)) {
            toast({
                title: "Invalid Number",
                description: "Please enter a valid 10-digit mobile number",
                variant: "destructive"
            });
            return;
        }

        // Native WhatsApp redirect to a dummy Business Bot Number
        const DUMMY_BOT_NUMBER = "919876543210";
        const message = encodeURIComponent(`Hi! Here is my registered phone number: ${mobileNumber}. I need farming advice.`);
        window.open(`https://wa.me/${DUMMY_BOT_NUMBER}?text=${message}`, "_blank");
    };

    const filteredSeeds = seedsData.filter((seed) => {
        const matchesSearch = seed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            seed.brand.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || seed.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[#fafcfb] pb-20">
            {/* Hero Header */}
            <section className="bg-emerald-900 pt-32 pb-40 px-6 relative overflow-hidden">
                <div className="container mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl space-y-6"
                    >
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-none px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest">
                            Farmer's Direct Marketplace
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                            Premium Quality <br />
                            <span className="text-emerald-400 italic">Certified Seeds</span>
                        </h1>
                        <p className="text-xl text-emerald-100/70 font-medium max-w-xl">
                            Boost your harvest with high-yield, disease-resistant seeds from India's trusted brands. Direct delivery to your farm.
                        </p>
                    </motion.div>
                </div>

                {/* Abstract Shapes */}
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                    <Sprout className="h-full w-full rotate-12 translate-x-1/4 scale-150" />
                </div>
            </section>

            {/* Search & Filter Bar */}
            <div className="container mx-auto px-6 -mt-20 relative z-20">
                <Card className="rounded-[3rem] border-none shadow-2xl p-4 md:p-8 bg-white">
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-emerald-500" />
                            <Input
                                placeholder="Search for seeds, brands or crops..."
                                className="pl-16 h-20 rounded-[2rem] bg-emerald-50/50 border-emerald-100 focus-visible:ring-emerald-500 text-xl font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Tabs defaultValue="All" onValueChange={setSelectedCategory} className="w-full lg:w-auto">
                            <TabsList className="bg-emerald-50 p-2 rounded-[2rem] h-20 flex">
                                <TabsTrigger value="All" className="rounded-2xl px-8 h-full data-[state=active]:bg-emerald-600 data-[state=active]:text-white font-black text-sm uppercase tracking-widest transition-all">All Crops</TabsTrigger>
                                <TabsTrigger value="Vegetables" className="rounded-2xl px-8 h-full data-[state=active]:bg-emerald-600 data-[state=active]:text-white font-black text-sm uppercase tracking-widest transition-all">Vegetables</TabsTrigger>
                                <TabsTrigger value="Grains" className="rounded-2xl px-8 h-full data-[state=active]:bg-emerald-600 data-[state=active]:text-white font-black text-sm uppercase tracking-widest transition-all">Grains</TabsTrigger>
                                <TabsTrigger value="Fruits" className="rounded-2xl px-8 h-full data-[state=active]:bg-emerald-600 data-[state=active]:text-white font-black text-sm uppercase tracking-widest transition-all">Fruits</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </Card>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-6 mt-20">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-4xl font-black tracking-tight flex items-center gap-4">
                        Available Seeds
                        <Badge variant="outline" className="rounded-full px-4 py-1 text-emerald-600 border-emerald-200">
                            {filteredSeeds.length} Items Found
                        </Badge>
                    </h2>
                    <Button variant="ghost" className="text-emerald-600 font-bold hover:bg-emerald-50">
                        Advanced Filters <Filter className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                {/* Seeds Grid */}
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <AnimatePresence mode="popLayout">
                        {filteredSeeds.map((seed, idx) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: idx * 0.05 }}
                                key={seed.id}
                            >
                                <Card className="group overflow-hidden rounded-[2.5rem] border-emerald-50 hover:border-emerald-200 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer bg-white">
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <img
                                            src={seed.image}
                                            alt={seed.name}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-5 right-5">
                                            <Badge className="bg-white/90 backdrop-blur-md text-emerald-900 border-none flex items-center gap-1.5 px-4 py-2 rounded-2xl font-black text-sm shadow-xl">
                                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                {seed.rating}
                                            </Badge>
                                        </div>
                                        {idx === 0 && (
                                            <div className="absolute top-5 left-5">
                                                <Badge className="bg-emerald-600 text-white border-none px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">
                                                    Best Seller
                                                </Badge>
                                            </div>
                                        )}
                                        <div className="absolute bottom-5 left-5 flex gap-2">
                                            {seed.tags.map(tag => (
                                                <Badge key={tag} className="bg-black/40 backdrop-blur-md text-white border-none text-[10px] font-bold px-3 py-1.5 rounded-xl">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <CardHeader className="p-8 pb-2">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">{seed.brand} • {seed.variety}</p>
                                            <CardTitle className="text-2xl font-black leading-tight group-hover:text-emerald-600 transition-colors">
                                                {seed.name}
                                            </CardTitle>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="px-8 pb-4">
                                        <p className="text-muted-foreground text-sm font-medium line-clamp-2">
                                            {seed.description}
                                        </p>
                                    </CardContent>

                                    <CardFooter className="p-8 pt-0 flex flex-col gap-6">
                                        <div className="w-full flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Price per {seed.unit}</p>
                                                <p className="text-3xl font-black text-foreground">₹{seed.price}</p>
                                            </div>
                                            <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-black group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                                <ShoppingBag className="h-6 w-6" />
                                            </div>
                                        </div>
                                        <div className="flex w-full">
                                            <Button
                                                variant="outline"
                                                className="w-full rounded-[1.5rem] h-14 border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-black text-xs uppercase tracking-widest transition-all"
                                                onClick={() => navigate(`/growing-guide?crop=${seed.crop}`)}
                                            >
                                                Detailed Blueprint
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Market Insights Integration */}
                <section className="mt-32 space-y-12">
                    <div className="flex items-center justify-between">
                        <h2 className="text-4xl font-black tracking-tight">Local Market Insights</h2>
                        <Link to="/market">
                            <Button variant="ghost" className="text-emerald-600 font-bold hover:bg-emerald-50">View All Mandis <ArrowUpRight className="ml-2 h-4 w-4" /></Button>
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { crop: "Tomato", rate: "₹1,950", change: "+150", trend: "up", mandi: "Azadpur Mandi" },
                            { crop: "Paddy", rate: "₹4,250", change: "+50", trend: "up", mandi: "Karnal Mandi" },
                            { crop: "Wheat", rate: "₹2,200", change: "+75", trend: "up", mandi: "Khanna Mandi" }
                        ].map((mandi, i) => (
                            <Card key={i} className="relative p-8 rounded-[2.5rem] border-emerald-50 hover:border-emerald-200 transition-all hover:shadow-xl bg-white group">
                                <Link to="/market" className="absolute inset-0 z-0" />
                                <div className="relative z-10 pointer-events-none">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="bg-emerald-50 p-4 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                            <TrendingUp className="h-6 w-6" />
                                        </div>
                                        <Badge className="bg-emerald-100 text-emerald-700 border-none px-3 py-1 rounded-full font-bold">Live</Badge>
                                    </div>
                                    <h3 className="text-2xl font-black mb-1">{mandi.crop}</h3>
                                    <a
                                        href={`https://maps.google.com/?q=${encodeURIComponent(mandi.mandi)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs text-muted-foreground font-bold inline-flex items-center gap-1 mb-4 pointer-events-auto hover:text-emerald-600 transition-colors"
                                    >
                                        <MapPin className="h-3 w-3 text-emerald-500" /> {mandi.mandi}
                                    </a>
                                    <div className="flex items-end justify-between border-t border-dashed border-emerald-100 pt-4">
                                        <div>
                                            <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Current Rate</p>
                                            <p className="text-3xl font-black text-emerald-600">{mandi.rate}</p>
                                        </div>
                                        <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                            <ArrowRight className="h-5 w-5" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Free Advice Banner */}
                <section className="mt-32 max-w-5xl mx-auto bg-emerald-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden flex flex-col items-center text-center">
                    <div className="relative z-10 max-w-2xl space-y-8">
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-none px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest">
                            24/7 Expert Support
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                            Get Free Agricultural <br /> <span className="text-emerald-400">Advice on WhatsApp</span>
                        </h2>
                        <p className="text-emerald-100/90 text-lg font-medium max-w-xl mx-auto">
                            Connect directly with our AI assistant for personalized crop guidance, disease management, and market insights.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto w-full pt-6">
                            <Input
                                type="tel"
                                maxLength={10}
                                placeholder="10-digit mobile number"
                                className="h-16 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-white/50 text-xl px-6 flex-1 text-center sm:text-left focus-visible:ring-emerald-500"
                                value={mobileNumber}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, "");
                                    if (val.length <= 10) setMobileNumber(val);
                                }}
                            />
                            <Button
                                className="h-16 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-lg px-8 shadow-xl shadow-emerald-500/20 transition-all hover:scale-105"
                                onClick={handleGetAdvice}
                            >
                                Get Advice
                            </Button>
                        </div>
                    </div>
                    {/* Abstract Shapes */}
                    <Leaf className="absolute -bottom-10 -left-10 h-64 w-64 text-emerald-800/50 -rotate-45 pointer-events-none" />
                    <Sprout className="absolute -top-10 -right-10 h-64 w-64 text-emerald-800/50 rotate-12 pointer-events-none" />
                </section>

            </main>
        </div>
    );
};

export default SeedsBuyer;
