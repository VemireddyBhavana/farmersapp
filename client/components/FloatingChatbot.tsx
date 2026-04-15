import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, MessageCircle } from "lucide-react";
import { useLanguage, Language } from "../lib/LanguageContext";
import { translations } from "../lib/translations";

export const FloatingChatbot = () => {
    const { language: globalLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ id: number; text: string; sender: 'bot' | 'user'; time: string }[]>([]);
    const [input, setInput] = useState("");

    const { t: tl } = useLanguage();

    // Initial Welcome Message
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{
                id: 1,
                text: tl("botWelcome") + "\n" + tl("botOffer"),
                sender: "bot",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }
    }, []);

    const generateBotResponse = (userText: string) => {
        const lowerText = userText.toLowerCase();

        const matchKeywords = (keywordKey: string) => {
            const keywords = tl(keywordKey).split(',').map(k => k.trim().toLowerCase());
            return keywords.some(k => lowerText.includes(k));
        };

        if (matchKeywords("guidanceKeywords")) return tl("botGuidanceReply");
        if (matchKeywords("rentKeywords")) return tl("botRentReply");
        if (matchKeywords("schemeKeywords")) return tl("botSchemeReply");
        if (matchKeywords("cropKeywords")) return tl("botCropReply");
        if (matchKeywords("pestKeywords")) return tl("botPestReply");
        if (matchKeywords("marketKeywords")) return tl("botMarketReply");

        return tl("botFallback");
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const userMessage = { id: Date.now(), text: input, sender: 'user' as const, time: currentTime };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        setTimeout(() => {
            const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const botResponse = generateBotResponse(userMessage.text);
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, text: botResponse, sender: 'bot', time: responseTime }
            ]);
        }, 600);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-4 md:right-8 w-[380px] max-w-[calc(100vw-2rem)] bg-card rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border border-primary/10 z-50 font-sans backdrop-blur-xl"
                        style={{ height: '600px', maxHeight: 'calc(100vh - 8rem)' }}
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 flex flex-col shrink-0 rounded-t-[2rem]">
                            <div className="flex items-center justify-between text-primary-foreground mb-1">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md shadow-sm border border-white/10">
                                        <Bot className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[19px] leading-tight flex items-center gap-2">{tl("aiAssistantTitle")}</h3>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                                            <p className="text-primary-foreground/80 text-xs font-medium tracking-wide">{tl("aiAssistantOnline")}</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-[1.5rem] p-4 text-[15px] leading-relaxed relative shadow-sm border transition-all ${msg.sender === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-tr-none border-primary'
                                            : 'bg-muted/50 text-foreground rounded-tl-none border-border'
                                            }`}
                                        style={{ whiteSpace: 'pre-wrap' }}
                                    >
                                        {msg.text}
                                    </div>
                                    <span className={`text-xs mt-1.5 font-bold ${msg.sender === 'user' ? 'text-muted-foreground mr-1' : 'text-primary/60 ml-1'}`}>
                                        {msg.time}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-muted/20 border-t border-border shrink-0">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder={tl("chatPlaceholder")}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="w-full h-[54px] pl-5 pr-14 rounded-full border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground bg-background placeholder:text-muted-foreground transition-all shadow-inner"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="absolute right-2.5 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-30 shadow-md active:scale-95"
                                >
                                    <Send className="w-4 h-4 ml-0.5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                className={`fixed bottom-6 right-4 md:right-8 w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-[0_12px_40px_rgba(16,185,129,0.3)] border border-white/10 flex items-center justify-center hover:bg-primary/90 transition-all z-50 group ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
                whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    boxShadow: "0 15px 45px rgba(16,185,129,0.4)"
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
            >
                <div className="relative">
                    <MessageCircle className="w-9 h-9 brightness-110 drop-shadow-sm" strokeWidth={2.2} />
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-primary animate-bounce shadow-sm" />
                </div>
            </motion.button>
        </>
    );
};
