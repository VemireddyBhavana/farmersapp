import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Smartphone, Phone, Store, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const channels = [
  {
    icon: Smartphone,
    title: "Farmer App",
    subtitle: "Always in Your Pocket",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600",
    stats: [{ label: "Downloads", value: "5M+" }, { label: "Languages", value: "11" }, { label: "Rating", value: "4.7★" }],
    features: [
      "AI-powered crop disease detection via photo upload",
      "Live mandi rates and price forecasts",
      "Farming calendar with personalized alerts",
      "Government scheme discovery and tracking",
      "Direct chat with agri-experts",
      "Seed and input ordering with doorstep delivery",
    ],
    cta: { label: "Open AI Chat", path: "/chat" },
  },
  {
    icon: Phone,
    title: "Agri-Advisory Center",
    subtitle: "Expert Advice, One Call Away",
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600",
    stats: [{ label: "Experts", value: "200+" }, { label: "Calls/day", value: "10K" }, { label: "Languages", value: "11" }],
    features: [
      "Talk directly to an agri-expert in your language",
      "Personalized crop and soil health advisory",
      "Weather-based sowing and harvesting guidance",
      "Pest and disease diagnosis via phone",
      "Support for digital-first and feature phone users",
      "Free first advisory call for new farmers",
    ],
    cta: { label: "Call 1800-180-1551", path: "/support" },
  },
  {
    icon: Store,
    title: "Saathi Stores",
    subtitle: "10,000+ Rural Touchpoints",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    img: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=600",
    stats: [{ label: "Stores", value: "10K+" }, { label: "States", value: "18" }, { label: "SKUs", value: "1500+" }],
    features: [
      "Physical stores run by trusted local entrepreneurs",
      "Full AgroStar product catalogue available",
      "Advisory services at the store level",
      "Cash & carry plus digital payment options",
      "Certified partner for quality assurance",
      "Earn incentives by becoming a Saathi partner",
    ],
    cta: { label: "Find Nearest Store", path: "/market" },
  },
];

export default function Omnichannel() {
  const { t } = useLanguage();
  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=1600"
            alt="Farmer with phone"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-emerald-900/60" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-4">AgroStar Network</p>
            <h1 className="text-5xl lg:text-7xl font-black text-white">{t("omnichannelTitle")}</h1>
            <p className="text-xl text-white/60 max-w-xl mx-auto">{t("omnichannelSubtitle")}</p>
          </motion.div>
          {/* 3 channel icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-8 mt-16"
          >
            {channels.map((ch, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${ch.color} flex items-center justify-center shadow-2xl`}>
                  <ch.icon className="h-8 w-8 text-white" />
                </div>
                <span className="text-white/60 font-bold text-xs hidden sm:block">{ch.title}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Channels Detail */}
      <section className="py-20">
        <div className="container mx-auto px-4 space-y-12">
          {channels.map((channel, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`rounded-3xl border ${channel.borderColor} ${channel.bg} overflow-hidden`}
            >
              <div className={`grid lg:grid-cols-2 gap-0 ${idx % 2 === 1 ? "" : ""}`}>
                {/* Text */}
                <div className="p-8 lg:p-12 space-y-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${channel.color} flex items-center justify-center shadow-lg`}>
                    <channel.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-foreground">{channel.title}</h2>
                    <p className="text-muted-foreground font-medium mt-1">{channel.subtitle}</p>
                  </div>
                  {/* Stats row */}
                  <div className="flex gap-6">
                    {channel.stats.map((s) => (
                      <div key={s.label}>
                        <p className="text-2xl font-black text-foreground">{s.value}</p>
                        <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  {/* Features */}
                  <ul className="space-y-2">
                    {channel.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to={channel.cta.path}>
                    <Button className={`rounded-2xl font-bold bg-gradient-to-r ${channel.color} text-white border-0 hover:opacity-90 shadow-lg`}>
                      {channel.cta.label}
                    </Button>
                  </Link>
                </div>
                {/* Image */}
                <div className={`${idx % 2 === 0 ? "lg:order-last" : "lg:order-first"} h-64 lg:h-auto min-h-[300px]`}>
                  <img src={channel.img} alt={channel.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
