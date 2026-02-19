import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Tractor, Shield, Clock, MapPin, ArrowRight, Star, TrendingUp, Cloud, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Tractor,
    title: "Premium Equipment",
    description: "Access to the latest and most efficient tractors and farm tools.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Shield,
    title: "Verified Owners",
    description: "Every piece of equipment is verified for quality and performance.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Clock,
    title: "Flexible Rental",
    description: "Rent by the hour, day, or season. Scale your farm as needed.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: MapPin,
    title: "Nearby Availability",
    description: "Find equipment available in your local district or village.",
    color: "bg-red-100 text-red-600",
  },
];

const stats = [
  { label: "Active Farmers", value: "10,000+" },
  { label: "Tractors Listed", value: "2,500+" },
  { label: "Districts Covered", value: "150+" },
  { label: "Average Rating", value: "4.9/5" },
];

export default function Index() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(22,101,52,0.1)_0%,rgba(255,255,255,0)_100%)]" />
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-1 text-sm font-medium">
                🌾 Revolutionizing Indian Farming
              </Badge>
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground lg:text-7xl">
                Smart Tools for <br />
                <span className="text-primary italic">Smarter Farmers</span>
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground lg:text-xl">
                Rent high-quality tractors, get expert AI-driven farming advice, and boost your harvest with Smart Farmer.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/rent">
                  <Button className="rounded-full px-8 py-6 text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                    Book a Tractor
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button variant="outline" className="rounded-full px-8 py-6 text-lg">
                    How it Works
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-background bg-muted overflow-hidden"
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`}
                        alt="User"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="font-medium text-muted-foreground">Loved by 10k+ Farmers</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative lg:ml-12"
            >
              <div className="relative aspect-square max-w-[500px] mx-auto overflow-hidden rounded-[2rem] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1594398044700-1482072f80c2?auto=format&fit=crop&q=80&w=800"
                  alt="Modern Tractor"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-2xl">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs opacity-80 uppercase tracking-widest">Featured Equipment</p>
                      <h4 className="text-lg font-bold">John Deere 5310 GearPro</h4>
                    </div>
                    <Badge className="bg-primary/90">₹800/hr</Badge>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 glass p-4 rounded-2xl hidden md:block"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Yield Growth</p>
                    <p className="text-sm font-bold">+24% This Season</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-10 -left-6 glass p-4 rounded-2xl hidden md:block"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center text-white">
                    <Cloud className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Next Rain</p>
                    <p className="text-sm font-bold">In 2 Days</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              Why Choose Smart Farmer?
            </h2>
            <p className="text-muted-foreground">
              We provide the tools and technology to make modern farming accessible and profitable for everyone.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <motion.div
                whileHover={{ y: -10 }}
                key={idx}
                className="glass p-8 rounded-3xl text-left border-transparent hover:border-primary/20 transition-all cursor-default group"
              >
                <div className={cn("mb-6 inline-flex p-3 rounded-2xl", feature.color)}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-4 sm:grid-cols-2">
            {stats.map((stat, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                key={idx}
                className="text-center space-y-2"
              >
                <h4 className="text-4xl font-extrabold text-primary">{stat.value}</h4>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="rounded-[3rem] bg-primary overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Leaf className="h-64 w-64 rotate-45" />
            </div>
            <div className="grid items-center gap-12 p-12 lg:grid-cols-2 lg:p-24">
              <div className="space-y-6 text-primary-foreground relative z-10">
                <h2 className="text-3xl font-extrabold tracking-tight lg:text-5xl leading-tight">
                  Need Help Choosing <br /> the Right Equipment?
                </h2>
                <p className="text-lg text-primary-foreground/80 max-w-lg">
                  Our AI Farming Assistant is ready to help you 24/7. Get advice in Telugu, Hindi, or English.
                </p>
                <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-lg">
                  Chat with AgriAI
                </Button>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative h-64 w-64 md:h-80 md:w-80">
                  <div className="absolute inset-0 rounded-full bg-white/10 animate-ping opacity-20" />
                  <div className="absolute inset-4 rounded-full bg-white/20 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="https://api.dicebear.com/7.x/bottts/svg?seed=smartfarmer"
                      alt="AI Assistant"
                      className="h-40 w-40 drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Suite Section */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-8"
            >
              <h2 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight">
                More than just <span className="text-primary italic">Rentals.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Smart Farmer provides a complete digital suite designed specifically for the needs of Indian agriculture. Manage your crops, detect pests, and track government schemes all in one place.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { title: "Farming Calendar", desc: "Track sowing and harvests", path: "/calendar" },
                  { title: "Pest Detection", desc: "AI-powered plant health", path: "/pests" },
                  { title: "Agri Schemes", desc: "Live government support", path: "/agri-schemes" },
                  { title: "Mandi Rates", desc: "Real-time crop pricing", path: "/market" }
                ].map((item, i) => (
                  <Link key={i} to={item.path} className="group">
                    <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all h-full">
                      <h4 className="font-black text-primary group-hover:translate-x-1 transition-transform">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="aspect-video rounded-[3rem] bg-primary/10 border border-primary/10 shadow-2xl overflow-hidden relative group">
                <img
                  src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800"
                  alt="Farmer using tablet"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Smart Dashboard</p>
                  <h3 className="text-3xl font-black">Empowering Villages</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              How it Works
            </h2>
            <p className="text-muted-foreground">
              Getting the right equipment for your farm is easier than ever.
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {[
              { step: "01", title: "Browse & Select", desc: "Choose from a wide range of tractors and tools near you." },
              { step: "02", title: "Book Instantly", desc: "Select dates, check prices, and confirm your booking securely." },
              { step: "03", title: "Happy Farming", desc: "Equipment is delivered or ready for pickup. Start your work!" },
            ].map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="mb-6 text-8xl font-black text-primary/5 group-hover:text-primary/10 transition-colors absolute -top-10 left-1/2 -translate-x-1/2">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">{step.title}</h3>
                <p className="text-muted-foreground relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
