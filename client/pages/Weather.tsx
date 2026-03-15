import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Calendar, ArrowLeft, SunMedium, CloudLightning, MapPin, Navigation, Sprout, Info, Waves, RefreshCw, Loader2, AlertTriangle, CloudSun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

import { useLanguage } from "@/lib/LanguageContext";
import { useWeather } from "@/hooks/useWeather";

export default function Weather() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { weather, forecast, loading, error, fetchWeather, getLocationAndFetch } = useWeather();
  const [manualLocation, setManualLocation] = useState("");
  const [showManualInput, setShowManualInput] = useState(false);

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualLocation.trim()) {
      fetchWeather(undefined, undefined, manualLocation);
      setManualLocation("");
      setShowManualInput(false);
    }
  };

  const getAdvisory = () => {
    if (!weather) return null;
    const advisories = [];

    if (weather.rainProbability > 60 || weather.description.includes("rain")) {
      advisories.push({
        title: t('rainExpectedTitle'),
        text: t('rainExpectedText'),
        type: "warning",
        icon: CloudRain
      });
    }

    if (weather.temp > 35) {
      advisories.push({
        title: t('heatAlertTitle'),
        text: t('heatAlertText'),
        type: "danger",
        icon: Thermometer
      });
    }

    if (weather.humidity > 70) {
      advisories.push({
        title: t('fungalRiskTitle'),
        text: t('fungalRiskText'),
        type: "info",
        icon: Droplets
      });
    }

    if (weather.windSpeed > 20) {
      advisories.push({
        title: t('windAlertTitle'),
        text: t('windAlertText'),
        type: "warning",
        icon: Wind
      });
    }

    if (advisories.length === 0) {
      advisories.push({
        title: t('optimalConditionsTitle'),
        text: t('optimalConditionsText'),
        type: "success",
        icon: Sprout
      });
    }

    return advisories;
  };

  const getWeatherIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes("clear") || c.includes("sun")) return Sun;
    if (c.includes("cloud") && c.includes("sun")) return CloudSun;
    if (c.includes("cloud")) return Cloud;
    if (c.includes("rain")) return CloudRain;
    if (c.includes("thunder") || c.includes("storm")) return CloudLightning;
    return Cloud;
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Weather Update Failed",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm mb-4"
        >
          <Sprout className="h-4 w-4" />
          {t('smartAgriIntelligence')}
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          {t("weatherAnalysis")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t('weatherDashboardSubtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button
            onClick={getLocationAndFetch}
            disabled={loading}
            className="rounded-full bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg shadow-xl shadow-blue-500/20 flex items-center gap-2 w-full sm:w-auto"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Navigation className="h-5 w-5 fill-current" />}
            {t('detectMyLocation')}
          </Button>

          <Button
            variant="outline"
            onClick={() => setShowManualInput(!showManualInput)}
            className="rounded-full px-8 py-6 text-lg border-blue-200 hover:bg-blue-50 w-full sm:w-auto"
          >
            {showManualInput ? t('cancel') : t('enterLocationManually')}
          </Button>

          <Button
            variant="outline"
            onClick={getLocationAndFetch}
            disabled={loading}
            className="rounded-full h-14 w-14 p-0 flex items-center justify-center border-blue-200 hover:bg-blue-50 hidden sm:flex"
          >
            <RefreshCw className={cn("h-6 w-6 text-blue-600", loading && "animate-spin")} />
          </Button>
        </div>

        <AnimatePresence>
          {showManualInput && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleManualSearch}
              className="mt-6 flex gap-2 max-w-md mx-auto"
            >
            <Input
                placeholder={t('searchPlaceholder')}
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
                className="rounded-full py-6 px-6"
                autoFocus
              />
              <Button type="submit" className="rounded-full py-6 px-8 bg-emerald-600 hover:bg-emerald-700">{t('search')}</Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="relative">
              <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-4" />
              <Cloud className="h-8 w-8 text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">{t('fetchingData')}</p>
            <p className="text-sm text-muted-foreground mt-2">{t('connectingToStations')}</p>
          </motion.div>
        ) : weather ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            {/* Main Weather Card */}
            <Card className="rounded-[3rem] border-none shadow-2xl bg-gradient-to-br from-white via-white to-blue-50/50 overflow-hidden group">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <div className="p-10 md:p-16 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest mb-6">
                      <MapPin className="h-5 w-5" />
                      {weather.location}
                    </div>
                    <div className="flex items-start gap-6 mb-8">
                      <h2 className="text-8xl font-black tracking-tighter text-foreground">
                        {weather.temp}°
                      </h2>
                      <div className="mt-4">
                        <Badge variant="secondary" className="px-4 py-2 rounded-full text-lg bg-blue-100 text-blue-700 border-none font-black">
                          {weather.description}
                        </Badge>
                        <p className="text-muted-foreground mt-2 font-bold">{t('feelsLike')} {weather.feelsLike}°C</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                          <Droplets className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-muted-foreground">{t('humidity')}</p>
                          <p className="text-xl font-black">{weather.humidity}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-500">
                          <Wind className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-muted-foreground">{t('windSpeed')}</p>
                          <p className="text-xl font-black">{weather.windSpeed} km/h</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 md:p-16 text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="relative z-10"
                    >
                      {(() => {
                        const Icon = getWeatherIcon(weather.description);
                        return <Icon className="h-48 w-48 text-white stroke-[1.5px] drop-shadow-2xl" />;
                      })()}
                    </motion.div>
                    <div className="absolute top-0 right-0 p-8">
                      <Badge className="bg-white/20 hover:bg-white/30 backdrop-blur-md border-none text-white px-4 py-2 rounded-xl text-sm font-bold">
                        Updated {new Date(weather.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Badge>
                    </div>
                    <div className="mt-8 z-10">
                      <h3 className="text-3xl font-black mb-2">{weather.description.toUpperCase()}</h3>
                      <p className="opacity-80 font-medium">{t('hyperLocalPrecisionData')}</p>
                    </div>
                    {/* Background decorations */}
                    <div className="absolute -bottom-20 -left-20 h-64 w-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -top-20 -right-20 h-64 w-64 bg-blue-400/20 rounded-full blur-3xl" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advisory Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-amber-500" />
                {t('smartAdvisoryTitle')}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {getAdvisory()?.map((adv, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className={cn(
                      "rounded-[2.5rem] border-none shadow-xl overflow-hidden",
                      adv.type === "warning" ? "bg-amber-50" :
                        adv.type === "danger" ? "bg-red-50" :
                          adv.type === "info" ? "bg-blue-50" : "bg-emerald-50"
                    )}>
                      <CardContent className="p-8 flex gap-6">
                        <div className={cn(
                          "h-16 w-16 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg",
                          adv.type === "warning" ? "bg-amber-500 text-white" :
                            adv.type === "danger" ? "bg-red-500 text-white" :
                              adv.type === "info" ? "bg-blue-500 text-white" : "bg-emerald-500 text-white"
                        )}>
                          <adv.icon className="h-8 w-8" />
                        </div>
                        <div className="space-y-2">
                          <h3 className={cn(
                            "text-xl font-bold",
                            adv.type === "warning" ? "text-amber-700" :
                              adv.type === "danger" ? "text-red-700" :
                                adv.type === "info" ? "text-blue-700" : "text-emerald-700"
                          )}>{adv.title}</h3>
                          <p className="text-muted-foreground leading-relaxed font-medium">
                            {adv.text}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Forecast and Irrigation Grid */}
            <div className="grid gap-8 lg:grid-cols-3">
              <Card className="rounded-[3rem] border-none shadow-xl overflow-hidden bg-white lg:col-span-2">
                <CardHeader className="p-10 pb-4">
                  <CardTitle className="text-2xl font-black flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-blue-500" />
                    {t('weatherForecastTitle')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-0">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {forecast.map((day, idx) => {
                      const Icon = getWeatherIcon(day.condition);
                      return (
                        <motion.div
                          key={idx}
                          whileHover={{ y: -5 }}
                          className="flex flex-col items-center p-6 rounded-[2rem] bg-slate-50 border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-xl transition-all"
                        >
                          <span className="text-sm font-black text-muted-foreground mb-4 uppercase">{day.day}</span>
                          <Icon className={cn("h-12 w-12 mb-4", day.condition.toLowerCase().includes("rain") ? "text-blue-500" : "text-amber-500")} />
                          <span className="text-2xl font-black">{day.temp}°</span>
                          <span className="text-[10px] font-bold text-muted-foreground mt-2 text-center uppercase tracking-tighter">{day.condition}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[3rem] border-none shadow-xl overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
                <CardHeader className="p-10 pb-4">
                  <CardTitle className="text-2xl font-black flex items-center gap-3">
                    <Waves className="h-6 w-6 text-emerald-300" />
                    {t('irrigationPlanner')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-4 space-y-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">
                    <p className="text-sm font-bold text-emerald-200 uppercase mb-2">{t('recommendedStrategy')}</p>
                    <p className="text-lg font-bold">
                      {weather.rainProbability > 40 ? t('pauseIrrigation') : weather.temp > 30 ? t('increaseFrequency') : t('standardSchedule')}
                    </p>
                  </div>

                  <ul className="space-y-4 font-medium opacity-90">
                    <li className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-300" />
                      {t('irrigationBestTime')}
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-300" />
                      {t('dripIrrigationPriority')}
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-300" />
                      {weather.temp > 32 ? t('waterNeedsHigh') : t('waterNeedsNormal')}
                    </li>
                  </ul>

                  <Link to="/calendar" className="block pt-4">
                    <Button className="w-full rounded-2xl bg-white text-emerald-700 hover:bg-emerald-50 h-14 font-black shadow-xl">
                      {t('updateIrrigationSchedule')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Recommended Crops */}
            <div className="space-y-8 pt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black tracking-tight">{t('weatherAdaptiveChoice')}</h2>
                <Link to="/calendar">
                  <Button variant="outline" className="rounded-xl font-bold px-6 border-emerald-200">{t('viewPlantingCalendar')}</Button>
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: t("ricePaddy"), key: "rice", suitability: weather.humidity > 60 ? t("excellent") : t("good"), reason: t("riceSuitabilityReason") },
                  { name: t("cotton"), key: "cotton", suitability: weather.temp > 28 && weather.humidity < 70 ? t("high") : t("medium"), reason: t("cottonSuitabilityReason") },
                  { name: t("vegetables"), key: "tomato", suitability: t("high"), reason: t("vegetablesSuitabilityReason") },
                ].map((crop, i) => (
                  <Card key={i} className="rounded-[2.5rem] border-none shadow-lg hover:shadow-2xl transition-all group overflow-hidden bg-white">
                    <div className="h-2 bg-emerald-500 w-full" />
                    <CardContent className="p-8 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xl font-bold group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{crop.name}</h4>
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-3 py-1 font-bold">{crop.suitability}</Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed font-medium">
                        {crop.reason}
                      </p>
                      <Link to={`/growing-guide?crop=${crop.key}`} className="block">
                        <Button variant="ghost" className="p-0 text-emerald-600 hover:text-emerald-700 font-bold group-hover:translate-x-1 transition-transform">
                          {t("viewGrowingGuide")} <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <Navigation className="h-16 w-16 text-slate-300 mb-4 animate-bounce" />
            <h3 className="text-2xl font-black text-slate-400">{t('locationAccessRequired')}</h3>
            <p className="text-muted-foreground mt-2 max-w-sm text-center">{t('locationAccessDesc')}</p>
            <Button onClick={getLocationAndFetch} className="mt-8 rounded-full px-8 py-6 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20">{t('enableLocation')}</Button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
