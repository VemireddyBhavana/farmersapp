import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
    Search, Filter, Sprout, Star, ChevronRight, Leaf, Droplets, Sun, TrendingUp, 
    MapPin, ArrowUpRight, BadgeCheck, ArrowRight, BookOpen, ShoppingBag, 
    Trash2, Plus, Minus, X, ChevronDown, CheckCircle2, Package, Truck, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/CartContext";
import { seedsData } from "@/lib/seedsData";

// --- Sub-Components ---

const SidebarFilters = ({ 
    filters,
    setFilters
}: any) => (
    <div className="space-y-8 py-4">
        <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-emerald-900 border-l-4 border-emerald-500 pl-3">Seasonal Crops</h3>
            <div className="grid gap-2">
                {["All", "Kharif", "Rabi", "Zaid"].map((season) => (
                    <label key={season} className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 cursor-pointer transition-colors group">
                        <div className={cn(
                            "h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all",
                            filters.season === season ? "bg-emerald-600 border-emerald-600" : "border-emerald-200 group-hover:border-emerald-400"
                        )}>
                            {filters.season === season && <CheckCircle2 className="h-3 w-3 text-white" />}
                        </div>
                        <input 
                            type="radio" 
                            className="hidden" 
                            name="season" 
                            checked={filters.season === season}
                            onChange={() => setFilters((prev: any) => ({ ...prev, season }))}
                        />
                        <span className={cn("text-sm font-bold", filters.season === season ? "text-emerald-900" : "text-emerald-600/70")}>
                            {season === "All" ? "All Seasons" : `${season} Season`}
                        </span>
                    </label>
                ))}
            </div>
        </div>

        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-black uppercase tracking-widest text-emerald-900 border-l-4 border-emerald-500 pl-3">Budget (₹)</h3>
                <span className="text-xs font-black text-emerald-600">Up to ₹{filters.price}</span>
            </div>
            <div className="px-2">
                <Slider 
                    value={[filters.price]} 
                    max={5000} 
                    step={100} 
                    onValueChange={(vals) => setFilters((prev: any) => ({ ...prev, price: vals[0] }))}
                    className="py-4"
                />
                <div className="flex justify-between text-[10px] font-black text-emerald-400 uppercase tracking-tighter pt-2">
                    <span>₹0</span>
                    <span>₹2500</span>
                    <span>₹5000</span>
                </div>
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-emerald-900 border-l-4 border-emerald-500 pl-3">Seed Technology</h3>
            <div className="grid gap-2">
                {["Hybrid", "Organic", "Non-GMO"].map((type) => (
                    <label key={type} className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 cursor-pointer transition-colors group">
                        <Checkbox 
                            id={type} 
                            className="border-2 border-emerald-200 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-none"
                            checked={filters.seedType.includes(type)}
                            onCheckedChange={(checked) => {
                                setFilters((prev: any) => ({
                                    ...prev,
                                    seedType: checked
                                        ? [...prev.seedType, type]
                                        : prev.seedType.filter((t: string) => t !== type)
                                }));
                            }}
                        />
                        <span className="text-sm font-bold text-emerald-600/70 group-hover:text-emerald-900 transition-colors">{type}</span>
                    </label>
                ))}
            </div>
        </div>

        <div className="bg-emerald-900 rounded-3xl p-6 text-white space-y-4 shadow-xl shadow-emerald-900/20">
            <div className="p-3 bg-white/10 rounded-2xl w-fit">
                <Zap className="h-6 w-6 text-emerald-400" />
            </div>
            <h4 className="font-black leading-tight">Farmer's Pro <br /> Subscription</h4>
            <p className="text-xs text-emerald-100/60 leading-relaxed font-medium">Get 10% extra discount on all seeds plus free expert advice.</p>
            <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs uppercase tracking-widest h-12 rounded-xl">Upgrade Now</Button>
        </div>
    </div>
);

