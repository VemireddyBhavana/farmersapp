import { motion } from "framer-motion";
import { Stethoscope, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import DiseaseDetection from "@/components/DiseaseDetection";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";

export default function CropDoctor() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <div className="bg-[#106A3A] text-white py-12 px-4 mb-8 relative overflow-hidden">
        <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4">
            <Link to="/dashboard">
              <Button variant="ghost" className="text-white hover:bg-white/10 p-0 h-auto font-bold flex items-center gap-2 mb-4">
                <ArrowLeft className="h-5 w-5" /> {t('navDashboard')}
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black">{t('aiCropDoctor')}</h1>
                <p className="text-emerald-100 font-medium">{t('aiCropDoctorDesc')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-[-5%] bottom-[-20%] opacity-10">
           <Stethoscope className="h-64 w-64 text-white -rotate-12" />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DiseaseDetection />
        </motion.div>
      </div>
    </div>
  );
}
