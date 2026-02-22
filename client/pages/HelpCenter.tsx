import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MessageSquare, MapPin, Search, Filter, ArrowUpRight, ArrowLeft, Leaf, LayoutGrid, LayoutList, CheckCircle2, AlertTriangle, ExternalLink, HelpCircle, PhoneCall, BotIcon, Globe, Info, MessageCircle, HeartHandshake, Landmark, Fingerprint, FileText, HeartPulse, GraduationCap, Truck, IndianRupee, Sprout } from "lucide-react";
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

import { useLanguage } from "@/lib/LanguageContext";
import { useMemo } from "react";

export default function HelpCenter() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const govServices = useMemo(() => [
    { name: "PM-KISAN", category: t("agriFarmers"), desc: "Farmer Support Scheme", icon: Leaf, url: "https://pmkisan.gov.in" },
    { name: "eNAM (Agri Market)", category: t("agriFarmers"), desc: "National Agriculture Market", icon: LayoutGrid, url: "https://enam.gov.in" },
    { name: "Agmarknet (Prices)", category: t("agriFarmers"), desc: "Agricultural Marketing Information", icon: IndianRupee, url: "https://agmarknet.gov.in" },
    { name: "Soil Health Card", category: t("agriFarmers"), desc: "Crop-wise Nutrient Management", icon: Sprout, url: "https://soilhealth.dac.gov.in" },
    { name: "Aadhaar Services", category: t("identityDocs"), desc: "Update or Verify Aadhaar Details", icon: Fingerprint, url: "https://uidai.gov.in" },
    { name: "Ration Card", category: t("foodPublicDist"), desc: "Apply or Manage Ration Cards", icon: FileText, url: "https://nfsa.gov.in" },
    { name: "Ayushman Bharat", category: t("healthWelfare"), desc: "Universal Health Insurance", icon: HeartPulse, url: "https://pmjay.gov.in" },
    { name: "Digital India", category: t("educationLiteracy"), desc: "Digital Skills and Learning", icon: GraduationCap, url: "https://digitalindia.gov.in" },
  ], [t]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4 max-w-4xl mx-auto mb-16">
        <div className="bg-emerald-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-sm">
          <Landmark className="h-10 w-10 text-emerald-600" />
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground">
          {t("govServicesTitle")}
        </h1>
        <p className="text-muted-foreground text-xl font-medium">
          {t("govServicesDesc")}
        </p>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 max-w-5xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={t("searchServices")}
            className="h-14 rounded-xl border-primary/5 pl-12 bg-muted/20 text-lg font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-64 h-14 rounded-xl border-primary/5 bg-muted/20 text-lg font-medium">
            <SelectValue placeholder={t("allCategories")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allCategories")}</SelectItem>
            <SelectItem value="agri">{t("agriFarmers")}</SelectItem>
            <SelectItem value="identity">{t("identityDocs")}</SelectItem>
            <SelectItem value="health">{t("healthWelfare")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-8">
        {govServices.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="rounded-[2rem] border-primary/5 shadow-sm hover:shadow-xl transition-all h-full group flex flex-col">
              <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <service.icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <Badge variant="outline" className="text-[10px] font-black uppercase text-emerald-600 border-emerald-100 bg-emerald-50/50">
                      {service.category}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black group-hover:text-emerald-600 transition-colors">{service.name}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{service.desc}</p>
                  </div>
                </div>
                <a href={service.url} target="_blank" rel="noopener noreferrer" className="mt-auto">
                  <Button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 h-12 font-bold flex items-center gap-2">
                    {t("visitWebsite")} <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Support Options */}
      <div className="pt-20 space-y-12">
        <h2 className="text-3xl font-black tracking-tight text-center">{t("needDirectSupport")}</h2>
        <div className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
          {[
            { label: t("kisanCallCenter"), val: "1800-180-1551", icon: PhoneCall, color: "bg-emerald-600" },
            { label: t("emailSupport"), val: "help@agri.gov.in", icon: Mail, color: "bg-blue-600" },
            { label: t("whatsappChat"), val: "+91 9876543210", icon: MessageCircle, color: "bg-cyan-600" }
          ].map((contact, i) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={i}
              className={cn(
                "p-8 rounded-[2.5rem] text-white flex flex-col items-center justify-center space-y-4 shadow-xl transition-all cursor-pointer",
                contact.color
              )}
            >
              <contact.icon className="h-10 w-10" />
              <div className="text-center">
                <p className="text-xs font-black uppercase tracking-widest opacity-80">{contact.label}</p>
                <p className="text-lg font-black whitespace-nowrap">{contact.val}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
