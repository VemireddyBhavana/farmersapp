import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, CloudSun, RefreshCw, Thermometer, Droplets, Wind, AlertTriangle, ShieldCheck, Sun } from "lucide-react";
import axios from "axios";
import { useLanguage } from "@/lib/LanguageContext";

export default function ExpertHelpWeather() {
  const { language, t } = useLanguage();
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/weather?city=Kurnool");
      if (res.data) {
        setWeather(res.data);
      } else {
        setError(t("invalidResponseFormat") || "Invalid response format received from weather service.");
      }
    } catch (err) {
      console.error("Failed to fetch weather:", err);
      setError(t("voiceError") || "Unable to connect to meteorological servers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getLocalizedWeatherAdvisory = (advisory: string) => {
    if (!advisory) return "";
    const advDict: Record<string, Record<string, string>> = {
      Telugu: {
        "Rain detected. Suspend irrigation. Ensure drainage channels in cotton/chilli fields are clear.": "వర్షం నమోదైంది. నీటిపారుదలని నిలిపివేయండి. పత్తి/మిరప పొలాల్లో నీరు నిల్వ ఉండకుండా డ్రైనేజీ కాలువలు శుభ్రంగా ఉంచుకోండి.",
        "Extreme heat. Critical irrigation required for young saplings. Apply mulch to conserve soil moisture.": "తీవ్రమైన వేడి. చిన్న మొక్కలకు తక్షణ నీటిపారుదల అవసరం. నేల తేమను కాపాడటానికి మల్చింగ్ వేయండి.",
        "Soil moisture is low. Scheduled irrigation recommended before peak noon.": "నేల తేమ తక్కువగా ఉంది. మధ్యాహ్నం వేడి పెరగక ముందే నీటిపారుదల చేయవలసిందిగా సిఫార్సు చేయబడింది.",
        "Vegetation vigor is below optimal. Satellite data suggests potential nutrient stress.": "పంట ఎదుగుదల ఆశించిన స్థాయిలో లేదు. శాటిలైట్ సమాచారం ప్రకారం పోషకాల లోపం ఉండే అవకాశం ఉంది.",
        "High humidity alert. Risk of pest infestation increases. Monitor crop leaves for fungal spots.": "అధిక తేమ హెచ్చరిక. తెగుళ్లు ఆశించే ప్రమాదం ఉంది. శిలీంధ్ర మచ్చల కోసం ఆకులను గమనించండి.",
        "Ideal conditions for field work. Good window for fertilizer application and harvesting.": "క్షేత్ర పనులకు అనుకూలమైన పరిస్థితులు. ఎరువులు వేయడానికి మరియు పంట కోతకు ఇది మంచి సమయం."
      },
      Hindi: {
        "Rain detected. Suspend irrigation. Ensure drainage channels in cotton/chilli fields are clear.": "बारिश दर्ज की गई। सिंचाई स्थगित करें। कपास/मिर्च के खेतों में जल निकासी नालियों को साफ रखें।",
        "Extreme heat. Critical irrigation required for young saplings. Apply mulch to conserve soil moisture.": "अत्यधिक गर्मी। छोटे पौधों के लिए महत्वपूर्ण सिंचाई आवश्यक है। मिट्टी की नमी बनाए रखने के लिए मल्चिंग लगाएं।",
        "Soil moisture is low. Scheduled irrigation recommended before peak noon.": "मिट्टी की नमी कम है। दोपहर की गर्मी से पहले निर्धारित सिंचाई की सलाह दी जाती है।",
        "Vegetation vigor is below optimal. Satellite data suggests potential nutrient stress.": "वनस्पति का स्वास्थ्य अनुकूल से कम है। उपग्रह डेटा संभावित पोषक तत्वों की कमी का संकेत देता है।",
        "High humidity alert. Risk of pest infestation increases. Monitor crop leaves for fungal spots.": "उच्च आर्द्रता की चेतावनी। कीटों के प्रकोप का खतरा बढ़ जाता है। फंगल धब्बों के लिए फसल की पत्तियों की निगरानी करें।",
        "Ideal conditions for field work. Good window for fertilizer application and harvesting.": "खेत के काम के लिए आदर्श परिस्थितियां। उर्वरक प्रयोग और कटाई के लिए अच्छा समय है।"
      }
    };

    const set = advDict[language];
    if (set && set[advisory]) {
      return set[advisory];
    }
    return advisory;
  };

  const getLocalizedAlert = (alert: any) => {
    if (!alert) return alert;
    const alertDict: Record<string, { type: Record<string, string>; suggestion: Record<string, string>; level: Record<string, string> }> = {
      Telugu: {
        type: {
          "Heat Wave": "తీవ్ర వడగాల్పులు",
          "High Winds": "ఈదురు గాలులు",
          "Rain Probability": "వర్ష సూచన"
        },
        level: {
          "Critical": "అత్యంత ప్రమాదకరం",
          "Caution": "జాగ్రత్త",
          "Warning": "హెచ్చరిక"
        },
        suggestion: {
          "Limit outdoor work between 11 AM - 4 PM.": "ఉదయం 11 గంటల నుండి సాయంత్రం 4 గంటల మధ్య బయట పనులు తగ్గించండి.",
          "Avoid pesticide spraying to prevent drift.": "మందు పిచికారీ కొట్టుకుపోకుండా నివారించడానికి పిచికారీ చేయడం నిలిపివేయండి.",
          "60%+ chance of rain. Secure harvested crops.": "60% కంటే ఎక్కువ వర్షపాత అవకాశం ఉంది. కోసిన పంటను సురక్షిత ప్రదేశంలో ఉంచండి."
        }
      },
      Hindi: {
        type: {
          "Heat Wave": "लू (हीट वेव)",
          "High Winds": "तेज हवाएं",
          "Rain Probability": "बारिश की संभावना"
        },
        level: {
          "Critical": "गंभीर",
          "Caution": "सावधानी",
          "Warning": "चेतावनी"
        },
        suggestion: {
          "Limit outdoor work between 11 AM - 4 PM.": "सुबह 11 बजे से शाम 4 बजे के बीच बाहरी काम सीमित करें।",
          "Avoid pesticide spraying to prevent drift.": "छिड़काव बह जाने से बचाने के लिए कीटनाशक छिड़काव से बचें।",
          "60%+ chance of rain. Secure harvested crops.": "60%+ बारिश की संभावना। कटी हुई फसलों को सुरक्षित करें।"
        }
      }
    };

    const set = alertDict[language];
    if (set) {
      return {
        type: set.type[alert.type] || alert.type,
        level: set.level[alert.level] || alert.level,
        suggestion: set.suggestion[alert.suggestion] || alert.suggestion
      };
    }
    return alert;
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4]/30 dark:bg-slate-950 pb-20 pt-24 text-slate-900 dark:text-slate-100 font-sans">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0">
          <Link to="/expert-consult" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors font-bold text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>{t("back")}</span>
          </Link>
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="p-3 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-colors text-slate-500 hover:text-emerald-600 disabled:opacity-50"
            title="Refresh Weather Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-tight">
            {t("weatherAdviceTitle")}
          </h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {t("weatherAdviceDesc")}
          </p>
        </div>

        {loading ? (
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-16 border dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-50 border-t-emerald-600 rounded-full animate-spin"></div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">{t("syncingWeatherData")}</p>
          </div>
        ) : error ? (
          <div className="p-8 bg-red-50 dark:bg-red-950/20 border border-red-200/50 rounded-3xl text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
            <p className="text-sm font-bold text-red-700 dark:text-red-400">{error}</p>
            <button
              onClick={fetchWeather}
              className="h-12 px-6 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all"
            >
              {t("retryConnection")}
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Main Weather Card */}
            <div className="grid gap-6 sm:grid-cols-3">
              {/* Temperature */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner">
                  <Thermometer className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t("temperature")}</p>
                  <p className="text-3xl font-black italic tracking-tighter leading-none mt-1">{weather.current?.temp}°C</p>
                </div>
              </div>

              {/* Humidity */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t("humidity")}</p>
                  <p className="text-3xl font-black italic tracking-tighter leading-none mt-1">{weather.current?.humidity}%</p>
                </div>
              </div>

              {/* Wind Speed */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-500/10 text-teal-600 rounded-2xl flex items-center justify-center shadow-inner">
                  <Wind className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t("windSpeed")}</p>
                  <p className="text-3xl font-black italic tracking-tighter leading-none mt-1">{weather.current?.wind_speed} <span className="text-[10px] font-bold">km/h</span></p>
                </div>
              </div>
            </div>

            {/* AI Farming Advisory Card */}
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-xl border border-white/5">
              <div className="absolute right-0 top-0 p-12 opacity-[0.03] scale-150 rotate-12 pointer-events-none">
                <CloudSun size={180} />
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="h-14 w-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Sun className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black italic uppercase tracking-tighter leading-none">{t("farmingWeatherAdvisory")}</h3>
                  <p className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mt-1.5">{t("hyperLocalAdvisoryEngine")}</p>
                </div>
              </div>

              <div className="space-y-6 text-slate-300 font-semibold italic text-base leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10 shadow-inner">
                {getLocalizedWeatherAdvisory(weather.advisory)}
              </div>
            </div>

            {/* Critical Alerts */}
            {weather.alerts && weather.alerts.length > 0 && (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200/50 rounded-3xl p-8 space-y-4">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-black text-xs uppercase tracking-widest">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <span>{t("criticalWeatherAlerts")}</span>
                </div>
                <div className="space-y-3">
                  {weather.alerts.map((a: any, i: number) => {
                    const locAlert = getLocalizedAlert(a);
                    return (
                      <div key={i} className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed pl-7 relative">
                        <div className="absolute left-1.5 top-2 w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                        <strong>{locAlert.type} ({locAlert.level})</strong>: {locAlert.suggestion}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Conditions Satisfied Card */}
            <div className="p-6 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-normal">
                {t("weatherRefreshNote")}
              </p>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
