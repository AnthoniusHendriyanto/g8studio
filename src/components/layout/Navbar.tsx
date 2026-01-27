import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import logoImage from '@/assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/services', label: t.nav.services },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-background/95 backdrop-blur-md shadow-sm'
        : 'bg-transparent'
        }`}
    >
      <nav className="container-max section-padding !py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logoImage}
              alt="G8 Studio - HPL Store & Architect Interior"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${location.pathname === link.href
                  ? 'text-accent'
                  : 'text-muted-foreground'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase font-medium">{language}</span>
            </button>
            <Button asChild variant="default" size="sm">
              <Link to="/contact">{t.hero.cta_contact}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block text-lg font-medium transition-colors ${location.pathname === link.href
                      ? 'text-accent'
                      : 'text-foreground'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center space-x-2 text-muted-foreground"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{language === 'en' ? 'English' : 'Indonesia'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;