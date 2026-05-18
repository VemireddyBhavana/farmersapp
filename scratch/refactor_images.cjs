const fs = require('fs');
const path = require('path');

const publicDirs = [
  'd:\\projects\\farmersapp\\public',
  'd:\\projects\\farmersapp\\client\\public'
];

const clientDir = 'd:\\projects\\farmersapp\\client';
const assetsDir = 'd:\\projects\\farmersapp\\client\\assets';

// Ensure client assets directory exists
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// 1. Gather all image files from public folders
const imageFiles = {};
publicDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(file => {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.svg', '.webp'].includes(ext)) {
        imageFiles[file] = {
          name: file,
          srcPath: path.join(dir, file),
          foundInFiles: []
        };
      }
    });
  }
});

// Helper to convert snake/kebab to camelCase variable name
function getVariableName(filename) {
  const base = path.basename(filename, path.extname(filename));
  const varName = base.replace(/[-_]([a-z0-9])/g, (g) => g[1].toUpperCase());
  // Ensure it starts with lowercase and is valid
  return varName.charAt(0).toLowerCase() + varName.slice(1);
}

// 2. Scan client directory for uses of these images
function scanDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'public' && file !== 'assets') {
        scanDir(fullPath);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.tsx', '.ts', '.jsx', '.js'].includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        Object.keys(imageFiles).forEach(imgName => {
          if (content.includes(imgName)) {
            imageFiles[imgName].foundInFiles.push(fullPath);
          }
        });
      }
    }
  });
}

scanDir(clientDir);

// 3. For each used image:
// - Copy it to client/assets/
// - Refactor the files that reference it
console.log('Copying images and refactoring components...');

const refactoredFiles = new Set();

Object.keys(imageFiles).forEach(imgName => {
  const info = imageFiles[imgName];
  if (info.foundInFiles.length === 0) return;

  const destPath = path.join(assetsDir, imgName);
  
  // Copy image to assets directory if it doesn't exist
  if (!fs.existsSync(destPath)) {
    fs.copyFileSync(info.srcPath, destPath);
    console.log(`Copied ${imgName} to assets/`);
  }

  const varName = getVariableName(imgName);

  info.foundInFiles.forEach(filePath => {
    refactoredFiles.add(filePath);
    let content = fs.readFileSync(filePath, 'utf8');

    // Perform replacement:
    // src="/imgName" -> src={varName}
    // src='/imgName' -> src={varName}
    // image: "/imgName" -> image: varName
    // image: 'imgName' or image: '/imgName' -> image: varName
    // img: "/imgName" -> img: varName
    // url="/imgName" -> url={varName}
    
    content = content.replace(new RegExp(`src=["']\\/?${imgName}["']`, 'g'), `src={${varName}}`);
    content = content.replace(new RegExp(`image:\\s*["']\\/?${imgName}["']`, 'g'), `image: ${varName}`);
    content = content.replace(new RegExp(`img:\\s*["']\\/?${imgName}["']`, 'g'), `img: ${varName}`);
    content = content.replace(new RegExp(`url=["']\\/?${imgName}["']`, 'g'), `url={${varName}}`);
    content = content.replace(new RegExp(`["']\\/?${imgName}["']`, 'g'), varName);

    // Insert the import statement before the first import in the file
    const importStmt = `import ${varName} from "@/assets/${imgName}";`;
    if (!content.includes(importStmt)) {
      const lines = content.split('\n');
      let firstImportIndex = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith('import ')) {
          firstImportIndex = i;
          break;
        }
      }
      if (firstImportIndex !== -1) {
        lines.splice(firstImportIndex, 0, importStmt);
        content = lines.join('\n');
      } else {
        content = importStmt + '\n' + content;
      }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Refactored ${path.relative(clientDir, filePath)} for ${imgName}`);
  });
});

console.log(`\nRefactoring complete! Total files refactored: ${refactoredFiles.size}`);
