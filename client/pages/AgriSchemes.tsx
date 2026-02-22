import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ExternalLink, ScrollText, Navigation, Calendar, Search } from "lucide-react";
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
} from "@/components/ui/dialog";

const schemes = [
  {
    id: 1,
    nameKey: "schemePmKisan",
    benefitKey: "benefitPmKisan",
    categoryKey: "incomeSupport",
    statusKey: "statusActive",
    eligibilityKey: "eligPmKisan",
    color: "bg-green-100 text-green-700",
    descKey: "descPmKisan",
    url: "https://pmkisan.gov.in",
  },
  {
    id: 2,
    nameKey: "schemePmfby",
    benefitKey: "benefitPmfby",
    categoryKey: "riskProtection",
    statusKey: "statusOpen",
    eligibilityKey: "eligPmfby",
    color: "bg-blue-100 text-blue-700",
    descKey: "descPmfby",
    url: "https://pmfby.gov.in",
  },
  {
    id: 3,
    nameKey: "schemeYsr",
    benefitKey: "benefitYsr",
    categoryKey: "stateSupport",
    statusKey: "statusActive",
    eligibilityKey: "eligYsr",
    color: "bg-cyan-100 text-cyan-700",
    descKey: "descYsr",
    url: "https://ysrrythubharosa.ap.gov.in/",
  },
  {
    id: 4,
    nameKey: "schemeSoilHealth",
    benefitKey: "benefitSoilHealth",
    categoryKey: "scientificFarming",
    statusKey: "statusOngoing",
    eligibilityKey: "eligSoilHealth",
    color: "bg-amber-100 text-amber-700",
    descKey: "descSoilHealth",
    url: "https://soilhealth.dac.gov.in",
  },
];

export default function AgriSchemes() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
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

  const handleApplyClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleLocate = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      toast({
        title: t("locationDetected"),
        description: t("locationDetectedDesc"),
      });
    }, 2000);
  };

  const filteredSchemes = schemes.filter(s =>
    activeCategory === "All" || s.categoryKey === activeCategory
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
              {t("clickLocationSchemes")}
            </p>
          </div>

          <Button
            onClick={handleLocate}
            disabled={isLocating}
            className="rounded-xl bg-amber-500 hover:bg-amber-600 px-10 py-7 text-lg font-bold shadow-xl shadow-amber-500/20 flex items-center gap-3 mx-auto"
          >
            <Navigation className={cn("h-5 w-5 fill-current", isLocating && "animate-spin")} />
            {isLocating ? t("gettingLocation") : t("getLocalSchemes")}
          </Button>
        </CardContent>
      </Card>

      {/* Categories and Grid */}
      <div className="space-y-8 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="text-3xl font-black tracking-tight">{t("availableSchemes")}</h2>
          <div className="flex gap-2 p-1 bg-muted rounded-2xl overflow-x-auto no-scrollbar">
            {["All", "incomeSupport", "riskProtection", "stateSupport"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={cn(
                  "px-6 py-3 rounded-xl text-sm font-black transition-all whitespace-nowrap",
                  activeCategory === tab ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                )}
              >
                {tab === "incomeSupport" ? t("incomeSupport") : tab === "riskProtection" ? t("riskProtection") : tab === "stateSupport" ? t("stateSupport") : t("viewAll")}
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
                          <Badge className="rounded-full bg-green-500/10 text-green-700 hover:bg-green-500/10 border-none font-black text-[10px] uppercase tracking-widest">{t(scheme.statusKey)}</Badge>
                        </div>
                        <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors leading-tight">{t(scheme.nameKey)}</CardTitle>
                        <CardDescription className="text-sm font-bold text-primary mt-1">{t(scheme.benefitKey)}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-8 pt-0 space-y-6">
                        <p className="text-sm text-muted-foreground leading-relaxed font-medium">{t(scheme.descKey)}</p>
                        <div className="flex flex-wrap gap-4 pt-2">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t("categoryLabel")}</p>
                            <p className="text-xs font-bold">{t(scheme.categoryKey)}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t("eligibilityLabel")}</p>
                            <p className="text-xs font-bold">{t(scheme.eligibilityKey)}</p>
                          </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                          <Button
                            onClick={() => handleApplyClick(scheme.url)}
                            className="flex-1 rounded-2xl py-6 h-auto font-black shadow-lg shadow-primary/20"
                          >
                            {t("applyNow")}
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-2xl h-14 w-14 border-primary/10 hover:bg-primary/5 transition-all group-hover:translate-x-1"
                            onClick={() => handleApplyClick(scheme.url)}
                          >
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
                  <p className="text-xs font-black uppercase tracking-widest text-primary/60">{t("eligibleForYou")}</p>
                  <p className="text-5xl font-black text-primary">05</p>
                </div>
                <div className="space-y-2 text-center">
                  <p className="text-xs font-black uppercase tracking-widest text-primary/60">{t("totalSchemes")}</p>
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
                  <AlertTriangle className="h-5 w-5 text-amber-500" /> {t("deadlineAlerts")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-4">
                <div className="p-4 rounded-2xl bg-white border border-amber-100">
                  <p className="text-xs font-bold text-amber-800">{t("pmKisanVerification")}</p>
                  <p className="text-[10px] text-amber-700/80 mt-1">{t("eKycDeadline")}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-blue-100">
                  <p className="text-xs font-bold text-blue-800">{t("cropInsuranceLabel")}</p>
                  <p className="text-[10px] text-blue-700/80 mt-1">{t("cropInsuranceEnrollment")}</p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>


      {/* Track Modal */}
      <Dialog open={isTrackModalOpen} onOpenChange={setIsTrackModalOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-[2rem] p-8 border-none glass max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">{t("trackMyApps")}</DialogTitle>
            <DialogDescription className="font-medium">
              {t("trackAppDesc")}
            </DialogDescription>
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

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t("beneficiary") || "Beneficiary"}</p>
                      <p className="text-xs font-bold">{app.beneficiaryName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t("location") || "Location"}</p>
                      <p className="text-xs font-bold">{app.location}</p>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Verification Status</p>
                      <p className="text-xs font-bold text-emerald-600">{app.verificationStep}</p>
                    </div>
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
