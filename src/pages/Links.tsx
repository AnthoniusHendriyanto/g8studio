import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { linkService } from '@/services/links';
import { Loader2 } from 'lucide-react';

// Helper to get icon component by name
const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent || LucideIcons.Link;
};

// Google Analytics event tracking
const trackLinkClick = (title: string, url: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'click', {
            event_category: 'Quick Link',
            event_label: title,
            value: url,
        });
    }
};

const Links = () => {
    // Fetch active links
    const { data: links, isLoading } = useQuery({
        queryKey: ['quick-links'],
        queryFn: linkService.fetchActiveLinks,
    });

    return (
        <>
            <Helmet>
                <title>Links | G8 Studio</title>
                <meta
                    name="description"
                    content="Connect with G8 Studio - WhatsApp, Portfolio, Location, and Marketplace links."
                />
                <meta property="og:title" content="Links | G8 Studio" />
                <meta property="og:url" content="https://g8studio.id/links" />
                <link rel="canonical" href="https://g8studio.id/links" />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8"
                    >
                        <div className="mb-4">
                            <span className="text-4xl font-bold tracking-tight text-foreground">
                                G8<span className="text-accent">.</span>Studio
                            </span>
                        </div>
                        <p className="text-muted-foreground">Interior Design & HPL Material Partner</p>
                        <p className="text-sm text-muted-foreground mt-1">Bandung, Indonesia</p>
                    </motion.div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex items-center justify-center p-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}

                    {/* Links */}
                    {!isLoading && links && (
                        <div className="space-y-4">
                            {links.map((link, index) => {
                                const Icon = getIconComponent(link.icon_name);
                                const isExternal = link.url.startsWith('http');

                                return (
                                    <motion.a
                                        key={link.id}
                                        href={link.url}
                                        target={isExternal ? '_blank' : undefined}
                                        rel={isExternal ? 'noopener noreferrer' : undefined}
                                        onClick={() => trackLinkClick(link.title, link.url)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="block w-full text-white rounded-2xl p-5 shadow-lg transition-all duration-300"
                                        style={{ backgroundColor: link.color }}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h3 className="font-semibold text-lg">{link.title}</h3>
                                            </div>
                                        </div>
                                    </motion.a>
                                );
                            })}
                        </div>
                    )}

                    {/* Empty State */}
                    {!isLoading && links && links.length === 0 && (
                        <div className="text-center p-12 text-muted-foreground">
                            <p>No links available at the moment.</p>
                        </div>
                    )}

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-center mt-8 text-sm text-muted-foreground"
                    >
                        <p>© 2024 G8 Studio. All rights reserved.</p>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Links;
