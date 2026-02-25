import styles from './Categories.module.css';
import { categories } from '../../data';
import { navigate } from '../../router';

const CATEGORY_ICONS: Record<string, string> = {
  'social-media': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
  'banners': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="9" x2="22" y2="9"/></svg>`,
  'reels': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none"/></svg>`,
  'motion': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5,3 19,12 5,21"/></svg>`,
};

export function createCategories(): HTMLElement {
  const section = document.createElement('section');
  section.className = styles.categories;
  section.id = 'categories';
  section.setAttribute('aria-label', 'Work categories');

  const cards = categories.map((cat) => `
    <button
      class="${styles.card}"
      data-category-id="${cat.id}"
      aria-label="View ${cat.name}"
    >
      <div class="${styles.cardBg}" style="background-image: url('${cat.coverImage}')"></div>
      <div class="${styles.cardOverlay}"></div>
      <div class="${styles.cardContent}">
        <div class="${styles.cardIcon}" aria-hidden="true">
          ${CATEGORY_ICONS[cat.id] ?? ''}
        </div>
        <h3 class="${styles.cardName}">${cat.name}</h3>
        <p class="${styles.cardDesc}">${cat.description}</p>
        <span class="${styles.cardArrow}" aria-hidden="true">
          Explore Category <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
        </span>
      </div>
    </button>
  `).join('');

  section.innerHTML = `
    <div class="${styles.header}">
      <h2 class="${styles.title} reveal-title">
        Work by<br><em>Category</em>
      </h2>
    </div>
    <div class="${styles.grid}">
      ${cards}
    </div>
  `;

  // Event delegation
  section.querySelectorAll<HTMLButtonElement>('[data-category-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.categoryId;
      if (id) navigate(`/category/${id}`);
    });
  });

  return section;
}
