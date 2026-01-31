import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { portfolioService } from '@/services/portfolio';
import { ArrowRight, Loader2 } from 'lucide-react';

const FeaturedProjects = () => {
    const { data: projects, isLoading } = useQuery({
        queryKey: ['portfolio'],
        queryFn: portfolioService.fetchProjects,
    });

    // Get first 6 projects for featured section
    const featuredProjects = projects?.slice(0, 6) || [];

    if (isLoading) {
        return (
            <section className="section-padding bg-background">
                <div className="container-max">
                    <div className="flex items-center justify-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin text-accent" />
                    </div>
                </div>
            </section>
        );
    }

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
                        Our Portfolio
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                        Featured Projects
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Explore our curated collection of luxury interior design projects
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <Link to="/portfolio" className="block">
                                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] luxury-shadow hover-lift">
                                    <img
                                        src={project.images[0]}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <span className="inline-block px-3 py-1 bg-accent/90 text-white rounded-full text-xs font-medium mb-3">
                                                {project.category}
                                            </span>
                                            <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-white">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-white/80 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                {project.year}
                                            </p>
                                            <div className="flex items-center text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                                                <span className="text-sm">View Project</span>
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Link
                        to="/portfolio"
                        className="inline-flex items-center text-lg font-medium text-accent hover:text-accent/80 transition-colors group"
                    >
                        View All Projects
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
