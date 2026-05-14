const fs = require('fs');
const path = require('path');

const languages = ['en', 'hi', 'te', 'ta', 'mr', 'gu', 'kn', 'ml', 'pa', 'bn'];

languages.forEach(lang => {
    const filePath = path.join('d:', 'projects', 'farmersapp', 'client', 'lib', 'i18n', `${lang}.ts`);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix missing comma between the old last object and the new injected keys
    // This happens when the file ended with a nested object like eventide: "..." }
    const pattern = /\}\s+weatherRadarTitle:/g;
    if (pattern.test(content)) {
        content = content.replace(/\}\s+weatherRadarTitle:/g, (match) => {
            return match.replace('}', '},');
        });
        fs.writeFileSync(filePath, content);
        console.log(`Fixed syntax in ${lang}.ts`);
    } else {
        console.log(`${lang}.ts syntax looks okay or already fixed.`);
    }
});
