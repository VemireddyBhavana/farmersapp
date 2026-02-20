import { motion } from "framer-motion";
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Calendar, ArrowLeft, SunMedium, CloudLightning, MapPin, Navigation, Sprout, Info, Waves } from "lucide-react";
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
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          Live Weather Analysis & Recommendations
        </h1>
        <p className="text-muted-foreground text-lg">
          Get real-time weather data and AI-powered farming recommendations based on your exact location.
        </p>
        <Button className="rounded-full bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg shadow-xl shadow-blue-500/20 flex items-center gap-2 mx-auto">
          <Navigation className="h-5 w-5 fill-current" />
          Get Live Weather & Recommendations
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Temperature", value: "24°C", sub: "Feels like 22.7°C", icon: Thermometer, color: "text-red-500" },
          { label: "Humidity", value: "80%", sub: "High", icon: Droplets, color: "text-blue-500" },
          { label: "Wind Speed", value: "5 km/h", sub: "Gentle", icon: Wind, color: "text-slate-400" },
          { label: "Location", value: "Hyderabad, India", sub: "Cloudy", icon: MapPin, color: "text-amber-500" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="rounded-3xl border-primary/5 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <h3 className="text-2xl font-black">{stat.value}</h3>
                  </div>
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
                <p className="text-xs text-muted-foreground font-medium">{stat.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="rounded-[2.5rem] border-primary/5 shadow-sm h-full overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-3">
                <Sprout className="h-6 w-6 text-emerald-500" />
                Farming Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Given the current overcast skies and light winds at 24°C in Hyderabad, it's advisable to monitor soil moisture levels closely. If the soil is moist, delay irrigation to prevent waterlogging, which can harm root systems. If the soil is dry, provide light irrigation in the early morning or late evening to minimize evaporation losses. Additionally, applying mulch around plant bases can help retain soil moisture and regulate temperature.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="rounded-[2.5rem] border-primary/5 shadow-sm h-full overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-3">
                <Waves className="h-6 w-6 text-blue-500" />
                Irrigation Advice
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <p className="text-muted-foreground leading-relaxed text-lg">
                With humidity at 80% and clouds present, evapotranspiration rates are lower.
                <br /><br />
                • <strong>Timing:</strong> Irrigate before 9 AM or after 5 PM.
                <br />
                • <strong>Method:</strong> Drip irrigation is highly recommended to save water.
                <br />
                • <strong>Note:</strong> Check for upcoming rain before starting a heavy irrigation cycle.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="space-y-8 pt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black tracking-tight">Recommended Crops for Current Weather</h2>
          <Link to="/calendar">
            <Button variant="outline" className="rounded-xl font-bold">View Planting Calendar</Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Rice (Kharif)", suitability: "High", reason: "Current humidity and temperature are ideal for growth." },
            { name: "Cotton", suitability: "Medium", reason: "Good for gentle winds, but watch for excessive humidity." },
            { name: "Pulses", suitability: "High", reason: "Moderate temperature supports nitrogen fixation." },
          ].map((crop, i) => (
            <Card key={i} className="rounded-3xl border-primary/5 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
              <div className="h-2 bg-emerald-500 w-full" />
              <CardContent className="p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-bold group-hover:text-emerald-600 transition-colors">{crop.name}</h4>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-3">{crop.suitability}</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {crop.reason}
                </p>
                <Button variant="ghost" className="p-0 text-emerald-600 hover:text-emerald-700 font-bold group-hover:translate-x-1 transition-transform">
                  View Growing Guide <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="pt-12">
        <h2 className="text-3xl font-black tracking-tight mb-8">7-Day Outlook</h2>
        <div className="grid gap-4 md:grid-cols-7">
          {weeklyForecast.map((day, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col items-center p-6 rounded-[2rem] bg-muted/30 border border-primary/5 hover:bg-white hover:shadow-xl transition-all cursor-default"
            >
              <span className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">{day.day}</span>
              <day.icon className={cn("h-10 w-10 mb-4", day.condition === "Rainy" || day.condition === "Thunderstorm" ? "text-blue-500" : "text-amber-500")} />
              <span className="text-xl font-black">{day.temp}</span>
              <span className="text-xs font-medium text-muted-foreground mt-2 text-center">{day.condition}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
