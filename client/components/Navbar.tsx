import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Tractor, User, ShoppingCart, Home, LayoutDashboard, Info, Sun, Moon, ShieldCheck, Bug, Calendar, MessageCircle, HeartHandshake, ScrollText, IndianRupee, ChevronDown, Languages, Leaf, CloudSun, TrendingUp, Shield, Bot, Landmark, Truck, Settings, Grid } from "lucide-react";
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { logout, isAuthenticated, isLoaded } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const languages: { name: Language; native: string }[] = [
    { name: "English", native: "English" },
    { name: "Hindi", native: "हिन्दी" },
    { name: "Telugu", native: "తెలుగు" },
    { name: "Tamil", native: "தமிழ்" },
    { name: "Marathi", native: "मराठी" },
    { name: "Gujarati", native: "ગુજરાતી" },
    { name: "Kannada", native: "ಕನ್ನಡ" },
    { name: "Malayalam", native: "മലയാളം" },
    { name: "Punjabi", native: "ਪੰਜਾਬੀ" },
    { name: "Bangla", native: "বাংলা" },
  ];

  const navLinks = [
    { name: t("home"), path: "/", icon: Grid },
    { name: t("weather"), path: "/weather", icon: CloudSun },
    { name: t("market"), path: "/market", icon: TrendingUp },
    { name: t("calendar"), path: "/calendar", icon: Calendar },
    { name: t("security"), path: "/pests", icon: Shield },
    { name: t("aiChat"), path: "/chat", icon: Bot },
    { name: t("schemes"), path: "/agri-schemes", icon: ScrollText },
    { name: t("government"), path: "/help-center", icon: Landmark },
    { name: t("rent"), path: "/rent", icon: Truck },
    { name: t("settings"), path: "/owner", icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="rounded-xl bg-emerald-500 p-1.5 shadow-lg shadow-emerald-500/20">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-emerald-600">
              AgriPath
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="flex items-center bg-muted/30 rounded-2xl p-1 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center justify-center p-2 rounded-xl transition-all hover:scale-110",
                    location.pathname === link.path
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                  title={link.name}
                >
                  <link.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3 ml-4">
              {isLoaded && (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-10 px-3 rounded-xl gap-2 text-muted-foreground hover:text-primary bg-muted/30">
                        <Languages className="h-4 w-4" />
                        <span className="text-sm font-medium">{language}</span>
                        <ChevronDown className="h-3 w-3 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-2xl p-2 w-48 border-primary/10 shadow-xl glass">
                      {languages.map((lang) => (
                        <DropdownMenuItem
                          key={lang.name}
                          onClick={() => setLanguage(lang.name)}
                          className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary transition-all font-medium"
                        >
                          <span>{lang.native}</span>
                          {language === lang.name && <ShieldCheck className="h-4 w-4 text-primary" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="h-6 w-px bg-border mx-2" />

                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl bg-muted/30 h-10 w-10"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    {mounted && (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
                  </Button>

                  {!isAuthenticated ? (
                    <Link to="/login">
                      <Button className="rounded-xl px-5 h-10 shadow-lg hover:shadow-primary/20 transition-all font-semibold bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                        {t("login")}
                      </Button>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-4">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b bg-background"
          >
            <div className="space-y-1 px-4 pb-6 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    location.pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="pt-4 border-t mt-4 flex flex-col space-y-4">
                <div className="flex items-center justify-between px-3">
                  <span className="text-sm font-medium text-muted-foreground">Language</span>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="bg-transparent text-sm font-medium text-primary outline-none"
                  >
                    {languages.map(lang => (
                      <option key={lang.name} value={lang.name}>{lang.native}</option>
                    ))}
                  </select>
                </div>
                {!isAuthenticated ? (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button className="w-full rounded-xl py-6" variant="outline">
                        {t("login")}
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full rounded-xl py-6">
                        Get Started
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button className="w-full rounded-xl py-6" variant="destructive" onClick={() => { logout(); setIsOpen(false); }}>
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
