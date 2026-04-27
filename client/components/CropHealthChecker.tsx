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
            {!image ? (
                <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/50 dark:border-slate-800/50 rounded-[3rem] shadow-2xl overflow-hidden p-1">
                    <div className="bg-white/80 dark:bg-slate-900/80 rounded-[2.8rem] p-8 md:p-12 space-y-10">
                        <div className="text-center space-y-4">
                            <div className="mx-auto h-24 w-24 rounded-[2rem] bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                                <Leaf className="h-12 w-12 text-white" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-4xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">AI Crop Doctor</h2>
                                <p className="text-lg font-bold text-slate-500 italic">Upload a crop photo for instant diagnosis</p>
                            </div>
                        </div>

                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="group relative flex flex-col items-center justify-center border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-16 bg-slate-50/50 dark:bg-slate-800/20 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all duration-300 cursor-pointer overflow-hidden"
                        >
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                            <motion.div 
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="h-28 w-28 rounded-full bg-white dark:bg-slate-700 shadow-2xl flex items-center justify-center mb-6 z-10"
                            >
                                <Upload className="h-12 w-12 text-emerald-600" />
                            </motion.div>
                            <p className="text-2xl font-black text-slate-700 dark:text-slate-300 uppercase tracking-tighter z-10 italic">Upload Image</p>
                            <p className="text-sm font-bold text-slate-400 mt-2 italic z-10">PNG, JPG or JPEG allowed</p>
                            
                            <div className="absolute inset-0 bg-emerald-500/5 scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full" />
                        </div>

                        <div className="flex justify-center">
                            <Button 
                                onClick={() => cameraInputRef.current?.click()}
                                className="bg-gradient-to-r from-emerald-500 to-emerald-700 hover:scale-105 hover:shadow-emerald-500/30 text-white h-20 px-12 rounded-full shadow-2xl text-xl font-black transition-all active:scale-95 uppercase italic tracking-tighter"
                            >
                                <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleUpload} />
                                <Camera className="mr-4 h-8 w-8" />
                                SCAN LIVE CROP
                            </Button>
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
                                        className="space-y-8"
                                    >
                                        {/* Diagnosis Card */}
                                        <div className="backdrop-blur-lg bg-white/20 dark:bg-slate-800/20 border border-white/30 dark:border-slate-700/30 rounded-[2.5rem] shadow-lg p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-14 w-14 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform">
                                                        <Microscope className="h-7 w-7 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-black text-2xl text-slate-800 dark:text-white uppercase italic tracking-tighter">
                                                            📘 Diagnosis
                                                        </h3>
                                                        <p className="text-xs font-black text-blue-500 tracking-widest uppercase">Confidence Alert: {result.confidence}</p>
                                                    </div>
                                                </div>
                                                <Badge className="bg-emerald-500 text-white border-none font-black px-6 py-2 rounded-full text-lg uppercase italic shadow-xl self-start md:self-auto">
                                                    {result.disease}
                                                </Badge>
                                            </div>
                                            <p className="text-lg font-bold text-slate-600 dark:text-slate-300 leading-relaxed italic border-l-4 border-blue-500 pl-6">
                                                {result.process}
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            {/* Farmer Tip */}
                                            <motion.div 
                                                whileHover={{ scale: 1.02 }}
                                                className="backdrop-blur-lg bg-emerald-100/30 dark:bg-emerald-900/10 border border-emerald-200/50 dark:border-emerald-800/50 rounded-3xl p-8 group"
                                            >
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-500/20">
                                                        <Lightbulb className="h-5 w-5 text-white" />
                                                    </div>
                                                    <h4 className="text-xl font-black text-emerald-900 dark:text-emerald-100 uppercase italic">🌱 Farmer Tip</h4>
                                                </div>
                                                <p className="font-bold text-emerald-800 dark:text-emerald-300 italic">
                                                    {result.tip}
                                                </p>
                                            </motion.div>

                                            {/* Best Practices */}
                                            <motion.div 
                                                whileHover={{ scale: 1.02 }}
                                                className="backdrop-blur-lg bg-white/20 dark:bg-slate-800/20 border border-white/30 dark:border-slate-700/30 rounded-3xl p-8 group"
                                            >
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-blue-500/20">
                                                        <ShieldCheck className="h-5 w-5 text-white" />
                                                    </div>
                                                    <h4 className="text-xl font-black text-slate-800 dark:text-white uppercase italic">✅ Best Practices</h4>
                                                </div>
                                                <ul className="space-y-3">
                                                    {result.bestPractices.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-2 font-bold text-slate-600 dark:text-slate-400 italic">
                                                            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        </div>

                                        {/* Common Mistakes */}
                                        <motion.div 
                                            whileHover={{ scale: 1.02 }}
                                            className="backdrop-blur-lg bg-red-100/30 dark:bg-red-900/10 border border-red-200/50 dark:border-red-800/50 rounded-3xl p-8 group mt-4"
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="h-10 w-10 rounded-xl bg-red-500 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-red-500/20">
                                                    <AlertTriangle className="h-5 w-5 text-white" />
                                                </div>
                                                <h4 className="text-xl font-black text-red-900 dark:text-red-100 uppercase italic">⚠ Common Mistakes</h4>
                                            </div>
                                            <ul className="grid md:grid-cols-3 gap-4">
                                                {result.mistakes.map((item, i) => (
                                                    <li key={i} className="flex items-center gap-2 font-bold text-red-700 dark:text-red-400 italic bg-white/50 dark:bg-red-950/20 p-3 rounded-xl border border-red-200/20">
                                                        <X className="h-4 w-4 text-red-500 shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>

                                        <div className="flex justify-center pt-8">
                                            <Button 
                                                onClick={reset}
                                                className="h-20 px-12 rounded-full border-2 border-emerald-500 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 font-black text-xl uppercase italic tracking-tighter transition-all hover:scale-105 shadow-2xl shadow-emerald-500/10"
                                            >
                                                ANALYZE ANOTHER CROP
                                            </Button>
                                        </div>
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

