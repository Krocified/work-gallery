import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAssetUrl } from '../../hooks/useAssetUrl';
import Skeleton from '../Skeleton/Skeleton';
import styles from './Carousel.module.css';

interface CarouselProps {
    urls: string[];
    aspectRatio?: 'square' | 'portrait' | 'landscape';
    onItemClick?: (index: number) => void;
}

const CarouselItem = ({ url, aspectRatio }: { url: string; aspectRatio?: 'square' | 'portrait' | 'landscape' }) => {
    const { url: assetUrl, loading } = useAssetUrl(url);
    const isVideo = url.toLowerCase().endsWith('.mp4');

    if (loading) return <div className={styles.carouselItem}><Skeleton aspectRatio={aspectRatio || 'square'} /></div>;

    return (
        <div className={styles.carouselItem}>
            {isVideo ? (
                <div className={styles.videoContainer}>
                    <video
                        src={assetUrl}
                        className={`${styles.carouselVideo} ${styles.galleryMedia}`}
                        muted
                        playsInline
                    />
                    <div className={styles.playOverlay}>
                        <span>▶</span>
                    </div>
                </div>
            ) : (
                <img
                    src={assetUrl}
                    alt=""
                    className={`${styles.carouselImg} ${styles.galleryMedia}`}
                />
            )}
        </div>
    );
};

const Carousel = ({ urls, onItemClick }: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? urls.length - 1 : prev - 1));
    }, [urls.length]);

    const handleNext = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === urls.length - 1 ? 0 : prev + 1));
    }, [urls.length]);

    return (
        <div
            className={`${styles.carouselContainer} ${styles.carouselInline}`}
            onClick={() => onItemClick?.(currentIndex)}
        >
            <motion.div
                className={styles.carouselTrack}
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            >
                {urls.map((url) => (
                    <CarouselItem key={url} url={url} />
                ))}
            </motion.div>

            {urls.length > 1 && (
                <>
                    <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={handlePrev}>
                        <ChevronLeft size={24} />
                    </button>
                    <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={handleNext}>
                        <ChevronRight size={24} />
                    </button>

                    <div className={styles.indicators}>
                        {urls.map((_, index) => (
                            <div
                                key={index}
                                className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Carousel;
