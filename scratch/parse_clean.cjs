const fs = require('fs');

let content = fs.readFileSync('d:/projects/farmersapp/client/pages/Weather.tsx', 'utf8');

// Strip out multi-line comments {/* ... */}
content = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

// Strip out inline comments //...
content = content.split('\n').map(line => {
  const idx = line.indexOf('//');
  if (idx !== -1 && !line.includes('http://') && !line.includes('https://')) {
    return line.substring(0, idx);
  }
  return line;
}).join('\n');

// Strip out JSX curly brace content {...} recursively so we don't get confused by arrow functions => or ternary operators
// We match matching pairs of curly braces
let newContent = "";
let braceDepth = 0;
let inString = false;
let stringChar = '';

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  
  if (braceDepth > 0) {
    if (char === '"' || char === "'" || char === '`') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (stringChar === char && content[i-1] !== '\\') {
        inString = false;
      }
    }
    if (!inString) {
      if (char === '{') braceDepth++;
      else if (char === '}') braceDepth--;
    }
    continue;
  }
  
  if (char === '{') {
    braceDepth = 1;
    newContent += '""'; // replace curly expression with empty string attribute value
    continue;
  }
  
  newContent += char;
}

// Now we scan for HTML tags
const lines = newContent.split('\n');
let stack = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (i < 193) continue; // skip imports/declarations
  
  const matches = line.matchAll(/<(\/?[a-zA-Z0-9_.-]+)(\s+[^>]*?)?>/g);
  for (const match of matches) {
    const full = match[0];
    const tag = match[1];
    
    if (full.endsWith('/>') || tag.startsWith('polygon') || tag.startsWith('line') || tag.startsWith('path') || tag.startsWith('img') || tag.startsWith('input') || tag.startsWith('hr') || tag.startsWith('br') || tag.startsWith('rect') || tag.startsWith('circle') || tag.startsWith('link') || tag.startsWith('Fi') || tag.startsWith('svg') || tag.startsWith('use')) {
      continue;
    }
    
    if (tag.startsWith('/')) {
      const closedTag = tag.substring(1);
      if (stack.length === 0) {
        console.log(`Error on line ${i + 1}: Unexpected closing tag </${closedTag}> in clean content`);
      } else {
        const popped = stack.pop();
        if (popped.tag !== closedTag) {
          console.log(`Warning on line ${i + 1}: Closing tag </${closedTag}> does not match expected </${popped.tag}> opened on line ${popped.line}`);
        }
      }
    } else {
      stack.push({ tag, line: i + 1 });
    }
  }
}

console.log("Remaining Stack:");
stack.forEach(item => {
  console.log(`- Opened <${item.tag}> on line ${item.line}`);
});
