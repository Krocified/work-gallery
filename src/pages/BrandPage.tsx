import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsByBrand } from '../data/projects';
import type { Project } from '../data/projects';
import { brandMapping } from '../data/brandMapping';
import { useAssetUrl } from '../hooks/useAssetUrl';
import Skeleton from '../components/Skeleton/Skeleton';
import styles from './Pages.module.css';

const GalleryItem = ({ project, index }: { project: Project, index: number }) => {
    const { url: assetUrl, loading } = useAssetUrl(project.url);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={styles.galleryItem}
        >
            {loading ? (
                <Skeleton aspectRatio={project.aspectRatio} />
            ) : project.type === 'video' ? (
                <video
                    src={assetUrl}
                    className={styles.galleryImg}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
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
                    <p className="sans">Gallery showcase</p>
                </motion.div>

                {projects.length > 0 ? (
                    <div className={styles.galleryGrid}>
                        {projects.map((project, index) => (
                            <GalleryItem key={project.id} project={project} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <p className="serif">No projects found for this brand yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrandPage;
