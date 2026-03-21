import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Mic, Square, Play, Trash2, Save, 
    ArrowLeft, History, Volume2, 
    CheckCircle2, AlertCircle, FileText,
    MicOff, Headphones
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function VoiceNotes() {
    const { t } = useLanguage();
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [isTranscribing, setIsTranscribing] = useState(false);
    
    const savedNotes = [
        { id: 1, text: "Sector B needs more nitrogen. Wheat leaves are yellowing.", date: "2024-03-20 10:30 AM", duration: "0:15" },
        { id: 2, text: "Spotted aphids on tomato plants near the fence.", date: "2024-03-19 04:45 PM", duration: "0:08" },
    ];

    const toggleRecording = () => {
        if (!isRecording) {
            setIsRecording(true);
            setTranscript("");
        } else {
            setIsRecording(false);
            setIsTranscribing(true);
            // Simulate transcription lag
            setTimeout(() => {
                setTranscript("I noticed some pest activity in the North corner of the paddy field. We should check the irrigation pump there as well.");
                setIsTranscribing(false);
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-700 to-purple-800 text-white py-12 px-4 shadow-2xl relative overflow-hidden">
                <div className="container mx-auto max-w-4xl relative z-10 text-center">
                    <Link to="/dashboard">
                        <Button variant="ghost" className="text-white hover:bg-white/10 p-0 h-auto font-bold flex items-center gap-2 mb-8 mx-auto">
                            <ArrowLeft className="h-5 w-5" /> {t('navDashboard')}
                        </Button>
                    </Link>
                    <div className="inline-block p-4 bg-white/20 rounded-[2.5rem] backdrop-blur-xl mb-6 ring-8 ring-white/10 animate-pulse">
                        <Headphones className="h-12 w-12 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">{t('voiceNotes')}</h1>
                    <p className="text-indigo-100 font-medium text-lg">{t('voiceNotesDesc')}</p>
                </div>
                {/* Decorative blobs */}
                <div className="absolute top-[-20%] left-[-10%] h-96 w-96 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-[-20%] right-[-10%] h-96 w-96 bg-indigo-500/20 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 max-w-4xl -mt-10 mb-12 relative z-20">
                <Card className="rounded-[3rem] border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white dark:bg-slate-900 overflow-hidden">
                    <CardContent className="p-12 flex flex-col items-center">
                        <div className="relative mb-12">
                            <AnimatePresence>
                                {isRecording && (
                                    <motion.div 
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="absolute inset-0 bg-indigo-500 rounded-full -m-8"
                                    />
                                )}
                            </AnimatePresence>
                            <Button 
                                onClick={toggleRecording}
                                className={cn(
                                    "h-32 w-32 rounded-full shadow-2xl transition-all duration-500 relative z-10",
                                    isRecording 
                                        ? "bg-red-500 hover:bg-red-600 ring-8 ring-red-500/20" 
                                        : "bg-indigo-600 hover:bg-indigo-700 ring-8 ring-indigo-500/20"
                                )}
                            >
                                {isRecording ? <Square className="h-12 w-12 fill-white" /> : <Mic className="h-12 w-12" />}
                            </Button>
                        </div>

                        <div className="text-center space-y-4 mb-12">
                            <h2 className="text-2xl font-black">
                                {isRecording ? "Recording..." : isTranscribing ? t('transcribing') : "Tap to Record"}
                            </h2>
                            <p className="text-slate-400 font-medium">Record observations, pest sightings, or tasks.</p>
                        </div>

                        {/* Transcript Area */}
                        <AnimatePresence>
                            {(transcript || isTranscribing) && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <Badge className="bg-indigo-100 text-indigo-700 font-black px-4 py-1 border-none tracking-widest uppercase text-[10px]">
                                            AI Transcription
                                        </Badge>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8"><Volume2 className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-red-500"><Trash2 className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                    
                                    {isTranscribing ? (
                                        <div className="space-y-3">
                                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-full animate-pulse" />
                                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-3/4 animate-pulse" />
                                        </div>
                                    ) : (
                                        <p className="text-lg font-bold leading-relaxed text-slate-700 dark:text-slate-200 italic">
                                            "{transcript}"
                                        </p>
                                    )}

                                    {!isTranscribing && (
                                        <Button className="w-full mt-8 bg-slate-900 dark:bg-indigo-600 hover:opacity-90 h-14 rounded-2xl font-black text-lg gap-3">
                                            <Save className="h-5 w-5" /> {t('saveNote')}
                                        </Button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </div>

            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black flex items-center gap-3">
                        <History className="h-6 w-6 text-indigo-600" /> Previous Notes
                    </h3>
                    <Badge variant="outline" className="font-bold rounded-lg">{savedNotes.length} Notes</Badge>
                </div>

                <div className="space-y-4">
                    {savedNotes.map((note) => (
                        <Card key={note.id} className="rounded-3xl border-none shadow-sm hover:shadow-md transition-all bg-white dark:bg-slate-900 p-6">
                            <div className="flex items-start justify-between gap-6">
                                <div className="flex items-start gap-6">
                                    <div className="h-14 w-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600">
                                        <FileText className="h-7 w-7" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-bold text-slate-700 dark:text-slate-200 leading-relaxed truncate max-w-md">{note.text}</p>
                                        <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400">
                                            <span>{note.date}</span>
                                            <span>{note.duration} Sec</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="rounded-xl h-12 w-12 bg-slate-50 dark:bg-slate-800 group hover:bg-slate-900 hover:text-white">
                                        <Play className="h-5 w-5 fill-indigo-500 group-hover:fill-white" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-xl h-12 w-12 text-slate-400 hover:text-red-500">
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
