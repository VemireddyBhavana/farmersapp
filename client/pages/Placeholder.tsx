import { motion } from "framer-motion";
import { Hammer, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PlaceholderProps {
  title: string;
  description?: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-12 rounded-[3rem] border-primary/10 max-w-2xl w-full space-y-8"
      >
        <div className="mx-auto h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center">
          <Hammer className="h-10 w-10 text-primary animate-pulse" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            {title} is Coming Soon!
          </h1>
          <p className="text-lg text-muted-foreground">
            {description || "I'm currently building this part of the Smart Farmer app. Please continue prompting to help me fill in the content and features for this page!"}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/">
            <Button className="rounded-full px-8 py-6">
              Back to Home
            </Button>
          </Link>
          <Button variant="outline" className="rounded-full px-8 py-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Suggest Features
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
