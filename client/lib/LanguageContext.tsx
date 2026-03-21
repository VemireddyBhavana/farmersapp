import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { translations, Language as TranslationLanguage } from "./translations";

export type Language = TranslationLanguage;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);


export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("TeachSpark_lang");
    return (saved as Language) || "English";
  });

  useEffect(() => {
    localStorage.setItem("TeachSpark_lang", language);
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || translations["English"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
