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
import { SignedIn, SignedOut, AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
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
import Community from "./pages/Community";
import ExpertHelpFull from "./pages/ExpertHelpFull";
import YieldPrediction from "./pages/YieldPrediction";
import SubsidyFinder from "./pages/SubsidyFinder";
import ToolSharing from "./pages/ToolSharing";
import SoilLabLocator from "./pages/SoilLabLocator";
import AgriLoanCalculator from "./pages/AgriLoanCalculator";
import FarmerFinance from "./pages/FarmerFinance";
import PricePredictor from "./pages/PricePredictor";
import D2CMarketplace from "./pages/D2CMarketplace";
import DroneBooking from "./pages/DroneBooking";
import CropHealthMonitor from "./pages/CropHealthMonitor";


import TechSparkAI from "./pages/TechSparkAI";
import MarketLinkage from "./pages/MarketLinkage";
import Omnichannel from "./pages/Omnichannel";
import JoinUs from "./pages/JoinUs";
import MandiDetail from "./pages/MandiDetail";
import KisanSuvidhaPortal from "./pages/KisanSuvidhaPortal";
import { LocationProvider } from "./lib/LocationContext";
import IrrigationStats from "./pages/IrrigationStats";
import FarmMapper from "./pages/FarmMapper";
import FarmerMarket from "./pages/FarmerMarket";
import VoiceNotes from "./pages/VoiceNotes";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/rent" element={<TractorRental />} />
      <Route path="/owner" element={<OwnerDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/market" element={<Market />} />
      <Route path="/mandi/:id" element={<MandiDetail />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/pests" element={<Pests />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/knowledge" element={<AgriKnowledge />} />
      <Route path="/guide/:guideId" element={<AgriKnowledge />} />
      <Route path="/agri-schemes" element={<AgriSchemes />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/growing-guide" element={<GrowingGuide />} />
      <Route path="/support" element={<Support />} />
      <Route path="/seeds" element={<SeedsBuyer />} />
      <Route path="/whatsapp-bot" element={<WhatsAppChat />} />
      <Route path="/location" element={<Location />} />
      <Route path="/irrigation" element={<IrrigationStats />} />
      <Route path="/farm-mapper" element={<FarmMapper />} />
      <Route path="/finance" element={<FarmerFinance />} />
      <Route path="/market-place" element={<FarmerMarket />} />
      <Route path="/voice-notes" element={<VoiceNotes />} />
      <Route path="/kisan-suvidha" element={<KisanSuvidhaPortal />} />
      <Route path="/techspark" element={<TechSparkAI />} />
      <Route path="/impact" element={<Impact />} />
      <Route path="/market-linkage" element={<MarketLinkage />} />
      <Route path="/omnichannel" element={<Omnichannel />} />
      <Route path="/join-us" element={<JoinUs />} />
      <Route path="/about" element={<About />} />
      <Route path="/vision" element={<Vision />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/satellite-analysis" element={<CropHealthMonitor />} />
      <Route path="/community" element={<Community />} />
      <Route path="/expert-consult" element={<ExpertHelpFull />} />
      <Route path="/yield-prediction" element={<YieldPrediction />} />
      <Route path="/subsidy-finder" element={<SubsidyFinder />} />
      <Route path="/tool-sharing" element={<ToolSharing />} />
      <Route path="/soil-lab-locator" element={<SoilLabLocator />} />
      <Route path="/agri-loan-calculator" element={<AgriLoanCalculator />} />
      <Route path="/farmer-finance" element={<FarmerFinance />} />
      <Route path="/price-predictor" element={<PricePredictor />} />
      <Route path="/d2c-marketplace" element={<D2CMarketplace />} />
      <Route path="/drone-booking" element={<DroneBooking />} />
      <Route path="/crop-doctor" element={<CropHealthMonitor />} />
      
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

import { CartProvider } from "./lib/CartContext";
import Checkout from "./pages/Checkout";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <LocationProvider>
          <AuthProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <SignedIn>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/rent" element={<TractorRental />} />
                      <Route path="/owner" element={<OwnerDashboard />} />
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/weather" element={<Weather />} />
                      <Route path="/market" element={<Market />} />
                      <Route path="/mandi/:id" element={<MandiDetail />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/pests" element={<Pests />} />
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/knowledge" element={<AgriKnowledge />} />
                      <Route path="/guide/:guideId" element={<AgriKnowledge />} />
                      <Route path="/agri-schemes" element={<AgriSchemes />} />
                      <Route path="/help-center" element={<HelpCenter />} />
                      <Route path="/growing-guide" element={<GrowingGuide />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/seeds" element={<SeedsBuyer />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/whatsapp-bot" element={<WhatsAppChat />} />
                      <Route path="/location" element={<Location />} />
                      <Route path="/irrigation" element={<IrrigationStats />} />
                      <Route path="/farm-mapper" element={<FarmMapper />} />
                      <Route path="/finance" element={<FarmerFinance />} />
                      <Route path="/market-place" element={<FarmerMarket />} />
                      <Route path="/voice-notes" element={<VoiceNotes />} />
                      <Route path="/kisan-suvidha" element={<KisanSuvidhaPortal />} />
                      <Route path="/techspark" element={<TechSparkAI />} />
                      <Route path="/impact" element={<Impact />} />
                      <Route path="/market-linkage" element={<MarketLinkage />} />
                      <Route path="/omnichannel" element={<Omnichannel />} />
                      <Route path="/join-us" element={<JoinUs />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/vision" element={<Vision />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/explore" element={<Explore />} />
                      <Route path="/satellite-analysis" element={<CropHealthMonitor />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/expert-consult" element={<ExpertHelpFull />} />
                      <Route path="/yield-prediction" element={<YieldPrediction />} />
                      <Route path="/subsidy-finder" element={<SubsidyFinder />} />
                      <Route path="/tool-sharing" element={<ToolSharing />} />
                      <Route path="/soil-lab-locator" element={<SoilLabLocator />} />
                      <Route path="/agri-loan-calculator" element={<AgriLoanCalculator />} />
                      <Route path="/farmer-finance" element={<FarmerFinance />} />
                      <Route path="/price-predictor" element={<PricePredictor />} />
                      <Route path="/d2c-marketplace" element={<D2CMarketplace />} />
                      <Route path="/drone-booking" element={<DroneBooking />} />
                      <Route path="/crop-doctor" element={<CropHealthMonitor />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                  <FloatingChatbot />
                </SignedIn>
                <SignedOut>
                  <Routes>
                    <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                  </Routes>
                </SignedOut>
              </BrowserRouter>
            </CartProvider>
          </AuthProvider>
        </LocationProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
