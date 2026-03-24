# PRD — Refonte du site AvaPartners
**Version :** 1.0  
**Destinataire :** Claude Code  
**Objectif :** Reconstruire le site vitrine avapartners.fr from scratch en HTML/CSS/JS vanilla (ou React si préféré), en conservant l'intégralité du contenu existant, en modernisant le design, et en préparant la connexion à Sanity CMS pour la gestion de contenu.

---

## 1. Contexte & Objectifs

AvaPartners est un cabinet de coaching et conseil fondé par deux associées : **Alexia Honig** et **Claire de Procé-Blanchard**. Leur site actuel (WordPress + Divi + TranslatePress) souffre de problèmes de traduction, de rigidité éditoriale et d'un design perfectible.

**Objectifs du nouveau site :**
- Conserver 100% du contenu textuel existant
- Moderniser le design (sobre, élégant, premium) en restant fidèle à l'ADN visuel actuel
- Ajouter des animations au scroll (apparition progressive des éléments)
- Être bilingue FR/EN (structure de traduction préparée pour Sanity)
- Permettre à la cliente d'éditer facilement ses textes via Sanity CMS (branchement à faire dans une seconde phase)
- Être hébergé sur Vercel, domaine avapartners.fr

---

## 2. Stack Technique

| Couche | Technologie |
|--------|-------------|
| Frontend | HTML5 / CSS3 / JavaScript vanilla (ou React + Vite) |
| Animations scroll | Intersection Observer API (natif, pas de lib externe) |
| Contenu | Fichier `content.js` centralisé (prêt pour migration Sanity) |
| Hébergement | Vercel |
| Versioning | GitHub |
| CMS (phase 2) | Sanity.io |
| Traduction (phase 2) | Champs FR/EN dans Sanity + bouton "Traduire" via DeepL API |

> **Important :** Tout le texte du site doit être dans un fichier `content.js` (ou `content/fr.js` + `content/en.js`) centralisé et séparé du code de mise en page. Cela facilitera le branchement Sanity ultérieur.

---

## 3. Structure du Site

Site **one-page** avec navigation par ancres. Sections dans l'ordre :

1. `#hero` — Hero principal
2. `#interventions` — Nos interventions (4 onglets)
3. `#qui-sommes-nous` — Qui sommes-nous
4. `#valeurs` — Nos valeurs
5. `#manifesto` — Manifesto
6. `#temoignages` — Témoignages clients
7. `#contact` — Contact + formulaire

Navigation fixe en haut avec liens ancres + sélecteur de langue FR/EN.

---

## 4. Design System

### 4.1 Palette de couleurs

```css
:root {
  --color-background:   #FAF9F6;   /* fond principal blanc cassé */
  --color-background-2: #F2EFE8;   /* fond secondaire sable clair */
  --color-sand:         #E8E4DA;   /* sable */
  --color-gold:         #C9A84C;   /* or signature — couleur principale de marque */
  --color-sage:         #8B9E94;   /* vert sauge */
  --color-slate:        #5A6670;   /* gris ardoise */
  --color-text-dark:    #1A1A18;   /* texte principal quasi-noir */
  --color-text-mid:     #4A4A40;   /* texte corps */
  --color-text-light:   #8A8A7A;   /* texte secondaire */
  --color-border:       rgba(201,168,76,0.15); /* bordure dorée subtile */
}
```

### 4.2 Typographie

```css
/* Titres : Georgia (serif) avec italique doré */
font-family: 'Georgia', serif;

/* Corps & UI : système sans-serif */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Hiérarchie :**

| Rôle | Police | Taille | Graisse | Notes |
|------|--------|--------|---------|-------|
| Hero H1 | Georgia | 52px / 38px mobile | 300 | Italique doré sur mots-clés |
| Titre section | Georgia | 36px / 28px mobile | 300 | Italique gris sur mot-clé |
| Eyebrow / Tag | Sans-serif | 11px | 500 | Uppercase, letter-spacing 0.12em, couleur gold |
| Navigation | Sans-serif | 14px | 400 | Letter-spacing 0.04em |
| Corps | Sans-serif | 15px | 300 | Line-height 1.75, couleur text-mid |
| Caption | Sans-serif | 12px | 400 | Couleur text-light |

**Règle typo :** Les titres de section suivent le pattern `Nos <em>interventions</em>` — le mot en italique est en `color: var(--color-text-light)` (gris clair), le reste en `color: var(--color-text-dark)`.

### 4.3 Espacement

```css
--section-padding: 120px 0;       /* padding vertical des sections */
--section-padding-mobile: 80px 0; /* mobile */
--container-max: 1120px;          /* largeur max du contenu */
--container-padding: 0 48px;      /* padding latéral */
--container-padding-mobile: 0 24px;
```

### 4.4 Composants UI

**Boutons :**
```css
/* Primaire */
.btn-primary {
  background: var(--color-gold);
  color: white;
  padding: 13px 32px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: none;
}

