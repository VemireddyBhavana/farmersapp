import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, MessageCircle } from "lucide-react";

export const FloatingChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ id: number; text: string; sender: 'bot' | 'user'; time: string }[]>([
        {
            id: 1,
            text: "Namaste! I am your AI Farming Assistant.\nHow can I help you today? I can help with tractor booking, crop advice, or market rates.",
            sender: "bot",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [input, setInput] = useState("");
    const [selectedLang, setSelectedLang] = useState("En");

    const languages = ["En", "తె", "हि", "த", "ಕ", "മല", "म", "ગુ", "ਪੰ", "ব"];

    const generateBotResponse = (userText: string) => {
        const lowerText = userText.toLowerCase();

        if (lowerText.includes("farmer guidance") || lowerText.includes("guidance") || lowerText.includes("advice")) {
            return "It's great to hear that you're looking for farming guidance. I can help you with crop planting schedules, disease management, and getting the best prices at local Mandis. What specific area do you need help with?";
        }
        if (lowerText.includes("rent") || lowerText.includes("tractor")) {
            return `🚜 Equipment Rental Process:\n1. Find Equipment: Browse our marketplace.\n2. Check Rates & Availability.\n3. Book & Pay securely.\n4. Coordinate Delivery/Pickup.`;
        }
        if (lowerText.includes("scheme") || lowerText.includes("ysr") || lowerText.includes("kisan")) {
            return `📋 Government Schemes Overview:\n• PM-KISAN: ₹6000 per year.\n• PMFBY (Crop Insurance).\n• State Specific (e.g., YSR Rythu Bharosa).`;
        }
        if (lowerText.includes("tomato") || lowerText.includes("paddy") || lowerText.includes("cotton")) {
            return `Please check out our "Detailed Blueprint" in the Seeds Store for in-depth growing guides on specific crops!`;
        }
        if (lowerText.includes("pest") || lowerText.includes("disease")) {
            return `🦠 Identifying the disease is critical. Take a clear photo of the leaf using our built-in Disease Scanner on the home page for an instant diagnosis.`;
        }
        if (lowerText.includes("price") || lowerText.includes("mandi")) {
            return `📈 Check the Live Mandi Rates section on your dashboard. We provide daily updated prices for Paddy, Wheat, and Cotton across major regional Mandis.`;
        }

        // Default fallback
        return `I am Agri Assistant, your AI farming companion. Please ask me specific questions about your farm, for example: "How does the tractor rental work?" or "Tell me about PM-KISAN."`;
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const userMessage = { id: Date.now(), text: input, sender: 'user' as const, time: currentTime };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        // Simulate bot thinking
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
        if (e.key === 'Enter') {
            handleSend();
        }
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
                            <div className="flex items-center justify-between text-white mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-sm border border-white/10">
                                        <Bot className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[19px] leading-tight flex items-center gap-2">Agri Assistant</h3>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-[#34D399]"></div>
                                            <p className="text-emerald-100 text-xs font-medium tracking-wide">AI Assistant Online</p>
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

                            {/* Language Selector */}
                            <div className="flex items-center overflow-x-auto gap-1 no-scrollbar pb-1 -mx-2 px-2">
                                {languages.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => setSelectedLang(lang)}
                                        className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${selectedLang === lang
                                            ? 'bg-[#82A992] text-[#0A4A28]'
                                            : 'text-emerald-100/70 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
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
                                    placeholder="Ask me anything..."
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
                    <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#B46A14] flex items-center justify-center rounded-full text-[11px] font-black tracking-tight text-white border-2 border-white shadow-sm">
                        1
                    </div>
                </div>
            </motion.button>
        </>
    );
};
