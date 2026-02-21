import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShieldCheck, BadgeIndianRupee, Upload, CheckCircle2, Loader2, FileText, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function SupportForm() {
    const { type } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isIncome = type === "income";
    const title = isIncome ? "Income Support Application" : "Risk & Insurance Application";
    const Icon = isIncome ? BadgeIndianRupee : ShieldCheck;

    const [formData, setFormData] = useState({
        name: "",
        aadhaar: "",
        landSize: "",
        location: "",
        bankAccount: "",
        details: ""
    });

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = () => {
        setIsSubmitting(true);

        const newApplication = {
            id: `APP-${Date.now()}`,
            type: isIncome ? "Income Support" : "Risk Insurance",
            status: "Pending Review",
            date: new Date().toLocaleDateString(),
            ...formData
        };

        const existing = JSON.parse(localStorage.getItem("farmer_applications") || "[]");
        localStorage.setItem("farmer_applications", JSON.stringify([newApplication, ...existing]));

        setTimeout(() => {
            setIsSubmitting(false);
            setStep(4);
        }, 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl min-h-screen">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/dashboard">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div className="flex items-center gap-3">
                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", isIncome ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600")}>
                        <Icon className="h-5 w-5" />
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
                </div>
            </div>

            <Card className="rounded-[2.5rem] border-primary/10 overflow-hidden shadow-xl border-none glass relative">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-muted/30">
                    <motion.div
                        initial={{ width: "33%" }}
                        animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
                        className="h-full bg-primary"
                    />
                </div>

                <CardContent className="p-8 md:p-12">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <User className="h-5 w-5 text-primary" /> Personal Information
                                    </h3>
                                    <p className="text-sm text-muted-foreground">Verify your identity as a registered farmer.</p>
                                </div>
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label>Full Name (as per Aadhaar)</Label>
                                        <Input
                                            placeholder="John Doe"
                                            className="rounded-xl h-12"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Aadhaar Number (Last 4 digits)</Label>
                                        <Input
                                            placeholder="XXXX"
                                            maxLength={4}
                                            className="rounded-xl h-12"
                                            value={formData.aadhaar}
                                            onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <Button className="w-full rounded-2xl py-6 h-auto font-bold text-lg" onClick={handleNext}>
                                    Next Section
                                </Button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-primary" /> Land Details
                                    </h3>
                                    <p className="text-sm text-muted-foreground">Provide information about your farm and its location.</p>
                                </div>
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label>Land Size (in Acres)</Label>
                                        <Input
                                            type="number"
                                            placeholder="e.g. 2.5"
                                            className="rounded-xl h-12"
                                            value={formData.landSize}
                                            onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Location / Mandal</Label>
                                        <Input
                                            placeholder="Chittoor West"
                                            className="rounded-xl h-12"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1 rounded-2xl py-6 h-auto font-bold" onClick={handleBack}>
                                        Back
                                    </Button>
                                    <Button className="flex-2 w-full rounded-2xl py-6 h-auto font-bold text-lg" onClick={handleNext}>
                                        Last Component
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-primary" /> Documentation
                                    </h3>
                                    <p className="text-sm text-muted-foreground">Upload required supporting documents.</p>
                                </div>

                                <div className="border-2 border-dashed border-primary/20 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center space-y-4 bg-primary/5">
                                    <Upload className="h-10 w-10 text-primary" />
                                    <div>
                                        <p className="font-bold">Upload Passbook/Patta</p>
                                        <p className="text-xs text-muted-foreground">PDF, JPG format (Max 5MB)</p>
                                    </div>
                                    <Button size="sm" variant="secondary" className="rounded-full">Select File</Button>
                                </div>

                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1 rounded-2xl py-6 h-auto font-bold" onClick={handleBack} disabled={isSubmitting}>
                                        Back
                                    </Button>
                                    <Button className="flex-2 w-full rounded-2xl py-6 h-auto font-bold text-lg" onClick={handleSubmit} disabled={isSubmitting}>
                                        {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</> : "Submit Application"}
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-8 py-8"
                            >
                                <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto">
                                    <CheckCircle2 className="h-12 w-12" />
                                </div>
                                <div className="space-y-3">
                                    <h2 className="text-3xl font-black">Application Submitted!</h2>
                                    <p className="text-muted-foreground max-w-sm mx-auto">
                                        Your request for {title} has been received. Your Application ID is <strong>APP-{Date.now().toString().slice(-6)}</strong>.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button className="rounded-2xl py-6 h-auto font-bold" onClick={() => navigate("/track-applications")}>
                                        Track My Applications
                                    </Button>
                                    <Button variant="ghost" className="rounded-2xl py-6 h-auto" onClick={() => navigate("/dashboard")}>
                                        Return to Dashboard
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
}
