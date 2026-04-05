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

    // Force English always as requested
    const tl = (key: string) => {
        return translations["English"]?.[key] || key;
    };

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
                        className="fixed bottom-24 right-4 md:right-8 w-[380px] max-w-[calc(100vw-2rem)] bg-[#F8F9F5] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-emerald-900/10 z-50 font-sans"
                        style={{ height: '600px', maxHeight: 'calc(100vh - 8rem)' }}
                    >
                        {/* Header */}
                        <div className="bg-[#106A3A] p-4 flex flex-col shrink-0 rounded-t-3xl">
                            <div className="flex items-center justify-between text-white mb-1">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-sm border border-white/10">
                                        <Bot className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[19px] leading-tight flex items-center gap-2">{tl("aiAssistantTitle")}</h3>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-[#34D399]"></div>
                                            <p className="text-emerald-100 text-xs font-medium tracking-wide">{tl("aiAssistantOnline")}</p>
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
                                        className={`max-w-[85%] rounded-[1.25rem] p-4 text-[15px] leading-relaxed relative shadow-sm border ${msg.sender === 'user'
                                            ? 'bg-[#106A3A] text-white rounded-tr-sm border-[#106A3A]'
                                            : 'bg-[#F2F4E6] text-[#2D3748] rounded-tl-sm border-[#E2E8D5]'
                                            }`}
                                        style={{ whiteSpace: 'pre-wrap' }}
                                    >
                                        {msg.text}
                                    </div>
                                    <span className={`text-xs mt-1.5 font-bold ${msg.sender === 'user' ? 'text-gray-400 mr-1' : 'text-[#507E65] ml-1'}`}>
                                        {msg.time}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder={tl("chatPlaceholder")}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="w-full h-[52px] pl-5 pr-14 rounded-full border border-gray-200 focus:outline-none focus:border-[#106A3A] focus:ring-1 focus:ring-[#106A3A] text-gray-700 bg-gray-50 placeholder:text-gray-400"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="absolute right-2 w-10 h-10 rounded-full bg-[#106A3A] flex items-center justify-center text-white hover:bg-[#0A4A28] transition-colors disabled:opacity-50 disabled:hover:bg-[#106A3A]"
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
                className={`fixed bottom-6 right-4 md:right-8 w-16 h-16 rounded-full bg-[#106A3A] text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#0A4A28]/20 flex items-center justify-center hover:bg-[#0D5B31] transition-colors z-50 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
            >
                <div className="relative">
                    <MessageCircle className="w-8 h-8 translate-y-[-1px] translate-x-[-1px]" strokeWidth={2.5} />
                </div>
            </motion.button>
        </>
    );
};
