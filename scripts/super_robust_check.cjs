const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '../client/lib/i18n');
const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
    console.log(`Checking ${file}...`);
    const content = fs.readFileSync(path.join(i18nDir, file), 'utf8');
    
    // Remove all string content to avoid matching colons inside quotes
    const contentWithoutStrings = content.replace(/"[^"\\]*(?:\\.[^"\\]*)*"/g, '""').replace(/'[^'\\]*(?:\\.[^'\\]*)*'/g, "''");
    
    const keys = [];
    const keyRegex = /(\w+):/g;
    let match;
    while ((match = keyRegex.exec(contentWithoutStrings)) !== null) {
        keys.push(match[1]);
    }

    const keyCounts = {};
    const duplicates = [];
    keys.forEach(k => {
        keyCounts[k] = (keyCounts[k] || 0) + 1;
        if (keyCounts[k] === 2) duplicates.push(k);
    });

    if (duplicates.length > 0) {
        console.log(`Found REAL duplicates in ${file}: ${duplicates.join(', ')}`);
    } else {
        console.log(`No duplicates in ${file}.`);
    }
});
