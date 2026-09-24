/**
 * prerender.mjs — Écrit le contenu français en dur dans index.html
 * ---------------------------------------------------------------------------
 * POURQUOI ?
 *   Tout le texte du site vit dans content.js et n'était injecté qu'à
 *   l'exécution par lang.js. Conséquence : si le JavaScript ne tourne pas
 *   (extension, proxy d'entreprise, antivirus, navigateur ancien), le visiteur
 *   voyait une page quasi vide — et Google aussi.
 *
 *   Ce script rejoue le rendu de lang.js dans un faux navigateur (jsdom) et
 *   recopie le résultat dans index.html. Le site devient lisible sans aucun
 *   JavaScript, et le référencement s'appuie sur du vrai texte.
 *
 * content.js reste l'unique source de vérité : on ne modifie JAMAIS le texte
 * à la main dans index.html, on relance ce script.
 *
 * USAGE :  npm run prerender
 *          (à relancer après chaque modification de content.js)
 *
 * Les adresses email sont volontairement laissées vides : elles restent
 * reconstruites à l'exécution par scripts/email-protect.js (anti-scraping).
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { JSDOM } from 'jsdom';

const ici = dirname(fileURLToPath(import.meta.url));
const racine = resolve(ici, '..');
const cheminIndex = resolve(racine, 'index.html');

/* --------------------------------------------------------------------------
   1. Charger index.html dans un faux navigateur
   -------------------------------------------------------------------------- */
const htmlSource = readFileSync(cheminIndex, 'utf-8');
const dom = new JSDOM(htmlSource, { runScripts: 'outside-only' });

// lang.js s'attend à trouver window/document globalement.
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.CustomEvent = dom.window.CustomEvent;
globalThis.Node = dom.window.Node;

// jsdom n'implémente pas IntersectionObserver : stub inoffensif.
globalThis.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
dom.window.IntersectionObserver = globalThis.IntersectionObserver;

/* --------------------------------------------------------------------------
   2. Rejouer le rendu français
   -------------------------------------------------------------------------- */
const { renderPage } = await import(resolve(racine, 'scripts/lang.js'));
renderPage('fr');

/* --------------------------------------------------------------------------
   3. Nettoyer l'état "runtime" qui n'a rien à faire dans un fichier source
   -------------------------------------------------------------------------- */
const doc = dom.window.document;

// Aucune animation ne doit être figée en position "déjà jouée".
doc.querySelectorAll('.visible, .force-visible, .highlighted').forEach(el => {
  el.classList.remove('visible', 'force-visible', 'highlighted');
});

// Les emails restent masqués dans le source : email-protect.js les reconstruit.
doc.querySelectorAll('[data-email-user][data-email-domain]').forEach(el => {
  el.setAttribute('href', '#');
  el.textContent = '';
});

/* --------------------------------------------------------------------------
   4. Écrire le résultat
   -------------------------------------------------------------------------- */
// Normaliser la fin du <body> : sans cela, le saut de ligne final est réabsorbé
// dans le body à chaque relecture et le fichier grossit d'une ligne à chaque run.
const TEXT_NODE = 3;
while (
  doc.body.lastChild &&
  doc.body.lastChild.nodeType === TEXT_NODE &&
  doc.body.lastChild.textContent.trim() === ''
) {
  doc.body.removeChild(doc.body.lastChild);
}
doc.body.appendChild(doc.createTextNode('\n'));

let htmlFinal = '<!DOCTYPE html>\n' + doc.documentElement.outerHTML + '\n';

// jsdom re-sérialise les entités HTML en caractères bruts : les adresses de
// repli se retrouveraient en clair dans le source. On les ré-encode pour que
// le fichier livré ne contienne aucun « user@domaine » lisible par un robot.
htmlFinal = htmlFinal.replace(
  /(<span[^>]*data-email-fallback[^>]*>)([^<]*)(<\/span>)/g,
  (_, ouvrante, texte, fermante) =>
    ouvrante + texte.replace(/@/g, '&#64;').replace(/\./g, '&#46;') + fermante
);
writeFileSync(cheminIndex, htmlFinal, 'utf-8');

const motsAvant = (htmlSource.replace(/<[^>]*>/g, ' ').match(/\S+/g) || []).length;
const motsApres = (htmlFinal.replace(/<[^>]*>/g, ' ').match(/\S+/g) || []).length;

console.log('✅ index.html pré-rendu.');
console.log(`   Mots de texte dans le HTML : ${motsAvant} → ${motsApres}`);
