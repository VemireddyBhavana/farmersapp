const fs = require('fs');

const content = fs.readFileSync('d:/projects/farmersapp/client/pages/Weather.tsx', 'utf8');

let inString = false;
let stringChar = '';
let stringLine = 0;
let inComment = false;
let inBlockComment = false;

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  const nextChar = content[i+1];
  
  const beforeSlice = content.substring(0, i);
  const lineNum = beforeSlice.split('\n').length;
  
  if (lineNum < 194) continue;
  
  if (inBlockComment) {
    if (char === '*' && nextChar === '/') {
      inBlockComment = false;
      i++;
    }
    continue;
  }
  
  if (inComment) {
    if (char === '\n') {
      inComment = false;
    }
    continue;
  }
  
  if (inString) {
    if (char === stringChar && content[i-1] !== '\\') {
      inString = false;
      console.log(`Line ${lineNum}: String closed: ${stringChar}`);
    }
    continue;
  }
  
  if (char === '/' && nextChar === '*') {
    inBlockComment = true;
    i++;
    continue;
  }
  
  if (char === '/' && nextChar === '/') {
    inComment = true;
    continue;
  }
  
  if (char === '"' || char === "'" || char === '`') {
    inString = true;
    stringChar = char;
    stringLine = lineNum;
    console.log(`Line ${lineNum}: String opened: ${stringChar}`);
    continue;
  }
}

console.log("At EOF:");
console.log("inString:", inString, inString ? `(opened on line ${stringLine} with ${stringChar})` : '');
