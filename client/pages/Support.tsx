import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    HeartHandshake,
    MessageSquare,
    History,
    Send,
    ClipboardList,
    ArrowRight,
    CheckCircle2,
    Clock,
    AlertCircle,
    HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { backend } from "@/lib/MockBackend";

export default function Support() {
    const { t } = useLanguage();
    const { user } = useAuth();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<"new" | "history">("new");

    const [formData, setFormData] = useState({
        subject: "",
        category: "General",
        description: ""
    });

    const [requests, setRequests] = useState<any[]>([]);

    useState(() => {
        if (user) {
            setRequests(backend.getApplications(user.phone).filter(app => app.schemeName.includes("Support")));
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        backend.addApplication({
            schemeName: `Support: ${formData.category} - ${formData.subject}`,
            userId: user.phone
        });

        toast({
            title: "Support Request Submitted",
            description: "We have received your request and will get back to you soon.",
        });

        setFormData({ subject: "", category: "General Support", description: "" });
        const updated = backend.getApplications(user.phone).filter(app => app.schemeName.includes("Support"));
        setRequests(updated);
        setActiveTab("history");
    };

    return (
        <div className="container mx-auto px-4 py-8 space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary border border-primary/20 shadow-xl shadow-primary/5">
                    <HeartHandshake className="h-10 w-10" />
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight">{t("supportPortal")}</h1>
                <p className="text-muted-foreground text-xl font-medium">How can we assist you today? Our team is here to help with your farming needs.</p>
            </div>

            <div className="flex justify-center gap-4">
                <Button
                    variant={activeTab === "new" ? "default" : "outline"}
                    onClick={() => setActiveTab("new")}
                    className="rounded-2xl px-8 py-6 h-auto font-bold text-lg"
                >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    {t("newSupportRequest")}
                </Button>
                <Button
                    variant={activeTab === "history" ? "default" : "outline"}
                    onClick={() => setActiveTab("history")}
                    className="rounded-2xl px-8 py-6 h-auto font-bold text-lg"
                >
                    <History className="mr-2 h-5 w-5" />
                    {t("trackSupport")}
                </Button>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === "new" ? (
                    <motion.div
                        key="new"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-2xl mx-auto"
                    >
                        <Card className="rounded-[2.5rem] border-primary/10 shadow-2xl overflow-hidden bg-white">
                            <CardHeader className="p-8 pb-4 text-center border-b border-slate-50">
                                <CardTitle className="text-2xl font-black">Open a New Ticket</CardTitle>
                                <CardDescription>Fill in the details below and we'll respond within 24 hours.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="subject" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Subject</Label>
                                        <Input
                                            id="subject"
                                            placeholder="e.g. Issue with seed booking"
                                            className="h-14 rounded-2xl border-slate-100 bg-slate-50/50"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Category</Label>
                                        <select
                                            id="category"
                                            className="flex h-14 w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option>General Support</option>
                                            <option>Technical Issue</option>
                                            <option>Scheme Application</option>
                                            <option>Market Data Inquiry</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Tell us more about your issue..."
                                            className="min-h-[150px] rounded-2xl border-slate-100 bg-slate-50/50 p-4"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full h-16 rounded-2xl text-xl font-black shadow-xl shadow-primary/20">
                                        {t("submitRequest")}
                                        <Send className="ml-2 h-6 w-6" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                ) : (
                    <motion.div
                        key="history"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-4xl mx-auto space-y-6"
                    >
                        {requests.length === 0 ? (
                            <div className="text-center py-20 glass rounded-[2.5rem]">
                                <ClipboardList className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
                                <p className="text-muted-foreground font-medium">{t("noApps")}</p>
                            </div>
                        ) : (
                            requests.map((req) => (
                                <Card key={req.id} className="rounded-3xl border-primary/5 shadow-sm hover:shadow-xl transition-all overflow-hidden group">
                                    <div className="flex flex-col md:flex-row md:items-center">
                                        <div className="p-8 flex-1 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Badge variant="outline" className="rounded-full px-4 py-1 font-black text-[10px] uppercase tracking-widest bg-primary/5 text-primary border-primary/10">
                                                    {req.id}
                                                </Badge>
                                                <Badge className={cn(
                                                    "rounded-full px-4 py-1 font-black text-[10px] uppercase tracking-widest border-none",
                                                    req.status === "Approved" || req.status === "Resolved" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                                                )}>
                                                    {req.status}
                                                </Badge>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black group-hover:text-primary transition-colors">{req.schemeName.replace("Support: ", "")}</h3>
                                                <p className="text-sm text-muted-foreground font-medium flex items-center gap-2 mt-1">
                                                    <Clock className="h-4 w-4" /> Submitted on {req.date}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-8 md:border-l border-slate-50 bg-slate-50/30 flex items-center justify-center">
                                            <Button variant="ghost" className="rounded-xl font-bold gap-2">
                                                View Details <ArrowRight className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 pt-12">
                {[
                    { icon: HelpCircle, title: "Help Center", desc: "Detailed guides", link: "/help" },
                    { icon: ClipboardList, title: "Documents", desc: "Manage land records", link: "/dashboard" },
                    { icon: AlertCircle, title: "Urgent Help", desc: "1800-111-222", link: "tel:1800111222" },
                    { icon: MessageSquare, title: "Chatbot", desc: "AI Farming Bot", link: "/chat" }
                ].map((item, i) => (
                    <Card key={i} className="rounded-3xl border-primary/5 hover:border-primary/20 transition-all cursor-pointer p-6 space-y-4 group">
                        <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <item.icon className="h-7 w-7" />
                        </div>
                        <div>
                            <h4 className="font-black text-lg">{item.title}</h4>
                            <p className="text-sm text-muted-foreground font-medium">{item.desc}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
