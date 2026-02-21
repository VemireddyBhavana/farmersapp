import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowLeft, MapPin, Search, Navigation, Star, Tractor,
    Phone, Clock, Filter, ChevronRight, Locate,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const nearbyEquipment = [
    { id: "e1", name: "John Deere 5310", type: "Heavy Tractor", distance: "1.2 km", location: "Chittoor Main Market", price: 800, rating: 4.8, available: true, owner: "Suresh Kumar", phone: "9876543211" },
    { id: "e2", name: "Mahindra 275 DI", type: "Medium Tractor", distance: "2.4 km", location: "Renigunta Road", price: 600, rating: 4.5, available: true, owner: "Raju P.", phone: "9876543212" },
    { id: "e3", name: "Mini Tractor 20HP", type: "Small Tractor", distance: "3.1 km", location: "Yerpedu Village", price: 350, rating: 4.3, available: true, owner: "Krishna M.", phone: "9876543213" },
    { id: "e4", name: "Combine Harvester", type: "Harvester", distance: "4.7 km", location: "Tirupati Bypass", price: 1200, rating: 4.9, available: false, owner: "Naidu Farms", phone: "9876543214" },
    { id: "e5", name: "Power Sprayer", type: "Sprayer", distance: "0.8 km", location: "Near Bus Stand", price: 250, rating: 4.4, available: true, owner: "Lakshmi Agro", phone: "9876543215" },
    { id: "e6", name: "Rotavator 7ft", type: "Rotavator", distance: "1.9 km", location: "Settipalli Road", price: 300, rating: 4.6, available: true, owner: "Venkat Agro", phone: "9876543216" },
];

const mapPins = [
    { id: "e1", x: 55, y: 35, color: "bg-green-500", available: true },
    { id: "e2", x: 30, y: 55, color: "bg-green-500", available: true },
    { id: "e3", x: 70, y: 60, color: "bg-green-500", available: true },
    { id: "e4", x: 45, y: 70, color: "bg-red-400", available: false },
    { id: "e5", x: 60, y: 25, color: "bg-green-500", available: true },
    { id: "e6", x: 25, y: 30, color: "bg-green-500", available: true },
];

