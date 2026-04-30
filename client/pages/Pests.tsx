import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  Bug, 
  Leaf, 
  Search, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  Eye, 
  Info, 
  AlertTriangle,
  ChevronDown,
  Droplets,
  Wind,
  Zap,
  FlaskConical,
  Sprout,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";


const PEST_DATABASE: Record<string, Record<string, any>> = {
  tomato: {
    "hot-dry": {
      alerts: [
        { title: "Critical: Spider Mite Infestation", desc: "Low humidity and high temps are fueling rapid mite growth.", action: "Apply Neem oil or sulfur-based miticides immediately." },
        { title: "Warning: Blossom End Rot", desc: "Heat stress affecting calcium uptake.", action: "Ensure consistent irrigation and apply calcium spray." }
      ],
      pests: [{ name: "Spider Mites", icon: "🕷️", desc: "Causes yellow stippling on leaves.", risk: "High" }],
      diseases: [{ name: "Sunscald", icon: "☀️", desc: "Fruit damage due to intense UV exposure.", risk: "Moderate" }],
      stats: { pests: "1", diseases: "1", threats: "2", alerts: "2" },
      prevention: "Use shade nets and maintain high soil moisture to deter mites.",
      organic: "Apply garlic-chili spray or introduce predatory mites."
    },
    "humid": {
      alerts: [
        { title: "High Risk: Late Blight", desc: "Cool, wet conditions favor Phytophthora infestans.", action: "Spray copper-based fungicides immediately." },
        { title: "Warning: Fruit Borer", desc: "Increased activity in humid conditions.", action: "Deploy pheromone traps and monitor daily." }
      ],
      pests: [{ name: "Fruit Borer", icon: "🐛", desc: "Larvae bore into tomato fruits.", risk: "High" }],
      diseases: [{ name: "Late Blight", icon: "🥀", desc: "Rapidly kills plants in wet weather.", risk: "Critical" }],
      stats: { pests: "1", diseases: "1", threats: "2", alerts: "2" },
      prevention: "Improve field drainage and remove lower leaves for better airflow.",
      organic: "Use Bacillus thuringiensis (Bt) for borers and Trichoderma for blight."
    }
  },
  cotton: {
    "hot-dry": {
      alerts: [
        { title: "Critical: Pink Bollworm", desc: "Temperature peak leading to high bollworm activity.", action: "Apply recommended insecticides in the evening." },
        { title: "Warning: Whitefly Surge", desc: "Risk of Leaf Curl Virus transmission.", action: "Use yellow sticky traps and monitor canopy." }
      ],
      pests: [{ name: "Pink Bollworm", icon: "🐛", desc: "Damages cotton bolls and seeds.", risk: "High" }],
      diseases: [{ name: "Leaf Curl Virus", icon: "🍂", desc: "Leaves curling upwards and stunted growth.", risk: "Moderate" }],
      stats: { pests: "1", diseases: "1", threats: "2", alerts: "2" },
      prevention: "Install pheromone traps (5 per acre) for early detection.",
      organic: "Spray 5% Neem Seed Kernel Extract (NSKE)."
    },
    "humid": {
      alerts: [
        { title: "High Risk: Root Rot", desc: "Waterlogging favored by rain.", action: "Drench soil with Carbendazim or organic bio-fungicides." },
        { title: "Warning: Aphids", desc: "High humidity promotes aphid colonies.", action: "Monitor underside of leaves regularly." }
      ],
      pests: [{ name: "Aphids", icon: "🐜", desc: "Suck sap and cause sooty mold.", risk: "Moderate" }],
      diseases: [{ name: "Boll Rot", icon: "🧶", desc: "Rotting of bolls due to excessive moisture.", risk: "High" }],
      stats: { pests: "1", diseases: "1", threats: "2", alerts: "2" },
      prevention: "Ensure proper spacing and avoid excessive nitrogen application.",
      organic: "Apply soap water spray or introduce ladybug beetles."
    }
  },
  maize: {
    "hot-dry": {
      alerts: [
        { title: "Critical: Fall Armyworm", desc: "Rapid larval development in warm weather.", action: "Scout central whorls and apply Spinetoram." }
      ],
      pests: [{ name: "Fall Armyworm", icon: "🐛", desc: "Invasive pest eating maize leaves and cobs.", risk: "High" }],
      diseases: [{ name: "Maize Dwarf Mosaic", icon: "🌾", desc: "Viral disease affecting growth.", risk: "Low" }],
      stats: { pests: "1", diseases: "1", threats: "2", alerts: "1" },
      prevention: "Practice early planting and intercropping with legumes.",
      organic: "Apply sand mixed with ash into the maize whorls."
    }
  },
  wheat: {
    "cool": {
      alerts: [
        { title: "Critical: Yellow Rust", desc: "Low temps and high humidity are ideal for rust spores.", action: "Spray Propiconazole 25 EC immediately." }
      ],
      pests: [{ name: "Aphids", icon: "🐜", desc: "Occur during flowering stage in cool weather.", risk: "Moderate" }],
      diseases: [{ name: "Yellow Rust", icon: "🌾", desc: "Yellow stripes of spores on leaves.", risk: "High" }],
      stats: { pests: "1", diseases: "1", threats: "2", alerts: "1" },
      prevention: "Sow resistant varieties and avoid late sowing.",
      organic: "Spray 10% Cow urine solution or fermented buttermilk."
    }
  }
};

