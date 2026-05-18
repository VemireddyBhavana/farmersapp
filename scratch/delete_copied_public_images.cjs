const fs = require('fs');
const path = require('path');

const publicDirs = [
  'd:\\projects\\farmersapp\\public',
  'd:\\projects\\farmersapp\\client\\public'
];

const assetsDir = 'd:\\projects\\farmersapp\\client\\assets';

// Gather all files in assetsDir
if (fs.existsSync(assetsDir)) {
  const assetsFiles = fs.readdirSync(assetsDir);
  
  publicDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach(file => {
        // If the file exists in assets directory, it means it was successfully copied
        // and we can delete it from the public folder.
        if (assetsFiles.includes(file)) {
          const publicFilePath = path.join(dir, file);
          fs.unlinkSync(publicFilePath);
          console.log(`Deleted ${file} from public folder: ${path.relative('d:\\projects\\farmersapp', publicFilePath)}`);
        }
      });
    }
  });
}

console.log('Cleanup complete!');
