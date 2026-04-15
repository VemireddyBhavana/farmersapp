import React, { useState, useEffect, useRef, useCallback } from "react";
import { jsPDF } from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Send, Bot, User, ArrowLeft, Loader2, Sparkles, Mic, MicOff, Volume2, 
    Sprout, CheckCircle2, Award, History, LayoutGrid, Cpu, ShieldCheck, 
    Droplets, Wallet, GraduationCap, Microscope, BookOpen, UserCircle2,
    Calendar, CloudSun, TrendingUp, Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocation } from "@/lib/LocationContext";

// Dashboard Avatar
const AVATAR_URL = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400";

interface Message {
  id: string;
  role: "ai" | "user";
  content: string;
}

const InputIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-terminal"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
);

const FARM_TOPICS = [
  { id: "intro", title: "Farmer Introduction", icon: UserCircle2, desc: "Personal and farm background", color: "from-purple-500 to-indigo-600", bg: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200" },
  { id: "pests", title: "AI Pest Diagnosis", icon: Shield, desc: "Managing crop threats with AI", color: "from-emerald-500 to-teal-600", bg: "https://images.unsplash.com/photo-1599023414167-a89f92acc63b?auto=format&fit=crop&q=80&w=1200" },
  { id: "fertilizers", title: "Organic Fertilizers", icon: Sprout, desc: "Natural soil enrichment", color: "from-orange-500 to-amber-600", bg: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1200" },
  { id: "market", title: "Market Strategies", icon: Wallet, desc: "Selling at peak cycles", color: "from-blue-500 to-cyan-600", bg: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" },
  { id: "irrigation", title: "Sustainable Irrigation", icon: Droplets, desc: "Precision water management", color: "from-sky-500 to-blue-600", bg: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200" },
  { id: "schemes", title: "Government Schemes", icon: BookOpen, desc: "Subsidies and support", color: "from-rose-500 to-pink-600", bg: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200" }
];

const MENTORS = [
  { id: "rajesh", name: "Dr. Rajesh", role: "Agricultural Scientist", trait: "Technical & Precise", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", color: "from-blue-500 to-indigo-600" },
  { id: "sardar", name: "Sardar Singh", role: "Field Veteran", trait: "Practical & Wise", avatar: "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80&w=400", color: "from-amber-500 to-orange-600" },
  { id: "meera", name: "Meera Das", role: "Market Expert", trait: "Profit Oriented", avatar: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80&w=400", color: "from-rose-500 to-pink-600" }
];

const InterviewMode = () => {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const { location } = useLocation();
    const [selectedTopic, setSelectedTopic] = useState(FARM_TOPICS[0]);
    const [selectedMentor, setSelectedMentor] = useState(MENTORS[0]);
    const [selectionStep, setSelectionStep] = useState<"topic" | "mentor">("topic");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isThinking, setIsThinking] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [questionCount, setQuestionCount] = useState(1);
    const [feedback, setFeedback] = useState<any>(null);
    const [manualText, setManualText] = useState("");

    const recognitionRef = useRef<any>(null);

    // Initialize Speech Recognition
    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false; // Turn-based listening
            recognitionRef.current.interimResults = false;
            
            const langCodes: any = { 
                English: "en-IN", Hindi: "hi-IN", Telugu: "te-IN", Tamil: "ta-IN", 
                Marathi: "mr-IN", Gujarati: "gu-IN", Kannada: "kn-IN", Malayalam: "ml-IN", 
                Punjabi: "pa-IN", Bangla: "bn-IN" 
            };
            recognitionRef.current.lang = langCodes[language] || "en-IN";

            recognitionRef.current.onresult = (event: any) => {
                const text = event.results[0][0].transcript;
                console.log("🎙️ Recognized Text:", text);
                handleSendMessage(text);
                setIsRecording(false);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("❌ Speech Recognition Error:", event.error);
                setIsRecording(false);
            };
            
            recognitionRef.current.onend = () => {
                console.log("🎙️ Speech Recognition Stopped");
                setIsRecording(false);
            };
        } else {
            console.warn("⚠️ Browser does not support SpeechRecognition");
        }
    }, [language]);

    const speak = useCallback((text: string) => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const ttsMap: any = { 
                English: "en-IN", Hindi: "hi-IN", Telugu: "te-IN", Tamil: "ta-IN", 
                Marathi: "mr-IN", Gujarati: "gu-IN", Kannada: "kn-IN", Malayalam: "ml-IN", 
                Punjabi: "pa-IN", Bangla: "bn-IN" 
            };
            utterance.lang = ttsMap[language] || "en-IN";
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => {
                setIsSpeaking(false);
                // AUTO-START Listening for user answer
                if (isStarted && !feedback) {
                    setTimeout(() => {
                        try { recognitionRef.current?.start(); setIsRecording(true); } catch(e) {}
                    }, 500);
                }
            };
            window.speechSynthesis.speak(utterance);
        }
    }, [language, isStarted, feedback]);

    // Global cleanup on component unmount
    useEffect(() => {
        return () => {
            if ("speechSynthesis" in window) {
                window.speechSynthesis.cancel();
            }
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const startInterview = async () => {
        setIsStarted(true);
        setIsThinking(true);
        setMessages([]);
        setQuestionCount(1);
        
        try {
            const res = await axios.post("/api/ai", {
                messages: [{ role: "user", content: `Start an interview for ${selectedTopic.title}. Use the persona of ${selectedMentor.name} (${selectedMentor.role}, trait: ${selectedMentor.trait}). User Location: ${location?.district || "Unknown"}. Ask the first question in ${language}.` }],
                mode: "interviewer",
                topic: selectedTopic.title,
                mentor: selectedMentor,
                location: location,
                language: language
            });
            const firstMsg: Message = { id: "1", role: "ai", content: res.data.reply };
            setMessages([firstMsg]);
            speak(res.data.reply);
        } catch (err) {
            console.error(err);
        } finally {
            setIsThinking(false);
        }
    };

    const handleSendMessage = async (text: string) => {
        if (!text.trim() || isThinking || questionCount > 5) return;

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setIsThinking(true);

        try {
            const res = await axios.post("/api/ai", {
                messages: updatedMessages.map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content })),
                mode: "interviewer",
                topic: selectedTopic.title,
                language: language
            });

            const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "ai", content: res.data.reply };
            setMessages(prev => [...prev, aiMsg]);
            setQuestionCount(prev => prev + 1);
            speak(res.data.reply);

            if (questionCount >= 5) {
                setTimeout(handleEndInterview, 4000);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsThinking(false);
        }
    };

    const handleEndInterview = async () => {
        // Immediate Voice Termination
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsRecording(false);
        setIsSpeaking(false);
        
        setIsThinking(true);
        try {
            const res = await axios.post("/api/interview-feedback", {
                messages: messages.map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content })),
                topic: selectedTopic.title
            });
            setFeedback(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsThinking(false);
        }
    };

    const generateCertificate = () => {
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [600, 400]
        });

        // Background
        doc.setFillColor(10, 10, 10);
        doc.rect(0, 0, 600, 400, "F");
        
        // Border
        doc.setDrawColor(16, 185, 129);
        doc.setLineWidth(5);
        doc.rect(20, 20, 560, 360);

        // Content
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(30);
        doc.text("CERTIFICATE OF EXCELLENCE", 300, 80, { align: "center" });
        
        doc.setFontSize(16);
        doc.setTextColor(150, 150, 150);
        doc.text("THIS IS TO CERTIFY THAT", 300, 120, { align: "center" });
        
        doc.setFontSize(24);
        doc.setTextColor(255, 255, 255);
        doc.text("Master Farmer", 300, 160, { align: "center" });
        
        doc.setFontSize(14);
        doc.setTextColor(150, 150, 150);
        doc.text(`HAS SUCCESSFULLY COMPLETED THE AI MOCK INTERVIEW ON:`, 300, 200, { align: "center" });
        
        doc.setFontSize(18);
        doc.setTextColor(16, 185, 129);
        doc.text(selectedTopic.title.toUpperCase(), 300, 230, { align: "center" });
        
        doc.setFontSize(14);
        doc.setTextColor(255, 255, 255);
        doc.text(`SCORE: ${feedback.score}/100 | BADGE: ${feedback.badgeTier?.toUpperCase()}`, 300, 270, { align: "center" });
        
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text(`MENTORED BY ${selectedMentor.name.toUpperCase()} | AGRI-INNOVATION 2026`, 300, 330, { align: "center" });

        doc.save(`Kisan_Certificate_${selectedTopic.id}.pdf`);
    };

    const toggleRecording = () => {
        if (isRecording) {
            recognitionRef.current?.stop();
            setIsRecording(false);
        } else {
            recognitionRef.current?.start();
            setIsRecording(true);
        }
    };

    if (feedback) {
        return (
            <div className="min-h-screen bg-black text-white p-8 font-sans flex items-center justify-center">
                <Card className="w-full max-w-4xl bg-[#111] border-[#222] p-12 rounded-[2rem] shadow-2xl">
                    <div className="text-center mb-10">
                        <div className="h-20 w-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                            <Award className="text-emerald-500" size={40} />
                        </div>
                        <h1 className="text-4xl font-black mb-2 uppercase tracking-tight italic">Performance Report</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Agri Innovation Challenge 2026</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                        <Card className="p-8 bg-white/5 border-none text-center rounded-[2rem] relative overflow-hidden group">
                           <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-1">Knowledge Score</span>
                            <div className="text-6xl font-black text-emerald-500 relative z-10">{feedback.score}</div>
                        </Card>
                        
                        <Card className="p-8 bg-white/5 border-none text-center rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden group">
                           <div className={cn(
                               "absolute inset-0 opacity-10 blur-2xl transition-opacity group-hover:opacity-20",
                               feedback.badgeTier === "Gold" ? "bg-yellow-500" : feedback.badgeTier === "Silver" ? "bg-slate-300" : "bg-orange-600"
                           )} />
                           <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-1">Achievement</span>
                           <div className={cn(
                               "text-3xl font-black uppercase tracking-tighter italic",
                               feedback.badgeTier === "Gold" ? "text-yellow-500" : feedback.badgeTier === "Silver" ? "text-slate-300" : "text-orange-600"
                           )}>
                               {feedback.badgeTier} Badge
                           </div>
                           <Award className={cn(
                               "mt-2",
                               feedback.badgeTier === "Gold" ? "text-yellow-500" : feedback.badgeTier === "Silver" ? "text-slate-300" : "text-orange-600"
                           )} size={32} />
                        </Card>

                        <div className="md:col-span-1 space-y-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 italic">
                                <Sparkles className="text-yellow-500" size={20} /> Quick Summary
                            </h3>
                            <p className="text-slate-400 font-medium leading-relaxed text-sm line-clamp-4">{feedback.summary}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-white/5">
                        <div className="space-y-4 text-emerald-400">
                           <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2"><CheckCircle2 size={16} /> Key Strengths</h4>
                           <ul className="space-y-2 text-sm font-semibold">
                               {feedback.strengths.map((s: string, i: number) => <li key={i}>• {s}</li>)}
                           </ul>
                        </div>
                        <div className="space-y-4 text-orange-400">
                           <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2"><History size={16} /> Improvements</h4>
                           <ul className="space-y-2 text-sm font-semibold">
                               {feedback.improvements.map((s: string, i: number) => <li key={i}>• {s}</li>)}
                           </ul>
                        </div>
                    </div>

                    {/* Recommended Resources */}
                    {feedback.recommendedResources && (
                        <div className="mt-10">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-6 italic flex items-center gap-2">
                                <BookOpen size={14} /> Recommended for Future Growth
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {feedback.recommendedResources.map((res: any, i: number) => (
                                    <button 
                                        key={i}
                                        onClick={() => navigate(res.link)}
                                        className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-white/10 transition-all text-left flex items-center justify-between group"
                                    >
                                        <div>
                                            <p className="text-xs font-black uppercase text-emerald-500 tracking-wider mb-0.5">{res.type}</p>
                                            <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{res.title}</p>
                                        </div>
                                        <ArrowLeft className="rotate-180 text-slate-600 group-hover:text-emerald-500 transition-colors" size={18} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-12 flex justify-center gap-4">
                        <Button onClick={generateCertificate} className="h-14 px-8 rounded-2xl bg-indigo-600 text-white font-black uppercase text-xs tracking-widest hover:bg-emerald-500 transition-all shadow-lg shadow-indigo-500/20">
                            Download Certificate
                        </Button>
                        <Button onClick={() => window.location.reload()} className="h-14 px-8 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-emerald-500 hover:text-white transition-all">New Session</Button>
                        <Button onClick={() => navigate("/")} variant="outline" className="h-14 px-8 rounded-2xl border-white/10 text-white font-black uppercase text-xs tracking-widest">Exit</Button>
                    </div>

                    {/* Detailed Transcript Replay */}
                    <div className="mt-16 pt-12 border-t border-white/5">
                        <h4 className="text-xl font-black italic mb-8 flex items-center gap-3">
                            <History className="text-indigo-500" /> Smart Transcript Review
                        </h4>
                        <div className="space-y-8">
                            {messages.map((m, i) => (
                                <div key={m.id} className={cn(
                                    "p-6 rounded-3xl border relative transition-all",
                                    m.role === "ai" ? "bg-white/5 border-white/5 ml-0 mr-12" : "bg-indigo-600/10 border-indigo-500/20 ml-12 mr-0"
                                )}>
                                    <div className="flex items-center gap-3 mb-3">
                                        {m.role === "ai" ? <Bot size={16} className="text-indigo-400" /> : <User size={16} className="text-emerald-400" />}
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{m.role === "ai" ? selectedMentor.name : "Your Answer"}</span>
                                    </div>
                                    <p className="text-sm font-medium leading-relaxed">{m.content}</p>
                                    
                                    {/* AI Expert Tip (Contextual Placement) */}
                                    {m.role === "user" && feedback.improvements && (
                                        <div className="mt-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex gap-4">
                                            <Sparkles size={18} className="text-emerald-500 shrink-0" />
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest mb-1">Mentor Tip</p>
                                                <p className="text-xs font-bold text-emerald-200">
                                                    {i === 1 ? "Great start! Focus on mentioning specific crop variants next time." : 
                                                     i === 3 ? "Deep analysis. Integrating climate data would make this perfect." : 
                                                     "Solid response. Consider long-term sustainability impacts too."}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans flex overflow-hidden">
            {/* Sidebar Dash */}
            <div className="w-80 bg-[#0a0a0a] border-r border-white/5 flex flex-col p-8 overflow-y-auto shrink-0 relative">
                <div className="flex items-center gap-4 mb-14 relative z-10">
                   <div className="h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                      <Bot size={26} className="text-white" />
                   </div>
                   <h1 className="text-2xl font-black tracking-tighter italic">AI Interview</h1>
                </div>

                <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8 italic">Topics (Farmer Expert)</p>
                    <div className="space-y-4">
                        {FARM_TOPICS.map((topic) => (
                            <button
                                key={topic.id}
                                onClick={() => !isStarted && setSelectedTopic(topic)}
                                className={cn(
                                    "w-full p-5 rounded-2xl flex items-center gap-5 transition-all group overflow-hidden relative border",
                                    selectedTopic.id === topic.id ? "bg-white/5 border-white/20 shadow-xl" : "border-transparent opacity-40 grayscale hover:grayscale-0 hover:opacity-100",
                                    isStarted && selectedTopic.id !== topic.id && "pointer-events-none"
                                )}
                            >
                                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br shadow-inner", topic.color)}>
                                    <topic.icon size={24} className="text-white" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-black tracking-tight leading-tight">{topic.title}</p>
                                    <p className="text-[9px] font-bold text-slate-500 mt-0.5">{topic.desc}</p>
                                </div>
                                {selectedTopic.id === topic.id && (
                                    <div className={cn("absolute inset-0 opacity-10 blur-2xl bg-gradient-to-br", topic.color)} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-auto relative z-10">
                   <Button variant="ghost" onClick={() => navigate(-1)} className="w-full justify-start rounded-2xl text-slate-500 hover:text-white hover:bg-white/5 font-bold italic py-6">
                      <ArrowLeft className="mr-3 h-5 w-5" /> Back to Dashboard
                   </Button>
                </div>
                
                {/* Visual accents */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
            </div>

            {/* Main Stage */}
            <div className="flex-1 flex flex-col relative overflow-hidden bg-black">
                {/* Immersive Dynamic Background */}
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={selectedTopic.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 z-0"
                    >
                        <img src={selectedTopic.bg} className="w-full h-full object-cover blur-2xl grayscale" alt="Background" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
                    </motion.div>
                </AnimatePresence>
                
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.05)_0%,rgba(0,0,0,1)_80%)] z-[1]" />
                
                <div className="flex-1 flex flex-col relative z-20">
                    {/* Visual Progress Timeline */}
                    {isStarted && !feedback && (
                        <div className="px-16 pt-10">
                            <div className="flex items-center gap-3 justify-center">
                                {["Intro", "Technical", "Analysis", "Practical", "Verdict"].map((label, idx) => (
                                    <React.Fragment key={label}>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className={cn(
                                                "h-2 w-12 rounded-full transition-all duration-500",
                                                idx + 1 < questionCount ? "bg-emerald-500" : idx + 1 === questionCount ? "bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.5)]" : "bg-white/10"
                                            )} />
                                            <span className={cn(
                                                "text-[8px] font-black uppercase tracking-widest",
                                                idx + 1 === questionCount ? "text-indigo-400" : "text-white/20"
                                            )}>{label}</span>
                                        </div>
                                        {idx < 4 && <div className="h-px w-6 bg-white/5 mb-4" />}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="px-16 pt-16 text-center">
                        <motion.h2 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-7xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent italic"
                        >
                            Master Your Interview
                        </motion.h2>
                        <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">AI-Powered Farmer Mentorship & Practice 2026</p>
                    </div>

                    {/* Selection Flow */}
                    {!isStarted ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-12 gap-12">
                            {selectionStep === "topic" ? (
                                <>
                                    <div className="text-center">
                                        <motion.div 
                                            whileHover={{ scale: 1.05 }}
                                            className={cn("h-40 w-40 rounded-[3rem] bg-gradient-to-br flex items-center justify-center text-white shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 mb-8 mx-auto", selectedTopic.color)}
                                        >
                                            <selectedTopic.icon size={72} strokeWidth={1.5} />
                                        </motion.div>
                                        <h3 className="text-3xl font-black italic mb-2 tracking-tight">{selectedTopic.title}</h3>
                                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs px-6 py-2 bg-white/5 rounded-full inline-block">{selectedTopic.desc}</p>
                                    </div>
                                    <Button 
                                        onClick={() => setSelectionStep("mentor")}
                                        className="h-24 px-20 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase text-sm tracking-[0.4em] shadow-[0_20px_50px_rgba(79,70,229,0.4)] group transition-all"
                                    >
                                        Select Mentor <ArrowLeft className="ml-4 rotate-180 group-hover:translate-x-2 transition-transform" size={24} />
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <div className="text-center mb-4">
                                        <h3 className="text-3xl font-black italic mb-2 tracking-tight">Choose Your Mentor</h3>
                                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Each mentor has a unique coaching style</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                                        {MENTORS.map((mentor) => (
                                            <button
                                                key={mentor.id}
                                                onClick={() => setSelectedMentor(mentor)}
                                                className={cn(
                                                    "p-6 rounded-[2.5rem] border-2 transition-all group relative overflow-hidden",
                                                    selectedMentor.id === mentor.id ? "bg-white/10 border-indigo-500 shadow-2xl scale-105" : "bg-white/5 border-transparent opacity-60 hover:opacity-100"
                                                )}
                                            >
                                                <div className="h-32 w-32 rounded-3xl overflow-hidden mb-4 mx-auto border-4 border-white/10">
                                                    <img src={mentor.avatar} className="w-full h-full object-cover" alt={mentor.name} />
                                                </div>
                                                <p className="text-lg font-black italic mb-1">{mentor.name}</p>
                                                <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-1">{mentor.role}</p>
                                                <p className="text-[9px] font-bold text-slate-500 uppercase">{mentor.trait}</p>
                                                {selectedMentor.id === mentor.id && (
                                                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10 pointer-events-none", mentor.color)} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <Button 
                                            onClick={() => setSelectionStep("topic")}
                                            variant="ghost"
                                            className="h-16 px-8 rounded-2xl text-slate-500 font-black uppercase text-xs"
                                        >
                                            Back
                                        </Button>
                                        <Button 
                                            onClick={startInterview}
                                            className="h-24 px-20 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase text-sm tracking-[0.4em] shadow-[0_20px_50px_rgba(79,70,229,0.4)] group transition-all"
                                        >
                                            Start Interview <Sparkles className="ml-4 group-hover:rotate-12 transition-transform" size={24} />
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col p-16">
                            <div className="flex items-center justify-between mb-12">
                                <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-xl">
                                   <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-3">
                                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                      {selectedTopic.title}
                                   </span>
                                </div>
                                <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-xl">
                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 italic">Phase <span className="text-white">{questionCount}</span> of 5</span>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col items-center justify-center gap-14">
                                <div className="relative">
                                    <motion.div 
                                        animate={isSpeaking ? { 
                                            scale: [1, 1.03, 1],
                                            boxShadow: ["0 0 0px rgba(16,185,129,0)", "0 0 50px rgba(16,185,129,0.2)", "0 0 0px rgba(16,185,129,0)"]
                                        } : {}}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="h-80 w-80 rounded-full border-2 border-white/5 p-3 relative z-20 bg-[#0a0a0a] shadow-2xl"
                                    >
                                        <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-[#1a1a1a] relative">
                                            <img src={selectedMentor.avatar} alt={selectedMentor.name} className="w-full h-full object-cover brightness-90 contrast-110 grayscale-[30%]" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                        </div>
                                        
                                        {/* Speaking Pulse */}
                                        {isSpeaking && (
                                            <div className="absolute -inset-12 z-0">
                                                 <motion.div 
                                                    animate={{ opacity: [0, 0.4, 0], scale: [1, 1.3, 1.6] }}
                                                    transition={{ repeat: Infinity, duration: 2 }}
                                                    className="absolute inset-0 rounded-full border-2 border-emerald-500/20 blur-md"
                                                 />
                                                 <motion.div 
                                                    animate={{ opacity: [0, 0.25, 0], scale: [1.1, 1.5, 1.9] }}
                                                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                                                    className="absolute inset-0 rounded-full border-2 border-indigo-500/20 blur-md"
                                                 />
                                            </div>
                                        )}
                                    </motion.div>

                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-indigo-600 px-8 py-3 rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center gap-3">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-black italic tracking-tighter leading-none">{selectedMentor.name} ({selectedMentor.role})</span>
                                            <AnimatePresence mode="wait">
                                                <motion.span 
                                                    key={isThinking ? "thinking" : isSpeaking ? "speaking" : "listening"}
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -5 }}
                                                    className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-200 mt-1"
                                                >
                                                    {isThinking ? "[Analysing Depth]" : isSpeaking ? "[Explaining Concept]" : "[Listening to Farmer]"}
                                                </motion.span>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>

                                {/* Multi-Language Visualizer */}
                                <div className="flex items-center gap-2 h-12 relative">
                                    {/* Background Glow Layers */}
                                    <div className="absolute inset-x-[-20%] inset-y-0 bg-indigo-500/10 blur-3xl rounded-full" />
                                    <div className="absolute inset-x-[-10%] inset-y-2 bg-emerald-500/5 blur-2xl rounded-full" />
                                    
                                    {[...Array(24)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={(isSpeaking || isRecording) ? { 
                                                height: [6, Math.random() * 40 + 10, 12, Math.random() * 50 + 20, 6],
                                                backgroundColor: isRecording ? ["#ef4444", "#991b1b"] : ["#6366f1", "#10b981"]
                                            } : { height: 6, backgroundColor: "#1e1e1e" }}
                                            transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.5, delay: i * 0.02 }}
                                            className={cn("w-1.5 rounded-full transition-colors duration-500 shadow-[0_0_10px_rgba(0,0,0,0.5)]")}
                                        />
                                    ))}
                                </div>

                                <div className="max-w-3xl text-center px-6">
                                    <h4 className="text-2xl font-black leading-tight text-white italic tracking-tight">
                                        {messages[messages.length - 1]?.role === "ai" ? messages[messages.length - 1].content : "Listening to your response..."}
                                    </h4>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-8 mt-auto w-full max-w-2xl mx-auto">
                                <div className="flex items-center gap-4 w-full">
                                    <div className="flex-1 relative group">
                                        <input 
                                            type="text"
                                            value={manualText}
                                            onChange={(e) => setManualText(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && (handleSendMessage(manualText), setManualText(""))}
                                            placeholder="Type your response here..."
                                            className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 pr-16 text-sm font-bold focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600 italic"
                                        />
                                        <button 
                                            onClick={() => { handleSendMessage(manualText); setManualText(""); }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center hover:bg-emerald-500 transition-colors shadow-lg shadow-indigo-600/20"
                                        >
                                            <Send size={18} />
                                        </button>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={toggleRecording}
                                        disabled={isThinking || isSpeaking}
                                        className={cn(
                                            "h-16 w-16 rounded-2xl flex items-center justify-center transition-all shadow-2xl shrink-0 relative group",
                                            isRecording ? "bg-red-600 shadow-red-600/50" : "bg-white text-black hover:bg-emerald-500 hover:text-white"
                                        )}
                                    >
                                        {isRecording ? (
                                            <>
                                                <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-25" />
                                                <MicOff size={28} className="relative z-10" />
                                            </>
                                        ) : <Mic size={28} />}
                                    </motion.button>

                                    <Button 
                                        onClick={handleEndInterview} 
                                        variant="outline" 
                                        className="h-16 px-6 rounded-2xl border-white/10 text-slate-500 hover:text-white hover:border-white/40 font-black tracking-[0.2em] uppercase text-[10px] backdrop-blur-md shrink-0"
                                    >
                                        End Call
                                    </Button>
                                </div>

                                {isThinking && (
                                    <div className="flex items-center gap-4 bg-white/5 px-6 py-2 rounded-full border border-white/10">
                                        <div className="flex gap-1.5">
                                            <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }} className="h-2 w-2 rounded-full bg-emerald-500" />
                                            <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="h-2 w-2 rounded-full bg-emerald-500" />
                                            <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="h-2 w-2 rounded-full bg-emerald-500" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.3em] italic">Neural Network Analyzing...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                
                {/* HUD Footer Diagnostics */}
                <div className="p-8 flex justify-center gap-16 border-t border-white/5 bg-[#080808] z-30 pointer-events-none opacity-20">
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">STT-V2 Active</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Multi-Lingual Hash: OK</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Encrypted Session</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewMode;
