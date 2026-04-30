import React, { useState, useRef } from "react";
import { Camera, Upload, X, Activity, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useTranslation } from "react-i18next";

interface SoilImageUploadProps {
  onSoilDetected: (data: { type: string; n: number; p: number; k: number; ph: number; moisture: number }) => void;
}

export const SoilImageUpload: React.FC<SoilImageUploadProps> = ({ onSoilDetected }) => {
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
    setResult(null);
  };

  const analyzeSoil = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/soil/analyze", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Analysis failed");
      const data = await response.json();
      setResult(data);
      
      // Auto-fill the form if requested
      if (data.suggested_values) {
        onSoilDetected({
          type: data.soil_type,
          ...data.suggested_values
        });
      }
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
  };

  return (
    <Card className="overflow-hidden border-2 border-dashed border-emerald-200 bg-emerald-50/30 p-6">
      {!image ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center py-10 cursor-pointer group"
        >
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
          <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
            <Camera className="h-8 w-8 text-emerald-600" />
          </div>
          <p className="text-sm font-bold text-emerald-800 uppercase tracking-widest">{t('uploadSoilImage') || "Upload Soil Image"}</p>
          <p className="text-xs text-emerald-600/60 mt-1">{t('soilImageDesc') || "AI will detect soil type & NPK levels"}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border-4 border-white">
            <img src={image} className="w-full h-full object-cover" alt="Soil" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-lg"
              onClick={reset}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-4 gap-3">
              <Activity className="h-5 w-5 text-emerald-600 animate-spin" />
              <span className="text-sm font-black text-emerald-700 uppercase italic animate-pulse">Analyzing Soil Profile...</span>
            </div>
          ) : result ? (
            <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Detected Type</p>
                <div className="bg-emerald-100 px-2 py-0.5 rounded text-[10px] font-black text-emerald-700">{result.confidence} Match</div>
              </div>
              <h4 className="text-xl font-black text-[#2D4534] italic uppercase">{result.soil_type} Soil</h4>
              <p className="text-[10px] text-slate-500 font-medium mt-1 leading-tight">{result.characteristics}</p>
              <Button 
                onClick={reset} 
                variant="outline" 
                className="w-full mt-4 h-10 border-emerald-200 text-emerald-700 font-bold text-xs uppercase"
              >
                Scan Another
              </Button>
            </div>
          ) : (
            <Button 
              onClick={analyzeSoil} 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase italic tracking-widest"
            >
              Start AI Detection
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};
