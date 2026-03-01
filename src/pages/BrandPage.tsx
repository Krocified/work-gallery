import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsByBrand } from '../data/projects';
import type { Project } from '../data/projects';
import { brandMapping } from '../data/brandMapping';
import { useAssetUrl } from '../hooks/useAssetUrl';
import Skeleton from '../components/Skeleton/Skeleton';
import Modal from '../components/Modal/Modal';
import styles from './Pages.module.css';

const GalleryItem = ({ project, index, onClick }: { project: Project, index: number, onClick: () => void }) => {
    const { url: assetUrl, loading } = useAssetUrl(project.url);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={styles.galleryItem}
            onClick={onClick}
        >
            {loading ? (
                <Skeleton aspectRatio={project.aspectRatio} />
            ) : project.type === 'video' ? (
                <div className={styles.videoThumbnail}>
                    <video
                        src={assetUrl}
                        className={styles.galleryImg}
                        muted
                        playsInline
                    />
                    <div className={styles.playOverlay}>
                        <span>▶</span>
                    </div>
                </div>
            ) : (
                <img src={assetUrl} alt={project.title} className={styles.galleryImg} />
            )}
            {!loading && (
                <div className={styles.galleryInfo}>
                    <p className="sans">{project.title}</p>
                </div>
            )}
        </motion.div>
    );
};

const BrandPage = () => {
    const { categoryId, brandId } = useParams();
    const navigate = useNavigate();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const allBrandProjects = projectsByBrand[brandId || ''] || [];
    const projects = allBrandProjects.filter(p => !categoryId || p.category === categoryId);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.header}
                >
                    <button onClick={() => navigate('/#categories')} className={styles.backBtn}>← Back</button>
                    <h1 className="serif">{brandMapping[brandId || ''] || brandId}</h1>
                    <p className="sans">{categoryId === 'reels' ? 'Reels' : 'Gallery'} showcase</p>
                </motion.div>

                {projects.length > 0 ? (
                    <div className={styles.galleryGrid}>
                        {projects.map((project, index) => (
                            <GalleryItem
                                key={project.id}
                                project={project}
                                index={index}
                                onClick={() => setSelectedProject(project)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <p className="serif">No projects found for this brand yet.</p>
                    </div>
                )}
            </div>

            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title={selectedProject?.title}
            >
                {selectedProject && (
                    <div className={styles.modalMedia}>
                        <MediaPreview project={selectedProject} />
                    </div>
                )}
            </Modal>
        </div>
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
            className={styles.modalVideo}
            style={{ width: '100%', maxHeight: '70vh' }}
        />
    ) : (
        <img
            src={url}
            alt={project.title}
            className={styles.modalImage}
            style={{ width: '100%', height: 'auto', maxHeight: '70vh', objectFit: 'contain' }}
        />
    );
};

export default BrandPage;
