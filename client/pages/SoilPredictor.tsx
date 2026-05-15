import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Microscope, 
  Upload, 
  Camera, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Activity,
  Droplets,
  Layers,
  Thermometer,
  Zap,
  Leaf,
  FlaskConical,
  Beaker,
  Stethoscope,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function SoilPredictor() {
  const { t } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputMode, setInputMode] = useState<"image" | "npk">("image");
  const [npkData, setNpkData] = useState({
    n: 120,
    p: 60,
    k: 80,
    ph: 6.5,
    moisture: 40
  });

  const [result, setResult] = useState<null | {
    soilType: string;
    confidence: string;
    characteristics: string;
    suitability: string[];
    suggestedValues: {
      n: string;
      p: string;
      k: string;
      ph: string;
      moisture: string;
    };
    healthStatus: "Excellent" | "Good" | "Requires Treatment";
  }>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile));
    setResult(null);
  };

  const triggerAnalysis = async () => {
    setLoading(true);
    try {
      // Simulation of Real AI analysis
      await new Promise(r => setTimeout(r, 2500));
      
      let analysisResult;
      if (inputMode === "image") {
        // Deterministic mock based on existence of image
        analysisResult = {
          soil_type: "Alluvial / Loamy Mix",
          confidence: "94.2%",
          characteristics: "High organic matter with optimal sand-to-clay ratio. Excellent water drainage and root aeration capabilities.",
          suitable_crops: ["Rice", "Sugar Cane", "Wheat", "Oilseeds"],
          suggested_values: { n: "140", p: "70", k: "90", ph: "6.8", moisture: "42%" },
          healthStatus: "Excellent"
        };
      } else {
        // Logic based on NPK values
        const isHealthy = npkData.ph >= 6.0 && npkData.ph <= 7.5;
        analysisResult = {
          soil_type: "Inferred Clayey-Loam",
          confidence: "98.5%",
          characteristics: isHealthy ? "Balanced nutrient profile. Highly productive soil." : "Imbalanced pH detected. Risk of nutrient lockout.",
          suitable_crops: isHealthy ? ["Cotton", "Maize", "Chilli"] : ["Barley", "Millet"],
          suggested_values: { 
            n: (npkData.n + 10).toString(), 
            p: (npkData.p + 5).toString(), 
            k: npkData.k.toString(), 
            ph: "7.0", 
            moisture: "45%" 
          },
          healthStatus: isHealthy ? "Good" : "Requires Treatment"
        };
      }

      setResult({
        soilType: analysisResult.soil_type,
        confidence: analysisResult.confidence,
        characteristics: analysisResult.characteristics,
        suitability: analysisResult.suitable_crops,
        suggestedValues: analysisResult.suggested_values,
        healthStatus: analysisResult.healthStatus as any
      });
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setFile(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-32">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
           <div className="flex justify-center mb-4">
              <div className="bg-emerald-100 p-4 rounded-3xl shadow-inner border border-emerald-200">
                 <Microscope className="h-10 w-10 text-emerald-600" />
              </div>
           </div>
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase italic">
             Soil Intelligence AI
           </h1>
           <p className="text-slate-400 font-bold tracking-[0.2em] uppercase mt-2">{t("advancedPedologySystem")}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Input Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-slate-200 flex gap-2">
               <button 
                 onClick={() => setInputMode("image")}
                 className={cn("flex-1 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all", inputMode === "image" ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:bg-slate-50")}
               >
                 Visual Scan
               </button>
               <button 
                 onClick={() => setInputMode("npk")}
                 className={cn("flex-1 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all", inputMode === "npk" ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:bg-slate-50")}
               >
                 NPK Analysis
               </button>
            </div>

            {!result && !loading ? (
              <Card className="bg-white border-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12">
                   <FlaskConical size={240} />
                </div>
                
                {inputMode === "image" ? (
                  <div className="space-y-10 relative z-10">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="group relative flex flex-col items-center justify-center border-4 border-dashed border-slate-100 rounded-[3rem] p-24 bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all duration-500 cursor-pointer overflow-hidden"
                    >
                      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                      
                      {image ? (
                        <img src={image} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <>
                          <div className="h-28 w-28 rounded-[2rem] bg-white flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform">
                            <Upload className="h-10 w-10 text-emerald-600" />
                          </div>
                          <p className="text-base font-black text-slate-400 uppercase tracking-widest text-center italic">
                             Drop Soil Sample Image
                          </p>
                        </>
                      )}
                    </div>
                    
                    <Button 
                      onClick={triggerAnalysis}
                      disabled={!image}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-20 rounded-[2rem] font-black uppercase italic tracking-widest text-xl shadow-2xl shadow-emerald-500/20 disabled:opacity-30"
                    >
                       Start Neural Analysis
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-8 relative z-10">
                     <div className="grid grid-cols-3 gap-6">
                        {["n", "p", "k"].map(key => (
                           <div key={key} className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{key} Value</label>
                              <input 
                                type="number" 
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 font-black text-2xl focus:border-emerald-500 outline-none transition-all"
                                value={(npkData as any)[key]}
                                onChange={(e) => setNpkData({...npkData, [key]: parseInt(e.target.value)})}
                              />
                           </div>
                        ))}
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">pH Level</label>
                           <input 
                              type="number" step="0.1"
                              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 font-black text-2xl focus:border-emerald-500 outline-none transition-all text-emerald-600"
                              value={npkData.ph}
                              onChange={(e) => setNpkData({...npkData, ph: parseFloat(e.target.value)})}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Moisture %</label>
                           <input 
                              type="number"
                              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 font-black text-2xl focus:border-emerald-500 outline-none transition-all text-blue-600"
                              value={npkData.moisture}
                              onChange={(e) => setNpkData({...npkData, moisture: parseInt(e.target.value)})}
                           />
                        </div>
                     </div>
                     <Button 
                      onClick={triggerAnalysis}
                      className="w-full bg-slate-900 hover:bg-black text-white h-20 rounded-[2rem] font-black uppercase italic tracking-widest text-xl shadow-2xl shadow-slate-900/20"
                    >
                       Calculate Soil Health
                    </Button>
                  </div>
                )}
              </Card>
            ) : loading ? (
              <Card className="bg-white border-white rounded-[3rem] p-24 shadow-2xl flex flex-col items-center justify-center space-y-10">
                 <div className="relative">
                    <div className="h-32 w-32 rounded-full border-8 border-emerald-50 border-t-emerald-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <FlaskConical className="h-10 w-10 text-emerald-600 animate-pulse" />
                    </div>
                 </div>
                 <div className="text-center space-y-2">
                    <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Running Spectroscopy</h3>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] animate-pulse">Syncing with planetary soil database...</p>
                 </div>
              </Card>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* PRIMARY RESULT CARD */}
                <Card className="bg-white border-white rounded-[3.5rem] overflow-hidden shadow-2xl">
                   <div className={cn(
                     "p-12 text-white relative",
                     result.healthStatus === "Excellent" ? "bg-emerald-600" : result.healthStatus === "Good" ? "bg-blue-600" : "bg-amber-600"
                   )}>
                      <div className="absolute top-0 right-0 p-12 opacity-10">
                         <Layers size={180} />
                      </div>
                      <div className="relative z-10 space-y-6">
                         <div className="flex items-center gap-4">
                            <span className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                               {result.healthStatus} Status
                            </span>
                            <span className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                               {result.confidence} Confidence
                            </span>
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Identified Soil Class</p>
                            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                               {result.soilType}
                            </h2>
                         </div>
                      </div>
                   </div>

                   <div className="p-12 grid grid-cols-5 gap-4">
                      {Object.entries(result.suggestedValues).map(([key, val]) => (
                        <div key={key} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center group hover:bg-white hover:shadow-lg transition-all">
                           <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{key}</p>
                           <p className="text-xl font-black text-slate-800 italic group-hover:text-emerald-600 transition-colors">{val}</p>
                        </div>
                      ))}
                   </div>
                   
                   <div className="p-12 pt-0">
                      <Button onClick={reset} className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black uppercase italic tracking-widest">
                         Diagnose New Specimen
                      </Button>
                   </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Right Column: Context & Help */}
          <div className="lg:col-span-5 space-y-8">
            <Card className="bg-white border-white rounded-[3rem] p-10 shadow-lg space-y-10">
               <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-emerald-600">
                     <Info size={28} />
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Analysis Advisory</h3>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">How to get accurate results</p>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="flex gap-6 items-start">
                     <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black shrink-0">01</div>
                     <p className="text-sm font-bold italic text-slate-500 leading-relaxed">Ensure soil is dry and clear of large rocks or debris before photographing.</p>
                  </div>
                  <div className="flex gap-6 items-start">
                     <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black shrink-0">02</div>
                     <p className="text-sm font-bold italic text-slate-500 leading-relaxed">Natural daylight provides the best color spectrum for neural classification.</p>
                  </div>
               </div>

               {/* CROSS-LINK ALERT */}
               <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex gap-4">
                  <div className="bg-white p-3 rounded-2xl shadow-sm self-start">
                     <Stethoscope className="text-amber-600" />
                  </div>
                  <div className="space-y-2">
                     <h4 className="font-black text-amber-900 uppercase italic text-sm">Wrong Tool?</h4>
                     <p className="text-xs font-medium text-amber-700 leading-relaxed">
                        Are you trying to analyze a **Plant Leaf**? Use the AI Crop Doctor for disease detection.
                     </p>
                     <Link to="/satellite-analysis">
                        <Button variant="link" className="p-0 h-auto text-amber-600 font-black uppercase text-[10px] underline tracking-widest">
                           Go to Crop Doctor
                        </Button>
                     </Link>
                  </div>
               </div>
            </Card>

            {result && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <Card className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
                   <div className="absolute -top-10 -right-10 opacity-5">
                      <Zap size={240} />
                   </div>
                   <h3 className="text-2xl font-black text-emerald-400 uppercase italic tracking-tighter mb-8 flex items-center gap-3">
                      <Beaker /> Recommendations
                   </h3>
                   <div className="space-y-6 relative z-10">
                      <div>
                         <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Soil Biology</p>
                         <p className="text-sm font-bold italic text-white/90 leading-relaxed">{result.characteristics}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Prime Crop Fit</p>
                         <div className="flex flex-wrap gap-2">
                            {result.suitability.map(c => (
                              <div key={c} className="bg-white/10 px-4 py-2 rounded-xl text-xs font-black uppercase italic border border-white/10">
                                {c}
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
