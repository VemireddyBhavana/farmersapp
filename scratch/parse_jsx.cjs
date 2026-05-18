const fs = require('fs');

const content = fs.readFileSync('d:/projects/farmersapp/client/pages/Weather.tsx', 'utf8');

// A simple regex-based tag matching balancer
const lines = content.split('\n');
let stack = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  // Skip imports/types/declarations before first div
  if (i < 193) continue;

  // Skip lines with typescript comments
  if (line.startsWith('//') || line.startsWith('{/*')) continue;

  // Simple scan for opening and closing tags on this line
  // Match tags
  const matches = line.matchAll(/<(\/?[a-zA-Z0-9_.-]+)(\s+[^>]*?)?>/g);
  for (const match of matches) {
    const full = match[0];
    const tag = match[1];
    
    // Ignore self-closing tags or SVG child tags that are self-closing or standard HTML tags
    if (full.endsWith('/>') || tag.startsWith('polygon') || tag.startsWith('line') || tag.startsWith('path') || tag.startsWith('img') || tag.startsWith('input') || tag.startsWith('hr') || tag.startsWith('br') || tag.startsWith('rect') || tag.startsWith('circle') || tag.startsWith('link')) {
      continue;
    }
    
    // Ignore icon tags or standard component tags that are self-closing
    if (full.includes('/>') || (full.includes('className') && (tag.startsWith('Fi') || tag.startsWith('polygon') || tag.startsWith('line') || tag.startsWith('path') || tag.startsWith('rect'))) ) {
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
