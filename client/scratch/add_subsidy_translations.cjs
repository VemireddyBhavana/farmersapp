const fs = require('fs');
const path = require('path');

const languages = ['en', 'hi', 'te', 'ta', 'mr', 'pa', 'ml', 'kn', 'gu', 'bn', 'or'];
const i18nDir = path.join(__dirname, '..', 'lib', 'i18n');

const newKeys = {
  "gender": "Gender",
  "socialCategory": "Social Category",
  "selectState": "Select State",
  "requiredDocuments": "Required Documents",
  "womenBenefitNotice": "Women Farmer Benefit",
  "redirectsToGovernment": "Redirects to official portal",
  "male": "Male",
  "female": "Female",
  "general": "General",
  "sc_st": "SC/ST",
  "step": "Step",
  "startOver": "Start Over",
  "reason": "Reason for Ineligibility",
  "subsidy_apply_now": "Apply Now",
  "subsidy_eligible": "Eligible",
  "subsidy_ineligible": "Ineligible",
  "scheme_pm_kisan": "PM-Kisan Nidhi",
  "benefit_pm_kisan": "₹6,000 / Year",
  "reason_pm_kisan": "Requires less than 5 acres of land.",
  "scheme_kcc": "Kisan Credit Card",
  "benefit_kcc": "3% Interest Rate",
  "reason_kcc": "Maximum land limit for basic KCC is 12 acres.",
  "scheme_solar": "PM-KUSUM Solar",
  "benefit_solar": "60% Pump Subsidy",
  "reason_solar": "Requires an existing irrigation source.",
  "scheme_pmfby": "Crop Insurance",
  "benefit_pmfby": "Low Premium Cover",
  "reason_pmfby": "Requires a minimum of 1 acre of land.",
  "subsidy_title": "Subsidy Discovery",
  "subsidy_subtitle": "Find every government grant you qualify for",
  "subsidy_form_land": "How many acres do you farm?",
  "subsidy_form_crop": "Which crop are you growing?",
  "subsidy_form_irrigation": "What is your main water source?",
  "subsidy_checking": "Scanning government database...",
  "subsidy_check_button": "Find My Subsidies",
  "subsidy_results_title": "Your Eligible Subsidies",
  "subsidy_reason": "Criteria not met"
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
