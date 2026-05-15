const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '../lib/i18n');
const languages = ['en', 'hi', 'te', 'ta', 'kn', 'mr', 'gu', 'pa', 'bn', 'or', 'ml'];

const t = {
  en: {
    kisanChaupal: "Kisan Chaupal",
    communityDescription: "Connect with farmers, share your progress, and get answers from verified experts.",
    createPost: "Create Post",
    createNewPost: "Create a new post",
    whatsOnYourMind: "What's on your mind? Share an update, ask a question, or post a success story...",
    postNow: "Post Now",
    offline: "Offline",
    offlineModeActive: "Offline Mode Active",
    pendingSync: "Pending Sync",
    syncingWithServer: "Syncing with Server...",
    writeComment: "Write a comment...",
    reply: "Reply",
    deletePost: "Delete Post",
    noCommentsYet: "No comments yet. Be the first to reply!",
    discussions: "Discussions",
    mandiPrices: "Mandi Prices",
    machinerySharing: "Machinery Sharing",
    agriNews: "Agri-News",
    crowdsourcedPrices: "Crowdsourced Prices",
    crowdsourcedPricesDesc: "Compare official mandi rates with what farmers are actually receiving.",
    reportPrice: "Report My Sale Price",
    officialPrice: "Official Price",
    communityPrice: "Community Price",
    peerMachinery: "Peer-to-Peer Machinery Sharing",
    peerMachineryDesc: "Rent directly from farmers near you.",
    listEquipment: "List My Equipment",
    day: "day"
  },
  hi: {
    kisanChaupal: "किसान चौपाल",
    communityDescription: "किसानों से जुड़ें, अपनी प्रगति साझा करें, और विशेषज्ञों से उत्तर प्राप्त करें।",
    createPost: "पोस्ट बनाएं",
    createNewPost: "नई पोस्ट बनाएं",
    whatsOnYourMind: "आपके मन में क्या है? अपडेट साझा करें, सवाल पूछें...",
    postNow: "अभी पोस्ट करें",
    offline: "ऑफ़लाइन",
    offlineModeActive: "ऑफ़लाइन मोड सक्रिय",
    pendingSync: "सिंक लंबित है",
    syncingWithServer: "सर्वर से सिंक हो रहा है...",
    writeComment: "टिप्पणी लिखें...",
    reply: "जवाब दें",
    deletePost: "पोस्ट हटाएं",
    noCommentsYet: "अभी तक कोई टिप्पणी नहीं। जवाब देने वाले पहले व्यक्ति बनें!",
    discussions: "चर्चा",
    mandiPrices: "मंडी के भाव",
    machinerySharing: "मशीनरी साझाकरण",
    agriNews: "कृषि समाचार",
    crowdsourcedPrices: "क्राउडसोर्स्ड कीमतें",
    crowdsourcedPricesDesc: "आधिकारिक मंडी दरों की तुलना किसानों को वास्तव में मिलने वाले भाव से करें।",
    reportPrice: "मेरी बिक्री कीमत दर्ज करें",
    officialPrice: "आधिकारिक कीमत",
    communityPrice: "समुदाय की कीमत",
    peerMachinery: "पीयर-टू-पीयर मशीनरी शेयरिंग",
    peerMachineryDesc: "अपने आस-पास के किसानों से सीधे किराए पर लें।",
    listEquipment: "मेरे उपकरण सूचीबद्ध करें",
    day: "दिन"
  },
  te: {
    kisanChaupal: "కిసాన్ చౌపాల్",
    communityDescription: "రైతులతో కనెక్ట్ అవ్వండి, నిపుణుల నుండి సమాధానాలు పొందండి.",
    createPost: "పోస్ట్ చేయండి",
    createNewPost: "కొత్త పోస్ట్ సృష్టించండి",
    whatsOnYourMind: "మీరు ఏమి ఆలోచిస్తున్నారు? మీ ప్రశ్నను అడగండి...",
    postNow: "ఇప్పుడే పోస్ట్ చేయండి",
    offline: "ఆఫ్‌లైన్",
    offlineModeActive: "ఆఫ్‌లైన్ మోడ్ ఆన్‌లో ఉంది",
    pendingSync: "సింక్ పెండింగ్",
    syncingWithServer: "సర్వర్‌తో సింక్ అవుతోంది...",
    writeComment: "వ్యాఖ్యను రాయండి...",
    reply: "ప్రత్యుత్తరం ఇవ్వండి",
    deletePost: "పోస్ట్‌ను తొలగించండి",
    noCommentsYet: "ఇంకా వ్యాఖ్యలు లేవు. మొదట మీరే ప్రత్యుత్తరం ఇవ్వండి!",
    discussions: "చర్చలు",
    mandiPrices: "మండి ధరలు",
    machinerySharing: "యంత్రాల భాగస్వామ్యం",
    agriNews: "వ్యవసాయ వార్తలు",
    crowdsourcedPrices: "సమాజం నుండి ధరలు",
    crowdsourcedPricesDesc: "అధికారిక మండి ధరలను రైతులు నిజంగా పొందుతున్న ధరలతో పోల్చండి.",
    reportPrice: "నా అమ్మకపు ధరను నమోదు చేయండి",
    officialPrice: "అధికారిక ధర",
    communityPrice: "సమాజం ధర",
    peerMachinery: "రైతుల మధ్య యంత్రాల భాగస్వామ్యం",
    peerMachineryDesc: "మీ దగ్గరలోని రైతుల నుండి నేరుగా అద్దెకు తీసుకోండి.",
    listEquipment: "నా పరికరాలను జాబితా చేయండి",
    day: "రోజు"
  }
};

languages.forEach(lang => {
  const filePath = path.join(i18nDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const trans = t[lang] || t.en;
  
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
