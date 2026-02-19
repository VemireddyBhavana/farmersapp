import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Bug, Leaf, Search, MapPin, ArrowRight, ArrowLeft, Thermometer, ShieldCheck, Microscope, Camera, Zap, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const commonPests = [
  { id: 1, name: "Stem Borer", crop: "Paddy", level: "High", icon: Bug, color: "text-red-600 bg-red-100" },
  { id: 2, name: "Leaf Folder", crop: "Paddy", level: "Medium", icon: Bug, color: "text-amber-600 bg-amber-100" },
  { id: 3, name: "Fruit Borer", crop: "Tomato", level: "Low", icon: Bug, color: "text-green-600 bg-green-100" },
  { id: 4, name: "White Fly", crop: "Cotton", level: "Critical", icon: Bug, color: "text-destructive bg-destructive/10" },
];

export default function Pests() {
  const [activeTab, setActiveTab] = useState("Alerts");

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
            <h1 className="text-3xl font-extrabold tracking-tight">Pest & Disease Control</h1>
            <p className="text-muted-foreground">Smart pest detection and regional security alerts</p>
          </div>
        </div>
        <div className="flex gap-2 p-1 bg-muted rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
          {["Alerts", "Detection", "Security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-8 py-3 rounded-xl text-sm font-black transition-all whitespace-nowrap",
                activeTab === tab ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-white/50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "Alerts" && (
          <motion.div
            key="alerts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-8 lg:grid-cols-3"
          >
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <AlertTriangle className="text-destructive h-5 w-5 animate-pulse" /> Active Regional Alerts
              </h3>
              <div className="grid gap-4">
                {commonPests.map((pest) => (
                  <Card key={pest.id} className="rounded-[2.5rem] border-primary/5 hover:border-primary/20 transition-all shadow-sm overflow-hidden group cursor-pointer">
                    <CardContent className="p-8 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className={cn("p-4 rounded-[1.5rem] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12", pest.color)}>
                          <pest.icon className="h-8 w-8" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-black text-foreground">{pest.name}</h4>
                          <div className="flex items-center gap-4 text-sm font-bold text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><Leaf className="h-3 w-3 text-primary" /> {pest.crop}</span>
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-red-500" /> Chittoor District</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Threat Level</p>
                        <Badge className={cn(
                          "rounded-full px-4 py-1",
                          pest.level === "High" || pest.level === "Critical" ? "bg-destructive text-destructive-foreground shadow-lg shadow-destructive/20" : 
                          pest.level === "Medium" ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" : 
                          "bg-green-500 text-white shadow-lg shadow-green-500/20"
                        )}>
                          {pest.level}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="rounded-[2.5rem] border-primary/10 bg-primary/5 overflow-hidden shadow-xl">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-lg font-black flex items-center gap-2">
                    <ShieldCheck className="text-primary h-5 w-5" /> Preventive Measures
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6">
                  <div className="space-y-4">
                    {[
                      "Crop rotation with legumes",
                      "Early sowing to escape heavy infestation",
                      "Installation of Pheromone traps",
                      "Biological control with Trichogramma"
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-xs flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {i + 1}
                        </div>
                        <p className="text-sm font-medium text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">{step}</p>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full rounded-2xl py-6 h-auto font-black shadow-lg shadow-primary/20">
                    Get Advisory Report
                  </Button>
                </CardContent>
              </Card>

              <div className="glass p-8 rounded-[2.5rem] border-primary/10 space-y-4">
                <h4 className="font-black text-xl flex items-center gap-2">
                  <Microscope className="h-5 w-5 text-primary" /> Specialist Help
                </h4>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  Connect directly with a regional agricultural officer for critical pest outbreaks.
                </p>
                <Button variant="outline" className="w-full rounded-xl py-4 h-auto text-xs font-bold border-primary/20 hover:bg-primary hover:text-white transition-all">
                  Contact Govt Officer
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "Detection" && (
          <motion.div
            key="detection"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-12 space-y-8"
          >
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center glass rounded-[3rem] border-primary/20 shadow-2xl space-y-6">
                <Camera className="h-20 w-20 text-primary animate-bounce" />
                <div className="text-center px-8">
                  <h4 className="font-black text-xl mb-2">Smart AI Scanner</h4>
                  <p className="text-xs text-muted-foreground font-medium">Take a photo of the affected plant to identify pests instantly.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="rounded-full px-12 py-8 text-xl font-black shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-4">
                <Camera className="h-6 w-6" /> Open Scanner
              </Button>
              <Button variant="outline" className="rounded-full px-12 py-8 text-xl font-black transition-all hover:bg-primary/5 active:scale-95">
                Upload Image
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8">
              {[
                { icon: Zap, label: "Instant Results" },
                { icon: ShieldCheck, label: "Precise Detection" },
                { icon: Leaf, label: "Safe Remedies" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "Security" && (
          <motion.div
            key="security"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <Card className="rounded-[3rem] border-primary/10 overflow-hidden shadow-xl bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="p-12 pb-6">
                <CardTitle className="text-3xl font-black flex items-center gap-4">
                  <ShieldCheck className="h-8 w-8 text-primary" /> Integrated Pest Management (IPM)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-12 pt-0 space-y-12">
                <div className="grid gap-12 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-black text-xl">What is IPM?</h4>
                    <p className="text-muted-foreground leading-relaxed font-medium">
                      IPM is an effective and environmentally sensitive approach to pest management that relies on a combination of common-sense practices.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-black text-xl">The 4 Tiers of IPM</h4>
                    <ul className="space-y-3">
                      {[
                        "Action Thresholds",
                        "Monitoring and Identification",
                        "Prevention",
                        "Control"
                      ].map((tier, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm font-bold text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary" /> {tier}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-8 rounded-[2rem] bg-amber-500/10 border border-amber-500/20">
                  <p className="text-sm font-bold text-amber-700 leading-relaxed italic">
                    "Focus on long-term prevention of pests or their damage through a combination of techniques such as biological control, habitat manipulation, and use of resistant varieties."
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckCircle2({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
  );
}
