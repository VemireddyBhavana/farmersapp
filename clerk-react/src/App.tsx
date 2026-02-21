import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";

// ─── Eagerly loaded pages ────────────────────────────────────
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

// ─── Lazy loaded pages ───────────────────────────────────────
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const OwnerDashboard = lazy(() => import("@/pages/OwnerDashboard"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const Weather = lazy(() => import("@/pages/Weather"));
const Market = lazy(() => import("@/pages/Market"));
const GovernmentSchemes = lazy(() => import("@/pages/GovernmentSchemes"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const Ratings = lazy(() => import("@/pages/Ratings"));
const MapView = lazy(() => import("@/pages/MapView"));
const AIAssistant = lazy(() => import("@/pages/AIAssistant"));
const PlantingCalendar = lazy(() => import("@/pages/PlantingCalendar"));
const PestAlerts = lazy(() => import("@/pages/PestAlerts"));
const GrowingGuide = lazy(() => import("@/pages/GrowingGuide"));
const SupportForm = lazy(() => import("@/pages/SupportForm"));
const TrackApplications = lazy(() => import("@/pages/TrackApplications"));

// Clerk Auth Page replacement
import ClerkAuthPage from "@/pages/ClerkAuth";

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-muted-foreground text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={<Index />}
            />
            <Route
              path="/login"
              element={
                <SignedOut>
                  <ClerkAuthPage />
                </SignedOut>
              }
            />
            <Route
              path="/register"
              element={
                <SignedOut>
                  <ClerkAuthPage />
                </SignedOut>
              }
            />
            <Route path="/how-it-works" element={<Index />} />

            {/* Protected Routes (Require Login) */}
            <Route
              path="/dashboard"
              element={
                <SignedIn>
                  <Dashboard />
                </SignedIn>
              }
            />
            <Route
              path="/rent"
              element={
                <SignedIn>
                  <Dashboard />
                </SignedIn>
              }
            />
            <Route
              path="/weather"
              element={
                <SignedIn>
                  <Weather />
                </SignedIn>
              }
            />
            <Route
              path="/market"
              element={
                <SignedIn>
                  <Market />
                </SignedIn>
              }
            />
            <Route
              path="/schemes"
              element={
                <SignedIn>
                  <GovernmentSchemes />
                </SignedIn>
              }
            />
            <Route
              path="/notifications"
              element={
                <SignedIn>
                  <Notifications />
                </SignedIn>
              }
            />
            <Route
              path="/ratings"
              element={
                <SignedIn>
                  <Ratings />
                </SignedIn>
              }
            />
            <Route
              path="/map"
              element={
                <SignedIn>
                  <MapView />
                </SignedIn>
              }
            />
            <Route
              path="/ai-assistant"
              element={
                <SignedIn>
                  <AIAssistant />
                </SignedIn>
              }
            />
            <Route
              path="/planting-calendar"
              element={
                <SignedIn>
                  <PlantingCalendar />
                </SignedIn>
              }
            />
            <Route
              path="/pest-alerts"
              element={
                <SignedIn>
                  <PestAlerts />
                </SignedIn>
              }
            />
            <Route
              path="/growing-guide/:id"
              element={
                <SignedIn>
                  <GrowingGuide />
                </SignedIn>
              }
            />
            <Route
              path="/apply/:type"
              element={
                <SignedIn>
                  <SupportForm />
                </SignedIn>
              }
            />
            <Route
              path="/track-applications"
              element={
                <SignedIn>
                  <TrackApplications />
                </SignedIn>
              }
            />

            {/* Owner/Admin (Simplified for now, can use Clerk roles later) */}
            <Route
              path="/owner"
              element={
                <SignedIn>
                  <OwnerDashboard />
                </SignedIn>
              }
            />
            <Route
              path="/admin"
              element={
                <SignedIn>
                  <AdminDashboard />
                </SignedIn>
              }
            />

            {/* Redirect if signed in and accessing login */}
            <Route
              path="/login"
              element={
                <SignedIn>
                  <Navigate to="/dashboard" replace />
                </SignedIn>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
      <Toaster />
    </BrowserRouter>
  );
}
