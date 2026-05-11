const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '../client/lib/i18n');
const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
    const content = fs.readFileSync(path.join(i18nDir, file), 'utf8');
    const lines = content.split('\n');
    const keys = [];
    lines.forEach(line => {
        const m = line.match(/^\s*(\w+):/);
        if (m) keys.push(m[1]);
    });
    
    const counts = {};
    keys.forEach(k => counts[k] = (counts[k] || 0) + 1);
    const dups = Object.keys(counts).filter(k => counts[k] > 1);
    
    if (dups.length > 0) {
        console.log(`${file}: ${dups.join(', ')}`);
    } else {
        console.log(`${file}: No duplicates`);
    }
});