/* Ghost */
.btn-ghost {
  background: transparent;
  color: var(--color-text-dark);
  border: 1.5px solid var(--color-text-dark);
  padding: 12px 32px;
  border-radius: 6px;
  font-size: 13px;
}

/* Texte lien */
.btn-text {
  color: var(--color-gold);
  border-bottom: 1.5px solid var(--color-gold);
  font-size: 13px;
  font-weight: 500;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  padding-bottom: 2px;
}
```

**Onglets interventions :**
- Ligne de séparation fine en bas
- Onglet actif : texte doré + soulignement doré de 2px
- Transition fluide (200ms ease)

**Cards témoignages :**
- Fond `#FAF9F6`
- Bordure `1px solid rgba(201,168,76,0.2)`
- Border-radius 16px
- Padding 28px
- Texte en italic Georgia pour la citation

**Cards valeurs :**
- Bordure fine `var(--color-border)`
- Border-radius 14px
- Point doré centré en haut
- Titre en italic Georgia
- Description en sans-serif 300

### 4.5 Animations au scroll

Utiliser `Intersection Observer API` avec la classe `.reveal` appliquée sur les éléments à animer.

```javascript
// Pattern à implémenter
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

```css
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
/* Délais en cascade pour les grilles */
.reveal:nth-child(2) { transition-delay: 0.1s; }
.reveal:nth-child(3) { transition-delay: 0.2s; }
.reveal:nth-child(4) { transition-delay: 0.3s; }
```

**Éléments à animer :** titres de section, paragraphes, cards valeurs, cards témoignages, photos équipe, logos clients.

---

## 5. Contenu Complet du Site

> **Instruction Claude Code :** Tout ce contenu doit être placé dans `content.js` (ou équivalent), PAS en dur dans les composants HTML.

### 5.1 Navigation

```
Liens : Nos interventions | Qui sommes-nous ? | Nos valeurs | Manifesto | Témoignages | Contact
Bouton CTA : Contact (en gras / doré)
Sélecteur langue : FR | EN
```

### 5.2 Section Hero

**Eyebrow :** `Coaching · Conseil · Transformation`

**Titre H1 :**
```
Un duo d'expertes de l'accompagnement
au service des dynamiques de transformation
```
*(Le mot "duo" en italique doré)*

**Texte colonne gauche :**
```
Nous, Claire et Alexia, accompagnons des dirigeants et managers, des équipes Codir et Comex – en français ou en anglais – dans leurs besoins de soutien et de suivi dans des phases de croissance, de crise et/ou de transformation.

Nous fixons des indicateurs de réussite, qui soutiennent la mise en mouvement. En agissant sur le soft (dynamiques relationnelles) et le hard (enjeux opérationnels), nous installons un climat apaisé qui renforce l'efficacité collective et la performance.
```

**Texte colonne droite :**
```
Intervenir ensemble crée une richesse d'analyse, de perspective et de prise de hauteur qui se répondent et s'enrichissent pour un accompagnement plus fin, plus ajusté et profondément ancré dans le réel.

