import React from "react";
import { motion } from "framer-motion";

interface WeatherBackgroundProps {
  condition: string;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ condition }) => {
  const particles = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 z-0 bg-[#020617] overflow-hidden">
      {/* Dynamic Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#064e3b]/30 via-transparent to-[#020617]" />
      
      {/* Animated Neon Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0], 
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[120px]"
      />
      
      <motion.div 
        animate={{ 
          x: [0, -100, 0], 
          y: [0, 50, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-500/10 rounded-full blur-[120px]"
      />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{ 
              y: ["-10%", "110%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full blur-[1px]"
            style={{ 
              boxShadow: "0 0 10px rgba(52, 211, 153, 0.8)" 
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
};

export default WeatherBackground;
