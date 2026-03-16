import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Plus, 
  Tractor, 
  Sprout, 
  FlaskConical, 
  Wrench, 
  ChevronRight,
  MapPin,
  Tag,
  ArrowRight,
  TrendingUp,
  Package,
  Users,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const MOCK_LISTINGS = [
  {
    id: 1,
    title: "Organic Sona Masoori Paddy",
    category: "Crops",
    price: "₹1,850/Quintal",
    location: "Kurnool, AP",
    seller: "Ramesh Kumar",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400",
    date: "2h ago"
  },
  {
    id: 2,
    title: "John Deere 5050D Tractor",
    category: "Machinery",
    price: "₹4,50,000",
    location: "Chittoor, AP",
    seller: "AgriEquip Solutions",
    image: "https://images.unsplash.com/photo-1594411133744-48616194f47a?auto=format&fit=crop&q=80&w=400",
    date: "5h ago"
  },
  {
    id: 3,
    title: "Hybrid Cotton Seeds (500g)",
    category: "Seeds",
    price: "₹850",
    location: "Nagpur, MH",
    seller: "Bharat Seeds",
    image: "https://images.unsplash.com/photo-1594411133744-48616194f47a?auto=format&fit=crop&q=80&w=400",
    date: "Yesterday"
  }
];

