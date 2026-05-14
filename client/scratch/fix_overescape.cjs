const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '../lib/i18n');
const languages = ['bn', 'en', 'gu', 'hi', 'kn', 'ml', 'mr', 'pa', 'ta', 'te'];

languages.forEach(lang => {
    const filePath = path.join(i18nDir, `${lang}.ts`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix over-escaped quotes: \\\\" -> \"
    // My previous script turned \" into \\\" (because it replaced " with \")
    // Wait, let's see. If original was \" and I replaced " with \", it became \\\"
    // If it was \\\" and I replaced " with \", it became \\\\\"
    
    // Let's just normalize: remove all backslashes before quotes and then add one.
    // Or better: replace any sequence of backslashes before a quote with a single one.
    content = content.replace(/\\+"/g, '\\"');
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${lang}.ts`);
});
