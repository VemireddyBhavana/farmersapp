import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
// For a large app, these should be in separate JSON files.
// For now, I'll define them in a structured way to get started.

const resources = {
    en: {
        translation: {
            "welcome": "Welcome back",
            "farmer": "Farmer",
            "footer_tagline": "Empowering Rural India with Tech",
            "nav": {
                "dashboard": "Dashboard",
                "rent": "Rent Equipment",
                "weather": "Weather",
                "market": "Market Rates",
                "ai-assistant": "AI Assistant",
                "track-applications": "Track App",
                "growing-guide": "Guides",
                "schemes": "Schemes",
                "map": "Map",
                "login": "Login / Register"
            },
            "dashboard": {
                "title": "Welcome back, {{name}}! 🌾",
                "subtitle": "Welcome to KisanTech. Here's your agricultural overview for today.",
                "active_bookings": "Active Bookings",
                "crop_health": "Crop Health Score",
                "market_trends": "Market Trends",
                "today": "Today",
                "view_market": "Market",
                "detect_title": "Detect Disease",
                "search_placeholder": "Search tractors, tools..."
            },
            "support": {
                "title": "Farmer Support & Protection",
                "income": "Income Support",
                "risk": "Risk Support",
                "pest": "Pest Control",
                "track": "Track Application",
                "income_desc": "Apply for direct benefit transfer.",
                "risk_desc": "Crop insurance and relief.",
                "pest_desc": "Manage crop pests and diseases.",
                "track_desc": "Check your application status."
            },
            "common": {
                "search_schemes": "Search schemes...",
                "eligibility": "Eligibility",
                "about": "About",
                "deadline": "Deadline",
                "apply_now": "Apply Now",
                "visit_portal": "Visit Official Portal",
                "read_guide": "Read Full Guide",
                "syncing": "Syncing...",
                "saving": "Saving..."
            },
            "schemes": {
                "subtitle": "Central & State agricultural welfare programs",
                "help_title": "Need Help Applying?",
                "help_desc": "Call Kisan Call Centre at 1800-180-1551 (free, 24x7) or ask KisanAI for step-by-step guidance."
            },
            "categories": {
                "all": "All",
                "income_support": "Income Support",
                "crop_insurance": "Crop Insurance",
                "mechanization": "Mechanization",
                "other": "Other"
            },
            "calendar": {
                "subtitle": "Optimal sowing and harvesting schedules for your region",
                "best_window": "Best Window",
                "sowing_window": "Sowing Window",
                "harvest_time": "Harvest Time",
                "schedule_sync": "Schedule & Sync",
                "sync_status": "Database Sync Status",
                "last_synced": "Last synced",
                "add_event": "Add Planning Event",
                "event_placeholder": "Task e.g. Soil Prepare",
                "add_to_calendar": "Add to Calendar",
                "advisory_notice": "Advisory Notice",
                "advisory_desc": "Due to delayed monsoons in Chittoor district, we recommend adjusting your paddy sowing window by 10 days.",
                "quote": "Patience in sowing brings abundance in reaping."
            },
            "chat": {
                "placeholder": "Ask about tractors, crops, schemes..."
            },
            "guides": {
                "title": "Growing Guides",
                "phases": "Growth Phases",
                "protection": "Smart Protection",
                "expert_tip": "Expert Tip",
                "overview": "Overview"
            },
            "forms": {
                "personal": "Personal Information",
                "land": "Land Details",
                "docs": "Documentation",
                "submit": "Submit Application",
                "success": "Application Submitted!"
            },
            "track": {
                "title": "Track Applications",
                "status": "Filter Status",
                "next_update": "Next Update In",
                "no_apps": "No Applications Found"
            }
        }
    },
    hi: {
        translation: {
            "welcome": "स्वागत है",
            "farmer": "किसान",
            "footer_tagline": "तकनीक के साथ ग्रामीण भारत को सशक्त बनाना",
            "nav": {
                "dashboard": "डैशबोर्ड",
                "rent": "किराये पर लें",
                "weather": "मौसम",
                "market": "बाजार भाव",
                "ai-assistant": "AI सहायक",
                "track-applications": "ट्रैक करें",
                "growing-guide": "मार्गदर्शिका",
                "schemes": "योजनाएं",
                "map": "मानचित्र",
                "login": "लॉगइन / रजिस्टर"
            },
            "dashboard": {
                "title": "स्वागत है, {{name}}! 🌾",
                "subtitle": "किसानटेक में आपका स्वागत है। आज का कृषि अवलोकन यहाँ है।",
                "active_bookings": "सक्रिय बुकिंग",
                "crop_health": "फसल स्वास्थ्य",
                "market_trends": "बाजार रुझान",
                "today": "आज",
                "view_market": "बाजार",
                "detect_title": "रोग पहचानें",
                "search_placeholder": "ट्रैक्टर, उपकरण खोजें..."
            },
            "support": {
                "title": "किसान सहायता और सुरक्षा",
                "income": "आय सहायता",
                "risk": "जोखिम सहायता",
                "pest": "कीट नियंत्रण",
                "track": "आवेदन ट्रैक करें",
                "income_desc": "सीधे लाभ हस्तांतरण के लिए आवेदन करें।",
                "risk_desc": "फसल बीमा और राहत।",
                "pest_desc": "फसल कीटों और रोगों का प्रबंधन करें।",
                "track_desc": "अपने आवेदन की स्थिति जांचें।"
            },
            "common": {
                "search_schemes": "योजनाएं खोजें...",
                "eligibility": "पात्रता",
                "about": "विवरण",
                "deadline": "समय सीमा",
                "apply_now": "अभी आवेदन करें",
                "visit_portal": "आधिकारिक पोर्टल",
                "read_guide": "पूरी गाइड पढ़ें",
                "syncing": "सिंक हो रहा है...",
                "saving": "सहेज रहा है..."
            },
            "schemes": {
                "subtitle": "केंद्रीय और राज्य कृषि कल्याण कार्यक्रम",
                "help_title": "आवेदन में सहायता चाहिए?",
                "help_desc": "किसान कॉल सेंटर को 1800-180-1551 पर कॉल करें या चरण-दर-चरण मार्गदर्शन के लिए KisanAI से पूछें।"
            },
            "categories": {
                "all": "सभी",
                "income_support": "आय सहायता",
                "crop_insurance": "फसल बीमा",
                "mechanization": "यंत्रीकरण",
                "other": "अन्य"
            },
            "calendar": {
                "subtitle": "आपके क्षेत्र के लिए सर्वोत्तम बुआई और कटाई का समय",
                "best_window": "सर्वोत्तम समय",
                "sowing_window": "बुआई का समय",
                "harvest_time": "कटाई का समय",
                "schedule_sync": "शेड्यूल और सिंक",
                "sync_status": "डेटाबेस सिंक स्थिति",
                "last_synced": "पिछला सिंक",
                "add_event": "नियोजन घटना जोड़ें",
                "event_placeholder": "कार्य जैसे मिट्टी की तैयारी",
                "add_to_calendar": "कैलेंडर में जोड़ें",
                "advisory_notice": "सलाहकार नोटिस",
                "advisory_desc": "चित्तूर जिले में मानसून की देरी के कारण, हम आपकी धान की बुवाई को 10 दिन आगे बढ़ाने की सलाह देते हैं।",
                "quote": "बुआई में धैर्य कटाई में समृद्धि लाता है।"
            },
            "chat": {
                "placeholder": "ट्रैक्टर, फसल, योजनाओं के बारे में पूछें..."
            },
            "guides": {
                "title": "फसल गाइड",
                "phases": "विकास के चरण",
                "protection": "स्मार्ट सुरक्षा",
                "expert_tip": "विशेषज्ञ टिप",
                "overview": "अवलोकन"
            },
            "forms": {
                "personal": "व्यक्तिगत जानकारी",
                "land": "भूमि का विवरण",
                "docs": "दस्तावेज़ीकरण",
                "submit": "आवेदन जमा करें",
                "success": "आवेदन जमा हो गया!"
            },
            "track": {
                "title": "आवेदन ट्रैक करें",
                "status": "स्थिति फ़िल्टर",
                "next_update": "अगला अपडेट",
                "no_apps": "कोई आवेदन नहीं मिला"
            }
        }
    },
    te: {
        translation: {
            "welcome": "తిరిగి స్వాగతం",
            "farmer": "రైతు",
            "footer_tagline": "టెక్నాలజీతో గ్రామీణ భారత్ సాధికారత",
            "nav": {
                "dashboard": "డాష్‌బోర్డ్",
                "rent": "అద్దెకు తీసుకోండి",
                "weather": "వాతావరణం",
                "market": "మార్కెట్ ధరలు",
                "ai-assistant": "AI అసిస్టెంట్",
                "track-applications": "ట్రాక్ చేయండి",
                "growing-guide": "గాడ్స్",
                "schemes": "పథకాలు",
                "map": "మ్యాప్",
                "login": "లాగిన్ / రిజిస్టర్"
            },
            "dashboard": {
                "title": "తిరిగి స్వాగతం, {{name}}! 🌾",
                "subtitle": "కిసాన్‌టెక్ కి స్వాగతం. ఈరోజు మీ వ్యవసాయ అవలోకనం ఇక్కడ ఉంది.",
                "active_bookings": "క్రియాశీల బుకింగ్‌లు",
                "crop_health": "పంట ఆరోగ్యం",
                "market_trends": "మార్కెట్ పోకడలు",
                "today": "ఈరోజు",
                "view_market": "మార్కెట్",
                "detect_title": "వ్యాధి గుర్తింపు",
                "search_placeholder": "ట్రాక్టర్లు, పరికరాల కోసం వెతకండి..."
            },
            "support": {
                "title": "రైతు సహాయం & రక్షణ",
                "income": "ఆదాయ సహాయం",
                "risk": "రిస్క్ సపోర్ట్",
                "pest": "కీటక నియంత్రణ",
                "track": "దరఖాస్తు ట్రాక్",
                "income_desc": "నేరుగా నగదు బదిలీ కోసం దరఖాస్తు చేయండి.",
                "risk_desc": "పంట బీమా మరియు ఉపశమనం.",
                "pest_desc": "పంట పొరుగులను మరియు వ్యాధులను నిర్వహించండి.",
                "track_desc": "మీ దరఖాస్తు స్థితిని తనిఖీ చేయండి."
            },
            "common": {
                "search_schemes": "పథకాల కోసం వెతకండి...",
                "eligibility": "అర్హత",
                "about": "గురించి",
                "deadline": "గడువు",
                "apply_now": "ఇప్పుడే దరఖాస్తు చేయండి",
                "visit_portal": "అధికారిక పోర్టల్",
                "read_guide": "పూర్తి గైడ్ చదవండి",
                "syncing": "సింక్ అవుతోంది...",
                "saving": "సేవ్ అవుతోంది..."
            },
            "schemes": {
                "subtitle": "కేంద్ర & రాష్ట్ర వ్యవసాయ సంక్షేమ కార్యక్రమాలు",
                "help_title": "దరఖాస్తు చేయడంలో సహాయం కావాలా?",
                "help_desc": "కిసాన్ కాల్ సెంటర్‌కు 1800-180-1551 (ఉచితం, 24x7) కాల్ చేయండి లేదా సహాయం కోసం KisanAIని అడగండి."
            },
            "categories": {
                "all": "అన్నీ",
                "income_support": "ఆదాయ సహాయం",
                "crop_insurance": "పంట బీమా",
                "mechanization": "యాంత్రీకరణ",
                "other": "ఇతర"
            },
            "calendar": {
                "subtitle": "మీ ప్రాంతం కోసం విత్తే మరియు కోత కోసే ఉత్తమ సమయాలు",
                "best_window": "ఉత్తమ సమయం",
                "sowing_window": "విత్తే సమయం",
                "harvest_time": "కోత సమయం",
                "schedule_sync": "షెడ్యూల్ & సింక్",
                "sync_status": "డేటాబేస్ సింక్ స్థితి",
                "last_synced": "చివరిగా సింక్ చేయబడింది",
                "add_event": "ప్లానింగ్ ఈవెంట్‌ను జోడించండి",
                "event_placeholder": "పని ఉదా: నేల తయారీ",
                "add_to_calendar": "క్యాలెండర్‌కు జోడించండి",
                "advisory_notice": "అడ్వైజరీ నోటీసు",
                "advisory_desc": "చిత్తూరు జిల్లాలో వర్షాలు ఆలస్యం కావడం వల్ల, వరి విత్తే సమయాన్ని 10 రోజులు వాయిదా వేయాలని మేము సిఫార్సు చేస్తున్నాము.",
                "quote": "విత్తడంలో ఓర్పు కోతలో సమృద్ధిని తెస్తుంది."
            },
            "chat": {
                "placeholder": "ట్రాక్టర్లు, పంటలు, పథకాల గురించి అడగండి..."
            }
        }
    },
    ta: {
        translation: {
            "welcome": "மீண்டும் வருக",
            "farmer": "விவசாயி",
            "footer_tagline": "தொழில்நுட்பத்துடன் கிராமப்புற இந்தியாவை மேம்படுத்துதல்",
            "nav": {
                "dashboard": "டாஷ்போர்டு",
                "rent": "வாடகை",
                "weather": "வானிலை",
                "market": "சந்தை விலை",
                "ai-assistant": "AI உதவியாளர்",
                "track-applications": "நிலை",
                "growing-guide": "வழிகாட்டி",
                "schemes": "திட்டங்கள்",
                "map": "வரைபடம்",
                "login": "உள்நுழை"
            },
            "dashboard": {
                "title": "வரவேற்கிறோம், {{name}}! 🌾",
                "subtitle": "கிசான்டெக் உங்களை வரவேற்கிறது. இன்றைய விவசாய விவரங்கள் இதோ.",
                "active_bookings": "பதிவுகள்",
                "crop_health": "பயிர் ஆரோக்கியம்",
                "market_trends": "சந்தை போக்கு",
                "today": "இன்று",
                "view_market": "சந்தை",
                "detect_title": "நோய் கண்டறிதல்",
                "search_placeholder": "தேடல்..."
            },
            "support": {
                "title": "விவசாயி ஆதரவு & பாதுகாப்பு",
                "income": "வருமான ஆதரவு",
                "risk": "பாதுகாப்பு ஆதரவு",
                "pest": "பூச்சி கட்டுப்பாடு",
                "track": "தொடர்ந்து கண்காணிக்க",
                "income_desc": "நேரடி பண உதவிக்கு விண்ணப்பிக்கவும்.",
                "risk_desc": "பயிர்க் காப்பீடு மற்றும் நிவாரணம்.",
                "pest_desc": "பூச்சிகள் மற்றும் நோய்களை நிர்வகிக்கவும்.",
                "track_desc": "உங்கள் விண்ணப்ப நிலையைச் சரிபார்க்கவும்."
            }
        }
    },
    kn: {
        translation: {
            "welcome": "ಸ್ವಾಗತ",
            "farmer": "ರೈತ",
            "footer_tagline": "ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ಗ್ರಾಮೀಣ ಭಾರತವನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು",
            "nav": {
                "dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
                "rent": "ಬಾಡಿಗೆ",
                "weather": "ಹವಾಮಾನ",
                "market": "ಮಾರುಕಟ್ಟೆ",
                "ai-assistant": "AI ಸಹಾಯಕ",
                "track-applications": "ಸ್ಥಿತಿ",
                "growing-guide": "ಮಾರ್ಗದರ್ಶಿ",
                "schemes": "ಯೋಜನೆಗಳು",
                "map": "ನಕ್ಷೆ",
                "login": "ಲಾಗಿನ್"
            },
            "dashboard": {
                "title": "ಸ್ವಾಗತ, {{name}}! 🌾",
                "subtitle": "ಕಿಸಾನ್‌ಟೆಕ್‌ಗೆ ಸ್ವಾಗತ. ಇಂದಿನ ಕೃಷಿ ಅವಲೋಕನ ಇಲ್ಲಿದೆ.",
                "active_bookings": "ಬುಕಿಂಗ್‌ಗಳು",
                "crop_health": "ಬೆಳೆ ಆರೋಗ್ಯ",
                "market_trends": "ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿ",
                "today": "ಇಂದು",
                "view_market": "ಮಾರುಕಟ್ಟೆ",
                "detect_title": "ರೋಗ ಪತ್ತೆ",
                "search_placeholder": "ಹುಡುಕಿ..."
            },
            "support": {
                "title": "ರೈತ ಬೆಂಬಲ ಮತ್ತು ರಕ್ಷಣೆ",
                "income": "ಆದಾಯ ಬೆಂಬಲ",
                "risk": "ಅಪಾಯ ಬೆಂಬಲ",
                "pest": "ಕೀಟ ನಿಯಂತ್ರಣ",
                "track": "ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ",
                "income_desc": "ನೇರ ಲಾಭ ವರ್ಗಾವಣೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.",
                "risk_desc": "ಬೆಳೆ ವಿಮೆ ಮತ್ತು ಪರಿಹಾರ.",
                "pest_desc": "ಬೆಳೆ ಕೀಟಗಳು ಮತ್ತು ರೋಗಗಳನ್ನು ನಿರ್ವಹಿಸಿ.",
                "track_desc": "ನಿಮ್ಮ ಅರ್ಜಿಯ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ."
            }
        }
    },
    mr: {
        translation: {
            "welcome": "सुस्वागतम",
            "farmer": "शेतकरी",
            "footer_tagline": "तंत्रज्ञानाद्वारे ग्रामीण भारताचे सबलीकरण",
            "nav": {
                "dashboard": "डॅशबोर्ड",
                "rent": "भाड्याने घ्या",
                "weather": "हवामान",
                "market": "बाजार भाव",
                "ai-assistant": "AI सहाय्यक",
                "track-applications": "ट्रॅक",
                "growing-guide": "मार्गदर्शक",
                "schemes": "योजना",
                "map": "नकाशा",
                "login": "लॉगिन"
            },
            "dashboard": {
                "title": "स्वागत आहे, {{name}}! 🌾",
                "subtitle": "किसानटेक मध्ये आपले स्वागत आहे. आजचा कृषी आढावा येथे आहे.",
                "active_bookings": "बुकिंग",
                "crop_health": "पीक आरोग्य",
                "market_trends": "बाजार कल",
                "today": "आज",
                "view_market": "बाजार",
                "detect_title": "रोग ओळख",
                "search_placeholder": "शोधा..."
            },
            "support": {
                "title": "शेतकरी सहाय्य आणि संरक्षण",
                "income": "उत्पन्न सहाय्य",
                "risk": "जोखीम सहाय्य",
                "pest": "कीड नियंत्रण",
                "track": "अर्जाचा मागोवा",
                "income_desc": "थेट लाभासाठी अर्ज करा.",
                "risk_desc": "पीक विमा आणि मदत.",
                "pest_desc": "कीड आणि रोगांचे व्यवस्थापन करा.",
                "track_desc": "तुमच्या अर्जाची स्थिती तपासा."
            }
        }
    },
    gu: {
        translation: {
            "welcome": "સ્વાગત છે",
            "farmer": "ખેડૂત",
            "footer_tagline": "ટેકનોલોજી દ્વારા ગ્રામીણ ભારતનું સશક્તિકરણ",
            "nav": {
                "dashboard": "ડેશબોર્ડ",
                "rent": "ભાડું",
                "weather": "હવામાન",
                "market": "બજાર ભાવ",
                "ai-assistant": "AI સહાયક",
                "track-applications": "સ્થિતિ",
                "growing-guide": "માર્ગદર્શિકા",
                "schemes": "યોજનાઓ",
                "map": "નકશો",
                "login": "લોગિન"
            },
            "dashboard": {
                "title": "સ્વાગત છે, {{name}}! 🌾",
                "subtitle": "કિસાનટેકમાં તમારું સ્વાગત છે. આજની ખેતીની વિગતો અહીં છે.",
                "active_bookings": "બુકિંગ",
                "crop_health": "પાક સ્વાસ્થ્ય",
                "market_trends": "બજાર વલણ",
                "today": "આજે",
                "view_market": "બજાર",
                "detect_title": "રોગ ઓળખ",
                "search_placeholder": "શોધો..."
            },
            "support": {
                "title": "ખેડૂત સહાય અને રક્ષણ",
                "income": "આવક સહાય",
                "risk": "જોખમ સહાય",
                "pest": "જીવાત નિયંત્રણ",
                "track": "અરજી ટ્રેક કરો",
                "income_desc": "સીધા લાભ માટે અરજી કરો.",
                "risk_desc": "પાક વીમો અને રાહત.",
                "pest_desc": "જીવાત અને રોગોનું સંચાલન કરો.",
                "track_desc": "તમારી અરજીની સ્થિતિ તપાસો."
            }
        }
    },
    ml: {
        translation: {
            "welcome": "സ്വാഗതം",
            "farmer": "കർഷകൻ",
            "footer_tagline": "സാങ്കേതികവിദ്യയിലൂടെ ഗ്രാമീണ ഭാരതത്തെ ശാക്തീകരിക്കുന്നു",
            "nav": {
                "dashboard": "ഡാഷ്ബോർഡ്",
                "rent": "വാടക",
                "weather": "കാലാവസ്ഥ",
                "market": "വിപണി നിലവാരം",
                "ai-assistant": "AI സഹായി",
                "track-applications": "നില",
                "growing-guide": "ഗൈഡ്",
                "schemes": "പദ്ധതികൾ",
                "map": "ഭൂപടം",
                "login": "ലോഗിൻ"
            },
            "dashboard": {
                "title": "സ്വാഗതം, {{name}}! 🌾",
                "subtitle": "കിസാൻടെക്കിലേക്ക് സ്വാഗതം. ഇന്നത്തെ കൃഷി വിവരങ്ങൾ ഇതാ.",
                "active_bookings": "ബുക്കിംഗുകൾ",
                "crop_health": "വിള ആരോഗ്യം",
                "market_trends": "വിപണി പ്രവണത",
                "today": "ഇന്ന്",
                "view_market": "വിപണി",
                "detect_title": "രോഗം തിരിച്ചറിയൽ",
                "search_placeholder": "തിരയുക..."
            },
            "support": {
                "title": "കർഷക പിന്തുണയും സംരക്ഷണവും",
                "income": "വരുമാന സഹായം",
                "risk": "റിസ്ക് സപ്പോർട്ട്",
                "pest": "കീടനിയന്ത്രണം",
                "track": "അപേക്ഷ ട്രാക്ക് ചെയ്യുക",
                "income_desc": "നേരിട്ടുള്ള ആനുകൂല്യത്തിന് അപേക്ഷിക്കുക.",
                "risk_desc": "വിള ഇൻഷുറൻസും ആശ്വാസവും.",
                "pest_desc": "കീടങ്ങളും രോഗങ്ങളും നിയന്ത്രിക്കുക.",
                "track_desc": "അപേക്ഷയുടെ നില പരിശോധിക്കുക."
            }
        }
    },
    pa: {
        translation: {
            "welcome": "ਜੀ ਆਇਆਂ ਨੂੰ",
            "farmer": "ਕਿਸਾਨ",
            "footer_tagline": "ਤਕਨਾਲੋਜੀ ਰਾਹੀਂ ਪੇਂਡੂ ਭਾਰਤ ਦਾ ਸਸ਼ਕਤੀਕਰਨ",
            "nav": {
                "dashboard": "ਡੈਸ਼ਬੋਰਡ",
                "rent": "ਕਿਰਾਏ 'ਤੇ ਲੈਣਾ",
                "weather": "ਮੌਸਮ",
                "market": "ਮੰਡੀ ਦੇ ਭਾਅ",
                "ai-assistant": "AI ਸਹਾਇਕ",
                "track-applications": "ਸਥਿਤੀ",
                "growing-guide": "ਗਾਈਡ",
                "schemes": "ਯੋਜਨਾਵਾਂ",
                "map": "ਨਕਸ਼ਾ",
                "login": "ਲੌਗਇਨ"
            },
            "dashboard": {
                "title": "ਜੀ ਆਇਆਂ ਨੂੰ, {{name}}! 🌾",
                "subtitle": "ਕਿਸਾਨਟੈੱਕ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਤੁਹਾਡਾ ਅੱਜ ਦਾ ਖੇਤੀ ਵੇਰਵਾ ਇੱਥੇ ਹੈ।",
                "active_bookings": "ਬੁਕਿੰਗ",
                "crop_health": "ਫਸਲ ਦੀ ਸਿਹਤ",
                "market_trends": "ਮੰਡੀ ਦੇ ਰੁਝਾਨ",
                "today": "ਅੱਜ",
                "view_market": "ਮੰਡੀ",
                "detect_title": "ਬਿਮਾਰੀ ਦੀ ਪਛਾਣ",
                "search_placeholder": "ਖੋਜੋ..."
            },
            "support": {
                "title": "ਕਿਸਾਨ ਸਹਾਇਤਾ ਅਤੇ ਸੁਰੱਖਿਆ",
                "income": "ਆਮਦਨ ਸਹਾਇਤਾ",
                "risk": "ਜੋਖਮ ਸਹਾਇਤਾ",
                "pest": "ਕੀਟ ਕੰਟਰੋਲ",
                "track": "ਅਰਜ਼ੀ ਟ੍ਰੈਕ ਕਰੋ",
                "income_desc": "ਸਿੱਧੀ ਸਹਾਇਤਾ ਲਈ ਅਰਜ਼ੀ ਦਿਓ।",
                "risk_desc": "ਫਸਲ ਬੀਮਾ ਅਤੇ ਰਾਹਤ।",
                "pest_desc": "ਕੀੜਿਆਂ ਅਤੇ ਬਿਮਾਰੀਆਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ।",
                "track_desc": "ਆਪਣੀ ਅਰਜ਼ੀ ਦੀ ਸਥਿਤੀ ਦੀ ਜਾਂਚ ਕਰੋ।"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
            caches: ['localStorage'],
        }
    });

export default i18n;
