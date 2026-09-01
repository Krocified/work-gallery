import { motion } from 'framer-motion';
import mofuHeader from '../../assets/mofu_header.png';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <motion.img
                    src={mofuHeader}
                    alt="mofusand artwork"
                    className={styles.mofu}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
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
            <svg className={styles.wave} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,64 C240,100 480,28 720,64 C960,100 1200,28 1440,64 L1440,120 L0,120 Z" />
            </svg>
        </section>
    );
};

export default Hero;
