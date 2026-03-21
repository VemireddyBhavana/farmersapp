import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Plus, 
  Search, 
  CheckCircle2, 
  UserCircle2,
  Image as ImageIcon,
  MoreHorizontal,
  TrendingUp,
  Award
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

const Community = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Rajesh Kumar",
      role: t('verifiedFarmer'),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
      content: "Just harvested my first batch of organic mangoes! The yield is much higher than last year thanks to the new irrigation techniques. #OrganicFarming #HarvestSuccess",
      image: "/community_hub.png",
      likes: 124,
      comments: 18,
      time: "2h ago",
      verified: true
    },
    {
      id: 2,
      author: "Dr. Anjali Sharma",
      role: t('agriSpecialist'),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
      content: "Seeing a lot of queries about late blight in tomatoes this week. Make sure to check the humidity levels and apply copper-based fungicides if you see dark spots. Stay safe!",
      likes: 89,
      comments: 24,
      time: "5h ago",
      specialist: true
    },
    {
      id: 3,
      author: "Sridhar Rao",
      role: t('verifiedFarmer'),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sridhar",
      content: "Anyone in the Guntur region looking to rent a harvester for the upcoming cotton season? My machine is available from next week.",
      likes: 42,
      comments: 7,
      time: "8h ago",
      verified: true
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Profile Summary */}
          <div className="lg:col-span-3 space-y-6 hidden lg:block">
            <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-emerald-500 to-teal-600" />
              <div className="relative z-10 text-center">
                <div className="h-24 w-24 rounded-full border-4 border-white dark:border-slate-900 mx-auto overflow-hidden bg-white mb-4">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me" alt="My Profile" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase">Abhishek V.</h3>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mt-1">Village: Wadgaon Sheri</p>
                
                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-xl font-black text-slate-900 dark:text-white italic">1.2k</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Followers</p>
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900 dark:text-white italic">450</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Following</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-slate-900 text-white">
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-6 italic">{t('trendingDiscussions')}</h4>
              <ul className="space-y-4">
                {["#PaddyCultivation", "#OrganicFarming", "#MandiRates", "#SeedQuality"].map((tag, i) => (
                  <li key={i} className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-transform">
                    <span className="font-bold italic text-sm">{tag}</span>
                    <TrendingUp className="h-4 w-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6 space-y-8">
            {/* Create Post */}
            <Card className="p-6 rounded-[2.5rem] border-none shadow-xl bg-white dark:bg-slate-900">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex-shrink-0" />
                <div className="flex-1 space-y-4">
                  <textarea 
                    placeholder={t('askCommunity')}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 min-h-[100px] resize-none italic"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="rounded-xl text-slate-500 hover:text-emerald-600 font-bold text-xs uppercase tracking-widest">
                        <ImageIcon className="mr-2 h-4 w-4" /> Photo
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-xl text-slate-500 hover:text-emerald-600 font-bold text-xs uppercase tracking-widest">
                        <Plus className="mr-2 h-4 w-4" /> Tag Crop
                      </Button>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 rounded-xl italic">Post</Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Posts List */}
            <div className="space-y-8">
              {posts.map((post) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={post.id}
                >
                  <Card className="overflow-hidden rounded-[2.5rem] border-none shadow-xl bg-white dark:bg-slate-900 group">
                    <div className="p-8">
                      {/* Post Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center overflow-hidden">
                            <img src={post.avatar} alt={post.author} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-black text-slate-900 dark:text-white tracking-tight italic uppercase">{post.author}</h4>
                              {post.verified && <CheckCircle2 className="h-4 w-4 text-emerald-500 fill-emerald-500/10" />}
                              {post.specialist && <Award className="h-4 w-4 text-purple-500" />}
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{post.role}</p>
                          </div>
                        </div>
                        <button className="text-slate-300 hover:text-slate-600 transition-colors">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Content */}
                      <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic mb-6">
                        {post.content}
                      </p>

                      {post.image && (
                        <div className="rounded-3xl overflow-hidden mb-6 h-64 md:h-80 relative group/img">
                          <img src={post.image} alt="Post content" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
                        </div>
                      )}

                      {/* Stats & Actions */}
                      <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex gap-6">
                          <button className="flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors group/heart">
                            <Heart className="h-5 w-5 group-hover/heart:fill-rose-500" />
                            <span className="text-xs font-black italic">{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors group/msg">
                            <MessageSquare className="h-5 w-5 group-hover/msg:fill-blue-500" />
                            <span className="text-xs font-black italic">{post.comments}</span>
                          </button>
                        </div>
                        <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Suggestions */}
          <div className="lg:col-span-3 space-y-6 hidden lg:block">
            <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-white dark:bg-slate-900">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 italic">Who to follow</h4>
              <div className="space-y-6">
                {[
                  { name: "Prakash J.", role: "Soil Scientist", avatar: "Prakash" },
                  { name: "Kisan Suvidha", role: "Gov Agency", avatar: "Gov" },
                  { name: "Meera Bai", role: "Seed Specialist", avatar: "Meera" }
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar}`} alt={user.name} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">{user.name}</p>
                        <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">{user.role}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 rounded-lg text-[10px] font-black uppercase tracking-widest border-emerald-500/20 text-emerald-600 hover:bg-emerald-50">Follow</Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-emerald-600 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2)_0%,transparent_60%)]" />
              <div className="relative z-10">
                < Award className="h-12 w-12 mx-auto mb-4 text-emerald-200" />
                <h4 className="text-sm font-black uppercase tracking-tight italic mb-2">Be a Specialist</h4>
                <p className="text-[10px] font-bold text-emerald-50/80 mb-4 tracking-wide leading-relaxed uppercase">Help fellow farmers and earn the "Agri Specialist" badge.</p>
                <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-black rounded-xl italic">Apply Now</Button>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Community;
