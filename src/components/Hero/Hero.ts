import styles from './Hero.module.css';

export function createHero(): HTMLElement {
  const section = document.createElement('section');
  section.className = styles.hero;
  section.id = 'hero';
  section.setAttribute('aria-label', 'Hero');

  section.innerHTML = `
    <div class="${styles.heroBg}" aria-hidden="true"></div>

    <div class="${styles.heroInner}">
      <p class="${styles.heroEyebrow} hero-eyebrow">Creative Portfolio</p>

      <h1 class="${styles.heroName} hero-name">
        Amelia<br><em>Callista</em>
      </h1>

      <p class="${styles.heroTagline} hero-tagline">
        Visual designer &amp; creative director crafting considered work
        at the intersection of aesthetics and purpose.
      </p>
    </div>

    <div class="${styles.heroScrollHint} hero-scroll-hint" aria-hidden="true">
      <span class="${styles.heroScrollLine}"></span>
      <span>Scroll</span>
    </div>
  `;

  return section;
}
