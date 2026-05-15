export interface Application {
  id: string;
  schemeName: string;
  status: "Pending" | "Approved" | "Rejected";
  date: string;
  userId: string;
  beneficiaryName: string;
  location: string;
  verificationStep: string;
}

export interface Booking {
  id: string;
  equipmentName: string;
  date: string;
  duration: number;
  status: "Confirmed" | "Cancelled";
  userId: string;
}

export interface PostComment {
  id: string;
  authorName: string;
  authorRole: string;
  content: string;
  timestamp: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: string;
  location: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  upvotes: number;
  comments: PostComment[];
  timestamp: string;
  isOfflineDraft?: boolean;
}

class MockBackend {
  private applications: Application[] = [];
  private bookings: Booking[] = [];
  private communityPosts: CommunityPost[] = [
    {
      id: "POST-1",
      authorName: "Ramesh Kumar",
      authorRole: "Progressive Farmer",
      location: "Punjab, India",
      content: "Just implemented drip irrigation for my wheat crop. Seeing a 30% reduction in water usage already. Anyone else trying this?",
      tags: ["Irrigation", "Wheat", "WaterSaving"],
      upvotes: 124,
      comments: [
        { id: "C1", authorName: "Dr. Sharma", authorRole: "Verified Agronomist", content: "Excellent work Ramesh. Ensure you check the emitters for clogging every month.", timestamp: new Date(Date.now() - 86400000).toISOString() }
      ],
      timestamp: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: "POST-2",
      authorName: "Venkat Reddy",
      authorRole: "Farmer",
      location: "Andhra Pradesh, India",
      content: "My chilli leaves are curling upwards and turning yellow. What could be the issue?",
      tags: ["Chilli", "Disease", "Help"],
      upvotes: 45,
      comments: [],
      timestamp: new Date(Date.now() - 43200000).toISOString()
    }
  ];

  constructor() {
    const savedApps = localStorage.getItem("teachspark_apps");
    if (savedApps) this.applications = JSON.parse(savedApps);

    const savedBookings = localStorage.getItem("teachspark_bookings");
    if (savedBookings) this.bookings = JSON.parse(savedBookings);

    const savedPosts = localStorage.getItem("agri_community_posts");
    if (savedPosts) {
        // Only override if there are posts saved, else use the initial seed
        const parsed = JSON.parse(savedPosts);
        if (parsed.length > 0) this.communityPosts = parsed;
    }
  }

  private save() {
    localStorage.setItem("teachspark_apps", JSON.stringify(this.applications));
    localStorage.setItem("teachspark_bookings", JSON.stringify(this.bookings));
    localStorage.setItem("agri_community_posts", JSON.stringify(this.communityPosts));
  }

  getApplications(userId: string) {
    return this.applications.filter(app => app.userId === userId);
  }

  addApplication(app: Omit<Application, "id" | "date" | "status" | "beneficiaryName" | "location" | "verificationStep">) {
    const newApp: Application = {
      ...app,
      id: "APP-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString(),
      status: "Pending",
      beneficiaryName: "Kisan Suvidha User",
      location: "Anantapur, AP",
      verificationStep: "Document Verification"
    };
    this.applications.push(newApp);
    this.save();
    return newApp;
  }

  getBookings(userId: string) {
    return this.bookings.filter(b => b.userId === userId);
  }

  addBooking(booking: Omit<Booking, "id" | "status">) {
    const newBooking: Booking = {
      ...booking,
      id: "BK-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: "Confirmed"
    };
    this.bookings.push(newBooking);
    this.save();
    return newBooking;
  }

  getCommunityPosts() {
    return [...this.communityPosts].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  addCommunityPost(post: Omit<CommunityPost, "id" | "upvotes" | "comments" | "timestamp">) {
    const newPost: CommunityPost = {
      ...post,
      id: "POST-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      upvotes: 0,
      comments: [],
      timestamp: new Date().toISOString()
    };
    this.communityPosts.push(newPost);
    this.save();
    return newPost;
  }

  upvotePost(postId: string) {
    const post = this.communityPosts.find(p => p.id === postId);
    if (post) {
      post.upvotes += 1;
      this.save();
    }
  }

  addComment(postId: string, comment: Omit<PostComment, "id" | "timestamp">) {
    const post = this.communityPosts.find(p => p.id === postId);
    if (post) {
      post.comments.push({
        ...comment,
        id: "C-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        timestamp: new Date().toISOString()
      });
      this.save();
    }
  }
}

export const backend = new MockBackend();
