import { Helmet } from 'react-helmet-async';
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
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { Button } from '@/components/ui/button';
import CTASection from '@/components/home/CTASection';

const icons = [Palette, Sofa, Layers, Home, Building2, FileText];

const Services = () => {
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
    {
      title: 'Residential Projects',
      description: 'Complete interior solutions for homes, apartments, and residential complexes.',
    },
    {
      title: 'Commercial Projects',
      description: 'Professional interior design for offices, retail spaces, and hospitality.',
    },
    {
      title: 'Material Consultation',
      description: 'Expert advice on selecting the right materials for your project needs.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Services | G8 Studio - Interior Design & HPL Material Supply</title>
        <meta
          name="description"
          content="Comprehensive interior design services in Bandung: consultation, custom furniture, HPL & surface materials, residential and commercial projects."
        />
        <meta
          name="keywords"
          content="Jasa Interior Bandung, Konsultasi Desain Interior, Custom Furniture Bandung, HPL Material Supply"
        />
        <meta property="og:title" content="Services | G8 Studio" />
        <meta
          property="og:description"
          content="From concept to completion, we provide end-to-end interior design and material supply services."
        />
        <link rel="canonical" href="https://g8studio.id/services" />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-secondary">
          <div className="container-max section-padding !py-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="inline-block mb-4 text-accent font-medium tracking-wider uppercase text-sm">
                Our Services
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Comprehensive Interior Solutions
              </h1>
              <p className="text-xl text-muted-foreground">
                From concept to completion, we provide end-to-end interior design and material supply services.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <SectionWrapper className="section-padding bg-background">
          <div className="container-max">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              {services.map((service, index) => {
                const Icon = icons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-card rounded-xl p-8 lg:p-10 shadow-card hover-lift border border-border/50"
                  >
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                      <Icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Button asChild variant="ghost" className="group/btn p-0 h-auto">
                      <Link to="/contact" className="text-accent hover:text-accent/80">
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </SectionWrapper>

        {/* Materials Section */}
        <SectionWrapper className="section-padding bg-secondary">
          <div className="container-max">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block mb-4 text-accent font-medium tracking-wider uppercase text-sm">
                Premium Materials
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Quality Surface Solutions
              </h2>
              <p className="text-muted-foreground text-lg">
                We partner with leading brands to deliver the finest surface materials.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {['HPL Panels', 'PVC Board', 'Decorative Laminates', 'Wood Veneer'].map((material, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-lg p-6 text-center shadow-card hover-lift"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Layers className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-semibold">{material}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <CTASection />
      </Layout>
    </>
  );
};

export default Services;