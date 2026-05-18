const fs = require('fs');
const path = require('path');

const unusedRootImages = [
  'aloe_vera_farm.png',
  'curry_leaves.png',
  'egg_production.png',
  'explore_knowledge.png',
  'farmer_avatar.png',
  'history_2013.png',
  'impact_digital.png',
  'impact_livestock.png',
  'impact_sustainability.png',
  'mandi_market.png',
  'organic_soil.png',
  'placeholder.svg',
  'saffron_farming.png',
  'shrimp_farming.png',
  'soil_testing.png',
  'solar_pump.png'
];

const unusedClientImages = [
  'satellite_farm_health.png',
  'tool_sharing.png'
];

const rootPublicDir = 'd:\\projects\\farmersapp\\public';
const clientPublicDir = 'd:\\projects\\farmersapp\\client\\public';

// Delete unused images from root public folder
unusedRootImages.forEach(file => {
  const filePath = path.join(rootPublicDir, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted unused: public/${file}`);
  }
});

// Delete unused images from client public folder
unusedClientImages.forEach(file => {
  const filePath = path.join(clientPublicDir, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted unused: client/public/${file}`);
  }
});

console.log('Unused image cleanup complete!');
