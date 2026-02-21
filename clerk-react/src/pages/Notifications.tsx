import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Bell, CheckCircle2, Tractor, Cloud, IndianRupee,
    AlertCircle, BookOpen, Check, Trash2, BellOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const typeConfig: Record<string, { icon: any; bg: string; accent: string }> = {
    booking: { icon: Tractor, bg: "bg-green-50", accent: "text-green-600" },
    weather: { icon: Cloud, bg: "bg-blue-50", accent: "text-blue-600" },
    market: { icon: IndianRupee, bg: "bg-amber-50", accent: "text-amber-600" },
    alert: { icon: AlertCircle, bg: "bg-red-50", accent: "text-red-600" },
    scheme: { icon: BookOpen, bg: "bg-purple-50", accent: "text-purple-600" },
};

const initialNotifications = [
    {
        id: 1,
        type: "booking",
        title: "Booking Confirmed!",
        message: "Your booking for John Deere 5310 on Oct 15 has been confirmed by the owner.",
        time: "2 mins ago",
        read: false,
    },
    {
        id: 2,
        type: "weather",
        title: "Rain Alert 🌧️",
        message: "Heavy rainfall expected in Chittoor district in the next 48 hours. Plan your harvesting accordingly.",
        time: "1 hour ago",
        read: false,
    },
    {
        id: 3,
        type: "market",
        title: "Tomato Prices Surged!",
        message: "Tomato prices at Tirupati Mandi jumped by ₹400 today. Check latest market rates.",
        time: "3 hours ago",
        read: false,
    },
    {
        id: 4,
        type: "scheme",
        title: "PM-Kisan Installment Due",
        message: "Your next PM-Kisan installment of ₹2,000 is due in November. Ensure your Aadhaar is linked.",
        time: "Yesterday",
        read: false,
    },
    {
        id: 5,
        type: "alert",
        title: "Owner Rejected Request",
        message: "Your rental request for Rotavator on Oct 14 was declined. Try another owner nearby.",
        time: "Yesterday",
        read: true,
    },
    {
        id: 6,
        type: "booking",
        title: "Booking Completed ✅",
        message: "Your rental of Mahindra 275 DI on Oct 10 has been marked complete. Rate your experience!",
        time: "2 days ago",
        read: true,
    },
    {
        id: 7,
        type: "market",
        title: "Groundnut Rates Up",
        message: "Groundnut prices moved up by ₹320/quintal at Chittoor Mandi this morning.",
        time: "3 days ago",
        read: true,
    },
];

export default function Notifications() {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [filter, setFilter] = useState<"all" | "unread">("all");

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const markRead = (id: number) => {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    };

    const deleteNotification = (id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link to="/dashboard">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-extrabold tracking-tight">Notifications</h1>
                        {unreadCount > 0 && (
                            <Badge className="bg-primary text-primary-foreground rounded-full px-3">
                                {unreadCount} New
                            </Badge>
                        )}
                    </div>
                    <p className="text-muted-foreground">Bookings, market alerts, and farming updates</p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
                <div className="flex gap-2 p-1 bg-muted/40 rounded-full">
                    {(["all", "unread"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-5 py-2 rounded-full text-sm font-semibold transition-all capitalize",
                                filter === f ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:bg-primary/5 gap-2 rounded-full"
                    onClick={markAllRead}
                    disabled={unreadCount === 0}
                >
                    <Check className="h-4 w-4" />
                    Mark all read
                </Button>
            </div>

            {/* Notification List */}
            <div className="space-y-3">
                <AnimatePresence>
                    {filtered.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 glass rounded-3xl space-y-4"
                        >
                            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                                <BellOff className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <p className="text-xl font-bold">You're all caught up!</p>
                            <p className="text-muted-foreground text-sm">No {filter === "unread" ? "unread " : ""}notifications.</p>
                        </motion.div>
                    ) : (
                        filtered.map((notif, idx) => {
                            const cfg = typeConfig[notif.type];
                            return (
                                <motion.div
                                    key={notif.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => markRead(notif.id)}
                                    className={cn(
                                        "flex items-start gap-4 p-5 rounded-[1.5rem] border transition-all cursor-pointer group",
                                        notif.read
                                            ? "bg-background border-border hover:bg-muted/30"
                                            : "bg-primary/5 border-primary/20 hover:bg-primary/10"
                                    )}
                                >
                                    <div className={cn("h-11 w-11 rounded-2xl flex items-center justify-center flex-shrink-0", cfg.bg)}>
                                        <cfg.icon className={cn("h-5 w-5", cfg.accent)} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-sm text-foreground">{notif.title}</p>
                                            {!notif.read && (
                                                <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{notif.message}</p>
                                        <p className="text-xs text-muted-foreground/60 mt-2 font-medium">{notif.time}</p>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive p-1.5 rounded-full hover:bg-destructive/10"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </motion.div>
                            );
                        })
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