Notre duo est un système face à un système, comme un miroir face à votre organisation. Nous captons les subtilités de ce qui se joue dans l'organisation et guidons dans la complexité.
```

**Sous-titre accroche :**
```
Un accompagnement suivi et des livrables concrets pour des changements durables
```

**Image de fond hero :** Photo de forêt/arbres en plan rapproché (actuellement utilisée). Prévoir un overlay blanc semi-transparent pour la lisibilité.

### 5.3 Section Nos Interventions

**Titre :** `Nos interventions` *(interventions en italique gris)*

**4 onglets :**

---

**Onglet 1 : Accompagnement d'équipes**

Sous-titre : *(en français ou en anglais)*

**Pour qui ?**
Comités exécutifs, Comités de direction, Comités opérationnels, Équipes métiers, Équipes internationales.

**C'est le moment quand le collectif :**
- Vit un changement de cap, de stratégie, d'organisation
- Subit une crise interne ou externe
- Accueille et/ou voit partir des talents et/ou collaborateurs.

**Pour quoi ?**
- Accompagner les dynamiques de transformation : croissance, réorganisation, gouvernance…
- Actionner les leviers de réussite : vision, culture d'entreprise, mises en action…
- Identifier et lever les freins : travail sur la cohésion, les prises de décision, les rôles flous…

**Comment travaillons-nous ?**
Nous travaillons dans l'émergence, sur-mesure, avec le vivant.
- Un premier diagnostic et une stratégie sont posés.
- Le protocole d'intervention se co-construit avec le client.
- L'accompagnement s'ajuste en temps réel aux enjeux internes et externes. Il mixe relationnel, opérationnel, plans d'actions concrets…
- Une attention particulière est portée à l'énergie du groupe et au rythme.
- Nous proposons, six mois après la fin de l'accompagnement, un rendez-vous de suivi.

---

**Onglet 2 : Accompagnement individuel**

Sous-titre : *(en duo ou en solo)*

**Pour qui ?**
Managers intermédiaires, Managers de managers, Top managers, Dirigeants d'entreprise…

**Pour quoi ?**
- Prise de poste, élargissement de périmètre.
- Posture de dirigeant/manager, communication, délégation, gestion opérationnelle…
- Supervision de dirigeant, en parallèle ou non, d'un travail avec son collectif.

**Comment ?**
- Un entretien exploratoire (sans engagement) permet de clarifier les besoins, poser les objectifs, les indicateurs…
- Un plan d'accompagnement personnalisé est proposé. Sont décidés : le nombre estimatif de séances, la périodicité, le lieu des séances, des bilans intermédiaires si nécessaire.
- En entreprise, une séance tripartite d'ouverture et une de clôture peuvent être intégrées.
- Selon les besoins, nous mobilisons également notre réseau pour proposer des pairs de confiance, quand nous ne sommes pas les mieux placées pour intervenir.
- Dans le cadre d'un coaching en entreprise, une séance tripartite de démarrage (avec le manager et/ou le DRH) et une séance de clôture seront prévues.

---

**Onglet 3 : Ateliers CoDev**

**Pour qui ?**
Managers et cadres, Équipes projets ou transverses, RH ou fonctions support, Collaborateurs en transition ou en développement.

**Pour quoi ?**
Le CoDev est une méthode d'apprentissage « entre pairs ». Elle stimule l'intelligence collective, développe les compétences et renforce la coopération autour de situations réelles telles que :
- Difficultés relationnelles ou managériales.
- Questions d'organisation ou de posture.
- Confiance en soi, assertivité, prise de recul, priorisation…

**Comment ?**
- Le « client » – un participant – expose une situation.
- Les "consultants" – les autres – contribuent par leurs questions, éclairages et suggestions.
- La facilitatrice garantit le cadre, soutient les apprentissages et propose des apports théoriques si besoin.

**Format type :**
- 1 séance par participant (ex : 6 personnes = 6 séances).
- Durée : 2h à 2h30 selon la taille du groupe (taille maxi : 8 personnes).
- Rôles tournants pour favoriser l'engagement et l'apprentissage collectif.

---

**Onglet 4 : Maillage professionnel**

**Pour qui ?**
Nos clients et notre réseau professionnel car nous aimons connecter les bonnes personnes au bon moment.

**C'est le moment quand un client souhaite :**
- Procéder à une embauche stratégique (un DG, une DRH…)
- Se muscler sur un sujet, comme l'IA, l'innovation, la succession…
- Faire une rencontre avec un expert technique d'un domaine.
- Partager entre pairs : échanges de bonnes pratiques au sein d'un même secteur ou métier.

**Pour quoi ?**
Créer des passerelles, provoquer des rencontres, activer les synergies : c'est une autre manière pour nous d'accompagner la transformation.

**Comment ?**
Nous partons des besoins exprimés (et parfois implicites), pour faciliter des rencontres pertinentes et porteuses de sens. Nous jouons un rôle de tiers de confiance.

---

### 5.4 Section Qui sommes-nous ?

**Titre :** `Qui sommes-nous ?` *(nous? en italique gris)*

**Accroche :**
```
Un vécu professionnel d'environ 20 ans chacune nous confère une compréhension fine des organisations et des équilibres parfois fragiles entre le business et l'humain.
```

**Profil Alexia Honig :**
Photo : `alesia-honig.png` (noir & blanc)
```
a vécu en Afrique, en Asie et en Europe, ce qui a nourri sa curiosité profonde pour les autres et renforcé ses capacités d'écoute et d'adaptabilité. Sa carrière en tant que cadre marketing dirigeant dans différentes entreprises de cosmétiques (Clarins, Dior, Ioma…) a forgé sa conviction que l'énergie et l'engagement des collaborateurs sont les véritables atouts d'une organisation. Elle valorise la diversité des points de vue et révèle le potentiel de chacun. Elle possède un talent unique pour identifier les leviers clés de transformation et pour créer des connexions entre les personnes.
```
Email : alexia@avapartners.fr
LinkedIn : https://www.linkedin.com/in/alexia-honig-6071851/

**Profil Claire de Procé-Blanchard :**
Photo : `Claire-de-Proce-Blanchard.png` (noir & blanc)
```
a mené une carrière de journaliste en presse écrite et digitale, occupant notamment des fonctions de chef de service et de rédactrice en chef (Prisma Presse, M6…). Convaincue que le lien guérit, elle en a fait un levier d'ouverture et opérationnel au cœur d'organisations complexes en accompagnant dirigeants et équipes à recréer de l'alignement, au service du mieux-vivre au travail et de la dynamique collective. Ses forces ? Une intelligence sensible doublée d'une exigence au service de ses clients, une finesse dans l'analyse des comportements avec une capacité à mettre les mots justes sur ce qui se joue.
```
Email : claire@avapartners.fr
LinkedIn : https://www.linkedin.com/in/claire-de-procé-blanchard/

**Certifications (bloc commun) :**
```
Nos certifications : Coach RNCP · Coach & Team Transformance Pro · Outil DISC & Forces Motrices · Analyse Transactionnelle 101 · Élément Humain W. Schutz M1 & M2 · Analyse systémique · Pratiques narratives · Coaching d'organisation · Codev.
```

---

### 5.5 Section Nos Valeurs

**Titre :** `Nos valeurs` *(valeurs en italique gris)*

**Sous-titre :**
```
Leviers concrets pour des changements durables, et incarnées par notre duo, elles sont au service de nos clients.
```

**5 valeurs (affichage en grille de cards) :**

| Valeur | Description |
|--------|-------------|
| L'authenticité | favorise la confiance et l'ouverture. |
| Le plaisir | booste la motivation et l'émulation. |
| L'humilité | valorise l'expertise et le savoir-être de nos clients. |
| L'abondance | au sens du partage, de la mise en lien, de la coopération. |
| L'engagement | vise à optimiser la performance, avec une attention portée aux détails. |

> **Note design :** Ne pas reproduire les bulles superposées du site actuel. Préférer une grille de 5 cards sobres avec point doré, titre en italic Georgia et description en sans-serif.

---

### 5.6 Section Manifesto

**Titre :** `MANIFESTO` *(uppercase, couleur gold)*

**4 paragraphes en 2 colonnes :**

**Colonne gauche :**
```
• Nous croyons en la dynamique de notre duo qui assure une exploration plus profonde et plus nuancée des défis auxquels nos clients sont confrontés.

