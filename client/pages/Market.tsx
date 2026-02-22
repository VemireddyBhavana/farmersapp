import { useState, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, IndianRupee, MapPin, Search, Filter, ArrowUpRight, ArrowLeft, Leaf, LayoutGrid, RefreshCw, Calculator, Navigation, ChevronDown, Info, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useLanguage } from "@/lib/LanguageContext";

export default function Market() {
  const { t, language } = useLanguage();

  const cropPrices: Record<string, number> = useMemo(() => ({
    paddy: 4200,
    wheat: 2125,
    tomato: 1800,
    onion: 2400,
    groundnut: 6800,
    cotton: 8200
  }), []);

  const mandiRates = useMemo(() => [
    { crop: t("paddy"), rate: "₹4,200", change: "+150", trend: "up", mandi: t("ap") + " Mandi", state: "ap", date: "21 Feb 2026" },
    { crop: t("wheat"), rate: "₹2,125", change: "-25", trend: "down", mandi: t("pb") + " Mandi", state: "pb", date: "21 Feb 2026" },
    { crop: t("tomato"), rate: "₹1,800", change: "+400", trend: "up", mandi: t("dl") + " Mandi", state: "dl", date: "21 Feb 2026" },
    { crop: t("onion"), rate: "₹2,400", change: "0", trend: "neutral", mandi: t("mh") + " Mandi", state: "mh", date: "21 Feb 2026" },
    { crop: t("groundnut"), rate: "₹6,800", change: "+320", trend: "up", mandi: t("gj") + " Mandi", state: "gj", date: "21 Feb 2026" },
    { crop: t("cotton"), rate: "₹8,200", change: "-100", trend: "down", mandi: t("ap") + " Mandi", state: "ap", date: "20 Feb 2026" },
    { crop: t("maize"), rate: "₹2,090", change: "+45", trend: "up", mandi: t("br") + " Mandi", state: "br", date: "21 Feb 2026" },
    { crop: t("soybean"), rate: "₹4,600", change: "+120", trend: "up", mandi: t("mp") + " Mandi", state: "mp", date: "21 Feb 2026" },
    { crop: t("mustard"), rate: "₹5,400", change: "-50", trend: "down", mandi: t("rj") + " Mandi", state: "rj", date: "21 Feb 2026" },
    { crop: t("sugarcane"), rate: "₹3,150", change: "0", trend: "neutral", mandi: t("up") + " Mandi", state: "up", date: "21 Feb 2026" },
  ], [t]);
  const [selectedCrop, setSelectedCrop] = useState("paddy");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState("quintals");
  const [estimate, setEstimate] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("all");

  const calculateEstimate = () => {
    const basePrice = cropPrices[selectedCrop] || 0;
    const qty = parseFloat(quantity) || 0;
    let multiplier = 1;
    if (unit === "tons") multiplier = 10;
    if (unit === "kg") multiplier = 0.01;
    setEstimate(basePrice * qty * multiplier);
  };

  const filteredMandiRates = useMemo(() => {
    return mandiRates.filter(item => {
      const matchesSearch = item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mandi.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = selectedState === "all" || item.state === selectedState;
      return matchesSearch && matchesState;
    });
  }, [searchQuery, selectedState]);

  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: t("marketDataUpdated"),
        description: t("pricesSynched"),
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight">{t("liveMarketPrices")}</h1>
          <p className="text-muted-foreground font-medium">{t("liveMarketPricesDesc")}</p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="rounded-xl bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2 font-bold px-6 shadow-lg shadow-emerald-500/20 py-6"
        >
          <RefreshCw className={cn("h-5 w-5", isRefreshing && "animate-spin")} />
          {isRefreshing ? t("updating") : t("refreshData")}
        </Button>
      </div>

      {/* Crop Price Estimator Section */}
      <Card className="rounded-[2.5rem] border-primary/5 bg-gradient-to-br from-emerald-50/50 to-white overflow-hidden shadow-xl border-t-8 border-t-emerald-600">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-2xl font-black flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-xl shadow-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            {t("cropPriceEstimator")}
          </CardTitle>
          <CardDescription className="text-muted-foreground font-bold">{t("cropPriceEstimatorDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div className="grid gap-6 md:grid-cols-4 items-end">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">{t("selectCrop")}</label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="rounded-xl border-primary/10 h-14 bg-white font-bold text-lg">
                  <SelectValue placeholder={t("selectCrop")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paddy">{t("paddy")}</SelectItem>
                  <SelectItem value="wheat">{t("wheat")}</SelectItem>
                  <SelectItem value="tomato">{t("tomato")}</SelectItem>
                  <SelectItem value="onion">{t("onion")}</SelectItem>
                  <SelectItem value="groundnut">{t("groundnut")}</SelectItem>
                  <SelectItem value="cotton">{t("cotton")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">{t("quantity")}</label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                className="rounded-xl border-primary/10 h-14 bg-white font-bold text-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">{t("unit")}</label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="rounded-xl border-primary/10 h-14 bg-white font-bold text-lg">
                  <SelectValue placeholder={t("unit")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quintals">{t("quintals")}</SelectItem>
                  <SelectItem value="tons">{t("tons")}</SelectItem>
                  <SelectItem value="kg">{t("kg")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={calculateEstimate}
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 h-14 font-black text-lg flex items-center gap-2 shadow-xl shadow-emerald-500/20"
            >
              <TrendingUp className="h-6 w-6" />
              {t("analyzeValue")}
            </Button>
          </div>

          <AnimatePresence>
            {estimate !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-8 rounded-[2rem] bg-emerald-600 text-white shadow-2xl overflow-hidden relative"
              >
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                  <div className="text-center md:text-left">
                    <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80 mb-2">{t("estimatedMarketValue")}</p>
                    <h3 className="text-5xl font-black flex items-center gap-2">
                      ₹{estimate.toLocaleString(language === "English" ? "en-IN" : undefined)}
                      <Badge className="bg-white/20 text-white border-none text-xs align-middle">{t("currentMarketAvg")}</Badge>
                    </h3>
                  </div>
                  <div className="flex gap-4">
                    <div className="glass bg-white/10 p-4 rounded-2xl flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6" />
                      <div>
                        <p className="text-[10px] font-black uppercase opacity-70">{t("priceTrend")}</p>
                        <p className="font-bold">{t("bullish")} (+4.2%)</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-emerald-500 rounded-full blur-3xl opacity-50" />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center pt-10">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchCommodities")}
            className="pl-12 rounded-xl border-primary/5 h-14 bg-white shadow-sm font-medium"
          />
        </div>
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger className="w-full md:w-64 rounded-xl border-primary/5 h-14 bg-white shadow-sm font-bold">
            <SelectValue placeholder={t("filterByState")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allStates")}</SelectItem>
            <SelectItem value="ap">{t("ap")}</SelectItem>
            <SelectItem value="pb">{t("pb")}</SelectItem>
            <SelectItem value="dl">{t("dl")}</SelectItem>
            <SelectItem value="mh">{t("mh")}</SelectItem>
            <SelectItem value="gj">{t("gj")}</SelectItem>
            <SelectItem value="up">{t("up")}</SelectItem>
            <SelectItem value="mp">{t("mp")}</SelectItem>
            <SelectItem value="rj">{t("rj")}</SelectItem>
            <SelectItem value="br">{t("br")}</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="rounded-xl border-emerald-200 h-14 px-8 flex items-center gap-2 font-black text-emerald-600 bg-emerald-50/50 hover:bg-emerald-100 transition-all shadow-sm">
          <Navigation className="h-5 w-5 fill-emerald-600" />
          {t("liveLocalPrices")}
        </Button>
      </div>

      {/* Full Mandi Rates Grid */}
      <div className="space-y-8 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-black tracking-tight">{t("marketRateFeed")}</h3>
          <Badge variant="outline" className="rounded-full px-4 py-2 font-bold bg-white text-emerald-700 border-emerald-100 uppercase tracking-widest text-[10px]">Updated 5m ago</Badge>
        </div>

        {filteredMandiRates.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMandiRates.map((item, idx) => (
              <motion.div
                key={idx}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="rounded-[2.5rem] border-primary/5 hover:border-emerald-300 transition-all hover:shadow-2xl group cursor-pointer h-full bg-white relative overflow-hidden">
                  <div className={cn(
                    "absolute top-0 left-0 w-2 h-full",
                    item.trend === "up" ? "bg-emerald-500" : item.trend === "down" ? "bg-red-500" : "bg-slate-300"
                  )} />
                  <CardContent className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <Leaf className="h-7 w-7" />
                      </div>
                      <Badge className={cn(
                        "rounded-full px-4 py-1.5 font-black text-[10px] uppercase tracking-wider border-none",
                        item.trend === "up" ? "bg-emerald-100 text-emerald-700" :
                          item.trend === "down" ? "bg-red-100 text-red-700" :
                            "bg-muted text-muted-foreground"
                      )}>
                        {item.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1.5" /> : item.trend === "down" ? <TrendingDown className="h-3 w-3 mr-1.5" /> : null}
                        {item.change !== "0" ? item.change : t("stable")}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-2xl font-black text-foreground group-hover:text-emerald-700 transition-colors">{item.crop}</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground font-bold flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-emerald-500" /> {item.mandi}
                        </p>
                        <span className="text-muted-foreground/30">•</span>
                        <Badge variant="secondary" className="text-[9px] font-black uppercase py-0 px-2 bg-slate-100">{item.state.toUpperCase()}</Badge>
                        <span className="text-muted-foreground/30">•</span>
                        <p className="text-[9px] text-muted-foreground font-medium">{item.date}</p>
                      </div>
                    </div>
                    <div className="flex items-end justify-between border-t border-dashed border-emerald-100 pt-5">
                      <div>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.1em] mb-1">{t("marketPriceQtl")}</p>
                        <p className="text-3xl font-black text-emerald-600">{item.rate}</p>
                      </div>
                      <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:translate-x-1 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <ArrowUpRight className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-[2.5rem] border-dashed border-primary/10">
            <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-xl font-bold text-muted-foreground">{t("noMandiFound")}</p>
            <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedState("all"); }} className="text-emerald-600 font-bold">{t("clearAllFilters")}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
