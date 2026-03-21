const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'client/lib/i18n');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

const newKeys = `
    // New Agri Intel Features
    soilLabTitle: "Soil Lab Locator",
    soilLabDesc: "Find nearby certified soil testing labs and get AI recommendations.",
    loanCalcTitle: "Agri-Loan Calculator",
    loanCalcDesc: "Calculate EMIs for equipment and find the best insurance schemes.",
`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/};\s*$/, newKeys + '};\n');
    fs.writeFileSync(filePath, content);
});
console.log("Translations added to " + files.length + " files.");
