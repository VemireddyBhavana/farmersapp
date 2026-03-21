import { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft, MoreVertical, Phone, Video, Search, Paperclip, Smile, Mic, Check, CheckCheck, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLanguage, Language } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

interface Message {
    id: string;
    role: "user" | "bot";
    content: string;
    timestamp: string;
    status?: "sent" | "delivered" | "read";
}

const languages: { name: Language; label: string }[] = [
    { name: "English", label: "En" },
    { name: "Telugu", label: "తె" },
    { name: "Hindi", label: "हि" },
    { name: "Tamil", label: "த" },
    { name: "Kannada", label: "ಕ" },
    { name: "Malayalam", label: "മല" },
    { name: "Marathi", label: "म" },
    { name: "Gujarati", label: "ગુ" },
    { name: "Punjabi", label: "ਪੰ" },
    { name: "Bangla", label: "ব" },
];

const WhatsAppChat = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { language: globalLanguage } = useLanguage();
    const [localLanguage, setLocalLanguage] = useState<Language>(globalLanguage);
    const phone = searchParams.get("phone") || "User";
    const initialMessageParam = searchParams.get("initialMessage");

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const tl = (key: string) => {
        return translations[localLanguage]?.[key] || translations["English"]?.[key] || key;
    };

    useEffect(() => {
        // Initial greeting if coming from SeedsBuyer
        if (initialMessageParam === "true" && messages.length === 0) {
            const initialGreeting: Message = {
                id: Date.now().toString(),
                role: "bot",
                content: `👋 ${tl("botWelcome")}\n\nAsk me about:\n- 🚜 ${tl("rentTractor")}\n- 🌾 ${tl("cropAdvice")}\n- 📈 ${tl("marketRatesLabel")}\n- 🐛 ${tl("pestControl")}`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages([initialGreeting]);
        }
    }, [initialMessageParam, phone, messages.length, localLanguage]);

    // Update greeting retroactively if language changes and it was the only message
    useEffect(() => {
        if (messages.length === 1 && messages[0].role === "bot") {
            setMessages(prev => [{
                ...prev[0],
                content: `👋 ${tl("botWelcome")}\n\nAsk me about:\n- 🚜 ${tl("rentTractor")}\n- 🌾 ${tl("cropAdvice")}\n- 📈 ${tl("marketRatesLabel")}\n- 🐛 ${tl("pestControl")}`,
            }]);
        }
    }, [localLanguage]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const generateBotResponse = (userText: string) => {
        const lowerText = userText.toLowerCase();

        if (lowerText.includes("rent") || lowerText.includes("tractor") || lowerText.includes("అద్దె") || lowerText.includes("किराया")) {
            return tl("botRentReply");
        }
        if (lowerText.includes("scheme") || lowerText.includes("ysr") || lowerText.includes("kisan") || lowerText.includes("పథకాలు") || lowerText.includes("योजना")) {
            return tl("botSchemeReply");
        }
        if (lowerText.includes("tomato") || lowerText.includes("టమోటా") || lowerText.includes("టమాటర్") || lowerText.includes("paddy") || lowerText.includes("rice") || lowerText.includes("వరి") || lowerText.includes("धान") || lowerText.includes("cotton") || lowerText.includes("పత్తి") || lowerText.includes("कपास")) {
            return tl("botCropReply");
        }
        if (lowerText.includes("pest") || lowerText.includes("disease") || lowerText.includes("కీటకాలు") || lowerText.includes("कीट")) {
            return tl("botPestReply");
        }
        if (lowerText.includes("price") || lowerText.includes("mandi") || lowerText.includes("rate") || lowerText.includes("ధరలు") || lowerText.includes("मार्केट")) {
            return tl("botMarketReply");
        }
        if (lowerText.includes("advice") || lowerText.includes("ಸಲಹೆ") || lowerText.includes("సలహా") || lowerText.includes("सलाह")) {
            return tl("botGuidanceReply");
        }

        // Default fallback
        return tl("botFallback");
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "read",
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate bot thinking delay
        setTimeout(() => {
            setIsTyping(false);
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: generateBotResponse(userMessage.content),
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, botResponse]);
        }, 1500);
    };

    return (
        <div className="flex h-screen w-full flex-col bg-[#efeae2] font-sans">
            {/* WhatsApp Green Top Bar & Language Selector */}
            <div className="flex flex-col bg-[#008f6f] text-white shadow-md z-10 relative">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:bg-white/10 rounded-full h-10 w-10 shrink-0">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="h-10 w-10 rounded-full bg-[#128C7E] overflow-hidden flex items-center justify-center border border-emerald-400/30 shrink-0 relative">
                                <Bot className="h-6 w-6 text-white" />
                                <div className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-[#128C7E]"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-lg leading-tight">{tl("agriAssistant")}</span>
                                <span className="text-xs text-emerald-100">{isTyping ? "typing..." : "online"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-10 w-10 hidden sm:flex shrink-0">
                            <Video className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-10 w-10 hidden sm:flex shrink-0">
                            <Phone className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-10 w-10 shrink-0">
                            <MoreVertical className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Language Selection Bar (Integrated into header) */}
                <div className="flex justify-start bg-[#00a884] px-4 py-2 text-[11px] sm:text-xs font-medium overflow-x-auto no-scrollbar gap-2 shadow-inner border-t border-white/10">
                    <span className="flex items-center text-white/80 shrink-0 mr-1">{tl("languageLabel")}:</span>
                    {languages.map((lang) => (
                        <span
                            key={lang.name}
                            onClick={() => setLocalLanguage(lang.name)}
                            className={cn(
                                "cursor-pointer px-2.5 py-1 rounded-full transition-colors whitespace-nowrap shrink-0 border shadow-sm",
                                localLanguage === lang.name ? "bg-white text-[#00a884] border-white font-bold" : "bg-[#128C7E] border-transparent hover:bg-[#128C7E]/80 text-white"
                            )}
                        >
                            {lang.label} ({lang.name})
                        </span>
                    ))}
                </div>
            </div>

            {/* Chat Area (WhatsApp Background Pattern implied by color) */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto p-4 md:p-8 space-y-3"
            >
                {/* Encryption notice */}
                <div className="flex justify-center mb-6">
                    <div className="bg-[#ffeecd] text-emerald-900/70 text-xs px-4 py-1.5 rounded-lg shadow-sm font-medium flex items-center gap-2 max-w-sm text-center">
                        🔒 Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
                    </div>
                </div>

                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "flex w-full",
                                msg.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "relative max-w-[85%] md:max-w-[70%] px-3 py-2 text-[15px] shadow-sm whitespace-pre-wrap",
                                    msg.role === "user"
                                        ? "bg-[#d9fdd3] text-[#111b21] rounded-lg rounded-tr-none"
                                        : "bg-white text-[#111b21] rounded-lg rounded-tl-none"
                                )}
                            >
                                {/* Tail for bubbles */}
                                <div className={cn(
                                    "absolute top-0 w-3 h-3",
                                    msg.role === "user"
                                        ? "-right-2 bg-[#d9fdd3] [clip-path:polygon(0_0,0%_100%,100%_0)]"
                                        : "-left-2 bg-white [clip-path:polygon(100%_0,100%_100%,0_0)]"
                                )} />

                                <div className="pb-3 leading-relaxed">
                                    {msg.content}
                                </div>

                                <div className="absolute bottom-1 right-2 flex items-center gap-1 text-[11px] text-muted-foreground bg-transparent">
                                    {msg.timestamp}
                                    {msg.role === "user" && msg.status === "read" && (
                                        <CheckCheck className="h-4 w-4 text-blue-500 ml-0.5" />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex w-full justify-start"
                    >
                        <div className="relative bg-white text-[#111b21] rounded-lg rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1">
                            <div className="absolute top-0 -left-2 w-3 h-3 bg-white [clip-path:polygon(100%_0,100%_100%,0_0)]" />
                            <div className="h-2 w-2 bg-emerald-400 rounded-full animate-bounce"></div>
                            <div className="h-2 w-2 bg-emerald-400 rounded-full animate-bounce delay-75"></div>
                            <div className="h-2 w-2 bg-emerald-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
            <div className="bg-[#f0f2f5] px-3 py-3 w-full flex items-center gap-2">
                <div className="flex items-center gap-2 sm:gap-4 shrink-0 px-2 text-slate-500">
                    <Smile className="h-6 w-6 cursor-pointer hover:text-slate-700" />
                    <Paperclip className="h-5 w-5 cursor-pointer hover:text-slate-700 -rotate-45" />
                </div>

                <form
                    className="flex-1 flex"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                >
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type a message"
                        className="flex-1 rounded-3xl bg-white border-none py-6 px-4 text-[15px] shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </form>

                <div className="shrink-0 pl-1">
                    {inputValue.trim() ? (
                        <div
                            onClick={handleSend}
                            className="h-[46px] w-[46px] rounded-full bg-[#00a884] shadow-sm flex items-center justify-center cursor-pointer hover:bg-[#008f6f] transition-colors"
                        >
                            <Send className="h-5 w-5 text-white ml-1" />
                        </div>
                    ) : (
                        <div className="h-[46px] w-[46px] rounded-full flex items-center justify-center text-slate-500 cursor-pointer hover:text-slate-700">
                            <Mic className="h-6 w-6" />
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default WhatsAppChat;