• Nous croyons en un engagement réciproque, construit dans le temps et à la mesure des besoins. Car les transformations profondes demandent de la constance, des étapes et des pauses.
```

**Colonne droite :**
```
• Nous croyons en l'approche systémique qui nous permet de naviguer entre les besoins émotionnels et rationnels, assurant un équilibre entre le soft et le hard dans notre accompagnement.

• Nous cultivons l'ouverture pour faire émerger un collectif vivant et fécond. C'est dans cet espace que peuvent se déployer les questionnements, les confrontations constructives et des liens plus authentiques. De façon à renforcer sa capacité à s'ajuster, à évoluer et à faire face aux transformations.
```

> **Note design :** La section Manifesto a un fond légèrement différent (`--color-background-2`). Un grand cercle décoratif très transparent (gold, opacity 0.04) en arrière-plan gauche apporte de la profondeur sans surcharger.

---

### 5.7 Section Témoignages

**Titre :** `Nos clients témoignent` *(témoignent en italique gris)*

**Logos clients (carrousel ou grille) :**
- Votre Assistant Personnel
- Dior Parfums
- Eiffage Concessions
- Cercle des Voyages
- Alisea
- Chic (Agence)
- Clarins
- Viquel
- Onepoint

> **Note :** Récupérer les logos depuis le site actuel : `https://avapartners.fr/wp-content/uploads/2025/05/` et `/2025/07/` et `/2025/10/`

