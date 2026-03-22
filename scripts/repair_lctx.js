const fs = require('fs');
const path = 'client/lib/LanguageContext.tsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split(/\r?\n/);

// We know from view_file that it's around line 1917 (index 1916)
let startIndex = -1;
for (let i = 1910; i < 1925 && i < lines.length; i++) {
    if (lines[i].includes('botDistrictQuestion') && lines[i].includes('અમારા વિભાગો')) {
        startIndex = i;
        break;
    }
}

if (startIndex !== -1) {
    const replacement = [
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
        '    sendMessageDesc: "கீழே உள்ள படிவத்தை நிரப்பவும், நாங்கள் உங்களைத் தொடர்பு கொள்வோம்.",'
    ];
    
    // We want to replace line startIndex (1916) and startIndex + 1 (1917)
    console.log(`Replacing lines ${startIndex + 1} and ${startIndex + 2}`);
    lines.splice(startIndex, 2, ...replacement);
    fs.writeFileSync(path, lines.join('\n'));
    console.log('Successfully repaired LanguageContext.tsx');
} else {
    console.log('Could not find the mangled line at expected location.');
}
