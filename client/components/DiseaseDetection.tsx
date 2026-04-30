import React, { useState, useRef } from "react";
import { 
  Camera, 
  Upload, 
  X, 
  Search, 
  Loader2, 
  ShieldCheck, 
  Zap, 
  AlertCircle, 
  ArrowRight,
  CheckCircle2,
  RefreshCcw,
  Info,
  Bug
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

// --- STATE 1: ImageUploadCard ---
const ImageUploadCard = ({ onUpload, fileInputRef, t }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="w-full"
  >
    <div 
      onClick={() => fileInputRef.current?.click()}
      className="group relative flex flex-col items-center justify-center border-4 border-dashed border-emerald-100 rounded-[3rem] p-16 bg-white hover:bg-emerald-50/30 hover:border-emerald-300 transition-all duration-500 cursor-pointer shadow-xl shadow-emerald-900/5"
    >
      <input 
        ref={fileInputRef} 
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={onUpload} 
      />
      
      <div className="h-28 w-28 rounded-[2.5rem] bg-emerald-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
        <Camera className="h-12 w-12 text-emerald-600" />
      </div>
      
      <h3 className="text-3xl font-black text-emerald-900 uppercase italic tracking-tighter mb-3">
        {t('scanPlantLeaf') || "Plant Disease Detection"}
      </h3>
      <p className="text-base font-bold text-emerald-600/60 uppercase tracking-widest text-center max-w-sm leading-relaxed">
        {t('diseaseDetectionDesc') || "Upload a leaf image to analyze"}
      </p>

      {/* Decorative elements */}
      <div className="absolute bottom-8 right-8 flex gap-2 opacity-20">
         <Bug className="h-8 w-8 text-emerald-900" />
         <CheckCircle2 className="h-8 w-8 text-emerald-900" />
      </div>
    </div>
  </motion.div>
);

// --- STATE 2: ImagePreviewCard ---
const ImagePreviewCard = ({ image, onAnalyze, onReset, loading }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-8"
  >
    <div className="relative aspect-square md:aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
      <img src={image} className="w-full h-full object-cover" alt="Leaf Preview" />
      
      {!loading && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-8 right-8 h-14 w-14 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all"
          onClick={onReset}
        >
          <X className="h-8 w-8" />
        </Button>
      )}
    </div>
    
    <Button 
      onClick={onAnalyze}
      disabled={loading}
      className="w-full h-20 bg-[#106A3A] hover:bg-[#0D5A31] text-white rounded-[2rem] font-black uppercase italic tracking-widest text-xl shadow-2xl shadow-emerald-900/20 flex items-center justify-center gap-4 transition-all active:scale-[0.98]"
    >
      <Search className="h-8 w-8" />
      Start AI Diagnosis
    </Button>
  </motion.div>
);

// --- STATE 3: LoaderComponent ---
const LoaderComponent = () => (
  <div className="flex flex-col items-center justify-center py-24 space-y-8">
    <div className="relative">
        <div className="h-24 w-24 rounded-full border-8 border-emerald-100 border-t-emerald-600 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-emerald-50 animate-ping" />
        </div>
    </div>
    <div className="text-center space-y-2">
      <h3 className="text-3xl font-black text-emerald-900 uppercase italic tracking-tighter">Analyzing Specimen</h3>
      <p className="text-base font-bold text-emerald-600/60 uppercase tracking-widest animate-pulse">Running neural scan on leaf patterns...</p>
    </div>
  </div>
);

// --- STATE 4: Result Components ---

