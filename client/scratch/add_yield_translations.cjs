const fs = require('fs');
const path = require('path');

const languages = ['en', 'hi', 'te', 'ta', 'mr', 'pa', 'ml', 'kn', 'gu', 'bn', 'or'];
const i18nDir = path.join(__dirname, '..', 'lib', 'i18n');

const newKeys = {
  "downloadReport": "Download Report",
  "profitAndLossAnalysis": "Profit & Loss Analysis",
  "economicProjection": "Economic Projection",
  "grossRevenue": "Gross Revenue",
  "productionCost": "Production Cost",
  "netProfit": "Net Profit",
  "seeds": "Seeds",
  "fertilizer": "Fertilizer",
  "labor": "Labor",
  "satelliteVegetationHealth": "Satellite Vegetation Health",
  "sentinel2LiveStream": "Sentinel-2 Live Stream",
  "healthIndex": "Health Index",
  "optimal": "Optimal",
  "satelliteDataConfirmed": "Satellite data confirmed",
  "weatherYieldCorrelation": "Weather-Yield Correlation",
  "currentTemp": "Current Temp",
  "agriIntelligenceSuite": "Agri-Intelligence Suite",
  "productionHub": "Production Hub v4.8",
  "intelligenceParameters": "Intelligence Parameters",
  "calculatingMlInsights": "Calculating ML Insights...",
  "runPredictiveEngine": "Run Predictive Engine",
  "readyForAnalysis": "Ready for Analysis",
  "configureFarmParams": "Please configure your farm parameters to run the predictive engine.",
  "processingYieldMatrix": "Processing Yield Matrix",
  "syncingSatelliteHealth": "Syncing Satellite & Soil Health...",
  "predictedYieldLabel": "Predicted Yield",
  "tons": "Tons",
  "marketRevenue": "Market Revenue",
  "projectedPrice": "Projected Price",
  "farmRiskIndex": "Farm Risk Index",
  "climateValidated": "Climate Validated",
  "growthTrajectory": "Growth Trajectory",
  "mlPredictedCurve": "ML Predicted Curve",
  "vegetationHealth": "Vegetation Health",
  "ndviIndexTrend": "NDVI Index Trend",
  "aiTacticalAdvisor": "AI Tactical Advisor"
};

languages.forEach(lang => {
  const filePath = path.join(i18nDir, `${lang}.ts`);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the closing brace of the main object
    const lastBraceIndex = content.lastIndexOf('};');
    if (lastBraceIndex !== -1) {
      let keysString = '';
      for (const [key, value] of Object.entries(newKeys)) {
        // Simple heuristic for translation (just using English for now, 
        // real translation would be better but this ensures keys exist)
        if (!content.includes(`"${key}":`)) {
          keysString += `    "${key}": "${value}",\n`;
        }
      }
      
      if (keysString) {
        const newContent = content.slice(0, lastBraceIndex) + keysString + content.slice(lastBraceIndex);
        fs.writeFileSync(filePath, newContent);
        console.log(`Updated ${lang}.ts`);
      }
    }
  }
});
