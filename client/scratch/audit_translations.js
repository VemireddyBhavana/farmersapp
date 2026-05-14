const fs = require('fs');
const path = require('path');

const languages = ['en', 'hi', 'te', 'ta', 'mr', 'gu', 'kn', 'ml', 'pa', 'bn'];
const keysToCheck = [
    'weatherRadarTitle', 'navRain', 'navWind', 'navRadar', 'nav14Day', 'world', 'feedInterrupted', 'retry',
    'weatherRadarSection', 'interactiveMap', 'aqiPollen', 'aqiIndex', 'aqiPoor', 'grass', 'birch', 'ragweed',
    'low', 'none', 'uvIndex', 'veryHigh', 'uvProtectionAdvice', 'regionalWeatherNews', 'heatwaveAlertText',
    'readMore', 'nearbyLocations', 'weatherDataSource', 'pestsAndDisease', 'pestAdvisoryDesc', 'fieldInputCenter',
    'analyzing', 'selectYourCrop', 'allCrops', 'currentWeather', 'allSeasons', 'hotAndDry', 'humidAndRainy',
    'fetchAdvisory', 'activeAlerts', 'actionRequiredLabel', 'expertAiStrategy', 'preventionStrategy',
    'organicTreatment', 'monitoringTips', 'ipmStrategy', 'totalThreats', 'pests', 'diseases', 'commonPests',
    'plantDiseases', 'whitefliesName', 'whitefliesAction', 'whitefliesDesc', 'spiderMitesName', 'spiderMitesAction',
    'spiderMitesDesc', 'armywormsName', 'armywormsAction', 'armywormsDesc', 'bollwormName', 'bollwormAction',
    'bollwormDesc', 'brownPlanthopperName', 'brownPlanthopperAction', 'brownPlanthopperDesc', 'aphidsName',
    'aphidsAction', 'aphidsDesc', 'thripsName', 'thripsAction', 'thripsDesc', 'blightName', 'blightAction',
    'blightDesc', 'powderyMildewName', 'powderyMildewAction', 'powderyMildewDesc', 'rootRotName', 'rootRotAction',
    'rootRotDesc', 'mosaicVirusName', 'mosaicVirusAction', 'mosaicVirusDesc', 'wiltName', 'wiltAction', 'wiltDesc',
    'panamaDiseaseName', 'panamaDiseaseAction', 'panamaDiseaseDesc', 'sigatokaName', 'sigatokaAction', 'sigatokaDesc',
    'bananaPrevention', 'bananaPreventionDry', 'bananaPreventionHumid', 'bananaOrganic', 'bananaOrganicDry',
    'bananaOrganicHumid', 'bananaMonitoring', 'bananaMonitoringDry', 'bananaMonitoringHumid', 'bananaIpm',
    'bananaIpmDry', 'bananaIpmHumid', 'tomatoPrevention', 'tomatoPreventionWet', 'tomatoOrganic', 'tomatoMonitoring',
    'tomatoIpm', 'cottonPrevention', 'cottonOrganic', 'cottonMonitoring', 'cottonIpm', 'defaultPrevention',
    'defaultOrganic', 'defaultMonitoring', 'defaultIpm'
];

languages.forEach(lang => {
    const filePath = path.join('d:', 'projects', 'farmersapp', 'client', 'lib', 'i18n', `${lang}.ts`);
    if (!fs.existsSync(filePath)) {
        console.log(`${lang}: File missing`);
        return;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const missing = keysToCheck.filter(key => !content.includes(`${key}:`));
    if (missing.length > 0) {
        console.log(`${lang}: Missing ${missing.length} keys`);
        // console.log(missing);
    } else {
        console.log(`${lang}: All keys present`);
    }
});
