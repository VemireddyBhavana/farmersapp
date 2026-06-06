import fs from 'fs';
import path from 'path';

const i18nDir = 'client/lib/i18n';
const files = ['bn.ts', 'en.ts', 'gu.ts', 'hi.ts', 'kn.ts', 'ml.ts', 'mr.ts', 'pa.ts', 'ta.ts', 'te.ts'];

files.forEach((file) => {
    const filePath = path.join(i18nDir, file);
    if (!fs.existsSync(filePath)) {
        console.log(`File ${file} does not exist, skipping.`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Perform rebranding replacements
    const replacements = [
        { search: /Kisan AI/g, replace: 'AgroNex' },
        { search: /Kisan Saathi/g, replace: 'AgroNex Saathi' },
        { search: /Farmers App/g, replace: 'AgroNex' },
        { search: /KISAN AI/g, replace: 'AGRONEX' },
        { search: /kisan AI/g, replace: 'AgroNex' },
        { search: /Kisan ai/g, replace: 'AgroNex' },
        { search: /kisan ai/g, replace: 'agronex' },
        { search: /AgriAI/g, replace: 'AgroNex' },
        { search: /Agri AI/g, replace: 'AgroNex' },
        { search: /agriai/g, replace: 'agronex' },
        { search: /agri ai/g, replace: 'agronex' },
        { search: /Agri Assistant/g, replace: 'AgroNex Assistant' }
    ];
    
    let original = content;
    replacements.forEach(({ search, replace }) => {
        content = content.replace(search, replace);
    });
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Successfully rebranded ${file}`);
    } else {
        console.log(`No changes needed in ${file}`);
    }
});

console.log('Rebranding translation files completed.');
