const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, 'lib', 'i18n');

const translations = {
  hi: {
    detectingLocation: "स्थान का पता लगाया जा रहा है...",
    scanningRegionalData: "क्षेत्रीय डेटा को स्कैन किया जा रहा है...",
    nearbyCropTrends: "पास की फसल के रुझान",
    popularity: "लोकप्रियता",
    trendsExplanation: "रुझान मंडी आवक और स्थानीय किसान पूछताछ के आधार पर गणना किए जाते हैं।",
    yourRegion: "आपका क्षेत्र",
    smartFarmingTools: "स्मार्ट खेती उपकरण",
  },
  te: {
    detectingLocation: "ప్రాంతాన్ని గుర్తిస్తోంది...",
    scanningRegionalData: "ప్రాంతీయ డేటాను స్కాన్ చేస్తోంది...",
    nearbyCropTrends: "సమీప పంట ధోరణులు",
    popularity: "ప్రజాదరణ",
    trendsExplanation: "మండి రాక పరిమాణాలు మరియు స్థానిక రైతు విచారణల ఆధారంగా ధోరణులు లెక్కించబడతాయి.",
    yourRegion: "మీ ప్రాంతం",
    smartFarmingTools: "స్మార్ట్ ఫార్మింగ్ టూల్స్",
  },
  ta: {
    detectingLocation: "இருப்பிடத்தைக் கண்டறிகிறது...",
    scanningRegionalData: "வட்டாரத் தரவை ஸ்கேன் செய்கிறது...",
    nearbyCropTrends: "அருகிலுள்ள பயிர் போக்குகள்",
    popularity: "பிரபலம்",
    trendsExplanation: "மண்டி வரவு அளவு மற்றும் உள்ளூர் விவசாயிகளின் விசாரணைகளின் அடிப்படையில் போக்குகள் கணக்கிடப்படுகின்றன.",
    yourRegion: "உங்கள் பிராந்தியம்",
    smartFarmingTools: "ஸ்மார்ட் விவசாயக் கருவிகள்",
  },
  kn: {
    detectingLocation: "ಸ್ಥಳವನ್ನು ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತಿದೆ...",
    scanningRegionalData: "ಪ್ರಾದೇಶಿಕ ದತ್ತಾಂಶವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    nearbyCropTrends: "ಹತ್ತಿರದ ಬೆಳೆ ಪ್ರವೃತ್ತಿಗಳು",
    popularity: "ಜನಪ್ರಿಯತೆ",
    trendsExplanation: "ಮಂಡಿ ಆಗಮನದ ಪ್ರಮಾಣ ಮತ್ತು ಸ್ಥಳೀಯ ರೈತರ ವಿಚಾರಣೆಗಳ ಆಧಾರದ ಮೇಲೆ ಪ್ರವೃತ್ತಿಗಳನ್ನು ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ.",
    yourRegion: "ನಿಮ್ಮ ಪ್ರದೇಶ",
    smartFarmingTools: "ಸ್ಮಾರ್ಟ್ ಫಾರ್ಮಿಂಗ್ ಪರಿಕರಗಳು",
  },
  ml: {
    detectingLocation: "സ്ഥാനം കണ്ടെത്തുന്നു...",
    scanningRegionalData: "പ്രാദേശിക ഡാറ്റ സ്കാൻ ചെയ്യുന്നു...",
    nearbyCropTrends: "സമീപത്തെ വിള ട്രെൻഡുകൾ",
    popularity: "പ്രശസ്തി",
    trendsExplanation: "മണ്ടി വരവ് അളവുകളുടെയും പ്രാദേശിക കർഷക അന്വേഷണങ്ങളുടെയും അടിസ്ഥാനത്തിലാണ് ട്രെൻഡുകൾ കണക്കാക്കുന്നത്.",
    yourRegion: "നിങ്ങളുടെ പ്രദേശം",
    smartFarmingTools: "സ്മാർട്ട് ഫാമിംഗ് ടൂളുകൾ",
  },
  bn: {
    detectingLocation: "অবস্থান সনাক্ত করা হচ্ছে...",
    scanningRegionalData: "আঞ্চলিক তথ্য স্ক্যান করা হচ্ছে...",
    nearbyCropTrends: "কাছাকাছি ফসলের প্রবণতা",
    popularity: "জনপ্রিয়তা",
    trendsExplanation: "মণ্ডি আগমনের পরিমাণ এবং স্থানীয় কৃষকদের অনুসন্ধানের ভিত্তিতে প্রবণতা গণনা করা হয়।",
    yourRegion: "আপনার অঞ্চল",
    smartFarmingTools: "স্মার্ট ফার্মিং টুলস",
  },
  mr: {
    detectingLocation: "स्थान शोधत आहे...",
    scanningRegionalData: "प्रादेशिक डेटा स्कॅन करत आहे...",
    nearbyCropTrends: "जवळपासचे पीक ट्रेंड",
    popularity: "लोकप्रियता",
    trendsExplanation: "मंडी आवक आणि स्थानिक शेतकरी चौकशीच्या आधारावर ट्रेंड मोजले जातात.",
    yourRegion: "तुमचा प्रदेश",
    smartFarmingTools: "स्मार्ट शेती साधने",
  },
  pa: {
    detectingLocation: "ਟਿਕਾਣੇ ਦਾ ਪਤਾ ਲਗਾਇਆ ਜਾ ਰਿਹਾ ਹੈ...",
    scanningRegionalData: "ਖੇਤਰੀ ਡੇਟਾ ਨੂੰ ਸਕੈਨ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
    nearbyCropTrends: "ਨੇੜਲੀ ਫਸਲ ਦੇ ਰੁਝਾਨ",
    popularity: "ਪ੍ਰਸਿੱਧੀ",
    trendsExplanation: "ਰੁਝਾਨ ਮੰਡੀ ਦੀ ਆਮਦ ਅਤੇ ਸਥਾਨਕ ਕਿਸਾਨਾਂ ਦੀ ਪੁੱਛਗਿੱਛ ਦੇ ਅਧਾਰ ਤੇ ਗਿਣੇ ਜਾਂਦੇ ਹਨ।",
    yourRegion: "ਤੁਹਾਡਾ ਖੇਤਰ",
    smartFarmingTools: "ਸਮਾਰ್ಟ ਫਾਰਮਿੰਗ ਟੂਲਸ",
  },
  gu: {
    detectingLocation: "સ્થાન શોધી રહ્યું છે...",
    scanningRegionalData: "પ્રાદેશિક ડેટા સ્કેન કરી રહ્યું છે...",
    nearbyCropTrends: "નજીકના પાક વલણો",
    popularity: "લોકપ્રિયતા",
    trendsExplanation: "મંડી આવક અને સ્થાનિક ખેડૂતોની પૂછપરછના આધારે વલણોની ગણતરી કરવામાં આવે છે.",
    yourRegion: "તમારો વિસ્તાર",
    smartFarmingTools: "સ્માર્ટ ફાર્મિંગ ટૂલ્સ",
  }
};

Object.keys(translations).forEach(lang => {
  const filePath = path.join(i18nDir, lang + '.ts');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const langData = translations[lang];
    
    Object.keys(langData).forEach(key => {
      const entry = `    ${key}: "${langData[key]}",`;
      if (!content.includes(`${key}:`)) {
        const lastBraceIndex = content.lastIndexOf('}');
        if (lastBraceIndex !== -1) {
          content = content.slice(0, lastBraceIndex) + entry + '\n' + content.slice(lastBraceIndex);
        }
      } else {
        const regex = new RegExp(`${key}:\\s*".*?"`, 'g');
        content = content.replace(regex, `${key}: "${langData[key]}"`);
      }
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${lang}.ts with additional keys`);
  }
});