const ProductCard = ({ seed, idx, onAddToCart, onBuyNow }: any) => {
    const navigate = useNavigate();
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: idx * 0.05 }}
        >
            <Card className="group overflow-hidden rounded-[2.5rem] border-emerald-50 hover:border-emerald-200 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer bg-white h-full flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden shrink-0">
                    <img
                        src={seed.image}
                        alt={seed.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-5 right-5 z-10">
                        <Badge className="bg-white/95 backdrop-blur-md text-emerald-900 border-none flex items-center gap-1.5 px-4 py-2 rounded-2xl font-black text-sm shadow-xl">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            {seed.rating}
                        </Badge>
                    </div>
                    
                    <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
                        {seed.rating > 4.7 && (
                            <Badge className="bg-emerald-600 text-white border-none px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">
                                Best Seller
                            </Badge>
                        )}
                        <Badge className="bg-amber-500 text-white border-none px-4 py-1.5 rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-xl">
                            {seed.season[0]} Season
                        </Badge>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                        <div className="flex gap-2 w-full">
                            <Button 
                                className="flex-1 h-12 rounded-xl bg-white text-emerald-900 font-black text-xs uppercase hover:bg-emerald-100"
                                onClick={(e) => { e.stopPropagation(); onAddToCart(seed); }}
                            >
                                <Plus className="h-4 w-4 mr-2" /> Add 
                            </Button>
                            <Button 
                                className="flex-1 h-12 rounded-xl bg-emerald-500 text-white font-black text-xs uppercase hover:bg-emerald-400"
                                onClick={(e) => { e.stopPropagation(); onBuyNow(seed); }}
                            >
                                Buy Now
                            </Button>
                        </div>
                    </div>
                </div>

                <CardHeader className="p-8 pb-3 relative">
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">{seed.brand}</p>
                            <BadgeCheck className="h-4 w-4 text-emerald-500" />
                        </div>
                        <CardTitle className="text-2xl font-black leading-tight group-hover:text-emerald-600 transition-colors">
                            {seed.name}
                        </CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="px-8 flex-1">
                    <p className="text-muted-foreground text-sm font-medium line-clamp-2 leading-relaxed">
                        {seed.description}
                    </p>
                </CardContent>

                <CardFooter className="p-8 pt-0 flex flex-col gap-6 mt-auto">
                    <div className="w-full flex items-center justify-between bg-emerald-50/30 p-4 rounded-3xl border border-emerald-50/50">
                        <div className="space-y-0.5">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Rate / {seed.unit}</p>
                            <p className="text-3xl font-black text-emerald-950 tracking-tighter">₹{seed.price}</p>
                        </div>
                        <div className="text-right">
                           <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 justify-end">
                                <Truck className="h-3 w-3" /> Same day
                           </div>
                           <p className="text-[10px] font-bold text-emerald-600/60 bg-emerald-100/50 px-2 py-1 rounded-lg">Stock: {seed.stock} units</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 w-full">
                        <Button 
                            variant="outline" 
                            className="h-14 rounded-2xl border-emerald-100 text-emerald-900 font-black text-xs uppercase tracking-widest hover:bg-emerald-50 transition-all"
                            onClick={(e) => { e.stopPropagation(); onAddToCart(seed); }}
                        >
                            Add to Cart
                        </Button>
                        <Button 
                            className="h-14 rounded-2xl bg-emerald-900 text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-800 shadow-xl shadow-emerald-900/10 transition-all"
                            onClick={(e) => { e.stopPropagation(); onBuyNow(seed); }}
                        >
                            Quick Buy
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

// --- Main Page Component ---

const SeedsBuyer = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [mobileNumber, setMobileNumber] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [filters, setFilters] = useState({
        season: "All",
        price: 5000,
        seedType: [] as string[]
    });
    
    const { toast } = useToast();
    const navigate = useNavigate();
    const { addToCart, removeFromCart, updateQuantity, cart, totalItems, totalPrice } = useCart();

    const handleBuyNow = (seed: any) => {
        addToCart(seed);
        setIsCartOpen(true);
    };

    const handleGetAdvice = () => {
        if (!/^\d{10}$/.test(mobileNumber)) {
            toast({
                title: "Invalid Number",
                description: "Please enter a valid 10-digit mobile number",
                variant: "destructive"
            });
            return;
        }
        navigate(`/whatsapp-bot?phone=${mobileNumber}&initialMessage=true`);
    };

    const filteredSeeds = seedsData.filter((seed) => {
        // SEARCH FILTER
        const matchesSearch = seed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            seed.brand.toLowerCase().includes(searchQuery.toLowerCase());
        
        // CATEGORY FILTER
        const matchesCategory = selectedCategory === "All" || seed.category === selectedCategory;
        
        // SEASON FILTER
        const matchesSeason = filters.season === "All" || seed.season === filters.season;
        
        // PRICE FILTER
        const matchesPrice = seed.price <= filters.price;
        
        // SEED TYPE FILTER
        const matchesType = filters.seedType.length === 0 || 
            filters.seedType.includes(seed.seedType);

        return matchesSearch && matchesCategory && matchesSeason && matchesPrice && matchesType;
    });

    return (
        <div className="min-h-screen bg-[#fafcfb]">
            {/* 1. Global Header with Cart */}
            <header className="bg-emerald-950 py-20 px-6 relative overflow-hidden">
                <div className="container mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-xl space-y-6"
                    >
                        <Badge className="bg-emerald-500 text-emerald-950 border-none px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em]">
                            Direct to Farm Delivery
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.85]">
                            Farmer's First <br />
                            <span className="text-emerald-400 italic">Marketplace</span>
                        </h1>
                        <p className="text-emerald-100/60 text-lg font-medium leading-relaxed">
                            Certified premium seeds from India's leading agricultural scientists. Trusted by 2M+ farmers nationwide.
                        </p>
                    </motion.div>

                    <div className="flex flex-col items-center gap-6">
                        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                            <SheetTrigger asChild>
                                <button className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center gap-3 hover:bg-white/10 transition-all group relative overflow-hidden">
                                     <div className="bg-emerald-500 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                                        <ShoppingBag className="h-8 w-8 text-emerald-950" />
                                     </div>
                                     <div className="text-center">
                                         <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Items In Basket</p>
                                         <p className="text-3xl font-black text-white leading-none">{totalItems}</p>
                                     </div>
                                     {totalItems > 0 && <span className="absolute top-0 right-0 h-4 w-full bg-emerald-500/20 animate-pulse" />}
                                </button>
                            </SheetTrigger>
                            <SheetContent className="w-full sm:max-w-md bg-white border-l border-emerald-100 p-0 flex flex-col">
                                <SheetHeader className="p-8 bg-emerald-900 text-white">
                                    <SheetTitle className="text-3xl font-black text-white flex items-center gap-4">
                                        <div className="bg-emerald-500 p-3 rounded-2xl">
                                            <ShoppingBag className="h-6 w-6 text-emerald-900" />
                                        </div>
                                        Your Harvest
                                    </SheetTitle>
                                    <SheetDescription className="text-emerald-200 mt-2 font-medium">
                                        Professional quality seeds selected for your soil.
                                    </SheetDescription>
                                </SheetHeader>
                                
                                <ScrollArea className="flex-1 px-8 py-6">
                                    {cart.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 pt-20">
                                            <div className="h-24 w-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-200">
                                                <ShoppingBag className="h-12 w-12" />
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-xl font-black text-emerald-900">Your basket is resting</h4>
                                                <p className="text-emerald-600 font-medium">Add some potential to start your season.</p>
                                            </div>
                                            <Button variant="outline" onClick={() => setIsCartOpen(false)} className="rounded-2xl border-emerald-200 h-14 px-8 font-black uppercase text-xs tracking-widest">Explore Seeds</Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-8">
                                            {cart.map((item) => (
                                                <div key={item.id} className="flex gap-6 group relative">
                                                    <div className="h-28 w-28 rounded-[2rem] overflow-hidden bg-emerald-50 shrink-0 border border-emerald-100 shadow-sm transition-transform group-hover:scale-105">
                                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                                    </div>
                                                    <div className="flex-1 flex flex-col justify-between">
                                                        <div className="space-y-1">
                                                            <div className="flex justify-between items-start">
                                                                <h4 className="font-black text-emerald-950 leading-[1.1] text-lg">{item.name}</h4>
                                                                <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                                                                    <Trash2 className="h-5 w-5" />
                                                                </button>
                                                            </div>
                                                            <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">{item.brand}</p>
                                                        </div>
                                                        <div className="flex items-center justify-between mt-4">
                                                            <div className="flex items-center gap-3 bg-emerald-50 p-1.5 rounded-2xl">
                                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 rounded-xl bg-white flex items-center justify-center shadow-sm hover:bg-emerald-600 hover:text-white transition-all"><Minus className="h-3 w-3" /></button>
                                                                <span className="font-black text-emerald-900 w-4 text-center">{item.quantity}</span>
                                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 rounded-xl bg-white flex items-center justify-center shadow-sm hover:bg-emerald-600 hover:text-white transition-all"><Plus className="h-3 w-3" /></button>
                                                            </div>
                                                            <p className="font-black text-2xl text-emerald-950 tracking-tighter">₹{(item.price * item.quantity).toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ScrollArea>
                                
                                <div className="p-8 border-t border-emerald-100 bg-emerald-50/30 space-y-6">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Grand Total</p>
                                            <p className="text-4xl font-black text-emerald-950 tracking-tighter">₹{totalPrice.toLocaleString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest flex items-center gap-1.5 justify-end">
                                               <Truck className="h-3 w-3" /> Free Delivery
                                            </p>
                                            <p className="text-xs font-bold text-emerald-400">Next-day arrival</p>
                                        </div>
                                    </div>
                                    <Button 
                                        className="w-full h-18 rounded-[2rem] bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xl shadow-2xl shadow-emerald-600/20 py-8 transition-transform active:scale-[0.98]"
                                        disabled={cart.length === 0}
                                        onClick={() => { setIsCartOpen(false); navigate("/checkout"); }}
                                    >
                                        Proceed to Buy <ArrowRight className="ml-3 h-6 w-6" />
                                    </Button>
                                    <div className="flex items-center justify-center gap-4 text-[10px] font-black text-emerald-900/40 uppercase tracking-widest">
                                        <div className="flex items-center gap-1"><Package className="h-3 w-3" /> Secure Packing</div>
                                        <div className="w-1 h-1 bg-emerald-200 rounded-full" />
                                        <div className="flex items-center gap-1"><Truck className="h-3 w-3" /> Farm Track</div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                <div className="absolute top-0 right-0 h-full w-1/3 opacity-5 pointer-events-none">
                    <Leaf className="h-64 w-64 absolute top-10 right-10 rotate-45" />
                    <Sprout className="h-full w-full absolute -bottom-20 -right-20" />
                </div>
            </header>

            {/* 2. Top Filter Bar (Sticky with Glass Effect) */}
            <div className="sticky top-0 z-40 px-6 py-6 transition-all duration-500 bg-[#fafcfb]/60 backdrop-blur-xl border-b border-emerald-100/50">
                <div className="container mx-auto">
                    <div className="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] p-3 shadow-2xl shadow-emerald-900/10 border border-white/50 flex flex-nowrap items-center justify-between gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        {/* Search */}
                        <div className="shrink-0 w-full max-w-[280px] lg:max-w-[360px]">
                            <div className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500 transition-transform group-focus-within:scale-110" />
                                <Input
                                    placeholder="Find your seeds..."
                                    className="pl-16 h-14 lg:h-16 rounded-[1.8rem] bg-emerald-50/50 border-emerald-100 focus-visible:ring-emerald-500 text-base font-medium transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Centered Categories */}
                        <div className="flex-1 flex justify-center min-w-0">
                            <Tabs defaultValue="All" onValueChange={setSelectedCategory} className="w-auto">
                                <TabsList className="bg-transparent p-0 h-16 flex flex-nowrap gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                                    {["All", "Grains", "Vegetables", "Fruits", "Pulses", "Oil seeds"].map((cat) => (
                                        <TabsTrigger 
                                            key={cat}
                                            value={cat} 
                                            className="rounded-2xl px-8 h-full bg-emerald-50/50 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-black text-[10px] uppercase tracking-widest transition-all shrink-0 border border-emerald-100/30"
                                        >
                                            {cat === "All" ? "All Crops" : cat}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>
                        </div>

                        {/* Mobile Side Filter Toggle */}
                        <div className="lg:hidden shrink-0">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="h-16 w-16 rounded-full border-emerald-100 text-emerald-600 shadow-xl bg-white">
                                        <Filter className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-80 bg-white p-0">
                                    <div className="p-8 bg-emerald-900 text-white flex justify-between items-center shrink-0">
                                        <h3 className="text-xl font-black flex items-center gap-2"><Filter className="h-5 w-5" /> Filters</h3>
                                        <SheetClose className="p-2 border border-white/20 rounded-xl hover:bg-white/10 transition-colors"><X className="h-4 w-4" /></SheetClose>
                                    </div>
                                    <ScrollArea className="h-[calc(100vh-5rem)] p-8">
                                        <SidebarFilters 
                                            filters={filters}
                                            setFilters={setFilters}
                                        />
                                    </ScrollArea>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* Right Quick Filter (Desktop) */}
                        <div className="hidden lg:flex items-center gap-4 shrink-0">
                             <div className="flex items-center gap-2 bg-emerald-50/50 px-6 h-16 rounded-[1.8rem] border border-emerald-100 shadow-sm">
                                <Filter className="h-4 w-4 text-emerald-500" />
                                <span className="text-[10px] font-black text-emerald-900 uppercase tracking-widest">Sort By:</span>
                                <select 
                                    className="bg-transparent font-black text-[10px] uppercase tracking-widest text-emerald-600 focus:outline-none cursor-pointer"
                                    value={filters.season}
                                    onChange={(e) => setFilters(prev => ({ ...prev, season: e.target.value }))}
                                >
                                    <option value="All">Seasons</option>
                                    <option value="Kharif">Kharif</option>
                                    <option value="Rabi">Rabi</option>
                                    <option value="Zaid">Zaid</option>
                                </select>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Main Interface Layout */}
            <main className="container mx-auto px-6 mt-10">
                <div className="flex gap-12">
                    {/* Left Sidebar Filters (Amazon Style) */}
                    <aside className="hidden lg:block w-80 shrink-0 sticky top-32 h-[calc(100vh-10rem)] overflow-y-auto pr-6 scrollbar-hide border-r border-emerald-50">
                            <SidebarFilters 
                                filters={filters}
                                setFilters={setFilters}
                            />
                    </aside>

                    {/* Product Grid Area */}
                    <div className="flex-1 space-y-12 pb-32">
                        <div className="flex items-end justify-between border-b border-emerald-50 pb-8">
                             <div>
                                <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-2 font-mono">Marketplace Feed</h4>
                                <h1 className="text-4xl font-black text-emerald-950 tracking-tighter">Certified Seed Catalog</h1>
                             </div>
                             <div className="text-right">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 italic">Now Browsing</p>
                                <Badge className="bg-emerald-900 text-emerald-400 border-none px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">
                                    {filteredSeeds.length} Varietal Clones
                                </Badge>
                             </div>
                        </div>

                        {filteredSeeds.length === 0 ? (
                            <div className="py-32 flex flex-col items-center text-center space-y-6 bg-emerald-50/20 rounded-[4rem] border-2 border-dashed border-emerald-100/50 mx-4">
                                <div className="h-28 w-28 bg-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-900/5">
                                    <Search className="h-12 w-12 text-emerald-200" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-emerald-900">Crop Not Found</h3>
                                    <p className="text-emerald-600/70 font-medium max-w-sm mx-auto">We couldn't find seeds matching your filters. Try expanding your season or budget range.</p>
                                </div>
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory("All");
                                        setFilters({
                                            season: "All",
                                            price: 5000,
                                            seedType: []
                                        });
                                    }}
                                    className="rounded-2xl border-emerald-200 h-16 px-10 font-black uppercase text-xs tracking-[0.2em] hover:bg-emerald-600 hover:text-white transition-all shadow-lg shadow-emerald-900/5"
                                >
                                    Reset Discovery
                                </Button>
                            </div>
                        ) : (
                            <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
                                <AnimatePresence mode="popLayout">
                                    {filteredSeeds.map((seed, idx) => (
                                        <ProductCard 
                                            key={seed.id} 
                                            seed={seed} 
                                            idx={idx} 
                                            onAddToCart={addToCart} 
                                            onBuyNow={handleBuyNow} 
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* Footer Discovery Banner */}
                        <section className="bg-emerald-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden flex flex-col items-center text-center mt-20">
                            <div className="relative z-10 max-w-2xl space-y-8">
                                <div className="bg-emerald-500/20 w-fit mx-auto p-4 rounded-3xl backdrop-blur-md border border-emerald-400/20">
                                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter">
                                    Scientific Crop <br /> <span className="text-emerald-400 italic">Intelligence</span>
                                </h2>
                                <p className="text-emerald-100/60 text-lg font-medium">
                                    Enter your 10-digit number for free soil-specific seed recommendations via WhatsApp.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto w-full pt-6">
                                    <Input
                                        type="tel"
                                        maxLength={10}
                                        placeholder="Mobile Number"
                                        className="h-16 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/40 text-xl px-8 flex-1 focus-visible:ring-emerald-500 transition-all font-black tracking-widest text-center"
                                        value={mobileNumber}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, "");
                                            if (val.length <= 10) setMobileNumber(val);
                                        }}
                                    />
                                    <Button
                                        className="h-16 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-lg px-10 shadow-2xl shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95"
                                        onClick={handleGetAdvice}
                                    >
                                        Advice
                                    </Button>
                                </div>
                            </div>
                            <Leaf className="absolute -bottom-20 -left-20 h-80 w-80 text-emerald-800/20 -rotate-45 pointer-events-none" />
                            <Sprout className="absolute -top-20 -right-20 h-80 w-80 text-emerald-800/20 rotate-12 pointer-events-none" />
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SeedsBuyer;
