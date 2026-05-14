const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '../lib/i18n');
const languages = ['bn', 'en', 'gu', 'hi', 'kn', 'ml', 'mr', 'pa', 'ta', 'te'];

const enContent = fs.readFileSync(path.join(i18nDir, 'en.ts'), 'utf8');
const enMatch = enContent.match(/export const en = \{([\s\S]*)\};/);
if (!enMatch) {
    console.error('Could not find en object');
    process.exit(1);
}

const enLines = enMatch[1].split('\n').filter(line => line.trim());
const enKeys = {};
enLines.forEach(line => {
    const match = line.match(/^\s*"(.*?)":\s*"(.*?)",?\s*$/);
    if (match) {
        enKeys[match[1]] = match[2];
    }
});

languages.forEach(lang => {
    const filePath = path.join(i18nDir, `${lang}.ts`);
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/export const \w+ = \{([\s\S]*)\};/);
    if (!match) return;

    const lines = match[1].split('\n').filter(line => line.trim());
    const keys = {};
    lines.forEach(line => {
        const m = line.match(/^\s*"(.*?)":\s*"(.*?)",?\s*$/);
        if (m) {
            keys[m[1]] = m[2];
        }
    });

    let newContent = `export const ${lang} = {\n`;
    Object.keys(enKeys).sort().forEach(key => {
        const val = keys[key] || enKeys[key];
        newContent += `    "${key}": "${val.replace(/"/g, '\\"')}",\n`;
    });
    newContent += `};`;

    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${lang}.ts`);
});
