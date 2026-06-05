import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Send, MessageSquare, ArrowLeft, CloudSun, Volume2, VolumeX, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLanguage } from "@/lib/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ExpertHelpVoice() {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [selectedLang, setSelectedLang] = useState("te-IN"); // Default: Telugu
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  const [muteVoice, setMuteVoice] = useState(false);

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync active site language to selection
  useEffect(() => {
    if (language === "Telugu") {
      setSelectedLang("te-IN");
    } else if (language === "Hindi") {
      setSelectedLang("hi-IN");
    } else {
      setSelectedLang("en-IN");
    }
  }, [language]);

  // Fetch weather on mount
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get("/api/weather?city=Kurnool");
        if (res.data) setWeather(res.data);
      } catch (e) {
        console.warn("Failed to fetch weather data");
      }
    };
    fetchWeather();

    // Check speech recognition support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setRecognitionSupported(false);
    } else {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => setListening(true);
      rec.onend = () => setListening(false);
      rec.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setListening(false);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          sendMessage(transcript);
        }
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Update recognition language configuration
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = selectedLang;
    }
  }, [selectedLang]);

  // Scroll to bottom on messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Translate weather advisory in weather advisory bar
  const getLocalizedWeatherAdvisory = (advisory: string) => {
    if (!advisory) return "";
    const advDict: Record<string, Record<string, string>> = {
      "te-IN": {
        "Rain detected. Suspend irrigation. Ensure drainage channels in cotton/chilli fields are clear.": "వర్షం నమోదైంది. నీటిపారుదలని నిలిపివేయండి. పత్తి/మిరప పొలాల్లో నీరు నిల్వ ఉండకుండా డ్రైనేజీ కాలువలు శుభ్రంగా ఉంచుకోండి.",
        "Extreme heat. Critical irrigation required for young saplings. Apply mulch to conserve soil moisture.": "తీవ్రమైన వేడి. చిన్న మొక్కలకు తక్షణ నీటిపారుదల అవసరం. నేల తేమను కాపాడటానికి మల్చింగ్ వేయండి.",
        "Soil moisture is low. Scheduled irrigation recommended before peak noon.": "నేల తేమ తక్కువగా ఉంది. మధ్యాహ్నం వేడి పెరగక ముందే నీటిపారుదల చేయవలసిందిగా సిఫార్సు చేయబడింది.",
        "Vegetation vigor is below optimal. Satellite data suggests potential nutrient stress.": "పంట ఎదుగుదల ఆశించిన స్థాయిలో లేదు. శాటిలైట్ సమాచారం ప్రకారం పోషకాల లోపం ఉండే అవకాశం ఉంది.",
        "High humidity alert. Risk of pest infestation increases. Monitor crop leaves for fungal spots.": "అధిక తేమ హెచ్చరిక. తెగుళ్లు ఆశించే ప్రమాదం ఉంది. శిలీంధ్ర మచ్చల కోసం ఆకులను గమనించండి.",
        "Ideal conditions for field work. Good window for fertilizer application and harvesting.": "క్షేత్ర పనులకు అనుకూలమైన పరిస్థితులు. ఎరువులు వేయడానికి మరియు పంట కోతకు ఇది మంచి సమయం."
      },
      "hi-IN": {
        "Rain detected. Suspend irrigation. Ensure drainage channels in cotton/chilli fields are clear.": "बारिश दर्ज की गई। सिंचाई स्थगित करें। कपास/मिर्च के खेतों में जल निकासी नालियों को साफ रखें।",
        "Extreme heat. Critical irrigation required for young saplings. Apply mulch to conserve soil moisture.": "अत्यधिक गर्मी। छोटे पौधों के लिए महत्वपूर्ण सिंचाई आवश्यक है। मिट्टी की नमी बनाए रखने के लिए मल्चिंग लगाएं।",
        "Soil moisture is low. Scheduled irrigation recommended before peak noon.": "मिट्टी की नमी कम है। दोपहर की गर्मी से पहले निर्धारित सिंचाई की सलाह दी जाती है।",
        "Vegetation vigor is below optimal. Satellite data suggests potential nutrient stress.": "वनस्पति का स्वास्थ्य अनुकूल से कम है। उपग्रह डेटा संभावित पोषक तत्वों की कमी का संकेत देता है।",
        "High humidity alert. Risk of pest infestation increases. Monitor crop leaves for fungal spots.": "उच्च आर्द्रता की चेतावनी। कीटों के प्रकोप का खतरा बढ़ जाता है। फंगल धब्बों के लिए फसल की पत्तियों की निगरानी करें।",
        "Ideal conditions for field work. Good window for fertilizer application and harvesting.": "खेत के काम के लिए आदर्श परिस्थितियां। उर्वरक प्रयोग और कटाई के लिए अच्छा समय है।"
      }
    };

    const set = advDict[selectedLang];
    if (set && set[advisory]) {
      return set[advisory];
    }
    return advisory;
  };

  // Voice Output (SpeechSynthesis)
  const speak = (text: string) => {
    if (muteVoice) return;
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    
    // Clean text from markdown notations before speaking
    const cleanText = text.replace(/[*#_`~]/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = selectedLang;
    utterance.rate = 0.85; // Standard clarity speed

    window.speechSynthesis.speak(utterance);
  };

  // Toggle listening
  const toggleListening = () => {
    if (!recognitionSupported) return;
    if (listening) {
      recognitionRef.current.stop();
    } else {
      setInput("");
      recognitionRef.current.start();
    }
  };

  // Send Message
  const sendMessage = async (textToSend: string) => {
    const query = textToSend.trim();
    if (!query) return;

    const newMessages: Message[] = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const weatherText = weather
        ? `Today in Anantapur: Temp is ${weather.current?.temp}°C, Humidity is ${weather.current?.humidity}%, Conditions are ${weather.current?.weather?.[0]?.description}. Advisory: ${weather.advisory}`
        : "No weather advisory available.";

      const res = await axios.post("/api/expert-help/chat", {
        messages: newMessages,
        weatherContext: weatherText,
        language: selectedLang
      });

      const reply = res.data.reply;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      speak(reply);
    } catch (err) {
      console.error("Chat API error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("voiceError") || "Sorry, I am having trouble connecting right now. Please try again.",
        },
      ]);
    } finally {
      loading && setLoading(false);
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4]/30 dark:bg-slate-950 pb-20 pt-24">
      <div className="max-w-4xl mx-auto px-4 flex flex-col h-[calc(100vh-140px)]">
        
        {/* Top Header Controls */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <Link to="/expert-consult" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors font-bold text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>{t("back")}</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setMuteVoice(!muteVoice);
                window.speechSynthesis.cancel();
              }}
              className="p-3 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-colors"
              title={muteVoice ? t("unmuteVoice") : t("muteVoice")}
            >
              {muteVoice ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-emerald-600" />}
            </button>

            <select
              className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl p-3 text-xs font-black uppercase tracking-wider outline-none text-slate-700 dark:text-slate-200"
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
            >
              <option value="te-IN">తెలుగు (Telugu)</option>
              <option value="hi-IN">हिन्दी (Hindi)</option>
              <option value="en-IN">English</option>
            </select>
          </div>
        </div>

        {/* Browser Support Warning */}
        {!recognitionSupported && (
          <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 rounded-2xl flex items-start gap-3 flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-amber-800 dark:text-amber-300 leading-normal">
              {t("voiceWarning")}
            </p>
          </div>
        )}

        {/* Live Weather Advisory Bar */}
        {weather && (
          <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/30 rounded-2xl flex items-center gap-3.5 flex-shrink-0 shadow-sm">
            <div className="p-2.5 bg-emerald-500 text-white rounded-xl shadow-md">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 leading-none mb-1.5">{t("liveWeatherAdvisory")}</p>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-snug">
                {weather.current?.temp}°C, {weather.current?.humidity}% {t("humidity")} — <span className="italic">{getLocalizedWeatherAdvisory(weather.advisory)}</span>
              </p>
            </div>
          </div>
        )}

        {/* Chat Bubbles Container */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl p-6 mb-6 shadow-inner space-y-4 max-h-[55vh]">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-600 py-12 text-center space-y-4">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-full">
                <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-sm font-black uppercase tracking-widest leading-relaxed">
                {t("voicePrompt")}
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm font-semibold shadow-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none border border-slate-200/20"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-none px-6 py-4 flex items-center gap-2 border border-slate-200/20 shadow-sm">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleFormSubmit} className="flex gap-3 flex-shrink-0">
          {recognitionSupported && (
            <button
              type="button"
              onClick={toggleListening}
              className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                listening
                  ? "bg-red-500 text-white animate-pulse shadow-red-200"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-100 dark:shadow-none"
              }`}
            >
              {listening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
          )}

          <input
            type="text"
            className="flex-1 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-2xl px-6 h-14 text-sm font-semibold outline-none focus:border-emerald-500 shadow-sm text-slate-800 dark:text-slate-100"
            placeholder={listening ? t("listeningSpeakNow") : t("askAnything")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={listening}
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="h-14 px-6 bg-slate-900 hover:bg-emerald-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{t("send")}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
