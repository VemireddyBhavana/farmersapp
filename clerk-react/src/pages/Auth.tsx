import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, Sprout, Tractor, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export default function Auth() {
  const navigate = useNavigate();
  const { login, register, googleLogin } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"farmer" | "owner">("farmer");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await register({ name: form.name, email: form.email, phone: form.phone, password: form.password, role });
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async (credential: string) => {
    setError("");
    setLoading(true);
    try {
      await googleLogin(credential);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-background to-emerald-50 dark:from-green-950/20 dark:via-background dark:to-emerald-950/20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="h-16 w-16 rounded-3xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
            <Sprout className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-black text-foreground">KisanTech</h1>
          <p className="text-muted-foreground mt-1">Smart agricultural tools for Indian farmers</p>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex p-1 bg-muted/50 rounded-2xl mb-6">
          {["Login", "Register"].map((t) => (
            <button
              key={t}
              onClick={() => { setIsLogin(t === "Login"); setError(""); }}
              className={cn(
                "flex-1 py-3 rounded-xl text-sm font-bold transition-all",
                (isLogin ? t === "Login" : t === "Register")
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-[2.5rem] border-primary/10 shadow-2xl space-y-5"
        >
          {/* Google Sign In */}
          <div className="flex flex-col items-center">
            <GoogleLogin
              onSuccess={(res) => {
                if (res.credential) handleGoogle(res.credential);
              }}
              onError={() => setError("Google login was cancelled or failed")}
              useOneTap={false}
              shape="pill"
              size="large"
              text={isLogin ? "signin_with" : "signup_with"}
              theme="outline"
              width="320"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-medium">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Role selector (register only) */}
          <AnimatePresence>
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-2 gap-2 p-1 bg-muted/50 rounded-2xl"
              >
                {[
                  { value: "farmer", label: "I'm a Farmer", icon: Sprout },
                  { value: "owner", label: "I'm an Owner", icon: Tractor },
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setRole(value as any)}
                    className={cn(
                      "py-3 px-2 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2",
                      role === value
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field (register only) */}
            <AnimatePresence>
              {!isLogin && (
                <motion.input
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={set("name")}
                  required={!isLogin}
                  className="w-full px-5 py-4 rounded-2xl border border-input bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              )}
            </AnimatePresence>

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={set("email")}
              required
              className="w-full px-5 py-4 rounded-2xl border border-input bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />

            {/* Phone (register only) */}
            <AnimatePresence>
              {!isLogin && (
                <motion.input
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  type="tel"
                  placeholder="Phone Number (optional)"
                  value={form.phone}
                  onChange={set("phone")}
                  className="w-full px-5 py-4 rounded-2xl border border-input bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              )}
            </AnimatePresence>

            {/* Password */}
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={set("password")}
                required
                className="w-full px-5 py-4 pr-12 rounded-2xl border border-input bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-3 font-medium"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <Button type="submit" className="w-full py-6 rounded-2xl text-base font-bold" disabled={loading}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : isLogin ? "Login →" : "Create Account →"}
            </Button>
          </form>

          {/* Demo accounts hint */}
          <div className="text-center p-4 bg-primary/5 rounded-2xl space-y-1">
            <p className="text-xs font-bold text-primary flex items-center justify-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Demo Accounts
            </p>
            <p className="text-xs text-muted-foreground">👨🌾 ramarao@kisantech.com / farmer123</p>
            <p className="text-xs text-muted-foreground">🚜 suresh@kisantech.com / owner123</p>
            <p className="text-xs text-muted-foreground">🛡️ admin@kisantech.com / admin123</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
