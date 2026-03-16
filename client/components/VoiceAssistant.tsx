import { useState, useEffect, useCallback } from "react";
import { Mic, MicOff, Volume2, Home } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../lib/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Helper to speak text
export const speakText = (text: string, language: string) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Mapping of languages to BCP-47 codes
  const langMap: Record<string, string> = {
    'English': 'en-IN',
    'Hindi': 'hi-IN',
    'Telugu': 'te-IN',
    'Tamil': 'ta-IN',
    'Marathi': 'mr-IN',
    'Gujarati': 'gu-IN',
    'Kannada': 'kn-IN',
    'Malayalam': 'ml-IN',
    'Punjabi': 'pa-IN',
    'Bangla': 'bn-IN'
  };
  
  utterance.lang = langMap[language] || 'en-IN';
  utterance.rate = 0.9;
  
  window.speechSynthesis.speak(utterance);
};

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCommand = useCallback((command: string) => {
    const lowerCmd = command.toLowerCase();
    setTranscript(command);
    
    // Command matching using localized keywords
    const matches = (key: string) => {
      const keywords = t(key).split(',').map(k => k.trim().toLowerCase());
      return keywords.some(k => lowerCmd.includes(k));
    };

    if (matches('navHome')) {
      speakText(t('replyHome'), language);
      navigate('/');
    } else if (matches('navDashboard')) {
      speakText(t('replyDashboard'), language);
      navigate('/dashboard');
    } else if (matches('navWeather')) {
      speakText(t('replyWeather'), language);
      navigate('/weather');
    } else if (matches('navMarket')) {
      speakText(t('replyMarket'), language);
      navigate('/market');
    } else if (matches('navSeeds')) {
      speakText(t('replySeeds'), language);
      navigate('/seeds');
    } else if (matches('navChat')) {
      speakText(t('replyChat'), language);
      navigate('/chat');
    } else if (matches('navSchemes')) {
      speakText(t('replySchemes'), language);
      navigate('/agri-schemes');
    } else if (matches('navPests')) {
      speakText(t('replyPests'), language);
      navigate('/pests');
    } else if (matches('navCalendar')) {
      speakText(t('replyCalendar'), language);
      navigate('/calendar');
    } else if (matches('navKnowledge')) {
      speakText(t('replyKnowledge'), language);
      navigate('/knowledge');
    } else if (matches('navSeasonal')) {
      speakText(t('replySeasonal'), language);
      navigate('/knowledge'); // Navigate to knowledge then user can open seasonal
    } else if (matches('navWater')) {
      speakText(t('replyWater'), language);
      navigate('/knowledge');
    } else if (matches('navFertilizer')) {
      speakText(t('replyFertilizer'), language);
      navigate('/knowledge');
    } else if (matches('navMachinery')) {
      speakText(t('replyMachinery'), language);
      navigate('/knowledge');
    } else if (matches('navStorage')) {
      speakText(t('replyStorage'), language);
      navigate('/knowledge');
    } else if (matches('navSubsidy')) {
      speakText(t('replySubsidy'), language);
      navigate('/subsidy-tracker');
    } else if (matches('navMSP')) {
      speakText(t('replyMSP'), language);
      navigate('/msp-info');
    } else if (matches('navVideos')) {
      speakText(t('replyVideos'), language);
      navigate('/video-learning');
    } else {
      speakText(t('replyError'), language);
    }
    
    // Clear transcript after a delay
    setTimeout(() => setTranscript(""), 3000);
  }, [navigate, language, t]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice functionality is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    
    // Mapping of languages to BCP-47 codes
    const langMap: Record<string, string> = {
      'English': 'en-IN',
      'Hindi': 'hi-IN',
      'Telugu': 'te-IN',
      'Tamil': 'ta-IN',
      'Marathi': 'mr-IN',
      'Gujarati': 'gu-IN',
      'Kannada': 'kn-IN',
      'Malayalam': 'ml-IN',
      'Punjabi': 'pa-IN',
      'Bangla': 'bn-IN'
    };

    recognition.lang = langMap[language] || 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
    };
    
    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript;
      handleCommand(command);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
    speakText(t('listening'), language);
  };

  // Speak guidance on home page mount
  useEffect(() => {
    if (location.pathname === '/') {
        // Only greet on home page once per session
        const guided = sessionStorage.getItem('home_guided');
        if (!guided) {
            const timer = setTimeout(() => {
                speakText(t('homeGuidance'), language);
                sessionStorage.setItem('home_guided', 'true');
            }, 1500);
            return () => clearTimeout(timer);
        }
    }
  }, [location.pathname, language, t]);

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-sm font-medium shadow-xl border border-white/10 max-w-[200px] text-center"
          >
            "{transcript}"
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => speakText(language === 'English' ? "Click the microphone to speak a command" : language === 'Telugu' ? "కమాండ్ చెప్పడానికి మైక్రోఫోన్‌ క్లిక్ చేయండి" : "कमांड बोलने के लिए माइक्रोफोन पर क्लिक करें", language)}
          className="h-12 w-12 rounded-full shadow-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border border-emerald-200"
          size="icon"
        >
          <Volume2 className="h-5 w-5" />
        </Button>
      </motion.div>

      <div className="relative">
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.5 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 bg-emerald-400 rounded-full"
            />
          )}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isListening ? {
            y: [0, -5, 0],
          } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Button
            onClick={toggleListening}
            className={`relative h-16 w-16 rounded-full shadow-2xl border-4 z-10 ${
              isListening 
                ? 'bg-emerald-500 hover:bg-emerald-600 border-white text-white' 
                : 'bg-[#106A3A] hover:bg-[#0A4A28] border-emerald-200 text-white'
            }`}
            size="icon"
          >
            {isListening ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <Mic className="h-7 w-7 text-white drop-shadow-md" />
              </motion.div>
            ) : (
              <Mic className="h-7 w-7 text-white drop-shadow-md" />
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
