import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Leaf, 
  Upload, 
  Camera, 
  Microscope, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Activity,
  Droplets,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

export default function SoilPredictor() {
  const { t } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    soilType: string;
    confidence: string;
    characteristics: string;
    suitability: string[];
  }>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile));
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Using the analyze-soil endpoint from app.py
      const response = await fetch("/api/soil/analyze", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Analysis failed");
      
      const data = await response.json();
      setResult({
        soilType: data.soil_type,
        confidence: data.confidence,
        characteristics: "Good water retention, rich in organic matter, and well-structured for root growth.",
        suitability: data.suitable_crops || ["Tomato", "Rice", "Wheat"]
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
    <div className="min-h-screen bg-[#F1F5F2] text-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#2D4534] uppercase italic flex items-center justify-center gap-4">
            <Leaf className="h-10 w-10 text-emerald-600" />
            Soil Type Predictor AI
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Upload Section */}
          <div className="lg:col-span-7">
            {!image ? (
              <Card className="bg-white border-white rounded-[2rem] p-10 shadow-xl">
                <div className="space-y-10">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative flex flex-col items-center justify-center border-2 border-dashed border-emerald-100 rounded-[2rem] p-24 bg-slate-50 hover:bg-emerald-50/50 transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                    
                    <div className="h-24 w-24 rounded-3xl bg-white flex items-center justify-center mb-6 shadow-2xl group-hover:rotate-6 transition-transform">
                      <Upload className="h-10 w-10 text-emerald-600" />
                    </div>
                    
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] italic text-center">
                      Upload soil image or video to begin analysis
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 bg-white border border-slate-100 hover:bg-slate-50 text-slate-600 h-14 rounded-xl font-bold flex items-center justify-center gap-3 transition-all"
                    >
                      <Upload className="h-5 w-5" />
                      Upload
                    </Button>
                    <Button 
                      className="flex-1 bg-[#2D4534] hover:bg-[#1A2E1F] text-white h-14 rounded-xl font-black uppercase italic tracking-tighter shadow-xl shadow-emerald-500/10"
                    >
                      Predict Soil Type
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-white border-white rounded-[2rem] overflow-hidden shadow-xl">
                <div className="relative aspect-video">
                  <img src={image} className="w-full h-full object-cover" alt="Soil preview" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-6 right-6 h-12 w-12 rounded-xl shadow-2xl"
                    onClick={reset}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                
                <div className="p-8">
                  {loading ? (
                    <div className="text-center py-12 space-y-4">
                      <Activity className="h-12 w-12 text-emerald-600 animate-spin mx-auto" />
                      <p className="text-xl font-black text-emerald-600 uppercase italic tracking-widest animate-pulse">Analyzing Soil Profile...</p>
                    </div>
                  ) : result && (
                    <div className="space-y-8">
                       <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                          <div className="grid grid-cols-2 gap-8 items-center">
                             <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Detected Type</p>
                                <h3 className="text-3xl font-black text-[#2D4534] italic uppercase tracking-tighter">
                                   {result.soilType}
                                </h3>
                             </div>
                             <div className="text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Confidence</p>
                                <div className="inline-block bg-white rounded-lg px-4 py-2 border border-slate-100 shadow-sm">
                                   <span className="text-2xl font-black text-emerald-600 italic">{result.confidence}</span>
                                </div>
                             </div>
                          </div>
                          
                          <div className="mt-6 flex items-center gap-3 bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                             <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                             <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Status: [ACTIVE ANALYSIS]</span>
                          </div>
                       </div>
                       
                       <Button onClick={reset} className="w-full h-14 rounded-2xl bg-[#2D4534] text-white font-black uppercase tracking-widest text-xs">
                          Analyze Another Sample
                       </Button>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column: Information & Results */}
          <div className="lg:col-span-5 space-y-8">
            <Card className="bg-white border-white rounded-[2.5rem] p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#2D4534] flex items-center gap-3 mb-6 italic uppercase tracking-tighter">
                <HelpCircle className="h-6 w-6 text-emerald-600" />
                How It Works
              </h3>
              <div className="space-y-6">
                <div className="space-y-4">
                  {[
                    { step: 1, text: "Upload a high-quality photo of the soil sample." },
                    { step: 2, text: "AI analyzes color, texture, and particle size." },
                    { step: 3, text: "Get instant soil classification and crop suitability." }
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-4">
                      <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                        {s.step}
                      </div>
                      <p className="text-sm font-bold text-slate-500 italic leading-snug">{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="bg-[#2D4534] border-[#2D4534] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
              <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-3 mb-6 italic uppercase tracking-tighter">
                <Layers className="h-6 w-6" />
                Soil Intelligence
              </h3>
              
              {result ? (
                <div className="space-y-6 relative z-10">
                   <div>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Characteristics</p>
                      <p className="text-sm font-bold italic leading-relaxed text-white/90">
                        {result.characteristics}
                      </p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Suitable Crops</p>
                      <div className="flex flex-wrap gap-2">
                        {result.suitability.map(crop => (
                          <div key={crop} className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-black uppercase italic border border-white/10">
                            {crop}
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              ) : (
                <div className="py-12 text-center space-y-4 opacity-40">
                   <Droplets className="h-12 w-12 mx-auto animate-pulse" />
                   <p className="text-xs font-black uppercase tracking-[0.2em]">Awaiting Data Input</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
