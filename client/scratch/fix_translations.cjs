const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '../lib/i18n');
const languages = ['bn', 'en', 'gu', 'hi', 'kn', 'ml', 'mr', 'pa', 'ta', 'te'];

function parseFile(content) {
    const match = content.match(/export const \w+ = \{([\s\S]*)\};/);
    if (!match) return {};
    
    const lines = match[1].split('\n');
    const keys = {};
    lines.forEach(line => {
        // Match "key": "value" pattern, handling escaped quotes
        const m = line.match(/^\s*"(.+?)":\s*"(.*)",?\s*$/);
        if (m) {
            let val = m[2];
            // Unescape existing quotes to avoid double escaping
            val = val.replace(/\\"/g, '"');
            keys[m[1]] = val;
        }
    });
    return keys;
}

const enContent = fs.readFileSync(path.join(i18nDir, 'en.ts'), 'utf8');
const enKeys = parseFile(enContent);

languages.forEach(lang => {
    const filePath = path.join(i18nDir, `${lang}.ts`);
    const content = fs.readFileSync(filePath, 'utf8');
    const keys = parseFile(content);

    let newContent = `export const ${lang} = {\n`;
    Object.keys(enKeys).sort().forEach(key => {
        const val = keys[key] || enKeys[key];
        // Re-escape quotes for the output
        newContent += `    "${key}": "${val.replace(/"/g, '\\"')}",\n`;
    });
    newContent += `};`;

    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${lang}.ts`);
});
