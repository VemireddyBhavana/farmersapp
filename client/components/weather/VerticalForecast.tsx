import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FiCalendar, FiSun, FiCloud, FiCloudRain, FiWind, FiDroplet, FiChevronRight } from "react-icons/fi";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

interface VerticalForecastProps {
  daily: any[];
}

const VerticalForecast: React.FC<VerticalForecastProps> = ({ daily }) => {
  const { t } = useLanguage();
  if (!daily) return null;

  return (
    <Card className="rounded-xl border-none bg-white dark:bg-slate-900 shadow-sm overflow-hidden border border-slate-100 dark:border-white/5">
      <CardHeader className="p-6 border-b border-slate-50 dark:border-white/5">
        <CardTitle className="text-sm font-bold text-[#004d73] dark:text-white flex items-center gap-2">
          <FiCalendar className="text-[#004d73] dark:text-[#ffcc00]" /> {t("fourteenDayForecast")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col">
          {daily.slice(0, 14).map((day, i) => (
            <div 
              key={i} 
              className={cn(
                "flex items-center justify-between p-4 border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group",
                i === daily.length - 1 && "border-0"
              )}
            >
              {/* Date Column */}
              <div className="flex flex-col min-w-[80px]">
                <p className="text-xs font-bold text-[#004d73] dark:text-white uppercase">
                  {i === 0 ? t("today") : new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short' })}
                </p>
                <p className="text-[10px] font-semibold text-slate-400">
                  {new Date(day.dt * 1000).toLocaleDateString([], { day: '2-digit', month: '2-digit' })}
                </p>
              </div>

              {/* Icon & Description */}
              <div className="flex items-center gap-4 flex-1">
                <div className="text-2xl text-slate-600 dark:text-slate-300 group-hover:scale-110 transition-transform">
                  {day.weather[0].main === 'Rain' ? <FiCloudRain className="text-blue-400" /> : day.weather[0].main === 'Clear' ? <FiSun className="text-amber-500" /> : <FiCloud className="text-slate-400" />}
                </div>
                <div className="hidden md:block">
                   <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 capitalize">{day.weather[0].description}</p>
                </div>
              </div>

              {/* Rain Probability */}
              <div className="flex items-center gap-1 min-w-[60px] justify-center">
                 <FiDroplet className="text-blue-300 text-[10px]" />
                 <span className="text-[10px] font-bold text-slate-400">{Math.round((day.pop || 0) * 100)}%</span>
              </div>

              {/* Temp Range */}
              <div className="flex items-center gap-4 min-w-[100px] justify-end">
                <span className="text-sm font-black text-[#004d73] dark:text-white">{Math.round(day.temp.max)}°</span>
                <span className="text-sm font-bold text-slate-400">{Math.round(day.temp.min)}°</span>
              </div>

              <FiChevronRight className="ml-4 text-slate-200 group-hover:text-[#004d73] transition-colors" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VerticalForecast;
