const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '../client/lib/i18n');
const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
    console.log(`Checking ${file}...`);
    const content = fs.readFileSync(path.join(i18nDir, file), 'utf8');
    const lines = content.split('\n');
    const keyCounts = {};
    const duplicates = [];

    lines.forEach((line, index) => {
        // Match key: "value" or key: 'value' or key: {
        const match = line.match(/^\s*(\w+):/);
        if (match) {
            const key = match[1];
            keyCounts[key] = (keyCounts[key] || 0) + 1;
            if (keyCounts[key] === 2) {
                duplicates.push(key);
            }
        }
    });

    if (duplicates.length > 0) {
        console.log(`Found duplicates in ${file}: ${duplicates.join(', ')}`);
    } else {
        console.log(`No duplicates in ${file}.`);
    }
});
