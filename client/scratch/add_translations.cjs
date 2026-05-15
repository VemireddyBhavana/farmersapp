const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '../lib/i18n');
const languages = ['en', 'hi', 'te', 'ta', 'kn', 'mr', 'gu', 'pa', 'bn', 'or', 'ml'];

const translations = {
  en: {
    crop_tomato: "Tomato", crop_rice: "Rice (Paddy)", crop_wheat: "Wheat", crop_cotton: "Cotton", crop_chilli: "Chilli",
    crop_maize: "Maize (Corn)", crop_soybean: "Soybean", crop_sugarcane: "Sugarcane", crop_potato: "Potato", crop_onion: "Onion",
    task_sowing: "Sowing", task_irrigation: "Irrigation", task_fertilizing: "Fertilizing", task_weeding: "Weeding",
    task_spraying: "Spraying", task_harvesting: "Harvesting"
  },
  hi: {
    crop_tomato: "टमाटर", crop_rice: "चावल (धान)", crop_wheat: "गेहूँ", crop_cotton: "कपास", crop_chilli: "मिर्च",
    crop_maize: "मक्का", crop_soybean: "सोयाबीन", crop_sugarcane: "गन्ना", crop_potato: "आलू", crop_onion: "प्याज",
    task_sowing: "बुवाई", task_irrigation: "सिंचाई", task_fertilizing: "उर्वरक", task_weeding: "निराई",
    task_spraying: "छिड़काव", task_harvesting: "कटाई"
  },
  te: {
    crop_tomato: "టమాటా", crop_rice: "వరి", crop_wheat: "గోధుమ", crop_cotton: "పత్తి", crop_chilli: "మిరప",
    crop_maize: "మొక్కజొన్న", crop_soybean: "సోయాబీన్", crop_sugarcane: "చెరకు", crop_potato: "బంగాళాదుంప", crop_onion: "ఉల్లిపాయ",
    task_sowing: "విత్తడం", task_irrigation: "నీటి పారుదల", task_fertilizing: "ఎరువులు", task_weeding: "కలుపుతీత",
    task_spraying: "పిచికారీ", task_harvesting: "కోత"
  },
  ta: {
    crop_tomato: "தக்காளி", crop_rice: "நெல்", crop_wheat: "கோதுமை", crop_cotton: "பருத்தி", crop_chilli: "மிளகாய்",
    crop_maize: "மக்காச்சோளம்", crop_soybean: "சோயாபீன்", crop_sugarcane: "கரும்பு", crop_potato: "உருளைக்கிழங்கு", crop_onion: "வெங்காயம்",
    task_sowing: "விதைப்பு", task_irrigation: "நீர்ப்பாசனம்", task_fertilizing: "உரமிடுதல்", task_weeding: "களை எடுத்தல்",
    task_spraying: "தெளித்தல்", task_harvesting: "அறுவடை"
  },
  kn: {
    crop_tomato: "ಟೊಮೆಟೊ", crop_rice: "ಭತ್ತ", crop_wheat: "ಗೋಧಿ", crop_cotton: "ಹತ್ತಿ", crop_chilli: "ಮೆಣಸಿನಕಾಯಿ",
    crop_maize: "ಮೆಕ್ಕೆಜೋಳ", crop_soybean: "ಸೋಯಾಬೀನ್", crop_sugarcane: "ಕಬ್ಬು", crop_potato: "ಆಲೂಗಡ್ಡೆ", crop_onion: "ಈರುಳ್ಳಿ",
    task_sowing: "ಬಿತ್ತನೆ", task_irrigation: "ನೀರಾವರಿ", task_fertilizing: "ಗೊಬ್ಬರ", task_weeding: "ಕಳೆ ಕೀಳುವುದು",
    task_spraying: "ಸಿಂಪಡಣೆ", task_harvesting: "ಕೊಯ್ಲು"
  },
  mr: {
    crop_tomato: "टोमॅटो", crop_rice: "तांदूळ (भात)", crop_wheat: "गहू", crop_cotton: "कापूस", crop_chilli: "मिरची",
    crop_maize: "मका", crop_soybean: "सोयाबीन", crop_sugarcane: "ऊस", crop_potato: "बटाटा", crop_onion: "कांदा",
    task_sowing: "पेरणी", task_irrigation: "सिंचन", task_fertilizing: "खत देणे", task_weeding: "निंदणी",
    task_spraying: "फवारणी", task_harvesting: "काढणी"
  },
  gu: {
    crop_tomato: "ટામેટા", crop_rice: "ચોખા (ડાંગર)", crop_wheat: "ઘઉં", crop_cotton: "કપાસ", crop_chilli: "મરચું",
    crop_maize: "મકાઈ", crop_soybean: "સોયાબીન", crop_sugarcane: "શેરડી", crop_potato: "બટાકા", crop_onion: "ડુંગળી",
    task_sowing: "વાવણી", task_irrigation: "સિંચાઈ", task_fertilizing: "ખાતર", task_weeding: "નિંદામણ",
    task_spraying: "છંટકાવ", task_harvesting: "લણણી"
  },
  pa: {
    crop_tomato: "ਟਮਾਟਰ", crop_rice: "ਚਾਵਲ (ਝੋਨਾ)", crop_wheat: "ਕਣਕ", crop_cotton: "ਕਪਾਹ", crop_chilli: "ਮਿਰਚ",
    crop_maize: "ਮੱਕੀ", crop_soybean: "ਸੋਇਆਬੀਨ", crop_sugarcane: "ਗੰਨਾ", crop_potato: "ਆਲੂ", crop_onion: "ਪਿਆਜ਼",
    task_sowing: "ਬਿਜਾਈ", task_irrigation: "ਸਿੰਚਾਈ", task_fertilizing: "ਖਾਦ", task_weeding: "ਗੋਡੀ",
    task_spraying: "ਛਿੜਕਾਅ", task_harvesting: "ਵਾਢੀ"
  },
  bn: {
    crop_tomato: "টমেটো", crop_rice: "চাল (ধান)", crop_wheat: "গম", crop_cotton: "তুলা", crop_chilli: "মরিচ",
    crop_maize: "ভুট্টা", crop_soybean: "সয়াবিন", crop_sugarcane: "আখ", crop_potato: "আলু", crop_onion: "পেঁয়াজ",
    task_sowing: "বপন", task_irrigation: "সেচ", task_fertilizing: "সার দেওয়া", task_weeding: "নিড়ানি",
    task_spraying: "স্প্রে করা", task_harvesting: "ফসল কাটা"
  },
  or: {
    crop_tomato: "ଟମାଟୋ", crop_rice: "ଧାନ", crop_wheat: "ଗହମ", crop_cotton: "କପା", crop_chilli: "ଲଙ୍କା",
    crop_maize: "ମକା", crop_soybean: "ସୋୟାବିନ୍", crop_sugarcane: "ଆଖୁ", crop_potato: "ଆଳୁ", crop_onion: "ପିଆଜ",
    task_sowing: "ବୁଣିବା", task_irrigation: "ଜଳସେଚନ", task_fertilizing: "ଖତ ଦେବା", task_weeding: "ଘାସ ବାଛିବା",
    task_spraying: "ସ୍ପ୍ରେ କରିବା", task_harvesting: "ଅମଳ"
  },
  ml: {
    crop_tomato: "തക്കാളി", crop_rice: "നെല്ല്", crop_wheat: "ഗോതമ്പ്", crop_cotton: "പരുത്തി", crop_chilli: "മുളക്",
    crop_maize: "ചോളം", crop_soybean: "സോയാബീൻ", crop_sugarcane: "കരിമ്പ്", crop_potato: "ഉരുളക്കിഴങ്ങ്", crop_onion: "ഉള്ളി",
    task_sowing: "വിതയ്ക്കൽ", task_irrigation: "ജലസേചനം", task_fertilizing: "വളപ്രയോഗം", task_weeding: "കള പറിക്കൽ",
    task_spraying: "തളിക്കൽ", task_harvesting: "വിളവെടുപ്പ്"
  }
};

languages.forEach(lang => {
  const filePath = path.join(i18nDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const trans = translations[lang] || translations.en;
  
  let additions = '';
  for (const [key, val] of Object.entries(trans)) {
    if (!content.includes(`"${key}":`)) {
      additions += `    "${key}": "${val}",\n`;
    }
  }
  
  if (additions) {
    content = content.replace(/};\s*$/, `${additions}};\n`);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${lang}`);
  }
});
