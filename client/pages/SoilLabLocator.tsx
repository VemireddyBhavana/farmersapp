import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Search, 
  FlaskConical, 
  Upload, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  TestTube,
  Microscope,
  Phone,
  Navigation
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

const SoilLabLocator = () => {
  const { t } = useLanguage();
  const [isUploading, setIsUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const labs = [
    {
      id: 1,
      name: "National Soil Testing Centre",
      distance: "4.2 km",
      rating: 4.9,
      certified: true,
      time: "Opens at 9 AM",
      tags: ["Macro Nutrients", "Micro Nutrients"]
    },
    {
      id: 2,
      name: "Agri-Science Regional Lab",
      distance: "12.5 km",
      rating: 4.7,
      certified: true,
      time: "Open 24 Hrs",
      tags: ["Soil pH", "Organic Carbon"]
    },
    {
      id: 3,
      name: "GreenEarth Testing Facility",
      distance: "18.0 km",
      rating: 4.5,
      certified: false,
      time: "Opens at 10 AM",
      tags: ["Pesticide Residue"]
    }
  ];

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setAnalysisResult({
        nitrogen: "Low (110 kg/ha)",
        phosphorus: "Medium (18 kg/ha)",
        potassium: "High (290 kg/ha)",
        ph: "6.8 (Neutral)",
        recommendation: "Increase Nitrogen application by 20% for upcoming Kharif crop. Suitable for Wheat and Mustard."
      });
      setIsUploading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 pt-10">
          <h1 className="text-4xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic leading-[0.9] mb-6">
            {t('soilLabTitle') || "Soil Lab Locator"}
          </h1>
          <p className="text-xl text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
            {t('soilLabDesc') || "Find nearby certified soil testing labs and get AI crop recommendations."}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Lab List */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search labs by pin code..." 
                className="w-full h-16 pl-16 pr-6 bg-white dark:bg-slate-900 border-none shadow-xl rounded-3xl text-sm font-bold italic outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
              />
            </div>

            <div className="space-y-4 pt-4">
              {labs.map((lab) => (
                <Card key={lab.id} className="p-6 rounded-[2rem] border-none shadow-xl bg-white dark:bg-slate-900 group hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">{lab.name}</h4>
                        {lab.certified && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 italic">{lab.time}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-emerald-600 font-black italic">{lab.distance}</span>
                      <span className="text-[10px] font-bold text-amber-500 italic">Ã¢Ëœâ€¦ {lab.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                     {lab.tags.map((tag, i) => (
                       <span key={i} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-500 italic">
                         {tag}
                       </span>
                     ))}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest">
                      <Phone className="mr-2 h-3 w-3" /> Call
                    </Button>
                    <Button className="flex-1 h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
                      <Navigation className="mr-2 h-3 w-3" /> Navigate
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column - Map & AI Analyzer */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-slate-900 text-white relative overflow-hidden h-80 flex items-center justify-center">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20 grayscale brightness-50" />
               <div className="relative text-center space-y-4">
                  <MapPin className="h-16 w-16 mx-auto text-emerald-500 animate-bounce" />
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">Live Lab Map Coverage</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">12 Labs within 50km radius</p>
               </div>
            </Card>

            <Card className="p-10 rounded-[3rem] border-none shadow-xl bg-white dark:bg-slate-900">
               <div className="flex items-center gap-4 mb-8">
                  <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <Microscope className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">AI Soil Health Analyzer</h3>
               </div>

               <AnimatePresence mode="wait">
                 {!analysisResult && !isUploading ? (
                   <div className="border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[2rem] p-12 text-center group transition-colors hover:border-emerald-500/50">
                      <TestTube className="h-20 w-20 mx-auto text-slate-300 dark:text-slate-700 mb-6 group-hover:text-emerald-500 transition-colors" />
                      <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase italic mb-2">Upload Soil Health Card</h4>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Capture or upload your government soil report PDF/Image</p>
                      <Button onClick={handleUpload} className="h-14 px-8 bg-slate-900 hover:bg-emerald-600 text-white font-black rounded-2xl italic tracking-widest uppercase text-xs">
                        <Upload className="mr-3 h-5 w-5" /> Select File
                      </Button>
                   </div>
                 ) : isUploading ? (
                   <motion.div 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                     className="py-20 text-center"
                   >
                      <div className="relative w-24 h-24 mx-auto mb-8">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-4 border-emerald-500/30 border-t-emerald-500" />
                        <Microscope className="absolute inset-0 m-auto h-8 w-8 text-emerald-600" />
                      </div>
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-2">Extracting NPK Values...</h4>
                      <p className="text-emerald-600 font-black uppercase tracking-widest text-[10px] animate-pulse">Running AI Agronomy Model</p>
                   </motion.div>
                 ) : (
                   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {[
                           { label: "Nitrogen (N)", value: analysisResult.nitrogen, color: "text-rose-500 bg-rose-50 dark:bg-rose-500/10" },
                           { label: "Phosphorus (P)", value: analysisResult.phosphorus, color: "text-amber-500 bg-amber-50 dark:bg-amber-500/10" },
                           { label: "Potassium (K)", value: analysisResult.potassium, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" },
                           { label: "Soil pH", value: analysisResult.ph, color: "text-blue-500 bg-blue-50 dark:bg-blue-500/10" }
                         ].map((item, i) => (
                           <div key={i} className={cn("p-4 rounded-2xl", item.color)}>
                             <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2 italic">{item.label}</p>
                             <h5 className="font-black italic tracking-tighter leading-none">{item.value}</h5>
                           </div>
                         ))}
                      </div>

                      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border-l-4 border-emerald-500">
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2 italic">Expert AI Recommendation</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed italic">{analysisResult.recommendation}</p>
                      </div>

                      <div className="flex gap-4">
                        <Button variant="outline" onClick={() => setAnalysisResult(null)} className="h-12 rounded-xl text-xs font-black uppercase tracking-widest italic flex-1">
                          Upload New Report
                        </Button>
                        <Button className="h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-widest italic flex-1">
                          Buy Recommended Fertilizers
                        </Button>
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilLabLocator;
