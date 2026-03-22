import re

file_path = r'd:\Desktop Data\project\farmersapp\client\lib\LanguageContext.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def safe_replace_key(block, key, value):
    # Match key: "..." or key: "à¤..."
    pattern = rf'{key}:\s*".*?"'
    if re.search(pattern, block):
        return re.sub(pattern, f'{key}: "{value}"', block)
    else:
        # Append before the last closing brace
        last_brace = block.rfind('}')
        if last_brace != -1:
            insertion = f'    {key}: "{value}",\n'
            return block[:last_brace] + insertion + block[last_brace:]
        return block

hindi_data = {
    "farmDetails": "फार्म विवरण",
    "enterFarmData": "मिट्टी और स्थान का विवरण प्रदान करें",
    "district": "जिला",
    "selectDistrict": "जिला चुनें",
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
    "aiAssistantTitle": "कृषि इंटेलिजेंस बॉट",
    "aiAssistantOnline": "विशेषज्ञ एआई ऑनलाइन है",
    "chatPlaceholder": "खेती के बारे में मुझसे कुछ भी पूछें...",
    "onlineStatus": "ऑनलाइन और मदद के लिए तैयार",
    "askMeAnything": "मुझसे कुछ भी पूछें...",
    "aiFarmingChat": "एआई फार्मिंग चैट",
    "expertAdvice": "विशेषज्ञ सलाह",
    "recentHistory": "हाल का इतिहास",
    "assistantStatus": "सहायक स्थिति",
    "responses": "प्रतिक्रियाएं",
    "instant": "त्वरित",
    "availability": "उपलब्धता",
    "online247": "ऑनलाइन 24/7",
    "languageLabel": "भाषा",
    "multiModal": "मल्टी-मॉडल",
    "agriAssistant": "कृषि सहायक",
    "botWelcome": "नमस्ते! मैं आपका एआई खेती सहायक हूँ।",
    "botOffer": "मैं आज आपकी कैसे सहायता कर सकता हूँ? मैं ट्रैक्टर बुकिंग, फसल सलाह या बाजार मूल्य में मदद कर सकता हूँ।",
    "botGuidanceReply": "मैं फसल स्वास्थ्य, मिट्टी की तैयारी और आधुनिक खेती तकनीकों पर विशेषज्ञ मार्गदर्शन प्रदान कर सकता हूँ। आप क्या जानना चाहेंगे?",
    "botRentReply": "आप हमारे रेंटल सेक्शन से ट्रैक्टर और अन्य उपकरण किराए पर ले सकते हैं। दरें ₹500/घंटे से शुरू होती हैं। क्या आप कैटलॉग देखना चाहेंगे?",
    "botSchemeReply": "पीएम-किसान और वाईएसआर रायथु भरोसा जैसी कई सरकारी योजनाएं हैं। मैं आपकी पात्रता जांचने में मदद कर सकता हूँ!",
    "botCropReply": "हमारे पास धान, कपास, टमाटर और बहुत कुछ के लिए विस्तृत खेती गाइड हैं। आप किस फसल में रुचि रखते हैं?",
    "botPestReply": "आप पत्तियों की छवियों को स्कैन करने और बीमारियों का तुरंत पता लगाने के लिए हमारे क्रॉप डॉक्टर टूल का उपयोग कर सकते हैं। क्या आप इसे आज़माना चाहेंगे?",
    "botMarketReply": "टमाटर जैसी फसलों के लिए स्थानीय मंडी की कीमतें वर्तमान में लगभग ₹1,800/क्विंटल हैं। मैं आपके जिले के लिए दरें देख सकता हूँ!",
    "botFallback": "मुझे वह पूरी तरह समझ नहीं आया। मैं फसल सलाह, ट्रैक्टर किराया, या बाजार मूल्य में मदद कर सकता हूँ। 'टमाटर की कीमत क्या है?' पूछने का प्रयास करें।",
    "guidanceKeywords": "सलाह, मदद, सुझाव, गाइड, मार्गदर्शन",
    "rentKeywords": "किराया, ट्रैक्टर, मशीनरी, उपकरण, बुकिंग",
    "schemeKeywords": "योजना, किसान, सरकारी, सब्सिडी, पात्रता",
    "cropKeywords": "टमाटर, धान, कपास, चावल, फसल, खेती",
    "pestKeywords": "कीट, रोग, कीड़ा, पत्ता, डॉक्टर, स्कैन",
    "marketKeywords": "कीमत, मंडी, दर, बाजार, भाव, बेचना"
}

# I'll use the indices found by find_ranges.py
# Hindi: 133114 to 203886
hindi_start = 133114
hindi_end = 203886

hindi_block = content[hindi_start:hindi_end]
for k, v in hindi_data.items():
    hindi_block = safe_replace_key(hindi_block, k, v)

content = content[:hindi_start] + hindi_block + content[hindi_end:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Hindi fixed.")
