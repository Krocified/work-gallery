import styles from './Work.module.css';

interface Project {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    isVideo?: boolean;
    videoUrl?: string;
}

const projects: Project[] = [
    {
        id: 'p1',
        title: 'Brand Reawakening',
        category: 'Brand Identity',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
    },
    {
        id: 'p2',
        title: 'Still & Noise',
        category: 'Art Direction',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    },
    {
        id: 'p3',
        title: 'Form Studies',
        category: 'Photography',
        imageUrl: 'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?w=600&q=80',
    },
    {
        id: 'p4',
        title: 'Parallels',
        category: 'Campaign',
        imageUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80',
    },
    {
        id: 'p5',
        title: 'Minimal Objects',
        category: 'Product',
        imageUrl: 'https://images.unsplash.com/photo-1565791380713-1756b9a05343?w=600&q=80',
    },
    {
        id: 'p6',
        title: 'The Conference',
        category: 'Event Identity',
        imageUrl: 'https://images.unsplash.com/photo-1492567291473-fe3dfc175b45?w=1200&q=80',
    },
    {
        id: 'p7',
        title: 'Soft Architecture',
        category: 'Editorial',
        imageUrl: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=800&q=80',
    },
];

function createCard(project: Project): string {
    return `
    <article class="${styles.workCard}" id="project-${project.id}">
      <img
        src="${project.imageUrl}"
        alt="${project.title}"
        class="${styles.workMedia}"
        loading="lazy"
        decoding="async"
      />
      <div class="${styles.workOverlay}">
        <p class="${styles.workOverlayCategory}">${project.category}</p>
        <h3 class="${styles.workOverlayTitle}">${project.title}</h3>
        <span class="${styles.workOverlayArrow}" aria-hidden="true">↗</span>
      </div>
    </article>
  `;
}

export function createWork(): HTMLElement {
    const section = document.createElement('section');
    section.className = styles.work;
    section.id = 'work';
    section.setAttribute('aria-label', 'Selected work');

    section.innerHTML = `
    <div class="${styles.workHeader}">
      <h2 class="${styles.workTitle} reveal-title">
        Selected<br><em>Work</em>
      </h2>
      <p class="${styles.workSubtitle}">
        A curated selection<br>of recent projects
      </p>
    </div>

    <div class="${styles.workGrid} work-grid" role="list">
      ${projects.map(createCard).join('')}
    </div>
  `;

    return section;
}
