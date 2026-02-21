import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowLeft, Bot, Send, Mic, Sparkles, Tractor, Cloud,
    TrendingUp, BookOpen, RefreshCw, Globe, User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Lang = "en" | "te" | "hi" | "ta" | "kn" | "mr" | "gu" | "ml" | "pa";

const LANG_LABELS: Record<Lang, string> = {
    en: "English", te: "తెలుగు", hi: "हिंदी",
    ta: "தமிழ்", kn: "ಕನ್ನಡ", mr: "मराठी",
    gu: "ગુજરાતી", ml: "മലയാളம்", pa: "ਪੰਜਾਬੀ"
};

interface Message {
    id: number;
    role: "user" | "assistant";
    text: string;
    time: string;
}

const RESPONSES_TE: Record<string, string> = {
    tractor: "3 ఎకరాల పొలం కోసం, నేను **మీడియం ట్రాక్టర్ (35-45 HP)** సిఫార్సు చేస్తున్నాను. మహీంద్రా 275 లేదా కుబోటా MU4501 వంటివి ఇంధన సామర్థ్యం కలిగి ఉంటాయి మరియు అద్దెకు గంటకు ₹600-650 వరకు ఉంటుంది.",
    book: "బుకింగ్ చాలా సులభం! 🚜\n1. **ఎక్విప్‌మెంట్ అద్దెకు తీసుకోండి** ట్యాబ్‌కు వెళ్లండి\n2. మీ ప్రాంతాన్ని ఎంచుకోండి\n3. ట్రాక్టర్ పై **బుక్ నౌ** క్లిక్ చేయండి\n4. తేదీ & సమయం ఎంచుకోండి\n5. సబ్మిట్ చేయండి — యజమాని 2 గంటల్లో ధృవీకరిస్తారు!",
    price: "ప్రస్తుత వ్యవసాయ సేవల ధరలు:\n• చిన్న ట్రాక్టర్ (20HP): గంటకు ₹350\n• మీడియం ట్రాక్టర్ (40HP): గంటకు ₹600\n• భారీ ట్రాక్టర్ (55HP): గంటకు ₹800\n• హార్వెస్టర్: గంటకు ₹1,200\n• రోటవేటర్: గంటకు ₹300",
    weather: "🌦️ చిత్తూరు వాతావరణం: **మేఘావృతం, 28°C**. రేపు తేలికపాటి వర్షం కురిసే అవకాశం ఉంది. ఈరోజే పొలం సిద్ధం చేసుకోవడం మంచిది!",
    scheme: "మీ కోసం ముఖ్యమైన పథకాలు:\n• **PM-Kisan**: సంవత్సరానికి ₹6,000\n• **Rythu Bharosa**: సంవత్సరానికి ₹13,500 (AP)\n• **Fasal Bima**: పంట భీమా ₹2 లక్షల వరకు\n• **PM Kusum**: సోలార్ పంపులపై 60% సబ్సిడీ",
    soil: "నేల తయారీ కోసం, తేలికపాటి దుక్కికి **రోటవేటర్** లేదా లోతైన దుక్కికి **డిస్క్ నాగలి** వాడండి. వరి కోసం 15 సెం.మీ లోతులో రోటవేషన్ సిఫార్సు చేయబడింది. విత్తే 2 వారాల ముందు ఇది చేయాలి.",
    crop: "పంట ఎంపికలో నేను సహాయం చేయగలను! చిత్తూరు జిల్లాలో రబీ సీజన్ కోసం:\n• **వేరుశనగ** — మంచి దిగుబడి, మంచి ధర\n• **టమాటా** — అధిక డిమాండ్, కానీ నీరు అవసరం\n• **మిర్చి** — నల్ల రేగడి నేలలకు ఉత్తమం",
    pest: "కీటక నివారణ కోసం **సమగ్ర కీటక యాజమాన్యం**పై దృష్టి పెట్టండి: \n1. తెల్లదోమల కోసం పసుపు రంగు జిగురు షీట్లు వాడండి.\n2. పేనుబంక కోసం వేప నూనె స్ప్రే చేయండి.\n3. వరిలో అగ్గి తెగులు తీవ్రత ఎక్కువగా ఉంటే నిపుణుల సలహా తీసుకోండి.",
    default: "మంచి ప్రశ్న! నేను మీ కిసాన్AI అసిస్టెంట్‌ని. నేను మీకు వీటిలో సహాయం చేయగలను:\n• 🚜 సరైన పరికరాల ఎంపిక\n• 📅 ట్రాక్టర్ ఎలా బుక్ చేయాలి\n• 💰 అద్దె ధరలు & ప్రభుత్వ పథకాలు\n• 🌾 పంట సలహాలు & నేల తయారీ\n• 🌦️ వాతావరణ సలహాలు\n\nమీరు ఏమనుకుంటున్నారు?",
};

