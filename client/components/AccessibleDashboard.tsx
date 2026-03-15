import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cloud, Wheat, IndianRupee, Sprout } from "lucide-react";
import { speakText } from "./VoiceAssistant";
import { useLanguage } from "../lib/LanguageContext";

export function AccessibleDashboard() {
  const { language } = useLanguage();

  const options = [
    {
      title: language === 'English' ? 'Sell Crops' : language === 'Telugu' ? 'పంటలను అమ్మండి' : 'फसल बेचें',
      icon: Wheat,
      path: '/market',
      color: 'bg-amber-100 text-amber-700 border-amber-300',
      speech: language === 'English' ? 'You selected Sell Crops. Taking you to the market.' : language === 'Telugu' ? 'మీరు పంటల విక్రయం ఎంచుకున్నారు. మార్కెట్‌కి వెళ్తున్నారు.' : 'आपने फसल बेचना चुना है। बाजार जा रहे हैं।'
    },
    {
      title: language === 'English' ? 'Crop Prices' : language === 'Telugu' ? 'పంట ధరలు' : 'फसल के दाम',
      icon: IndianRupee,
      path: '/market',
      color: 'bg-green-100 text-green-700 border-green-300',
      speech: language === 'English' ? 'You selected Crop Prices. Checking market rates.' : language === 'Telugu' ? 'మీరు పంట ధరలు ఎంచుకున్నారు. మార్కెట్ ధరలు తనిఖీ చేస్తున్నారు.' : 'आपने फसल के दाम चुना है। बाजार के दाम देख रहे हैं।'
    },
    {
      title: language === 'English' ? 'Weather' : language === 'Telugu' ? 'వాతావరణం' : 'मौसम',
      icon: Cloud,
      path: '/weather',
      color: 'bg-blue-100 text-blue-700 border-blue-300',
      speech: language === 'English' ? 'You selected Weather. Checking today\'s rain and temperature.' : language === 'Telugu' ? 'మీరు వాతావరణం ఎంచుకున్నారు. ఈరోజు వర్షం మరియు ఉష్ణోగ్రత తనిఖీ చేస్తున్నారు.' : 'आपने मौसम चुना है। आज की बारिश और तापमान देख रहे हैं।'
    },
    {
      title: language === 'English' ? 'Buy Seeds' : language === 'Telugu' ? 'విత్తనాలు కొనండి' : 'बीज खरीदें',
      icon: Sprout,
      path: '/seeds',
      color: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      speech: language === 'English' ? 'You selected Buy Seeds. Opening the seed store.' : language === 'Telugu' ? 'మీరు విత్తనాలు కొనడం ఎంచుకున్నారు. విత్తనాల దుకాణం తెరుస్తున్నారు.' : 'आपने बीज खरीदना चुना है। बीज की दुकान खोल रहे हैं।'
    }
  ];

  const handleOptionClick = (speechText: string) => {
    speakText(speechText, language);
  };

  return (
    <div className="py-8 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-black text-slate-800">
          {language === 'English' ? 'Quick Access' : language === 'Telugu' ? 'త్వరిత ప్రాప్యత' : 'त्वरित पहुंच'}
        </h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {options.map((opt, i) => (
          <Link to={opt.path} key={i}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOptionClick(opt.speech)}
              className={`flex flex-col items-center justify-center p-8 rounded-[2rem] border-4 shadow-xl cursor-pointer ${opt.color} h-48`}
            >
              <opt.icon className="h-16 w-16 mb-4" />
              <span className="text-xl font-black text-center leading-tight">
                {opt.title}
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
