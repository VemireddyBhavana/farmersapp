import { motion } from "framer-motion";
import { SignInButton } from "@clerk/clerk-react";
import { Sprout, Leaf, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617]">
      {/* ── Animated Background ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-500/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-emerald-600/10 blur-[120px] rounded-full"
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
          {/* Decorative Leaf Icons */}
          <Leaf className="absolute -top-6 -right-6 w-24 h-24 text-emerald-500/10 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
          <Sprout className="absolute -bottom-6 -left-6 w-24 h-24 text-emerald-500/10 -rotate-12 group-hover:-rotate-45 transition-transform duration-1000" />

          <div className="text-center space-y-6">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center p-4 bg-emerald-500/20 rounded-3xl border border-emerald-500/30"
            >
              <Sprout className="w-10 h-10 text-emerald-400" />
            </motion.div>

            <div className="space-y-2">
              <motion.h1
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-black text-white tracking-tight"
              >
                Farmers App <span className="text-emerald-500">🌾</span>
              </motion.h1>
              <motion.h2
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-bold text-emerald-100/80"
              >
                Welcome Farmer <span className="text-emerald-400">👨‍🌾</span>
              </motion.h2>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-slate-400 font-medium"
              >
                Access your farm dashboard
              </motion.p>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <SignInButton mode="modal">
                <button className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 active:scale-95 group/btn">
                   <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center p-1 group-hover/btn:scale-110 transition-transform">
                     <svg viewBox="0 0 24 24" className="w-full h-full">
                       <path
                         fill="#4285F4"
                         d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                       />
                       <path
                         fill="#34A853"
                         d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                       />
                       <path
                         fill="#FBBC05"
                         d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                       />
                       <path
                         fill="#EA4335"
                         d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                       />
                     </svg>
                   </div>
                   Continue with Google
                </button>
              </SignInButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/50"
            >
              <div className="h-px w-8 bg-emerald-500/20" />
              Empowering Agriculture
              <div className="h-px w-8 bg-emerald-500/20" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