**13 témoignages (slider/carrousel) :**

---

**1. Sharon Zarfati — Dior**
```
Travailler avec Alexia et Claire lors de l'onboarding de l'équipe Dior Backstage Pros a été une expérience exceptionnelle. Leur accompagnement a joué un rôle clé dans l'unification du groupe autour d'une mission commune, favorisant la confiance et la cohésion. Grâce à leur approche éclairée, l'équipe a su adopter sa nouvelle mission avec clarté et enthousiasme, posant ainsi les bases d'une collaboration forte et inspirante.
```
*Sharon Zarfati — International Head of Retail Education, DIOR Make up*

---

**2. Isabelle Lovett — AG2R La Mondiale**
```
Claire a contribué pour notre Groupe à animer des groupes de managers en co-développement. Dans ce processus d'apprentissage entre pairs, Claire a pu leur permettre de cultiver leur posture managériale et de consolider leur identité professionnelle. Les retours ont été très positifs, mettant en valeur la capacité de Claire à faire bouger les managers.
```
*Isabelle Lovett — DRH Prospective et management des compétences, AG2R La Mondiale*

---

**3. Nathalie Serfaty — VAP**
```
Brillante et d'une grande sensibilité, Claire a très vite compris mes enjeux et m'a bousculée, toujours avec bienveillance. Son accompagnement sans jugement m'a permis d'avancer, de prendre des décisions stratégiques, et surtout de regarder la réalité en face. Je me suis toujours sentie soutenue, même dans les moments les plus difficiles. J'ai aussi pris conscience de mon rapport très affectif avec mes collaborateurs, et de la façon dont cela affaiblissait ma posture de dirigeante. Un coaching puissant, lucide et profondément humain.
```
*Nathalie Serfaty — Fondatrice et dirigeante de VAP, société de conciergerie privée*

---

**4. Mélanie Viquel — Viquel**
```
L'accompagnement d'Alexia en coaching individuel m'a permis d'aborder ma prise de poste avec clarté, confiance et sérénité. En rejoignant l'entreprise familiale, j'ai su affirmer ma place tout en marquant mon empreinte auprès des équipes en place. Le coaching de mon équipe rapprochée, mené par la suite, a renforcé la cohésion et amélioré la communication entre les collaborateurs. Aujourd'hui, nous poursuivons notre chemin avec une dynamique collective renouvelée.
```
*Mélanie Viquel — Directrice du Développement, Viquel*

---

**5. Mohamed Benkhodja — Onepoint**
```
Grâce à l'accompagnement d'Alexia, j'ai pu franchir un cap, prendre du recul et de la hauteur stratégique pour réaligner mes priorités dans un contexte de transformation exigeant. Son regard pragmatique et bienveillant m'a permis de renforcer mon impact en tant que leader.
```
*Mohamed Benkhodja — People Experience Leader, Onepoint*

---

**6. Ilaria Gigou — Workescape (ex-Clarins)**
```
J'ai eu l'opportunité de travailler à deux reprises avec Alexia et Claire, en tant que DRH de Région au sein de Clarins, dans mon ancien poste. La complémentarité et le professionnalisme de leur binôme ont été des atouts majeurs dans les deux cas d'expérience, que je définirais de "métamorphose" d'équipe. La dynamique qui s'est instaurée depuis le début entre nous trois – ayant formé un vrai squad – a été un élément de stabilité et d'ancrage important pour la réussite de ces projets d'accompagnement. La confiance mutuelle, l'échange authentique, l'avoir à cœur les enjeux humains de l'équipe. Merci AVA Partners pour votre accompagnement généreux, attentionné et efficace.
```
*Ilaria Gigou — Founder and Managing Director, Workescape*

