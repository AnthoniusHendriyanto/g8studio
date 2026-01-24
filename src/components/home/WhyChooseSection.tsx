import { motion } from 'framer-motion';
import { Users, Award, Wrench, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionWrapper from '@/components/ui/SectionWrapper';

const icons = [Users, Award, Wrench, MapPin];

const WhyChooseSection = () => {
  const { t } = useLanguage();

  return (
    <SectionWrapper className="section-padding bg-background">
      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="inline-block mb-4 text-accent font-medium tracking-wider uppercase text-sm">
            {t.whyChoose.label}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {t.whyChoose.title}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.whyChoose.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Partner Brand Highlight */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="text-center">
            <p className="text-muted-foreground mb-6">Official Partner of Leading Brands</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="text-2xl font-bold tracking-widest text-foreground">TACO</div>
              <div className="text-xl font-semibold tracking-wide text-foreground">HPL Partner</div>
              <div className="text-xl font-semibold tracking-wide text-foreground">Premium Materials</div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default WhyChooseSection;