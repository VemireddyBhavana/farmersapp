import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  children,
  className
}: { 
  icon?: React.ElementType, 
  title?: string, 
  description?: string, 
  children: React.ReactNode,
  className?: string
}) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
      }}
      className={cn("group flex flex-col bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100 h-full overflow-hidden", className)}
    >
      {(Icon || title || description) && (
        <div className="flex items-center gap-4 mb-6">
          {Icon && (
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            </div>
          )}
          <div>
            {title && <h3 className="text-lg font-semibold text-slate-900 leading-tight">{title}</h3>}
            {description && <p className="text-sm text-slate-500 mt-1 leading-relaxed">{description}</p>}
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};