export default function Marketplace() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="bg-slate-50 min-h-screen pb-20 overflow-x-hidden">
      {/* Premium Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/agri_marketplace_hero_1773637836147.png" 
            alt="Marketplace Hero" 
            className="w-full h-full object-cover scale-110 motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-50" />
        </div>

        <div className="container relative z-10 px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 backdrop-blur-md px-4 py-1 text-xs font-black tracking-[0.2em] uppercase">
              {t('buySellPlatform') || "DIRECT FARMER-TO-BUYER MARKET"}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none italic">
              {t('agriMarketplace') || "AGRI MARKETPLACE"}
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 font-medium max-w-2xl mx-auto leading-tight">
              {t('agriMarketplaceDesc') || "The premier digital hub for crops, machinery, and agricultural innovation."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-3xl mx-auto w-full"
          >
            <div className="relative group p-1 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl">
              <div className="flex bg-white rounded-xl overflow-hidden shadow-inner">
                <div className="flex-1 relative flex items-center">
                  <Search className="absolute left-4 h-5 w-5 text-slate-400" />
                  <Input 
                    placeholder={t('searchServices') || "Search for crops, machinery, or tools..."} 
                    className="pl-12 h-16 border-none text-lg focus-visible:ring-0 placeholder:text-slate-400 font-medium"
                  />
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 border-l border-slate-100">
                   <Button variant="ghost" className="h-12 px-4 gap-2 text-slate-600 font-bold hover:bg-white rounded-lg">
                    <Filter className="h-4 w-4" /> {t('filter') || "Filter"}
                  </Button>
                  <Button className="h-12 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-lg shadow-lg shadow-emerald-600/20 uppercase tracking-wider text-xs">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-12 relative z-20 space-y-16">
        {/* Quick Stats / Action Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="h-24 bg-white hover:bg-emerald-50 border border-slate-200 rounded-3xl flex flex-col items-center justify-center space-y-1 shadow-xl shadow-slate-200/50 group transition-all" asChild>
            <Link to="/list-item">
              <Plus className="h-6 w-6 text-emerald-600 group-hover:scale-125 transition-transform" />
              <span className="text-xs font-black text-slate-900 uppercase tracking-widest">{t('listYourItem') || "LIST NEW ITEM"}</span>
            </Link>
          </Button>
          {[
            { label: t('activeBuyers'), value: "5,000+", icon: Users },
            { label: t('listingsSold'), value: "12K+", icon: Package },
            { label: t('farmerRating'), value: "4.9/5", icon: Star },
          ].map((stat, i) => (
            <div key={i} className="h-24 bg-white border border-slate-200 rounded-3xl flex flex-col items-center justify-center space-y-1 shadow-xl shadow-slate-200/50">
              <stat.icon className="h-5 w-5 text-emerald-600" />
              <div className="flex flex-col items-center -space-y-1">
                <span className="text-xl font-black text-slate-900">{stat.value}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Categories Section */}
        <section className="space-y-8">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">{t('browseBySubCategory') || "EXPLORE CATEGORIES"}</h2>
              <div className="h-1.5 w-24 bg-emerald-500 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { id: "crops", name: t('categoryCrops'), icon: Sprout, color: "text-emerald-600", bg: "bg-emerald-50", count: "1,200+" },
              { id: "machinery", name: t('categoryMachinery'), icon: Tractor, color: "text-blue-600", bg: "bg-blue-50", count: "450+" },
              { id: "seeds", name: t('categorySeeds'), icon: Tag, color: "text-amber-600", bg: "bg-amber-50", count: "800+" },
              { id: "fertilizers", name: t('categoryFertilizers'), icon: FlaskConical, color: "text-purple-600", bg: "bg-purple-50", count: "300+" },
              { id: "tools", name: t('categoryTools'), icon: Wrench, color: "text-cyan-600", bg: "bg-cyan-50", count: "600+" },
            ].map((cat) => (
              <motion.button 
                key={cat.id}
                whileHover={{ y: -5 }}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "p-6 rounded-[2.5rem] flex flex-col items-center text-center space-y-3 transition-all duration-300 border-2",
                  activeCategory === cat.id 
                    ? "bg-white border-emerald-500 shadow-2xl shadow-emerald-500/20" 
                    : "bg-white border-transparent hover:border-slate-200 shadow-lg shadow-slate-200/50"
                )}
              >
                <div className={cn("p-4 rounded-3xl", cat.bg)}>
                  <cat.icon className={cn("h-8 w-8", cat.color)} />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-black text-slate-800 uppercase tracking-tighter text-sm">{cat.name}</h3>
                  <p className="text-[10px] text-slate-400 font-bold tracking-widest leading-none">{cat.count} ITEMS</p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Featured Listings */}
        <section className="space-y-8">
           <div className="flex items-end justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">{t('featuredListings') || "FEATURED OFFERS"}</h2>
              <div className="h-1.5 w-24 bg-emerald-500 rounded-full" />
            </div>
            <Link to="/listings" className="text-xs font-black text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group">
              VIEW ALL LISTINGS <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_LISTINGS.map((listing, i) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[3rem] p-4 border border-slate-200 hover:border-emerald-500 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] relative">
                  <img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-white/90 backdrop-blur-md text-emerald-800 border-none font-black text-[10px] px-3 py-1">
                      {listing.category.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                     <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black h-12 rounded-2xl shadow-xl">
                      VIEW LISTING
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">
                        {listing.title}
                      </h3>
                      <div className="flex items-center gap-1 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                        <MapPin className="h-3 w-3 text-red-500" /> {listing.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-emerald-700 tracking-tighter">{listing.price}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{listing.date}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 font-black text-sm">
                        {listing.seller[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-800">{listing.seller}</span>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(s => <Star key={s} className="h-2 w-2 fill-amber-400 text-amber-400" />)}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-xl border-slate-200 font-black text-[10px] h-10 px-4 hover:bg-slate-50 uppercase tracking-widest">
                      CONTACT
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* High-Impact Network Section */}
        <section className="relative rounded-[4rem] overflow-hidden bg-slate-950 p-8 md:p-20 group">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000" 
              alt="Network"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-slate-950/80 to-transparent" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-emerald-500 text-white border-none px-4 py-1 text-xs font-black tracking-widest uppercase">
                  {t('networkOpportunity') || "NETWORK & OPPORTUNITY"}
                </Badge>
                <h2 className="text-4xl md:text-6xl font-black leading-[0.9] text-white tracking-tighter italic">
                  {t('connectLocalBuyers') || "CONNECT WITH\nLOCAL BUYERS"}
                </h2>
                <p className="text-xl text-slate-300 font-medium max-w-lg leading-relaxed">
                  {t('skipMiddlemen') || "Skip the middlemen. Directly connect with thousands of local buyers, agents, and authorized dealers in your district."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-slate-950 hover:bg-emerald-50 h-16 px-10 rounded-2xl font-black text-lg transition-transform hover:-translate-y-1 shadow-2xl shadow-emerald-500/20" asChild>
                  <Link to="/location">{t('findNearbyBuyers') || "FIND BUYERS"}</Link>
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-16 px-10 rounded-2xl font-black text-lg backdrop-blur-md" asChild>
                  <Link to="/contact">{t('registerAsDealer') || "BECOME A DEALER"}</Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 relative">
              {[
                { label: t('activeBuyers'), value: "5,000+", icon: Users },
                { label: t('listingsSold'), value: "10K+", icon: Package },
                { label: t('districts'), value: "200+", icon: MapPin },
                { label: t('farmerRating'), value: "4.9/5", icon: Star },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] space-y-2 hover:bg-white/10 transition-colors">
                  <item.icon className="h-8 w-8 text-emerald-400" />
                  <div>
                    <div className="text-3xl font-black text-white tracking-tighter">{item.value}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</div>
                  </div>
                </div>
              ))}
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 blur-[100px]" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/20 blur-[100px]" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
