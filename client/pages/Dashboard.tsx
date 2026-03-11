import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
import { notifyBooking } from "@/lib/smsService";

const equipment = [
  {
    id: 1,
    name: "John Deere 5310 GearPro",
    type: "Heavy Tractor",
    hp: "55 HP",
    price: 800,
    unit: "hour",
    location: "Chittoor, AP",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=400",
    tags: ["High Power", "AC Cabin"]
  },
  {
    id: 2,
    name: "Mahindra 275 DI TU",
    type: "Medium Tractor",
    hp: "39 HP",
    price: 600,
    unit: "hour",
    location: "Tirupati, AP",
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1592919016383-703774888be4?auto=format&fit=crop&q=80&w=400",
    tags: ["Fuel Efficient"]
  },
  {
    id: 3,
    name: "Swaraj 855 FE",
    type: "Heavy Tractor",
    hp: "52 HP",
    price: 750,
    unit: "hour",
    location: "Nellore, AP",
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=400",
    tags: ["Best Seller", "Rugged"]
  },
  {
    id: 4,
    name: "Kubota MU4501",
    type: "Medium Tractor",
    hp: "45 HP",
    price: 650,
    unit: "hour",
    location: "Kadapa, AP",
    rating: 4.7,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=400",
    tags: ["Smooth Gearbox"]
  },
  {
    id: 5,
    name: "Rotavator - 7 Feet",
    type: "Attachment",
    hp: "N/A",
    price: 300,
    unit: "hour",
    location: "Chittoor, AP",
    rating: 4.6,
    reviews: 34,
    image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=400",
    tags: ["Soil Prep"]
  },
  {
    id: 6,
    name: "Automatic Seeder",
    type: "Attachment",
    hp: "N/A",
    price: 400,
    unit: "hour",
    location: "Tirupati, AP",
    rating: 4.8,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=400",
    tags: ["Precision"]
  }
];

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { weather, loading: weatherLoading, getLocationAndFetch, error: weatherError } = useWeather();
  const { prices: mandiRates, loading: mandiLoading } = useMandi();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    duration: 1,
    phone: "",
    location: "",
    requirements: "",
    paymentMethod: "COD" as "COD" | "Online",
  });

  const handleBookClick = (item: any) => {
    setSelectedEquipment(item);
    setIsBookingModalOpen(true);
    setBookingStep(1);
  };

  const handleConfirmBooking = async () => {
    if (!bookingDetails.date || !bookingDetails.phone || !bookingDetails.location) {
      alert("Please fill in all required fields!");
      return;
    }
    setBookingStep(2);

    // Simulate API call and SMS notification
    setTimeout(async () => {
      const phoneNumber = (user as any)?.phoneNumber || "9876543210";
      await notifyBooking(phoneNumber, selectedEquipment.name);
      setBookingStep(3);
    }, 2000);
  };

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || item.type.includes(selectedType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {/* Main Dashboard Features (Weather, Mandi, etc.) - Moved to top */}
      <section className="grid gap-10 lg:grid-cols-4 pt-8">
        <div className="lg:col-span-3 space-y-12">
          {/* Welcome & Weather Mixed */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-2 rounded-xl bg-[#106A3A] text-white p-8 md:p-12 overflow-hidden relative border border-[#0A4A28] shadow-lg flex flex-col justify-center min-h-[320px]">
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-emerald-100 rounded text-xs font-semibold tracking-wider uppercase border border-white/20">
                  <HeartHandshake className="w-4 h-4" /> Empowering Farmers
                </div>
                <h2 className="text-4xl font-extrabold leading-tight">
                  Welcome to the National Agriculture Portal, {user?.username || "Farmer"}
                </h2>
                <p className="text-lg text-emerald-50 max-w-lg leading-relaxed border-l-2 border-emerald-400 pl-4 mt-2">
                  Access real-time commodity pricing, live meteorological data, and government schemes through this unified Digital Green initiative platform.
                </p>
                <div className="flex gap-4 pt-6">
                  <Button
                    onClick={getLocationAndFetch}
                    className="rounded bg-white text-emerald-800 hover:bg-emerald-50 h-12 px-6 font-bold shadow-sm"
                  >
                    Fetch Area Data
                  </Button>
                  <Link to="/seeds">
                    <Button variant="outline" className="rounded bg-transparent border-white text-white hover:bg-white/10 h-12 px-6 font-bold">
                      Seed Portal
                    </Button>
                  </Link>
                </div>
              </div>
              {/* Subtle background pattern instead of large icon */}
              <div className="absolute right-0 top-0 w-64 h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            </Card>

            {/* Official Weather Data Table Panel */}
            <Card className="rounded-xl border border-slate-200 shadow-sm bg-white overflow-hidden flex flex-col">
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-700 uppercase tracking-widest">Meteorological Data</span>
                {weather && <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium border border-emerald-200">LIVE</span>}
              </div>
              <CardContent className="flex-1 flex flex-col p-0">
                {weatherLoading ? (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-3 p-8">
                    <Loader2 className="h-6 w-6 text-emerald-700 animate-spin" />
                    <p className="text-xs font-semibold text-slate-500 uppercase">Fetching Sync...</p>
                  </div>
                ) : weather ? (
                  <div className="divide-y divide-slate-100 text-sm">
                    <div className="p-4 grid grid-cols-2 items-center bg-slate-50/50">
                      <div className="text-slate-500 text-xs font-semibold">STATION</div>
                      <div className="text-right font-bold text-slate-800 flex items-center justify-end gap-1"><MapPin className="h-3 w-3 text-red-500" /> {weather.location}</div>
                    </div>
                    <div className="p-4 grid grid-cols-2 items-center">
                      <div className="text-slate-500 text-xs font-semibold">TEMP & COND</div>
                      <div className="text-right font-bold text-slate-800 flex items-center justify-end gap-2">
                        {weather.temp}°C <Sun className="h-4 w-4 text-amber-500" />
                      </div>
                    </div>
                    <div className="p-4 grid grid-cols-2 items-center bg-slate-50/50">
                      <div className="text-slate-500 text-xs font-semibold flex items-center gap-1"><Droplets className="h-3 w-3" /> HUMIDITY</div>
                      <div className="text-right font-bold text-slate-800">{weather.humidity}%</div>
                    </div>
                    <div className="p-4 grid grid-cols-2 items-center">
                      <div className="text-slate-500 text-xs font-semibold flex items-center gap-1"><Wind className="h-3 w-3" /> WIND SPEED</div>
                      <div className="text-right font-bold text-slate-800">{weather.windSpeed} km/h</div>
                    </div>

                    {/* Official Advisory Block */}
                    <div className="p-4 bg-yellow-50/80 border-t border-yellow-200/50">
                      <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" /> OFFICIAL ADVISORY
                      </p>
                      <p className="text-xs font-medium text-amber-900 leading-relaxed">
                        {weather.temp > 35
                          ? "CRITICAL HEAT WARNING: High risk of crop wilting. Initiate emergency irrigation protocols."
                          : weather.temp > 30
                            ? "WARM ADVISORY: Evaporation rates elevated. Increase scheduled irrigation limits."
                            : weather.humidity > 80
                              ? "FUNGAL ALERT: Atmospheric moisture exceeds 80%. Preventative fungicidal application recommended."
                              : weather.humidity > 60
                                ? "MILD ALERT: Monitor fields for early pest manifestations due to humidity."
                                : weather.rainProbability > 50
                                  ? "PRECIPITATION EXPECTED: Halt scheduled chemical spraying. Validate field drainage."
                                  : "NOMINAL CONDITIONS: Execute standard agricultural activities as planned."}
                      </p>
                    </div>
                  </div>
                ) : weatherError ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-red-50/30">
                    <AlertTriangle className="h-8 w-8 text-red-500 mb-3" />
                    <p className="text-xs font-bold text-red-700 uppercase mb-4">{weatherError.includes("permission") ? "GPS Access Denied" : "Data Link Offline"}</p>
                    <Button onClick={getLocationAndFetch} variant="outline" size="sm" className="rounded shadow-sm text-xs">
                      Retry Connection
                    </Button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <MapPin className="h-8 w-8 text-slate-300 mb-3" />
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-4">Location Validation Required</p>
                    <Button onClick={getLocationAndFetch} size="sm" className="rounded bg-emerald-700 hover:bg-emerald-800 text-xs">Authorize GPS</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Access Grid Redesigned */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-slate-800 border-b-2 border-emerald-600 pb-2 inline-block">Portal Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Crop Calendar", path: "/calendar", icon: Calendar, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                { name: "Pest Advisory", path: "/pests", icon: Bug, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                { name: "Kisan Support", path: "/chat", icon: MessageCircle, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                { name: "Mandi Prices", path: "/market", icon: IndianRupee, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
              ].map((item, i) => (
                <Link key={i} to={item.path}>
                  <div
                    className="bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm border hover:border-emerald-500 hover:shadow-md transition-all duration-200 h-full"
                  >
                    <div className={cn("p-2 rounded max-w-fit border", item.color)}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold tracking-wide text-slate-700">{item.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Disease Detection Integration */}
          <section className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-xl font-bold tracking-tight text-slate-800">AI Crop Diagnostics</h2>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">BETA</Badge>
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
          {/* Mandi Rates Enhanced Sidebar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-lg font-bold tracking-tight text-slate-800 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-emerald-600" /> Live Commodity Rates</h2>
              <Link to="/market" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
                View All
              </Link>
            </div>
            <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-slate-100 text-xs font-bold text-slate-600 p-2 border-b border-slate-200">
                <div className="col-span-1">COMMODITY</div>
                <div className="col-span-1 text-right">RATE (₹/QTL)</div>
                <div className="col-span-1 text-right">TREND</div>
              </div>
              {mandiLoading ? (
                <div className="p-8 flex flex-col items-center gap-3 text-center">
                  <Loader2 className="h-6 w-6 text-emerald-600 animate-spin" />
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Syncing Data...</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {mandiRates.slice(0, 5).map((item, idx) => (
                    <Link key={idx} to="/market" className="block hover:bg-slate-50 transition-colors">
                      <div className="grid grid-cols-3 p-3 items-center text-sm">
                        <div className="col-span-1 font-semibold text-slate-800 truncate pr-2">{item.crop}</div>
                        <div className="col-span-1 text-right font-bold text-slate-900">{item.rate}</div>
                        <div className="col-span-1 text-right flex justify-end">
                          <span className={cn(
                            "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-bold",
                            item.trend === "up" ? "bg-emerald-50 text-emerald-700" : item.trend === "down" ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-600"
                          )}>
                            {item.trend === "up" ? "▲" : item.trend === "down" ? "▼" : "—"} {item.change.replace('%', '')}%
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Govt Schemes Sidebar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-lg font-bold tracking-tight text-slate-800 flex items-center gap-2"><Landmark className="h-4 w-4 text-emerald-600" /> National Schemes</h2>
            </div>
            <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
              {[
                { title: "PM-Kisan Samman Nidhi", detail: "Check 15th Installment Status", tag: "DBT" },
                { title: "Pradhan Mantri Fasal Bima Yojana", detail: "Kharif Season Enrollments Open", tag: "INSURANCE" },
                { title: "National Agriculture Market", detail: "Register on e-NAM Portal", tag: "MARKET" },
              ].map((scheme, i) => (
                <div key={i} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group flex flex-col gap-1.5">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-emerald-800 leading-tight group-hover:underline decoration-emerald-500 underline-offset-2">{scheme.title}</p>
                    <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">{scheme.tag}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{scheme.detail}</p>
                </div>
              ))}
              <Link to="/agri-schemes" className="block p-3 bg-slate-50 text-center text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:bg-slate-100 transition-colors border-t border-slate-200">
                Access Scheme Directory →
              </Link>
            </div>
          </div>
        </aside>
      </section>

      {/* Tractor Rental Section (Now at bottom) */}
      <section className="space-y-6 pt-8 border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">Agricultural Machinery Database</h2>
            <p className="text-sm font-medium text-slate-500">
              Procure and schedule heavy machinery for field operations.
            </p>
          </div>
          <Button variant="outline" className="shrink-0 text-emerald-700 border-emerald-200 hover:bg-emerald-50 text-sm font-bold">
            Access Full Catalog <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-50 p-4 rounded border border-slate-200">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search machinery by SKU or Category..."
              className="pl-9 h-10 rounded bg-white border-slate-300 focus-visible:ring-emerald-500 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs defaultValue="All" onValueChange={setSelectedType} className="w-full md:w-auto">
            <TabsList className="bg-slate-200/50 p-1 rounded h-10">
              <TabsTrigger value="All" className="rounded px-4 h-full data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm font-semibold text-xs uppercase tracking-wider">All</TabsTrigger>
              <TabsTrigger value="Heavy" className="rounded px-4 h-full data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm font-semibold text-xs uppercase tracking-wider">Heavy Duty</TabsTrigger>
              <TabsTrigger value="Medium" className="rounded px-4 h-full data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm font-semibold text-xs uppercase tracking-wider">Medium Duty</TabsTrigger>
              <TabsTrigger value="Attachment" className="rounded px-4 h-full data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm font-semibold text-xs uppercase tracking-wider">Attachments</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Platform Capabilities Section */}
        <section className="py-12 bg-white border border-slate-200 rounded px-8 my-8">
          <div className="text-center mb-10 space-y-2 border-b border-slate-100 pb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 uppercase text-center w-full">Platform Capabilities</h2>
            <p className="text-slate-500 font-medium text-sm">Comprehensive digital infrastructure for modern agriculture.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Meteorological Intelligence", desc: "Access hyper-local weather alerts and AI-powered agronomic recommendations specific to your geographic coordinates.", icon: Cloud, color: "text-blue-600 bg-blue-50 border-blue-100" },
              { step: "02", title: "Market Analytics", desc: "Monitor real-time Mandi rates and leverage our commodity pricing estimator to ascertain crop market valuation.", icon: IndianRupee, color: "text-amber-600 bg-amber-50 border-amber-100" },
              { step: "03", title: "Resource Procurement", desc: "Procure certified quality seeds and schedule premium heavy machinery with reliable door-step logistics.", icon: Sprout, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
            ].map((item, i) => (
              <div key={i} className="relative group border border-slate-100 p-6 rounded hover:border-slate-300 hover:shadow-sm transition-all bg-slate-50/50">
                <div className={cn("mb-6 h-12 w-12 rounded flex items-center justify-center border", item.color)}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-800">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                <div className="absolute top-4 right-4 text-3xl font-black opacity-10 pointer-events-none select-none text-slate-900">
                  {item.step}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AgriFarming Style Insights Feed */}
        <section className="space-y-4 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-emerald-600" /> AgriFarming Knowledge Hub
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Latest farming techniques, project reports, and livestock management guides.
              </p>
            </div>
            <Button variant="outline" className="shrink-0 text-emerald-700 border-emerald-200 hover:bg-emerald-50 text-sm font-bold">
              View All Topics <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Indoor Saffron Farming: Cost, Profit, and Training", category: "Agriculture", tag: "NEW", icon: TractorIcon, color: "bg-emerald-100 text-emerald-700", img: "https://images.unsplash.com/photo-1596541223130-5d07f6075671?w=500&auto=format&fit=crop&q=60" },
              { title: "How Many Eggs Does a Chicken Lay Per Day?", category: "Poultry", tag: "GUIDE", icon: Bird, color: "bg-amber-100 text-amber-700", img: "https://images.unsplash.com/photo-1548550023-2bf3c49b3380?w=500&auto=format&fit=crop&q=60" },
              { title: "How to Raise Shrimp in Aquaponics: 15-Step Feed Guide", category: "Aquaculture", tag: "EXPERT", icon: Fish, color: "bg-blue-100 text-blue-700", img: "https://images.unsplash.com/photo-1590483884149-141aab7682de?w=500&auto=format&fit=crop&q=60" },
              { title: "PM KUSUM Solar Pump Subsidy – Apply Online & Eligibility", category: "Subsidies", tag: "SCHEME", icon: Landmark, color: "bg-purple-100 text-purple-700", img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=500&auto=format&fit=crop&q=60" },
              { title: "Aloe Vera Farming Profit Per Acre: Cost and Yield", category: "Horticulture", tag: "BUSINESS", icon: Sprout, color: "bg-lime-100 text-lime-700", img: "https://images.unsplash.com/photo-1596500438641-69446d510f0f?w=500&auto=format&fit=crop&q=60" },
              { title: "Can Curry Leaves Grow in Cold Climates? Survival Guide", category: "Gardening", tag: "TIPS", icon: SunIcon, color: "bg-orange-100 text-orange-700", img: "https://images.unsplash.com/photo-1620601932906-8d1aa8cc2001?w=500&auto=format&fit=crop&q=60" }
            ].map((post, idx) => (
              <div key={idx} className="group cursor-pointer rounded overflow-hidden border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="h-40 w-full overflow-hidden relative">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-slate-800 flex items-center gap-1.5 shadow-sm">
                    <post.icon className={cn("h-3 w-3", post.color.split(' ')[1])} /> {post.category}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn("px-1.5 py-0.5 rounded text-[9px] font-black tracking-widest leading-none", post.color)}>{post.tag}</span>
                    <span className="text-[10px] text-slate-400 font-semibold leading-none">Today</span>
                  </div>
                  <h3 className="font-bold text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">{post.title}</h3>
                  <div className="mt-auto pt-4 text-xs font-semibold text-emerald-600 group-hover:underline underline-offset-2 flex items-center">
                    Read Full Guide <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Equipment Grid Section - Redesigned as List/Dense Grid */}
        <div className="grid gap-4 md:grid-cols-2 pt-8 border-t border-slate-200">
          <AnimatePresence mode="popLayout">
            {filteredEquipment.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={item.id}
              >
                <div className="flex flex-row gap-4 p-4 rounded border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-md transition-all group">
                  <div className="w-1/3 aspect-[4/3] rounded bg-slate-100 overflow-hidden relative shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover mix-blend-multiply"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-700 flex items-center gap-1 border border-slate-200 shadow-sm">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {item.rating}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col min-w-0 py-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.type}</p>
                        <h3 className="text-base font-bold text-slate-800 truncate group-hover:text-emerald-700 transition-colors">{item.name}</h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        <Zap className="h-3 w-3 text-emerald-600" /> {item.hp}
                      </div>
                      <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        <MapPin className="h-3 w-3 text-rose-600" /> {item.location.split(',')[0]}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div className="tabular-nums">
                        <p className="text-lg font-black text-slate-900 leading-none">
                          ₹{item.price}
                        </p>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">per {item.unit}</span>
                      </div>
                      <Button
                        size="sm"
                        className="rounded font-bold bg-emerald-700 hover:bg-emerald-800 text-xs px-4"
                        onClick={() => handleBookClick(item)}
                      >
                        Initiate Booking
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded bg-slate-50 space-y-3">
            <Search className="h-8 w-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No machinery matched the criteria</h3>
            <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setSelectedType("All"); }}>Reset Filters</Button>
          </div>
        )}
      </section>
      {/* Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[2rem] p-0 overflow-hidden border-none glass">
          <AnimatePresence mode="wait">
            {bookingStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 space-y-6"
              >
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Book Equipment</DialogTitle>
                  <DialogDescription>
                    Select your preferred date and duration.
                  </DialogDescription>
                </DialogHeader>

                {selectedEquipment && (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-primary/10">
                    <img src={selectedEquipment.image} className="h-16 w-16 rounded-xl object-cover" alt="" />
                    <div>
                      <p className="font-bold">{selectedEquipment.name}</p>
                      <p className="text-sm text-primary font-semibold">₹{selectedEquipment.price}/{selectedEquipment.unit}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4 max-h-[400px] overflow-y-auto px-1 pr-2 custom-scrollbar">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Select Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="date" className="pl-10 rounded-xl" onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Duration (Hours)</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          min="1"
                          className="pl-10 rounded-xl"
                          value={bookingDetails.duration}
                          onChange={(e) => setBookingDetails({ ...bookingDetails, duration: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Contact Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="e.g. 9876543210"
                        className="pl-10 rounded-xl"
                        value={bookingDetails.phone}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Farm Delivery Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter your exact farm location"
                        className="pl-10 rounded-xl"
                        value={bookingDetails.location}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Special Requirements (Optional)</label>
                    <textarea
                      className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[80px]"
                      placeholder="e.g. Need driver, specific attachment needed..."
                      value={bookingDetails.requirements}
                      onChange={(e) => setBookingDetails({ ...bookingDetails, requirements: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Payment Method</label>
                    <div className="flex gap-4">
                      <Button
                        variant={bookingDetails.paymentMethod === 'COD' ? 'default' : 'outline'}
                        className="flex-1 rounded-xl"
                        onClick={() => setBookingDetails({ ...bookingDetails, paymentMethod: 'COD' })}
                      >
                        Cash on Delivery
                      </Button>
                      <Button
                        variant={bookingDetails.paymentMethod === 'Online' ? 'default' : 'outline'}
                        className="flex-1 rounded-xl"
                        disabled
                      >
                        Online (Coming Soon)
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-medium">₹{selectedEquipment?.price}/{selectedEquipment?.unit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Hours</span>
                    <span className="font-medium">{bookingDetails.duration} hrs</span>
                  </div>
                  <div className="border-t border-primary/10 pt-2 flex justify-between font-bold text-lg text-primary">
                    <span>Estimated Total</span>
                    <span>₹{(selectedEquipment?.price || 0) * bookingDetails.duration}</span>
                  </div>
                </div>

                <DialogFooter className="px-6 pb-6 pt-2">
                  <Button className="w-full rounded-xl py-6 text-lg bg-emerald-600 hover:bg-emerald-700 font-bold" onClick={handleConfirmBooking}>
                    Confirm Booking Now
                  </Button>
                </DialogFooter>
              </motion.div>
            )}

            {bookingStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center space-y-6"
              >
                <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Tractor className="h-10 w-10 text-primary" />
                  </motion.div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Processing...</h3>
                  <p className="text-muted-foreground text-sm">Securing your equipment with the owner. Please wait a moment.</p>
                </div>
              </motion.div>
            )}

            {bookingStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center space-y-6"
              >
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-green-600">Booking Confirmed!</h3>
                  <p className="text-muted-foreground text-sm">Your booking for <strong>{selectedEquipment?.name}</strong> has been successfully placed. You will receive an SMS shortly.</p>
                </div>
                <Button className="w-full rounded-xl py-6" onClick={() => setIsBookingModalOpen(false)}>
                  Go to My Bookings
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
