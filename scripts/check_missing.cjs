const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '../client/lib/i18n');
const enContent = fs.readFileSync(path.join(i18nDir, 'en.ts'), 'utf8');

const getKeys = (content) => {
    const keys = new Set();
    const lines = content.split('\n');
    lines.forEach(line => {
        const match = line.match(/^\s*(\w+):/);
        if (match) keys.add(match[1]);
    });
    return keys;
};

const enKeys = getKeys(enContent);
const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.ts') && f !== 'en.ts');

files.forEach(file => {
    const content = fs.readFileSync(path.join(i18nDir, file), 'utf8');
    const keys = getKeys(content);
    const missing = [...enKeys].filter(k => !keys.has(k));

    if (missing.length > 0) {
        console.log(`${file} is missing ${missing.length} keys: ${missing.join(', ')}`);
    } else {
        console.log(`${file} has all keys from en.ts.`);
    }
});
