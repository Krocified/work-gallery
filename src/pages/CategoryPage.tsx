import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { allCategories } from '../data/projects';
import styles from './Pages.module.css';

const CategoryPage = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const category = allCategories.find(c => c.id === categoryId);

    if (!category) return <div>Category not found</div>;

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.header}
                >
                    <button onClick={() => navigate('/#categories')} className={styles.backBtn}>← Back</button>
                    <h1 className="serif">{category.name}</h1>
                    <p className="sans">{category.description}</p>
                </motion.div>

                <div className={styles.brandGrid}>
                    {category.brands.map((brand, index) => (
                        <motion.div
                            key={brand}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={styles.brandCard}
                            onClick={() => navigate(`/category/${categoryId}/${brand}`)}
                        >
                            <h3 className="serif">{brand}</h3>
                            <span className="sans">View Projects →</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
