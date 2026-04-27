import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Bug, Leaf, Search, MapPin, ArrowRight, ArrowLeft, Thermometer, ShieldCheck, Microscope, Camera, Zap, AlertTriangle, Eye, Activity, Droplet, Sprout, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import CropHealthChecker from "@/components/CropHealthChecker";
import { useLanguage } from "@/lib/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const pestData = [
  {
    name: "Aphids",
    risk: "High",
    crops: ["tomato", "cotton", "rice"],
    desc: "Small sap-sucking insects that cause curled leaves and stunted growth.",
    treatment: "High-pressure water spray or Neem oil application.",
    pesticide: "Imidacloprid (0.5ml/L)",
    organic: "Ladybugs (natural predator) or Soap-Water spray."
  },
  {
    name: "Whiteflies",
    risk: "High",
    crops: ["cotton", "Vegetables"],
    desc: "Tiny white flying insects that excrete honeydew, leading to sooty mold.",
    treatment: "Use of yellow sticky traps and removal of host weeds.",
    pesticide: "Acetamiprid (0.4g/L)",
    organic: "Neem based formulations (3000 PPM)."
  },
  {
    name: "Spider Mites",
    risk: "Medium",
    crops: ["cotton", "pulses"],
    desc: "Microscopic pests that cause yellow stippling and webbing on leaf undersides.",
    treatment: "Keep leaves well-hydrated; remove heavily infested parts.",
    pesticide: "Abamectin (1.5ml/L)",
    organic: "Predatory mites or Garlic extract."
  },
  {
    name: "Cutworms",
    risk: "High",
    crops: ["rice", "Corn"],
    desc: "Caterpillars that cut young seedlings at the soil surface during night.",
    treatment: "Manual collection in evenings and tillage after harvest.",
    pesticide: "Chlorpyrifos (2ml/L as soil drench)",
    organic: "Diatomaceous earth around stem bases."
  },
  {
    name: "Thrips",
    risk: "High",
    crops: ["Chilli", "Onion", "cotton"],
    desc: "Slender insects that rasp plant tissue, causing silvering/streaking of leaves.",
    treatment: "Blue sticky traps and overhead irrigation to wash them off.",
    pesticide: "Spinosad (0.5ml/L)",
    organic: "Neem oil or Spinosad-based biological sprays."
  },
  {
    name: "Armyworms",
    risk: "Critical",
    crops: ["Maize", "rice", "Sugarcane"],
    desc: "Caterpillars that march across fields in large numbers, devouring all foliage.",
    treatment: "Deep plowing to destroy pupae; bird perches in fields.",
    pesticide: "Emamectin Benzoate (0.4g/L)",
    organic: "Bacillus thuringiensis (Bt) sprays."
  },
  {
    name: "Bollworm",
    risk: "High",
    crops: ["cotton", "tomato", "pulses"],
    desc: "Larvae that bore into cotton bolls and fruits, causing massive yield loss.",
    treatment: "Use pheromone traps (5/acre); intercropping with marigold.",
    pesticide: "Indoxacarb (0.5ml/L)",
    organic: "NPV (Nuclear Polyhedrosis Virus) @ 250 LE/ha."
  },
  {
    name: "Brown Planthopper",
    risk: "Critical",
    crops: ["rice"],
    desc: "Small brown insects that suck sap at the base of plants, causing 'hopper burn'.",
    treatment: "Ensure 'alley-ways' in paddy fields; drain water periodically.",
    pesticide: "Pymetrozine (0.6g/L)",
    organic: "Metarhizium anisopliae (Fungal drench)."
  },
  {
    name: "Stem Borer",
    risk: "High",
    crops: ["rice", "Maize", "Sugarcane"],
    desc: "Larvae that tunnel inside stems, causing 'dead heart' in young plants.",
    treatment: "Release Trichogramma egg parasites; destroy stubbles after harvest.",
    pesticide: "Chlorantraniliprole (0.4ml/L)",
    organic: "Pheromone traps and light traps."
  },
  {
    name: "Leafhopper",
    risk: "Medium",
    crops: ["rice", "cotton"],
    desc: "Small wedge-shaped insects that cause 'hopper burn' (yellowing of leaf tips).",
    treatment: "Inter-cropping and use of light traps.",
    pesticide: "Buprofezin (1.5g/L)",
    organic: "Beauveria bassiana (Fungal bio-pesticide)."
  }
];

