import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Sun, Moon, ChevronDown, Leaf, CloudSun, TrendingUp, Shield, Bot,
  ScrollText, HeartHandshake, Sprout, Globe, Users, Zap, Target, Grid, Calendar,
  Store, ShoppingBag
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { logout, isAuthenticated, isLoaded } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Primary nav — only 5 most-used links shown as icon+text pills
  const primaryLinks = [
    { name: t("home"),    path: "/dashboard",  icon: Grid     },
    { name: t("weather"), path: "/weather",    icon: CloudSun },
    { name: t("market"),  path: "/market",     icon: TrendingUp },
    { name: t("aiChat"),  path: "/chat",       icon: Bot      },
    { name: t("schemes"), path: "/agri-schemes", icon: ScrollText },
  ];

  // "More" items inside a dropdown
  const moreLinks = [
    { name: t("agriMarketplace"),path: "/marketplace", icon: ShoppingBag   },
    { name: t("seedsStore"),    path: "/seeds",        icon: Sprout        },
    { name: t("calendar"),      path: "/calendar",     icon: Calendar      },
    { name: t("security"),      path: "/pests",        icon: Shield        },
    { name: t("supportPortal"), path: "/support",      icon: HeartHandshake},
    { name: t("agriKnowledge"), path: "/knowledge",    icon: ScrollText    },
    { name: t("rentTractor"),   path: "/rent",         icon: Store         },
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
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="rounded-xl bg-emerald-500 p-1.5 shadow-md shadow-emerald-500/30">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-emerald-600 hidden sm:block">
              TeachSpark AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 flex-1 mx-4">
            <div className="flex items-center bg-muted/40 rounded-2xl px-1.5 py-1 gap-0.5 flex-wrap">
              {primaryLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap",
                    location.pathname === link.path
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                >
                  <link.icon className="h-3.5 w-3.5 flex-shrink-0" />
                  {link.name}
                </Link>
              ))}

              {/* More dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 px-3 text-xs font-bold text-muted-foreground hover:text-primary rounded-xl gap-1">
                    {t("more")} <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-52 rounded-xl shadow-xl p-1.5 mt-1">
                  {moreLinks.map((l) => (
                    <DropdownMenuItem key={l.path} asChild>
                      <Link to={l.path} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg cursor-pointer">
                        <l.icon className="h-4 w-4 text-emerald-600" /> {l.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Our Solutions dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 px-3 text-xs font-bold text-muted-foreground hover:text-primary rounded-xl gap-1">
                    {t("ourSolutions")} <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 rounded-xl shadow-xl p-2 mt-1 bg-white dark:bg-slate-900">
                  {ourSolutionsLinks.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link to={item.path} className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 group">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* TeachSpark AI dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 px-3 text-xs font-bold text-muted-foreground hover:text-primary rounded-xl gap-1">
                    {t("aboutTeachSpark")} <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 rounded-xl shadow-xl p-2 mt-1 bg-white dark:bg-slate-900">
                  {aboutTeachSparkLinks.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link to={item.path} className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 group">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 px-2.5 rounded-xl bg-muted/40 flex items-center gap-1 text-xs font-bold" title="Language">
                  <Globe className="h-4 w-4 text-emerald-600" />
                  <span className="hidden md:inline text-muted-foreground">
                    {allLanguages.find(l => l.name === language)?.native || language}
                  </span>
                  <ChevronDown className="h-3 w-3 text-muted-foreground hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-xl p-1.5 mt-1 bg-white dark:bg-slate-900">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2 py-1">{t("selectLanguage")}</p>
                {allLanguages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.name}
                    onClick={() => setLanguage(lang.name)}
                    className={cn(
                      "cursor-pointer rounded-lg py-2 px-3 flex items-center gap-2 text-sm font-semibold",
                      language === lang.name
                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700"
                        : "hover:bg-muted"
                    )}
                  >
                    {lang.native}
                    {language === lang.name && <span className="ml-auto text-emerald-500 text-xs">✓</span>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl bg-muted/40"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}

            {/* Auth */}
            {isLoaded && (
              isAuthenticated
                ? <UserButton afterSignOutUrl="/" />
                : (
                  <Link to="/login">
                    <Button size="sm" className="rounded-xl px-4 h-9 font-bold bg-emerald-600 hover:bg-emerald-700 text-white hidden sm:flex">
                      {t("login")}
                    </Button>
                  </Link>
                )
            )}

            {/* Mobile Burger */}
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

      {/* Mobile Drawer */}
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
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-bold transition-all group shrink-0 whitespace-nowrap",
                    location.pathname === link.path
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                      : "text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600"
                  )}
                >
                  <link.icon className="h-4 w-4 flex-shrink-0" />
                  {link.name}
                </Link>
              ))}

              <div className="pt-2 border-t">
                <p className="px-2 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">{t("ourSolutions")}</p>
                {ourSolutionsLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-muted-foreground hover:bg-muted transition-colors">
                    <link.icon className="h-4 w-4 flex-shrink-0 text-emerald-600" /> {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t">
                <p className="px-2 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600">{t("aboutTeachSpark")}</p>
                {aboutTeachSparkLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-muted-foreground hover:bg-muted transition-colors">
                    <link.icon className="h-4 w-4 flex-shrink-0 text-blue-600" /> {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t">
                <p className="px-2 py-1 text-[10px] font-black uppercase tracking-widest text-purple-600">🌐 {t("selectLanguage")}</p>
                <div className="grid grid-cols-2 gap-1 mt-1">
                  {allLanguages.map((lang) => (
                    <button
                      key={lang.name}
                      onClick={() => { setLanguage(lang.name); setIsOpen(false); }}
                      className={cn(
                        "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors text-left",
                        language === lang.name
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {lang.native}
                      {language === lang.name && <span className="ml-auto text-emerald-500 text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {isLoaded && !isAuthenticated && (
                <div className="pt-4 border-t">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white">{t("login")}</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
