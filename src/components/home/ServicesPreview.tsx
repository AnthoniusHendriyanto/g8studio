import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Palette,
  Sofa,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionWrapper from '@/components/ui/SectionWrapper';

const ServicesPreview = () => {
  const services = [
    {
      icon: Palette,
      title: 'Interior Design Consultation',
      description: 'Expert guidance to bring your vision to life with personalized design concepts and comprehensive planning.',
    },
    {
      icon: Sofa,
      title: 'Custom Furniture & Built-in',
      description: 'Bespoke furniture solutions tailored to your space and lifestyle needs with premium craftsmanship.',
    },
    {
      icon: Layers,
      title: 'HPL & Surface Materials',
      description: 'Premium HPL, PVC board, and surface materials from trusted partner brands for lasting quality.',
    },
  ];

  return (
    <SectionWrapper className="section-padding bg-secondary/30">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block mb-4 text-accent font-medium tracking-[0.2em] uppercase text-xs md:text-sm">
            Our Services
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Comprehensive Interior Solutions
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From concept to completion, we provide end-to-end interior design and material supply services
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-background rounded-2xl p-8 lg:p-10 luxury-shadow hover-lift cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent transition-all duration-500">
                  <Icon className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button asChild variant="accent" size="lg" className="shadow-xl hover:shadow-2xl">
            <Link to="/services">
              View All Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default ServicesPreview;