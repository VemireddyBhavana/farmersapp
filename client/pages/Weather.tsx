import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiRefreshCw, FiMapPin, FiCalendar, FiSun, FiWind, FiDroplets, FiEye, FiTrendingUp, FiSunrise, FiSunset, FiCloud } from "react-icons/fi";
import { useWeather } from "@/hooks/useWeather";
import WeatherHero from "@/components/weather/WeatherHero";
import ForecastCards from "@/components/weather/ForecastCards";
import HourlyChart from "@/components/weather/HourlyChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";

const Weather: React.FC = () => {
  const { weather, loading, error, getLocationAndFetch, refreshWeather } = useWeather();
  const { t } = useLanguage();

  if (loading && !weather) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-4">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full"
        />
        <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">{t('fetchingSync')}</p>
      </div>
    );
  }

  const formatTime = (ts: number) => {
    return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-primary pb-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic text-foreground">
            {t('meteorologicalData')}
          </h2>
          <div className="flex items-center gap-4 text-muted-foreground font-medium text-sm">
            <span className="flex items-center gap-1"><FiMapPin className="text-primary" /> {weather?.location || t('station')}</span>
            <span className="flex items-center gap-1"><FiCalendar className="text-primary" /> {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          onClick={refreshWeather}
          className="rounded-xl border-primary/20 text-primary hover:bg-primary/5 font-bold h-12 px-6"
        >
          <FiRefreshCw className="mr-2" /> {t('retryConnection')}
        </Button>
      </div>

      {error ? (
        <Card className="rounded-[2rem] border-red-500/20 bg-red-500/5 p-12 text-center space-y-6">
          <div className="text-5xl">⛈️</div>
          <h2 className="text-2xl font-black tracking-tight text-foreground">{t('retryConnection')}</h2>
          <p className="text-muted-foreground max-w-md mx-auto">{error}</p>
          <Button onClick={getLocationAndFetch} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-10 h-14 uppercase tracking-widest text-xs font-black shadow-lg shadow-primary/20">
            {t('retryConnection')}
          </Button>
        </Card>
      ) : weather ? (
        <div className="grid gap-10">
          {/* Main Hero Section */}
          <WeatherHero weather={weather} location={weather.locationName || weather.location} />
          
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Left Column: Forecasts & Intel */}
            <div className="lg:col-span-8 space-y-10">
              {/* Hourly Chart */}
              <HourlyChart hourly={weather.hourly} />

              {/* Farmer Intel Section */}
              <section className="space-y-4">
                <h3 className="text-lg font-black uppercase tracking-widest text-foreground/60 border-l-4 border-primary pl-4">Farmer Intel</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="rounded-[2rem] p-6 hover-lift border border-border/50">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">Soil Moisture</p>
                    <div className="flex items-end justify-between">
                      <h4 className="text-4xl font-black text-primary italic tracking-tighter">{Math.round(weather.satellite?.soil.moisture || 65)}%</h4>
                      <FiDroplets className="text-3xl text-primary/20" />
                    </div>
                    <p className="text-[8px] font-bold text-muted-foreground/40 mt-2 uppercase">Root Zone Saturation</p>
                  </Card>

                  <Card className="rounded-[2rem] p-6 hover-lift border border-border/50">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">Crop Health (NDVI)</p>
                    <div className="flex items-end justify-between">
                      <h4 className="text-4xl font-black text-emerald-500 italic tracking-tighter">{weather.satellite?.ndvi.toFixed(2) || "0.78"}</h4>
                      <FiTrendingUp className="text-3xl text-emerald-500/20" />
                    </div>
                    <p className="text-[8px] font-bold text-muted-foreground/40 mt-2 uppercase">Vegetation Index</p>
                  </Card>

                  <Card className="rounded-[2rem] p-6 hover-lift border border-border/50">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">UV Index</p>
                    <div className="flex items-end justify-between">
                      <h4 className="text-4xl font-black text-amber-500 italic tracking-tighter">{Math.round(weather.current.uvi)}</h4>
                      <FiSun className="text-3xl text-amber-500/20" />
                    </div>
                    <p className="text-[8px] font-bold text-muted-foreground/40 mt-2 uppercase">Solar Radiation</p>
                  </Card>
                </div>
              </section>

              {/* Weather Details Section */}
              <section className="space-y-4">
                <h3 className="text-lg font-black uppercase tracking-widest text-foreground/60 border-l-4 border-primary pl-4">Environmental Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: "Visibility", value: `${(weather.current.visibility / 1000).toFixed(1)} km`, icon: <FiEye /> },
                    { label: "Rain Chance", value: `${Math.round(weather.hourly[0].pop * 100)}%`, icon: <FiCloud /> },
                    { label: "Sunrise", value: formatTime(weather.current.sunrise), icon: <FiSunrise /> },
                    { label: "Sunset", value: formatTime(weather.current.sunset), icon: <FiSunset /> }
                  ].map((item, i) => (
                    <Card key={i} className="rounded-3xl p-6 border border-border/50 hover:bg-muted/50 transition-all flex flex-col gap-4">
                      <div className="text-2xl text-primary">{item.icon}</div>
                      <div>
                        <p className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest leading-none mb-1">{item.label}</p>
                        <p className="text-lg font-black text-foreground">{item.value}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: 7-Day Forecast */}
            <div className="lg:col-span-4">
              <ForecastCards daily={weather.daily} />
            </div>
          </div>
        </div>
      ) : null}

      <footer className="pt-10 text-center">
        <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.5em]">
          {t('live')} • Powered by OpenWeather & Sentinel Satellite Data
        </p>
      </footer>
    </div>
  );
};

export default Weather;





