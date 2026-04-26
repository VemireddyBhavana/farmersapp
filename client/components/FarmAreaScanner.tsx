import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Loader2, 
  Scan, 
  Map as MapIcon, 
  CheckCircle2,
  AlertTriangle, 
  Zap,
  MapPin,
  Satellite,
  Droplets,
  Trees
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

// RAW LEAFLET IMPORT (No react-leaflet)
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

export default function FarmAreaScanner() {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [ndvi, setNdvi] = useState<number | null>(null);
    const [soil, setSoil] = useState<any>(null); // Soil Data State
    const [error, setError] = useState<string | null>(null);
    
    // Direct Map Ref
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    const getHealthStatus = (val: number) => {
        if (val > 0.6) return { label: "Excellent Health", color: "emerald", icon: CheckCircle2 };
        if (val > 0.3) return { label: "Moderate / Risk", color: "amber", icon: AlertTriangle };
        return { label: "Poor / Critical", color: "rose", icon: Zap };
    };

    // RAW LEAFLET INITIALIZATION
    useEffect(() => {
        if (showResults && location && mapContainerRef.current && !mapRef.current) {
            // Initialize the map directly on the DOM element
            mapRef.current = L.map(mapContainerRef.current, {
                center: [location.lat, location.lng],
                zoom: 15,
                zoomControl: false,
                attributionControl: false
            });

            // Add Esri Satellite Layer
            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: '© Esri'
            }).addTo(mapRef.current);

            // Add Marker
            const customIcon = L.icon({
                iconUrl: markerIcon,
                iconRetinaUrl: markerIcon2x,
                shadowUrl: markerShadow,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            L.marker([location.lat, location.lng], { icon: customIcon }).addTo(mapRef.current);
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [showResults, location]);

    const fetchFarmData = async (lat: number, lng: number) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`/api/farm-data?lat=${lat}&lng=${lng}`);
            
            if (!response.ok) throw new Error("API Connection Failed");
            
            const data = await response.json();
            
            // Expected Data: { ndvi: val, soil: { moisture: val, carbon: val } }
            setNdvi(data.ndvi);
            setSoil(data.soil);
            setShowResults(true);
        } catch (err: any) {
            console.error("API Fetch Error:", err);
            setError("Satellite connection error. Ensure GEE is authenticated and backend is running on Port 5000.");
        } finally {
            setLoading(false);
        }
    };

    const runFarmScan = () => {
        setError(null);
        setLoading(true);

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lng: longitude });
                fetchFarmData(latitude, longitude);
            },
            (err) => {
                setError("❌ Unable to fetch location. Please permit GPS access.");
                setLoading(false);
            },
            { enableHighAccuracy: true }
        );
    };

    const reset = () => {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
        setShowResults(false);
        setNdvi(null);
        setSoil(null);
        setError(null);
    };

    return (
        <div className="space-y-12">
            {!showResults ? (
                <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/50 dark:border-slate-800/50 rounded-[3rem] shadow-2xl overflow-hidden p-1">
                    <div className="bg-white/80 dark:bg-slate-900/80 rounded-[2.8rem] p-10 space-y-10">
                        <div className="text-center space-y-4">
                            <div className="mx-auto h-24 w-24 rounded-[2rem] bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                                <Satellite className="h-12 w-12 text-white" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-4xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">Satellite Health Hub</h2>
                                <p className="text-lg font-bold text-slate-500 italic">Real-Time NDVI & Soil Analysis via GEE</p>
                            </div>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-6 bg-rose-50 border-2 border-rose-200 rounded-[2rem] text-rose-600 text-center font-bold italic"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-6">
                            <Button 
                                onClick={runFarmScan}
                                disabled={loading}
                                className="w-full h-24 bg-gradient-to-r from-emerald-600 to-emerald-800 hover:scale-[1.02] text-white rounded-3xl text-3xl font-black shadow-2xl transition-all uppercase italic tracking-tighter"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-6 h-10 w-10 animate-spin" />
                                        COMMUNICATING WITH SATELLITE...
                                    </>
                                ) : (
                                    <>
                                        <MapPin className="mr-6 h-10 w-10 text-emerald-300" />
                                        SCAN MY FARM LOCATION
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </Card>
            ) : (
                <div className="space-y-12">
                    {/* Visual Map Section */}
                    <div 
                        className="rounded-[4rem] bg-slate-900 shadow-[0_40px_100px_rgba(0,0,0,0.3)] relative overflow-hidden text-center border-t border-white/10 h-[400px]"
                    >
                        <div ref={mapContainerRef} className="h-full w-full z-0" />
                        
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                        <div className="absolute bottom-8 left-0 right-0 z-20 px-8 text-center">
                            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter shadow-black">Live Satellite Analysis</h3>
                            <p className="text-emerald-400 font-bold text-lg italic uppercase tracking-widest">
                                Coordinates: {location?.lat.toFixed(4)}, {location?.lng.toFixed(4)}
                            </p>
                        </div>
                    </div>

                    {/* RESULTS GRID */}
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* NDVI Card */}
                        {ndvi !== null && (
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="backdrop-blur-lg bg-white/40 dark:bg-slate-800/40 border-2 border-white/50 dark:border-slate-700/50 rounded-[3.5rem] p-10 shadow-2xl group"
                            >
                                {(() => {
                                    const status = getHealthStatus(ndvi);
                                    return (
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-6">
                                                <div className={cn(
                                                    "p-6 rounded-[2rem] shadow-xl",
                                                    status.color === "emerald" ? "bg-emerald-500 text-white" :
                                                    status.color === "amber" ? "bg-amber-500 text-white" :
                                                    "bg-rose-500 text-white"
                                                )}>
                                                    <status.icon className="h-10 w-10" />
                                                </div>
                                                <div>
                                                    <h4 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">{status.label}</h4>
                                                    <p className="text-sm font-bold text-slate-500 uppercase italic">Vegetation Index (NDVI)</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-end gap-3 text-emerald-600">
                                                <span className="text-7xl font-black italic tracking-tighter">{(ndvi ?? 0).toFixed(3)}</span>
                                                <span className="text-xs font-black uppercase tracking-widest pb-3">Sentinel-2</span>
                                            </div>

                                            <div className="h-4 w-full bg-white dark:bg-slate-900 rounded-full overflow-hidden shadow-inner border border-slate-100">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min(100, ((ndvi ?? 0) + 1) * 50)}%` }}
                                                    transition={{ duration: 2 }}
                                                    className={cn(
                                                        "h-full rounded-full",
                                                        status.color === "emerald" ? "bg-emerald-500" :
                                                        status.color === "amber" ? "bg-amber-500" :
                                                        "bg-rose-500"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    );
                                })()}
                            </motion.div>
                        )}

                        {/* Soil Card */}
                        {soil && (
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="backdrop-blur-lg bg-white/40 dark:bg-slate-800/40 border-2 border-white/50 dark:border-slate-700/50 rounded-[3.5rem] p-10 shadow-2xl space-y-10"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="p-6 rounded-[2rem] bg-blue-500 text-white shadow-xl">
                                        <Droplets className="h-10 w-10" />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">Soil Composition</h4>
                                        <p className="text-sm font-bold text-slate-500 uppercase italic">SMAP & Satellite Analysis</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 text-center">
                                    <div className="flex-1 p-6 rounded-[2rem] bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-800/50">
                                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2 opacity-70">Moisture (SSM)</p>
                                        <p className="text-4xl font-black text-blue-600 italic tracking-tighter">
                                            {typeof soil.moisture === 'number' ? soil.moisture.toFixed(1) : "N/A"}%
                                        </p>
                                    </div>
                                    <div className="flex-1 p-6 rounded-[2rem] bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100/50 dark:border-emerald-800/50">
                                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2 opacity-70">Organic Carbon</p>
                                        <p className="text-4xl font-black text-emerald-600 italic tracking-tighter">
                                            {typeof soil.carbon === 'number' ? soil.carbon.toFixed(1) : "N/A"} <span className="text-[10px] font-black lowercase tracking-tighter">g/kg</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-slate-900/5 dark:bg-white/5 rounded-2xl">
                                    <Trees className="h-5 w-5 text-emerald-500" />
                                    <p className="text-xs font-bold text-slate-500 italic">
                                        {soil.moisture > 20 ? "Optimal hydration for crops." : "Dry conditions; monitor hydration."}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="flex justify-center"
                    >
                        <Button 
                            onClick={reset}
                            className="h-20 px-12 rounded-full border-4 border-emerald-500/50 text-emerald-600 bg-emerald-50/50 hover:bg-emerald-100 font-black text-2xl uppercase italic tracking-tighter transition-all hover:scale-110 shadow-3xl shadow-emerald-500/10"
                        >
                            RE-SCAN FARM POSITION
                        </Button>
                    </motion.div>
                </div>
            )}
        </div>
    );
}