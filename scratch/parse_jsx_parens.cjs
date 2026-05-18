const fs = require('fs');

const content = fs.readFileSync('d:/projects/farmersapp/client/pages/Weather.tsx', 'utf8');

let parenStack = [];
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
  
  if (char === '(') {
    parenStack.push({ line: lineNum });
    if (lineNum >= 1150) {
      console.log(`Push ( on line ${lineNum}, stack size: ${parenStack.length}`);
    }
  } else if (char === ')') {
    if (parenStack.length === 0) {
      console.log(`Error: Unexpected closing parenthesis ')' on line ${lineNum}`);
    } else {
      const popped = parenStack.pop();
      if (lineNum >= 1150) {
        console.log(`Pop ) on line ${lineNum} (matched line ${popped.line}), stack size: ${parenStack.length}`);
      }
    }
  }
}

console.log("Unclosed Parentheses inside JSX:");
parenStack.forEach(p => {
  console.log(`- Parenthesis opened on line ${p.line}`);
});
