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
  Circle
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

const ExpertConsult = () => {
  const { t, language } = useLanguage();

  // Call State
  const [callActive, setCallActive] = useState(false);
  const [callType, setCallType] = useState<"voice" | "video" | null>(null);
  const [callStatus, setCallStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
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
    // Agora Listeners
    agoraClient.on("user-published", async (user, mediaType) => {
      await agoraClient.subscribe(user, mediaType);
      if (mediaType === "video") {
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
  }, []);

  // --- LOCAL VIDEO PLAYER SYNC ---
  useEffect(() => {
    if (callActive && localVideoTrack && localPlayerRef.current) {
      localVideoTrack.play(localPlayerRef.current);
    }
  }, [callActive, localVideoTrack]);

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
  const startCall = async (type: "voice" | "video") => {
    try {
      setCallActive(true);
      setCallType(type);
      setTimer(0);
      setTranscript([]);
      setCallStatus("idle");

      const channelName = "farmer"; 
      await agoraClient.join(APP_ID, channelName, null, null);

      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      const videoTrack = await AgoraRTC.createCameraVideoTrack({
        encoderConfig: {
          width: 1280,
          height: 720,
          frameRate: 15,
          bitrateMin: 100, // Allow dropping as low as 100kbps to prevent 1003 error
          bitrateMax: 1130
        },
        optimizationMode: "motion" // Prioritize stability over extreme detail
      });
        

      setLocalAudioTrack(audioTrack);
      setLocalVideoTrack(videoTrack);
      await agoraClient.publish([audioTrack, videoTrack]);

      timerIntervalRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);

      const greeting = t("botWelcome") + " " + t("botGuidanceReply");
      setTimeout(() => speakText(greeting), 1000);
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
      setTranscript(prev => [...prev, { sender: 'ai', text: "I'm having trouble connecting. Please check your internet or API keys." }]);
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
    <div className="min-h-screen bg-[#F0F9F0] pt-24 pb-12 font-sans selection:bg-emerald-100 overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-4">
          <div>
            <h1 className="text-4xl font-black text-emerald-900 tracking-tighter flex items-center gap-3">
              <Sparkles className="h-10 w-10 text-amber-500" />
              AI Expert Consultation
            </h1>
            <p className="text-emerald-700 font-bold text-xs mt-1 uppercase tracking-widest opacity-60">
              Live Video & Chat Prioritized
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-emerald-100">
             <Circle className="h-3 w-3 fill-emerald-500 text-emerald-500 animate-pulse" />
             <span className="text-xs font-black text-emerald-900 uppercase">Expert Online</span>
          </div>
        </div>

        {/* CHAT-CENTRIC MAIN ACTIONS */}
        <div className="space-y-8">
            <Card className="p-1 w-full rounded-[40px] border-none shadow-2xl bg-white overflow-hidden relative group h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white z-0" />
              
              <div className="relative z-10 h-full flex flex-col md:flex-row">
                 {/* Left: Chat Info */}
                 <div className="md:w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-4xl font-black text-slate-800 mb-4 leading-tight">{t("askDoubtsInstantly")}</h2>
                    <p className="text-slate-500 font-medium mb-8 leading-relaxed max-w-sm">
                      {t("expertConsultDescDetail")}
                    </p>
                    <div className="flex gap-4">
                        <Button
                            onClick={() => startCall("video")}
                            className="h-16 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg gap-3 shadow-xl shadow-emerald-200 transition-all hover:scale-[1.05] active:scale-95"
                        >
                            <Video className="h-6 w-6" />
                            {t("startCall")}
                        </Button>
                    </div>
                 </div>

                 {/* Right: Decorative AI Avatar */}
                 <div className="md:w-1/2 relative hidden md:block">
                    <img 
                        src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=1000"
                        className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] brightness-90 rounded-r-[38px]"
                        alt="AI Expert" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-transparent" />
                 </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[
                     { icon: MessageSquare, title: "Chat Focused", desc: "Type your doubts and get immediate replies." },
                     { icon: Wifi, title: "HD Streaming", desc: "High-definition 720p stable video link." },
                     { icon: Sparkles, title: "Smart AI", desc: "Powered by Llama 3 for expert level coaching." }
                 ].map((box, i) => (
                     <Card key={i} className="p-6 rounded-3xl border-none shadow-lg bg-white group hover:bg-emerald-600 transition-all duration-500">
                        <box.icon className="h-10 w-10 text-emerald-600 group-hover:text-white mb-4 transition-colors" />
                        <h3 className="font-black text-slate-800 group-hover:text-white mb-2">{box.title}</h3>
                        <p className="text-slate-500 group-hover:text-emerald-50 text-xs font-medium">{box.desc}</p>
                     </Card>
                 ))}
            </div>
        </div>

      </div>

      {/* --- FULL SCREEN OVERLAY (CHAT PRIORITY) --- */}
      <AnimatePresence>
        {callActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Video Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="relative h-full w-full bg-slate-950 grid grid-cols-1 md:grid-cols-2 gap-2 p-2 pb-48">
                  <div className="relative h-full w-full bg-slate-900 rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <img
                          src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=1000"
                          alt="AI Expert"
                          className="w-full h-full object-cover grayscale-[0.2] brightness-[0.7]"
                        />
                    </div>
                    {remoteUsers.map(user => (
                      <div key={user.uid} id={`remote-player-${user.uid}`} className="absolute inset-0 z-20" />
                    ))}
                    <div className="absolute top-4 left-4 z-30 px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-black rounded-lg uppercase tracking-widest border border-white/5">Expert</div>
                  </div>

                  <div className="relative h-full w-full bg-slate-900 rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
                    {isCameraOff ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                        <CameraOff className="h-16 w-16 text-white/20" />
                      </div>
                    ) : (
                      <div ref={localPlayerRef} className="h-full w-full object-cover mirror" />
                    )}
                    <div className="absolute top-4 left-4 z-30 px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-black rounded-lg uppercase tracking-widest border border-white/5">Local Feed</div>
                  </div>
                </div>
            </div>

            {/* CALL HEADER */}
            <div className="absolute top-6 left-0 right-0 px-8 flex items-center justify-between z-30">
               <div className="flex items-center gap-4">
                    <button 
                      onClick={endCall} 
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-700 backdrop-blur-xl rounded-2xl flex items-center gap-3 border border-red-500/50 text-white font-black uppercase text-xs tracking-widest shadow-lg shadow-red-900/40 transition-all hover:scale-[1.05] active:scale-95"
                    >
                        <PhoneOff className="h-4 w-4" />
                        {t("endCall")}
                    </button>
                    <div className="px-5 py-2.5 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/5 flex items-center gap-3">
                        <div className="h-2 w-2 bg-emerald-500 rounded-full animate-ping" />
                        <span className="font-mono text-white text-lg font-black">{formatTimer(timer)}</span>
                    </div>
               </div>
            </div>

            {/* CHAT & TRANSCRIPT CENTRIC (PRIORITY) */}
            <div className="absolute bottom-32 left-8 right-8 max-w-2xl mx-auto z-40 bg-black/60 backdrop-blur-3xl rounded-[40px] p-8 border border-white/10 shadow-[0_32px_128px_rgba(0,0,0,0.8)] overflow-hidden">
                <div ref={scrollRef} className="h-80 overflow-y-auto space-y-6 pr-4 scrollbar-thin scrollbar-thumb-white/10 mb-6">
                  {transcript.length === 0 && !interimTranscript ? (
                    <div className="h-full flex items-center justify-center flex-col gap-4 opacity-30 text-white">
                      <Sparkles className="h-12 w-12 animate-pulse" />
                      <p className="font-black italic tracking-widest text-xs uppercase text-center">
                        Stable Chat Active.<br/>Type your doubts below.
                      </p>
                    </div>
                  ) : (
                    <>
                      {transcript.map((m, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn(
                            "flex items-start gap-4 mb-2",
                            m.sender === 'user' ? "flex-row-reverse text-right" : "flex-row text-left"
                          )}
                        >
                          <div className={cn(
                            "h-8 w-8 rounded-xl flex items-center justify-center text-[10px] font-black text-white shadow-xl flex-shrink-0",
                            m.sender === 'user' ? "bg-emerald-600" : "bg-blue-600"
                          )}>
                            {m.sender === 'user' ? <User className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                          </div>
                          <div className={cn(
                            "max-w-[80%] p-4 rounded-3xl text-xs font-black shadow-lg",
                            m.sender === 'user' ? "bg-emerald-600 text-white" : "bg-white/10 text-white border border-white/5"
                          )}>
                            {m.text}
                          </div>
                        </motion.div>
                      ))}
                      {interimTranscript && (
                        <div className="flex flex-row-reverse items-start gap-4 mt-2">
                          <div className="h-8 w-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 animate-pulse">
                             <Mic className="h-5 w-5" />
                          </div>
                          <div className="max-w-[80%] p-4 rounded-3xl text-xs font-black text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 italic animate-pulse">
                            {interimTranscript}...
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {callStatus === "thinking" && (
                    <div className="flex gap-2 items-center text-emerald-400 font-black text-[10px] mt-2 ml-12">
                       <Loader2 className="h-4 w-4 animate-spin" />
                       <span className="uppercase tracking-widest">{t("thinking")}</span>
                    </div>
                  )}
                </div>

                {/* TEXTBOX (REBUILT FOR 100% RELIABILITY) */}
                <div className="relative group">
                    <Input 
                        ref={inputRef}
                        placeholder={t("chatPlaceholder")}
                        value={manualInput}
                        onChange={(e) => setManualInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && manualInput.trim()) handleAI(manualInput);
                        }}
                        className="h-20 bg-white/5 backdrop-blur-2xl border-white/10 rounded-[28px] text-white text-lg font-black placeholder:text-white/20 pl-8 pr-20 shadow-2xl focus:ring-emerald-500/50 transition-all border-2 focus:border-emerald-500/50"
                    />
                    <button 
                        onClick={() => manualInput.trim() && handleAI(manualInput)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 h-14 w-14 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg hover:bg-emerald-500 transition-all hover:scale-105 active:scale-90"
                    >
                        <Send className="h-8 w-8 text-white" />
                    </button>
                </div>
            </div>

            {/* MINIMAL CONTROL BAR */}
            <div className="absolute bottom-8 left-0 right-0 px-8 flex items-center justify-center z-50">
              <div className="bg-black/80 backdrop-blur-3xl px-8 py-4 rounded-[40px] border border-white/10 flex items-center gap-6 shadow-2xl">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={cn(
                      "h-14 w-14 rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-2xl relative",
                      isMuted ? "bg-red-500 text-white" : "bg-white/10 text-white"
                    )}
                  >
                    {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                  </button>

                  <button
                    onClick={startListening}
                    disabled={callStatus === "thinking" || isMuted}
                    className={cn(
                      "h-20 w-20 rounded-3xl flex items-center justify-center shadow-2xl transition-all active:scale-95 group relative",
                      isListening ? "bg-emerald-500 text-white scale-110" : "bg-white text-slate-900"
                    )}
                  >
                    <Mic className={cn("h-10 w-10", isListening && "animate-pulse")} />
                    {isListening && (
                        <div className="absolute -top-12 bg-emerald-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full whitespace-nowrap shadow-xl">
                            TALK NOW
                        </div>
                    )}
                  </button>

                  <button
                    onClick={toggleCamera}
                    className={cn(
                      "h-14 w-14 rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-2xl",
                      isCameraOff ? "bg-red-500 text-white" : "bg-white/10 text-white"
                    )}
                  >
                    {isCameraOff ? <CameraOff className="h-6 w-6" /> : <Camera className="h-6 w-6" />}
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