const RESPONSES_HI: Record<string, string> = {
    tractor: "3 एकड़ खेत के लिए, मैं **मध्यम ट्रैक्टर (35-45 HP)** जैसे महिंद्रा 275 या कुबोटा MU4501 की सलाह देता हूं। वे ईंधन-कुशल हैं और किराए पर लगभग ₹600-650/घंटा खर्च होते हैं।",
    book: "बुकिंग आसान है! 🚜\n1. **किराये के उपकरण** टैब पर जाएं\n2. स्थान के अनुसार खोजें और फ़िल्टर करें\n3. किसी भी ट्रैक्टर पर **अभी बुक करें** पर क्लिक करें\n4. तिथि और घंटे चुनें\n5. सबमिट करें — मालिक 2 घंटे के भीतर पुष्टि करेगा!",
    price: "वर्तमान कृषि सेवा दरें:\n• छोटा ट्रैक्टर (20HP): ₹350/घंटा\n• मध्यम ट्रैक्टर (40HP): ₹600/घंटा\n• भारी ट्रैक्टर (55HP): ₹800/घंटा\n• हार्वेस्टर: ₹1,200/घंटा\n• रोटावेटर: ₹300/घंटा",
    weather: "🌦️ चित्तूर के लिए आज का पूर्वानुमान: **आंशिक रूप से बादल छाए रहेंगे, 28°C**। कल हल्की बारिश की संभावना है। मैं आज ही खेत की तैयारी पूरी करने की सलाह देता हूं!",
    scheme: "आपके लिए मुख्य योजनाएं:\n• **पीएम-किसान**: ₹6,000/वर्ष सीधा लाभ\n• **रैथु भरोसा**: ₹13,500/वर्ष (एपी)\n• **फसल बीमा**: ₹2 लाख तक का फसल बीमा\n• **पीएम कुसुम**: सोलर पंप पर 60% सब्सिडी",
    soil: "मिट्टी की तैयारी के लिए, हल्की खेती के लिए **रोटावेटर** या गहरी जुताई के लिए **डिस्क हल** का उपयोग करें। धान के लिए 15 सेमी गहराई तक रोटावेशन की सिफारिश की जाती है। बुवाई से 2 सप्ताह पहले सबसे अच्छा किया जाता है।",
    crop: "मैं फसल चयन पर सलाह दे सकता हूं! रबी सीजन में चित्तूर जिले के लिए:\n• **मूंगफली** — उत्कृष्ट उपज, अच्छी बाजार कीमत\n• **टमाटर** — उच्च मांग, लेकिन सिंचाई की आवश्यकता\n• **मिर्च** — काली कपास मिट्टी वाले क्षेत्रों में सबसे अच्छा",
    pest: "कीट नियंत्रण के लिए, **एकीकृत कीट प्रबंधन** पर ध्यान दें: \n1. सफेद मक्खियों के लिए पीली चिपचिपी जाल का प्रयोग करें।\n2. एफिड्स के लिए नीम के तेल का छिड़काव करें।\n3. गंभीर राइस ब्लास्ट के लिए, स्थानीय अधिकारी के परामर्श के बाद अनुशंसित कवकनाशी पर विचार करें।",
    default: "अच्छा सवाल! मैं आपका किसानएआई खेती सहायक हूं। मैं आपकी मदद कर सकता हूं:\n• 🚜 सही उपकरण चुनना\n• 📅 ट्रैक्टर कैसे बुक करें\n• 💰 किराया दरें और सरकारी योजनाएं\n• 🌾 फसल सलाह और मिट्टी की तैयारी\n• 🌦️ मौसम आधारित खेती के टिप्स\n\nआप क्या जानना चाहेंगे?",
};

