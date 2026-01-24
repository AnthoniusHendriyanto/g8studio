import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: t.nav.home },
    { href: '/services', label: t.nav.services },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  const services = [
    t.services.items[0].title,
    t.services.items[1].title,
    t.services.items[2].title,
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-max section-padding !py-12 lg:!py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold tracking-tight">
                G8<span className="text-accent">.</span>Studio
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.services}</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-sm text-primary-foreground/70">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-sm text-primary-foreground/70">
                  Bandung, Indonesia
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-sm text-primary-foreground/70">
                  +62 xxx xxxx xxxx
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-sm text-primary-foreground/70">
                  hello@g8studio.id
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} G8 Studio. {t.footer.rights}
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-primary-foreground/40">
                Interior Design & HPL Material Partner
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;