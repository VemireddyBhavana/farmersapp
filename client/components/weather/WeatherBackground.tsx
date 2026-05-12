import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WeatherBackgroundProps {
  condition: string;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ condition }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 40, y: (e.clientY / window.innerHeight - 0.5) * 40 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getBackgroundImage = () => {
    const c = condition.toLowerCase();
    if (c.includes("rain")) return "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2787&auto=format&fit=crop";
    if (c.includes("cloud")) return "https://images.unsplash.com/photo-1534088568595-a066f710b721?q=80&w=2849&auto=format&fit=crop";
    if (c.includes("storm")) return "https://images.unsplash.com/photo-1605727281914-50dc1f47e0ed?q=80&w=2835&auto=format&fit=crop";
    return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop"; // Nature/Field Clear
  };

  return (
    <div className="fixed inset-0 z-[-2] bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={condition}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img 
            src={getBackgroundImage()} 
            className="w-full h-full object-cover grayscale-[20%] brightness-[50%] dark:brightness-[30%] transition-all duration-1000"
            alt="background"
          />
        </motion.div>
      </AnimatePresence>

      {/* HUD Overlays */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]" 
               style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          
          {/* Scanning Line */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(16,185,129,0.05)_50%,transparent_100%)] bg-[length:100%_200px] animate-scan" />
          
          {/* Parallax Blobs */}
          <motion.div
            animate={{ x: mousePos.x, y: mousePos.y }}
            className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{ x: -mousePos.x * 1.5, y: -mousePos.y * 1.5 }}
            className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[150px]"
          />
      </div>

      {/* Floating HUD Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, -100], 
            opacity: [0, 0.3, 0],
            x: [0, Math.random() * 20 - 10]
          }}
          transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
          className="absolute h-px w-px bg-emerald-400"
          style={{ bottom: "0%", left: Math.random() * 100 + "%" }}
        />
      ))}
    </div>
  );
};

export default WeatherBackground;
