const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '../client/lib/i18n');
const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
    const filePath = path.join(i18nDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const seenKeys = new Set();
    const newLines = [];
    let removedCount = 0;

    lines.forEach((line) => {
        const match = line.match(/^\s*(\w+):/);
        if (match) {
            const key = match[1];
            if (seenKeys.has(key)) {
                removedCount++;
                return; // Skip this line
            }
            seenKeys.add(key);
        }
        newLines.push(line);
    });

    if (removedCount > 0) {
        console.log(`Removed ${removedCount} duplicate keys from ${file}.`);
        fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    } else {
        console.log(`No duplicates in ${file}.`);
    }
});
