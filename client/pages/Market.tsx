import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, IndianRupee, MapPin, Search, Filter, ArrowUpRight, ArrowLeft, Leaf, LayoutGrid, RefreshCw, Calculator, Navigation, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mandiRates = [
  { crop: "Paddy (Basmati)", rate: "₹4,200", change: "+150", trend: "up", mandi: "Chittoor Mandi", date: "Oct 12, 2023" },
  { crop: "Wheat", rate: "₹2,125", change: "-25", trend: "down", mandi: "Nellore Mandi", date: "Oct 12, 2023" },
  { crop: "Tomato", rate: "₹1,800", change: "+400", trend: "up", mandi: "Tirupati Mandi", date: "Oct 12, 2023" },
  { crop: "Onion", rate: "₹2,400", change: "0", trend: "neutral", mandi: "Kadapa Mandi", date: "Oct 12, 2023" },
  { crop: "Groundnut", rate: "₹6,800", change: "+320", trend: "up", mandi: "Chittoor Mandi", date: "Oct 12, 2023" },
  { crop: "Cotton", rate: "₹8,200", change: "-100", trend: "down", mandi: "Guntur Mandi", date: "Oct 12, 2023" },
];

const topCommodities = [
  { name: "Local Vegetable", price: "₹19640", markets: "1 markets" },
  { name: "Chili", price: "₹14500", markets: "1 markets" },
  { name: "Cluster Beans", price: "₹10000", markets: "1 markets" },
  { name: "Rice", price: "₹7760", markets: "4 markets" },
  { name: "Cotton", price: "₹6600", markets: "1 markets" },
];

export default function Market() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight">Live Market Prices</h1>
        </div>
        <Button className="rounded-xl bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2 font-bold px-6 shadow-lg shadow-emerald-500/20">
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      {/* Crop Price Estimator Section */}
      <Card className="rounded-[2.5rem] border-primary/5 bg-emerald-50/30 overflow-hidden shadow-sm">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-2xl font-black flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-xl">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            Crop Price Estimator
          </CardTitle>
          <CardDescription className="text-muted-foreground font-medium pl-14">Get instant market value estimates for your crops</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid gap-6 md:grid-cols-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground">Select Crop</label>
              <Select>
                <SelectTrigger className="rounded-xl border-primary/10 h-12 bg-white">
                  <SelectValue placeholder="Choose crop..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paddy">Paddy</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="tomato">Tomato</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground">Quantity</label>
              <Input type="number" placeholder="0" className="rounded-xl border-primary/10 h-12 bg-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground">Unit</label>
              <Select defaultValue="quintals">
                <SelectTrigger className="rounded-xl border-primary/10 h-12 bg-white">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quintals">Quintals</SelectItem>
                  <SelectItem value="tons">Tons</SelectItem>
                  <SelectItem value="kg">Kilograms</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="rounded-xl bg-emerald-500 hover:bg-emerald-600 h-12 font-bold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Estimate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search commodities or markets..." className="pl-12 rounded-xl border-primary/5 h-12 bg-muted/20" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-48 rounded-xl border-primary/5 h-12 bg-muted/20">
            <SelectValue placeholder="All States" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            <SelectItem value="ap">Andhra Pradesh</SelectItem>
            <SelectItem value="tg">Telangana</SelectItem>
            <SelectItem value="ka">Karnataka</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="rounded-xl border-primary/5 h-12 px-6 flex items-center gap-2 font-bold bg-white shadow-sm">
          <Navigation className="h-4 w-4 fill-emerald-500 text-emerald-500" />
          Get Live Local Prices
        </Button>
      </div>

      <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-center gap-3 text-sm text-amber-800 font-medium">
        <Info className="h-4 w-4 text-amber-600" />
        Click Get Live Local Prices to see market data specific to your location.
      </div>

      {/* Top Commodities Section */}
      <div className="space-y-8 pt-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-emerald-600" />
          <h2 className="text-2xl font-black">Top Commodities by Average Price</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {topCommodities.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="rounded-2xl border-primary/5 shadow-sm hover:shadow-md transition-all text-center p-6 space-y-3">
                <h4 className="text-2xl font-black text-emerald-600">{item.price}</h4>
                <div className="space-y-1">
                  <p className="font-bold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground font-medium">{item.markets}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Mandi Rates Grid */}
      <div className="lg:col-span-3 space-y-6 pt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black">All Local Market Rates</h3>
          <Badge variant="outline" className="rounded-full px-4 py-1 font-bold">Today, 10:30 AM</Badge>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mandiRates.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="rounded-[2.5rem] border-primary/5 hover:border-emerald-200 transition-all hover:shadow-xl group cursor-pointer h-full">
                <CardContent className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                      <Leaf className="h-7 w-7" />
                    </div>
                    <Badge className={cn(
                      "rounded-full px-3 py-1 font-bold",
                      item.trend === "up" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                      item.trend === "down" ? "bg-red-100 text-red-700 hover:bg-red-100" :
                      "bg-muted text-muted-foreground hover:bg-muted"
                    )}>
                      {item.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : item.trend === "down" ? <TrendingDown className="h-3 w-3 mr-1" /> : null}
                      {item.change !== "0" ? item.change : "Stable"}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-2xl font-black text-foreground">{item.crop}</h4>
                    <p className="text-sm text-muted-foreground font-bold flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {item.mandi}
                    </p>
                  </div>
                  <div className="flex items-end justify-between border-t border-dashed pt-4">
                    <div>
                      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Market Price / Quintal</p>
                      <p className="text-2xl font-black text-emerald-600">{item.rate}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 text-emerald-600 hover:bg-emerald-50 transition-transform group-hover:translate-x-1">
                      <ArrowUpRight className="h-6 w-6" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
