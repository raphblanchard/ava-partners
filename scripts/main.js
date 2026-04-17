// main.js — Logique principale AvaPartners
// Navbar, scroll animations, onglets, slider témoignages
// NB : renderPage() est appelé depuis le script inline dans index.html

/* ==========================================================================
   EMAILJS — Identifiants (déclarés avant initForm)
   ========================================================================== */
const EMAILJS_SERVICE_ID  = 'service_7dbzpbz';
const EMAILJS_TEMPLATE_ID = 'template_hq228ty';
const EMAILJS_PUBLIC_KEY  = '6vo3OYsN5RWihW36c';

/* ==========================================================================
   INIT — ES modules sont différés, le DOM est prêt à ce stade
   ========================================================================== */
initNavbar();
initHeroIntro(); // doit être avant initScrollAnimations (appelé depuis index.html)
initForm();
initProfileCards();
initActiveNavLinks();
initLogosDrag();

// Le slider et les animations sont initialisés depuis index.html après renderPage()
// pour s'assurer que le contenu dynamique est déjà injecté
window.addEventListener('reinit-slider', () => initSlider());

export { initScrollAnimations, initSlider };

/* ==========================================================================
   HERO INTRO — Animation d'entrée : titre centré → position + paragraphes
   ========================================================================== */
function initHeroIntro() {
  const heroTitle   = document.querySelector('.hero-title');
  const heroGrid    = document.querySelector('.hero-grid');
  const heroTagline = document.querySelector('.hero-tagline');
  const navbar      = document.querySelector('.navbar');
  if (!heroTitle || !heroGrid) return;

  // Paragraphes à révéler un à un
  const paragraphs = [
    ...heroGrid.querySelectorAll('.body-text'),
    heroTagline
  ].filter(Boolean);

  paragraphs.forEach(p => {
    p.classList.remove('reveal');
    p.style.opacity   = '0';
    p.style.transform = 'translateY(14px)';
  });

  // Navbar visible dès le départ

  // FLIP : décalage pour que le titre parte du centre de l'écran
  const rect = heroTitle.getBoundingClientRect();
  const dx   = window.innerWidth  / 2 - (rect.left + rect.width  / 2);
  const dy   = window.innerHeight * 0.58 - (rect.top  + rect.height / 2);

  // Titre invisible, positionné au centre
  heroTitle.style.opacity    = '0';
  heroTitle.style.transform  = `translate(${dx}px, ${dy}px)`;
  heroTitle.style.transition = 'none';

  // Phase 1 : apparition progressive au centre (1.2s)
  requestAnimationFrame(() => requestAnimationFrame(() => {
    heroTitle.style.transition = 'opacity 1.2s ease';
    heroTitle.style.opacity    = '1';

    // Phase 2 : remontée lente vers la position naturelle (après 2s au centre)
    setTimeout(() => {
      heroTitle.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      heroTitle.style.transform  = 'translate(0, 0)';

      // Phase 3 : paragraphes un à un après l'atterrissage
      setTimeout(() => {
        heroTitle.style.transition = '';
        paragraphs.forEach((p, i) => {
          setTimeout(() => {
            p.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
            p.style.opacity    = '1';
            p.style.transform  = 'translateY(0)';
          }, i * 240);
        });

        // Déclencher le surlignage après que tous les paragraphes sont apparus
        const totalDelay = paragraphs.length * 240 + 400;
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('hero-intro-done'));
        }, totalDelay);
      }, 750); // attend la fin du translate (0.8s)

    }, 1100); // pause au centre
  }));
}

/* ==========================================================================
   NAVBAR — scroll shadow + menu mobile
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');

  // Shadow au scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Burger mobile
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fermer le menu au clic sur un lien
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ==========================================================================
   ACTIVE NAV LINKS — section visible mise en évidence
   ========================================================================== */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-links a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}

/* ==========================================================================
   SCROLL ANIMATIONS — Intersection Observer
   ========================================================================== */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // One-shot
      }
    });
  }, { threshold: 0.12 });

  const selectors = [
    '.reveal',
    '.reveal-left',
    '.reveal-right',
    '.reveal-fade',
    '.reveal-scale',
  ];

  document.querySelectorAll(selectors.join(',')).forEach(el => {
    observer.observe(el);
  });
}

