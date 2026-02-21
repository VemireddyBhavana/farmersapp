import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Tractor,
  Sprout,
  Sun,
  MapPin,
  Calendar,
  Star,
  Zap,
  ChevronRight,
  Droplets,
  Wind,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Upload,
  Camera,
  Activity,
  BadgeIndianRupee,
  ShieldCheck,
  Bug,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import {
  Dialog as UI_Dialog,
  DialogContent as UI_DialogContent,
  DialogHeader as UI_DialogHeader,
  DialogTitle as UI_DialogTitle,
  DialogDescription as UI_DialogDescription,
  DialogFooter as UI_DialogFooter,
} from "@/components/ui/dialog";

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
    image: "https://images.unsplash.com/photo-1594398044700-1482072f80c2?auto=format&fit=crop&q=80&w=400",
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
    image: "https://images.unsplash.com/photo-1590682680395-03ad7e0b8609?auto=format&fit=crop&q=80&w=400",
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
    image: "https://images.unsplash.com/photo-1592919016383-703774888be4?auto=format&fit=crop&q=80&w=400",
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
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=400",
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

const mandiRates = [
  { crop: "Paddy (Basmati)", rate: "₹4,200", change: "+150", trend: "up" },
  { crop: "Wheat", rate: "₹2,125", change: "-25", trend: "down" },
  { crop: "Tomato", rate: "₹1,800", change: "+400", trend: "up" },
  { crop: "Onion", rate: "₹2,400", change: "0", trend: "neutral" },
];

const chartData = [
  { name: 'Mon', paddy: 4000, wheat: 2100, tomato: 1200 },
  { name: 'Tue', paddy: 4100, wheat: 2150, tomato: 1400 },
  { name: 'Wed', paddy: 4050, wheat: 2120, tomato: 1600 },
  { name: 'Thu', paddy: 4150, wheat: 2110, tomato: 1750 },
  { name: 'Fri', paddy: 4200, wheat: 2125, tomato: 1800 },
];

