import styles from './CategoryPage.module.css';
import { getCategoryById } from '../../data';
import { navigate } from '../../router';

export function createCategoryPage(categoryId: string): HTMLElement {
    const category = getCategoryById(categoryId);

    const page = document.createElement('div');
    page.className = styles.page;

    if (!category) {
        page.innerHTML = `<div class="${styles.notFound}"><p>Category not found.</p> <button class="${styles.back}">← Back</button></div>`;
        page.querySelector('button')?.addEventListener('click', () => navigate('/'));
        return page;
    }

    const brandCards = category.brands.map((brand) => `
    <button
      class="${styles.brandCard}"
      data-brand-id="${brand.id}"
      aria-label="View ${brand.name} work"
    >
      <div class="${styles.brandThumb}">
        <img
          src="${brand.thumbnail}"
          alt="${brand.name}"
          loading="lazy"
          decoding="async"
        />
        <div class="${styles.brandThumbOverlay}" aria-hidden="true"></div>
      </div>
      <div class="${styles.brandInfo}">
        <span class="${styles.brandName}">${brand.name}</span>
        <span class="${styles.brandCount}">${brand.works.length} pieces</span>
        <span class="${styles.brandArrow}" aria-hidden="true">View work →</span>
      </div>
    </button>
  `).join('');

    page.innerHTML = `
    <!-- Nav for sub-page -->
    <div class="${styles.subNav}">
      <button class="${styles.backBtn}" id="cat-back-btn" aria-label="Back to home">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
        Back
      </button>
      <span class="${styles.navLogo}">Work Gallery</span>
    </div>

    <!-- Header -->
    <header class="${styles.header}">
      <p class="${styles.eyebrow}">Category</p>
      <h1 class="${styles.title}">${category.name}</h1>
      <p class="${styles.desc}">${category.description}</p>
    </header>

    <!-- Brand grid -->
    <section class="${styles.brandsSection}" aria-label="Brands">
      <div class="${styles.brandsGrid}">
        ${brandCards}
      </div>
    </section>
  `;

    // Back button
    page.querySelector('#cat-back-btn')?.addEventListener('click', () => navigate('/'));

    // Brand clicks
    page.querySelectorAll<HTMLButtonElement>('[data-brand-id]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const brandId = btn.dataset.brandId;
            if (brandId) navigate(`/category/${categoryId}/${brandId}`);
        });
    });

    return page;
}
