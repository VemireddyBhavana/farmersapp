import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, Mic, MicOff, Volume2, VolumeX, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/LanguageContext";
import { useAuth } from "@/lib/AuthContext";
import { cn } from "@/lib/utils";
import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface CallInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: any;
}

const MentorCallInterface: React.FC<CallInterfaceProps> = ({ isOpen, onClose, mentor }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Timer effect
  useEffect(() => {
    let timer: any;
    if (isOpen) {
      setSeconds(0);
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isOpen]);

  // Voice Output (SpeechSynthesis)
  const speak = (text: string) => {
    if (!speakerOn) return;
    if (!("speechSynthesis" in window)) return;
    
    window.speechSynthesis.cancel(); // Stop ongoing speech
    
    // Clean text from markdown notations before speaking
    const cleanText = text.replace(/[*#_`~]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "en-IN"; // English (Indian accent)
    utterance.rate = 0.85;

    window.speechSynthesis.speak(utterance);
  };

  // Format time (e.g. 0:04)
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Initialize first greeting
  useEffect(() => {
    if (isOpen && mentor) {
      const specialty = mentor.specialty || "agricultural topics";
      const greeting = `Hello! I'm ${mentor.name}. I'm here to help you with ${specialty} Options. Feel free to ask me any questions or doubts you have about your cultivation. What would you like to know?`;
      
      setMessages([
        { role: "assistant", content: greeting }
      ]);
      
      // Let the assistant speak the greeting
      setTimeout(() => {
        speak(greeting);
      }, 500);
    }
  }, [isOpen, mentor]);

  // Cleanup speech synthesis on close
  useEffect(() => {
    if (!isOpen) {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = { role: "user", content: inputText };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsThinking(true);

    try {
      console.log("📡 [Expert Call] Sending query to AI for mentor:", mentor?.name);
      const response = await axios.post("/api/ai", {
        messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        mode: "farmer",
        mentor: mentor
      });

      const reply = response.data.reply;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      speak(reply);
    } catch (err) {
      console.error("❌ [Expert Call] Error:", err);
      const errorMsg = "Sorry, I am having trouble connecting to the network right now. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
      speak(errorMsg);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            className="w-full max-w-2xl h-[80vh] bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden text-slate-900"
          >
            {/* Header section matching screenshot */}
            <div className="px-8 py-6 bg-indigo-600 text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center text-white">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold">{mentor?.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="h-2.5 w-2.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs text-white/80 font-bold">
                      Live Call • {formatTime(seconds)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMuted(!muted)}
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center transition-all",
                    muted ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30"
                  )}
                  title={muted ? "Unmute Mic" : "Mute Mic"}
                >
                  {muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => {
                    const nextSpeaker = !speakerOn;
                    setSpeakerOn(nextSpeaker);
                    if (!nextSpeaker) {
                      window.speechSynthesis.cancel();
                    }
                  }}
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center transition-all",
                    !speakerOn ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30"
                  )}
                  title={speakerOn ? "Mute Speaker" : "Unmute Speaker"}
                >
                  {speakerOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar bg-slate-50/50 flex flex-col"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] px-5 py-3.5 rounded-2xl text-sm font-semibold shadow-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none"
                        : "bg-white text-slate-800 rounded-tl-none border border-slate-100"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex items-center gap-3 text-indigo-600 ml-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Mentor is thinking...
                  </span>
                </div>
              )}
            </div>

            {/* Input & End Call Footer */}
            <div className="p-6 bg-white border-t border-slate-100 flex flex-col">
              <div className="flex items-center gap-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask your question..."
                  className="flex-1 h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-semibold focus-visible:ring-indigo-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isThinking}
                  className="h-12 w-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg active:scale-95 transition-transform disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>

              {/* Outlined Red End Call Button */}
              <button
                onClick={onClose}
                className="w-full h-12 border border-red-500 hover:bg-red-50 text-red-500 rounded-xl font-bold transition-colors mt-4 text-sm tracking-wide"
              >
                End Call
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MentorCallInterface;
