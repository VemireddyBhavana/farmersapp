import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Mail, Phone, User, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: any;
  onProceed: (details: any) => void;
}

const MentorBookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, mentor, onProceed }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onProceed(formData);
      setIsSubmitting(false);
    }, 1000);
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
              >
                <X className="h-6 w-6" />
              </button>

              <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary/10">
                <ShieldCheck className="h-8 w-8" />
              </div>

              <h2 className="text-3xl font-black mb-2">{t("bookSession")}</h2>
              <p className="text-muted-foreground mb-8">{t("with")} {mentor?.name}</p>

              <div className="w-full bg-muted/50 rounded-2xl p-6 mb-8 flex items-center justify-between border border-border/50">
                <span className="font-bold text-muted-foreground">{t("sessionFee")}</span>
                <span className="text-2xl font-black text-primary">₹{mentor?.price}</span>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    required
                    placeholder={t("fullName")}
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="h-14 pl-12 rounded-xl bg-background border-border"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    required
                    type="email"
                    placeholder={t("emailAddress")}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="h-14 pl-12 rounded-xl bg-background border-border"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    required
                    type="tel"
                    placeholder={t("phoneNumber")}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="h-14 pl-12 rounded-xl bg-background border-border"
                  />
                </div>

                <Button 
                  disabled={isSubmitting}
                  className="w-full h-16 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase text-sm tracking-widest shadow-lg shadow-primary/20 group mt-4"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : (
                    <>
                      {t("proceedToPay")} ₹{mentor?.price}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                {t("securePayment")} • {t("refundable")}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MentorBookingModal;
