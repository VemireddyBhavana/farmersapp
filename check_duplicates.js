
const fs = require('fs');
const content = fs.readFileSync('d:/Desktop Data/project/farmersapp/client/lib/LanguageContext.tsx', 'utf8');

const languages = ["English", "Hindi", "Telugu", "Tamil", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Bangla"];

languages.forEach(lang => {
    const startIdx = content.indexOf(`${lang}: {`);
    if (startIdx === -1) {
        console.log(`Language ${lang} not found`);
        return;
    }
    
    // Find the end of this language block
    let openBraces = 0;
    let endIdx = -1;
    let started = false;
    for (let i = startIdx + lang.length; i < content.length; i++) {
        if (content[i] === '{') {
            openBraces++;
            started = true;
        }
        if (content[i] === '}') {
            openBraces--;
            if (started && openBraces === 0) {
                endIdx = i;
                break;
            }
        }
    }
    
    if (endIdx === -1) {
        console.log(`End of ${lang} block not found`);
        return;
    }
    
    const block = content.substring(startIdx, endIdx + 1);
    const keys = [];
    const regex = /^\s+([a-zA-Z0-9]+):/gm;
    let match;
    while ((match = regex.exec(block)) !== null) {
        keys.push(match[1]);
    }
    
    const seen = new Set();
    const duplicates = [];
    keys.forEach(key => {
        if (seen.has(key)) {
            duplicates.push(key);
        }
        seen.add(key);
    });
    
    if (duplicates.length > 0) {
        console.log(`Duplicates in ${lang}: ${duplicates.join(', ')}`);
    } else {
        console.log(`No duplicates in ${lang}`);
    }
});
