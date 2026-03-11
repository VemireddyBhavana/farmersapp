import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Leaf, Globe, TrendingUp, Shield, Users, Cloud, BarChart2, Zap, Award } from "lucide-react";

const impactStats = [
  { valueKey: "impactStat1Value", labelKey: "impactStat1Label", color: "from-emerald-500 to-teal-600", icon: Users },
  { valueKey: "impactStat2Value", labelKey: "impactStat2Label", color: "from-blue-500 to-indigo-600", icon: Globe },
  { valueKey: "impactStat3Value", labelKey: "impactStat3Label", color: "from-amber-500 to-orange-600", icon: Zap },
  { valueKey: "impactStat4Value", labelKey: "impactStat4Label", color: "from-purple-500 to-violet-600", icon: Award },
];

const sustainability = [
  { label: "Chemical Fertilizer Reduction", value: 63, color: "bg-emerald-500", desc: "Farmers shifting to balanced nutrition" },
  { label: "Water Use Efficiency", value: 48, color: "bg-blue-500", desc: "Through precision irrigation guidance" },
  { label: "Crop Loss Reduction", value: 72, color: "bg-amber-500", desc: "Via early pest & disease alerts" },
  { label: "Seed Germination Rate", value: 91, color: "bg-teal-500", desc: "With quality-certified seeds" },
];

const digitalStats = [
  { stat: "96%", desc: "App-first farmer interactions" },
  { stat: "4.7★", desc: "Average app rating on Play Store" },
  { stat: "₹2,400", desc: "Avg incremental income per farmer/year" },
  { stat: "3.2x", desc: "Avg yield improvement with advisory" },
];

export default function Impact() {
  const { t } = useLanguage();
  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-700 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1600"
            alt="Farmers in field"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-teal-800/60 to-transparent" />
        </div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
              <Leaf className="h-4 w-4 text-emerald-300" />
              <span className="text-white/90 text-sm font-bold">#HelpingFarmersWin</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-none">
              {t("impactPageTitle")}
            </h1>
            <p className="text-xl text-white/70 leading-relaxed max-w-xl">
              {t("impactPageSubtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-20 -mt-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className={`bg-gradient-to-br ${stat.color} rounded-3xl p-8 text-white shadow-2xl`}
              >
                <stat.icon className="h-8 w-8 mb-4 text-white/70" />
                <p className="text-5xl font-black">{t(stat.valueKey)}</p>
                <p className="text-white/80 font-bold mt-2">{t(stat.labelKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-3">{t("sustainabilityTitle")}</p>
              <h2 className="text-4xl font-black text-foreground mb-8">
                Farming Smarter, <span className="text-emerald-600">Growing Greener</span>
              </h2>
              <div className="space-y-6">
                {sustainability.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-foreground">{item.label}</span>
                      <span className="font-black text-foreground">{item.value}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: idx * 0.1, ease: "easeOut" }}
                        className={`h-full ${item.color} rounded-full`}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800"
                  alt="Sustainable farming"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=400"
                  alt="Farmer using mobile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Inclusion */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-2">{t("digitalInclusionTitle")}</p>
            <h2 className="text-4xl font-black">Technology in Every Hand</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {digitalStats.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-primary/5 shadow-sm text-center"
              >
                <p className="text-5xl font-black text-foreground">{item.stat}</p>
                <p className="text-muted-foreground mt-2 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-10">Farmers We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1595438571593-2d2db06c6b5c?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400",
            ].map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`rounded-2xl overflow-hidden shadow-xl ${idx === 0 ? "row-span-2" : ""}`}
                style={{ aspectRatio: idx === 0 ? "1/2" : "1/1" }}
              >
                <img src={src} alt="Impact" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
