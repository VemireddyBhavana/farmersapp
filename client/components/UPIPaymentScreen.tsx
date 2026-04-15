import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, QrCode, ShieldCheck, CheckCircle2, Loader2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";

interface PaymentScreenProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: any;
  onSuccess: () => void;
}

const UPIPaymentScreen: React.FC<PaymentScreenProps> = ({ isOpen, onClose, mentor, onSuccess }) => {
  const { t } = useLanguage();
  const [paymentStatus, setPaymentStatus] = React.useState<"idle" | "processing" | "success">("idle");

  const simulatePayment = () => {
    setPaymentStatus("processing");
    setTimeout(() => {
      setPaymentStatus("success");
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="relative p-10 flex flex-col items-center text-center">
              <button 
                onClick={onClose}
                className="absolute right-6 top-6 h-10 w-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                disabled={paymentStatus !== "idle"}
              >
                <X className="h-6 w-6" />
              </button>

              <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary/10">
                <CreditCard className="h-8 w-8" />
              </div>

              <h2 className="text-3xl font-black mb-2">{t("paymentScanner")}</h2>
              <p className="text-muted-foreground mb-8">{t("payFee")} ₹{mentor?.price}</p>

              <div className="relative p-8 bg-white rounded-[2rem] border-2 border-primary/10 mb-8 shadow-inner overflow-hidden">
                {paymentStatus === "idle" ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                    <QrCode className="h-48 w-48 text-slate-900" />
                    <div className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">{t("scanToPay")}</div>
                  </motion.div>
                ) : paymentStatus === "processing" ? (
                  <div className="h-48 w-48 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    <div className="text-xs font-bold text-primary animate-pulse uppercase tracking-[0.2em]">{t("verifyingPayment")}</div>
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="h-48 w-48 flex flex-col items-center justify-center gap-4">
                    <CheckCircle2 className="h-16 w-16 text-emerald-500" />
                    <div className="text-sm font-black text-emerald-600 uppercase tracking-widest">{t("paymentSuccess")}</div>
                  </motion.div>
                )}
              </div>

              <div className="w-full space-y-4">
                <div className="p-4 bg-muted/50 rounded-xl border border-border/50 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t("mentorLabel")}</span>
                    <span className="text-xs font-bold">{mentor?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t("upiIdLabel")}</span>
                    <span className="text-xs font-bold">farmersapp@upi</span>
                  </div>
                </div>

                {paymentStatus === "idle" && (
                   <Button 
                    onClick={simulatePayment}
                    className="w-full h-16 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black uppercase text-sm tracking-widest shadow-lg shadow-slate-900/20"
                   >
                    {t("simulatePaymentBtn")}
                   </Button>
                )}
              </div>

              <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                {t("pciCompliant")} • {t("encryptionLabel")}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UPIPaymentScreen;
