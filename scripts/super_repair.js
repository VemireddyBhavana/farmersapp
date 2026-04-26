import fs from 'fs';
import path from 'path';

const i18nDir = 'd:/farmersapp/client/lib/i18n';
const masterFile = path.join(i18nDir, 'en.ts');
const targets = ['kn.ts', 'ml.ts', 'te.ts', 'hi.ts', 'ta.ts'];

// 1. Extract ALL keys and values from en.ts safely
const masterContent = fs.readFileSync(masterFile, 'utf8');
const masterMap = new Map();
// Look for key: "value", or key: 'value', or key: `value`,
const lineRegex = /^\s*(\w+):\s*(".*"|'.*'|`.*`),?/gm;
let m;
while ((m = lineRegex.exec(masterContent)) !== null) {
    masterMap.set(m[1], m[2]);
}

console.log(`Master Map loaded with ${masterMap.size} keys.`);

// 2. Scan and repair all target files
targets.forEach(target => {
    const targetPath = path.join(i18nDir, target);
    if (!fs.existsSync(targetPath)) return;

    let targetLines = fs.readFileSync(targetPath, 'utf8').split('\n');
    let fixedCount = 0;

    const repairedLines = targetLines.map(line => {
        // Detect broken lines: key: "something', or key: "something'
        const brokenMatch = line.match(/^\s*(\w+):\s*"([^"]*?)',?\s*$/);
        if (brokenMatch) {
            const key = brokenMatch[1];
            if (masterMap.has(key)) {
                fixedCount++;
                // Indentation is usually 4 spaces
                return `    ${key}: ${masterMap.get(key)},`;
            }
        }
        return line;
    });

    if (fixedCount > 0) {
        fs.writeFileSync(targetPath, repairedLines.join('\n'), 'utf8');
        console.log(`✅ Fixed ${fixedCount} broken lines in ${target}`);
    } else {
        console.log(`👍 ${target} looks clean.`);
    }
});
