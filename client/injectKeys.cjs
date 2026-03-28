const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, 'lib', 'i18n');
const languageFiles = ['hi.ts', 'te.ts', 'ta.ts', 'pa.ts', 'mr.ts', 'ml.ts', 'kn.ts', 'gu.ts', 'bn.ts'];

const keysToInject = `
    // Deep Learning Module Extensions
    detailedExplanationTitle: "Detailed Expert Explanation",
    instructionsTitle: "Instructions",
    materialsRequiredTitle: "Materials Required",
    realWorldExampleTitle: "Real-world Example",
    milkProductionTitle: "Milk Production Guide",
    dairyFarmSetupTitle: "Dairy Farm Setup Guide",
    broilerFarmingTitle: "Broiler Chicken Farming Guide",
    eggProductionTitle: "Egg Production (Layer Farming) Guide",
    goatFarmingTitle: "Goat Farming Guide",
    sheepFarmingTitle: "Sheep Farming Guide",
    fishFarmingTitle: "Inland Fish Farming Guide",
    shrimpFarmingTitle: "Vannamei Shrimp Farming Guide",
    cat_poultry: "Poultry",
    cat_dairy: "Dairy",
    cat_subsidies: "Subsidies",
    cat_gardening: "Gardening",
`;

languageFiles.forEach(file => {
  const filePath = path.join(i18nDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace the last }; with the keys + };
    if (content.endsWith('};\n')) {
        content = content.replace(/};\n$/, keysToInject + '};\n');
    } else if (content.endsWith('};')) {
        content = content.replace(/};$/, keysToInject + '\n};');
    } else {
        // Find last index of }
        const lastBraceIndex = content.lastIndexOf('}');
        if (lastBraceIndex !== -1) {
            content = content.slice(0, lastBraceIndex) + keysToInject + content.slice(lastBraceIndex);
        }
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Injected keys into ' + file);
  } else {
    console.log('File not found: ' + file);
  }
});
