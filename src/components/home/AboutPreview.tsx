import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import SectionWrapper from '@/components/ui/SectionWrapper';

const stats = [
  { key: 'experience', value: '10+' },
  { key: 'projects', value: '200+' },
  { key: 'clients', value: '150+' },
  { key: 'partners', value: '15+' },
];

const AboutPreview = () => {
  const { t } = useLanguage();

  const getStatLabel = (key: string) => {
    switch (key) {
      case 'experience':
        return t.about.experience;
      case 'projects':
        return t.about.projects;
      case 'clients':
        return t.about.clients;
      case 'partners':
        return t.about.partners;
      default:
        return '';
    }
  };

  return (
    <SectionWrapper className="section-padding bg-background">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block mb-4 text-accent font-medium tracking-wider uppercase text-sm">
              {t.about.label}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {t.about.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t.about.description}
            </p>
            <Button asChild variant="default">
              <Link to="/about">
                {t.nav.about}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.key}
                className="bg-card rounded-lg p-6 shadow-card hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-4xl lg:text-5xl font-bold text-accent">
                  {stat.value}
                </span>
                <p className="text-muted-foreground mt-2">
                  {getStatLabel(stat.key)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutPreview;