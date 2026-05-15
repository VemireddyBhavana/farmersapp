import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Search, 
  FlaskConical, 
  Upload, 
  CheckCircle2, 
  ArrowRight,
  TestTube,
  Microscope,
  Phone,
  Navigation,
  Zap,
  Activity,
  Sprout,
  Layers3,
  Calendar,
  AlertTriangle,
  Truck,
  History,
  Award,
  Clock,
  Compass
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
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Line
} from 'recharts';
import { jsPDF } from "jspdf";


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

// Helper to generate coordinates based on location
const getLocationCoords = (state: string, district: string): [number, number] => {
  const centers: Record<string, [number, number]> = {
    "Andhra Pradesh": [15.9129, 79.7400],
    "Telangana": [18.1124, 79.0193],
    "Maharashtra": [19.7507, 75.7139],
    "Karnataka": [15.3173, 75.7139],
    "Guntur": [16.3067, 80.4365],
    "Anantapur": [14.6819, 77.6006],
  };
  return centers[district] || centers[state] || [20.5937, 78.9629];
};

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
  const [mapCenter, setMapCenter] = useState<[number, number]>(
    (farmerLocation.lat && farmerLocation.lng) 
      ? [farmerLocation.lat, farmerLocation.lng] 
      : getLocationCoords(farmerLocation.state, farmerLocation.district)
  );
  
  // Booking State
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[0]);
  const [isPickupEnabled, setIsPickupEnabled] = useState(false);
  const [pickupDate, setPickupDate] = useState("2026-05-16");

  // Structural Analysis Inputs
  const [bulkDensity, setBulkDensity] = useState(1.4);
  const [moisture, setMoisture] = useState(25);
  const [organicMatter, setOrganicMatter] = useState(2.5);

  const structuralScore = useMemo(() => {
    let score = 100;
    if (bulkDensity > 1.3) score -= (bulkDensity - 1.3) * 150;
    score += (organicMatter - 2.0) * 10;
    const moistureOffset = Math.abs(moisture - 25);
    score -= moistureOffset * 0.5;
    return Math.min(Math.max(Math.round(score), 10), 98);
  }, [bulkDensity, moisture, organicMatter]);

  const fertilizerTiming = useMemo(() => {
    if (!weather) return { safe: true, reason: "Loading atmospheric data..." };
    const rainNext24h = weather.daily[0]?.pop > 0.4 || weather.hourly.slice(0, 12).some(h => h.pop > 0.5);
    return {
      safe: !rainNext24h,
      reason: rainNext24h 
        ? "Heavy precipitation detected in 24h forecast. Postpone Nitrogen application to prevent runoff leaching." 
        : "Stable weather windows confirmed for next 48h. Ideal for top-dressing and mineral absorption."
    };
  }, [weather]);

  const currentStatus = (score: number) => {
    if (score > 80) return { label: "Excellent", color: "text-emerald-500", desc: "Highly porous, zero compaction." };
    if (score > 60) return { label: "Optimal", color: "text-blue-500", desc: "Balanced structure, high root ease." };
    if (score > 40) return { label: "Moderate", color: "text-amber-500", desc: "Minor compaction detected." };
    return { label: "Critical", color: "text-rose-500", desc: "Root growth restricted by density." };
  };

  const filteredLabs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    
    const generateLabs = (seedStr: string, latBase: number, lonBase: number) => {
      const seed = seedStr.length;
      return [
        {
          id: `lab-1-${seedStr}`,
          name: `${seedStr.toUpperCase()} Regional Soil Testing Unit`,
          rating: 4.5 + (seed % 5) / 10,
          certified: true,
          time: "09:00 - 18:00",
          pincode: query.match(/^\d+$/) ? query : "522001",
          tags: ["NPK Analysis", "Micro-Nutrients"],
          phone: "+91 98480 22334",
          coords: [latBase + 0.01, lonBase + 0.01] as [number, number]
        },
        {
          id: `lab-2-${seedStr}`,
          name: `Pragati Krishi Vigyan Kendra - ${seedStr.toUpperCase()}`,
          rating: 4.2 + (seed % 8) / 10,
          certified: false,
          time: "10:00 - 17:00",
          pincode: query.match(/^\d+$/) ? query : "522002",
          tags: ["Organic Carbon", "pH Check"],
          phone: "+91 98480 55667",
          coords: [latBase - 0.01, lonBase - 0.01] as [number, number]
        }
      ];
    };

    if (!query) {
      const base = (farmerLocation.lat && farmerLocation.lng) 
        ? [farmerLocation.lat, farmerLocation.lng] as [number, number]
        : getLocationCoords(farmerLocation.state, farmerLocation.district);
      return generateLabs(farmerLocation.district, base[0], base[1]);
    }
    
    // Dynamic generation based on search
    const base = query.length === 6 ? [14.68, 77.60] : getLocationCoords("Search", query);
    return generateLabs(query, base[0] as number, base[1] as number);
  }, [searchQuery, farmerLocation]);

  // Update map center when labs change
  useEffect(() => {
    if (filteredLabs.length > 0) {
      setMapCenter(filteredLabs[0].coords);
    }
  }, [filteredLabs]);

  const MapController = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, 12, { animate: true });
    }, [center, map]);
    return null;
  };

  const handleGpsDetect = async () => {
    await detectLocation();
    toast({
      title: "Location Synced",
      description: `Showing labs near ${farmerLocation.district}, ${farmerLocation.state}`,
    });
  };

  const handleUpload = () => {
    setIsUploading(true);
    setShowOcrScan(true);
    setTimeout(() => {
      const reportId = `SHC-${Math.floor(100000 + Math.random() * 900000)}`;
      setAnalysisResult({
        nitrogen: "Low (110 kg/ha)",
        phosphorus: "Medium (18 kg/ha)",
        potassium: "High (290 kg/ha)",
        ph: "6.8 (Neutral)",
        recommendation: "Increase Nitrogen application by 20% for upcoming Kharif crop. Suitable for Wheat and Mustard. Soil shows signs of mild compaction - consider deep ploughing.",
        rawValues: { N: 110, P: 18, K: 290, PH: 6.8 },
        timestamp: new Date().toLocaleString(),
        reportId: reportId
      });
      setIsUploading(false);
      setTimeout(() => setShowOcrScan(false), 1500);
      toast({
        title: "Analysis Complete",
        description: `Digital Report ${reportId} generated.`,
      });
    }, 4500);
  };

  const downloadReport = () => {
    if (!analysisResult) return;
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(15, 23, 42); // Slate-900
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("KISAN AI", 20, 25);
    doc.setFontSize(10);
    doc.text("ADVANCED PEDOLOGY DIAGNOSTICS", 20, 32);
    
    // Report Info
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(18);
    doc.text("SOIL HEALTH REPORT", 20, 55);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Report ID: ${analysisResult.reportId}`, 20, 65);
    doc.text(`Date Issued: ${analysisResult.timestamp}`, 20, 70);
    doc.text(`Location: ${farmerLocation.district}, ${farmerLocation.state}`, 20, 75);
    
    doc.line(20, 80, 190, 80);
    
    // Metrics
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("1. Mineral Composition Analysis", 20, 95);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const metrics = [
      ["Nitrogen (N)", analysisResult.nitrogen],
      ["Phosphorus (P)", analysisResult.phosphorus],
      ["Potassium (K)", analysisResult.potassium],
      ["Soil pH Level", analysisResult.ph]
    ];
    
    let yPos = 110;
    metrics.forEach(([label, val]) => {
      doc.text(label, 30, yPos);
      doc.setFont("helvetica", "bold");
      doc.text(val, 120, yPos);
      doc.setFont("helvetica", "normal");
      yPos += 10;
    });
    
    // Recommendations
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("2. AI Agronomist Recommendations", 20, 160);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const splitRec = doc.splitTextToSize(analysisResult.recommendation, 160);
    doc.text(splitRec, 20, 175);
    
    // Footer
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 270, 210, 27, 'F');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("This is an AI-generated diagnostic report based on submitted soil samples/data.", 105, 280, { align: "center" });
    doc.text("Contact local KVK for official statutory certifications.", 105, 285, { align: "center" });
    
    doc.save(`KisanAI_Soil_Report_${analysisResult.reportId}.pdf`);
    
    toast({
      title: "Report Downloaded",
      description: "Check your downloads folder.",
    });
  };


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 pt-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 bg-emerald-500/10 text-emerald-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] italic mb-8 border border-emerald-500/20 shadow-xl shadow-emerald-500/5"
          >
             <Compass className="h-4 w-4 animate-spin-slow" /> {t('advancedPedology') || "Advanced Pedology Hub"}
          </motion.div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic leading-[0.85] mb-6">
            {t('soilLabTitle') || "Soil Lab Locator"}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-bold uppercase tracking-widest leading-relaxed max-w-2xl mx-auto">
            {t('soilLabDesc') || "Find certified labs, book pickups, and track soil trends."}
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
                   placeholder={t("searchPlaceholder") || "Enter City or Pincode..."}
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full h-20 pl-16 pr-6 bg-white dark:bg-slate-900 border-none shadow-2xl rounded-[2rem] text-sm font-black italic outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300"
                 />
               </div>
               
               <Button 
                 onClick={handleGpsDetect}
                 disabled={isLocating}
                 className="w-full h-16 bg-slate-900 hover:bg-black text-white rounded-2xl font-black uppercase italic tracking-widest text-xs shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95"
               >
                 {isLocating ? <Activity className="animate-spin h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                 {isLocating ? t("detectingGps") : t("findLabsNearMe")}
               </Button>
            </div>

            <div className="space-y-4 pt-4">
              <AnimatePresence mode="popLayout">
                {filteredLabs.map((lab, idx) => (
                  <motion.div
                    key={lab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="p-8 rounded-[2.5rem] border-none shadow-2xl bg-white dark:bg-slate-900 group hover:ring-4 hover:ring-emerald-500/10 transition-all cursor-pointer">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none">{lab.name}</h4>
                            {lab.certified && <Award className="h-5 w-5 text-emerald-500 fill-emerald-500/10" />}
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic flex items-center gap-2">
                            <Clock className="h-3 w-3" /> {lab.time} • {lab.pincode}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                         {lab.tags.map((tag, i) => (
                           <span key={i} className="px-4 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-500 italic border border-slate-100 dark:border-slate-700">
                             {tag}
                           </span>
                         ))}
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => window.location.href = `tel:${lab.phone}`}
                          className="flex-1 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white"
                        >
                          <Phone className="mr-2 h-4 w-4" /> {t("callNow") || "Call"}
                        </Button>
                        <Button 
                          onClick={() => setSelectedLabForBooking(lab)}
                          className="flex-1 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20"
                        >
                          <Calendar className="mr-2 h-4 w-4" /> {t("bookTest") || "Book Test"}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column - Map & AI Analyzer */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="p-0 rounded-[4rem] border-none shadow-3xl bg-slate-100 dark:bg-slate-800 overflow-hidden h-[300px] md:h-[500px] relative">
               <MapContainer center={mapCenter} zoom={12} scrollWheelZoom={false} className="h-full w-full z-10">
                 <MapController center={mapCenter} />
                 <TileLayer
                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 />
                 {filteredLabs.map(lab => (
                   <Marker key={lab.id} position={lab.coords}>
                     <Popup>
                       <div className="p-4 min-w-[200px]">
                          <h4 className="font-black italic text-slate-900 uppercase tracking-tight mb-3">{lab.name}</h4>
                          <Button 
                            className="h-10 w-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl"
                            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${lab.coords[0]},${lab.coords[1]}`, '_blank')}
                          >
                            <Navigation size={14} className="mr-2" /> {t("getDirections") || "Navigate"}
                          </Button>
                       </div>
                     </Popup>
                   </Marker>
                 ))}
               </MapContainer>
            </Card>

            <Card className="p-12 rounded-[4rem] border-none shadow-3xl bg-white dark:bg-slate-900 relative overflow-hidden">
               {/* Tab Header */}
               <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 relative z-10">
                  <div className="flex items-center gap-5">
                     <div className="h-16 w-16 bg-emerald-500/10 text-emerald-600 rounded-[1.5rem] flex items-center justify-center shadow-inner">
                       {analysisMode === 'npk' ? <Microscope size={32} /> : analysisMode === 'structure' ? <Layers3 size={32} /> : <History size={32} />}
                     </div>
                     <div>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">
                          {analysisMode === 'npk' ? t('nutrientTrends') : analysisMode === 'structure' ? t('soilArchitecture') : t('history')}
                        </h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic mt-1">Advanced AI Diagnostic Stream</p>
                     </div>
                  </div>

                  <div className="flex bg-slate-100 dark:bg-slate-800 p-2 rounded-[2rem] shadow-inner overflow-x-auto scrollbar-hide">
                     {['npk', 'structure', 'history'].map(tab => (
                       <button 
                         key={tab}
                         onClick={() => setAnalysisMode(tab as any)}
                         className={cn(
                           "px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all", 
                           analysisMode === tab ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xl" : "text-slate-400 hover:text-slate-600"
                         )}
                       >
                         {t(tab)}
                       </button>
                     ))}
                  </div>
               </div>

               <AnimatePresence mode="wait">
                 {analysisMode === 'history' ? (
                   <motion.div key="history" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
                      <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={[
                             { month: 'Jan', score: 72, N: 140 },
                             { month: 'Mar', score: 75, N: 135 },
                             { month: 'May', score: 82, N: 120 },
                             { month: 'Jul', score: 78, N: 115 },
                             { month: 'Sep', score: 85, N: 110 },
                           ]}>
                              <defs>
                                 <linearGradient id="colorHistory" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                 </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                              <YAxis hide />
                              <RechartsTooltip cursor={{stroke: '#10b981', strokeWidth: 2, strokeDasharray: '4 4'}} contentStyle={{borderRadius: '2rem', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '1.5rem'}} />
                              <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={5} fillOpacity={1} fill="url(#colorHistory)" />
                           </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="grid md:grid-cols-3 gap-6">
                         {[
                           { label: "Nutrient Retention", val: "+14%", color: "text-emerald-500" },
                           { label: "pH Stability", val: "Optimal", color: "text-blue-500" },
                           { label: "Yield Correlation", val: "High", color: "text-purple-500" }
                         ].map((s, i) => (
                           <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800 text-center border-2 border-dashed border-slate-100 dark:border-slate-700">
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 italic">{s.label}</p>
                              <h4 className={cn("text-3xl font-black italic tracking-tighter", s.color)}>{s.val}</h4>
                           </div>
                         ))}
                      </div>
                   </motion.div>
                 ) : analysisMode === 'structure' ? (
                   <motion.div key="structure" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                      <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative aspect-square flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-[4rem] shadow-inner overflow-hidden border border-slate-100 dark:border-slate-700">
                           <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)] bg-[size:20px_20px]" />
                           <div className="text-center relative z-10">
                              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 italic">{t('aerationIndex')}</p>
                              <h4 className="text-9xl font-black italic tracking-tighter leading-none text-slate-900 dark:text-white flex items-start justify-center">
                                {structuralScore}<span className="text-3xl text-emerald-500 mt-4">%</span>
                              </h4>
                              <div className={cn("mt-8 px-8 py-3 rounded-full inline-block font-black uppercase tracking-widest text-xs italic shadow-xl", currentStatus(structuralScore).color.replace('text-', 'bg-').concat('/10'), currentStatus(structuralScore).color)}>
                                 {currentStatus(structuralScore).label}
                              </div>
                           </div>
                        </div>

                        <div className="space-y-8">
                           {[
                             { label: "Bulk Density", val: bulkDensity, min: 1.0, max: 1.8, step: 0.01, setter: setBulkDensity, unit: "g/cm³" },
                             { label: "Organic Matter", val: organicMatter, min: 0, max: 10, step: 0.1, setter: setOrganicMatter, unit: "%" },
                             { label: "Soil Moisture", val: moisture, min: 5, max: 50, step: 1, setter: setMoisture, unit: "%" }
                           ].map((item, i) => (
                             <div key={i} className="space-y-3">
                                <div className="flex justify-between items-center px-2">
                                   <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">{item.label}</Label>
                                   <span className="text-sm font-black italic text-emerald-600">{item.val}{item.unit}</span>
                                </div>
                                <input 
                                  type="range" min={item.min} max={item.max} step={item.step} 
                                  value={item.val} onChange={(e) => item.setter(parseFloat(e.target.value))}
                                  className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-emerald-500 cursor-pointer shadow-inner"
                                />
                             </div>
                           ))}
                           <div className="p-8 rounded-[2.5rem] bg-emerald-50 dark:bg-emerald-900/10 border-l-8 border-emerald-500 shadow-xl shadow-emerald-500/5">
                              <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 leading-relaxed italic">{currentStatus(structuralScore).desc}</p>
                           </div>
                        </div>
                      </div>
                   </motion.div>
                 ) : !analysisResult && !isUploading ? (
                   <div className="border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[4rem] p-24 text-center group transition-all hover:border-emerald-500/40 hover:bg-emerald-500/5">
                      <TestTube className="h-24 w-24 mx-auto text-slate-200 dark:text-slate-800 mb-10 group-hover:text-emerald-500 group-hover:scale-110 transition-all duration-500" />
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic mb-3">Sync Physical Report</h4>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-12 max-w-sm mx-auto">Upload your Soil Health Card to generate a permanent digital twin of your farm's health.</p>
                      <Button onClick={handleUpload} className="h-20 px-12 bg-slate-900 hover:bg-emerald-600 text-white font-black rounded-[1.5rem] italic tracking-widest uppercase text-sm shadow-2xl transition-all">
                        <Upload className="mr-4 h-6 w-6" /> {t("selectFile") || "Select Report File"}
                      </Button>
                   </div>
                 ) : (isUploading || showOcrScan) ? (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 text-center">
                      <div className="relative w-40 h-40 mx-auto mb-12">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-[3rem] border-8 border-emerald-500/10 border-t-emerald-500 shadow-2xl" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Microscope className="h-14 w-14 text-emerald-600 animate-pulse" />
                        </div>
                      </div>
                      <h4 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-3">AI Deep Scan...</h4>
                      <p className="text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Establishing Tissue Calibration</p>
                   </motion.div>
                 ) : (
                   <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                         {[
                           { label: "Nitrogen (N)", value: analysisResult.nitrogen, color: "bg-rose-50 text-rose-600" },
                           { label: "Phosphorus (P)", value: analysisResult.phosphorus, color: "bg-amber-50 text-amber-600" },
                           { label: "Potassium (K)", value: analysisResult.potassium, color: "bg-emerald-50 text-emerald-600" },
                           { label: "Soil pH", value: analysisResult.ph, color: "bg-blue-50 text-blue-600" }
                         ].map((item, i) => (
                           <div key={i} className={cn("p-8 rounded-[2.5rem] shadow-xl", item.color)}>
                             <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-3 italic">{item.label}</p>
                             <h5 className="text-2xl font-black italic tracking-tighter leading-none">{item.value}</h5>
                           </div>
                         ))}
                      </div>

                      <div className="grid lg:grid-cols-2 gap-8">
                        <div className={cn("p-10 rounded-[3rem] border-l-[12px] shadow-2xl", fertilizerTiming.safe ? "bg-emerald-50 border-emerald-500" : "bg-orange-50 border-orange-500")}>
                           <div className="flex items-center gap-5 mb-6">
                              <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-lg", fertilizerTiming.safe ? "bg-emerald-500" : "bg-orange-500")}>
                                {fertilizerTiming.safe ? <CheckCircle2 size={32} /> : <AlertTriangle size={32} />}
                              </div>
                              <div>
                                 <h4 className="text-xl font-black italic text-slate-900 uppercase tracking-tight leading-none mb-1">Window: {fertilizerTiming.safe ? "Optimal" : "Leaching Risk"}</h4>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Syncing Atmosphere Vitals</p>
                              </div>
                           </div>
                           <p className="text-base font-bold text-slate-600 italic leading-relaxed">{fertilizerTiming.reason}</p>
                        </div>

                        <div className="p-10 rounded-[3rem] bg-slate-900 text-white flex items-start gap-8 shadow-3xl">
                           <div className="h-14 w-14 bg-emerald-500 rounded-2xl flex items-center justify-center shrink-0 shadow-xl shadow-emerald-500/20">
                              <Sprout size={32} />
                           </div>
                           <div className="space-y-3">
                              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 italic">Expert AI Conclusion</p>
                              <p className="text-base font-bold italic leading-relaxed text-slate-200">{analysisResult.recommendation}</p>
                           </div>
                        </div>
                      </div>

                      <div className="flex justify-center pt-4">
                         <Button 
                           onClick={downloadReport}
                           className="h-20 px-12 bg-white text-slate-900 hover:bg-slate-50 rounded-[2rem] font-black uppercase italic tracking-widest text-sm shadow-2xl flex items-center gap-4 transition-all hover:scale-105 active:scale-95"
                         >
                           <Zap className="h-6 w-6 text-emerald-500 fill-emerald-500/20" /> {t('downloadReport') || "Download Diagnostic Report"}
                         </Button>
                      </div>
                    </motion.div>
                 )}
               </AnimatePresence>
            </Card>

            {/* Booking Modal (Redesign) */}
            <AnimatePresence>
              {selectedLabForBooking && (
                <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4">
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedLabForBooking(null)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" />
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 50 }}
                     className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[4rem] shadow-3xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto"
                   >
                     {!isBookingSuccess ? (
                       <>
                          {/* Modal Sidebar */}
                          <div className="bg-slate-900 p-12 text-white md:w-[40%] flex flex-col justify-between relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-12 opacity-5">
                                <FlaskConical size={300} className="rotate-12" />
                             </div>
                             <div className="space-y-10 relative z-10">
                                <div className="h-20 w-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center shadow-2xl">
                                   <FlaskConical size={40} />
                                </div>
                                <div>
                                   <h4 className="text-4xl font-black uppercase italic tracking-tighter leading-[0.9] mb-4">Diagnostic <br /> Slot Booking</h4>
                                   <p className="text-sm font-bold text-slate-400 italic">{selectedLabForBooking.name}</p>
                                </div>
                                <div className="space-y-6">
                                   <div className="flex justify-between text-xs font-black uppercase tracking-widest border-b border-white/10 pb-4">
                                      <span className="text-slate-500">Service:</span>
                                      <span>{selectedPackage.name}</span>
                                   </div>
                                   <div className="flex justify-between items-baseline pt-4">
                                      <span className="text-xl font-black italic uppercase tracking-tighter">Total Due:</span>
                                      <span className="text-5xl font-black italic text-emerald-400 tracking-tighter">₹{selectedPackage.price + (isPickupEnabled ? 99 : 0)}</span>
                                   </div>
                                </div>
                             </div>
                             <Button variant="ghost" onClick={() => setSelectedLabForBooking(null)} className="text-slate-500 hover:text-white font-black uppercase text-[10px] tracking-[0.3em] self-start p-0 mt-12 transition-colors italic">Discard Request</Button>
                          </div>

                          {/* Modal Body */}
                          <div className="p-12 md:w-[60%] space-y-12 overflow-y-auto max-h-[80vh] scrollbar-none bg-white dark:bg-slate-900">
                             <div className="space-y-6">
                                <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">1. Select Analysis Depth</Label>
                                <div className="space-y-4">
                                   {PACKAGES.map(pkg => (
                                     <div 
                                       key={pkg.id} 
                                       onClick={() => setSelectedPackage(pkg)}
                                       className={cn("p-6 rounded-[2rem] border-4 transition-all cursor-pointer flex items-center gap-6 group", selectedPackage.id === pkg.id ? "border-emerald-500 bg-emerald-50" : "border-slate-50 hover:border-slate-100 bg-slate-50/50")}
                                     >
                                        <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg transition-all", selectedPackage.id === pkg.id ? "bg-emerald-500 text-white" : "bg-white text-slate-300 group-hover:text-slate-500")}>
                                           <pkg.icon size={28} />
                                        </div>
                                        <div className="flex-1">
                                           <h6 className="text-lg font-black italic uppercase tracking-tighter text-slate-900">{pkg.name}</h6>
                                           <p className="text-[10px] font-bold text-slate-400 italic leading-none mt-1">{pkg.desc}</p>
                                        </div>
                                        <span className="text-xl font-black italic text-slate-900">₹{pkg.price}</span>
                                     </div>
                                   ))}
                                </div>
                             </div>

                             <div className="p-8 rounded-[2.5rem] bg-slate-50 border-4 border-slate-100 space-y-6">
                                <div className="flex items-center justify-between">
                                   <div className="flex items-center gap-4">
                                      <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                         <Truck className="text-emerald-500" />
                                      </div>
                                      <div>
                                         <h6 className="text-sm font-black italic uppercase tracking-tight text-slate-900">Doorstep Collection</h6>
                                         <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Kisan Saathi Logistics</p>
                                      </div>
                                   </div>
                                   <input 
                                     type="checkbox" 
                                     checked={isPickupEnabled} 
                                     onChange={(e) => setIsPickupEnabled(e.target.checked)}
                                     className="w-14 h-7 rounded-full appearance-none bg-slate-300 checked:bg-emerald-500 transition-all cursor-pointer relative after:content-[''] after:absolute after:top-1 after:left-1 after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all checked:after:left-8"
                                   />
                                </div>
                                {isPickupEnabled && (
                                   <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-4 border-t border-slate-200">
                                      <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm font-black italic outline-none focus:border-emerald-500 transition-colors" />
                                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 italic text-center">+ ₹99 Logistics Fee Included</p>
                                   </motion.div>
                                )}
                             </div>

                             <Button onClick={() => setIsBookingSuccess(true)} className="w-full h-20 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] font-black uppercase italic tracking-[0.2em] text-sm shadow-2xl shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-95">
                                {t("confirmAndPay") || "Confirm & Secure Slot"}
                             </Button>
                          </div>
                       </>
                     ) : (
                       <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-20 text-center space-y-12 w-full">
                          <div className="h-32 w-32 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-[0_0_80px_rgba(16,185,129,0.5)]">
                             <CheckCircle2 size={64} className="antialiased" />
                          </div>
                          <div className="space-y-4">
                             <h4 className="text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">Slot Secured!</h4>
                             <p className="text-slate-400 font-bold italic text-xl">{isPickupEnabled ? `Agent will arrive on ${pickupDate}` : "Your digital lab pass is now active"}</p>
                          </div>
                          <div className="p-12 bg-slate-50 dark:bg-slate-800 rounded-[4rem] border-8 border-dashed border-slate-200 dark:border-slate-700 relative overflow-hidden">
                             <div className="absolute top-6 right-6 h-6 w-6 rounded-full bg-emerald-500 animate-ping" />
                             <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 mb-8 italic">Verification Pass</p>
                             <div className="h-48 w-48 bg-white rounded-[3rem] mx-auto flex items-center justify-center shadow-inner mb-8">
                                <div className="p-8 bg-slate-900 rounded-[2rem] shadow-2xl">
                                   <Zap size={80} className="text-white animate-pulse" />
                                </div>
                             </div>
                             <p className="font-black italic text-3xl text-slate-900 dark:text-white tracking-tighter uppercase">{t("passId") || "Lab Pass ID"}: SHC-X{Math.floor(1000 + Math.random() * 8999)}</p>
                          </div>
                          <Button onClick={() => { setSelectedLabForBooking(null); setIsBookingSuccess(false); }} className="w-full h-20 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest italic shadow-3xl hover:bg-black transition-all">Dismiss Portal</Button>
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
