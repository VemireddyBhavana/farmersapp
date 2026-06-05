import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageSquare, ShieldAlert, CloudSun, ScrollText, ArrowRight, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Card } from "@/components/ui/card";

export default function ExpertHelpFull() {
  const { t } = useLanguage();

  const modules = [
    {
      title: t("voiceAndChatExpert") || "Voice & Chat Expert",
      description: t("voiceChatDesc") || "Ask agricultural questions by voice or text. Get immediate help in Telugu, Hindi, or English.",
      icon: MessageSquare,
      path: "/expert-consult/voice",
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400",
      btnText: t("openVoiceChat") || "Open Voice & Chat",
    },
    {
      title: t("cropDiseaseDetection") || "Crop Disease Detection",
      description: t("diseaseDetectDesc") || "Upload a photo of your crop's leaf to detect pests/diseases and get step-by-step treatment tips.",
      icon: ShieldAlert,
      path: "/expert-consult/disease",
      color: "from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400",
      btnText: t("openDetector") || "Open Disease Detector",
    },
    {
      title: t("weatherAdviceTitle") || "Weather Advice",
      description: t("weatherAdviceDesc") || "Get live regional weather updates along with AI-generated farming advice and critical alerts.",
      icon: CloudSun,
      path: "/expert-consult/weather",
      color: "from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400",
      btnText: t("openWeather") || "Open Weather Tips",
    },
    {
      title: t("governmentSchemesTitle") || "Government Schemes",
      description: t("governmentSchemesDesc") || "Find benefits, direct payouts, and low-interest loans from PM-KISAN, PMFBY, KCC, and eNAM.",
      icon: ScrollText,
      path: "/expert-consult/schemes",
      color: "from-purple-500/20 to-indigo-500/20 text-purple-600 dark:text-purple-400",
      btnText: t("openSchemes") || "Open Schemes List",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f0fdf4]/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-24 pt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Hero Section */}
        <section className="text-center space-y-4 pt-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-200/50"
          >
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            {t("empoweringFarmers") || "Empowering Farmers"}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white"
          >
            {t("expertHelpHubTitle") || "Farmer Expert Help Hub"}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium"
          >
            {t("expertHelpHubSub") || "Free AI-powered agricultural advisor for farmers in Andhra Pradesh. Get direct answers to your farming needs at ₹0 cost."}
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-3 pt-4 text-xs font-black uppercase tracking-widest"
          >
            <span className="px-4 py-2 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-full shadow-sm">🌱 Free to Use</span>
            <span className="px-4 py-2 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-full shadow-sm">🗣️ Works in Telugu</span>
            <span className="px-4 py-2 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-full shadow-sm">🎙️ Voice Support</span>
          </motion.div>
        </section>

        {/* 2x2 Grid Modules */}
        <section className="grid gap-8 md:grid-cols-2">
          {modules.map((m, idx) => (
            <motion.div
              key={m.path}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
              whileHover={{ y: -6 }}
            >
              <Card className="h-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
                <div className="space-y-6">
                  {/* Icon with custom gradient background */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center shadow-inner`}>
                    <m.icon className="h-7 w-7" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-semibold">
                      {m.description}
                    </p>
                  </div>
                </div>

                <div className="pt-8">
                  <Link to={m.path}>
                    <button className="w-full h-14 bg-slate-900 hover:bg-emerald-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-md flex items-center justify-center gap-2 group/btn">
                      {m.btnText}
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </section>

      </div>
    </div>
  );
}
