import re
import json

file_path = "d:/Desktop Data/project/farmersapp/client/lib/LanguageContext.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

languages = ["English", "Telugu", "Hindi", "Tamil", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Bangla"]

# 1. Clean English Duplicates Hand-Picked
def clean_english(content):
    # Find English block specifically
    eng_start = content.find("  English: {")
    telugu_start = content.find("  Telugu: {")
    if eng_start == -1 or telugu_start == -1: return content
    
    eng_block = content[eng_start:telugu_start]
    
    # Remove second occurrence of `agriMarketplace`
    old_marketplace = r'    agriMarketplace: "Agriculture Marketplace",\n    agriMarketplaceDesc: "Buy and sell crops, machinery, seeds, and more.",\n'
    eng_block = re.sub(old_marketplace, '', eng_block, count=1)
    
    old_hub_title = r'    agriKnowledgeHubTitle: "Agriculture Marketplace",\n'
    eng_block = re.sub(old_hub_title, '', eng_block, count=1)
    
    # Let's cleanly remove all dupes by parsing backwards and keeping first seen
    lines = eng_block.split('\n')
    seen_keys = set()
    new_lines = []
    
    key_pattern = re.compile(r'^\s*([A-Za-z0-9_]+)\s*:')
    
    for line in lines:
        match = key_pattern.search(line)
        if match:
            key = match.group(1)
            if key in seen_keys:
                continue
            seen_keys.add(key)
        new_lines.append(line)
        
    new_eng_block = '\n'.join(new_lines)
    return content[:eng_start] + new_eng_block + content[telugu_start:]

text = clean_english(text)

# 2. Fix Tamil Leakage for all NON-Tamil languages safely
tamil_leakage = re.compile(r'\s*uploadLeaf: "Upload Leaf Image",.*?\s*fertilizerAdvice: "உர ஆலோசனைகள்",', re.DOTALL)

correct_translations = {
    "Telugu": """    uploadLeaf: "ఆకు చిత్రాన్ని అప్‌లోడ్ చేయండి",
    detectDisease: "వ్యాధిని గుర్తించండి",
    soilType: "నేల రకం",
    selectSoil: "నేల రకాన్ని ఎంచుకోండి",
    blackSoil: "నల్ల నేల (బరువైనది)",
    redSoil: "ఎర్ర నేల (తేలికైనది)",
    sandySoil: "ఇసుక నేల",
    loamySoil: "బంకమట్టి నేల",
    cropType: "పంట రకం",
    season: "సీజన్",
    selectSeason: "సీజన్ ఎంచుకోండి",
    kharif: "ఖరీఫ్ (వర్షాకాలం)",
    rabi: "రబీ (శీతాకాలం)",
    zaid: "జైద్ (వేసవికాలం)",
    farmArea: "పొలం విస్తీర్ణం (ఎకరాల్లో)",
    seedCost: "విత్తన ఖర్చు",
    fertilizerCost: "ఎరువుల ఖర్చు",
    labourCost: "కూలీల ఖర్చు",
    totalCost: "మొత్తం ఖర్చు",
    expectedYield: "ఆశించిన దిగుబడి (క్వింటాళ్లలో)",
    marketPrice: "మార్కెట్ ధర (క్వింటాల్‌కు)",
    grossRevenue: "మొత్తం ఆదాయం",
    netProfit: "నికర లాభం",
    results: "ఫలితాలు",
    recommendedCrops: "సిఫార్సు చేయబడిన పంటలు",
    waterRequirement: "నీటి అవసరం (లీటర్లు/రోజుకు)",
    frequency: "నీటిపారుదల ఫ్రీక్వెన్సీ",
    fertilizerAdvice: "ఎరువుల సలహాలు",""",
    
    "Hindi": """    uploadLeaf: "पत्ती की छवि अपलोड करें",
    detectDisease: "बीमारी का पता लगाएं",
    soilType: "मिट्टी का प्रकार",
    selectSoil: "मिट्टी का प्रकार चुनें",
    blackSoil: "काली मिट्टी",
    redSoil: "लाल मिट्टी",
    sandySoil: "रेतीली मिट्टी",
    loamySoil: "दोमट मिट्टी",
    cropType: "फसल का प्रकार",
    season: "मौसम",
    selectSeason: "मौसम चुनें",
    kharif: "खरीफ",
    rabi: "रबी",
    zaid: "ज़ैद",
    farmArea: "खेत का क्षेत्रफल (एकड़)",
    seedCost: "बीज की लागत",
    fertilizerCost: "उर्वरक की लागत",
    labourCost: "मजदूरी की लागत",
    totalCost: "कुल लागत",
    expectedYield: "अपेक्षित उपज (क्विंटल)",
    marketPrice: "बाजार मूल्य (प्रति क्विंटल)",
    grossRevenue: "सकल आय",
    netProfit: "शुद्ध लाभ",
    results: "परिणाम",
    recommendedCrops: "अनुशंसित फसलें",
    waterRequirement: "पानी की आवश्यकता (लीटर/दिन)",
    frequency: "सिंचाई की आवृत्ति",
    fertilizerAdvice: "उर्वरक सलाह",""",

    "Marathi": """    uploadLeaf: "पानाचे चित्र अपलोड करा",
    detectDisease: "रोग ओळखा",
    soilType: "मातीचा प्रकार",
    selectSoil: "मातीचा प्रकार निवडा",
    blackSoil: "काळी माती",
    redSoil: "लाल माती",
    sandySoil: "वाळूची माती",
    loamySoil: "पोयटा माती",
    cropType: "पिकाचा प्रकार",
    season: "हंगाम",
    selectSeason: "हंगाम निवडा",
    kharif: "खरीप",
    rabi: "रब्बी",
    zaid: "उन्हाळी (जैद)",
    farmArea: "शेतीचे क्षेत्र (एकर)",
    seedCost: "बियाणांची किंमत",
    fertilizerCost: "खतांची किंमत",
    labourCost: "मजुरीचा खर्च",
    totalCost: "एकूण खर्च",
    expectedYield: "अपेक्षित उत्पन्न (क्विंटलमध्ये)",
    marketPrice: "बाजारभाव (प्रति क्विंटल)",
    grossRevenue: "एकूण उत्पन्न",
    netProfit: "निव्वळ नफा",
    results: "निकाल",
    recommendedCrops: "सुचवलेली पिके",
    waterRequirement: "पाण्याची गरज (लिटर/दिवस)",
    frequency: "सिंचनाची वारंवारता",
    fertilizerAdvice: "खत सल्ला",""",

    "Gujarati": """    uploadLeaf: "પાંદડાનો ફોટો અપલોડ કરો",
    detectDisease: "રોગ શોધો",
    soilType: "માટીનો પ્રકાર",
    selectSoil: "માટીનો પ્રકાર પસંદ કરો",
    blackSoil: "કાળી માટી",
    redSoil: "લાલ માટી",
    sandySoil: "રેતાળ માટી",
    loamySoil: "ગોરાડુ માટી",
    cropType: "પાકનો પ્રકાર",
    season: "મોસમ",
    selectSeason: "મોસમ પસંદ કરો",
    kharif: "ખરીફ",
    rabi: "રવિ",
    zaid: "જાયદ (ઉનાળુ)",
    farmArea: "ખેતરનો વિસ્તાર (એકર)",
    seedCost: "બિયારણનો ખર્ચ",
    fertilizerCost: "ખાતરનો ખર્ચ",
    labourCost: "મજૂરીનો ખર્ચ",
    totalCost: "કુલ ખર્ચ",
    expectedYield: "અપેક્ષિત ઉપજ (ક્વિન્ટલમાં)",
    marketPrice: "બજાર ભાવ (ક્વિન્ટલ દીઠ)",
    grossRevenue: "કુલ આવક",
    netProfit: "ચોખ્ખો નફો",
    results: "પરિણામો",
    recommendedCrops: "ભલામણ કરેલ પાક",
    waterRequirement: "પાણીની જરૂરિયાત (લિટર/દિવસ)",
    frequency: "સિંચાઈની આવર્તન",
    fertilizerAdvice: "ખાતરની સલાહ",""",

    "Kannada": """    uploadLeaf: "ಎಲೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    detectDisease: "ರೋಗವನ್ನು ಪತ್ತೆಹಚ್ಚಿ",
    soilType: "ಮಣ್ಣಿನ ಪ್ರಕಾರ",
    selectSoil: "ಮಣ್ಣಿನ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    blackSoil: "ಕಪ್ಪು ಮಣ್ಣು",
    redSoil: "ಕೆಂಪು ಮಣ್ಣು",
    sandySoil: "ಮರಳು ಮಣ್ಣು",
    loamySoil: "ಗೋಡು ಮಣ್ಣು",
    cropType: "ಬೆಳೆಯ ಪ್ರಕಾರ",
    season: "ಋತು",
    selectSeason: "ಋತುವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    kharif: "ಖಾರಿಫ್",
    rabi: "ರಬಿ",
    zaid: "ಜೈದ್ (ಬೇಸಿಗೆ)",
    farmArea: "ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ (ಎಕರೆಗಳಲ್ಲಿ)",
    seedCost: "ಬೀಜದ ವೆಚ್ಚ",
    fertilizerCost: "ರಸಗೊಬ್ಬರ ವೆಚ್ಚ",
    labourCost: "ಕಾರ್ಮಿಕರ ವೆಚ್ಚ",
    totalCost: "ಒಟ್ಟು ವೆಚ್ಚ",
    expectedYield: "ನಿರೀಕ್ಷಿತ ಇಳುವರಿ (ಕ್ವಿಂಟಲ್‌ನಲ್ಲಿ)",
    marketPrice: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ (ಕ್ವಿಂಟಲ್‌ಗೆ)",
    grossRevenue: "ಒಟ್ಟು ಆದಾಯ",
    netProfit: "ನಿವ್ವಳ ಲಾಭ",
    results: "ಫಲಿತಾಂಶಗಳು",
    recommendedCrops: "ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆಗಳು",
    waterRequirement: "ನೀರಿನ ಅಗತ್ಯತೆ (ಲೀಟರ್/ದಿನ)",
    frequency: "ನೀರಾವರಿ ಆವರ್ತನ",
    fertilizerAdvice: "ರಸಗೊಬ್ಬರ ಸಲಹೆಗಳು",""",
    
    "Malayalam": """    uploadLeaf: "ഇലയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
    detectDisease: "രോഗം കണ്ടുപിടിക്കുക",
    soilType: "മണ്ണിന്റെ തരം",
    selectSoil: "മണ്ണിന്റെ തരം തിരഞ്ഞെടുക്കുക",
    blackSoil: "കരിമണ്ണ്",
    redSoil: "ചെമ്മണ്ണ്",
    sandySoil: "മണൽമണ്ണ്",
    loamySoil: "പശിമയുള്ള മണ്ണ്",
    cropType: "വിളയുടെ തരം",
    season: "സീസൺ",
    selectSeason: "സീസൺ തിരഞ്ഞെടുക്കുക",
    kharif: "ഖാരിഫ്",
    rabi: "റാബി",
    zaid: "സെയ്ദ് (വേനൽ)",
    farmArea: "കൃഷിയിടത്തിന്റെ വിസ്തീർണ്ണം (ഏക്കറിൽ)",
    seedCost: "വിത്തിന്റെ വില",
    fertilizerCost: "വളത്തിന്റെ വില",
    labourCost: "തൊഴിലാളികളുടെ കൂലി",
    totalCost: "ആകെ ചെലവ്",
    expectedYield: "പ്രതീക്ഷിക്കുന്ന വിളവ് (ക്വിന്റലിൽ)",
    marketPrice: "മാർക്കറ്റ് വില (ഒരു ക്വിന്റലിന്)",
    grossRevenue: "ആകെ വരുമാനം",
    netProfit: "അറ്റാദായം",
    results: "ഫലങ്ങൾ",
    recommendedCrops: "ശുപാർശ ചെയ്യുന്ന വിളകൾ",
    waterRequirement: "ആവശ്യമായ വെള്ളം (ലിറ്റർ/ദിവസം)",
    frequency: "നനയ്ക്കുന്നതിന്റെ ഇടവേള",
    fertilizerAdvice: "വളപ്രയോഗത്തിനുള്ള ഉപദേശങ്ങൾ",""",

    "Punjabi": """    uploadLeaf: "ਪੱਤੇ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ",
    detectDisease: "ਬਿਮਾਰੀ ਦਾ ਪਤਾ ਲਗਾਓ",
    soilType: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ",
    selectSoil: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਚੁਣੋ",
    blackSoil: "ਕਾਲੀ ਮਿੱਟੀ",
    redSoil: "ਲਾਲ ਮਿੱਟੀ",
    sandySoil: "ਰੇਤਲੀ ਮਿੱਟੀ",
    loamySoil: "ਮੈਰਾ ਮਿੱਟੀ",
    cropType: "ਫਸਲ ਦੀ ਕਿਸਮ",
    season: "ਮੌਸਮ",
    selectSeason: "ਮੌਸਮ ਚੁਣੋ",
    kharif: "ਸਾਉਣੀ",
    rabi: "ਹਾੜੀ",
    zaid: "ਜ਼ੈਦ (ਗਰਮੀ)",
    farmArea: "ਖੇਤ ਦਾ ਰਕਬਾ (ਏਕੜ)",
    seedCost: "ਬੀਜ ਦਾ ਖਰਚਾ",
    fertilizerCost: "ਖਾਦ ਦਾ ਖਰਚਾ",
    labourCost: "ਮਜ਼ਦੂਰੀ ਦਾ ਖਰਚਾ",
    totalCost: "ਕੁੱਲ ਖਰਚਾ",
    expectedYield: "ਉਮੀਦ ਅਨੁਸਾਰ ਝਾੜ (ਕੁਇੰਟਲ)",
    marketPrice: "ਮੰਡੀ ਦਾ ਭਾਅ (ਪ੍ਰਤੀ ਕੁਇੰਟਲ)",
    grossRevenue: "ਕੁੱਲ ਕਮਾਈ",
    netProfit: "ਸ਼ੁੱਧ ਮੁਨਾਫ਼ਾ",
    results: "ਨਤੀਜੇ",
    recommendedCrops: "ਸਿਫਾਰਸ਼ ਕੀਤੀਆਂ ਫਸਲਾਂ",
    waterRequirement: "ਪਾਣੀ ਦੀ ਲੋੜ (ਲੀਟਰ/ਦਿਨ)",
    frequency: "ਸਿੰਚਾਈ ਦੀ ਆਵਿਰਤੀ",
    fertilizerAdvice: "ਖਾਦ ਦੀ ਸਲਾਹ",""",

    "Bangla": """    uploadLeaf: "পাতার ছবি আপলোড করুন",
    detectDisease: "রোগ নির্ণয় করুন",
    soilType: "মাটির ধরন",
    selectSoil: "মাটির ধরন নির্বাচন করুন",
    blackSoil: "কালো মাটি",
    redSoil: "লাল মাটি",
    sandySoil: "বেলে মাটি",
    loamySoil: "দোআঁশ মাটি",
    cropType: "ফসলের ধরন",
    season: "ঋতু",
    selectSeason: "ঋতু নির্বাচন করুন",
    kharif: "খরিফ",
    rabi: "রবি",
    zaid: "জাইদ (গ্রীষ্মকাল)",
    farmArea: "জমির পরিমাণ (একর)",
    seedCost: "বীজের খরচ",
    fertilizerCost: "সারের খরচ",
    labourCost: "শ্রমিকের খরচ",
    totalCost: "মোট খরচ",
    expectedYield: "অনুমানিত ফলন (কুইন্টাল)",
    marketPrice: "বাজার দর (প্রতি কুইন্টাল)",
    grossRevenue: "মোট আয়",
    netProfit: "নিট লাভ",
    results: "ফলাফল",
    recommendedCrops: "প্রস্তাবিত ফসল",
    waterRequirement: "জলের প্রয়োজন (লিটার/দিন)",
    frequency: "সেচের সময়সূচী",
    fertilizerAdvice: "সারের পরামর্শ","""
}

def replace_leakage(content, lang, replacement):
    # Find start and end of this language block exactly.
    start_str = f"  {lang}: {{"
    start_idx = content.find(start_str)
    
    # Next language starts with `  LanguageName: {` or it's the end of file/translations block
    next_idx = len(content)
    for l in languages:
        if l == lang: continue
        idx = content.find(f"  {l}: {{", start_idx + len(start_str))
        if idx != -1 and idx < next_idx:
            next_idx = idx
            
    if start_idx == -1: return content
    
    block = content[start_idx:next_idx]
    
    # Do replacement within block
    new_block, count = tamil_leakage.subn(replacement, block)
    
    if count > 0:
        print(f"Fixed {lang}")
        
    return content[:start_idx] + new_block + content[next_idx:]

for lang, repl in correct_translations.items():
    text = replace_leakage(text, lang, repl)

# Let's clean up any other duplicates across ALL languages (except English as we did it)
def clean_dupes_all(content, lang):
    start_str = f"  {lang}: {{"
    start_idx = content.find(start_str)
    
    next_idx = len(content)
    for l in languages:
        if l == lang: continue
        idx = content.find(f"  {l}: {{", start_idx + len(start_str))
        if idx != -1 and idx < next_idx:
            next_idx = idx
            
    if start_idx == -1: return content
    
    block = content[start_idx:next_idx]
    
    lines = block.split('\n')
    seen_keys = set()
    new_lines = []
    
    key_pattern = re.compile(r'^\s*([A-Za-z0-9_]+)\s*:')
    
    for line in lines:
        match = key_pattern.search(line)
        if match:
            key = match.group(1)
            if key in seen_keys:
                print(f"Duplicate {key} in {lang}")
                continue
            seen_keys.add(key)
        new_lines.append(line)
        
    new_block = '\n'.join(new_lines)
    return content[:start_idx] + new_block + content[next_idx:]

for lang in languages:
    if lang != "English":
        text = clean_dupes_all(text, lang)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Done exact safe fix")
