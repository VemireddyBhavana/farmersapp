import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sprout, Droplets, Leaf, Bug, Hammer, Sun, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";

const cropData: Record<string, any> = {
  rice: {
    name: "Rice (Paddy)",
    image: "https://images.unsplash.com/photo-1536633310979-b864bad0f287?auto=format&fit=crop&q=80&w=800",
    sections: [
      {
        title: "Soil Preparation",
        icon: Hammer,
        content: "Rice grows best in fertile, clayey or loamy soils that can retain water. The field should be ploughed 2-3 times and puddled with 5-10 cm of standing water to create an impervious layer."
      },
      {
        title: "Seed Selection",
        icon: Sprout,
        content: "Choose high-yielding varieties (HYV) like IR-64, BPT-5204, or local preferred hybrids. Seeds should be salt-water tested; only heavy, healthy seeds that sink should be used."
      },
      {
        title: "Sowing Process",
        icon: Leaf,
        content: "Transplanting is the most common method. Raise a nursery for 25-30 days. Plant 2-3 seedlings per hill at a depth of 2-3 cm with 20x15 cm spacing."
      },
      {
        title: "Irrigation Schedule",
        icon: Droplets,
        content: "Maintain 5 cm of standing water during the entire vegetative phase. Drain the water 10-15 days before harvest to allow uniform ripening."
      },
      {
        title: "Fertilizer Guidance",
        icon: Sun,
        content: "Apply NPK in 120:60:60 ratio. Apply half Nitrogen and full P&K as basal dose. Top dress remaining Nitrogen in two splits during tillering and panicle initiation."
      },
      {
        title: "Pest Control",
        icon: Bug,
        content: "Common pests include Stem Borer and Brown Plant Hopper. Use Neem oil for organic control or Carbofuran for chemical control. Maintain proper spacing to reduce humidity."
      }
    ]
  },
  cotton: {
    name: "Cotton",
    image: "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&q=80&w=800",
    sections: [
      {
        title: "Soil Preparation",
        icon: Hammer,
        content: "Deep black soils (Regur) are ideal. Ensure good drainage. Plough deeply during summer to kill hibernating pests and weeds."
      },
      {
        title: "Seed Selection",
        icon: Sprout,
        content: "Use Bt Cotton seeds for resistance against bollworms. Ensure seeds are certified and have at least 75% germination rate."
      },
      {
        title: "Sowing Process",
        icon: Leaf,
        content: "Sow during May-June with the onset of monsoon. Use a seed rate of 2-3 kg/acre for hybrids. Maintain 90x60 cm or 120x60 cm spacing."
      },
      {
        title: "Irrigation Schedule",
        icon: Droplets,
        content: "Cotton is a rain-fed crop but requires supplemental irrigation during flowering and boll formation stages if rain fails."
      },
      {
        title: "Fertilizer Guidance",
        icon: Sun,
        content: "Balanced NPK application. Apply organic manure (FYM) @ 5 tons/acre. Use Zinc Sulphate to prevent leaf reddening."
      },
      {
        title: "Pest Control",
        icon: Bug,
        content: "Major threat is Pink Bollworm and Aphids. Use pheromone traps for monitoring. Apply Imidacloprid for sucking pests if thresholds are crossed."
      }
    ]
  },
  pulses: {
    name: "Pulses (Red Gram/Moong)",
    image: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=800",
    sections: [
      {
        title: "Soil Preparation",
        icon: Hammer,
        content: "Well-drained sandy loam soils are best. Pulses do not tolerate waterlogging. One deep ploughing followed by two harrowings is sufficient."
      },
      {
        title: "Seed Selection",
        icon: Sprout,
        content: "Treat seeds with Rhizobium culture to enhance nitrogen fixation. Choose short-duration varieties for intercropping."
      },
      {
        title: "Sowing Process",
        icon: Leaf,
        content: "Line sowing is recommended. Spacing should be 30x10 cm. Sowing depth should not exceed 5 cm."
      },
      {
        title: "Irrigation Schedule",
        icon: Droplets,
        content: "Critical stages for irrigation are flower initiation and pod filling. Avoid irrigation during peak flowering to prevent flower drop."
      },
      {
        title: "Fertilizer Guidance",
        icon: Sun,
        content: "Require less Nitrogen as they fix their own. Apply Diammonium Phosphate (DAP) @ 50kg/acre at the time of sowing."
      },
      {
        title: "Pest Control",
        icon: Bug,
        content: "Watch out for Pod Borers. Use light traps and bird perches. Spray NPV (Nuclear Polyhedrosis Virus) for biological control."
      }
    ]
  }
};

export default function GrowingGuide() {
  const [searchParams] = useSearchParams();
  const cropKey = searchParams.get("crop") || "rice";
  const { t } = useLanguage();

  const data = cropData[cropKey] || cropData.rice;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link to="/weather">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" /> {t("home")}
        </Button>
      </Link>

      <div className="relative h-64 md:h-96 rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
        <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 md:p-12">
          <div className="space-y-2">
            <Badge className="bg-emerald-500 text-white border-none px-4 py-1">Featured Guide</Badge>
            <h1 className="text-4xl md:text-6xl font-black text-white">{data.name} {t("growingGuide")}</h1>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {data.sections.map((section: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full rounded-[2rem] border-primary/5 hover:border-primary/20 transition-all hover:shadow-xl group overflow-hidden">
              <CardHeader className="p-8 pb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <section.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl font-black">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-12 rounded-[3rem] bg-primary text-white text-center space-y-6">
        <h2 className="text-3xl font-black">Need More Specific Advice?</h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
          Ask our AgriAI assistant about your specific soil test results or regional weather conditions for personalized guidance.
        </p>
        <Link to="/chat">
          <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-lg font-bold">
            Chat with AgriAI
          </Button>
        </Link>
      </div>
    </div>
  );
}
