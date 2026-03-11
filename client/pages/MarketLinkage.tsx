import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Globe, Award, Leaf, TrendingUp, Package, CheckCircle2 } from "lucide-react";

const kimayeStats = [
  { value: "100K+", label: "MT Produce / Year", icon: Package },
  { value: "25+", label: "Export Countries", icon: Globe },
  { value: "50,000+", label: "Participating Farmers", icon: Leaf },
  { value: "99.2%", label: "Quality Pass Rate", icon: CheckCircle2 },
];

const produceCategories = [
  {
    name: "Pomegranate",
    destinations: "UAE, UK, Netherlands, Germany",
    img: "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?auto=format&fit=crop&q=80&w=600",
    color: "from-rose-500 to-pink-600"
  },
  {
    name: "Banana",
    destinations: "Middle East, Southeast Asia",
    img: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&q=80&w=600",
    color: "from-yellow-400 to-amber-500"
  },
  {
    name: "Grapes",
    destinations: "Europe, Russia, Japan",
    img: "https://images.unsplash.com/photo-1515778767554-195d4a26fd28?auto=format&fit=crop&q=80&w=600",
    color: "from-purple-500 to-violet-600"
  },
  {
    name: "Fresh Vegetables",
    destinations: "Gulf, Singapore, Canada",
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600",
    color: "from-emerald-500 to-teal-600"
  },
];

const participationSteps = [
  { step: "01", title: "Register on AgroStar App", desc: "Sign up and link your farm land details." },
  { step: "02", title: "Connect with Field Officer", desc: "Our expert visits your farm and evaluates your produce quality." },
  { step: "03", title: "Pass Quality Standards", desc: "Your produce is graded against Kimaye export-quality parameters." },
  { step: "04", title: "Sell at Premium Price", desc: "Receive guaranteed buy-back at prices 20-40% above local mandi rates." },
];

export default function MarketLinkage() {
  const { t } = useLanguage();
  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&q=80&w=1600"
            alt="Export produce"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
        </div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 rounded-full px-4 py-2">
              <span className="text-amber-300 font-black text-sm">KIMAYE™</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-none">
              {t("marketLinkageTitle")}
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              {t("kimayeTagline")}
            </p>
            <p className="text-white/60 text-sm max-w-lg">
              {t("kimayeDesc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kimayeStats.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <s.icon className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                <p className="text-4xl font-black text-white">{s.value}</p>
                <p className="text-slate-400 font-medium mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Produce Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-amber-600 mb-2">What We Export</p>
            <h2 className="text-4xl font-black">Premium Produce Categories</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {produceCategories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group rounded-3xl overflow-hidden shadow-xl cursor-default"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60`} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-black">{cat.name}</h3>
                    <p className="text-white/80 text-sm mt-1">{cat.destinations}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Participate */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-2">Farmer Journey</p>
            <h2 className="text-4xl font-black">How to Join Kimaye</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            {participationSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground font-black text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
                  {step.step}
                </div>
                <h3 className="font-black text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="https://agrostar.in" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Register on AgroStar App <TrendingUp className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
