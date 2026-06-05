import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/clerk-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isLoaded } = useAuth();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const primaryLinks = [
    { name: t("expertHelp") || "Expert Help Hub", path: "/expert-consult", icon: User },
  ];

  const brandName = t("brandName") || "Kisan AI";

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-3 lg:px-6">
        <div className="flex h-14 items-center justify-between gap-2">

          {/* Logo */}
          <Link to="/expert-consult" className="flex items-center gap-2 flex-shrink-0 group transition-all duration-300 hover:scale-105">
            <div className="rounded-xl bg-primary p-1.5 shadow-md shadow-primary/30 group-hover:shadow-primary/50 transition-all">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-primary hidden sm:block group-hover:text-primary/80 transition-colors">
              {brandName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 mx-1 justify-center">
            <div className="flex items-center bg-muted/20 rounded-2xl px-1 py-0.5 gap-0.5 flex-nowrap border border-primary/5">
              {primaryLinks.map((link) => (
                <motion.div
                  key={link.path}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "relative flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-[11px] font-bold tracking-tight transition-all whitespace-nowrap z-10 group nav-link-item",
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
                    {t("login") || "Login"}
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
              <p className="px-2 py-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t("navigation") || "Navigation"}</p>
              {primaryLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                  className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors", location.pathname === link.path ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}>
                  <link.icon className="h-4 w-4 flex-shrink-0" /> {link.name}
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
