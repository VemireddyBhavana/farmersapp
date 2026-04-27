import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Language as TranslationLanguage } from "./translations";

export type Language = TranslationLanguage;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const langMap: Record<string, Language> = {
  en: "English",
  hi: "Hindi",
  te: "Telugu",
  ta: "Tamil",
  mr: "Marathi",
  gu: "Gujarati",
  kn: "Kannada",
  ml: "Malayalam",
  pa: "Punjabi",
  bn: "Bangla",
};

const revMap: Record<Language, string> = {
  English: "en",
  Hindi: "hi",
  Telugu: "te",
  Tamil: "ta",
  Marathi: "mr",
  Gujarati: "gu",
  Kannada: "kn",
  Malayalam: "ml",
  Punjabi: "pa",
  Bangla: "bn",
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { t, i18n } = useTranslation();

  const setLanguage = (lang: Language) => {
    const code = revMap[lang];
    if (code) {
      i18n.changeLanguage(code);
    }
  };

  const language = langMap[i18n.language] || "English";

  useEffect(() => {
    localStorage.setItem("TeachSpark_lang", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: (key: string, options?: any) => t(key, options) as string }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
