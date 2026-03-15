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
    image: "/hero_rice_field.png",
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
    image: "/cotton_field.png",
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
  tomato: { // Using tomato as the representative vegetable key
    name: "Vegetables (Tomato)",
    image: "/tomato_farming.png",
    sections: [
      {
        title: "Soil Preparation",
        icon: Hammer,
        content: "Requires well-drained, sandy loam soil with good organic matter. Maintain pH between 6.0 and 7.0. Deep ploughing followed by harrowing is recommended."
      },
      {
        title: "Seed Selection",
        icon: Sprout,
        content: "Choose high-yielding, disease-resistant hybrid varieties suited for your region. Treat seeds with Trichoderma before nursery sowing."
      },
      {
        title: "Sowing Process",
        icon: Leaf,
        content: "Sow in protrays or raised nursery beds. Transplant 25-30 day old healthy seedlings at a spacing of 60x45 cm or 90x60 cm depending on the variety."
      },
      {
        title: "Irrigation Schedule",
        icon: Droplets,
        content: "Drip irrigation is highly recommended for vegetables. Maintain optimal moisture; avoid waterlogging. Critical stages are flowering and fruit development."
      },
      {
        title: "Fertilizer Guidance",
        icon: Sun,
        content: "Apply basal dose of organic manure and NPK (e.g., 50:50:50 kg/ha). Top dress with Nitrogen and Potassium through fertigation during active growth and fruiting."
      },
      {
        title: "Pest Control",
        icon: Bug,
        content: "Monitor for fruit borers, whiteflies, and leaf miners. Use yellow sticky traps. Employ Integrated Pest Management (IPM) practices, prioritizing organic biopesticides."
      }
    ]
  },
  pulses: {
    name: "Pulses (Red Gram/Moong)",
    image: "/pulses_farm.png",
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
  },
  wheat: {
    name: "Wheat",
    image: "/wheat_field.png",
    sections: [
      {
        title: "Soil Preparation",
        icon: Hammer,
        content: "Wheat requires well-pulverized but compact seedbed for uniform germination. Deep ploughing followed by 2-3 harrowings and planking is ideal."
      },
      {
        title: "Seed Selection",
        icon: Sprout,
        content: "Use certified seeds like Sonalika or HD-2967. Seed treatment with Vitavax or Thiram is essential to prevent seed-borne diseases."
      },
      {
        title: "Sowing Process",
        icon: Leaf,
        content: "Line sowing using seed drill is recommended. Spacing should be 22.5 cm apart with a depth of 4-5 cm. Best time is November for Rabi."
      },
      {
        title: "Irrigation Schedule",
        icon: Droplets,
        content: "Needs 4-6 irrigations. Crown Root Initiation (CRI) stage (21 days after sowing) is most critical, followed by tillering and flowering."
      },
      {
        title: "Fertilizer Guidance",
        icon: Sun,
        content: "Apply NPK in 120:60:40 ratio. Full P&K and half N as basal dose. Remaining N top-dressed after first and second irrigation."
      },
      {
        title: "Pest Control",
        icon: Bug,
        content: "Watch for Termites and Aphids. Treat soil with Chlorpyrifos before sowing if termites are present. Spray Imidacloprid for aphids."
      }
    ]
  },
  chili: {
    name: "Chili",
    image: "/chili_plant.png",
    sections: [
      {
        title: "Soil Preparation",
        icon: Hammer,
        content: "Thrives in well-drained, fertile loamy soil. Add well-rotted FYM during land preparation. Bring soil to fine tilth with repeated ploughing."
      },
      {
        title: "Seed Selection",
        icon: Sprout,
        content: "Select high-yielding hybrids. Treat seeds with Trichoderma viride to prevent damping off in nursery beds."
      },
      {
        title: "Sowing Process",
        icon: Leaf,
        content: "Raise seedlings in nursery beds for 35-40 days. Transplant at 60x45cm spacing on ridges for better root development."
      },
      {
        title: "Irrigation Schedule",
        icon: Droplets,
        content: "Requires light and frequent irrigation. Withhold water slightly before flowering to induce more flowers. Drip irrigation is highly recommended."
      },
      {
        title: "Fertilizer Guidance",
        icon: Sun,
        content: "Apply NPK 120:60:60 kg/ha. Apply micronutrient spray (Zinc and Boron) during flowering to reduce flower drop."
      },
      {
        title: "Pest Control",
        icon: Bug,
        content: "Thrips and Mites cause leaf curl. Use sticky traps. Spray Spinosad or Abamectin as per threshold levels."
      }
    ]
  },
  mango: {
    name: "Mango",
    image: "/mango_orchard.png",
    sections: [
      {
        title: "Soil Preparation",
        icon: Hammer,
        content: "Requires deep, well-drained soils. Dig pits of 1x1x1m and expose them to the sun for a month. Fill with topsoil mixed with FYM and bone meal."
      },
      {
        title: "Seed Selection",
        icon: Sprout,
        content: "Use healthy, disease-free grafted saplings of high-quality varieties like Alphonso or Kesar from certified nurseries."
      },
      {
        title: "Sowing Process",
        icon: Leaf,
        content: "Plant saplings in the center of the prepared pits during monsoon. Maintain spacing of 10x10m or 5x5m for high-density planting."
      },
      {
        title: "Irrigation Schedule",
        icon: Droplets,
        content: "Water young plants regularly. For mature trees, restrict irrigation 2-3 months before flowering to induce stress and better blooms."
      },
      {
        title: "Fertilizer Guidance",
        icon: Sun,
        content: "Apply fertilizers in trench around the canopy drip line. Increase dosage annually until the tree is 10 years old. Include organic manures."
      },
      {
        title: "Pest Control",
        icon: Bug,
        content: "Mango hopper and fruit fly are major pests. Apply prophylactic sprays before flowering. Use pheromone traps for fruit flies."
      }
    ]
  },
  sweetcorn: {
    name: "Sweet Corn",
    image: "/sweet_corn.png",
    sections: [
      {
        title: "Soil Preparation",
        icon: Hammer,
        content: "Requires well-drained, fertile soil rich in organic matter. Plough deeply and form ridges and furrows at 60 cm spacing."
      },
      {
        title: "Seed Selection",
        icon: Sprout,
        content: "Choose hybrid sweet corn seeds known for high sugar content. Treat seeds with captan or thiram before sowing."
      },
      {
        title: "Sowing Process",
        icon: Leaf,
        content: "Sow seeds on the side of ridges at a depth of 3-4 cm. Maintain plant-to-plant spacing of 20-25 cm."
      },
      {
        title: "Irrigation Schedule",
        icon: Droplets,
        content: "Irrigate immediately after sowing. Maintain adequate soil moisture, especially during silking and grain filling stages."
      },
      {
        title: "Fertilizer Guidance",
        icon: Sun,
        content: "Sweet corn is a heavy feeder. Apply NPK 120:60:40 kg/ha. Top dress Nitrogen in two splits: knee-high stage and tasseling."
      },
      {
        title: "Pest Control",
        icon: Bug,
        content: "Fall Armyworm and Stem Borer are significant threats. Release Trichogramma egg parasitoids or spray Emamectin benzoate if infestation is high."
      }
    ]
  },
  mustard: {
    name: "Mustard",
    image: "/mustard_field.png",
    sections: [
      {
        title: "Soil Preparation",
        icon: Hammer,
        content: "Requires fine seedbed with good moisture. Deep ploughing followed by harrowing and planking is necessary to conserve moisture."
      },
      {
        title: "Seed Selection",
        icon: Sprout,
        content: "Use improved varieties with high oil content. Treat seeds with Metalaxyl to prevent downy mildew/white rust."
      },
      {
        title: "Sowing Process",
        icon: Leaf,
        content: "Sow in lines using a seed drill during mid-October to early November. Row spacing of 30 cm and plant spacing of 10 cm is ideal."
      },
      {
        title: "Irrigation Schedule",
        icon: Droplets,
        content: "Mustard needs less water. First irrigation at 35-40 days (flowering) and second at 65-70 days (pod formation) are crucial if it doesn't rain."
      },
      {
        title: "Fertilizer Guidance",
        icon: Sun,
        content: "Apply NPK 80:40:40 kg/ha. Sulphur application (20-40 kg/ha) is critical for increasing oil content and yield."
      },
      {
        title: "Pest Control",
        icon: Bug,
        content: "Mustard Aphid is the major pest. Early sowing escapes aphid peak. Spray Dimethoate or use Neem Seed Kernel Extract (NSKE) when aphids appear."
      }
    ]
  },
  papaya: {
    name: "Papaya",
    image: "/papaya_tree.png",
    sections: [
      {
        title: "Soil Preparation",
        icon: Hammer,
        content: "Requires perfectly drained sandy loam soil. Even short periods of waterlogging are fatal. Prepare raised beds or mounds."
      },
      {
        title: "Seed Selection",
        icon: Sprout,
        content: "Use seeds of gynodioecious varieties like Red Lady. Raise seedlings in polybags in a protected nursery."
      },
      {
        title: "Sowing Process",
        icon: Leaf,
        content: "Transplant 45-60 day old seedlings at a spacing of 1.8x1.8m. Plant slightly shallow to avoid collar rot."
      },
      {
        title: "Irrigation Schedule",
        icon: Droplets,
        content: "Requires frequent, light irrigations. Drip irrigation is highly beneficial. Avoid water stagnation near the stem."
      },
      {
        title: "Fertilizer Guidance",
        icon: Sun,
        content: "Heavy feeder. Apply 250g N, 250g P, and 500g K per plant per year in multiple split doses starting from 2 months after planting."
      },
      {
        title: "Pest Control",
        icon: Bug,
        content: "Papaya Mealybug and Ringspot Virus (PRSV) are major issues. Control aphid vectors for PRSV. Release parasitoids (Acerophagus papayae) for mealybug."
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
