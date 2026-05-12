import React from "react";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, 
  Tooltip, PieChart, Pie, Cell 
} from "recharts";
import { FiDroplet, FiWind, FiThermometer, FiSettings, FiActivity, FiMapPin, FiZap, FiBox } from "react-icons/fi";
import { WiDaySunny, WiHumidity, WiThermometer } from "react-icons/wi";

interface SoilAnalyticsProps {
  weather: any;
}

const SoilAnalytics: React.FC<SoilAnalyticsProps> = ({ weather }) => {
  const moistureData = [
    { time: "01 APR", moisture: 15, penetro: 5, ec: 4, ph: 7 },
    { time: "02 APR", moisture: 18, penetro: 8, ec: 9, ph: 6.5 },
    { time: "03 APR", moisture: 25, penetro: 12, ec: 8, ph: 7.2 },
    { time: "04 APR", moisture: 22, penetro: 15, ec: 12, ph: 6.8 },
    { time: "05 APR", moisture: 30, penetro: 10, ec: 10, ph: 7.5 },
    { time: "06 APR", moisture: 38, penetro: 8, ec: 14, ph: 7.0 },
  ];

  const pHValue = 6.8;
  const phData = [
    { name: "pH", value: pHValue },
    { name: "Remaining", value: 14 - pHValue },
  ];

  const pumps = [
    { id: 1, name: "North Sector", status: "ON", flow: "12L/m" },
    { id: 2, name: "South Ridge", status: "OFF", flow: "0L/m" },
    { id: 3, name: "Greenhouse A", status: "ON", flow: "5L/m" },
  ];

  return (
    <div className="mt-20 space-y-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Subsurface Intelligence</p>
          <h3 className="text-3xl font-black text-emerald-950 dark:text-white tracking-tighter italic uppercase">Soil <span className="text-blue-500">& Hydration</span> Analytics</h3>
        </div>
        <div className="h-12 w-12 rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center">
            <FiActivity className="text-2xl text-blue-500 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Soil Moisture Trend */}
        <div className="col-span-12 lg:col-span-8 p-10 rounded-[4rem] bg-white/40 dark:bg-white/[0.03] backdrop-blur-[60px] border border-white/20 dark:border-white/5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Moisture Saturation</p>
                    <h4 className="text-xl font-black text-emerald-950 dark:text-white">24-Hour Trend</h4>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        <span className="text-[9px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest">Active Layer</span>
                    </div>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={moistureData}>
                        <defs>
                            <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 10, opacity: 0.3 }} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '20px', border: 'none', color: '#fff' }} />
                        <Area 
                            type="monotone" 
                            dataKey="moisture" 
                            stroke="#3b82f6" 
                            strokeWidth={3} 
                            fill="url(#moistureGradient)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* PH & Chemical Composition Gauges */}
        <div className="col-span-12 lg:col-span-4 p-10 rounded-[4rem] bg-white/40 dark:bg-white/[0.03] backdrop-blur-3xl border border-white/20 dark:border-white/5 flex flex-col items-center justify-center gap-8 shadow-xl">
            <div className="relative w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={phData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            startAngle={180}
                            endAngle={0}
                            dataKey="value"
                        >
                            <Cell fill="#fbbf24" />
                            <Cell fill="rgba(255,255,255,0.05)" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                    <span className="text-4xl font-black text-emerald-950 dark:text-white">{pHValue}</span>
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Soil pH</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 w-full pt-6 border-t border-black/5 dark:border-white/5">
                <div className="text-center">
                    <p className="text-[9px] font-black text-black/30 dark:text-white/30 uppercase tracking-widest mb-1">Humidity</p>
                    <p className="text-lg font-black text-emerald-950 dark:text-white">58%</p>
                </div>
                <div className="text-center">
                    <p className="text-[9px] font-black text-black/30 dark:text-white/30 uppercase tracking-widest mb-1">Temp</p>
                    <p className="text-lg font-black text-emerald-950 dark:text-white">22.5°C</p>
                </div>
            </div>
        </div>

        {/* Soil EC and PH Sensor Trend */}
        <div className="col-span-12 lg:col-span-6 p-10 rounded-[4rem] bg-white/40 dark:bg-white/[0.03] backdrop-blur-[60px] border border-white/20 dark:border-white/5 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Chemical Telemetry</p>
                    <h4 className="text-xl font-black text-emerald-950 dark:text-white">EC & PH Trends</h4>
                </div>
            </div>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={moistureData}>
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 10, opacity: 0.3 }} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '20px', border: 'none', color: '#fff' }} />
                        <Area type="monotone" dataKey="ec" stroke="#a855f7" strokeWidth={3} fillOpacity={0.1} fill="#a855f7" />
                        <Area type="monotone" dataKey="ph" stroke="#10b981" strokeWidth={3} fillOpacity={0.1} fill="#10b981" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Soil Moisture & Penetrometer */}
        <div className="col-span-12 lg:col-span-6 p-10 rounded-[4rem] bg-white/40 dark:bg-white/[0.03] backdrop-blur-[60px] border border-white/20 dark:border-white/5 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Physical Telemetry</p>
                    <h4 className="text-xl font-black text-emerald-950 dark:text-white">Moisture & Hardness</h4>
                </div>
            </div>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={moistureData}>
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 10, opacity: 0.3 }} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '20px', border: 'none', color: '#fff' }} />
                        <Area type="monotone" dataKey="moisture" stroke="#3b82f6" strokeWidth={3} fillOpacity={0.1} fill="#3b82f6" />
                        <Area type="monotone" dataKey="penetro" stroke="#f59e0b" strokeWidth={3} fillOpacity={0.1} fill="#f59e0b" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Tracking System & IoT Status */}
        <div className="col-span-12 lg:col-span-4 p-10 rounded-[4rem] bg-black/5 dark:bg-white/[0.02] backdrop-blur-3xl border border-white/10 shadow-xl space-y-8">
            <div>
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Asset Tracking</p>
                <h4 className="text-xl font-black text-emerald-950 dark:text-white">Field Operations</h4>
            </div>

            <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 relative group">
                <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Map" />
                <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <FiMapPin className="text-4xl text-emerald-500 animate-bounce" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
                    <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Active Marker</p>
                    <p className="text-[10px] font-black text-white">Zone B-42: Drip Active</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                    <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mb-1">Drip System</p>
                    <p className="text-sm font-black text-emerald-950 dark:text-white uppercase">Active</p>
                </div>
                <div className="p-4 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-center">
                    <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-1">Sprinklers</p>
                    <p className="text-sm font-black text-emerald-950 dark:text-white uppercase">Standby</p>
                </div>
            </div>
        </div>

        {/* Specialized IoT Gauges */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-[4rem] bg-white/40 dark:bg-white/[0.03] backdrop-blur-3xl border border-white/20 flex flex-col items-center justify-center gap-6">
                <div className="relative w-32 h-32 rounded-full border-4 border-blue-500/20 flex items-center justify-center overflow-hidden">
                    <motion.div 
                        animate={{ height: ["60%", "75%", "65%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-0 w-full bg-blue-500 opacity-40" 
                    />
                    <span className="relative z-10 text-3xl font-black text-emerald-950 dark:text-white">70%</span>
                </div>
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Water Level</p>
            </div>

            <div className="p-10 rounded-[4rem] bg-white/40 dark:bg-white/[0.03] backdrop-blur-3xl border border-white/20 flex flex-col items-center justify-center gap-6">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="50" fill="transparent" stroke="rgba(255,165,0,0.1)" strokeWidth="8" />
                        <circle cx="64" cy="64" r="50" fill="transparent" stroke="#f59e0b" strokeWidth="8" strokeDasharray="314" strokeDashoffset="100" />
                    </svg>
                    <span className="absolute text-2xl font-black text-emerald-950 dark:text-white">27.4°</span>
                </div>
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Soil Temp</p>
            </div>

            <div className="p-10 rounded-[4rem] bg-white/40 dark:bg-white/[0.03] backdrop-blur-3xl border border-white/20 flex flex-col items-center justify-center gap-6">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="50" fill="transparent" stroke="rgba(16,185,129,0.1)" strokeWidth="8" />
                        <circle cx="64" cy="64" r="50" fill="transparent" stroke="#10b981" strokeWidth="8" strokeDasharray="314" strokeDashoffset="140" />
                    </svg>
                    <span className="absolute text-2xl font-black text-emerald-950 dark:text-white">55.9%</span>
                </div>
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Soil Humidity</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SoilAnalytics;
