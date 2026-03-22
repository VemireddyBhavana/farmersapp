import re
import json

file_path = r'd:\Desktop Data\project\farmersapp\client\lib\LanguageContext.tsx'
languages = ["English", "Telugu", "Hindi", "Tamil", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Bangla"]

translations_master = {
    "Telugu": {
        "smartFarmingTools": "స్మార్ట్ ఫార్మింగ్ టూల్స్",
        "aiCropDoctor": "AI పంట డాక్టర్",
        "aiCropDoctorDesc": "మొక్కల వ్యాధులను గుర్తించి ఆరోగ్య సిఫార్సులను పొందండి.",
        "smartCropRecommendation": "స్మార్ట్ పంట సిఫార్సు",
        "smartCropRecommendationDesc": "మీ నేల కోసం ఉత్తమ పంటల కోసం AI సూచనలు.",
        "farmProfitCalculator": "వ్యవసాయ లాభాల కాలికులేటర్",
        "farmProfitCalculatorDesc": "మీ వ్యవసాయ ఖర్చులు మరియు ఆశించిన లాభాలను లెక్కించండి.",
        "smartIrrigationCalculator": "స్మార్ట్ నీటిపారుదల కాలికులేటర్",
        "smartIrrigationCalculatorDesc": "మీ పంటల కోసం ఖచ్చితమైన నీటి అవసరాలను లెక్కించండి.",
        "fertilizerRequirement": "ఎరువుల సలహా",
        "fertilizerRequirementDesc": "మీ పంట మరియు నేల కోసం ఖచ్చితమైన ఎరువుల సలహా పొందండి.",
        "farmDetails": "పంట వివరాలు",
        "enterFarmData": "నేల మరియు స్థాన వివరాలను అందించండి",
        "waitingForDetails": "పంట వివరాల కోసం వేచి ఉంది",
        "fillFormDesc": "AI ఆధారిత పంట సిఫార్సులను స్వీకరించడానికి వివరాలను పూరించండి.",
        "productionCosts": "ఉత్పత్తి ఖర్చులు",
        "costInputDesc": "మీ రాబడిని అంచనా వేయడానికి ఎకరాకు అయ్యే ఖర్చులను నమోదు చేయండి",
        "expectedReturns": "ఆశించిన రాబడి",
        "readyToCalculate": "లెక్కించడానికి సిద్ధంగా ఉన్నారా?",
        "calcInstruction": "మీ అంచనా నికర లాభాన్ని చూడటానికి మీ ఖర్చులు మరియు ఆశించిన దిగుబడిని పూరించండి.",
        "needFunding": "ధన సహాయం అవసరమా?",
        "loanAdvisoryDesc": "తక్కువ వడ్డీ వ్యవసాయ రుణాలను అన్వేషించండి",
        "irrigationParameters": "నీటిపారుదల పారామితులు",
        "aiAssistantTitle": "Agri Intelligence Bot",
        "aiAssistantOnline": "AI సహాయకుడు ఆన్‌లైన్‌లో ఉన్నారు",
        "chatPlaceholder": "వ్యవసాయం గురించి ఏదైనా అడగండి...",
        "onlineStatus": "ఆన్‌లైన్ మరియు సహాయం చేయడానికి సిద్ధంగా ఉంది",
        "askMeAnything": "ఏదైనా అడగండి...",
        "aiFarmingChat": "AI ఫార్మింగ్ చాట్",
        "expertAdvice": "నిపుణుల సలహా",
        "recentHistory": "ఇటీవలి చరిత్ర",
        "assistantStatus": "సహాయకుడి స్థితి",
        "responses": "ప్రతిస్పందనలు",
        "instant": "తక్షణ",
        "availability": "లభ్యత",
        "online247": "24/7 ఆన్‌లైన్",
        "languageLabel": "భాష",
        "multiModal": "మల్టీ-మోడల్",
        "agriAssistant": "Agri Assistant",
        "botWelcome": "నమస్తే! నేను మీ AI వ్యవసాయ సహాయకుడిని.",
        "botOffer": "నేను ఈ రోజు మీకు ఎలా సహాయం చేయగలను? నేను ట్రాక్టర్ బుకింగ్, పంట సలహా లేదా మార్కెట్ ధరల విషయాల్లో సహాయం చేయగలను.",
        "botGuidanceReply": "నేను పంట ఆరోగ్యం, నేల తయారీ మరియు ఆధునిక వ్యవసాయ పద్ధతులపై నిపుణుల మార్గదర్శకత్వాన్ని అందించగలను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
        "botRentReply": "మీరు మా రెంటల్ విభాగం నుండి ట్రాక్టర్లు మరియు ఇతర పరికరాలను అద్దెకు తీసుకోవచ్చు. ధరలు గంటకు ₹500 నుండి ప్రారంభమవుతాయి. మీరు కేటలాగ్ చూడాలనుకుంటున్నారా?",
        "botSchemeReply": "PM-KISAN మరియు YSR రైతు భరోసా వంటి అనేక ప్రభుత్వ పథకాలు ఉన్నాయి. మీ అర్హతను తనిఖీ చేయడంలో నేను మీకు సహాయం చేయగలను!",
        "botCropReply": "మా వద్ద వరి, పత్తి, టమోటా మరియు మరిన్నింటి కోసం వివరణాత్తక సాగు మార్గదర్శకాలు ఉన్నాయి. మీకు ఏ పంటపై ఆసక్తి ఉంది?",
        "botPestReply": "మీరు ఆకు చిత్రాలను స్కాన్ చేయడానికి మరియు వ్యాధులను వెంటనే గుర్తించడానికి మా క్రాప్ డాక్టర్ సాధనాన్ని ఉపయోగించవచ్చు. మీరు దీన్ని ప్రయత్నించాలనుకుంటున్నారా?",
        "botMarketReply": "టమోటా వంటి పంటల కోసం స్థానిక మండి ధరలు ప్రస్తుతం క్వింటాల్‌కు సుమారు ₹1,800గా ఉన్నాయి. నేను మీ జిల్లా కోసం ధరలను తనిఖీ చేయగలను!",
        "botFallback": "నాకు అర్ధం కాలేదు. నేను పంట సలహా, ట్రాక్టర్ అద్దెలు లేదా మార్కెట్ ధరలు వంటి విషయాల్లో సహాయపడగలను. 'టమోటా ధర ఎంత?' అని అడిగి చూడండి.",
        "guidanceKeywords": "సలహా, సహాయం, సూచనలు, గైడ్",
        "rentKeywords": "అద్దె, ట్రాక్టర్, యంత్రాలు, పరికరాలు, బుకింగ్",
        "schemeKeywords": "పథకం, ysr, కిసాన్, ప్రభుత్వం, సబ్సిడీ, అర్హత",
        "cropKeywords": "టమోటా, వరి, పత్తి, బియ్యం, పంట",
        "pestKeywords": "తెగులు, వ్యాధి, పురుగు, ఆకు, డాక్టర్, స్కాన్",
        "marketKeywords": "ధర, మండి, రేటు, మార్కెట్, భావం, అమ్మడం"
    },
    "Tamil": {
        "smartFarmingTools": "ஸ்மார்ட் விவசாயக் கருவிகள்",
        "aiCropDoctor": "AI பயிர் மருத்துவர்",
        "aiCropDoctorDesc": "பயிர் நோய்களைக் கண்டறிந்து சுகாதாரப் பரிந்துரைகளைப் பெறுங்கள்.",
        "smartCropRecommendation": "ஸ்மார்ட் பயிர் பரிந்துரை",
        "smartCropRecommendationDesc": "உங்கள் மண்ணுக்கு ஏற்ற சிறந்த பயிர்களுக்கான AI பரிந்துரைகள்.",
        "farmProfitCalculator": "பண்ணை லாபக் கால்குலேட்டர்",
        "farmProfitCalculatorDesc": "உங்கள் விவசாயச் செலவுகள் மற்றும் எதிர்பார்க்கும் லாபத்தைக் கணக்கிடுங்கள்.",
        "smartIrrigationCalculator": "ஸ்மார்ட் நீர்ப்பாசனக் கால்குலேட்டர்",
        "smartIrrigationCalculatorDesc": "உங்கள் பயிர்களுக்கான துல்லியமான நீர் தேவைகளைக் கணக்கிடுங்கள்.",
        "fertilizerRequirement": "உரப் பரிந்துரை",
        "fertilizerRequirementDesc": "உங்கள் பயிர் மற்றும் மண்ணுக்குத் துல்லியமான உர ஆலோசனையைப் பெறுங்கள்.",
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
        "irrigationParameters": "நீர்ப்பாசன அளவுருக்கள்",
        "aiAssistantTitle": "Agri Intelligence Bot",
        "aiAssistantOnline": "AI உதவியாளர் ஆன்லைனில் உள்ளார்",
        "chatPlaceholder": "விவசாயத்தைப் பற்றி எதையும் கேளுங்கள்...",
        "onlineStatus": "ஆன்லைன் மற்றும் உதவத் தயார்",
        "askMeAnything": "எதையும் கேளுங்கள்...",
        "aiFarmingChat": "AI விவசாய அரட்டை",
        "expertAdvice": "நிபுணர் ஆலோசனை",
        "recentHistory": "சமீபத்திய வரலாறு",
        "assistantStatus": "உதவியாளர் நிலை",
        "responses": "பதில்கள்",
        "instant": "உடனடி",
        "availability": "கிடைக்கும் தன்மை",
        "online247": "24/7 ஆன்லைன்",
        "languageLabel": "மொழி",
        "multiModal": "மல்டி-மோடல்",
        "agriAssistant": "Agri Assistant",
        "botWelcome": "வணக்கம்! நான் உங்கள் AI விவசாய உதவியாளர்.",
        "botOffer": "இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்? டிராக்டர் முன்பதிவு, பயிர் ஆலோசனை அல்லது சந்தை விலைகள் ஆகியவற்றில் நான் உதவ முடியும்.",
        "botGuidanceReply": "பயிர் ஆரோக்கியம், மண் தயாரிப்பு மற்றும் நவீன விவசாய நுட்பங்கள் குறித்த நிபுணர் வழிகாட்டுதலை என்னால் வழங்க முடியும். நீங்கள் என்ன அறிய விரும்புகிறீர்கள்?",
        "botRentReply": "எங்கள் வாடகை பிரிவில் இருந்து டிராக்டர்கள் மற்றும் பிற உபகரணங்களை நீங்கள் வாடகைக்கு எடுக்கலாம். விலைகள் மணிக்கு ₹500 முதல் தொடங்குகின்றன. நீங்கள் பட்டியலைப் பார்க்க விரும்புகிறீர்களா?",
        "botSchemeReply": "PM-KISAN போன்ற பல அரசு திட்டங்கள் உள்ளன. உங்கள் தகுதியைச் சரிபார்க்க நான் உங்களுக்கு உதவ முடியும்!",
        "botCropReply": "நெல், பருத்தி, தக்காளி மற்றும் பலவற்றிற்கான விரிவான சாகுபடி வழிகாட்டிகள் எங்களிடம் உள்ளன. உங்களுக்கு எந்த பயிரில் ஆர்வம் உள்ளது?",
        "botPestReply": "இலை படங்களை ஸ்கேன் செய்து நோய்களை உடனடியாகக் கண்டறிய எங்கள் பயிர் மருத்துவர் கருவியைப் பயன்படுத்தலாம். நீங்கள் இதை முயற்சிக்க விரும்புகிறீர்களா?",
        "botMarketReply": "தக்காளி போன்ற பயிர்களுக்கான உள்ளூர் மண்டி விலைகள் தற்போது ஒரு குவிண்டாலுக்கு சுமார் ₹1,800 ஆக உள்ளது. உங்கள் மாவட்டத்திற்கான விலைகளை நான் சரிபார்க்க முடியும்!",
        "botFallback": "எனக்கு புரியவில்லை. பயிர் ஆலோசனை, டிராக்டர் வாடகை அல்லது சந்தை விலைகள் போன்றவற்றில் நான் உதவ முடியும். 'தக்காளி விலை என்ன?' என்று கேட்டுப் பாருங்கள்.",
        "guidanceKeywords": "ஆலோசனை, உதவி, பரிந்துரைகள், வழிகாட்டி",
        "rentKeywords": "வாடகை, டிராக்டர், இயந்திரங்கள், உபகரணங்கள், முன்பதிவு",
        "schemeKeywords": "திட்டம், கிசான், அரசாங்கம், மானியம், தகுதி",
        "cropKeywords": "தக்காளி, நெல், பருத்தி, அரிசி, பயிர்",
        "pestKeywords": "பூச்சி, நோய், புழு, இலை, மருத்துவர், ஸ்கேன்",
        "marketKeywords": "விலை, மண்டி, விகிதம், சந்தை, பாவம், விற்பனை"
    }
}

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

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
        else:
            block = block.rstrip()
            if block.endswith(','):
                block += f'\n    {key}: "{val}",'
            else:
                block += f',\n    {key}: "{val}",'
                
    return content[:start_idx] + block + content[end_idx:]

new_content = update_lang_block(content, "Telugu", translations_master["Telugu"])
new_content = update_lang_block(new_content, "Tamil", translations_master["Tamil"])

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated Telugu and Tamil.")
