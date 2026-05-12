import React from "react";
import { motion } from "framer-motion";
import { 
  FiHome, FiCloud, FiMap, FiBarChart2, FiSettings, 
  FiLogOut, FiSearch, FiBell, FiChevronRight 
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const WeatherSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { id: 'home', icon: <FiHome />, label: 'Home', path: '/' },
    { id: 'weather', icon: <FiCloud />, label: 'Weather', path: '/weather' },
    { id: 'map', icon: <FiMap />, label: 'Satellite', path: '#' },
    { id: 'stats', icon: <FiBarChart2 />, label: 'Analytics', path: '#' },
    { id: 'settings', icon: <FiSettings />, label: 'Settings', path: '#' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-24 bg-[#020617]/80 backdrop-blur-3xl border-r border-white/5 flex flex-col items-center py-10 z-[100] gap-12">
        <div className="h-12 w-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <FiCloud className="text-white text-2xl" />
        </div>

        <nav className="flex-1 flex flex-col gap-8">
            {menuItems.map((item) => (
                <Link 
                    key={item.id} 
                    to={item.path}
                    className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 group relative
                        ${location.pathname === item.path ? 'bg-emerald-500/10 text-emerald-500 shadow-inner' : 'text-white/30 hover:text-white'}`}
                >
                    <span className="text-xl">{item.icon}</span>
                    <div className="absolute left-16 px-4 py-2 rounded-lg bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {item.label}
                    </div>
                    {location.pathname === item.path && (
                        <div className="absolute -left-1 w-1 h-6 bg-emerald-500 rounded-r-full" />
                    )}
                </Link>
            ))}
        </nav>

        <button className="h-12 w-12 rounded-xl flex items-center justify-center text-red-500/40 hover:text-red-500 transition-colors">
            <FiLogOut className="text-xl" />
        </button>
    </div>
  );
};

export default WeatherSidebar;
