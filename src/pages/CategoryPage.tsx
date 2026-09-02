import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { allCategories, projectsByBrand } from '../data/projects';
import { brandMapping } from '../data/brandMapping';
import type { Project } from '../data/projects';
import { useAssetUrl } from '../hooks/useAssetUrl';
import Modal from '../components/Modal/Modal';
import Carousel from '../components/Carousel/Carousel';
import Skeleton from '../components/Skeleton/Skeleton';
import styles from './Pages.module.css';

const CategoryProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
    const thumbnail = project.type === 'carousel' ? project.urls?.[0] || project.url : project.url;
    const { url, loading } = useAssetUrl(thumbnail);
    return (
        <button type="button" className={styles.projectCard} onClick={onClick} aria-label={`Preview ${project.title}`}>
            <div className={styles.projectMedia}>
                {loading ? (
                    <div className={styles.projectPlaceholder} aria-hidden="true" />
                ) : project.type === 'video' ? (
                    <video src={url} muted playsInline preload="metadata" className={styles.projectImage} />
                ) : (
                    <img src={url} alt={project.title} loading="lazy" decoding="async" className={styles.projectImage} />
                )}
                {project.type === 'video' && <span className={styles.projectType}>Video</span>}
                {project.type === 'carousel' && <span className={styles.projectType}>Carousel</span>}
            </div>
            <span className={styles.projectTitle}>{project.title}</span>
        </button>
    );
};

const ProjectPreview = ({ project }: { project: Project }) => {
    const { url, loading } = useAssetUrl(project.url);

    if (project.type === 'carousel') {
        return <Carousel urls={project.urls || []} title={project.title} aspectRatio={project.aspectRatio} className={styles.modalCarousel} />;
    }

    if (loading) return <Skeleton aspectRatio={project.aspectRatio} />;

    return project.type === 'video' ? (
        <video src={url} controls autoPlay preload="metadata" className={styles.modalVideo} />
    ) : (
        <img src={url} alt={project.title} className={styles.modalImage} />
    );
};

const CategoryPage = () => {
    const { categoryId } = useParams();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const category = allCategories.find(c => c.id === categoryId);

    if (!category) return <Navigate to="/not-found" replace />;

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.6 }}
                    className={styles.header}
                >
                    <Link to="/#categories" className={styles.backBtn}>← Back</Link>
                    <h1 className="serif">{category.name}</h1>
                    <p className="sans">{category.description}</p>
                </motion.div>

                <div className={styles.brandSections}>
                    {category.brands.map((brand) => {
                        const projects = (projectsByBrand[brand] || []).filter((project) => project.category === category.id);

                        return (
                        <motion.div
                            key={brand}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            className={styles.brandSection}
                        >
                            <div className={styles.brandSectionHeader}>
                                <h2 className="serif">{brandMapping[brand] || brand}</h2>
                            </div>
                            <div className={styles.projectGrid}>
                                {projects.map((project) => (
                                    <CategoryProjectCard
                                        key={project.id}
                                        project={project}
                                        onClick={() => setSelectedProject(project)}
                                    />
                                ))}
                            </div>
                            {projects.length === 0 && <p className={styles.empty}>No projects found for this brand yet.</p>}
                        </motion.div>
                        );
                    })}
                </div>
            </div>
            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title={selectedProject?.title}
            >
                {selectedProject && (
                    <div className={styles.modalMedia}>
                        <ProjectPreview project={selectedProject} />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default CategoryPage;
