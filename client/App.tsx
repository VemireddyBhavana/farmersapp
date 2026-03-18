import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import TractorRental from "./pages/TractorRental";
import LoginPage from "./pages/LoginPage";
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
import { SignedIn, SignedOut } from "@clerk/clerk-react";
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
import { LocationProvider } from "./lib/LocationContext";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <>
            <SignedIn><Navigate to="/dashboard" replace /></SignedIn>
            <SignedOut><LoginPage /></SignedOut>
          </>
        }
      />
      <Route path="/register" element={<Navigate to="/login" replace />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <>
            <SignedIn><Index /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn><Dashboard /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/rent"
        element={
          <>
            <SignedIn><TractorRental /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/owner"
        element={
          <>
            <SignedIn><OwnerDashboard /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/admin"
        element={
          <>
            <SignedIn><AdminDashboard /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/weather"
        element={
          <>
            <SignedIn><Weather /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/market"
        element={
          <>
            <SignedIn><Market /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/mandi/:id"
        element={
          <>
            <SignedIn><MandiDetail /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/calendar"
        element={
          <>
            <SignedIn><Calendar /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/pests"
        element={
          <>
            <SignedIn><Pests /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/chat"
        element={
          <>
            <SignedIn><Chat /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/knowledge"
        element={
          <>
            <SignedIn><AgriKnowledge /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/agri-schemes"
        element={
          <>
            <SignedIn><AgriSchemes /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/help-center"
        element={
          <>
            <SignedIn><HelpCenter /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/growing-guide"
        element={
          <>
            <SignedIn><GrowingGuide /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/support"
        element={
          <>
            <SignedIn><Support /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/seeds"
        element={
          <>
            <SignedIn><SeedsBuyer /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/whatsapp-bot"
        element={
          <>
            <SignedIn><WhatsAppChat /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/location"
        element={
          <>
            <SignedIn><Location /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/kisan-suvidha"
        element={
          <>
            <SignedIn><KisanSuvidhaPortal /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />

      {/* AgroStar Corporate Pages */}
      <Route
        path="/techspark"
        element={
          <>
            <SignedIn><TechSparkAI /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/impact"
        element={
          <>
            <SignedIn><Impact /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />

      <Route
        path="/market-linkage"
        element={
          <>
            <SignedIn><MarketLinkage /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/omnichannel"
        element={
          <>
            <SignedIn><Omnichannel /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/join-us"
        element={
          <>
            <SignedIn><JoinUs /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />

      {/* Company Pages */}
      <Route
        path="/about"
        element={
          <>
            <SignedIn><About /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
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
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/contact"
        element={
          <>
            <SignedIn><Contact /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/privacy"
        element={
          <>
            <SignedIn><Privacy /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
          </>
        }
      />
      <Route
        path="/terms"
        element={
          <>
            <SignedIn><Terms /></SignedIn>
            <SignedOut><Navigate to="/login" replace /></SignedOut>
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
        <LocationProvider>
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
        </LocationProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
