import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  CheckCircle2, 
  Sprout, 
  ArrowRight, 
  ArrowLeft,
  Zap, 
  FileText,
  ShieldCheck as ShieldIcon,
  MapPin,
  User,
  Users,
  Award,
  CircleCheck,
  ClipboardList,
  ExternalLink,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/lib/LocationContext";
import { jsPDF } from "jspdf";
import { useToast } from "@/hooks/use-toast";


const SubsidyFinder = () => {
  const { t } = useTranslation();
  const { location } = useLocation();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  
  // FARMER DATA
  const [farmer, setFarmer] = useState({
    land: 2,
    crop: "Rice",
    irrigation: "Borewell",
    state: "Andhra Pradesh",
    gender: "Male",
    category: "General"
  });

  const [results, setResults] = useState<any[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Auto-set state from location context
  useEffect(() => {
    if (location?.state) {
      setFarmer(prev => ({ ...prev, state: location.state }));
    }
  }, [location]);

  const SCHEMES = [
    {
      id: "pm_kisan",
      name: t("scheme_pm_kisan"),
      benefit: "₹6,000 / Year",
      rule: (f: any) => f.land <= 5,
      reason: t("reason_pm_kisan"),
      documents: ["Aadhaar Card", "Land Records (7/12 or Patta)", "Bank Passbook"],
      icon: <Award className="text-amber-500" />,
      url: "https://pmkisan.gov.in/"
    },
    {
      id: "kcc",
      name: t("scheme_kcc"),
      benefit: "3% Interest Subvention",
      rule: (f: any) => f.land <= 12,
      reason: t("reason_kcc"),
      documents: ["Identity Proof", "Address Proof", "Land Ownership Proof"],
      icon: <Zap className="text-emerald-500" />,
      url: "https://www.myscheme.gov.in/schemes/kcc"
    },
    {
      id: "ysr_bharosa",
      name: "YSR Rythu Bharosa",
      benefit: "₹13,500 / Year",
      rule: (f: any) => f.state === "Andhra Pradesh",
      reason: "Available for farmers in Andhra Pradesh only.",
      documents: ["Pattadar Passbook", "Aadhaar Linked Bank Account"],
      icon: <Sprout className="text-blue-500" />,
      url: "https://ysrrythubharosa.ap.gov.in/"
    },
    {
      id: "rythu_bandhu",
      name: "Rythu Bandhu",
      benefit: "₹10,000 / Acre / Year",
      rule: (f: any) => f.state === "Telangana",
      reason: "Exclusive to Telangana landowners.",
      documents: ["Digital Signature on Patta", "Bank Details"],
      icon: <MapPin className="text-pink-500" />,
      url: "http://rythubandhu.telangana.gov.in/"
    },
    {
      id: "pm_kusum",
      name: "PM-KUSUM (Solar Pump)",
      benefit: "60% to 90% Subsidy",
      rule: (f: any) => f.irrigation !== "Rain-fed",
      reason: "Requires irrigation source for pump installation.",
      documents: ["Water Source Proof", "Passport Size Photo", "Land Map"],
      icon: <Zap className="text-sky-500" />,
      url: "https://pmkusum.mnre.gov.in/"
    },
    {
      id: "midh",
      name: "Mission for Horticulture",
      benefit: "40% - 50% Capital Subsidy",
      rule: (f: any) => f.crop === "Horticulture" || f.land >= 1,
      reason: "Focuses on high-value fruit and vegetable crops.",
      documents: ["Project Report", "Land Records"],
      icon: <Sprout className="text-lime-600" />,
      url: "https://midh.gov.in/"
    },
    {
      id: "pmfby",
      name: t("scheme_pmfby"),
      benefit: "Full Crop Cover",
      rule: (f: any) => ["Rice", "Wheat", "Maize", "Cotton"].includes(f.crop),
      reason: "Available for notification major crops in notified areas.",
      documents: ["Sowing Certificate", "Bank Passbook", "Land Record"],
      icon: <ShieldIcon className="text-orange-500" />,
      url: "https://pmfby.gov.in/"
    }
  ];


  const steps = ["Personal", "Location", "Farm"];

  const checkEligibility = () => {
    setIsChecking(true);
    setTimeout(() => {
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
    }, 1800);
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

  const downloadEligibilitySummary = () => {
    const doc = new jsPDF();
    const eligible = results.filter(r => r.eligible);
    
    // Header
    doc.setFillColor(16, 185, 129); // Emerald-500
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("SUBSIDY ELIGIBILITY SUMMARY", 105, 25, { align: "center" });
    
    // Farmer Info
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.text(`Farmer Profile: ${farmer.gender}, ${farmer.category}`, 20, 55);
    doc.text(`Location: ${farmer.state}`, 20, 62);
    doc.text(`Land Size: ${farmer.land} Acres`, 20, 69);
    doc.text(`Current Crop: ${farmer.crop}`, 20, 76);
    
    doc.line(20, 85, 190, 85);
    
    // Eligible Schemes
    doc.setFontSize(16);
    doc.text("Qualified Schemes", 20, 100);
    
    let yPos = 115;
    eligible.forEach((scheme, idx) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(`${idx + 1}. ${scheme.name}`, 25, yPos);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(16, 185, 129);
      doc.text(`Benefit: ${scheme.benefit}`, 30, yPos + 7);
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(10);
      doc.text("Required Docs: " + scheme.documents.join(", "), 30, yPos + 14);
      yPos += 25;
      
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
    });
    
    if (eligible.length === 0) {
      doc.text("No matching schemes found based on current profile.", 20, 115);
    }
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("Disclaimer: This is an advisory summary. Final eligibility is determined by the respective government portals.", 105, 285, { align: "center" });
    
    doc.save("Subsidy_Eligibility_Summary.pdf");
    toast({
      title: "Summary Downloaded",
      description: "Your eligibility report is ready.",
    });
  };


  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-10 pb-32">
      {/* STEPPER HEADER */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="flex justify-between mb-2">
          {steps.map((s, i) => (
            <div 
              key={s} 
              className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                i <= currentStep ? "text-emerald-600" : "text-slate-300"
              }`}
            >
              {s}
            </div>
          ))}
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-emerald-500"
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
            className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 mb-12 border border-slate-200 relative overflow-hidden"
          >
            <div className="relative z-10 space-y-12">
              <div className="text-center space-y-2">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                  {t('subsidy_title')}
                </h1>
                <p className="text-slate-500 font-bold">{t('subsidy_subtitle')}</p>
              </div>

              <div className="min-h-[250px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {/* STEP 1: PERSONAL */}
                  {currentStep === 0 && (
                    <motion.div 
                      key="step0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="w-full space-y-8"
                    >
                      <div className="space-y-4">
                        <label className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                           <User size={14} /> {t('gender')}
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                           {["Male", "Female"].map(g => (
                             <button
                               key={g}
                               onClick={() => setFarmer({...farmer, gender: g})}
                               className={`p-4 rounded-2xl font-black transition-all border-2 ${farmer.gender === g ? "bg-emerald-600 text-white border-emerald-600 shadow-lg" : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100"}`}
                             >
                               {t(g.toLowerCase())}
                             </button>
                           ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                           <Users size={14} /> {t('socialCategory')}
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                           {["General", "SC/ST"].map(c => (
                             <button
                               key={c}
                               onClick={() => setFarmer({...farmer, category: c})}
                               className={`p-4 rounded-2xl font-black transition-all border-2 ${farmer.category === c ? "bg-emerald-600 text-white border-emerald-600 shadow-lg" : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
                             >
                               {c}
                             </button>
                           ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: LOCATION */}
                  {currentStep === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="w-full space-y-4"
                    >
                      <label className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <MapPin size={14} /> {t('selectState')}
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
                        {["Andhra Pradesh", "Telangana", "Maharashtra", "Punjab", "Karnataka", "Tamil Nadu", "Gujarat", "Other"].map((s) => (
                          <button
                            key={s}
                            onClick={() => setFarmer({...farmer, state: s})}
                            className={`p-4 rounded-2xl font-bold text-left transition-all border-2 flex justify-between items-center ${
                              farmer.state === s 
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-md" 
                              : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-600"
                            }`}
                          >
                            {s}
                            {farmer.state === s && <CircleCheck size={18} />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: FARM */}
                  {currentStep === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="w-full space-y-8"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                           <label className="text-xs font-black uppercase text-slate-400 tracking-widest">{t('landAreaAcres')}</label>
                           <span className="text-4xl font-black text-emerald-600 italic">
                             {farmer.land} <span className="text-sm not-italic opacity-50">{t('acres')}</span>
                           </span>
                        </div>
                        <input 
                          type="range" min="0.5" max="15" step="0.5"
                          value={farmer.land}
                          onChange={(e) => setFarmer({...farmer, land: parseFloat(e.target.value)})}
                          className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-xs font-black uppercase text-slate-400 tracking-widest">{t('cropSelection')}</label>
                        <label className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">{t('cropSelection')}</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {["Rice", "Wheat", "Cotton", "Maize", "Horticulture"].map(c => (
                            <button
                              key={c}
                              onClick={() => setFarmer({...farmer, crop: c})}
                              className={`p-3 rounded-xl font-bold transition-all border-2 text-sm ${farmer.crop === c ? "bg-emerald-600 text-white border-emerald-600 shadow-lg" : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
                            >
                              {t(c.toLowerCase()) || c}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">{t('irrigationLabel')}</label>
                        <div className="grid grid-cols-3 gap-3">
                          {["Borewell", "Canal", "Rain-fed"].map(i => (
                            <button
                              key={i}
                              onClick={() => setFarmer({...farmer, irrigation: i})}
                              className={`p-3 rounded-xl font-bold transition-all border-2 text-xs ${farmer.irrigation === i ? "bg-emerald-600 text-white border-emerald-600 shadow-lg" : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
                            >
                              {t(i.toLowerCase().replace('-', '_')) || i}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-4 pt-8">
                {currentStep > 0 && (
                  <Button 
                    variant="outline" onClick={prevStep}
                    className="flex-1 rounded-2xl py-7 text-lg font-black border-2 border-slate-100 text-slate-500"
                  >
                    <ArrowLeft size={20} className="mr-2" /> {t("back")}
                  </Button>
                )}
                <Button 
                  onClick={nextStep}
                  disabled={isChecking}
                  className="flex-[2] bg-slate-900 hover:bg-black text-white rounded-2xl py-7 text-xl font-black shadow-xl transition-all active:scale-95 space-x-3"
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
            className="max-w-6xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
               <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">{t('subsidy_results_title')}</h2>
               <div className="flex flex-wrap justify-center gap-2">
                 {[farmer.state, farmer.gender, farmer.category, `${farmer.land} Acres`].map((tag, idx) => (
                   <span key={idx} className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-emerald-100">
                     {tag}
                   </span>
                 ))}
               </div>
               <Button variant="ghost" onClick={reset} className="font-black uppercase text-xs tracking-widest text-emerald-600 hover:bg-emerald-50">
                 {t("startOver")}
               </Button>
               <Button 
                 onClick={downloadEligibilitySummary}
                 className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest ml-4 shadow-lg shadow-emerald-600/20"
               >
                 <FileText className="mr-2 h-4 w-4" /> Download Summary
               </Button>
            </div>

            <div ref={resultsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {results.map((res: any, i: number) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  key={res.id}
                  className={`rounded-[3rem] p-10 border-2 transition-all shadow-xl flex flex-col justify-between gap-10 h-full bg-white relative group ${
                    res.eligible 
                    ? "border-emerald-500/20 shadow-emerald-500/5" 
                    : "border-slate-100 opacity-60"
                  }`}
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-8">
                      <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner ${res.eligible ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
                        {res.icon}
                      </div>
                      <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${res.eligible ? "bg-emerald-600 text-white border-emerald-600" : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                        {res.eligible ? `✅ ${t('subsidy_eligible')}` : `❌ ${t('subsidy_ineligible')}`}
                      </div>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 leading-tight mb-4">{res.name}</h3>
                    <div className="bg-emerald-50 w-fit px-4 py-2 rounded-2xl mb-6">
                       <p className="text-3xl font-black text-emerald-600 italic tracking-tight">{res.benefit}</p>
                    </div>

                    {res.eligible && (
                      <div className="space-y-6">
                        <div className="space-y-3">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                             <ClipboardList size={14} /> {t('requiredDocuments')}
                           </p>
                           <div className="grid grid-cols-1 gap-2">
                              {res.documents.map((doc: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                   <CircleCheck size={16} className="text-emerald-500" />
                                   <span className="text-sm font-bold text-slate-700">{doc}</span>
                                </div>
                              ))}
                           </div>
                        </div>

                        {farmer.gender === "Female" && (
                           <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                              <Award className="text-amber-600 shrink-0" size={20} />
                              <div>
                                 <p className="text-xs font-black text-amber-800 uppercase tracking-tight">{t('womenBenefitNotice')}</p>
                                 <p className="text-[11px] font-medium text-amber-700 leading-tight mt-0.5">Special 10% extra benefit applicable for women farmers.</p>
                              </div>
                           </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 pt-8 border-t border-slate-100">
                    {res.eligible ? (
                      <div className="space-y-4">
                        <Button 
                          onClick={() => window.open(res.url, "_blank")}
                          className="w-full rounded-2xl py-8 bg-slate-900 text-white font-black hover:bg-black transition-all group shadow-xl shadow-slate-200"
                        >
                          {t('subsidy_apply_now')} <ExternalLink className="ml-2 group-hover:scale-110 transition-transform" size={18} />
                        </Button>
                        <p className="text-center text-[10px] font-bold text-slate-400 flex items-center justify-center gap-1.5 uppercase tracking-widest">
                           <Info size={12} /> {t('redirectsToGovernment')}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3 bg-slate-50 p-5 rounded-3xl border border-slate-100">
                        <FileText className="text-slate-400 shrink-0 mt-0.5" size={18} />
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('reason')}</p>
                           <p className="text-xs font-bold text-slate-600 italic leading-relaxed">
                             {res.reason}
                           </p>
                        </div>
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
