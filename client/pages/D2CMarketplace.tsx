import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Store, 
  ShoppingBag, 
  MapPin, 
  Star, 
  Truck, 
  CheckCircle2, 
  Plus, 
  ArrowRight,
  TrendingUp,
  MessageCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

const D2CMarketplace = () => {
  const { t } = useLanguage();

  const myProducts = [
    { id: 1, name: "Organic Basmati Rice", price: "₹120/kg", stock: "500 kg", status: "Active", rating: 4.8 },
    { id: 2, name: "Premium Red Onion", price: "₹45/kg", stock: "1200 kg", status: "Active", rating: 4.5 }
  ];

  const buyerRequests = [
    { id: 101, buyer: "FreshMart Local", req: "Wheat Grade A", qty: "2000 kg", priceAvg: "₹25/kg", distance: "12 km" },
    { id: 102, buyer: "Green Restaurant", req: "Organic Tomatoes", qty: "50 kg", priceAvg: "₹60/kg", distance: "5 km" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pt-10">
          <div>
            <h1 className="text-4xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic leading-[0.9] mb-4">
              {t('d2cTitle') || "D2C Marketplace"}
            </h1>
            <p className="text-xl text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
              {t('d2cDesc') || "Sell premium produce directly to consumers without middlemen."}
            </p>
          </div>
          <Button className="h-14 px-8 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest italic shadow-xl shadow-amber-500/20">
            <Plus className="mr-2 h-4 w-4" /> Add New Listing
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* My Listings */}
          <div className="space-y-6">
             <div className="flex items-center gap-4 mb-2">
                <Store className="h-6 w-6 text-amber-500" />
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">My Storefront</h3>
             </div>

             {myProducts.map((p) => (
                <Card key={p.id} className="p-6 rounded-[2rem] border-none shadow-xl bg-white dark:bg-slate-900 group hover:-translate-y-1 transition-transform">
                   <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-1">{p.name}</h4>
                        <div className="flex items-center gap-2">
                           <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest italic">{p.status}</span>
                           <span className="flex items-center text-[10px] font-black text-amber-500 italic"><Star className="h-3 w-3 mr-1 fill-amber-500" /> {p.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                         <h5 className="text-2xl font-black text-emerald-600 italic tracking-tighter leading-none">{p.price}</h5>
                      </div>
                   </div>

                   <div className="flex justify-between items-end border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic mb-1">Available Stock</p>
                         <p className="font-black italic text-slate-700 dark:text-slate-300">{p.stock}</p>
                      </div>
                      <Button variant="outline" className="h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-amber-200 text-amber-600 hover:bg-amber-50">
                        Edit Listing
                      </Button>
                   </div>
                </Card>
             ))}
          </div>

          {/* Buyer Requests */}
          <div className="space-y-6">
             <div className="flex items-center gap-4 mb-2">
                <ShoppingBag className="h-6 w-6 text-indigo-500" />
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Live Buyer Demands</h3>
             </div>

             {buyerRequests.map((req) => (
                <Card key={req.id} className="p-6 rounded-[2rem] border-none shadow-xl bg-indigo-50 dark:bg-indigo-900/10 border-2 border-indigo-100 dark:border-indigo-900 inline-flex flex-col w-full group hover:bg-indigo-100 dark:hover:bg-indigo-900/20 transition-colors">
                   <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                         <div className="h-10 w-10 text-indigo-600 bg-white rounded-xl shadow-sm flex items-center justify-center font-black text-lg italic uppercase">
                           {req.buyer.charAt(0)}
                         </div>
                         <div>
                           <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{req.buyer}</h4>
                           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                             <MapPin className="h-3 w-3" /> {req.distance} Away
                           </span>
                         </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-indigo-200 text-indigo-700 text-[9px] font-black uppercase tracking-widest italic animate-pulse">Urgent Need</span>
                   </div>

                   <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl mb-4 flex justify-between items-center shadow-inner">
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic mb-0.5">Looking For</p>
                         <p className="text-sm font-black italic tracking-tighter text-indigo-600">{req.req}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic mb-0.5">Req. Qty</p>
                         <p className="text-sm font-black italic tracking-tighter text-slate-700 dark:text-slate-300">{req.qty}</p>
                      </div>
                   </div>

                   <div className="flex gap-4">
                      <Button className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-lg shadow-indigo-500/20">
                         <CheckCircle2 className="mr-2 h-4 w-4" /> Accept Order
                      </Button>
                      <Button variant="outline" className="h-12 w-12 rounded-xl border-indigo-200 text-indigo-600 bg-white">
                         <MessageCircle className="h-5 w-5" />
                      </Button>
                   </div>
                </Card>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default D2CMarketplace;
