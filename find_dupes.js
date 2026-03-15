
const fs = require('fs');
const filePath = 'd:/Desktop Data/project/farmersapp/client/lib/LanguageContext.tsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const languages = ["English", "Hindi", "Telugu", "Tamil", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Bangla"];

languages.forEach(lang => {
    let inLang = false;
    let openBraces = 0;
    const seenKeys = new Map();
    
    console.log(`\n--- Checking ${lang} ---`);
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (!inLang && line.includes(`${lang}: {`)) {
            inLang = true;
            openBraces = 1;
            continue;
        }
        
        if (inLang) {
            if (line.includes('{')) openBraces += (line.match(/{/g) || []).length;
            if (line.includes('}')) openBraces -= (line.match(/}/g) || []).length;
            
            const match = line.match(/^\s+([a-zA-Z0-9]+):/);
            if (match) {
                const key = match[1];
                if (seenKeys.has(key)) {
                    console.log(`Duplicate key "${key}" at line ${i + 1}. First seen at line ${seenKeys.get(key)}.`);
                } else {
                    seenKeys.set(key, i + 1);
                }
            }
            
            if (openBraces === 0) {
                inLang = false;
            }
        }
    }
});
