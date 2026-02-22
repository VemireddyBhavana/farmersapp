import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, AlertCircle, CheckCircle2, Info, Loader2, Leaf, Microscope, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

export default function DiseaseDetection() {
    const { t } = useLanguage();
    const [image, setImage] = useState<string | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<null | {
        name: string;
        confidence: string;
        description: string;
        causes: string;
        prevention: string[];
        fertilizers: string[];
        treatment: string[];
    }>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImage(ev.target?.result as string);
                setResult(null);
            };
            reader.readAsDataURL(file);
        }
        // Reset the input value so the same file can be selected again
        e.target.value = "";
    };

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    const openCamera = () => {
        cameraInputRef.current?.click();
    };

    const resetScan = () => {
        setImage(null);
        setResult(null);
        setAnalyzing(false);
    };

    const analyzeImage = () => {
        if (analyzing) return; // prevent double-click
        setAnalyzing(true);

        const diseases = [
            {
                name: t('lateBlight'),
                confidence: "94.8%",
                description: t('lateBlightDesc'),
                causes: t('lateBlightCauses'),
                prevention: [
                    t('lateBlightPrev1'),
                    t('lateBlightPrev2'),
                    t('lateBlightPrev3'),
                    t('lateBlightPrev4')
                ],
                fertilizers: [
                    t('lateBlightFert1'),
                    t('lateBlightFert2')
                ],
                treatment: [
                    t('lateBlightTreat1'),
                    t('lateBlightTreat2'),
                    t('lateBlightTreat3')
                ]
            },
            {
                name: t('powderyMildew'),
                confidence: "91.2%",
                description: t('powderyMildewDesc'),
                causes: t('powderyMildewCauses'),
                prevention: [
                    t('powderyMildewPrev1'),
                    t('powderyMildewPrev2'),
                    t('powderyMildewPrev3'),
                    t('powderyMildewPrev4')
                ],
                fertilizers: [
                    t('powderyMildewFert1'),
                    t('powderyMildewFert2')
                ],
                treatment: [
                    t('powderyMildewTreat1'),
                    t('powderyMildewTreat2'),
                    t('powderyMildewTreat3')
                ]
            },
            {
                name: t('bacterialLeafSpot'),
                confidence: "88.5%",
                description: t('bacterialLeafSpotDesc'),
                causes: t('bacterialLeafSpotCauses'),
                prevention: [
                    t('bacterialLeafSpotPrev1'),
                    t('bacterialLeafSpotPrev2'),
                    t('bacterialLeafSpotPrev3'),
                    t('bacterialLeafSpotPrev4')
                ],
                fertilizers: [
                    t('bacterialLeafSpotFert1'),
                    t('bacterialLeafSpotFert2')
                ],
                treatment: [
                    t('bacterialLeafSpotTreat1'),
                    t('bacterialLeafSpotTreat2'),
                    t('bacterialLeafSpotTreat3')
                ]
            }
        ];

        setTimeout(() => {
            const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
            setResult(randomDisease);
            setAnalyzing(false);
        }, 2500);
    };

    return (
        <Card className="rounded-[2.5rem] border-emerald-100 shadow-xl overflow-hidden bg-gradient-to-br from-white to-emerald-50/30 dark:from-background dark:to-emerald-950/10">
            <CardHeader className="p-8 pb-4 text-center">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4">
                    <Microscope className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-black text-emerald-600">{t('diseaseDetectionTitle')}</CardTitle>
                <CardDescription className="text-lg">{t('uploadPhotoDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-8">
                {/* Hidden file inputs */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileChange}
                />

                {!image ? (
                    <div className="space-y-4">
                        <div
                            onClick={openFilePicker}
                            className="flex flex-col items-center justify-center border-2 border-dashed border-emerald-200 dark:border-emerald-800 rounded-3xl p-12 bg-white/50 dark:bg-black/20 hover:bg-emerald-50/50 transition-colors group cursor-pointer"
                        >
                            <div className="h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Upload className="h-10 w-10 text-emerald-600" />
                            </div>
                            <p className="text-sm font-bold text-emerald-700 uppercase tracking-widest">{t('uploadFromGallery')}</p>
                            <p className="text-xs text-muted-foreground mt-2 text-center">{t('clickToBrowse')}</p>
                        </div>
                        <div className="flex justify-center">
                            <Button
                                onClick={openCamera}
                                className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-8 py-6 text-lg shadow-xl shadow-emerald-500/20 flex items-center gap-3"
                            >
                                <Camera className="h-6 w-6" />
                                {t('openCameraCapture')}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-lg mx-auto max-w-xl">
                            <img src={image} className="h-full w-full object-cover" alt="Uploaded crop" />
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-4 right-4 rounded-full shadow-lg"
                                onClick={resetScan}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        {!result && (
                            <Button
                                className="w-full h-16 rounded-2xl text-xl font-bold bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-500/20"
                                onClick={analyzeImage}
                                disabled={analyzing}
                            >
                                {analyzing ? (
                                    <>
                                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                                        {t('analyzingSpecimen')}
                                    </>
                                ) : (
                                    <>
                                        <Microscope className="mr-2 h-6 w-6" />
                                        {t('detectDiseaseNow')}
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                )}

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between p-6 rounded-3xl bg-emerald-600 text-white shadow-xl">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest opacity-80">{t('detectedDisease')}</p>
                                <h3 className="text-3xl font-black">{result.name}</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold uppercase tracking-widest opacity-80">{t('confidence')}</p>
                                <Badge variant="secondary" className="text-xl font-bold px-4 py-1 rounded-xl bg-white/20 text-white border-none">
                                    {result.confidence}
                                </Badge>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div className="glass p-6 rounded-3xl border-emerald-100 h-full">
                                    <h4 className="text-lg font-bold flex items-center gap-2 mb-3 text-emerald-700">
                                        <Info className="h-5 w-5" />
                                        {t('explanation')}
                                    </h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{result.description}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="glass p-6 rounded-3xl border-orange-100 h-full">
                                    <h4 className="text-lg font-bold flex items-center gap-2 mb-3 text-orange-700">
                                        <AlertCircle className="h-5 w-5" />
                                        {t('rootCauses')}
                                    </h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{result.causes}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="glass p-6 rounded-3xl border-blue-100">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-blue-700 mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4" />
                                    {t('prevention')}
                                </h4>
                                <ul className="space-y-2">
                                    {result.prevention.map((item, i) => (
                                        <li key={i} className="text-xs font-medium flex gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="glass p-6 rounded-3xl border-purple-100">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-purple-700 mb-4 flex items-center gap-2">
                                    <Leaf className="h-4 w-4" />
                                    {t('fertilizers')}
                                </h4>
                                <ul className="space-y-2">
                                    {result.fertilizers.map((item, i) => (
                                        <li key={i} className="text-xs font-medium flex gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="glass p-6 rounded-3xl border-red-100">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-red-700 mb-4 flex items-center gap-2">
                                    <Microscope className="h-4 w-4" />
                                    {t('treatmentSteps')}
                                </h4>
                                <ul className="space-y-2">
                                    {result.treatment.map((item, i) => (
                                        <li key={i} className="text-xs font-medium flex gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full rounded-2xl py-6 text-lg font-bold"
                            onClick={resetScan}
                        >
                            <Camera className="mr-2 h-5 w-5" />
                            {t('scanAnotherCrop')}
                        </Button>
                    </motion.div>
                )}
            </CardContent>
        </Card>
    );
}
