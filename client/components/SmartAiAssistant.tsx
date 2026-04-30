import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, MicOff, Camera, X, Paperclip, Loader2, User, Bot, Sparkles, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import axios from "axios";

interface Message {
  role: "user" | "ai";
  text: string;
  image?: string;
  timestamp: string;
}

const SmartAiAssistant = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hello! I am your Smart Farming Assistant. You can speak to me, type your problem, or upload a photo of your crop for instant analysis.", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { i18n } = useTranslation();

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  // COMPLETE SILENCE ON CLOSE: Forcefully stop all speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
    };
  }, []);

  // Language Mapping for Speech Recognition
  const langMap: { [key: string]: string } = {
    en: "en-IN",
    hi: "hi-IN",
    te: "te-IN",
    ta: "ta-IN",
    kn: "kn-IN",
    ml: "ml-IN",
    mr: "mr-IN",
    bn: "bn-IN",
    gu: "gu-IN",
    pa: "pa-IN"
  };

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    utterance.lang = langMap[i18n.language] || i18n.language;
    window.speechSynthesis.speak(utterance);
  };

  // Continuous Voice Logic
  const startVoiceSession = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Please use Chrome or Edge for voice features.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      recognitionRef.current = null;
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    
    recognition.lang = langMap[i18n.language] || i18n.language;

    recognition.onstart = () => {
      setIsListening(true);
      console.log("🎤 [Voice] Listening started...");
    };

    recognition.onresult = (event: any) => {
      const text = event.results[event.results.length - 1][0].transcript;
      console.log("🎤 [Voice] Result:", text);
      handleSendMessage(text);
    };

    recognition.onerror = (event: any) => {
      console.error("❌ [Voice] Error:", event.error);
      setIsListening(false);
      recognitionRef.current = null;
      if (event.error === 'not-allowed') {
        alert("Microphone access denied. Please enable it in browser settings.");
      } else {
        alert("Voice recognition error: " + event.error);
      }
    };

    recognition.onend = () => {
      console.log("🎤 [Voice] Session ended.");
      if (isListening) {
        console.log("🔄 [Voice] Restarting...");
        try { recognition.start(); } catch(e) {} 
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (text?: string) => {
    const query = text || inputText;
    if (!query && !selectedImage) return;

    const newMessage: Message = {
      role: "user",
      text: query,
      image: selectedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText("");
    setSelectedImage(null);
    setIsThinking(true);

    try {
      console.log("📡 [Assistant] Sending request to /api/smart-assistant...");
      const response = await axios.post("/api/smart-assistant", {
        text: query,
        imageData: newMessage.image,
        language: currentLang
      }, { 
        timeout: 25000,
        headers: { "Content-Type": "application/json" }
      });

      console.log("✅ [Assistant] Response received:", response.status);
      const aiReply = response.data.reply;
      const aiMessage: Message = {
        role: "ai",
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
      speak(aiReply);
    } catch (err: any) {
      console.error("❌ [Assistant] CONNECTION ERROR:", {
        message: err.message,
        code: err.code,
        status: err.response?.status,
        data: err.response?.data
      });
      
      let errorText = "⚠️ Connection issue. I couldn't reach the intelligence engine. Please check your internet or type your problem again.";
      if (err.response?.status === 413) errorText = "⚠️ Image too large. Please upload a smaller photo.";
      if (err.response?.status === 500) errorText = "⚠️ Intelligence engine is busy. Please try again in a few seconds.";
      
      const errorMessage: Message = {
        role: "ai",
        text: errorText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10 pointer-events-none"
    >
      <Card className="w-full max-w-4xl h-[85vh] bg-[#020617]/95 backdrop-blur-2xl border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)] flex flex-col pointer-events-auto overflow-hidden rounded-[2.5rem]">
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/40">
              <Sparkles className="text-white h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Smart AI Assistant</h2>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs text-emerald-400/60 font-bold uppercase tracking-wider">Online & Listening</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="h-10 w-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-colors border border-white/5"
          >
            <X className="text-white/60 h-5 w-5" />
          </button>
        </div>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scroll-smooth"
        >
          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              key={i}
              className={cn(
                "flex flex-col max-w-[85%] md:max-w-[70%]",
                msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div className={cn(
                "p-5 rounded-[2rem] shadow-xl border relative",
                msg.role === "user" 
                  ? "bg-emerald-600 border-emerald-500 text-white rounded-tr-none" 
                  : "bg-white/5 border-white/5 text-emerald-50 rounded-tl-none backdrop-blur-md"
              )}>
                {msg.image && (
                  <img src={msg.image} alt="Upload" className="w-full rounded-2xl mb-4 border border-white/10" />
                )}
                <p className="text-sm md:text-base font-medium leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </p>
                <span className={cn(
                  "text-[10px] uppercase font-black mt-3 block opacity-40 tracking-widest",
                  msg.role === "user" ? "text-white text-right" : "text-emerald-400"
                )}>
                  {msg.timestamp}
                </span>
              </div>
            </motion.div>
          ))}
          {isThinking && (
            <div className="flex items-center gap-3 text-emerald-400/40">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-black uppercase tracking-tighter">AI is thinking...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-6 md:p-10 bg-black/40 border-t border-white/5">
          <AnimatePresence>
            {selectedImage && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mb-4 relative h-20 w-20"
              >
                <img src={selectedImage} className="h-full w-full object-cover rounded-xl border-2 border-emerald-500" alt="Selected" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
                >
                  <X size={12} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3 bg-white/5 p-2 rounded-3xl border border-white/10 shadow-2xl">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="h-12 w-12 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all text-white/60 hover:text-white border border-white/5"
            >
              <Camera size={20} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleImageSelect} 
              accept="image/*" 
            />
            
            <Input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Describe your crop problem..."
              className="flex-1 bg-transparent border-none text-white placeholder:text-white/20 h-12 focus-visible:ring-0 text-base font-bold px-4"
            />

            <button 
              onClick={startVoiceSession}
              className={cn(
                "h-12 w-12 rounded-2xl flex items-center justify-center transition-all shadow-lg",
                isListening ? "bg-red-500 animate-pulse" : "bg-indigo-600 hover:bg-indigo-700"
              )}
            >
              {isListening ? <MicOff className="text-white" size={20} /> : <Mic className="text-white" size={20} />}
            </button>

            <Button 
              onClick={() => handleSendMessage()}
              className="h-12 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-xs tracking-widest shadow-lg shadow-emerald-900/40"
            >
              <Send size={18} className="mr-2" />
              Send
            </Button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6 text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2"><Languages size={12} /> Auto-Language</span>
            <span className="flex items-center gap-2"><Bot size={12} /> GPT-4o-Mini</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SmartAiAssistant;
