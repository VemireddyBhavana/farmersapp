import { motion } from "framer-motion";
import { Leaf, Target, TrendingUp, Globe, Users, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";

export default function Vision() {
  const { t } = useLanguage();

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-24 bg-emerald-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Leaf className="absolute top-0 right-10 h-64 w-64 rotate-45" />
          <Leaf className="absolute -bottom-20 left-20 h-48 w-48 -rotate-12" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              {t('ourVision')}
            </h1>
            <p className="text-emerald-50 text-xl max-w-2xl mx-auto leading-relaxed">
              {t('visionDesc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Details */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="glass p-12 rounded-[3rem] border-primary/5 space-y-12">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1 space-y-8">
                <h2 className="text-3xl font-black text-foreground">Future of Farming</h2>
                <div className="space-y-6">
                  {[
                    { title: t('aiCropDisease'), desc: "Instant diagnosis and treatment steps for over 50+ crop varieties." },
                    { title: t('realtimeMarketPricing'), desc: "Live mandi rates from 2000+ markets across India." },
                    { title: t('smartFarmingCalendar'), desc: "Personalized task management for every stage of the crop cycle." },
                    { title: t('directGovAccess'), desc: "Simplified application process for PM-Kisan and other state schemes." },
                    { title: t('communityRental'), desc: "Affordable access to high-end machinery for smallholder farmers." }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex-1 relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
                  viewport={{ once: true }}
                  className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
                >
                  <img
                    src="/vision_banner.png"
                    alt="Visionary Farming"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-8 -left-8 glass p-6 rounded-3xl border border-white/20 shadow-2xl max-w-xs"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                      <Globe className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-sm">Global Impact</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Connecting Indian farmers to premium export markets through our Kimaye brand in 25+ countries.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black">Our Strategic Goals</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We are committed to long-term impact through three key strategic pillars.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "100M Farmers",
                desc: "Scaling our reach to every corner of the country over the next decade.",
                color: "text-blue-500",
                bg: "bg-blue-100 dark:bg-blue-900/30"
              },
              {
                icon: Target,
                title: "Precision Ag",
                desc: "Bringing IoT and satellite data to help farmers make better decisions.",
                color: "text-emerald-500",
                bg: "bg-emerald-100 dark:bg-emerald-900/30"
              },
              {
                icon: TrendingUp,
                title: "Financial Security",
                desc: "Ensuring every farmer can earn a sustainable and growing income.",
                color: "text-amber-500",
                bg: "bg-amber-100 dark:bg-amber-900/30"
              }
            ].map((goal, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-white/5 p-10 rounded-[2.5rem] border border-primary/5 shadow-sm text-center space-y-6"
              >
                <div className={`w-16 h-16 rounded-2xl ${goal.bg} ${goal.color} flex items-center justify-center mx-auto`}>
                  <goal.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black">{goal.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{goal.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-emerald-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden group"
          >
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-black">Ready to join our vision?</h2>
              <p className="text-emerald-100/80 text-lg font-medium">Be part of the agricultural revolution. Together, we can build a sustainable future for farmers worldwide.</p>
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50 rounded-full px-10 py-8 text-xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl">
                Partner with Us
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl group-hover:scale-110 transition-transform duration-700" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