/* ==========================================================================
   ONGLETS INTERVENTIONS
   ========================================================================== */
function initTabs() {
  const tabsContainer = document.querySelector('.tabs-interventions');
  if (!tabsContainer) return;

  const buttons = tabsContainer.querySelectorAll('.tab-btn');
  const panels = tabsContainer.querySelectorAll('.tab-panel');

  function activateTab(index) {
    buttons.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
      btn.setAttribute('aria-selected', i === index);
    });
    panels.forEach((panel, i) => {
      panel.classList.toggle('active', i === index);
    });
  }

  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => activateTab(i));
  });

  // Activer le premier onglet par défaut
  activateTab(0);
}

/* ==========================================================================
   SLIDER TÉMOIGNAGES
   ========================================================================== */
// Persiste entre les réinitialisations (changement de langue)
let _sliderUserInteracted = false;
let _sliderAbortCtrl = null;
let _sliderAutoPlayTimer = null; // module-level pour pouvoir le nettoyer entre les appels

function initSlider() {
  const slider = document.querySelector('.slider-wrapper');
  if (!slider) return;

  const track = slider.querySelector('.slider-track');
  const slides = slider.querySelectorAll('.slide');
  const dotsContainer = slider.querySelector('.slider-dots');
  const btnPrev = slider.querySelector('.slider-btn-prev');
  const btnNext = slider.querySelector('.slider-btn-next');

  if (!track || slides.length === 0) return;

  // Annule l'ancien timer AVANT tout (évite le timer fantôme)
  clearInterval(_sliderAutoPlayTimer);
  _sliderAutoPlayTimer = null;

  // Annule tous les anciens event listeners
  if (_sliderAbortCtrl) _sliderAbortCtrl.abort();
  _sliderAbortCtrl = new AbortController();
  const sig = { signal: _sliderAbortCtrl.signal };

  let current = 0;
  const total = slides.length;

  // Créer les dots (on vide d'abord pour éviter les doublons au reinit)
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', `Témoignage ${i + 1}`);
      dot.addEventListener('click', () => goTo(i), sig);
      dotsContainer.appendChild(dot);
    });
  }

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function stopAutoPlay() {
    clearInterval(_sliderAutoPlayTimer);
    _sliderAutoPlayTimer = null;
  }

  function startAutoPlay() {
    stopAutoPlay(); // évite les timers en doublon
    const interval = _sliderUserInteracted ? 30000 : 6000;
    _sliderAutoPlayTimer = setInterval(() => goTo(current + 1), interval);
  }

  // Boutons prev/next
  if (btnPrev) btnPrev.addEventListener('click', () => {
    _sliderUserInteracted = true;
    goTo(current - 1);
    startAutoPlay();
  }, sig);
  if (btnNext) btnNext.addEventListener('click', () => {
    _sliderUserInteracted = true;
    goTo(current + 1);
    startAutoPlay();
  }, sig);

  // Pause au survol
  slider.addEventListener('mouseenter', stopAutoPlay, sig);
  slider.addEventListener('mouseleave', startAutoPlay, sig);

  // Swipe tactile
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true, signal: _sliderAbortCtrl.signal });

  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      _sliderUserInteracted = true;
      goTo(diff > 0 ? current + 1 : current - 1);
      startAutoPlay();
    }
  }, { passive: true, signal: _sliderAbortCtrl.signal });

  // Init
  goTo(0);
  startAutoPlay();
}

/* ==========================================================================
   PROFIL CARDS — Expand on hover (desktop) + click (all), Escape + outside
   ========================================================================== */
function initProfileCards() {
  const grid = document.querySelector('.profile-grid');
  if (!grid) return;

  function resetCards() {
    grid.querySelectorAll('.profile-card').forEach(c => {
      c.classList.remove('active');
      c.setAttribute('aria-expanded', 'false');
    });
  }

  // Clic : toggle active
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.profile-card');
    if (!card) return;
    const isActive = card.classList.contains('active');
    resetCards();
    if (!isActive) {
      card.classList.add('active');
      card.setAttribute('aria-expanded', 'true');
    }
  });

  // Escape : fermer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') resetCards();
  });

  // Clic en dehors : fermer
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.profile-grid')) resetCards();
  });
}

