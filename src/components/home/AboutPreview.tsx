import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionWrapper from '@/components/ui/SectionWrapper';

const stats = [
  { key: 'experience', value: '10+' },
  { key: 'projects', value: '200+' },
  { key: 'clients', value: '150+' },
  { key: 'partners', value: '15+' },
];

const AboutPreview = () => {

  const getStatLabel = (key: string) => {
    switch (key) {
      case 'experience':
        return 'Years of Experience';
      case 'projects':
        return 'Projects Completed';
      case 'clients':
        return 'Happy Clients';
      case 'partners':
        return 'Partner Brands';
      default:
        return '';
    }
  };

  return (
    <SectionWrapper className="section-padding bg-background">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mb-4 text-accent font-medium tracking-[0.2em] uppercase text-xs md:text-sm">
              About G8 Studio
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Crafting Exceptional Spaces Since Day One
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              G8 Studio is your trusted partner for interior design and premium surface materials. Based in Bandung, we combine creative vision with quality craftsmanship to transform spaces into extraordinary experiences.
            </p>
            <Button asChild variant="accent" size="lg" className="shadow-xl hover:shadow-2xl">
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6 lg:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-secondary/30 rounded-2xl p-8 luxury-shadow hover-lift text-center"
              >
                <div className="text-5xl lg:text-6xl font-bold text-accent mb-3">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  {getStatLabel(stat.key)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutPreview;