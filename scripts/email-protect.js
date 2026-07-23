// email-protect.js — Reconstruit les liens mailto à l'exécution (anti-scraping)
// Utilisé sur les pages sans système de rendu i18n (ex: mentions-legales.html)
(function () {
  function reveal() {
    document.querySelectorAll('[data-email-user]').forEach(function (el) {
      var user = el.getAttribute('data-email-user');
      var domain = el.getAttribute('data-email-domain');
      if (!user || !domain) return;
      var address = user + '@' + domain;
      el.setAttribute('href', 'mailto:' + address);
      el.textContent = address;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal);
  } else {
    reveal();
  }
})();
