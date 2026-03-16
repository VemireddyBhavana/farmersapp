import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import TractorRental from "./pages/TractorRental";
import Auth from "./pages/Auth";
import Layout from "./components/Layout";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Weather from "./pages/Weather";
import Market from "./pages/Market";
import Calendar from "./pages/Calendar";
import Pests from "./pages/Pests";
import Chat from "./pages/Chat";
import AgriSchemes from "./pages/AgriSchemes";
import HelpCenter from "./pages/HelpCenter";
import GrowingGuide from "./pages/GrowingGuide";
import Support from "./pages/Support";
import { AuthProvider } from "./lib/AuthContext";
import { LanguageProvider } from "./lib/LanguageContext";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import About from "./pages/About";
import Vision from "./pages/Vision";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Placeholder from "./pages/Placeholder";
import Location from "./pages/Location";
import SeedsBuyer from "./pages/SeedsBuyer";
import WhatsAppChat from "./pages/WhatsAppChat";
import { FloatingChatbot } from "./components/FloatingChatbot";
import AgriKnowledge from "./pages/AgriKnowledge";
import Impact from "./pages/Impact";
import Explore from "./pages/Explore";

import TechSparkAI from "./pages/TechSparkAI";
import MarketLinkage from "./pages/MarketLinkage";
import Omnichannel from "./pages/Omnichannel";
import JoinUs from "./pages/JoinUs";
import MandiDetail from "./pages/MandiDetail";
import { VoiceAssistant } from "./components/VoiceAssistant";
import KisanSuvidhaPortal from "./pages/KisanSuvidhaPortal";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={<Index />}
      />
      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn><Dashboard /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/rent"
        element={
          <>
            <SignedIn><TractorRental /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/owner"
        element={
          <>
            <SignedIn><OwnerDashboard /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/admin"
        element={
          <>
            <SignedIn><AdminDashboard /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/weather"
        element={
          <>
            <SignedIn><Weather /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/market"
        element={
          <>
            <SignedIn><Market /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/mandi/:id"
        element={
          <>
            <SignedIn><MandiDetail /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/calendar"
        element={
          <>
            <SignedIn><Calendar /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/pests"
        element={
          <>
            <SignedIn><Pests /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/chat"
        element={
          <>
            <SignedIn><Chat /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/knowledge"
        element={
          <>
            <SignedIn><AgriKnowledge /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/agri-schemes"
        element={
          <>
            <SignedIn><AgriSchemes /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/help-center"
        element={
          <>
            <SignedIn><HelpCenter /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/growing-guide"
        element={
          <>
            <SignedIn><GrowingGuide /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/support"
        element={
          <>
            <SignedIn><Support /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/seeds"
        element={
          <>
            <SignedIn><SeedsBuyer /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/whatsapp-bot"
        element={
          <>
            <SignedIn><WhatsAppChat /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/location"
        element={
          <>
            <SignedIn><Location /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/kisan-suvidha"
        element={
          <>
            <SignedIn><KisanSuvidhaPortal /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />

      {/* AgroStar Corporate Pages */}
      <Route
        path="/techspark"
        element={
          <>
            <SignedIn><TechSparkAI /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/impact"
        element={
          <>
            <SignedIn><Impact /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />

      <Route
        path="/market-linkage"
        element={
          <>
            <SignedIn><MarketLinkage /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/omnichannel"
        element={
          <>
            <SignedIn><Omnichannel /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/join-us"
        element={
          <>
            <SignedIn><JoinUs /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />

      {/* Company Pages */}
      <Route
        path="/about"
        element={
          <>
            <SignedIn><About /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/explore"
        element={<Explore />}
      />
      <Route
        path="/vision"
        element={
          <>
            <SignedIn><Vision /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/contact"
        element={
          <>
            <SignedIn><Contact /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/privacy"
        element={
          <>
            <SignedIn><Privacy /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />
      <Route
        path="/terms"
        element={
          <>
            <SignedIn><Terms /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        }
      />

      {/* Legacy/Utility Redirects */}
      <Route path="/Home" element={<Navigate to="/" replace />} />
      <Route path="/Weather" element={<Navigate to="/weather" replace />} />
      <Route path="/Market" element={<Navigate to="/market" replace />} />
      <Route path="/Calendar" element={<Navigate to="/calendar" replace />} />
      <Route path="/Pests" element={<Navigate to="/pests" replace />} />
      <Route path="/Chat" element={<Navigate to="/chat" replace />} />
      <Route path="/AgriSchemes" element={<Navigate to="/agri-schemes" replace />} />
      <Route path="/GovernmentHelpCenter" element={<Navigate to="/help-center" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Layout>
              <AppRoutes />
            </Layout>
            <VoiceAssistant />
            <FloatingChatbot />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
