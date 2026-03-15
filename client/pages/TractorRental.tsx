import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Tractor,
  MapPin,
  Calendar,
  Star,
  Zap,
  ArrowLeft,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const equipment = [
  {
    id: 1,
    name: "John Deere 5310 GearPro",
    type: "heavyTractor",
    hp: "55 HP",
    price: 800,
    unit: "hour",
    location: "Chittoor, AP",
    rating: 4.8,
    reviews: 124,
    image: "/tractor_premium.png",
    tags: ["highPower", "acCabin"]
  },
  {
    id: 2,
    name: "Mahindra 275 DI TU",
    type: "mediumTractor",
    hp: "39 HP",
    price: 600,
    unit: "hour",
    location: "Tirupati, AP",
    rating: 4.5,
    reviews: 89,
    image: "/tractor_red.png",
    tags: ["fuelEfficient"]
  },
  {
    id: 3,
    name: "Swaraj 855 FE",
    type: "heavyTractor",
    hp: "52 HP",
    price: 750,
    unit: "hour",
    location: "Nellore, AP",
    rating: 4.9,
    reviews: 210,
    image: "/tractor_red.png",
    tags: ["bestSeller", "rugged"]
  },
  {
    id: 4,
    name: "Kubota MU4501",
    type: "mediumTractor",
    hp: "45 HP",
    price: 650,
    unit: "hour",
    location: "Kadapa, AP",
    rating: 4.7,
    reviews: 56,
    image: "/tractor_orange.png",
    tags: ["smoothGearbox"]
  },
  {
    id: 5,
    name: "Rotavator - 7 Feet",
    type: "attachment",
    hp: "N/A",
    price: 300,
    unit: "hour",
    location: "Chittoor, AP",
    rating: 4.6,
    reviews: 34,
    image: "/rotavator.png",
    tags: ["soilPrep"]
  },
  {
    id: 6,
    name: "Automatic Seeder",
    type: "attachment",
    hp: "N/A",
    price: 400,
    unit: "hour",
    location: "Tirupati, AP",
    rating: 4.8,
    reviews: 12,
    image: "/seeder.png",
    tags: ["precision"]
  }
];

