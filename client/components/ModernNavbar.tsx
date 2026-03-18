import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { 
  Globe, Sun, Moon, Leaf, ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useLanguage, Language } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/clerk-react";

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

const ModernNavbar = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { isLoaded, isSignedIn } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Helper to determine if a path is active
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-5xl">
      <div className="relative group">
        {/* Outer Glow Wrapper */}
        <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Main Navbar Container */}
        <div className="relative flex items-center justify-between h-16 px-4 md:px-8 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden">
          
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-3 group/logo flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-40 group-hover/logo:opacity-70 transition-opacity" />
              <div className="relative bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
                <Leaf className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-lg font-black tracking-tighter text-white hidden md:block">
              TEACHSPARK
            </span>
          </Link>

          {/* Nav Items with Sliding Pill */}
          <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/5 mx-2 overflow-x-auto no-scrollbar max-w-full">
            <LayoutGroup id="nav">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "relative px-6 py-2 text-sm font-bold tracking-tight transition-colors duration-300 whitespace-nowrap z-10",
                      active ? "text-white" : "text-white/40 hover:text-white/70"
                    )}
                  >
                    {item.name}
                    {active && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 bg-white/10 rounded-full -z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </LayoutGroup>
          </div>

          {/* Right Section: Lang, Theme, Auth */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-black/90 backdrop-blur-xl border-white/10 rounded-2xl shadow-2xl p-2 mt-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 px-3 py-2">Select Language</p>
                <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                  {allLanguages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.name}
                      onClick={() => setLanguage(lang.name)}
                      className={cn(
                        "cursor-pointer rounded-xl py-2.5 px-3 flex items-center gap-3 text-sm font-bold transition-all",
                        language === lang.name
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <span className="w-6 h-6 flex items-center justify-center text-xs opacity-60">
                        {lang.name.substring(0, 2).toUpperCase()}
                      </span>
                      {lang.native}
                      {language === lang.name && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}

            {/* User Auth */}
            {isLoaded && isSignedIn && (
              <div className="pl-2 border-l border-white/10">
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8 rounded-full border border-white/10 shadow-lg",
                      userButtonTrigger: "focus:shadow-none"
                    }
                  }}
                  afterSignOutUrl="/" 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ModernNavbar;
