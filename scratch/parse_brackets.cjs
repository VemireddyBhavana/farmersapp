const fs = require('fs');

const content = fs.readFileSync('d:/projects/farmersapp/client/pages/Weather.tsx', 'utf8');
const lines = content.split('\n');

let braceStack = [];
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
      if (braceStack.length === 0) {
        console.log(`Brace depth hit 0 at line ${lineNum}! Context: ${lines[lineNum-1]}`);
      }
    }
  }
  
  if (char === '(') {
    parenStack.push({ line: lineNum });
  } else if (char === ')') {
    if (parenStack.length === 0) {
      console.log(`Error: Unexpected closing parenthesis ')' on line ${lineNum}`);
    } else {
      parenStack.pop();
      if (parenStack.length === 0) {
        console.log(`Parenthesis depth hit 0 at line ${lineNum}! Context: ${lines[lineNum-1]}`);
      }
    }
  }
}
