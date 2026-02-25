import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';
import { featuredWorks } from '../../data/projects';
import styles from './FeaturedWorks.module.css';

const FeaturedWorks = () => {
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
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
                            className={styles.item}
                        >
                            <div className={styles.mediaContainer}>
                                {project.type === 'video' ? (
                                    <video
                                        src={project.url}
                                        className={styles.image}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    />
                                ) : (
                                    <img src={project.url} alt={project.title} className={styles.image} />
                                )}
                                <div className={styles.overlay}>
                                    <h3 className="serif">{project.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </Masonry>
            </div>
        </section>
    );
};

export default FeaturedWorks;
