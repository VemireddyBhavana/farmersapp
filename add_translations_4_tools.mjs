import fs from 'fs';
import path from 'path';

const dir = './client/lib/i18n';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

const newKeys = `
    // Advanced Agri Tools
    financeTitle: "Digital Khata (Farm Ledger)",
    financeDesc: "Track daily expenses, crop sales, and calculate true net profit.",
    predictPriceTitle: "Mandi Price Predictor AI",
    predictPriceDesc: "AI predictions to decide whether to sell or hold your harvest.",
    d2cTitle: "D2C Marketplace",
    d2cDesc: "Sell your premium produce directly to consumers and businesses.",
    droneTitle: "Drone Spraying Booking",
    droneDesc: "Book precision agri-drones for fast and safe chemical spraying.",
`;

const hiKeys = `
    // Advanced Agri Tools
    financeTitle: "डिजिटल खाता (फार्म लेजर)",
    financeDesc: "दैनिक खर्चों, फसल की बिक्री को ट्रैक करें और वास्तविक शुद्ध लाभ की गणना करें।",
    predictPriceTitle: "मंडी मूल्य भविष्यवाणी AI",
    predictPriceDesc: "अपनी फसल को बेचने या रखने का निर्णय लेने के लिए AI भविष्यवाणियां।",
    d2cTitle: "D2C मार्केटप्लेस",
    d2cDesc: "अपने प्रीमियम उत्पाद सीधे उपभोक्ताओं और व्यवसायों को बेचें।",
    droneTitle: "ड्रोन छिड़काव बुकिंग",
    droneDesc: "तेज और सुरक्षित रासायनिक छिड़काव के लिए सटीक कृषि-ड्रोन बुक करें।",
`;

const teKeys = `
    // Advanced Agri Tools
    financeTitle: "డిజిటల్ ఖాతా",
    financeDesc: "రోజువారీ ఖర్చులు, పంట అమ్మకాలను ట్రాక్ చేయండి మరియు నికర లాభాన్ని లెక్కించండి.",
    predictPriceTitle: "మండి ధర అంచనా AI",
    predictPriceDesc: "మీ పంటను విక్రయించాలా లేదా నిల్వ ఉంచాలా అని నిర్ణయించడానికి AI అంచనాలు.",
    d2cTitle: "D2C ఆన్‌లైన్ మార్కెట్",
    d2cDesc: "మీ నాణ్యమైన ఉత్పత్తులను నేరుగా వినియోగదారులకు మరియు వ్యాపారాలకు విక్రయించండి.",
    droneTitle: "డ్రోన్ స్ప్రేయింగ్ బుకింగ్",
    droneDesc: "వేగవంతమైన మరియు సురక్షితమైన రసాయన పిచికారీ కోసం డ్రోన్‌లను బుక్ చేయండి.",
`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if(content.includes('financeTitle')) return;

    let keysToAdd = newKeys;
    if (file === 'hi.ts') keysToAdd = hiKeys;
    if (file === 'te.ts') keysToAdd = teKeys;

    content = content.replace(/};\s*$/, keysToAdd + '};\n');
    fs.writeFileSync(filePath, content);
});
console.log("SUCCESS");
