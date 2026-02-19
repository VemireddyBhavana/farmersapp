import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MessageSquare, MapPin, Search, Filter, ArrowUpRight, ArrowLeft, Leaf, LayoutGrid, LayoutList, CheckCircle2, AlertTriangle, ExternalLink, HelpCircle, PhoneCall, BotIcon, Globe, Info, MessageCircle, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const helpTopics = [
  { id: 1, title: "Scheme Application Support", icon: HelpCircle, color: "text-green-600 bg-green-100", desc: "Get help with filling out government scheme forms and verifying eligibility." },
  { id: 2, title: "Technical Assistance", icon: SettingsIcon, color: "text-blue-600 bg-blue-100", desc: "Solve issues related to the Smart Farmer app or digital land records." },
  { id: 3, title: "Agricultural Advisories", icon: Leaf, color: "text-cyan-600 bg-cyan-100", desc: "Speak with experts about crop health, pest control, and seasonal advice." },
  { id: 4, title: "Grievance Redressal", icon: HeartHandshake, color: "text-amber-600 bg-amber-100", desc: "Report issues with market rates, equipment owners, or platform services." },
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

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
            <h1 className="text-4xl font-black tracking-tight text-foreground">Government Help Center</h1>
            <p className="text-muted-foreground font-medium">Official support for farmers and agricultural workers</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Support Options */}
        <div className="lg:col-span-2 space-y-12">
          {/* Quick Contact Bar */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Kisan Call Center", val: "1800-180-1551", icon: PhoneCall, color: "bg-green-600 shadow-green-600/20" },
              { label: "Email Support", val: "help@agri.gov.in", icon: Mail, color: "bg-blue-600 shadow-blue-600/20" },
              { label: "WhatsApp Chat", val: "+91 9876543210", icon: MessageCircle, color: "bg-cyan-600 shadow-cyan-600/20" }
            ].map((contact, i) => (
              <motion.div
                whileHover={{ y: -5 }}
                key={i}
                className={cn(
                  "p-6 rounded-[2rem] text-white flex flex-col items-center justify-center space-y-3 shadow-xl transition-all cursor-pointer",
                  contact.color
                )}
              >
                <contact.icon className="h-8 w-8" />
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80">{contact.label}</p>
                  <p className="text-sm font-black whitespace-nowrap">{contact.val}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-black px-2">How can we help you?</h3>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <Input
                placeholder="Search topics, questions, or keywords..."
                className="h-20 rounded-[2.5rem] pl-16 pr-8 text-xl bg-white border-primary/10 shadow-lg shadow-primary/5 focus-visible:ring-primary font-medium"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {helpTopics.map((topic) => (
                <Card key={topic.id} className="rounded-[2.5rem] border-primary/5 hover:border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/5 cursor-pointer h-full group">
                  <CardHeader className="p-8 pb-4">
                    <div className={cn("p-4 rounded-2xl w-fit transition-transform duration-300 group-hover:scale-110", topic.color)}>
                      <topic.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl font-black group-hover:text-primary transition-colors leading-tight mt-6">{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{topic.desc}</p>
                    <div className="pt-6 flex items-center text-xs font-black text-primary uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      Explore Topics <ArrowUpRight className="ml-1 h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Regional Offices / Sidebar */}
        <aside className="space-y-8">
          <Card className="rounded-[2.5rem] border-primary/10 shadow-lg overflow-hidden bg-primary text-primary-foreground">
            <CardHeader className="p-8 pb-4 border-b border-white/10">
              <CardTitle className="text-2xl font-black flex items-center gap-3">
                <Globe className="h-6 w-6" /> State Portals
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {[
                { name: "Andhra Pradesh (Meebhoomi)", link: "meebhoomi.ap.gov.in" },
                { name: "Telangana (Dharani)", link: "dharani.telangana.gov.in" },
                { name: "Karnataka (Bhoomi)", link: "landrecords.karnataka.gov.in" },
                { name: "Tamil Nadu (Patta)", link: "eservices.tn.gov.in" }
              ].map((portal, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black">{portal.name}</h4>
                    <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs font-medium text-white/60 group-hover:text-white transition-colors">{portal.link}</p>
                </div>
              ))}
              <Button className="w-full rounded-2xl py-6 h-auto font-black bg-white text-primary hover:bg-white/90">
                View All Portals
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-primary/10 shadow-lg bg-muted/20">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black flex items-center gap-2 text-foreground">
                <Info className="h-5 w-5 text-primary" /> FAQ's
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-4">
              {[
                "How to apply for PM-Kisan?",
                "Linking Aadhaar with land records?",
                "Claiming crop insurance?",
                "Regional mandi opening times?"
              ].map((q, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/50 transition-all cursor-pointer group">
                  <HelpCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0" />
                  <p className="text-sm font-black text-muted-foreground group-hover:text-foreground">{q}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="p-8 rounded-[2.5rem] bg-amber-500/10 border border-amber-500/20 text-center">
            <h4 className="font-black text-xl text-amber-900 mb-2">Emergency?</h4>
            <p className="text-sm text-amber-800/80 font-medium mb-4">Contact your regional agri-officer immediately for emergency outbreaks.</p>
            <Button className="w-full rounded-2xl bg-amber-600 hover:bg-amber-700 font-black h-12">Call Now</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  );
}
