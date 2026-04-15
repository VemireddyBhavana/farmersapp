import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files (we will create these next)
// Import existing large translation files
import { en } from './lib/i18n/en';
import { hi } from './lib/i18n/hi';
import { te } from './lib/i18n/te';
import { ta } from './lib/i18n/ta';
import { kn } from './lib/i18n/kn';
import { ml } from './lib/i18n/ml';
import { bn } from './lib/i18n/bn';
import { mr } from './lib/i18n/mr';
import { gu } from './lib/i18n/gu';
import { pa } from './lib/i18n/pa';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  te: { translation: te },
  ta: { translation: ta },
  kn: { translation: kn },
  ml: { translation: ml },
  bn: { translation: bn },
  mr: { translation: mr },
  gu: { translation: gu },
  pa: { translation: pa },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
  });

export default i18n;
