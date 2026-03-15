import os
import re

file_path = r"d:\Desktop Data\project\farmersapp\client\lib\LanguageContext.tsx"

new_keys = {
    "smartFarmingTools": "Smart Farming Tools",
    "aiCropDoctor": "AI Crop Doctor",
    "aiCropDoctorDesc": "Detect plant diseases and get health recommendations.",
    "smartCropRecommendation": "Crop Recommendation",
    "smartCropRecommendationDesc": "AI-based suggestions for the best crops for your soil.",
    "farmProfitCalculator": "Profit Calculator",
    "farmProfitCalculatorDesc": "Calculate your farming costs and expected profits.",
    "smartIrrigationCalculator": "Irrigation Calculator",
    "smartIrrigationCalculatorDesc": "Calculate precise water requirements for your crops.",
    "fertilizerRequirement": "Fertilizer Recommendation",
    "fertilizerRequirementDesc": "Get precise fertilizer advice for your crop and soil.",
    "uploadLeaf": "Upload Leaf Image",
    "detectDisease": "Detect Disease",
    "soilType": "Soil Type",
    "selectSoil": "Select Soil Type",
    "blackSoil": "Black Soil",
    "redSoil": "Red Soil",
    "sandySoil": "Sandy Soil",
    "loamySoil": "Loamy Soil",
    "cropType": "Crop Type",
    "season": "Season",
    "selectSeason": "Select Season",
    "kharif": "Kharif",
    "rabi": "Rabi",
    "zaid": "Zaid",
    "farmArea": "Farm Area (Acres)",
    "seedCost": "Seed Cost",
    "fertilizerCost": "Fertilizer Cost",
    "labourCost": "Labour Cost",
    "totalCost": "Total Cost",
    "expectedYield": "Expected Yield (Quintals)",
    "marketPrice": "Market Price (per Quintal)",
    "grossRevenue": "Gross Revenue",
    "netProfit": "Net Profit",
    "results": "Results",
    "recommendedCrops": "Recommended Crops",
    "waterRequirement": "Water Requirement (Liters/Day)",
    "frequency": "Irrigation Frequency",
    "fertilizerAdvice": "Fertilizer Advice"
}

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# List of languages in the file
languages = ["Telugu", "Tamil", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Bangla"]

for lang in languages:
    # Find the language object start
    # Example: Telugu: {
    pattern = rf'{lang}:\s*\{{'
    match = re.search(pattern, content)
    if match:
        # Find the first key inside it and insert before it or after it
        # Let's insert after the matching brace
        start_pos = match.end()
        # Find the next key entry
        key_pattern = r'\s*(\w+):'
        next_key_match = re.search(key_pattern, content[start_pos:])
        if next_key_match:
            insert_pos = start_pos
            keys_to_add = ""
            for key, value in new_keys.items():
                if f'{key}:' not in content[start_pos:start_pos+2000]: # Check if already present in this section
                    keys_to_add += f'    {key}: "{value}",\n'
            
            if keys_to_add:
                content = content[:insert_pos] + "\n" + keys_to_add + content[insert_pos:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Placeholder translations added to all languages.")
