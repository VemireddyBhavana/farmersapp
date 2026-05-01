const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, 'lib', 'i18n');

const translations = {
  hi: {
    nationalAgriPortal: "राष्ट्रीय कृषि पोर्टल में आपका स्वागत है",
    dashboardDesc: "वास्तविक समय की कमोडिटी मूल्य निर्धारण और मौसम डेटा प्राप्त करें।",
    fetchAreaData: "क्षेत्र डेटा प्राप्त करें",
    seedPortal: "बीज पोर्टल",
    kisanSuvidhaTitle: "किसान सुविधा",
    meteorologicalData: "मौसम विज्ञान डेटा",
    tempAndCond: "तापमान और स्थिति",
    syncingData: "डेटा सिंक हो रहा है...",
    portalServices: "पोर्टल सेवाएँ",
    aiCropDiagnostics: "AI फसल निदान",
    liveCommodityRates: "लाइव कमोडिटी दरें",
    nationalSchemes: "राष्ट्रीय योजनाएं",
    agriMachineryDB: "कृषि मशीनरी डेटाबेस",
    agriFarmingHub: "कृषि ज्ञान केंद्र",
    tagNew: "नया",
    today: "आज",
  },
  te: {
    nationalAgriPortal: "జాతీయ వ్యవసాయ పోర్టల్‌కు స్వాగతం",
    dashboardDesc: "నిజ-సమయ కమోడిటీ ధరలు మరియు వాతావరణ డేటాను పొందండి.",
    fetchAreaData: "ప్రాంతం డేటాను పొందండి",
    seedPortal: "విత్తన పోర్టల్",
    kisanSuvidhaTitle: "కిసాన్ సువిధ",
    meteorologicalData: "వాతావరణ డేటా",
    tempAndCond: "ఉష్ణోగ్రత & స్థితి",
    syncingData: "డేటా సింక్ అవుతోంది...",
    portalServices: "పోర్టల్ సేవలు",
    aiCropDiagnostics: "AI పంట నిర్ధారణ",
    liveCommodityRates: "లైవ్ కమోడిటీ ధరలు",
    nationalSchemes: "జాతీయ పథకాలు",
    agriMachineryDB: "వ్యవసాయ యంత్రాల డేటాబేస్",
    agriFarmingHub: "వ్యవసాయ జ్ఞాన కేంద్రం",
    tagNew: "కొత్త",
    today: "నేడు",
  },
  ta: {
    nationalAgriPortal: "தேசிய விவசாய போர்ட்டலுக்கு வரவேற்கிறோம்",
    dashboardDesc: "நிகழ்நேர பொருட்கள் விலை மற்றும் வானிலை தரவைப் பெறுங்கள்.",
    fetchAreaData: "பகுதி தரவைப் பெறுங்கள்",
    seedPortal: "விதை போர்டல்",
    kisanSuvidhaTitle: "கிசான் சுவிதா",
    meteorologicalData: "வானிலை தரவு",
    tempAndCond: "வெப்பநிலை & நிலை",
    syncingData: "தரவு ஒத்திசைக்கப்படுகிறது...",
    portalServices: "போர்டல் சேவைகள்",
    aiCropDiagnostics: "AI பயிர் நோய் கண்டறிதல்",
    liveCommodityRates: "நேரடி பொருட்கள் விலைகள்",
    nationalSchemes: "தேசிய திட்டங்கள்",
    agriMachineryDB: "விவசாய இயந்திரங்கள் தரவுத்தளம்",
    agriFarmingHub: "விவசாய அறிவு மையம்",
    tagNew: "புதியது",
    today: "இன்று",
  },
  kn: {
    nationalAgriPortal: "ರಾಷ್ಟ್ರೀಯ ಕೃಷಿ ಪೋರ್ಟಲ್‌ಗೆ ಸ್ವಾಗತ",
    dashboardDesc: "ನೈಜ-ಸಮಯದ ಸರಕು ಬೆಲೆಗಳು ಮತ್ತು ಹವಾಮಾನ ಡೇಟಾವನ್ನು ಪಡೆಯಿರಿ.",
    fetchAreaData: "ಪ್ರದೇಶದ ಡೇಟಾವನ್ನು ಪಡೆಯಿರಿ",
    seedPortal: "ಬಿತ್ತನೆ ಪೋರ್ಟಲ್",
    kisanSuvidhaTitle: "ಕಿಸಾನ್ ಸುವಿಧಾ",
    meteorologicalData: "ಹವಾಮಾನ ದತ್ತಾಂಶ",
    tempAndCond: "ತಾಪಮಾನ ಮತ್ತು ಸ್ಥಿತಿ",
    syncingData: "ದತ್ತಾಂಶ ಸಿಂಕ್ ಆಗುತ್ತಿದೆ...",
    portalServices: "ಪೋರ್ಟಲ್ ಸೇವೆಗಳು",
    aiCropDiagnostics: "AI ಬೆಳೆ ರೋಗನಿರ್ಣಯ",
    liveCommodityRates: "ಲೈವ್ ಸರಕು ದರಗಳು",
    nationalSchemes: "ರಾಷ್ಟ್ರೀಯ ಯೋಜನೆಗಳು",
    agriMachineryDB: "ಕೃಷಿ ಯಂತ್ರೋಪಕರಣಗಳ ಡೇಟಾಬೇಸ್",
    agriFarmingHub: "ಕೃಷಿ ಜ್ಞಾನ ಕೇಂದ್ರ",
    tagNew: "ಹೊಸ",
    today: "ಇಂದು",
  },
  ml: {
    nationalAgriPortal: "ദേശീയ കാർഷിക പോർട്ടലിലേക്ക് സ്വാഗതം",
    dashboardDesc: "തത്സമയ ചരക്ക് വിലകളും കാലാവസ്ഥാ ഡാറ്റയും നേടുക.",
    fetchAreaData: "ഏരിയ ഡാറ്റ നേടുക",
    seedPortal: "വിത്ത് പോർട്ടൽ",
    kisanSuvidhaTitle: "കിസാൻ സുവിധ",
    meteorologicalData: "കാലാവസ്ഥാ ഡാറ്റ",
    tempAndCond: "താപനിലയും അവസ്ഥയും",
    syncingData: "ഡാറ്റ സമന്വയിപ്പിക്കുന്നു...",
    portalServices: "പോർട്ടൽ സേവനങ്ങൾ",
    aiCropDiagnostics: "AI വിള രോഗനിർണ്ണയം",
    liveCommodityRates: "തത്സമയ ചരക്ക് നിരക്കുകൾ",
    nationalSchemes: "ദേശീയ പദ്ധതികൾ",
    agriMachineryDB: "കാർഷിക യന്ത്രസാമഗ്രികളുടെ ഡാറ്റാബേസ്",
    agriFarmingHub: "കാർഷിക വിജ്ഞാന കേന്ദ്രം",
    tagNew: "പുതിയത്",
    today: "ഇന്ന്",
  },
  bn: {
    nationalAgriPortal: "জাতীয় কৃষি পোর্টালে আপনাকে স্বাগত জানাই",
    dashboardDesc: "রিয়েল-টাইম পণ্য মূল্য এবং আবহাওয়ার তথ্য পান।",
    fetchAreaData: "এলাকার তথ্য পান",
    seedPortal: "বীজ পোর্টাল",
    kisanSuvidhaTitle: "কিষাণ সুবিধা",
    meteorologicalData: "আবহাওয়া তথ্য",
    tempAndCond: "তাপমাত্রা ও অবস্থা",
    syncingData: "তথ্য সিঙ্ক হচ্ছে...",
    portalServices: "পোর্টাল পরিষেবা",
    aiCropDiagnostics: "AI ফসল ডায়াগনস্টিকস",
    liveCommodityRates: "লাইভ পণ্য হার",
    nationalSchemes: "জাতীয় প্রকল্প",
    agriMachineryDB: "কৃষি যন্ত্রপাতি ডেটাবেস",
    agriFarmingHub: "কৃষি জ্ঞান কেন্দ্র",
    tagNew: "নতুন",
    today: "আজ",
  },
  mr: {
    nationalAgriPortal: "राष्ट्रीय कृषी पोर्टलवर आपले स्वागत आहे",
    dashboardDesc: "रिअल-टाइम कमोडिटी किंमत आणि हवामान डेटा मिळवा.",
    fetchAreaData: "क्षेत्र डेटा मिळवा",
    seedPortal: "बियाणे पोर्टल",
    kisanSuvidhaTitle: "किसान सुविधा",
    meteorologicalData: "हवामान डेटा",
    tempAndCond: "तापमान आणि स्थिती",
    syncingData: "डेटा सिंक होत आहे...",
    portalServices: "पोर्टल सेवा",
    aiCropDiagnostics: "AI पीक निदान",
    liveCommodityRates: "थेट कमोडिटी दर",
    nationalSchemes: "राष्ट्रीय योजना",
    agriMachineryDB: "कृषी यंत्रसामग्री डेटाबेस",
    agriFarmingHub: "कृषी ज्ञान केंद्र",
    tagNew: "नवीन",
    today: "आज",
  },
  pa: {
    nationalAgriPortal: "ਰਾਸ਼ਟਰੀ ਖੇਤੀਬਾੜੀ ਪੋਰਟਲ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ",
    dashboardDesc: "ਰੀਅਲ-ਟੀਮ ਕਮੋਡਿਟੀ ਕੀਮਤ ਅਤੇ ਮੌਸਮ ਦਾ ਡੇਟਾ ਪ੍ਰਾਪਤ ਕਰੋ।",
    fetchAreaData: "ਖੇਤਰ ਦਾ ਡੇਟਾ ਪ੍ਰਾਪਤ ਕਰੋ",
    seedPortal: "ਬੀਜ ਪੋਰਟਲ",
    kisanSuvidhaTitle: "ਕਿਸਾਨ ਸੁਵਿਧਾ",
    meteorologicalData: "ਮੌਸਮ ਵਿਗਿਆਨ ਡੇਟਾ",
    tempAndCond: "ਤਾਪਮਾਨ ਅਤੇ ਸਥਿਤੀ",
    syncingData: "ਡੇਟਾ ਸਿੰਕ ਹੋ ਰਿਹਾ ਹੈ...",
    portalServices: "ਪੋਰਟਲ ਸੇਵਾਵਾਂ",
    aiCropDiagnostics: "AI ਫਸਲ ਨਿਦਾਨ",
    liveCommodityRates: "ਲਾਈਵ ਕਮੋਡਿਟੀ ਦਰਾਂ",
    nationalSchemes: "ਰਾਸ਼ਟਰੀ ਸਕੀਮਾਂ",
    agriMachineryDB: "ਖੇਤੀਬਾੜੀ ਮਸ਼ੀਨਰੀ ਡੇਟਾਬੇਸ",
    agriFarmingHub: "ਖੇਤੀਬਾੜੀ ਗਿਆਨ ਕੇਂਦਰ",
    tagNew: "ਨਵਾਂ",
    today: "ਅੱਜ",
  },
  gu: {
    nationalAgriPortal: "રાષ્ટ્રીય કૃષિ પોર્ટલ પર આપનું સ્વાગત છે",
    dashboardDesc: "રીઅલ-ટાઇમ કોમોડિટી કિંમત અને હવામાન ડેટા મેળવો.",
    fetchAreaData: "વિસ્તારનો ડેટા મેળવો",
    seedPortal: "બીજ પોર્ટલ",
    kisanSuvidhaTitle: "કિસાન સુવિધા",
    meteorologicalData: "હવામાન ડેટા",
    tempAndCond: "તાપમાન અને સ્થિતિ",
    syncingData: "ડેટા સિંક થઈ રહ્યો છે...",
    portalServices: "પોર્ટલ સેવાઓ",
    aiCropDiagnostics: "AI પાક નિદાન",
    liveCommodityRates: "લાઇવ કોમોડિટી દરો",
    nationalSchemes: "રાષ્ટ્રીય યોજનાઓ",
    agriMachineryDB: "કૃષિ મશીનરી ડેટાબેઝ",
    agriFarmingHub: "કૃષિ જ્ઞાન કેન્દ્ર",
    tagNew: "નવું",
    today: "આજે",
  }
};

Object.keys(translations).forEach(lang => {
  const filePath = path.join(i18nDir, lang + '.ts');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const langData = translations[lang];
    
    Object.keys(langData).forEach(key => {
      const entry = `    ${key}: "${langData[key]}",`;
      // Check if key already exists
      if (!content.includes(`${key}:`)) {
        // Inject before the last };
        const lastBraceIndex = content.lastIndexOf('}');
        if (lastBraceIndex !== -1) {
          content = content.slice(0, lastBraceIndex) + entry + '\n' + content.slice(lastBraceIndex);
        }
      } else {
        // Replace existing key
        const regex = new RegExp(`${key}:\\s*".*?"`, 'g');
        content = content.replace(regex, `${key}: "${langData[key]}"`);
      }
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${lang}.ts`);
  }
});
