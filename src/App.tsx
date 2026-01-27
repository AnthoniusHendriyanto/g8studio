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

const queryClient = new QueryClient();

const App = () => (
    <HelmetProvider>
        <QueryClientProvider client={queryClient}>
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
                            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
            </LanguageProvider>
        </QueryClientProvider>
    </HelmetProvider>
);

export default App;