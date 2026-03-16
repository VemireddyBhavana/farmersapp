import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Tractor, Shield, Clock, MapPin, ArrowRight, Star, TrendingUp, Cloud, Leaf, Play, Globe, Store, X, Bot, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useLanguage } from "../lib/LanguageContext";
import SmartInsights from "@/components/SmartInsights";

export default function Index() {
  const { t } = useLanguage();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const features = [
    {
      icon: Tractor,
      title: t('premiumEquipment'),
      description: t('premiumEquipmentDesc'),
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Shield,
      title: t('verifiedOwners'),
      description: t('verifiedOwnersDesc'),
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Clock,
      title: t('flexibleRental'),
      description: t('flexibleRentalDesc'),
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: MapPin,
      title: t('nearbyAvailability'),
      description: t('nearbyAvailabilityDesc'),
      color: "bg-red-100 text-red-600",
    },
  ];

  const stats = [
    { label: t('activeFarmers'), value: "10,000+" },
    { label: t('tractorsListed'), value: "2,500+" },
    { label: t('districtsCovered'), value: "150+" },
    { label: t('averageRating'), value: "4.9/5" },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_rice_field.png"
            alt="Rice Field"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center space-y-8"
          >
            {/* Centered Icon Box */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-20 h-20 rounded-3xl glass-dark flex items-center justify-center border border-white/20 shadow-2xl"
            >
              <Leaf className="h-10 w-10 text-emerald-400" />
            </motion.div>

            <div className="space-y-4 max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1]">
                {t('growSmarter')} <br />
                <span className="text-yellow-400">{t('farmBetter')}</span> <br />
                <span className="text-emerald-400">{t('thriveTogether')}</span>
              </h1>

              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 font-medium">
                {t('heroSubtitle')}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link 
                to="/explore"
                className="inline-flex h-16 items-center justify-center rounded-2xl bg-white px-10 text-lg font-black text-emerald-600 shadow-xl transition-all hover:bg-emerald-50 hover:scale-105 active:scale-95 border-none"
              >
                {t('getStartedToday')}
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-16 rounded-2xl border-white/30 bg-white/10 px-10 text-lg font-black text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95">
                    <Play className="mr-3 h-6 w-6 stroke-[3]" /> {t('watchDemo')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
                  <div className="aspect-video bg-black">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/Y6p9XF_N7_8?autoplay=1&mute=1&rel=0" 
                      title="TeachSpark AI Farming Demo" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Smart Farming Insights */}
      <SmartInsights />

      {/* Features Section */}

      <section id="features" className="bg-muted/30 py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl uppercase tracking-widest text-primary/60 text-sm mb-2">
              {t('ourEcosystem')}
            </h2>
            <h3 className="text-4xl lg:text-5xl font-black text-foreground">
              {t('whyChooseTeachSpark')}
            </h3>
            <p className="text-muted-foreground text-lg">
              {t('whyChooseDesc')}
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <motion.div
                whileHover={{ y: -10 }}
                key={idx}
                className="glass p-8 rounded-3xl text-left border-transparent hover:border-primary/20 transition-all cursor-default group"
              >
                <div className={cn("mb-6 inline-flex p-3 rounded-2xl", feature.color)}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-4 sm:grid-cols-2">
            {stats.map((stat, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                key={idx}
                className="text-center space-y-2"
              >
                <h4 className="text-4xl font-extrabold text-primary">{stat.value}</h4>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AgroStar Numbers */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-600">{t('agroStarNetwork')}</p>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              {t('theNumbersThatMatter').split(' ').slice(0,-1).join(' ')} <span className="text-emerald-600">{t('theNumbersThatMatter').split(' ').slice(-1)}</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Store, value: "10,000+", label: t('saathiRetailStores'), color: "bg-emerald-100 text-emerald-600", desc: t('saathiRetailDesc') },
              { icon: Globe, value: "11", label: t('localLanguages'), color: "bg-blue-100 text-blue-600", desc: t('localLanguagesDesc') },
              { icon: TrendingUp, value: "100K+ MT", label: t('produceProcessed'), color: "bg-amber-100 text-amber-600", desc: t('produceProcessedDesc') },
              { icon: Leaf, value: "5M+", label: t('farmersEmpowered'), color: "bg-rose-100 text-rose-600", desc: t('farmersEmpoweredDesc') },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-primary/5 shadow-sm hover:shadow-xl transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <p className="text-4xl font-black text-foreground">{item.value}</p>
                <p className="font-bold text-foreground mt-1">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/impact">
              <Button variant="outline" className="rounded-full px-8 py-5 font-semibold">
                {t('seeFullImpact')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Investors Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 space-y-3"
          >
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">{t('backedBy')}</p>
            <h2 className="text-3xl font-black text-foreground">{t('worldClassInvestors')}</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {t('investorsDesc')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { name: "Schroders Capital", color: "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800" },
              { name: "IFC (World Bank Group)", color: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" },
              { name: "Chiratae Ventures", color: "bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800" },
              { name: "Hero Enterprise", color: "bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800" },
              { name: "British International Investment", color: "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800" },
            ].map((inv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ scale: 1.04 }}
                className={`px-8 py-4 rounded-2xl border font-bold text-sm ${inv.color} transition-all cursor-default`}
              >
                {inv.name}
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            🏆 {t('recentlyRaised')}
          </motion.p>
        </div>
      </section>

      {/* AI Assistant CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="rounded-[3rem] bg-primary overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Leaf className="h-64 w-64 rotate-45" />
            </div>
            <div className="grid items-center gap-12 p-12 lg:grid-cols-2 lg:p-24">
              <div className="space-y-6 text-primary-foreground relative z-10">
                <h2 className="text-3xl font-extrabold tracking-tight lg:text-5xl leading-tight">
                  {t('needHelpEquipment').split('?')[0]}?
                </h2>
                <p className="text-lg text-primary-foreground/80 max-w-lg">
                  {t('aiAssistantDesc')}
                </p>
                <Link to="/chat">
                  <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-lg">
                    {t('chatAgriAI')}
                  </Button>
                </Link>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative h-64 w-64 md:h-80 md:w-80">
                  <div className="absolute inset-0 rounded-full bg-white/10 animate-ping opacity-20" />
                  <div className="absolute inset-4 rounded-full bg-white/20 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="https://api.dicebear.com/7.x/bottts/svg?seed=smartfarmer"
                      alt="AI Assistant"
                      className="h-40 w-40 drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Suite Section */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-8"
            >
              <h2 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight">
                {t('moreThanRentals').split('.')[0]} <span className="text-emerald-500 italic">Rentals.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('moreThanRentalsDesc')}
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { title: t('farmingCalendar'), desc: t('trackSowingHarvests'), path: "/calendar" },
                  { title: t('pestDetection'), desc: t('aiPoweredPlantHealth'), path: "/pests" },
                  { title: t('agriSchemes'), desc: t('liveGovSupport'), path: "/agri-schemes" },
                  { title: t('mandiRates'), desc: t('realtimePricing'), path: "/market" }
                ].map((item, i) => (
                  <Link key={i} to={item.path} className="group">
                    <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all h-full">
                      <h4 className="font-black text-primary group-hover:translate-x-1 transition-transform">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="aspect-video rounded-[3rem] bg-primary/10 border border-primary/10 shadow-2xl overflow-hidden relative group">
                <img
                  src="/vision_banner.png"
                  alt="Farmer using tablet"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">{t('smartDashboard')}</p>
                  <h3 className="text-3xl font-black">{t('empoweringVillages')}</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works Redesign */}
      <section className="py-24 bg-white dark:bg-slate-950/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-5xl font-black italic">
              {t('howItWorks')}
            </h2>
            <p className="text-muted-foreground text-lg italic">
              {t('howItWorksDesc')}
            </p>
          </div>
          
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-100 to-transparent -translate-y-1/2" />
            
            <div className="grid gap-8 md:grid-cols-3 relative z-10">
              {[
                { 
                  step: "01", 
                  title: t('browseSelect'), 
                  desc: t('browseSelectDesc'),
                  icon: Bot,
                  color: "bg-blue-500",
                  shadow: "shadow-blue-200"
                },
                { 
                  step: "02", 
                  title: t('bookInstantly'), 
                  desc: t('bookInstantlyDesc'),
                  icon: Sprout,
                  color: "bg-emerald-500",
                  shadow: "shadow-emerald-200"
                },
                { 
                  step: "03", 
                  title: t('happyFarming'), 
                  desc: t('happyFarmingDesc'),
                  icon: TrendingUp,
                  color: "bg-amber-500",
                  shadow: "shadow-amber-200"
                },
              ].map((step, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative mb-8">
                    {/* Step Number Background */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-8xl font-black text-slate-100 dark:text-slate-800/20 -z-10 group-hover:text-emerald-50 transition-colors">
                      {step.step}
                    </div>
                    {/* Icon Circle */}
                    <div className={cn(
                      "w-24 h-24 rounded-3xl flex items-center justify-center text-white transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-2xl",
                      step.color,
                      step.shadow
                    )}>
                      <step.icon className="h-10 w-10" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-[280px]">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

