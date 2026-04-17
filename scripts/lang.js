// lang.js — Gestion bilingue FR/EN
// Injecte le contenu depuis content.js dans le DOM
// Prêt pour migration Sanity (Phase 2)

import { content } from '../content.js';

const STORAGE_KEY = 'ava-lang';

/* ==========================================================================
   API publique
   ========================================================================== */

export function getCurrentLang() {
  return localStorage.getItem(STORAGE_KEY) || 'fr';
}

export function renderPage(lang) {
  const l = lang || getCurrentLang();
  localStorage.setItem(STORAGE_KEY, l);
  document.documentElement.setAttribute('lang', l);

  const c = content[l];
  if (!c) return;

  renderNav(c.nav, l);
  renderHero(c.hero);
  initHeroHighlights();
  renderInterventions(c.interventions);
  renderAbout(c.about);
  renderValues(c.values);
  renderManifesto(c.manifesto);
  renderTestimonials(c.testimonials);
  renderContact(c.contact);
  renderFooter(c.footer);

  updateLangToggle(l);
}

/* ==========================================================================
   HERO HIGHLIGHTS — surlignage SVG des .text-accent après l'intro
   ========================================================================== */
function initHeroHighlights() {
  const accents = [...document.querySelectorAll('.hero .text-accent')];
  if (!accents.length) return;

  // Assigner un SVG différent à chaque accent (cycle sur 4)
  accents.forEach((el, i) => el.setAttribute('data-h', i % 4));

  // Déclencher le reveal une fois l'animation d'intro terminée
  window.addEventListener('hero-intro-done', () => {
    accents.forEach((el, i) => {
      setTimeout(() => el.classList.add('highlighted'), i * 280);
    });
  }, { once: true });
}

/* ==========================================================================
   Navigation
   ========================================================================== */
function renderNav(nav, lang) {
  setText('[data-nav="interventions"]', nav.interventions);
  setText('[data-nav="about"]', nav.about);
  setText('[data-nav="values"]', nav.values);
  setText('[data-nav="manifesto"]', nav.manifesto);
  setText('[data-nav="testimonials"]', nav.testimonials);
  setText('[data-nav="contact"]', nav.contact);
  setText('[data-nav="cta"]', nav.cta);

  // Mobile menu
  setText('[data-mob="interventions"]', nav.interventions);
  setText('[data-mob="about"]', nav.about);
  setText('[data-mob="values"]', nav.values);
  setText('[data-mob="manifesto"]', nav.manifesto);
  setText('[data-mob="testimonials"]', nav.testimonials);
  setText('[data-mob="contact"]', nav.contact);
}

function updateLangToggle(currentLang) {
  const btns = document.querySelectorAll('.lang-toggle');
  const isEN = currentLang === 'en';
  btns.forEach(btn => {
    const flagEl = btn.querySelector('.lang-flag');
    const codeEl = btn.querySelector('.lang-code');
    if (flagEl) flagEl.textContent = isEN ? '🇫🇷' : '🇬🇧';
    if (codeEl) codeEl.textContent = isEN ? 'FR' : 'EN';
  });
}

/* ==========================================================================
   Hero
   ========================================================================== */
function renderHero(hero) {
  setText('[data-hero="eyebrow"]', hero.eyebrow);
  setHTML('[data-hero="title"]', `${hero.title_part1}<em>${hero.title_highlight}</em>${hero.title_part2}<br>${hero.title_line2}`);
  setHTML('[data-hero="col-left-p1"]', hero.col_left_p1);
  setHTML('[data-hero="col-left-p2"]', hero.col_left_p2);
  setHTML('[data-hero="col-right-p1"]', hero.col_right_p1);
  setHTML('[data-hero="col-right-p2"]', hero.col_right_p2);
  setText('[data-hero="tagline"]', hero.tagline);
}

/* ==========================================================================
   Interventions
   ========================================================================== */
function renderInterventions(interventions) {
  setHTML('[data-interventions="title"]',
    `${interventions.section_label} <em>${interventions.section_highlight}</em>`);
  if (interventions.section_eyebrow) setText('[data-interventions="eyebrow"]', interventions.section_eyebrow);

  const tabsNav = document.querySelector('.tabs-nav');
  const tabsContent = document.querySelector('.tabs-content');
  if (!tabsNav || !tabsContent) return;

  // Vider et reconstruire
  tabsNav.innerHTML = '';
  tabsContent.innerHTML = '';

  interventions.tabs.forEach((tab, index) => {
    // Bouton onglet
    const btn = document.createElement('button');
    btn.className = `tab-btn${index === 0 ? ' active' : ''}`;
    btn.setAttribute('data-tab', tab.id);
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', index === 0);
    btn.innerHTML = tab.label + (tab.subtitle ? `<small class="tab-subtitle">${tab.subtitle}</small>` : '');
    tabsNav.appendChild(btn);

    // Panneau
    const panel = document.createElement('div');
    panel.className = `tab-panel${index === 0 ? ' active' : ''}`;
    panel.setAttribute('role', 'tabpanel');
    panel.innerHTML = buildTabPanel(tab);
    tabsContent.appendChild(panel);
  });

  // Re-init les écouteurs d'onglets
  const buttons = tabsNav.querySelectorAll('.tab-btn');
  const panels = tabsContent.querySelectorAll('.tab-panel');

  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b, j) => {
        b.classList.toggle('active', j === i);
        b.setAttribute('aria-selected', j === i);
      });
      panels.forEach((p, j) => p.classList.toggle('active', j === i));
    });
  });
}

