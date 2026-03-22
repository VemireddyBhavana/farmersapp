import os

file_path = r'd:\Desktop Data\project\farmersapp\client\lib\LanguageContext.tsx'
languages = ["English", "Hindi", "Telugu", "Tamil", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Bangla"]

with open(file_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f, 1):
        for lang in languages:
            if f'  {lang}: {{' in line or f'    {lang}: {{' in line:
                print(f'{lang}: {i}')
