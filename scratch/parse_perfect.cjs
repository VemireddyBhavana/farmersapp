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

// Strip out JSX curly expressions {...} recursively
let cleanText = "";
let depth = 0;
let inStr = false;
let sChar = '';

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  if (depth > 0) {
    if (char === '"' || char === "'" || char === '`') {
      if (!inStr) {
        inStr = true;
        sChar = char;
      } else if (sChar === char && content[i-1] !== '\\') {
        inStr = false;
      }
    }
    if (!inStr) {
      if (char === '{') depth++;
      else if (char === '}') depth--;
    }
    continue;
  }
  if (char === '{') {
    depth = 1;
    cleanText += '""';
    continue;
  }
  cleanText += char;
}

// Now merge multi-line tags `<...>` into a single line
// We replace newlines inside `<...>` with a space
let merged = "";
let insideTag = false;
let tagInStr = false;
let tagSChar = '';

for (let i = 0; i < cleanText.length; i++) {
  const char = cleanText[i];
  if (insideTag) {
    if (char === '"' || char === "'") {
      if (!tagInStr) {
        tagInStr = true;
        tagSChar = char;
      } else if (tagSChar === char) {
        tagInStr = false;
      }
    }
    if (!tagInStr && char === '>') {
      insideTag = false;
      merged += char;
      continue;
    }
    if (char === '\n' || char === '\r') {
      merged += ' '; // replace newline inside tag with space
      continue;
    }
    merged += char;
    continue;
  }
  if (char === '<') {
    // Check if it's followed by a letter or /
    const next = cleanText.substring(i + 1, i + 15);
    if (/^\/?[a-zA-Z]/.test(next)) {
      insideTag = true;
      tagInStr = false;
      merged += char;
      continue;
    }
  }
  merged += char;
}

// Now parse standard tags
const lines = merged.split('\n');
let stack = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (i < 193) continue; // skip imports/declarations
  
  const matches = line.matchAll(/<(\/?[a-zA-Z0-9_.:-]+)(\s+[^>]*?)?>/g);
  for (const match of matches) {
    const full = match[0];
    const tag = match[1];
    
    // Ignore self-closing tags
    if (full.endsWith('/>') || tag.startsWith('img') || tag.startsWith('input') || tag.startsWith('hr') || tag.startsWith('br') || tag.startsWith('link') || tag.startsWith('meta')) {
      continue;
    }
    
    // Ignore icons, standard components, custom SVGs that are self-closing or child tags we don't care about
    if (tag.startsWith('Fi') || tag.startsWith('polygon') || tag.startsWith('line') || tag.startsWith('path') || tag.startsWith('rect') || tag.startsWith('circle') || tag.startsWith('svg') || tag.startsWith('use')) {
      continue;
    }

    if (tag.startsWith('/')) {
      const closedTag = tag.substring(1);
      if (stack.length === 0) {
        console.log(`Error on line ${i + 1}: Unexpected closing tag </${closedTag}>`);
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
