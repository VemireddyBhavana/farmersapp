const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, 'lib', 'i18n');
const languageFiles = ['en.ts', 'hi.ts', 'te.ts', 'ta.ts', 'pa.ts', 'mr.ts', 'ml.ts', 'kn.ts', 'gu.ts', 'bn.ts'];

const keysToInject = `
    // Smart Assistant Features
    proTipsTitle: "Pro Tips",
    commonMistakesTitle: "Common Mistakes",
    bestPracticesTitle: "Best Practices",
    watchDemoTitle: "Watch Demo",
    estimatedCostTitle: "Estimated Cost",
    expectedProfitTitle: "Expected Profit",
    timeDurationTitle: "Time Duration",
    requiredResourcesTitle: "Required Resources",
    farmerTipsTitle: "Farmer Tips",
    dosTitle: "Do's",
    dontsTitle: "Don'ts",
    saveGuideBtn: "Save Guide",
    savedGuideBtn: "Saved",
    difficultyBeginner: "Beginner",
    difficultyIntermediate: "Intermediate",
    difficultyExpert: "Expert",
    profitCalculatorTitle: "Profit Calculator",
    eggProfitCalculatorTitle: "Egg Profit Calculator",
    shrimpGrowthEstimatorTitle: "Shrimp Growth Estimator",
    feedPerBird: "Feed per Bird (kg)",
    numberOfBirds: "Number of Birds",
    milkYield: "Milk Yield (L)",
    fishCount: "Fish Count",
    feedRate: "Feed Rate (%)",
    daysGrowth: "Days",
    calculateBtn: "Calculate",
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
