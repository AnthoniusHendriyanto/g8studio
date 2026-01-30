import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, MessageCircle, ShoppingBag } from 'lucide-react';

const LINKS = [
    {
        icon: MessageCircle,
        title: 'Chat on WhatsApp',
        description: 'Get instant consultation',
        href: 'https://wa.me/628111906879?text=Halo%20G8%20Studio',
        color: 'bg-[#25D366] hover:bg-[#20BA5A]',
    },
    {
        icon: Briefcase,
        title: 'View Portfolio',
        description: 'See our latest projects',
        href: '/portfolio',
        color: 'bg-accent hover:bg-accent/90',
    },
    {
        icon: MapPin,
        title: 'Visit Our Studio',
        description: 'Bandung, Indonesia',
        href: '/contact',
        color: 'bg-primary hover:bg-primary/90',
    },
    {
        icon: ShoppingBag,
        title: 'Shop on Shopee',
        description: 'Browse our marketplace',
        href: 'https://shopee.co.id/',
        color: 'bg-[#EE4D2D] hover:bg-[#D73211]',
    },
];

const Links = () => {
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
                        <p className="text-muted-foreground">
                            Interior Design & HPL Material Partner
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            Bandung, Indonesia
                        </p>
                    </motion.div>

                    {/* Links */}
                    <div className="space-y-4">
                        {LINKS.map((link, index) => {
                            const Icon = link.icon;
                            const isExternal = link.href.startsWith('http');

                            return (
                                <motion.a
                                    key={link.title}
                                    href={link.href}
                                    target={isExternal ? '_blank' : undefined}
                                    rel={isExternal ? 'noopener noreferrer' : undefined}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`block w-full ${link.color} text-white rounded-2xl p-5 shadow-lg transition-all duration-300`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h3 className="font-semibold text-lg">{link.title}</h3>
                                            <p className="text-sm text-white/80">{link.description}</p>
                                        </div>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>

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
