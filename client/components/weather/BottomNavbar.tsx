import React from "react";
import { motion } from "framer-motion";
import { FiHome, FiCloud, FiShoppingBag, FiCalendar, FiUsers } from "react-icons/fi";
import { useLocation, Link } from "react-router-dom";

const BottomNavbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { icon: <FiHome />, path: "/dashboard", label: "Hub" },
    { icon: <FiCloud />, path: "/weather", label: "Aura" },
    { icon: <FiShoppingBag />, path: "/market", label: "Trade" },
    { icon: <FiCalendar />, path: "/calendar", label: "Cycle" },
    { icon: <FiUsers />, path: "/community", label: "Pulse" }
  ];

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 p-3 rounded-[3rem] bg-white/60 dark:bg-black/50 backdrop-blur-[40px] border border-white/20 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center justify-center h-16 w-16 sm:w-20 rounded-[2rem] transition-all duration-500 relative group ${
                  isActive 
                    ? "bg-emerald-500 text-white shadow-[0_10px_30px_rgba(16,185,129,0.3)]" 
                    : "text-black/40 dark:text-white/40 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                <span className="text-xl sm:text-2xl">{item.icon}</span>
                {isActive && (
                  <motion.span 
                    layoutId="nav-label"
                    className="text-[8px] font-black uppercase tracking-[0.2em] mt-1"
                  >
                    {item.label}
                  </motion.span>
                )}
                {!isActive && (
                  <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all bg-emerald-500 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};

export default BottomNavbar;
