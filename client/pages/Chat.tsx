import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot, Sparkles, ChevronDown, ArrowLeft, BotIcon, LayoutGrid, Zap, History, BellRing, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLanguage, Language, translations } from "@/lib/LanguageContext";

export default function ChatPage() {
  const { t, language: globalLanguage } = useLanguage();
  const [chatLanguage, setChatLanguage] = useState<Language>(globalLanguage);

  // Local helper for translations in chat
  const ct = (key: string, data?: any) => {
    return translations[chatLanguage]?.[key] || translations["English"]?.[key] || key;
  };

  const suggestions = useMemo(() => [
    ct("suggestion1"),
    ct("suggestion2"),
    ct("suggestion3"),
    ct("suggestion4"),
  ], [chatLanguage]);

  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: ct("botWelcome"),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update messages when chat language changes if only the welcome message exists
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === "bot") {
      setMessages([{
        role: "bot",
        content: ct("botWelcome"),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }
  }, [chatLanguage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const content = text || inputValue;
    if (!content.trim()) return;

    const userMessage = {
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      
      const matchKeywords = (keywordKey: string) => {
        const keywords = ct(keywordKey).split(',').map((k: string) => k.trim().toLowerCase());
        return keywords.some((k: string) => content.toLowerCase().includes(k));
      };

      let response = ct("botFallback");

      if (matchKeywords("guidanceKeywords")) {
        response = ct("botGuidanceReply");
      } else if (matchKeywords("rentKeywords")) {
        response = ct("botRentReply");
      } else if (matchKeywords("schemeKeywords")) {
        response = ct("botSchemeReply");
      } else if (matchKeywords("cropKeywords")) {
        response = ct("botCropReply");
      } else if (matchKeywords("pestKeywords")) {
        response = ct("botPestReply");
      } else if (matchKeywords("marketKeywords")) {
        response = ct("botMarketReply");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  };

  const languages: { name: Language; label: string }[] = [
    { name: "English", label: "English" },
    { name: "Telugu", label: "తెలుగు" },
    { name: "Hindi", label: "हिन्दी" },
    { name: "Tamil", label: "தமிழ்" },
    { name: "Kannada", label: "ಕನ್ನಡ" },
    { name: "Malayalam", label: "മലയാളം" },
    { name: "Marathi", label: "मराठी" },
    { name: "Gujarati", label: "ગુજરાતી" },
    { name: "Punjabi", label: "ਪੰਜਾਬੀ" },
    { name: "Bangla", label: "বাংলা" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 flex flex-col h-[calc(100vh-64px)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">{t("aiFarmingChat")}</h1>
            <p className="text-muted-foreground">{t("expertAdvice")}</p>
          </div>
        </div>
        <div className="flex gap-2 p-1 bg-muted rounded-2xl w-full md:w-[450px] lg:w-[600px] overflow-x-auto no-scrollbar">
          {languages.map((lang) => (
            <button
              key={lang.name}
              onClick={() => setChatLanguage(lang.name)}
              className={cn(
                "px-6 py-2 rounded-xl text-sm font-black transition-all whitespace-nowrap",
                chatLanguage === lang.name
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/50"
              )}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4 flex-1 min-h-0">
        {/* Chat History / Sidebar */}
        <aside className="hidden lg:flex flex-col gap-6">
          <Card className="rounded-[2.5rem] border-primary/10 overflow-hidden shadow-sm bg-muted/20">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-lg font-black flex items-center gap-2">
                <History className="h-5 w-5 text-primary" /> {t("recentHistory")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-4">
              {/* These could be translated or kept as is if they represent real history */}
              {[
                { text: ct("historyCropAdvice"), path: "/growing-guide?crop=rice" },
                { text: ct("historyTractorRates"), path: "/dashboard?search=chittoor" },
                { text: ct("historyMarketTrends"), path: "/market?crop=tomato" },
                { text: ct("historySeedRecommendation"), path: "/growing-guide?crop=rice" }
              ].map((h, i) => (
                <Link to={h.path} key={i}>
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/50 transition-all cursor-pointer group">
                    <MessageCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground truncate">{h.text}</p>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          <div className="glass p-8 rounded-[2.5rem] border-primary/10 space-y-4">
            <h4 className="font-black text-xl flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> {t("assistantStatus")}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                <Zap className="h-4 w-4 text-amber-500" /> {t("responses")}: <span className="text-primary">{t("instant")}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                <BellRing className="h-4 w-4 text-green-500" /> {t("availability")}: <span className="text-primary">{t("online247")}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                <Settings className="h-4 w-4 text-slate-400" /> {t("languageLabel")}: <span className="text-primary">{t("multiModal")}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Chat Interface */}
        <div className="lg:col-span-3 flex flex-col min-h-0">
          <Card className="rounded-[3rem] border-primary/10 overflow-hidden shadow-2xl flex-1 flex flex-col bg-white">
            <div className="bg-primary p-6 lg:p-10 flex items-center justify-between text-primary-foreground flex-shrink-0">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-[1.5rem] bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
                  <BotIcon className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-black">{ct("agriAssistant")}</h3>
                  <div className="flex items-center gap-2 text-xs font-black text-white/80 uppercase tracking-widest mt-1">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                    {ct("onlineStatus")}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="rounded-xl text-white hover:bg-white/10">
                  <LayoutGrid className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-xl text-white hover:bg-white/10">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Message Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar bg-slate-50/30">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn(
                    "flex flex-col max-w-[85%] lg:max-w-[70%]",
                    msg.role === "user" ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "rounded-[1.5rem] p-5 lg:p-8 text-sm lg:text-base font-medium shadow-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none shadow-primary/20"
                      : "bg-white border-primary/5 text-foreground rounded-tl-none shadow-lg shadow-primary/5"
                  )}>
                    {msg.content}
                  </div>
                  <span className="mt-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest px-2">{msg.timestamp}</span>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-4 text-muted-foreground p-4"
                >
                  <BotIcon className="h-6 w-6 animate-pulse text-primary" />
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
                    <div className="h-2 w-2 rounded-full bg-primary animate-bounce delay-75"></div>
                    <div className="h-2 w-2 rounded-full bg-primary animate-bounce delay-150"></div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-8 border-t bg-white flex-shrink-0">
              {/* Suggestions */}
              <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="flex-shrink-0 px-6 py-2.5 rounded-full bg-muted/50 text-[10px] font-black text-primary uppercase tracking-widest hover:bg-primary/10 transition-all border border-primary/5"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-4"
              >
                <div className="relative flex-1">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={ct("askMeAnything")}
                    className="h-14 rounded-[1.5rem] bg-slate-50 border-primary/5 pl-6 pr-14 focus-visible:ring-primary shadow-inner"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Sparkles className="h-5 w-5 text-primary opacity-20" />
                  </div>
                </div>
                <Button
                  type="submit"
                  size="icon"
                  className="h-14 w-14 rounded-[1.5rem] shadow-xl shadow-primary/20 flex-shrink-0"
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-6 w-6" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
