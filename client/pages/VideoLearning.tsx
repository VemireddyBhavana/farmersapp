import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/LanguageContext";
import { Play, Search, BookOpen, Tractor, Droplets, Leaf, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const VideoLearning = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { name: "All", icon: BookOpen },
    { name: "Crops", icon: Leaf },
    { name: "Machinery", icon: Tractor },
    { name: "Irrigation", icon: Droplets },
  ];

  const videos = [
    {
      id: "1",
      title: "Modern Paddy Cultivation Techniques",
      desc: "Learn about the SRI method and precision transplanting for higher yields.",
      duration: "12:45",
      category: "Crops",
      thumbnail: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?w=800&q=80",
      views: "15k"
    },
    {
      id: "2",
      title: "Drip Irrigation Setup for Small Farms",
      desc: "Step-by-step guide to installing a low-cost drip system in your field.",
      duration: "08:20",
      category: "Irrigation",
      thumbnail: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80",
      views: "10k"
    },
    {
      id: "3",
      title: "Harvester Maintenance Tips",
      desc: "How to maintain your combine harvester for the upcoming season.",
      duration: "15:30",
      category: "Machinery",
      thumbnail: "https://images.unsplash.com/photo-1473976339452-16f057d3c019?w=800&q=80",
      views: "8k"
    },
    {
      id: "4",
      title: "Organic Fertilizer Production at Home",
      desc: "Produce high-quality vermicompost and liquid fertilizers easily.",
      duration: "10:15",
      category: "Crops",
      thumbnail: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
      views: "22k"
    },
    {
      id: "5",
      title: "Solar Pump Subsidy Application Guide",
      desc: "Complete walkthrough of the PM-KUSUM application process.",
      duration: "06:45",
      category: "Irrigation",
      thumbnail: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
      views: "12k"
    }
  ];

  const filteredVideos = activeCategory === "All" 
    ? videos 
    : videos.filter(v => v.category === activeCategory);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-green-900 tracking-tight">
            {t("agriVideoLearning")}
          </h1>
          <p className="text-green-700 text-lg mt-2 font-medium">
            {t("agriVideoDesc")}
          </p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input 
            placeholder="Search tutorials..." 
            className="pl-10 h-11 border-green-200 focus:ring-green-500 rounded-full"
          />
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <Button
            key={cat.name}
            variant={activeCategory === cat.name ? "default" : "outline"}
            className={cn(
              "rounded-full px-6 py-2 h-auto text-base flex items-center gap-2 transition-all",
              activeCategory === cat.name 
                ? "bg-green-600 hover:bg-green-700 shadow-md scale-105" 
                : "border-green-200 text-green-700 hover:bg-green-50"
            )}
            onClick={() => setActiveCategory(cat.name)}
          >
            <cat.icon className="h-4 w-4" />
            {cat.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl">
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <Play className="h-8 w-8 text-white fill-current translate-x-1" />
                </div>
              </div>
              <Badge className="absolute bottom-3 right-3 bg-black/70 text-white border-none py-1 px-2 font-mono">
                {video.duration}
              </Badge>
              <Badge className="absolute top-3 left-3 bg-green-600/90 text-white border-none shadow-sm capitalize">
                {video.category}
              </Badge>
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors leading-tight">
                  {video.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                {video.desc}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 font-medium pt-4 border-t border-gray-100">
                <span className="flex items-center gap-1.5">
                  <Play className="h-3.5 w-3.5" />
                  {video.views} views
                </span>
                <Button variant="link" className="text-green-600 p-0 h-auto font-bold flex items-center gap-1 group/btn">
                  Watch Video
                  <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideoLearning;
