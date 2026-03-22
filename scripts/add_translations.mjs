import fs from 'fs';
import path from 'path';

const dir = './client/lib/i18n';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

const newKeys = `
    // New Agri Intel Features
    soilLabTitle: "Soil Lab Locator",
    soilLabDesc: "Find nearby certified soil testing labs and get AI recommendations.",
    loanCalcTitle: "Agri-Loan Calculator",
    loanCalcDesc: "Calculate EMIs for equipment and find the best insurance schemes.",
`;

const hiKeys = `
    // New Agri Intel Features
    soilLabTitle: "मृदा परीक्षण लैब लोकेटर",
    soilLabDesc: "आस-पास की प्रमाणित मृदा परीक्षण प्रयोगशालाओं का पता लगाएं और AI फसल अनुशंसाएं प्राप्त करें।",
    loanCalcTitle: "कृषि-ऋण कैलकुलेटर",
    loanCalcDesc: "उपकरणों के लिए EMI की गणना करें और सर्वोत्तम फसल बीमा योजनाओं का पता लगाएं।",
`;

const teKeys = `
    // New Agri Intel Features
    soilLabTitle: "సాయిల్ ల్యాబ్ లొకేటర్",
    soilLabDesc: "సమీపంలోని సర్టిఫైడ్ నేల పరీక్ష కేంద్రాలను కనుగొనండి మరియు AI పంట సిఫార్సులను పొందండి.",
    loanCalcTitle: "వ్యవసాయ రుణ కాలిక్యులేటర్",
    loanCalcDesc: "పరికరం కోసం EMIలను లెక్కించండి మరియు ఉత్తమ పంట బీమా పథకాలను కనుగొనండి.",
`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if(content.includes('soilLabTitle')) return;

    let keysToAdd = newKeys;
    if (file === 'hi.ts') keysToAdd = hiKeys;
    if (file === 'te.ts') keysToAdd = teKeys;

    content = content.replace(/};\s*$/, keysToAdd + '};\n');
    fs.writeFileSync(filePath, content);
});
console.log("SUCCESS");
