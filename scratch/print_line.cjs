const fs = require('fs');

const content = fs.readFileSync('d:/projects/farmersapp/client/pages/Weather.tsx', 'utf8');
const lines = content.split('\n');
const line = lines[916]; // line 917 (0-indexed 916)

console.log("Line 917 content:", line);
for (let i = 0; i < line.length; i++) {
  console.log(`${i}: '${line[i]}' (code: ${line.charCodeAt(i)})`);
}
