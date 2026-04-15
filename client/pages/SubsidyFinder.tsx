import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  CheckCircle2, 
  Sprout, 
  ArrowRight, 
  ArrowLeft,
  Zap, 
  FileText,
  ShieldCheck as ShieldIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SubsidyFinder = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [land, setLand] = useState(2);
  const [crop, setCrop] = useState("Rice");
  const [irrigation, setIrrigation] = useState("Borewell");
  const [results, setResults] = useState<any[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const SCHEMES = [
    {
      id: "pm_kisan",
      name: t("scheme_pm_kisan"),
      benefit: t("benefit_pm_kisan"),
      rule: (f: any) => f.land <= 5,
      reason: t("reason_pm_kisan"),
      icon: <Zap className="text-amber-500" />,
      url: "https://pmkisan.gov.in/"
    },
    {
      id: "kcc",
      name: t("scheme_kcc"),
      benefit: t("benefit_kcc"),
      rule: (f: any) => f.land <= 12,
      reason: t("reason_kcc"),
      icon: <Sprout className="text-emerald-500" />,
      url: "https://www.myscheme.gov.in/schemes/kcc"
    },
    {
      id: "solar",
      name: t("scheme_solar"),
      benefit: t("benefit_solar"),
      rule: (f: any) => f.irrigation !== "Rain-fed",
      reason: t("reason_solar"),
      icon: <Zap className="text-sky-500" />,
      url: "https://pmkusum.mnre.gov.in/"
    },
    {
      id: "pmfby",
      name: t("scheme_pmfby"),
      benefit: t("benefit_pmfby"),
      rule: (f: any) => f.land >= 1,
      reason: t("reason_pmfby"),
      icon: <ShieldIcon className="text-blue-500" />,
      url: "https://pmfby.gov.in/"
    }
  ];

  const steps = ["Land", "Crop", "Irrigation"];

  const checkEligibility = () => {
    setIsChecking(true);
    setTimeout(() => {
      const farmer = { land, crop, irrigation };
      const evaluated = SCHEMES.map(s => ({
        ...s,
        eligible: s.rule(farmer)
      }));
      setResults(evaluated);
      setIsChecking(false);
      setCurrentStep(3); 
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1500);
  };

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
    else checkEligibility();
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const reset = () => {
    setCurrentStep(0);
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-background font-sans p-4 md:p-10 pb-32 transition-colors duration-500">
      <div className="max-w-xl mx-auto mb-10">
        <div className="flex justify-between mb-2">
          {steps.map((s, i) => (
            <div 
              key={s} 
              className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                i <= currentStep ? "text-primary" : "text-muted-foreground/30"
              }`}
            >
              {t("step")} {i + 1}
            </div>
          ))}
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / (steps.length + 1)) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentStep <= 2 ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            className="max-w-2xl mx-auto bg-card rounded-[2.5rem] shadow-2xl p-8 md:p-12 mb-12 border-b-8 border-primary/10 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-12">
              <div className="text-center space-y-2">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                  {t('subsidy_title')}
                </h1>
                <p className="text-muted-foreground font-bold">{t('subsidy_subtitle')}</p>
              </div>

              <div className="min-h-[200px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {currentStep === 0 && (
                    <motion.div 
                      key="step0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="w-full space-y-8"
                    >
                      <div className="flex justify-between items-end">
                        <label className="text-sm font-black uppercase text-muted-foreground tracking-widest">{t('subsidy_form_land')}</label>
                        <span className="text-5xl font-black text-primary italic transition-all">
                          {land} <span className="text-sm not-italic opacity-50">{t('acres')}</span>
                        </span>
                      </div>
                      <input 
                        type="range"
                        min="0.5"
                        max="15"
                        step="0.5"
                        value={land}
                        onChange={(e) => setLand(parseFloat(e.target.value))}
                        className="w-full h-4 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-xs font-bold text-muted-foreground/50 uppercase tracking-tighter">
                         <span>{t('small_farm')}</span>
                         <span>{t('large_farm')}</span>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="w-full space-y-4"
                    >
                      <label className="text-sm font-black uppercase text-muted-foreground tracking-widest">{t('subsidy_form_crop')}</label>
                      <div className="grid grid-cols-2 gap-4">
                        {["Rice", "Wheat", "Cotton", "Pulse"].map((c) => (
                          <button
                            key={c}
                            onClick={() => setCrop(c)}
                            className={`p-6 rounded-3xl text-xl font-black transition-all border-4 ${
                              crop === c 
                              ? "bg-primary text-primary-foreground border-primary scale-105 shadow-xl" 
                              : "bg-muted border-transparent text-muted-foreground hover:bg-muted/80"
                            }`}
                          >
                            {t(c.toLowerCase()) || c}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="w-full space-y-4"
                    >
                      <label className="text-sm font-black uppercase text-muted-foreground tracking-widest">{t('subsidy_form_irrigation')}</label>
                      <div className="grid grid-cols-1 gap-4">
                        {["Borewell", "Canal", "Rain-fed"].map((i) => (
                          <button
                            key={i}
                            onClick={() => setIrrigation(i)}
                            className={`p-6 rounded-3xl text-xl font-black transition-all border-4 flex justify-between items-center ${
                              irrigation === i 
                              ? "bg-primary text-primary-foreground border-primary scale-[1.02] shadow-xl" 
                              : "bg-muted border-transparent text-muted-foreground hover:bg-muted/80"
                            }`}
                          >
                            {t(i.toLowerCase().replace('-', '_')) || i}
                            {irrigation === i && <CheckCircle2 />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-4">
                {currentStep > 0 && (
                  <Button 
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1 rounded-full py-8 text-lg font-black border-2 border-primary/20"
                  >
                    <ArrowLeft className="mr-2" /> {t("back")}
                  </Button>
                )}
                <Button 
                  onClick={nextStep}
                  disabled={isChecking}
                  className="flex-[2] bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-8 text-xl font-black shadow-2xl transition-all active:scale-95 space-x-3"
                >
                  {isChecking ? (
                    <span className="animate-pulse">{t('subsidy_checking')}</span>
                  ) : (
                    <>
                      <span>{currentStep === 2 ? t('subsidy_check_button') : t("continue")}</span>
                      <ArrowRight className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="text-center space-y-4">
               <h2 className="text-4xl font-black text-foreground tracking-tight">{t('subsidy_results_title')}</h2>
               <p className="text-muted-foreground font-bold">{land} {t('acres')} • {t(crop.toLowerCase()) || crop} • {t(irrigation.toLowerCase().replace('-', '_')) || irrigation}</p>
               <Button variant="ghost" onClick={reset} className="font-black uppercase text-xs tracking-widest text-primary hover:bg-primary/5">
                 {t("startOver")}
               </Button>
            </div>

            <div ref={resultsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((res: any, i: number) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={res.id}
                  className={`rounded-[2.5rem] p-8 border-4 transition-all shadow-xl flex flex-col justify-between gap-8 h-full bg-card overflow-hidden relative group ${
                    res.eligible 
                    ? "border-primary/20 shadow-primary/5" 
                    : "border-muted opacity-60 grayscale-[0.5]"
                  }`}
                >
                  <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl transition-opacity group-hover:opacity-100 ${res.eligible ? "bg-primary/10 opacity-50" : "bg-muted opacity-0"}`} />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner ${res.eligible ? "bg-primary/10" : "bg-muted"}`}>
                        {res.icon}
                      </div>
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${res.eligible ? "bg-primary text-primary-foreground" : "bg-muted-foreground text-card"}`}>
                        {res.eligible ? `✅ ${t('subsidy_eligible')}` : `❌ ${t('subsidy_ineligible')}`}
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-card-foreground leading-tight mb-2">{res.name}</h3>
                    <p className="text-2xl font-black text-primary italic">{res.benefit}</p>
                  </div>
                  <div className="relative z-10 pt-6 border-t border-muted">
                    {res.eligible ? (
                      <Button 
                        onClick={() => window.open(res.url, "_blank")}
                        className="w-full rounded-full py-7 bg-foreground text-background font-black hover:scale-[1.02] transition-transform group"
                      >
                        {t('subsidy_apply_now')} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                      </Button>
                    ) : (
                      <div className="flex items-start gap-2 bg-muted/30 p-4 rounded-2xl">
                        <FileText className="text-muted-foreground/50 shrink-0 mt-0.5" size={14} />
                        <p className="text-xs font-bold text-muted-foreground italic leading-relaxed">
                          {t('subsidy_reason')}: {res.reason}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubsidyFinder;
