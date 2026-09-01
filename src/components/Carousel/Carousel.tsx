import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAssetUrl } from '../../hooks/useAssetUrl';
import Skeleton from '../Skeleton/Skeleton';
import styles from './Carousel.module.css';

interface CarouselProps {
    urls: string[];
    title: string;
    aspectRatio?: 'square' | 'portrait' | 'landscape';
    onItemClick?: (index: number) => void;
}

const CarouselItem = ({ url, title, aspectRatio }: { url: string; title: string; aspectRatio?: 'square' | 'portrait' | 'landscape' }) => {
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
                        preload="metadata"
                    />
                    <div className={styles.playOverlay}>
                        <span>▶</span>
                    </div>
                </div>
            ) : (
                <img
                    src={assetUrl}
                    alt={title}
                    className={`${styles.carouselImg} ${styles.galleryMedia}`}
                    loading="lazy"
                    decoding="async"
                />
            )}
        </div>
    );
};

const Carousel = ({ urls, title, aspectRatio, onItemClick }: CarouselProps) => {
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
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') onItemClick?.(currentIndex);
            }}
            role="button"
            tabIndex={0}
            aria-label="Open carousel item"
        >
            <motion.div
                className={styles.carouselTrack}
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ type: 'spring', damping: 30, stiffness: 150 }}
            >
                {urls.map((url, index) => (
                    <CarouselItem key={url} url={url} title={`${title}, item ${index + 1}`} aspectRatio={aspectRatio} />
                ))}
            </motion.div>

            {urls.length > 1 && (
                <>
                    <button aria-label="Previous carousel item" className={`${styles.navBtn} ${styles.prevBtn}`} onClick={handlePrev}>
                        <ChevronLeft size={24} aria-hidden="true" />
                    </button>
                    <button aria-label="Next carousel item" className={`${styles.navBtn} ${styles.nextBtn}`} onClick={handleNext}>
                        <ChevronRight size={24} aria-hidden="true" />
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
