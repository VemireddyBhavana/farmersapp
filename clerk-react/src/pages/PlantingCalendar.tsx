import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar as CalendarIcon, Sprout, ArrowLeft, ChevronRight, Info, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const seasonalCrops = [
    {
        season: "Kharif (Monsoon)",
        months: "June - October",
        crops: [
            { name: "Paddy", sowing: "June-July", harvest: "Oct-Nov", tips: "Requires standing water; maintain 5cm depth." },
            { name: "Maize", sowing: "June-July", harvest: "Sept-Oct", tips: "Ensure proper drainage; susceptible to waterlogging." },
            { name: "Cotton", sowing: "May-June", harvest: "Oct-Dec", tips: "Regular weeding is crucial in early stages." },
        ],
        color: "bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30",
        badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    },
    {
        season: "Rabi (Winter)",
        months: "November - March",
        crops: [
            { name: "Wheat", sowing: "Oct-Nov", harvest: "March-April", tips: "Requires cool climate and timely irrigation." },
            { name: "Mustard", sowing: "Oct-Nov", harvest: "Feb-March", tips: "Late sowing reduces yield due to aphid attack." },
            { name: "Gram (Chickpea)", sowing: "Oct-Nov", harvest: "Feb-March", tips: "Best suited for heavy soil with good moisture." },
        ],
        color: "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30",
        badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    },
    {
        season: "Zaid (Summer)",
        months: "March - June",
        crops: [
            { name: "Watermelon", sowing: "Feb-March", harvest: "May-June", tips: "High water requirement; use mulch for moisture." },
            { name: "Cucumber", sowing: "Feb-March", harvest: "April-May", tips: "Fast growing; requires regular picking." },
            { name: "Moong (Green Gram)", sowing: "March", harvest: "May", tips: "Short duration crop; enriches soil nitrogen." },
        ],
        color: "bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30",
        badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    },
];

export default function PlantingCalendar() {
    const { t } = useTranslation();
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedEvent, setSelectedEvent] = useState("");
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSynced, setLastSynced] = useState("Just now");

    const handleAddToCalendar = () => {
        if (!selectedDate || !selectedEvent) return;

        setIsSyncing(true);
        const newEvent = {
            id: Date.now(),
            date: selectedDate,
            event: selectedEvent,
            status: "Scheduled"
        };

        const existingEvents = JSON.parse(localStorage.getItem("farmer_calendar") || "[]");
        localStorage.setItem("farmer_calendar", JSON.stringify([newEvent, ...existingEvents]));

        setTimeout(() => {
            setIsSyncing(false);
            setLastSynced(new Date().toLocaleTimeString());
            setSelectedEvent("");
            setSelectedDate("");
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-8 space-y-8 min-h-screen">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/dashboard">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">{t('nav.planting-calendar')}</h1>
                    <p className="text-muted-foreground">{t('calendar.subtitle', 'Optimal sowing and harvesting schedules for your region')}</p>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
                {/* Main Calendar View */}
                <div className="lg:col-span-8 space-y-8">
                    {seasonalCrops.map((season, sIdx) => (
                        <motion.div
                            key={season.season}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: sIdx * 0.1 }}
                            className={`rounded-[2.5rem] border p-6 md:p-8 ${season.color} shadow-sm backdrop-blur-sm`}
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                <div>
                                    <Badge className={`mb-2 font-bold px-4 py-1 rounded-full ${season.badge}`}>
                                        {t(`calendar.season.${season.season.split(' ')[0].toLowerCase()}`, season.season)}
                                    </Badge>
                                    <h2 className="text-2xl font-black">{season.months}</h2>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                        <Clock className="h-4 w-4" /> {t('calendar.best_window', 'Best Window')}
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-6">
                                {season.crops.map((crop) => (
                                    <div
                                        key={crop.name}
                                        className="bg-white/50 dark:bg-black/20 rounded-3xl p-6 border border-white/20 dark:border-white/5 hover:shadow-md transition-all group"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                            <div className="space-y-3 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                        <Sprout className="h-4 w-4" />
                                                    </div>
                                                    <h3 className="text-xl font-bold">{t(`crops.${crop.name.toLowerCase()}`, crop.name)}</h3>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{t('calendar.sowing_window', 'Sowing Window')}</p>
                                                        <p className="text-sm font-bold text-primary">{crop.sowing}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{t('calendar.harvest_time', 'Harvest Time')}</p>
                                                        <p className="text-sm font-bold text-amber-600">{crop.harvest}</p>
                                                    </div>
                                                </div>
                                                <div className="pt-2 flex items-start gap-2">
                                                    <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                                                        {t(`crop_tips.${crop.name.toLowerCase()}`, crop.tips)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-end">
                                                <Button variant="ghost" size="sm" className="rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                                    {t('common.read_guide', 'Read Full Guide')} <ChevronRight className="ml-1 h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Action Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="rounded-[2.5rem] border-primary/10 overflow-hidden shadow-lg border-none bg-gradient-to-br from-primary to-emerald-700 text-primary-foreground">
                        <CardHeader className="p-8 pb-4">
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5" /> {t('calendar.schedule_sync', 'Schedule & Sync')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-4 space-y-6">
                            <div className="space-y-4">
                                <div className="p-4 bg-white/10 rounded-2xl space-y-2">
                                    <p className="text-xs font-bold uppercase tracking-widest text-white/70">{t('calendar.sync_status', 'Database Sync Status')}</p>
                                    <div className="flex items-center gap-2">
                                        <div className={cn("h-2 w-2 rounded-full bg-green-400", isSyncing && "animate-pulse")} />
                                        <p className="text-sm font-medium">{t('calendar.last_synced', 'Last synced')}: {isSyncing ? t('common.syncing', 'Syncing...') : lastSynced}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-xs font-bold uppercase tracking-widest text-white/70">{t('calendar.add_event', 'Add Planning Event')}</p>
                                    <Input
                                        type="date"
                                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                    />
                                    <Input
                                        placeholder={t('calendar.event_placeholder', 'Task e.g. Soil Prepare')}
                                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                                        value={selectedEvent}
                                        onChange={(e) => setSelectedEvent(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Button
                                onClick={handleAddToCalendar}
                                disabled={!selectedDate || !selectedEvent || isSyncing}
                                className="w-full bg-white text-primary hover:bg-white/90 rounded-2xl py-6 h-auto font-bold shadow-xl"
                            >
                                {isSyncing ? t('common.saving', 'Saving...') : t('calendar.add_to_calendar', 'Add to Calendar')}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2.5rem] border-primary/10 shadow-sm">
                        <CardHeader className="p-8 pb-4 border-b">
                            <CardTitle className="text-lg font-bold">{t('calendar.advisory_notice', 'Advisory Notice')}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {t('calendar.advisory_desc', 'Due to delayed monsoons in Chittoor district, we recommend adjusting your paddy sowing window by 10 days to ensure optimal seedling health.')}
                            </p>
                            <div className="p-4 rounded-2xl bg-muted/50 border text-xs font-medium text-muted-foreground italic">
                                "{t('calendar.quote', 'Patience in sowing brings abundance in reaping.')}"
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
