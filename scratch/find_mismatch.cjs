const fs = require('fs');

const content = fs.readFileSync('d:/projects/farmersapp/client/pages/Weather.tsx', 'utf8');
const lines = content.split('\n');

let balance = 0;
let inComment = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  if (i < 193) continue; // Skip script imports/states
  
  // Scan for div open and close on this line
  let opens = 0;
  let closes = 0;
  
  // Match standard <div> or <div ...> (not self-closing)
  const openMatches = line.matchAll(/<div(\s+[^>]*?)?>/g);
  for (const m of openMatches) {
    if (!m[0].endsWith('/>')) {
      opens++;
    }
  }
  
  // Match </div>
  const closeMatches = line.matchAll(/<\/div>/g);
  for (const m of closeMatches) {
    closes++;
  }
  
  const prevBalance = balance;
  balance += opens - closes;
  
  if (opens > 0 || closes > 0) {
    console.log(`Line ${i + 1}: opens=${opens}, closes=${closes}, balance: ${prevBalance} -> ${balance} | ${line.substring(0, 60)}`);
  }
}

console.log("Final balance:", balance);
