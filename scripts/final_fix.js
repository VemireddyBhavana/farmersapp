const fs = require('fs');
const path = 'client/lib/LanguageContext.tsx';

try {
    const raw = fs.readFileSync(path);
    // Convert to string and remove null bytes
    let content = raw.toString('utf8').replace(/\0/g, '');
    let lines = content.split(/\r?\n/);

    console.log('Total lines:', lines.length);

    // 1. Fix line 1750 (Index 1749)
    if (lines[1749] && lines[1749].includes('updateIrrigationSchedule')) {
        lines[1749] = '    updateIrrigationSchedule: "सिंचाई कार्यक्रम अपडेट करें",';
    }

    // 2. Fix Tamil block corruption
    // We search for the pattern "botDistrictQuestion" and "departmentsTitle" to find the mangled line
    let found = false;
    for (let i = 1900; i < lines.length - 1; i++) {
        if (lines[i].includes('botDistrictQuestion') && lines[i].includes('departmentsTitle')) {
            console.log('Found corrupted line at ' + (i + 1));
            
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
                '    farmerProtectionDesc: "உங்கள் தரவு மற்றும் தனியுரிமை எங்களின் முதன்மையான முன்னுரிமை. அனைத்து தகவல்களும் குறியாக்கம் செய்யப்பட்டு பாதுகாப்பாக உள்ளன.",',
                '    sendMessage: "ஒரு செய்தியை அனுப்புங்கள்",',
                '    sendMessageDesc: "கீழே உள்ள படிவத்தை நிரப்பவும், நாங்கள் உங்களைத் தொடர்பு கொள்வோம்.",'
            ];

            // Replace the mangled line (i) and the next line (i+1) which had "},டர்பு கொள்வோம்"
            lines.splice(i, 2, ...replacements);
            found = true;
            break;
        }
    }

    if (!found) {
        console.log('Could not find corrupted block via content search. Using fallback line numbers.');
        // Fallback to line 1917 (index 1916) if search failed but we know from view_file
        lines.splice(1916, 2, '    botDistrictQuestion: "நான் உங்களுக்காக அதை ஆராய்ந்து கொண்டிருக்கிறேன். சிறந்த விவசாய பரிந்துரைக்கு, உங்கள் மாவட்டத்தை என்னிடம் சொல்ல முடியுமா?",', '  },');
    }

    // 3. Ensure Marathi block is startable (just in case)
    for (let i = 1900; i < lines.length; i++) {
         if (lines[i].includes('Marathi: {')) {
             console.log('Marathi block starts at ' + (i + 1));
             break;
         }
    }

    // Write back as CLEAN UTF-8
    fs.writeFileSync(path, lines.join('\n'), 'utf8');
    console.log('Successfully repaired LanguageContext.tsx');
} catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
}
