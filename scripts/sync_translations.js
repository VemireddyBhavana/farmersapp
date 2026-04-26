import fs from 'fs';
import path from 'path';

const i18nDir = 'd:/farmersapp/client/lib/i18n';
const masterFile = path.join(i18nDir, 'en.ts');
const targets = ['kn.ts', 'ml.ts', 'te.ts', 'hi.ts', 'ta.ts'];

const parseTSFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/export const \w+ = \{([\s\S]*)\};/);
    if (!match) return {};
    
    const lines = match[1].split('\n');
    const keys = {};
    lines.forEach(line => {
        const keyMatch = line.match(/^\s*(\w+):/);
        if (keyMatch) keys[keyMatch[1]] = true;
    });
    return keys;
};

const masterKeys = parseTSFile(masterFile);
console.log(`Master (en.ts) has ${Object.keys(masterKeys).length} keys.`);

targets.forEach(target => {
    const targetPath = path.join(i18nDir, target);
    if (!fs.existsSync(targetPath)) return;

    const targetKeys = parseTSFile(targetPath);
    const missing = Object.keys(masterKeys).filter(k => !targetKeys[k]);

    if (missing.length > 0) {
        console.log(`${target} is missing ${missing.length} keys.`);
        
        let content = fs.readFileSync(targetPath, 'utf8');
        const closingIndex = content.lastIndexOf('};');
        
        if (closingIndex !== -1) {
            let toAppend = `\n    // --- AUTO-SYNCED MISSING KEYS FROM EN.TS ---\n`;
            missing.forEach(key => {
                // Get the value from en.ts (rough parsing)
                const masterContent = fs.readFileSync(masterFile, 'utf8');
                const valueMatch = masterContent.match(new RegExp(`^\\s*${key}:\\s*(["'\`][\\s\\S]*?["'\`]),?`, 'm'));
                const value = valueMatch ? valueMatch[1] : '"FIXME"';
                toAppend += `    ${key}: ${value},\n`;
            });
            
            const newContent = content.substring(0, closingIndex) + toAppend + '};';
            fs.writeFileSync(targetPath, newContent, 'utf8');
            console.log(`✅ Fixed ${target}`);
        }
    } else {
        console.log(`✅ ${target} is already synced.`);
    }
});
