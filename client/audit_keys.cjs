const fs = require('fs');
const path = require('path');

const keysUsed = [
  'empoweringFarmers', 'nationalAgriPortal', 'dashboardDesc', 'fetchAreaData', 'seedPortal', 
  'kisanSuvidhaTitle', 'meteorologicalData', 'live', 'fetchingSync', 'station', 
  'tempAndCond', 'officialAdvisory', 'criticalHeatWarning', 'nominalConditions', 
  'retryConnection', 'authorizeGPS', 'portalServices', 'cropCalendar', 'pestAdvisory', 
  'kisanSupport', 'history', 'aiCropDiagnostics', 'checkCropHealth', 'identifyFromLeaf', 
  'scanFarmAreaOption', 'scanFieldArea', 'liveCommodityRates', 'viewAll', 'syncingData', 
  'nationalSchemes', 'pmKisanSchemeTitle', 'pmKisanSchemeDetail', 'pmfbySchemeTitle', 
  'pmfbySchemeDetail', 'accessSchemeDirectory', 'agriMachineryDB', 'procureAndSchedule', 
  'accessFullCatalog', 'tagNew', 'premiumEquipmentDesc', 'browseSelectDesc', 'bookTractor', 
  'agriFarmingHub', 'agriFarmingHubDesc', 'viewAllTopics', 'indoorSaffronTitle', 
  'agricultureCategory', 'eggProductionTitle', 'poultryCategory', 'tagGuide', 
  'shrimpFarmingTitle', 'aquacultureCategory', 'tagExpert', 'solarPumpTitle', 
  'subsidiesCategory', 'tagScheme', 'aloeVeraTitle', 'horticultureCategory', 
  'tagBusiness', 'curryLeavesTitle', 'gardeningCategory', 'tagTips', 'today', 'cultivationGuide'
];

const enContent = fs.readFileSync('d:/projects/farmersapp/client/lib/i18n/en.ts', 'utf8');

const missing = keysUsed.filter(key => !enContent.includes(key + ':'));

console.log('Missing keys in en.ts:', missing);
