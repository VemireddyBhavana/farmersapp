import fs from 'fs';
import path from 'path';

const i18nDir = 'client/lib/i18n';
const languages = ['en', 'hi', 'te', 'ta', 'mr', 'gu', 'kn', 'ml', 'pa', 'bn'];

const keysByLang = {};

languages.forEach(lang => {
  const filePath = path.join(i18nDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const keys = new Set();
  const duplicates = [];

  lines.forEach((line, idx) => {
    // Match keys with or without quotes
    const match = line.match(/^\s*(?:"([^"]+)"|([a-zA-Z0-9_]+))\s*:/);
    if (match) {
      const key = match[1] || match[2];
      if (keys.has(key)) {
        duplicates.push({ key, line: idx + 1 });
      } else {
        keys.add(key);
      }
    }
  });

  keysByLang[lang] = {
    keys,
    duplicates,
    filePath
  };
});

// Compare all languages against 'en'
const enKeys = keysByLang['en'].keys;

console.log(`\n=== Translation Keys Audit ===`);
console.log(`English (en.ts) has ${enKeys.size} keys.`);

languages.forEach(lang => {
  if (lang === 'en') return;
  const langInfo = keysByLang[lang];
  if (!langInfo) return;

  const currentKeys = langInfo.keys;
  const missing = [...enKeys].filter(k => !currentKeys.has(k));
  const extra = [...currentKeys].filter(k => !enKeys.has(k));

  console.log(`\n--- ${lang.toUpperCase()} (${lang}.ts) ---`);
  console.log(`Total keys: ${currentKeys.size}`);
  
  if (langInfo.duplicates.length > 0) {
    console.log(`⚠️ Found duplicates (${langInfo.duplicates.length}):`);
    langInfo.duplicates.forEach(d => console.log(`   - Key "${d.key}" duplicated at line ${d.line}`));
  } else {
    console.log(`✅ No duplicates.`);
  }

  if (missing.length > 0) {
    console.log(`❌ Missing keys from English (${missing.length}):`);
    // Print first 10 missing keys, then summary
    missing.slice(0, 15).forEach(k => console.log(`   - ${k}`));
    if (missing.length > 15) {
      console.log(`   - ... and ${missing.length - 15} more.`);
    }
  } else {
    console.log(`✅ No missing keys.`);
  }

  if (extra.length > 0) {
    console.log(`➕ Extra keys not in English (${extra.length}):`);
    extra.slice(0, 15).forEach(k => console.log(`   - ${k}`));
    if (extra.length > 15) {
      console.log(`   - ... and ${extra.length - 15} more.`);
    }
  } else {
    console.log(`✅ No extra keys.`);
  }
});
