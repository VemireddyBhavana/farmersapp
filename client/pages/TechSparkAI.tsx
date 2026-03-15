import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Bot, Zap, Globe, Shield, TrendingUp, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TechSparkAI() {
  const { t } = useLanguage();
  
  const techFeatures = [
    {
      icon: Bot,
      title: "AI-Powered Advisory",
      desc: "Our advanced language models provide expert agricultural advice in 11 regional languages, ensuring no farmer is left behind due to language barriers.",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: Zap,
      title: "Real-time Analytics",
      desc: "Process millions of data points from satellites, weather stations, and local mandis to provide hyper-local insights for every farm.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Shield,
      title: "Secure Ecosystem",
      desc: "Built on enterprise-grade security, protecting farmer data while ensuring transparent transactions across our entire digital infrastructure.",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <div className="overflow-x-hidden pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-emerald-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
              TechSpark <span className="text-emerald-400">AI</span>
            </h1>
            <p className="text-emerald-100/80 text-xl max-w-2xl mx-auto font-medium">
              Revolutionizing Indian agriculture through the power of Artificial Intelligence and Data Science.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Philosophy */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest border-none">
                  {t('ourVision')}
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-black text-foreground leading-[1.1]">{t('ourVision')}</h2>
                <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                  {t('visionDesc')}
                </p>
              </div>

              <div className="space-y-4 pt-8 border-t border-slate-100">
                <h3 className="text-2xl font-black text-foreground">Our Technology Philosophy</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At TechSpark AI, we believe that technology is the greatest equalizer. Our mission is to take the most advanced AI capabilities and make them simple, accessible, and practical for the millions of farmers who are the backbone of our nation.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {[
                    "Farmer-First Design",
                    "Inclusive for All Languages",
                    "Data-Driven Decision Making",
                    "Sustainable Growth Focus"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="font-bold text-foreground text-sm uppercase tracking-wider">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-[4rem] bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center p-12 border-2 border-emerald-100/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/0 to-emerald-100/50 dark:to-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Bot className="w-full h-full text-emerald-600 opacity-10 absolute rotate-12 -right-10 -bottom-10" />
                <div className="relative z-10 text-center space-y-4">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-8xl font-black text-emerald-600 drop-shadow-2xl"
                  >
                    11+
                  </motion.div>
                  <p className="font-black text-emerald-800 dark:text-emerald-200 uppercase tracking-[0.2em] text-sm">Regional Languages Supported</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-foreground">Powered by Innovation</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {techFeatures.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-primary/5 shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-4">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-emerald-600 rounded-[4rem] p-12 lg:p-24 relative overflow-hidden">
            <Leaf className="absolute top-0 right-0 h-64 w-64 text-white/10 -rotate-12 translate-x-1/2 -translate-y-1/2" />
            <div className="grid md:grid-cols-3 gap-12 text-center text-white relative z-10">
              <div className="space-y-2">
                <div className="text-5xl font-black">5M+</div>
                <p className="text-emerald-100 font-bold uppercase tracking-widest text-sm">Farmers Empowered</p>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-black">250K+</div>
                <p className="text-emerald-100 font-bold uppercase tracking-widest text-sm">Villages Reached</p>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-black">10K+</div>
                <p className="text-emerald-100 font-bold uppercase tracking-widest text-sm">Saathi Stores</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
