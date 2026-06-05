import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, CloudSun, RefreshCw, Thermometer, Droplets, Wind, AlertTriangle, ShieldCheck, Sun } from "lucide-react";
import axios from "axios";
import { useLanguage } from "@/lib/LanguageContext";

export default function ExpertHelpWeather() {
  const { t } = useLanguage();
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
        setError("Invalid response format received from weather service.");
      }
    } catch (err) {
      console.error("Failed to fetch weather:", err);
      setError("Unable to connect to meteorological servers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-[#f0fdf4]/30 dark:bg-slate-950 pb-20 pt-24 text-slate-900 dark:text-slate-100 font-sans">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0">
          <Link to="/expert-consult" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors font-bold text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>{t("back") || "Back"}</span>
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
            {t("weatherAdviceTitle") || "Farming Weather Advice"}
          </h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Real-time atmospheric analysis and micro-climate indicators synchronized to provide customized irrigation, spraying, and seeding advice.
          </p>
        </div>

        {loading ? (
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-16 border dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-50 border-t-emerald-600 rounded-full animate-spin"></div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Syncing Weather Datasets...</p>
          </div>
        ) : error ? (
          <div className="p-8 bg-red-50 dark:bg-red-950/20 border border-red-200/50 rounded-3xl text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
            <p className="text-sm font-bold text-red-700 dark:text-red-400">{error}</p>
            <button
              onClick={fetchWeather}
              className="h-12 px-6 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all"
            >
              Retry Connection
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
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Temperature</p>
                  <p className="text-3xl font-black italic tracking-tighter leading-none mt-1">{weather.current?.temp}°C</p>
                </div>
              </div>

              {/* Humidity */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Humidity</p>
                  <p className="text-3xl font-black italic tracking-tighter leading-none mt-1">{weather.current?.humidity}%</p>
                </div>
              </div>

              {/* Wind Speed */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-500/10 text-teal-600 rounded-2xl flex items-center justify-center shadow-inner">
                  <Wind className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Wind Speed</p>
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
                  <h3 className="text-xl font-black italic uppercase tracking-tighter leading-none">Farming Weather Advisory</h3>
                  <p className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mt-1.5">Hyper-Local Advisory Engine</p>
                </div>
              </div>

              <div className="space-y-6 text-slate-300 font-semibold italic text-base leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10 shadow-inner">
                {weather.advisory}
              </div>
            </div>

            {/* Critical Alerts */}
            {weather.alerts && weather.alerts.length > 0 && (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200/50 rounded-3xl p-8 space-y-4">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-black text-xs uppercase tracking-widest">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <span>Critical Weather Alerts</span>
                </div>
                <div className="space-y-3">
                  {weather.alerts.map((a: any, i: number) => (
                    <div key={i} className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed pl-7 relative">
                      <div className="absolute left-1.5 top-2 w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                      <strong>{a.type} ({a.level})</strong>: {a.suggestion}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Conditions Satisfied Card */}
            <div className="p-6 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-normal">
                Weather datasets are refreshed every 10 minutes from local agricultural monitoring stations.
              </p>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
