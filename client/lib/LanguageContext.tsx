import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "English" | "Hindi" | "Telugu" | "Tamil" | "Marathi" | "Gujarati" | "Kannada" | "Malayalam" | "Punjabi" | "Bangla";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  English: {
    home: "Home",
    weather: "Weather",
    market: "Market",
    calendar: "Calendar",
    security: "Security",
    aiChat: "AI Chat",
    schemes: "Schemes",
    government: "Government",
    rent: "Rent",
    settings: "Settings",
    login: "Login",
    welcome: "Welcome back, Ramarao!",
    agriOverview: "Everything looks good for farming today. Here's your agricultural overview.",
    bookTractor: "Book a Tractor",
    viewAll: "View All",
    applyNow: "Apply Now",
    trackApp: "Track Applications",
    plantingCalendar: "Planting Calendar",
    weatherAnalysis: "Live Weather Analysis & Recommendations",
    marketPrices: "Live Market Prices",
    cropEstimator: "Crop Price Estimator",
    findSchemes: "Find Schemes for Your Location",
    growingGuide: "Growing Guide",
    viewGrowingGuide: "View Growing Guide",
    pestsAndDiseases: "Pest & Disease Management",
    officialServices: "One-Click Access to Official Government Services",
  },
  Telugu: {
    home: "హోమ్",
    weather: "వాతావరణం",
    market: "మార్కెట్",
    calendar: "క్యాలెండర్",
    security: "భద్రత",
    aiChat: "AI చాట్",
    schemes: "పథకాలు",
    government: "ప్రభుత్వం",
    rent: "అద్దె",
    settings: "సెట్టింగులు",
    login: "లాగిన్",
    welcome: "తిరిగి స్వాగతం, రామారావు!",
    agriOverview: "ఈరోజు వ్యవసాయానికి అంతా బాగుంది. ఇక్కడ మీ వ్యవసాయ అవలోకనం ఉంది.",
    bookTractor: "ట్రాక్టర్ బుక్ చేయండి",
    viewAll: "అన్నీ చూడండి",
    applyNow: "ఇప్పుడే దరఖాస్తు చేసుకోండి",
    trackApp: "దరఖాస్తులను ట్రాక్ చేయండి",
    plantingCalendar: "నాటడం క్యాలెండర్",
    weatherAnalysis: "ప్రత్యక్ష వాతావరణ విశ్లేషణ & సిఫార్సులు",
    marketPrices: "ప్రత్యక్ష మార్కెట్ ధరలు",
    cropEstimator: "పంట ధర అంచనా వేసేది",
    findSchemes: "మీ స్థానం కోసం పథకాలను కనుగొనండి",
    growingGuide: "సాగు మార్గదర్శిని",
    viewGrowingGuide: "సాగు మార్గదర్శిని చూడండి",
    pestsAndDiseases: "కీటకాలు & వ్యాధుల నిర్వహణ",
    officialServices: "అధికారిక ప్రభుత్వ సేవలకు ఒకే క్లిక్ యాక్సెస్",
  },
  Hindi: {
    home: "होम",
    weather: "मौसम",
    market: "बाजार",
    calendar: "कैलेंडर",
    security: "सुरक्षा",
    aiChat: "AI चैट",
    schemes: "योजनाएं",
    government: "सरकार",
    rent: "किराया",
    settings: "सेटिङ्ग्ज़",
    login: "लॉगिन",
    welcome: "वापस स्वागत है, रामराव!",
    agriOverview: "आज खेती के लिए सब कुछ अच्छा लग रहा है। यहाँ आपका कृषि अवलोकन है।",
    bookTractor: "ट्रैक्टर बुक करें",
    viewAll: "सभी देखें",
    applyNow: "अभी आवेदन करें",
    trackApp: "आवेदनों को ट्रैक करें",
    plantingCalendar: "बुवाई कैलेंडर",
    weatherAnalysis: "लाइव मौसम विश्लेषण और सिफारिशें",
    marketPrices: "लाइव बाजार कीमतें",
    cropEstimator: "फसल मूल्य अनुमानक",
    findSchemes: "अपने स्थान के लिए योजनाएं खोजें",
    growingGuide: "खेती गाइड",
    viewGrowingGuide: "खेती गाइड देखें",
    pestsAndDiseases: "कीट और रोग प्रबंधन",
    officialServices: "आधिकारिक सरकारी सेवाओं तक वन-क्लिक पहुंच",
  },
  // Adding placeholders for other languages to avoid crashes
  Tamil: { home: "வீடு", weather: "வானிலை", market: "சந்தை", calendar: "காலண்டர்", security: "பாதுகாப்பு", aiChat: "AI சாட்", schemes: "திட்டங்கள்", government: "அரசு", rent: "வாடகை", settings: "அமைப்புகள்", login: "உள்நுழை" },
  Marathi: { home: "होम", weather: "हवामान", market: "बाजार", calendar: "कॅलेंडर", security: "सुरक्षा", aiChat: "AI चॅट", schemes: "योजना", government: "सरकार", rent: "भाडे", settings: "सेटिंग्ज", login: "लॉगिन" },
  Gujarati: { home: "હોમ", weather: "હવામાન", market: "બજાર", calendar: "કેલેન્ડર", security: "સુરક્ષા", aiChat: "AI ચેટ", schemes: "યોજનાઓ", government: "સરકાર", rent: "ભાડું", settings: "સેટિંગ્સ", login: "લોગિન" },
  Kannada: { home: "ಮನೆ", weather: "ಹವಾಮಾನ", market: "ಮಾರುಕಟ್ಟೆ", calendar: "ಕ್ಯಾಲೆಂಡರ್", security: "ಭದ್ರತೆ", aiChat: "AI ಚಾಟ್", schemes: "ಯೋಜನೆಗಳು", government: "ಸರ್ಕಾರ", rent: "ಬಾಡಿಗೆ", settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು", login: "ಲಾಗಿನ್" },
  Malayalam: { home: "ഹോം", weather: "കാലാവസ്ഥ", market: "മാർക്കറ്റ്", calendar: "കലണ്ടർ", security: "സുരക്ഷ", aiChat: "AI ചാറ്റ്", schemes: "പദ്ധതികൾ", government: "സർക്കാർ", rent: "വാടക", settings: "ക്രമീകരണങ്ങൾ", login: "ലോഗിൻ" },
  Punjabi: { home: "ਹੋਮ", weather: "ਮੌਸਮ", market: "ਮਾਰਕੀਟ", calendar: "ਕੈਲੰਡਰ", security: "ਸੁਰੱਖਿਆ", aiChat: "AI ਚੈਟ", schemes: "ਯੋਜਨਾਵਾਂ", government: "ਸਰਕਾਰ", rent: "ਕਿਰਾਇਆ", settings: "ਸੈਟਿੰਗਾਂ", login: "ਲੌਗਿਨ" },
  Bangla: { home: "হোম", weather: "আবহাওয়া", market: "বাজার", calendar: "ক্যালেন্ডার", security: "সুরক্ষা", aiChat: "AI চ্যাট", schemes: "প্রকল্প", government: "সরকার", rent: "ভাড়া", settings: "সেটিংস", login: "লগইন" },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("English");

  const t = (key: string) => {
    return translations[language][key] || translations["English"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
