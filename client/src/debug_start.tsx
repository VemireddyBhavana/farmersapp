import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Language = "English" | "Hindi" | "Telugu" | "Tamil" | "Marathi" | "Gujarati" | "Kannada" | "Malayalam" | "Punjabi" | "Bangla";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  English: {
    home: "Home",
    weather: "Weather",
    market: "Market",
    calendar: "Calendar",
    security: "Security",
    aiChat: "AI Chat",
    schemes: "Schemes",
    government: "Government",
    rent: "Rent",
    settings: "Settings",
    login: "Login",
    welcome: "Welcome back,",
    agriOverview: "Everything looks good for farming today. Here's your agricultural overview.",
    bookTractor: "Book a Tractor",
    viewAll: "View All",
    applyNow: "Apply Now",
    trackApp: "Track Applications",
    plantingCalendar: "Planting Calendar",
    weatherAnalysis: "Live Weather Analysis & Recommendations",
    marketPrices: "Live Market Prices",
    cropEstimator: "Crop Price Estimator",
    findSchemes: "Find Schemes for Your Location",
    growingGuide: "Growing Guide",
    viewGrowingGuide: "View Growing Guide",
    pestsAndDiseases: "Pest & Disease Management",
    officialServices: "One-Click Access to Official Government Services",
    yieldGrowth: "Yield Growth",
    nextRain: "Next Rain",
    whyAgriPath: "Why Choose AgriPath?",
    howItWorks: "How it Works",
    chooseEquipment: "Need Help Choosing the Right Equipment?",
    chatAgriAI: "Chat with AgriAI",
    availableSchemes: "Available Schemes",
    incomeSupport: "Income Support",
    riskProtection: "Risk Protection",
    stateSupport: "State Support",
    trackMyApps: "Track My Applications",
    appId: "Application ID",
    status: "Status",
    date: "Date",
    noApps: "No applications 