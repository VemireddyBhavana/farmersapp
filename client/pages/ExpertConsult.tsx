import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Video,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Clock,
  History,
  Languages,
  Sparkles,
  User,
  ChevronRight,
  Loader2,
  PhoneOff,
  Camera,
  CameraOff,
  Maximize2,
  Send,
  Wifi,
  Terminal,
  MessageSquare,
  Circle,
  AlertCircle,
  ShieldCheck,
  FileText,
  BrainCircuit,
  Star,
  Activity,
  HeartPulse,
  Flame,
  Stethoscope,
  PhoneCall
} from "lucide-react";
import { useLanguage, Language } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import AgoraRTC, { ILocalVideoTrack, ILocalAudioTrack } from "agora-rtc-sdk-ng";

const APP_ID = "5930870848764feb9441058af4c939a1"; // User App ID
const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const EXPERTS = [
  { id: 1, name: "Dr. Rajesh Kumar", specialty: "Crop Pathology & Disease", experience: "12+ Years", rating: 4.9, available: true, image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=300" },
  { id: 2, name: "Er. Sneha Rao", specialty: "Precision Irrigation & Water", experience: "8+ Years", rating: 4.8, available: true, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" },
  { id: 3, name: "Prof. Amit Singh", specialty: "Soil Health & Nutrient Management", experience: "15+ Years", rating: 5.0, available: false, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" },
  { id: 4, name: "Meera Deshmukh", specialty: "Organic Farming Specialist", experience: "10+ Years", rating: 4.7, available: true, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300" }
];

const RECENT_CONSULTATIONS = [
  { id: 1, query: "Best pest control for late blight in tomatoes?", date: "2 Hours ago", lang: "Hindi" },
  { id: 2, query: "Soil moisture levels for young groundnut pegs?", date: "Yesterday", lang: "Telugu" },
  { id: 3, query: "Paddy transplantation best practices for Kharif.", date: "24 Mar 2024", lang: "English" }
];

const EMERGENCY_PROTOCOLS = [
  { id: 1, title: "Pest Outbreak Alert", icon: Flame, desc: "Immediate isolation of affected area. Contact dist. agri-office: 1800-425-1556", color: "text-red-500" },
  { id: 2, title: "Crop Failure Protocol", icon: Activity, desc: "Document damage. file PMFBY insurance claim within 72 hours. Call 14447.", color: "text-amber-500" },
  { id: 3, title: "Livestock Health Emergency", icon: Stethoscope, desc: "Move animals to shade. Call local vet: +91 98480 22338 immediately.", color: "text-blue-500" }
];

const ExpertConsult = () => {
  const { t, language } = useLanguage();

  // Mode & UI States
  const [callActive, setCallActive] = useState(false);
  const [callType, setCallType] = useState<"voice" | "video" | null>(null);
  const [showEmergency, setShowEmergency] = useState(false);
  const [callStatus, setCallStatus] = useState<"idle" | "listening" | "thinking" | "speaking" | "connecting">("idle");
  const [isListening, setIsListening] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");

  // Agora State
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | null>(null);
  const [localVideoTrack, setLocalVideoTrack] = useState<ILocalVideoTrack | null>(null);
  const [remoteUsers, setRemoteUsers] = useState<any[]>([]);

  // Transcript Only (History Removed)
  const [transcript, setTranscript] = useState<{ sender: 'user' | 'ai', text: string }[]>([]);

  // Refs
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const timerIntervalRef = useRef<any>(null);
  const silenceTimerRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const localPlayerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // --- INITIALIZATION ---
  useEffect(() => {
    agoraClient.on("user-published", async (user, mediaType) => {
      await agoraClient.subscribe(user, mediaType);
      if (mediaType === "video" && callType === "video") {
        setRemoteUsers(prev => {
          if (prev.find(u => u.uid === user.uid)) return prev;
          return [...prev, user];
        });
        setTimeout(() => {
          const player = document.getElementById(`remote-player-${user.uid}`);
          if (player) user.videoTrack?.play(player);
        }, 500);
      }
      if (mediaType === "audio") {
        user.audioTrack?.play();
      }
    });

    agoraClient.on("user-unpublished", (user) => {
      setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
    });

    return () => {
      stopSession();
    };
  }, [callType]);

  // --- LOCAL VIDEO PLAYER SYNC ---
  useEffect(() => {
    if (callActive && localVideoTrack && localPlayerRef.current && callType === "video") {
      localVideoTrack.play(localPlayerRef.current);
    }
  }, [callActive, localVideoTrack, callType]);

  // --- AUTO SCROLL ---
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript, interimTranscript]);

  // --- FOCUS INPUT ---
  useEffect(() => {
    if (callActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [callActive]);

  // --- CALL LOGIC ---
  const startCall = async (type: "voice" | "video", contextPrompt?: string) => {
    try {
      setCallActive(true);
      setCallType(type);
      setTimer(0);
      setTranscript([]);
      setCallStatus("connecting");
      setIsCameraOff(type === "voice"); 

      const channelName = "farmer"; 
      await agoraClient.join(APP_ID, channelName, null, null);

      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      let videoTrack = null;

      if (type === "video") {
          videoTrack = await AgoraRTC.createCameraVideoTrack({
            encoderConfig: {
              width: 1280,
              height: 720,
              frameRate: 15,
              bitrateMin: 100, 
              bitrateMax: 1130
            },
            optimizationMode: "motion" 
          });
          setLocalVideoTrack(videoTrack);
      }

      setLocalAudioTrack(audioTrack);
      
      const publishTracks = videoTrack ? [audioTrack, videoTrack] : [audioTrack];
      await agoraClient.publish(publishTracks);

      setCallStatus("idle");
      timerIntervalRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);

      const greeting = t("botWelcome") + " I am your Smart Expert for today. How can I assist you with your farming needs?";
      setTimeout(() => {
          speakText(greeting);
          if (contextPrompt) {
              handleAI(contextPrompt);
          }
      }, 1000);
    } catch (err) {
      console.error("Agora Join Error:", err);
      toast.error("Call Failed: Ensure Camera/Microphone permissions are enabled.");
      setCallActive(false);
    }
  };

  const stopSession = async () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    
    if (localAudioTrack) {
        localAudioTrack.stop();
        localAudioTrack.close();
    }
    if (localVideoTrack) {
        localVideoTrack.stop();
        localVideoTrack.close();
    }
    setLocalAudioTrack(null);
    setLocalVideoTrack(null);
    setRemoteUsers([]);

    if (agoraClient.connectionState !== "DISCONNECTED") {
      await agoraClient.leave();
    }
    if (recognitionRef.current) recognitionRef.current.stop();
    if (synthesisRef.current) synthesisRef.current.cancel();
  };

  const endCall = () => {
    stopSession();
    setCallActive(false);
    setCallStatus("idle");
    setIsListening(false);
  };

  // --- VOICE FUNCTION ---
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Voice not supported. Use Chrome desktop.");
      return;
    }

    if (isMuted) {
       toast.info("Please unmute your microphone first.");
       return;
    }

    synthesisRef.current?.cancel(); 
    
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.continuous = true; 
      recognition.interimResults = true; 

      recognition.onstart = () => {
        setIsListening(true);
        setCallStatus("listening");
        setInterimTranscript("");
      };

      recognition.onresult = (event: any) => {
        let final = "";
        let interim = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        if (final) {
          handleAI(final);
          setInterimTranscript("");
        } else {
          setInterimTranscript(interim);
        }

        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = setTimeout(() => {
          if (interimTranscript) {
             handleAI(interimTranscript);
             setInterimTranscript("");
          }
        }, 2000);
      };

      recognition.onerror = (e: any) => {
        setIsListening(false);
        setCallStatus("idle");
      };

      recognition.onend = () => {
        setIsListening(false);
        if (callStatus === "listening") setCallStatus("idle");
      };

      recognitionRef.current = recognition;
      recognition.start();

    } catch (err) {
      console.error("Mic failed:", err);
      setIsListening(false);
    }
  };

  const handleAI = async (text: string) => {
    if (!text.trim()) return;
    setTranscript(prev => [...prev, { sender: 'user', text }]);
    setCallStatus("thinking");
    setManualInput("");

    try {
      const response = await axios.post("/api/expert-consult", {
        problemText: text,
        language: language
      });

      const aiReply = response.data.reply;
      setTranscript(prev => [...prev, { sender: 'ai', text: aiReply }]);
      speakText(aiReply);
    } catch (err) {
      console.error("AI ERROR:", err);
      setTranscript(prev => [...prev, { sender: 'ai', text: "I'm having trouble connecting. Our experts are currently tied up, but I'm trying again." }]);
    }
  };

  const speakText = (text: string) => {
    if (!synthesisRef.current || !isSpeakerOn) {
      setCallStatus("idle");
      return;
    }

    synthesisRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1.0;

    utterance.onstart = () => setCallStatus("speaking");
    utterance.onend = () => setCallStatus("idle");

    synthesisRef.current.speak(utterance);
  };

  const toggleCamera = () => {
    if (callType === "voice") return; 
    if (localVideoTrack) {
      localVideoTrack.setEnabled(isCameraOff);
      setIsCameraOff(!isCameraOff);
    }
  };

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 font-sans selection:bg-emerald-500 overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* 1. HERO SECTION */}
        <div className="relative p-12 rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-900 to-black overflow-hidden mb-12 border border-emerald-500/10 shadow-3xl">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-50" />
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="relative z-10 text-center max-w-2xl mx-auto"
           >
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                 Expert Help
              </h1>
              <p className="text-emerald-200/60 text-lg font-medium tracking-wide">
                 Get real-time guidance from AI & agriculture experts. Powered by advanced decision support systems.
              </p>
           </motion.div>
        </div>

        {/* 2. QUICK ACTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
           {[
             { id: 'ai', icon: Sparkles, title: "Ask AI Instantly", desc: "Get rapid solutions from our advanced model.", color: "bg-emerald-600" },
             { id: 'voice', icon: Phone, title: "Start Voice Call", desc: "Direct hands-free audio consultation.", color: "bg-blue-600" },
             { id: 'video', icon: Video, title: "Start Video Call", desc: "HD video link with expert analysis.", color: "bg-amber-600" },
             { id: 'emergency', icon: AlertCircle, title: "Emergency Help", desc: "Critical support for urgent farm risks.", color: "bg-red-600" }
           ].map((action) => (
             <motion.button 
               key={action.id}
               whileHover={{ y: -8, scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               onClick={() => {
                   if (action.id === 'ai') startCall('voice', "I need instant expert help with my crops. What should I do?");
                   else if (action.id === 'video' || action.id === 'voice') startCall(action.id as any);
                   else if (action.id === 'emergency') setShowEmergency(true);
                   else toast.info(`${action.title} coming soon!`);
               }}
               className="p-8 rounded-[2rem] bg-white/5 border border-white/5 text-left group hover:bg-white/10 transition-all shadow-xl shadow-black h-full"
             >
                <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-2xl", action.color)}>
                   <action.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-white font-black text-xl mb-3">{action.title}</h3>
                <p className="text-white/40 text-sm font-medium leading-relaxed">{action.desc}</p>
             </motion.button>
           ))}
        </div>

        {/* 3. EXPERT CONSULTATION CARDS */}
        <div className="mb-20">
           <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="text-3xl font-black text-white flex items-center gap-3">
                 <ShieldCheck className="h-8 w-8 text-emerald-400" />
                 Verified Experts
              </h2>
              <Button variant="link" className="text-emerald-400 font-bold uppercase tracking-widest text-xs">View All</Button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {EXPERTS.map((expert) => (
                <Card key={expert.id} className="group relative overflow-hidden bg-white/5 border-white/5 border-none rounded-[2.5rem] shadow-2xl hover:bg-white/10 transition-all p-2">
                   {/* Profile Header */}
                   <div className="relative h-64 rounded-[2rem] overflow-hidden mb-4">
                      <img src={expert.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={expert.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                         <h3 className="text-white font-black text-xl leading-tight">{expert.name}</h3>
                      </div>
                   </div>

                   {/* Simplified Actions */}
                   <div className="px-4 pb-6">
                      <div className="grid grid-cols-2 gap-2">
                         <Button onClick={() => startCall("video")} className="bg-emerald-600 hover:bg-emerald-700 rounded-xl h-10 font-black text-xs uppercase tracking-widest">Video</Button>
                         <Button variant="outline" onClick={() => startCall("voice")} className="border-white/10 text-white hover:bg-white/10 rounded-xl h-10 font-black text-xs uppercase tracking-widest bg-transparent">Voice</Button>
                      </div>
                   </div>
                </Card>
              ))}
           </div>
        </div>

        {/* 4. SMART HELP FEATURES */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Decision Support", icon: BrainCircuit, desc: "AI-driven algorithms to help you choose the best crop and market protocol.", prompt: "Help me choose the best crop and market protocol for my area." },
             { title: "Personalized Farm Plan", icon: FileText, desc: "Step-by-step roadmap tailored to your specific soil and topography.", prompt: "Generate a personalized farm plan for my soil and topography." },
             { title: "Second Opinion", icon: ShieldCheck, desc: "Validate your diagnosis with senior agri-scientists in seconds.", prompt: "I need a second opinion on my current crop diagnosis." }
           ].map((feature, i) => (
             <motion.button 
               key={i} 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               onClick={() => startCall("voice", feature.prompt)}
               className="flex text-left gap-6 p-6 rounded-[2rem] bg-emerald-950/20 border border-emerald-500/10 group hover:border-emerald-500/30 transition-all h-full"
             >
                <div className="flex-shrink-0 h-16 w-16 rounded-[1.2rem] bg-emerald-600/10 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                   <feature.icon className="h-8 w-8" />
                </div>
                <div>
                   <h3 className="text-white font-black text-lg mb-2">{feature.title}</h3>
                   <p className="text-white/30 text-xs font-medium leading-relaxed">{feature.desc}</p>
                </div>
             </motion.button>
           ))}
        </div>

        {/* 5. RECENT CONSULTATIONS */}
        <div className="max-w-4xl mx-auto">
           <div className="flex items-center gap-3 mb-8 px-4">
              <History className="h-7 w-7 text-white/30" />
              <h2 className="text-2xl font-black text-white">Recent Consultations</h2>
           </div>
           <div className="space-y-4">
              {RECENT_CONSULTATIONS.map((cons) => (
                 <motion.div 
                   key={cons.id}
                   whileHover={{ x: 8 }}
                   className="p-6 rounded-[1.5rem] bg-white/5 border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all"
                 >
                    <div className="flex-1">
                       <p className="text-white font-bold text-base mb-1">"{cons.query}"</p>
                       <div className="flex items-center gap-4">
                          <span className="text-white/20 text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                             <Languages className="h-3 w-3" />
                             {cons.lang}
                          </span>
                          <span className="text-white/20 text-xs font-black uppercase tracking-widest">{cons.date}</span>
                       </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-white/10 group-hover:text-emerald-400 transition-colors" />
                 </motion.div>
              ))}
           </div>
        </div>

      </div>

      {/* --- EMERGENCY HELP MODAL --- */}
      <AnimatePresence>
          {showEmergency && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/90 backdrop-blur-xl">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full max-w-2xl bg-slate-900 rounded-[3rem] border border-red-500/20 overflow-hidden shadow-[0_0_100px_rgba(239,68,68,0.2)]"
                  >
                      <div className="p-10 border-b border-white/5 bg-gradient-to-r from-red-500/10 to-transparent flex items-center justify-between">
                         <div className="flex items-center gap-5">
                            <div className="h-16 w-16 bg-red-600 rounded-3xl flex items-center justify-center animate-pulse">
                               <AlertCircle className="h-10 w-10 text-white" />
                            </div>
                            <div>
                               <h2 className="text-3xl font-black text-white">Emergency Help</h2>
                               <p className="text-red-400/60 font-black text-xs uppercase tracking-widest">Agricultural Crisis Support</p>
                            </div>
                         </div>
                         <Button onClick={() => setShowEmergency(false)} variant="ghost" className="rounded-full h-12 w-12 hover:bg-white/5 p-0">
                            <X className="h-6 w-6 text-white/40" />
                         </Button>
                      </div>

                      <div className="p-10 space-y-6">
                         {EMERGENCY_PROTOCOLS.map((protocol) => (
                             <div key={protocol.id} className="flex gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/5">
                                <div className={cn("h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center", protocol.color)}>
                                   <protocol.icon className="h-8 w-8" />
                                </div>
                                <div>
                                   <h3 className="text-white font-black text-lg mb-2">{protocol.title}</h3>
                                   <p className="text-white/30 text-sm font-medium leading-relaxed">{protocol.desc}</p>
                                </div>
                             </div>
                         ))}

                         <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                             <Button onClick={() => window.location.href = "tel:18004251556"} className="h-16 rounded-3xl bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-widest gap-3 shadow-2xl">
                                <PhoneCall className="h-5 w-5" />
                                Call Govt. Toll Free
                             </Button>
                             <Button variant="outline" onClick={() => { setShowEmergency(false); startCall("video", "Analyze my crop for emergency crisis signs immediately."); }} className="h-16 rounded-3xl border-white/10 text-white hover:bg-white/10 bg-transparent font-black text-sm uppercase tracking-widest gap-3">
                                <Activity className="h-5 w-5" />
                                AI Crisis Scan
                             </Button>
                         </div>
                      </div>
                  </motion.div>
              </div>
          )}
      </AnimatePresence>

      {/* --- 6. VIDEO CALL UI (FULL SCREEN OVERLAY) --- */}
      <AnimatePresence>
        {callActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-stretch justify-items-stretch overflow-hidden"
          >
            {/* Background Layer (Only Experts for Video) */}
            <div className="absolute inset-0 z-0 bg-slate-900">
               <div className="relative h-full w-full">
                  {callType === "video" ? (
                    <>
                      <img
                        src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=2000"
                        alt="AI Expert"
                        className="w-full h-full object-cover grayscale-[0.2] brightness-[0.5]"
                      />
                      {remoteUsers.map(user => (
                        <div key={user.uid} id={`remote-player-${user.uid}`} className="absolute inset-0 z-20" />
                      ))}
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-emerald-950 to-black">
                       <motion.div 
                         animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                         transition={{ repeat: Infinity, duration: 3 }}
                         className="h-[500px] w-[500px] bg-emerald-500/10 rounded-full blur-[120px]" 
                       />
                       <div className="absolute inset-0 flex flex-col items-center justify-center gap-10">
                          <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="h-56 w-56 rounded-full border-4 border-emerald-500/30 p-2 shadow-[0_0_80px_rgba(16,185,129,0.2)]"
                          >
                             <img src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=500" className="h-full w-full object-cover rounded-full grayscale" alt="expert" />
                          </motion.div>
                          <div className="text-center">
                             <h2 className="text-white font-black text-4xl mb-3">Audio Consultation</h2>
                             <p className="text-emerald-400 font-black text-xs uppercase tracking-[0.5em] animate-pulse">Secure Link Active</p>
                          </div>
                          
                          {/* Pulsing Audio Waves */}
                          <div className="flex items-end gap-1.5 h-16">
                             {[...Array(12)].map((_, i) => (
                               <motion.div 
                                 key={i}
                                 animate={{ height: [10, 40 + Math.random() * 40, 10] }}
                                 transition={{ repeat: Infinity, duration: 0.5 + Math.random(), ease: "easeInOut" }}
                                 className="w-2.5 bg-emerald-500/40 rounded-full"
                               />
                             ))}
                          </div>
                       </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
               </div>
            </div>

            {/* Header: Call Stats */}
            <div className="relative z-30 p-8 flex items-center justify-between">
               <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                     <span className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">{callType === "video" ? "Video Consultation" : "Voice Consultation"}</span>
                     <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                        <h2 className="text-white font-black text-xl tracking-tight">Dr. Rajesh Kumar</h2>
                     </div>
                  </div>
                  <div className="h-10 w-[1px] bg-white/10 mx-2" />
                  <div className="px-4 py-1.5 bg-white/5 backdrop-blur-3xl rounded-xl border border-white/5 flex items-center gap-3">
                      <span className="font-mono text-white text-lg font-black tracking-tight">{formatTimer(timer)}</span>
                  </div>
               </div>

               <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white/50 text-[10px] font-black uppercase tracking-widest">
                  <Wifi className="h-3 w-3" />
                  Stable Connection: 12ms
               </div>
            </div>

            {/* USER VIDEO (LOCAL FEED): Only for Video Calls */}
            {callType === "video" && (
                <div className="absolute top-24 right-8 w-56 h-80 z-40">
                   <Card className="h-full w-full rounded-3xl border-2 border-white/10 overflow-hidden bg-slate-800 shadow-2xl overflow-hidden relative group">
                      {isCameraOff ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-900/80 backdrop-blur-xl">
                          <CameraOff className="h-10 w-10 text-white/20" />
                        </div>
                      ) : (
                        <div ref={localPlayerRef} className="h-full w-full object-cover mirror scale-[1.01]" />
                      )}
                      <div className="absolute bottom-4 left-4 z-30 px-2 py-1 bg-black/40 backdrop-blur-md text-white text-[8px] font-black rounded-lg uppercase tracking-widest border border-white/5">Local Feed</div>
                   </Card>
                </div>
            )}

            {/* CENTER DASHBOARD: CHAT TRANSCRIPT */}
            <div className="flex-1 relative z-30 flex flex-col items-center justify-center px-4">
                <div ref={scrollRef} className="w-full max-w-2xl h-[450px] overflow-y-auto space-y-6 pr-4 scrollbar-hidden mb-8">
                  {transcript.length === 0 && !interimTranscript ? (
                    <div className="h-full flex items-center justify-center flex-col gap-6 opacity-20 text-white text-center">
                      <Terminal className="h-16 w-16" />
                      <p className="font-black italic tracking-[0.2em] text-xs uppercase">
                        Encrypted Connection Active.<br/>Talk to your expert now.
                      </p>
                    </div>
                  ) : (
                    <>
                      {transcript.map((m, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn(
                            "flex items-start gap-4",
                            m.sender === 'user' ? "flex-row-reverse text-right" : "flex-row text-left"
                          )}
                        >
                          <div className={cn(
                            "h-10 w-10 rounded-2xl flex items-center justify-center text-[10px] font-black text-white shadow-2xl flex-shrink-0 mt-1",
                            m.sender === 'user' ? "bg-emerald-600" : "bg-blue-600"
                          )}>
                            {m.sender === 'user' ? <User className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                          </div>
                          <div className={cn(
                            "max-w-[75%] p-5 rounded-[1.5rem] text-[15px] font-medium leading-relaxed tracking-tight shadow-3xl",
                            m.sender === 'user' ? "bg-emerald-600 text-white" : "bg-white/10 backdrop-blur-3xl text-white border border-white/10"
                          )}>
                            {m.text}
                          </div>
                        </motion.div>
                      ))}
                      {interimTranscript && (
                        <div className="flex flex-row-reverse items-start gap-4 pb-12">
                          <div className="h-10 w-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 animate-pulse mt-1">
                             <Mic className="h-5 w-5" />
                          </div>
                          <div className="max-w-[75%] p-5 rounded-[1.5rem] text-[15px] font-bold text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 italic animate-pulse shadow-2xl">
                            {interimTranscript}...
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {callStatus === "thinking" && (
                    <div className="flex gap-3 items-center text-emerald-400 font-black text-xs mt-6 ml-14">
                       <Loader2 className="h-5 w-5 animate-spin" />
                       <span className="uppercase tracking-[0.3em] font-sans">AI Thinking...</span>
                    </div>
                  )}
                  {callStatus === "connecting" && (
                    <div className="h-full flex flex-col gap-6 items-center justify-center text-emerald-200">
                       <Loader2 className="h-16 w-16 animate-spin" />
                       <span className="uppercase tracking-[0.5em] font-black text-sm">Secure Linking...</span>
                    </div>
                  )}
                </div>
            </div>

            {/* BOTTOM CONTROLS & INPUT */}
            <div className="relative z-50 p-6 md:p-12 flex flex-col items-center gap-6 md:gap-10 mt-auto">
                {/* Chat Input Overlay */}
                <div className="w-full max-w-2xl relative group">
                    <Input 
                        ref={inputRef}
                        placeholder="Type or talk to your expert..."
                        value={manualInput}
                        onChange={(e) => setManualInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && manualInput.trim()) handleAI(manualInput);
                        }}
                        className="h-16 md:h-20 bg-white/5 backdrop-blur-3xl border-white/10 rounded-[2rem] md:rounded-[2.5rem] text-white text-base md:text-lg font-bold placeholder:text-white/20 pl-8 pr-20 shadow-3xl focus:ring-emerald-500/50 transition-all border-2 focus:border-emerald-500/30"
                    />
                    <button 
                        onClick={() => manualInput.trim() && handleAI(manualInput)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-10 md:h-14 w-10 md:w-14 bg-emerald-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl hover:bg-emerald-500 transition-all hover:scale-110 active:scale-95 group"
                    >
                        <Send className="h-6 w-6 md:h-8 md:w-8 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>

                {/* Main Action Controls */}
                <div className="bg-black/80 backdrop-blur-3xl px-6 md:px-12 py-4 md:py-6 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 flex items-center gap-4 md:gap-10 shadow-[0_32px_128px_rgba(0,0,0,0.8)] mb-4">
                  <button onClick={() => setIsMuted(!isMuted)} className={cn("h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-2xl flex items-center justify-center transition-all bg-white/5 hover:bg-white/10 border border-white/10 text-white", isMuted && "bg-red-500/20 border-red-500/50 text-red-500")}>
                    {isMuted ? <MicOff className="h-6 w-6 md:h-7 md:w-7" /> : <Mic className="h-6 w-6 md:h-7 md:w-7" />}
                  </button>

                  <button
                    onClick={startListening}
                    disabled={callStatus === "thinking" || isMuted || callStatus === "connecting"}
                    className={cn(
                      "h-16 w-16 md:h-24 md:w-24 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center shadow-3xl transition-all active:scale-95 group relative bg-emerald-600 hover:bg-emerald-500 border-4 border-emerald-400/30",
                      isListening && "scale-110 shadow-emerald-500/20"
                    )}
                  >
                    <Mic className={cn("h-8 w-8 md:h-10 md:w-10 text-white", isListening && "animate-pulse")} />
                    {isListening && (
                        <div className="absolute -top-12 md:-top-16 bg-emerald-500 text-white text-[8px] md:text-[10px] font-black px-4 md:px-6 py-1.5 md:py-2 rounded-full whitespace-nowrap shadow-2xl animate-bounce tracking-widest">
                            LISTENING...
                        </div>
                    )}
                  </button>

                  {/* Camera toggle hidden for Voice Calls */}
                  {callType === "video" && (
                      <button onClick={toggleCamera} className={cn("h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-2xl flex items-center justify-center transition-all bg-white/5 hover:bg-white/10 border border-white/10 text-white", isCameraOff && "bg-red-500/20 border-red-500/50 text-red-500")}>
                        {isCameraOff ? <CameraOff className="h-6 w-6 md:h-7 md:w-7" /> : <Camera className="h-6 w-6 md:h-7 md:w-7" />}
                      </button>
                  )}

                  <button onClick={() => setIsSpeakerOn(!isSpeakerOn)} className={cn("h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-2xl flex items-center justify-center transition-all bg-white/5 hover:bg-white/10 border border-white/10 text-white", !isSpeakerOn && "bg-amber-500/20 shadow-amber-500/10")}>
                    {isSpeakerOn ? <Volume2 className="h-6 w-6 md:h-7 md:w-7" /> : <VolumeX className="h-6 w-6 md:h-7 md:w-7" />}
                  </button>

                  <div className="h-10 w-[1px] bg-white/10 mx-1 md:mx-2" />

                  <button 
                    onClick={endCall} 
                    className="h-12 w-32 md:h-16 md:w-44 bg-red-600 hover:bg-red-700 rounded-[1rem] md:rounded-[1.5rem] flex items-center justify-center gap-2 md:gap-3 border-2 border-red-500/50 text-white font-black uppercase text-[10px] md:text-xs tracking-widest shadow-2xl shadow-red-900/60 transition-all hover:scale-[1.05] active:scale-95 z-50"
                  >
                      <PhoneOff className="h-4 w-4 md:h-5 md:w-5" />
                      End Call
                  </button>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpertConsult;