export default function MapView() {
    const [selected, setSelected] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const filtered = nearbyEquipment.filter(
        (e) =>
            e.name.toLowerCase().includes(search.toLowerCase()) ||
            e.type.toLowerCase().includes(search.toLowerCase()) ||
            e.location.toLowerCase().includes(search.toLowerCase())
    );

    const selectedEquip = nearbyEquipment.find((e) => e.id === selected);

    return (
        <div className="flex flex-col h-screen pt-16 overflow-hidden">
            {/* Search header */}
            <div className="flex items-center gap-3 p-4 border-b bg-background/95 backdrop-blur-md">
                <Link to="/dashboard">
                    <Button variant="ghost" size="icon" className="rounded-full shrink-0">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search equipment near you..."
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-muted/50 border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <Button variant="outline" size="icon" className="rounded-full shrink-0">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Map area */}
                <div className="flex-1 relative bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 dark:from-green-950/40 dark:via-emerald-950/30 dark:to-teal-950/40">
                    {/* Stylized map grid */}
                    <div className="absolute inset-0 opacity-20">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={`h${i}`} className="absolute w-full border-t border-green-600" style={{ top: `${i * 10}%` }} />
                        ))}
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={`v${i}`} className="absolute h-full border-l border-green-600" style={{ left: `${i * 10}%` }} />
                        ))}
                    </div>

                    {/* Road lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 0 50 Q 25 45 50 50 Q 75 55 100 50" stroke="#16a34a" strokeWidth="1.5" fill="none" />
                        <path d="M 50 0 Q 45 25 50 50 Q 55 75 50 100" stroke="#16a34a" strokeWidth="1.5" fill="none" />
                        <path d="M 0 30 Q 30 28 60 35 Q 80 40 100 35" stroke="#16a34a" strokeWidth="0.8" fill="none" />
                        <path d="M 0 70 Q 20 65 50 70 Q 80 75 100 72" stroke="#16a34a" strokeWidth="0.8" fill="none" />
                    </svg>

                    {/* My location */}
                    <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute z-10"
                        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                    >
                        <div className="h-5 w-5 bg-blue-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                            <div className="h-2 w-2 bg-white rounded-full" />
                        </div>
                        <div className="absolute -inset-3 bg-blue-400/20 rounded-full animate-ping" />
                    </motion.div>

                    {/* Equipment pins */}
                    {mapPins.map((pin, idx) => {
                        const eq = nearbyEquipment.find((e) => e.id === pin.id);
                        return (
                            <motion.button
                                key={pin.id}
                                initial={{ scale: 0, y: -20 }}
                                animate={{ scale: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.3 }}
                                onClick={() => setSelected(selected === pin.id ? null : pin.id)}
                                className="absolute z-20 -translate-x-1/2 -translate-y-full"
                                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                            >
                                <div className={cn(
                                    "h-8 w-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white",
                                    selected === pin.id ? "ring-4 ring-primary ring-offset-1" : "",
                                    pin.available ? "bg-green-500" : "bg-red-400"
                                )}>
                                    <Tractor className="h-4 w-4 text-white" />
                                </div>
                                <div className="w-0.5 h-3 bg-current mx-auto opacity-50" />
                            </motion.button>
                        );
                    })}

                    {/* Selected pin popup */}
                    {selected && selectedEquip && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-4 left-4 right-4 z-30 glass rounded-3xl p-4 border border-primary/20 shadow-2xl"
                        >
                            <div className="flex items-start gap-3">
                                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0", selectedEquip.available ? "bg-green-100" : "bg-red-100")}>
                                    <Tractor className={cn("h-6 w-6", selectedEquip.available ? "text-green-600" : "text-red-500")} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold">{selectedEquip.name}</p>
                                        <Badge className={cn("text-[10px]", selectedEquip.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                                            {selectedEquip.available ? "Available" : "Booked"}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {selectedEquip.distance}</span>
                                        <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {selectedEquip.rating}</span>
                                        <span className="font-bold text-primary">₹{selectedEquip.price}/hr</span>
                                    </div>
                                </div>
                                <Link to="/dashboard">
                                    <Button size="sm" className="rounded-xl shrink-0">Book</Button>
                                </Link>
                            </div>
                        </motion.div>
                    )}

                    {/* My location button */}
                    <Button size="icon" className="absolute top-4 right-4 z-20 rounded-2xl shadow-lg bg-white text-primary hover:bg-primary hover:text-white">
                        <Locate className="h-5 w-5" />
                    </Button>
                </div>

                {/* Sidebar list */}
                <div className="w-80 hidden lg:flex flex-col border-l bg-background overflow-y-auto">
                    <div className="p-4 border-b">
                        <h2 className="font-bold text-lg">Nearby Equipment</h2>
                        <p className="text-xs text-muted-foreground">{filtered.length} results within 10 km</p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {filtered.map((eq, idx) => (
                            <motion.button
                                key={eq.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => setSelected(selected === eq.id ? null : eq.id)}
                                className={cn(
                                    "w-full text-left p-4 rounded-2xl border transition-all",
                                    selected === eq.id
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/30 hover:bg-muted/30"
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0", eq.available ? "bg-green-100" : "bg-red-100")}>
                                        <Tractor className={cn("h-5 w-5", eq.available ? "text-green-600" : "text-red-500")} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm truncate">{eq.name}</p>
                                        <p className="text-xs text-muted-foreground">{eq.type}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs flex items-center gap-1 text-muted-foreground">
                                                <MapPin className="h-3 w-3" /> {eq.distance}
                                            </span>
                                            <span className="text-xs font-bold text-primary">₹{eq.price}/hr</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
