const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '../lib/i18n');
const languages = ['en', 'hi', 'te', 'ta', 'kn', 'mr', 'gu', 'pa', 'bn', 'or', 'ml'];

const t = {
  en: {
    cultivationTimeline: "Cultivation Timeline",
    waterManagement: "Water Management",
    fertilizerUse: "Fertilizer Use"
  },
  hi: {
    cultivationTimeline: "खेती की समयरेखा",
    waterManagement: "जल प्रबंधन",
    fertilizerUse: "उर्वरक उपयोग"
  },
  te: {
    cultivationTimeline: "సాగు టైమ్‌లైన్",
    waterManagement: "నీటి నిర్వహణ",
    fertilizerUse: "ఎరువుల వాడకం"
  }
};

languages.forEach(lang => {
  const filePath = path.join(i18nDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const trans = t[lang] || t.en;
  
  let additions = '';
  for (const [key, val] of Object.entries(trans)) {
    if (!content.includes(`"${key}":`)) {
      additions += `    "${key}": "${val}",\n`;
    }
  }
  
  if (additions) {
    content = content.replace(/};\s*$/, `${additions}};\n`);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${lang}`);
  }
});
