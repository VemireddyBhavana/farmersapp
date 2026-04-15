import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Bot, Loader2, Sparkles, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: any;
}

const MentorChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose, mentor }) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && mentor) {
      setMessages([
        { role: "assistant", content: t("greeting", { name: mentor.name, specialty: mentor.specialty }) }
      ]);
    }
  }, [isOpen, mentor, t]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = { role: "user", content: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsThinking(true);

    try {
      console.log("📡 [Expert Hub] Sending message to AI with mentor context:", mentor?.name);
      const response = await axios.post("/api/ai", {
        messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
        mode: "farmer",
        mentor: mentor
      });

      setMessages(prev => [...prev, { role: "assistant", content: response.data.reply }]);
    } catch (err) {
      console.error("❌ [Expert Hub] Chat Error:", err);
      setMessages(prev => [...prev, { role: "assistant", content: t("errorConnecting") }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            className="w-full max-w-2xl h-[80vh] bg-white rounded-[3rem] shadow-2xl flex flex-col overflow-hidden text-slate-900"
          >
            {/* Chat Header (Image 3 style) */}
            <div className="px-8 py-6 bg-primary text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full border-2 border-white/20 p-0.5 bg-white overflow-hidden shadow-xl">
                  <img src={mentor?.image} className="h-full w-full object-cover rounded-full" alt={mentor?.name} />
                </div>
                <div>
                  <h3 className="text-xl font-black">{mentor?.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/70">{t("mentorOnline")}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="h-12 w-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar scroll-smooth bg-slate-50/50">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={cn("flex", msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div className={cn(
                    "max-w-[85%] px-6 py-4 rounded-[1.8rem] text-sm font-semibold shadow-sm leading-relaxed",
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  )}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isThinking && (
                <div className="flex items-center gap-3 text-primary ml-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{t("thinking")}</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-8 bg-white border-t border-slate-100">
              <div className="relative flex items-center gap-2 bg-slate-50 p-2 rounded-full border border-slate-200 focus-within:border-primary transition-all">
                <Input 
                   value={inputText}
                   onChange={(e) => setInputText(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                   placeholder={t("typeMessage")}
                   className="flex-1 bg-transparent border-none text-slate-800 h-14 focus-visible:ring-0 text-base font-bold px-6"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isThinking}
                  className="h-14 w-14 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MentorChatInterface;
