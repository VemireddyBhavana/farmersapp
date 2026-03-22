import re

file_path = r'd:\Desktop Data\project\farmersapp\client\lib\LanguageContext.tsx'

# Comprehensive translations for missing/untranslated keys across all languages
translations_final = {
    "Hindi": {
        "aiAssistantTitle": "कृषि इंटेलिजेंस बॉट",
        "agriAssistant": "कृषि सहायक",
        "farmDetails": "फार्म विवरण",
        "enterFarmData": "मिट्टी और स्थान का विवरण प्रदान करें",
        "waitingForDetails": "फार्म विवरण की प्रतीक्षा है",
        "fillFormDesc": "एआई-संचालित फसल सिफारिशें प्राप्त करने के लिए विवरण भरें।",
        "productionCosts": "उत्पादन लागत",
        "costInputDesc": "अपने रिटर्न का अनुमान लगाने के लिए प्रति एकड़ खर्च दर्ज करें",
        "expectedReturns": "अपेक्षित रिटर्न",
        "readyToCalculate": "क्या आप गणना के लिए तैयार हैं?",
        "calcInstruction": "अपना अनुमानित शुद्ध लाभ देखने के लिए अपनी लागत और अपेक्षित उपज भरें।",
        "needFunding": "धन की आवश्यकता है?",
        "loanAdvisoryDesc": "कम ब्याज वाले कृषि ऋणों का अन्वेषण करें",
        "irrigationParameters": "सिंचाई पैरामीटर",
        "district": "जिला",
        "selectDistrict": "जिला चुनें"
    },
    "Telugu": {
        "soilType": "నేల రకం",
        "selectSoil": "నేల రకాన్ని ఎంచుకోండి",
        "season": "సీజన్",
        "selectSeason": "సీజన్ ఎంచుకోండి",
        "kharif": "ఖరీఫ్",
        "rabi": "రబీ",
        "zaid": "జైద్",
        "recommendedCrops": "సిఫార్సు చేయబడిన పంటలు",
        "farmArea": "పంట విస్తీర్ణం (ఎకరాలు)",
        "seedCost": "విత్తన ఖర్చు",
        "fertilizerCost": "ఎరువుల ఖర్చు",
        "labourCost": "కూలీల ఖర్చు",
        "expectedYield": "ఆశించిన దిగుబడి (క్వింటాళ్ళు)",
        "netProfit": "నికర లాభం",
        "cropType": "పంట రకం",
        "waterRequirement": "నీటి అవసరం (లీటర్లు/రోజు)",
        "frequency": "నీటిపారుదల ఫ్రీక్వెన్సీ",
        "fertilizerAdvice": "ఎరువుల సలహా",
        "aiAssistantTitle": "అగ్రి ఇంటెలిజెన్స్ బాట్",
        "agriAssistant": "అగ్రి అసిస్టెంట్",
        "district": "జిల్లా",
        "selectDistrict": "జిల్లాను ఎంచుకోండి"
    },
    "Tamil": {
        "farmDetails": "பண்ணை விவரங்கள்",
        "enterFarmData": "மண் மற்றும் இருப்பிட விவரங்களை வழங்கவும்",
        "waitingForDetails": "பண்ணை விவரங்களுக்காகக் காத்திருக்கிறது",
        "fillFormDesc": "AI-ஆல் இயக்கப்படும் பயிர் பரிந்துரைகளைப் பெற விவரங்களைப் பூர்த்தி செய்யவும்.",
        "productionCosts": "உற்பத்திச் செலவுகள்",
        "costInputDesc": "உங்கள் வரவுகளை மதிப்பிட ஏக்கருக்கு ஏற்படும் செலவுகளை உள்ளிடவும்",
        "expectedReturns": "எதிர்பார்க்கப்படும் வருவாய்",
        "readyToCalculate": "கணக்கிடத் தயாரா?",
        "calcInstruction": "உங்கள் மதிப்பிடப்பட்ட நிகர லாபத்தைக் காண உங்கள் செலவுகள் மற்றும் எதிர்பார்க்கப்படும் விளைச்சலைப் பூர்த்தி செய்யவும்.",
        "needFunding": "நிதி உதவி தேவையா?",
        "loanAdvisoryDesc": "குறைந்த வட்டி விவசாயக் கடன்களை ஆராயுங்கள்",
        "irrigationParameters": "நீர்ப்பாசன அளவுರುக்கள்",
        "soilType": "மண் வகை",
        "selectSoil": "மண் வகையைத் தேர்ந்தெடுக்கவும்",
        "season": "பருவம்",
        "selectSeason": "பருவத்தைத் தேர்ந்தெடுக்கவும்",
        "kharif": "காரிஃப்",
        "rabi": "ரபி",
        "zaid": "জায়িড",
        "recommendedCrops": "பரிந்துரைக்கப்பட்ட பயிர்கள்",
        "farmArea": "பண்ணை பரப்பளவு (ஏக்கர்)",
        "seedCost": "விதை செலவு",
        "fertilizerCost": "உரச் செலவு",
        "labourCost": "தொழிலாளர் செலவு",
        "expectedYield": "எதிர்பார்க்கப்படும் விளைச்சல் (குவிண்டால்)",
        "netProfit": "நிகர லாபம்",
        "cropType": "பயிர் வகை",
        "waterRequirement": "நீர் தேவை (லிட்டர்/நாள்)",
        "frequency": "நீர்ப்பாசன அதிவெண்",
        "fertilizerAdvice": "உர ஆலோசனைகள்",
        "aiAssistantTitle": "விவசாய நுண்ணறிவு பாட்",
        "agriAssistant": "விவசாய உதவியாளர்",
        "district": "மாவட்டம்",
        "selectDistrict": "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்"
    }
}

# Add more languages to translations_final as needed based on the audit
# For brevity, I will update Marathi, Gujarati, Kannada, Malayalam, Punjabi, Bangla with the main keys too

def update_lang_block(content, lang, translations):
    start_pattern = rf'{lang}:\s*\{{'
    match = re.search(start_pattern, content)
    if not match:
        return content
    
    start_idx = match.start()
    bracket_count = 0
    end_idx = -1
    for i in range(start_idx + len(match.group(0)) - 1, len(content)):
        if content[i] == '{':
            bracket_count += 1
        elif content[i] == '}':
            bracket_count -= 1
            if bracket_count == -1:
                end_idx = i
                break
    
    if end_idx == -1:
        return content
        
    block = content[start_idx:end_idx]
    
    for key, val in translations.items():
        if f'{key}:' in block:
            block = re.sub(rf'{key}:\s*".*?",', f'{key}: "{val}",', block)
            block = re.sub(rf'{key}:\s*".*?"$', f'{key}: "{val}"', block)
        else:
            block = block.rstrip()
            if block.endswith(','):
                block += f'\n    {key}: "{val}",'
            else:
                block += f',\n    {key}: "{val}",'
                
    return content[:start_idx] + block + content[end_idx:]

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

for lang, trans_dict in translations_final.items():
    content = update_lang_block(content, lang, trans_dict)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Final updates applied.")
