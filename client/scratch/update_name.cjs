const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '../lib/i18n');
const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
  const filePath = path.join(i18nDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Update the English and literal translations
  content = content.replace(/"kisanChaupal": ".*"/g, '"kisanChaupal": "Kisan Community Hub"');
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated name in ${file}`);
});
