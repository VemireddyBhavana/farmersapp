import { useState } from "react";
import { motion } from "framer-motion";
import {
  Tractor,
  Users,
  ShieldAlert,
  BarChart3,
  Search,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Trash2,
  Eye,
  Filter,
  Download,
  AlertTriangle,
  LayoutDashboard,
  Settings,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const adminStats = [
  { label: "Total Users", value: "1,254", icon: Users, color: "text-blue-600 bg-blue-100" },
  { label: "Active Bookings", value: "342", icon: Clock, color: "text-green-600 bg-green-100" },
  { label: "Pending Verifications", value: "28", icon: ShieldAlert, color: "text-amber-600 bg-amber-100" },
  { label: "Platform Revenue", value: "₹1.2M", icon: BarChart3, color: "text-primary bg-primary/10" },
];

const usersData = [
  { id: 1, name: "Ramarao V.", role: "Farmer", location: "Chittoor, AP", joined: "Oct 2, 2023", status: "Active" },
  { id: 2, name: "Suresh K.", role: "Owner", location: "Nellore, AP", joined: "Sep 28, 2023", status: "Active" },
  { id: 3, name: "Anita Devi", role: "Farmer", location: "Kadapa, AP", joined: "Oct 5, 2023", status: "Pending" },
  { id: 4, name: "Lokesh M.", role: "Owner", location: "Tirupati, AP", joined: "Sep 25, 2023", status: "Banned" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Users");

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Admin Navbar */}
      <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-destructive p-1.5 rounded-lg">
              <ShieldAlert className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">AgriAdmin <Badge className="ml-2 bg-destructive/10 text-destructive hover:bg-destructive/10 border-none">SuperUser</Badge></span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="h-10 w-10 rounded-full bg-muted border overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {adminStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="rounded-[2rem] border-primary/5 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className={cn("p-3 rounded-2xl", stat.color)}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="text-green-600 bg-green-50">+12%</Badge>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users, equipment, or bookings..."
              className="pl-10 rounded-full bg-white border-primary/10 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <Button variant="outline" className="rounded-full gap-2 flex-shrink-0">
              <Filter className="h-4 w-4" /> Filters
            </Button>
            <Button variant="outline" className="rounded-full gap-2 flex-shrink-0">
              <Download className="h-4 w-4" /> Export Data
            </Button>
            <Button className="rounded-full bg-destructive hover:bg-destructive/90 gap-2 flex-shrink-0">
              <AlertTriangle className="h-4 w-4" /> System Alerts
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <Card className="rounded-[2rem] border-primary/5 shadow-sm overflow-hidden bg-white">
          <CardHeader className="p-8 border-b bg-muted/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-bold">User Management</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Review and manage platform members</p>
              </div>
              <div className="flex gap-2 p-1 bg-muted rounded-xl">
                {["Users", "Equipment", "Bookings"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                      activeTab === tab ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 border-none">
                    <TableHead className="py-5 font-bold text-primary px-8">User</TableHead>
                    <TableHead className="font-bold text-primary">Role</TableHead>
                    <TableHead className="font-bold text-primary">Location</TableHead>
                    <TableHead className="font-bold text-primary">Joined Date</TableHead>
                    <TableHead className="font-bold text-primary text-center">Status</TableHead>
                    <TableHead className="font-bold text-primary text-right px-8">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersData.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/10 transition-colors border-b border-primary/5">
                      <TableCell className="py-5 px-8">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted border flex-shrink-0 overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="" />
                          </div>
                          <span className="font-bold">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn(
                          user.role === "Owner" ? "border-blue-200 text-blue-700 bg-blue-50" : "border-green-200 text-green-700 bg-green-50"
                        )}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {user.location}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-medium text-muted-foreground">{user.joined}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={cn(
                          "rounded-full",
                          user.status === "Active" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                          user.status === "Pending" ? "bg-amber-100 text-amber-700 hover:bg-amber-100" :
                          "bg-red-100 text-red-700 hover:bg-red-100"
                        )}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-primary hover:bg-primary/5">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-destructive hover:bg-destructive/5">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-8 flex items-center justify-between border-t">
              <p className="text-sm text-muted-foreground font-medium">Showing 1 to 4 of 1,254 users</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-lg px-4" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="rounded-lg px-4 bg-primary text-white hover:bg-primary/90">1</Button>
                <Button variant="outline" size="sm" className="rounded-lg px-4 hover:bg-primary/5">2</Button>
                <Button variant="outline" size="sm" className="rounded-lg px-4 hover:bg-primary/5">3</Button>
                <Button variant="outline" size="sm" className="rounded-lg px-4 hover:bg-primary/5">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
