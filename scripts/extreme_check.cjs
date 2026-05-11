const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '../client/lib/i18n');
const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
    console.log(`Checking ${file}...`);
    const content = fs.readFileSync(path.join(i18nDir, file), 'utf8');
    
    // Find everything between { and };
    const startIdx = content.indexOf('{');
    const endIdx = content.lastIndexOf('}');
    const objStr = content.substring(startIdx, endIdx + 1);

    // This is a bit hacky but let's try to extract keys using a regex that handles various spacings
    const keys = [];
    const keyRegex = /(\w+):(?!\/\/)/g; // Matches key: but not URLs
    let match;
    while ((match = keyRegex.exec(objStr)) !== null) {
        keys.push(match[1]);
    }

    const keyCounts = {};
    const duplicates = [];
    keys.forEach(k => {
        keyCounts[k] = (keyCounts[k] || 0) + 1;
        if (keyCounts[k] === 2) duplicates.push(k);
    });

    if (duplicates.length > 0) {
        console.log(`Found duplicates in ${file}: ${duplicates.join(', ')}`);
    } else {
        console.log(`No duplicates in ${file}.`);
    }
});