---

**7. Arnaud Gastelu — Alisea**
```
Le travail avec Ava me permet de clarifier ma compréhension des modes de fonctionnement de notre organisation et de pouvoir mieux activer les ressources de développement qu'elle révèle. C'est pour nous un travail en profondeur et aussi un soutien pertinent dans le choix des leviers de management à prioriser.
```
*Arnaud Gastelu — Co-owner, Alisea Corporate Finance*

---

**8. Rose-Marie Farrugia — Cercle des Vacances**
```
Le duo Claire & Alexia fonctionne à merveille. Leur complémentarité apporte rythme, clarté et profondeur. Grâce à leur approche à deux voix, toujours fluide et bienveillante, elles ont su recréer du lien au sein de notre ComOp, casser les silos post-Covid et ouvrir un nouvel espace de dialogue constructif. Leur posture est à la fois facilitante et accessible, et les séminaires qu'elles ont animés – tout comme les temps d'échanges avec moi en tant que dirigeante – ont été d'une grande justesse. Un vrai tandem au service de l'intelligence collective. Et en prime, quand un maillon manque ou qu'il y a un "trou dans la raquette" côté management, elles savent proposer les bonnes mises en relation, avec des expertes ciblées et efficaces.
```
*Rose-Marie Farrugia — PDG, Cercle des Vacances*

---

**9. Patrick Chavanne — Clarins Suisse**
```
Alexia et Claire sont animées par une bienveillance profonde et une authenticité sans détour. Elles savent créer un espace sûr, où chacun peut exprimer son monde en toute confiance. Leur complémentarité puissante, alliée à une présence juste et engagée, leur permet d'accompagner le groupe avec douceur tout en osant nommer ce qui entrave : les non-dits, les tensions, les dysfonctionnements. Sans jamais juger, elles offrent un miroir sincère, stimulant la prise de conscience individuelle et collective. Ce faisant, elles ouvrent le chemin vers une cohésion plus forte, une dynamique plus saine, où le collectif se (re)construit dans la confiance, la responsabilité et la clarté.
```
*Patrick Chavanne — Directeur Général, Clarins Suisse*

---

**10. Beatrice Pierrard & Fanny Ponsot — Agence Chic**
```
Alexia et Claire sont intervenues au sein de notre structure à un moment de transformation profonde : mise en place d'une nouvelle gouvernance, repositionnement stratégique, évolution de l'offre, le tout dans un contexte humain et business exigeant, après 15 ans d'existence. Un terrain de jeu complexe, qu'elles ont su appréhender avec une grande finesse. Elles se sont distinguées par la justesse de leur analyse, une excellente compréhension de notre culture d'entreprise et une lecture subtile des équilibres en place. Nous avons particulièrement valorisé leur capacité à nous coacher en tant que binôme de dirigeantes, avec ses forces et ses complémentarités. Alexia et Claire savent guider le collectif avec empathie mais sans complaisance, ce qui est précieux et rare.
```
*Beatrice Pierrard & Fanny Ponsot — DG & DGA, Agence Chic*

---

**11. Julio Quiroga — Clarins Group**
```
Ce que j'ai aimé d'Alexia et Claire est leur écoute. Elles ont passé beaucoup de temps à creuser et connaître chaque membre du comité de direction et nos dynamiques de Groupe avant de nous proposer un plan d'action personnalisé et adapté à nos besoins. Pendant le déroulé j'ai toujours eu un retour précis et nous avons passé du temps à l'analyse et l'ajustement si nécessaire. Au-delà de tout ça, le plus important sont les résultats. Mon comité de direction s'est transformé d'un groupe d'individus méfiants et pas trop motivés à une véritable équipe, qui partage un objectif clair, avec confiance les uns dans les autres et qui éprouvent un véritable plaisir à travailler ensemble.
```
*Julio Quiroga — Président EMEA and LATAM, Clarins Group*

---

