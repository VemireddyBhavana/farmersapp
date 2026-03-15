
const fs = require('fs');
const path = require('path');
const content = fs.readFileSync('d:/Desktop Data/project/farmersapp/client/lib/LanguageContext.tsx', 'utf8');

const translationsMatch = content.match(/export const translations: Record<Language, Record<string, string>> = \{([\s\S]+?)\};/);
if (!translationsMatch) {
  console.log("Could not find translations object");
  process.exit(1);
}

const translationsText = translationsMatch[1];
const languages = ["English", "Hindi", "Telugu", "Tamil", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Bangla"];

const keysByLang = {};

languages.forEach(lang => {
  const langRegex = new RegExp(`${lang}: \\{([\\s\\S]+?)\\},`, 'm');
  const match = translationsText.match(langRegex);
  if (match) {
    const langContent = match[1];
    const keyRegex = /([a-zA-Z0-9]+):/g;
    const keys = [];
    let keyMatch;
    while ((keyMatch = keyRegex.exec(langContent)) !== null) {
      keys.push(keyMatch[1]);
    }
    keysByLang[lang] = keys;
  } else {
    // console.log(`Could not find keys for ${lang}`);
  }
});

const englishKeys = keysByLang["English"] || [];
languages.forEach(lang => {
  if (lang === "English") return;
  const currentKeys = keysByLang[lang] || [];
  const missing = englishKeys.filter(k => !currentKeys.includes(k));
  // const extra = currentKeys.filter(k => !englishKeys.includes(k));
  console.log(`\n--- ${lang} ---`);
  if (missing.length > 0) {
    console.log(`Missing keys (${missing.length}): ${missing.join(', ')}`);
  } else {
    console.log("No missing keys.");
  }
});