const FAQSection = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: t('faq.q1', "How do I book a tractor?"), a: t('faq.a1', "Go to the Rent Equipment section, select a tractor, and click 'Book Now'.") },
    { q: t('faq.q2', "What is PM-Kisan?"), a: t('faq.a2', "It is a central scheme providing ₹6,000/year to small and marginal farmers.") },
    { q: t('faq.q3', "How to use the AI Assistant?"), a: t('faq.a3', "Click the 'AI Assistant' tab and type your farming questions in your preferred language.") },
    { q: t('faq.q4', "Is my data secure?"), a: t('faq.a4', "Yes, we use Clerk for secure authentication and follow strict data protection protocols.") },
  ];

  return (
    <div className="mt-16 mb-20 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black tracking-tight">{t('faq.title', 'Frequently Asked Questions')}</h2>
        <p className="text-muted-foreground">{t('faq.subtitle', 'Quick answers to common agricultural queries.')}</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="glass rounded-3xl overflow-hidden border-primary/5">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">{faq.q}</span>
              </div>
              <ChevronDown className={cn("h-5 w-5 transition-transform", openIndex === i ? "rotate-180" : "")} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 text-muted-foreground leading-relaxed"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { user } = useUser();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    duration: 1,
  });

  const handleBookClick = (item: any) => {
    setSelectedEquipment(item);
    setIsBookingModalOpen(true);
    setBookingStep(1);
  };

  const handleConfirmBooking = () => {
    setBookingStep(2);
    // In a real app, this would call an API
    setTimeout(() => {
      setBookingStep(3);
    }, 2000);
  };

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || item.type.includes(selectedType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top Section: Welcome & Weather */}
      <div className="grid gap-6 lg:grid-cols-3 mb-10">
        <div className="lg:col-span-2 space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            {t('dashboard.title', { name: user?.firstName || t('farmer') })}
          </h1>
          <p className="text-muted-foreground">
            {t('dashboard.subtitle')}
          </p>
        </div>
        <Link to="/weather">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass p-6 h-full rounded-3xl flex items-center justify-between border-primary/10 bg-gradient-to-br from-primary/5 to-transparent cursor-pointer"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Weather - Chittoor</p>
              <h3 className="text-2xl font-bold flex items-center gap-2 text-foreground">
                32°C <Sun className="text-amber-500 h-6 w-6" />
              </h3>
              <p className="text-xs text-muted-foreground">Partly Cloudy • Humidity 45%</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <Droplets className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                <p className="text-[10px] font-bold">12%</p>
              </div>
              <div className="text-center">
                <Wind className="h-5 w-5 text-slate-400 mx-auto mb-1" />
                <p className="text-[10px] font-bold">14km/h</p>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>

      <div className="mb-10 space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold tracking-tight">{t('nav.growing-guide')}</h2>
          <Link to="/ai-assistant" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
            Ask AI for guidance <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { id: 'rice', name: 'Rice (Paddy)', icon: Sprout, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            { id: 'cotton', name: 'Cotton', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { id: 'pulses', name: 'Pulses', icon: Activity, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          ].map((crop) => (
            <Link key={crop.id} to={`/growing-guide/${crop.id}`}>
              <motion.div
                whileHover={{ y: -5 }}
                className="glass p-6 rounded-[2.5rem] border-primary/5 hover:border-primary/20 transition-all flex items-center gap-4 group"
              >
                <div className={cn("h-16 w-16 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner", crop.bg)}>
                  <crop.icon className={cn("h-8 w-8", crop.color)} />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg">{crop.name}</h3>
                  <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Comprehensive Guide →</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight px-2">{t('support.title')}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/apply/income">
            <Card className="rounded-[2rem] border-primary/5 hover:border-primary/20 transition-all hover:shadow-lg overflow-hidden h-full group">
              <CardContent className="p-6 space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                  <BadgeIndianRupee className="h-6 w-6" />
                </div>
                <h3 className="font-bold">{t('support.income')}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t('support.income_desc')}</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/apply/risk">
            <Card className="rounded-[2rem] border-primary/5 hover:border-primary/20 transition-all hover:shadow-lg overflow-hidden h-full group">
              <CardContent className="p-6 space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="font-bold">{t('support.risk')}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t('support.risk_desc')}</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/pest-alerts">
            <Card className="rounded-[2rem] border-primary/5 hover:border-primary/20 transition-all hover:shadow-lg overflow-hidden h-full group">
              <CardContent className="p-6 space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                  <Bug className="h-6 w-6" />
                </div>
                <h3 className="font-bold">{t('support.pest')}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t('support.pest_desc')}</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/track-applications">
            <Card className="rounded-[2rem] border-primary/5 hover:border-primary/20 transition-all hover:shadow-lg overflow-hidden h-full group">
              <CardContent className="p-6 space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="font-bold">{t('support.track')}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t('support.track_desc')}</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar Filters & Stats */}
        <aside className="space-y-8">
          {/* Quick Stats */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">{t('dashboard.insights', 'KisanTech Insights')}</h3>
            <div className="grid gap-4">
              <div className="glass p-4 rounded-2xl border-primary/5">
                <p className="text-xs text-muted-foreground">Active Bookings</p>
                <p className="text-xl font-bold text-primary">02</p>
              </div>
              <div className="glass p-4 rounded-2xl border-primary/5">
                <p className="text-xs text-muted-foreground">Crop Health Score</p>
                <p className="text-xl font-bold text-green-500">88%</p>
              </div>
            </div>
          </div>

          {/* Mandi Rates & Chart */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">{t('dashboard.market_trends')}</h3>
              <Badge variant="outline" className="text-[10px]">{t('dashboard.today')}</Badge>
            </div>

            <div className="glass p-4 rounded-2xl border-primary/5 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Line type="monotone" dataKey="paddy" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="tomato" stroke="#ef4444" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="glass rounded-2xl overflow-hidden border-primary/5">
              {mandiRates.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <span className="text-sm font-medium">{item.crop}</span>
                  <div className="text-right">
                    <p className="text-sm font-bold">{item.rate}</p>
                    <p className={cn(
                      "text-[10px]",
                      item.trend === "up" ? "text-green-500" : item.trend === "down" ? "text-red-500" : "text-muted-foreground"
                    )}>
                      {item.change !== "0" ? (item.trend === "up" ? "+" : "") + item.change : "Stable"}
                    </p>
                  </div>
                </div>
              ))}
              <Link to="/market">
                <Button variant="ghost" className="w-full text-xs text-primary hover:text-primary-foreground hover:bg-primary transition-all rounded-none py-3 h-auto">
                  View All Market Data <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Planting Calendar & Pest Alerts */}
          <div className="grid gap-4">
            <Link to="/planting-calendar">
              <div className="glass p-4 rounded-2xl border-primary/10 bg-amber-500/5 hover:bg-amber-500/10 transition-all cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Planting Calendar</h4>
                    <p className="text-[10px] text-muted-foreground">Sowing window open for Paddy</p>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link to="/pest-alerts">
              <div className="glass p-4 rounded-2xl border-primary/10 bg-red-500/5 hover:bg-red-500/10 transition-all cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-600">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Pest Alerts</h4>
                    <p className="text-[10px] text-muted-foreground">1 High risk alert in your area</p>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          {/* Crop Disease Upload */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">{t('dashboard.detect_title')}</h3>
            <Card className="rounded-[2rem] border-primary/10 overflow-hidden bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-950/10">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Camera className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold">Instant Disease Detection</h4>
                    <p className="text-xs text-muted-foreground px-4">Upload a photo of your crop to get AI-powered diagnosis and treatment advice.</p>
                  </div>
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="flex-1 rounded-xl h-12 gap-2">
                      <Upload className="h-4 w-4" />
                      Upload
                    </Button>
                    <Button className="flex-1 rounded-xl h-12 gap-2">
                      Analyze Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Tasks */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">{t('dashboard.recommended', 'Recommended for You')}</h3>
            <div className="grid gap-4">
              <div className="glass p-4 rounded-2xl border-primary/5 bg-green-500/5 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Droplets className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">Apply Fertilizer</p>
                  <p className="text-[10px] text-muted-foreground">Ideal weather window (next 24h)</p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-muted-foreground/30 hover:text-green-500 cursor-pointer transition-colors" />
              </div>
              <div className="glass p-4 rounded-2xl border-primary/5 bg-amber-500/5 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <Activity className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">Check for Stem Borers</p>
                  <p className="text-[10px] text-muted-foreground">Recent humidity rise increases risk</p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-muted-foreground/30 hover:text-green-500 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content: Tractor Browsing */}
        <div className="lg:col-span-3 space-y-8">
          {/* Search & Tabs */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tractors, tools, or owners..."
                className="pl-10 rounded-full bg-muted/30 border-primary/10 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs defaultValue="All" onValueChange={setSelectedType} className="w-full md:w-auto">
              <TabsList className="bg-muted/30 p-1 rounded-full">
                <TabsTrigger value="All" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All</TabsTrigger>
                <TabsTrigger value="Heavy" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Heavy</TabsTrigger>
                <TabsTrigger value="Medium" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Medium</TabsTrigger>
                <TabsTrigger value="Attachment" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Tools</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Equipment Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredEquipment.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={item.id}
                >
                  <Card className="group overflow-hidden rounded-[2rem] border-primary/5 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-black/50 backdrop-blur-md border-none text-white flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          {item.rating}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-white/80 backdrop-blur-md text-[10px] text-primary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <CardHeader className="p-5 pb-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-medium text-primary uppercase tracking-widest">{item.type}</p>
                          <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">{item.name}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 pt-3 space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Zap className="h-4 w-4 text-amber-500" />
                          <span>{item.hp}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-red-500" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">Price</p>
                          <p className="text-xl font-bold text-foreground">
                            ₹{item.price}
                            <span className="text-xs font-normal text-muted-foreground">/{item.unit}</span>
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="rounded-full px-5 hover:translate-x-1 transition-transform"
                          onClick={() => handleBookClick(item)}
                        >
                          Book <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredEquipment.length === 0 && (
            <div className="text-center py-20 glass rounded-3xl space-y-4">
              <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold">No equipment found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
              <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedType("All"); }}>Reset Filters</Button>
            </div>
          )}
        </div>
      </div>
      <FAQSection />

      {/* Booking Modal */}
      <UI_Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <UI_DialogContent className="sm:max-w-[425px] rounded-[2rem] p-0 overflow-hidden border-none glass">
          <AnimatePresence mode="wait">
            {bookingStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 space-y-6"
              >
                <UI_DialogHeader>
                  <UI_DialogTitle className="text-2xl font-bold">Book Equipment</UI_DialogTitle>
                  <UI_DialogDescription>
                    Select your preferred date and duration.
                  </UI_DialogDescription>
                </UI_DialogHeader>

                {selectedEquipment && (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-primary/10">
                    <img src={selectedEquipment.image} className="h-16 w-16 rounded-xl object-cover" alt="" />
                    <div>
                      <p className="font-bold">{selectedEquipment.name}</p>
                      <p className="text-sm text-primary font-semibold">₹{selectedEquipment.price}/{selectedEquipment.unit}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
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

                <UI_DialogFooter>
                  <Button className="w-full rounded-xl py-6 text-lg" onClick={handleConfirmBooking}>
                    Confirm Booking
                  </Button>
                </UI_DialogFooter>
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
        </UI_DialogContent>
      </UI_Dialog>
    </div>
  );
}
