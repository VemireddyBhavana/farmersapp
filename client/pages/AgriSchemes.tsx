import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, IndianRupee, MapPin, Search, Filter, ArrowUpRight, ArrowLeft, Leaf, LayoutGrid, LayoutList, CheckCircle2, AlertTriangle, ExternalLink, ScrollText, Navigation, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import { backend, Application } from "@/lib/MockBackend";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

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
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [userApps, setUserApps] = useState<Application[]>([]);

  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleTrack = () => {
    if (!user) return;
    const apps = backend.getApplications(user.phone);
    setUserApps(apps);
    setIsTrackModalOpen(true);
  };

  const handleApplyClick = (scheme: any) => {
    setSelectedScheme(scheme);
    setIsApplyModalOpen(true);
  };

  const handleApplyConfirm = () => {
    if (!user || !selectedScheme) return;
    backend.addApplication({
      schemeName: selectedScheme.name,
      userId: user.phone
    });
    setIsApplyModalOpen(false);
    toast({
      title: "Application Submitted",
      description: `Your application for ${selectedScheme.name} has been received.`,
    });
  };

  const handleLocate = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      toast({
        title: "Location Detected",
        description: "Displaying schemes for Chittoor District, Andhra Pradesh.",
      });
    }, 2000);
  };

  const filteredSchemes = schemes.filter(s =>
    activeCategory === "All" || s.category === activeCategory
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          {t("availableSchemes")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("findSchemes")}
        </p>
      </div>

      {/* Find Schemes for Your Location Section */}
      <Card className="rounded-[2.5rem] border-primary/5 bg-white shadow-sm overflow-hidden">
        <CardContent className="p-12 text-center space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-3 text-2xl font-black text-amber-600">
              <Search className="h-7 w-7" />
              {t("findSchemes")}
            </div>
            <p className="text-muted-foreground max-w-2xl font-medium">
              Click the button below to use your device location to find schemes specific to your state.
            </p>
          </div>

          <Button
            onClick={handleLocate}
            disabled={isLocating}
            className="rounded-xl bg-amber-500 hover:bg-amber-600 px-10 py-7 text-lg font-bold shadow-xl shadow-amber-500/20 flex items-center gap-3 mx-auto"
          >
            <Navigation className={cn("h-5 w-5 fill-current", isLocating && "animate-spin")} />
            {isLocating ? "Getting Your Location..." : "Get Local Schemes"}
          </Button>
        </CardContent>
      </Card>

      {/* Categories and Grid */}
      <div className="space-y-8 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="text-3xl font-black tracking-tight">Available Schemes</h2>
          <div className="flex gap-2 p-1 bg-muted rounded-2xl overflow-x-auto no-scrollbar">
            {["All", "Income Support", "Risk Protection", "State Support"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={cn(
                  "px-6 py-3 rounded-xl text-sm font-black transition-all whitespace-nowrap",
                  activeCategory === tab ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                )}
              >
                {tab === "Income Support" ? t("incomeSupport") : tab === "Risk Protection" ? t("riskProtection") : tab === "State Support" ? t("stateSupport") : t("viewAll")}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div className="grid gap-6 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredSchemes.map((scheme, idx) => (
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
                          <Button
                            onClick={() => handleApplyClick(scheme)}
                            className="flex-1 rounded-2xl py-6 h-auto font-black shadow-lg shadow-primary/20"
                          >
                            {t("applyNow")}
                          </Button>
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

          <aside className="space-y-6">
            <Card className="rounded-[2.5rem] border-primary/10 shadow-lg bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div className="space-y-2 text-center">
                  <p className="text-xs font-black uppercase tracking-widest text-primary/60">Eligible For You</p>
                  <p className="text-5xl font-black text-primary">05</p>
                </div>
                <div className="space-y-2 text-center">
                  <p className="text-xs font-black uppercase tracking-widest text-primary/60">Total Schemes</p>
                  <p className="text-4xl font-black">24+</p>
                </div>
                <Button
                  onClick={handleTrack}
                  className="w-full rounded-2xl py-6 h-auto font-black shadow-lg shadow-primary/20"
                >
                  {t("trackApp")}
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-[2.5rem] border-primary/10 shadow-lg bg-amber-50/50">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-lg font-black flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" /> Deadline Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-4">
                <div className="p-4 rounded-2xl bg-white border border-amber-100">
                  <p className="text-xs font-bold text-amber-800">PM-Kisan Verification</p>
                  <p className="text-[10px] text-amber-700/80 mt-1">Submit your e-KYC by Oct 31st.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-blue-100">
                  <p className="text-xs font-bold text-blue-800">Crop Insurance</p>
                  <p className="text-[10px] text-blue-700/80 mt-1">Enrollment starts Nov 1st.</p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* Apply Modal */}
      <Dialog open={isApplyModalOpen} onOpenChange={setIsApplyModalOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-[2rem] p-8 border-none glass">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">Scheme Application</DialogTitle>
            <DialogDescription className="font-medium">
              You are applying for <strong>{selectedScheme?.name}</strong>. Please confirm your details.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-2">
              <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Applicant Name</p>
              <p className="font-bold">{user?.username}</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-2">
              <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Phone Number</p>
              <p className="font-bold">{user?.phone}</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
              <p className="text-sm font-medium text-amber-800">
                Note: By clicking confirm, your pre-verified land records will be attached to this application automatically.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button className="w-full rounded-xl py-6 text-lg font-bold" onClick={handleApplyConfirm}>
              Confirm Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Track Modal */}
      <Dialog open={isTrackModalOpen} onOpenChange={setIsTrackModalOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-[2rem] p-8 border-none glass max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">{t("trackMyApps")}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-6">
            {userApps.length === 0 ? (
              <div className="text-center py-12">
                <ScrollText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground font-medium">{t("noApps")}</p>
              </div>
            ) : (
              userApps.map((app) => (
                <div key={app.id} className="p-6 rounded-[1.5rem] bg-white border border-primary/5 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-lg">{app.schemeName}</h4>
                      <p className="text-xs font-bold text-muted-foreground">{t("appId")}: {app.id}</p>
                    </div>
                    <Badge className={cn(
                      "rounded-full px-3 py-1",
                      app.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                    )}>
                      {app.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground border-t pt-4">
                    <Calendar className="h-3 w-3" />
                    {t("date")}: {app.date}
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
