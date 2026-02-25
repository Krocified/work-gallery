import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsByBrand } from '../data/projects';
import styles from './Pages.module.css';

const BrandPage = () => {
    const { categoryId, brandId } = useParams();
    const navigate = useNavigate();

    const projects = projectsByBrand[brandId || ''] || [];

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.header}
                >
                    <button onClick={() => navigate(`/category/${categoryId}`)} className={styles.backBtn}>← Back to brands</button>
                    <h1 className="serif">{brandId}</h1>
                    <p className="sans">Gallery showcase</p>
                </motion.div>

                {projects.length > 0 ? (
                    <div className={styles.galleryGrid}>
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className={styles.galleryItem}
                            >
                                {project.type === 'video' ? (
                                    <video
                                        src={project.url}
                                        className={styles.galleryImg}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    />
                                ) : (
                                    <img src={project.url} alt={project.title} className={styles.galleryImg} />
                                )}
                                <div className={styles.galleryInfo}>
                                    <p className="sans">{project.title}</p>
                                </div>
                            </motion.div>
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
