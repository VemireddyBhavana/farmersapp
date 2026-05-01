import React, { useState, useEffect } from "react";
import { MapPin, TrendingUp, TrendingDown, Info, Sprout, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "@/lib/LanguageContext";

export const CropTrends: React.FC = () => {
  const { t } = useLanguage();
  const [trends, setTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<string>(t("detectingLocation"));

  useEffect(() => {
    const fetchTrends = async (lat?: number, lon?: number) => {
      try {
        const url = lat && lon ? `/api/crop-trends?lat=${lat}&lon=${lon}` : "/api/crop-trends";
        const response = await fetch(url);
        const data = await response.json();
        setTrends(data.trends);
        setLocation(data.region || t("yourRegion"));
      } catch (err) {
        console.error("Trends fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchTrends(pos.coords.latitude, pos.coords.longitude),
        () => fetchTrends() // Fallback to generic trends
      );
    } else {
      fetchTrends();
    }
  }, []);

  return (
    <Card className="rounded-[2rem] border-primary/10 shadow-xl overflow-hidden bg-white">
      <CardHeader className="bg-primary/5 pb-6 border-b border-primary/10">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-black text-primary flex items-center gap-2 uppercase italic tracking-tighter">
            <TrendingUp className="h-6 w-6 text-primary" />
            {t('nearbyCropTrends')}
          </CardTitle>
          <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-primary/10 shadow-sm">
            <MapPin className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-black text-primary uppercase">{location}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="text-xs font-black text-primary uppercase tracking-widest animate-pulse">{t("scanningRegionalData")}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trends.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:border-primary/20 hover:bg-primary/5 transition-all group">
                <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors shadow-sm">
                  <Sprout className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h5 className="font-black text-slate-800 uppercase italic">{item.crop}</h5>
                    <Badge variant={item.trend === "Increasing" ? "default" : "secondary"} className={item.trend === "Increasing" ? "bg-primary/10 text-primary hover:bg-primary/10 border-none" : "bg-slate-100 text-slate-600 border-none"}>
                      {item.trend === "Increasing" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      <span className="text-[10px] font-black uppercase">{item.trend}</span>
                    </Badge>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-1">{item.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t("popularity")}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${item.popularity}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-black text-primary">{item.popularity}%</span>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-6 p-4 bg-amber-50 rounded-2xl flex gap-3 border border-amber-100">
               <Info className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
               <p className="text-[10px] text-amber-800 font-bold italic leading-tight uppercase">
                 {t("trendsExplanation")}
               </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
