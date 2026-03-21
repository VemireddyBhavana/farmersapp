const fs = require('fs');
const content = fs.readFileSync('client/lib/i18n/en.ts', 'utf8');
const linesArr = content.split('\n');
const keys = {};
linesArr.forEach((line, index) => {
    const match = line.match(/^\s*([^:\s/]+)\s*:/);
    if (match) {
        const key = match[1];
        if (keys[key]) {
            console.log(`Duplicate key: ${key} at lines ${keys[key]} and ${index + 1}`);
        } else {
            keys[key] = index + 1;
        }
    }
});
