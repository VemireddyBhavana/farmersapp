import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Bug, Leaf, Search, MapPin, ArrowRight, ArrowLeft, Thermometer, ShieldCheck, Microscope, Camera, Zap, AlertTriangle, Eye, Activity, Droplet, Sprout, FlaskConical, HelpCircle } from "lucide-react";
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

export default function Pests() {
  const { t } = useLanguage();

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