**12. Cherif Rebai — CFO**
```
Ce coaching d'équipe a été très bénéfique pour notre groupe de directeurs financiers. L'approche complémentaire des deux coachs nous a permis de créer un environnement de confiance favorable aux échanges et à une communication efficace. Le cadre, à la fois sérieux et professionnel, avec une pointe de légèreté, a aidé à renforcer les liens et à encourager la coopération. Aujourd'hui, les échanges sont plus harmonieux, les bonnes pratiques sont mieux partagées, et nous ressentons appartenir à un réseau solidaire. Une expérience aussi stimulante que productive, que je recommande vivement.
```
*Cherif Rebai — CFO*

---

**13. Nathalie K. — NathKlo Connections (ex-Cultura)**
```
J'ai eu grand plaisir à collaborer à plusieurs reprises avec le duo formidable formé par Alexia et Claire. J'ai toujours pensé que deux têtes valaient mieux qu'une, et une fois encore, elles m'en ont apporté la preuve ! Elles savent faire émerger l'essentiel d'un travail collectif avec intelligence et finesse. Travailler avec elles est un vrai bonheur : curieuses, vives, ouvertes, efficaces, elles font preuve d'une capacité d'adaptation exceptionnelle.
```
*Nathalie K. — Agence culturelle NathKlo Connections, ex-directrice Marque et Communication Cultura*

---

### 5.8 Section Contact

**Titre :** `Contact`

**Bloc infos gauche :**
```
Alexia Honig
alexia@avapartners.fr
LinkedIn : https://www.linkedin.com/in/alexia-honig-6071851/

Claire de Procé-Blanchard
claire@avapartners.fr
LinkedIn : https://www.linkedin.com/in/claire-de-procé-blanchard/

📍 75017 Paris
```

**Formulaire droite (champs) :**
- Prénom
- Nom
- Email
- Téléphone
- Message (textarea)
- Bouton : ENVOYER