const RESPONSES_EN: Record<string, string> = {
    tractor: "KisanAI suggests for a 3-acre field, I recommend a **Medium Tractor (35-45 HP)** like Mahindra 275 or Kubota MU4501. They are fuel-efficient and cost around ₹600-650/hour to rent.",
    book: "Booking is simple! 🚜\n1. Go to **Rent Equipment** tab\n2. Search & filter by location\n3. Click **Book Now** on any tractor\n4. Pick date & hours\n5. Submit — owner will confirm within 2 hours!",
    price: "Current agricultural service rates:\n• Small Tractor (20HP): ₹350/hour\n• Medium Tractor (40HP): ₹600/hour\n• Heavy Tractor (55HP): ₹800/hour\n• Harvester: ₹1,200/hour\n• Rotavator: ₹300/hour",
    weather: "🌦️ Today's forecast for Chittoor: **Partly cloudy, 28°C**. Light rain expected tomorrow. I recommend completing field preparations today!",
    scheme: "Key schemes for you:\n• **PM-Kisan**: ₹6,000/year direct benefit\n• **Rythu Bharosa**: ₹13,500/year (AP)\n• **Fasal Bima**: Crop insurance up to ₹2 Lakh\n• **PM Kusum**: 60% subsidy on solar pumps",
    soil: "For soil preparation, use a **Rotavator** for light cultivation or a **Disc Plough** for deep tillage. For rice paddy, rotavation to 15cm depth is recommended. Best done 2 weeks before sowing.",
    crop: "I can advise on crop selection! For Chittoor district in Rabi season:\n• **Groundnut** — excellent yield, good market price\n• **Tomato** — high demand, but needs irrigation\n• **Chilli** — best in black cotton soil areas",
    pest: "For pest control, focus on **Integrated Pest Management**: \n1. Use yellow sticky traps for whiteflies.\n2. Neem oil spray for aphids.\n3. For severe Rice Blast, consider recommended fungicide after consultation with a local officer.",
    default: "Great question! I'm your KisanAI farming assistant. I can help you with:\n• 🚜 Choosing the right equipment\n• 📅 How to book a tractor\n• 💰 Rental prices & government schemes\n• 🌾 Crop advice and soil preparation\n• 🌦️ Weather-based farming tips\n\nWhat would you like to know?",
};

function getResponse(text: string, lang: Lang): string {
    const lower = text.toLowerCase();
    const responses = lang === 'te' ? RESPONSES_TE : lang === 'hi' ? RESPONSES_HI : RESPONSES_EN;

    const agriKeywords = [
        "tractor", "equipment", "rent", "book", "price", "cost", "rate", "weather", "rain",
        "scheme", "kisan", "soil", "crop", "sow", "harvest", "pest", "disease", "fertilizer",
        "ట్రాక్టర్", "అద్దె", "బుక్", "ధర", "వర్షం", "పథకం", "రైతు", "పంట", "కీటకం", "రోగం",
        "ट्रैक्टर", "किराया", "बुक", "कीमत", "बारिश", "योजना", "किसान", "फसल", "कीड़ा", "बीमारी"
    ];

    const isAgriRelated = agriKeywords.some(keyword => lower.includes(keyword));

    if (!isAgriRelated && lower.length > 5) {
        return lang === 'te' ? "నేను కిసాన్AI, వ్యవసాయంలో ప్రత్యేకత కలిగిన వాడిని. దయచేసి నాకు వ్యవసాయం, పరికరాలు, వాతావరణం లేదా ప్రభుత్వ పథకాలకు సంబంధించిన ప్రశ్నలను అడగండి." :
            lang === 'hi' ? "मैं किसानएआई हूं, जो कृषि में विशेषज्ञता रखता हूं। कृपया मुझसे खेती, उपकरण, मौसम या सरकारी योजनाओं से संबंधित प्रश्न पूछें।" :
                "I am KisanAI, specialized in agriculture. Please ask me questions related to farming, equipment, weather, or government schemes.";
    }

    if (lower.includes("tractor") || lower.includes("equipment") || lower.includes("which") || lower.includes("ట్రాక్టర్") || lower.includes("ट्रैक्टर")) return responses.tractor;
    if (lower.includes("book") || lower.includes("rent") || lower.includes("how to") || lower.includes("బుక్") || lower.includes("बुक")) return responses.book;
    if (lower.includes("price") || lower.includes("cost") || lower.includes("rate") || lower.includes("ధర") || lower.includes("कीमत")) return responses.price;
    if (lower.includes("weather") || lower.includes("rain") || lower.includes("climate") || lower.includes("వర్షం") || lower.includes("मौसम")) return responses.weather;
    if (lower.includes("scheme") || lower.includes("government") || lower.includes("subsidy") || lower.includes("kisan") || lower.includes("పథకం") || lower.includes("योजना")) return responses.scheme;
    if (lower.includes("soil") || lower.includes("tillage") || lower.includes("plough") || lower.includes("మట్టి") || lower.includes("मिट्टी")) return responses.soil;
    if (lower.includes("pest") || lower.includes("disease") || lower.includes("bug") || lower.includes("కీటకం") || lower.includes("బీమారి")) return responses.pest;
    if (lower.includes("crop") || lower.includes("sow") || lower.includes("harvest") || lower.includes("plant") || lower.includes("పంట") || lower.includes("फसल")) return responses.crop;

    return responses.default;
}

