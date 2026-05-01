import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  Droplets,
  Wind,
  CheckCircle2,
  Info
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

const DroneBooking = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState("Pesticide");
  const [isBooking, setIsBooking] = useState(false);

  const serviceKeys = [
    { key: "pesticide", icon: Droplets, price: "₹499/Acre", descKey: "pesticideSprayDesc" },
    { key: "fertilizer", icon: Wind, price: "₹399/Acre", descKey: "fertilizerSprayDesc" },
    { key: "mapping", icon: MapPin, price: "₹299/Acre", descKey: "mappingSprayDesc" }
  ];
  const benefitKeys = ["coversAcre", "zeroCropDamage", "savesWater", "safeFromChemicals"];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 pt-10 relative">
          <motion.div 
             animate={{ y: [0, -15, 0] }} 
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="inline-flex items-center justify-center p-4 rounded-full bg-cyan-100 text-cyan-600 mb-6 relative z-10 shadow-2xl shadow-cyan-500/40"
          >
             <Navigation className="h-10 w-10" />
          </motion.div>
          <h1 className="text-4xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic leading-[0.9] mb-4">
            {t('droneTitle') || "Drone Spray Booking"}
          </h1>
          <p className="text-xl text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
            {t('droneDesc') || "Book precision agri-drones for fast and safe chemical spraying on your farm."}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-5 space-y-6">
             <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-white dark:bg-slate-900">
               <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-6">{t("selectService")}</h3>
               
               <div className="space-y-4 mb-8">
                 {serviceKeys.map((s) => (
                   <div 
                     key={s.key}
                     onClick={() => setSelectedService(s.key)}
                     className={cn("p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all group", selectedService === s.key ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/10" : "border-slate-100 dark:border-slate-800 hover:border-cyan-300")}
                   >
                     <div className="flex items-center gap-4">
                        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center transition-colors", selectedService === s.key ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30" : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-cyan-100 group-hover:text-cyan-600")}>
                           <s.icon className="h-5 w-5" />
                        </div>
                        <div>
                           <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{t(s.key)} {t("spray")}</h4>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t(s.descKey)}</p>
                        </div>
                     </div>
                     <span className={cn("text-lg font-black italic tracking-tighter", selectedService === s.key ? "text-cyan-600" : "text-slate-900 dark:text-white")}>{s.price}</span>
                   </div>
                 ))}
               </div>

               <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                     <div className="w-[48%]">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic mb-2 block">{t("dateLabel")}</label>
                        <div className="relative group">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-cyan-500" />
                          <input type="date" className="w-full h-12 pl-10 pr-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold italic outline-none border-none focus:ring-2 focus:ring-cyan-500/50" />
                        </div>
                     </div>
                     <div className="w-[48%]">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic mb-2 block">{t("timeSlot")}</label>
                        <div className="relative group">
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-cyan-500" />
                          <select className="w-full h-12 pl-10 pr-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold italic outline-none border-none focus:ring-2 focus:ring-cyan-500/50 appearance-none">
                             <option>06:00 AM</option>
                             <option>08:00 AM</option>
                             <option>04:00 PM</option>
                          </select>
                        </div>
                     </div>
                  </div>

                  <div>
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic mb-2 block">{t("totalArea")}</label>
                     <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-cyan-500" />
                        <input type="number" placeholder="e.g. 5" className="w-full h-12 pl-10 pr-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold italic outline-none border-none focus:ring-2 focus:ring-cyan-500/50" />
                     </div>
                  </div>
               </div>

               <Button 
                 onClick={() => { setIsBooking(true); setTimeout(() => setIsBooking(false), 2000); }} 
                 className="w-full h-14 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest italic shadow-xl shadow-cyan-500/20"
               >
                 {isBooking ? t("confirming") : t("confirmBooking")}
               </Button>
               <p className="text-[9px] font-bold text-slate-400 mt-4 text-center flex items-center justify-center gap-1 uppercase tracking-widest"><ShieldCheck className="h-3 w-3" /> {t("certifiedPilots")}</p>
             </Card>
          </div>

          {/* Benefits/Info */}
          <div className="lg:col-span-7 space-y-6">
             <Card className="p-10 rounded-[3rem] border-none shadow-xl bg-slate-900 text-white min-h-[400px] relative overflow-hidden flex flex-col justify-end">
                {/* Simulated Drone Image BG */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579820010410-c10411aaaa88?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay grayscale group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
                
                <div className="relative z-10 space-y-6">
                   <div className="inline-flex px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-widest animate-pulse">{t("saveChemicals")}</div>
                   <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">{t("droneFuture")}</h2>
                   <div className="grid md:grid-cols-2 gap-4">
                      {benefitKeys.map((b, i) => (
                        <div key={i} className="flex items-center gap-2">
                           <CheckCircle2 className="h-5 w-5 text-cyan-500 drop-shadow-lg flex-shrink-0" />
                           <span className="text-xs font-bold uppercase tracking-widest text-slate-200">{t(b)}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </Card>

             <div className="grid md:grid-cols-2 gap-6">
                 <Card className="p-6 rounded-[2rem] border-none shadow-xl bg-cyan-50 dark:bg-cyan-900/10 flex items-start gap-4">
                   <div className="h-10 w-10 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                     <Info className="h-5 w-5" />
                   </div>
                   <div>
                     <h5 className="text-sm font-black uppercase tracking-tighter text-slate-900 dark:text-white mb-1">{t("preFlightInstructions")}</h5>
                     <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">{t("preFlightDesc")}</p>
                   </div>
                 </Card>
                 <Card className="p-6 rounded-[2rem] border-none shadow-xl bg-slate-50 dark:bg-slate-800 flex items-start gap-4">
                   <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl flex items-center justify-center flex-shrink-0">
                     <Droplets className="h-5 w-5" />
                   </div>
                   <div>
                     <h5 className="text-sm font-black uppercase tracking-tighter text-slate-900 dark:text-white mb-1">{t("chemicalMixing")}</h5>
                     <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">{t("chemicalMixingDesc")}</p>
                   </div>
                 </Card>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneBooking;
