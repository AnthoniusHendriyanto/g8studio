import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import Links from "./pages/Links";
import NotFound from "./pages/NotFound";
import Analytics from "./components/Analytics";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import PartnerManager from "./pages/admin/Partners";
import PortfolioManager from "./pages/admin/PortfolioPage";

const queryClient = new QueryClient();

const App = () => (
    <HelmetProvider>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <LanguageProvider>
                    <TooltipProvider>
                        <Toaster />
                        <Sonner />
                        <BrowserRouter>
                            <ScrollToTop />
                            <Analytics />
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
                                </Route>

                                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </BrowserRouter>
                    </TooltipProvider>
                </LanguageProvider>
            </AuthProvider>
        </QueryClientProvider>
    </HelmetProvider>
);

export default App;