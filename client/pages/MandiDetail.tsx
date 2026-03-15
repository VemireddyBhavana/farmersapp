import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, Clock, TrendingUp, Info, Navigation, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import { useMandi } from "@/hooks/useMandi";
import { useToast } from "@/components/ui/use-toast";

export default function MandiDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();

  const { prices: mandiRates } = useMandi();
  const mandiData = mandiRates.find(m => m.id === id);

  const handleShare = async () => {
    const shareData = {
      title: `${mandiData?.mandi} Rate - ${mandiData?.crop}`,
      text: `Check out the latest rate for ${mandiData?.crop} at ${mandiData?.mandi}: ${mandiData?.rate}/qtl`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied!",
          description: "Mandi details link copied to clipboard.",
        });
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="rounded-full hover:bg-slate-100 font-bold transition-all -ml-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> {t("backToMarket")}
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex flex-wrap items-center gap-4">
              <Badge className="bg-emerald-600 font-black uppercase tracking-widest">{t("verifiedMandi")}</Badge>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold">4.8 (250+ reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">{mandiData?.mandi || "Mandi Detail"}</h1>
            <div className="flex items-center gap-3 text-muted-foreground font-bold text-lg">
              <MapPin className="h-5 w-5 text-emerald-600" />
              <span>{mandiData ? `${mandiData.district}, ${mandiData.state}` : t("locationNotAvailable")}</span>
            </div>
          </motion.div>

          <Card className="rounded-[2.5rem] border-primary/5 shadow-xl overflow-hidden bg-white">
            <CardHeader className="bg-slate-50 p-8 border-b border-primary/5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-black">{t("marketOverview")}</CardTitle>
                <div className="p-2 bg-white rounded-lg shadow-sm border border-primary/5">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid sm:grid-cols-3 gap-8">
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t("operatingHours")}</p>
                  <p className="font-bold flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" /> 04:00 AM - 06:00 PM
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t("contactNumber")}</p>
                  <p className="font-bold flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" /> +91 98765 43210
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t("primaryMajorCrops")}</p>
                  <p className="font-bold">{mandiData ? mandiData.crop : t("cotton")}</p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 flex gap-6 items-start">
                <div className="p-3 bg-blue-600 rounded-2xl shadow-lg">
                  <Info className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-blue-900 mb-2">{t("arrivalAdvisory")}</h4>
                  <p className="text-blue-800/80 leading-relaxed font-medium">
                    {t("advisoryText")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-primary/5 shadow-xl bg-white sticky top-24">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black">{t("mandiActions")}</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-4">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((mandiData?.mandi || "") + ", " + (mandiData?.district || "") + ", " + (mandiData?.state || ""))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-black text-lg gap-3">
                  <Navigation className="h-5 w-5" /> {t("getDirections")}
                </Button>
              </a>
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="w-full h-14 rounded-2xl border-primary/10 hover:bg-slate-50 font-black text-lg gap-3"
              >
                <Share2 className="h-5 w-5" /> {t("shareMandiDetails")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
