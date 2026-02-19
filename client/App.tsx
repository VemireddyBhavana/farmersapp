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
import Calendar from "./pages/Calendar";
import Pests from "./pages/Pests";
import Chat from "./pages/Chat";
import AgriSchemes from "./pages/AgriSchemes";
import HelpCenter from "./pages/HelpCenter";

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
            <Route path="/ai-assistant" element={<Chat />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/market" element={<Market />} />
            <Route path="/Market" element={<Market />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/Weather" element={<Weather />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route path="/pests" element={<Pests />} />
            <Route path="/Pests" element={<Pests />} />
            <Route path="/agri-schemes" element={<AgriSchemes />} />
            <Route path="/AgriSchemes" element={<AgriSchemes />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/GovernmentHelpCenter" element={<HelpCenter />} />
            <Route path="/Home" element={<Index />} />

            {/* Placeholder Routes */}
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
