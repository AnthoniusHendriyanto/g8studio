import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { heroService, type HeroSlide } from '@/services/hero';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fetch hero slides
  const { data: slides, isLoading } = useQuery({
    queryKey: ['hero-slides'],
    queryFn: heroService.fetchSlides,
  });

  // Handle slide selection
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  // Shuffle slides if use_random is enabled
  const displaySlides = slides
    ? slides[0]?.use_random
      ? [...slides].sort(() => Math.random() - 0.5)
      : slides
    : [];

  const activeSlide = displaySlides[selectedIndex];
  const globalSlide = slides?.find((s) => s.is_global_text);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const displayTitle = globalSlide?.title || activeSlide?.title || 'Designing Dreams, Building Reality';
  const displaySubtitle =
    globalSlide?.subtitle ||
    activeSlide?.subtitle ||
    'Premium interior design solutions and high-quality HPL materials for residential and commercial spaces in Bandung.';

  if (isLoading || !displaySlides.length) {
    // Fallback to static hero while loading
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />

        {/* Left Scroll Indicator - Architectural Element */}
        <div className="absolute left-0 top-0 bottom-0 w-24 hidden lg:flex flex-col items-center justify-end pb-12 z-20 border-r border-white/10">
          <div className="h-32 w-[1px] bg-white/20 mb-8" />
          <span className="text-white/60 text-[10px] tracking-[0.3em] uppercase -rotate-90 whitespace-nowrap mb-8">
            Scroll Down
          </span>
        </div>

        <div className="relative z-10 container-max px-6 sm:px-8 lg:px-12 pl-6 lg:pl-40 h-full flex flex-col justify-center">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="overline-text mb-6 block text-accent/90">
                Interior Design & HPL Material Partner
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hero-text text-primary-foreground mb-8"
            >
              {displayTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-lg sm:text-xl text-primary-foreground/70 mb-10 max-w-2xl font-light leading-relaxed"
            >
              {displaySubtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-start gap-6"
            >
              <Button asChild size="lg" variant="accent" className="min-w-[180px] rounded-none">
                <Link to="/services">
                  View Services
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline-hero" className="min-w-[180px] rounded-none">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0" ref={emblaRef}>
        <div className="flex h-full">
          {displaySlides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative h-full">
              <img
                src={slide.image_url}
                alt={slide.title || 'Hero slide'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Left Scroll Indicator - Architectural Element */}
      <div className="absolute left-0 top-0 bottom-0 w-24 hidden lg:flex flex-col items-center justify-end pb-12 z-20 border-r border-white/10 bg-black/10 backdrop-blur-[1px]">
        <div className="h-24 w-[1px] bg-white/30 mb-8" />
        <span className="text-white/70 text-[10px] tracking-[0.3em] uppercase -rotate-90 whitespace-nowrap mb-8 font-medium">
          Scroll to Explore
        </span>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container-max px-6 sm:px-8 lg:px-12 pl-6 lg:pl-40 h-full flex flex-col justify-center pt-20">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="overline-text mb-8 block text-white/90 border-l-2 border-accent pl-4">
              Interior Design & HPL Material Partner
            </span>
          </motion.div>

          <motion.h1
            key={`title-${activeSlide?.id || 'static'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hero-text text-white mb-10 drop-shadow-lg"
          >
            {displayTitle}
          </motion.h1>

          <motion.p
            key={`sub-${activeSlide?.id || 'static'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl font-normal leading-relaxed tracking-wide"
          >
            {displaySubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-start gap-6"
          >
            <Button asChild size="lg" variant="accent" className="min-w-[180px] rounded-none h-14 tracking-wide text-xs uppercase font-bold shadow-button hover:scale-105 transition-transform">
              <Link to="/services">
                View Services
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline-hero" className="min-w-[180px] rounded-none h-14 tracking-wide text-xs uppercase font-bold backdrop-blur-sm">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators - Moved to bottom right for asymmetry */}
      {displaySlides.length > 1 && (
        <div className="absolute bottom-12 right-6 sm:right-12 flex gap-3 z-20">
          {displaySlides.map((_, index) => (
            <button
              key={index}
              className={`h-[2px] transition-all duration-500 ${index === selectedIndex ? 'w-8 bg-accent' : 'w-4 bg-white/20 hover:bg-white/40'
                }`}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSection;