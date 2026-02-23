import styles from './Nav.module.css';

export function createNav(): HTMLElement {
    const nav = document.createElement('nav');
    nav.className = `${styles.nav} nav`;
    nav.setAttribute('aria-label', 'Main navigation');

    nav.innerHTML = `
    <a href="#hero" class="${styles.navLogo}" aria-label="Home">Work Gallery</a>

    <button class="${styles.navHamburger}" id="nav-hamburger" aria-label="Open menu" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <ul class="${styles.navLinks}" id="nav-links" role="list">
      <li><a href="#work" class="${styles.navLink}" id="nav-work">Work</a></li>
      <li><a href="#about" class="${styles.navLink}" id="nav-about">About</a></li>
      <li><a href="#contact" class="${styles.navLink}" id="nav-contact">Contact</a></li>
    </ul>

    <div class="${styles.navOverlay}" id="nav-overlay" aria-hidden="true"></div>
  `;

    // Mobile menu toggle
    const hamburger = nav.querySelector<HTMLButtonElement>('#nav-hamburger')!;
    const links = nav.querySelector<HTMLUListElement>('#nav-links')!;
    const overlay = nav.querySelector<HTMLDivElement>('#nav-overlay')!;

    const openMenu = () => {
        links.classList.add(styles['navLinks--open']);
        overlay.classList.add(styles['navOverlay--visible']);
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        links.classList.remove(styles['navLinks--open']);
        overlay.classList.remove(styles['navOverlay--visible']);
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', () => {
        const isOpen = links.classList.contains(styles['navLinks--open']);
        isOpen ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    // Close menu on anchor click
    links.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', closeMenu);
    });

    return nav;
}
