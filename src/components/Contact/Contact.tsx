import { Mail, MessageCircle } from 'lucide-react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
    return (
        <section id="contact" className={styles.contact}>
            <div className={styles.container}>
                <h2 className={styles.title}>Let's <span className="serif italic">Collaborate</span></h2>
                <p className={`${styles.subtitle} sans`}>
                    Available for new projects and interesting conversations.
                </p>

                <div className={styles.links}>
                    <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`} className={styles.contactLink}>
                        <Mail size={20} />
                        <span className="sans">Email Me</span>
                    </a>
                    <a href={`https://wa.me/${import.meta.env.VITE_CONTACT_PHONE}`} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                        <MessageCircle size={20} />
                        <span className="sans">WhatsApp</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
