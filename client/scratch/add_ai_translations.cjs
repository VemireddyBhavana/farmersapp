const fs = require('fs');
const path = require('path');

const languages = ['en', 'hi', 'te', 'ta', 'mr', 'pa', 'ml', 'kn', 'gu', 'bn', 'or'];
const i18nDir = path.join(__dirname, '..', 'lib', 'i18n');

const newKeys = {
  "scanPlantLeaf": "Scan Plant Leaf",
  "diseaseDetectionDesc": "Upload a leaf image to analyze",
  "analyzingSpecimen": "Analyzing Specimen...",
  "diagnosticResult": "Diagnostic Result",
  "infectionDetected": "Infection Detected",
  "healthySpecimen": "Healthy Specimen",
  "cureProcess": "Cure Process",
  "preventionTips": "Prevention Tips",
  "diagnoseNewSample": "Diagnose New Sample",
  "advancedPedologySystem": "Advanced Pedology & Soil Intelligence",
  "calculateSoilHealth": "Calculate Soil Health"
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
