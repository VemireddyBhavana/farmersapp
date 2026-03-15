import { SignIn, SignUp } from "@clerk/clerk-react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Leaf } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Auth() {
  const location = useLocation();
  const isRegister = location.pathname === "/register";
  const { t } = useLanguage();

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4 bg-muted/10 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <Leaf className="h-96 w-96 rotate-12 text-emerald-500" />
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10 flex flex-col items-center">
        <div className="text-center space-y-4 mb-4">
          <Link to="/" className="inline-flex items-center space-x-2 text-primary hover:opacity-80 transition-all mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">{t('backToHome')}</span>
          </Link>
          <div className="mx-auto h-16 w-16 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-500/20">
            <Leaf className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-600">
            AgriPath
          </h1>
        </div>

        {isRegister ? (
          <SignUp
            routing="path"
            path="/register"
            signInUrl="/login"
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "rounded-[2.5rem] border-primary/10 shadow-2xl glass",
              }
            }}
          />
        ) : (
          <SignIn
            routing="path"
            path="/login"
            signUpUrl="/register"
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "rounded-[2.5rem] border-primary/10 shadow-2xl glass",
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
