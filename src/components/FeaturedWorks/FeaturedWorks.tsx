import { useState } from 'react';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';
import { featuredWorks } from '../../data/projects';
import type { Project } from '../../data/projects';
import { useAssetUrl } from '../../hooks/useAssetUrl';
import Skeleton from '../Skeleton/Skeleton';
import Modal from '../Modal/Modal';
import styles from './FeaturedWorks.module.css';

const FeaturedItem = ({ project, index, onClick }: { project: Project, index: number, onClick: () => void }) => {
    const { url: assetUrl, loading } = useAssetUrl(project.url);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
            className={styles.item}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
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
                    />
                ) : (
                    <img src={assetUrl} alt={project.title} className={styles.image} />
                )}
                {!loading && (
                    <div className={styles.overlay}>
                        <h3 className="serif">{project.title}</h3>
                    </div>
                )}
            </div>
        </motion.div>
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

                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {featuredWorks.map((project, index) => (
                        <FeaturedItem
                            key={project.id}
                            project={project}
                            index={index}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </Masonry>
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
