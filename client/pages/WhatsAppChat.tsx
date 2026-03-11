import { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft, MoreVertical, Phone, Video, Search, Paperclip, Smile, Mic, Check, CheckCheck, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLanguage, Language } from "@/lib/LanguageContext";

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
    const { t, language, setLanguage } = useLanguage();
    const phone = searchParams.get("phone") || "User";
    const initialMessageParam = searchParams.get("initialMessage");

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial greeting if coming from SeedsBuyer
        if (initialMessageParam === "true" && messages.length === 0) {
            const initialGreeting: Message = {
                id: Date.now().toString(),
                role: "bot",
                content: `👋 ${t("botWelcome")}\n\nAsk me about:\n- 🚜 ${t("rentTractor")}\n- 🌾 ${t("cropAdvice")}\n- 📈 ${t("marketRatesLabel")}\n- 🐛 ${t("pestControl")}`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages([initialGreeting]);
        }
    }, [initialMessageParam, phone, messages.length, t]);

    // Update greeting retroactively if language changes and it was the only message
    useEffect(() => {
        if (messages.length === 1 && messages[0].role === "bot") {
            setMessages(prev => [{
                ...prev[0],
                content: `👋 ${t("botWelcome")}\n\nAsk me about:\n- 🚜 ${t("rentTractor")}\n- 🌾 ${t("cropAdvice")}\n- 📈 ${t("marketRatesLabel")}\n- 🐛 ${t("pestControl")}`,
            }]);
        }
    }, [language, t]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const generateBotResponse = (userText: string) => {
        const lowerText = userText.toLowerCase();

        if (lowerText.includes("rent") || lowerText.includes("tractor") || lowerText.includes("అద్దె") || lowerText.includes("किराया")) {
            return `🚜 Equipment Rental Process:\n\n` +
                `Renting equipment via TechSpark AI is designed to be simple and transparent.\n\n` +
                `1. Find Equipment: Browse our marketplace to find tractors, harvesters, or implements near your location.\n` +
                `2. Check Rates & Availability: You can view hourly or daily rates set directly by the owners. Availability calendars are updated in real-time.\n` +
                `3. Book & Pay: Select your dates and confirm your booking. Payments are handled securely through our platform.\n` +
                `4. Delivery/Pickup: Coordinate with the owner for delivery or pickup instructions.`;
        }
        if (lowerText.includes("scheme") || lowerText.includes("ysr") || lowerText.includes("kisan") || lowerText.includes("పథకాలు") || lowerText.includes("योजना")) {
            return `📋 Government Schemes Overview:\n\n` +
                `As a farmer, you might be eligible for several financial assistance programs:\n\n` +
                `• PM-KISAN: Provides ₹6000 per year in three equal installments to eligible farmer families. Ensure your Aadhaar is linked to your bank account.\n` +
                `• PMFBY (Crop Insurance): Protects against crop loss due to natural calamities. Premiums are very low (1.5% - 2%).\n` +
                `• State Specific (e.g., YSR Rythu Bharosa): Additional financial support provided state-by-state.\n\n` +
                `You can track your application status directly in our 'Agri Schemes' portal.`;
        }
        if (lowerText.includes("tomato") || lowerText.includes("టమోటా") || lowerText.includes("टमाटर")) {
            return `🍅 Detailed Tomato Growing Guide:\n\n` +
                `• Soil & Climate: Tomatoes thrive in well-drained loamy soil with a pH of 6-7. They require plenty of sunlight and warm temperatures (20-30°C).\n` +
                `• Sowing: Start seeds in a nursery bed. Transplant healthy 25-30 day-old seedlings into the main field.\n` +
                `• Spacing & Support: Plant at a spacing of 60x45cm. Staking is recommended for indeterminate varieties to prevent fruit rot.\n` +
                `• Common Issues: Watch out for 'Late Blight' (brown spots on leaves) and 'Fruit Borer' insects. Use neem oil preventatively or consult our disease scanner for specific treatment if spots appear.`;
        }
        if (lowerText.includes("paddy") || lowerText.includes("rice") || lowerText.includes("వరి") || lowerText.includes("धान") || lowerText.includes("చావడి")) {
            return `🌾 Detailed Paddy (Rice) Growing Guide:\n\n` +
                `• Soil Preparation: Paddy requires clayey soils that retain water well. The field must be ploughed and puddled with 5cm of standing water.\n` +
                `• Seed Varieties: We recommend high-yield seeds like BPT-5204 or IR-64 depending on your local climate.\n` +
                `• Water Management: Maintain a 5cm water level during the vegetative phase. Critical water requirement stages are tillering and flowering. Drain water 15 days before harvest.\n` +
                `• Fertilizers: Apply Nitrogen in three split doses to ensure maximum absorption and yield.`;
        }
        if (lowerText.includes("cotton") || lowerText.includes("పత్తి") || lowerText.includes("कपास")) {
            return `🌿 Detailed Cotton Growing Guide:\n\n` +
                `• Ideal Conditions: Cotton grows best in deep black (Regur) soils that are well-draining but moisture retentive.\n` +
                `• Seed Selection: Sowing Bt Cotton seeds is highly recommended for resistance against the destructive Pink Bollworm.\n` +
                `• Sowing Time: Sow during the onset of the monsoon (May-June). Maintain a spacing of 90x60cm for optimal growth.\n` +
                `• Care: Use pheromone traps to monitor pest activity. Cotton requires supplemental irrigation during the critical flowering and boll formation stages if rain is insufficient.`;
        }
        if (lowerText.includes("pest") || lowerText.includes("disease") || lowerText.includes("కీటకాలు") || lowerText.includes("कीट")) {
            return `🦠 Pest and Disease Management:\n\n` +
                `Identifying the exact disease is critical for effective treatment. Here is our recommended approach:\n\n` +
                `1. AI Detection: Take a clear photo of the affected leaf using our built-in Disease Scanner. It will instantly diagnose the issue (e.g., Powdery Mildew, Leaf Blight).\n` +
                `2. Organic First: We always recommend trying organic solutions first, such as Neem Oil sprays or Trichoderma, to protect soil health.\n` +
                `3. Chemical Control: If the infestation is severe, the scanner will recommend specific safe chemical pesticides and exact dosages.`;
        }
        if (lowerText.includes("price") || lowerText.includes("mandi") || lowerText.includes("rate") || lowerText.includes("ధరలు") || lowerText.includes("मार्केट")) {
            return `📈 Understanding Market Prices:\n\n` +
                `Selling at the right time and place significantly impacts your profit.\n\n` +
                `• Live Mandi Rates: Our platform provides daily updated prices for crops like Paddy, Wheat, and Cotton across major regional Mandis.\n` +
                `• Price EstimatorTool: We use AI to predict if prices will rise or fall in the coming weeks based on weather and harvest data.\n` +
                `• Advice: Don't sell in haste. Check the app to see if neighboring Mandis are offering higher rates for your specific crop grade.`;
        }
        if (lowerText.includes("advice") || lowerText.includes("ಸಲಹೆ") || lowerText.includes("సలహా") || lowerText.includes("सलाह")) {
            return `💡 Expert Agricultural Advice:\n\n` +
                `I am your 24/7 AI agricultural assistant. I can provide detailed, step-by-step guidance on a wide variety of topics. \n\n` +
                `Please ask me a specific question, for example:\n` +
                `• "How do I control aphids on my tomato crop?"\n` +
                `• "What is the best time to sow sweet corn?"\n` +
                `• "Explain the PM-KISAN eligibility criteria."`;
        }

        // Default fallback
        return `I am AgriAssistant, an advanced AI trained entirely on agricultural data. \n\n` +
            `I am here to provide you with deeply detailed, actionable explanations. Please ask me specific questions about your farm, for example:\n\n` +
            `- "Provide a detailed growing guide for sweet corn."\n` +
            `- "Explain how the tractor rental system works in detail."\n` +
            `- "What are the exact symptoms of late blight?"`;
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
                                <span className="font-semibold text-lg leading-tight">{t("agriAssistant")}</span>
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
                    <span className="flex items-center text-white/80 shrink-0 mr-1">{t("languageLabel")}:</span>
                    {languages.map((lang) => (
                        <span
                            key={lang.name}
                            onClick={() => setLanguage(lang.name)}
                            className={cn(
                                "cursor-pointer px-2.5 py-1 rounded-full transition-colors whitespace-nowrap shrink-0 border shadow-sm",
                                language === lang.name ? "bg-white text-[#00a884] border-white font-bold" : "bg-[#128C7E] border-transparent hover:bg-[#128C7E]/80 text-white"
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
