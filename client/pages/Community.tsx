import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, WifiOff, Send, ThumbsUp, MessageSquare, MapPin, Tag, Plus, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { backend, CommunityPost } from "@/lib/MockBackend";
import { useOfflineSync } from "@/hooks/useOfflineSync";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Community() {
  const { t } = useLanguage();
  const { isOnline, queueLength, syncing, addActionToQueue } = useOfflineSync();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

        <div className="space-y-6">
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
                  <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-blue-600 transition-colors">
                    <MessageSquare className="h-5 w-5" /> {post.comments.length}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
