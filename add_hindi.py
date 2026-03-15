import os

file_path = r"d:\Desktop Data\project\farmersapp\client\lib\LanguageContext.tsx"

hindi_translations = {
    "smartFarmingTools": "स्मार्ट खेती उपकरण",
    "aiCropDoctor": "AI फसल डॉक्टर",
    "aiCropDoctorDesc": "पौधों की बीमारियों का पता लगाएं और स्वास्थ्य सिफारिशें प्राप्त करें।",
    "smartCropRecommendation": "स्मार्ट फसल सलाह",
    "smartCropRecommendationDesc": "आपकी मिट्टी के लिए सबसे अच्छी फसलों के लिए AI सुझाव।",
    "farmProfitCalculator": "खेती लाभ कैलकुलेटर",
    "farmProfitCalculatorDesc": "अपनी खेती की लागत और अपेक्षित लाभ की गणना करें।",
    "smartIrrigationCalculator": "स्मार्ट सिंचाई कैलकुलेटर",
    "smartIrrigationCalculatorDesc": "अपनी फसलों के लिए सटीक पानी की आवश्यकता की गणना करें।",
    "fertilizerRequirement": "उर्वरक सलाह",
    "fertilizerRequirementDesc": "अपनी फसल और मिट्टी के लिए सटीक उर्वरक सलाह प्राप्त करें।",
    "uploadLeaf": "पत्ती की छवि अपलोड करें",
    "detectDisease": "बीमारी का पता लगाएं",
    "soilType": "मिट्टी का प्रकार",
    "selectSoil": "मिट्टी का प्रकार चुनें",
    "blackSoil": "काली मिट्टी",
    "redSoil": "लाल मिट्टी",
    "sandySoil": "रेतीली मिट्टी",
    "loamySoil": "दोमट मिट्टी",
    "cropType": "फसल का प्रकार",
    "season": "सीजन",
    "selectSeason": "सीजन चुनें",
    "kharif": "खरीफ",
    "rabi": "रबी",
    "zaid": "जायद",
    "farmArea": "खेत का क्षेत्रफल (एकड़)",
    "seedCost": "बीज की लागत",
    "fertilizerCost": "उर्वरक की लागत",
    "labourCost": "श्रम लागत",
    "totalCost": "कुल लागत",
    "expectedYield": "अपेक्षित उपज (क्विंटल)",
    "marketPrice": "बाजार मूल्य (प्रति क्विंटल)",
    "grossRevenue": "कुल राजस्व",
    "netProfit": "शुद्ध लाभ",
    "results": "परिणाम",
    "recommendedCrops": "अनुशंसित फसलें",
    "waterRequirement": "पानी की आवश्यकता (लीटर/दिन)",
    "frequency": "सिंचाई की आवृत्ति",
    "fertilizerAdvice": "उर्वरक सलाह"
}

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
target_found = False

for line in lines:
    new_lines.append(line)
    if 'selectLocationForMandiRates: "नवीनतम' in line or 'selectLocationForMandiRates: "à¤¨à¤µà¥€à¤¨à¤¤à¤®' in line:
        # Avoid duplicate insertion if script is run twice
        if 'smartFarmingTools:' not in lines[lines.index(line) + 1]:
            for key, value in hindi_translations.items():
                new_lines.append(f'    {key}: "{value}",\n')
            target_found = True
        else:
            print("Keys already present.")
            target_found = True

if not target_found:
    print("Target key not found for Hindi section.")
else:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Hindi translations added successfully.")
