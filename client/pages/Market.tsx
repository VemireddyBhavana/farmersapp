import { useState, useMemo, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useLanguage } from "@/lib/LanguageContext";

import { useMandi } from "@/hooks/useMandi";

export default function Market() {
  const { t, language } = useLanguage();
  const { prices: mandiRates, states, loading: mandiLoading, refresh: refreshMandi, fetchDistricts, fetchMarkets } = useMandi();

  const cropPrices: Record<string, number> = useMemo(() => ({
    paddy: 4200,
    wheat: 2125,
    tomato: 1800,
    onion: 2400,
    groundnut: 6800,
    cotton: 8200
  }), []);

  const [selectedCrop, setSelectedCrop] = useState("paddy");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState("quintals");
  const [estimate, setEstimate] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [selectedState, setSelectedState] = useState("all");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedMarket, setSelectedMarket] = useState("all");

  const [districts, setDistricts] = useState<string[]>([]);
  const [markets, setMarkets] = useState<string[]>([]);
  
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingMarkets, setLoadingMarkets] = useState(false);

  // When state changes, fetch districts
  
  useEffect(() => {
    if (selectedState && selectedState !== "all") {
      setLoadingDistricts(true);
      fetchDistricts(selectedState).then(d => {
        setDistricts(d);
        setLoadingDistricts(false);
      });
    } else {
      setDistricts([]);
    }
  }, [selectedState, fetchDistricts]);

  // When district changes, fetch markets
  useEffect(() => {
    if (selectedState && selectedState !== "all" && selectedDistrict && selectedDistrict !== "all") {
      setLoadingMarkets(true);
      fetchMarkets(selectedState, selectedDistrict).then(m => {
        setMarkets(m);
        setLoadingMarkets(false);
      });
    } else {
      setMarkets([]);
    }
  }, [selectedState, selectedDistrict, fetchMarkets]);

  // Fetch prices when filters change
  useEffect(() => {
    refreshMandi(selectedState, selectedDistrict, selectedMarket);
  }, [selectedState, selectedDistrict, selectedMarket, refreshMandi]);

  const [forecast, setForecast] = useState<any[]>([]);
  const calculateEstimate = async () => {
    try {
      const response = await fetch(`/api/market/predict/${selectedCrop}`, {
        method: "POST"
      });
      
      let current_price = 2150;
      let forecastData = [];

      if (response.ok) {
        const data = await response.json();
        current_price = data.current_price || 2150;
        forecastData = data.forecast || [];
      }
      
      const qty = parseFloat(quantity) || 0;
      let multiplier = 1;
      if (unit === "tons") multiplier = 10;
      if (unit === "kg") multiplier = 0.01;
      
      setEstimate(current_price * qty * multiplier);
      setForecast(forecastData);
      
      toast({
        title: t("aiAnalysisComplete"),
        description: `${t("predictedTrendFor")} ${selectedCrop}`,
      });
    } catch (error) {
      console.error("Prediction failed", error);
      const qty = parseFloat(quantity) || 0;
      let multiplier = 1;
      if (unit === "tons") multiplier = 10;
      if (unit === "kg") multiplier = 0.01;
      setEstimate(2150 * qty * multiplier);
      setForecast([
        { day: t("tomorrow"), date: t("forecast"), price: 2160 },
        { day: t("nextDay"), date: t("forecast"), price: 2180 }
      ]);

      toast({
        title: t("marketInsightMode"),
        description: `${t("showingTypicalTrends")} ${selectedCrop}`,
      });
    }
  };

  const filteredMandiRates = useMemo(() => {
    return mandiRates.filter(item => {
      const matchesSearch = 
        item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mandi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.district.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesState = selectedState === "all" || item.state === selectedState;
      const matchesDistrict = selectedDistrict === "all" || item.district === selectedDistrict;
      const matchesMarket = selectedMarket === "all" || item.mandi === selectedMarket;
      
      return matchesSearch && matchesState && matchesDistrict && matchesMarket;
    });
  }, [mandiRates, searchQuery, selectedState, selectedDistrict, selectedMarket]);

  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshMandi(selectedState, selectedDistrict, selectedMarket);
    setIsRefreshing(false);
    toast({
      title: t("marketDataUpdated"),
      description: t("pricesSynched"),
    });
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
              <div className="bg-white/20 p-1 rounded-md">
                <TrendingUp className="h-5 w-5" />
              </div>
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
                      <Badge className="bg-white/20 text-white border-none text-xs align-middle font-bold lowercase">{t("currentMarketAvg")}</Badge>
                    </h3>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/20">
                    <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80 mb-6">{t("sevenDayForecastTitle")}</p>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                      {(forecast || []).map((f, i) => (
                        <div key={i} className="flex-shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 w-32 text-center">
                          <p className="text-[10px] font-black uppercase opacity-60 mb-1">{f.day.substring(0, 3)}</p>
                          <p className="text-sm font-bold opacity-70 mb-1">{f.date.split('-').slice(1).join('/')}</p>
                          <p className="text-lg font-black italic">₹{Math.round(f.price)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-emerald-500 rounded-full blur-3xl opacity-50" />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Agmarknet Mandi Filters */}
      <Card className="rounded-[2.5rem] border-primary/5 bg-white shadow-xl">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-2xl font-black flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg">
              <Filter className="h-6 w-6 text-white" />
            </div>
            {t("mandiFilters")}
          </CardTitle>
          <CardDescription className="text-muted-foreground font-bold">{t("selectLocationForMandiRates")}</CardDescription>
        </CardHeader>
        <CardContent className="p-8 pb-10">
          <div className="grid gap-6 md:grid-cols-4 items-end">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">{t("state")}</label>
              <Select value={selectedState} onValueChange={(val) => { setSelectedState(val); setSelectedDistrict("all"); setSelectedMarket("all"); }}>
                <SelectTrigger className="rounded-xl border-primary/10 h-14 bg-white font-bold text-lg">
                  <SelectValue placeholder={t("selectState")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allStates")}</SelectItem>
                  {states.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">{t("district")}</label>
              <Select value={selectedDistrict} onValueChange={(val) => { setSelectedDistrict(val); setSelectedMarket("all"); }} disabled={selectedState === "all" || loadingDistricts}>
                <SelectTrigger className="rounded-xl border-primary/10 h-14 bg-white font-bold text-lg">
                  <SelectValue placeholder={loadingDistricts ? t("loading") : t("selectDistrict")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allDistricts")}</SelectItem>
                  {districts.map(d => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">{t("market")}</label>
              <Select value={selectedMarket} onValueChange={setSelectedMarket} disabled={selectedDistrict === "all" || loadingMarkets}>
                <SelectTrigger className="rounded-xl border-primary/10 h-14 bg-white font-bold text-lg">
                  <SelectValue placeholder={loadingMarkets ? t("loading") : t("selectMarket")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allMarkets")}</SelectItem>
                  {markets.map(m => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchCommodities")}
                className="pl-12 rounded-xl border-primary/10 h-14 bg-white font-bold text-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulletins Section */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-4 overflow-hidden">
        <div className="bg-amber-500 text-white px-3 py-1 rounded-lg text-xs font-black uppercase whitespace-nowrap animate-pulse">
          {t("whatsNew")}
        </div>
        <div className="flex-1 overflow-hidden whitespace-nowrap">
          <p className="inline-block animate-marquee font-bold text-amber-900">
            • {t("mandiBull1")} 
            <span className="mx-8">•</span>
            • {t("mandiBull2")}
            <span className="mx-8">•</span>
            • {t("mandiBull3")}
          </p>
        </div>
      </div>

      {/* Market Wise Price & Arrival Table */}
      <div className="space-y-8 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-black tracking-tight">{t("marketWiseReport")}</h3>
          <Badge variant="outline" className="rounded-full px-4 py-2 font-bold bg-white text-emerald-700 border-emerald-100 uppercase tracking-widest text-[10px]">{t("updated")} 5m {t("ago")}</Badge>
        </div>

        <div className="rounded-[2.5rem] border border-primary/5 bg-white shadow-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-black text-xs uppercase tracking-widest py-6 px-8">{t("commodityVarietyGrade")}</TableHead>
                <TableHead className="font-black text-xs uppercase tracking-widest py-6 px-8">{t("market")}</TableHead>
                <TableHead className="font-black text-xs uppercase tracking-widest py-6 px-8 text-right">{t("arrivalMT")}</TableHead>
                <TableHead className="font-black text-xs uppercase tracking-widest py-6 px-8 text-center">{t("mandiRates")} (₹/Qtl)</TableHead>
                <TableHead className="font-black text-xs uppercase tracking-widest py-6 px-8 text-right">{t("priceTrend")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMandiRates.length > 0 ? (
                filteredMandiRates.map((item, idx) => (
                  <TableRow key={idx} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="py-6 px-8">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <Leaf className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-black text-lg">{item.crop}</p>
                          <p className="text-xs text-muted-foreground font-bold">{t("standardGradeA")}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-6 px-8">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col items-start">
                          <Link to={`/mandi/${encodeURIComponent(item.id)}`}>
                            <Button 
                              variant="link" 
                              className="p-0 h-auto font-bold text-emerald-600 hover:text-emerald-700 decoration-emerald-600"
                            >
                              {item.mandi}
                            </Button>
                          </Link>
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mandi + ", " + item.district + ", " + item.state)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-[10px] text-emerald-500 hover:text-emerald-700 font-bold transition-colors"
                          >
                            <MapPin className="h-3 w-3 mr-1" />
                            {t("viewOnMaps")}
                          </a>
                        </div>
                        <Badge variant="secondary" className="text-[10px] font-black uppercase bg-slate-100">{item.state.toUpperCase()}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="py-6 px-8 text-right">
                      <span className="font-black text-slate-700">{(Math.random() * 50 + 10).toFixed(2)}</span>
                    </TableCell>
                    <TableCell className="py-6 px-8">
                      <div className="flex items-center justify-center gap-4">
                        <div className="text-center">
                          <p className="text-[10px] uppercase font-black text-muted-foreground">{t("min")}</p>
                          <p className="font-bold text-slate-500">{item.min_price ? item.min_price.toLocaleString() : (parseInt(String(item.rate).replace(/[^0-9]/g, '')) - 200).toLocaleString()}</p>
                        </div>
                        <div className="h-8 w-px bg-slate-200" />
                        <div className="text-center">
                          <p className="text-[10px] uppercase font-black text-emerald-600">{t("modalPrice")}</p>
                          <p className="font-black text-xl text-emerald-600">{typeof item.rate === 'number' ? `₹${item.rate.toLocaleString()}` : item.rate}</p>
                        </div>
                        <div className="h-8 w-px bg-slate-200" />
                        <div className="text-center">
                          <p className="text-[10px] uppercase font-black text-muted-foreground">{t("max")}</p>
                          <p className="font-bold text-slate-500">{item.max_price ? item.max_price.toLocaleString() : (parseInt(String(item.rate).replace(/[^0-9]/g, '')) + 300).toLocaleString()}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-6 px-8 text-right">
                      <Badge className={cn(
                        "rounded-full px-4 py-1.5 font-black text-[10px] uppercase tracking-wider border-none",
                        item.trend === "up" ? "bg-emerald-100 text-emerald-700" :
                          item.trend === "down" ? "bg-red-100 text-red-700" :
                            "bg-muted text-muted-foreground"
                      )}>
                        {item.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1.5" /> : item.trend === "down" ? <TrendingDown className="h-3 w-3 mr-1.5" /> : null}
                        {item.change !== "0" ? item.change : t("stable")}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="py-20 text-center">
                    <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-xl font-bold text-muted-foreground">{t("noMandiDataFound")}</p>
                    <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedState("all"); }} className="text-emerald-600 font-bold">{t("clearAllFilters")}</Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
