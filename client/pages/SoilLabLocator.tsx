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
  AlertTriangle,
  Truck,
  Package,
  History,
  TrendingUp,
  Award,
  Clock
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
import { useFarmerLocation } from "@/lib/LocationContext";
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
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PACKAGES = [
  { id: 'basic', name: 'Basic (SHC)', price: 0, icon: Microscope, tags: ['NPK', 'pH'], desc: 'Government subsidized basic health check.' },
  { id: 'micro', name: 'Micro-Nutrient', price: 299, icon: FlaskConical, tags: ['Zinc', 'Boron', 'Iron'], desc: 'Detailed micronutrient analysis.' },
  { id: 'bio', name: 'Bio-Intelligence', price: 599, icon: Activity, tags: ['Organic Carbon', 'Bacterial'], desc: 'Complete soil microbiology report.' }
];

const SoilLabLocator = () => {
  const { t } = useLanguage();
  const { weather } = useWeather();
  const { toast } = useToast();
  const { farmerLocation, detectLocation, isLoading: isLocating } = useFarmerLocation();
  
  const [isUploading, setIsUploading] = useState(false);
  const [showOcrScan, setShowOcrScan] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisMode, setAnalysisMode] = useState<"npk" | "structure" | "history">("npk");
  const [selectedLabForBooking, setSelectedLabForBooking] = useState<any>(null);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Booking State
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[0]);
  const [isPickupEnabled, setIsPickupEnabled] = useState(false);
  const [pickupDate, setPickupDate] = useState("2026-05-16");

  // Structural Analysis Inputs
  const [bulkDensity, setBulkDensity] = useState(1.4); // g/cm3
  const [moisture, setMoisture] = useState(25); // %
  const [organicMatter, setOrganicMatter] = useState(2.5); // %

  const structuralScore = useMemo(() => {
    let score = 100;
    if (bulkDensity > 1.3) score -= (bulkDensity - 1.3) * 150;
    score += (organicMatter - 2.0) * 10;
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
    
    const generateLabs = (pc: string) => {
      const seed = parseInt(pc) || 515001;
      const isAnantapur = pc.startsWith("515");
      const latBase = isAnantapur ? 14.6 : 12 + (seed % 15);
      const lonBase = isAnantapur ? 77.6 : 74 + (seed % 10);
      
      return [
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
    };

    if (!query) {
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
    
    if (query.length === 6) return generateLabs(query);
    
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
      }
    ].filter(lab => lab.pincode.startsWith(query));
  }, [searchQuery]);

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

  const handleGpsDetect = async () => {
    await detectLocation();
    setSearchQuery("515001"); // Simulate finding labs for detected location
    toast({
      title: "Location Synced",
      description: `Searching for labs near ${farmerLocation.district}, ${farmerLocation.state}`,
    });
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
    { month: 'Jan 25', N: 140, P: 12, K: 260, score: 72 },
    { month: 'Mar 25', N: 135, P: 15, K: 270, score: 75 },
    { month: 'May 25', N: 120, P: 20, K: 285, score: 82 },
    { month: 'Jul 25', N: 115, P: 18, K: 295, score: 78 },
    { month: 'Sep 25', N: 110, P: 19, K: 290, score: 85 },
  ];

  const regionalAverage = [
    { metric: 'Nitrogen', value: analysisResult?.rawValues?.N || 110, avg: 145 },
    { metric: 'Phosphorus', value: analysisResult?.rawValues?.P || 18, avg: 24 },
    { metric: 'Potassium', value: analysisResult?.rawValues?.K || 290, avg: 220 },
  ];

  const fertilizerTiming = useMemo(() => {
    if (!weather?.daily?.[0]) return { safe: true, reason: "Atmospheric scan active." };
    const pop = weather.daily[0].pop;
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 pt-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-emerald-500/10 text-emerald-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] italic mb-6 border border-emerald-500/20"
          >
             Precision Pedology Hub
          </motion.div>
          <h1 className="text-4xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic leading-[0.85] mb-6">
            Soil Test <br /> Locator
          </h1>
          <p className="text-xl text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
            Discover labs, book collection services, and track nutrient trends.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Lab List */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
               <div className="relative group">
                 <Search className={cn("absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors", searchQuery ? "text-emerald-500" : "text-slate-400")} />
                 <input 
                   type="text" 
                   placeholder="Pincode or City..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full h-16 pl-16 pr-6 bg-white dark:bg-slate-900 border-none shadow-xl rounded-3xl text-sm font-bold italic outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
                 />
               </div>
               
               <Button 
                 onClick={handleGpsDetect}
                 disabled={isLocating}
                 className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-2xl font-black uppercase italic tracking-widest text-xs shadow-xl flex items-center justify-center gap-3"
               >
                 {isLocating ? <Activity className="animate-spin h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                 {isLocating ? "Detecting GPS..." : "Find Labs Near Me"}
               </Button>
            </div>

            <div className="space-y-4 pt-4">
              {filteredLabs.map((lab) => (
                <Card key={lab.id} className="p-6 rounded-[2.5rem] border-none shadow-xl bg-white dark:bg-slate-900 group hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">{lab.name}</h4>
                        {lab.certified && <Award className="h-4 w-4 text-emerald-500" />}
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 italic flex items-center gap-2">
                        <Clock className="h-3 w-3" /> {lab.time} • {lab.pincode}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                     {lab.tags.map((tag, i) => (
                       <span key={i} className="px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-400 italic">
                         {tag}
                       </span>
                     ))}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleCall(lab.phone)}
                      className="flex-1 h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest"
                    >
                      <Phone className="mr-2 h-3 w-3" /> Call
                    </Button>
                    <Button 
                      onClick={() => setSelectedLabForBooking(lab)}
                      className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest"
                    >
                      <Calendar className="mr-2 h-3 w-3" /> Book Test
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column - Map & AI Analyzer */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="p-0 rounded-[3rem] border-none shadow-xl bg-slate-100 overflow-hidden h-[450px] relative">
               <MapContainer center={[14.6819, 77.6006]} zoom={11} scrollWheelZoom={false} className="h-full w-full z-10">
                 <MapController centerRepos={filteredLabs.map(l => l.coords)} />
                 <TileLayer
                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 />
                 {filteredLabs.map(lab => (
                   <Marker key={lab.id} position={lab.coords}>
                     <Popup>
                       <div className="p-2 min-w-[150px]">
                          <h4 className="font-black italic text-slate-900 uppercase tracking-tight leading-none mb-1">{lab.name}</h4>
                          <Button 
                            className="h-8 w-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg mt-2"
                            onClick={() => handleNavigate(lab.coords, lab.name)}
                          >
                            <Navigation size={12} className="mr-2" /> Navigate
                          </Button>
                       </div>
                     </Popup>
                   </Marker>
                 ))}
               </MapContainer>
            </Card>

            <Card className="p-10 rounded-[3rem] border-none shadow-xl bg-white dark:bg-slate-900">
               <div className="flex items-center justify-between mb-10 overflow-x-auto pb-4 scrollbar-none">
                  <div className="flex items-center gap-4 shrink-0">
                     <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl flex items-center justify-center">
                       {analysisMode === 'npk' ? <Microscope /> : analysisMode === 'structure' ? <Layers3 /> : <History />}
                     </div>
                     <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                       {analysisMode === 'npk' ? 'Nutrient Analyzer' : analysisMode === 'structure' ? 'Soil Architecture' : 'Historical Trends'}
                     </h3>
                  </div>

                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl shrink-0">
                     {[
                       { id: 'npk', label: 'NPK Map' },
                       { id: 'structure', label: 'Structure' },
                       { id: 'history', label: 'History' }
                     ].map(tab => (
                       <button 
                         key={tab.id}
                         onClick={() => setAnalysisMode(tab.id as any)}
                         className={cn("px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", analysisMode === tab.id ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-600")}
                       >
                         {tab.label}
                       </button>
                     ))}
                  </div>
               </div>

               <AnimatePresence mode="wait">
                 {analysisMode === 'history' ? (
                   <motion.div key="history" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                      <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={trendData}>
                              <defs>
                                 <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                 </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                              <YAxis hide />
                              <RechartsTooltip contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '1.5rem'}} />
                              <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                              <Line type="monotone" dataKey="N" stroke="#f43f5e" strokeWidth={2} dot={false} />
                              <Line type="monotone" dataKey="P" stroke="#f59e0b" strokeWidth={2} dot={false} />
                              <Line type="monotone" dataKey="K" stroke="#3b82f6" strokeWidth={2} dot={false} />
                           </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                         <div className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Nitrogen Drift</p>
                            <h4 className="text-3xl font-black italic text-rose-500">-12%</h4>
                         </div>
                         <div className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Potassium Gain</p>
                            <h4 className="text-3xl font-black italic text-emerald-500">+8.4%</h4>
                         </div>
                         <div className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Overall Health</p>
                            <h4 className="text-3xl font-black italic text-blue-500">Rising</h4>
                         </div>
                      </div>
                   </motion.div>
                 ) : analysisMode === 'structure' ? (
                   <motion.div key="structure" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                      <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative aspect-square flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-[3.5rem] border border-slate-100 dark:border-slate-700 shadow-inner">
                           <div className="text-center">
                              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2 italic">Aeration Index</p>
                              <h4 className="text-9xl font-black italic tracking-tighter leading-none text-slate-900 dark:text-white">
                                {structuralScore}<span className="text-3xl text-emerald-500">%</span>
                              </h4>
                              <div className={cn("mt-6 px-6 py-2 rounded-full inline-block font-black uppercase tracking-widest text-[10px] italic", currentStatus.color.replace('text-', 'bg-').concat('/10'), currentStatus.color)}>
                                 {currentStatus.label}
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6">
                           {[
                             { label: "Bulk Density", val: bulkDensity, min: 1.0, max: 1.8, step: 0.01, setter: setBulkDensity, unit: "g/cm³" },
                             { label: "Organic Matter", val: organicMatter, min: 0, max: 10, step: 0.1, setter: setOrganicMatter, unit: "%" },
                             { label: "Soil Moisture", val: moisture, min: 5, max: 50, step: 1, setter: setMoisture, unit: "%" }
                           ].map((item, i) => (
                             <div key={i} className="space-y-3">
                                <div className="flex justify-between items-center px-1">
                                   <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">{item.label}</Label>
                                   <span className="text-xs font-black italic text-emerald-600">{item.val}{item.unit}</span>
                                </div>
                                <input 
                                  type="range" min={item.min} max={item.max} step={item.step} 
                                  value={item.val} onChange={(e) => item.setter(parseFloat(e.target.value))}
                                  className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-emerald-500 cursor-pointer"
                                />
                             </div>
                           ))}
                           <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-900/10 border-l-4 border-emerald-500">
                              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 leading-relaxed italic">{currentStatus.desc}</p>
                           </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button onClick={handleOptimise} className="h-16 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest italic flex-1">
                           Optimise Soil Structure <ArrowRight className="ml-3" />
                        </Button>
                        <Button variant="outline" onClick={handleDownload} className="h-16 rounded-2xl text-xs font-black uppercase tracking-widest italic flex-1">
                           Download Report
                        </Button>
                      </div>
                   </motion.div>
                 ) : !analysisResult && !isUploading ? (
                   <div className="border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem] p-20 text-center group transition-colors hover:border-emerald-500/50">
                      <TestTube className="h-20 w-20 mx-auto text-slate-200 dark:text-slate-800 mb-8 group-hover:text-emerald-500 transition-colors" />
                      <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase italic mb-2">Upload Lab Report</h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-10">Scan your physical soil health card to sync digital metrics</p>
                      <Button onClick={handleUpload} className="h-16 px-10 bg-slate-900 hover:bg-emerald-600 text-white font-black rounded-2xl italic tracking-widest uppercase text-xs">
                        <Upload className="mr-3 h-5 w-5" /> Select Report File
                      </Button>
                   </div>
                 ) : (isUploading || showOcrScan) ? (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
                      <div className="relative w-32 h-32 mx-auto mb-10">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-[2rem] border-4 border-emerald-500/10 border-t-emerald-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Microscope className="h-10 w-10 text-emerald-600 animate-pulse" />
                        </div>
                      </div>
                      <h4 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-2">AI Extraction...</h4>
                      <p className="text-emerald-600 font-black uppercase tracking-widest text-[10px] animate-pulse">Syncing with Nutrient Database</p>
                   </motion.div>
                 ) : (
                   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {[
                           { label: "Nitrogen (N)", value: analysisResult.nitrogen, color: "bg-rose-50 dark:bg-rose-900/20 text-rose-600" },
                           { label: "Phosphorus (P)", value: analysisResult.phosphorus, color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600" },
                           { label: "Potassium (K)", value: analysisResult.potassium, color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600" },
                           { label: "Soil pH", value: analysisResult.ph, color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600" }
                         ].map((item, i) => (
                           <div key={i} className={cn("p-6 rounded-[2rem]", item.color)}>
                             <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2 italic">{item.label}</p>
                             <h5 className="text-xl font-black italic tracking-tighter leading-none">{item.value}</h5>
                           </div>
                         ))}
                      </div>

                      <div className="grid lg:grid-cols-2 gap-8">
                        <div className={cn("p-8 rounded-[2.5rem] border-l-8 transition-all", fertilizerTiming.safe ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-500" : "bg-orange-50 dark:bg-orange-900/10 border-orange-500")}>
                           <div className="flex items-center gap-4 mb-4">
                              <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", fertilizerTiming.safe ? "bg-emerald-500 text-white" : "bg-orange-500 text-white")}>
                                {fertilizerTiming.safe ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
                              </div>
                              <div>
                                 <h4 className="font-black italic text-slate-900 dark:text-white uppercase tracking-tight">Fertilizer Window: {fertilizerTiming.safe ? "Safe" : "Risky"}</h4>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Syncing with live weather data</p>
                              </div>
                           </div>
                           <p className="text-sm font-bold text-slate-600 dark:text-slate-400 italic leading-relaxed">{fertilizerTiming.reason}</p>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white flex items-start gap-6">
                           <div className="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                              <Sprout size={20} />
                           </div>
                           <div className="space-y-2">
                              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 italic">AI Crop Match</p>
                              <p className="text-sm font-bold italic leading-relaxed">{analysisResult.recommendation}</p>
                           </div>
                        </div>
                      </div>

                      <div className="space-y-6 pt-8 border-t border-slate-100 dark:border-slate-800">
                         <h4 className="text-sm font-black uppercase italic tracking-widest">Matched Subsidies</h4>
                         <div className="grid md:grid-cols-2 gap-4">
                            {subsidies.filter(s => s.matched).map(s => (
                              <div key={s.id} className="p-6 rounded-[2rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-xl flex items-start gap-5 group hover:border-emerald-500 transition-all">
                                 <div className="h-12 w-12 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <Zap size={24} />
                                 </div>
                                 <div>
                                    <h5 className="font-black italic text-slate-900 dark:text-white uppercase tracking-tighter mb-1">{s.name}</h5>
                                    <p className="text-xs font-bold text-slate-400 italic mb-4">{s.desc}</p>
                                    <Button size="sm" className="h-8 rounded-lg bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest italic">Apply via KSP</Button>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </Card>

            {/* Booking Modal Overlay */}
            <AnimatePresence>
              {selectedLabForBooking && (
                <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedLabForBooking(null)} className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" />
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }}
                     className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-3xl overflow-hidden"
                   >
                     {!isBookingSuccess ? (
                       <div className="grid md:grid-cols-2">
                          {/* Modal Sidebar */}
                          <div className="bg-slate-900 p-12 text-white flex flex-col justify-between">
                             <div className="space-y-8">
                                <div className="h-16 w-16 bg-emerald-500 rounded-[1.5rem] flex items-center justify-center shadow-2xl">
                                   <FlaskConical size={32} />
                                </div>
                                <div>
                                   <h4 className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-4">Laboratory Slot Booking</h4>
                                   <p className="text-sm font-bold text-slate-400 italic">{selectedLabForBooking.name}</p>
                                </div>
                                <div className="space-y-4">
                                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 italic">Service Summary</p>
                                   <div className="flex justify-between text-xs font-bold">
                                      <span className="text-slate-400">Package:</span>
                                      <span>{selectedPackage.name}</span>
                                   </div>
                                   <div className="flex justify-between text-xs font-bold">
                                      <span className="text-slate-400">Collection:</span>
                                      <span className={isPickupEnabled ? "text-emerald-400" : "text-white"}>{isPickupEnabled ? "Home Pickup" : "Lab Visit"}</span>
                                   </div>
                                   <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                                      <span className="text-lg font-black italic">Total Payable:</span>
                                      <span className="text-3xl font-black italic text-emerald-400">₹{selectedPackage.price + (isPickupEnabled ? 99 : 0)}</span>
                                   </div>
                                </div>
                             </div>
                             <Button variant="ghost" onClick={() => setSelectedLabForBooking(null)} className="text-slate-500 hover:text-white font-black uppercase text-[10px] tracking-widest self-start p-0">Cancel Request</Button>
                          </div>

                          {/* Modal Body */}
                          <div className="p-12 space-y-10 overflow-y-auto max-h-[80vh] scrollbar-none">
                             {/* Package Selector */}
                             <div className="space-y-4">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Select Test Package</Label>
                                <div className="space-y-3">
                                   {PACKAGES.map(pkg => (
                                     <div 
                                       key={pkg.id} 
                                       onClick={() => setSelectedPackage(pkg)}
                                       className={cn("p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4", selectedPackage.id === pkg.id ? "border-emerald-500 bg-emerald-50/50" : "border-slate-100 hover:border-slate-300")}
                                     >
                                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", selectedPackage.id === pkg.id ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400")}>
                                           <pkg.icon size={20} />
                                        </div>
                                        <div className="flex-1">
                                           <h6 className="text-sm font-black italic uppercase tracking-tight text-slate-900">{pkg.name}</h6>
                                           <p className="text-[9px] font-bold text-slate-400 italic">{pkg.desc}</p>
                                        </div>
                                        <span className="font-black italic text-sm">₹{pkg.price}</span>
                                     </div>
                                   ))}
                                </div>
                             </div>

                             {/* Collection Toggle */}
                             <div className="p-6 rounded-[2rem] bg-slate-50 border-2 border-slate-100 space-y-4">
                                <div className="flex items-center justify-between">
                                   <div className="flex items-center gap-3">
                                      <Truck className="text-slate-400" />
                                      <h6 className="text-xs font-black italic uppercase tracking-tight">Doorstep Collection</h6>
                                   </div>
                                   <input 
                                     type="checkbox" 
                                     checked={isPickupEnabled} 
                                     onChange={(e) => setIsPickupEnabled(e.target.checked)}
                                     className="w-10 h-5 rounded-full appearance-none bg-slate-300 checked:bg-emerald-500 transition-all cursor-pointer"
                                   />
                                </div>
                                {isPickupEnabled && (
                                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3 pt-2">
                                      <input 
                                        type="date" 
                                        value={pickupDate}
                                        onChange={(e) => setPickupDate(e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                                      />
                                      <p className="text-[10px] font-bold text-emerald-600 italic">+ ₹99 Convenience Fee applies</p>
                                   </motion.div>
                                )}
                             </div>

                             <Button onClick={() => setIsBookingSuccess(true)} className="w-full h-16 bg-slate-900 hover:bg-black text-white rounded-2xl font-black uppercase italic tracking-widest shadow-2xl shadow-slate-900/20">
                                Confirm & Pay ₹{selectedPackage.price + (isPickupEnabled ? 99 : 0)}
                             </Button>
                          </div>
                       </div>
                     ) : (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-16 text-center space-y-10">
                          <div className="h-28 w-28 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-3xl shadow-emerald-500/40">
                             <CheckCircle2 size={56} className="antialiased" />
                          </div>
                          <div>
                             <h4 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-3">Diagnostic Active!</h4>
                             <p className="text-slate-400 font-bold italic text-lg">{isPickupEnabled ? `Kisan Saathi assigned for ${pickupDate}` : "Your digital lab pass is ready"}</p>
                          </div>
                          <div className="p-10 bg-slate-50 dark:bg-slate-800 rounded-[3rem] border-4 border-dashed border-slate-200 dark:border-slate-700 relative">
                             <div className="absolute top-4 right-4 h-4 w-4 rounded-full bg-emerald-500 animate-pulse" />
                             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 italic">Laboratory Verification Pass</p>
                             <div className="h-40 w-40 bg-white rounded-3xl mx-auto flex items-center justify-center shadow-inner mb-6">
                                <div className="p-6 bg-slate-900 rounded-2xl">
                                   <Zap size={64} className="text-white animate-pulse" />
                                </div>
                             </div>
                             <p className="font-black italic text-2xl text-slate-900 dark:text-white tracking-tighter">PASS ID: LAB-{Math.floor(1000 + Math.random() * 9000)}X</p>
                          </div>
                          <Button onClick={() => { setSelectedLabForBooking(null); setIsBookingSuccess(false); }} className="w-full h-16 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest italic shadow-xl">Close & Return to Hub</Button>
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
