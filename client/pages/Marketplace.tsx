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
    <div className="container mx-auto px-4 py-8 space-y-12 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-emerald-600" />
              {t('agriMarketplace') || "Agriculture Marketplace"}
            </h1>
            <p className="text-slate-500 font-medium">
              {t('agriMarketplaceDesc') || "Buy and sell crops, machinery, seeds, and more."}
            </p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 shadow-lg shadow-emerald-600/20">
            <Plus className="mr-2 h-5 w-5" /> {t('listYourItem') || "List Your Item"}
          </Button>
        </div>

        {/* Categories / Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <TabsList className="bg-white border w-full md:w-auto h-auto p-1 grid grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="all" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white h-10 px-6 font-bold uppercase text-[10px] tracking-widest">
                ALL
              </TabsTrigger>
              <TabsTrigger value="crops" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white h-10 px-6 font-bold uppercase text-[10px] tracking-widest">
                {t('categoryCrops') || "CROPS"}
              </TabsTrigger>
              <TabsTrigger value="machinery" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white h-10 px-6 font-bold uppercase text-[10px] tracking-widest">
                {t('categoryMachinery') || "MACHINERY"}
              </TabsTrigger>
              <TabsTrigger value="seeds" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white h-10 px-6 font-bold uppercase text-[10px] tracking-widest">
                {t('categorySeeds') || "SEEDS"}
              </TabsTrigger>
              <TabsTrigger value="tools" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white h-10 px-6 font-bold uppercase text-[10px] tracking-widest">
                {t('categoryTools') || "TOOLS"}
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search listings..." className="pl-10 h-10 bg-white border-slate-200" />
              </div>
              <Button variant="outline" className="h-10 px-3">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_LISTINGS.map((listing) => (
                <Card key={listing.id} className="group border-slate-200 hover:border-emerald-500 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden bg-white">
                  <div className="h-48 w-full overflow-hidden relative">
                    <img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <Badge className="absolute top-4 left-4 bg-emerald-600 text-white border-none shadow-md">
                      {listing.category}
                    </Badge>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                      <TrendingUp className="h-3 w-3 text-emerald-600" /> POPULAR
                    </div>
                  </div>
                  <CardHeader className="p-6">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {listing.title}
                      </CardTitle>
                      <span className="text-lg font-black text-emerald-700">{listing.price}</span>
                    </div>
                    <CardDescription className="flex items-center gap-1 mt-2 font-medium">
                      <MapPin className="h-3 w-3 text-red-500" /> {listing.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0 space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                        {listing.seller[0]}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-800">{listing.seller}</p>
                        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">VERIFIED SELLER</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-emerald-600 font-bold hover:bg-emerald-100 hover:text-emerald-700">
                        CONTACT
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 py-4 border-t bg-slate-50/50 flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{listing.date}</span>
                    <button className="text-xs font-bold text-emerald-600 flex items-center hover:underline">
                      VIEW DETAILS <ChevronRight className="h-3 w-3 ml-0.5" />
                    </button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Categories Grid (Secondary View) */}
      <section className="space-y-6 pt-12 border-t">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight tracking-widest border-l-4 border-emerald-600 pl-4">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[
            { id: "crops", name: t('categoryCrops'), icon: Sprout, color: "text-emerald-600", bg: "bg-emerald-50", count: "1,200+ Listings" },
            { id: "machinery", name: t('categoryMachinery'), icon: Tractor, color: "text-blue-600", bg: "bg-blue-50", count: "450+ Listings" },
            { id: "seeds", name: t('categorySeeds'), icon: Tag, color: "text-amber-600", bg: "bg-amber-50", count: "800+ Listings" },
            { id: "fertilizers", name: t('categoryFertilizers'), icon: FlaskConical, color: "text-purple-600", bg: "bg-purple-50", count: "300+ Listings" },
            { id: "tools", name: t('categoryTools'), icon: Wrench, color: "text-cyan-600", bg: "bg-cyan-50", count: "600+ Listings" },
          ].map((cat, i) => (
            <div key={i} className="group cursor-pointer" onClick={() => setActiveCategory(cat.id)}>
              <div className={cn("p-8 rounded-2xl flex flex-col items-center text-center space-y-4 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 border border-transparent group-hover:border-emerald-100 shadow-sm", cat.bg, activeCategory === cat.id && "ring-2 ring-emerald-500")}>
                <cat.icon className={cn("h-10 w-10", cat.color)} />
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-800 uppercase tracking-tight text-sm">{cat.name}</h3>
                  <p className="text-[10px] text-slate-500 font-bold tracking-widest leading-none">{cat.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Connect with Local Buyers Section */}
      <section className="bg-[#106A3A] text-white rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-white/10 text-emerald-100 border-white/20 uppercase tracking-widest font-black text-[10px] px-3 py-1">
              NETWORK & OPPORTUNITY
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter">
              Connect with Local Buyers & Dealers
            </h2>
            <p className="text-xl text-emerald-100/90 leading-relaxed font-medium border-l-4 border-emerald-400 pl-6">
              Skip the middlemen. Directly connect with thousands of local buyers, mandi agents, and authorized dealers in your district.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-white text-emerald-900 hover:bg-emerald-50 h-14 px-8 font-black text-lg shadow-xl shadow-emerald-900/20" asChild>
                <Link to="/location">{t('findNearbyBuyers')}</Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8 font-black text-lg" asChild>
                <Link to="/contact">{t('registerAsDealer')}</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-8">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col items-center text-center space-y-2">
                <Users className="h-8 w-8 text-emerald-300" />
                <p className="text-2xl font-black">5,000+</p>
                <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest">Active Buyers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col items-center text-center space-y-2">
                <Package className="h-8 w-8 text-emerald-300" />
                <p className="text-2xl font-black">10K+</p>
                <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest">Listings Sold</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col items-center text-center space-y-2">
                <MapPin className="h-8 w-8 text-emerald-300" />
                <p className="text-2xl font-black">200+</p>
                <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest">Districts Covered</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col items-center text-center space-y-2">
                <Star className="h-8 w-8 text-emerald-300" />
                <p className="text-2xl font-black">4.9/5</p>
                <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest">Farmer Rating</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-[-10%] bottom-[-10%] w-1/2 h-1/2 bg-emerald-400 blur-[150px] opacity-20" />
      </section>
    </div>
  );
}