function buildTabPanel(tab) {
  // Collecter toutes les sections dans un tableau
  const sections = [];

  if (tab.for_who) {
    sections.push(`<div class="tab-section reveal">
      <h4>${tab.for_who_title || 'Pour qui ?'}</h4>
      <p>${tab.for_who}</p>
    </div>`);
  }

  if (tab.when) {
    const items = Array.isArray(tab.when) ? tab.when.map(i => `<li>${i}</li>`).join('') : `<p>${tab.when}</p>`;
    sections.push(`<div class="tab-section reveal">
      <h4>${tab.when_title || 'Quand ?'}</h4>
      <ul>${items}</ul>
    </div>`);
  }

  if (tab.why) {
    if (Array.isArray(tab.why)) {
      const intro = tab.why_intro ? `<p>${tab.why_intro}</p>` : '';
      const items = tab.why.map(i => `<li>${i}</li>`).join('');
      sections.push(`<div class="tab-section reveal">
        <h4>${tab.why_title || 'Pour quoi ?'}</h4>
        ${intro}<ul>${items}</ul>
      </div>`);
    } else {
      sections.push(`<div class="tab-section reveal">
        <h4>${tab.why_title || 'Pour quoi ?'}</h4>
        <p>${tab.why}</p>
      </div>`);
    }
  }

  if (tab.how) {
    if (Array.isArray(tab.how)) {
      const intro = tab.how_intro ? `<p>${tab.how_intro}</p>` : '';
      const items = tab.how.map(i => `<li>${i}</li>`).join('');
      sections.push(`<div class="tab-section reveal">
        <h4>${tab.how_title || 'Comment ?'}</h4>
        ${intro}<ul>${items}</ul>
      </div>`);
    } else {
      sections.push(`<div class="tab-section reveal">
        <h4>${tab.how_title || 'Comment ?'}</h4>
        <p>${tab.how}</p>
      </div>`);
    }
  }

  if (tab.format) {
    const items = tab.format.map(i => `<li>${i}</li>`).join('');
    sections.push(`<div class="tab-section reveal">
      <h4>${tab.format_title || 'Format'}</h4>
      <ul>${items}</ul>
    </div>`);
  }

  return `<div class="tab-content-single">${sections.join('')}</div>`;
}

/* ==========================================================================
   Qui sommes-nous
   ========================================================================== */
function renderAbout(about) {
  setHTML('[data-about="title"]',
    `${about.section_label}<em>${about.section_highlight}</em>`);
  setText('[data-about="intro"]', about.intro);

  // Alexia
  setText('[data-about="alexia-name"]', about.alexia.name);
  setText('[data-about="alexia-teaser"]', about.alexia.teaser);
  setText('[data-about="alexia-bio"]', about.alexia.bio);
  setAttr('[data-about="alexia-email"]', 'href', `mailto:${about.alexia.email}`);
  setText('[data-about="alexia-email"]', about.alexia.email);
  setAttr('[data-about="alexia-linkedin"]', 'href', about.alexia.linkedin);

  // Claire
  setText('[data-about="claire-name"]', about.claire.name);
  setText('[data-about="claire-teaser"]', about.claire.teaser);
  setText('[data-about="claire-bio"]', about.claire.bio);
  setAttr('[data-about="claire-email"]', 'href', `mailto:${about.claire.email}`);
  setText('[data-about="claire-email"]', about.claire.email);
  setAttr('[data-about="claire-linkedin"]', 'href', about.claire.linkedin);

  // Certifications
  setText('[data-about="cert-label"]', about.certifications_label);
  setText('[data-about="certifications"]', about.certifications);
}

/* ==========================================================================
   Valeurs
   ========================================================================== */
const _valuesAnimated = false; // animation désactivée

function renderValues(values) {
  setHTML('[data-values="title"]',
    `${values.section_label} <em>${values.section_highlight}</em>`);
  setText('[data-values="subtitle"]', values.subtitle);

  const grid = document.querySelector('[data-values="grid"]');
  if (!grid) return;

  grid.innerHTML = values.items.map((v, i) => `
    <div class="value-card">
      <span class="value-number">${String(i + 1).padStart(2, '0')}</span>
      <h3>${v.title}</h3>
      <p>${v.description}</p>
    </div>
  `).join('');

  initValuesAnimation();
}

