import fs from 'fs';
import path from 'path';

const files = [
  { name: 'en.ts', val: 'Actual Tenure' },
  { name: 'hi.ts', val: 'वास्तविक कार्यकाल' },
  { name: 'te.ts', val: 'వాస్తవ కాలపరిమితి' }
];

const i18nDir = 'client/lib/i18n';

files.forEach(file => {
  const filePath = path.join(i18nDir, file.name);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find where "interestSaved": "..." is
  const regex = /"interestSaved"\s*:\s*"[^"]*"\s*,?/g;
  const match = regex.exec(content);
  if (match) {
    const matchedString = match[0];
    const index = match.index + matchedString.length;
    
    // Add comma to matched string if it doesn't have one
    const comma = matchedString.endsWith(',') ? '' : ',';
    const insertString = `${comma}\n    "actualTenure": "${file.val}",`;
    
    content = content.substring(0, index) + insertString + content.substring(index);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Successfully added actualTenure to ${file.name}`);
  } else {
    console.error(`❌ Could not find interestSaved key in ${file.name}`);
  }
});
