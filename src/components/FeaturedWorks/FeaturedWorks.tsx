import { useState } from 'react';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';
import { featuredWorks } from '../../data/projects';
import type { Project } from '../../data/projects';
import { useAssetUrl } from '../../hooks/useAssetUrl';
import Skeleton from '../Skeleton/Skeleton';
import Modal from '../Modal/Modal';
import styles from './FeaturedWorks.module.css';

const itemVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 20 },
};

const listVariants = {
    visible: { transition: { staggerChildren: 0.08 } },
    hidden: {},
};

const FeaturedItem = ({ project, onClick }: { project: Project, onClick: () => void }) => {
    const { url: assetUrl, loading } = useAssetUrl(project.url);

    return (
        <motion.button
            type="button"
            variants={itemVariants}
            className={styles.item}
            onClick={onClick}
            aria-label={`View ${project.title}`}
        >
            <div className={styles.mediaContainer}>
                {loading ? (
                    <Skeleton aspectRatio={project.aspectRatio} />
                ) : project.type === 'video' ? (
                    <video
                        src={assetUrl}
                        className={styles.image}
                        muted
                        playsInline
                        preload="metadata"
                    />
                ) : (
                    <img src={assetUrl} alt={project.title} className={styles.image} loading="lazy" decoding="async" />
                )}
                {!loading && (
                    <div className={styles.overlay}>
                        <h3 className="serif">{project.title}</h3>
                    </div>
                )}
            </div>
        </motion.button>
    );
};

const FeaturedWorks = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const breakpointColumnsObj = {
        default: 2,
        1100: 2,
        700: 1
    };

    return (
        <section id="work" className={styles.featured}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.header}
                >
                    <p className="sans uppercase">Best of the Best</p>
                    <h2 className="serif">Featured <span className="italic">Works</span></h2>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={listVariants}
                >
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                        {featuredWorks.map((project) => (
                            <FeaturedItem
                                key={project.id}
                                project={project}
                                onClick={() => setSelectedProject(project)}
                            />
                        ))}
                    </Masonry>
                </motion.div>
            </div>

            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title={selectedProject?.title}
            >
                {selectedProject && (
                    <div style={{ padding: '0', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <MediaPreview project={selectedProject} />
                    </div>
                )}
            </Modal>
        </section>
    );
};

const MediaPreview = ({ project }: { project: Project }) => {
    const { url, loading } = useAssetUrl(project.url);

    if (loading) return <Skeleton aspectRatio={project.aspectRatio} />;

    return project.type === 'video' ? (
        <video
            src={url}
            controls
            autoPlay
            preload="metadata"
            style={{ width: '100%', maxHeight: '80vh', outline: 'none' }}
        />
    ) : (
        <img
            src={url}
            alt={project.title}
            style={{ width: '100%', height: 'auto', maxHeight: '80vh', objectFit: 'contain' }}
        />
    );
};

export default FeaturedWorks;
