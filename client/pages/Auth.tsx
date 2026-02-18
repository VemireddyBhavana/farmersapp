import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Tractor, User, Lock, Mail, ChevronRight, ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"farmer" | "owner">("farmer");

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-muted/10 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <Tractor className="h-96 w-96 rotate-12" />
      </div>
      <div className="absolute bottom-0 left-0 p-12 opacity-5 pointer-events-none">
        <ShieldCheck className="h-80 w-80 -rotate-12" />
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center space-x-2 text-primary hover:opacity-80 transition-all mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="mx-auto h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20">
            <Tractor className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? "Login to manage your farm or equipment rentals." 
              : "Join 10k+ farmers and equipment owners today."}
          </p>
        </div>

        <motion.div 
          layout
          className="glass p-8 rounded-[2.5rem] border-primary/10 shadow-2xl space-y-6"
        >
          {/* Role Toggle (Only for Register) */}
          {!isLogin && (
            <div className="grid grid-cols-2 gap-2 p-1 bg-muted/50 rounded-2xl">
              <button
                onClick={() => setRole("farmer")}
                className={cn(
                  "py-3 rounded-xl text-sm font-bold transition-all",
                  role === "farmer" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-primary"
                )}
              >
                I'm a Farmer
              </button>
              <button
                onClick={() => setRole("owner")}
                className={cn(
                  "py-3 rounded-xl text-sm font-bold transition-all",
                  role === "owner" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-primary"
                )}
              >
                I'm an Owner
              </button>
            </div>
          )}

          <div className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Enter your full name" className="pl-12 h-14 rounded-2xl border-primary/5 focus-visible:ring-primary" />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Phone Number</Label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center text-sm font-bold text-muted-foreground border-r pr-3 border-primary/10 mr-2">
                  +91
                </div>
                <Input placeholder="98765 43210" className="pl-16 h-14 rounded-2xl border-primary/5 focus-visible:ring-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</Label>
                {isLogin && <Link to="#" className="text-xs text-primary font-bold hover:underline">Forgot?</Link>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input type="password" placeholder="••••••••" className="pl-12 h-14 rounded-2xl border-primary/5 focus-visible:ring-primary" />
              </div>
            </div>
          </div>

          <Button className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all">
            {isLogin ? "Login Now" : "Register Account"}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-bold hover:underline"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