function initValuesAnimation() {
  // Animation de distribution supprimée
}

/* ==========================================================================
   Manifesto
   ========================================================================== */
let _manifeshoAnimated = false;

function initManifestoHighlights() {
  if (_manifeshoAnimated) return;
  const section = document.getElementById('manifesto');
  if (!section) return;

  const highlights = section.querySelectorAll('.manifesto-highlight');
  if (!highlights.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        _manifeshoAnimated = true;
        highlights.forEach((el, i) => {
          setTimeout(() => el.classList.add('highlighted'), 300 + i * 650);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);
}

function renderManifesto(manifesto) {
  setHTML('[data-manifesto="title"]', `${manifesto.section_label}<em>${manifesto.section_highlight}</em>`);

  const leftCol  = document.querySelector('[data-manifesto="col-left"]');
  const rightCol = document.querySelector('[data-manifesto="col-right"]');

  function highlightOpener(text, idx) {
    return text.replace(/^(\S+\s+\S+)/, `<mark class="manifesto-highlight" data-h="${idx}">$1</mark>`);
  }

  if (leftCol) {
    leftCol.innerHTML = manifesto.col_left.map((p, i) => `
      <div class="manifesto-item reveal-left">
        <span class="manifesto-bullet"></span>
        <p>${highlightOpener(p, i)}</p>
      </div>
    `).join('');
  }

  if (rightCol) {
    rightCol.innerHTML = manifesto.col_right.map((p, i) => `
      <div class="manifesto-item reveal-right">
        <span class="manifesto-bullet"></span>
        <p>${highlightOpener(p, i + 2)}</p>
      </div>
    `).join('');
  }

  initManifestoHighlights();
}

/* ==========================================================================
   Témoignages
   ========================================================================== */
function renderTestimonials(testimonials) {
  setHTML('[data-testimonials="title"]',
    `${testimonials.section_label} <em>${testimonials.section_highlight}</em>`);

  const track = document.querySelector('.slider-track');
  if (!track) return;

  const items = testimonials.items;

  track.innerHTML = items.map(t => `
    <div class="slide">
      <div class="testimonial-card">
        <blockquote>${t.quote}</blockquote>
        <div class="testimonial-author">
          <strong>${t.author}</strong>
          <span>${t.role}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Réinitialiser le slider (initSlider() s'occupe des dots)
  window.dispatchEvent(new CustomEvent('reinit-slider'));
}

/* ==========================================================================
   Contact
   ========================================================================== */
function renderContact(contact) {
  setText('[data-contact="title"]', contact.title);

  setText('[data-contact="alexia-name"]', contact.alexia_name);
  setAttr('[data-contact="alexia-email"]', 'href', `mailto:${contact.alexia_email}`);
  setText('[data-contact="alexia-email"]', contact.alexia_email);
  setAttr('[data-contact="alexia-linkedin"]', 'href', contact.alexia_linkedin);

  setText('[data-contact="claire-name"]', contact.claire_name);
  setAttr('[data-contact="claire-email"]', 'href', `mailto:${contact.claire_email}`);
  setText('[data-contact="claire-email"]', contact.claire_email);
  setAttr('[data-contact="claire-linkedin"]', 'href', contact.claire_linkedin);

  setText('[data-contact="address"]', contact.address);

  // Formulaire
  setAttr('[data-form="firstname"]', 'placeholder', contact.form.firstname);
  setAttr('[data-form="lastname"]', 'placeholder', contact.form.lastname);
  setAttr('[data-form="email"]', 'placeholder', contact.form.email);
  setAttr('[data-form="phone"]', 'placeholder', contact.form.phone);
  setAttr('[data-form="message"]', 'placeholder', contact.form.message);
  setText('[data-form="submit"]', contact.form.submit);

  const form = document.querySelector('#contact-form');
  if (form) {
    form.dataset.successMsg = contact.form.success;
    form.dataset.errorMsg = contact.form.error;
  }
}

/* ==========================================================================
   Footer
   ========================================================================== */
function renderFooter(footer) {
  setText('[data-footer="legal"]', footer.legal);
  setText('[data-footer="privacy"]', footer.privacy);
  setText('[data-footer="copy"]', footer.copyright);
}

/* ==========================================================================
   Helpers
   ========================================================================== */
function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el && value !== undefined) el.textContent = value;
}

function setHTML(selector, value) {
  const el = document.querySelector(selector);
  if (el && value !== undefined) el.innerHTML = value;
}

function setAttr(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el && value !== undefined) el.setAttribute(attr, value);
}

/* ==========================================================================
   Sélecteur de langue (initialisé depuis index.html)
   ========================================================================== */
export function initLangToggle() {
  const btns = document.querySelectorAll('.lang-toggle');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = getCurrentLang();
      const next = current === 'fr' ? 'en' : 'fr';
      renderPage(next);
      window.dispatchEvent(new CustomEvent('reinit-animations'));
    });
  });
}
