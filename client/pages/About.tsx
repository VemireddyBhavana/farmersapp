import { motion } from "framer-motion";
import { Leaf, Target, Users, ShieldCheck, Award, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";

const coreValues = [
  {
    icon: Target,
    title: "Customer Success",
    desc: "Every decision we make starts with what's best for the farmer. Their success is our north star.",
    color: "bg-emerald-500",
    bg: "from-emerald-50 dark:from-emerald-950/20",
  },
  {
    icon: Award,
    title: "Ownership",
    desc: "We take full accountability for outcomes — not just assigned tasks. Every team member owns their impact.",
    color: "bg-blue-500",
    bg: "from-blue-50 dark:from-blue-950/20",
  },
  {
    icon: Users,
    title: "Humility",
    desc: "We listen, learn and grow — from farmers, from data, and from each other. Ego has no place at AgroStar.",
    color: "bg-amber-500",
    bg: "from-amber-50 dark:from-amber-950/20",
  },
];

const timeline = [
  { year: "2013", event: "AgroStar founded in Pune by Shardul & Sitanshu Sheth with a vision to bring agri-tech to rural India." },
  { year: "2015", event: "Launched the AgroStar Farmer App with crop advisory in Hindi and Gujarati — first 50,000 users." },
  { year: "2017", event: "Reached 1 million farmers. Expanded advisory to 6 local languages. Launched the Saathi Store network." },
  { year: "2019", event: "Crossed 2.5M farmer user milestone. Introduced AI-powered pest disease detection feature." },
  { year: "2021", event: "Launched Kimaye — AgroStar's output brand — connecting farmers to premium global export markets." },
  { year: "2022", event: "5M+ farmers served, 250K+ villages reached. Advisory now available in 11 local languages." },
  { year: "2024", event: "Raised $30M to accelerate omnichannel expansion and AI investment. 10,000+ Saathi Stores nationwide." },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="overflow-x-hidden">
      {/* Mission Banner */}
      <section className="relative py-6 bg-emerald-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Leaf className="absolute top-0 right-10 h-24 w-24 rotate-45" />
          <Leaf className="absolute -bottom-4 left-20 h-16 w-16 -rotate-12" />
        </div>
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white font-black text-2xl md:text-3xl tracking-tight"
          >
            <span className="opacity-70">#</span>HelpingFarmersWin
          </motion.p>
          <p className="text-white/70 text-sm mt-1">Our mission, our identity, our promise — since 2013</p>
        </div>
      </section>

      {/* Hero */}
      <div className="container mx-auto px-4 py-16 space-y-20">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            {t('aboutTitle')}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            AgroStar was built on a belief that Indian farmers deserve better — better advice, better inputs, better prices, and better access to global markets. Founded in 2013, we've spent over a decade proving it's possible.
          </p>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-2">Our Values</p>
            <h2 className="text-3xl font-black text-foreground">What We Stand For</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {coreValues.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <Card className={`rounded-[2rem] border-primary/5 bg-gradient-to-br ${val.bg} to-transparent h-full`}>
                  <CardContent className="p-8 space-y-4">
                    <div className={`h-12 w-12 rounded-2xl ${val.color} flex items-center justify-center text-white`}>
                      <val.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">{val.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{val.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What We Offer */}
        <div className="glass p-12 rounded-[3rem] border-primary/5 space-y-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-black">{t('whyTechSpark')}</h2>
              <div className="space-y-4">
                {[
                  t('aiCropDisease'),
                  t('realtimeMarketPricing'),
                  t('smartFarmingCalendar'),
                  t('directGovAccess'),
                  t('communityRental'),
                  "Export-grade produce via Kimaye brand to 25+ countries",
                  "Advisory in 11 regional languages for every Indian farmer",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-square rounded-[2rem] overflow-hidden rotate-3 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800"
                  alt="Farming Tech"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 aspect-square w-48 rounded-[2rem] overflow-hidden -rotate-6 shadow-2xl border-4 border-white dark:border-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=400"
                  alt="Tractor"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-2">Our Journey</p>
            <h2 className="text-3xl font-black text-foreground">A Decade of Impact</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">From a small startup in Pune to a multi-million farmer platform — here's how we grew.</p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/10 hidden md:block" />
            <div className="space-y-8">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-emerald-500/20">
                    {item.year}
                  </div>
                  <div className="flex-1 bg-white dark:bg-white/5 rounded-2xl p-5 border border-primary/5 shadow-sm">
                    <p className="text-foreground leading-relaxed font-medium">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
