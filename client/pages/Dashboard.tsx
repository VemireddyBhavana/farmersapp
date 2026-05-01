import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Tractor,
  Cloud,
  Sun,
  MapPin,
  Calendar,
  IndianRupee,
  Star,
  Zap,
  ChevronRight,
  Droplets,
  Wind,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ArrowLeft,
  X,
  Clock,
  Bug,
  MessageCircle,
  HeartHandshake,
  ScrollText,
  LayoutGrid,
  Camera,
  Loader2,
  Sprout,
  ArrowRight,
  Phone,
  AlertTriangle,
  TrendingUp,
  Landmark,
  BookOpen,
  Fish,
  Bird,
  Leaf,
  Scan,
  Tractor as TractorIcon,
  Sun as SunIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import { useWeather } from "@/hooks/useWeather";
import { useMandi } from "@/hooks/useMandi";
import { CropTrends } from "@/components/CropTrends";

import { speakText } from "@/lib/speech";


export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { weather, loading: weatherLoading, getLocationAndFetch, error: weatherError } = useWeather();
  const { prices: mandiRates, loading: mandiLoading } = useMandi();


  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {/* Main Dashboard Features (Weather, Mandi, etc.) */}
      <section className="grid gap-10 lg:grid-cols-4 pt-8">
        <div className="lg:col-span-3 space-y-12">
          {/* Welcome & Weather Mixed */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-2 rounded-xl bg-primary text-primary-foreground p-8 md:p-12 overflow-hidden relative border border-primary/20 shadow-lg flex flex-col justify-center min-h-[320px]">
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-card/10 text-primary-foreground/90 rounded text-xs font-semibold tracking-wider uppercase border border-white/20">
                  <HeartHandshake className="w-4 h-4" /> {t('empoweringFarmers')}
                </div>
                <h2 className="text-4xl font-extrabold leading-tight">
                  {t('nationalAgriPortal')}, {user?.username || "Farmer"}
                </h2>
                <p className="text-lg text-primary-foreground/80 max-w-lg leading-relaxed border-l-2 border-primary-foreground/40 pl-4 mt-2">
                  {t('dashboardDesc')}
                </p>
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={getLocationAndFetch}
                    className="rounded bg-card text-primary hover:bg-primary/5 h-12 px-6 font-bold shadow-sm"
                  >
                    {t('fetchAreaData')}
                  </button>
                  <Link to="/seeds">
                    <button className="rounded bg-transparent border border-white text-white hover:bg-card/10 h-12 px-6 font-bold">
                      {t('seedPortal')}
                    </button>
                  </Link>
                  <Link to="/kisan-suvidha">
                    <button className="rounded bg-amber-500 text-slate-900 hover:bg-amber-400 h-12 px-6 font-black shadow-lg shadow-amber-500/20 border-none transition-all">
                      {t('kisanSuvidhaTitle')}
                    </button>
                  </Link>
                </div>
              </div>
              <div className="absolute right-0 top-0 w-64 h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            </Card>

            {/* Official Weather Data Table Panel */}
            <Card className="rounded-xl border border-border shadow-sm bg-card overflow-hidden flex flex-col">
              <div className="bg-muted border-b border-border px-4 py-3 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-700 uppercase tracking-widest">{t('meteorologicalData')}</span>
                {weather && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium border border-primary/20">{t('live')}</span>}
              </div>
              <CardContent className="flex-1 flex flex-col p-4 justify-between">
                {weatherLoading ? (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-3">
                    <Loader2 className="h-6 w-6 text-primary animate-spin" />
                    <p className="text-xs font-semibold text-muted-foreground uppercase">{t('fetchingSync')}</p>
                  </div>
                ) : weather ? (
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center bg-muted/50 p-2 rounded">
                      <div className="text-muted-foreground text-xs font-semibold">{t('station')}</div>
                      <div className="text-right font-bold text-foreground flex items-center gap-1"><MapPin className="h-3 w-3 text-red-500" /> {weather.location}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-muted-foreground text-xs font-semibold">{t('tempAndCond')}</div>
                      <div className="text-right font-bold text-foreground flex items-center gap-2">
                        {weather.current.temp}°C <Sun className="h-4 w-4 text-amber-500" />
                      </div>
                    </div>
                    {/* Official Advisory Block */}
                    <div className="p-3 bg-yellow-50 border border-yellow-100 rounded">
                      <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" /> {t('officialAdvisory')}
                      </p>
                      <p className="text-xs font-medium text-amber-900">
                        {weather.current.temp > 35 ? t('criticalHeatWarning') : t('nominalConditions')}
                      </p>
                    </div>
                  </div>
                ) : weatherError ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <AlertTriangle className="h-6 w-6 text-red-500 mb-2" />
                    <button onClick={getLocationAndFetch} className="px-4 py-1.5 border border-border text-slate-600 rounded hover:bg-muted/50 transition-colors text-xs font-bold">
                      {t('retryConnection')}
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
                    <MapPin className="h-6 w-6 text-slate-300" />
                    <button onClick={getLocationAndFetch} className="px-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded transition-colors text-xs font-bold">{t('authorizeGPS')}</button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Access Grid */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground border-b-2 border-primary pb-2 inline-block">{t('portalServices')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: t('cropCalendar'), path: "/calendar", icon: Calendar, color: "bg-primary/5 text-primary border-primary/10" },
                { name: t('pestAdvisory'), path: "/pests", icon: Bug, color: "bg-primary/5 text-primary border-primary/10" },
                { name: t('kisanSupport'), path: "/chat", icon: MessageCircle, color: "bg-primary/5 text-primary border-primary/10" },
                { name: t("history"), path: "/history", icon: Clock, color: "bg-secondary/5 text-secondary border-secondary/10" },
              ].map((item, i) => (
                <Link key={i} to={item.path}>
                  <div className="bg-card p-4 rounded-lg flex items-center gap-3 shadow-sm border hover:border-primary hover:shadow-md transition-all duration-200 h-full">
                    <div className={cn("p-2 rounded max-w-fit border", item.color)}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold tracking-wide text-slate-700">{item.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Disease Detection */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h2 className="text-xl font-bold tracking-tight text-foreground uppercase italic tracking-tighter">{t('aiCropDiagnostics')}</h2>
              <span className="bg-primary/5 text-primary border border-primary/10 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">REAL-WORLD TOOL</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/crop-doctor" className="block group">
                <Card className="rounded-[2rem] border-2 border-primary/10 shadow-sm overflow-hidden bg-card hover:border-primary transition-all p-6 flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                    <Leaf className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-black text-foreground uppercase italic tracking-tighter">{t('checkCropHealth')}</h3>
                    <p className="text-[10px] font-bold text-muted-foreground/60">{t('identifyFromLeaf')}</p>
                  </div>
                </Card>
              </Link>
              <Link to="/crop-doctor" className="block group">
                <Card className="rounded-[2rem] border-2 border-secondary/10 shadow-sm overflow-hidden bg-card hover:border-secondary transition-all p-6 flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center shadow-lg shadow-secondary/20 group-hover:scale-110 transition-transform">
                    <Scan className="h-7 w-7 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-black text-foreground uppercase italic tracking-tighter">{t('scanFarmAreaOption')}</h3>
                    <p className="text-[10px] font-bold text-muted-foreground/60">{t('scanFieldArea')}</p>
                  </div>
                </Card>
              </Link>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Mandi Rates */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> {t('liveCommodityRates')}</h2>
              <Link to="/market" className="text-xs font-semibold text-primary hover:text-primary/80 underline underline-offset-2">
                {t('viewAll')}
              </Link>
            </div>
            <div className="bg-card rounded border border-border shadow-sm overflow-hidden divide-y">
              {mandiLoading ? (
                <div className="p-8 text-center"><Loader2 className="h-4 w-4 animate-spin inline mr-2" />{t('syncingData')}</div>
              ) : (
                mandiRates.slice(0, 5).map((item, idx) => (
                  <Link key={idx} to="/market" className="block p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-foreground">{item.crop}</span>
                      <span className="font-bold text-slate-900">{item.rate}</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Govt Schemes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2"><Landmark className="h-4 w-4 text-primary" /> {t('nationalSchemes')}</h2>
            </div>
            <div className="bg-card rounded border border-border shadow-sm overflow-hidden divide-y">
              {[
                { title: t('pmKisanSchemeTitle'), detail: t('pmKisanSchemeDetail') },
                { title: t('pmfbySchemeTitle'), detail: t('pmfbySchemeDetail') },
              ].map((scheme, i) => (
                <div key={i} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group">
                  <p className="text-sm font-bold text-emerald-800 group-hover:underline">{scheme.title}</p>
                  <p className="text-xs text-slate-600 mt-1">{scheme.detail}</p>
                </div>
              ))}
              <Link to="/agri-schemes" className="block p-3 text-center text-sm font-bold text-primary hover:bg-muted/50">
                {t('accessSchemeDirectory')}
              </Link>
            </div>
          </div>

          <CropTrends />
        </aside>
      </section>

      {/* Tractor Rental Teaser */}
      <section className="space-y-6 pt-8 border-t border-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{t('agriMachineryDB')}</h2>
            <p className="text-sm font-medium text-muted-foreground">{t('procureAndSchedule')}</p>
          </div>
          <Link to="/rent">
            <button className="border border-primary/20 text-primary hover:bg-primary/5 font-bold h-12 px-6 rounded-lg transition-colors flex items-center justify-center">
              {t('accessFullCatalog')} <ArrowUpRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>

        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-inner relative group overflow-hidden">
          <div className="flex-1 space-y-4 relative z-10">
            <Badge className="bg-primary text-primary-foreground border-none">{t('tagNew')}</Badge>
            <h3 className="text-3xl font-black text-primary">{t('premiumEquipmentDesc')}</h3>
            <p className="text-primary/80 font-medium">{t('browseSelectDesc')}</p>
            <Link to="/rent" className="block pt-2">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 px-8 font-black transition-all shadow-lg shadow-primary/20 flex items-center">
                {t('bookTractor')} <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>
          <div className="w-full md:w-1/2 aspect-video rounded-xl overflow-hidden shadow-2xl relative z-10 border-4 border-white/20">
            <img src="/tractor_premium.png" className="w-full h-full object-cover" alt="Premium Tractor" />
          </div>
          <TractorIcon className="absolute right-[-40px] top-[-40px] h-80 w-80 text-primary/10 opacity-50 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
        </div>
      </section>

      {/* AgriFarming Hub Feed */}
      <section className="space-y-4 pt-8 border-t border-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" /> {t('agriFarmingHub')}
            </h2>
            <p className="text-sm font-medium text-muted-foreground">{t('agriFarmingHubDesc')}</p>
          </div>
          <Link to="/knowledge">
            <button className="border border-primary/20 text-primary hover:bg-primary/5 font-bold px-4 py-2 rounded-lg transition-colors flex items-center justify-center">
              {t('viewAllTopics')} <ArrowUpRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: "saffron", title: t('indoorSaffronTitle'), category: t('agricultureCategory'), catKey: "agriculture", tag: t('tagNew'), icon: TractorIcon, color: "bg-primary/10 text-primary", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY1evynbsc_tYbIqXBMj7q4v_WG56ve2SSCA&s" },
            { id: "egg-production", title: t('eggProductionTitle'), category: t('poultryCategory'), catKey: "livestock", tag: t('tagGuide'), icon: Bird, color: "bg-primary/10 text-primary", img: "https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?auto=format&fit=crop&q=80&w=800" },
            { id: "vannamei-shrimp", title: t('shrimpFarmingTitle'), category: t('aquacultureCategory'), catKey: "aquaculture", tag: t('tagExpert'), icon: Fish, color: "bg-primary/10 text-primary", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQrho1VB3WThsItYUa1WLYOugvC4LCfv7mAg&s" },
            { id: "solar-pump", title: t('solarPumpTitle'), category: t('subsidiesCategory'), catKey: "business", tag: t('tagScheme'), icon: Landmark, color: "bg-primary/10 text-primary", img: "https://solarizeindia.in/wp-content/uploads/2024/07/kusum-solar-pump-yojana.jpg" },
            { id: "aloe-vera", title: t('aloeVeraTitle'), category: t('horticultureCategory'), catKey: "horticulture", tag: t('tagBusiness'), icon: Sprout, color: "bg-primary/10 text-primary", img: "https://pbs.twimg.com/media/FMLdOWGXsAUOIkY.jpg" },
            { id: "curry-leaves", title: t('curryLeavesTitle'), category: t('gardeningCategory'), catKey: "horticulture", tag: t('tagTips'), icon: SunIcon, color: "bg-primary/10 text-primary", img: "https://blog.suvie.com/wp-content/uploads/2021/08/kadipatta-2701445_1920-1360x907.jpg" }
          ].map((post, idx) => (
            <div 
              key={idx} 
              onClick={() => navigate(`/guide/${post.id}`)} 
              className="block group cursor-pointer"
            >
              <div className="rounded overflow-hidden border border-border bg-card hover:border-primary hover:shadow-lg transition-all flex flex-col h-full">
                <div className="h-40 w-full overflow-hidden relative">
                  <img src={post.img} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-card/95 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-foreground flex items-center gap-1.5 shadow-sm">
                    <post.icon className={cn("h-3 w-3", post.color.split(' ')[1])} /> {post.category}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn("px-1.5 py-0.5 rounded text-[9px] font-black tracking-widest leading-none", post.color)}>{post.tag}</span>
                    <span className="text-[10px] text-muted-foreground/60 font-semibold leading-none">{t('today')}</span>
                  </div>
                  <h3 className="font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                  <div className="mt-auto pt-4 text-xs font-semibold text-primary group-hover:underline flex items-center">
                    {t('cultivationGuide')} →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
