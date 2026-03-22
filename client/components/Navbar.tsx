import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Sun, Moon, ChevronDown, Leaf, CloudSun, TrendingUp, Shield, Bot,
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
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
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
    { name: t("schemes"), path: "/agri-schemes", icon: ScrollText },
  ];

  const moreLinks = [
    { name: t("seedsStore"),    path: "/seeds",        icon: Sprout        },
    { name: t("calendar"),      path: "/calendar",     icon: Calendar      },
    { name: t("security"),      path: "/pests",        icon: Shield        },
    { name: t("supportPortal"), path: "/support",      icon: HeartHandshake},
    { name: t("agriKnowledge"), path: "/knowledge",    icon: ScrollText    },
    { name: t("rentTractor"),   path: "/rent",         icon: Store         },
  ];

  const premiumLinks = [
    { name: "Crop Health Monitor", path: "/satellite-analysis", icon: Globe, desc: "Track crop health using satellite data." },
    { name: "Farmer Community",    path: "/community",          icon: Users, desc: "Connect with farmers and share knowledge." },
    { name: "Expert Help",         path: "/expert-consult",     icon: User,  desc: "Talk to certified agriculture experts." },
    { name: "Yield Forecast",      path: "/yield-prediction",   icon: TrendingUp, desc: "Estimate your crop production using AI." },
    { name: "Subsidy Checker",     path: "/subsidy-finder",     icon: FileText, desc: "Find government schemes easily." },
    { name: "Tool Sharing",        path: "/tool-sharing",       icon: Truck, desc: "Share and rent farming tools nearby." },
    { name: "Soil Test Finder",    path: "/soil-lab-locator",   icon: Microscope, desc: "Locate soil testing labs near you." },
    { name: "Loan & EMI Calculator", path: "/agri-loan-calculator", icon: Calculator, desc: "Plan loans and calculate EMI easily." },
    { name: "Farm Ledger",         path: "/farmer-finance",     icon: Wallet, desc: "Track expenses, sales, and profits." },
  ];

  const ourSolutionsLinks = [
    { name: t("farmAdvisory"),  path: "/chat",          icon: Bot,           desc: t("solutionAdvisoryDesc") },
    { name: t("agriInputs"),    path: "/seeds",         icon: Sprout,        desc: t("solutionInputsDesc")   },
    { name: t("omnichannel"),   path: "/omnichannel",   icon: Store,         desc: t("solutionOmniDesc")     },
    { name: t("marketLinkage"), path: "/market-linkage",icon: TrendingUp,    desc: t("solutionMarketDesc")   },
  ];

  const aboutTeachSparkLinks = [
    { name: t("aboutUs"),       path: "/about",      icon: Target,        desc: t("aboutUsDesc") },
    { name: t("ourVision"),     path: "/vision", icon: Target,        desc: t("visionDesc")                 },
    { name: t("ourImpact"),     path: "/impact",     icon: Zap,           desc: t("impactDesc")                 },
    { name: "TechSpark AI",     path: "/techspark",  icon: Bot,           desc: "Technology & Innovation"      },
    { name: t("joinUs"),        path: "/join-us",    icon: HeartHandshake,desc: t("joinUsDesc")                 },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-3 lg:px-6">
        <div className="flex h-14 items-center justify-between gap-2">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group transition-all duration-300 hover:scale-105">
            <div className="rounded-xl bg-emerald-500 p-1.5 shadow-md shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-emerald-600 hidden sm:block group-hover:text-emerald-500 transition-colors">
              TeachSpark AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 flex-1 mx-4">
            <div className="flex items-center bg-muted/40 rounded-2xl px-1.5 py-1 gap-0.5 flex-nowrap overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {primaryLinks.map((link) => (
                <motion.div
                  key={link.path}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap z-10 group nav-link-item premium-button",
                      location.pathname === link.path
                        ? "text-primary-foreground nav-glow-active bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-muted/40"
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
                        location.pathname === link.path ? "text-primary-foreground" : "text-emerald-600"
                      )} />
                    </motion.div>
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* More dropdown */}
              <DropdownMenu open={moreOpen} onOpenChange={setMoreOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 px-3 text-xs font-bold text-muted-foreground hover:text-primary rounded-xl gap-1 transition-all hover:bg-muted/60 premium-button">
                    {t("more")} <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", moreOpen && "rotate-180")} />
                  </Button>
                </DropdownMenuTrigger>
                <AnimatePresence>
                  {moreOpen && (
                    <DropdownMenuContent asChild forceMount align="start" sideOffset={10}>
                      <motion.div
                        className="w-52 rounded-2xl p-1.5 dropdown-glass border-emerald-500/20 shadow-2xl overflow-hidden z-50 pointer-events-auto"
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
                                    <div className="absolute inset-0 bg-emerald-500/10 rounded-lg" />
                                  </motion.div>
                                )}
                                <l.icon className={cn("h-4 w-4 transition-colors", location.pathname === l.path ? "text-primary" : "text-emerald-600")} />
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

              {/* Our Solutions dropdown */}
              <DropdownMenu open={solutionsOpen} onOpenChange={setSolutionsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 px-3 text-xs font-bold text-muted-foreground hover:text-primary rounded-xl gap-1 transition-all hover:bg-muted/60 premium-button">
                    {t("ourSolutions")} <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", solutionsOpen && "rotate-180")} />
                  </Button>
                </DropdownMenuTrigger>
                <AnimatePresence>
                  {solutionsOpen && (
                    <DropdownMenuContent asChild forceMount align="end" sideOffset={10}>
                      <motion.div
                        className="w-72 rounded-2xl p-2 dropdown-glass border-emerald-500/20 shadow-2xl overflow-hidden z-50 pointer-events-auto"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownContainerVariants}
                      >
                        {ourSolutionsLinks.map((item) => (
                          <motion.div key={item.path} variants={dropdownItemVariants}>
                            <DropdownMenuItem asChild>
                              <Link to={item.path} className={cn(
                                "relative flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all group dropdown-item-hover z-10",
                                location.pathname === item.path ? "bg-emerald-50/50 dark:bg-emerald-900/10" : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                              )}>
                                {location.pathname === item.path && (
                                  <motion.div
                                    layoutId="solutions-indicator"
                                    className="nav-indicator-pill-vertical"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                  >
                                    <div className="absolute inset-0 bg-emerald-500/10 rounded-lg" />
                                  </motion.div>
                                )}
                                <item.icon className="h-4 w-4 text-emerald-600" />
                                <div>
                                  <p className={cn("text-sm font-bold", location.pathname === item.path ? "text-emerald-700" : "text-foreground group-hover:text-emerald-600")}>{item.name}</p>
                                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                                </div>
                              </Link>
                            </DropdownMenuItem>
                          </motion.div>
                        ))}
                      </motion.div>
                    </DropdownMenuContent>
                  )}
                </AnimatePresence>
              </DropdownMenu>

              {/* About dropdown */}
              <DropdownMenu open={aboutOpen} onOpenChange={setAboutOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 px-3 text-xs font-bold text-muted-foreground hover:text-primary rounded-xl gap-1 transition-all hover:bg-muted/60 premium-button">
                    {t("aboutTeachSpark")} <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", aboutOpen && "rotate-180")} />
                  </Button>
                </DropdownMenuTrigger>
                <AnimatePresence>
                  {aboutOpen && (
                    <DropdownMenuContent asChild forceMount align="end" sideOffset={10}>
                      <motion.div
                        className="w-72 rounded-2xl p-2 dropdown-glass border-blue-500/20 shadow-2xl overflow-hidden z-50 pointer-events-auto"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownContainerVariants}
                      >
                        {aboutTeachSparkLinks.map((item) => (
                          <motion.div key={item.path} variants={dropdownItemVariants}>
                            <DropdownMenuItem asChild>
                              <Link to={item.path} className={cn(
                                "relative flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all group dropdown-item-hover z-10",
                                location.pathname === item.path ? "bg-blue-50/50 dark:bg-blue-900/10" : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              )}>
                                {location.pathname === item.path && (
                                  <motion.div
                                    layoutId="about-indicator"
                                    className="nav-indicator-pill-vertical"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                  >
                                    <div className="absolute inset-0 bg-blue-500/10 rounded-lg" />
                                  </motion.div>
                                )}
                                <item.icon className="h-4 w-4 text-blue-600" />
                                <div>
                                  <p className={cn("text-sm font-bold", location.pathname === item.path ? "text-blue-700" : "text-foreground group-hover:text-blue-600")}>{item.name}</p>
                                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                                </div>
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
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 px-3 text-xs font-bold text-emerald-600 hover:text-emerald-700 rounded-xl gap-1 transition-all hover:bg-emerald-50 dark:hover:bg-emerald-900/20 premium-button animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.2)] whitespace-nowrap">
                    Smart Farming Tools <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", premiumOpen && "rotate-180")} />
                  </Button>
                </DropdownMenuTrigger>
                <AnimatePresence>
                  {premiumOpen && (
                    <DropdownMenuContent asChild forceMount align="end" sideOffset={10}>
                      <motion.div
                        className="w-72 rounded-2xl p-2 dropdown-glass border-emerald-500/20 shadow-2xl overflow-hidden z-50 pointer-events-auto"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownContainerVariants}
                      >
                        {premiumLinks.map((item) => (
                          <motion.div key={item.path} variants={dropdownItemVariants}>
                            <DropdownMenuItem asChild>
                              <Link to={item.path} className={cn(
                                "relative flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all group dropdown-item-hover z-10",
                                location.pathname === item.path ? "bg-emerald-50/50 dark:bg-emerald-900/10" : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                              )}>
                                {location.pathname === item.path && (
                                  <motion.div
                                    layoutId="premium-indicator"
                                    className="nav-indicator-pill-vertical"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                  >
                                    <div className="absolute inset-0 bg-emerald-500/10 rounded-lg" />
                                  </motion.div>
                                )}
                                <item.icon className="h-4 w-4 text-emerald-600 mt-0.5" />
                                <div>
                                  <p className={cn("text-sm font-bold", location.pathname === item.path ? "text-emerald-700" : "text-foreground group-hover:text-emerald-600")}>{item.name}</p>
                                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                                </div>
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
            {/* Language switch */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 px-2.5 rounded-xl bg-muted/40 flex items-center gap-1 text-xs font-bold">
                  <Globe className="h-4 w-4 text-emerald-600" />
                  <span className="hidden md:inline text-muted-foreground">{allLanguages.find(l => l.name === language)?.native || language}</span>
                  <ChevronDown className="h-3 w-3 text-muted-foreground hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-xl p-1.5 mt-1 bg-white dark:bg-slate-900">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2 py-1">{t("selectLanguage")}</p>
                {allLanguages.map((lang) => (
                  <DropdownMenuItem key={lang.name} onClick={() => setLanguage(lang.name)} className={cn("cursor-pointer rounded-lg py-2 px-3 flex items-center gap-2 text-sm font-semibold", language === lang.name ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700" : "hover:bg-muted")}>
                    {lang.native}
                    {language === lang.name && <span className="ml-auto text-emerald-500 text-xs">✓</span>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme toggle */}
            {mounted && (
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl bg-muted/40" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}

            {/* Auth / Profile */}
            {isLoaded && (
              isAuthenticated ? <UserButton afterSignOutUrl="/" /> : (
                <Link to="/login">
                  <Button size="sm" className="rounded-xl px-4 h-9 font-bold bg-emerald-600 hover:bg-emerald-700 text-white hidden sm:flex">
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
              <p className="px-2 py-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Navigation</p>
              {[...primaryLinks, ...moreLinks].map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                  className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors", location.pathname === link.path ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}>
                  <link.icon className="h-4 w-4 flex-shrink-0" /> {link.name}
                </Link>
              ))}

              <div className="pt-2 border-t">
                <p className="px-2 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-600 italic">Smart Farming Tools</p>
                {premiumLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                    className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors", location.pathname === link.path ? "bg-emerald-100 text-emerald-700" : "text-muted-foreground hover:bg-muted")}>
                    <link.icon className="h-4 w-4 flex-shrink-0 text-emerald-600" /> 
                    <div className="flex flex-col">
                      <span>{link.name}</span>
                      <span className="text-[9px] opacity-60 font-medium">{link.desc}</span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t">
                <p className="px-2 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">{t("ourSolutions")}</p>
                {ourSolutionsLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-muted-foreground hover:bg-muted">
                    <link.icon className="h-4 w-4 flex-shrink-0 text-emerald-600" /> {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t">
                <p className="px-2 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600">{t("aboutTeachSpark")}</p>
                {aboutTeachSparkLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-muted-foreground hover:bg-muted">
                    <link.icon className="h-4 w-4 flex-shrink-0 text-blue-600" /> {link.name}
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
