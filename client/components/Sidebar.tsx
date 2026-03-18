import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Sprout,
  Stethoscope,
  Calculator,
  TrendingUp,
  Landmark,
  FileText,
  BarChart3,
  Droplets,
  Bell,
  UserCheck,
  ChevronRight,
  Menu,
  X,
  Zap,
  Leaf,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

const navItems = [
  { id: "overview", name: "Agriculture Overview", path: "/agriculture", icon: Leaf },
  { id: "dashboard", name: "Dashboard", path: "/agriculture/dashboard", icon: LayoutGrid },
  { id: "recommendation", name: "Crop Recommendation", path: "/agriculture/crop-recommendation", icon: Sprout },
  { id: "doctor", name: "AI Crop Doctor", path: "/agriculture/crop-doctor", icon: Stethoscope },
  { id: "cost", name: "Cost Calculator", path: "/agriculture/costs", icon: Calculator },
  { id: "profit", name: "Crop Profitability", path: "/agriculture/profitability", icon: TrendingUp },
  { id: "loans", name: "Loans", path: "/agriculture/loans", icon: Landmark },
  { id: "schemes", name: "Government Schemes", path: "/agriculture/schemes", icon: FileText },
  { id: "prices", name: "Market Prices", path: "/agriculture/market-prices", icon: BarChart3 },
  { id: "irrigation", name: "Water & Irrigation", path: "/agriculture/water-irrigation", icon: Droplets },
  { id: "alerts", name: "Alerts", path: "/agriculture/alerts", icon: Bell },
  { id: "experts", name: "Expert Consultation", path: "/agriculture/experts", icon: UserCheck },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen transition-all duration-500 z-40 flex flex-col",
        "bg-slate-950/80 backdrop-blur-2xl border-r border-white/10 shadow-2xl",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Brand Header */}
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,230,118,0.3)]">
              <Zap className="h-6 w-6 text-slate-950 fill-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tighter uppercase italic">ISMIGS</span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest leading-none">Global Agri-Tech</span>
            </div>
          </motion.div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400"
        >
          {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar py-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "group flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 relative overflow-hidden",
                isActive
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-8 bg-emerald-500 rounded-r-full"
                />
              )}
              <item.icon className={cn(
                "h-6 w-6 transition-transform duration-300 group-hover:scale-110 shrink-0",
                isActive ? "text-emerald-400" : "text-slate-500"
              )} />
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col flex-1"
                >
                  <span className="text-sm font-bold tracking-tight whitespace-nowrap">{item.name}</span>
                </motion.div>
              )}
              {!isCollapsed && isActive && (
                <ChevronRight className="h-4 w-4 opacity-50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-white/5">
        <Link to="/" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all text-slate-500 hover:text-white">
          <Home className="h-5 w-5" />
          {!isCollapsed && <span className="text-sm font-bold">Back to Home</span>}
        </Link>
        {!isCollapsed && (
          <div className="mt-4 px-3 py-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Official Data Live</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Synced with State & National Agricultural Datasets</p>
          </div>
        )}
      </div>
    </aside>
  );
};
