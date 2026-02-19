import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Tractor, User, ShoppingCart, Home, LayoutDashboard, Info, Sun, Moon, ShieldCheck, Bug, Calendar, MessageCircle, HeartHandshake, ScrollText, IndianRupee, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Rent", path: "/rent", icon: Tractor },
    { name: "Weather", path: "/weather", icon: Sun },
    { name: "Market", path: "/market", icon: IndianRupee },
    { name: "Owner", path: "/owner", icon: LayoutDashboard },
  ];

  const moreLinks = [
    { name: "Calendar", path: "/calendar", icon: Calendar },
    { name: "Pests", path: "/pests", icon: Bug },
    { name: "AI Chat", path: "/chat", icon: MessageCircle },
    { name: "Agri Schemes", path: "/agri-schemes", icon: ScrollText },
    { name: "Help Center", path: "/help-center", icon: HeartHandshake },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="rounded-xl bg-primary p-1.5">
              <Tractor className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">
              Smart Farmer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary gap-1">
                  More <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl p-2 w-48 border-primary/10 shadow-xl glass">
                {moreLinks.map((link) => (
                  <DropdownMenuItem key={link.path} asChild>
                    <Link
                      to={link.path}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary transition-all font-medium text-muted-foreground"
                    >
                      <link.icon className="h-4 w-4" />
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {mounted && (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
              <Link to="/login">
                <Button className="rounded-full px-6 shadow-lg hover:shadow-primary/20 transition-all">Login</Button>
              </Link>
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
              {[...navLinks, ...moreLinks].map((link) => (
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
              <div className="pt-4 flex flex-col space-y-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full rounded-xl py-6" variant="outline">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full rounded-xl py-6">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
