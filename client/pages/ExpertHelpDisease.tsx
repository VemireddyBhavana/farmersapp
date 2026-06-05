import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldAlert, Upload, Sparkles, CheckCircle } from "lucide-react";
import axios from "axios";
import { useLanguage } from "@/lib/LanguageContext";

export default function ExpertHelpDisease() {
  const { language, t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type and size (Max 4MB)
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setError(t("validImageError") || "Please upload a valid JPEG or PNG image.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError(t("imageSizeError") || "Image file is too large. Max size is 4MB.");
      return;
    }

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) return;

    setLoading(true);
    setError("");
    setDiagnosis("");

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("language", language === "Telugu" ? "te" : language === "Hindi" ? "hi" : "en");

    try {
      const res = await axios.post("/api/expert-help/disease", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data && res.data.diagnosis) {
        setDiagnosis(res.data.diagnosis);
      } else {
        setError(t("invalidResponseFormat") || "Invalid response format received from server.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(t("failedDiseaseAPI") || "Failed to run disease detection API. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
            <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>{t("aiVisionEngine")}</span>
          </div>
        </div>

        {/* Introduction */}
        <div className="space-y-2">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-tight">
            {t("cropDiseaseDetection")}
          </h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {t("cropDiseaseDesc")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          
          {/* Left Column: Upload Box */}
          <div className="md:col-span-5 space-y-6">
            <form onSubmit={handleUploadSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="file"
                  id="crop-photo-input"
                  className="hidden"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleFileChange}
                  disabled={loading}
                />
                
                <label
                  htmlFor="crop-photo-input"
                  className={`w-full min-h-[300px] border-4 border-dashed rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    preview
                      ? "border-emerald-500/30 bg-emerald-50/10"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500"
                  }`}
                >
                  {preview ? (
                    <div className="w-full h-full space-y-4">
                      <img
                        src={preview}
                        alt="Crop leaf preview"
                        className="max-h-[220px] mx-auto object-cover rounded-2xl border shadow-md"
                      />
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{t("tapToReplaceImage")}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto shadow-inner">
                        <Upload className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">{t("tapToUploadPhoto")}</p>
                        <p className="text-xs font-semibold text-slate-400">{t("acceptsFormat")}</p>
                      </div>
                    </div>
                  )}
                </label>
              </div>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200/50 rounded-2xl text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={!selectedImage || loading}
                className="w-full h-14 bg-slate-900 hover:bg-emerald-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed group active:scale-95"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>{t("analyzing")}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 group-hover:scale-125 transition-transform" />
                    <span>{t("detectDiseaseBtn")}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Diagnosis Card */}
          <div className="md:col-span-7">
            {loading ? (
              <div className="h-full min-h-[350px] bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 border-[6px] border-emerald-50 rounded-full shadow-inner"></div>
                  <div className="w-24 h-24 border-t-[6px] border-emerald-600 rounded-full absolute top-0 animate-spin shadow-md"></div>
                </div>
                <div className="space-y-1">
                  <p className="text-base font-black uppercase tracking-widest text-slate-800 dark:text-white">{t("analyzingPhoto")}</p>
                  <p className="text-xs font-semibold text-emerald-600 animate-pulse">{t("runningVisionModel")}</p>
                </div>
              </div>
            ) : diagnosis ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border dark:border-slate-800 shadow-md space-y-8"
              >
                <div className="flex items-center gap-3 border-b dark:border-slate-800 pb-4">
                  <CheckCircle className="w-7 h-7 text-emerald-600" />
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">{t("aiDiagnosisResults")}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t("analysisComplete")}</p>
                  </div>
                </div>

                <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-semibold space-y-6 whitespace-pre-wrap">
                  {diagnosis}
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[350px] border-4 border-dashed border-slate-100 dark:border-slate-800/40 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-300 dark:text-slate-700 p-8 text-center bg-white/50 dark:bg-slate-900/10">
                <ShieldAlert className="w-14 h-14 text-slate-200 dark:text-slate-700 mb-4" />
                <p className="text-xs font-black uppercase tracking-widest leading-relaxed max-w-xs opacity-60">
                  {t("uploadPrompt")}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
