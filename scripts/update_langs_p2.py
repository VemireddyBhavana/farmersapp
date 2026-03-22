import re

file_path = r'd:\Desktop Data\project\farmersapp\client\lib\LanguageContext.tsx'

translations_remaining = {
    "Marathi": {
        "smartFarmingTools": "स्मार्ट शेती साधने",
        "aiCropDoctor": "AI पीक डॉक्टर",
        "aiCropDoctorDesc": "पिकांच्या रोगांचा शोध घ्या आणि आरोग्य शिफारसी मिळवा.",
        "smartCropRecommendation": "स्मार्ट पीक शिफारस",
        "smartCropRecommendationDesc": "तुमच्या मातीसाठी सर्वोत्तम पिकांसाठी AI सूचना.",
        "farmProfitCalculator": "शेती नफा कॅल्क्युलेटर",
        "farmProfitCalculatorDesc": "तुमचा शेती खर्च आणि अपेक्षित नफ्याची गणना करा.",
        "smartIrrigationCalculator": "स्मार्ट सिंचन कॅल्क्युलेटर",
        "smartIrrigationCalculatorDesc": "तुमच्या पिकांसाठी अचूक पाण्याची गरज मोजा.",
        "fertilizerRequirement": "खत सल्ला",
        "fertilizerRequirementDesc": "तुमच्या पिकासाठी आणि मातीसाठी अचूक खत सल्ला मिळवा.",
        "aiAssistantTitle": "Agri Intelligence Bot",
        "chatPlaceholder": "शेतीबद्दल काहीही विचारा...",
        "botWelcome": "नमस्कार! मी तुमचा AI कृषी सहाय्यक आहे.",
        "botOffer": "मी आज तुम्हाला कशी मदत करू शकतो? मी ट्रॅक्टर बुकिंग, पीक सल्ला किंवा बाजार भावांमध्ये मदत करू शकतो.",
        "botGuidanceReply": "मी पीक आरोग्य आणि आधुनिक शेती तंत्रांवर तज्ञ मार्गदर्शन देऊ शकतो. तुम्हाला काय जाणून घ्यायचे आहे?",
        "botRentReply": "तुम्ही आमच्या रेंटल विभागातून ट्रॅक्टर भाड्याने घेऊ शकता. दर तासाला ₹500 पासून सुरू होतात.",
        "botSchemeReply": "PM-KISAN सारख्या अनेक सरकारी योजना आहेत. मी तुमची पात्रता तपासण्यास मदत करू शकतो!",
        "botCropReply": "आमच्याकडे भात, कापूस, टोमॅटोसाठी सविस्तर मार्गदर्शक तत्त्वे आहेत. तुम्हाला कोणत्या पिकात रस आहे?",
        "botPestReply": "रोगांचे त्वरित निदान करण्यासाठी तुम्ही आमचे पीक डॉक्टर साधन वापरू शकता.",
        "botMarketReply": "टोमॅटोचे बाजार भाव सध्या सुमारे ₹1,800 प्रति क्विंटल आहेत.",
        "botFallback": "मला समजले नाही. मी पीक सल्ला किंवा ट्रॅक्टर भाड्याने देण्यास मदत करू शकतो.",
        "guidanceKeywords": "सल्ला, मदत, सूचना, मार्गदर्शक",
        "rentKeywords": "भाडे, ट्रॅक्टर, मशिनरी, उपकरणे, बुकिंग",
        "schemeKeywords": "योजना, किसान, सरकार, सबसिडी, पात्रता",
        "cropKeywords": "टोमॅटो, भात, कापूस, तांदूळ, पीक",
        "pestKeywords": "कीड, रोग, अळी, पान, डॉक्टर, स्कॅन",
        "marketKeywords": "किंमत, मंडी, दर, बाजार, भाव, विक्री"
    },
    "Gujarati": {
        "smartFarmingTools": "સ્માર્ટ ખેતી સાધનો",
        "aiCropDoctor": "AI પાક ડોક્ટર",
        "aiCropDoctorDesc": "પાકના રોગો શોધો અને આરોગ્ય ભલામણો મેળવો.",
        "smartCropRecommendation": "સ્માર્ટ પાક ભલામણ",
        "smartCropRecommendationDesc": "તમારી જમીન માટે શ્રેષ્ઠ પાક માટે AI સૂચનો.",
        "farmProfitCalculator": "ખેતી નફો કેલ્ક્યુલેટર",
        "farmProfitCalculatorDesc": "તમારા ખેતી ખર્ચ અને અપેક્ષિત નફાની ગણતરી કરો.",
        "smartIrrigationCalculator": "સ્માર્ટ સિંચાઈ કેલ્ક્યુલેટર",
        "smartIrrigationCalculatorDesc": "તમારા પાક માટે ચોક્કસ પાણીની જરૂરિયાત ગણો.",
        "fertilizerRequirement": "ખાતર સલાહ",
        "fertilizerRequirementDesc": "તમારા પાક અને જમીન માટે ચોક્કસ ખાતર સલાહ મેળવો.",
        "aiAssistantTitle": "Agri Intelligence Bot",
        "chatPlaceholder": "ખેતી વિશે કંઈપણ પૂછો...",
        "botWelcome": "નમસ્તે! હું તમારો AI કૃષિ સહાયક છું.",
        "botOffer": "હું આજે તમને કેવી રીતે મદદ કરી શકું? હું ટ્રેક્ટર બુકિંગ, પાક સલાહ અથવા બજાર ભાવમાં મદદ કરી શકું છું.",
        "botGuidanceReply": "હું પાક આરોગ્ય અને આધુનિક ખેતી પદ્ધતિઓ પર નિષ્ણાત માર્ગદર્શન આપી શકું છું. તમે શું જાણવા માંગો છો?",
        "botRentReply": "તમે અમારા રેન્ટલ વિભાગમાંથી ટ્રેક્ટર ભાડે લઈ શકો છો. ભાવ કલાકના ₹500 થી શરૂ થાય છે.",
        "botSchemeReply": "PM-KISAN જેવી ઘણી સરકારી યોજનાઓ છે. હું તમારી પાત્રતા તપાસવામાં મદદ કરી શકું છું!",
        "botCropReply": "અમારી પાસે ડાંગર, કપાસ, ટામેટા માટે વિગતવાર માર્ગદર્શિકા છે. તમને કયા પાકમાં રસ છે?",
        "botPestReply": "રોગોનું તરત જ નિદાન કરવા માટે તમે અમારા પાક ડોક્ટર સાધનનો ઉપયોગ કરી શકો છો.",
        "botMarketReply": "ટામેટાના બજાર ભાવ હાલમાં ક્વિન્ટલ દીઠ આશરે ₹1,800 છે.",
        "botFallback": "મને સમજાયું નહીં. હું પાક સલાહ અથવા ટ્રેક્ટર ભાડામાં મદદ કરી શકું છું.",
        "guidanceKeywords": "સલાહ, મદદ, સૂચનો, માર્ગદર્શિકા",
        "rentKeywords": "ભાડું, ટ્રેક્ટર, મશીનરી, સાધનો, બુકિંગ",
        "schemeKeywords": "યોજના, કિસાન, સરકાર, સબસિડી, પાત્રતા",
        "cropKeywords": "ટામેટા, ડાંગર, કપાસ, ચોખા, પાક",
        "pestKeywords": "જીવાત, રોગ, ઈયળ, પાન, ડોક્ટર, સ્કેન",
        "marketKeywords": "કિંમત, મંડી, દર, બજાર, ભાવ, વેચાણ"
    },
    "Kannada": {
        "smartFarmingTools": "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಪರಿಕರಗಳು",
        "aiCropDoctor": "AI ಬೆಳೆ ವೈದ್ಯ",
        "aiCropDoctorDesc": "ಬೆಳೆ ರೋಗಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ ಮತ್ತು ಆರೋಗ್ಯ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ.",
        "smartCropRecommendation": "ಸ್ಮಾರ್ಟ್ ಬೆಳೆ ಶಿಫಾರಸು",
        "smartCropRecommendationDesc": "ನಿಮ್ಮ ಮಣ್ಣಿಗೆ ಉತ್ತಮ ಬೆಳೆಗಳಿಗಾಗಿ AI ಸಲಹೆಗಳು.",
        "farmProfitCalculator": "ಕೃಷಿ ಲಾಭ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
        "farmProfitCalculatorDesc": "ನಿಮ್ಮ ಕೃಷಿ ವೆಚ್ಚ ಮತ್ತು ನಿರೀಕ್ಷಿತ ಲಾಭವನ್ನು ಲೆಕ್ಕಹಾಕಿ.",
        "smartIrrigationCalculator": "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
        "smartIrrigationCalculatorDesc": "ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ನಿಖರವಾದ ನೀರಿನ ಅವಶ್ಯಕತೆಗಳನ್ನು ಲೆಕ್ಕಹಾಕಿ.",
        "fertilizerRequirement": "ಗೊಬ್ಬರ ಸಲಹೆ",
        "fertilizerRequirementDesc": "ನಿಮ್ಮ ಬೆಳೆ ಮತ್ತು ಮಣ್ಣಿಗೆ ನಿಖರವಾದ ಗೊಬ್ಬರದ ಸಲಹೆ ಪಡೆಯಿರಿ.",
        "aiAssistantTitle": "Agri Intelligence Bot",
        "chatPlaceholder": "ಕೃಷಿಯ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ...",
        "botWelcome": "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ.",
        "botOffer": "ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು? ನಾನು ಟ್ರ್ಯಾಕ್ಟರ್ ಬುಕಿಂಗ್, ಬೆಳೆ ಸಲಹೆ ಅಥವಾ ಮಾರುಕಟ್ಟೆ ದರಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ.",
        "botGuidanceReply": "ಬೆಳೆ ಆರೋಗ್ಯ ಮತ್ತು ಆಧುನಿಕ ಕೃಷಿ ತಂತ್ರಗಳ ಬಗ್ಗೆ ನಾನು ತಜ್ಞರ ಮಾರ್ಗದರ್ಶನ ನೀಡಬಲ್ಲೆ. ನೀವು ಏನು ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ?",
        "botRentReply": "ನಮ್ಮ ಬಾಡಿಗೆ ವಿಭಾಗದಿಂದ ನೀವು ಟ್ರ್ಯಾಕ್ಟರ್‌ಗಳನ್ನು ಬಾಡಿಗೆಗೆ ಪಡೆಯಬಹುದು. ದರಗಳು ಗಂಟೆಗೆ ₹500 ರಿಂದ ಪ್ರಾರಂಭವಾಗುತ್ತವೆ.",
        "botSchemeReply": "PM-KISAN ನಂತಹ ಅನೇಕ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಿವೆ. ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಪರೀಕ್ಷಿಸಲು ನಾನು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ!",
        "botCropReply": "ನಮ್ಮಲ್ಲಿ ಭತ್ತ, ಹತ್ತಿ, ಟೊಮೆಟೊಗಾಗಿ ವಿವರವಾದ ಕೃಷಿ ಮಾರ್ಗದರ್ಶಿಗಳಿವೆ. ನಿಮಗೆ ಯಾವ ಬೆಳೆಯಲ್ಲಿ ಆಸಕ್ತಿ ಇದೆ?",
        "botPestReply": "ರೋಗಗಳನ್ನು ತಕ್ಷಣ ಪತ್ತೆಹಚ್ಚಲು ನೀವು ನಮ್ಮ ಬೆಳೆ ವೈದ್ಯ ಉಪಕರಣವನ್ನು ಬಳಸಬಹುದು.",
        "botMarketReply": "ಟೊಮೆಟೊ ಮಾರುಕಟ್ಟೆ ದರಗಳು ಪ್ರಸ್ತುತ ಕ್ವಿಂಟಾಲ್‌ಗೆ ಸುಮಾರು ₹1,800 ಇವೆ.",
        "botFallback": "ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ಬೆಳೆ ಸಲಹೆ ಅಥವಾ ಟ್ರ್ಯಾಕ್ಟರ್ ಬಾಡಿಗೆ ಬಗ್ಗೆ ನಾನು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ.",
        "guidanceKeywords": "ಸಲಹೆ, ಸಹಾಯ, ಸೂಚನೆಗಳು, ಮಾರ್ಗದರ್ಶಿ",
        "rentKeywords": "ಬಾಡಿಗೆ, ಟ್ರ್ಯಾಕ್ಟರ್, ಯಂತ್ರೋಪಕರಣಗಳು, ಉಪಕರಣಗಳು, ಬುಕಿಂಗ್",
        "schemeKeywords": "ಯೋಜನೆ, ಕಿಸಾನ್, ಸರ್ಕಾರ, ಸಬ್ಸಿಡಿ, ಅರ್ಹತೆ",
        "cropKeywords": "ಟೊಮೆಟೊ, ಭತ್ತ, ಹತ್ತಿ, ಅಕ್ಕಿ, ಬೆಳೆ",
        "pestKeywords": "ಕೀಟ, ರೋಗ, ಹುಳು, ಎಲೆ, ವೈದ್ಯ, ಸ್ಕ್ಯಾನ್",
        "marketKeywords": "ಬೆಲೆ, ಮಂಡಿ, ದರ, ಮಾರುಕಟ್ಟೆ, ಭಾವ, ಮಾರಾಟ"
    },
    "Malayalam": {
        "smartFarmingTools": "സ്മാർട്ട് ഫാമിംഗ് ടൂളുകൾ",
        "aiCropDoctor": "AI ക്രോപ്പ് ഡോക്ടർ",
        "aiCropDoctorDesc": "വിള രോഗങ്ങൾ കണ്ടെത്തുകയും ആരോഗ്യ ശുപാർശകൾ നേടുകയും ചെയ്യുക.",
        "smartCropRecommendation": "സ്മാർട്ട് വിള ശുപാർശ",
        "smartCropRecommendationDesc": "നിങ്ങളുടെ മണ്ണിന് അനുയോജ്യമായ വിളകൾക്കായി AI നിർദ്ദേശങ്ങൾ.",
        "farmProfitCalculator": "ഫാം ലാഭ കാൽക്കുലേറ്റർ",
        "farmProfitCalculatorDesc": "നിങ്ങളുടെ കൃഷി ചിലവും പ്രതീക്ഷിക്കുന്ന ലാഭവും കണക്കാക്കുക.",
        "smartIrrigationCalculator": "സ്മാർട്ട് ജലസേചന കാൽക്കുലേറ്റർ",
        "smartIrrigationCalculatorDesc": "നിങ്ങളുടെ വിളകൾക്ക് ആവശ്യമായ കൃത്യമായ വെള്ളം കണക്കാക്കുക.",
        "fertilizerRequirement": "വളപ്രയോഗ നിർദ്ദേശം",
        "fertilizerRequirementDesc": "നിങ്ങളുടെ വിളയ്ക്കും മണ്ണിനും അനുയോജ്യമായ വളപ്രയോഗ നിർദ്ദേശം നേടുക.",
        "aiAssistantTitle": "Agri Intelligence Bot",
        "chatPlaceholder": "കൃഷിയെക്കുറിച്ച് എന്തുവേണമെങ്കിലും ചോദിക്കാം...",
        "botWelcome": "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ AI കാർഷിക സഹായിയാണ്.",
        "botOffer": "ഇന്ന് എനിക്ക് എങ്ങനെ സഹായിക്കാനാകും? ട്രാക്ടർ ബുക്കിംഗ്, വിള ഉപദേശം അല്ലെങ്കിൽ വിപണി നിരക്കുകൾ എന്നിവയിൽ എനിക്ക് സഹായിക്കാനാകും.",
        "botGuidanceReply": "വിളകളുടെ ആരോഗ്യം, ആധುನിക കൃഷി രീതികൾ എന്നിവയിൽ എനിക്ക് വിദഗ്ധ മാർഗ്ഗനിർദ്ദേശം നൽകാൻ കഴിയും. നിങ്ങൾക്ക് എന്താണ് അറിയേണ്ടത്?",
        "botRentReply": "ഞങ്ങളുടെ വാടക വിഭാഗത്തിൽ നിന്ന് നിങ്ങൾക്ക് ട്രാക്ടറുകൾ വാടകയ്ക്ക് എടുക്കാം. നിരക്കുകൾ മണിക്കൂറിന് ₹500 മുതൽ ആരംഭിക്കുന്നു.",
        "botSchemeReply": "PM-KISAN പോലുള്ള നിരവധി സർക്കാർ പദ്ധതികളുണ്ട്. നിങ്ങളുടെ യോഗ്യത പരിശോധിക്കാൻ എനിക്ക് സഹായിക്കാനാകും!",
        "botCropReply": "നെല്ല്, പരുത്തി, തക്കാളി എന്നിവയ്ക്കായി വിശദമായ കൃഷി മാർഗ്ഗനിർദ്ദേശങ്ങൾ ഞങ്ങളുടെ പക്കലുണ്ട്. നിങ്ങൾക്ക് ഏത് വിളയിലാണ് താൽപ്പര്യം?",
        "botPestReply": "രോഗങ്ങൾ ഉടൻ തിരിച്ചറിയാൻ നിങ്ങൾക്ക് ഞങ്ങളുടെ ക്രോപ്പ് ഡോക്ടർ ഉപകരണം ഉപയോഗിക്കാം.",
        "botMarketReply": "തക്കാളിയുടെ വിപണി നിരക്ക് ഇപ്പോൾ ക്വിന്റലിന് ഏകദേശം ₹1,800 ആണ്.",
        "botFallback": "എനിക്ക് മനസ്സിലായില്ല. വിള ഉപദേശത്തിനോ ട്രാക്ടർ വാടകയ്ക്കോ എനിക്ക് സഹായിക്കാനാകും.",
        "guidanceKeywords": "ഉപദേശം, സഹായം, നിർദ്ദേശങ്ങൾ, ഗൈഡ്",
        "rentKeywords": "വാടക, ട്രാക്ടർ, യന്ത്രങ്ങൾ, ഉപകരണങ്ങൾ, ബുക്കിംഗ്",
        "schemeKeywords": "പദ്ധതി, കിസാൻ, സർക്കാർ, സബ്‌സിഡി, യോഗ്യത",
        "cropKeywords": "തക്കാളി, നെല്ല്, പരുത്തി, അരി, വിള",
        "pestKeywords": "കീടം, രോഗം, പുഴു, ഇല, ഡോക്ടർ, സ്കാൻ",
        "marketKeywords": "വില, മണ്ടി, നിരക്ക്, വിപണി, ഭാവം, വിൽപ്പന"
    },
    "Punjabi": {
        "smartFarmingTools": "ਸਮਾਰਟ ਖੇਤੀ ਸਾਧਨ",
        "aiCropDoctor": "AI ਫ਼ਸਲ ਡਾਕਟਰ",
        "aiCropDoctorDesc": "ਫ਼ਸਲ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਦਾ ਪਤਾ ਲਗਾਓ ਅਤੇ ਸਿਹਤ ਸਿਫ਼ਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।",
        "smartCropRecommendation": "ਸਮਾਰਟ ਫ਼ਸਲ ਸਿਫ਼ਾਰਸ਼",
        "smartCropRecommendationDesc": "ਤੁਹਾਡੀ ਮਿੱਟੀ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਫ਼ਸਲਾਂ ਲਈ AI ਸੁਝਾਅ।",
        "farmProfitCalculator": "ਖੇਤੀ ਮੁਨਾਫਾ ਕੈਲਕੁਲੇਟਰ",
        "farmProfitCalculatorDesc": "ਆਪਣੀ ਖੇਤੀ ਦੀ ਲਾਗਤ ਅਤੇ ਅਪੇਖਿਤ ਮੁਨਾਫੇ ਦੀ ਗਣਨਾ ਕਰੋ।",
        "smartIrrigationCalculator": "ਸਮਾਰਟ ਸਿੰਚਾਈ ਕੈਲਕੁਲੇਟਰ",
        "smartIrrigationCalculatorDesc": "ਆਪਣੀਆਂ ਫ਼ਸਲਾਂ ਲਈ ਸਹੀ ਪਾਣੀ ਦੀ ਲੋੜ ਦੀ ਗਣਨਾ ਕਰੋ।",
        "fertilizerRequirement": "ਖਾਦ ਸਲਾਹ",
        "fertilizerRequirementDesc": "ਆਪਣੀ ਫ਼ਸਲ ਅਤੇ ਮਿੱਟੀ ਲਈ ਸਹੀ ਖਾਦ ਸਲਾਹ ਪ੍ਰਾਪਤ ਕਰੋ।",
        "aiAssistantTitle": "Agri Intelligence Bot",
        "chatPlaceholder": "ਖੇਤੀ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ...",
        "botWelcome": "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ AI ਖੇਤੀ ਸਹਾਇਕ ਹਾਂ।",
        "botOffer": "ਮੈਂ ਅੱਜ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ? ਮੈਂ ਟਰੈਕਟਰ ਬੁਕਿੰਗ, ਫ਼ਸਲ ਸਲਾਹ ਜਾਂ ਮੰਡੀ ਦੇ ਭਾਵਾਂ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ।",
        "botGuidanceReply": "ਮੈਂ ਫ਼ਸਲ ਦੀ ਸਿਹਤ ਅਤੇ ਆਧੁਨਿਕ ਖੇਤੀ ਤਕਨੀਕਾਂ ਬਾਰੇ ਮਾਹਰ ਮਾਰਗਦਰਸ਼ਨ ਦੇ ਸਕਦਾ ਹਾਂ। ਤੁਸੀਂ ਕੀ ਜਾਣਨਾ ਚਾਹੁੰਦੇ ਹੋ?",
        "botRentReply": "ਤੁਸੀਂ ਸਾਡੇ ਰੈਂਟਲ ਸੈਕਸ਼ਨ ਤੋਂ ਟਰੈਕਟਰ ਕਿਰਾਏ 'ਤੇ ਲੈ ਸਕਦੇ ਹੋ। ਰੇਟ ₹500 ਪ੍ਰਤੀ ਘੰਟੇ ਤੋਂ ਸ਼ੁਰੂ ਹੁੰਦੇ ਹਨ।",
        "botSchemeReply": "PM-KISAN ਵਰਗੀਆਂ ਕਈ ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਹਨ। ਮੈਂ ਤੁਹਾਡੀ ਪਾਤਰਤਾ ਚੈੱਕ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ!",
        "botCropReply": "ਸਾਡੇ ਕੋਲ ਝੋਨਾ, ਨਰਮਾ, ਟਮਾਟਰ ਲਈ ਵਿਸਤ੍ਰਿਤ ਖੇਤੀ ਗਾਈਡਾਂ ਹਨ। ਤੁਹਾਡੀ ਕਿਸ ਫ਼ਸਲ ਵਿੱਚ ਦਿਲਚਸਪੀ ਹੈ?",
        "botPestReply": "ਬਿਮਾਰੀਆਂ ਦਾ ਤੁਰੰਤ ਪਤਾ ਲਗਾਉਣ ਲਈ ਤੁਸੀਂ ਸਾਡੇ ਕ੍ਰੌਪ ਡਾਕਟਰ ਟੂਲ ਦੀ ਵਰਤੋਂ ਕਰ ਸਕਦੇ ਹੋ।",
        "botMarketReply": "ਟਮਾਟਰ ਦੇ ਮੰਡੀ ਦੇ ਭਾਵ ਇਸ ਸਮੇਂ ਲਗਭਗ ₹1,800 ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਹਨ।",
        "botFallback": "ਮੈਨੂੰ ਸਮਝ ਨਹੀਂ ਆਇਆ। ਮੈਂ ਫ਼ਸਲ ਸਲਾਹ ਜਾਂ ਟਰੈਕਟਰ ਕਿਰਾਏ ਲਈ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ।",
        "guidanceKeywords": "ਸਲਾਹ, ਮਦਦ, ਸੁਝਾਅ, ਗਾਈਡ",
        "rentKeywords": "ਕਿਰਾਇਆ, ਟਰੈਕਟਰ, ਮਸ਼ੀਨਰੀ, ਸੰਦ, ਬੁਕਿੰਗ",
        "schemeKeywords": "ਸਕੀਮ, ਕਿਸਾਨ, ਸਰਕਾਰ, ਸਬਸਿਡੀ, ਪਾਤਰਤਾ",
        "cropKeywords": "ਟਮਾਟਰ, ਝੋਨਾ, ਨਰਮਾ, ਚੌਲ, ਫ਼ਸਲ",
        "pestKeywords": "ਕੀੜਾ, ਬਿਮਾਰੀ, ਸੁੰਡੀ, ਪੱਤਾ, ਡਾਕਟਰ, ਸਕੈਨ",
        "marketKeywords": "ਕੀਮਤ, ਮੰਡੀ, ਰੇਟ, ਬਾਜ਼ਾਰ, ਭਾਵ, ਵਿਕਰੀ"
    },
    "Bangla": {
        "smartFarmingTools": "স্মার্ট চাষাবাদ সরঞ্জাম",
        "aiCropDoctor": "AI ফসল ডাক্তার",
        "aiCropDoctorDesc": "ফসলের রোগ শনাক্ত করুন এবং স্বাস্থ্য পরামর্শ পান।",
        "smartCropRecommendation": "স্মার্ট ফসল সুপারিশ",
        "smartCropRecommendationDesc": "আপনার মাটির জন্য সেরা ফসলের AI পরামর্শ।",
        "farmProfitCalculator": "খামার লাভ ক্যালকুলেটর",
        "farmProfitCalculatorDesc": "আপনার চাষের খরচ এবং প্রত্যাশিত লাভ গণনা করুন।",
        "smartIrrigationCalculator": "স্মার্ট সেচ ক্যালকুলেটর",
        "smartIrrigationCalculatorDesc": "আপনার ফসলের জন্য সঠিক জলের প্রয়োজনীয়তা গণনা করুন।",
        "fertilizerRequirement": "সার পরামর্শ",
        "fertilizerRequirementDesc": "আপনার ফসল এবং মাটির জন্য সঠিক সারের পরামর্শ পান।",
        "aiAssistantTitle": "Agri Intelligence Bot",
        "chatPlaceholder": "চাষাবাদ সম্পর্কে যে কোনো কিছু জিজ্ঞাসা করুন...",
        "botWelcome": "নমস্কার! আমি আপনার AI কৃষি সহকারী।",
        "botOffer": "আমি আজ আপনাকে কীভাবে সাহায্য করতে পারি? আমি ট্র্যাক্টর বুকিং, ফসলের পরামর্শ বা বাজারের দামে সাহায্য করতে পারি।",
        "botGuidanceReply": "আমি ফসলের স্বাস্থ্য এবং আধুনিক চাষাবাদ পদ্ধতির ওপর বিশেষজ্ঞ পরামর্শ দিতে পারি। আপনি কী জানতে চান?",
        "botRentReply": "আপনি আমাদের রেন্টাল বিভাগ থেকে ট্র্যাক্টর ভাড়া নিতে পারেন। প্রতি ঘণ্টায় ৫০০ টাকা থেকে শুরু।",
        "botSchemeReply": "PM-KISAN-এর মতো অনেক সরকারি প্রকল্প আছে। আমি আপনার যোগ্যতা যাচাই করতে সাহায্য করতে পারি!",
        "botCropReply": "আমাদের কাছে ধান, তুলা, টমেটোর জন্য বিস্তারিত চাষাবাদ নির্দেশিকা আছে। আপনি কোন ফসলে আগ্রহী?",
        "botPestReply": "রোগ দ্রুত শনাক্ত করতে আপনি আমাদের ক্রপ ডাক্তার টুল ব্যবহার করতে পারেন।",
        "botMarketReply": "টমেটোর বাজার দর এখন কুইন্টাল প্রতি প্রায় ১,৮০০ টাকা।",
        "botFallback": "আমি বুঝতে পারিনি। আমি ফসলের পরামর্শ বা ট্র্যাক্টর ভাড়ায় সাহায্য করতে পারি।",
        "guidanceKeywords": "পরামর্শ, সাহায্য, নির্দেশিকা, গাইড",
        "rentKeywords": "ভাড়া, ট্র্যাক্টর, যন্ত্রপাতি, সরঞ্জাম, বুকিং",
        "schemeKeywords": "প্রকল্প, কিষাণ, সরকার, ভর্তুকি, যোগ্যতা",
        "cropKeywords": "টমেটো, ধান, তুলা, চাল, ফসল",
        "pestKeywords": "পোকা, রোগ, কিমি, পাতা, ডাক্তার, স্ক্যান",
        "marketKeywords": "দাম, মন্ডি, হার, বাজার, ভাব, বিক্রি"
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

for lang, trans_dict in translations_remaining.items():
    content = update_lang_block(content, lang, trans_dict)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated remaining languages.")
