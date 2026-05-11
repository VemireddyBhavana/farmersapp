const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '../client/lib/i18n');
const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
    console.log(`Checking ${file}...`);
    const content = fs.readFileSync(path.join(i18nDir, file), 'utf8');
    const lines = content.split('\n');
    const keys = new Set();
    const duplicates = [];

    lines.forEach((line, index) => {
        const match = line.match(/^\s*(\w+):/);
        if (match) {
            const key = match[1];
            if (keys.has(key)) {
                duplicates.push({ key, line: index + 1 });
            } else {
                keys.add(key);
            }
        }
    });

    if (duplicates.length > 0) {
        console.log(`Found ${duplicates.length} duplicates in ${file}:`);
        duplicates.forEach(d => console.log(`  Key: "${d.key}" at line ${d.line}`));
    } else {
        console.log(`No duplicates found in ${file}.`);
    }
});
