import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Video, Mic, MicOff, Sparkles, Loader2, PhoneOff, Camera, CameraOff, Send, AlertCircle, BrainCircuit, PhoneCall, ShieldAlert, Lock } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import AgoraRTC, { ILocalVideoTrack, ILocalAudioTrack } from "agora-rtc-sdk-ng";
import SmartAiAssistant from "@/components/SmartAiAssistant";

const APP_ID = "5930870848764feb9441058af4c939a1"; 
// Silence verbose Agora SDK logs globally (Level 3 = Warning only)
AgoraRTC.setLogLevel(3);
const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const EXPERTS = [
  { id: 1, name: "Dr. Rajesh Kumar", specialty: "Crop Pathology", image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=300" },
  { id: 2, name: "Er. Sneha Rao", specialty: "Irrigation Expert", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" },
  { id: 3, name: "Prof. Amit Singh", specialty: "Soil Scientist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" }
];

const ExpertHelpFull = () => {
  const { language } = useLanguage();
  const [callActive, setCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState("idle");
  const [timer, setTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [transcript, setTranscript] = useState([]);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [showEmergency, setShowEmergency] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showPermissionHelp, setShowPermissionHelp] = useState(null);
  const [audioTooLow, setAudioTooLow] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);

  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const recognitionRef = useRef(null);
  const synthesisRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const timerIntervalRef = useRef(null);
  const scrollRef = useRef(null);
  const localPlayerRef = useRef(null);

  const [activeSpecialty, setActiveSpecialty] = useState("General Agriculture");

  useEffect(() => {
    // Silence verbose Agora SDK logs (Level 3 = Warning only)
    AgoraRTC.setLogLevel(3);
    
    let timeout;
    if (localVideoTrack && localPlayerRef.current) {
      timeout = setTimeout(() => { localVideoTrack.play(localPlayerRef.current!); }, 300);
    }
    agoraClient.on("exception", (err) => {
      if (err.code === 2001) setAudioTooLow(true);
      if (err.code === 4001) setAudioTooLow(false);
    });
    return () => { 
      if (timeout) clearTimeout(timeout); 
      if (localVideoTrack) localVideoTrack.stop(); 
      agoraClient.removeAllListeners("exception");
    };
  }, [localVideoTrack, callActive]);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [transcript, interimTranscript]);

  const initSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return null;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN"; recognition.continuous = true; recognition.interimResults = true;
    recognition.onstart = () => setCallStatus("listening");
    recognition.onresult = (event) => {
      let final = ""; let interim = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) final += event.results[i][0].transcript;
        else interim += event.results[i][0].transcript;
      }
      if (final) handleAutonomousAI(final);
      setInterimTranscript(interim);
    };
    recognition.onend = () => { if (callActive && callStatus !== "speaking" && callStatus !== "thinking") { try { recognition.start(); } catch(e) {} } };
    return recognition;
  };

  const startConsultation = async (type: "voice" | "video" | "ai", specialty: string = "General Agriculture", customPrompt?: string) => {
    if (isConnecting || callActive) return;
    setActiveSpecialty(specialty);
    if (agoraClient.connectionState !== "DISCONNECTED") { try { await agoraClient.leave(); } catch(e) {} }
    try {
      setIsConnecting(true); setCallActive(true); setTranscript([]); setCallStatus("connecting"); setIsCameraOff(type !== "video");
      await agoraClient.join(APP_ID, "expert-hub", null, null);
      let audio = null;
      try { audio = await AgoraRTC.createMicrophoneAudioTrack(); setLocalAudioTrack(audio); } catch (e) {
         if (e.message?.includes("Permission denied") || e.code === "PERMISSION_DENIED") {
           setIsConnecting(false); setShowPermissionHelp({ visible: true, type: 'mic', originalType: type }); throw e;
         }
      }
      let video = null;
      if (type === "video") {
        try { video = await AgoraRTC.createCameraVideoTrack(); setLocalVideoTrack(video); } catch (e) {
           if (e.message?.includes("Permission denied") || e.code === "PERMISSION_DENIED") {
             setIsConnecting(false); setShowPermissionHelp({ visible: true, type: 'camera', originalType: type }); throw e;
           }
        }
      }
      if (audio) await agoraClient.publish(video ? [audio, video] : [audio]);
      setCallStatus("idle");
      timerIntervalRef.current = setInterval(() => setTimer(prev => prev + 1), 1000);
      recognitionRef.current = initSpeechRecognition(); recognitionRef.current?.start();
      speakAutonomous(customPrompt || `Hello, I am your ${specialty} specialist. How can I help you today?`);
    } catch (err) { cleanupSession(); } finally { setIsConnecting(false); }
  };

  const cleanupSession = async () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (localAudioTrack) { localAudioTrack.stop(); localAudioTrack.close(); setLocalAudioTrack(null); }
    if (localVideoTrack) { localVideoTrack.stop(); localVideoTrack.close(); setLocalVideoTrack(null); }
    if (recognitionRef.current) { try { recognitionRef.current.stop(); } catch(e) {} recognitionRef.current = null; }
    if (synthesisRef.current) synthesisRef.current.cancel();
    try { await agoraClient.leave(); } catch(e) {}
    setCallActive(false); setCallStatus("idle"); setTranscript([]); setInterimTranscript(""); setTimer(0); setAudioTooLow(false);
  };

  const handleAutonomousAI = async (text) => {
    if (!text.trim()) return;
    setTranscript(prev => [...prev, { sender: 'user', text }]);
    setCallStatus("thinking"); setInterimTranscript("");
    setManualInput(""); // Clear the chat input box instantly as requested
    recognitionRef.current?.stop();
    try {
      // Force Absolute English mode in the request body
      const resp = await axios.post("/api/expert-consult", { 
        problemText: text, 
        language: "English",
        specialty: activeSpecialty 
      });
      setTranscript(prev => [...prev, { sender: 'ai', text: resp.data.reply }]);
      speakAutonomous(resp.data.reply);
    } catch (err) { setCallStatus("idle"); try { recognitionRef.current?.start(); } catch(e) {} }
  };

  const speakAutonomous = (text) => {
    if (!synthesisRef.current) { setCallStatus("idle"); try { recognitionRef.current?.start(); } catch(e) {} return; }
    synthesisRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.onstart = () => setCallStatus("speaking");
    utterance.onend = () => { setCallStatus("idle"); try { recognitionRef.current?.start(); } catch(e) {} };
    synthesisRef.current.speak(utterance);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="expert-hub-root min-h-screen bg-[#020617] text-white">
      <div className="relative min-h-screen pt-24 pb-20 font-sans overflow-x-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <section className="p-12 rounded-[2.5rem] bg-gradient-to-br from-[#064e3b] via-[#022c22] to-black border border-emerald-500/10 mb-12 text-center text-white overflow-hidden">
             <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Expert Help Hub</h1>
             <p className="text-emerald-200/40 text-lg max-w-2xl mx-auto">Talk naturally to our AI specialists for instant support.</p>
          </section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 text-white">
             {[{id:'ai',icon:BrainCircuit,title:"Talk to AI",color:"bg-emerald-600"},{id:'video',icon:Video,title:"Video Call",color:"bg-indigo-600"},{id:'voice',icon:Phone,title:"Voice Call",color:"bg-slate-600"},{id:'emergency',icon:AlertCircle,title:"Emergency",color:"bg-red-600"}].map((action) => (
               <motion.button 
                 key={action.id} 
                 disabled={isConnecting} 
                 whileHover={{ y: -8, scale: 1.05 }} 
                 onClick={() => {
                   if (action.id === 'emergency') setShowEmergency(true);
                   else if (action.id === 'ai') setShowAiAssistant(true);
                   else startConsultation(action.id as any, "General Agriculture");
                 }} 
                 className="p-8 rounded-[2rem] bg-white/5 border border-white/5 text-left group flex flex-col justify-between h-full shadow-2xl disabled:opacity-50"
               >
                  <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-2xl", action.color)}> {isConnecting && action.id !== 'emergency' && action.id !== 'ai' ? <Loader2 className="animate-spin text-white" /> : <action.icon className="h-7 w-7 text-white" />} </div>
                  <h3 className="text-white font-black text-xl mb-1">{action.title}</h3>
               </motion.button> ))}
          </div>
          <div className="mb-20 text-white">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {EXPERTS.map(expert => (
                  <Card key={expert.id} className="bg-white/5 border-white/5 rounded-[2.5rem] p-4 text-white">
                     <div className="relative h-72 rounded-[2rem] overflow-hidden mb-6"><img src={expert.image} className="w-full h-full object-cover" alt={expert.name} /><div className="absolute bottom-6 left-6 text-white"><h3 className="font-black text-2xl">{expert.name}</h3><p className="text-emerald-400 text-xs font-black uppercase tracking-widest">{expert.specialty}</p></div></div>
                     <div className="grid grid-cols-2 gap-3 pb-2 px-2">
                       <Button disabled={isConnecting} onClick={() => startConsultation("video", expert.specialty)} className="bg-emerald-600 hover:bg-emerald-700 h-12 font-black text-white">Video</Button>
                       <Button disabled={isConnecting} onClick={() => startConsultation("voice", expert.specialty)} variant="outline" className="bg-white/5 border-white/10 h-12 font-black text-white hover:bg-white/10">Voice</Button>
                     </div>
                  </Card> ))}
             </div>
          </div>
        </div>
      </div>
      <AnimatePresence> {showEmergency && ( <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/95 text-white"><Card className="w-full max-w-lg bg-black border border-red-500/20 rounded-[3rem] p-12 text-center text-white"><ShieldAlert className="h-20 w-20 bg-red-600 rounded-3xl mx-auto mb-8 p-4 text-white" /><h2 className="text-4xl font-black mb-4">Emergency Support</h2><div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8"><Button onClick={() => window.location.href = 'tel:18004251556'} className="p-8 h-20 rounded-[2.5rem] bg-white/5 font-black uppercase">CALL GOVT</Button><Button onClick={() => { setShowEmergency(false); startConsultation('video', "Severe emergency."); }} className="p-8 h-20 rounded-[2.5rem] bg-emerald-600 font-black uppercase text-white">AI SCAN</Button></div><button onClick={() => setShowEmergency(false)} className="mt-8 text-white/40">Close</button></Card></div> )} </AnimatePresence>
      <AnimatePresence> {showPermissionHelp?.visible && ( <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/98 text-white"><Card className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-[3rem] p-10 text-center text-white"><div className="h-20 w-20 bg-blue-600 rounded-3xl mx-auto mb-8 flex items-center justify-center"><Lock className="h-10 w-10 text-white" /></div><h3 className="text-3xl font-black mb-2">Access Required</h3><p className="text-white/40 mb-10">Please grant {showPermissionHelp.type} access.</p><div className="grid grid-cols-2 gap-4"><Button onClick={() => { setShowPermissionHelp(null); startConsultation(showPermissionHelp.originalType); }} className="bg-emerald-600 h-14 rounded-2xl font-black text-white">Retry</Button><Button variant="outline" onClick={() => { setShowPermissionHelp(null); cleanupSession(); }} className="h-14 rounded-2xl font-black text-white">Cancel</Button></div></Card></div> )} </AnimatePresence>
      <AnimatePresence>
        {callActive && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#020617] flex flex-col md:flex-row overflow-hidden text-white">
            {/* MAIN VIDEO AREA */}
            <div className="flex-1 relative bg-black flex flex-col">
              <div className="p-6 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-md z-50">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white/90">Expert Multi-Link</h4>
                    <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      ENCRYPTION ACTIVE
                    </p>
                  </div>
                </div>
                <div className="px-5 py-1.5 bg-white/5 rounded-xl border border-white/10 text-lg font-mono tracking-widest">
                  {Math.floor(timer/60)}:{String(timer%60).padStart(2,'0')}
                </div>
              </div>

              <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=2000" 
                  className={cn("absolute inset-0 w-full h-full object-cover transition-all duration-1000", callStatus === 'speaking' ? 'scale-110 blur-[80px] opacity-30' : 'scale-100 blur-[100px] opacity-10')} 
                  alt="Background" 
                />
                
                {/* AI STATE VISUALIZATIONS */}
                <div className="relative z-20 flex flex-col items-center gap-8">
                  {callStatus === 'speaking' && (
                    <div className="flex items-end gap-1.5 h-32">
                      {[...Array(15)].map((_, i) => (
                        <motion.div 
                          key={i} 
                          animate={{ height: [20, 80 + Math.random() * 60, 20] }} 
                          transition={{ repeat: Infinity, duration: 0.3 + Math.random() * 0.4 }} 
                          className="w-2.5 bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)]" 
                        />
                      ))}
                    </div>
                  )}
                  
                  {callStatus === 'listening' && (
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1], opacity: [0.4, 1, 0.4] }} 
                      transition={{ repeat: Infinity, duration: 1.5 }} 
                      className="h-48 w-48 rounded-full border-2 border-emerald-500/30 flex items-center justify-center relative"
                    >
                      <div className="absolute inset-0 rounded-full animate-ping bg-emerald-500/10" />
                      <Mic className={cn("h-16 w-16", audioTooLow ? "text-yellow-500" : "text-emerald-400")} />
                    </motion.div>
                  )}

                  {callStatus === 'thinking' && (
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
                      <p className="text-xs font-bold tracking-[0.2em] text-blue-400 animate-pulse">ANALYZING...</p>
                    </div>
                  )}
                </div>

                {/* LOCAL VIDEO PREVIEW */}
                <div className="absolute bottom-6 right-6 w-32 h-44 md:w-48 md:h-64 bg-slate-900 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl z-40">
                  {isCameraOff ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                      <CameraOff className="h-8 w-8 text-white/10" />
                    </div>
                  ) : (
                    <div ref={localPlayerRef} className="h-full w-full bg-black" />
                  )}
                </div>
              </div>

              {/* CALL CONTROLS */}
              <div className="p-8 bg-gradient-to-t from-black to-transparent flex justify-center items-center gap-4 md:gap-10 z-50">
                <button 
                  onClick={() => setIsMuted(!isMuted)} 
                  className={cn("h-16 w-16 md:h-20 md:w-20 rounded-2xl flex items-center justify-center transition-all", isMuted ? "bg-red-500/20 border border-red-500 text-red-500" : "bg-white/5 border border-white/10 text-white")}
                >
                  {isMuted ? <MicOff /> : <Mic />}
                </button>

                <button 
                  onClick={cleanupSession} 
                  className="h-16 md:h-20 px-8 md:px-14 bg-red-600 hover:bg-red-700 rounded-3xl flex items-center gap-4 text-white font-black uppercase text-sm md:text-lg shadow-2xl shadow-red-900/40 transition-transform active:scale-95 group"
                >
                  <PhoneOff className="h-6 w-6 group-hover:rotate-12 transition-transform" /> 
                  End Call
                </button>

                <button 
                  onClick={() => setIsCameraOff(!isCameraOff)} 
                  className={cn("h-16 w-16 md:h-20 md:w-20 rounded-2xl flex items-center justify-center transition-all", isCameraOff ? "bg-red-500/20 border border-red-500 text-red-500" : "bg-white/5 border border-white/10 text-white")}
                >
                  {isCameraOff ? <CameraOff /> : <Camera />}
                </button>
              </div>
            </div>

            {/* INTEGRATED CHAT SIDEBAR / OVERLAY */}
            <div className="w-full md:w-[450px] bg-[#020617] border-l border-white/5 flex flex-col relative z-[60]">
               <div className="p-6 border-b border-white/5 flex items-center justify-between">
                 <h5 className="font-bold flex items-center gap-2">
                   <Send className="h-4 w-4 text-emerald-500" />
                   Call Chatbox
                 </h5>
                 <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full font-mono">LIVE SYNC</span>
               </div>

               <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
                 {transcript.length === 0 && (
                   <div className="h-full flex flex-col items-center justify-center text-center opacity-30 gap-4">
                     <BrainCircuit className="h-12 w-12" />
                     <p className="text-sm">Your conversation will appear here...</p>
                   </div>
                 )}
                 {transcript.map((m, i) => (
                   <div key={i} className={cn("flex", m.sender === 'user' ? 'justify-end' : 'justify-start')}>
                     <div className={cn(
                       "max-w-[85%] px-5 py-3 rounded-2xl text-sm font-medium",
                       m.sender === 'user' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-white/90 border border-white/5'
                     )}>
                       {m.text}
                     </div>
                   </div>
                 ))}
                 {interimTranscript && (
                   <div className="flex justify-end opacity-50">
                     <div className="bg-emerald-600/30 px-5 py-3 rounded-2xl text-sm italic">{interimTranscript}...</div>
                   </div>
                 )}
               </div>

               <div className="p-6 bg-black/40 border-t border-white/10">
                 <div className="relative">
                    <Input 
                      placeholder="Type your question..." 
                      value={manualInput} 
                      onChange={(e) => setManualInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAutonomousAI(manualInput)}
                      className="h-14 bg-white/5 rounded-xl border-white/10 pr-14 font-medium text-white focus:ring-emerald-500/50" 
                    />
                    <button 
                      onClick={() => {
                        if (manualInput.trim()) {
                          handleAutonomousAI(manualInput);
                          setManualInput("");
                        }
                      }} 
                      className="absolute right-1 top-1 h-12 w-12 bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center justify-center text-white transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                 </div>
                 <p className="mt-4 text-[10px] text-white/30 text-center uppercase tracking-[0.2em]">Speech-to-Text Enabled</p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showAiAssistant && (
          <SmartAiAssistant onClose={() => setShowAiAssistant(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default ExpertHelpFull;
