import fs from 'fs';

const filePath = "d:\\Desktop Data\\project\\farmersapp\\client\\pages\\AgriKnowledge.tsx";

const newCropConfigs = `    const cropConfigs: Record<string, { cost: number; yield: number; price: number; breakdown: string[]; titleKey: string }> = {
        aloe:   { cost: 40000, yield: 15, price: 12000, titleKey: "aloeVeraTitle", breakdown: ["Seedlings: ₹8,000", "Irrigation: ₹12,000", "Fertilizers: ₹10,000", "Labor: ₹10,000"] },
        rice:   { cost: 25000, yield: 20, price: 2400,  titleKey: "riceTitle",      breakdown: ["Seeds: ₹3,000", "Water: ₹8,000", "Labor: ₹10,000", "Pesticides: ₹4,000"] },
        cotton: { cost: 35000, yield: 12, price: 6800,  titleKey: "cottonTitle",    breakdown: ["BT Seeds: ₹12,000", "Harvesting: ₹8,000", "Fertilizer: ₹9,000", "Sprays: ₹6,000"] },
        tomato: { cost: 60000, yield: 250, price: 1500, titleKey: "tomatoTitle",    breakdown: ["Nursery: ₹15,000", "Poles/Support: ₹20,000", "Labor: ₹15,000", "Chemicals: ₹10,000"] },
        wheat:  { cost: 22000, yield: 18, price: 2300,  titleKey: "wheat",          breakdown: ["Seeds: ₹4,000", "Tractor: ₹6,000", "Urea/DAP: ₹8,000", "Threshing: ₹4,000"] },
        mustard: { cost: 18000, yield: 12, price: 5450, titleKey: "mustard",        breakdown: ["Seeds: ₹2,000", "Oil Seeds: ₹4,000", "Fertilizer: ₹8,000", "Harvest: ₹4,000"] }
    };`;

const newButton = `                                    <button
                                        key={id}
                                        onClick={() => setSelectedCrop(id)}
                                        className={cn(
                                            "p-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all",
                                            selectedCrop === id 
                                                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20 scale-[1.02]" 
                                                : "bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-100"
                                        )}
                                    >
                                        {t(cropConfigs[id].titleKey)}
                                    </button>`;

try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace cropConfigs
    const configMatch = content.match(/const cropConfigs: Record<string, \{ cost: number; yield: number; price: number; breakdown: string\[\] \}> = \{[\s\S]*? \};/);
    if (configMatch) {
        content = content.replace(configMatch[0], newCropConfigs);
    } else {
        // Fallback for the one I partially modified
        const partialMatch = content.match(/const cropConfigs: Record<string, \{ cost: number; yield: number; price: number; breakdown: string\[\] \}> = \{[\s\S]*?aloeVeraTitle[\s\S]*? \};/);
         if (partialMatch) {
            content = content.replace(partialMatch[0], newCropConfigs);
         }
    }

    // Replace button label logic
    const buttonRegex = /<button[\s\S]*?key=\{id\}[\s\S]*?onClick=\{\(\) => setSelectedCrop\(id\)\}[\s\S]*?>[\s\S]*?\{t\(\`\$\{id\}Title\`\) \|\| id\.charAt\(0\)\.toUpperCase\(\) \+ id\.slice\(1\)\}[\s\S]*?<\/button>/;
    if (content.match(buttonRegex)) {
        content = content.replace(buttonRegex, newButton);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully updated cropConfigs and button label.");
} catch (err) {
    console.error(err);
    process.exit(1);
}
