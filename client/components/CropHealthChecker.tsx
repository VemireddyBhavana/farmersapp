import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, AlertCircle, CheckCircle2, Info, Loader2, Microscope, X, HelpCircle, Lightbulb, ShieldCheck, AlertTriangle, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

export default function CropHealthChecker() {
    const { t } = useLanguage();
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [cropName, setCropName] = useState("");
    const [growthStage, setGrowthStage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<null | {
        disease: string;
        confidence: string;
        process: string;
        tip: string;
        bestPractices: string[];
        mistakes: string[];
    }>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    const validateCropImage = async (file: File) => {
        // simple validation (mock AI logic)
        const fileName = file.name.toLowerCase();
        const cropKeywords = ["leaf", "plant", "crop", "rice", "wheat", "tomato", "corn", "healthy", "sick"];
        const isValid = cropKeywords.some(keyword => fileName.includes(keyword));
        return isValid;
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setImage(URL.createObjectURL(selectedFile));
        try {
            const formData = new FormData();
            formData.append("image", selectedFile);

            const response = await fetch("/api/disease/detect", {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error("Detection failed");
            
            const data = await response.json();
            setResult({
                disease: data.disease,
                confidence: data.confidence,
                process: data.cure, // Mapping for UI
                tip: data.prevention,
                bestPractices: [
                    data.cure,
                    "Apply " + data.pesticide,
                    "Monitor crop health daily"
                ],
                mistakes: [
                    "Delaying treatment",
                    "Poor irrigation management",
                    "Ignoring early symptoms"
                ]
            });
        } catch (err: any) {
            setError("❌ Analysis failed: " + err.message);
        } finally {
            setLoading(false);
        }
        
        e.target.value = "";
    };

    const reset = () => {
        setImage(null);
        setFile(null);
        setResult(null);
        setError(null);
        setLoading(false);
    };

    return (
        <div className="space-y-12">
    return (
        <div className="space-y-12">
            {!image ? (
                <Card className="bg-[#1A2E1F] border-[#2D4534] rounded-[2rem] p-10 shadow-2xl">
                    <div className="space-y-10">
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="group relative flex flex-col items-center justify-center border-2 border-dashed border-[#2D4534] rounded-[2rem] p-24 bg-black/10 hover:bg-black/20 transition-all duration-300 cursor-pointer overflow-hidden"
                        >
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                            
                            <div className="h-24 w-24 rounded-3xl bg-[#0B1C10] flex items-center justify-center mb-6 shadow-2xl">
                                <Upload className="h-10 w-10 text-[#E8C872]" />
                            </div>
                            
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] italic">
                                Upload image or image to begin analysis
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <Button 
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 bg-[#2D4534] hover:bg-[#3D5A45] text-white h-14 rounded-xl font-bold flex items-center justify-center gap-3 transition-all"
                            >
                                <Upload className="h-5 w-5" />
                                Upload
                            </Button>
                            <Button 
                                onClick={() => cameraInputRef.current?.click()}
                                className="flex-1 bg-[#2D4534] hover:bg-[#3D5A45] text-white h-14 rounded-xl font-bold flex items-center justify-center gap-3 transition-all"
                            >
                                <Camera className="h-5 w-5" />
                                Camera
                            </Button>
                            <Button 
                                disabled={!file}
                                className="flex-1 bg-[#E8C872] hover:bg-[#D4B661] text-[#0B1C10] h-14 rounded-xl font-black uppercase italic tracking-tighter shadow-xl shadow-[#E8C872]/10"
                            >
                                <Microscope className="h-5 w-5 mr-2" />
                                AI Analysis
                            </Button>
                            <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleUpload} />
                        </div>
                    </div>
                </Card>
            ) : (
                <div className="space-y-12">
                    <Card className="rounded-[3rem] overflow-hidden border-none shadow-2xl bg-white dark:bg-slate-900 group">
                        <div className="relative aspect-[16/9] md:aspect-[21/9]">
                            {image && (
                                <img src={image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Crop preview" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-8 right-8 h-14 w-14 rounded-2xl shadow-2xl hover:rotate-90 transition-all duration-500"
                                onClick={reset}
                            >
                                <X className="h-7 w-7" />
                            </Button>
                        </div>

                        <div className="p-10 space-y-6">
                            {loading && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-12 space-y-6"
                                >
                                    <div className="relative inline-block">
                                        <Loader2 className="h-20 w-20 text-emerald-600 animate-spin mx-auto" />
                                        <Microscope className="h-10 w-10 text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    </div>
                                    <p className="text-2xl font-black text-emerald-600 uppercase italic tracking-widest animate-pulse">
                                        🌿 Analyzing crop...
                                    </p>
                                </motion.div>
                            )}

                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 p-8 rounded-3xl flex items-center gap-6"
                                >
                                    <div className="h-16 w-16 rounded-2xl bg-red-100 dark:bg-red-800/30 flex items-center justify-center shrink-0">
                                        <AlertCircle className="h-8 w-8 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-red-900 dark:text-red-100 uppercase italic">Analysis Failed</h3>
                                        <p className="text-red-700 dark:text-red-300 font-bold">{error}</p>
                                    </div>
                                </motion.div>
                            )}

                            <AnimatePresence>
                                {result && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        <Card className="bg-[#1A2E1F] border-[#2D4534] rounded-3xl p-8">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Analysis Results</p>
                                            
                                            <div className="grid grid-cols-2 gap-8 items-center mb-8">
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Disease</p>
                                                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                                                        {result.disease}
                                                    </h3>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Confidence</p>
                                                    <div className="inline-block bg-black/20 rounded-lg px-4 py-2 border border-white/10">
                                                        <span className="text-xl font-black text-[#E8C872] italic">{result.confidence}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 bg-black/20 p-4 rounded-2xl border border-white/5">
                                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Status: [ACTIVE]</span>
                                            </div>
                                        </Card>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="bg-[#1A2E1F] border border-[#2D4534] rounded-3xl p-6">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Lightbulb className="h-5 w-5 text-[#E8C872]" />
                                                    <h4 className="text-sm font-black text-white uppercase italic tracking-wider">Cure Process</h4>
                                                </div>
                                                <p className="text-sm text-slate-400 leading-relaxed italic">{result.process}</p>
                                            </div>
                                            <div className="bg-[#1A2E1F] border border-[#2D4534] rounded-3xl p-6">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                                                    <h4 className="text-sm font-black text-white uppercase italic tracking-wider">Prevention Tip</h4>
                                                </div>
                                                <p className="text-sm text-slate-400 leading-relaxed italic">{result.tip}</p>
                                            </div>
                                        </div>

                                        <Button 
                                            onClick={reset}
                                            className="w-full h-14 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase tracking-widest text-xs transition-all"
                                        >
                                            Analyze Another Image
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}

