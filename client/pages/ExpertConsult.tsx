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
  PhoneCall,
  Settings,
  AlertTriangle,
  Siren,
  HelpCircle,
  ShieldAlert,
  Settings2,
  Lock,
  RefreshCcw,
  SkipForward
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
  { id: 1, name: "Dr. Rajesh Kumar", specialty: "Crop Pathology", image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=300" },
  { id: 2, name: "Er. Sneha Rao", specialty: "Irrigation Expert", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" },
  { id: 3, name: "Prof. Amit Singh", specialty: "Soil Scientist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" }
];

const ExpertConsult = () => {
  const { language } = useLanguage();
  
  // Call Engine States
  const [callActive, setCallActive] = useState(false);
  const [callType, setCallType] = useState<"voice" | "video" | "ai" | null>(null);
  const [selectedLanguage] = useState("en-IN"); 
  const [callStatus, setCallStatus] = useState<"idle" | "listening" | "thinking" | "speaking" | "connecting">("idle");
  const [timer, setTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [transcript, setTranscript] = useState<{ sender: 'user' | 'ai', text: string }[]>([]);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [showEmergency, setShowEmergency] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Permission Error States
  const [showPermissionHelp, setShowPermissionHelp] = useState<{ visible: boolean, type: 'camera' | 'mic' | 'both', originalType: any } | null>(null);

  // Agora State
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | null>(null);
  const [localVideoTrack, setLocalVideoTrack] = useState<ILocalVideoTrack | null>(null);
  const [remoteUsers, setRemoteUsers] = useState<any[]>([]);

  // Refs
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const timerIntervalRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const localPlayerRef = useRef<HTMLDivElement>(null);

  // --- VIDEO PLAYBACK FIX: Reliability with localPlayerRef ---
  useEffect(() => {
    if (localVideoTrack && localPlayerRef.current) {
      console.log("Playing local video track...");
      localVideoTrack.play(localPlayerRef.current);
    }
    return () => {
      if (localVideoTrack) localVideoTrack.stop();
    };
  }, [localVideoTrack, callActive]);

  // --- AUTO SCROLL & TIMER ---
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [transcript, interimTranscript]);

  // --- SPEECH RECOGNITION SYSTEM (CONTINUOUS) ---
  const initSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLanguage;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setCallStatus("listening");
      console.log("Listening...");
    };

    recognition.onresult = (event: any) => {
      let final = "";
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) final += event.results[i][0].transcript;
        else interim += event.results[i][0].transcript;
      }
      if (final) handleAutonomousAI(final);
      setInterimTranscript(interim);
    };

    recognition.onend = () => {
      if (callActive && callStatus !== "speaking" && callStatus !== "thinking") {
        try {
          recognition.start();
        } catch(e) {}
      }
    };

    return recognition;
  };

  // --- CALL LOGIC ---
  const startConsultation = async (type: "voice" | "video" | "ai", customPrompt?: string) => {
    if (isConnecting || callActive) return;
    
    // Safety guard for Agora state
    if (agoraClient.connectionState !== "DISCONNECTED") {
      try { await agoraClient.leave(); } catch(e) {}
    }

    try {
      setIsConnecting(true);
      setCallActive(true);
      setCallType(type);
      setTimer(0);
      setTranscript([]);
      setCallStatus("connecting");
      setIsCameraOff(type !== "video");

      // Agora Join
      await agoraClient.join(APP_ID, "expert-hub", null, null);
      
      // Attempt Microphone first
      let audio = null;
      try {
        audio = await AgoraRTC.createMicrophoneAudioTrack();
        setLocalAudioTrack(audio);
      } catch (micErr: any) {
         if (micErr.message?.includes("Permission denied") || micErr.code === "PERMISSION_DENIED") {
           setIsConnecting(false);
           setShowPermissionHelp({ visible: true, type: 'mic', originalType: type });
           throw micErr;
         }
      }
      
      let video = null;
      if (type === "video") {
        try {
          video = await AgoraRTC.createCameraVideoTrack();
          setLocalVideoTrack(video);
        } catch (camErr: any) {
           if (camErr.message?.includes("Permission denied") || camErr.code === "PERMISSION_DENIED") {
             setIsConnecting(false);
             setShowPermissionHelp({ visible: true, type: 'camera', originalType: type });
             throw camErr;
           }
        }
      }
      
      if (audio) {
        await agoraClient.publish(video ? [audio, video] : [audio]);
      }
      
      setCallStatus("idle");
      timerIntervalRef.current = setInterval(() => setTimer(prev => prev + 1), 1000);

      // Start Autonomous AI Engine
      recognitionRef.current = initSpeechRecognition();
      recognitionRef.current?.start();

      const greeting = customPrompt || "Hello, I am your agricultural expert. How can I help you today?";
      speakAutonomous(greeting);

    } catch (err: any) {
      console.error("Join Failed:", err);
      if (!(err.message?.includes("Permission denied") || err.code === "PERMISSION_DENIED")) {
        toast.error(err.message || "Connection Error: Please check your internet");
      }
      cleanupSession();
    } finally {
      setIsConnecting(false);
    }
  };

  const cleanupSession = async () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
      setLocalAudioTrack(null);
    }
    
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
      setLocalVideoTrack(null);
    }
    
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e) {}
      recognitionRef.current = null;
    }
    
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
    
    try {
      await agoraClient.leave();
    } catch(e) {}
    
    setCallActive(false);
    setCallStatus("idle");
    setTranscript([]);
    setInterimTranscript("");
    setTimer(0);
  };

  const endCall = async () => {
    await cleanupSession();
    toast.success("Consultation ended successfully");
  };

  // --- AI ENGINE (AUTONOMOUS) ---
  const handleAutonomousAI = async (text: string) => {
    if (!text.trim()) return;
    setTranscript(prev => [...prev, { sender: 'user', text }]);
    setCallStatus("thinking");
    setInterimTranscript("");

    // Pause recognition to avoid AI hearing itself
    recognitionRef.current?.stop();

    try {
      const response = await axios.post("/api/expert-consult", {
        problemText: text,
        language: selectedLanguage
      });
      const aiReply = response.data.reply;
      setTranscript(prev => [...prev, { sender: 'ai', text: aiReply }]);
      speakAutonomous(aiReply);
    } catch (err) {
      setCallStatus("idle");
      try {
        recognitionRef.current?.start();
      } catch(e) {}
    }
  };

  const speakAutonomous = (text: string) => {
    if (!synthesisRef.current || !isSpeakerOn) {
      setCallStatus("idle");
      try {
        recognitionRef.current?.start();
      } catch(e) {}
      return;
    }
    synthesisRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage;
    utterance.onstart = () => setCallStatus("speaking");
    utterance.onend = () => {
      setCallStatus("idle");
      try {
        recognitionRef.current?.start(); 
      } catch(e) {}
    };
    synthesisRef.current.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 font-sans selection:bg-emerald-500 overflow-x-hidden">
      
      <div className="container mx-auto px-4 max-w-6xl">

        {/* --- PREMIUM HERO SECTION --- */}
        <section className="relative p-12 rounded-[2.5rem] bg-gradient-to-br from-[#064e3b] via-[#022c22] to-black border border-emerald-500/10 shadow-3xl mb-12 overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#10b98115,_transparent)] pointer-events-none" />
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="relative z-10 text-center"
           >
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest mb-6">
                 <Sparkles className="h-4 w-4" /> 24/7 Expert Hub Active
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                 Smart Expert Help
              </h1>
              <p className="text-emerald-200/40 text-lg max-w-2xl mx-auto font-medium">
                 World-class agricultural consultation powered by real-time AI. Speak naturally to our virtual and human experts for instant decision support.
              </p>
           </motion.div>
        </section>

        {/* --- QUICK ACTIONS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
           {[
             { id: 'ai', icon: BrainCircuit, title: "Talk to AI", color: "bg-emerald-600", desc: "Start autonomous consult" },
             { id: 'video', icon: Video, title: "Video Call", color: "bg-indigo-600", desc: "Visual diagnosis expert" },
             { id: 'voice', icon: Phone, title: "Voice Call", color: "bg-slate-600", desc: "Quick hands-free advise" },
             { id: 'emergency', icon: AlertCircle, title: "Emergency", color: "bg-red-600", desc: "Live crisis protocols" }
           ].map((action) => (
             <motion.button 
               key={action.id}
               disabled={isConnecting}
               whileHover={{ y: -8, scale: 1.05 }}
               onClick={() => action.id === 'emergency' ? setShowEmergency(true) : startConsultation(action.id as any)}
               className="p-8 rounded-[2rem] bg-white/5 border border-white/5 text-left group hover:border-emerald-500/20 transition-all flex flex-col justify-between h-full shadow-2xl disabled:opacity-50"
             >
                <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-2xl", action.color)}>
                   {isConnecting && (action.id !== 'emergency') ? <Loader2 className="h-7 w-7 animate-spin text-white" /> : <action.icon className="h-7 w-7 text-white" />}
                </div>
                <div>
                   <h3 className="text-white font-black text-xl mb-1">{action.title}</h3>
                   <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">{action.desc}</p>
                </div>
             </motion.button>
           ))}
        </div>

        {/* --- EXPERT REGISTRY --- */}
        <div className="mb-20">
           <h2 className="text-3xl font-black mb-10 text-white flex items-center gap-4 px-2">
              <ShieldCheck className="h-8 w-8 text-emerald-400" />
              Verified Board Experts
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {EXPERTS.map(expert => (
                <Card key={expert.id} className="bg-white/5 border-white/5 rounded-[2.5rem] p-4 group overflow-hidden transition-all hover:bg-white/10 shadow-3xl">
                   <div className="relative h-72 rounded-[2rem] overflow-hidden mb-6">
                      <img src={expert.image} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt={expert.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6">
                         <h3 className="text-white font-black text-2xl mb-1">{expert.name}</h3>
                         <p className="text-emerald-400 text-xs font-black uppercase tracking-widest">{expert.specialty}</p>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-3 pb-2 px-2">
                      <Button disabled={isConnecting} onClick={() => startConsultation("video")} className="bg-emerald-600 hover:bg-emerald-700 rounded-xl h-12 font-black uppercase text-xs tracking-widest border border-emerald-400/20">
                        {isConnecting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Video"}
                      </Button>
                      <Button disabled={isConnecting} onClick={() => startConsultation("voice")} variant="outline" className="bg-white/5 border-white/10 rounded-xl h-12 font-black uppercase text-xs tracking-widest text-white hover:bg-white/10">
                        {isConnecting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Voice Call"}
                      </Button>
                   </div>
                </Card>
              ))}
           </div>
        </div>

      </div>

      {/* --- EMERGENCY CRISIS MODAL --- */}
      <AnimatePresence>
        {showEmergency && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-2xl bg-gradient-to-br from-red-950/40 via-black to-red-950/20 border border-red-500/20 rounded-[3rem] p-12 overflow-hidden shadow-[0_0_100px_rgba(220,38,38,0.2)]"
             >
                <div className="absolute top-0 right-0 p-8">
                   <button onClick={() => setShowEmergency(false)} className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all"><X className="h-6 w-6" /></button>
                </div>
                
                <div className="relative z-10">
                   <div className="h-20 w-20 bg-red-600 rounded-3xl flex items-center justify-center mb-8 shadow-3xl shadow-red-900/60 mx-auto">
                      <ShieldAlert className="h-10 w-10 text-white" />
                   </div>
                   
                   <h2 className="text-4xl font-black text-center mb-4 tracking-tighter">Emergency Help</h2>
                   <p className="text-red-200/40 text-center mb-12 font-medium">Critical agricultural crises require immediate action. Choose a protocol below.</p>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        onClick={() => window.location.href = 'tel:18004251556'}
                        className="p-8 rounded-[2rem] bg-white/5 border border-white/5 text-left group hover:bg-red-600 transition-all flex flex-col justify-between"
                      >
                         <PhoneCall className="h-8 w-8 text-red-500 group-hover:text-white mb-6" />
                         <div>
                            <h3 className="font-black text-xl mb-1">CALL GOVT.</h3>
                            <p className="text-[10px] font-black uppercase text-red-400 group-hover:text-red-200">National Helpline</p>
                         </div>
                      </motion.button>
                      
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        onClick={() => { setShowEmergency(false); startConsultation('video', "I am facing a severe agricultural emergency. Please analyze my situation immediately."); }}
                        className="p-8 rounded-[2rem] bg-emerald-600 text-left group hover:bg-emerald-700 transition-all flex flex-col justify-between"
                      >
                         <BrainCircuit className="h-8 w-8 text-white mb-6" />
                         <div>
                            <h3 className="font-black text-xl mb-1">AI CRISIS SCAN</h3>
                            <p className="text-[10px] font-black uppercase text-emerald-200">Start Video Diagnostic</p>
                         </div>
                      </motion.button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- PERMISSION HELP MODAL --- */}
      <AnimatePresence>
        {showPermissionHelp?.visible && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] p-10 overflow-hidden"
             >
                <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-3xl shadow-blue-900/40">
                   <Lock className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-3xl font-black text-center mb-2">Action Required</h3>
                <p className="text-white/40 text-center mb-8 font-medium">Please grant {showPermissionHelp.type} access in your browser to proceed with the consultation.</p>
                
                <div className="space-y-4 mb-10">
                   <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="h-6 w-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-black shrink-0">1</div>
                      <p className="text-xs font-bold text-white/60">Click the <Settings2 className="inline h-4 w-4 text-white mx-1" /> **Lock/Settings icon** in your browser address bar.</p>
                   </div>
                   <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="h-6 w-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-black shrink-0">2</div>
                      <p className="text-xs font-bold text-white/60">Switch **Microphone** and **Camera** to "Allow".</p>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <Button 
                     onClick={() => { setShowPermissionHelp(null); startConsultation(showPermissionHelp.originalType); }}
                     className="bg-emerald-600 h-14 rounded-2xl font-black uppercase tracking-widest gap-2"
                   >
                      <RefreshCcw className="h-5 w-5" /> Retry
                   </Button>
                   <Button 
                     variant="outline"
                     onClick={() => { 
                       setShowPermissionHelp(null); 
                       if (showPermissionHelp.originalType === 'video') startConsultation('voice');
                       else cleanupSession();
                     }}
                     className="bg-white/5 border-white/10 h-14 rounded-2xl font-black uppercase tracking-widest text-white hover:bg-white/10 gap-2"
                   >
                      {showPermissionHelp.originalType === 'video' ? <><SkipForward className="h-5 w-5" /> Voice Only</> : "Cancel"}
                   </Button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- FULLSCREEN CALL MODAL UI --- */}
      <AnimatePresence>
        {callActive && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-stretch overflow-hidden"
          >
             {/* --- TOP BAR --- */}
             <div className="relative z-30 p-8 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-3xl">
                <div className="flex items-center gap-6">
                   <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                      <Sparkles className="h-6 w-6" />
                   </div>
                   <div>
                      <h4 className="font-black text-lg tracking-tight">Live Consultation</h4>
                      <div className="flex items-center gap-2">
                         <div className={cn("h-1.5 w-1.5 rounded-full", callStatus === 'speaking' ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500')} />
                         <span className="text-[10px] uppercase font-black tracking-widest text-white/40">{callStatus}</span>
                      </div>
                   </div>
                </div>

                <div className="px-6 py-2 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
                   <span className="font-mono text-xl font-black">{Math.floor(timer/60)}:{String(timer%60).padStart(2,'0')}</span>
                   <div className="h-4 w-px bg-white/10" />
                   <Wifi className="h-4 w-4 text-emerald-400" />
                </div>
             </div>

             {/* --- SPLIT STAGE --- */}
             <div className="flex-1 flex flex-col md:flex-row relative">
                
                {/* AI / REMOTE FEED (LEFT) */}
                <div className="flex-1 relative bg-slate-900 overflow-hidden border-r border-white/5">
                   <div className="absolute inset-0 z-0">
                      <img 
                        src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=2000" 
                        className={cn("w-full h-full object-cover grayscale brightness-50 transition-all duration-1000", callStatus === 'speaking' && 'grayscale-0 brightness-[0.7] scale-105')} 
                        alt="Expert" 
                      />
                      {remoteUsers.map(u => <div key={u.uid} id={`remote-player-${u.uid}`} className="absolute inset-0 z-10" />)}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                   </div>

                   {/* Waveform Animation (Center Stage) */}
                   <div className="absolute inset-0 flex items-center justify-center z-20">
                      {callStatus === 'speaking' && (
                        <div className="flex items-end gap-1.5 h-32">
                           {[...Array(15)].map((_, i) => (
                             <motion.div 
                               key={i}
                               animate={{ height: [20, 100 + Math.random() * 60, 20] }}
                               transition={{ repeat: Infinity, duration: 0.3 + Math.random() * 0.4 }}
                               className="w-3 bg-emerald-500 rounded-full shadow-[0_0_20px_#10b981]"
                             />
                           ))}
                        </div>
                      )}
                      {callStatus === 'listening' && (
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="h-48 w-48 rounded-full border-4 border-emerald-400/30 flex items-center justify-center backdrop-blur-sm"
                        >
                          <Mic className="h-16 w-16 text-emerald-400" />
                        </motion.div>
                      )}
                      {callStatus === 'thinking' && <Loader2 className="h-20 w-20 text-blue-500 animate-spin" />}
                   </div>

                   {/* Transcript Overlay */}
                   <div ref={scrollRef} className="absolute inset-x-0 bottom-0 max-h-[40%] overflow-y-auto p-12 z-30 space-y-4">
                      {transcript.map((m, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -20 }} 
                          animate={{ opacity: 1, x: 0 }}
                          className={cn("max-w-[70%] p-6 rounded-[1.5rem] text-sm font-bold shadow-2xl", m.sender === 'user' ? "ml-auto bg-emerald-600 text-white" : "bg-white/10 backdrop-blur-3xl text-white border border-white/10")}
                        >
                           {m.text}
                        </motion.div>
                      ))}
                      {interimTranscript && (
                        <div className="ml-auto max-w-[70%] p-6 rounded-[1.5rem] bg-emerald-500/20 text-emerald-200 font-black italic border border-emerald-500/30 animate-pulse">
                           {interimTranscript}...
                        </div>
                      )}
                   </div>
                </div>

                {/* USER LOCAL FEED (RIGHT - FLOATING FOR MOBILE, SIDEBAR FOR DESKTOP) */}
                <div className="w-full md:w-80 bg-black border-l border-white/5 relative z-40">
                   <div className="p-6 h-1/2 md:h-full flex flex-col gap-6">
                      <div className="relative flex-1 rounded-[2rem] overflow-hidden border-2 border-white/10 shadow-2xl bg-slate-800">
                         {isCameraOff ? (
                           <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                              <CameraOff className="h-12 w-12 text-white/10" />
                           </div>
                         ) : (
                           <div ref={localPlayerRef} className="h-full w-full" />
                         )}
                         <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border border-white/5">Self Preview</div>
                      </div>

                      {/* Manual Text Input Fallback */}
                      <div className="hidden md:flex flex-col gap-4">
                         <p className="text-[10px] font-black uppercase tracking-widest text-white/20 px-2">Manual Input Fallback</p>
                         <div className="relative">
                            <Input 
                              placeholder="Type something..." 
                              value={manualInput}
                              onChange={(e) => setManualInput(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleAutonomousAI(manualInput)}
                              className="h-16 bg-white/5 rounded-2xl border-white/10 pr-16 font-bold"
                            />
                            <button onClick={() => handleAutonomousAI(manualInput)} className="absolute right-2 top-2 h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center text-white"><Send className="h-5 w-5" /></button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* --- BOTTOM DASHBOARD --- */}
             <div className="relative z-50 p-12 flex flex-col items-center bg-gradient-to-t from-black to-transparent">
                <div className="bg-white/5 backdrop-blur-3xl px-12 py-6 rounded-[3.5rem] border border-white/10 flex items-center gap-12 shadow-[0_32px_128px_rgba(0,0,0,0.9)]">
                   <button onClick={() => setIsMuted(!isMuted)} className={cn("h-16 w-16 rounded-2xl flex items-center justify-center border transition-all", isMuted ? "bg-red-500/20 border-red-500/50 text-red-500" : "bg-white/5 border-white/10 text-white")}>
                      {isMuted ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
                   </button>
                   
                   <button onClick={endCall} className="h-20 w-48 bg-red-600 hover:bg-red-700 rounded-[2rem] border-2 border-red-400/50 flex items-center justify-center gap-4 text-white font-black uppercase tracking-widest shadow-2xl shadow-red-900/60 scale-110">
                      <PhoneOff className="h-6 w-6" />
                      End Call
                   </button>

                   <button onClick={() => setIsCameraOff(!isCameraOff)} className={cn("h-16 w-16 rounded-2xl flex items-center justify-center border transition-all", isCameraOff ? "bg-red-500/20 border-red-500/50 text-red-500" : "bg-white/5 border-white/10 text-white")}>
                      {isCameraOff ? <CameraOff className="h-7 w-7" /> : <Camera className="h-7 w-7" />}
                   </button>
                   
                   <div className="h-10 w-px bg-white/10 mx-2" />
                   
                   <button onClick={() => setIsSpeakerOn(!isSpeakerOn)} className={cn("h-16 w-16 rounded-2xl flex items-center justify-center border transition-all bg-white/5 border-white/10 text-white", !isSpeakerOn && "opacity-20")}>
                      {isSpeakerOn ? <Volume2 className="h-7 w-7" /> : <VolumeX className="h-7 w-7" />}
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