const TractorRental = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    duration: 1,
    phone: "",
    location: "",
    requirements: "",
    paymentMethod: "COD" as "COD" | "Online",
  });

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || item.type.includes(selectedType);
    return matchesSearch && matchesType;
  });

  const handleBookClick = (item: any) => {
    setSelectedEquipment(item);
    setIsBookingModalOpen(true);
    setBookingStep(1);
  };

  const handleConfirmBooking = () => {
    if (!bookingDetails.date || !bookingDetails.phone || !bookingDetails.location) {
      alert("Please fill in all required fields!");
      return;
    }
    setBookingStep(2);
    setTimeout(() => setBookingStep(3), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(-1)} 
                className="mb-2 -ml-2 text-slate-500 hover:text-emerald-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> {t('back')}
            </Button>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-3">
              <Tractor className="h-10 w-10 text-emerald-600" /> {t('agriMachineryDB')}
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-2xl">
              {t('procureAndSchedule')}
            </p>
          </div>
          <div className="flex items-center gap-3">
             <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1 font-bold">
                2,500+ {t('tractorsListed')}
             </Badge>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder={t('searchMachinery')}
              className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs defaultValue="All" onValueChange={setSelectedType} className="w-full md:w-auto">
            <TabsList className="bg-slate-100 p-1 rounded-xl h-12">
              <TabsTrigger value="All" className="rounded-lg px-6 h-full data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm font-bold text-sm">{t('all')}</TabsTrigger>
              <TabsTrigger value="Heavy" className="rounded-lg px-6 h-full data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm font-bold text-sm">{t('heavyDuty')}</TabsTrigger>
              <TabsTrigger value="Medium" className="rounded-lg px-6 h-full data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm font-bold text-sm">{t('mediumDuty')}</TabsTrigger>
              <TabsTrigger value="Attachment" className="rounded-lg px-6 h-full data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm font-bold text-sm">{t('attachments')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Equipment Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredEquipment.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={item.id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2 py-1 rounded-lg text-xs font-black text-slate-800 flex items-center gap-1 shadow-md border border-slate-100">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {item.rating} <span className="text-slate-400 font-bold">({item.reviews})</span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    {item.tags.map(tag => (
                        <Badge key={tag} className="bg-emerald-600/90 text-white border-none text-[10px] font-black uppercase tracking-widest">{t(tag)}</Badge>
                    ))}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 space-y-4">
                  <div>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1 block">{t(item.type)}</span>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{item.name}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <Zap className="h-4 w-4 text-emerald-600" /> {item.hp}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <MapPin className="h-4 w-4 text-rose-600" /> {item.location.split(',')[0]}
                    </div>
                  </div>

                  <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
                    <div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-slate-900">₹{item.price}</span>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">/{t('hour')}</span>
                        </div>
                    </div>
                    <Button
                      onClick={() => handleBookClick(item)}
                      className="rounded-xl font-black bg-emerald-600 hover:bg-emerald-700 text-sm px-6 h-11 shadow-lg shadow-emerald-200"
                    >
                      {t('initiateBooking')}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-20 bg-white border-2 border-dashed border-slate-200 rounded-3xl space-y-4">
            <Search className="h-12 w-12 text-slate-300 mx-auto" />
            <h3 className="text-xl font-bold text-slate-400">{t('noMachineryMatched')}</h3>
            <Button variant="outline" className="rounded-xl font-bold" onClick={() => { setSearchQuery(""); setSelectedType("All"); }}>{t('resetFilters')}</Button>
          </div>
        )}

        {/* Info Banner */}
        <div className="bg-[#106A3A] rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4">
                    <h2 className="text-3xl font-black leading-tight max-w-md">{t('premiumEquipmentDesc')}</h2>
                    <p className="text-emerald-100 font-medium max-w-sm">{t('browseSelectDesc')}</p>
                </div>
                <div className="flex gap-4">
                    <Button className="bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-black py-6 px-8 h-auto shadow-xl">
                        {t('listYourTractor')}
                    </Button>
                </div>
            </div>
            <Tractor className="absolute right-[-20px] top-[-20px] h-64 w-64 text-white/5 -rotate-12" />
        </div>
      </div>

      {/* Booking Modal (Reused from Dashboard but cleaned up) */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-[450px] rounded-[2rem] p-0 overflow-hidden border-none shadow-2xl">
          <AnimatePresence mode="wait">
            {bookingStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 space-y-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black text-slate-900">{t('bookEquipment')}</DialogTitle>
                  <DialogDescription className="font-medium">{t('selectDateAndDuration')}</DialogDescription>
                </DialogHeader>

                {selectedEquipment && (
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <img src={selectedEquipment.image} className="h-20 w-20 rounded-xl object-cover shadow-sm" alt="" />
                    <div>
                      <p className="font-black text-emerald-900">{selectedEquipment.name}</p>
                      <p className="text-lg font-black text-emerald-600">₹{selectedEquipment.price}/{t('hour')}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">{t('selectDate')}</label>
                    <Input type="date" className="h-12 rounded-xl border-slate-200 font-bold" onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">{t('durationHours')}</label>
                    <Input type="number" min="1" className="h-12 rounded-xl border-slate-200 font-bold" value={bookingDetails.duration} onChange={(e) => setBookingDetails({ ...bookingDetails, duration: parseInt(e.target.value) })} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">{t('contactPhone')}</label>
                  <Input placeholder="9876543210" className="h-12 rounded-xl border-slate-200 font-bold" value={bookingDetails.phone} onChange={(e) => setBookingDetails({ ...bookingDetails, phone: e.target.value })} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">{t('farmDeliveryLocation')}</label>
                  <Input placeholder={t('enterFarmLocation')} className="h-12 rounded-xl border-slate-200 font-bold" value={bookingDetails.location} onChange={(e) => setBookingDetails({ ...bookingDetails, location: e.target.value })} />
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center">
                    <span className="font-bold text-slate-500">{t('estimatedTotal')}</span>
                    <span className="text-2xl font-black text-emerald-600">₹{(selectedEquipment?.price || 0) * bookingDetails.duration}</span>
                </div>

                <Button className="w-full h-14 rounded-xl text-lg bg-emerald-600 hover:bg-emerald-700 font-black shadow-lg shadow-emerald-200" onClick={handleConfirmBooking}>
                  {t('confirmBookingNow')}
                </Button>
              </motion.div>
            )}

            {bookingStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-16 text-center space-y-6">
                <div className="h-24 w-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-100">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                    <Tractor className="h-12 w-12 text-emerald-600" />
                  </motion.div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">{t('processing')}</h3>
                  <p className="font-bold text-slate-400">{t('processingDesc')}</p>
                </div>
              </motion.div>
            )}

            {bookingStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-16 text-center space-y-8">
                <div className="h-24 w-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-50">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-emerald-600">{t('bookingConfirmedTitle')}</h3>
                  <p className="font-bold text-slate-500">{t('bookingConfirmedDesc')}</p>
                </div>
                <Button className="w-full h-14 rounded-xl py-6 font-black text-lg bg-slate-900 hover:bg-slate-800" onClick={() => setIsBookingModalOpen(false)}>
                  {t('goToMyBookings')}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TractorRental;
