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
    <Card className="rounded-[2rem] border-primary/10 shadow-xl overflow-hidden bg-card transition-colors duration-300">
      <CardHeader className="bg-primary/5 pb-4 border-b border-primary/10">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-black text-primary flex items-center gap-2 uppercase italic tracking-tighter">
            <TrendingUp className="h-6 w-6 text-primary" />
            {t('nearbyCropTrends')}
          </CardTitle>
          <div className="flex items-center gap-1 bg-background px-3 py-1 rounded-full border border-primary/10 shadow-sm">
            <MapPin className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-black text-primary uppercase">{t(location.toLowerCase()) || location}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="text-xs font-black text-primary uppercase tracking-widest animate-pulse">{t("scanningRegionalData")}</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trends.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-4 p-5 rounded-2xl border border-border bg-background/50 hover:border-primary/20 hover:bg-primary/5 transition-all group relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-background transition-colors shadow-sm">
                      <Sprout className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant={item.trend === "Increasing" ? "default" : "secondary"} className={item.trend === "Increasing" ? "bg-primary/10 text-primary hover:bg-primary/10 border-none" : "bg-muted text-muted-foreground border-none"}>
                      {item.trend === "Increasing" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      <span className="text-[10px] font-black uppercase whitespace-nowrap">{t(item.trend.toLowerCase())}</span>
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <h5 className="font-black text-foreground uppercase italic text-lg leading-none">{t(item.crop.toLowerCase())}</h5>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight line-clamp-1">{t(item.reason.toLowerCase()) || item.reason}</p>
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{t("popularity")}</p>
                      <span className="text-[10px] font-black text-primary">{item.popularity}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${item.popularity}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 bg-amber-500/5 rounded-2xl flex gap-3 border border-amber-500/10">
               <Info className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
               <p className="text-[10px] text-amber-500 font-bold italic leading-tight uppercase">
                 {t("trendsExplanation")}
               </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
