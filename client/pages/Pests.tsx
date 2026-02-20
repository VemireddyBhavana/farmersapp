import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Bug, Leaf, Search, MapPin, ArrowRight, ArrowLeft, Thermometer, ShieldCheck, Microscope, Camera, Zap, AlertTriangle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const commonPests = [
  { id: 1, name: "Whiteflies", crop: "Paddy", level: "High Risk", desc: "Tiny white flying insects that cause yellowing leaves", action: "Immediate monitoring and treatment recommended" },
  { id: 2, name: "Spider Mites", crop: "Paddy", level: "High Risk", desc: "Microscopic pests that cause stippling on leaves", action: "Immediate monitoring and treatment recommended" },
  { id: 3, name: "Aphids", crop: "Tomato", level: "High Risk", desc: "Small sap-sucking insects that cause curled leaves", action: "Immediate monitoring and treatment recommended" },
];

export default function Pests() {
  const [activeTab, setActiveTab] = useState("Alerts");

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          Pest & Disease Management
        </h1>
        <p className="text-muted-foreground text-lg">
          Early warning system for pests and diseases with prevention strategies and treatment recommendations
        </p>
      </div>

      {/* Monitoring Setup Section */}
      <Card className="rounded-[2.5rem] border-primary/5 bg-white shadow-sm overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-2xl font-black flex items-center gap-3">
            <Eye className="h-7 w-7 text-orange-600" />
            Monitoring Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid gap-6 md:grid-cols-3 items-end">
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground">Select Crop</label>
              <Select>
                <SelectTrigger className="rounded-xl border-primary/10 h-14 bg-white font-medium">
                  <SelectValue placeholder="Choose crop to monitor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tomato">Tomato</SelectItem>
                  <SelectItem value="rice">Rice (Paddy)</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground">Weather Condition</label>
              <Select>
                <SelectTrigger className="rounded-xl border-primary/10 h-14 bg-white font-medium">
                  <SelectValue placeholder="Current weather" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clear">Clear Skies</SelectItem>
                  <SelectItem value="rain">Rainy</SelectItem>
                  <SelectItem value="cloudy">Cloudy</SelectItem>
                  <SelectItem value="humid">Humid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="rounded-xl bg-orange-600 hover:bg-orange-700 h-14 font-black flex items-center gap-2 shadow-xl shadow-orange-500/20">
              <Bug className="h-5 w-5" />
              Get Recommendations
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <h2 className="text-3xl font-black tracking-tight">Active Alerts (10)</h2>
        </div>

        <div className="space-y-4">
          {commonPests.map((pest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-2xl border-red-100 shadow-sm hover:shadow-md transition-all overflow-hidden border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-red-600">{pest.level}: {pest.name}</span>
                      </div>
                      <p className="text-muted-foreground font-medium">{pest.desc}</p>
                      <p className="text-sm font-bold text-red-800">Action Required: {pest.action}</p>
                    </div>
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
