import React from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  TrendingUp, 
  FlaskConical, 
  ShieldCheck, 
  Tractor, 
  Sprout, 
  PhoneCall, 
  CloudSun, 
  Leaf, 
  Flower2, 
  Dog, 
  ArrowLeft 
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "pm-kisan",
    titleKey: "pmKisan",
    icon: Building2,
    color: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-500",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800",
    url: "https://pmkisan.gov.in/"
  },
  {
    id: "mandi-prices",
    titleKey: "mandiPrices",
    icon: TrendingUp,
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&q=80&w=800",
    url: "https://agmarknet.gov.in/"
  },
  {
    id: "fertilizers",
    titleKey: "fertilizers",
    icon: FlaskConical,
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
    image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=800",
    url: "https://urvarak.nic.in/"
  },
  {
    id: "crop-insurance",
    titleKey: "cropInsurance",
    icon: ShieldCheck,
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
    url: "https://pmfby.gov.in/"
  },
  {
    id: "farm-machinery",
    titleKey: "farmMachinery",
    icon: Tractor,
    color: "from-red-500/20 to-rose-500/20",
    iconColor: "text-red-500",
    image: "https://images.unsplash.com/photo-1579471122538-466f287e0767?auto=format&fit=crop&q=80&w=800",
    url: "https://farmech.dac.gov.in/"
  },
  {
    id: "seeds",
    titleKey: "seeds",
    icon: Sprout,
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-500",
    image: "https://images.unsplash.com/photo-1599819177626-b50f9dd21c9b?auto=format&fit=crop&q=80&w=800",
    url: "https://seednet.gov.in/"
  },
  {
    id: "soil-health",
    titleKey: "soilHealth",
    icon: FlaskConical,
    color: "from-sky-500/20 to-blue-500/20",
    iconColor: "text-sky-500",
    image: "https://images.unsplash.com/photo-1596733430284-f7423fb73988?auto=format&fit=crop&q=80&w=800",
    url: "https://soilhealth.dac.gov.in/"
  },
  {
    id: "advisory",
    titleKey: "advisory",
    icon: CloudSun,
    color: "from-yellow-500/20 to-amber-500/20",
    iconColor: "text-yellow-500",
    image: "https://images.unsplash.com/photo-1589923188902-7a71092e0388?auto=format&fit=crop&q=80&w=800",
    url: "https://mkisan.gov.in/"
  },
  {
    id: "organic-farming",
    titleKey: "organicFarming",
    icon: Leaf,
    color: "from-lime-500/20 to-green-500/20",
    iconColor: "text-lime-500",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4af?auto=format&fit=crop&q=80&w=800",
    url: "https://pgsindia-ncof.gov.in/"
  },
  {
    id: "horticulture",
    titleKey: "horticulture",
    icon: Flower2,
    color: "from-fuchsia-500/20 to-purple-500/20",
    iconColor: "text-fuchsia-500",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=800",
    url: "https://nhb.gov.in/"
  },
  {
    id: "animal-husbandry",
    titleKey: "animalHusbandry",
    icon: Dog,
    color: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-500",
    image: "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?auto=format&fit=crop&q=80&w=800",
    url: "https://dahd.nic.in/"
  },
  {
    id: "official-contacts",
    titleKey: "officialContacts",
    icon: PhoneCall,
    color: "from-slate-500/20 to-gray-500/20",
    iconColor: "text-slate-500",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800",
    url: "https://kisansuvidha.gov.in/contactus"
  }
];

export default function KisanSuvidhaPortal() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-[#106A3A]">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mt-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/20"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-4"
          >
            <Link 
              to="/" 
              className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 transition-all mb-4"
            >
              <ArrowLeft className="w-4 h-4 text-white group-hover:-translate-x-1 transition-transform" />
              <span className="text-white text-sm font-bold uppercase tracking-wider">{t('navHome')}</span>
            </Link>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-xl">
              {t('kisanSuvidhaTitle')}
            </h1>
            <p className="text-emerald-50 text-xl md:text-2xl font-medium max-w-2xl opacity-90 leading-relaxed italic">
              — {t('kisanSuvidhaSubtitle')} —
            </p>
          </motion.div>
        </div>

        {/* Floating background elements */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 -mt-16 pb-24 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.a
              key={service.id}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative h-[380px] bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 hover:shadow-emerald-900/10 transition-all duration-500 overflow-hidden border border-slate-100"
            >
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={service.image} 
                  alt={t(service.titleKey)} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60 grayscale-[50%] group-hover:grayscale-0"
                />
                <div className={cn("absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent transition-opacity duration-500", service.color)}></div>
              </div>

              {/* Card Content */}
              <div className="relative z-10 h-full p-8 flex flex-col items-center text-center">
                <div className={cn(
                  "w-16 h-16 rounded-[1.5rem] mb-6 flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-12",
                  "bg-white border-2 border-slate-100",
                  service.iconColor
                )}>
                  <service.icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-black text-slate-800 leading-tight mb-4 group-hover:text-emerald-700 transition-colors">
                  {t(service.titleKey)}
                </h3>
                
                <div className="mt-auto w-full">
                  <div className="h-1 w-12 bg-emerald-500 rounded-full mx-auto mb-6 group-hover:w-24 transition-all duration-500"></div>
                  <button className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-900/20 group-hover:bg-emerald-600 group-hover:shadow-emerald-600/30 transition-all">
                    {t('applyNow')}
                  </button>
                </div>
              </div>

              {/* Subtle glass effect overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/5 backdrop-blur-[2px]"></div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Footer / Contact Banner */}
      <section className="container mx-auto px-4 pb-20">
        <div className="bg-slate-900 rounded-[3rem] p-12 text-center relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-black text-white">{t('readyToTransform')}</h2>
            <p className="text-slate-400 max-w-xl mx-auto italic">
              {t('sustainableFutureDesc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a 
                href="https://minagri.gov.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-500 text-white font-black rounded-2xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
              >
                GOVERNMENT OF INDIA
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
