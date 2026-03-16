
import re

file_path = r"d:\Desktop Data\project\farmersapp\client\lib\LanguageContext.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# New keys for the 15 modules
hub_keys = {
    # Module 1: Crop Cultivation
    "modCropCult": "Crop Cultivation Knowledge",
    "modCropCultDesc": "Learn when and how to grow different crops effectively.",
    "cropVarietyDB": "Crop Variety Database",
    "growthStages": "Crop Growth Stages",
    "regionalCalendar": "Regional Crop Calendar",
    
    # Module 2: Seeds & Planting
    "modSeedsPlanting": "Seeds & Planting",
    "modSeedsPlantingDesc": "Improve crop establishment with better seed management.",
    "seedTreatment": "Seed Treatment Guide",
    "seedStorage": "Seed Storage Guide",
    "germinationMethods": "Germination Methods",
    
    # Module 3: Soil & Nutrient
    "modSoilNutrient": "Soil & Nutrient Management",
    "modSoilNutrientDesc": "Improve soil health and optimize crop nutrition.",
    "soilTypeGuide": "Soil Type Guide",
    "soilPhGuide": "Soil pH Guide",
    "fertilityManagement": "Soil Fertility Management",
    "organicManure": "Organic Manure Guide",
    
    # Module 4: Water & Irrigation
    "modWaterIrrigation": "Water & Irrigation",
    "modWaterIrrigationDesc": "Master efficient water usage and irrigation methods.",
    "sprinklerGuide": "Sprinkler Irrigation Guide",
    "rainwaterHarvest": "Rainwater Harvesting Guide",
    "waterConservation": "Water Conservation Techniques",
    
    # Module 5: Crop Protection
    "modCropProtection": "Crop Protection",
    "modCropProtectionDesc": "Protect your crops from pests, diseases, and weeds.",
    "pestID": "Pest Identification Guide",
    "diseaseID": "Disease Identification Guide",
    "naturalPestControl": "Natural Pest Control",
    "integratedPestMgmt": "Integrated Pest Management",
    
    # Module 6: Farm Machinery
    "modMachinery": "Farm Machinery Knowledge",
    "modMachineryDesc": "Master the operation and maintenance of farm equipment.",
    "harvesterGuide": "Harvester Guide",
    "seedDrillGuide": "Seed Drill Guide",
    "sprayerGuide": "Sprayer Guide",
    "machineryMaint": "Equipment Maintenance",
    
    # Module 7: Harvesting & Post-Harvest
    "modHarvesting": "Harvesting & Post-Harvest",
    "modHarvestingDesc": "Reduce losses with proper harvesting and handling.",
    "maturityID": "Maturity Identification",
    "postHarvestHandling": "Post-Harvest Handling",
    "gradingGuide": "Crop Grading Guide",
    
    # Module 8: Storage & Logistics
    "modStorageLogistics": "Storage & Logistics",
    "modStorageLogisticsDesc": "Keep your produce safe with modern storage tips.",
    "grainStorageTech": "Grain Storage Techniques",
    "packagingMethods": "Packaging Methods",
    "transportTips": "Crop Transport Tips",
    
    # Module 9: Livestock Farming
    "modLivestock": "Livestock Farming",
    "modLivestockDesc": "Expand your farm with dairy, poultry, and more.",
    "poultryFarming": "Poultry Farming Guide",
    "fishFarming": "Fish Farming Guide",
    "beekeeping": "Beekeeping Guide",
    
    # Module 10: Sustainable Agriculture
    "modSustainableAg": "Sustainable Agriculture",
    "modSustainableAgDesc": "Future-proof your farm with sustainable practices.",
    "agroforestry": "Agroforestry Guide",
    "soilConservation": "Soil Conservation",
    
    # Module 11: Farm Productivity
    "modProductivity": "Farm Productivity",
    "modProductivityDesc": "Tips and tricks to increase your per-acre yield.",
    "yieldTips": "Yield Improvement Tips",
    "suitabilityGuide": "Climate & Crop Suitability",
    
    # Module 12: Climate & Weather
    "modClimateWeather": "Climate & Weather",
    "modClimateWeatherDesc": "Adapt to changing weather and protect your crops.",
    "weatherKnowledge": "Weather Knowledge Guide",
    "extremeProtection": "Extreme Weather Protection",
    
    # Module 13: Market Knowledge
    "modMarketKnowledge": "Market & Pricing",
    "modMarketKnowledgeDesc": "Understand market trends and price mechanisms.",
    "marketDemand": "Market Demand Insights",
    "qualityID": "Crop Quality Identification",
    
    # Module 14: Farmer Education
    "modEducation": "Farmer Education",
    "modEducationDesc": "Continuous learning through videos and success stories.",
    "agriNews": "Agriculture News",
    "successStories": "Farmer Success Stories",
    
    # Module 15: Govt Support
    "modGovtSupport": "Government Support",
    "modGovtSupportDesc": "Access subsidies, schemes, and insurance easily.",
    "agriSubsidyTracker": "Subsidy Tracker",
    "cropInsuranceGuide": "Crop Insurance Guide",
    
    # General Hub
    "knowledgeHub": "Agri Knowledge Hub",
    "knowledgeHubDesc": "Your complete digital educational ecosystem for better farming.",
}

# Add keys to English section
en_pos = content.find("English: {")
if en_pos != -1:
    brace_open = content.find("{", en_pos)
    insertion_point = brace_open + 1
    new_en_content = ""
    for k, v in hub_keys.items():
        if f"{k}:" not in content[en_pos:en_pos+5000]: # Simple check
            new_en_content += f'\n    {k}: "{v}",'
    
    content = content[:insertion_point] + new_en_content + content[insertion_point:]

# Also fix the rentTractor mojibake globally
content = content.replace("ðŸŠœ Rent Tractor", "🏠 Rent Tractor")
content = content.replace("ðŸŠœ", "🏠")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Injected Knowledge Hub keys and fixed Navbar artifacts.")
