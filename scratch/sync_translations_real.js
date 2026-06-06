import fs from 'fs';
import path from 'path';

const i18nDir = 'client/lib/i18n';
const masterFile = path.join(i18nDir, 'en.ts');
const targets = ['hi.ts', 'te.ts', 'ta.ts', 'mr.ts', 'gu.ts', 'kn.ts', 'ml.ts', 'pa.ts', 'bn.ts'];

const parseTSFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/export const \w+ = \{([\s\S]*)\};/);
    if (!match) return {};
    
    const lines = match[1].split('\n');
    const keys = {};
    lines.forEach(line => {
        const keyMatch = line.match(/^\s*(?:"([^"]+)"|([a-zA-Z0-9_]+))\s*:/);
        if (keyMatch) {
            const key = keyMatch[1] || keyMatch[2];
            keys[key] = true;
        }
    });
    return keys;
};

// Parse master file keys and their actual lines to extract correct values
const masterContent = fs.readFileSync(masterFile, 'utf8');
const masterKeys = parseTSFile(masterFile);
console.log(`Master (en.ts) has ${Object.keys(masterKeys).length} keys.`);

// A helper to extract the exact value line from en.ts
const getMasterValue = (key) => {
    // Look for exact key match with or without quotes
    const regex = new RegExp(`^\\s*(?:"${key}"|${key})\\s*:\\s*(["'\`][\\s\\S]*?["'\`]),?\\s*$`, 'm');
    const match = masterContent.match(regex);
    if (match) {
        return match[1];
    }
    return null;
};

targets.forEach(target => {
    const targetPath = path.join(i18nDir, target);
    if (!fs.existsSync(targetPath)) {
        console.error(`Target not found: ${targetPath}`);
        return;
    }

    const targetKeys = parseTSFile(targetPath);
    const missing = Object.keys(masterKeys).filter(k => !targetKeys[k]);

    if (missing.length > 0) {
        console.log(`${target} is missing ${missing.length} keys. Syncing...`);
        
        let content = fs.readFileSync(targetPath, 'utf8');
        const closingIndex = content.lastIndexOf('};');
        
        if (closingIndex !== -1) {
            let toAppend = `\n    // --- AUTO-SYNCED MISSING KEYS FROM EN.TS ---\n`;
            missing.forEach(key => {
                const val = getMasterValue(key);
                if (val !== null) {
                    toAppend += `    "${key}": ${val},\n`;
                } else {
                    console.warn(`Could not find value for key: ${key} in en.ts`);
                    toAppend += `    "${key}": "FIXME",\n`;
                }
            });
            
            // If the last character before closing brace is not a newline, add one
            const beforeBrace = content.substring(0, closingIndex);
            const endsWithNewLine = beforeBrace.endsWith('\n');
            const spacer = endsWithNewLine ? '' : '\n';
            
            const newContent = beforeBrace + spacer + toAppend + '};';
            fs.writeFileSync(targetPath, newContent, 'utf8');
            console.log(`✅ Synced missing keys into ${target}`);
        }
    } else {
        console.log(`✅ ${target} is already fully synced.`);
    }
});
