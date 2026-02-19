import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, IndianRupee, MapPin, Search, Filter, ArrowUpRight, ArrowLeft, Leaf, LayoutGrid, LayoutList, CheckCircle2, AlertTriangle, ExternalLink, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const schemes = [
  {
    id: 1,
    name: "PM-Kisan Samman Nidhi",
    benefit: "₹6,000 / Year",
    category: "Income Support",
    status: "Active",
    eligibility: "Small & Marginal Farmers",
    color: "bg-green-100 text-green-700",
    desc: "Income support of ₹6,000 per year in three equal installments to all landholding farmer families."
  },
  {
    id: 2,
    name: "Pradhan Mantri Fasal Bima Yojana",
    benefit: "Crop Insurance",
    category: "Risk Protection",
    status: "Open",
    eligibility: "All Farmers",
    color: "bg-blue-100 text-blue-700",
    desc: "Provides financial support to farmers suffering crop loss/damage arising out of natural calamities."
  },
  {
    id: 3,
    name: "YSR Rythu Bharosa",
    benefit: "₹13,500 / Year",
    category: "State Support",
    status: "Active",
    eligibility: "AP Farmers",
    color: "bg-cyan-100 text-cyan-700",
    desc: "Financial assistance to farmers in Andhra Pradesh for agricultural operations."
  },
  {
    id: 4,
    name: "Soil Health Card Scheme",
    benefit: "Free Soil Testing",
    category: "Scientific Farming",
    status: "Ongoing",
    eligibility: "All Landholders",
    color: "bg-amber-100 text-amber-700",
    desc: "Informs farmers about the nutrient status of their soil and recommendations on dosage of nutrients."
  },
];

export default function AgriSchemes() {
  const [activeCategory, setActiveCategory] = useState("All");

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
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Government Agri Schemes</h1>
            <p className="text-muted-foreground">Empowering farmers with state and central government support</p>
          </div>
        </div>
        <div className="flex gap-2 p-1 bg-muted rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
          {["All", "Income Support", "Risk Protection", "State Support"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab)}
              className={cn(
                "px-6 py-3 rounded-xl text-sm font-black transition-all whitespace-nowrap",
                activeCategory === tab ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-white/50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Statistics / Quick Glance */}
        <aside className="space-y-6">
          <Card className="rounded-[2.5rem] border-primary/10 shadow-lg bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
            <CardContent className="p-8 space-y-8">
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-widest text-primary/60">Total Schemes</p>
                <p className="text-4xl font-black">24+</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-widest text-primary/60">Eligible For You</p>
                <p className="text-4xl font-black text-primary">05</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-widest text-primary/60">Pending Applications</p>
                <p className="text-4xl font-black text-amber-500">01</p>
              </div>
              <Button className="w-full rounded-2xl py-6 h-auto font-black shadow-lg shadow-primary/20">
                Track Application
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-primary/10 shadow-lg bg-white border">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-lg font-black flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" /> Deadline Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                <p className="text-xs font-bold text-amber-800">PM-Kisan Verification</p>
                <p className="text-[10px] text-amber-700/80 mt-1">Submit your e-KYC by Oct 31st to receive the next installment.</p>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                <p className="text-xs font-bold text-blue-800">Crop Insurance</p>
                <p className="text-[10px] text-blue-700/80 mt-1">Enrollment for Rabi crops starting from Nov 1st.</p>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Schemes List */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search schemes by name or keywords..." className="h-12 rounded-full pl-12 bg-muted/30 border-primary/5 focus-visible:ring-primary" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-xl h-12 w-12 text-primary border-primary/10"><LayoutGrid className="h-5 w-5" /></Button>
              <Button variant="outline" size="icon" className="rounded-xl h-12 w-12 text-muted-foreground border-primary/10 bg-white"><LayoutList className="h-5 w-5" /></Button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {schemes.map((scheme, idx) => (
                <motion.div
                  layout
                  key={scheme.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="rounded-[2.5rem] border-primary/5 hover:border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/5 cursor-pointer h-full group overflow-hidden">
                    <CardHeader className="p-8 pb-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className={cn("p-4 rounded-2xl transition-transform duration-300 group-hover:scale-110", scheme.color)}>
                          <ScrollText className="h-8 w-8" />
                        </div>
                        <Badge className="rounded-full bg-green-500/10 text-green-700 hover:bg-green-500/10 border-none font-black text-[10px] uppercase tracking-widest">{scheme.status}</Badge>
                      </div>
                      <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors leading-tight">{scheme.name}</CardTitle>
                      <CardDescription className="text-sm font-bold text-primary mt-1">{scheme.benefit}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-0 space-y-6">
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium">{scheme.desc}</p>
                      <div className="flex flex-wrap gap-4 pt-2">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Category</p>
                          <p className="text-xs font-bold">{scheme.category}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Eligibility</p>
                          <p className="text-xs font-bold">{scheme.eligibility}</p>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button className="flex-1 rounded-2xl py-6 h-auto font-black shadow-lg shadow-primary/20">Apply Now</Button>
                        <Button variant="outline" size="icon" className="rounded-2xl h-14 w-14 border-primary/10 hover:bg-primary/5 transition-all group-hover:translate-x-1">
                          <ExternalLink className="h-6 w-6 text-primary" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
