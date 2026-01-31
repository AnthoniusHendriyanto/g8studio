import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import AboutPreview from '@/components/home/AboutPreview';
import ServicesPreview from '@/components/home/ServicesPreview';
import ProcessSection from '@/components/home/ProcessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>G8 Studio | Interior Design & HPL Material Partner Bandung</title>
        <meta
          name="description"
          content="G8 Studio is your trusted partner for premium interior design solutions and high-quality HPL materials in Bandung. Custom furniture, residential & commercial projects."
        />
        <meta
          name="keywords"
          content="Interior Design Bandung, Jasa Interior Bandung, HPL Supplier Bandung, Custom Furniture Interior, Desain Interior Modern, TACO HPL Partner"
        />
        <meta property="og:title" content="G8 Studio | Interior Design & HPL Material Partner" />
        <meta
          property="og:description"
          content="Premium interior design solutions and high-quality HPL materials for your dream space in Bandung."
        />
        <meta property="og:url" content="https://g8studio.id/" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://g8studio.id" />
      </Helmet>
      <Layout>
        <HeroSection />
        <FeaturedProjects />
        <AboutPreview />
        <ServicesPreview />
        <ProcessSection />
        <TestimonialsSection />
        <WhyChooseSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;