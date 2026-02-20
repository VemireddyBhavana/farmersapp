import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, MapPin, Clock, Leaf, ArrowLeft, Info, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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

const farmingEvents = [
  { id: 1, date: "Feb 15", title: "Tomato Sowing", type: "Sowing", color: "bg-green-100 text-green-700" },
  { id: 2, date: "Feb 18", title: "Fertilizer Application", type: "Maintenance", color: "bg-blue-100 text-blue-700" },
  { id: 3, date: "Feb 22", title: "Irrigation Schedule", type: "Watering", color: "bg-cyan-100 text-cyan-700" },
  { id: 4, date: "Feb 25", title: "Pest Inspection", type: "Security", color: "bg-amber-100 text-amber-700" },
];

export default function FarmingCalendar() {
  const [currentMonth, setCurrentMonth] = useState("February 2026");
  const [selectedCrop, setSelectedCrop] = useState<string | undefined>(undefined);

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          Planting Calendar
        </h1>
        <p className="text-muted-foreground text-lg">
          Plan your farming activities with optimal planting and harvesting dates for different crops.
        </p>
      </div>

      {/* Select Crop Section */}
      <Card className="rounded-[2.5rem] border-primary/5 bg-white shadow-sm overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-2xl font-black flex items-center gap-3">
            <Sprout className="h-7 w-7 text-emerald-600" />
            Select Crop
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-4">
          <div className="max-w-xl">
            <Select onValueChange={(value) => setSelectedCrop(value)}>
              <SelectTrigger className="rounded-xl border-primary/10 h-14 bg-white text-lg font-medium">
                <SelectValue placeholder="Choose a crop to view calendar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tomato">Tomato</SelectItem>
                <SelectItem value="rice">Rice (Paddy)</SelectItem>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="cotton">Cotton</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {selectedCrop === "tomato" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 bg-emerald-50/30 p-8 rounded-[2.5rem] border border-emerald-100"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🍅</span>
            <h2 className="text-3xl font-black tracking-tight">Tomato Growing Guide</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-emerald-800">
                <Leaf className="h-5 w-5" /> Planting Season
              </div>
              <div className="flex flex-wrap gap-2">
                {["March", "April", "May", "June"].map(m => (
                  <Badge key={m} className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-4 py-1.5 rounded-full text-sm font-bold">{m}</Badge>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-amber-800">
                <div className="text-xl">🌾</div> Harvesting Season
              </div>
              <div className="flex flex-wrap gap-2">
                {["June", "July", "August", "September"].map(m => (
                  <Badge key={m} className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none px-4 py-1.5 rounded-full text-sm font-bold">{m}</Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Calendar View */}
      <Card className="rounded-[3rem] border-primary/5 shadow-xl overflow-hidden bg-white">
        <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-black flex items-center gap-3">
            <CalendarIcon className="h-6 w-6 text-emerald-600" />
            {currentMonth}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted"><ChevronLeft className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted"><ChevronRight className="h-5 w-5" /></Button>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="grid grid-cols-7 gap-2 mb-6 text-center text-sm font-bold text-muted-foreground uppercase tracking-wider">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => <div key={day} className="py-2">{day}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-3">
            {Array.from({ length: 28 }).map((_, i) => {
              const day = i + 1;
              const hasEvent = [15, 18, 22, 25].includes(day);
              const isToday = day === 20;
              return (
                <motion.div
                  whileHover={{ y: -2 }}
                  key={i}
                  className={cn(
                    "min-h-[100px] p-3 rounded-2xl flex flex-col items-start justify-start border transition-all cursor-pointer relative group",
                    isToday ? "bg-blue-50 border-blue-200" : "bg-muted/10 border-transparent hover:border-emerald-200 hover:bg-emerald-50/30"
                  )}
                >
                  <span className={cn("text-lg font-bold", isToday ? "text-blue-600" : "text-foreground")}>{day}</span>
                  {hasEvent && (
                    <div className="mt-2 w-full space-y-1">
                      <div className="h-1.5 w-full rounded-full bg-emerald-400"></div>
                      {day === 15 && <span className="text-[10px] font-black text-emerald-700 leading-none">Tomato Sowing</span>}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
