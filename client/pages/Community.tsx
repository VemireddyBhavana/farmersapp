import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, WifiOff, Send, ThumbsUp, MessageSquare, MapPin, Tag, Plus, CheckCircle2, Trash2, Newspaper, Tractor as TractorIcon, AlertTriangle, Bug } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { backend, CommunityPost } from "@/lib/MockBackend";
import { useOfflineSync } from "@/hooks/useOfflineSync";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const localAlerts = [
  { id: 1, pest: "Fall Armyworm", crop: "Maize", location: "Karnal", distance: "5km", severity: "High", date: "2 hours ago" },
  { id: 2, pest: "Whitefly", crop: "Cotton", location: "Guntur", distance: "12km", severity: "Medium", date: "5 hours ago" },
  { id: 3, pest: "Locust Swarm", crop: "Multiple", location: "Jaisalmer", distance: "45km", severity: "Critical", date: "1 day ago" },
];

const peerMachinery = [
  { id: 1, name: "Mahindra Tractor", owner: "Suresh", distance: "2km", price: 500, type: "Tractor" },
  { id: 2, name: "Seed Drill", owner: "Ramesh", distance: "5km", price: 200, type: "Attachment" },
  { id: 3, name: "Harvester", owner: "Venkat", distance: "12km", price: 1500, type: "Heavy" },
];

const agriNews = [
  { id: 1, title: "PM-Kisan 15th Installment Released", source: "Govt Portal", date: "2 hours ago", type: "Scheme" },
  { id: 2, title: "Heavy Rain Alert for Coastal Andhra", source: "IMD", date: "5 hours ago", type: "Weather" },
  { id: 3, title: "New Subsidy for Drip Irrigation Announced", source: "Agri Dept", date: "1 day ago", type: "Scheme" },
];

