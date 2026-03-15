const fs = require('fs');
const path = 'client/lib/LanguageContext.tsx';

try {
    const raw = fs.readFileSync(path);
    // Remove any null bytes or weird characters that might make it look binary
    const content = raw.toString('utf8').replace(/\0/g, '');
    const lines = content.split(/\r?\n/);

    console.log('Original line 1750:', lines[1749]);
    console.log('Original line 1917:', lines[1916]);
    console.log('Original line 1918:', lines[1917]);

    // Fix line 1750 (Index 1749)
    lines[1749] = '    updateIrrigationSchedule: "सिंचाई कार्यक्रम अपडेट करें",';

    // Fix Tamil block corruption (Indices 1916 and 1917)
    // We replace the two mangled lines with the correct set of translations that were likely lost
    const replacements = [
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
        '    farmerProtectionDesc: "உங்கள் தரவு மற்றும் தனியுரிமை எங்களின் முதன்மையான முன்னுरीமை. அனைத்து தகவல்களும் குறியாக்கம் செய்யப்பட்டு பாதுகாப்பாக உள்ளன.",',
        '    sendMessage: "ஒரு செய்தியை அனுப்புங்கள்",',
        '    sendMessageDesc: "கீழே உள்ள படிவத்தை நிரப்பவும், நாங்கள் உங்களைத் தொடர்பு கொள்வோம்.",'
    ];

    lines.splice(1916, 2, ...replacements);

    fs.writeFileSync(path, lines.join('\n'), 'utf8');
    console.log('Successfully fixed LanguageContext.tsx');
} catch (e) {
    console.error('Error:', e);
}
