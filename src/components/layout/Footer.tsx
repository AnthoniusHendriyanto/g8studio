import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import logoImage from '@/assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  const services = [
    'Interior Design Consultation',
    'Custom Furniture & Built-in',
    'HPL & Surface Materials',
  ];

  return (
    <footer className="bg-secondary text-foreground">
      <div className="container-max section-padding !py-12 lg:!py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src={logoImage}
                alt="G8 Studio"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {'Premium interior design solutions and high-quality HPL materials for your dream space.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{'Quick Links'}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{'Services'}</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-sm text-muted-foreground">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{'Contact'}</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Ruko Magna Commercial Summarecon<br />
                  Jalan Magna Timur Blok MC/058<br />
                  Bandung - 40295, Jawa Barat
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <div>Office: +62 22 3209 3846</div>
                  <div className="mt-1">
                    <div>WhatsApp (HPL Store):</div>
                    <div>+62 811 1906 879</div>
                  </div>
                  <div className="mt-1">
                    <div>WhatsApp (Arc. & Interior):</div>
                    <div>+62 811 1966 879</div>
                  </div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  cv.studiogdelapanmandiri@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} G8 Studio. {'All rights reserved.'}
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-muted-foreground/60">
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