const ResultCard = ({ result }: any) => {
  const isHealthy = result.status?.toLowerCase() === 'healthy' || result.disease?.toLowerCase() === 'healthy';
  const confidenceVal = typeof result.confidence === 'string' 
    ? parseFloat(result.confidence) 
    : result.confidence;
  const confidence = (confidenceVal * (confidenceVal <= 1 ? 100 : 1)).toFixed(1);

  return (
    <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden bg-white mb-8">
      <div className={cn(
        "p-12 text-white relative",
        isHealthy ? "bg-gradient-to-br from-emerald-600 to-teal-700" : "bg-gradient-to-br from-rose-600 to-orange-700"
      )}>
        <div className="absolute top-0 right-0 p-12 opacity-10">
            {isHealthy ? <CheckCircle2 className="h-48 w-48" /> : <AlertCircle className="h-48 w-48" />}
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4">
             <Badge className={cn(
               "px-6 py-2 rounded-full font-black uppercase italic tracking-widest text-xs border-none shadow-lg",
               isHealthy ? "bg-emerald-400 text-emerald-900" : "bg-rose-400 text-rose-900"
             )}>
               {isHealthy ? "Healthy Specimen" : "Infection Detected"}
             </Badge>
             <div className="bg-white/20 backdrop-blur-md px-5 py-1.5 rounded-full border border-white/20">
                <span className="text-sm font-black uppercase italic tracking-tighter text-white">
                  {confidence}% Confidence
                </span>
             </div>
          </div>
          
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-white/60 mb-2">Diagnostic Result</p>
            <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                {result.disease}
            </h2>
          </div>
          
          <div className="flex items-center gap-3 py-4 border-t border-white/10">
             <div className={cn("h-4 w-4 rounded-full animate-pulse", isHealthy ? "bg-emerald-300" : "bg-rose-300")} />
             <p className="text-lg font-bold italic text-white/90">
               {isHealthy ? "Verified: Crop is in excellent health" : "Attention: Pathogen detected in tissue"}
             </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

const CureCard = ({ cureSteps }: any) => (
  <Card className="rounded-[2.5rem] border-none bg-white shadow-2xl h-full">
    <CardContent className="p-10">
      <div className="flex items-center gap-5 mb-8">
        <div className="h-16 w-16 rounded-[1.5rem] bg-amber-100 flex items-center justify-center shadow-lg shadow-amber-900/10">
          <Zap className="h-8 w-8 text-amber-600" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">Cure Process</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Immediate Recovery Steps</p>
        </div>
      </div>
      
      <div className="space-y-5">
        {Array.isArray(cureSteps) ? cureSteps.map((step: string, i: number) => (
          <div key={i} className="flex gap-5 group">
            <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
              {i + 1}
            </div>
            <p className="text-base font-bold text-slate-600 italic leading-relaxed">{step}</p>
          </div>
        )) : (
          <p className="text-base font-bold text-slate-600 italic leading-relaxed">{cureSteps}</p>
        )}
      </div>
    </CardContent>
  </Card>
);

const PreventionCard = ({ tips }: any) => (
  <Card className="rounded-[2.5rem] border-none bg-emerald-50/50 shadow-2xl h-full">
    <CardContent className="p-10">
      <div className="flex items-center gap-5 mb-8">
        <div className="h-16 w-16 rounded-[1.5rem] bg-emerald-100 flex items-center justify-center shadow-lg shadow-emerald-900/10">
          <ShieldCheck className="h-8 w-8 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-emerald-900 uppercase italic tracking-tighter">Prevention Tips</h3>
          <p className="text-xs font-bold text-emerald-700/50 uppercase tracking-widest">Future Crop Protection</p>
        </div>
      </div>
      
      <div className="space-y-5">
        {Array.isArray(tips) ? tips.map((tip: string, i: number) => (
          <div key={i} className="flex gap-4 items-start">
             <div className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
             <p className="text-base font-bold text-emerald-800/70 italic leading-relaxed">{tip}</p>
          </div>
        )) : (
            <div className="flex gap-4 items-start">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                <p className="text-base font-bold text-emerald-800/70 italic leading-relaxed">{tips}</p>
            </div>
        )}
      </div>
    </CardContent>
  </Card>
);

// --- Main Container ---

export const DiseaseDetection: React.FC = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile));
    setResult(null); // Reset result on new upload
  };

  const detectDisease = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null); 
    
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/disease/detect", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Detection failed");
      const data = await response.json();
      setResult(data);

      // Save to history
      await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user_123", // Mock
          type: "disease",
          inputData: { method: "image", fileName: file.name },
          result: data
        })
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setFile(null);
    setResult(null);
    setLoading(false);
  };

  return (
    <div id="DiseaseDetectionContainer" className="w-full max-w-5xl mx-auto py-8">
      <AnimatePresence mode="wait">
        {/* STATE 1: INITIAL */}
        {!image && !loading && !result && (
          <ImageUploadCard 
            key="upload"
            onUpload={handleFileSelect} 
            fileInputRef={fileInputRef} 
            t={t} 
          />
        )}

        {/* STATE 2: IMAGE UPLOADED (PREVIEW) */}
        {image && !loading && !result && (
          <ImagePreviewCard 
            key="preview"
            image={image} 
            onAnalyze={detectDisease} 
            onReset={reset}
            loading={loading}
          />
        )}

        {/* STATE 3: ANALYZING (LOADING) */}
        {loading && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
             <LoaderComponent />
          </motion.div>
        )}

        {/* STATE 4: RESULT */}
        {result && !loading && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <ResultCard result={result} />
            
            <div className="grid md:grid-cols-2 gap-8">
               <CureCard cureSteps={result.treatment || result.cure || ["Consult a local agricultural officer for specific fungicides."]} />
               <PreventionCard tips={result.recommendation || result.prevention || ["Ensure crop rotation", "Monitor moisture levels"]} />
            </div>

            <div className="flex justify-center pt-8">
                <Button 
                    onClick={reset} 
                    variant="outline"
                    className="h-16 px-12 rounded-[1.5rem] border-2 border-emerald-100 text-emerald-800 font-black uppercase italic tracking-widest hover:bg-emerald-50 transition-all"
                >
                   <RefreshCcw className="mr-3 h-5 w-5" /> Diagnose New Sample
                </Button>
            </div>

            <Card className="rounded-[2rem] border-none bg-slate-900 text-slate-400 p-8 flex gap-6 italic shadow-inner">
                <Info className="h-8 w-8 text-emerald-500 shrink-0" />
                <p className="text-sm font-bold leading-relaxed">
                   AI-Powered Advice: The diagnosis is based on leaf image analysis. For high-value crops or severe outbreaks, we recommend secondary validation by a field expert.
                </p>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
