import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import mofuHeader from '../../assets/mofu_header.png';
import styles from './Hero.module.css';

const getWaveCount = () => {
    if (typeof window === 'undefined') return 12;
    return Math.min(20, Math.max(6, Math.round(window.innerWidth / 72)));
};

const createWavePath = (count: number) => {
    const waveWidth = 1440 / count;
    const quarter = waveWidth / 4;
    const segments = Array.from({ length: count }, (_, index) => {
        const start = index * waveWidth;
        return `Q${start + quarter},94 ${start + waveWidth / 2},64 Q${start + waveWidth - quarter},34 ${start + waveWidth},64`;
    }).join(' ');

    return `M0,64 ${segments} L1440,120 L0,120 Z`;
};

const Hero: React.FC = () => {
    const [waveCount, setWaveCount] = useState(getWaveCount);

    useEffect(() => {
        const handleResize = () => setWaveCount(getWaveCount());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                <path d={createWavePath(waveCount)} />
            </svg>
        </section>
    );
};

export default Hero;
