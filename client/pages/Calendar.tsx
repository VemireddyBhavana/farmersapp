import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, MapPin, Clock, Leaf, ArrowLeft, Info, Sprout, CheckCircle2, AlertTriangle, Timer, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import { backend, Booking } from "@/lib/MockBackend";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const cropsData: Record<string, {
  name: string;
  emoji: string;
  plantingMonths: string[];
  harvestMonths: string[];
  activities: { day: number; task: string; type: "Sowing" | "Maintenance" | "Watering" | "Security" }[];
}> = {
  tomato: {
    name: "Tomato",
    emoji: "🍅",
    plantingMonths: ["March", "April", "May"],
    harvestMonths: ["June", "July", "August"],
    activities: [
      { day: 5, task: "Soil Preparation", type: "Maintenance" },
      { day: 10, task: "Sowing Seeds", type: "Sowing" },
      { day: 15, task: "Irrigation Day 1", type: "Watering" },
      { day: 22, task: "Fertilizer Application", type: "Maintenance" },
    ]
  },
  rice: {
    name: "Rice (Paddy)",
    emoji: "🌾",
    plantingMonths: ["June", "July"],
    harvestMonths: ["October", "November"],
    activities: [
      { day: 1, task: "Nursery Preparation", type: "Maintenance" },
      { day: 15, task: "Transplanting", type: "Sowing" },
      { day: 20, task: "Weeding", type: "Maintenance" },
    ]
  },
  wheat: {
    name: "Wheat",
    emoji: "🌾",
    plantingMonths: ["October", "November"],
    harvestMonths: ["March", "April"],
    activities: [
      { day: 10, task: "Sowing", type: "Sowing" },
      { day: 25, task: "First Irrigation", type: "Watering" },
    ]
  },
  cotton: {
    name: "Cotton",
    emoji: "☁️",
    plantingMonths: ["May", "June"],
    harvestMonths: ["October", "November"],
    activities: [
      { day: 5, task: "Sowing", type: "Sowing" },
      { day: 20, task: "Thinning & Gap Filling", type: "Maintenance" },
    ]
  },
  chilli: {
    name: "Chilli",
    emoji: "🌶️",
    plantingMonths: ["July", "August"],
    harvestMonths: ["December", "January"],
    activities: [
      { day: 1, task: "Nursery Sowing", type: "Maintenance" },
      { day: 30, task: "Transplanting", type: "Sowing" },
    ]
  }
};

