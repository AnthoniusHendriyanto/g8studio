import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import SectionWrapper from '@/components/ui/SectionWrapper';
import CTASection from '@/components/home/CTASection';
import { useQuery } from '@tanstack/react-query';
import { partnerService } from '@/services/partners';

const About = () => {
  const { t } = useLanguage();

  const timeline = [
    {
      year: '2015',
      title: 'Founded',
      description: 'G8 Studio was established in Bandung with a vision to transform spaces.',
    },
    {
      year: '2018',
      title: 'TACO Partnership',
      description: 'Became an official partner of TACO, a leading HPL brand in Indonesia.',
    },
    {
      year: '2020',
      title: 'Expansion',
      description: 'Expanded services to include full-scale commercial interior projects.',
    },
    {
      year: '2024',
      title: 'Growing Strong',
      description: 'Completed 200+ projects and serving clients across West Java.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | G8 Studio - Interior Design Partner Bandung</title>
        <meta
          name="description"
          content="Learn about G8 Studio, your trusted interior design and HPL material partner in Bandung. Our story, vision, mission, and what makes us different."
        />
        <meta
          name="keywords"
          content="Tentang G8 Studio, Interior Design Bandung, HPL Partner Indonesia, TACO Partner"
        />
        <meta property="og:title" content="About Us | G8 Studio" />
        <meta
          property="og:description"
          content="Crafting exceptional spaces since day one. Learn about our journey and vision."
        />
        <link rel="canonical" href="https://g8studio.id/about" />
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
                {t.about.label}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                {t.about.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t.about.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <SectionWrapper className="section-padding bg-background">
          <div className="container-max">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  G8 Studio began with a simple belief: every space has the potential to inspire.
                  Founded in Bandung, we started as a small interior design consultancy with big dreams.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Over the years, we've grown into a comprehensive interior solutions provider,
                  combining creative design expertise with access to premium surface materials
                  through our partnership with leading brands like TACO.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we're proud to have transformed hundreds of spaces across West Java,
                  from cozy homes to modern offices, always staying true to our commitment
                  to quality and client satisfaction.
                </p>
              </div>

              {/* Timeline */}
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-16 text-right">
                      <span className="text-accent font-bold">{item.year}</span>
                    </div>
                    <div className="flex-shrink-0 w-px bg-border relative">
                      <div className="absolute top-1 -left-1.5 w-3 h-3 rounded-full bg-accent" />
                    </div>
                    <div className="pb-8">
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Vision & Mission */}
        <SectionWrapper className="section-padding bg-secondary">
          <div className="container-max">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-8 lg:p-10 shadow-card"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading interior design and material partner in Indonesia,
                  known for transforming spaces into inspiring environments that enhance
                  the quality of life.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-8 lg:p-10 shadow-card"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver exceptional interior solutions by combining creative design,
                  premium materials, and dedicated craftsmanship, while building lasting
                  relationships with our clients and partners.
                </p>
              </motion.div>
            </div>
          </div>
        </SectionWrapper>

        {/* What Makes Us Different */}
        <SectionWrapper className="section-padding bg-background">
          <div className="container-max">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">What Makes Us Different</h2>
              <p className="text-muted-foreground text-lg">
                We combine design expertise with material knowledge to deliver complete solutions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Award,
                  title: 'Quality First',
                  description: 'We never compromise on quality, from design concepts to material selection.',
                },
                {
                  icon: Users,
                  title: 'Client-Centric',
                  description: 'Your vision drives our work. We listen, understand, and deliver.',
                },
                {
                  icon: Target,
                  title: 'End-to-End',
                  description: 'From initial consultation to final installation, we handle everything.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Partner Brands */}
        <SectionWrapper className="section-padding bg-secondary">
          <div className="container-max">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Partner Brands</h2>
              <p className="text-muted-foreground text-lg">
                We work with leading material brands to ensure the highest quality for your projects.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-12 opacity-80 min-h-[60px]">
              <AboutPartnerLogos />
            </div>
          </div>
        </SectionWrapper>

        <CTASection />
      </Layout>
    </>
  );
};

const AboutPartnerLogos = () => {
  const { data: partners, isLoading } = useQuery({
    queryKey: ['partners'],
    queryFn: partnerService.fetchPartners,
  });

  if (isLoading) return <div className="text-sm text-gray-400">Loading...</div>;

  if (partners && partners.length > 0) {
    return (
      <>
        {partners.map((partner) => (
          <img
            key={partner.id}
            src={partner.logo_url}
            alt={partner.name}
            title={partner.name}
            className="h-24 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
          />
        ))}
      </>
    );
  }

  return (
    <>
      <div className="text-3xl font-bold tracking-widest text-foreground">TACO</div>
      <div className="text-2xl font-semibold tracking-wide text-foreground">HPL Premium</div>
    </>
  );
};

export default About;