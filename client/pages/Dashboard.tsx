import { useState } from "react";
import { Link } from "react-router-dom";
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
  Tractor as TractorIcon,
  Sun as SunIcon
} from "lucide-react";
import DiseaseDetection from "@/components/DiseaseDetection";
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
import { AccessibleDashboard } from "@/components/AccessibleDashboard";
import { speakText } from "@/components/VoiceAssistant";

export default function Dashboard() {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const { weather, loading: weatherLoading, getLocationAndFetch, error: weatherError } = useWeather();
  const { prices: mandiRates, loading: mandiLoading } = useMandi();


  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      <AccessibleDashboard />

      {/* Main Dashboard Features (Weather, Mandi, etc.) - Moved to top */}
      <section className="grid gap-10 lg:grid-cols-4 pt-8">
        <div className="lg:col-span-3 space-y-12">
          {/* Welcome & Weather Mixed */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-2 rounded-xl bg-[#106A3A] text-white p-8 md:p-12 overflow-hidden relative border border-[#0A4A28] shadow-lg flex flex-col justify-center min-h-[320px]">
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-emerald-100 rounded text-xs font-semibold tracking-wider uppercase border border-white/20">
                  <HeartHandshake className="w-4 h-4" /> {t('empoweringFarmers')}
                </div>
                <h2 className="text-4xl font-extrabold leading-tight">
                  {t('nationalAgriPortal')}, {user?.username || "Farmer"}
                </h2>
                <p className="text-lg text-emerald-50 max-w-lg leading-relaxed border-l-2 border-emerald-400 pl-4 mt-2">
                  {t('dashboardDesc')}
                </p>
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={getLocationAndFetch}
                    className="rounded bg-white text-emerald-800 hover:bg-emerald-50 h-12 px-6 font-bold shadow-sm"
                  >
                    {t('fetchAreaData')}
                  </button>
                  <Link to="/seeds">
                    <button className="rounded bg-transparent border border-white text-white hover:bg-white/10 h-12 px-6 font-bold">
                      {t('seedPortal')}
                    </button>
                  </Link>
                  <Link to="/kisan-suvidha">
                    <button className="rounded bg-amber-500 text-slate-900 hover:bg-amber-400 h-12 px-6 font-black shadow-lg shadow-amber-500/20 border-none transition-all">
                      {t('kisanSevaTitle')}
                    </button>
                  </Link>
                </div>
              </div>
              <div className="absolute right-0 top-0 w-64 h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            </Card>

            {/* Official Weather Data Table Panel */}
            <Card className="rounded-xl border border-slate-200 shadow-sm bg-white overflow-hidden flex flex-col">
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-700 uppercase tracking-widest">{t('meteorologicalData')}</span>
                {weather && <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium border border-emerald-200">{t('live')}</span>}
              </div>
              <CardContent className="flex-1 flex flex-col p-4 justify-between">
                {weatherLoading ? (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-3">
                    <Loader2 className="h-6 w-6 text-emerald-700 animate-spin" />
                    <p className="text-xs font-semibold text-slate-500 uppercase">{t('fetchingSync')}</p>
                  </div>
                ) : weather ? (
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded">
                      <div className="text-slate-500 text-xs font-semibold">{t('station')}</div>
                      <div className="text-right font-bold text-slate-800 flex items-center gap-1"><MapPin className="h-3 w-3 text-red-500" /> {weather.location}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-slate-500 text-xs font-semibold">{t('tempAndCond')}</div>
                      <div className="text-right font-bold text-slate-800 flex items-center gap-2">
                        {weather.temp}°C <Sun className="h-4 w-4 text-amber-500" />
                      </div>
                    </div>
                    {/* Official Advisory Block */}
                    <div className="p-3 bg-yellow-50 border border-yellow-100 rounded">
                      <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" /> {t('officialAdvisory')}
                      </p>
                      <p className="text-xs font-medium text-amber-900">
                        {weather.temp > 35 ? t('criticalHeatWarning') : t('nominalConditions')}
                      </p>
                    </div>
                  </div>
                ) : weatherError ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <AlertTriangle className="h-6 w-6 text-red-500 mb-2" />
                    <button onClick={getLocationAndFetch} className="px-4 py-1.5 border border-slate-200 text-slate-600 rounded hover:bg-slate-50 transition-colors text-xs font-bold">
                      {t('retryConnection')}
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
                    <MapPin className="h-6 w-6 text-slate-300" />
                    <button onClick={getLocationAndFetch} className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded transition-colors text-xs font-bold">{t('authorizeGPS')}</button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Access Grid */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-slate-800 border-b-2 border-emerald-600 pb-2 inline-block">{t('portalServices')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: t('cropCalendar'), path: "/calendar", icon: Calendar, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                { name: t('pestAdvisory'), path: "/pests", icon: Bug, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                { name: t('kisanSupport'), path: "/chat", icon: MessageCircle, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                { name: t('mandiPrices'), path: "/market", icon: IndianRupee, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
              ].map((item, i) => (
                <Link key={i} to={item.path}>
                  <div className="bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm border hover:border-emerald-500 hover:shadow-md transition-all duration-200 h-full">
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
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-xl font-bold tracking-tight text-slate-800">{t('aiCropDiagnostics')}</h2>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">BETA</span>
            </div>
            <Card className="rounded-xl border border-slate-200 shadow-sm overflow-hidden bg-slate-50">
              <CardContent className="p-0">
                <DiseaseDetection />
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Mandi Rates */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-lg font-bold tracking-tight text-slate-800 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-emerald-600" /> {t('liveCommodityRates')}</h2>
              <Link to="/market" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
                {t('viewAll')}
              </Link>
            </div>
            <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden divide-y">
              {mandiLoading ? (
                <div className="p-8 text-center"><Loader2 className="h-4 w-4 animate-spin inline mr-2" />{t('syncingData')}</div>
              ) : (
                mandiRates.slice(0, 5).map((item, idx) => (
                  <Link key={idx} to="/market" className="block p-3 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-slate-800">{item.crop}</span>
                      <span className="font-bold text-slate-900">{item.rate}</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Govt Schemes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-lg font-bold tracking-tight text-slate-800 flex items-center gap-2"><Landmark className="h-4 w-4 text-emerald-600" /> {t('nationalSchemes')}</h2>
            </div>
            <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden divide-y">
              {[
                { title: t('pmKisanSchemeTitle'), detail: t('pmKisanSchemeDetail') },
                { title: t('pmfbySchemeTitle'), detail: t('pmfbySchemeDetail') },
              ].map((scheme, i) => (
                <div key={i} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <p className="text-sm font-bold text-emerald-800 group-hover:underline">{scheme.title}</p>
                  <p className="text-xs text-slate-600 mt-1">{scheme.detail}</p>
                </div>
              ))}
              <Link to="/agri-schemes" className="block p-3 text-center text-sm font-bold text-emerald-700 hover:bg-slate-50">
                {t('accessSchemeDirectory')}
              </Link>
            </div>
          </div>
        </aside>
      </section>

      {/* Tractor Rental Teaser */}
      <section className="space-y-6 pt-8 border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">{t('agriMachineryDB')}</h2>
            <p className="text-sm font-medium text-slate-500">{t('procureAndSchedule')}</p>
          </div>
          <Link to="/rent">
            <button className="border border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-bold h-12 px-6 rounded-lg transition-colors flex items-center justify-center">
              {t('accessFullCatalog')} <ArrowUpRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-inner relative group overflow-hidden">
          <div className="flex-1 space-y-4 relative z-10">
            <Badge className="bg-emerald-600 text-white border-none">{t('tagNew')}</Badge>
            <h3 className="text-3xl font-black text-emerald-900">{t('premiumEquipmentDesc')}</h3>
            <p className="text-emerald-700 font-medium">{t('browseSelectDesc')}</p>
              <Link to="/rent" className="block pt-2">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 px-8 font-black transition-all shadow-lg shadow-emerald-600/20 flex items-center">
                  {t('bookTractor')} <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
          </div>
          <div className="w-full md:w-1/2 aspect-video rounded-xl overflow-hidden shadow-2xl relative z-10 border-4 border-white/20">
            <img src="/tractor_premium.png" className="w-full h-full object-cover" alt="Premium Tractor" />
          </div>
          <TractorIcon className="absolute right-[-40px] top-[-40px] h-80 w-80 text-emerald-100 opacity-50 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
        </div>
      </section>

      {/* AgriFarming Hub Feed */}
      <section className="space-y-4 pt-8 border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-emerald-600" /> {t('agriFarmingHub')}
            </h2>
            <p className="text-sm font-medium text-slate-500">{t('agriFarmingHubDesc')}</p>
          </div>
          <Link to="/knowledge">
            <button className="border border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-bold px-4 py-2 rounded-lg transition-colors flex items-center justify-center">
              {t('viewAllTopics')} <ArrowUpRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: t('indoorSaffronTitle'), category: t('agricultureCategory'), catKey: "agriculture", tag: t('tagNew'), icon: TractorIcon, color: "bg-emerald-100 text-emerald-700", img: "/images/saffron_guide.png" },
            { title: t('eggProductionTitle'), category: t('poultryCategory'), catKey: "livestock", tag: t('tagGuide'), icon: Bird, color: "bg-emerald-100 text-emerald-700", img: "https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?auto=format&fit=crop&q=80&w=800" },
            { title: t('shrimpFarmingTitle'), category: t('aquacultureCategory'), catKey: "aquaculture", tag: t('tagExpert'), icon: Fish, color: "bg-emerald-100 text-emerald-700", img: "https://images.unsplash.com/photo-1580193424172-c51631405c92?auto=format&fit=crop&q=80&w=800" },
            { title: t('solarPumpTitle'), category: t('subsidiesCategory'), catKey: "business", tag: t('tagScheme'), icon: Landmark, color: "bg-emerald-100 text-emerald-700", img: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800" },
            { title: t('aloeVeraTitle'), category: t('horticultureCategory'), catKey: "horticulture", tag: t('tagBusiness'), icon: Sprout, color: "bg-emerald-100 text-emerald-700", img: "/images/aloe_vera_guide.jpg" },
            { title: t('curryLeavesTitle'), category: t('gardeningCategory'), catKey: "horticulture", tag: t('tagTips'), icon: SunIcon, color: "bg-emerald-100 text-emerald-700", img: "/images/curry_leaves_guide.png" }
          ].map((post, idx) => (
            <Link key={idx} to={`/knowledge?category=${post.catKey}`} className="block group">
              <div className="rounded overflow-hidden border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col h-full">
                <div className="h-40 w-full overflow-hidden relative">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-slate-800 flex items-center gap-1.5 shadow-sm">
                    <post.icon className={cn("h-3 w-3", post.color.split(' ')[1])} /> {post.category}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn("px-1.5 py-0.5 rounded text-[9px] font-black tracking-widest leading-none", post.color)}>{post.tag}</span>
                    <span className="text-[10px] text-slate-400 font-semibold leading-none">{t('today')}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">{post.title}</h3>
                  <div className="mt-auto pt-4 text-xs font-semibold text-emerald-600 group-hover:underline flex items-center">
                    {t('readFullGuide')} <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
