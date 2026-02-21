import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import GrowingGuide from "./pages/GrowingGuide";
import { AuthProvider, useAuth } from "./lib/AuthContext";
import { LanguageProvider } from "./lib/LanguageContext";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rent"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/owner"
        element={
          <ProtectedRoute>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/weather"
        element={
          <ProtectedRoute>
            <Weather />
          </ProtectedRoute>
        }
      />
      <Route
        path="/market"
        element={
          <ProtectedRoute>
            <Market />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pests"
        element={
          <ProtectedRoute>
            <Pests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agri-schemes"
        element={
          <ProtectedRoute>
            <AgriSchemes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help-center"
        element={
          <ProtectedRoute>
            <HelpCenter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/growing-guide"
        element={
          <ProtectedRoute>
            <GrowingGuide />
          </ProtectedRoute>
        }
      />

      {/* Legacy Aliases for SEO/Bookmark Compatibility */}
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
          <BrowserRouter>
            <Layout>
              <AppRoutes />
            </Layout>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
