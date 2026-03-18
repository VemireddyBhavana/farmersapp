import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import ModernNavbar from "./ModernNavbar";
import Footer from "./Footer";
import { useUser } from "@clerk/clerk-react";
import { GovHeader } from "./GovHeader";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { isSignedIn, isLoaded } = useUser();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  const showUI = isLoaded && isSignedIn && !isAuthPage;

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      {showUI && <GovHeader />}
      {showUI && <ModernNavbar />}
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
      {showUI && <Footer />}
    </div>
  );
};

export default Layout;
