import { motion } from "framer-motion";
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Calendar, ArrowLeft, SunMedium, CloudLightning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const weeklyForecast = [
  { day: "Mon", temp: "32°C", condition: "Sunny", icon: Sun },
  { day: "Tue", temp: "30°C", condition: "Partly Cloudy", icon: SunMedium },
  { day: "Wed", temp: "28°C", condition: "Rainy", icon: CloudRain },
  { day: "Thu", temp: "27°C", condition: "Thunderstorm", icon: CloudLightning },
  { day: "Fri", temp: "29°C", condition: "Cloudy", icon: Cloud },
  { day: "Sat", temp: "31°C", condition: "Sunny", icon: Sun },
  { day: "Sun", temp: "33°C", condition: "Hot", icon: Sun },
];

export default function Weather() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Weather Forecast</h1>
          <p className="text-muted-foreground">Agricultural weather advisory for Chittoor District</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Today's Weather */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2"
        >
          <Card className="rounded-[3rem] border-primary/10 overflow-hidden bg-gradient-to-br from-primary/5 to-transparent shadow-xl">
            <CardContent className="p-8 lg:p-12">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left space-y-4">
                  <Badge className="bg-primary/10 text-primary border-none px-4 py-1">Today, Oct 12</Badge>
                  <h2 className="text-6xl font-black text-foreground">32°C</h2>
                  <p className="text-2xl font-bold text-muted-foreground flex items-center justify-center md:justify-start gap-2">
                    Partly Cloudy <SunMedium className="text-amber-500 h-8 w-8" />
                  </p>
                  <div className="flex gap-6 pt-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-blue-500" />
                      <span className="font-bold">45% Humidity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="h-5 w-5 text-slate-400" />
                      <span className="font-bold">14km/h Wind</span>
                    </div>
                  </div>
                </div>
                <div className="relative h-48 w-48 lg:h-64 lg:w-64">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-amber-400/20 rounded-full blur-3xl"
                  />
                  <Sun className="h-full w-full text-amber-500 drop-shadow-2xl animate-pulse" />
                </div>
              </div>

              <div className="mt-12 p-6 rounded-[2rem] bg-white/50 backdrop-blur-sm border border-primary/5">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <CloudRain className="text-primary" /> Agri Advisory
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ideal conditions for harvesting and drying crops. Rainfall expected in 48 hours, consider completing field preparation by tomorrow evening. Low risk of pests due to dry winds.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 7-Day Forecast */}
        <Card className="rounded-[3rem] border-primary/10 shadow-lg">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-bold">7-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-4">
            {weeklyForecast.map((day, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 text-sm font-bold">{day.day}</div>
                  <day.icon className={cn("h-6 w-6", day.condition === "Rainy" ? "text-blue-500" : "text-amber-500")} />
                </div>
                <div className="text-sm font-medium text-muted-foreground">{day.condition}</div>
                <div className="font-bold">{day.temp}</div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
