// main.js — Logique principale AvaPartners
// Navbar, scroll animations, onglets, slider témoignages
// NB : renderPage() est appelé depuis le script inline dans index.html

/* ==========================================================================
   INIT — ES modules sont différés, le DOM est prêt à ce stade
   ========================================================================== */
initNavbar();
initForm();
initActiveNavLinks();

// Le slider et les animations sont initialisés depuis index.html après renderPage()
// pour s'assurer que le contenu dynamique est déjà injecté
window.addEventListener('reinit-slider', () => initSlider());

export { initScrollAnimations, initSlider };

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
function initSlider() {
  const slider = document.querySelector('.slider-wrapper');
  if (!slider) return;

  const track = slider.querySelector('.slider-track');
  const slides = slider.querySelectorAll('.slide');
  const dotsContainer = slider.querySelector('.slider-dots');
  const btnPrev = slider.querySelector('.slider-btn-prev');
  const btnNext = slider.querySelector('.slider-btn-next');

  if (!track || slides.length === 0) return;

  let current = 0;
  let autoPlayTimer = null;
  const total = slides.length;

  // Créer les dots (on vide d'abord pour éviter les doublons au reinit)
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', `Témoignage ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
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

  function startAutoPlay() {
    autoPlayTimer = setInterval(() => goTo(current + 1), 6000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayTimer);
  }

  // Boutons prev/next
  if (btnPrev) btnPrev.addEventListener('click', () => { goTo(current - 1); stopAutoPlay(); startAutoPlay(); });
  if (btnNext) btnNext.addEventListener('click', () => { goTo(current + 1); stopAutoPlay(); startAutoPlay(); });

  // Pause au survol
  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);

  // Swipe tactile
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
  }, { passive: true });

  // Init
  goTo(0);
  startAutoPlay();
}

/* ==========================================================================
   FORMULAIRE CONTACT — Validation + Formspree
   ========================================================================== */
function initForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

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
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        form.reset();
        showMessage(messageEl, 'success', form.dataset.successMsg || 'Message envoyé !');
      } else {
        throw new Error();
      }
    } catch {
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
