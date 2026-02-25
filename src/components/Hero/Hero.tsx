import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.content}
                >
                    <h1 className={styles.title}>
                        Amelia <span className="serif italic">Callista</span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className={`${styles.subtitle} sans`}
                    >
                        Professional Graphic Designer. Nice to meet you!
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
