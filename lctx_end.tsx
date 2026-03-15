nner: "সেচ পরিকল্পনাকারী",
    recommendedStrategy: "প্রস্তাবিত কৌশল",
    weatherAdaptiveChoice: "আবহাওয়া-অনকূল পছন্দ",
    irrigationBestTime: "সেরা সময়: খুব ভোরে (সকাল ৮টার আগে)",
    dripIrrigationPriority: "ড্রিপ সেচ অগ্রাধিকার: HIGH",
    waterNeedsNormal: "জলের প্রয়োজন: স্বাভাবিক",
    waterNeedsHigh: "জলের প্রয়োজন: বেশি (+২০%)",
    pauseIrrigation: "সেচ বন্ধ রাখুন (বৃষ্টির সম্ভাবনা আছে)",
    increaseFrequency: "সেচের হার বাড়ান (অত্যধিক বাষ্পীভবন)",
    standardSchedule: "আদর্শ সময়সূচী",
    updateIrrigationSchedule: "সেচ সময়সূচী আপডেট করুন",
    // Market Page
    marketRateFeed: "বাজার দরের আপডেট",
    marketPriceQtl: "বাজার দর (প্রতি কুইন্টাল)",
    noMandiFound: "আপনার অনুসন্ধানের সাথে সামঞ্জস্যপূর্ণ কোনো পণ্য পাওয়া যায়নি।",
    clearAllFilters: "সব ফিল্টার সরান",
    stable: "স্থিতিশীল",
    bullish: "ঊর্ধ্বমুখী (বুলিশ)",
    bearish: "নিম্নমুখী (বেয়ারিশ)",
    updatedJustNow: "এইমাত্র আপডেট করা হয়েছে",
    updatedMinutesAgo: "৫ মিনিট আগে আপডেট করা হয়েছে",
    pricesSynched: "লাইভ দাম সিঙ্ক্রোনাইজ করা হয়েছে",
    refreshData: "তথ্য রিফ্রেশ করুন",
    analyzeValue: "মূল্য বিশ্লেষণ করুন",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("techspark_lang");
    return (saved as Language) || "English";
  });

  useEffect(() => {
    localStorage.setItem("techspark_lang", language);
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
