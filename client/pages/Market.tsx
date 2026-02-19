import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, IndianRupee, MapPin, Search, Filter, ArrowUpRight, ArrowLeft, Leaf, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const mandiRates = [
  { crop: "Paddy (Basmati)", rate: "₹4,200", change: "+150", trend: "up", mandi: "Chittoor Mandi", date: "Oct 12, 2023" },
  { crop: "Wheat", rate: "₹2,125", change: "-25", trend: "down", mandi: "Nellore Mandi", date: "Oct 12, 2023" },
  { crop: "Tomato", rate: "₹1,800", change: "+400", trend: "up", mandi: "Tirupati Mandi", date: "Oct 12, 2023" },
  { crop: "Onion", rate: "₹2,400", change: "0", trend: "neutral", mandi: "Kadapa Mandi", date: "Oct 12, 2023" },
  { crop: "Groundnut", rate: "₹6,800", change: "+320", trend: "up", mandi: "Chittoor Mandi", date: "Oct 12, 2023" },
  { crop: "Cotton", rate: "₹8,200", change: "-100", trend: "down", mandi: "Guntur Mandi", date: "Oct 12, 2023" },
];

export default function Market() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Market Rates (Mandi)</h1>
            <p className="text-muted-foreground">Live daily prices for major crops across Andhra Pradesh</p>
          </div>
        </div>
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search crops or mandis..." className="pl-10 rounded-full bg-muted/30 border-primary/10" />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Market Insights Sidebar */}
        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-primary/10 bg-primary/5 shadow-sm overflow-hidden">
            <CardHeader className="p-8 pb-4 bg-primary text-primary-foreground">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5" /> Insights
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">Market trends today</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Best Seller</p>
                <div className="p-4 rounded-2xl bg-white border border-primary/5">
                  <h4 className="font-black text-xl text-primary">Tomato</h4>
                  <p className="text-xs text-muted-foreground">+₹400 increase today</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Price Alert</p>
                <div className="p-4 rounded-2xl bg-white border border-red-100">
                  <h4 className="font-black text-xl text-red-600">Cotton</h4>
                  <p className="text-xs text-muted-foreground">-₹100 decrease expected</p>
                </div>
              </div>
              <Button className="w-full rounded-xl py-6 h-auto gap-2">
                <LayoutGrid className="h-4 w-4" /> Market Summary
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Live Rates Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Live Crop Rates</h3>
            <Badge variant="outline" className="rounded-full px-4 py-1">Last Update: 10:30 AM</Badge>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mandiRates.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="rounded-[2rem] border-primary/5 hover:border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/5 group cursor-pointer h-full">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Leaf className="h-7 w-7" />
                      </div>
                      <Badge className={cn(
                        "rounded-full",
                        item.trend === "up" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                        item.trend === "down" ? "bg-red-100 text-red-700 hover:bg-red-100" :
                        "bg-muted text-muted-foreground hover:bg-muted"
                      )}>
                        {item.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : item.trend === "down" ? <TrendingDown className="h-3 w-3 mr-1" /> : null}
                        {item.change !== "0" ? item.change : "Stable"}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-2xl font-black text-foreground">{item.crop}</h4>
                      <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {item.mandi}
                      </p>
                    </div>
                    <div className="flex items-end justify-between border-t pt-4">
                      <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Price / Quintal</p>
                        <p className="text-2xl font-black text-primary">{item.rate}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-primary hover:bg-primary/5 transition-transform group-hover:translate-x-1">
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
    </div>
  );
}
