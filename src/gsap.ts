import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations(): void {
    // ── Hero entrance ──────────────────────────────────────────
    const heroTl = gsap.timeline({ delay: 0.2 });
    heroTl
        .from('.hero-eyebrow', {
            opacity: 0, y: 16, duration: 0.7, ease: 'power3.out',
        })
        .from('.hero-name', {
            opacity: 0, y: 32, duration: 1, ease: 'power3.out',
        }, '-=0.4')
        .from('.hero-tagline', {
            opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
        }, '-=0.5')
        .from('.hero-scroll-hint', {
            opacity: 0, duration: 0.6,
        }, '-=0.2');

    // ── Nav fade in ─────────────────────────────────────────────
    gsap.from('.nav', { opacity: 0, y: -20, duration: 0.7, delay: 0.1, ease: 'power2.out' });

    // Nav shrink on scroll
    ScrollTrigger.create({
        start: 'top -80px',
        onEnter: () => document.querySelector('.nav')?.classList.add('nav--scrolled'),
        onLeaveBack: () => document.querySelector('.nav')?.classList.remove('nav--scrolled'),
    });

    // ── Section titles (generic) ─────────────────────────────────
    gsap.utils.toArray<Element>('.reveal-title').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
            opacity: 0, y: 30, duration: 0.9, ease: 'power3.out',
        });
    });

    // ── Work cards staggered reveal ──────────────────────────────
    const workGrid = document.querySelector('.work-grid');
    if (workGrid) {
        gsap.from(workGrid.querySelectorAll('.work-card'), {
            scrollTrigger: { trigger: workGrid, start: 'top 82%', toggleActions: 'play none none none' },
            opacity: 0, y: 48, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        });
    }

    // ── About section ────────────────────────────────────────────
    gsap.utils.toArray<Element>('.reveal-fade').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
            opacity: 0, duration: 1, ease: 'power2.out',
        });
    });

    // ── Contact section ──────────────────────────────────────────
    const contactContent = document.querySelector('.contact-content');
    if (contactContent) {
        gsap.from(Array.from(contactContent.children), {
            scrollTrigger: { trigger: contactContent, start: 'top 85%', toggleActions: 'play none none none' },
            opacity: 0, y: 24, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        });
    }
}

export { gsap, ScrollTrigger };
