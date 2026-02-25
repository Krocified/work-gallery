import styles from './Skeleton.module.css';

interface SkeletonProps {
    aspectRatio: 'square' | 'portrait' | 'landscape';
    className?: string;
}

const Skeleton = ({ aspectRatio, className = '' }: SkeletonProps) => {
    return (
        <div
            className={`${styles.skeleton} ${styles[aspectRatio]} ${className}`}
            aria-hidden="true"
        >
            <div className={styles.shimmer}></div>
        </div>
    );
};

export default Skeleton;
