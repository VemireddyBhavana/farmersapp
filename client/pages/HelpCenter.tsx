import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MessageSquare, MapPin, Search, Filter, ArrowUpRight, ArrowLeft, Leaf, LayoutGrid, LayoutList, CheckCircle2, AlertTriangle, ExternalLink, HelpCircle, PhoneCall, BotIcon, Globe, Info, MessageCircle, HeartHandshake, Landmark, Fingerprint, FileText, HeartPulse, GraduationCap, Truck } from "lucide-react";
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

const govServices = [
  { name: "PM-KISAN", category: "Agriculture & Farmers", desc: "Farmer Support Scheme", icon: Leaf },
  { name: "eNAM (Agri Market)", category: "Agriculture & Farmers", desc: "National Agriculture Market", icon: LayoutGrid },
  { name: "Agmarknet (Prices)", category: "Agriculture & Farmers", desc: "Agricultural Marketing Information", icon: IndianRupee },
  { name: "Soil Health Card", category: "Agriculture & Farmers", desc: "Crop-wise Nutrient Management", icon: SproutIcon },
  { name: "Aadhaar Services", category: "Identity & Documents", desc: "Update or Verify Aadhaar Details", icon: Fingerprint },
  { name: "Ration Card", category: "Food & Public Distribution", desc: "Apply or Manage Ration Cards", icon: FileText },
  { name: "Ayushman Bharat", category: "Health & Welfare", desc: "Universal Health Insurance", icon: HeartPulse },
  { name: "Digital India", category: "Education & Literacy", desc: "Digital Skills and Learning", icon: GraduationCap },
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4 max-w-4xl mx-auto mb-16">
        <div className="bg-emerald-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-sm">
          <Landmark className="h-10 w-10 text-emerald-600" />
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground">
          One-Click Access to Official Government Services
        </h1>
        <p className="text-muted-foreground text-xl font-medium">
          Find important links for Aadhaar, Ration, Crop Schemes, Health, Education & more.
        </p>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 max-w-5xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for a service..."
            className="h-14 rounded-xl border-primary/5 pl-12 bg-muted/20 text-lg font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-64 h-14 rounded-xl border-primary/5 bg-muted/20 text-lg font-medium">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="agri">Agriculture & Farmers</SelectItem>
            <SelectItem value="identity">Identity & Documents</SelectItem>
            <SelectItem value="health">Health & Welfare</SelectItem>
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
                <Button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 h-12 font-bold flex items-center gap-2 mt-auto">
                  Visit Website <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Support Options */}
      <div className="pt-20 space-y-12">
        <h2 className="text-3xl font-black tracking-tight text-center">Need Direct Support?</h2>
        <div className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
          {[
            { label: "Kisan Call Center", val: "1800-180-1551", icon: PhoneCall, color: "bg-emerald-600" },
            { label: "Email Support", val: "help@agri.gov.in", icon: Mail, color: "bg-blue-600" },
            { label: "WhatsApp Chat", val: "+91 9876543210", icon: MessageCircle, color: "bg-cyan-600" }
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

function SproutIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 20h10"/><path d="M10 20c5.5-2.5 8-6.4 8-10 0-4.4-3.6-8-8-8s-8 3.6-8 8c0 3.6 2.5 7.5 8 10Z"/><path d="M10 2c1.3 0 2.5.4 3.5 1.1"/><path d="M10 6c1.1 0 2.1.4 2.8 1.1"/><path d="M10 10c.8 0 1.6.3 2.1.8"/></svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  );
}
