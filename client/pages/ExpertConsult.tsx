import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Video, 
  Star, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  X,
  User,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  Mic,
  MicOff,
  VideoOff
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

const ExpertConsult = () => {
  const { t } = useLanguage();
  const [isCalling, setIsCalling] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [callActive, setCallActive] = useState(false);

  const experts = [
    {
      id: 1,
      name: "Dr. Arvind Swamy",
      role: "Senior Agronomist",
      specialization: "Soil Health & Nutrients",
      rating: 4.9,
      reviews: 1240,
      experience: "15+ Years",
      fee: "ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹200 / 15 min",
      avatar: "/expert_pfp.png",
      online: true
    },
    {
      id: 2,
      name: "Dr. Sneha Patil",
      role: "Entomologist",
      specialization: "Pest & Disease Control",
      rating: 4.8,
      reviews: 850,
      experience: "10+ Years",
      fee: "ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹150 / 15 min",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
      online: true
    },
    {
      id: 3,
      name: "Prof. Ram Charan",
      role: "Agricultural Engineer",
      specialization: "Irrigation Systems",
      rating: 4.7,
      reviews: 620,
      experience: "20+ Years",
      fee: "ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹250 / 15 min",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ram",
      online: false
    }
  ];

  const startCall = (expert: any) => {
    setSelectedExpert(expert);
    setIsCalling(true);
    setTimeout(() => {
      setCallActive(true);
    }, 3000);
  };

  const endCall = () => {
    setIsCalling(false);
    setCallActive(false);
    setSelectedExpert(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 pt-10">
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic mb-6">
            {t('expertConsultTitle')}
          </h1>
          <p className="text-xl text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
            {t('expertConsultDesc')}
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-slate-50 dark:bg-slate-900">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filters
              </h3>
              <div className="space-y-4">
                {["Soil Science", "Pest Management", "Crop Nutrition", "Irrigation", "Agri-Tech"].map((cat, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-pointer">
                    <div className="h-5 w-5 rounded-md border-2 border-slate-200 group-hover:border-emerald-500 transition-colors" />
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-emerald-500 transition-colors uppercase tracking-tight">{cat}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-emerald-600 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                <CheckCircle2 className="h-24 w-24" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2 italic">TeachSpark Verified</p>
              <h4 className="text-xl font-black italic uppercase leading-tight mb-4 tracking-tighter">All experts are certified researchers.</h4>
              <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-black rounded-xl italic text-xs uppercase tracking-widest h-12 shadow-2xl">
                Learn More
              </Button>
            </Card>
          </div>

          {/* Expert Grid */}
          <div className="lg:col-span-3 grid md:grid-cols-2 gap-8">
            {experts.map((expert) => (
              <motion.div
                whileHover={{ y: -8 }}
                key={expert.id}
                className="relative"
              >
                <Card className="h-full p-8 rounded-[3rem] border-none shadow-xl bg-white dark:bg-slate-900 flex flex-col justify-between group overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="relative">
                        <div className="h-24 w-24 rounded-3xl overflow-hidden bg-slate-100 p-1">
                          <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover rounded-[1.25rem] grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        {expert.online && (
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 group-hover:animate-ping" />
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-amber-500 mb-1">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-black italic">{expert.rating}</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">({expert.reviews} Reviews)</p>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-1">
                      {expert.name}
                    </h3>
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4 italic leading-none">
                      {expert.role} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {expert.experience}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                       <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-500 italic">
                         {expert.specialization}
                       </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                      <span className="text-slate-400 italic">Start Fee</span>
                      <span className="text-slate-900 dark:text-white italic">{expert.fee}</span>
                    </div>
                    <Button 
                      onClick={() => startCall(expert)}
                      className="w-full h-16 bg-slate-900 hover:bg-emerald-600 text-white font-black rounded-2xl italic flex items-center justify-center gap-3 transition-all active:scale-95 group/btn"
                    >
                      <Video className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                      {t('bookVideoCall')}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Video Call Simulation Overlay */}
        <AnimatePresence>
          {isCalling && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center p-4 md:p-8"
            >
              <div className="relative w-full max-w-6xl aspect-video bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
                {/* Simulated Video Stream */}
                <div className="absolute inset-0">
                  {!callActive ? (
                    <div className="w-full h-full flex flex-col items-center justify-center space-y-8">
                       <motion.div 
                         animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                         transition={{ duration: 2, repeat: Infinity }}
                         className="h-32 w-32 rounded-full border-4 border-emerald-500 overflow-hidden"
                       >
                         <img src={selectedExpert?.avatar} alt="Expert" className="w-full h-full object-cover" />
                       </motion.div>
                       <div className="text-center space-y-2">
                         <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Connecting to {selectedExpert?.name}...</h3>
                         <p className="text-emerald-400 font-black uppercase tracking-widest text-xs animate-pulse">Establishing Secure Video Link</p>
                       </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full group">
                      <img src={selectedExpert?.avatar} alt="Expert Video" className="w-full h-full object-cover" />
                      {/* Self View */}
                      <div className="absolute top-8 right-8 w-48 h-32 bg-slate-800 rounded-2xl border-2 border-white/20 overflow-hidden shadow-2xl">
                         <div className="w-full h-full flex items-center justify-center bg-slate-700">
                           <User className="h-10 w-10 text-slate-500" />
                         </div>
                      </div>
                      <div className="absolute bottom-8 left-8 p-6 rounded-2xl bg-black/40 backdrop-blur-md text-white border border-white/20">
                         <h4 className="font-black italic uppercase tracking-tight">{selectedExpert?.name}</h4>
                         <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Consultation Session: Live</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Call Controls */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6">
                  <button className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                    <Mic className="h-6 w-6" />
                  </button>
                  <button className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                    <VideoOff className="h-6 w-6" />
                  </button>
                  <button 
                    onClick={endCall}
                    className="h-20 w-20 rounded-full bg-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.4)] flex items-center justify-center text-white hover:bg-rose-600 transition-all active:scale-95"
                  >
                    <Phone className="h-8 w-8 rotate-[135deg]" />
                  </button>
                </div>
                
                {/* Close Button */}
                <button 
                  onClick={endCall}
                  className="absolute top-8 left-8 h-12 w-12 rounded-2xl bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-all border border-white/10"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default ExpertConsult;
