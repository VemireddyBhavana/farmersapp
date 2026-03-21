import { useState } from "react";
import { motion } from "framer-motion";
import { 
    ShoppingBag, Plus, Tag, Package, 
    ArrowLeft, Search, Filter, Star,
    CheckCircle2, AlertCircle, ShoppingCart,
    Store, Truck, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

export default function FarmerMarket() {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");

    const myProducts = [
        { id: 1, name: "Premium Sona Masuri Rice", price: "₹2,500/Qtl", stock: "45 Qtls", status: "Active", rating: 4.8 },
        { id: 2, name: "Organic Toor Dal", price: "₹8,500/Qtl", stock: "12 Qtls", status: "Under Review", rating: 4.9 },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            {/* Header */}
            <div className="bg-emerald-600 text-white py-12 px-4 shadow-xl">
                <div className="container mx-auto max-w-6xl">
                    <Link to="/dashboard">
                        <Button variant="ghost" className="text-white hover:bg-white/10 p-0 h-auto font-bold flex items-center gap-2 mb-4">
                            <ArrowLeft className="h-5 w-5" /> {t('navDashboard')}
                        </Button>
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                <Store className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black">{t('farmerStore')}</h1>
                                <p className="text-emerald-100 font-medium">Sell directly to buyers and manage your digital storefront.</p>
                            </div>
                        </div>
                        <Button className="bg-white text-emerald-700 hover:bg-emerald-50 h-14 rounded-2xl px-8 font-black text-lg gap-2">
                            <Plus className="h-5 w-5" /> {t('listProduct')}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl mt-8">
                <div className="grid gap-8 lg:grid-cols-4">
                    {/* Filters & Management */}
                    <div className="space-y-6">
                        <Card className="rounded-[2rem] border-none shadow-sm p-6 bg-white dark:bg-slate-900 space-y-6">
                            <div className="space-y-2">
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Store Management</p>
                                <div className="grid grid-cols-1 gap-2">
                                    <Button variant="ghost" className="justify-start gap-3 h-12 rounded-xl font-bold bg-emerald-50 text-emerald-700">
                                        <Package className="h-5 w-5" /> My Inventory
                                    </Button>
                                    <Button variant="ghost" className="justify-start gap-3 h-12 rounded-xl font-bold">
                                        <ShoppingCart className="h-5 w-5" /> {t('manageOrders')}
                                    </Button>
                                    <Button variant="ghost" className="justify-start gap-3 h-12 rounded-xl font-bold">
                                        <Truck className="h-5 w-5" /> Logistics Tracking
                                    </Button>
                                    <Button variant="ghost" className="justify-start gap-3 h-12 rounded-xl font-bold">
                                        <Star className="h-5 w-5" /> Customer Reviews
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Quick Stats */}
                        <Card className="rounded-[2.5rem] bg-slate-900 dark:bg-slate-800 text-white p-8 border-none overflow-hidden relative">
                            <div className="relative z-10">
                                <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">Total Sales</p>
                                <p className="text-4xl font-black mb-6">₹84,200</p>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-bold opacity-60">Pending Orders</span>
                                        <span className="text-sm font-black">4 Orders</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[65%]" />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -right-8 -bottom-8 h-32 w-32 bg-emerald-500/20 rounded-full blur-3xl" />
                        </Card>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <Input 
                                    placeholder="Search your inventory..." 
                                    className="pl-12 h-14 rounded-2xl bg-white border-slate-100 shadow-sm font-bold"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" className="h-14 rounded-2xl px-6 font-bold border-slate-200">
                                <Filter className="h-5 w-5 mr-2" /> Sort By
                            </Button>
                        </div>

                        <div className="grid gap-6">
                            {myProducts.map((product) => (
                                <Card key={product.id} className="rounded-3xl border-none shadow-sm hover:shadow-md transition-all group overflow-hidden bg-white dark:bg-slate-900">
                                    <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-6 w-full">
                                            <div className="h-20 w-20 rounded-2xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
                                                <Package className="h-10 w-10" />
                                            </div>
                                            <div className="space-y-1 flex-1">
                                                <div className="flex items-center gap-3">
                                                    <h4 className="text-xl font-black">{product.name}</h4>
                                                    <Badge className={cn(
                                                        "rounded-lg font-black border-none px-3",
                                                        product.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"
                                                    )}>
                                                        {product.status}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
                                                    <span className="flex items-center gap-1 text-emerald-600"><Tag className="h-4 w-4" /> {product.price}</span>
                                                    <span className="flex items-center gap-1"><Package className="h-4 w-4" /> {product.stock} in stock</span>
                                                    <span className="flex items-center gap-1 text-slate-900 dark:text-white"><Star className="h-4 w-4 fill-emerald-500 text-emerald-500" /> {product.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 w-full md:w-auto">
                                            <Button variant="outline" className="flex-1 md:flex-none rounded-xl font-bold h-12 border-slate-100">
                                                Edit List
                                            </Button>
                                            <Button className="flex-1 md:flex-none rounded-xl font-bold h-12 bg-slate-900 border-none">
                                                Boost Visibility
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Marketplace Insight */}
                        <Card className="rounded-[2.5rem] border-emerald-100 bg-emerald-500 text-white p-8 shadow-xl mt-12 relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                <div className="p-6 bg-white/20 rounded-3xl backdrop-blur-md">
                                    <TrendingUp className="h-12 w-12 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black mb-2">Demand Insight: Basmati Rice</h3>
                                    <p className="font-medium opacity-90 leading-relaxed max-w-xl">
                                        High demand detected in nearby regions (Delhi/NCR). Traders are offering 15% better rates for organic certified produce.
                                    </p>
                                </div>
                                <Button className="bg-white text-emerald-900 hover:bg-white/90 rounded-2xl h-14 px-8 font-black text-lg shrink-0">
                                    Ship Now
                                </Button>
                            </div>
                            <div className="absolute top-[-20%] right-[-5%] h-64 w-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
