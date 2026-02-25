import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { allCategories } from '../../data/projects';
import styles from './CategoriesSection.module.css';

const CategoriesSection = () => {
    const navigate = useNavigate();

    return (
        <section id="categories" className={styles.categories}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.header}
                >
                    <p className="sans uppercase">Discovery</p>
                    <h2 className="serif">Explore <span className="italic">Categories</span></h2>
                </motion.div>

                <div className={styles.grid}>
                    {allCategories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={styles.card}
                            onClick={() => navigate(`/category/${cat.id}`)}
                            style={{ backgroundImage: `url("${cat.coverImage}")` }}
                        >
                            <div className={styles.overlay}></div>
                            <div className={styles.content}>
                                <span className={`${styles.number} serif`}>0{index + 1}</span>
                                <h3 className="serif">{cat.name}</h3>
                                <p className="sans">{cat.description}</p>
                                <div className={styles.link}>
                                    <span className="sans">Explore Brands</span>
                                    <span className={styles.arrow}>→</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
