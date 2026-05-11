const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '../client/lib/i18n');
const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.ts') && f !== 'en.ts');

const isEnglish = (text) => {
    // Basic check: if it only contains ASCII characters (0-127), it's likely English or untranslated.
    // We exclude keys that are meant to be English (like brand names) if possible, but for now let's be broad.
    return /^[\x00-\x7F]*$/.test(text);
};

files.forEach(file => {
    const content = fs.readFileSync(path.join(i18nDir, file), 'utf8');
    const lines = content.split('\n');
    const englishValues = [];

    lines.forEach((line, index) => {
        const match = line.match(/^\s*(\w+):\s*"(.*)",?\s*$/);
        if (match) {
            const key = match[1];
            const value = match[2];
            if (value && isEnglish(value) && value.length > 3) { // Ignore very short things like "ID", "KCC"
                englishValues.push({ key, value, line: index + 1 });
            }
        }
    });

    if (englishValues.length > 0) {
        console.log(`${file} has ${englishValues.length} potentially untranslated (English) values.`);
        // console.log(`Example from ${file}: ${englishValues[0].key}: ${englishValues[0].value}`);
    }
});
