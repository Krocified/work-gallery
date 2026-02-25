import './style.css';

import { getRoute, onRouteChange } from './router';
import { initAnimations } from './gsap';

// Main page components
import { createNav } from './components/Nav/Nav';
import { createHero } from './components/Hero/Hero';
import { createFeaturedWorks } from './components/FeaturedWorks/FeaturedWorks';
import { createCategories } from './components/Categories/Categories';
import { createContact } from './components/Contact/Contact';

// Sub-page components
import { createCategoryPage } from './components/CategoryPage/CategoryPage';
import { createBrandPage } from './components/BrandPage/BrandPage';

// ── Render ────────────────────────────────────────────────────────

const app = document.getElementById('app')!;

/** The sticky nav is shared across all views */
const nav = createNav();
app.appendChild(nav);

/** Content slot — replaced on each route change */
const contentSlot = document.createElement('div');
contentSlot.id = 'content';
app.appendChild(contentSlot);

function renderRoute(): void {
  const route = getRoute();

  // Scroll to top on every route change
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Tear down old content
  contentSlot.innerHTML = '';

  if (route.type === 'category') {
    // ── Category brand listing ──────────────────────────────────
    nav.style.display = 'none'; // Category page has its own sub-nav
    contentSlot.appendChild(createCategoryPage(route.categoryId));

  } else if (route.type === 'brand') {
    // ── Brand gallery ───────────────────────────────────────────
    nav.style.display = 'none';
    contentSlot.appendChild(createBrandPage(route.categoryId, route.brandId));

  } else {
    // ── Main page ───────────────────────────────────────────────
    nav.style.display = '';

    const main = document.createElement('main');
    main.append(
      createHero(),
      createFeaturedWorks(),
      createCategories(),
      createContact(),
    );
    contentSlot.appendChild(main);

    // GSAP only on main page (sub-pages animate via CSS)
    // Small delay to let the DOM paint first
    requestAnimationFrame(() => initAnimations());
  }
}

// Initial render
renderRoute();

// Listen for hash changes
onRouteChange(renderRoute);
