import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Send, ThumbsUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const existingReviews = [
    {
        id: 1,
        user: "Ramarao V.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ramarao",
        equipment: "John Deere 5310 GearPro",
        rating: 5,
        comment: "Excellent tractor! Very powerful and the owner delivered on time. Will definitely rent again for the paddy season.",
        date: "Oct 10, 2023",
        helpful: 12,
        location: "Chittoor, AP",
    },
    {
        id: 2,
        user: "Srinivas K.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=srinivas",
        equipment: "Mahindra 275 DI TU",
        rating: 4,
        comment: "Good tractor for medium fields. Fuel efficient and responsive. Minor trouble with air conditioning but overall great experience.",
        date: "Oct 5, 2023",
        helpful: 8,
        location: "Tirupati, AP",
    },
    {
        id: 3,
        user: "Anita Devi",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anita",
        equipment: "Rotavator - 7 Feet",
        rating: 5,
        comment: "Perfect for soil preparation before sowing. Covered my entire 3 acre field in 4 hours. Very satisfied!",
        date: "Sep 28, 2023",
        helpful: 15,
        location: "Kadapa, AP",
    },
    {
        id: 4,
        user: "Lokesh M.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lokesh",
        equipment: "Swaraj 855 FE",
        rating: 4,
        comment: "Powerful machine but arrived 1 hour late. Owner was cooperative and gave a discount. Tractor performance was excellent.",
        date: "Sep 20, 2023",
        helpful: 5,
        location: "Nellore, AP",
    },
];

const ratingDistribution = [
    { stars: 5, count: 68, percent: 68 },
    { stars: 4, count: 20, percent: 20 },
    { stars: 3, count: 7, percent: 7 },
    { stars: 2, count: 3, percent: 3 },
    { stars: 1, count: 2, percent: 2 },
];

function StarRating({ rating, onRate, size = "md" }: { rating: number; onRate?: (r: number) => void; size?: "sm" | "md" | "lg" }) {
    const [hovered, setHovered] = useState(0);
    const sizeClass = size === "lg" ? "h-8 w-8" : size === "sm" ? "h-4 w-4" : "h-6 w-6";

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onMouseEnter={() => onRate && setHovered(star)}
                    onMouseLeave={() => onRate && setHovered(0)}
                    onClick={() => onRate && onRate(star)}
                    className={cn("transition-transform", onRate ? "cursor-pointer hover:scale-110" : "cursor-default")}
                >
                    <Star
                        className={cn(
                            sizeClass,
                            "transition-colors duration-150",
                            star <= (hovered || rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted-foreground/30"
                        )}
                    />
                </button>
            ))}
        </div>
    );
}

export default function Ratings() {
    const [userRating, setUserRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [helpfulClicked, setHelpfulClicked] = useState<number[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userRating === 0) return;
        setSubmitted(true);
    };

    const handleHelpful = (id: number) => {
        setHelpfulClicked((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    };

    const averageRating = (ratingDistribution.reduce((sum, r) => sum + r.stars * r.count, 0) / 100).toFixed(1);

    return (
        <div className="container mx-auto px-4 py-8 space-y-10">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link to="/dashboard">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Ratings & Reviews</h1>
                    <p className="text-muted-foreground">Farmer feedback on equipment and owners</p>
                </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-3">
                {/* Left: Rating Summary */}
                <div className="space-y-6">
                    {/* Average Score Card */}
                    <Card className="rounded-[2rem] border-primary/10 bg-gradient-to-br from-primary/5 to-transparent shadow-lg overflow-hidden">
                        <CardContent className="p-8 text-center space-y-4">
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Overall Rating</p>
                            <p className="text-8xl font-black text-primary">{averageRating}</p>
                            <StarRating rating={Math.round(parseFloat(averageRating))} size="lg" />
                            <p className="text-sm text-muted-foreground font-medium">Based on 100 reviews</p>
                        </CardContent>
                    </Card>

                    {/* Distribution */}
                    <Card className="rounded-[2rem] border-primary/5 shadow-sm">
                        <CardHeader className="p-6 pb-2">
                            <CardTitle className="text-base font-bold">Rating Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-3 space-y-3">
                            {ratingDistribution.map((item) => (
                                <div key={item.stars} className="flex items-center gap-3">
                                    <span className="text-sm font-bold w-5 text-right">{item.stars}</span>
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400 flex-shrink-0" />
                                    <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.percent}%` }}
                                            transition={{ duration: 0.8, delay: (5 - item.stars) * 0.1 }}
                                            className="h-full bg-amber-400 rounded-full"
                                        />
                                    </div>
                                    <span className="text-xs text-muted-foreground font-medium w-8">{item.percent}%</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Write Review */}
                    <Card className="rounded-[2rem] border-primary/10 shadow-sm">
                        <CardHeader className="p-6 pb-2">
                            <CardTitle className="text-base font-bold">Write a Review</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-3">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-6 space-y-3"
                                >
                                    <div className="h-14 w-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="h-7 w-7 text-green-600" />
                                    </div>
                                    <p className="font-bold text-green-600">Review Submitted!</p>
                                    <p className="text-sm text-muted-foreground">Thank you for your feedback.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <p className="text-sm font-semibold">Your Rating</p>
                                        <StarRating rating={userRating} onRate={setUserRating} size="lg" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-semibold">Your Comment</p>
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Share your experience with the equipment or owner..."
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-2xl border border-input bg-muted/20 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full rounded-xl gap-2"
                                        disabled={userRating === 0 || !comment.trim()}
                                    >
                                        <Send className="h-4 w-4" /> Submit Review
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Reviews List */}
                <div className="lg:col-span-2 space-y-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Recent Reviews</h3>
                        <Badge variant="outline" className="rounded-full px-4">{existingReviews.length} Reviews</Badge>
                    </div>

                    {existingReviews.map((review, idx) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="rounded-[2rem] border-primary/5 hover:border-primary/15 hover:shadow-lg transition-all duration-300">
                                <CardContent className="p-6 space-y-4">
                                    {/* User Info */}
                                    <div className="flex items-start gap-4">
                                        <img src={review.avatar} alt="" className="h-12 w-12 rounded-2xl border bg-muted flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="font-bold">{review.user}</p>
                                                <Badge variant="outline" className="text-[10px] rounded-full">{review.location}</Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground font-medium">{review.date}</p>
                                        </div>
                                        <StarRating rating={review.rating} size="sm" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{review.equipment}</p>
                                        <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>
                                    </div>

                                    <div className="flex items-center gap-2 pt-2 border-t border-border">
                                        <button
                                            onClick={() => handleHelpful(review.id)}
                                            className={cn(
                                                "flex items-center gap-2 text-xs font-medium rounded-full px-4 py-2 transition-all",
                                                helpfulClicked.includes(review.id)
                                                    ? "bg-primary/10 text-primary"
                                                    : "bg-muted/50 text-muted-foreground hover:bg-primary/5 hover:text-primary"
                                            )}
                                        >
                                            <ThumbsUp className="h-3.5 w-3.5" />
                                            Helpful ({review.helpful + (helpfulClicked.includes(review.id) ? 1 : 0)})
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
