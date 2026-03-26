import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const i18nDir = path.join(__dirname, '../client/lib/i18n');

const newKeys = {
    instructionsTitle: "Instructions",
    materialsRequiredTitle: "Materials Required",
    realWorldExampleTitle: "Real-world Example",
    milkProductionTitle: "Modern Milk Production Guide",
    dairyFarmSetupTitle: "Dairy Farm Setup Guide",
    broilerFarmingTitle: "Commercial Broiler Farming Guide",
    goatFarmingTitle: "Commercial Goat Farming",
    sheepFarmingTitle: "Commercial Sheep Farming",
    fishFarmingTitle: "Inland Fish Farming",
    cat_dairy: "Dairy"
};

const langs = ['hi', 'te', 'ta', 'mr', 'gu', 'kn', 'ml', 'pa', 'bn'];

langs.forEach(lang => {
    const filePath = path.join(i18nDir, `${lang}.ts`);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove trailing };
        const closingIndex = content.lastIndexOf('};');
        if (closingIndex !== -1) {
            let toAppend = `\n    // Deep Learning Module Extensions (Fallback English)\n`;
            for (const [key, value] of Object.entries(newKeys)) {
                if (!content.includes(`${key}:`)) {
                    toAppend += `    ${key}: "${value}",\n`;
                }
            }
            toAppend += `};\n`;
            
            const newContent = content.substring(0, closingIndex) + toAppend;
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Injected keys into ${lang}.ts`);
        }
    }
});
console.log('Injection complete.');
