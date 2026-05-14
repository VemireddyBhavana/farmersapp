import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FiCalendar, FiSun, FiCloud, FiCloudRain, FiDroplet, FiWind } from "react-icons/fi";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ForecastCardsProps {
  daily: any[];
}

const ForecastCards: React.FC<ForecastCardsProps> = ({ daily }) => {
  const { t } = useLanguage();
  if (!daily) return null;

  const chartData = daily.slice(0, 8).map(day => ({
    name: new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short' }),
    max: Math.round(day.temp.max),
    min: Math.round(day.temp.min),
  }));

  return (
    <Card className="rounded-xl border-none bg-white dark:bg-slate-900 shadow-sm overflow-hidden h-full border border-slate-100 dark:border-white/5">
      <CardHeader className="p-6 border-b border-slate-50 dark:border-white/5">
        <CardTitle className="text-sm font-bold text-[#004d73] dark:text-white flex items-center gap-2">
          <FiCalendar className="text-[#004d73] dark:text-[#ffcc00]" /> {t("eightDayForecast")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Horizontal Day Cards */}
        <div className="flex overflow-x-auto gap-0 scrollbar-hide border-b border-slate-50 dark:border-white/5">
          {daily.slice(0, 8).map((day, i) => (
            <div key={i} className="flex flex-col items-center min-w-[100px] py-6 border-r border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <p className="text-[11px] font-bold text-slate-500 uppercase mb-1">
                {i === 0 ? t("today") : new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short' })}
              </p>
              <p className="text-[10px] font-semibold text-slate-400 mb-3">
                {new Date(day.dt * 1000).toLocaleDateString([], { day: '2-digit', month: '2-digit' })}
              </p>
              <div className="text-3xl mb-4">
                {day.weather[0].main === 'Rain' ? <FiCloudRain className="text-blue-400" /> : day.weather[0].main === 'Clear' ? <FiSun className="text-amber-500" /> : <FiCloud className="text-slate-400" />}
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-lg font-black text-[#004d73] dark:text-white leading-none">{Math.round(day.temp.max)}°</span>
                <span className="text-sm font-bold text-slate-400">{Math.round(day.temp.min)}°</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trend Chart */}
        <div className="p-6 h-[250px] w-full">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{t("temperatureTrend")}</p>
           <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} 
                />
                <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                />
                <Line 
                   type="monotone" 
                   dataKey="max" 
                   stroke="#ef4444" 
                   strokeWidth={3} 
                   dot={{ r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} 
                   activeDot={{ r: 6 }} 
                />
                <Line 
                   type="monotone" 
                   dataKey="min" 
                   stroke="#3b82f6" 
                   strokeWidth={3} 
                   dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} 
                   activeDot={{ r: 6 }} 
                />
              </LineChart>
           </ResponsiveContainer>
           <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                 <span className="text-[10px] font-bold text-slate-500">{t("maxTemp")}</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                 <span className="text-[10px] font-bold text-slate-500">{t("minTemp")}</span>
              </div>
           </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCards;
