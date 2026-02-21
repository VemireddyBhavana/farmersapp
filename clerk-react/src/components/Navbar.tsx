import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Sprout, Menu, X, Bell, Sun, Moon,
  Tractor, MapPin, Cloud, TrendingUp, BookOpen, Bot,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Rent Equipment", icon: Tractor },
  { href: "/weather", label: "Weather", icon: Cloud },
  { href: "/market", label: "Market Rates", icon: TrendingUp },
  { href: "/ai-assistant", label: "AI Assistant", icon: Bot },
  { href: "/schemes", label: "Schemes", icon: BookOpen },
  { href: "/map", label: "Map", icon: MapPin },
];

const languages = [
  { code: 'en', label: 'English' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'mr', label: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'ml', label: 'മലയാളம்' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="h-9 w-9 rounded-2xl bg-primary flex items-center justify-center shadow-md shadow-primary/30"
            >
              <Sprout className="h-5 w-5 text-primary-foreground" />
            </motion.div>
            <span className="font-black text-lg">
              Kisan<span className="text-primary font-bold">Tech</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all",
                  isActive(href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="h-4 w-4" />
                {t(`nav.${href.substring(1)}` as any, label)}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="uppercase text-xs font-bold">{i18n.language.split('-')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 rounded-2xl glass border-primary/10">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    className="cursor-pointer font-medium hover:bg-primary/10 hover:text-primary transition-colors rounded-xl"
                    onClick={() => changeLanguage(lang.code)}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme toggle */}
            <Button
              variant="ghost" size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <SignedIn>
              {/* Notification bell */}
              <Link to="/notifications">
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full" />
                </Button>
              </Link>

              {/* User profile with Clerk UserButton */}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <SignedOut>
              <Link to="/login">
                <Button variant="default" size="sm" className="rounded-full px-5 font-bold hidden sm:flex">
                  {t('nav.login')}
                </Button>
              </Link>
            </SignedOut>

            {/* Mobile hamburger */}
            <Button
              variant="ghost" size="icon"
              className="rounded-full lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border py-4 space-y-1"
            >
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                    isActive(href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="h-4 w-4" /> {t(`nav.${href.substring(1)}` as any, label)}
                </Link>
              ))}
              <SignedOut>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full mt-2 rounded-xl font-bold">{t('nav.login')}</Button>
                </Link>
              </SignedOut>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
