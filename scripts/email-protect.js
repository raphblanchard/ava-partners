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

    // Signale aux pages sans système i18n (ex: mentions-legales.html) que les
    // adresses sont en place, pour qu'elles désarment leur filet de sécurité.
    document.documentElement.setAttribute('data-emails-ready', '');

    // Le repli statique (affiché quand le JS est bloqué) fait désormais
    // double emploi : on le retire.
    document.querySelectorAll('[data-email-fallback]').forEach(function (repli) {
      var lien = repli.previousElementSibling;
      if (lien && (lien.getAttribute('href') || '').indexOf('mailto:') === 0) {
        repli.parentNode.removeChild(repli);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal);
  } else {
    reveal();
  }
})();
