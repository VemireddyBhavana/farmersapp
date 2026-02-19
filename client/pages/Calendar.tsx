import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, MapPin, Clock, Leaf, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const farmingEvents = [
  { id: 1, date: "Oct 15", title: "Paddy Sowing", type: "Sowing", color: "bg-green-100 text-green-700" },
  { id: 2, date: "Oct 18", title: "Fertilizer Application", type: "Maintenance", color: "bg-blue-100 text-blue-700" },
  { id: 3, date: "Oct 22", title: "Irrigation Schedule", type: "Watering", color: "bg-cyan-100 text-cyan-700" },
  { id: 4, date: "Oct 25", title: "Pest Inspection", type: "Security", color: "bg-amber-100 text-amber-700" },
];

const cropCycles = [
  { crop: "Kharif Paddy", progress: 75, status: "Ripening Stage", end: "Nov 10" },
  { crop: "Tomato", progress: 40, status: "Vegetative Stage", end: "Dec 05" },
];

export default function FarmingCalendar() {
  const [currentMonth, setCurrentMonth] = useState("October 2023");

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Farming Calendar</h1>
          <p className="text-muted-foreground">Manage your seasonal crop cycles and daily tasks</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Calendar View */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-[3rem] border-primary/10 shadow-xl overflow-hidden">
            <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-black">{currentMonth}</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-xl"><ChevronLeft className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" className="rounded-xl"><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="grid grid-cols-7 gap-2 mb-4 text-center text-xs font-black text-muted-foreground uppercase tracking-widest">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => <div key={day}>{day}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-4">
                {Array.from({ length: 31 }).map((_, i) => {
                  const day = i + 1;
                  const hasEvent = [15, 18, 22, 25].includes(day);
                  return (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      key={i}
                      className={cn(
                        "aspect-square rounded-2xl flex flex-col items-center justify-center border transition-all cursor-pointer relative overflow-hidden group",
                        day === 12 ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" : "bg-muted/30 border-primary/5 hover:border-primary/20 hover:bg-white"
                      )}
                    >
                      <span className="text-lg font-black">{day}</span>
                      {hasEvent && (
                        <div className="absolute bottom-2 h-1.5 w-1.5 rounded-full bg-secondary group-hover:scale-150 transition-transform"></div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-bold px-2">Upcoming Events</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {farmingEvents.map((event) => (
                <Card key={event.id} className="rounded-[2rem] border-primary/5 hover:shadow-md transition-all">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="text-center bg-muted/50 p-2 rounded-2xl min-w-[60px]">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">{event.date.split(' ')[0]}</p>
                      <p className="text-xl font-black">{event.date.split(' ')[1]}</p>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{event.title}</h4>
                      <Badge className={cn("mt-1 text-[10px] font-bold py-0 h-5", event.color)}>{event.type}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Crop Cycles */}
        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-primary/10 shadow-lg bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-lg font-black flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" /> Active Cycles
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-8">
              {cropCycles.map((cycle, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="font-black text-xl">{cycle.crop}</h4>
                      <p className="text-xs text-muted-foreground font-bold">{cycle.status}</p>
                    </div>
                    <p className="text-xs font-black text-primary">{cycle.progress}%</p>
                  </div>
                  <div className="h-3 w-full bg-muted rounded-full overflow-hidden border border-primary/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cycle.progress}%` }}
                      transition={{ duration: 1, delay: idx * 0.2 }}
                      className="h-full bg-primary"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Harvest expected by {cycle.end}
                  </p>
                </div>
              ))}
              <Button className="w-full rounded-2xl py-6 h-auto font-black shadow-lg shadow-primary/10 transition-all hover:translate-y-[-2px]">
                <Plus className="h-5 w-5 mr-2" /> Start New Cycle
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-primary/10 shadow-lg bg-amber-50/30">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-lg font-black text-amber-700">Daily Advisory</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <p className="text-sm text-amber-900/70 leading-relaxed font-medium">
                High humidity levels detected for today. Monitor your paddy fields for early signs of stem borer. Next irrigation window opens on Oct 14th morning.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
