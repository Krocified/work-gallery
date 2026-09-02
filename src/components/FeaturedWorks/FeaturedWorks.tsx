import { useEffect, useState } from 'react';
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

const balanceProjects = (projects: Project[], columnCount: number) => {
    const columns = Array.from({ length: columnCount }, () => ({ projects: [] as Project[], height: 0 }));

    projects.forEach((project) => {
        const weight = project.aspectRatio === 'portrait' ? 1.33 : project.aspectRatio === 'landscape' ? 0.56 : 1;
        const shortestColumn = columns.reduce((shortest, column, index) => (
            column.height < shortest.column.height ? { column, index } : shortest
        ), { column: columns[0], index: 0 });

        shortestColumn.column.projects.push(project);
        shortestColumn.column.height += weight;
    });

    return Array.from({ length: Math.max(...columns.map((column) => column.projects.length)) }, (_, row) =>
        columns.flatMap((column) => column.projects[row] || []),
    ).flat();
};

const getColumnCount = () => {
    if (typeof window === 'undefined' || window.innerWidth > 1100) return 4;
    if (window.innerWidth > 700) return 3;
    return 2;
};

const FeaturedItem = ({ project, index, onClick }: { project: Project, index: number, onClick: () => void }) => {
    const { url: assetUrl, loading } = useAssetUrl(project.url);

    return (
        <motion.button
            type="button"
            variants={itemVariants}
            className={`${styles.item} ${index >= 8 ? styles.mobileHidden : ''}`}
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
    const [columnCount, setColumnCount] = useState(getColumnCount);

    useEffect(() => {
        const handleResize = () => setColumnCount(getColumnCount());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const balancedProjects = balanceProjects(featuredWorks, columnCount);

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2
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
                        {balancedProjects.map((project, index) => (
                            <FeaturedItem
                                key={project.id}
                                project={project}
                                index={index}
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
