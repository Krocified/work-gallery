import './style.css';
import { createNav } from './components/Nav/Nav';
import { createHero } from './components/Hero/Hero';
import { createWork } from './components/Work/Work';
import { createAbout } from './components/About/About';
import { createContact } from './components/Contact/Contact';
import { initAnimations } from './gsap';

function mount(): void {
  const app = document.getElementById('app');
  if (!app) return;

  // Render components in order
  app.append(
    createNav(),
    createHero(),
    createWork(),
    createAbout(),
    createContact(),
  );

  // Initialise all GSAP animations after DOM is populated
  initAnimations();
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
