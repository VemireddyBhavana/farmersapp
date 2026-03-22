import os

file_path = r'd:\Desktop Data\project\farmersapp\client\lib\LanguageContext.tsx'
key = 'fertilizerAdvice'

with open(file_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f, 1):
        if key in line:
            print(f'{i}: {line.strip()}')
