import re
import json

file_path = r'd:\Desktop Data\project\farmersapp\client\lib\LanguageContext.tsx'
languages = ["English", "Hindi", "Telugu", "Tamil", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Bangla"]

keys_to_audit = [
    "smartFarmingTools", "aiCropDoctor", "aiCropDoctorDesc", "smartCropRecommendation", 
    "smartCropRecommendationDesc", "farmProfitCalculator", "farmProfitCalculatorDesc", 
    "smartIrrigationCalculator", "smartIrrigationCalculatorDesc", "fertilizerRequirement", 
    "fertilizerRequirementDesc", "farmDetails", "enterFarmData", "district", "selectDistrict", 
    "soilType", "selectSoil", "season", "selectSeason", "kharif", "rabi", "zaid", 
    "calculate", "waitingForDetails", "fillFormDesc", "recommendedCrops", "crop", 
    "yieldGrowth", "suitability", "productionCosts", "costInputDesc", "farmArea", 
    "seedCost", "fertilizerCost", "labourCost", "expectedReturns", "expectedYield", 
    "readyToCalculate", "calcInstruction", "netProfit", "needFunding", "loanAdvisoryDesc", 
    "irrigationParameters", "cropType", "selectCrop", "waterRequirement", "frequency", 
    "fertilizerAdvice", "botWelcome", "botOffer", "botGuidanceReply", "botRentReply", 
    "botSchemeReply", "botCropReply", "botPestReply", "botMarketReply", "botFallback", 
    "aiAssistantTitle", "aiAssistantOnline", "chatPlaceholder", "aiFarmingChat", "expertAdvice",
    "recentHistory", "assistantStatus", "responses", "instant", "availability", "online247",
    "languageLabel", "multiModal", "agriAssistant", "onlineStatus", "askMeAnything"
]

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

results = {}

for i, lang in enumerate(languages):
    results[lang] = {"missing": [], "untranslated": []}
    
    # Find start of block
    start_pattern = rf'{lang}:\s*\{{'
    match = re.search(start_pattern, content)
    if not match:
        results[lang]["missing"].append("BLOCK MISSING")
        continue
        
    start_idx = match.start()
    
    # Find end of block (assuming it ends before the next language or at the end of translations object)
    if i < len(languages) - 1:
        next_lang = languages[i+1]
        end_idx = content.find(f'{next_lang}:', start_idx)
    else:
        end_idx = content.find('};', start_idx)
        
    if end_idx == -1:
        end_idx = len(content)
        
    block = content[start_idx:end_idx]
    
    for key in keys_to_audit:
        if f'{key}:' not in block:
            results[lang]["missing"].append(key)
        else:
            # Found key, check if value is English
            val_match = re.search(rf'{key}:\s*"(.*?)",?', block)
            if val_match:
                val = val_match.group(1)
                if lang != "English":
                    is_translated = any(ord(c) > 127 for c in val)
                    if not is_translated:
                        results[lang]["untranslated"].append(key)

with open(r'C:\Users\bhava\audit_results.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print("Audit complete.")
