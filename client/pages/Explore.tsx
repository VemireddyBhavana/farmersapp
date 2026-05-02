import React from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Truck, 
  LineChart, 
  BookOpen, 
  AlertTriangle, 
  ArrowRight,
  ChevronRight,
  Sprout,
  ShieldCheck,
  Zap,
  Globe,
  MessageSquare,
  User,
  TrendingUp,
  FileText,
  Leaf,
  Map
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";
import { Card } from "@/components/ui/card";

const Explore = () => {
  const { t } = useLanguage();

  const features = [
    {
      title: t('smartDashboardTitle'),
      description: t('agriOverview'),
      icon: LayoutDashboard,
      color: "bg-blue-500/10 text-blue-600",
      link: "/dashboard",
      image: "/hero_rice_field.png"
    },
    {
      title: t('equipmentRentalTitle'),
      description: t('premiumEquipmentDesc'),
      icon: Truck,
      color: "bg-emerald-500/10 text-emerald-600",
      link: "/rent",
      image: "/tractor_premium.png"
    },
    {
      title: t('liveMarketPricesTitle'),
      description: t('liveMarketPricesDesc'),
      icon: LineChart,
      color: "bg-amber-500/10 text-amber-600",
      link: "/market",
      image: "/explore_mandi.png"
    },
    {
      title: t('aiAssistantTitle'),
      description: t('aiAssistantDesc'),
      icon: MessageSquare,
      color: "bg-purple-500/10 text-purple-600",
      link: "/chat",
      image: "/pulses_farm.png"
    },
    {
      title: t('pestDiseaseDetectionTitle'),
      description: t('pestsDesc'),
      icon: AlertTriangle,
      color: "bg-red-500/10 text-red-600",
      link: "/pests",
      image: "/explore_pests.png"
    },
    {
      title: "🌿 Crop Health Monitor",
      description: "Analyze crop and farm health instantly using smart detection",
      icon: Leaf,
      color: "bg-emerald-500/10 text-emerald-600",
      link: "/satellite-analysis",
      image: "/pulses_farm.png"
    },
    {
      title: t('communityHubTitle'),
      description: t('communityHubDesc'),
      icon: MessageSquare,
      color: "bg-blue-500/10 text-blue-600",
      link: "/community",
      image: "/community_hub.png"
    },
    {
      title: t('expertConsultTitle'),
      description: t('expertConsultDesc'),
      icon: User,
      color: "bg-purple-500/10 text-purple-600",
      link: "/expert-consult",
      image: "/expert_pfp.png"
    },
    {
      title: t('yieldPredictionTitle'),
      description: t('yieldPredictionDesc'),
      icon: TrendingUp,
      color: "bg-amber-500/10 text-amber-600",
      link: "/yield-prediction",
      image: "/yield_prediction.png"
    },
    {
      title: t('subsidyFinderTitle'),
      description: t('subsidyFinderDesc'),
      icon: FileText,
      color: "bg-emerald-500/10 text-emerald-600",
      link: "/subsidy-finder",
      image: "/subsidy_finder.png"
    },
    {
      title: t('toolSharingTitle'),
      description: t('toolSharingDesc'),
      icon: Truck,
      color: "bg-blue-500/10 text-blue-600",
      link: "/tool-sharing",
      image: "/tool_sharing.png"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-6"
          >
            <Zap className="h-4 w-4 fill-emerald-500 animate-pulse" />
            <span>{t('ourEcosystem')}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6"
          >
            {t('exploreTitlePrefix')} <span className="text-emerald-600">{t('pureInnovation')}</span> {t('exploreTitleSuffix')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 leading-relaxed"
          >
            {t('exploreSubtitle')}
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {features.map((feature, idx) => (
            <motion.div
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={idx}
            >
              <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 group rounded-3xl bg-white">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 relative overflow-hidden h-48 md:h-auto">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 p-3 rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30">
                      <feature.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="md:w-3/5 p-8 flex flex-col justify-between">
                    <div>
                      <div className={`inline-flex px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider mb-4 ${feature.color}`}>
                        {feature.title}
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {feature.description}
                      </p>
                    </div>
                    <Link to={feature.link}>
                      <Button className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-black py-6 rounded-2xl flex items-center justify-center space-x-2 transition-all group/btn">
                        <span>{t('getStartedWith')} {feature.title}</span>
                        <ChevronRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Global Impact Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 rounded-[3rem] bg-emerald-600 p-12 lg:p-20 text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tight">
              {t('readyToTransform')}
            </h2>
            <p className="text-xl text-emerald-50/80">
              {t('sustainableFutureDesc')}
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <Link to="/dashboard">
                <Button className="h-20 px-12 rounded-3xl bg-white text-emerald-600 text-xl font-black shadow-2xl hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all">
                  {t('joinNetwork')} <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="h-20 px-12 rounded-3xl border-white/30 bg-white/10 text-xl font-black text-white backdrop-blur-md hover:bg-white/20 transition-all">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Decorative icons */}
          <Sprout className="absolute -bottom-20 -left-20 h-80 w-80 text-white/5 -rotate-12" />
          <ShieldCheck className="absolute -top-20 -right-20 h-80 w-80 text-white/5 rotate-12" />
        </motion.div>
      </div>
    </div>
  );
};

export default Explore;
