import { motion } from 'framer-motion';
import { Lightbulb, Palette, Box, Layers, CheckCircle } from 'lucide-react';

const ProcessSection = () => {
    const steps = [
        {
            icon: Lightbulb,
            title: 'Consultation',
            description: 'Understanding your vision, needs, and lifestyle to create the perfect design brief',
        },
        {
            icon: Palette,
            title: 'Concept Design',
            description: 'Developing creative concepts with mood boards, sketches, and initial layouts',
        },
        {
            icon: Box,
            title: '3D Visualization',
            description: 'Bringing ideas to life with photorealistic 3D renderings and walkthroughs',
        },
        {
            icon: Layers,
            title: 'Material Selection',
            description: 'Curating premium materials, finishes, and furnishings for your space',
        },
        {
            icon: CheckCircle,
            title: 'Execution & Supervision',
            description: 'Professional project management ensuring flawless implementation',
        },
    ];

    return (
        <section className="section-padding bg-secondary/30">
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
                        How We Work
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                        Our Design Process
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        A refined approach to creating exceptional spaces
                    </p>
                </motion.div>

                {/* Process Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                {/* Connector Line (desktop only) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-accent/20" />
                                )}

                                <div className="relative bg-background rounded-2xl p-6 lg:p-8 luxury-shadow hover-lift text-center">
                                    {/* Step Number */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        {index + 1}
                                    </div>

                                    {/* Icon */}
                                    <div className="mb-6 flex justify-center">
                                        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                                            <Icon className="w-8 h-8 text-accent" strokeWidth={1.5} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
