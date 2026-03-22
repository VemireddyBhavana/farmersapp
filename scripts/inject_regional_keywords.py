
import re

file_path = r"d:\Desktop Data\project\farmersapp\client\lib\LanguageContext.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    original_content = f.read()

keyword_map = {
    "English": {
        "guidanceKeywords": "guidance, advice, help, how to, tips",
        "rentKeywords": "rent, tractor, machinery, equipment, booking",
        "schemeKeywords": "scheme, kisan, government, subsidy, eligibility",
        "cropKeywords": "tomato, rice, cotton, paddy, harvest, grow",
        "pestKeywords": "pest, disease, insect, leaf, doctor, scan",
        "marketKeywords": "price, mandi, rate, market, trend, sell"
    },
    "Telugu": {
        "guidanceKeywords": "సలహా, సహాయం, ఎలా, చిట్కాలు, మార్గదర్శకత్వం",
        "rentKeywords": "అద్దె, ట్రాక్టర్, యంత్రాలు, పరికరాలు, బుకింగ్",
        "schemeKeywords": "పథకం, కిసాన్, ప్రభుత్వం, సబ్సిడీ, అర్హత",
        "cropKeywords": "టమోటా, వరి, పత్తి, పంట, సాగు, వరి",
        "pestKeywords": "పురుగు, తెగులు, కీటకాలు, ఆకు, డాక్టర్, స్కాన్",
        "marketKeywords": "ధర, మండి, రేటు, మార్కెట్, ట్రెండ్, అమ్మకం"
    },
    "Hindi": {
        "guidanceKeywords": "मार्गदर्शन, सलाह, मदद, कैसे, सुझाव",
        "rentKeywords": "किराया, ट्रैक्टर, मशीनरी, उपकरण, बुकिंग",
        "schemeKeywords": "योजना, किसान, सरकार, सब्सिडी, पात्रता",
        "cropKeywords": "टमाटर, चावल, कपास, धान, उपज, उगाना",
        "pestKeywords": "कीट, रोग, कीड़ा, पत्ता, डॉक्टर, स्कैन",
        "marketKeywords": "कीमत, मंडी, दर, बाजार, रुझान, बेचना"
    },
    "Tamil": {
        "guidanceKeywords": "வழிகாட்டுதல், ஆலோசனை, உதவி, எப்படி, குறிப்புகள்",
        "rentKeywords": "வாடகை, டிராக்டர், இயந்திரங்கள், கருவிகள், முன்பதிவு",
        "schemeKeywords": "திட்டம், கிசான், அரசாங்கம், மானியம், தகுதி",
        "cropKeywords": "தக்காளி, அரிசி, பருத்தி, நெல், சாகுபடி, வளர",
        "pestKeywords": "பூச்சி, நோய், இலை, டாக்டர், ஸ்கேன்",
        "marketKeywords": "விலை, மண்டி, விகிதம், சந்தை, போக்கு, விற்பனை"
    },
    "Kannada": {
        "guidanceKeywords": "ಮಾರ್ಗದರ್ಶನ, ಸಲಹೆ, ಸಹಾಯ, ಹೇಗೆ, ಸಲಹೆಗಳು",
        "rentKeywords": "ಬಾಡಿಗೆ, ಟ್ರಾಕ್ಟರ್, ಯಂತ್ರೋಪಕರಣಗಳು, ಉಪಕರಣಗಳು, ಬುಕಿಂಗ್",
        "schemeKeywords": "ಯೋಜನೆ, ಕಿಸಾನ್, ಸರ್ಕಾರ, ಸಬ್ಸಿಡಿ, ಅರ್ಹತೆ",
        "cropKeywords": "ಟೊಮೆಟೊ, ಅಕ್ಕಿ, ಹತ್ತಿ, ಭತ್ತ, ಬೆಳೆ, ಬೆಳೆಯಲು",
        "pestKeywords": "ಕೀಟ, ರೋಗ, ಕೀಟಗಳು, ಎಲೆ, ವೈದ್ಯರು, ಸ್ಕ್ಯಾನ್",
        "marketKeywords": "ಬೆಲೆ, ಮಂಡಿ, ದರ, ಮಾರುಕಟ್ಟೆ, ಪ್ರವೃತ್ತಿ, ಮಾರಾಟ"
    },
    "Malayalam": {
        "guidanceKeywords": "മാർഗ്ഗനിർദ്ദേശം, ഉപദേശം, സഹായം, എങ്ങനെ, നുറുങ്ങുകൾ",
        "rentKeywords": "വാടക, ട്രാക്ടർ, മെഷിനറി, ഉപകരണങ്ങൾ, ബുക്കിംഗ്",
        "schemeKeywords": "പദ്ധതി, കിസാൻ, സർക്കാർ, സബ്‌സിഡി, യോഗ്യത",
        "cropKeywords": "തക്കാളി, അരി, പരുത്തി, നെല്ല്, കൃഷി, വളർത്തുക",
        "pestKeywords": "കീടങ്ങൾ, രോഗം, ഇല, ഡോക്ടർ, സ്കാൻ",
        "marketKeywords": "വില, മണ്ടി, നിരക്ക്, വിപണി, ട്രെൻഡ്, വിൽക്കുക"
    },
    "Marathi": {
        "guidanceKeywords": "मार्गदर्शन, सल्ला, मदत, कसे, टिप्स",
        "rentKeywords": "भाडे, ट्रॅक्टर, मशिनरी, उपकरणे, बुकिंग",
        "schemeKeywords": "योजना, किसान, सरकार, सबसिडी, पात्रता",
        "cropKeywords": "टोमॅटो, तांदूळ, कापूस, धान, पीक, वाढवणे",
        "pestKeywords": "कीड, रोग, कीटक, पान, डॉक्टर, स्कॅन",
        "marketKeywords": "किंमत, मंडी, दर, बाजार, कल, विक्री"
    },
    "Gujarati": {
        "guidanceKeywords": "માર્ગદર્શન, સલાહ, મદદ, કેવી રીતે, ટિપ્સ",
        "rentKeywords": "ભાડું, ટ્રેક્ટર, મશીનરી, સાધનો, બુકિંગ",
        "schemeKeywords": "યોજના, કિસાન, સરકાર, સબસિડી, પાત્રતા",
        "cropKeywords": "ટામેટા, ચોખા, કપાસ, ડાંગર, પાક, ઉગાડવું",
        "pestKeywords": "જીવાત, રોગ, જીવજંતુ, પાન, ડૉક્ટર, સ્કેન",
        "marketKeywords": "કિંમત, મંડી, દર, બજાર, વલણ, વેચાણ"
    },
    "Punjabi": {
        "guidanceKeywords": "ਮਾਰਗਦਰਸ਼ਨ, ਸਲਾਹ, ਮਦਦ, ਕਿਵੇਂ, ਸੁਝਾਅ",
        "rentKeywords": "ਕਿਰਾਇਆ, ਟ੍ਰੈਕਟਰ, ਮਸ਼ੀਨਰੀ, ਉਪਕਰਣ, ਬੁਕਿੰਗ",
        "schemeKeywords": "ਯੋਜਨਾ, ਕਿਸਾਨ, ਸਰਕਾਰ, ਸਬਸਿਡੀ, ਯੋਗਤਾ",
        "cropKeywords": "ਟਮਾਟਰ, ਚੌਲ, ਕਪਾਹ, ਝੋਨਾ, ਫਸਲ, ਉਗਾਉਣਾ",
        "pestKeywords": "ਕੀੜੇ, ਬਿਮਾਰੀ, ਪੱਤਾ, ਡਾਕਟਰ, ਸਕੈਨ",
        "marketKeywords": "ਕੀਮਤ, ਮੰਡੀ, ਦਰ, ਬਾਜ਼ਾਰ, ਰੁਝਾਨ, ਵੇਚਣਾ"
    },
    "Bangla": {
        "guidanceKeywords": "নির্দেশনা, পরামর্শ, সাহায্য, কীভাবে, টিপস",
        "rentKeywords": "ভাড়া, ট্র্যাক্টর, যন্ত্রপাতি, সরঞ্জাম, বুকিং",
        "schemeKeywords": "প্রকল্প, কিষাণ, সরকার, ভর্তুকি, যোগ্যতা",
        "cropKeywords": "টমেটো, ধান, তুলা, চাল, ফসল, চাষ",
        "pestKeywords": "পোকা, রোগ, কিমি, পাতা, ডাক্তার, স্ক্যান",
        "marketKeywords": "দাম, মন্ডি, হার, বাজার, প্রবণতা, বিক্রি"
    }
}

content = original_content

for lang, keys in keyword_map.items():
    lang_header = f"{lang}: {{"
    start = content.find(lang_header)
    if start == -1:
        continue
    
    # Simple injection at the beginning of the object
    brace_open = content.find("{", start)
    insertion_point = brace_open + 1
    
    new_lines = ""
    for k, v in keys.items():
        if f"{k}:" not in content[start:start+5000]:
            new_lines += f'\n    {k}: "{v}",'
    
    if new_lines:
        content = content[:insertion_point] + new_lines + content[insertion_point:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Injected regional keywords for AI Chat.")
