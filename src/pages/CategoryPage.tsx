import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { allCategories } from '../data/projects';
import { brandMapping } from '../data/brandMapping';
import styles from './Pages.module.css';

const CategoryPage = () => {
    const { categoryId } = useParams();

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

                <motion.div
                    className={styles.brandGrid}
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
                >
                    {category.brands.map((brand) => (
                        <motion.div
                            key={brand}
                            variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 10 } }}
                            className={styles.brandCard}
                        >
                            <Link to={`/category/${categoryId}/${brand}`} className={styles.brandCardLink}>
                                <h3 className="serif">{brandMapping[brand] || brand}</h3>
                                <span className="sans">View Projects →</span>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default CategoryPage;
