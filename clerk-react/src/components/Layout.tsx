import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { SignedIn } from "@clerk/clerk-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AIChat from "./AIChat";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      <SignedIn>
        <Navbar />
      </SignedIn>
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <SignedIn>
        <Footer />
        <AIChat />
      </SignedIn>
    </div>
  );
};

export default Layout;
