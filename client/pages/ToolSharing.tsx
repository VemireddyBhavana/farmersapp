import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Truck, 
  Search, 
  MapPin, 
  Plus, 
  Star, 
  Clock, 
  ShieldCheck, 
  Phone,
  Filter,
  ArrowRight,
  Info,
  CheckCircle2,
  Calendar,
  X
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

const ToolSharing = () => {
  const { t } = useLanguage();
  const [showBooking, setShowBooking] = useState(false);
  const [selectedTool, setSelectedTool] = useState<any>(null);

  const tools = [
    {
      id: 1,
      title: "Mahindra Yuvo 575 DI",
      category: "Tractor",
      price: "ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹500 / Hr",
      owner: "Suresh P.",
      rating: 4.8,
      location: "2.5 km away",
      image: "/tool_sharing.png",
      specs: ["45 HP", "Power Steering"]
    },
    {
      id: 2,
      title: "Combine Harvester",
      category: "Harvester",
      price: "ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹1200 / Hr",
      owner: "Mandeep Singh",
      rating: 4.9,
      location: "5.0 km away",
      image: "https://images.unsplash.com/photo-1594498653385-d5172c53ecd6?auto=format&fit=crop&w=800&q=80",
      specs: ["Large Grain Tank", "Ac Cabin"]
    },
    {
      id: 3,
      title: "Rotavator (6 Feet)",
      category: "Tillage",
      price: "ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹300 / Hr",
      owner: "Vikram R.",
      rating: 4.7,
      location: "1.2 km away",
      image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&w=800&q=80",
      specs: ["Multi Speed", "Heavy Duty"]
    }
  ];

  const handleBook = (tool: any) => {
    setSelectedTool(tool);
    setShowBooking(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 pt-10">
          <h1 className="text-4xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic leading-[0.9] mb-6">
            {t('p2pToolSharingTitle')}
          </h1>
          <p className="text-xl text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
            {t('p2pToolSharingDesc')}
          </p>
        </div>

        {/* Search & Actions */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 max-w-5xl mx-auto">
          <div className="flex-1 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search tractors, harvesters, plows..." 
              className="w-full h-16 pl-16 pr-6 bg-slate-50 dark:bg-slate-900 border-none rounded-3xl text-sm font-bold italic outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
            />
          </div>
          <Button className="h-16 px-10 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-3xl italic uppercase tracking-widest shadow-xl flex items-center gap-3">
            <Plus className="h-6 w-6" /> {t('postYourTool')}
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
           {/* Sidebar Filters */}
           <div className="lg:col-span-1 space-y-6">
             <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-slate-50 dark:bg-slate-900">
               <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                 <Filter className="h-4 w-4" /> Category
               </h3>
               <div className="space-y-4">
                 {["Tractors", "Harvesters", "Tillage", "Seeding", "Irrigation"].map((cat, i) => (
                   <div key={i} className="flex items-center justify-between group cursor-pointer">
                     <span className="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-emerald-500 transition-colors uppercase tracking-tight italic">{cat}</span>
                     <div className="h-2 w-2 rounded-full bg-slate-200 group-hover:bg-emerald-500" />
                   </div>
                 ))}
               </div>
             </Card>

             <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <ShieldCheck className="h-24 w-24" />
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-2 italic">Safe Share</h4>
                <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase mb-4 tracking-wide">Every transaction is insured and verified by TechSpark.</p>
                <Button variant="outline" className="w-full rounded-xl border-white/20 bg-white/5 hover:bg-white/10 font-black italic uppercase tracking-widest text-[9px]">Verified Badges</Button>
             </Card>
           </div>

           {/* Tool Grid */}
           <div className="lg:col-span-3 grid md:grid-cols-2 gap-8">
             {tools.map((tool) => (
                <motion.div
                  whileHover={{ y: -10 }}
                  key={tool.id}
                >
                  <Card className="overflow-hidden rounded-[3rem] border-none shadow-xl bg-white dark:bg-slate-900 group h-full flex flex-col">
                    <div className="h-64 relative overflow-hidden">
                      <img src={tool.image} alt={tool.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                      <div className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md text-white border border-white/20">
                        <p className="text-[10px] font-black uppercase tracking-widest italic">{tool.category}</p>
                      </div>
                      <div className="absolute bottom-6 right-6 px-6 py-2 rounded-2xl bg-emerald-600 text-white font-black italic text-sm shadow-2xl">
                        {tool.price}
                      </div>
                    </div>

                    <div className="p-10 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                           <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none group-hover:text-emerald-600 transition-colors">
                             {tool.title}
                           </h3>
                           <div className="flex items-center gap-1 text-amber-500">
                             <Star className="h-4 w-4 fill-current" />
                             <span className="text-xs font-black italic">{tool.rating}</span>
                           </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                           {tool.specs.map((spec, i) => (
                             <span key={i} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-500 italic">
                               {spec}
                             </span>
                           ))}
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                           <div className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                               <MapPin className="h-5 w-5 text-emerald-500" />
                             </div>
                             <div>
                               <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Location</p>
                               <p className="text-xs font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{tool.location}</p>
                             </div>
                           </div>
                           <div className="text-right">
                             <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Owner</p>
                             <p className="text-xs font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{tool.owner}</p>
                           </div>
                        </div>
                      </div>

                      <Button 
                        onClick={() => handleBook(tool)}
                        className="w-full h-16 mt-8 bg-slate-900 hover:bg-emerald-600 text-white font-black rounded-2xl italic flex items-center justify-center gap-3 transition-all active:scale-95 group/btn"
                      >
                         Rent This Tool <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
             ))}
           </div>
        </div>

        {/* Booking Overlay Simulation */}
        <AnimatePresence>
          {showBooking && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowBooking(false)}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl"
              >
                <div className="p-10">
                   <div className="flex justify-between items-start mb-8">
                     <div>
                       <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-[0.9] mb-2">Book Equipment</h3>
                       <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 italic">Confirm your rental schedule</p>
                     </div>
                     <button onClick={() => setShowBooking(false)} className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-rose-100 hover:text-rose-500 transition-colors">
                        <X className="h-5 w-5" />
                     </button>
                   </div>

                   <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
                         <div className="flex items-center gap-4">
                           <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center">
                             <Truck className="h-6 w-6 text-slate-400" />
                           </div>
                           <div>
                             <p className="text-xs font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{selectedTool?.title}</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">{selectedTool?.price}</p>
                           </div>
                         </div>
                         <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Start Date</label>
                           <div className="relative">
                             <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                             <input type="date" defaultValue="2026-03-22" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 pl-12 text-xs font-bold italic outline-none" />
                           </div>
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Duration (Hrs)</label>
                           <div className="relative">
                             <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                             <input type="number" defaultValue="4" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 pl-12 text-xs font-bold italic outline-none" />
                           </div>
                         </div>
                      </div>

                      <div className="pt-8 space-y-4">
                         <div className="flex justify-between text-xs font-black uppercase tracking-widest italic">
                           <span className="text-slate-400">Total Estimated Cost</span>
                           <span className="text-slate-900 dark:text-white">ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹2,000</span>
                         </div>
                         <Button className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl italic text-lg shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">
                           Confirm Rental
                         </Button>
                      </div>
                   </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default ToolSharing;