export default function Community() {
  const { t } = useLanguage();
  const { isOnline, queueLength, syncing, addActionToQueue } = useOfflineSync();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [newComments, setNewComments] = useState<Record<string, string>>({});

  const loadPosts = () => {
    setPosts(backend.getCommunityPosts());
  };

  useEffect(() => {
    loadPosts();
    window.addEventListener('community_sync_complete', loadPosts);
    return () => window.removeEventListener('community_sync_complete', loadPosts);
  }, []);

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    addActionToQueue({
      type: 'CREATE_POST',
      payload: {
        authorName: "Current User", // Mocked
        authorRole: "Farmer",
        location: "Local Area",
        content: newPostContent,
        tags: ["General"]
      }
    });

    setNewPostContent("");
    setIsDialogOpen(false);
    
    // Optimistic update for UI if offline, else wait for sync event
    if (!isOnline) {
      const optimisticPost: CommunityPost = {
        id: "TEMP-" + Date.now(),
        authorName: "Current User",
        authorRole: "Farmer",
        location: "Local Area",
        content: newPostContent,
        tags: ["General"],
        upvotes: 0,
        comments: [],
        timestamp: new Date().toISOString(),
        isOfflineDraft: true
      };
      setPosts([optimisticPost, ...posts]);
    }
  };

  const handleUpvote = (postId: string) => {
    addActionToQueue({ type: 'UPVOTE_POST', payload: { postId } });
    
    if (!isOnline) {
      setPosts(posts.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p));
    }
  };

  const handleDeletePost = (postId: string) => {
    addActionToQueue({ type: 'DELETE_POST', payload: { postId } });
    setPosts(posts.filter(p => p.id !== postId)); // Optimistic delete
  };

  const handleAddComment = (postId: string) => {
    const content = newComments[postId];
    if (!content?.trim()) return;

    addActionToQueue({
      type: 'ADD_COMMENT',
      payload: {
        postId,
        comment: {
          authorName: "Current User",
          authorRole: "Farmer",
          content
        }
      }
    });

    setNewComments({ ...newComments, [postId]: "" });

    if (!isOnline) {
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, {
              id: "TEMP-C-" + Date.now(),
              authorName: "Current User",
              authorRole: "Farmer",
              content,
              timestamp: new Date().toISOString()
            }]
          };
        }
        return p;
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Offline Status Bar */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-amber-500/10 border-b border-amber-500/20 text-amber-600 dark:text-amber-400 px-4 py-2 text-sm font-bold flex items-center justify-center gap-2 overflow-hidden"
          >
            <WifiOff className="h-4 w-4" />
            {t("offlineModeActive")} 
            {queueLength > 0 && `(${queueLength} ${t("pendingSync")})`}
          </motion.div>
        )}
        {syncing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-blue-500/10 border-b border-blue-500/20 text-blue-600 dark:text-blue-400 px-4 py-2 text-sm font-bold flex items-center justify-center gap-2 overflow-hidden"
          >
            <div className="h-4 w-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
            {t("syncingWithServer")}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container max-w-3xl mx-auto pt-8 px-4">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-emerald-950 dark:text-emerald-50 tracking-tight flex items-center gap-3">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl">
                <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              {t("kisanChaupal")}
            </h1>
            <p className="text-muted-foreground font-medium mt-2 max-w-lg">
              {t("communityDescription")}
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/20 px-6 hidden sm:flex">
                <Plus className="h-5 w-5 mr-2" /> {t("createPost")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg rounded-3xl p-6 bg-white dark:bg-emerald-950 border-emerald-100 dark:border-emerald-900">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-emerald-950 dark:text-white mb-2">{t("createNewPost")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Textarea 
                  placeholder={t("whatsOnYourMind")}
                  className="min-h-[120px] rounded-2xl resize-none border-emerald-100 focus-visible:ring-emerald-500 dark:bg-emerald-900/20 dark:border-emerald-800"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
                <Button 
                  onClick={handleCreatePost} 
                  className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold"
                  disabled={!newPostContent.trim()}
                >
                  <Send className="h-4 w-4 mr-2" /> {t("postNow")} {!isOnline && `(${t("offline")})`}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        {/* Mobile FAB for creating post */}
        <div className="fixed bottom-24 right-6 sm:hidden z-40">
           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon" className="h-14 w-14 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-600/30">
                <Plus className="h-6 w-6 text-white" />
              </Button>
            </DialogTrigger>
           </Dialog>
        </div>

        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto bg-transparent border-b border-emerald-100 dark:border-emerald-900 rounded-none h-14 mb-8 pb-0 gap-6 px-0 scrollbar-none [scrollbar-width:none]">
            <TabsTrigger value="discussions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-400 bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground font-bold pb-4 px-1">{t("discussions")}</TabsTrigger>
            <TabsTrigger value="alerts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-400 bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground font-bold pb-4 px-1">{t("localAlerts")}</TabsTrigger>
            <TabsTrigger value="machinery" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-400 bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground font-bold pb-4 px-1">{t("machinerySharing")}</TabsTrigger>
            <TabsTrigger value="news" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-400 bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground font-bold pb-4 px-1">{t("agriNews")}</TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="space-y-6">
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#0a0f0d] p-6 rounded-[2rem] border border-emerald-100 dark:border-emerald-900/50 shadow-sm"
              >
                {post.isOfflineDraft && (
                  <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
                    <WifiOff className="h-3 w-3" /> {t("pendingSync")}
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center font-black text-xl text-emerald-700 dark:text-emerald-400">
                      {post.authorName[0]}
                    </div>
                    <div>
                      <h3 className="font-black text-emerald-950 dark:text-emerald-50 flex items-center gap-1.5">
                        {post.authorName}
                        {post.authorRole.includes("Verified") && (
                          <CheckCircle2 className="h-4 w-4 text-blue-500" />
                        )}
                      </h3>
                      <p className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {post.location}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-lg">
                    {post.authorRole}
                  </span>
                  {post.authorName === "Current User" && (
                    <button 
                      onClick={() => handleDeletePost(post.id)}
                      className="ml-2 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <p className="text-emerald-900 dark:text-emerald-100 leading-relaxed mb-6 font-medium">
                  {post.content}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                      <Tag className="h-3 w-3" /> {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-emerald-50 dark:border-emerald-900/30">
                  <button 
                    onClick={() => handleUpvote(post.id)}
                    className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-emerald-600 transition-colors"
                  >
                    <ThumbsUp className="h-5 w-5" /> {post.upvotes}
                  </button>
                  <button 
                    onClick={() => setOpenComments({ ...openComments, [post.id]: !openComments[post.id] })}
                    className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    <MessageSquare className="h-5 w-5" /> {post.comments.length}
                  </button>
                </div>

                <AnimatePresence>
                  {openComments[post.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-4 border-t border-dashed border-emerald-100 dark:border-emerald-900/30 space-y-4">
                        {post.comments.length === 0 ? (
                          <p className="text-sm text-center text-muted-foreground italic py-4">{t("noCommentsYet")}</p>
                        ) : (
                          <div className="space-y-4 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-200 dark:scrollbar-thumb-emerald-800">
                            {post.comments.map(comment => (
                              <div key={comment.id} className="bg-emerald-50/50 dark:bg-emerald-900/10 p-4 rounded-2xl">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-bold text-sm text-emerald-950 dark:text-emerald-50">{comment.authorName}</span>
                                  <span className="text-[10px] text-muted-foreground">{new Date(comment.timestamp).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm text-emerald-800 dark:text-emerald-200">{comment.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-end gap-2 pt-2">
                          <Textarea 
                            value={newComments[post.id] || ""}
                            onChange={(e) => setNewComments({ ...newComments, [post.id]: e.target.value })}
                            placeholder={t("writeComment")}
                            className="min-h-[44px] h-[44px] py-3 rounded-2xl resize-none border-emerald-200 dark:border-emerald-800 focus-visible:ring-emerald-500"
                          />
                          <Button 
                            onClick={() => handleAddComment(post.id)}
                            disabled={!newComments[post.id]?.trim()}
                            className="h-[44px] px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-bold shadow-md shadow-emerald-600/20 shrink-0"
                          >
                            <Send className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">{t("reply")}</span>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-[2rem] border border-rose-100 dark:border-rose-900/50 flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div>
                <h3 className="font-black text-rose-950 dark:text-rose-50">{t("localAlerts")}</h3>
                <p className="text-sm text-rose-700 dark:text-rose-300 font-medium">{t("localAlertsDesc")}</p>
              </div>
              <Button className="rounded-xl font-bold bg-rose-600 hover:bg-rose-700 text-white whitespace-nowrap">
                <AlertTriangle className="h-4 w-4 mr-2"/> {t("reportAlert")}
              </Button>
            </div>
            
            {localAlerts.map(item => (
              <div key={item.id} className="bg-white dark:bg-[#0a0f0d] p-5 rounded-2xl border border-rose-100 dark:border-rose-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${
                    item.severity === 'Critical' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 
                    item.severity === 'High' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30' : 
                    'bg-amber-100 text-amber-600 dark:bg-amber-900/30'
                  }`}>
                    <Bug className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-emerald-950 dark:text-emerald-50">{item.pest}</h4>
                    <p className="text-sm font-bold text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {item.location} ({item.distance})
                    </p>
                  </div>
                </div>
                <div className="flex w-full sm:w-auto justify-between sm:justify-end gap-6 items-center">
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t("cropAffected")}</p>
                    <p className="font-bold text-slate-700 dark:text-slate-300">{item.crop}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t("severity")}</p>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                      item.severity === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                      item.severity === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 
                      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {item.severity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="machinery" className="space-y-4">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-[2rem] border border-amber-100 dark:border-amber-900/50 flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div>
                <h3 className="font-black text-amber-950 dark:text-amber-50">{t("peerMachinery")}</h3>
                <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">{t("peerMachineryDesc")}</p>
              </div>
              <Button className="rounded-xl font-bold bg-amber-600 hover:bg-amber-700 text-white whitespace-nowrap">
                <Plus className="h-4 w-4 mr-2"/> {t("listEquipment")}
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {peerMachinery.map(item => (
                <div key={item.id} className="bg-white dark:bg-[#0a0f0d] p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 flex items-center gap-4">
                  <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                    <TractorIcon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-emerald-950 dark:text-emerald-50">{item.name}</h4>
                    <p className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" /> {item.owner} • <MapPin className="h-3 w-3" /> {item.distance}
                    </p>
                    <p className="font-black text-emerald-700 dark:text-emerald-400 mt-1">₹{item.price}/{t("day")}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            {agriNews.map(item => (
              <div key={item.id} className="bg-white dark:bg-[#0a0f0d] p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 flex gap-4 items-start">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
                  <Newspaper className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">{item.type}</span>
                    <span className="text-xs font-bold text-muted-foreground">• {item.date}</span>
                  </div>
                  <h4 className="font-black text-emerald-950 dark:text-emerald-50 text-lg leading-tight mb-1">{item.title}</h4>
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Source: {item.source}</p>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
