import styles from './BrandPage.module.css';
import { getBrandById, getCategoryById } from '../../data';
import { navigate } from '../../router';

export function createBrandPage(categoryId: string, brandId: string): HTMLElement {
    const category = getCategoryById(categoryId);
    const brand = getBrandById(categoryId, brandId);

    const page = document.createElement('div');
    page.className = styles.page;

    if (!brand || !category) {
        page.innerHTML = `<div class="${styles.notFound}"><p>Brand not found.</p><button>← Back</button></div>`;
        page.querySelector('button')?.addEventListener('click', () => navigate(`/category/${categoryId}`));
        return page;
    }

    const galleryItems = brand.works.map((item) => `
    <figure class="${styles.galleryItem}" data-aspect="${item.aspectRatio ?? '1/1'}">
      <img
        src="${item.src}"
        alt="${item.alt}"
        loading="lazy"
        decoding="async"
        class="${styles.galleryImg}"
      />
      <figcaption class="${styles.galleryCaption}">${item.alt}</figcaption>
    </figure>
  `).join('');

    page.innerHTML = `
    <!-- Sub-nav -->
    <div class="${styles.subNav}">
      <button class="${styles.backBtn}" id="brand-back-btn" aria-label="Back to ${category.name}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
        ${category.name}
      </button>
      <span class="${styles.navLogo}">Work Gallery</span>
    </div>

    <!-- Header -->
    <header class="${styles.header}">
      <p class="${styles.eyebrow}">${category.name}</p>
      <h1 class="${styles.title}">${brand.name}</h1>
      <p class="${styles.count}">${brand.works.length} pieces</p>
    </header>

    <!-- Gallery -->
    <section class="${styles.gallerySection}" aria-label="${brand.name} gallery">
      <div class="${styles.gallery}">
        ${galleryItems}
      </div>
    </section>
  `;

    page.querySelector('#brand-back-btn')?.addEventListener('click', () => {
        navigate(`/category/${categoryId}`);
    });

    return page;
}
