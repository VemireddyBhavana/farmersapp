const fs = require('fs');
const path = require('path');

const languages = ['en', 'hi', 'te', 'ta', 'mr', 'pa', 'ml', 'kn', 'gu', 'bn', 'or'];
const i18nDir = path.join(__dirname, '..', 'lib', 'i18n');

const newKeys = {
  "checkCropHealth": "Check Crop Health",
  "aiCropDoctor": "AI Crop Doctor",
  "analyzeCropHealthTagline": "Instant diagnosis for your crops and farm",
  "readyToBegin": "Ready to Begin?",
  "selectModeToStart": "Select a mode above to start scanning",
  "singleLeafDiagnosis": "Single Leaf Diagnosis",
  "wholeFarmScan": "Whole Farm Scan",
  "scanFarmAreaOption": "Scan Farm Area",
  "startAiDiagnosis": "Start AI Diagnosis"
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
