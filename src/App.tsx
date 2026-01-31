import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import Links from "./pages/Links";
import NotFound from "./pages/NotFound";
import Analytics from "./components/Analytics";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Lazy load admin pages for better performance
const Login = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const PartnerManager = lazy(() => import("./pages/admin/Partners"));
const PortfolioManager = lazy(() => import("./pages/admin/PortfolioPage"));
const HeroManager = lazy(() => import("./pages/admin/HeroManager"));
const LinkManager = lazy(() => import("./pages/admin/LinkManager"));

const queryClient = new QueryClient();

const App = () => (
    <ErrorBoundary>
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <TooltipProvider>
                        <Toaster />
                        <Sonner />
                        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                            <ScrollToTop />
                            <Analytics />
                            <Suspense fallback={
                                <div className="min-h-screen flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                </div>
                            }>
                                <Routes>
                                    <Route path="/" element={<Index />} />
                                    <Route path="/services" element={<Services />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/portfolio" element={<Portfolio />} />
                                    <Route path="/links" element={<Links />} />

                                    {/* Admin Routes */}
                                    <Route path="/admin/login" element={<Login />} />
                                    <Route path="/admin" element={
                                        <ProtectedRoute>
                                            <AdminDashboard />
                                        </ProtectedRoute>
                                    }>
                                        <Route path="partners" element={<PartnerManager />} />
                                        <Route path="portfolio" element={<PortfolioManager />} />
                                        <Route path="hero" element={<HeroManager />} />
                                        <Route path="links" element={<LinkManager />} />
                                    </Route>

                                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </Suspense>
                        </BrowserRouter>
                    </TooltipProvider>
                </AuthProvider>
            </QueryClientProvider>
        </HelmetProvider>
    </ErrorBoundary>
);

export default App;