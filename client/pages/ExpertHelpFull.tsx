import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Phone, Video, Mic, Sparkles, Loader2, Send, 
  AlertCircle, BrainCircuit, ShieldAlert, Star,
  Clock, CheckCircle2, MessageSquare, Briefcase
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import MentorBookingModal from "@/components/MentorBookingModal";
import UPIPaymentScreen from "@/components/UPIPaymentScreen";
import MentorChatInterface from "@/components/MentorChatInterface";

const EXPERTS = [
  { 
    id: 1, 
    name: "Dr. Rajesh Kumar", 
    title: "PhD Agronomy, IARI Delhi", 
    specialty: "Crop Pathology", 
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=300",
    tags: ["Crop Health", "Pest Control", "Organic Farming"],
    rating: 5,
    availability: "Mon-Fri, 6-9 PM",
    price: 299
  },
  { 
    id: 2, 
    name: "Er. Sneha Rao", 
    title: "M.Tech Water Resources, NIT", 
    specialty: "Irrigation Expert", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    tags: ["Drip Irrigation", "Water Saving", "Micro-irrigation"],
    rating: 4,
    availability: "Tue-Sat, 5-8 PM",
    price: 349
  },
  { 
    id: 3, 
    name: "Prof. Amit Singh", 
    title: "Soil Science Expert, PAU", 
    specialty: "Soil Scientist", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    tags: ["Soil Testing", "Nutrient Management", "Fertilizer Advice"],
    rating: 5,
    availability: "Daily, 8-11 AM",
    price: 399
  },
  { 
    id: 4, 
    name: "Dr. Priya Nair", 
    title: "PhD Plant Biotechnology", 
    specialty: "Genetic Specialist", 
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300",
    tags: ["Seed Quality", "GM Crops", "Hybrid Varieties"],
    rating: 5,
    availability: "Mon-Thu, 4-7 PM",
    price: 499
  },
  { 
    id: 5, 
    name: "Er. Anil Reddy", 
    title: "B.E. Agricultural Engineering", 
    specialty: "Machinery Expert", 
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    tags: ["Tractor Tech", "Automation", "Tool Design"],
    rating: 4,
    availability: "Wed-Sun, 7-10 PM",
    price: 249
  },
  { 
    id: 6, 
    name: "Prof. Sunita Sharma", 
    title: "Horticulture lead, UASB", 
    specialty: "Fruit Cultivation", 
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
    tags: ["Grafting", "Greenhouse", "Post-Harvest"],
    rating: 5,
    availability: "Fri-Sun, 3-6 PM",
    price: 299
  }
];

const ExpertHelpFull = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [flowStep, setFlowStep] = useState<"idle" | "booking" | "payment" | "chat">("idle");
  const [showEmergency, setShowEmergency] = useState(false);

  const handleStartBooking = (expert: any) => {
    setSelectedExpert(expert);
    setFlowStep("booking");
  };

  const handleProceedToPayment = () => {
    setFlowStep("payment");
  };

  const handlePaymentSuccess = () => {
    setFlowStep("chat");
  };

  const closeFlow = () => {
    setFlowStep("idle");
    setSelectedExpert(null);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="expert-hub-root min-h-screen bg-[#f8fafc] text-foreground">
      <div className="relative min-h-screen pt-24 pb-20 font-sans overflow-x-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Header Section */}
          <section className="relative z-10 mb-16 text-center">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-slate-900 leading-tight">
                {t("expertHelpHub")}
              </h1>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto font-medium">
                {t("expertMentorSub")}
              </p>
            </motion.div>

            <div className="flex items-center justify-center gap-4 mt-10">
               <Button 
                onClick={() => setShowEmergency(true)}
                variant="destructive" 
                className="h-14 px-8 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-red-500/20"
               >
                 <AlertCircle className="mr-2 h-5 w-5" />
                 {t("emergency")}
               </Button>
               <Button 
                onClick={() => navigate("/interview")}
                className="h-14 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-emerald-500/20"
               >
                 <BrainCircuit className="mr-2 h-5 w-5" />
                 {t("talkToAi")}
               </Button>
            </div>
          </section>

          {/* Mentor Grid (Image 1 Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {EXPERTS.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group relative bg-white border-transparent hover:border-primary/20 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(124,58,237,0.1)] transition-all duration-500 overflow-hidden">
                  {/* Glass Background Micro-decoration */}
                  <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
                  
                  <div className="relative flex items-start gap-6 mb-8">
                    <div className="h-20 w-20 min-w-[5rem] rounded-full border-4 border-slate-50 p-1 shadow-inner relative z-10">
                      <img src={expert.image} className="w-full h-full object-cover rounded-full" alt={expert.name} />
                      <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-emerald-500 border-4 border-white rounded-full" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors">{expert.name}</h3>
                      <p className="text-sm text-muted-foreground font-semibold flex items-center gap-1.5 mt-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {expert.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {expert.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-slate-50 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-slate-100">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("h-4 w-4", i < expert.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200")} />
                    ))}
                    <span className="text-xs font-black ml-2 text-slate-400">({expert.rating}.0)</span>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{expert.availability}</span>
                      </div>
                      <div className="text-2xl font-black text-emerald-600">₹{expert.price}<span className="text-xs text-muted-foreground font-medium ml-1">{t("perSession")}</span></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mt-8">
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        onClick={() => handleStartBooking(expert)}
                        className="h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/20"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {t("chatBtn")}
                      </Button>
                      <Button 
                        onClick={() => navigate(`/interview?topic=${encodeURIComponent(expert.specialty)}`)}
                        variant="outline"
                        className="h-14 rounded-2xl border-slate-200 hover:bg-emerald-50 text-emerald-600 border-2 font-black uppercase text-xs tracking-widest transition-all"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        {t("callBtn")}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Form (Image 2 style) */}
      <MentorBookingModal 
        isOpen={flowStep === "booking"}
        onClose={closeFlow}
        mentor={selectedExpert}
        onProceed={handleProceedToPayment}
      />

      {/* Payment Screen (UPI style) */}
      <UPIPaymentScreen 
        isOpen={flowStep === "payment"}
        onClose={() => setFlowStep("booking")}
        mentor={selectedExpert}
        onSuccess={handlePaymentSuccess}
      />

      {/* Chat Interface (Image 3 style) */}
      <MentorChatInterface 
        isOpen={flowStep === "chat"}
        onClose={closeFlow}
        mentor={selectedExpert}
      />

      {/* Emergency Modal */}
      <AnimatePresence> 
        {showEmergency && ( 
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/95 text-white">
            <Card className="w-full max-w-lg bg-black border border-red-500/20 rounded-[3rem] p-12 text-center">
              <ShieldAlert className="h-20 w-20 bg-red-600 rounded-3xl mx-auto mb-8 p-4 text-white" />
              <h2 className="text-4xl font-black mb-4">{t("emergencySupport")}</h2>
              <p className="mb-8 text-white/60">{t("emergencySub")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <Button onClick={() => window.location.href = 'tel:18004251556'} className="p-8 h-20 rounded-[2.5rem] bg-white/5 font-black uppercase">{t("callGovt")}</Button>
                <Button onClick={() => setShowEmergency(false)} className="p-8 h-20 rounded-[2.5rem] bg-emerald-600 font-black uppercase text-white">{t("cancel")}</Button>
              </div>
            </Card>
          </div> 
        )} 
      </AnimatePresence>
    </motion.div>
  );
};

export default ExpertHelpFull;

