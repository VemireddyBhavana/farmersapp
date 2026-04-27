import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sprout, Droplets, Shield, Tractor, Info, Search, 
  ArrowRight, BookOpen, Leaf, Sun, BarChart3, GraduationCap, 
  Handshake, HardHat, Warehouse, Container, Bird, Fish, HelpCircle,
  ShoppingBag
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const AgriKnowledgeHub = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const modules = [
    {
      id: "crop-cultivation",
      title: t("modCropCult") || "Crop Cultivation Knowledge",
      desc: t("modCropCultDesc") || "Learn when and how to grow different crops effectively.",
      icon: <Sprout className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop",
      link: "/growing-guide",
      category: "Crops",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      id: "seeds-planting",
      title: t("modSeedsPlanting") || "Seeds & Planting",
      desc: t("modSeedsPlantingDesc") || "Improve crop establishment with better seed management.",
      icon: <Leaf className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&auto=format&fit=crop",
      link: "/seeds",
      category: "Inputs",
      color: "from-lime-500/20 to-green-500/20"
    },
    {
      id: "soil-nutrient",
      title: t("modSoilNutrient") || "Soil & Nutrient Management",
      desc: t("modSoilNutrientDesc") || "Improve soil health and optimize crop nutrition.",
      icon: <HardHat className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
      link: "/kisan-suvidha",
      category: "Soil",
      color: "from-amber-600/20 to-orange-500/20"
    },
    {
      id: "water-irrigation",
      title: t("modWaterIrrigation") || "Water & Irrigation",
      desc: t("modWaterIrrigationDesc") || "Master efficient water usage and irrigation methods.",
      icon: <Droplets className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1463123081488-789f998ac9c4?q=80&w=800&auto=format&fit=crop",
      link: "/irrigation-calculator",
      category: "Resources",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      id: "crop-protection",
      title: t("modCropProtection") || "Crop Protection",
      desc: t("modCropProtectionDesc") || "Protect your crops from pests, diseases, and weeds.",
      icon: <Shield className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=800&auto=format&fit=crop",
      link: "/pests",
      category: "Health",
      color: "from-red-500/20 to-orange-500/20"
    },
    {
      id: "machinery",
      title: t("modMachinery") || "Farm Machinery Knowledge",
      desc: t("modMachineryDesc") || "Master the operation and maintenance of farm equipment.",
      icon: <Tractor className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
      link: "/rent",
      category: "Tools",
      color: "from-slate-500/20 to-gray-500/20"
    },
    {
      id: "harvesting",
      title: t("modHarvesting") || "Harvesting & Post-Harvest",
      desc: t("modHarvestingDesc") || "Reduce losses with proper harvesting and handling.",
      icon: <BarChart3 className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
      link: "/market",
      category: "Post-Harvest",
      color: "from-yellow-500/20 to-amber-500/20"
    },
    {
      id: "storage",
      title: t("modStorageLogistics") || "Storage & Logistics",
      desc: t("modStorageLogisticsDesc") || "Keep your produce safe with modern storage tips.",
      icon: <Warehouse className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
      link: "/kisan-suvidha",
      category: "Logistics",
      color: "from-indigo-500/20 to-blue-500/20"
    },
    {
      id: "livestock",
      title: t("modLivestock") || "Livestock Farming",
      desc: t("modLivestockDesc") || "Expand your farm with dairy, poultry, and more.",
      icon: <Bird className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=800&auto=format&fit=crop",
      link: "/kisan-suvidha",
      category: "Livestock",
      color: "from-rose-500/20 to-pink-500/20"
    },
    {
      id: "sustainable",
      title: t("modSustainableAg") || "Sustainable Agriculture",
      desc: t("modSustainableAgDesc") || "Future-proof your farm with sustainable practices.",
      icon: <Leaf className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1530836361250-ee159aa56754?q=80&w=800&auto=format&fit=crop",
      link: "/kisan-suvidha",
      category: "Eco",
      color: "from-emerald-500/20 to-teal-500/20"
    },
    {
      id: "productivity",
      title: t("modProductivity") || "Farm Productivity",
      desc: t("modProductivityDesc") || "Tips and tricks to increase your per-acre yield.",
      icon: <Info className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1511497584788-2767df3029f9?q=80&w=800&auto=format&fit=crop",
      link: "/profit-calculator",
      category: "Expert",
      color: "from-violet-500/20 to-purple-500/20"
    },
    {
      id: "climate",
      title: t("modClimateWeather") || "Climate & Weather Knowledge",
      desc: t("modClimateWeatherDesc") || "Adapt to changing weather and protect your crops.",
      icon: <Sun className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=800&auto=format&fit=crop",
      link: "/weather",
      category: "Climate",
      color: "from-sky-500/20 to-blue-500/20"
    },
    {
      id: "market",
      title: t("modMarketKnowledge") || "Market & Pricing Knowledge",
      desc: t("modMarketKnowledgeDesc") || "Understand market trends and price mechanisms.",
      icon: <BarChart3 className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
      link: "/market",
      category: "Business",
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      id: "education",
      title: t("modEducation") || "Farmer Education",
      desc: t("modEducationDesc") || "Continuous learning through videos and success stories.",
      icon: <GraduationCap className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
      link: "/video-learning",
      category: "Learning",
      color: "from-fuchsia-500/20 to-violet-500/20"
    },
    {
      id: "govt-support",
      title: t("modGovtSupport") || "Government Support",
      desc: t("modGovtSupportDesc") || "Access subsidies, schemes, and insurance easily.",
      icon: <Handshake className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1507537330355-2380489d24ce?q=80&w=800&auto=format&fit=crop",
      link: "/agri-schemes",
      category: "Support",
      color: "from-cyan-500/20 to-teal-500/20"
    },
  ];

  const filteredModules = modules.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAF8]">
      {/* Hero Section */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Agri Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#F8FAF8]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-4 text-emerald-400 border-emerald-400/30 backdrop-blur-md px-4 py-1">
              Kisan AI • Agriculture Marketplace
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              {t("agriMarketplace") || "Agriculture Marketplace"}
            </h1>
            <p className="text-lg md:text-xl text-emerald-50/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("agriMarketplaceDesc") || "Your complete digital ecosystem for buying, selling, and learning."}
            </p>

            <div className="max-w-xl mx-auto relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-emerald-400 transition-colors" />
              <Input 
                placeholder="Search modules (e.g., Soil, Water, Pest)..."
                className="w-full pl-12 h-14 bg-white/10 backdrop-blur-xl border-white/20 text-white placeholder:text-white/40 rounded-2xl focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="container mx-auto px-4 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="h-full group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-none bg-white overflow-hidden rounded-3xl cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={module.image} 
                      alt={module.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={cn("absolute inset-0 bg-gradient-to-br transition-opacity duration-500 opacity-60 group-hover:opacity-40", module.color)} />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-2.5 rounded-2xl shadow-lg group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                      {module.icon}
                    </div>
                    <Badge className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border-white/20 hover:bg-black/60 transition-colors">
                      {module.category}
                    </Badge>
                  </div>
                  <CardHeader className="pt-6">
                    <CardTitle className="text-xl font-bold text-gray-800 leading-snug group-hover:text-emerald-700 transition-colors">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                      {module.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <Link to={module.link}>
                      <Button variant="ghost" className="w-full justify-between text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl p-0 h-10 group/btn px-4 bg-emerald-50/50">
                        <span className="font-semibold">Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredModules.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-emerald-400 opacity-50" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700">No modules found</h3>
            <p className="text-gray-500 mt-2">Try searching with different keywords like 'Soil' or 'Pest'.</p>
            <Button 
              variant="outline" 
              className="mt-6 border-emerald-200 text-emerald-600 hover:bg-emerald-50 rounded-xl"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </Button>
          </motion.div>
        )}
      </section>

      {/* Floating Action Section */}
      <section className="bg-emerald-900 py-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-600 rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-400 rounded-full blur-[120px] opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 italic">"Empowering the backbone of Bharat through Knowledge."</h2>
            <p className="text-emerald-100/60 mb-10 text-lg">
              Access the Marketplace for buying & selling quality agri products.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/seeds">
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-8 rounded-2xl h-14 shadow-xl">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Visit Seeds Marketplace
                </Button>
              </Link>
              <Link to="/chat">
                <Button size="lg" variant="outline" className="border-emerald-400/50 text-white hover:bg-white/10 font-medium px-8 rounded-2xl h-14">
                  Ask AI Farming Help
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer info */}
      <footer className="py-12 text-center text-gray-400 text-sm">
        <p>© 2026 Kisan AI • Agriculture Marketplace</p>
      </footer>
    </div>
  );
};

export default AgriKnowledgeHub;
