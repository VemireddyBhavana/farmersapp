import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Tractor, Shield, Clock, MapPin, ArrowRight, Star, TrendingUp, Cloud, Leaf, Play } from "lucide-react";
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
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=2000"
            alt="Farming Grains"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center space-y-8"
          >
            {/* Centered Icon Box */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-20 h-20 rounded-3xl glass-dark flex items-center justify-center border border-white/20 shadow-2xl"
            >
              <Leaf className="h-10 w-10 text-emerald-400" />
            </motion.div>

            <div className="space-y-4 max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1]">
                Grow Smarter. <br />
                <span className="text-yellow-400">Farm Better.</span> <br />
                <span className="text-emerald-400">Thrive Together.</span>
              </h1>

              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 font-medium">
                Empowering farmers with smart technology for sustainable agriculture.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to="/rent">
                <Button className="rounded-full px-10 py-7 text-lg bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-900/40 border-none transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                  <Play className="h-4 w-4 fill-current" />
                  Get Started Today
                </Button>
              </Link>
              <Button variant="ghost" className="rounded-full px-10 py-7 text-lg text-white hover:bg-white/10 glass-dark border-white/20 transition-all">
                Watch Demo <ArrowRight className="ml-2 h-5 w-5 opacity-70" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute bottom-10 left-10 hidden lg:block">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="glass-dark p-4 rounded-2xl border border-white/10"
          >
            <div className="flex items-center space-x-3 text-white">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <TrendingUp className="h-4 w-4" />
              </div>
              <p className="text-sm font-bold">2.4k+ Farmers Joined Today</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl uppercase tracking-widest text-primary/60 text-sm mb-2">
              Our Ecosystem
            </h2>
            <h3 className="text-4xl lg:text-5xl font-black text-foreground">
              Why Choose AgriPath?
            </h3>
            <p className="text-muted-foreground text-lg">
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
                More than just <span className="text-emerald-500 italic">Rentals.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                AgriPath provides a complete digital suite designed specifically for the needs of Indian agriculture. Manage your crops, detect pests, and track government schemes all in one place.
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
