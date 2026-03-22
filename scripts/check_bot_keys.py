import re

file_path = r'd:\Desktop Data\project\farmersapp\client\lib\LanguageContext.tsx'
languages = ["English", "Hindi", "Telugu", "Tamil", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Bangla"]

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

required_keys = [
    "botWelcome", "botOffer", "botGuidanceReply", "botRentReply", 
    "botSchemeReply", "botCropReply", "botPestReply", "botMarketReply", "botFallback",
    "guidanceKeywords", "rentKeywords", "schemeKeywords", "cropKeywords", "pestKeywords", "marketKeywords"
]

results = {}

for lang in languages:
    pattern = rf'^\s+{lang}:\s*\{{'
    match = re.search(pattern, content, re.MULTILINE)
    if match:
        start_idx = match.start()
        bracket_count = 0
        end_idx = -1
        for i in range(match.end() - 1, len(content)):
            if content[i] == '{':
                bracket_count += 1
            elif content[i] == '}':
                bracket_count -= 1
                if bracket_count == 0:
                    end_idx = i + 1
                    break
        
        if end_idx != -1:
            block = content[start_idx:end_idx]
            missing = []
            for key in required_keys:
                if f"{key}:" not in block:
                    missing.append(key)
            results[lang] = missing

for lang, missing in results.items():
    if missing:
        print(f"{lang} is missing: {', '.join(missing)}")
    else:
        print(f"{lang} is complete.")
