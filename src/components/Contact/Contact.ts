import styles from './Contact.module.css';

const EMAIL = 'hello@yourname.com';
const WA_NUMBER = '+6281234567890'; // International format, no spaces or dashes

function buildWaLink(number: string): string {
    const clean = number.replace(/[^\d+]/g, '').replace(/^\+/, '');
    return `https://wa.me/${clean}`;
}

export function createContact(): HTMLElement {
    const section = document.createElement('section');
    section.className = styles.contact;
    section.id = 'contact';
    section.setAttribute('aria-label', 'Contact');

    section.innerHTML = `
    <div class="${styles.contactContent} contact-content">
      <p class="${styles.contactEyebrow}">Let's Connect</p>

      <h2 class="${styles.contactTitle}">
        Say<br><em>Hello.</em>
      </h2>

      <p class="${styles.contactSub}">
        Open to projects, collaborations, and good conversations.
        Reach out via email or drop a message on WhatsApp.
      </p>

      <div class="${styles.contactButtons}">
        <a
          href="mailto:${EMAIL}"
          class="${styles.btnPrimary}"
          id="contact-email-btn"
          aria-label="Send an email"
        >
          <!-- Mail icon -->
          <svg class="${styles.btnIcon}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <polyline points="2,4 12,13 22,4"/>
          </svg>
          Send an Email
        </a>

        <a
          href="${buildWaLink(WA_NUMBER)}"
          target="_blank"
          rel="noopener noreferrer"
          class="${styles.btnSecondary}"
          id="contact-whatsapp-btn"
          aria-label="Message on WhatsApp"
        >
          <!-- WhatsApp icon -->
          <svg class="${styles.btnIcon}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.374 0 0 5.373 0 12c0 2.124.555 4.122 1.528 5.858L.057 23.48a.75.75 0 0 0 .92.92l5.638-1.47A11.947 11.947 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.657-.492-5.197-1.355l-.37-.217-3.834.999 1.023-3.73-.235-.385A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </div>

    <footer class="${styles.contactFooter}">
      <span class="${styles.contactFooterLogo}">Work Gallery</span>
      <span>&copy; ${new Date().getFullYear()} — All rights reserved</span>
    </footer>
  `;

    return section;
}
