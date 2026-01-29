import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Palette,
  Sofa,
  Layers,
  Home,
  Building2,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionWrapper from '@/components/ui/SectionWrapper';

const icons = [Palette, Sofa, Layers, Home, Building2, FileText];

const ServicesPreview = () => {
  const services = [
    {
      title: 'Interior Design Consultation',
      description: 'Expert guidance to bring your vision to life with personalized design concepts.',
    },
    {
      title: 'Custom Furniture & Built-in',
      description: 'Bespoke furniture solutions tailored to your space and lifestyle needs.',
    },
    {
      title: 'HPL & Surface Materials',
      description: 'Premium HPL, PVC board, and surface materials from trusted partner brands.',
    },
  ];

  return (
    <SectionWrapper className="section-padding bg-secondary">
      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="inline-block mb-4 text-accent font-medium tracking-wider uppercase text-sm">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Comprehensive Interior Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            From concept to completion, we provide end-to-end interior design and material supply services.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card rounded-lg p-6 lg:p-8 shadow-card hover-lift cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                  <Icon className="w-6 h-6 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild variant="default" size="lg">
            <Link to="/services">
              View Services
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ServicesPreview;