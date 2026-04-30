import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Scan, ArrowLeft, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { DiseaseDetection } from "@/components/DiseaseDetection";
import FarmAreaScanner from "@/components/FarmAreaScanner";

export default function CropHealthMonitor() {
    const { t } = useLanguage();
    const [mode, setMode] = useState<"hub" | "crop" | "farm">("hub");

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            {/* Premium Hero Header */}
            <div className="relative bg-[#106A3A] text-white py-16 px-4 mb-12 overflow-hidden shadow-2xl">
                <motion.div 
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute top-[-20%] right-[-10%] opacity-10"
                >
                    <Stethoscope className="h-96 w-96 text-white" />
                </motion.div>
                
                <div className="container mx-auto relative z-10 text-center space-y-8">
                    <div className="flex flex-col items-center gap-4">
                        <div className="p-4 bg-white/20 rounded-[2.5rem] backdrop-blur-xl border border-white/30 shadow-2xl">
                            <Leaf className="h-10 w-10 text-white animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                                {t('aiCropDoctor')}
                            </h1>
                            <p className="text-lg md:text-xl font-bold text-emerald-100/80 max-w-2xl mx-auto italic">
                                “Analyze crop and farm health instantly using smart detection”
                            </p>
                        </div>
                    </div>

                    {/* Mode Selection Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button 
                            onClick={() => setMode("crop")}
                            className={cn(
                                "h-16 px-8 rounded-full shadow-2xl transition-all duration-300 font-black uppercase italic tracking-tighter text-lg",
                                mode === "crop" 
                                    ? "bg-white text-emerald-800 scale-105 ring-4 ring-emerald-400/30" 
                                    : "bg-emerald-600 hover:bg-emerald-500 text-white border border-white/20"
                            )}
                        >
                            <Leaf className="mr-3 h-6 w-6" />
                            {t('checkCropHealth')}
                        </Button>
                        <Button 
                            onClick={() => setMode("farm")}
                            className={cn(
                                "h-16 px-8 rounded-full shadow-2xl transition-all duration-300 font-black uppercase italic tracking-tighter text-lg",
                                mode === "farm" 
                                    ? "bg-white text-blue-800 scale-105 ring-4 ring-blue-400/30" 
                                    : "bg-blue-600 hover:bg-blue-500 text-white border border-white/20"
                            )}
                        >
                            <Scan className="mr-3 h-6 w-6" />
                            {t('scanFarmAreaOption')}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl">
                <AnimatePresence mode="wait">
                    {mode === "hub" && (
                        <motion.div
                            key="hub"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white/40 backdrop-blur-lg rounded-[3rem] p-12 border-2 border-dashed border-emerald-200 text-center space-y-6"
                        >
                            <h3 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter">Ready to Begin?</h3>
                            <p className="text-slate-500 font-bold text-lg max-w-md mx-auto">Select a mode above to start analyzing your crops or scanning your entire farm area.</p>
                            <div className="flex justify-center gap-4 opacity-20">
                                <Leaf className="h-12 w-12" />
                                <Scan className="h-12 w-12" />
                            </div>
                        </motion.div>
                    )}

                    {mode === "crop" && (
                        <motion.div
                            key="crop"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-xl border border-slate-100">
                                <Button 
                                    variant="ghost" 
                                    onClick={() => setMode("hub")}
                                    className="font-black uppercase text-xs italic text-slate-500 hover:text-emerald-600"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Change Mode
                                </Button>
                                <Badge className="bg-emerald-500 text-white border-none font-black px-4 py-1.5 rounded-full uppercase italic">Single Leaf Diagnosis</Badge>
                            </div>
                            <DiseaseDetection />
                        </motion.div>
                    )}

                    {mode === "farm" && (
                        <motion.div
                            key="farm"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-xl border border-slate-100">
                                <Button 
                                    variant="ghost" 
                                    onClick={() => setMode("hub")}
                                    className="font-black uppercase text-xs italic text-slate-500 hover:text-blue-600"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Change Mode
                                </Button>
                                <Badge className="bg-blue-500 text-white border-none font-black px-4 py-1.5 rounded-full uppercase italic">Whole Farm Scan</Badge>
                            </div>
                            <FarmAreaScanner />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
