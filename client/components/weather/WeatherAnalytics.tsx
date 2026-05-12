import React, { useState } from "react";
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line, Cell
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrendingUp, FiCloudRain, FiWind, FiCalendar, FiGlobe, FiMap } from "react-icons/fi";

interface WeatherAnalyticsProps {
  weather: any;
}

const WeatherAnalytics: React.FC<WeatherAnalyticsProps> = ({ weather }) => {
  const [activeMetric, setActiveMetric] = useState<"temp" | "rain" | "wind" | "radar">("temp");

  const hourlyData = weather.hourly.slice(0, 24).map((h: any) => ({
    time: new Date(h.dt * 1000).toLocaleTimeString([], { hour: '2-digit' }),
    temp: Math.round(h.temp),
    rain: Math.round(h.pop * 100),
    wind: h.wind_speed,
  }));

  const monthlyData = [
    { month: "Jan", rain: 45, sun: 60 },
    { month: "Feb", rain: 52, sun: 55 },
    { month: "Mar", rain: 38, sun: 70 },
    { month: "Apr", rain: 65, sun: 50 },
    { month: "May", rain: 48, sun: 65 },
    { month: "Jun", rain: 90, sun: 40 },
    { month: "Jul", rain: 120, sun: 30 },
  ];

  const dailyData = weather.daily.map((d: any) => ({
    day: new Date(d.dt * 1000).toLocaleDateString([], { weekday: 'short' }),
    high: Math.round(d.temp.max),
    low: Math.round(d.temp.min),
  }));

  const metrics = [
    { id: "temp", label: "Temperature", icon: <FiTrendingUp />, color: "#f87171" },
    { id: "rain", label: "Precipitation", icon: <FiCloudRain />, color: "#60a5fa" },
    { id: "wind", label: "Wind Velocity", icon: <FiWind />, color: "#34d399" },
    { id: "radar", label: "Orbital Radar", icon: <FiGlobe />, color: "#8b5cf6" },
  ];

  return (
    <div className="mt-20 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em]">Deep Analytics</p>
            <h3 className="text-4xl font-black text-emerald-950 dark:text-white tracking-tighter italic">
                Weather <span className="text-emerald-500 underline decoration-emerald-500/20 underline-offset-8">Intelligence</span>
            </h3>
        </div>

        <div className="flex p-1.5 bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-white/10">
            {metrics.map((m) => (
                <button
                    key={m.id}
                    onClick={() => setActiveMetric(m.id as any)}
                    className={`flex items-center gap-3 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeMetric === m.id 
                        ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/20" 
                        : "text-black/40 dark:text-white/40 hover:text-emerald-500"
                    }`}
                >
                    <span className="text-lg">{m.icon}</span>
                    {m.label}
                </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* Main Chart Area */}
        <div className="col-span-12 lg:col-span-8 p-10 rounded-[4rem] bg-white/40 dark:bg-white/[0.03] backdrop-blur-[60px] border border-white/20 dark:border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                <FiTrendingUp className="text-9xl text-emerald-500 rotate-12" />
            </div>

            <div className="h-[400px] w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeMetric}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full"
                    >
                        {activeMetric === "radar" ? (
                            <div className="w-full h-full relative rounded-3xl overflow-hidden bg-black/40 border border-white/5 group">
                                <img 
                                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop" 
                                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000" 
                                    alt="Radar" 
                                />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-[500px] h-[500px] border border-emerald-500/20 rounded-full animate-slow-spin flex items-center justify-center">
                                        <div className="w-[300px] h-[300px] border border-emerald-500/10 rounded-full flex items-center justify-center">
                                            <div className="w-[100px] h-[100px] border border-emerald-500/5 rounded-full" />
                                        </div>
                                    </div>
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        className="absolute w-1 h-[250px] bg-gradient-to-t from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 origin-bottom"
                                        style={{ bottom: "50%" }}
                                    />
                                </div>
                                <div className="absolute bottom-6 left-6 space-y-1">
                                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Interactive Sensor Feed</p>
                                    <p className="text-white text-sm font-black">Global Atmospheric Coverage</p>
                                </div>
                            </div>
                        ) : activeMetric === "rain" ? (
                            <div className="w-full h-full space-y-6">
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4">Seasonal Precipitation Matrix</p>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthlyData}>
                                        <defs>
                                            <linearGradient id="monthlyRain" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.2}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 10, opacity: 0.3 }} />
                                        <Tooltip 
                                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '20px', border: 'none', backdropFilter: 'blur(10px)', color: '#fff' }}
                                        />
                                        <Bar dataKey="rain" fill="url(#monthlyRain)" radius={[10, 10, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={hourlyData}>
                                    <defs>
                                        <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={metrics.find(m => m.id === activeMetric)?.color} stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor={metrics.find(m => m.id === activeMetric)?.color} stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 10, opacity: 0.3 }} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '20px', border: 'none', backdropFilter: 'blur(10px)', color: '#fff' }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey={activeMetric} 
                                        stroke={metrics.find(m => m.id === activeMetric)?.color} 
                                        strokeWidth={4} 
                                        fillOpacity={1} 
                                        fill="url(#metricGradient)" 
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>

        {/* Weekly Trend Summary */}
        <div className="col-span-12 lg:col-span-4 p-10 rounded-[4rem] bg-emerald-500/5 dark:bg-emerald-500/[0.03] backdrop-blur-3xl border border-emerald-500/10 shadow-xl flex flex-col justify-between overflow-hidden relative">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
            
            <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                        <FiCalendar className="text-2xl text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">7-Day Drift</p>
                        <h4 className="text-xl font-black text-emerald-950 dark:text-white">Trend Analysis</h4>
                    </div>
                </div>

                <div className="space-y-4">
                    {dailyData.slice(0, 5).map((d: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/40 dark:bg-white/[0.02] border border-white/20 dark:border-white/5">
                            <span className="text-[10px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest">{d.day}</span>
                            <div className="flex items-center gap-4">
                                <div className="h-1.5 w-24 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden relative">
                                    <div 
                                        className="absolute left-1/4 right-1/4 h-full bg-emerald-500/40"
                                        style={{ left: `${(d.low / 40) * 100}%`, right: `${100 - (d.high / 40) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs font-black text-emerald-950 dark:text-white">{d.high}°</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className="w-full mt-8 py-5 rounded-[2rem] bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                Export Orbital Report
            </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherAnalytics;
