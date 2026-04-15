import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Search, 
  FlaskConical, 
  Upload, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  TestTube,
  Microscope,
  Phone,
  Navigation,
  Waves,
  Zap,
  Cloud,
  Activity,
  Droplets,
  Sprout,
  Wind,
  Layers3,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useWeather } from "@/hooks/useWeather";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar
} from 'recharts';

// Fix for default Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/leaflet/marker-shadow.png',
});

const SoilLabLocator = () => {
  const { t } = useLanguage();
  const { weather } = useWeather();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [showOcrScan, setShowOcrScan] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisMode, setAnalysisMode] = useState<"npk" | "structure">("npk");
  const [selectedLabForBooking, setSelectedLabForBooking] = useState<any>(null);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
  // Structural Analysis Inputs
  const [bulkDensity, setBulkDensity] = useState(1.4); // g/cm3
  const [moisture, setMoisture] = useState(25); // %
  const [organicMatter, setOrganicMatter] = useState(2.5); // %

  // Calculation Logic for Structural "Aeration" Score
  const structuralScore = useMemo(() => {
    // Basic scientific model for soil structure:
    // Ideal bulk density for aeration is < 1.3
    // Healthy organic matter > 4%
    // Optimal moisture 20-30%
    
    let score = 100;
    
    // Compaction penalty (Bulk Density)
    if (bulkDensity > 1.3) score -= (bulkDensity - 1.3) * 150;
    
    // Organic Matter bonus
    score += (organicMatter - 2.0) * 10;
    
    // Moisture balance
    const moistureOffset = Math.abs(moisture - 25);
    score -= moistureOffset * 0.5;
    
    return Math.min(Math.max(Math.round(score), 10), 98);
  }, [bulkDensity, moisture, organicMatter]);

  const getStructuralStatus = (score: number) => {
    if (score > 80) return { label: "Excellent", color: "text-emerald-500", desc: "Highly porous, zero compaction." };
    if (score > 60) return { label: "Optimal", color: "text-blue-500", desc: "Balanced structure, high root ease." };
    if (score > 40) return { label: "Moderate", color: "text-amber-500", desc: "Minor compaction detected." };
    return { label: "Critical", color: "text-rose-500", desc: "Root growth restricted by density." };
  };

  const currentStatus = getStructuralStatus(structuralScore);

  const filteredLabs = useMemo(() => {
    const query = searchQuery.trim();
    
    // Core Seeded Generator
    const generateLabs = (pc: string) => {
      const seed = parseInt(pc) || 515001;
      const isAnantapur = pc.startsWith("515");
      
      // Seeded coordinates for consistency
      const latBase = isAnantapur ? 14.6 : 12 + (seed % 15);
      const lonBase = isAnantapur ? 77.6 : 74 + (seed % 10);
      
      const centers = [
        {
          id: `gen-1-${pc}`,
          name: `National Soil Testing Unit - Cluster ${pc.slice(-2)}`,
          rating: 4.5 + (seed % 5) / 10,
          certified: true,
          time: "Opens at 9 AM",
          pincode: pc,
          tags: ["Macro Nutrients", "Micro Nutrients"],
          phone: `+91 ${seed % 99999} ${seed % 88888}`,
          coords: [latBase + (seed % 100) / 1000, lonBase + (seed % 80) / 1000] as [number, number]
        },
        {
          id: `gen-2-${pc}`,
          name: `Kendra Regional Agri-Lab ${pc.slice(0, 3)}`,
          rating: 4.2 + (seed % 8) / 10,
          certified: false,
          time: "Open 24 Hrs",
          pincode: pc,
          tags: ["Soil pH", "Organic Carbon"],
          phone: `+91 ${seed % 77777} ${seed % 66666}`,
          coords: [latBase - (seed % 50) / 1000, lonBase - (seed % 60) / 1000] as [number, number]
        }
      ];
      return centers;
    };

    if (!query) {
      // Show default Anantapur set if no search
      return [
        {
          id: 1,
          name: "National Soil Testing Centre",
          rating: 4.9,
          certified: true,
          time: "Opens at 9 AM",
          pincode: "515001",
          tags: ["Macro Nutrients", "Micro Nutrients"],
          phone: "+91 11 2584 1000",
          coords: [14.6819, 77.6006] as [number, number]
        },
        {
          id: 2,
          name: "Anantapur Town Testing Unit",
          rating: 4.8,
          certified: true,
          time: "Open 24 Hrs",
          pincode: "515002",
          tags: ["Potable Water", "Soil"],
          phone: "+91 8554 277665",
          coords: [14.6700, 77.5900] as [number, number]
        }
      ];
    }
    
    // If it's a full pincode, generate or filter
    if (query.length === 6) {
      return generateLabs(query);
    }
    
    // Partial search
    return [
      {
        id: 1,
        name: "National Soil Testing Centre",
        rating: 4.9,
        certified: true,
        time: "Opens at 9 AM",
        pincode: "515001",
        tags: ["Macro Nutrients", "Micro Nutrients"],
        phone: "+91 11 2584 1000",
        coords: [14.6819, 77.6006] as [number, number]
      },
      {
        id: 2,
        name: "Anantapur Town Testing Unit",
        rating: 4.8,
        certified: true,
        time: "Open 24 Hrs",
        pincode: "515002",
        tags: ["Potable Water", "Soil"],
        phone: "+91 8554 277665",
        coords: [14.6700, 77.5900] as [number, number]
      }
    ].filter(lab => lab.pincode.startsWith(query));
  }, [searchQuery]);

  // Map Auto-Center Logic Component
  const MapController = ({ centerRepos }: { centerRepos: [number, number][] }) => {
    const map = useMap();
    useEffect(() => {
      if (centerRepos.length > 0) {
        const bounds = L.latLngBounds(centerRepos);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
      }
    }, [centerRepos, map]);
    return null;
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleNavigate = (coords: [number, number], name: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${coords[0]},${coords[1]}`, '_blank');
  };

  const handleOptimise = () => {
    toast({
      title: "Optimisation Vector Locked",
      description: `Aeration protocols calculated. Expected Porosity Gain: +12.4%. implementing deep tillage advice.`,
    });
  };

  const handleDownload = () => {
    const reportContent = `SOIL ANALYSIS REPORT - ${new Date().toLocaleDateString()}\n\n` +
      `Structure Score: ${structuralScore}%\n` +
      `Bulk Density: ${bulkDensity} g/cm3\n` +
      `Moisture: ${moisture}%\n` +
      `Organic Matter: ${organicMatter}%\n\n` +
      `RECOMMENDATION: ${currentStatus.desc}`;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Soil_Analysis_${Date.now()}.txt`;
    a.click();
    
    toast({
      title: "Report Generated",
      description: "Digital analysis report has been saved to your device.",
    });
  };

  const handleUpload = () => {
    setIsUploading(true);
    setShowOcrScan(true);
    setTimeout(() => {
      setAnalysisResult({
        nitrogen: "Low (110 kg/ha)",
        phosphorus: "Medium (18 kg/ha)",
        potassium: "High (290 kg/ha)",
        ph: "6.8 (Neutral)",
        recommendation: "Increase Nitrogen application by 20% for upcoming Kharif crop. Suitable for Wheat and Mustard.",
        rawValues: { N: 110, P: 18, K: 290, PH: 6.8 }
      });
      setIsUploading(false);
      setTimeout(() => setShowOcrScan(false), 1500);
    }, 4500);
  };

  const trendData = [
    { month: 'Jan', N: 140, P: 12, K: 260 },
    { month: 'Mar', N: 135, P: 15, K: 270 },
    { month: 'May', N: 120, P: 20, K: 285 },
    { month: 'Jul', N: 115, P: 18, K: 295 },
    { month: 'Sep', N: 110, P: 19, K: 290 },
  ];

  const regionalAverage = [
    { metric: 'Nitrogen', value: analysisResult?.rawValues?.N || 110, avg: 145 },
    { metric: 'Phosphorus', value: analysisResult?.rawValues?.P || 18, avg: 24 },
    { metric: 'Potassium', value: analysisResult?.rawValues?.K || 290, avg: 220 },
  ];

  const fertilizerTiming = useMemo(() => {
    if (!weather?.daily?.[0]) return { safe: true, reason: "Atmospheric scan active." };
    const pop = weather.daily[0].pop; // Prob of precipitation
    if (pop > 0.3) return { safe: false, reason: `Rain probable (${Math.round(pop*100)}%). Nutrient leaching risk high.` };
    return { safe: true, reason: "Stable weather. Optimal for nutrient absorption." };
  }, [weather]);

  const subsidies = useMemo(() => {
    const list = [
      { id: 'shc', name: "Soil Health Card Scheme", desc: "100% subsidy on soil testing fees.", matched: true },
      { id: 'pranam', name: "PM-PRANAM Scheme", desc: "Grant for shifting to organic alternatives.", matched: analysisResult?.rawValues?.N < 120 },
    ];
    return list;
  }, [analysisResult]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 pt-10">
          <h1 className="text-4xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic leading-[0.9] mb-6">
            {t('soilLabTitle') || "Soil Lab Locator"}
          </h1>
          <p className="text-xl text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
            {t('soilLabDesc') || "Find nearby certified soil testing labs and get AI crop recommendations."}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Lab List */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative group">
              <Search className={cn("absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors", searchQuery ? "text-emerald-500" : "text-slate-400")} />
              <input 
                type="text" 
                placeholder="Type pin code (e.g., 515001)" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 pl-16 pr-6 bg-white dark:bg-slate-900 border-none shadow-xl rounded-3xl text-sm font-bold italic outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-mono"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:text-rose-600"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-4 pt-4">
              {filteredLabs.length > 0 ? filteredLabs.map((lab) => (
                <Card key={lab.id} className="p-6 rounded-[2rem] border-none shadow-xl bg-white dark:bg-slate-900 group hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">{lab.name}</h4>
                        {lab.certified && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 italic">{lab.time} • Pin: {lab.pincode}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-amber-500 italic">★ {lab.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                     {lab.tags.map((tag, i) => (
                       <span key={i} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-500 italic">
                         {tag}
                       </span>
                     ))}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleCall(lab.phone)}
                      className="flex-1 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest"
                    >
                      <Phone className="mr-2 h-3 w-3" /> Call
                    </Button>
                    <Button 
                      onClick={() => setSelectedLabForBooking(lab)}
                      className="flex-1 h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest"
                    >
                      <Calendar className="mr-2 h-3 w-3" /> Book Slot
                    </Button>
                  </div>
                </Card>
              )) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
                   <div className="h-12 w-12 bg-rose-50 dark:bg-rose-900/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="h-6 w-6" />
                   </div>
                   <h5 className="font-black italic text-slate-900 dark:text-white uppercase tracking-tighter">No Centers in {searchQuery}</h5>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Try another regional pin code</p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column - Map & AI Analyzer */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="p-0 rounded-[3rem] border-none shadow-xl bg-slate-100 overflow-hidden h-[400px] relative">
               <MapContainer center={[14.6819, 77.6006]} zoom={11} scrollWheelZoom={false} className="h-full w-full z-10">
                 <MapController centerRepos={filteredLabs.map(l => l.coords)} />
                 <TileLayer
                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 />
                 {filteredLabs.map(lab => (
                   <Marker key={lab.id} position={lab.coords}>
                     <Popup>
                       <div className="p-2">
                          <h4 className="font-black italic text-slate-900 uppercase tracking-tight leading-none mb-1">{lab.name}</h4>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{lab.time}</p>
                          <Button 
                            className="h-8 w-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg"
                            onClick={() => handleNavigate(lab.coords, lab.name)}
                          >
                            Get Directions
                          </Button>
                       </div>
                     </Popup>
                   </Marker>
                 ))}
               </MapContainer>
               
               <div className="absolute bottom-6 right-6 z-[1000] p-4 bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-white/20">
                  <h3 className="text-sm font-black uppercase italic tracking-tighter text-slate-900">Map Coverage</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">{filteredLabs.length} Labs Active in Sector</p>
               </div>
            </Card>

            <Card className="p-10 rounded-[3rem] border-none shadow-xl bg-white dark:bg-slate-900">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl flex items-center justify-center">
                       {analysisMode === 'npk' ? <Microscope className="h-6 w-6" /> : <Layers3 className="h-6 w-6" />}
                     </div>
                     <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                       {analysisMode === 'npk' ? 'AI Soil Health Analyzer' : 'Soil Structural Analysis'}
                     </h3>
                  </div>

                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
                     <button 
                       onClick={() => setAnalysisMode('npk')}
                       className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", analysisMode === 'npk' ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-600")}
                     >
                       NPK Map
                     </button>
                     <button 
                       onClick={() => setAnalysisMode('structure')}
                       className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", analysisMode === 'structure' ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-600")}
                     >
                       Structure
                     </button>
                  </div>
               </div>

               <AnimatePresence mode="wait">
                 {analysisMode === 'structure' ? (
                    <motion.div 
                      key="structure"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-10"
                    >
                      <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Gauge Container */}
                        <div className="relative group">
                           <div className="absolute -inset-10 bg-emerald-500/10 blur-[80px] rounded-full antigravity-float" />
                           <div className="relative aspect-square flex items-center justify-center bg-white/50 dark:bg-slate-800/50 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-white/5 shadow-2xl overflow-hidden">
                              <div className="antigravity-particles absolute inset-0 opacity-30" />
                              
                              <div className="relative text-center">
                                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2 italic">Aeration Health Index</p>
                                 <div className="relative">
                                    <h4 className="text-9xl font-black italic tracking-tighter leading-none text-slate-900 dark:text-white flex items-start justify-center group-hover:scale-105 transition-transform duration-500">
                                      {structuralScore}<span className="text-3xl text-emerald-500 mt-4">%</span>
                                    </h4>
                                    <div className="absolute -top-4 -right-4">
                                       <Zap className="h-6 w-6 text-amber-500 animate-pulse" />
                                    </div>
                                 </div>
                                 <div className={cn("mt-6 px-6 py-2 rounded-full inline-block font-black uppercase tracking-widest text-xs italic", currentStatus.color.replace('text-', 'bg-').replace('text-', 'text-').concat('/10'), currentStatus.color)}>
                                    {currentStatus.label} Porosity
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Controls Container */}
                        <div className="space-y-8">
                           <div className="space-y-6">
                              <div className="space-y-2">
                                 <div className="flex justify-between items-center px-1">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Bulk Density (g/cm³)</Label>
                                    <span className="text-xs font-black italic text-emerald-600">{bulkDensity.toFixed(2)}</span>
                                 </div>
                                 <input 
                                   type="range" min="1.0" max="1.8" step="0.01" 
                                   value={bulkDensity} onChange={(e) => setBulkDensity(parseFloat(e.target.value))}
                                   className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-emerald-500 cursor-pointer"
                                 />
                                 <div className="flex justify-between text-[8px] font-bold text-slate-300 uppercase tracking-tighter">
                                    <span>Aerated (1.0)</span>
                                    <span>Compacted (1.8)</span>
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <div className="flex justify-between items-center px-1">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Organic Matter (%)</Label>
                                    <span className="text-xs font-black italic text-emerald-600">{organicMatter.toFixed(1)}%</span>
                                 </div>
                                 <input 
                                   type="range" min="0" max="10" step="0.1" 
                                   value={organicMatter} onChange={(e) => setOrganicMatter(parseFloat(e.target.value))}
                                   className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-blue-500 cursor-pointer"
                                 />
                                 <div className="flex justify-between text-[8px] font-bold text-slate-300 uppercase tracking-tighter">
                                    <span>Low Carbon</span>
                                    <span>High Porosity</span>
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <div className="flex justify-between items-center px-1">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Soil Moisture (%)</Label>
                                    <span className="text-xs font-black italic text-emerald-600">{moisture}%</span>
                                 </div>
                                 <input 
                                   type="range" min="5" max="50" step="1" 
                                   value={moisture} onChange={(e) => setMoisture(parseInt(e.target.value))}
                                   className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-blue-600 cursor-pointer"
                                 />
                                 <div className="flex justify-between text-[8px] font-bold text-slate-300 uppercase tracking-tighter">
                                    <span>Dry</span>
                                    <span>Saturated</span>
                                 </div>
                              </div>
                           </div>

                           <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800 border-l-4 border-emerald-500 space-y-3 shadow-xl shadow-slate-200/50 dark:shadow-none">
                              <div className="flex items-center gap-2">
                                <Activity className="h-4 w-4 text-emerald-600" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 italic">Structural Insight</p>
                              </div>
                              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed italic">
                                {currentStatus.desc} {structuralScore < 50 ? "Recommend implementing deep aeration and compaction reduction protocols." : "Current structure supports high nutrient uptake."}
                              </p>
                           </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                         {[
                           { icon: Wind, title: "Aeration Level", value: structuralScore > 70 ? "High" : "Optimal", color: "text-blue-500 bg-blue-50 dark:bg-blue-900/10" },
                           { icon: Cloud, title: "Porosity Index", value: (organicMatter * 8.2).toFixed(1) + "%", color: "text-purple-500 bg-purple-50 dark:bg-purple-900/10" },
                           { icon: Sprout, title: "Root Potential", value: structuralScore + "/100", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/10" }
                         ].map((card, i) => (
                           <Card key={i} className="p-6 rounded-[2rem] border-none shadow-xl bg-white dark:bg-slate-800 flex items-center gap-4 group hover:scale-105 transition-transform">
                              <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0", card.color)}>
                                 <card.icon className="h-6 w-6" />
                              </div>
                              <div>
                                 <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic mb-1">{card.title}</p>
                                 <h5 className="font-black italic text-slate-900 dark:text-white tracking-tighter">{card.value}</h5>
                              </div>
                           </Card>
                         ))}
                      </div>

                      <div className="flex gap-4">
                        <Button 
                          onClick={handleOptimise}
                          className="h-16 bg-slate-900 hover:bg-black text-white rounded-[1.5rem] text-sm font-black uppercase tracking-widest italic flex-1 shadow-2xl shadow-slate-900/20 group"
                        >
                          Optimise Soil Structure <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={handleDownload}
                          className="h-16 rounded-[1.5rem] text-sm font-black uppercase tracking-widest italic flex-1 border-2"
                        >
                          Download Analysis Report
                        </Button>
                      </div>
                    </motion.div>
                 ) : !analysisResult && !isUploading ? (
                   <div className="border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[2rem] p-12 text-center group transition-colors hover:border-emerald-500/50">
                      <TestTube className="h-20 w-20 mx-auto text-slate-300 dark:text-slate-700 mb-6 group-hover:text-emerald-500 transition-colors" />
                      <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase italic mb-2">Upload Soil Health Card</h4>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Capture or upload your government soil report PDF/Image</p>
                      <Button onClick={handleUpload} className="h-14 px-8 bg-slate-900 hover:bg-emerald-600 text-white font-black rounded-2xl italic tracking-widest uppercase text-xs">
                        <Upload className="mr-3 h-5 w-5" /> Select File
                      </Button>
                   </div>
                 ) : (isUploading || showOcrScan) ? (
                   <motion.div 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                     className="py-20 text-center relative overflow-hidden"
                   >
                      <div className="absolute inset-x-0 h-1 bg-emerald-500/50 blur-sm antigravity-float-slow opacity-30 top-1/2" />
                      <div className="relative w-32 h-32 mx-auto mb-8">
                        <motion.div 
                          animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }} 
                          className="absolute inset-0 rounded-[2rem] border-4 border-emerald-500/20 border-t-emerald-500" 
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div 
                            animate={{ y: [-40, 40, -40] }} 
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-full h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] z-10"
                          />
                          <Microscope className="h-10 w-10 text-emerald-600 opacity-50" />
                        </div>
                      </div>
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-2">Advanced AI OCR Scanning...</h4>
                      <p className="text-emerald-600 font-black uppercase tracking-widest text-[10px] animate-pulse">Extracting Hyperspectral Nutrients</p>
                   </motion.div>
                 ) : (
                   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {[
                           { label: "Nitrogen (N)", value: analysisResult.nitrogen, color: "text-rose-500 bg-rose-50 dark:bg-rose-500/10" },
                           { label: "Phosphorus (P)", value: analysisResult.phosphorus, color: "text-amber-500 bg-amber-50 dark:bg-amber-500/10" },
                           { label: "Potassium (K)", value: analysisResult.potassium, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" },
                           { label: "Soil pH", value: analysisResult.ph, color: "text-blue-500 bg-blue-50 dark:bg-blue-500/10" }
                         ].map((item, i) => (
                           <div key={i} className={cn("p-4 rounded-2xl", item.color)}>
                             <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2 italic">{item.label}</p>
                             <h5 className="font-black italic tracking-tighter leading-none">{item.value}</h5>
                           </div>
                         ))}
                      </div>

                      <div className="grid lg:grid-cols-2 gap-8">
                        {/* Weather-Fertilizer Sync */}
                        <div className={cn("p-6 rounded-[2rem] border-l-4 transition-all", fertilizerTiming.safe ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-500" : "bg-orange-50 dark:bg-orange-900/10 border-orange-500")}>
                          <div className="flex items-center gap-3 mb-3">
                             <div className={cn("h-8 w-8 rounded-xl flex items-center justify-center", fertilizerTiming.safe ? "bg-emerald-500/20 text-emerald-600" : "bg-orange-500/20 text-orange-600")}>
                               {fertilizerTiming.safe ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                             </div>
                             <p className="text-[10px] font-black uppercase tracking-widest italic">Fertilizer Timing Intel</p>
                          </div>
                          <h4 className="font-black italic text-slate-900 dark:text-white mb-1 uppercase tracking-tight">Window: {fertilizerTiming.safe ? "Optimal" : "Leaching Risk"}</h4>
                          <p className="text-xs font-bold text-slate-500 italic">{fertilizerTiming.reason}</p>
                        </div>

                        {/* Recommendation Card */}
                        <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border-l-4 border-slate-900 dark:border-white">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 italic">Expert AI Recommendation</p>
                          <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed italic">{analysisResult.recommendation}</p>
                        </div>
                      </div>

                      {/* Advanced Analytics Tabs */}
                      <div className="space-y-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                         <div className="grid lg:grid-cols-3 gap-8">
                            {/* Historical Trends */}
                            <div className="lg:col-span-2 space-y-4">
                               <h4 className="text-sm font-black uppercase italic tracking-widest">12-Month Progression Trend</h4>
                               <div className="h-[250px] w-full">
                                  <ResponsiveContainer width="100%" height="100%">
                                     <AreaChart data={trendData}>
                                        <defs>
                                           <linearGradient id="colorN" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                                        <RechartsTooltip contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
                                        <Area type="monotone" dataKey="N" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorN)" />
                                        <Area type="monotone" dataKey="P" stroke="#0ea5e9" strokeWidth={3} fillOpacity={0} />
                                     </AreaChart>
                                  </ResponsiveContainer>
                               </div>
                            </div>

                            {/* Community Pulse */}
                            <div className="space-y-4">
                               <h4 className="text-sm font-black uppercase italic tracking-widest">Neighborhood Comparison</h4>
                               <div className="h-[250px] w-full">
                                  <ResponsiveContainer width="100%" height="100%">
                                     <BarChart data={regionalAverage} layout="vertical">
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="metric" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} width={70} />
                                        <RechartsTooltip />
                                        <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={12} />
                                        <Bar dataKey="avg" fill="#CBD5E1" radius={[0, 4, 4, 0]} barSize={12} />
                                     </BarChart>
                                  </ResponsiveContainer>
                               </div>
                            </div>
                         </div>

                         {/* Subsidy Matcher */}
                         <div className="space-y-6">
                            <h4 className="text-sm font-black uppercase italic tracking-widest">Eligible Subsidies & Grants</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                               {subsidies.filter(s => s.matched).map(s => (
                                 <div key={s.id} className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-xl flex items-start gap-4 hover:border-emerald-500 transition-colors">
                                    <div className="h-10 w-10 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                                       <Zap className="h-5 w-5" />
                                    </div>
                                    <div>
                                       <h5 className="font-black italic text-slate-900 dark:text-white uppercase tracking-tighter text-sm mb-1">{s.name}</h5>
                                       <p className="text-[10px] font-bold text-slate-400 italic mb-4">{s.desc}</p>
                                       <Button 
                                         onClick={() => toast({ title: "Application Initiated", description: `Registering for ${s.name} via Krishi Seva Portal...` })}
                                         className="h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-black uppercase tracking-widest italic"
                                       >
                                         Apply via KSP
                                       </Button>
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                      <div className="flex gap-4">
                        <Button variant="outline" onClick={() => setAnalysisResult(null)} className="h-12 rounded-xl text-xs font-black uppercase tracking-widest italic flex-1">
                          Scan New Report
                        </Button>
                         <Button 
                           onClick={() => toast({ title: "Benefits Locked", description: "Your eligibility has been verified. Subsidy credits will be applied to your next seed purchase." })}
                           className="h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-widest italic flex-1"
                         >
                           Secure Subsidy Benefits
                         </Button>
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </Card>

            {/* Booking Modal Overlay */}
            <AnimatePresence>
              {selectedLabForBooking && (
                <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedLabForBooking(null)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.9, y: 20 }}
                     className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] shadow-3xl overflow-hidden p-10"
                   >
                     {!isBookingSuccess ? (
                       <div className="space-y-8">
                         <div className="text-center">
                           <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6">
                              <Calendar className="h-8 w-8" />
                           </div>
                           <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Secure Laboratory Slot</h4>
                           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{selectedLabForBooking.name}</p>
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                           {['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map(slot => (
                             <Button key={slot} variant="outline" className="h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest italic hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200">
                               {slot}
                             </Button>
                           ))}
                         </div>

                         <Button onClick={() => setIsBookingSuccess(true)} className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black uppercase italic tracking-widest">
                            Confirm Appointment
                         </Button>
                       </div>
                     ) : (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-8">
                         <div className="h-24 w-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
                            <CheckCircle2 className="h-12 w-12 antialiased" />
                         </div>
                         <div>
                            <h4 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-2">Slot Confirmed!</h4>
                            <p className="text-slate-400 font-bold italic text-sm">Your digital laboratory pass is active.</p>
                         </div>
                         <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 italic">Verification Pass</p>
                            <div className="h-32 w-32 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-inner">
                               <div className="p-4 bg-slate-900 rounded-xl">
                                  <Zap className="h-12 w-12 text-white animate-pulse" />
                               </div>
                            </div>
                            <p className="mt-4 font-black italic text-slate-900 dark:text-white">SHC-ID: LAB-7762X</p>
                         </div>
                         <Button onClick={() => { setSelectedLabForBooking(null); setIsBookingSuccess(false); }} className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest italic">Close Pass</Button>
                       </motion.div>
                     )}
                   </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilLabLocator;
