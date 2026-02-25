import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Nav.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Work', href: isHome ? '#work' : '/#work' },
        { name: 'Categories', href: isHome ? '#categories' : '/#categories' },
        { name: 'Contact', href: isHome ? '#contact' : '/#contact' },
    ];

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/" className="serif">æ Archive</Link>
                </div>

                {/* Desktop Links */}
                <ul className={styles.desktopLinks}>
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            {link.href.startsWith('#') ? (
                                <a href={link.href} className="sans">{link.name}</a>
                            ) : (
                                <Link to={link.href} className="sans">{link.name}</Link>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Mobile Toggle */}
                <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={styles.mobileMenu}
                    >
                        <ul>
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    {link.href.startsWith('#') ? (
                                        <a href={link.href} onClick={() => setIsOpen(false)} className="serif">
                                            {link.name}
                                        </a>
                                    ) : (
                                        <Link to={link.href} onClick={() => setIsOpen(false)} className="serif">
                                            {link.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Nav;
