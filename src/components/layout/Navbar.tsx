import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImage from '@/assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <motion.header
      initial={false}
      animate={{
        height: scrolled ? '72px' : '88px',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || !isHomePage
          ? 'glass-nav shadow-lg'
          : 'bg-transparent'
        }`}
    >
      <nav className="container-max h-full flex items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center z-10">
          <img
            src={logoImage}
            alt="G8 Studio - HPL Store & Architect Interior"
            className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-9' : 'h-11'
              } drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)] brightness-110 contrast-125`}
            style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.9))' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`relative text-sm font-medium transition-colors duration-300 hover:text-accent ${location.pathname === link.href
                  ? 'text-accent'
                  : scrolled || !isHomePage
                    ? 'text-foreground'
                    : 'text-white'
                } group`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
              />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <Button asChild variant="accent" size="sm" className="shadow-lg hover:shadow-xl transition-shadow">
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 transition-colors ${scrolled || !isHomePage ? 'text-foreground' : 'text-white'
            }`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden glass-nav border-t border-border/50"
          >
            <div className="container-max px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-lg font-medium transition-colors ${location.pathname === link.href
                      ? 'text-accent'
                      : 'text-foreground hover:text-accent'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild variant="accent" size="lg" className="w-full">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;