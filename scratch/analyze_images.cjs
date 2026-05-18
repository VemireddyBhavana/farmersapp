const fs = require('fs');
const path = require('path');

const publicDirs = [
  'd:\\projects\\farmersapp\\public',
  'd:\\projects\\farmersapp\\client\\public'
];

const clientDir = 'd:\\projects\\farmersapp\\client';

// Find all PNG/JPG/SVG/WEBP files in public directories
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

console.log(`Found ${Object.keys(imageFiles).length} images in public folders.`);

// Scan client directory recursively
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
          // Look for direct references
          if (content.includes(imgName)) {
            imageFiles[imgName].foundInFiles.push(fullPath);
          }
        });
      }
    }
  });
}

scanDir(clientDir);

// Report findings
console.log('\n--- Image Usage Report ---');
const usedImages = [];
const unusedImages = [];

Object.keys(imageFiles).forEach(imgName => {
  const info = imageFiles[imgName];
  if (info.foundInFiles.length > 0) {
    usedImages.push(info);
    console.log(`${imgName} is used in:`);
    info.foundInFiles.forEach(f => console.log(`  - ${path.relative(clientDir, f)}`));
  } else {
    unusedImages.push(info);
  }
});

console.log(`\nSummary:`);
console.log(`Used images: ${usedImages.length}`);
console.log(`Unused images: ${unusedImages.length}`);
