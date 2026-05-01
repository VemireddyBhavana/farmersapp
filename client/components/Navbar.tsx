import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Sun, Moon, ChevronDown, Leaf, CloudSun, TrendingUp, Shield, ShieldAlert, Bot,
  ScrollText, HeartHandshake, Sprout, Globe, Users, Zap, Target, Grid, Calendar,
  Store, FileText, User, Truck, Microscope, Calculator, Wallet, BarChart3, ShoppingBag, Navigation
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
import { UserButton } from "@clerk/clerk-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

const allLanguages: { name: Language; native: string }[] = [
  { name: "English",  native: "English"    },
  { name: "Hindi",    native: "हिन्दी"      },
  { name: "Telugu",   native: "తెలుగు"     },
  { name: "Tamil",    native: "தமிழ்"      },
  { name: "Marathi",  native: "मराठी"      },
  { name: "Gujarati", native: "ગુજરાતી"    },
  { name: "Kannada",  native: "ಕನ್ನಡ"      },
  { name: "Malayalam",native: "മലയാളം"     },
  { name: "Punjabi",  native: "ਪੰਜਾਬੀ"    },
  { name: "Bangla",   native: "বাংলা"      },
];

const dropdownContainerVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 25,
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }
  }
};

const dropdownItemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring" as const, 
      stiffness: 400, 
      damping: 25 
    }
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [premiumOpen, setPremiumOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { logout, isAuthenticated, isLoaded } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const primaryLinks = [
    { name: t("home"),    path: "/dashboard",  icon: Grid     },
    { name: t("weather"), path: "/weather",    icon: CloudSun },
    { name: t("market"),  path: "/market",     icon: TrendingUp },
    { name: t("aiChat"),  path: "/chat",       icon: Bot      },
    { name: t("pestsAndDisease"), path: "/pests", icon: ShieldAlert },
    { name: t("schemes"), path: "/agri-schemes", icon: ScrollText },
  ];

  const moreLinks = [
    { name: t("seedsStore"),    path: "/seeds",        icon: Sprout        },
    { name: t("calendar"),      path: "/calendar",     icon: Calendar      },
    { name: t("rentTractor"),   path: "/rent",         icon: Store         },
    { name: t("supportPortal"), path: "/support",      icon: HeartHandshake},
  ];

  const premiumLinks = [
    { name: t("cropHealthMonitor"), path: "/satellite-analysis", icon: Globe },
    { name: t("farmerCommunity"),    path: "/community",          icon: Users },
    { name: t("expertHelp"),         path: "/expert-consult",     icon: User  },
    { name: t("yieldForecast"),      path: "/yield-prediction",   icon: TrendingUp },
    { name: t("subsidyChecker"),     path: "/subsidy-finder",     icon: FileText },
    { name: t("toolSharing"),        path: "/tool-sharing",       icon: Truck },
    { name: t("soilPredictorAI"),    path: "/soil-predictor",      icon: Microscope },
    { name: t("soilTestFinder"),    path: "/soil-lab-locator",   icon: Navigation },
    { name: t("loanCalculator"), path: "/agri-loan-calculator", icon: Calculator },
    { name: t("farmLedger"),         path: "/farmer-finance",     icon: Wallet },
  ];



  const brandName = t("brandName");

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-3 lg:px-6">
        <div className="flex h-14 items-center justify-between gap-2">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group transition-all duration-300 hover:scale-105">
            <div className="rounded-xl bg-primary p-1.5 shadow-md shadow-primary/30 group-hover:shadow-primary/50 transition-all">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-primary hidden sm:block group-hover:text-primary/80 transition-colors">
              {brandName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 mx-1 justify-center">
            <div className="flex items-center bg-muted/20 rounded-2xl px-1 py-0.5 gap-0.5 flex-nowrap overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden border border-primary/5">
              {primaryLinks.map((link) => (
                <motion.div
                  key={link.path}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "relative flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold tracking-tight transition-all whitespace-nowrap z-10 group nav-link-item",
                      location.pathname === link.path
                        ? "text-primary-foreground nav-glow-active bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-muted/30"
                    )}
                  >
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="nav-indicator-pill"
                        initial={false}
                        transition={{ 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 28,
                          mass: 1,
                          layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
                        }}
                      >
                        <motion.div 
                          className="absolute inset-0 bg-white/10 rounded-xl"
                          animate={{ scaleX: [1, 1.05, 1], scaleY: [1, 0.95, 1] }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                      </motion.div>
                    )}
                    <motion.div
                      animate={{ 
                        y: location.pathname === link.path ? -2.5 : 0,
                        scale: location.pathname === link.path ? 1.15 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="flex-shrink-0"
                    >
                      <link.icon className={cn(
                        "h-3.5 w-3.5 transition-colors nav-icon-lift",
                        location.pathname === link.path ? "text-primary-foreground" : "text-primary"
                      )} />
                    </motion.div>
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* More dropdown */}
              <DropdownMenu open={moreOpen} onOpenChange={setMoreOpen}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 px-3 text-xs font-bold text-muted-foreground hover:text-primary rounded-xl gap-1 transition-all hover:bg-muted/60 premium-button">
                      <motion.div
                        animate={{ y: moreOpen ? -2 : 0, scale: moreOpen ? 1.1 : 1 }}
                        className="flex items-center gap-1"
                      >
                        {t("more")} <ChevronDown className={cn("h-3 w-3 transition-transform duration-300 opacity-50", moreOpen && "rotate-180")} />
                      </motion.div>
                    </Button>
                  </DropdownMenuTrigger>
                </motion.div>
                <AnimatePresence>
                  {moreOpen && (
                    <DropdownMenuContent asChild forceMount align="start" sideOffset={10}>
                      <motion.div
                        className="w-52 rounded-2xl p-1.5 dropdown-glass border-primary/20 shadow-2xl overflow-hidden z-50 pointer-events-auto"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownContainerVariants}
                      >
                        {moreLinks.map((l) => (
                          <motion.div key={l.path} variants={dropdownItemVariants}>
                            <DropdownMenuItem asChild>
                              <Link
                                to={l.path}
                                className={cn(
                                  "relative flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg cursor-pointer transition-all z-10 dropdown-item-hover",
                                  location.pathname === l.path ? "text-primary shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "text-foreground"
                                )}
                              >
                                {location.pathname === l.path && (
                                  <motion.div
                                    layoutId="more-indicator"
                                    className="nav-indicator-pill-vertical"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                  >
                                    <div className="absolute inset-0 bg-primary/10 rounded-lg" />
                                  </motion.div>
                                )}
                                <l.icon className={cn("h-4 w-4 transition-colors", location.pathname === l.path ? "text-primary" : "text-primary/70")} />
                                {l.name}
                              </Link>
                            </DropdownMenuItem>
                          </motion.div>
                        ))}
                      </motion.div>
                    </DropdownMenuContent>
                  )}
                </AnimatePresence>
              </DropdownMenu>



              {/* Smart Farming Tools (Original Layout Style) */}
              <DropdownMenu open={premiumOpen} onOpenChange={setPremiumOpen}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 px-3 text-xs font-bold text-primary hover:text-primary/90 rounded-xl gap-1 transition-all hover:bg-primary/5 premium-button animate-pulse shadow-[0_0_15px_rgba(var(--primary),0.2)] whitespace-nowrap">
                      <motion.div
                        animate={{ y: premiumOpen ? -2 : 0, scale: premiumOpen ? 1.1 : 1 }}
                        className="flex items-center gap-1"
                      >
                        {t("smartFarmingTools")} <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", premiumOpen && "rotate-180")} />
                      </motion.div>
                    </Button>
                  </DropdownMenuTrigger>
                </motion.div>
                <AnimatePresence>
                  {premiumOpen && (
                    <DropdownMenuContent asChild forceMount align="end" sideOffset={10}>
                      <motion.div
                        className="w-72 rounded-2xl p-2 dropdown-glass border-primary/20 shadow-2xl overflow-hidden z-50 pointer-events-auto"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownContainerVariants}
                      >
                        {premiumLinks.map((item) => (
                          <motion.div key={item.path} variants={dropdownItemVariants}>
                            <DropdownMenuItem asChild>
                              <Link to={item.path} className={cn(
                                "relative flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all group dropdown-item-hover z-10",
                                location.pathname === item.path ? "bg-primary/10 text-primary" : "hover:bg-muted/50 text-foreground group-hover:text-primary"
                              )}>
                                {location.pathname === item.path && (
                                  <motion.div
                                    layoutId="premium-indicator"
                                    className="nav-indicator-pill-vertical"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                  >
                                    <div className="absolute inset-0 bg-primary/10 rounded-lg" />
                                  </motion.div>
                                )}
                                <item.icon className="h-4 w-4 text-primary" />
                                <span className="text-sm font-semibold">{item.name}</span>
                              </Link>
                            </DropdownMenuItem>
                          </motion.div>
                        ))}
                      </motion.div>
                    </DropdownMenuContent>
                  )}
                </AnimatePresence>
              </DropdownMenu>

            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <LanguageSwitcher />
            <ThemeToggle />

            {/* Auth / Profile */}
            {isLoaded && (
              isAuthenticated ? <UserButton afterSignOutUrl="/" /> : (
                <Link to="/login">
                  <Button size="sm" className="rounded-xl px-4 h-9 font-bold bg-primary hover:bg-primary/90 text-primary-foreground hidden sm:flex">
                    {t("login")}
                  </Button>
                </Link>
              )
            )}

            {/* Hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9 rounded-xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t bg-background overflow-y-auto max-h-[85vh]"
          >
            <div className="px-4 py-4 space-y-1">
              <p className="px-2 py-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t("navigation")}</p>
              {[...primaryLinks, ...moreLinks].map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                  className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors", location.pathname === link.path ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}>
                  <link.icon className="h-4 w-4 flex-shrink-0" /> {link.name}
                </Link>
              ))}

              <div className="pt-2 border-t">
                <p className="px-2 py-1 text-[10px] font-black uppercase tracking-widest text-primary italic">{t("smartFarmingTools")}</p>
                {premiumLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                    className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors", location.pathname === link.path ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}>
                    <link.icon className="h-4 w-4 flex-shrink-0 text-primary" /> 
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>




            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
