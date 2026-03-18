import { motion } from "framer-motion";
import { useSignIn } from "@clerk/clerk-react";
import { Chrome } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function LoginPage() {
  const { signIn, isLoaded } = useSignIn();
  const { t } = useLanguage();

  const handleGoogleLogin = async () => {
    if (!isLoaded) return;
    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  const handleAppleLogin = async () => {
    if (!isLoaded) return;
    await signIn.authenticateWithRedirect({
      strategy: "oauth_apple",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  // Google Icon component
  const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );

  // Apple Icon component
  const AppleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M17.057 10.78c-.045-2.057 1.676-3.045 1.751-3.091-.956-1.398-2.428-1.588-2.952-1.611-1.25-.125-2.435.742-3.069.742-.633 0-1.617-.728-2.67-.708-1.385.02-2.662.805-3.376 2.043-1.44 2.5-.378 6.195 1.033 8.23.69 1.002 1.516 2.126 2.593 2.086 1.036-.041 1.43-.67 2.686-.67s1.61.67 2.705.65c1.114-.02 1.83-1.022 2.513-2.022.788-1.157 1.114-2.277 1.132-2.337-.024-.01-2.174-.834-2.196-3.31zm-1.89-6.315c.563-.683.94-1.632.836-2.58-.813.033-1.8.543-2.384 1.226-.523.606-.98 1.573-.858 2.5.908.07 1.843-.464 2.406-1.146z" />
    </svg>
  );

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0c]">
      {/* ── Floating Animated Background Circles ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 120, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-40 -right-20 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
          className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-green-500/15 rounded-full blur-[100px]"
        />
      </div>

      {/* ── Glassmorphism Login Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md px-8"
      >
        <div className="relative overflow-hidden rounded-[3rem] bg-white/[0.03] backdrop-blur-[40px] border border-white/10 p-10 md:p-14 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] group">
          {/* Subtle reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 space-y-10 text-center">
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl font-black text-white tracking-tighter"
              >
                {t("loginWelcome")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-slate-400 text-lg font-medium"
              >
                {t("loginSubtitle")}
              </motion.p>
            </div>

            <div className="space-y-4 pt-4">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                onClick={handleGoogleLogin}
                disabled={!isLoaded}
                className="w-full h-16 flex items-center justify-center gap-4 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50 group/google"
              >
                <div className="group-hover/google:scale-110 transition-transform duration-300">
                  <GoogleIcon />
                </div>
                {t("loginGoogle")}
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                onClick={handleAppleLogin}
                disabled={!isLoaded}
                className="w-full h-16 flex items-center justify-center gap-4 bg-[#121216] border border-white/5 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#1a1a20] transition-all active:scale-[0.98] disabled:opacity-50 group/apple"
              >
                <div className="group-hover/apple:scale-110 transition-transform duration-300">
                  <AppleIcon />
                </div>
                {t("loginApple")}
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-6"
            >
              <p className="text-[10px] uppercase font-black tracking-[0.4em] text-white/20">
                {t("loginSecured")}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent)] pointer-events-none" />
    </div>
  );
}
