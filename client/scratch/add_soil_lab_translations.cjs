const fs = require('fs');
const path = require('path');

const languages = ['en', 'hi', 'te', 'ta', 'mr', 'pa', 'ml', 'kn', 'gu', 'bn', 'or'];
const i18nDir = path.join(__dirname, '..', 'lib', 'i18n');

const newKeys = {
  "soilLabTitle": "Soil Lab Locator",
  "soilLabDesc": "Find certified labs, book pickups, and track soil trends.",
  "findLabsNearMe": "Find Labs Near Me",
  "detectingGps": "Detecting GPS...",
  "selectTestPackage": "Select Test Package",
  "doorstepCollection": "Doorstep Collection",
  "homePickup": "Home Pickup",
  "labVisit": "Lab Visit",
  "totalPayable": "Total Payable",
  "confirmAndPay": "Confirm & Pay",
  "diagnosticActive": "Diagnostic Active!",
  "passId": "Laboratory Pass ID",
  "history": "History",
  "nutrientTrends": "Nutrient Trends",
  "advancedPedology": "Advanced Pedology Hub",
  "structuralInsight": "Structural Insight",
  "soilArchitecture": "Soil Architecture",
  "aerationIndex": "Aeration Index"
};

languages.forEach(lang => {
  const filePath = path.join(i18nDir, `${lang}.ts`);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the closing brace of the main object
    const lastBraceIndex = content.lastIndexOf('};');
    if (lastBraceIndex !== -1) {
      let keysString = '';
      for (const [key, value] of Object.entries(newKeys)) {
        if (!content.includes(`"${key}":`)) {
          keysString += `    "${key}": "${value}",\n`;
        }
      }
      
      if (keysString) {
        const newContent = content.slice(0, lastBraceIndex) + keysString + content.slice(lastBraceIndex);
        fs.writeFileSync(filePath, newContent);
        console.log(`Updated ${lang}.ts`);
      }
    }
  }
});
