import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, UserCheck, ExternalLink, Award, FileText } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface SchemeDetails {
  title: string;
  subtitle: string;
  benefits: string[];
  eligibility: string[];
  applyText: string;
  applyLink: string;
}

export default function ExpertHelpSchemes() {
  const { language, t } = useLanguage();

  // Map user language to English, Hindi, or Telugu
  const currentLang = language === "Telugu" ? "te" : language === "Hindi" ? "hi" : "en";

  const translations: Record<string, Record<string, string>> = {
    en: {
      title: "Government Farming Schemes",
      subtitle: "Detailed information about major central and state agricultural support systems, eligibility criteria, and quick application links.",
      benefitsTitle: "Benefits & Support",
      eligibilityTitle: "Who is Eligible?",
      applyBtn: "Official Portal / Apply Link",
      back: "Back",
    },
    hi: {
      title: "सरकारी कृषि योजनाएं",
      subtitle: "प्रमुख केंद्रीय और राज्य कृषि सहायता प्रणालियों, पात्रता मानदंडों और त्वरित आवेदन लिंक के बारे में विस्तृत जानकारी।",
      benefitsTitle: "लाभ और सहायता",
      eligibilityTitle: "कौन पात्र है?",
      applyBtn: "आधिकारिक पोर्टल / आवेदन लिंक",
      back: "पीछे",
    },
    te: {
      title: "ప్రభుత్వ వ్యవసాయ పథకాలు",
      subtitle: "ప్రధాన కేంద్ర మరియు రాష్ట్ర వ్యవసాయ సహాయ వ్యవస్థలు, అర్హత ప్రమాణాలు మరియు త్వరిత దరఖాస్తు లింకుల గురించిన వివరణాత్మక సమాచారం.",
      benefitsTitle: "ప్రయోజనాలు & మద్దతు",
      eligibilityTitle: "ఎవరు అర్హులు?",
      applyBtn: "అధికారిక పోర్టల్ / దరఖాస్తు లింక్",
      back: "వెనుకకు",
    }
  };

  const text = translations[currentLang] || translations.en;

  const schemesData: Record<string, SchemeDetails[]> = {
    en: [
      {
        title: "PM-KISAN",
        subtitle: "Pradhan Mantri Kisan Samman Nidhi",
        benefits: [
          "Direct income support of ₹6,000 per year paid in three equal installments of ₹2,000.",
          "Funds are deposited directly into the bank accounts of the farmers (DBT).",
          "Helps cover domestic needs and agricultural input costs during crop seasons."
        ],
        eligibility: [
          "All small and marginal landholding farmer families having cultivable land in their names.",
          "Excludes institutional landholders, income tax payers, and high-pension retired professionals."
        ],
        applyText: "Official PM-KISAN Portal",
        applyLink: "https://pmkisan.gov.in/"
      },
      {
        title: "PM Fasal Bima Yojana",
        subtitle: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        benefits: [
          "Comprehensive insurance coverage against crop losses due to natural disasters, pests, or diseases.",
          "Extremely low premium rates: 2% for Kharif crops, 1.5% for Rabi, and 5% for commercial/horticultural crops.",
          "Fast settlement claims paid directly to the bank account."
        ],
        eligibility: [
          "All farmers including sharecroppers and tenant farmers growing the notified crops in the notified areas.",
          "Applicable for both loanee and non-loanee farmers."
        ],
        applyText: "PMFBY Insurance Portal",
        applyLink: "https://pmfby.gov.in/"
      },
      {
        title: "Kisan Credit Card (KCC)",
        subtitle: "Subsidized Agriculture Credit & Loans",
        benefits: [
          "Access to short-term loans at low interest rates starting from 4% (with 3% prompt repayment incentive).",
          "Flexible repayment options aligned with harvesting and marketing periods.",
          "Covers cultivation expenses, post-harvest requirements, and maintenance of farm assets."
        ],
        eligibility: [
          "All farmers (individual or joint cultivators).",
          "Tenant farmers, oral lessees, sharecroppers, and self-help groups (SHGs) are also fully eligible."
        ],
        applyText: "KCC Application Portal",
        applyLink: "https://www.sbi.co.in/web/personal-banking/loans/agriculture-rural-loans/kisan-credit-card"
      },
      {
        title: "eNAM",
        subtitle: "Electronic National Agriculture Market",
        benefits: [
          "Online unified trading portal connecting physical APMC mandis nationwide.",
          "Ensures transparent bidding to help farmers secure higher prices for their produce.",
          "Free access to real-time market prices, online payments, and quality testing labs."
        ],
        eligibility: [
          "Any farmer, trader, or commission agent registered with a participating APMC mandi.",
          "Requires a bank account and land/identity documentation."
        ],
        applyText: "eNAM Official Website",
        applyLink: "https://enam.gov.in/"
      }
    ],
    hi: [
      {
        title: "पीएम-किसान",
        subtitle: "प्रधानमंत्री किसान सम्मान निधि",
        benefits: [
          "₹6,000 प्रति वर्ष की प्रत्यक्ष आय सहायता, ₹2,000 की तीन समान किस्तों में दी जाती है।",
          "राशि सीधे किसानों के बैंक खातों में जमा की जाती है (DBT)।",
          "फसल सीजन के दौरान घरेलू जरूरतों और कृषि इनपुट लागतों को पूरा करने में मदद करता है।"
        ],
        eligibility: [
          "सभी छोटे और सीमांत भूमिधारक किसान परिवार जिनके नाम पर कृषि योग्य भूमि है।",
          "संस्थागत भूमिधारकों, आयकर दाताओं और उच्च पेंशन प्राप्त करने वाले सेवामुक्त लोगों को बाहर रखा गया है।"
        ],
        applyText: "पीएम-किसान आधिकारिक पोर्टल",
        applyLink: "https://pmkisan.gov.in/"
      },
      {
        title: "पीएम फसल बीमा योजना",
        subtitle: "प्रधानमंत्री फसल बीमा योजना (PMFBY)",
        benefits: [
          "प्राकृतिक आपदाओं, कीटों या बीमारियों के कारण फसल नुकसान के खिलाफ व्यापक बीमा कवरेज।",
          "बेहद कम प्रीमियम दरें: खरीफ फसलों के लिए 2%, रबी के लिए 1.5%, और वाणिज्यिक/बागवानी फसलों के लिए 5%।",
          "तेजी से दावों का निपटान सीधे बैंक खाते में किया जाता है।"
        ],
        eligibility: [
          "अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले बटाईदार और काश्तकार किसानों सहित सभी किसान।",
          "ऋणी और गैर-ऋणी दोनों किसानों के लिए लागू।"
        ],
        applyText: "पीएमएफबीवाई बीमा पोर्टल",
        applyLink: "https://pmfby.gov.in/"
      },
      {
        title: "किसान क्रेडिट कार्ड (KCC)",
        subtitle: "रियायती कृषि ऋण",
        benefits: [
          "4% से शुरू होने वाली कम ब्याज दरों पर अल्पकालिक ऋण की उपलब्धता (3% शीघ्र पुनर्भुगतान प्रोत्साहन के साथ)।",
          "कटाई और विपणन अवधि के अनुरूप लचीले पुनर्भुगतान विकल्प।",
          "खेती के खर्चों, फसल कटाई के बाद की जरूरतों और कृषि संपत्तियों के रखरखाव को कवर करता है।"
        ],
        eligibility: [
          "सभी किसान (व्यक्तिगत या संयुक्त किसान)।",
          "काश्तकार किसान, मौखिक पट्टेदार, बटाईदार और स्वयं सहायता समूह (SHGs) भी पूरी तरह पात्र हैं।"
        ],
        applyText: "केसीसी आवेदन पोर्टल",
        applyLink: "https://www.sbi.co.in/web/personal-banking/loans/agriculture-rural-loans/kisan-credit-card"
      },
      {
        title: "ई-नाम (eNAM)",
        subtitle: "राष्ट्रीय कृषि बाजार (इलेक्ट्रॉनिक)",
        benefits: [
          "देश भर की भौतिक एपीएमसी मंडियों को जोड़ने वाला ऑनलाइन एकीकृत व्यापार पोर्टल।",
          "किसानों को अपनी उपज के लिए उच्च मूल्य प्राप्त करने में मदद करने के लिए पारदर्शी बोली सुनिश्चित करता है।",
          "वास्तविक समय के बाजार मूल्यों, ऑनलाइन भुगतान और गुणवत्ता परीक्षण प्रयोगशालाओं तक मुफ्त पहुंच।"
        ],
        eligibility: [
          "भागीदार एपीएमसी मंडी में पंजीकृत कोई भी किसान, व्यापारी या कमीशन एजेंट।",
          "बैंक खाते और भूमि/पहचान संबंधी दस्तावेजों की आवश्यकता होती है।"
        ],
        applyText: "ई-नाम आधिकारिक वेबसाइट",
        applyLink: "https://enam.gov.in/"
      }
    ],
    te: [
      {
        title: "పీఎం-కిసాన్",
        subtitle: "ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి",
        benefits: [
          "సంవత్సరానికి ₹6,000 ప్రత్యక్ష ఆదాయ సహాయం, ₹2,000 చొప్పున మూడు సమాన వాయిదాలలో చెల్లించబడుతుంది.",
          "నిధులు నేరుగా రైతుల బ్యాంక్ ఖాతాల్లో జమ చేయబడతాయి (DBT).",
          "పంట కాలంలో గృహావసరాలు మరియు సాగు పెట్టుబడి ఖర్చులను కవర్ చేయడానికి సహాయపడుతుంది."
        ],
        eligibility: [
          "తమ పేరు మీద సాగు చేయదగిన భూమి ఉన్న చిన్న మరియు సన్నకారు రైతు కుటుంబాలందరూ.",
          "సంస్థాగత భూస్వాములు, ఆదాయపు పన్ను చెల్లింపుదారులు మరియు అధిక పెన్షన్ పొందే పదవీ విరమణ పొందిన నిపుణులు మినహాయించబడ్డారు."
        ],
        applyText: "అధికారిక పీఎం-కిసాన్ పోర్టల్",
        applyLink: "https://pmkisan.gov.in/"
      },
      {
        title: "పీఎం ఫసల్ బీమా యోజన",
        subtitle: "ప్రధాన మంత్రి ఫసల్ బీమా యోజన (PMFBY)",
        benefits: [
          "సహజ విపత్తులు, తెగుళ్లు లేదా వ్యాధుల వల్ల పంట నష్టాలకు వ్యతిరేకంగా సమగ్ర భీమా రక్షణ.",
          "చాలా తక్కువ ప్రీమియం రేట్లు: ఖరీఫ్ పంటలకు 2%, రబీ పంటలకు 1.5%, మరియు వాణిజ్య/తోట పంటలకు 5%.",
          "వేగవంతమైన క్లెయిమ్‌ల పరిష్కారం నేరుగా బ్యాంక్ ఖాతాకు బదిలీ చేయబడుతుంది."
        ],
        eligibility: [
          "నోటిఫైడ్ ప్రాంతాలలో నోటిఫైడ్ పంటలను పండించే కౌలుదారులు మరియు భాగస్వామ్య రైతులతో సహా రైతులందరూ.",
          "రుణం తీసుకున్న మరియు తీసుకోని ఇరు రైతులకూ వర్తిస్తుంది."
        ],
        applyText: "పీఎంఎఫ్‌బీవై బీమా పోర్టల్",
        applyLink: "https://pmfby.gov.in/"
      },
      {
        title: "కిసాన్ క్రెడిట్ కార్డ్ (KCC)",
        subtitle: "సబ్సిడీతో కూడిన వ్యవసాయ రుణాలు",
        benefits: [
          "4% ప్రారంభ వడ్డీ రేటుతో స్వల్పకాలిక రుణాల సదుపాయం (సకాలంలో తిరిగి చెల్లిస్తే 3% అదనపు రాయితీ).",
          "పంట కోత మరియు మార్కెటింగ్ సమయాలకు అనుగుణంగా సరళమైన తిరిగి చెల్లింపు ఎంపికలు.",
          "వ్యవసాయ ఖర్చులు, పంటకోత అనంతర అవసరాలు మరియు వ్యవసాయ ఆస్తుల నిర్వహణను కవర్ చేస్తుంది."
        ],
        eligibility: [
          "రైతులందరూ (వ్యక్తిగత లేదా ఉమ్మడి సాగుదారులు).",
          "కౌలు రైతులు, మౌఖిక లీజుదారులు, భాగస్వామ్య సాగుదారులు మరియు స్వయం సహాయక బృందాలు (SHGs) కూడా అర్హులు."
        ],
        applyText: "కేసీసీ దరఖాస్తు పోర్టల్",
        applyLink: "https://www.sbi.co.in/web/personal-banking/loans/agriculture-rural-loans/kisan-credit-card"
      },
      {
        title: "ఈ-నామ్ (eNAM)",
        subtitle: "ఎలక్ట్రానిక్ నేషనల్ అగ్రికల్చర్ మార్కెట్",
        benefits: [
          "దేశవ్యాప్తంగా భౌతిక ఏపీఎంసీ (APMC) మార్కెట్లను అనుసంధానించే ఆన్‌లైన్ ట్రేడింగ్ పోర్టల్.",
          "రైతులకు వారి పంటలకు మంచి ధరలు లభించేలా పారదర్శకమైన బిడ్డింగ్‌ను నిర్ధారిస్తుంది.",
          "నిజ సమయ మార్కెట్ ధరలు, ఆన్‌లైన్ చెల్లింపులు మరియు నాణ్యత పరీక్షల సమాచారం ఉచితంగా లభిస్తుంది."
        ],
        eligibility: [
          "పాల్గొనే ఏపీఎంసీ మార్కెట్లో నమోదు చేసుకున్న ఏ రైతు, వ్యాపారి లేదా కమీషన్ ఏజెంట్ అయినా.",
          "బ్యాంక్ ఖాతా మరియు భూమి/గుర్తింపు పత్రాలు తప్పనిసరి."
        ],
        applyText: "ఈ-నామ్ అధికారిక వెబ్‌సైట్",
        applyLink: "https://enam.gov.in/"
      }
    ]
  };

  const schemes = schemesData[currentLang] || schemesData.en;

  return (
    <div className="min-h-screen bg-[#f0fdf4]/30 dark:bg-slate-950 pb-20 pt-24 text-slate-900 dark:text-slate-100 font-sans">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between flex-shrink-0">
          <Link to="/expert-consult" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors font-bold text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>{text.back}</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
            <Award className="w-4 h-4 text-emerald-500" />
            <span>National Schemes</span>
          </div>
        </div>

        {/* Title & Sub */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-tight">
            {text.title}
          </h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
            {text.subtitle}
          </p>
        </div>

        {/* Schemes List Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {schemes.map((scheme, idx) => (
            <motion.div
              key={scheme.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
              className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-emerald-500/20 transition-all group"
            >
              <div className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-900/30">
                    <FileText className="w-3.5 h-3.5" />
                    Government Scheme
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-3 leading-none group-hover:text-emerald-600 transition-colors">
                    {scheme.title}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1">
                    {scheme.subtitle}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{text.benefitsTitle}</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                    {scheme.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eligibility */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{text.eligibilityTitle}</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                    {scheme.eligibility.map((el, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                        <span>{el}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 mt-auto">
                <a
                  href={scheme.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-md flex items-center justify-center gap-2 group/btn"
                >
                  <span>{scheme.applyText}</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
