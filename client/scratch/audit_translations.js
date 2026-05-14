const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, 'client/lib/i18n');
const enPath = path.join(i18nDir, 'en.ts');

const getKeys = (content) => {
    const keys = [];
    const lines = content.split('\n');
    lines.forEach(line => {
        const match = line.match(/^\s+["']?([a-zA-Z0-9_-]+)["']?:\s+/);
        if (match) {
            keys.push(match[1]);
        }
    });
    return keys;
};

const enContent = fs.readFileSync(enPath, 'utf8');
const enKeys = getKeys(enContent);

const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.ts') && f !== 'en.ts');

files.forEach(file => {
    const filePath = path.join(i18nDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const keys = getKeys(content);
    const missing = enKeys.filter(k => !keys.includes(k));
    if (missing.length > 0) {
        console.log(`File ${file} is missing ${missing.length} keys:`, missing.slice(0, 10).join(', ') + (missing.length > 10 ? '...' : ''));
    } else {
        console.log(`File ${file} is up to date.`);
    }
});
