import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Heart,
  Share2,
  Plus,
  CheckCircle2,
  Image as ImageIcon,
  MoreHorizontal,
  Trash2,
  Send,
  Loader2,
  Sparkles,
  MapPin,
  ChevronDown,
  X,
  Bell,
  Check
} from "lucide-react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  where,
  increment,
  getDocs,
  serverTimestamp,
  limit
} from "firebase/firestore";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useLanguage } from "@/lib/LanguageContext";

// --- FIREBASE INITIALIZATION ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// --- MAIN COMMUNITY COMPONENT ---
const Community = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [replies, setReplies] = useState<Record<string, any[]>>({});
  const [isPosting, setIsPosting] = useState(false);
  const [problemText, setProblemText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState<Record<string, any[]>>({});
  const [comments, setComments] = useState<Record<string, any[]>>({});
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t, language } = useLanguage();

  // --- DYNAMIC USER IDENTITY ---
  const currentUser = {
    id: "user123",
    name: "Ramesh Kumar",
    photo: "/farmer_avatar.png",
    location: "Warangal"
  };

  // --- REAL-TIME FEED (PART 2: FIXED SNAPSHOT LISTENERS) ---
  useEffect(() => {
    // 1. Posts Feed
    const qPosts = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(50));
    const unsubscribePosts = onSnapshot(qPosts,
      (snapshot) => {
        const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
        setLoading(false);
      },
      (err) => {
        console.error("🔥 FEED ERROR:", err);
        setLoading(false);
      }
    );

    // 2. Replies (AI Expert Protocols)
    const unsubscribeReplies = onSnapshot(collection(db, "replies"),
      (snapshot) => {
        const repliesMap: Record<string, any[]> = {};
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          repliesMap[data.postId] = repliesMap[data.postId] || [];
          repliesMap[data.postId].push({ id: doc.id, ...data });
        });
        setReplies(repliesMap);
      },
      (err) => console.error("🔥 REPLIES ERROR:", err)
    );

    // 3. Likes System
    const unsubscribeLikes = onSnapshot(collection(db, "likes"),
      (snapshot) => {
        const likesMap: Record<string, any[]> = {};
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          likesMap[data.postId] = likesMap[data.postId] || [];
          likesMap[data.postId].push({ id: doc.id, ...data });
        });
        setLikes(likesMap);
      },
      (err) => console.error("🔥 LIKES ERROR:", err)
    );

    // 4. Comments System
    const unsubscribeComments = onSnapshot(query(collection(db, "comments"), orderBy("createdAt", "asc")),
      (snapshot) => {
        const commentsMap: Record<string, any[]> = {};
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          commentsMap[data.postId] = commentsMap[data.postId] || [];
          commentsMap[data.postId].push({ id: doc.id, ...data });
        });
        setComments(commentsMap);
      },
      (err) => console.error("🔥 COMMENTS ERROR:", err)
    );

    // 5. Notifications (ISSUE 3: TRY/CATCH WRAPPER)
    let unsubscribeNotifications = () => { };
    try {
      const qNotifications = query(
        collection(db, "notifications"),
        where("userId", "==", currentUser.id),
        orderBy("createdAt", "desc"),
        limit(20)
      );

      unsubscribeNotifications = onSnapshot(qNotifications,
        (snapshot) => {
          setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        },
        (err) => {
          // ISSUE 1: Handle missing index gracefully
          console.warn("🔥 NOTIFICATIONS INDEX MISSING:", err.message);
        }
      );
    } catch (error) {
      console.error("🔥 NOTIFICATIONS CRASH PREVENTED:", error);
    }

    // ISSUE 2: CORRECT CLEANUP FUNCTIONS
    return () => {
      unsubscribePosts();
      unsubscribeReplies();
      unsubscribeLikes();
      unsubscribeComments();
      unsubscribeNotifications();
    };
  }, [currentUser.id]);

  // --- IMAGE HELPERS ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      // Cleanup previous object URL
      return () => URL.revokeObjectURL(preview!);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreview(null);
  };

  // --- CLOUDINARY UPLOAD (FIXED FETCH VERSION) ---
  const uploadToCloudinary = async (file: File) => {
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_upload");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.error("Cloudinary Error:", data);
        throw new Error("Upload failed");
      }

      return {
        url: data.secure_url,
        public_id: data.public_id
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // --- CLAUDE AI ANALYSIS (PRODUCTION-READY FETCH WITH VISION) ---
  const analyzePost = async (problemText: string, language: string, imageData?: string) => {
    try {
      const res = await fetch("/api/analyze-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ problemText, language, imageData })
      });

      if (!res.ok) return null;

      const data = await res.json();
      return data.reply || null;
    } catch (err) {
      console.error("AI ERROR:", err);
      return null;
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // --- SOCIAL HELPERS ---
  const addNotification = async (userId: string, type: string, postId: string, message: string) => {
    if (userId === currentUser.id && type !== "AI") return; // Don't notify self for likes/comments
    await addDoc(collection(db, "notifications"), {
      userId,
      type,
      postId,
      message,
      read: false,
      createdAt: serverTimestamp()
    });
  };

  const toggleLike = async (postId: string, postOwnerId: string) => {
    try {
      const q = query(collection(db, "likes"), where("postId", "==", postId), where("userId", "==", currentUser.id));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        // Like
        await addDoc(collection(db, "likes"), { postId, userId: currentUser.id, createdAt: serverTimestamp() });
        await updateDoc(doc(db, "posts", postId), { likesCount: increment(1) });
        addNotification(postOwnerId, "LIKE", postId, `${currentUser.name} liked your post`);
      } else {
        // Unlike
        await deleteDoc(doc(db, "likes", snapshot.docs[0].id));
        await updateDoc(doc(db, "posts", postId), { likesCount: increment(-1) });
      }
    } catch (error) {
      toast.error("Error updating like");
    }
  };

  const addComment = async (postId: string, postOwnerId: string) => {
    const text = commentText[postId];
    if (!text?.trim()) return;

    try {
      await addDoc(collection(db, "comments"), {
        postId,
        userName: currentUser.name,
        userPhoto: currentUser.photo,
        text,
        createdAt: serverTimestamp()
      });
      setCommentText(prev => ({ ...prev, [postId]: "" }));
      addNotification(postOwnerId, "COMMENT", postId, `${currentUser.name} commented on your post`);
    } catch (error) {
      toast.error("Error adding comment");
    }
  };

  const sharePost = async (postId: string) => {
    try {
      // PART 8: Create notification for ALL users
      // We proxy "all users" by finding unique userIds in the existing posts
      const postsSnap = await getDocs(collection(db, "posts"));
      const userIds = Array.from(new Set(postsSnap.docs.map(doc => doc.data().userId)));

      const notifyPromises = userIds.map(uid =>
        addNotification(uid, "SHARE", postId, `${currentUser.name} shared a crop insight with the entire community!`)
      );

      await Promise.all(notifyPromises);
      toast.success("Crop insight shared to community alerts!");
    } catch (error) {
      toast.error("Error sharing post");
    }
  };

  // --- CREATE POST ---
  const handleCreatePost = async () => {
    if (!problemText && !imageFile) return;
    setIsPosting(true);

    try {
      let imageData: any = { url: "", public_id: "" };
      if (imageFile) imageData = await uploadToCloudinary(imageFile);

      const postRef = await addDoc(collection(db, "posts"), {
        userId: currentUser.id,
        userName: currentUser.name,
        userPhoto: currentUser.photo,
        location: currentUser.location,
        problemText,
        imageUrl: imageData.url,
        imageId: imageData.public_id,
        createdAt: serverTimestamp(),
        likesCount: 0
      });

      const newPostId = postRef.id;
      setProblemText("");
      setImageFile(null);
      setPreview(null);
      setIsPosting(false);
      toast.success(t("postNow") + "!"); // Or a specific key if added

      // --- PART 3: AI ANALYSIS (VISION ENABLED) ---
      if (problemText || imageFile) {
        toast.info("🤖 Farming Expert is analyzing your field problem...");
        
        let imageData = "";
        if (imageFile) {
          try {
            imageData = await fileToBase64(imageFile);
          } catch (e) {
            console.error("Base64 conversion failed", e);
          }
        }

        const aiPromise = analyzePost(problemText, language, imageData);
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 20000));

        try {
          const aiReply = await Promise.race([aiPromise, timeoutPromise]) as string | null;
          
          if (aiReply) {
            // SUCCESSFUL AI RESPONSE
            await addDoc(collection(db, "replies"), {
              postId: newPostId,
              type: "AI",
              content: aiReply,
              createdAt: serverTimestamp()
            });
            await addNotification(currentUser.id, "AI", newPostId, t("expertProtocolGenerated"));
            toast.success(t("expertProtocolGenerated"));
          } else {
             throw new Error("Null response");
          }
        } catch (error) {
          console.error("🔥 AI PROTOCOL FAILED:", error);
          // GUARANTEED FALLBACK: Always save a reply document to stop the loader in UI
          await addDoc(collection(db, "replies"), {
            postId: newPostId,
            type: "AI",
            content: "⚠️ Expert Assistant currently unavailable due to high demand. Our local community experts are reviewing your post.",
            createdAt: serverTimestamp(),
            error: true
          });
          toast.error(t("expertAssistantBusy"));
        }
      }
    } catch (error: any) {
      setIsPosting(false);
      toast.error("⚠️ Failed to share post. Try again.");
    }
  };

  // --- DELETE POST ---
  const handleDeletePost = async (postId: string) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await deleteDoc(doc(db, "posts", postId));
      toast.success("Post deleted.");
    } catch (error) {
      toast.error("Error deleting post.");
    }
  };

  // --- TIME FORMATTER ---
  const formatTime = (ts: any) => {
    if (!ts) return "Just now";
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-[#f0f9eb] pt-24 pb-20 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <div className="container mx-auto px-4 max-w-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#1B5E20] flex items-center gap-3 tracking-tight">
              <Sparkles className="h-8 w-8 text-[#FFC107] animate-pulse" />
              {t("communityHub")}
            </h1>
            <p className="text-sm font-bold text-emerald-700/60 uppercase tracking-widest mt-1">{t("farmerCommunity")}</p>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="h-12 w-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-[#2E7D32] relative hover:scale-105 transition-transform"
            >
              <Bell className="h-6 w-6" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-16 right-0 w-80 bg-white shadow-2xl rounded-[32px] border border-emerald-50 z-50 overflow-hidden"
                >
                  <div className="p-6 border-b border-emerald-50 flex justify-between items-center bg-emerald-50/30">
                    <h3 className="font-black text-xs uppercase tracking-widest text-emerald-800">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)} className="text-emerald-400 hover:text-emerald-600"><X className="h-4 w-4" /></button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-10 text-center opacity-30 font-bold text-xs uppercase italic">No notifications yet</div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="p-4 border-b border-emerald-50 hover:bg-emerald-50/50 transition-colors flex gap-3 items-start">
                          <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            {n.type === 'AI' ? '🤖' : n.type === 'LIKE' ? '❤️' : '💬'}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700">{n.message}</p>
                            <p className="text-[10px] font-bold text-emerald-600 uppercase mt-1">{formatTime(n.createdAt)}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* POST CREATION BOX */}
        <Card className="p-8 rounded-[32px] border-none shadow-2xl shadow-emerald-900/5 bg-white mb-10 overflow-hidden relative">
          <div className="flex gap-4">
            <div className="h-14 w-14 rounded-[20px] shadow-lg flex-shrink-0 overflow-hidden border-2 border-emerald-50">
              <img src={currentUser.photo} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-4">
              <textarea
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                placeholder={t("shareProgress")}
                className="w-full bg-slate-50 border-none rounded-2xl p-4 text-base font-medium focus:ring-4 focus:ring-emerald-100 min-h-[100px] resize-none transition-all"
              />

              {/* IMAGE PREVIEW */}
              <AnimatePresence>
                {preview && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative rounded-3xl overflow-hidden border-4 border-slate-50 group shadow-lg"
                  >
                    <img src={preview} className="w-full h-48 object-cover" alt="Preview" />
                    <button
                      onClick={removeImage}
                      className="absolute top-3 right-3 h-10 w-10 bg-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between pt-4">
                <div className="flex gap-4">
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} hidden accept="image/*" />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors"
                  >
                    <ImageIcon className="h-6 w-6" />
                  </button>

                </div>

                <Button
                  disabled={isPosting || (!problemText && !imageFile)}
                  onClick={handleCreatePost}
                  className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-black text-sm uppercase tracking-widest px-10 h-14 rounded-2xl shadow-xl shadow-emerald-200"
                >
                  {isPosting ? <Loader2 className="h-5 w-5 animate-spin" /> : t("postNow")}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* FEED */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-20"><Loader2 className="h-10 w-10 animate-spin mx-auto text-emerald-200" /></div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[40px] border-4 border-dashed border-emerald-50">
              <div className="h-20 w-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-10 w-10 text-emerald-200" />
              </div>
              <p className="text-emerald-900/40 font-black uppercase text-sm tracking-widest">{t("noPostsYet") || "No posts yet. Be the first to ask!"}</p>
            </div>
          ) : (
            posts.map(post => {
              const postReplies = replies[post.id] || [];
              const hasAiReply = postReplies.some(r => r.type === "AI" && !r.error);
              const aiReplyDoc = postReplies.find(r => r.type === "AI");

              return (
                <motion.div key={post.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <Card className="rounded-[40px] border-none shadow-2xl bg-white overflow-hidden p-10 mb-10 group relative max-w-xl mx-auto">

                    {/* 1. USER INFO */}
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex gap-4">
                        <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-xl border-4 border-emerald-50 bg-emerald-50">
                          <img 
                            src={post.userPhoto?.includes("pravatar.cc") ? "/farmer_avatar.png" : (post.userPhoto || "/farmer_avatar.png")} 
                            className="w-full h-full object-cover" 
                            onError={(e) => (e.currentTarget.src = "/farmer_avatar.png")}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-black text-[#111] text-xl leading-none">{post.userName}</h4>
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-50" />
                          </div>
                          <div className="flex items-center gap-2 mt-2 opacity-40 font-black text-xs uppercase tracking-widest text-[#1B5E20]">
                            <MapPin className="h-4 w-4" /> {post.location}
                            <span className="h-1.5 w-1.5 bg-emerald-300 rounded-full" />
                            {formatTime(post.createdAt)}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="h-12 w-12 rounded-2xl text-slate-200 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center"
                      >
                        <Trash2 className="h-6 w-6" />
                      </button>
                    </div>

                    {/* 2. PROBLEM TEXT */}
                    <p className="text-[#1B5E20] text-xl font-bold leading-relaxed mb-8 px-2">
                      {post.problemText}
                    </p>

                    {/* 3. IMAGE */}
                    {post.imageUrl && (
                      <div className="rounded-[40px] overflow-hidden shadow-2xl mb-10 border-8 border-slate-50">
                        <img src={post.imageUrl} className="w-full h-auto" alt="Problem" />
                      </div>
                    )}

                    {/* PART 4: AI LOADING STATE TRANSITION */}
                    {!aiReplyDoc ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-10 bg-emerald-50/50 rounded-[40px] p-8 border-4 border-dashed border-emerald-100 flex flex-col items-center justify-center gap-4 py-12"
                      >
                        <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
                        </div>
                        <span className="text-emerald-800 font-extrabold text-sm uppercase tracking-[0.3em] ml-2">🤖 {t("analyzing")}</span>
                      </motion.div>
                    ) : aiReplyDoc.error ? (
                      <div className="mb-10 bg-red-50 rounded-[40px] p-8 border-4 border-dashed border-red-100 flex items-center justify-center flex-col gap-3">
                        <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-md">
                          <X className="h-6 w-6 text-red-500" />
                        </div>
                        <span className="text-red-600 font-black text-xs uppercase tracking-widest text-center px-4">{t("expertAssistantBusy")}</span>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="mb-10 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl shadow-emerald-950/20"
                      >
                        <div className="absolute top-0 right-0 p-12 opacity-5"><Sparkles className="h-40 w-40" /></div>
                        <div className="flex items-center gap-4 mb-8 relative z-10">
                          <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/20">
                            <span className="text-2xl">🤖</span>
                          </div>
                          <div>
                            <h5 className="font-black text-xs uppercase tracking-[0.3em] text-emerald-300 mb-1">{t("expertProtocolGenerated")}</h5>
                            <p className="font-black text-lg italic tracking-tight">{t("expertHelp")}</p>
                          </div>
                        </div>

                        <div className="space-y-8 relative z-10">
                          {aiReplyDoc.content.split('\n\n').map((chunk: string, i: number) => {
                            if (chunk.includes('🔍')) return <div key={i} className="bg-white/10 p-6 rounded-3xl border border-white/10 backdrop-blur-md"><p className="text-base font-bold italic text-emerald-50">{chunk}</p></div>;
                            if (chunk.includes('💊')) return (
                              <div key={i} className="space-y-4">
                                <p className="text-xs font-black uppercase tracking-[0.4em] text-emerald-400 flex items-center gap-3">
                                  <Check className="h-4 w-4" /> SOLUTION STEPS
                                </p>
                                <div className="space-y-3">
                                  {chunk.replace('💊 Solution Steps', '').split('\n').filter(l => l.trim()).map((l, li) => (
                                    <div key={li} className="bg-white/5 p-4 rounded-2xl text-sm font-bold border border-white/5 transition-colors hover:bg-white/10">
                                      {l.replace(/^\d+\.\s*/, '')}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                            if (chunk.includes('🌿')) return <p key={i} className="text-sm font-bold bg-white/5 p-6 rounded-3xl italic border-l-8 border-yellow-400 backdrop-blur-sm">{chunk}</p>;
                            if (chunk.includes('⚠️')) return <div key={i} className="bg-red-500/20 p-6 rounded-3xl border border-red-500/30 flex gap-4 text-sm font-black italic shadow-lg"><span>⚠️</span> {chunk.replace('⚠️', '').replace('Warning', '')}</div>;
                            return <p key={i} className="text-lg text-emerald-100 leading-relaxed font-semibold">{chunk}</p>;
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* PART 10: UI ORDER -> 5. ACTIONS & COMMENTS (Only after AI Reply) */}
                    <AnimatePresence>
                      {hasAiReply && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="space-y-10"
                        >
                          <div className="flex items-center justify-between pt-8 border-t-4 border-slate-50">
                            <div className="flex gap-6">
                              <button
                                onClick={() => toggleLike(post.id, post.userId)}
                                className={cn(
                                  "flex items-center gap-3 h-14 px-8 rounded-2xl font-black text-xs uppercase transition-all active:scale-95 shadow-lg shadow-emerald-900/5",
                                  likes[post.id]?.some(l => l.userId === currentUser.id)
                                    ? "bg-red-50 text-red-600 border-2 border-red-100"
                                    : "bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
                                )}
                              >
                                <Heart className={cn("h-5 w-5", likes[post.id]?.some(l => l.userId === currentUser.id) && "fill-red-600")} />
                                {post.likesCount || 0}
                              </button>
                              <button 
                                onClick={() => setShowComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                                className={cn(
                                  "flex items-center gap-3 h-14 px-8 rounded-2xl font-black text-xs uppercase transition-all shadow-lg shadow-emerald-900/5",
                                  showComments[post.id] ? "bg-emerald-700 text-white" : "bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
                                )}
                              >
                                <MessageSquare className="h-5 w-5" /> 
                                {comments[post.id]?.length || 0}
                              </button>
                            </div>
                            <button
                              onClick={() => sharePost(post.id)}
                              className="h-14 w-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center hover:bg-emerald-100 transition-all shadow-lg shadow-emerald-900/5"
                            >
                              <Share2 className="h-6 w-6" />
                            </button>
                          </div>

                          {/* 6. COMMENTS SECTION */}
                          <AnimatePresence>
                            {showComments[post.id] && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pt-8 border-t-4 border-slate-50 overflow-hidden"
                              >
                                {comments[post.id]?.length > 0 && (
                                  <div className="space-y-6 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    {comments[post.id].map(comment => (
                                      <div key={comment.id} className="flex gap-4 group/comment">
                                        <div className="h-10 w-10 rounded-xl overflow-hidden shadow-md flex-shrink-0 border-2 border-emerald-50 bg-emerald-50">
                                          <img 
                                            src={comment.userPhoto?.includes("pravatar.cc") ? "/farmer_avatar.png" : (comment.userPhoto || "/farmer_avatar.png")} 
                                            className="w-full h-full object-cover" 
                                            onError={(e) => (e.currentTarget.src = "/farmer_avatar.png")}
                                          />
                                        </div>
                                        <div className="flex-1 bg-slate-50 rounded-[24px] p-5 transition-colors group-hover/comment:bg-emerald-50/30">
                                          <div className="flex justify-between items-center mb-1">
                                            <p className="text-[11px] font-black text-emerald-900 uppercase tracking-widest">{comment.userName}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">{formatTime(comment.createdAt)}</p>
                                          </div>
                                          <p className="text-sm text-slate-700 font-bold leading-snug">{comment.text}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                <div className="flex gap-4">
                                  <div className="h-12 w-12 rounded-xl overflow-hidden bg-emerald-50 flex-shrink-0 shadow-inner">
                                    <img src={currentUser.photo} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-1 relative group/input">
                                    <input
                                      value={commentText[post.id] || ""}
                                      onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                                      onKeyDown={(e) => e.key === "Enter" && addComment(post.id, post.userId)}
                                      placeholder={t("addComment")}
                                      className="w-full h-12 bg-slate-50 border-none rounded-[18px] px-6 pr-14 text-sm font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-emerald-100 transition-all"
                                    />
                                    <button
                                      onClick={() => addComment(post.id, post.userId)}
                                      className="absolute right-2 top-2 h-8 w-8 bg-emerald-700 text-white rounded-xl flex items-center justify-center hover:bg-emerald-900 transition-all shadow-md active:scale-95"
                                    >
                                      <Send className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
