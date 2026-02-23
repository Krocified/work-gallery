import styles from './About.module.css';

export function createAbout(): HTMLElement {
    const section = document.createElement('section');
    section.className = styles.about;
    section.id = 'about';
    section.setAttribute('aria-label', 'About');

    section.innerHTML = `
    <div class="${styles.aboutInner}">

      <!-- Portrait column -->
      <div class="${styles.aboutPortrait} reveal-fade">
        <img
          src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80"
          alt="Portrait"
          class="${styles.aboutPortraitImg}"
          loading="lazy"
          width="600"
          height="800"
        />
        <div class="${styles.aboutPortraitAccent}" aria-hidden="true"></div>
      </div>

      <!-- Text column -->
      <div class="${styles.aboutText}">
        <p class="${styles.aboutLabel} reveal-title">About</p>

        <h2 class="${styles.aboutTitle} reveal-title">
          Designing with<br><em>intention</em>
        </h2>

        <div class="${styles.aboutDivider} reveal-fade"></div>

        <p class="${styles.aboutBio} reveal-fade">
          I'm a visual designer and creative director with a decade of
          experience building brands, campaigns, and digital experiences
          that feel both timeless and deeply human.
        </p>
        <p class="${styles.aboutBio} reveal-fade">
          Based in Southeast Asia, I collaborate with studios, agencies,
          and founders worldwide — bringing rigour and warmth to every
          creative project.
        </p>

        <div class="${styles.aboutDivider} reveal-fade"></div>

        <div class="${styles.aboutSkills} reveal-fade">
          ${[
            'Brand Identity',
            'Art Direction',
            'UI / UX Design',
            'Motion Design',
            'Photography',
            'Print',
        ]
            .map((s) => `<span class="${styles.aboutSkillTag}">${s}</span>`)
            .join('')}
        </div>
      </div>

    </div>
  `;

    return section;
}