/* ==========================================================================
   LOGOS MARQUEE — Scroll JS + drag + pause au survol
   ========================================================================== */
function initLogosDrag() {
  const track = document.querySelector('.testimonials-logos-track');
  if (!track) return;

  const marquees = [...track.querySelectorAll('.logos-marquee')];
  if (marquees.length < 2) return;

  // Envelopper les deux copies dans un conteneur unique qu'on va translater
  const slider = document.createElement('div');
  slider.style.cssText = 'display:flex; flex-shrink:0; will-change:transform;';
  marquees.forEach(m => slider.appendChild(m));
  track.appendChild(slider);

  let offset = 0;
  let isDragging = false;
  let lastX = 0;
  const SPEED = 0.55; // px/frame

  function tick() {
    if (!isDragging) offset += SPEED;

    const w = marquees[0].offsetWidth;
    if (w > 0) {
      if (offset >= w) offset -= w;
      if (offset < 0) offset += w;
    }

    slider.style.transform = `translateX(${-offset}px)`;
    requestAnimationFrame(tick);
  }

  tick();

  track.addEventListener('mouseleave', () => {
    isDragging = false;
    track.style.cursor = 'grab';
  });

  // Easter egg — 5 clics sur le logo VAP
  let vapClicks = 0;
  let vapTimer = null;
  let dragMoved = false;

  track.addEventListener('click', (e) => {
    if (dragMoved) return; // ignorer si c'était un drag
    const img = e.target.closest('img');
    if (!img || !img.src.includes('vap')) return;

    vapClicks++;
    clearTimeout(vapTimer);
    vapTimer = setTimeout(() => { vapClicks = 0; }, 2500);

    if (vapClicks >= 5) {
      vapClicks = 0;
      clearTimeout(vapTimer);
      triggerVapEasterEgg(img);
    }
  });

  function triggerVapEasterEgg(el) {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const emojis = ['🎉', '✨', '🎊', '⭐', '💫', '🌟', '🥳'];

    for (let i = 0; i < 16; i++) {
      const span = document.createElement('span');
      span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const angle = (Math.PI * 2 * i) / 16 + Math.random() * 0.4;
      const dist = 60 + Math.random() * 100;
      span.style.cssText = `
        position: fixed;
        left: ${cx}px;
        top: ${cy}px;
        font-size: ${14 + Math.random() * 14}px;
        pointer-events: none;
        z-index: 9999;
        animation: easteregg-float ${0.9 + Math.random() * 0.5}s ease-out forwards;
        --dx: ${Math.cos(angle) * dist}px;
        --dy: ${Math.sin(angle) * dist - 60}px;
      `;
      document.body.appendChild(span);
      setTimeout(() => span.remove(), 1600);
    }
  }

  // Drag souris
  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragMoved = false;
    lastX = e.clientX;
    track.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const delta = e.clientX - lastX;
    if (Math.abs(delta) > 3) dragMoved = true;
    offset -= delta;
    lastX = e.clientX;
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.cursor = 'grab';
  });

  // Drag tactile
  let touchX = 0;
  track.addEventListener('touchstart', (e) => {
    touchX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    offset -= (e.touches[0].clientX - touchX);
    touchX = e.touches[0].clientX;
  }, { passive: true });
}

/* ==========================================================================
   FORMULAIRE CONTACT — Validation + EmailJS
   ========================================================================== */
function initForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  if (window.emailjs) {
    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    const messageEl = form.querySelector('.form-message');
    const originalText = btn.textContent;

    // Validation basique
    const email = form.querySelector('[name="email"]')?.value;
    if (email && !isValidEmail(email)) {
      showMessage(messageEl, 'error', 'Veuillez entrer une adresse email valide.');
      return;
    }

    // Envoi
    btn.disabled = true;
    btn.textContent = '...';

    try {
      await window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
      form.reset();
      showMessage(messageEl, 'success', form.dataset.successMsg || 'Message envoyé !');
    } catch (err) {
      console.error('EmailJS error:', err);
      showMessage(messageEl, 'error', form.dataset.errorMsg || 'Une erreur est survenue.');
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(el, type, msg) {
  if (!el) return;
  el.className = `form-message ${type}`;
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => {
    el.style.display = 'none';
  }, 6000);
}
