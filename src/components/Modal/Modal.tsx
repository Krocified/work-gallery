import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);
    const previousScrollRef = useRef(0);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (!isOpen) return;

        previousFocusRef.current = document.activeElement as HTMLElement;
        previousScrollRef.current = window.scrollY;
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus({ preventScroll: true });

        return () => {
            document.body.style.overflow = 'unset';
            window.scrollTo(0, previousScrollRef.current);
            previousFocusRef.current?.focus({ preventScroll: true });
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
                return;
            }
            if (event.key !== 'Tab') return;

            const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            );
            if (!focusable?.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.overlay} onClick={onClose}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={styles.modal}
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? 'modal-title' : undefined}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.header}>
                            {title && <h3 id="modal-title" className="serif">{title}</h3>}
                            <button ref={closeButtonRef} aria-label="Close dialog" className={styles.closeBtn} onClick={onClose}>
                                <X size={24} aria-hidden="true" />
                            </button>
                        </div>
                        <div className={styles.content}>
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
