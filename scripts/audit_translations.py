import re

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

# Find each language block
results = {}

for lang in languages:
    results[lang] = []
    # Match block for the language
    pattern = rf'{lang}: \{{(.*?)\}},'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        block = match.group(1)
        for key in keys_to_audit:
            # Check if key exists in this block and if it is not just the key string itself (placeholder)
            # A simple way is to check if it's followed by a colon
            if f'{key}:' not in block:
                results[lang].append(key)
            else:
                # Check if it's still in English (rough check for non-ASCII or specific English values)
                val_match = re.search(rf'{key}:\s*"(.*?)",', block)
                if val_match:
                    val = val_match.group(1)
                    # If language is NOT English, but value is ASCII and looks like the English key or placeholder
                    if lang != "English" and all(ord(c) < 128 for c in val):
                         # If it's a known multi-word English phrase, it's probably not translated
                         if ' ' in val or val.lower() != key.lower():
                             results[lang].append(f"{key} (English?)")
    else:
        results[lang].append("BLOCK MISSING")

for lang, missing in results.items():
    if missing:
        print(f"--- {lang} ---")
        for m in missing:
            print(f"  - {m}")
