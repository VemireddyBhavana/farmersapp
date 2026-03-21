import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map as MapIcon, MousePointer2, Pencil, Trash2, Save, Layers, Info, ArrowLeft, Maximize, Satellite, Eye, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/lib/LanguageContext";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Point {
    x: number;
    y: number;
}

export default function FarmMapper() {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [points, setPoints] = useState<Point[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [viewMode, setViewMode] = useState<"standard" | "satellite" | "ndvi">("standard");
    const [area, setArea] = useState<number | null>(null);

    // Canvas setup and drawing
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 0.5;
        for (let i = 0; i < canvas.width; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i < canvas.height; i += 40) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }

        // Draw Simulated Satellite Background
        if (viewMode === "satellite" || viewMode === "ndvi") {
            ctx.fillStyle = viewMode === "satellite" ? "#1a2e1a" : "#0a1a0a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw dummy "fields" in background
            ctx.fillStyle = viewMode === "satellite" ? "#2d4d2d" : "#0f2f0f";
            ctx.fillRect(80, 80, 200, 150);
            ctx.fillRect(320, 40, 180, 220);
        }

        // Draw NDVI Heatmap overlay (simulated)
        if (viewMode === "ndvi") {
            const gradient = ctx.createRadialGradient(250, 200, 50, 250, 200, 200);
            gradient.addColorStop(0, "rgba(34, 197, 94, 0.4)"); // Healthy green
            gradient.addColorStop(0.5, "rgba(234, 179, 8, 0.3)"); // Stressed yellow
            gradient.addColorStop(1, "rgba(239, 68, 68, 0.2)"); // Critical red
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Draw points and lines
        if (points.length > 0) {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            points.forEach((p, i) => {
                if (i > 0) ctx.lineTo(p.x, p.y);
            });
            
            if (!isDrawing && points.length > 2) {
                ctx.closePath();
                ctx.fillStyle = "rgba(16, 106, 58, 0.2)";
                ctx.fill();
            }
            
            ctx.strokeStyle = "#106A3A";
            ctx.lineWidth = 3;
            ctx.setLineDash(isDrawing ? [5, 5] : []);
            ctx.stroke();

            // Draw vertices
            points.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = "#fff";
                ctx.fill();
                ctx.strokeStyle = "#106A3A";
                ctx.lineWidth = 2;
                ctx.stroke();
            });
        }
    }, [points, isDrawing, viewMode]);

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPoints([...points, { x, y }]);
    };

    const calculateLandArea = () => {
        if (points.length < 3) return;
        // Simple Shoelace formula for area
        let areaVal = 0;
        for (let i = 0; i < points.length; i++) {
            const j = (i + 1) % points.length;
            areaVal += points[i].x * points[j].y;
            areaVal -= points[j].x * points[i].y;
        }
        const finalArea = Math.abs(areaVal) / 200; // Scaled
        setArea(Number(finalArea.toFixed(2)));
        setIsDrawing(false);
    };

    const resetMap = () => {
        setPoints([]);
        setArea(null);
        setIsDrawing(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            {/* Header */}
            <div className="bg-[#106A3A] text-white py-12 px-4 mb-8 relative overflow-hidden">
                <div className="container mx-auto relative z-10">
                    <Link to="/dashboard">
                        <Button variant="ghost" className="text-white hover:bg-white/10 p-0 h-auto font-bold flex items-center gap-2 mb-4">
                            <ArrowLeft className="h-5 w-5" /> {t('navDashboard')}
                        </Button>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                            <MapIcon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black">{t('farmMapper')}</h1>
                            <p className="text-emerald-100 font-medium">{t('farmMapperDesc')}</p>
                        </div>
                    </div>
                </div>
                <div className="absolute right-[-5%] bottom-[-20%] opacity-10">
                    <Satellite className="h-64 w-64 text-white -rotate-12" />
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid gap-8 lg:grid-cols-4">
                    {/* Controls Sidebar */}
                    <div className="space-y-6">
                        <Card className="rounded-[2.5rem] border-emerald-100 shadow-xl overflow-hidden p-6 space-y-6">
                            <div className="space-y-2">
                                <h3 className="font-black text-lg uppercase tracking-tight text-slate-800 dark:text-white">Mapping Tools</h3>
                                <div className="h-1 w-12 bg-emerald-500 rounded-full" />
                            </div>

                            <div className="space-y-2">
                                <Button 
                                    onClick={() => { setIsDrawing(true); setPoints([]); setArea(null); }}
                                    className="w-full justify-start gap-3 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-bold"
                                >
                                    <Pencil className="h-5 w-5" /> {t('drawPlot')}
                                </Button>
                                <Button 
                                    onClick={calculateLandArea}
                                    disabled={!isDrawing || points.length < 3}
                                    className="w-full justify-start gap-3 h-14 rounded-2xl bg-slate-900 border-none font-bold"
                                >
                                    <Layers className="h-5 w-5" /> {t('calculateArea')}
                                </Button>
                                <Button 
                                    onClick={resetMap}
                                    variant="outline"
                                    className="w-full justify-start gap-3 h-14 rounded-2xl border-red-100 text-red-600 hover:bg-red-50 font-bold"
                                >
                                    <Trash2 className="h-5 w-5" /> Reset
                                </Button>
                            </div>

                            <div className="h-px bg-slate-100" />

                            <div className="space-y-3">
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400">View Mode</p>
                                <div className="grid grid-cols-1 gap-2">
                                    <Button 
                                        variant={viewMode === "standard" ? "default" : "outline"}
                                        onClick={() => setViewMode("standard")}
                                        className="rounded-xl h-12 font-bold justify-start gap-2"
                                    >
                                        <Maximize className="h-4 w-4" /> Standard Map
                                    </Button>
                                    <Button 
                                        variant={viewMode === "satellite" ? "default" : "outline"}
                                        onClick={() => setViewMode("satellite")}
                                        className="rounded-xl h-12 font-bold justify-start gap-2"
                                    >
                                        <Satellite className="h-4 w-4" /> Satellite View
                                    </Button>
                                    <Button 
                                        variant={viewMode === "ndvi" ? "default" : "outline"}
                                        onClick={() => setViewMode("ndvi")}
                                        className="rounded-xl h-12 font-bold justify-start gap-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none"
                                    >
                                        <Eye className="h-4 w-4" /> {t('ndviMonitoring')}
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {area && (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                <Card className="rounded-[2.5rem] bg-emerald-600 text-white p-8 border-none shadow-2xl">
                                    <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Calculated Plot Area</p>
                                    <div className="text-5xl font-black mb-1">
                                        {area} <span className="text-xl opacity-60">Acres</span>
                                    </div>
                                    <p className="text-sm font-medium opacity-80">Boundary length: ~1.2 km</p>
                                    <Button className="w-full mt-6 bg-white text-emerald-900 hover:bg-white/90 rounded-xl font-bold">
                                        <Save className="h-4 w-4 mr-2" /> {t('savePlot')}
                                    </Button>
                                </Card>
                            </motion.div>
                        )}
                    </div>

                    {/* Canvas/Map Area */}
                    <div className="lg:col-span-3 space-y-6">
                        <Card className="rounded-[2.5rem] border-emerald-100 shadow-xl overflow-hidden bg-white">
                            <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl font-black">{t('activePlot')}</CardTitle>
                                    <CardDescription>
                                        {isDrawing ? "Click on the grid to place boundary markers" : "Select a tool to begin mapping"}
                                    </CardDescription>
                                </div>
                                {viewMode === "ndvi" && (
                                    <Badge className="bg-red-500 text-white animate-pulse border-none font-bold">
                                        Live Stress Monitoring
                                    </Badge>
                                )}
                            </CardHeader>
                            <CardContent className="p-8 pt-0">
                                <div className={cn(
                                    "relative rounded-3xl overflow-hidden border-2 border-slate-100 shadow-inner group",
                                    isDrawing ? "cursor-crosshair" : "cursor-default"
                                )}>
                                    <canvas 
                                        ref={canvasRef}
                                        width={800}
                                        height={500}
                                        onClick={handleCanvasClick}
                                        className="w-full h-auto bg-slate-50"
                                    />
                                    {isDrawing && points.length === 0 && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/5 pointer-events-none">
                                            <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
                                                <MousePointer2 className="h-5 w-5 text-emerald-600" />
                                                <span className="font-bold">Click anywhere to start drawing</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="p-4 rounded-2xl bg-slate-50 flex items-center gap-3">
                                        <div className="h-3 w-3 rounded-full bg-emerald-500" />
                                        <span className="text-xs font-bold uppercase text-slate-500">{t('ndviHigh')}</span>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-50 flex items-center gap-3">
                                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                        <span className="text-xs font-bold uppercase text-slate-500 text-nowrap">Moderate Vitality</span>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-50 flex items-center gap-3">
                                        <div className="h-3 w-3 rounded-full bg-red-500" />
                                        <span className="text-xs font-bold uppercase text-slate-500">{t('ndviLow')}</span>
                                    </div>
                                    <div className="p-4 bg-emerald-50 rounded-2xl flex items-center gap-3">
                                        <Satellite className="h-4 w-4 text-emerald-600" />
                                        <span className="text-xs font-black text-emerald-700">GPS Sync: Active</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* NDVI Insights */}
                        <AnimatePresence>
                            {viewMode === "ndvi" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                >
                                    <Card className="rounded-[2.5rem] border-red-100 bg-red-50/30 p-8 shadow-sm">
                                        <div className="flex gap-4">
                                            <div className="p-4 bg-red-100 rounded-3xl h-fit">
                                                <AlertCircle className="h-8 w-8 text-red-600" />
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="text-xl font-black text-red-900">Crop Stress Detected in Sector B</h4>
                                                    <p className="text-red-700/80 font-medium font-bold">Satellite telemetry indicates unusual biomass levels. Possible irrigation failure or pest infestation.</p>
                                                </div>
                                                <div className="flex gap-3">
                                                    <Button className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold">
                                                        Inspect in Sector B
                                                    </Button>
                                                    <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-100 rounded-xl font-bold">
                                                        Generate Report
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
