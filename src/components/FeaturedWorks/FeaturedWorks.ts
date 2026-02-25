import styles from './FeaturedWorks.module.css';
import { featuredWorks } from '../../data';

export function createFeaturedWorks(): HTMLElement {
    const section = document.createElement('section');
    section.className = styles.featured;
    section.id = 'featured';
    section.setAttribute('aria-label', 'Featured works');

    // ── Build the neat grid ────────────────────────────────────
    // We use fixed card indexes (0-5) to drive the manual grid spans in CSS
    const cards = featuredWorks
        .slice(0, 6)
        .map((item) => `
      <figure class="${styles.card}" data-work-id="${item.id}">
        <img
          src="${item.src}"
          alt="${item.alt}"
          class="${styles.cardImg}"
          loading="lazy"
          decoding="async"
        />
        <figcaption class="${styles.cardCaption}">
          ${item.alt}
        </figcaption>
      </figure>
    `)
        .join('');

    section.innerHTML = `
    <div class="${styles.header}">
      <h2 class="${styles.title} reveal-title">
        Selected<br><em>Works</em>
      </h2>
      <p class="${styles.label}">Curated Portfolio</p>
    </div>

    <div class="${styles.grid}">
      ${cards}
    </div>
  `;

    return section;
}
