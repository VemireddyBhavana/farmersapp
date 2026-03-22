import re

file_path = r'd:\Desktop Data\project\farmersapp\client\lib\LanguageContext.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def safe_replace_key(block, key, value):
    pattern = rf'{key}:\s*".*?"'
    if re.search(pattern, block):
        return re.sub(pattern, f'{key}: "{value}"', block)
    else:
        last_brace = block.rfind('}')
        if last_brace != -1:
            insertion = f'    {key}: "{value}",\n'
            return block[:last_brace] + insertion + block[last_brace:]
        return block

history_data = {
    "English": {
        "historyCropAdvice": "Paddy Sowing advice",
        "historyTractorRates": "Tractor rates near Chittoor",
        "historyMarketTrends": "Market trends for Tomato",
        "historySeedRecommendation": "Seed recommendation"
    },
    "Hindi": {
        "historyCropAdvice": "धान बुवाई की सलाह",
        "historyTractorRates": "चित्तूर के पास ट्रैक्टर की दरें",
        "historyMarketTrends": "टमाटर के लिए बाजार के रुझान",
        "historySeedRecommendation": "बीज सिफारिश"
    },
    "Telugu": {
        "historyCropAdvice": "వరి విత్తనాల సలహా",
        "historyTractorRates": "చిత్తూరు సమీపంలో ట్రాక్టర్ ధరలు",
        "historyMarketTrends": "టమోటా కోసం మార్కెట్ పోకడలు",
        "historySeedRecommendation": "విత్తన సిఫార్సు"
    },
    "Tamil": {
        "historyCropAdvice": "நெல் விதைப்பு ஆலோசனை",
        "historyTractorRates": "சித்தூர் அருகே டிராக்டர் கட்டணம்",
        "historyMarketTrends": "தக்காளிக்கான சந்தை போக்குகள்",
        "historySeedRecommendation": "விதை பரிந்துரை"
    },
    "Marathi": {
        "historyCropAdvice": "धान पेरणीचा सल्ला",
        "historyTractorRates": "चित्तूर जवळ ट्रॅक्टरचे दर",
        "historyMarketTrends": "टोमॅटोसाठी बाजार कल",
        "historySeedRecommendation": "बियाणे शिफारस"
    },
    "Gujarati": {
        "historyCropAdvice": "ડાંગર વાવણીની સલાહ",
        "historyTractorRates": "ચિત્તૂર નજીક ટ્રેક્ટરના દર",
        "historyMarketTrends": "ટામેટા માટે બજારના વલણો",
        "historySeedRecommendation": "બિયારણની ભલામણ"
    },
    "Kannada": {
        "historyCropAdvice": "ಭತ್ತ ಬಿತ್ತನೆ ಸಲಹೆ",
        "historyTractorRates": "ಚಿತ್ತೂರು ಬಳಿ ಟ್ರಾಕ್ಟರ್ ದರಗಳು",
        "historyMarketTrends": "ಟೊಮೆಟೊ ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳು",
        "historySeedRecommendation": "ಬೀಜ ಶಿಫಾರಸು"
    },
    "Malayalam": {
        "historyCropAdvice": "നെല്ല് വിതയ്ക്കൽ ഉപദേശം",
        "historyTractorRates": "ചിറ്റൂരിന് സമീപമുള്ള ട്രാക്ടർ നിരക്കുകൾ",
        "historyMarketTrends": "തക്കാളിയുടെ വിപണി പ്രവണതകൾ",
        "historySeedRecommendation": "വിത്ത് ശുപാർശ"
    },
    "Punjabi": {
        "historyCropAdvice": "ਝੋਨੇ ਦੀ ਬਿਜਾਈ ਦੀ ਸਲਾਹ",
        "historyTractorRates": "ਚਿਤੂਰ ਦੇ ਨੇੜੇ ਟ੍ਰੈਕਟਰ ਦੀਆਂ ਦਰਾਂ",
        "historyMarketTrends": "ਟਮਾਟਰ ਲਈ ਬਾਜ਼ਾਰ ਦੇ ਰੁਝਾਨ",
        "historySeedRecommendation": "ਬੀਜ ਦੀ ਸਿਫ਼ਾਰਸ਼"
    },
    "Bangla": {
        "historyCropAdvice": "ধান বপনের পরামর্শ",
        "historyTractorRates": "চিত্তুরের কাছে ট্রাক্টর রেট",
        "historyMarketTrends": "টমেটোর বাজার প্রবণতা",
        "historySeedRecommendation": "বীজ সুপারিশ"
    }
}

languages = ["English", "Hindi", "Telugu", "Tamil", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Bangla"]

new_content = content
for lang in languages:
    pattern = rf'^\s+{lang}:\s*\{{'
    match = re.search(pattern, new_content, re.MULTILINE)
    if match:
        start_idx = match.start()
        bracket_count = 0
        end_idx = -1
        for i in range(match.end() - 1, len(new_content)):
            if new_content[i] == '{':
                bracket_count += 1
            elif new_content[i] == '}':
                bracket_count -= 1
                if bracket_count == 0:
                    end_idx = i + 1
                    break
        
        if end_idx != -1:
            block = new_content[start_idx:end_idx]
            for key, val in history_data[lang].items():
                block = safe_replace_key(block, key, val)
            new_content = new_content[:start_idx] + block + new_content[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("History keys added.")
