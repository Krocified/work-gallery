import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { allCategories } from '../../data/projects';
import type { Category } from '../../data/projects';
import { useAssetUrl } from '../../hooks/useAssetUrl';
import styles from './CategoriesSection.module.css';

const CategoryCard = ({ cat }: { cat: Category }) => {
    const { url: assetUrl } = useAssetUrl(cat.coverImage);

    return (
        <motion.div
            className={styles.card}
            style={{ backgroundImage: `url("${assetUrl}")` }}
        >
            <Link to={`/category/${cat.id}`} className={styles.cardLink}>
                <div className={styles.overlay}></div>
                <div className={styles.content}>
                    <h3 className="serif">{cat.name}</h3>
                    <p className="sans">{cat.description}</p>
                    <div className={styles.link}>
                        <span className="sans">Explore Brands</span>
                        <span className={styles.arrow} aria-hidden="true">→</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const CategoriesSection = () => {
    return (
        <section id="categories" className={styles.categories}>
            <div className={styles.container}>
                <div className={styles.inner}>
                    <motion.div
                        initial={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
                        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={styles.header}
                    >
                        <p className="sans uppercase">Discovery</p>
                        <h2 className="serif">Explore <span className="italic">Categories</span></h2>
                    </motion.div>

                    <div className={styles.grid}>
                        {allCategories.map((cat) => (
                            <CategoryCard key={cat.id} cat={cat} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
