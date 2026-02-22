import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";

export default function Contact() {
    const { t } = useLanguage();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast({
                title: t("messageSent"),
                description: t("messageSentDesc"),
            });
            (e.target as HTMLFormElement).reset();
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-16 space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                    {t("contactSupport")}
                </h1>
                <p className="text-muted-foreground text-lg">
                    {t("contactDesc")}
                </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
                <div className="space-y-8">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <Card className="rounded-[2rem] border-primary/5 bg-muted/30">
                            <CardContent className="p-8 space-y-4">
                                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold">{t("callUs")}</h3>
                                    <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="rounded-[2rem] border-primary/5 bg-muted/30">
                            <CardContent className="p-8 space-y-4">
                                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold">{t("emailUs")}</h3>
                                    <p className="text-sm text-muted-foreground">support@techspark.ai</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="rounded-[2rem] border-primary/5 bg-muted/30">
                        <CardContent className="p-8 flex gap-6 items-start">
                            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold">{t("visitOffice")}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    TechSpark AI Hub, Sector 45,<br />
                                    Agro-Technology Park, Hyderabad,<br />
                                    Telangana - 500081, India
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-8 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-emerald-600">
                            <ShieldCheck className="h-6 w-6" />
                            {t("farmerProtection")}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {t("farmerProtectionDesc")}
                        </p>
                    </div>
                </div>

                <Card className="rounded-[2.5rem] border-primary/10 shadow-2xl glass overflow-hidden">
                    <CardContent className="p-10 space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black">{t("sendMessage")}</h2>
                            <p className="text-sm text-muted-foreground">{t("sendMessageDesc")}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t("nameLabel")}</label>
                                    <Input placeholder={t("yourFullName")} className="rounded-xl h-14 bg-white/50 border-primary/10" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t("phoneLabel")}</label>
                                    <Input placeholder={t("mobileNumber")} className="rounded-xl h-14 bg-white/50 border-primary/10" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t("subjectLabel")}</label>
                                <Input placeholder={t("whatCanWeHelp")} className="rounded-xl h-14 bg-white/50 border-primary/10" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t("messageLabel")}</label>
                                <Textarea placeholder={t("describeIssue")} className="rounded-2xl min-h-[150px] bg-white/50 border-primary/10" required />
                            </div>
                            <Button disabled={loading} className="w-full rounded-xl py-8 text-lg font-black shadow-xl shadow-primary/20 flex items-center gap-2">
                                <Send className="h-5 w-5" />
                                {loading ? t("sending") : t("sendBtn")}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
