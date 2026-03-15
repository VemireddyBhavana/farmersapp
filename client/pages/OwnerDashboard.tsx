import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tractor,
  LayoutDashboard,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Settings,
  Bell,
  Search,
  Filter,
  DollarSign,
  Users,
  Calendar,
  IndianRupee,
  Menu,
  X,
  Edit,
  Trash2,
  Eye,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const ownerStats = [
  { label: "Total Earnings", value: "₹45,800", icon: IndianRupee, color: "text-green-600 bg-green-100" },
  { label: "Active Rentals", value: "03", icon: Clock, color: "text-blue-600 bg-blue-100" },
  { label: "Pending Requests", value: "05", icon: Bell, color: "text-amber-600 bg-amber-100" },
  { label: "Total Equipment", value: "08", icon: Tractor, color: "text-primary bg-primary/10" },
];

const myEquipment = [
  { id: 1, name: "John Deere 5310 GearPro", status: "Available", price: 800, rentals: 42, image: "/tractor_premium.png" },
  { id: 2, name: "Mahindra 275 DI TU", status: "Rented", price: 600, rentals: 28, image: "/tractor_mahindra.png" },
  { id: 3, name: "Rotavator - 7 Feet", status: "Maintenance", price: 300, rentals: 15, image: "/tractor_premium.png" },
];

const pendingRequests = [
  { id: 101, farmer: "Ramarao", equipment: "John Deere 5310", date: "Oct 12, 2023", duration: "8 hrs", status: "Pending" },
  { id: 102, farmer: "Srinivas", equipment: "Mahindra 275 DI", date: "Oct 14, 2023", duration: "1 day", status: "Pending" },
];

export default function OwnerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const sidebarLinks = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "My Equipment", icon: Tractor },
    { name: "Booking Requests", icon: Bell },
    { name: "Earnings", icon: TrendingUp },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-muted/30 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            className="fixed lg:relative z-40 w-64 h-full bg-white border-r p-6 space-y-8 flex-shrink-0"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold text-primary">Owner Panel</span>
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="space-y-2">
              {sidebarLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => setActiveTab(link.name)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    activeTab === link.name 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </button>
              ))}
            </nav>

            <div className="pt-20">
              <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 rounded-xl">
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{activeTab}</h2>
              <p className="text-sm text-muted-foreground">Managing your agricultural fleet</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button className="rounded-full shadow-lg hover:shadow-xl transition-all gap-2">
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Add Equipment</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ownerStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="rounded-3xl border-primary/5 hover:border-primary/10 transition-all shadow-sm">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={cn("p-3 rounded-2xl", stat.color)}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Dashboard Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Equipment List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Your Fleet</h3>
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5">View All</Button>
            </div>
            <div className="grid gap-4">
              {myEquipment.map((item) => (
                <Card key={item.id} className="rounded-3xl border-primary/5 hover:shadow-md transition-all">
                  <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-6">
                    <img src={item.image} className="h-24 w-full sm:w-32 rounded-2xl object-cover" alt="" />
                    <div className="flex-1 space-y-1 text-center sm:text-left">
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-3 w-3" /> {item.price}/hr
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {item.rentals} Rentals
                        </span>
                      </div>
                      <Badge className={cn(
                        "mt-2",
                        item.status === "Available" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                        item.status === "Rented" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                        "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      )}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full h-10 w-10 text-destructive border-destructive/20 hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pending Bookings */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Booking Requests</h3>
              <Badge className="bg-amber-500">{pendingRequests.length} New</Badge>
            </div>
            <div className="space-y-4">
              {pendingRequests.map((req) => (
                <Card key={req.id} className="rounded-[2rem] border-primary/5 hover:shadow-md transition-all">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${req.farmer}`} alt="" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{req.farmer}</p>
                        <p className="text-xs text-muted-foreground">Farmer from Kadapa</p>
                      </div>
                    </div>
                    <div className="space-y-2 p-4 rounded-2xl bg-muted/30">
                      <p className="text-xs font-bold text-primary uppercase">{req.equipment}</p>
                      <div className="flex justify-between text-xs font-medium">
                        <span>Date: {req.date}</span>
                        <span>Duration: {req.duration}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 rounded-xl bg-green-600 hover:bg-green-700 text-xs h-10">
                        <CheckCircle2 className="h-4 w-4 mr-2" /> Accept
                      </Button>
                      <Button variant="outline" className="flex-1 rounded-xl text-destructive border-destructive/20 hover:bg-destructive/10 text-xs h-10">
                        <XCircle className="h-4 w-4 mr-2" /> Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