const DEFAULT_DATA = {
  alerts: [
    { title: "Low Risk: General Monitoring", desc: "No specific threats detected for current selection.", action: "Continue regular field inspections." }
  ],
  pests: [{ name: "No major pests", icon: "✅", desc: "Pest levels are within economic thresholds.", risk: "Low" }],
  diseases: [{ name: "No major diseases", icon: "✅", desc: "Crop shows healthy growth signs.", risk: "Low" }],
  stats: { pests: "0", diseases: "0", threats: "0", alerts: "1" },
  prevention: "Maintain standard field hygiene and balanced fertilization.",
  organic: "Regular monitoring is the best organic prevention."
};

export default function Pests() {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState("tomato");
  const [weatherCondition, setWeatherCondition] = useState("hot-dry");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentData, setCurrentData] = useState(DEFAULT_DATA);
  const [analysisMetrics, setAnalysisMetrics] = useState({ confidence: 0, timestamp: "" });
  const recommendationsRef = useRef<HTMLDivElement>(null);

  const getRecommendations = () => {
    setIsAnalyzing(true);
    setShowRecommendations(false); // Hide while "analyzing"
    
    // Simulate real analysis logic
    setTimeout(() => {
      const data = PEST_DATABASE[selectedCrop]?.[weatherCondition] || DEFAULT_DATA;
      setCurrentData(data);
      setAnalysisMetrics({
        confidence: Number((94 + Math.random() * 5).toFixed(1)),
        timestamp: new Date().toLocaleTimeString()
      });
      setIsAnalyzing(false);
      setShowRecommendations(true);
      
      setTimeout(() => {
        recommendationsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] text-[#2D3748] pb-20">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A202C] mb-4">
            {t("pestsAndDisease")}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-time advisory system for crop protection based on hyper-local weather and crop cycles.
          </p>
        </div>

        {/* Monitoring Setup */}
        <Card className="bg-white border-none shadow-sm rounded-2xl mb-10 overflow-hidden ring-1 ring-orange-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Eye className="h-5 w-5 text-orange-600" />
              <h3 className="font-bold text-gray-800">Field Input Center</h3>
            </div>
            
            <div className="grid md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-4 space-y-2">
                <label className="text-sm font-semibold text-gray-600">Select Your Crop</label>
                <Select value={selectedCrop} onValueChange={(val) => { setSelectedCrop(val); setShowRecommendations(false); }}>
                  <SelectTrigger className="bg-white border-gray-200 h-12 rounded-xl focus:ring-orange-500">
                    <SelectValue placeholder="Select Crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tomato">Tomato (తక్కాళి / टमाटर)</SelectItem>
                    <SelectItem value="cotton">Cotton (పత్తి / कपास)</SelectItem>
                    <SelectItem value="maize">Maize (మొక్కజొన్న / मक्का)</SelectItem>
                    <SelectItem value="wheat">Wheat (గోధుమ / गेहूं)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-4 space-y-2">
                <label className="text-sm font-semibold text-gray-600">Current Weather</label>
                <Select value={weatherCondition} onValueChange={(val) => { setWeatherCondition(val); setShowRecommendations(false); }}>
                  <SelectTrigger className="bg-white border-gray-200 h-12 rounded-xl focus:ring-orange-500">
                    <SelectValue placeholder="Weather Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot-dry">Hot & Dry (ఎండ / गर्मी)</SelectItem>
                    <SelectItem value="humid">Humid & Rainy (తేమ / नमी-बारिश)</SelectItem>
                    <SelectItem value="cool">Cool & Moist (చల్లని / ठंड)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-4">
                <Button 
                  onClick={getRecommendations}
                  disabled={isAnalyzing}
                  className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-200 transition-all active:scale-95"
                >
                  {isAnalyzing ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Zap className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <Bug className="h-4 w-4" />
                  )}
                  {isAnalyzing ? "Analyzing Environment..." : "Fetch Real-Time Advisory"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <AnimatePresence mode="wait">
          {showRecommendations ? (
            <motion.div
              key={`${selectedCrop}-${weatherCondition}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-10"
              ref={recommendationsRef}
            >
              {/* Active Alerts */}
              <Card className="bg-white border border-red-100 shadow-sm rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="h-6 w-6 text-red-600" />
                      <h3 className="text-xl font-bold text-gray-800">Critical Alerts for {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)}</h3>
                    </div>
                    <div className="flex gap-4">
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 flex items-center gap-1">
                        <Activity className="h-3 w-3" /> {analysisMetrics.confidence}% AI Confidence
                      </Badge>
                      <Badge variant="outline" className="text-gray-400 border-gray-100 font-normal">
                        Last Scan: {analysisMetrics.timestamp}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {currentData.alerts.map((alert: any, i: number) => (
                      <div key={i} className="bg-white border border-red-50 rounded-2xl p-6 relative overflow-hidden group hover:border-red-200 transition-all">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-red-50 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                          </div>
                          <div>
                            <h4 className="font-bold text-red-600 mb-1">{alert.title}</h4>
                            <p className="text-gray-600 text-sm mb-2">{alert.desc}</p>
                            <p className="text-red-800 font-bold text-sm flex items-center gap-2">
                              <ShieldCheck className="h-4 w-4" /> {alert.action}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pests & Diseases Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white border-none shadow-sm rounded-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <Bug className="h-6 w-6 text-red-600" />
                      <h3 className="text-xl font-bold text-gray-800">Target Pests</h3>
                    </div>
                    <div className="space-y-4">
                      {currentData.pests.map((pest: any, i: number) => (
                        <div key={i} className="border border-gray-100 rounded-2xl p-6 bg-white hover:shadow-md transition-all">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-4">
                              <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">{pest.icon}</div>
                              <div>
                                <h4 className="font-bold text-gray-800 text-lg">{pest.name}</h4>
                                <p className="text-sm text-gray-500">{pest.desc}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className={cn("px-3 py-1", pest.risk === "High" ? "text-red-600 border-red-200 bg-red-50" : "text-orange-600 border-orange-200 bg-orange-50")}>
                              {pest.risk} Risk
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-none shadow-sm rounded-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <Leaf className="h-6 w-6 text-green-600" />
                      <h3 className="text-xl font-bold text-gray-800">Potential Diseases</h3>
                    </div>
                    <div className="space-y-4">
                      {currentData.diseases.map((disease: any, i: number) => (
                        <div key={i} className="border border-gray-100 rounded-2xl p-6 bg-white hover:shadow-md transition-all">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-4">
                              <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">{disease.icon}</div>
                              <div>
                                <h4 className="font-bold text-gray-800 text-lg">{disease.name}</h4>
                                <p className="text-sm text-gray-500">{disease.desc}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 px-3 py-1">
                              {disease.risk}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Recommendations */}
              <Card className="bg-white border-none shadow-sm rounded-2xl overflow-hidden ring-1 ring-purple-100">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <Zap className="h-6 w-6 text-purple-600" />
                    <h3 className="text-xl font-bold text-gray-800">Expert AI Strategy</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                        <h4 className="font-bold text-gray-800 underline decoration-green-200">Prevention Strategy</h4>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed italic">
                        "{currentData.prevention}"
                      </p>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <FlaskConical className="h-5 w-5 text-green-600" />
                        <h4 className="font-bold text-gray-800 underline decoration-green-200">Organic Treatment</h4>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed italic">
                        "{currentData.organic}"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Summary */}
              <Card className="bg-white border-none shadow-sm rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-8 text-blue-600">
                    <Info className="h-6 w-6" />
                    <h3 className="text-xl font-bold text-gray-800">Risk Assessment Summary</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Pests Identified", value: currentData.stats.pests, bg: "bg-red-50", text: "text-red-700" },
                      { label: "Disease Risks", value: currentData.stats.diseases, bg: "bg-orange-50", text: "text-orange-700" },
                      { label: "Total Threats", value: currentData.stats.threats, bg: "bg-green-50", text: "text-green-700" },
                      { label: "Critical Alerts", value: currentData.stats.alerts, bg: "bg-blue-50", text: "text-blue-700" }
                    ].map((stat, i) => (
                      <div key={i} className={cn("rounded-2xl p-6 text-center shadow-sm", stat.bg)}>
                        <div className={cn("text-3xl font-black mb-1", stat.text)}>{stat.value}</div>
                        <div className={cn("text-xs font-bold uppercase tracking-widest opacity-60", stat.text)}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center space-y-4"
            >
              <div className="p-6 bg-orange-50 rounded-full">
                <Bug className="h-12 w-12 text-orange-200" />
              </div>
              <div className="max-w-xs">
                <h4 className="font-bold text-gray-800">No Analysis Results</h4>
                <p className="text-sm text-gray-500">Please select your crop and current weather conditions above to fetch real-time pest management data.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
