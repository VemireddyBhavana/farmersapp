import fs from 'fs';
import path from 'path';

const i18nDir = 'd:/farmersapp/client/lib/i18n';
const targets = ['kn.ts', 'te.ts', 'hi.ts', 'ta.ts', 'ml.ts'];

targets.forEach(target => {
    const targetPath = path.join(i18nDir, target);
    if (!fs.existsSync(targetPath)) return;

    let content = fs.readFileSync(targetPath, 'utf8');
    
    // Fix mangoStep8Tip
    content = content.replace(/mangoStep8Tip: "Thinning ensures the tree doesn',/g, 
        'mangoStep8Tip: "Thinning ensures the tree doesn\'t waste energy on small fruits.",');
    
    // Fix mangoStep9Bullet2
    content = content.replace(/mangoStep9Bullet2: "Check for ',/g, 
        'mangoStep9Bullet2: "Check for \'shoulder\' color transition",');

    // Fix redRot (I saw this one earlier too)
    content = content.replace(/redRot is ',/g, 
        'redRot: "Red Rot is a fungal disease causing red lesions on the stalk.",');

    // Fix other common ones
    content = content.replace(/satelliteAnalysisDesc: "Monitor your farm',/g,
        'satelliteAnalysisDesc: "Monitor your farm\'s health from space with NDVI vegetation indexing.",');

    fs.writeFileSync(targetPath, content, 'utf8');
    console.log(`✅ Fixed mango keys in ${target}`);
});
