import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { portfolioService } from '@/services/portfolio';
import Layout from '@/components/layout/Layout';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { Loader2 } from 'lucide-react';


// Image Gallery Modal Component
const ProjectModal = ({ project, onClose }: { project: any; onClose: () => void }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-6xl bg-background rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Left: Image Slider */}
                <div className="w-full md:w-2/3 bg-black relative flex items-center justify-center bg-secondary/20">
                    <div className="relative w-full h-[300px] md:h-full min-h-[400px]">
                        <img
                            key={currentImageIndex}
                            src={project.images[currentImageIndex]}
                            alt={project.title}
                            className="w-full h-full object-contain"
                        />

                        {/* Navigation Arrows */}
                        {project.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all hover:scale-110"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all hover:scale-110"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {/* Dots */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                    {project.images.map((_: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Right: Details */}
                <div className="w-full md:w-1/3 p-8 flex flex-col overflow-y-auto">
                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-3">
                            {project.category}
                        </span>
                        <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
                        <div className="flex items-center text-muted-foreground mb-6">
                            <span>{project.year}</span>
                            <span className="mx-2">•</span>
                            <span>{project.images.length} Photos</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    <div className="mt-auto pt-6 border-t">
                        <h4 className="font-semibold mb-2">Project Details</h4>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Location</dt>
                                <dd className="font-medium">{project.location || 'Bandung, Indonesia'}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Client</dt>
                                <dd className="font-medium">{project.client || 'Private Client'}</dd>
                            </div>
                            <div className="flex justify-between items-center">
                                <dt className="text-muted-foreground">Status</dt>
                                <dd className={`font-medium px-2 py-0.5 rounded text-xs ${project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                        project.status === 'Concept' ? 'bg-amber-100 text-amber-700' :
                                            'text-green-600'
                                    }`}>
                                    {project.status || 'Completed'}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Portfolio = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState<any>(null);

    // Fetch projects from Supabase
    const { data: projects, isLoading } = useQuery({
        queryKey: ['portfolio'],
        queryFn: portfolioService.fetchProjects,
    });

    // Extract unique categories from projects
    const categories = ['All', ...Array.from(new Set(projects?.map(p => p.category) || []))];

    const filteredPortfolio =
        selectedCategory === 'All'
            ? (projects || [])
            : (projects || []).filter((item) => item.category === selectedCategory);

    return (
        <>
            <Helmet>
                <title>Portfolio | G8 Studio - Interior Design Projects</title>
                <meta
                    name="description"
                    content="Explore G8 Studio's portfolio of interior design projects in Bandung. From modern offices to luxury homes, see our completed works."
                />
                <meta property="og:title" content="Portfolio | G8 Studio" />
                <meta
                    property="og:description"
                    content="Browse our collection of interior design projects."
                />
                <meta property="og:url" content="https://g8studio.id/portfolio" />
                <link rel="canonical" href="https://g8studio.id/portfolio" />
            </Helmet>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>

            <Layout>
                {/* Hero */}
                <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-secondary">
                    <div className="container-max section-padding !py-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <span className="inline-block mb-4 text-accent font-medium tracking-wider uppercase text-sm">
                                Our Work
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                                Portfolio
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Discover our latest interior design projects and transformations
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Filter */}
                <SectionWrapper className="section-padding bg-background">
                    <div className="container-max">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex flex-wrap justify-center gap-3 mb-12"
                        >
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                                        ? 'bg-accent text-white shadow-lg scale-105'
                                        : 'bg-secondary text-foreground hover:bg-accent/10'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </motion.div>

                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex items-center justify-center p-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        )}

                        {/* Portfolio Grid */}
                        {!isLoading && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {filteredPortfolio.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        layoutId={`project-${item.id}`}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -8 }}
                                        className="group cursor-pointer"
                                        onClick={() => setSelectedProject(item)}
                                    >
                                        <div className="relative overflow-hidden rounded-xl bg-muted aspect-[4/3] shadow-md hover:shadow-xl transition-all">
                                            <img
                                                src={item.images[0]}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-0 transition-transform duration-300">
                                                    <span className="inline-block px-3 py-1 bg-accent text-white rounded-full text-xs font-medium mb-3 shadow-sm">
                                                        {item.category}
                                                    </span>
                                                    <h3 className="text-xl font-bold mb-1 text-white drop-shadow-md">{item.title}</h3>
                                                    <p className="text-sm text-white/90 font-medium">{item.year}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Empty State */}
                        {filteredPortfolio.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <p className="text-muted-foreground text-lg">
                                    No projects found in this category.
                                </p>
                            </motion.div>
                        )}
                    </div>
                </SectionWrapper>
            </Layout>
        </>
    );
};

export default Portfolio;