const quickActions = [
    { icon: Tractor, label: "Tractor?", query: "Which tractor for 3 acres?" },
    { icon: BookOpen, label: "How to Book", query: "How to book a tractor?" },
    { icon: TrendingUp, label: "Price", query: "What are the rental rates?" },
    { icon: Cloud, label: "Weather", query: "Today's weather forecast" },
    { icon: Sparkles, label: "Schemes", query: "Government schemes available?" },
    { icon: RefreshCw, label: "Crop Advice", query: "Which crop to grow this season?" },
];

function formatText(text: string): JSX.Element {
    const lines = text.split("\n");
    return (
        <div className="space-y-1">
            {lines.map((line, i) => {
                const parts = line.split(/\*\*(.*?)\*\*/g);
                return (
                    <p key={i} className="text-sm leading-relaxed">
                        {parts.map((p, j) =>
                            j % 2 === 1 ? <strong key={j}>{p}</strong> : p
                        )}
                    </p>
                );
            })}
        </div>
    );
}

export default function AIAssistant() {
    const { user } = useUser();
    const { t, i18n } = useTranslation();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 0,
            role: "assistant",
            text: `Hello ${user?.firstName || "Farmer"}! I am **KisanAI**, your intelligent farming assistant. How can I help you today?`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
    ]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    let msgId = useRef(1);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typing]);

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;
        const userMsg: Message = {
            id: msgId.current++, role: "user", text,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((m) => [...m, userMsg]);
        setInput("");
        setTyping(true);

        await new Promise((r) => setTimeout(r, 1500));

        const reply = getResponse(text, i18n.language as Lang);
        const aiMsg: Message = {
            id: msgId.current++, role: "assistant", text: reply,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((m) => [...m, aiMsg]);
        setTyping(false);
    };

    return (
        <div className="flex flex-col h-screen pt-16 bg-gradient-to-br from-green-50/50 via-background to-emerald-50/50 dark:from-green-950/10 dark:via-background dark:to-emerald-950/10">
            {/* Header */}
            <div className="flex items-center gap-4 px-4 py-3 border-b bg-background/80 backdrop-blur-md">
                <Link to="/">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                    <h1 className="font-black text-base">KisanAI Assistant</h1>
                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-muted-foreground">Online — responds in seconds</span>
                    </div>
                </div>
            </div>

            {/* Quick actions */}
            <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide border-b bg-background/50">
                {quickActions.map(({ icon: Icon, label, query }) => (
                    <button
                        key={label}
                        onClick={() => sendMessage(query)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-primary/10 text-primary text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all whitespace-nowrap flex-shrink-0"
                    >
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                    </button>
                ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "")}
                        >
                            <div className={cn(
                                "h-9 w-9 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1",
                                msg.role === "assistant" ? "bg-primary" : "bg-muted"
                            )}>
                                {msg.role === "assistant"
                                    ? <Bot className="h-5 w-5 text-primary-foreground" />
                                    : <User className="h-4 w-4 text-muted-foreground" />
                                }
                            </div>
                            <div className={cn(
                                "max-w-[80%] px-4 py-3 rounded-3xl shadow-sm",
                                msg.role === "assistant"
                                    ? "bg-background border border-border rounded-tl-sm"
                                    : "bg-primary text-primary-foreground rounded-tr-sm"
                            )}>
                                {msg.role === "assistant" ? formatText(msg.text) : <p className="text-sm">{msg.text}</p>}
                                <p className={cn("text-[10px] mt-1", msg.role === "assistant" ? "text-muted-foreground" : "text-primary-foreground/60")}>
                                    {msg.time}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {typing && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex gap-3"
                        >
                            <div className="h-9 w-9 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                                <Bot className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div className="bg-background border border-border rounded-3xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                                        className="h-2.5 w-2.5 rounded-full bg-primary/60"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div className="p-4 border-t bg-background/80 backdrop-blur-md">
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
                            placeholder={t('chat.placeholder', 'Ask about tractors, crops, schemes...')}
                            className="w-full px-5 py-4 rounded-2xl border border-input bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all pr-12"
                        />
                        <Button
                            variant="ghost" size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl text-muted-foreground hover:text-primary"
                        >
                            <Mic className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim() || typing}
                        className="rounded-2xl px-5 h-auto font-bold gap-2"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-center text-[11px] text-muted-foreground mt-2">
                    <Globe className="h-3 w-3 inline mr-1" />
                    Supports English · తెలుగు · हिंदी · தமிழ் · ಕನ್ನಡ · मराठी · ગુજરાતી · മലയാളം · ਪੰਜਾਬੀ
                </p>
            </div>
        </div>
    );
}
