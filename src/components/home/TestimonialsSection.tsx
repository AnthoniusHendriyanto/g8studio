import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Residential Client',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
            quote: 'G8 Studio transformed our home into a masterpiece. Their attention to detail and understanding of our vision was exceptional.',
            rating: 5,
        },
        {
            name: 'Michael Chen',
            role: 'Commercial Project',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
            quote: 'Professional, creative, and reliable. They delivered our office space beyond expectations with premium materials and flawless execution.',
            rating: 5,
        },
        {
            name: 'Diana Putri',
            role: 'Luxury Residence',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
            quote: 'The team\'s expertise in luxury interiors is unmatched. Every element was carefully curated to create our dream home.',
            rating: 5,
        },
    ];

    const trustIndicators = [
        { label: 'Years of Experience', value: '10+' },
        { label: 'Projects Completed', value: '200+' },
        { label: 'Happy Clients', value: '150+' },
        { label: 'Cities Served', value: '5+' },
    ];

    return (
        <section className="section-padding bg-background">
            <div className="container-max">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <span className="inline-block mb-4 text-accent font-medium tracking-[0.2em] uppercase text-xs md:text-sm">
                        Client Stories
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                        What Our Clients Say
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Trusted by homeowners and businesses across Bandung
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-secondary/30 rounded-2xl p-8 luxury-shadow hover-lift"
                        >
                            {/* Quote Icon */}
                            <div className="mb-6">
                                <Quote className="w-10 h-10 text-accent/30" />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-foreground leading-relaxed mb-6 italic">
                                "{testimonial.quote}"
                            </p>

                            {/* Client Info */}
                            <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border/30"
                >
                    {trustIndicators.map((indicator, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl lg:text-5xl font-bold text-accent mb-2">
                                {indicator.value}
                            </div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wider">
                                {indicator.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
