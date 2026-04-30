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

export default function Pests() {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState("tomato");
  const [weatherCondition, setWeatherCondition] = useState("hot-dry");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const recommendationsRef = useRef<HTMLDivElement>(null);

  const getRecommendations = () => {
    setIsAnalyzing(true);
    // Simulate API delay
    setTimeout(() => {
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
            Early warning system for pest management with prevention strategies and treatment recommendations
          </p>
        </div>

        {/* Monitoring Setup */}
        <Card className="bg-white border-none shadow-sm rounded-2xl mb-10 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Eye className="h-5 w-5 text-orange-600" />
              <h3 className="font-bold text-gray-800">Monitoring Setup</h3>
            </div>
            
            <div className="grid md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-4 space-y-2">
                <label className="text-sm font-semibold text-gray-600">Select Crop</label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger className="bg-white border-gray-200 h-12 rounded-xl">
                    <SelectValue placeholder="Select Crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tomato">Tomato</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-4 space-y-2">
                <label className="text-sm font-semibold text-gray-600">Weather Condition</label>
                <Select value={weatherCondition} onValueChange={setWeatherCondition}>
                  <SelectTrigger className="bg-white border-gray-200 h-12 rounded-xl">
                    <SelectValue placeholder="Weather Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot-dry">Hot & Dry</SelectItem>
                    <SelectItem value="humid">Humid & Rainy</SelectItem>
                    <SelectItem value="cool">Cool & Moist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-4">
                <Button 
                  onClick={getRecommendations}
                  disabled={isAnalyzing}
                  className="w-full h-12 bg-[#E65100] hover:bg-[#BF360C] text-white font-bold rounded-xl flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <Bug className="h-4 w-4" />
                  )}
                  {isAnalyzing ? "Analyzing Data..." : "Get Recommendations"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card className="bg-white border border-red-100 shadow-sm rounded-2xl mb-10 overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <ShieldAlert className="h-6 w-6 text-red-600" />
              <h3 className="text-xl font-bold text-gray-800">Active Alerts (3)</h3>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "High Risk: Spider Mites",
                  desc: "Microscopic pests that cause stippling on leaves",
                  action: "Action Required: Immediate monitoring and treatment recommended"
                },
                {
                  title: "High Risk: Wilt",
                  desc: "Vascular disease causing plant wilting and death",
                  action: "Action Required: Preventive measures should be taken immediately"
                },
                {
                  title: "High Risk: Mosaic Virus",
                  desc: "Viral disease causing mottled leaf patterns",
                  action: "Action Required: Preventive measures should be taken immediately"
                }
              ].map((alert, i) => (
                <div key={i} className="bg-white border border-red-50 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
                    <div>
                      <h4 className="font-bold text-red-600 mb-1">{alert.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{alert.desc}</p>
                      <p className="text-red-800 font-bold text-sm">{alert.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pests & Diseases Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Common Pests */}
          <Card className="bg-white border-none shadow-sm rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <Bug className="h-6 w-6 text-red-600" />
                <h3 className="text-xl font-bold text-gray-800">Common Pests (1 found)</h3>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-100 rounded-2xl p-6 bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">🕷️</div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">Spider Mites</h4>
                        <p className="text-sm text-gray-500">Microscopic pests that cause stippling on leaves</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 flex items-center gap-1">
                      <X className="h-3 w-3" /> High
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["tomato", "pepper", "bean", "corn"].map(crop => (
                      <Badge key={crop} className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-none px-3 py-1 text-xs">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plant Diseases */}
          <Card className="bg-white border-none shadow-sm rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <Leaf className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-800">Plant Diseases (2 found)</h3>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-100 rounded-2xl p-6 bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">🥀</div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">Wilt</h4>
                        <p className="text-sm text-gray-500">Vascular disease causing plant wilting and death</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 flex items-center gap-1">
                      <X className="h-3 w-3" /> High
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["tomato", "cotton", "banana"].map(crop => (
                      <Badge key={crop} className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-none px-3 py-1 text-xs">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-100 rounded-2xl p-6 bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">🦠</div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">Mosaic Virus</h4>
                        <p className="text-sm text-gray-500">Viral disease causing mottled leaf patterns</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 flex items-center gap-1">
                      <X className="h-3 w-3" /> High
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["tomato", "cucumber", "tobacco"].map(crop => (
                      <Badge key={crop} className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-none px-3 py-1 text-xs">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations */}
        <AnimatePresence>
          {showRecommendations && (
            <motion.div
              ref={recommendationsRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden scroll-mt-20"
            >
              <Card className="bg-white border-none shadow-sm rounded-2xl mb-10 overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="h-6 w-6 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-800">AI-Powered Recommendations</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  <h4 className="font-bold text-gray-800">Prevention Strategies</h4>
                </div>
                <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                  <p>
                    **1. Cultural Practices:** - **Site Selection:** Choose well-drained fields with adequate sunlight to reduce disease risk. - **Planting Time:** Schedule planting during periods when pest populations are low. - **Crop Rotation:** Avoid planting tomatoes or other solanaceous crops in the same field consecutively to break pest and disease cycles. - **Optimal Spacing:** Ensure proper plant spacing to improve air circulation, reducing humidity and disease risk. - **Field Hygiene:** Regularly remove weeds to eliminate pest habitats. - **Debris Management:** After harvest, clear plant residues to prevent disease carryover. - **Sanitation:** Clean tools and equipment to prevent disease spread. - **Resistant Varieties:** Opt for tomato varieties resistant to common diseases like bacterial wilt and leaf curl virus.
                  </p>
                  <p>
                    **2. Organic Treatments:** - **Bio-Pesticides:** Bacillus thuringiensis (Bt) effective against caterpillar pests. - **Neem-Based Products:** Repel a variety of pests; use as a foliar spray. - **Natural Remedies:** Garlic and chili spray to deter pests. - **Marigold Trap Cropping:** Plant marigolds to attract and trap pests.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <FlaskConical className="h-5 w-5 text-green-600" />
                  <h4 className="font-bold text-gray-800">Organic Treatments</h4>
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  Utilize bio-pesticides like Bacillus thuringiensis (Bt) and neem-based products to control pests. Implement natural remedies such as garlic and chili sprays, and plant marigolds as trap crops. Encourage beneficial insects like ladybugs and predatory mites to manage pest populations.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )}
  </AnimatePresence>

        {/* Additional Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <Card className="bg-white border-none shadow-sm rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4 text-blue-600">
                <Eye className="h-5 w-5" />
                <h4 className="font-bold">Monitoring Tips</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Inspect plants weekly for signs of pests and diseases, preferably in the early morning or late afternoon. Look for discolored or deformed leaves, visible insects, webbing, spots, wilting, mold, or unusual growth patterns. Keep detailed records of pest and disease occurrences to inform future management decisions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-sm rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4 text-purple-600">
                <Zap className="h-5 w-5" />
                <h4 className="font-bold">Integrated Pest Management</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Implement an Integrated Pest Management strategy by combining cultural practices, organic treatments, and chemical controls. Select resistant varieties, practice crop rotation, maintain field hygiene, utilize bio-pesticides and natural remedies, encourage beneficial insects, and monitor fields regularly to manage pests and diseases effectively.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chemical Treatments Warning */}
        <Card className="bg-red-50 border border-red-100 shadow-sm rounded-2xl mb-10">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h4 className="font-bold text-red-800">Chemical Treatments (Use with Caution)</h4>
            </div>
            <p className="text-sm text-red-700 leading-relaxed">
              Apply chemical pesticides only when pest infestations exceed economic thresholds. Use insecticides for severe infestations of pests like whiteflies or fruit borers, and fungicides to control fungal diseases if organic methods are insufficient. Ensure safety by wearing personal protective equipment, applying during calm weather, adhering to pre-harvest intervals, and storing chemicals properly.
            </p>
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        <Card className="bg-white border-none shadow-sm rounded-2xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-8 text-blue-600">
              <Info className="h-6 w-6" />
              <h3 className="text-xl font-bold text-gray-800">Summary</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "High Risk Pests", value: "1", bg: "bg-red-50", text: "text-red-700" },
                { label: "High Risk Diseases", value: "2", bg: "bg-orange-50", text: "text-orange-700" },
                { label: "Total Threats", value: "3", bg: "bg-green-50", text: "text-green-700" },
                { label: "Active Alerts", value: "3", bg: "bg-blue-50", text: "text-blue-700" }
              ].map((stat, i) => (
                <div key={i} className={cn("rounded-2xl p-6 text-center shadow-sm", stat.bg)}>
                  <div className={cn("text-3xl font-black mb-1", stat.text)}>{stat.value}</div>
                  <div className={cn("text-xs font-bold uppercase tracking-widest opacity-60", stat.text)}>{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
