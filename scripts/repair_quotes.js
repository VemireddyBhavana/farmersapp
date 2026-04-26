import fs from 'fs';
import path from 'path';

const i18nDir = 'd:/farmersapp/client/lib/i18n';
const masterFile = path.join(i18nDir, 'en.ts');
const targets = ['kn.ts', 'ml.ts', 'te.ts', 'hi.ts', 'ta.ts'];

// Load master keys
const masterContent = fs.readFileSync(masterFile, 'utf8');
const masterData = {};
const lines = masterContent.split('\n');
lines.forEach(line => {
    const match = line.match(/^\s*(\w+):\s*(["'\`][\s\S]*?["'\`]),?/);
    if (match) {
        masterData[match[1]] = match[2];
    }
});

console.log(`Loaded ${Object.keys(masterData).length} master keys.`);

targets.forEach(target => {
    const targetPath = path.join(i18nDir, target);
    if (!fs.existsSync(targetPath)) return;

    let content = fs.readFileSync(targetPath, 'utf8');
    let fixedCount = 0;

    // Pattern: key: "Start of sentence', 
    // (Starts with double quote, contains no double quote, ends with single quote and comma)
    const brokenPattern = /^\s*(\w+):\s*"([^"]*?)',/gm;
    
    content = content.replace(brokenPattern, (match, key, partial) => {
        if (masterData[key]) {
            fixedCount++;
            return `    ${key}: ${masterData[key]},`;
        }
        return match;
    });

    if (fixedCount > 0) {
        fs.writeFileSync(targetPath, content, 'utf8');
        console.log(`✅ Fixed ${fixedCount} broken strings in ${target}`);
    } else {
        console.log(`👍 No broken strings found in ${target}`);
    }
});
