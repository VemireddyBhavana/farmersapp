import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Filter, Clock, ChevronRight, FileText, BadgeIndianRupee, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
export default function TrackApplications() {
    const [applications, setApplications] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("farmer_applications") || "[]");
        setApplications(stored);
    }, []);

    const filtered = applications.filter(app =>
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8 space-y-8 min-h-screen">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/dashboard">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Track Applications</h1>
                    <p className="text-muted-foreground">Monitor the status of your submitted support requests</p>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-4">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by ID or Type..."
                            className="pl-10 rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Card className="rounded-[2rem] border-primary/10 overflow-hidden shadow-sm">
                        <CardHeader className="p-6 border-b">
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <Filter className="h-4 w-4" /> Filter Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-2">
                            {["All", "Pending Review", "Approved", "In Progress", "Rejected"].map(status => (
                                <Button
                                    key={status}
                                    variant="ghost"
                                    className="w-full justify-start rounded-xl font-medium"
                                >
                                    {status}
                                </Button>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2rem] border-primary/10 bg-primary/5 p-6 animate-pulse">
                        <div className="flex items-center gap-3 text-primary mb-2">
                            <Clock className="h-5 w-5" />
                            <h4 className="font-bold">Next Update In</h4>
                        </div>
                        <p className="text-2xl font-black">2 Days</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Expected official review</p>
                    </Card>
                </div>

                {/* Applications List */}
                <div className="lg:col-span-3 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filtered.length > 0 ? (
                            filtered.map((app, idx) => (
                                <motion.div
                                    key={app.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Card className="group rounded-[2rem] border-primary/5 hover:border-primary/20 transition-all hover:shadow-lg overflow-hidden cursor-pointer">
                                        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                                            <div className={cn(
                                                "h-16 w-16 rounded-2xl flex items-center justify-center shrink-0",
                                                app.type.includes("Income") ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                                            )}>
                                                {app.type.includes("Income") ? <BadgeIndianRupee className="h-8 w-8" /> : <ShieldCheck className="h-8 w-8" />}
                                            </div>

                                            <div className="flex-1 space-y-1 text-center md:text-left">
                                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                                                    <h3 className="text-xl font-black">{app.type}</h3>
                                                    <Badge className={cn(
                                                        "rounded-full font-bold",
                                                        app.status === "Pending Review" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                                                    )}>
                                                        {app.status}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-muted-foreground font-medium">
                                                    <span className="flex items-center gap-1 font-bold"><FileText className="h-3 w-3" /> ID: {app.id}</span>
                                                    <span>Submitted on: {app.date}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center md:items-end gap-2">
                                                <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary w-1/3" />
                                                </div>
                                                <p className="text-[10px] font-bold text-muted-foreground">33% Complete</p>
                                            </div>

                                            <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all hidden md:block" />
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-20 glass rounded-[3rem] border-primary/5 space-y-6">
                                <div className="h-24 w-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
                                    <FileText className="h-12 w-12 text-muted-foreground opacity-20" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">No Applications Found</h3>
                                    <p className="text-muted-foreground max-w-xs mx-auto text-sm">You haven't submitted any applications or your search didn't match.</p>
                                </div>
                                <Link to="/schemes">
                                    <Button variant="outline" className="rounded-full px-8">Find Schemes</Button>
                                </Link>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
