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
  Camera
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

const mandiRates = [
  { crop: "Paddy (Basmati)", rate: "₹4,200", change: "+150", trend: "up" },
  { crop: "Wheat", rate: "₹2,125", change: "-25", trend: "down" },
  { crop: "Tomato", rate: "₹1,800", change: "+400", trend: "up" },
  { crop: "Onion", rate: "₹2,400", change: "0", trend: "neutral" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
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
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            {t("welcome")} {user?.username || "Farmer"}! 🌾
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Live Weather Analysis & Recommendations: Get real-time weather data and AI-powered farming recommendations based on your exact location.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/weather">
              <Button className="rounded-full bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg shadow-xl shadow-blue-500/20 flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                Get Live Weather Recommendations
              </Button>
            </Link>
          </div>
        </div>

        {/* Camera Upload Section (Top Priority) */}
        <div className="lg:col-span-3">
          <Card className="rounded-[2.5rem] border-primary/10 overflow-hidden shadow-2xl bg-gradient-to-br from-emerald-500/10 to-transparent">
            <CardContent className="p-0">
              <DiseaseDetection />
            </CardContent>
          </Card>
        </div>
        <div className="glass p-6 h-full rounded-[2.5rem] border-primary/10 bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-950/20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Current Weather</p>
              <h3 className="text-3xl font-black">32°C</h3>
            </div>
            <Sun className="h-10 w-10 text-amber-500 animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Humidity</p>
              <div className="flex items-center gap-1">
                <Droplets className="h-3 w-3 text-blue-500" />
                <span className="text-sm font-bold">45%</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Wind</p>
              <div className="flex items-center gap-1">
                <Wind className="h-3 w-3 text-slate-400" />
                <span className="text-sm font-bold">14 km/h</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-emerald-100 dark:border-emerald-900">
            <p className="text-xs font-medium text-emerald-600">Recommendation: Clear skies. Ideal for open-field sowing and fertilization.</p>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
        {[
          { name: t("calendar"), path: "/calendar", icon: Calendar, color: "bg-green-100 text-green-700" },
          { name: t("security"), path: "/pests", icon: Bug, color: "bg-red-100 text-red-700" },
          { name: t("aiChat"), path: "/chat", icon: MessageCircle, color: "bg-blue-100 text-blue-700" },
          { name: t("market"), path: "/market", icon: IndianRupee, color: "bg-amber-100 text-amber-700" },
          { name: t("schemes"), path: "/agri-schemes", icon: ScrollText, color: "bg-cyan-100 text-cyan-700" },
          { name: t("government"), path: "/help-center", icon: HeartHandshake, color: "bg-primary/10 text-primary" },
        ].map((item, i) => (
          <Link key={i} to={item.path}>
            <motion.div
              whileHover={{ y: -5 }}
              className="glass p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 border-primary/5 hover:border-primary/20 transition-all text-center h-full"
            >
              <div className={cn("p-3 rounded-2xl", item.color)}>
                <item.icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar Filters & Stats */}
        <aside className="space-y-8">
          {/* Quick Stats */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Your Activity</h3>
            <div className="grid gap-4">
              <div className="glass p-4 rounded-2xl border-primary/5">
                <p className="text-xs text-muted-foreground">Active Bookings</p>
                <p className="text-xl font-bold text-primary">02</p>
              </div>
              <div className="glass p-4 rounded-2xl border-primary/5">
                <p className="text-xs text-muted-foreground">Total Spent</p>
                <p className="text-xl font-bold text-primary">₹14,200</p>
              </div>
            </div>
          </div>

          {/* Mandi Rates */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Market Rates</h3>
              <Badge variant="outline" className="text-[10px]">Today</Badge>
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

          {/* Govt Schemes */}
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Govt Schemes</h3>
            <div className="glass p-5 rounded-3xl border-primary/10 bg-gradient-to-br from-primary/5 to-transparent space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-primary">PM</span>
                </div>
                <div>
                  <p className="text-xs font-bold">PM-Kisan Nidhi</p>
                  <p className="text-[10px] text-muted-foreground">₹2,000 due in Nov</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-blue-700">AP</span>
                </div>
                <div>
                  <p className="text-xs font-bold">Rythu Bharosa</p>
                  <p className="text-[10px] text-muted-foreground">Check eligibility</p>
                </div>
              </div>
              <Link to="/agri-schemes">
                <Button variant="outline" className="w-full rounded-xl py-4 h-auto text-xs font-bold">View All Schemes</Button>
              </Link>
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
                        <Link to={`/location?area=${item.location.split(',')[0]}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                          <MapPin className="h-4 w-4 text-red-500" />
                          <span>{item.location}</span>
                        </Link>
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

                <DialogFooter>
                  <Button className="w-full rounded-xl py-6 text-lg" onClick={handleConfirmBooking}>
                    Confirm Booking
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
