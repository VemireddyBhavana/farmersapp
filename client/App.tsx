import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Layout from "./components/Layout";
import Placeholder from "./pages/Placeholder";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Weather from "./pages/Weather";
import Market from "./pages/Market";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/rent" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/owner" element={<OwnerDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/how-it-works" element={<Index />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />

            {/* Feature Routes */}
            <Route path="/ai-assistant" element={<Placeholder title="AI Farming Assistant" />} />
            <Route path="/market" element={<Market />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/about" element={<Placeholder title="About Smart Farmer" />} />
            <Route path="/privacy" element={<Placeholder title="Privacy Policy" />} />
            <Route path="/terms" element={<Placeholder title="Terms of Service" />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
