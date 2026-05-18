const fs = require('fs');

const content = fs.readFileSync('d:/projects/farmersapp/client/pages/Weather.tsx', 'utf8');

let braceStack = [];
let inString = false;
let stringChar = '';
let inComment = false;
let inBlockComment = false;

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  const nextChar = content[i+1];
  
  // Track line number
  const beforeSlice = content.substring(0, i);
  const lineNum = beforeSlice.split('\n').length;
  
  if (lineNum < 194) continue; // Skip script imports/states
  
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
    i++;
    continue;
  }
  
  if (char === '"' || char === "'" || char === '`') {
    inString = true;
    stringChar = char;
    continue;
  }
  
  if (char === '{') {
    braceStack.push({ line: lineNum });
  } else if (char === '}') {
    if (braceStack.length === 0) {
      console.log(`Error: Unexpected closing brace '}' on line ${lineNum}`);
    } else {
      braceStack.pop();
    }
  }
}

console.log("Unclosed Braces inside JSX:");
braceStack.forEach(b => {
  console.log(`- Brace opened on line ${b.line}`);
});
