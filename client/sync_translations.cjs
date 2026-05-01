const fs = require('fs');
const path = require('path');

const i18nDir = 'd:/projects/farmersapp/client/lib/i18n';
const languages = ['hi', 'te', 'pa', 'ta', 'bn', 'gu', 'kn', 'ml', 'mr'];
const enPath = path.join(i18nDir, 'en.ts');

function parseTsFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const start = content.indexOf('{');
    const end = content.lastIndexOf('}');
    const jsonStr = content.substring(start, end + 1)
        .replace(/(\w+):/g, '"$1":') // quote keys
        .replace(/"\+/g, '"+') // fix string concat if any
        .replace(/,\s*}/g, '}') // fix trailing commas
        .replace(/\/\/.*/g, ''); // remove comments
    
    // This is a naive parser, might fail for complex objects.
    // Better: use a proper parser or just regex matches.
    const matches = content.match(/(\w+):\s*"(.*?)"/g);
    const obj = {};
    if (matches) {
        matches.forEach(m => {
            const [key, val] = m.split(/:\s*"/);
            obj[key.trim()] = val.slice(0, -1);
        });
    }
    return obj;
}

const enData = parseTsFile(enPath);

languages.forEach(lang => {
    const langPath = path.join(i18nDir, `${lang}.ts`);
    if (!fs.existsSync(langPath)) return;
    
    let content = fs.readFileSync(langPath, 'utf8');
    const langData = parseTsFile(langPath);
    
    let added = 0;
    Object.keys(enData).forEach(key => {
        if (!content.includes(`${key}:`)) {
            const entry = `\n    ${key}: "${enData[key]}",`;
            // Insert before the last closing brace
            const lastBrace = content.lastIndexOf('}');
            content = content.substring(0, lastBrace) + entry + content.substring(lastBrace);
            added++;
        }
    });
    
    if (added > 0) {
        fs.writeFileSync(langPath, content);
        console.log(`Updated ${lang}.ts with ${added} missing keys.`);
    }
});
