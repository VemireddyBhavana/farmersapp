import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid, CloudSun, TrendingUp, Calendar, ShieldCheck, Bot,
  Newspaper, Landmark, Truck, Settings, Globe, ChevronDown, Leaf,
  Menu, X, Sun, Moon, MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage, Language } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/clerk-react";

const allLanguages: { name: Language; native: string }[] = [
  { name: "English",  native: "English"    },
  { name: "Hindi",    native: "हिन्दी"      },
  { name: "Telugu",   native: "తెలుగు"     },
  { name: "Tamil",    native: "தமிழ்"      },
  { name: "Marathi",  native: "मరాఠీ"      },
  { name: "Gujarati", native: "ગુજરાતી"    },
  { name: "Kannada",  native: "ಕನ್ನಡ"      },
  { name: "Malayalam",native: "മലയാളം"     },
  { name: "Punjabi",  native: "ਪੰਜਾਬੀ"    },
  { name: "Bangla",   native: "বাংলা"      },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { user } = useUser();
  const { isAuthenticated, isLoaded } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Primary items with labels (Home, Weather, Market, AI, Schemes)
  const primaryNavItems = [
    { name: t("home"), path: "/dashboard", icon: LayoutGrid },
    { name: t("weather"), path: "/weather", icon: CloudSun },
    { name: t("market"), path: "/market", icon: TrendingUp },
    { name: t("aiChat"), path: "/chat", icon: Bot },
    { name: t("schemes"), path: "/agri-schemes", icon: Landmark },
  ];

  // More items for the dropdown
  const secondaryNavItems = [
    { name: t("calendar"), path: "/calendar", icon: Calendar },
    { name: t("security"), path: "/pests", icon: ShieldCheck },
    { name: t("agriKnowledge"), path: "/knowledge", icon: Newspaper },
    { name: t("logistics"), path: "/rent", icon: Truck },
    { name: t("settings"), path: "/settings", icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm h-16 flex items-center">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-12 items-center justify-between">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2.5 group transition-all shrink-0">
            <div className="h-9 w-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400 hidden sm:block">
              AgriPath
            </span>
          </Link>

          {/* Central Navigation Capsule (Icon + Label Mix) */}
          <div className="hidden lg:flex items-center justify-center bg-slate-100/60 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800 mx-4">
            <div className="flex items-center gap-1">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl transition-all relative group",
                    location.pathname === item.path
                      ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200/50 dark:border-slate-700"
                      : "text-slate-600 dark:text-slate-400 hover:text-emerald-600 hover:bg-white/80 dark:hover:bg-slate-800/80"
                  )}
                >
                  <item.icon className="h-4.5 w-4.5" />
                  <span className="text-sm font-bold tracking-tight">{item.name}</span>
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500"
                    />
                  )}
                </Link>
              ))}

              <div className="w-px h-4 bg-slate-300/50 dark:bg-slate-700/50 mx-1" />

              {/* More Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 px-3 rounded-xl gap-2 text-slate-600 dark:text-slate-400 hover:bg-white/80 dark:hover:bg-slate-800/80 font-bold text-sm">
                    <MoreHorizontal className="h-4.5 w-4.5" />
                    <span>{t("more")}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56 rounded-2xl shadow-xl mt-2 border-slate-100 dark:border-slate-800 bg-white/95 backdrop-blur-xl">
                  {secondaryNavItems.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link to={item.path} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-xl group hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                        <div className="h-8 w-8 rounded-lg bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-500 group-hover:text-emerald-600 transition-colors">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Right Section Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                  <Globe className="h-4.5 w-4.5" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {allLanguages.find(l => l.name === language)?.name || language}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-xl mt-2 border-slate-100 dark:border-slate-800">
                <div className="p-2 grid grid-cols-1 gap-1">
                  {allLanguages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.name}
                      onClick={() => setLanguage(lang.name)}
                      className={cn(
                        "rounded-xl px-3 py-2 cursor-pointer text-xs font-medium",
                        language === lang.name ? "bg-emerald-50 text-emerald-700 font-bold" : ""
                      )}
                    >
                      {lang.native}
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth/User Button */}
            {isLoaded && isAuthenticated && (
              <div className="flex items-center gap-2.5 bg-blue-50/80 dark:bg-blue-900/20 pl-1.5 pr-3 py-1 rounded-2xl border border-blue-100 dark:border-blue-800 shadow-sm">
                <UserButton afterSignOutUrl="/" 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-8 w-8 rounded-xl shadow-sm"
                    }
                  }}
                />
                <span className="text-sm font-bold text-blue-700 dark:text-blue-400 hidden md:inline-block">
                  {user?.firstName || "Farmer"}
                </span>
              </div>
            )}

            {/* Theme & Mobile Toggle */}
            <div className="flex items-center gap-1">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <Sun className="h-4.5 w-4.5 text-amber-500" /> : <Moon className="h-4.5 w-4.5 text-slate-600" />}
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-16 left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 lg:hidden z-40 shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-3 pb-4">
              {[...primaryNavItems, ...secondaryNavItems].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-2xl transition-all",
                    location.pathname === item.path
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-bold">{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