const diseaseData = [
  {
    name: "Powdery Mildew",
    risk: "High",
    crops: ["Vegetables", "pulses"],
    desc: "White flour-like patches on leaves and stems inhibiting photosynthesis.",
    plan: "Regular leaf inspection; ensure balanced nitrogen application.",
    fertilizer: "High Potassium (K) to boost immunity.",
    prevention: "Sulfur dust application before peak humidity."
  },
  {
    name: "Blight (Early/Late)",
    risk: "Critical",
    crops: ["tomato", "rice"],
    desc: "Rapid drying and browning of leaves; can destroy crops in 48 hours.",
    plan: "Remove infected leaves; spray copper-based fungicides immediately.",
    fertilizer: "Zinc-fortified foliar sprays.",
    prevention: "Ensure 3-year crop rotation; use clean planting material."
  },
  {
    name: "Root Rot",
    risk: "High",
    crops: ["Soybean", "pulses", "Vegetables"],
    desc: "Decay of the root system, leading to wilting and death above ground.",
    plan: "Improve field drainage; use Trichoderma viride seed treatment.",
    fertilizer: "Avoid excessive irrigation; use organic manure.",
    prevention: "Solarization of soil before sowing; use resistant varieties."
  },
  {
    name: "Leaf Spot",
    risk: "Medium",
    crops: ["groundnut", "tomato", "cotton"],
    desc: "Small dark spots with yellow halos on leaves. Can lead to premature defoliation.",
    plan: "Spray Mancozeb (2.5g/L) if spots appear on >10% of leaves.",
    fertilizer: "Balanced N-P-K application; Micronutrient sprays.",
    prevention: "Deep summer plowing; destroy crop residues from previous season."
  },
  {
    name: "Rust",
    risk: "Medium",
    crops: ["wheat", "groundnut"],
    desc: "Orange/Red pustules on leaf surface that drain plant nutrients.",
    plan: "Use resistant varieties; monitor closely during high humidity.",
    fertilizer: "Iron and Magnesium supplements.",
    prevention: "Eliminate alternative hosts (weeds) nearby."
  },
  {
    name: "Blast",
    risk: "High",
    crops: ["rice"],
    desc: "Diamond shaped spots on leaves and rot at the neck of grain panicles.",
    plan: "Deep summer plowing; avoid excessive nitrogen late in season.",
    fertilizer: "Silicon-based fertilizers.",
    prevention: "Seed treatment with Tricyclazole."
  },
  {
    name: "Wilt (Fusarium/Verticillium)",
    risk: "Critical",
    crops: ["cotton", "Chilli", "tomato"],
    desc: "Sudden drooping and yellowing followed by permanent wilting of the plant.",
    plan: "Apply bio-control agents like Trichoderma; drench soil with Carbendazim.",
    fertilizer: "Ammonium Nitrate reduction; use Potash.",
    prevention: "Long term crop rotation; field sanitation."
  },
  {
    name: "Mosaic Virus",
    risk: "High",
    crops: ["tomato", "Okra", "Chilli"],
    desc: "Mottled and stunted leaves with yellow/green patterns. Spread by insects.",
    plan: "Immediately remove and burn infected plants. Control vector insects.",
    fertilizer: "Foliar nutrition to sustain plant vigor.",
    prevention: "Control Aphids and Whiteflies; use virus-free seeds."
  }
];

  return (
    <div className="min-h-screen bg-[#0B1C10] text-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#E8C872] uppercase italic">
            {t('plantDiseaseDetection') || "Plant Disease Detection"}
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Upload Section */}
          <div className="lg:col-span-7">
            <CropHealthChecker />
          </div>

          {/* Right Column: How It Works & Statistics */}
          <div className="lg:col-span-5 space-y-8">
            {/* How It Works */}
            <Card className="bg-[#1A2E1F] border-[#2D4534] rounded-3xl p-8 text-slate-300">
              <h3 className="text-xl font-bold text-[#E8C872] flex items-center gap-3 mb-6">
                <HelpCircle className="h-6 w-6" />
                How It Works
              </h3>
              <div className="space-y-6">
                <p className="text-sm leading-relaxed">
                  Our AI-powered plant disease detection system uses computer vision to identify diseases in crops. The system is trained on thousands of images of healthy and diseased plants.
                </p>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Simple 3-step process:</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#E8C872] text-[#0B1C10] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</div>
                      Upload or capture a clear image of the affected plant.
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#E8C872] text-[#0B1C10] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</div>
                      Our AI analyzes the image for disease patterns.
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#E8C872] text-[#0B1C10] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</div>
                      Receive instant identification and treatment advice.
                    </li>
                  </ul>
                </div>

                <p className="text-xs italic opacity-70">
                  For best results, take close-up images of affected leaves or stems in good lighting conditions.
                </p>
              </div>
            </Card>

            {/* Recent Farm Statistics */}
            <Card className="bg-[#1A2E1F] border-[#2D4534] rounded-3xl p-8">
              <h3 className="text-xl font-bold text-[#E8C872] flex items-center gap-3 mb-6">
                <Activity className="h-6 w-6" />
                Recent Farm Statistics
              </h3>
              <p className="text-xs text-slate-400 mb-8 uppercase tracking-widest font-bold">Common diseases detected on your farm</p>
              
              <div className="space-y-8">
                {[
                  { name: "Late Blight", count: 12, color: "bg-red-500", total: 40 },
                  { name: "Early Blight", count: 8, color: "bg-orange-500", total: 40 },
                  { name: "Bacterial Spot", count: 5, color: "bg-yellow-500", total: 40 },
                  { name: "Healthy", count: 15, color: "bg-emerald-500", total: 40 }
                ].map((stat) => (
                  <div key={stat.name} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                      <span className="text-slate-300">{stat.name}</span>
                      <span className="text-slate-400">{stat.count} cases</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(stat.count / stat.total) * 100}%` }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className={cn("h-full rounded-full", stat.color)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