export default function FarmingCalendar() {
  const [selectedCropKey, setSelectedCropKey] = useState<string>("tomato");
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // February 2026
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isBlueprintModalOpen, setIsBlueprintModalOpen] = useState(false);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const selectedCrop = cropsData[selectedCropKey];
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  useEffect(() => {
    if (user) {
      setUserBookings(backend.getBookings(user.phone));
    }
  }, [user]);

  const handleDateClick = (day: number) => {
    setSelectedDay(day);
    setIsBookingModalOpen(true);
  };

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const handleConfirmBooking = (activityType: string) => {
    if (!user || !selectedDay) return;
    const dateStr = `${selectedDay} ${monthName} ${year}`;
    const newBooking = backend.addBooking({
      equipmentName: activityType,
      date: dateStr,
      duration: 1,
      userId: user.phone
    });
    setUserBookings([...userBookings, newBooking]);
    setIsBookingModalOpen(false);
    toast({
      title: "Schedule Confirmed",
      description: `${activityType} planned for ${dateStr}.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tight text-foreground">
            {t("plantingCalendar")}
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            Smart agricultural scheduling & activity management.
          </p>
        </div>
        <div className="flex bg-white p-2 rounded-2xl shadow-xl border border-emerald-100 items-center gap-4">
          <div className="bg-emerald-600 p-2 rounded-xl text-white">
            <Sprout className="h-6 w-6" />
          </div>
          <div className="pr-4">
            <p className="text-[10px] font-black uppercase text-muted-foreground">Select Research Crop</p>
            <Select value={selectedCropKey} onValueChange={setSelectedCropKey}>
              <SelectTrigger className="border-none bg-transparent h-auto p-0 text-lg font-bold shadow-none focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-emerald-100 shadow-2xl">
                {Object.entries(cropsData).map(([key, data]) => (
                  <SelectItem key={key} value={key} className="rounded-xl font-bold py-3">
                    {data.emoji} {data.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Crop Insights */}
        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-primary/5 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-2xl overflow-hidden p-8 border-none relative">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-3xl bg-white/20 flex items-center justify-center text-4xl">
                  {selectedCrop.emoji}
                </div>
                <div>
                  <h2 className="text-2xl font-black">{selectedCrop.name} Guide</h2>
                  <p className="opacity-80 text-sm font-medium">Season-specific insights</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Planting Window</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCrop.plantingMonths.map(m => (
                      <Badge key={m} className="bg-white/20 text-white border-none rounded-lg">{m}</Badge>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Harvesting Window</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCrop.harvestMonths.map(m => (
                      <Badge key={m} className="bg-white/20 text-white border-none rounded-lg">{m}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => setIsBlueprintModalOpen(true)}
                  className="w-full rounded-2xl bg-white text-emerald-700 hover:bg-emerald-50 font-black h-14 shadow-xl"
                >
                  Detailed Growth Blueprint
                </Button>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 h-64 w-64 bg-emerald-400 rounded-full blur-3xl opacity-20 pointer-events-none" />
          </Card>

          <Card className="rounded-[2.5rem] border-emerald-100 shadow-xl overflow-hidden bg-white">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black flex items-center gap-2">
                <Timer className="h-5 w-5 text-emerald-600" />
                Scheduled Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-4">
              {userBookings.length > 0 ? (
                userBookings.map((booking, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 border border-emerald-100 group">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                        {booking.date.split(" ")[0]}
                      </div>
                      <div>
                        <p className="text-sm font-black">{booking.equipmentName}</p>
                        <p className="text-[10px] font-bold text-muted-foreground">{booking.date}</p>
                      </div>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 opacity-50" />
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-xs font-bold text-muted-foreground">No tasks scheduled yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Interactive Calendar */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[3rem] border-primary/5 shadow-2xl overflow-hidden bg-white">
            <CardHeader className="p-10 pb-6 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-black text-foreground">
                  {monthName} {year}
                </CardTitle>
                <p className="text-sm font-bold text-emerald-600">Dynamic Activity Interface</p>
              </div>
              <div className="flex bg-muted/50 p-1.5 rounded-2xl gap-1">
                <Button variant="ghost" size="icon" onClick={prevMonth} className="rounded-xl hover:bg-white hover:shadow-lg"><ChevronLeft className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" onClick={nextMonth} className="rounded-xl hover:bg-white hover:shadow-lg"><ChevronRight className="h-5 w-5" /></Button>
              </div>
            </CardHeader>
            <CardContent className="p-10 pt-0">
              <div className="grid grid-cols-7 gap-4 mb-8 text-center text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => <div key={day} className="py-2">{day}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-4 md:gap-6">
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();
                  const booking = userBookings.find(b => b.date.startsWith(day.toString()) && b.date.includes(monthName));
                  const activity = selectedCrop.activities.find(a => a.day === day && monthName === selectedCrop.plantingMonths[0]);

                  return (
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      key={i}
                      onClick={() => handleDateClick(day)}
                      className={cn(
                        "aspect-square p-2 md:p-4 rounded-3xl flex flex-col items-center justify-center border-4 transition-all cursor-pointer relative group",
                        isToday ? "border-blue-500 bg-blue-50 shadow-xl shadow-blue-500/10" :
                          booking ? "border-emerald-500 bg-emerald-50 shadow-xl shadow-emerald-500/10" :
                            activity ? "border-amber-500 bg-amber-50" :
                              "border-transparent bg-slate-50/50 hover:bg-white hover:border-emerald-200"
                      )}
                    >
                      <span className={cn("text-lg md:text-2xl font-black", isToday ? "text-blue-600" : booking ? "text-emerald-700" : activity ? "text-amber-700" : "text-slate-400 group-hover:text-emerald-600")}>
                        {day}
                      </span>
                      {booking && (
                        <div className="mt-1 md:mt-2 h-2 w-2 md:h-3 md:w-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                      )}
                      {activity && !booking && (
                        <div className="mt-1 md:mt-2 h-2 w-2 md:h-3 md:w-3 rounded-full bg-amber-500 animate-pulse" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] p-10 border-none glass-dark bg-white/90 backdrop-blur-2xl">
          <DialogHeader className="mb-8">
            <div className="h-16 w-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-xl shadow-emerald-600/20">
              <CalendarIcon className="h-8 w-8" />
            </div>
            <DialogTitle className="text-3xl font-black">Day Action</DialogTitle>
            <DialogDescription className="text-lg font-medium">
              Schedule your agricultural task for {selectedDay} {monthName}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Quick Select Task</p>
            <div className="grid grid-cols-2 gap-4">
              {["Irrigation", "Weeding", "Fertilizing", "Spraying", "Pruning", "Maintenance"].map(task => (
                <Button
                  key={task}
                  variant="outline"
                  onClick={() => handleConfirmBooking(task)}
                  className="h-14 rounded-2xl border-emerald-100 hover:bg-emerald-600 hover:text-white hover:border-none font-bold transition-all"
                >
                  {task}
                </Button>
              ))}
            </div>
          </div>
          <DialogFooter className="mt-10 sm:justify-start">
            <Button
              variant="ghost"
              onClick={() => setIsBookingModalOpen(false)}
              className="rounded-xl font-bold text-muted-foreground w-full py-6"
            >
              Discard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Blueprint Dialog */}
      <Dialog open={isBlueprintModalOpen} onOpenChange={setIsBlueprintModalOpen}>
        <DialogContent className="sm:max-w-[700px] rounded-[2.5rem] p-0 border-none overflow-hidden glass max-h-[90vh]">
          <div className="bg-emerald-600 p-10 text-white space-y-2">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-3xl bg-white/20 flex items-center justify-center text-4xl">
                {selectedCrop.emoji}
              </div>
              <div>
                <DialogTitle className="text-3xl font-black">{selectedCrop.name} Blueprint</DialogTitle>
                <DialogDescription className="text-emerald-50 font-medium">
                  Complete scientific growing guide and timeline.
                </DialogDescription>
              </div>
            </div>
          </div>

          <div className="p-10 space-y-8 overflow-y-auto no-scrollbar">
            <div className="grid gap-6">
              <div className="space-y-4">
                <h4 className="font-black text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  Cultivation Timeline
                </h4>
                <div className="space-y-4">
                  {selectedCrop.activities.map((act, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-muted/30 border border-primary/5">
                      <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-white flex items-center justify-center font-bold text-emerald-600 shadow-sm">
                        Day {act.day}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{act.task}</p>
                        <Badge variant="outline" className="text-[10px] uppercase tracking-widest mt-1 border-primary/10">
                          {act.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">Water Management</p>
                  <p className="text-sm font-medium leading-relaxed">
                    Regular irrigation every 3-4 days in summer, 7-10 days in winter.
                  </p>
                </div>
                <div className="p-6 rounded-3xl bg-amber-50 border border-amber-100 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">Fertilizer Use</p>
                  <p className="text-sm font-medium leading-relaxed">
                    Apply NPK (19:19:19) at early stages, shift to Potash during fruiting.
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => setIsBlueprintModalOpen(false)} className="w-full rounded-2xl py-6 h-auto font-black shadow-lg shadow-primary/20">
                Close Blueprint
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