> **Note :** Pour le formulaire, utiliser **Formspree** (https://formspree.io) ou **Netlify Forms** pour la gestion des envois sans backend. Configurer pour envoyer vers alexia@avapartners.fr et claire@avapartners.fr.

---

### 5.9 Footer

```
Mentions Légales | Politique de Confidentialité

© 2025 AvaPartners. Tous droits réservés.
```

---

## 6. Assets à Récupérer

Les assets visuels sont disponibles sur le site actuel. Télécharger depuis :

| Asset | URL |
|-------|-----|
| Logo long | https://avapartners.fr/wp-content/uploads/2025/06/LOGOLONGok06.06.25.png |
| Logo A seul | https://avapartners.fr/wp-content/uploads/2025/06/LOGO-A-06.06.25.png |
| Photo Alexia (NB) | https://avapartners.fr/wp-content/uploads/2025/05/alesia-honig.png |
| Photo Claire (NB) | https://avapartners.fr/wp-content/uploads/2025/05/Claire-de-Proce-Blanchard.png |
| Logo Eiffage | https://avapartners.fr/wp-content/uploads/2025/05/Eiffage_Concessions_0072_01_colour_RGB-1.png |
| Logo CDV | https://avapartners.fr/wp-content/uploads/2025/05/logo_CDV_SMALL.png |
| Logo Alisea | https://avapartners.fr/wp-content/uploads/2025/05/Alisea_logoSMALL.png |
| Logo Chic | https://avapartners.fr/wp-content/uploads/2025/05/logo_CHIC_SMALL.png |
| Logo Clarins | https://avapartners.fr/wp-content/uploads/2025/05/Clarins-Logo_SMALL.png |
| Logo Viquel | https://avapartners.fr/wp-content/uploads/2025/07/logo-V1.png |
| Logo Onepoint | https://avapartners.fr/wp-content/uploads/2025/07/logoOnePoint.png |
| Logo VAP | https://avapartners.fr/wp-content/uploads/2025/07/221004_VAP-logocompletbleu.png |
| Logo Dior | https://avapartners.fr/wp-content/uploads/2025/10/LogoDior2.png |

> Pour le fond hero (forêt/arbres), utiliser une image libre de droits de qualité équivalente depuis Unsplash (recherche : "forest trees light canopy") ou demander à la cliente de fournir l'original.

---

## 7. Structure des Fichiers

```
avapartners/
├── index.html
├── content.js          ← TOUS les textes ici, pas dans le HTML
├── styles/
│   ├── main.css
│   ├── components.css
│   └── animations.css
├── scripts/
│   ├── main.js         ← scroll animations, onglets, slider
│   └── lang.js         ← gestion FR/EN
├── assets/
│   ├── images/
│   │   ├── logo-long.png
│   │   ├── logo-a.png
│   │   ├── alexia-honig.png
│   │   ├── claire-proce-blanchard.png
│   │   ├── hero-bg.jpg
│   │   └── logos/      ← logos clients
│   └── fonts/          ← si polices custom
└── README.md
```

---

## 8. Fonctionnalités JavaScript

### 8.1 Navigation
- Navbar fixe avec shadow subtil au scroll
- Lien actif mis en évidence selon la section visible (Intersection Observer)
- Menu burger sur mobile

### 8.2 Onglets Interventions
- 4 onglets avec transition de contenu fluide (fade)
- Onglet actif : texte doré + underline doré
- Persistance de l'onglet via URL hash (optionnel)

### 8.3 Slider Témoignages
- Navigation par flèches gauche/droite
- Indicateurs de position (dots)
- Swipe tactile sur mobile
- Auto-play optionnel (pause au survol)

### 8.4 Gestion de la langue
```javascript
// Structure à prévoir dans content.js
export const content = {
  fr: {
    nav: { interventions: "Nos interventions", ... },
    hero: { title: "Un duo d'expertes...", ... },
    // etc.
  },
  en: {
    nav: { interventions: "Our services", ... },
    hero: { title: "A duo of expert coaches...", ... },
    // etc.
  }
}
```
- Bouton FR/EN dans la navbar
- Changement de langue sans rechargement de page
- Langue par défaut : FR
- Langue persistée en localStorage

### 8.5 Formulaire de Contact
- Validation front-end (champs requis, format email)
- Envoi via Formspree ou Netlify Forms
- Message de confirmation après envoi

---

## 9. Responsive Design

| Breakpoint | Largeur | Adaptations principales |
|-----------|---------|------------------------|
| Desktop | > 1024px | Layout complet 2 colonnes |
| Tablet | 768–1024px | Colonnes réduites, paddings réduits |
| Mobile | < 768px | Colonne unique, menu burger, hero adapté |

---

## 10. SEO & Performance

- Balises `<meta>` complètes (title, description, og:)
- Images optimisées (WebP si possible, lazy loading)
- Score Lighthouse cible : > 90 sur toutes les métriques
- Balises sémantiques HTML5 (section, article, nav, header, footer)
- Textes alt sur toutes les images

**Meta description FR :**
```
AvaPartners – Duo de coachs et consultantes à Paris. Claire de Procé-Blanchard et Alexia Honig accompagnent dirigeants, managers et équipes en transformation. Coaching individuel, accompagnement d'équipes, ateliers CoDev.
```

---

## 11. Préparation Sanity CMS (Phase 2)

> Ne pas implémenter dans cette phase, mais écrire le code en anticipant cette migration.

**Principe :** Tout le contenu est dans `content.js`. Lors de la migration Sanity, ce fichier sera remplacé par des appels API. Aucune modification de structure HTML/CSS ne sera nécessaire.

**Schéma Sanity prévu :**
```javascript
// Les sections à rendre éditables :
// - hero (titre, sous-titre, textes)
// - interventions (4 blocs avec leurs contenus)
// - team (bio Alexia, bio Claire)
// - values (5 valeurs)
// - manifesto (4 paragraphes)
// - testimonials (tableau de témoignages)
// - contact (adresses, liens sociaux)
// Chaque champ aura une version FR et EN
```

---

## 12. Checklist de Livraison

- [ ] Site complet fonctionnel en localhost
- [ ] Toutes les sections présentes avec le contenu exact
- [ ] Animations scroll opérationnelles
- [ ] Onglets interventions fonctionnels
- [ ] Slider témoignages fonctionnel
- [ ] Changement de langue FR/EN fonctionnel
- [ ] Formulaire de contact fonctionnel
- [ ] Responsive mobile/tablet/desktop
- [ ] Tous les assets importés (logos, photos)
- [ ] Fichier `content.js` centralisé et propre
- [ ] Code pushé sur GitHub
- [ ] Déployé sur Vercel avec URL de preview

---

*PRD rédigé le 23/03/2026 — pour toute question sur le contenu ou le design, référencer les captures d'écran du site actuel : avapartners.fr*
