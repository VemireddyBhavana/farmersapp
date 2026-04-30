import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  History, 
  Search, 
  Filter, 
  Calendar, 
  ChevronRight, 
  ArrowLeft,
  Sprout,
  Activity,
  AlertCircle,
  TrendingUp,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export default function HistoryDashboard() {
  const { t } = useTranslation();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Mocking user ID for now - in real app, get from auth
        const userId = "user_123"; 
        const response = await fetch(`/api/history?userId=${userId}`);
        const data = await response.json();
        setHistory(data);
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredHistory = history.filter(item => filter === "all" || item.type === filter);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="bg-[#106A3A] text-white py-12 px-4 mb-8">
        <div className="container mx-auto max-w-5xl">
          <Link to="/dashboard">
            <Button variant="ghost" className="text-white hover:bg-white/10 p-0 h-auto font-bold flex items-center gap-2 mb-4">
              <ArrowLeft className="h-5 w-5" /> {t('navDashboard') || "Dashboard"}
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <History className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter">{t('historyDashboard') || "History & Reports"}</h1>
              <p className="text-emerald-100 font-medium uppercase text-xs tracking-widest">{t('historyDesc') || "Track your soil health & disease reports"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="w-full h-14 pl-12 pr-4 rounded-2xl border-none shadow-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {["all", "soil", "disease", "market"].map(type => (
              <Button 
                key={type}
                onClick={() => setFilter(type)}
                variant={filter === type ? "default" : "outline"}
                className={type === filter ? "bg-emerald-600 rounded-xl font-black uppercase text-xs" : "bg-white border-slate-200 rounded-xl font-black uppercase text-xs text-slate-500"}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 w-full bg-white rounded-2xl animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
            <History className="h-16 w-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-400">No History Found</h3>
            <p className="text-slate-400 text-sm">Your prediction reports will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredHistory.map((item) => (
              <motion.div 
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="rounded-[1.5rem] border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                  <CardContent className="p-0 flex items-center">
                    <div className={cn(
                      "h-24 w-24 flex flex-col items-center justify-center shrink-0 group-hover:scale-105 transition-transform",
                      item.type === "soil" ? "bg-emerald-50 text-emerald-600" : 
                      item.type === "disease" ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-blue-600"
                    )}>
                      {item.type === "soil" ? <Sprout className="h-8 w-8" /> : 
                       item.type === "disease" ? <Activity className="h-8 w-8" /> : <TrendingUp className="h-8 w-8" />}
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-slate-200">
                          {item.type} Report
                        </Badge>
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="text-lg font-black text-slate-800 italic uppercase">
                        {item.type === "soil" ? `${item.result.soilType || item.result.soil_type} Analysis` : 
                         item.type === "disease" ? item.result.disease : "Market Prediction"}
                      </h4>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-tight truncate max-w-md">
                        {item.type === "soil" ? `N:${item.inputData.n} P:${item.inputData.p} K:${item.inputData.k}` : 
                         item.type === "disease" ? result.treatment : `Forecast for ${item.inputData.crop}`}
                      </p>
                    </div>
                    <div className="pr-6">
                      <Button variant="ghost" size="icon" className="rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50">
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
