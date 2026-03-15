const fs = require('fs');
const path = 'client/lib/LanguageContext.tsx';

try {
    const rawContent = fs.readFileSync(path);
    let content = rawContent.toString('utf8');
    let lines = content.split(/\r?\n/);
    console.log('Total lines:', lines.length);

    // Fix Line 1750 (Index 1749)
    if (lines[1749] && lines[1749].includes('updateIrrigationSchedule')) {
        console.log('Cleaning line 1750...');
        lines[1749] = '    updateIrrigationSchedule: "सिंचाई कार्यक्रम अपडेट करें",';
    }

    // New Tamil Block
    const tamilReplacements = [
        '    suggestion4: "பாசுமதி நெல்லின் தற்போதைய சந்தை விலை என்ன?",',
        '    botWelcome: "நமஸ்தே! நான் உங்கள் AI விவசாய உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்? டிராக்டர் முன்பதிவு, பயிர் ஆலோசனை அல்லது சந்தை விலைகளுக்கு நான் உதவ முடியும்.",',
        '    botDistrictQuestion: "நான் உங்களுக்காக அதை ஆராய்ந்து கொண்டிருக்கிறேன். சிறந்த விவசாய பரிந்துரைக்கு, உங்கள் மாவட்டத்தை என்னிடம் சொல்ல முடியுமா?",',
        '    botSoilQuestion: "நான் உங்களுக்காக அதை ஆராய்ந்து கொண்டிருக்கிறேன். சிறந்த டிராக்டர் பரிந்துரைக்கு, உங்கள் மண் வகையை என்னிடம் சொல்ல முடியுமா?",',
        '    rentTractor: "🚜 டிராக்டர் வாடகை",',
        '    cropAdvice: "🌾 பயிர் ஆலோசனை",',
        '    aiAssistantOnline: "AI உதவியாளர் ஆன்லைனில்",',
        '    // Contact page',
        '    contactSupport: "ஆதரவைத் தொடர்பு கொள்ளவும்",',
        '    contactDesc: "கேள்விகள் உள்ளதா அல்லது உதவி தேவையா? எங்கள் பிரத்யேக ஆதரவுக் குழுவைத் தொடர்பு கொள்ளுங்கள்.",',
        '    callUs: "எங்களை அழையுங்கள்",',
        '    emailUs: "எங்களுக்கு மின்னஞ்சல் அனுப்புங்கள்",',
        '    visitOffice: "எங்கள் அலுவலகத்திற்கு வாருங்கள்",',
        '    farmerProtection: "விவசாயி பாதுகாப்பு",',
        '    farmerProtectionDesc: "உங்கள் தரவு மற்றும் தனியுரிமை எங்களின் முதன்மையான முன்னுரிமை. அனைத்து தகவல்களும் குறியாக்கம் செய்யப்பட்டு பாதுகாப்பாக உள்ளன.",',
        '    sendMessage: "ஒரு செய்தியை அனுப்புங்கள்",',
        '    sendMessageDesc: "கீழே உள்ள படிவத்தை நிரப்பவும், நாங்கள் உங்களைத் தொடர்பு கொள்வோம்.",',
        '    nameLabel: "பெயர்",',
        '    phoneLabel: "தொலைபேசி",',
        '    subjectLabel: "பொருள்",',
        '    messageLabel: "செய்தி",',
        '    yourFullName: "உங்கள் முழு பெயர்",',
        '    mobileNumber: "மொபைல் எண்",',
        '    whatCanWeHelp: "நாங்கள் எப்படி உதவ முடியும்?",',
        '    describeIssue: "உங்கள் பிரச்சனை அல்லது கேள்வியை விவரிக்கவும்...",',
        '    sending: "அனுப்பப்படுகிறது...",',
        '    sendBtn: "செய்தி அனுப்பு",',
        '    messageSent: "செய்தி அனுப்பப்பட்டது!",',
        '    messageSentDesc: "எங்கள் ஆதரவு குழு 24 மணி நேரத்திற்குள் உங்களைத் தொடர்பு கொள்ளும்.",',
        '    pestsTitle: "பூச்சி மற்றும் நோய் மேலாண்மை",',
        '    pestsDesc: "உங்கள் பயிர்களுக்கான விரிவான AI-இயங்கும் ஆரம்ப எச்சரிக்கை அமைப்பு மற்றும் சிகிச்சை வழிகாட்டுதல்.",',
        '    pestRecommendation: "பூச்சி பரிந்துரை இயந்திரம்",',
        '    pestRecommendationDesc: "உள்ளூர் பூச்சி மேலாண்மை ஆலோசனையைப் பெற உங்கள் தற்போதைய நிலைமைகளைத் தேர்ந்தெடுக்கவும்.",',
        '    chooseCrop: "பயிரைத் தேர்ந்தெடுக்கவும்",',
        '    weatherCondition: "வானிலை நிலை",',
        '    currentWeather: "தற்போதைய வானிலை",',
        '    clearSkies: "தெளிவான வானம்",',
        '    highHumidityRainy: "அதிக ஈரப்பதம் / மழை",',
        '    hotDry: "வெப்பம் மற்றும் வறண்ட",',
        '    analyzeRisks: "அபாயங்களை பகுப்பாய்வு செய்யுங்கள்",',
        '    pestIdentification: "பூச்சி கண்டறிதல்",',
        '    diseaseManagement: "நோய் மேலாண்மை",',
        '    risk: "அபாயம்",',
        '    riskHigh: "அதிக",',
        '    riskMedium: "நடுத்தர",',
        '    riskCritical: "மிகவும் சிக்கலான",',
        '    recommendedPesticide: "பரிந்துரைக்கப்பட்ட பூச்சிக்கொல்லி",',
        '    organicSolution: "இயற்கை தீர்வு",',
        '    treatmentPlan: "சிகிச்சை திட்டம்",',
        '    fertilizerRec: "உர பரிந்துரை",',
        '    preventionSteps: "தடுப்பு நடவடிக்கைகள்",',
        '    pulses: "பருப்பு வகைகள்",',
        '    diseaseDetectionTitle: "AI பயிர் நோய் கண்டறிதல்",',
        '    uploadPhotoDesc: "உடனடி கண்டறிதல் மற்றும் விரிவான சிகிச்சை படிகளுக்கு உங்கள் பயிரின் புகைப்படத்தைப் பதிवेற்றவும்.",',
        '    uploadFromGallery: "கேலரியில் இருந்து புகைப்படத்தைப் பதிவேற்றவும்",',
        '    clickToBrowse: "பயிர் படத்தைத் தேட மற்றும் தேர்ந்தெடுக்க இங்கே கிளிக் செய்யவும்",',
        '    openCameraCapture: "கேமராவைத் திறந்து படம் பிடிக்கவும்",',
        '    analyzingSpecimen: "மாதிரி பகுப்பாய்வு செய்யப்படுகிறது...",',
        '    detectDiseaseNow: "இப்போது நோயைக் கண்டறியவும்",',
        '    scanAnotherCrop: "மற்றொரு பயிரை ஸ்கேன் செய்யவும்",',
        '    detectedDisease: "கண்டறியப்பட்ட நோய்",',
        '    confidence: "நம்பிக்கை",',
        '    explanation: "விளக்கம்",',
        '    rootCauses: "மூல காரணங்கள்",',
        '    fertilizers: "உরங்கள்",',
        '    treatmentSteps: "சிகிச்சை படிகள்",'
    ];

    // Find indices
    let startTamilIndex = -1;
    let endTamilIndex = -1;
    
    for (let i = 1900; i < 2000; i++) {
        if (lines[i] && lines[i].includes('suggestion4:')) {
            startTamilIndex = i;
            break;
        }
    }
    
    for (let i = 2100; i < 2300; i++) {
        if (lines[i] && lines[i].includes('Marathi: {')) {
            endTamilIndex = i;
            break;
        }
    }

    if (startTamilIndex !== -1 && endTamilIndex !== -1) {
        console.log(`Replacing lines from ${startTamilIndex + 1} to ${endTamilIndex}...`);
        lines.splice(startTamilIndex, endTamilIndex - startTamilIndex, ...tamilReplacements);
        
        const updatedContent = lines.join('\n');
        fs.writeFileSync(path, updatedContent, 'utf8');
        console.log('Success!');
    } else {
        console.log('Indices not found:', { startTamilIndex, endTamilIndex });
        if (startTamilIndex !== -1) {
             console.log('Likely missing Marathi block start.');
             // Small replacement if can't find Marathi
             lines.splice(startTamilIndex, 10, ...tamilReplacements.slice(0, 10));
             fs.writeFileSync(path, lines.join('\n'), 'utf8');
             console.log('Partial success (only first 10 tamil lines replaced)');
        }
    }

} catch (err) {
    console.error('FAILED:', err);
}
