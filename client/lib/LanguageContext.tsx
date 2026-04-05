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
  // Force English state as requested by user
  const [language] = useState<Language>("English");

  useEffect(() => {
    // Ensure English is saved as the preference
    localStorage.setItem("TeachSpark_lang", "English");
  }, []);

  const t = (key: string) => {
    // Always return English translation
    return translations["English"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language: "English", setLanguage: () => {}, t }}>
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
