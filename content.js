// content.js — Tout le contenu textuel du site AvaPartners
// Structuré FR/EN pour migration Sanity (Phase 2)
// NE PAS mettre de texte directement dans index.html

export const content = {
  fr: {
    nav: {
      interventions: 'Nos interventions',
      about: 'Qui sommes-nous\u00a0?',
      values: 'Nos valeurs',
      manifesto: 'Manifesto',
      testimonials: 'T\u00e9moignages',
      contact: 'Contact',
      cta: 'Contact',
      lang: 'EN',
    },

    hero: {
      eyebrow: 'Coaching\u00a0· Conseil\u00a0· Transformation',
      title_part1: 'Un ',
      title_highlight: 'duo',
      title_part2: " d\u2019expertes de l\u2019accompagnement",
      title_line2: 'au service des dynamiques de transformation',
      col_left_p1:
        "Nous, Claire et Alexia, accompagnons des dirigeants et managers, des \u00e9quipes Codir et Comex \u2013 en fran\u00e7ais ou en anglais \u2013 dans leurs besoins de soutien et de suivi dans des phases de croissance, de crise et/ou de transformation.",
      col_left_p2:
        "Nous fixons des <span class=\"text-accent\">indicateurs de r\u00e9ussite</span>, qui soutiennent la mise en mouvement. En agissant sur le <span class=\"text-accent\">soft</span> (dynamiques relationnelles) et le <span class=\"text-accent\">hard</span> (enjeux op\u00e9rationnels), nous installons un climat apais\u00e9 qui renforce l\u2019efficacit\u00e9 collective et la performance.",
      col_right_p1:
        "Intervenir ensemble cr\u00e9e une richesse d\u2019analyse, de perspective et de prise de hauteur qui se r\u00e9pondent et s\u2019enrichissent pour un accompagnement plus fin, plus ajust\u00e9 et profond\u00e9ment ancr\u00e9 dans le r\u00e9el.",
      col_right_p2:
        "Notre duo est un <span class=\"text-accent\">syst\u00e8me face \u00e0 un syst\u00e8me</span>, comme un miroir face \u00e0 votre organisation. Nous captons les <span class=\"text-accent\">subtilit\u00e9s</span> de ce qui se joue dans l\u2019organisation et guidons dans la complexit\u00e9.",
      tagline:
        'Un accompagnement suivi et des livrables concrets pour des changements durables',
    },

    interventions: {
      section_label: 'Nos',
      section_highlight: 'interventions',
      tabs: [
        {
          id: 'equipes',
          label: "Accompagnement d\u2019\u00e9quipes",
          subtitle: '(en fran\u00e7ais ou en anglais)',
          for_who_title: 'Pour qui\u00a0?',
          for_who:
            "Comit\u00e9s ex\u00e9cutifs, Comit\u00e9s de direction, Comit\u00e9s op\u00e9rationnels, \u00c9quipes m\u00e9tiers, \u00c9quipes internationales.",
          when_title: "C\u2019est le moment quand le collectif\u00a0:",
          when: [
            "Vit un changement de cap, de strat\u00e9gie, d\u2019organisation",
            "Subit une crise interne ou externe",
            "Accueille et/ou voit partir des talents et/ou collaborateurs.",
          ],
          why_title: "Pour quoi\u00a0?",
          why: [
            "Accompagner les dynamiques de transformation\u00a0: croissance, r\u00e9organisation, gouvernance\u2026",
            "Actionner les leviers de r\u00e9ussite\u00a0: vision, culture d\u2019entreprise, mises en action\u2026",
            "Identifier et lever les freins\u00a0: travail sur la coh\u00e9sion, les prises de d\u00e9cision, les r\u00f4les flous\u2026",
          ],
          how_title: "Comment travaillons-nous\u00a0?",
          how_intro: "Nous travaillons dans l\u2019\u00e9mergence, sur-mesure, avec le vivant.",
          how: [
            "Un premier diagnostic et une strat\u00e9gie sont pos\u00e9s.",
            "Le protocole d\u2019intervention se co-construit avec le client.",
            "L\u2019accompagnement s\u2019ajuste en temps r\u00e9el aux enjeux internes et externes. Il mixe relationnel, op\u00e9rationnel, plans d\u2019actions concrets\u2026",
            "Une attention particuli\u00e8re est port\u00e9e \u00e0 l\u2019\u00e9nergie du groupe et au rythme.",
            "Nous proposons, six mois apr\u00e8s la fin de l\u2019accompagnement, un rendez-vous de suivi.",
          ],
        },
        {
          id: 'individuel',
          label: 'Accompagnement individuel',
          subtitle: '(en duo ou en solo)',
          for_who_title: 'Pour qui\u00a0?',
          for_who:
            "Managers interm\u00e9diaires, Managers de managers, Top managers, Dirigeants d\u2019entreprise\u2026",
          why_title: "Pour quoi\u00a0?",
          why: [
            "Prise de poste, \u00e9largissement de p\u00e9rim\u00e8tre.",
            "Posture de dirigeant/manager, communication, d\u00e9l\u00e9gation, gestion op\u00e9rationnelle\u2026",
            "Supervision de dirigeant, en parall\u00e8le ou non, d\u2019un travail avec son collectif.",
          ],
          how_title: "Comment\u00a0?",
          how: [
            "Un entretien exploratoire (sans engagement) permet de clarifier les besoins, poser les objectifs, les indicateurs\u2026",
            "Un plan d\u2019accompagnement personnalis\u00e9 est propos\u00e9. Sont d\u00e9cid\u00e9s\u00a0: le nombre estimatif de s\u00e9ances, la p\u00e9riodicit\u00e9, le lieu des s\u00e9ances, des bilans interm\u00e9diaires si n\u00e9cessaire.",
            "En entreprise, une s\u00e9ance tripartite d\u2019ouverture et une de cl\u00f4ture peuvent \u00eatre int\u00e9gr\u00e9es.",
            "Selon les besoins, nous mobilisons \u00e9galement notre r\u00e9seau pour proposer des pairs de confiance, quand nous ne sommes pas les mieux plac\u00e9es pour intervenir.",
            "Dans le cadre d\u2019un coaching en entreprise, une s\u00e9ance tripartite de d\u00e9marrage (avec le manager et/ou le DRH) et une s\u00e9ance de cl\u00f4ture seront pr\u00e9vues.",
          ],
        },
        {
          id: 'codev',
          label: 'Ateliers CoDev',
          for_who_title: 'Pour qui\u00a0?',
          for_who:
            "Managers et cadres, \u00c9quipes projets ou transverses, RH ou fonctions support, Collaborateurs en transition ou en d\u00e9veloppement.",
          why_title: "Pour quoi\u00a0?",
          why_intro:
            "Le CoDev est une m\u00e9thode d\u2019apprentissage \u00ab entre pairs \u00bb. Elle stimule l\u2019intelligence collective, d\u00e9veloppe les comp\u00e9tences et renforce la coop\u00e9ration autour de situations r\u00e9elles telles que\u00a0:",
          why: [
            "Difficult\u00e9s relationnelles ou man\u00e9\u00e9riales.",
            "Questions d\u2019organisation ou de posture.",
            "Confiance en soi, assertivit\u00e9, prise de recul, priorisation\u2026",
          ],
          how_title: "Comment\u00a0?",
          how: [
            "Le \u00ab client \u00bb \u2013 un participant \u2013 expose une situation.",
            "Les \u201cconsultants\u201d \u2013 les autres \u2013 contribuent par leurs questions, \u00e9clairages et suggestions.",
            "La facilitatrice garantit le cadre, soutient les apprentissages et propose des apports th\u00e9oriques si besoin.",
          ],
          format_title: "Format type\u00a0:",
          format: [
            "1 s\u00e9ance par participant (ex\u00a0: 6 personnes = 6 s\u00e9ances).",
            "Dur\u00e9e\u00a0: 2h \u00e0 2h30 selon la taille du groupe (taille maxi\u00a0: 8 personnes).",
            "R\u00f4les tournants pour favoriser l\u2019engagement et l\u2019apprentissage collectif.",
          ],
        },
        {
          id: 'maillage',
          label: 'Maillage professionnel',
          for_who_title: 'Pour qui\u00a0?',
          for_who:
            "Nos clients et notre r\u00e9seau professionnel car nous aimons connecter les bonnes personnes au bon moment.",
          when_title: "C\u2019est le moment quand un client souhaite\u00a0:",
          when: [
            "Proc\u00e9der \u00e0 une embauche strat\u00e9gique (un DG, une DRH\u2026)",
            "Se muscler sur un sujet, comme l\u2019IA, l\u2019innovation, la succession\u2026",
            "Faire une rencontre avec un expert technique d\u2019un domaine.",
            "Partager entre pairs\u00a0: \u00e9changes de bonnes pratiques au sein d\u2019un m\u00eame secteur ou m\u00e9tier.",
          ],
          why_title: "Pour quoi\u00a0?",
          why:
            "Cr\u00e9er des passerelles, provoquer des rencontres, activer les synergies\u00a0: c\u2019est une autre mani\u00e8re pour nous d\u2019accompagner la transformation.",
          how_title: "Comment\u00a0?",
          how:
            "Nous partons des besoins exprim\u00e9s (et parfois implicites), pour faciliter des rencontres pertinentes et porteuses de sens. Nous jouons un r\u00f4le de tiers de confiance.",
        },
      ],
    },

    about: {
      section_label: 'Qui sommes',
      section_highlight: 'nous\u00a0?',
      intro:
        "Un v\u00e9cu professionnel d\u2019environ 20 ans chacune nous conf\u00e8re une compr\u00e9hension fine des organisations et des \u00e9quilibres parfois fragiles entre le business et l\u2019humain.",
      alexia: {
        name: 'Alexia Honig',
        photo: 'assets/images/alexia-honig.png',
        bio:
          "a v\u00e9cu en Afrique, en Asie et en Europe, ce qui a nourri sa curiosit\u00e9 profonde pour les autres et renforc\u00e9 ses capacit\u00e9s d\u2019\u00e9coute et d\u2019adaptabilit\u00e9. Sa carri\u00e8re en tant que cadre marketing dirigeant dans diff\u00e9rentes entreprises de cosm\u00e9tiques (Clarins, Dior, Ioma\u2026) a forg\u00e9 sa conviction que l\u2019\u00e9nergie et l\u2019engagement des collaborateurs sont les v\u00e9ritables atouts d\u2019une organisation. Elle valorise la diversit\u00e9 des points de vue et r\u00e9v\u00e8le le potentiel de chacun. Elle poss\u00e8de un talent unique pour identifier les leviers cl\u00e9s de transformation et pour cr\u00e9er des connexions entre les personnes.",
        email: 'alexia@avapartners.fr',
        linkedin: 'https://www.linkedin.com/in/alexia-honig-6071851/',
      },
      claire: {
        name: 'Claire de Proc\u00e9-Blanchard',
        photo: 'assets/images/claire-proce-blanchard.png',
        bio:
          "a men\u00e9 une carri\u00e8re de journaliste en presse \u00e9crite et digitale, occupant notamment des fonctions de chef de service et de r\u00e9dactrice en chef (Prisma Presse, M6\u2026). Convaincue que le lien gu\u00e9rit, elle en a fait un levier d\u2019ouverture et op\u00e9rationnel au c\u0153ur d\u2019organisations complexes en accompagnant dirigeants et \u00e9quipes \u00e0 recr\u00e9er de l\u2019alignement, au service du mieux-vivre au travail et de la dynamique collective. Ses forces\u00a0? Une intelligence sensible doubl\u00e9e d\u2019une exigence au service de ses clients, une finesse dans l\u2019analyse des comportements avec une capacit\u00e9 \u00e0 mettre les mots justes sur ce qui se joue.",
        email: 'claire@avapartners.fr',
        linkedin: 'https://www.linkedin.com/in/claire-de-proc\u00e9-blanchard/',
      },
      certifications_label: 'Nos certifications\u00a0:',
      certifications:
        "Coach RNCP\u00a0\u00b7 Coach & Team Transformance Pro\u00a0\u00b7 Outil DISC & Forces Motrices\u00a0\u00b7 Analyse Transactionnelle 101\u00a0\u00b7 \u00c9l\u00e9ment Humain W. Schutz M1 & M2\u00a0\u00b7 Analyse syst\u00e9mique\u00a0\u00b7 Pratiques narratives\u00a0\u00b7 Coaching d\u2019organisation\u00a0\u00b7 Codev.",
    },

    values: {
      section_label: 'Nos',
      section_highlight: 'valeurs',
      subtitle:
        "Leviers concrets pour des changements durables, et incarn\u00e9es par notre duo, elles sont au service de nos clients.",
      items: [
        {
          title: "L\u2019authenticit\u00e9",
          description: "favorise la confiance et l\u2019ouverture.",
        },
        {
          title: 'Le plaisir',
          description: "booste la motivation et l\u2019\u00e9mulation.",
        },
        {
          title: "L\u2019humilit\u00e9",
          description: "valorise l\u2019expertise et le savoir-\u00eatre de nos clients.",
        },
        {
          title: "L\u2019abondance",
          description: "au sens du partage, de la mise en lien, de la coop\u00e9ration.",
        },
        {
          title: "L\u2019engagement",
          description:
            "vise \u00e0 optimiser la performance, avec une attention port\u00e9e aux d\u00e9tails.",
        },
      ],
    },

    manifesto: {
      title: 'MANIFESTO',
      col_left: [
        "Nous croyons en la dynamique de notre duo qui assure une exploration plus profonde et plus nuanc\u00e9e des d\u00e9fis auxquels nos clients sont confront\u00e9s.",
        "Nous croyons en un engagement r\u00e9ciproque, construit dans le temps et \u00e0 la mesure des besoins. Car les transformations profondes demandent de la constance, des \u00e9tapes et des pauses.",
      ],
      col_right: [
        "Nous croyons en l\u2019approche syst\u00e9mique qui nous permet de naviguer entre les besoins \u00e9motionnels et rationnels, assurant un \u00e9quilibre entre le soft et le hard dans notre accompagnement.",
        "Nous cultivons l\u2019ouverture pour faire \u00e9merger un collectif vivant et f\u00e9cond. C\u2019est dans cet espace que peuvent se d\u00e9ployer les questionnements, les confrontations constructives et des liens plus authentiques. De fa\u00e7on \u00e0 renforcer sa capacit\u00e9 \u00e0 s\u2019ajuster, \u00e0 \u00e9voluer et \u00e0 faire face aux transformations.",
      ],
    },

    testimonials: {
      section_label: 'Nos clients',
      section_highlight: 't\u00e9moignent',
      items: [
        {
          quote:
            "Travailler avec Alexia et Claire lors de l\u2019onboarding de l\u2019\u00e9quipe Dior Backstage Pros a \u00e9t\u00e9 une exp\u00e9rience exceptionnelle. Leur accompagnement a jou\u00e9 un r\u00f4le cl\u00e9 dans l\u2019unification du groupe autour d\u2019une mission commune, favorisant la confiance et la coh\u00e9sion. Gr\u00e2ce \u00e0 leur approche \u00e9clair\u00e9e, l\u2019\u00e9quipe a su adopter sa nouvelle mission avec clart\u00e9 et enthousiasme, posant ainsi les bases d\u2019une collaboration forte et inspirante.",
          author: 'Sharon Zarfati',
          role: 'International Head of Retail Education, DIOR Make up',
        },
        {
          quote:
            "Claire a contribu\u00e9 pour notre Groupe \u00e0 animer des groupes de managers en co-d\u00e9veloppement. Dans ce processus d\u2019apprentissage entre pairs, Claire a pu leur permettre de cultiver leur posture manag\u00e9riale et de consolider leur identit\u00e9 professionnelle. Les retours ont \u00e9t\u00e9 tr\u00e8s positifs, mettant en valeur la capacit\u00e9 de Claire \u00e0 faire bouger les managers.",
          author: 'Isabelle Lovett',
          role: 'DRH Prospective et management des comp\u00e9tences, AG2R La Mondiale',
        },
        {
          quote:
            "Brillante et d\u2019une grande sensibilit\u00e9, Claire a tr\u00e8s vite compris mes enjeux et m\u2019a bouscul\u00e9e, toujours avec bienveillance. Son accompagnement sans jugement m\u2019a permis d\u2019avancer, de prendre des d\u00e9cisions strat\u00e9giques, et surtout de regarder la r\u00e9alit\u00e9 en face. Je me suis toujours sentie soutenue, m\u00eame dans les moments les plus difficiles. J\u2019ai aussi pris conscience de mon rapport tr\u00e8s affectif avec mes collaborateurs, et de la fa\u00e7on dont cela affaiblissait ma posture de dirigeante. Un coaching puissant, lucide et profond\u00e9ment humain.",
          author: 'Nathalie Serfaty',
          role: 'Fondatrice et dirigeante de VAP, soci\u00e9t\u00e9 de conciergerie priv\u00e9e',
        },
        {
          quote:
            "L\u2019accompagnement d\u2019Alexia en coaching individuel m\u2019a permis d\u2019aborder ma prise de poste avec clart\u00e9, confiance et s\u00e9r\u00e9nit\u00e9. En rejoignant l\u2019entreprise familiale, j\u2019ai su affirmer ma place tout en marquant mon empreinte aupr\u00e8s des \u00e9quipes en place. Le coaching de mon \u00e9quipe rapproch\u00e9e, men\u00e9 par la suite, a renforc\u00e9 la coh\u00e9sion et am\u00e9lior\u00e9 la communication entre les collaborateurs. Aujourd\u2019hui, nous poursuivons notre chemin avec une dynamique collective renouvel\u00e9e.",
          author: 'M\u00e9lanie Viquel',
          role: 'Directrice du D\u00e9veloppement, Viquel',
        },
        {
          quote:
            "Gr\u00e2ce \u00e0 l\u2019accompagnement d\u2019Alexia, j\u2019ai pu franchir un cap, prendre du recul et de la hauteur strat\u00e9gique pour r\u00e9aligner mes priorit\u00e9s dans un contexte de transformation exigeant. Son regard pragmatique et bienveillant m\u2019a permis de renforcer mon impact en tant que leader.",
          author: 'Mohamed Benkhodja',
          role: 'People Experience Leader, Onepoint',
        },
        {
          quote:
            "J\u2019ai eu l\u2019opportunit\u00e9 de travailler \u00e0 deux reprises avec Alexia et Claire, en tant que DRH de R\u00e9gion au sein de Clarins, dans mon ancien poste. La compl\u00e9mentarit\u00e9 et le professionnalisme de leur bin\u00f4me ont \u00e9t\u00e9 des atouts majeurs dans les deux cas d\u2019exp\u00e9rience, que je d\u00e9finirais de \u201cm\u00e9tamorphose\u201d d\u2019\u00e9quipe. La dynamique qui s\u2019est instaur\u00e9e depuis le d\u00e9but entre nous trois \u2013 ayant form\u00e9 un vrai squad \u2013 a \u00e9t\u00e9 un \u00e9l\u00e9ment de stabilit\u00e9 et d\u2019ancrage important pour la r\u00e9ussite de ces projets d\u2019accompagnement. La confiance mutuelle, l\u2019\u00e9change authentique, l\u2019avoir \u00e0 c\u0153ur les enjeux humains de l\u2019\u00e9quipe. Merci AVA Partners pour votre accompagnement g\u00e9n\u00e9reux, attentionn\u00e9 et efficace.",
          author: 'Ilaria Gigou',
          role: 'Founder and Managing Director, Workescape',
        },
        {
          quote:
            "Le travail avec Ava me permet de clarifier ma compr\u00e9hension des modes de fonctionnement de notre organisation et de pouvoir mieux activer les ressources de d\u00e9veloppement qu\u2019elle r\u00e9v\u00e8le. C\u2019est pour nous un travail en profondeur et aussi un soutien pertinent dans le choix des leviers de management \u00e0 prioriser.",
          author: 'Arnaud Gastelu',
          role: 'Co-owner, Alisea Corporate Finance',
        },
        {
          quote:
            "Le duo Claire & Alexia fonctionne \u00e0 merveille. Leur compl\u00e9mentarit\u00e9 apporte rythme, clart\u00e9 et profondeur. Gr\u00e2ce \u00e0 leur approche \u00e0 deux voix, toujours fluide et bienveillante, elles ont su recr\u00e9er du lien au sein de notre ComOp, casser les silos post-Covid et ouvrir un nouvel espace de dialogue constructif. Leur posture est \u00e0 la fois facilitante et accessible, et les s\u00e9minaires qu\u2019elles ont anim\u00e9s \u2013 tout comme les temps d\u2019\u00e9changes avec moi en tant que dirigeante \u2013 ont \u00e9t\u00e9 d\u2019une grande justesse. Un vrai tandem au service de l\u2019intelligence collective. Et en prime, quand un maillon manque ou qu\u2019il y a un \u201ctrou dans la raquette\u201d c\u00f4t\u00e9 management, elles savent proposer les bonnes mises en relation, avec des expertes cibl\u00e9es et efficaces.",
          author: 'Rose-Marie Farrugia',
          role: 'PDG, Cercle des Vacances',
        },
        {
          quote:
            "Alexia et Claire sont anim\u00e9es par une bienveillance profonde et une authenticit\u00e9 sans d\u00e9tour. Elles savent cr\u00e9er un espace s\u00fbr, o\u00f9 chacun peut exprimer son monde en toute confiance. Leur compl\u00e9mentarit\u00e9 puissante, alli\u00e9e \u00e0 une pr\u00e9sence juste et engag\u00e9e, leur permet d\u2019accompagner le groupe avec douceur tout en osant nommer ce qui entrave\u00a0: les non-dits, les tensions, les dysfonctionnements. Sans jamais juger, elles offrent un miroir sinc\u00e8re, stimulant la prise de conscience individuelle et collective. Ce faisant, elles ouvrent le chemin vers une coh\u00e9sion plus forte, une dynamique plus saine, o\u00f9 le collectif se (re)construit dans la confiance, la responsabilit\u00e9 et la clart\u00e9.",
          author: 'Patrick Chavanne',
          role: 'Directeur G\u00e9n\u00e9ral, Clarins Suisse',
        },
        {
          quote:
            "Alexia et Claire sont intervenues au sein de notre structure \u00e0 un moment de transformation profonde\u00a0: mise en place d\u2019une nouvelle gouvernance, repositionnement strat\u00e9gique, \u00e9volution de l\u2019offre, le tout dans un contexte humain et business exigeant, apr\u00e8s 15 ans d\u2019existence. Un terrain de jeu complexe, qu\u2019elles ont su appr\u00e9hender avec une grande finesse. Elles se sont distingu\u00e9es par la justesse de leur analyse, une excellente compr\u00e9hension de notre culture d\u2019entreprise et une lecture subtile des \u00e9quilibres en place. Nous avons particuli\u00e8rement valoris\u00e9 leur capacit\u00e9 \u00e0 nous coacher en tant que bin\u00f4me de dirigeantes, avec ses forces et ses compl\u00e9mentarit\u00e9s. Alexia et Claire savent guider le collectif avec empathie mais sans complaisance, ce qui est pr\u00e9cieux et rare.",
          author: 'Beatrice Pierrard & Fanny Ponsot',
          role: 'DG & DGA, Agence Chic',
        },
        {
          quote:
            "Ce que j\u2019ai aim\u00e9 d\u2019Alexia et Claire est leur \u00e9coute. Elles ont pass\u00e9 beaucoup de temps \u00e0 creuser et conna\u00eetre chaque membre du comit\u00e9 de direction et nos dynamiques de Groupe avant de nous proposer un plan d\u2019action personnalis\u00e9 et adapt\u00e9 \u00e0 nos besoins. Pendant le d\u00e9roul\u00e9 j\u2019ai toujours eu un retour pr\u00e9cis et nous avons pass\u00e9 du temps \u00e0 l\u2019analyse et l\u2019ajustement si n\u00e9cessaire. Au-del\u00e0 de tout \u00e7a, le plus important sont les r\u00e9sultats. Mon comit\u00e9 de direction s\u2019est transform\u00e9 d\u2019un groupe d\u2019individus m\u00e9fiants et pas trop motiv\u00e9s \u00e0 une v\u00e9ritable \u00e9quipe, qui partage un objectif clair, avec confiance les uns dans les autres et qui \u00e9prouvent un v\u00e9ritable plaisir \u00e0 travailler ensemble.",
          author: 'Julio Quiroga',
          role: 'Pr\u00e9sident EMEA and LATAM, Clarins Group',
        },
        {
          quote:
            "Ce coaching d\u2019\u00e9quipe a \u00e9t\u00e9 tr\u00e8s b\u00e9n\u00e9fique pour notre groupe de directeurs financiers. L\u2019approche compl\u00e9mentaire des deux coachs nous a permis de cr\u00e9er un environnement de confiance favorable aux \u00e9changes et \u00e0 une communication efficace. Le cadre, \u00e0 la fois s\u00e9rieux et professionnel, avec une pointe de l\u00e9g\u00e8ret\u00e9, a aid\u00e9 \u00e0 renforcer les liens et \u00e0 encourager la coop\u00e9ration. Aujourd\u2019hui, les \u00e9changes sont plus harmonieux, les bonnes pratiques sont mieux partag\u00e9es, et nous ressentons appartenir \u00e0 un r\u00e9seau solidaire. Une exp\u00e9rience aussi stimulante que productive, que je recommande vivement.",
          author: 'Cherif Rebai',
          role: 'CFO',
        },
        {
          quote:
            "J\u2019ai eu grand plaisir \u00e0 collaborer \u00e0 plusieurs reprises avec le duo formidable form\u00e9 par Alexia et Claire. J\u2019ai toujours pens\u00e9 que deux t\u00eates valaient mieux qu\u2019une, et une fois encore, elles m\u2019en ont apport\u00e9 la preuve\u00a0! Elles savent faire \u00e9merger l\u2019essentiel d\u2019un travail collectif avec intelligence et finesse. Travailler avec elles est un vrai bonheur\u00a0: curieuses, vives, ouvertes, efficaces, elles font preuve d\u2019une capacit\u00e9 d\u2019adaptation exceptionnelle.",
          author: 'Nathalie K.',
          role: 'Agence culturelle NathKlo Connections, ex-directrice Marque et Communication Cultura',
        },
      ],
    },

    contact: {
      title: 'Contact',
      alexia_name: 'Alexia Honig',
      alexia_email: 'alexia@avapartners.fr',
      alexia_linkedin: 'https://www.linkedin.com/in/alexia-honig-6071851/',
      claire_name: 'Claire de Proc\u00e9-Blanchard',
      claire_email: 'claire@avapartners.fr',
      claire_linkedin: 'https://www.linkedin.com/in/claire-de-proc\u00e9-blanchard/',
      address: '75017 Paris',
      form: {
        firstname: 'Pr\u00e9nom',
        lastname: 'Nom',
        email: 'Email',
        phone: 'T\u00e9l\u00e9phone',
        message: 'Message',
        submit: 'ENVOYER',
        success: 'Votre message a bien \u00e9t\u00e9 envoy\u00e9\u00a0! Nous vous r\u00e9pondrons tr\u00e8s vite.',
        error: "Une erreur s\u2019est produite. Veuillez r\u00e9essayer.",
      },
    },

    footer: {
      legal: 'Mentions L\u00e9gales',
      privacy: 'Politique de Confidentialit\u00e9',
      copyright: '\u00a9 2025 AvaPartners. Tous droits r\u00e9serv\u00e9s.',
    },
  },

  en: {
    nav: {
      interventions: 'Our services',
      about: 'Who we are',
      values: 'Our values',
      manifesto: 'Manifesto',
      testimonials: 'Testimonials',
      contact: 'Contact',
      cta: 'Contact',
      lang: 'FR',
    },

    hero: {
      eyebrow: 'Coaching\u00a0· Consulting\u00a0· Transformation',
      title_part1: 'A ',
      title_highlight: 'duo',
      title_part2: ' of expert coaches',
      title_line2: 'driving organisational transformation',
      col_left_p1:
        "We, Claire and Alexia, support executives and managers, ExCo and Board teams \u2013 in French or English \u2013 through their need for sustained support during periods of growth, crisis, and/or transformation.",
      col_left_p2:
        "We set success indicators that drive momentum. By acting on both the soft (relational dynamics) and the hard (operational challenges), we create a calmer climate that strengthens collective effectiveness and performance.",
      col_right_p1:
        "Working together creates a richness of analysis, perspective and perspective that complement and enrich each other for a sharper, more attuned accompaniment that is deeply rooted in reality.",
      col_right_p2:
        "Our duo is a system facing a system \u2013 like a mirror held up to your organisation. We pick up on the subtleties of what is at play and guide through complexity.",
      tagline:
        'Sustained support and concrete deliverables for lasting change',
    },

    interventions: {
      section_label: 'Our',
      section_highlight: 'services',
      tabs: [
        {
          id: 'equipes',
          label: 'Team coaching',
          subtitle: '(in French or English)',
          for_who_title: 'For whom?',
          for_who:
            'Executive Committees, Management Committees, Operational Committees, Business Teams, International Teams.',
          when_title: 'The right moment when the team:',
          when: [
            'Is experiencing a change of direction, strategy, or organisation',
            'Is dealing with an internal or external crisis',
            'Is welcoming new talent or saying goodbye to key people.',
          ],
          why_title: 'What for?',
          why: [
            'Accompanying transformation dynamics: growth, reorganisation, governance\u2026',
            'Activating success levers: vision, company culture, action plans\u2026',
            'Identifying and removing barriers: cohesion work, decision-making, unclear roles\u2026',
          ],
          how_title: 'How do we work?',
          how_intro: 'We work in emergence, tailor-made, with what is alive.',
          how: [
            'An initial diagnosis and strategy are established.',
            'The intervention protocol is co-constructed with the client.',
            'The support adjusts in real time to internal and external issues, mixing relational, operational, and concrete action plans\u2026',
            'Particular attention is paid to group energy and pace.',
            'Six months after the end of the support, we offer a follow-up session.',
          ],
        },
        {
          id: 'individuel',
          label: 'Individual coaching',
          subtitle: '(duo or solo)',
          for_who_title: 'For whom?',
          for_who:
            'Middle managers, Managers of managers, Top managers, Business executives\u2026',
          why_title: 'What for?',
          why: [
            'Taking up a new role, expanding scope of responsibility.',
            'Leadership posture, communication, delegation, operational management\u2026',
            'Executive supervision, in parallel or not, with team work.',
          ],
          how_title: 'How?',
          how: [
            'An exploratory interview (no commitment) clarifies needs, objectives, and indicators\u2026',
            'A personalised support plan is proposed, covering: estimated number of sessions, frequency, location, and interim reviews if needed.',
            'In a corporate setting, an opening tripartite session and a closing one can be included.',
            "We also mobilise our network to suggest trusted peers when we are not best placed to intervene.",
            'For corporate coaching, a tripartite opening session (with the manager and/or HR) and a closing session will be planned.',
          ],
        },
        {
          id: 'codev',
          label: 'CoDev Workshops',
          for_who_title: 'For whom?',
          for_who:
            'Managers and executives, Project or cross-functional teams, HR or support functions, Employees in transition or development.',
          why_title: 'What for?',
          why_intro:
            'CoDev is a peer-learning method. It stimulates collective intelligence, develops competencies, and strengthens cooperation around real-life situations such as:',
          why: [
            'Relational or managerial difficulties.',
            'Organisational or posture questions.',
            'Self-confidence, assertiveness, stepping back, prioritisation\u2026',
          ],
          how_title: 'How?',
          how: [
            'The "client" \u2013 one participant \u2013 presents a situation.',
            'The "consultants" \u2013 the others \u2013 contribute through questions, insights, and suggestions.',
            'The facilitator maintains the framework, supports learning, and offers theoretical input when needed.',
          ],
          format_title: 'Typical format:',
          format: [
            '1 session per participant (e.g. 6 people = 6 sessions).',
            'Duration: 2h to 2h30 depending on group size (maximum: 8 people).',
            'Rotating roles to foster engagement and collective learning.',
          ],
        },
        {
          id: 'maillage',
          label: 'Professional networking',
          for_who_title: 'For whom?',
          for_who:
            'Our clients and our professional network, because we love connecting the right people at the right time.',
          when_title: 'The right moment when a client wishes to:',
          when: [
            'Make a strategic hire (CEO, CHRO\u2026)',
            'Strengthen expertise on a topic such as AI, innovation, succession\u2026',
            'Meet a technical expert in a given field.',
            'Share with peers: best practice exchanges within the same sector or profession.',
          ],
          why_title: 'What for?',
          why:
            'Creating bridges, sparking encounters, activating synergies: it is another way for us to accompany transformation.',
          how_title: 'How?',
          how:
            'We start from expressed (and sometimes implicit) needs, to facilitate relevant and meaningful connections. We act as a trusted third party.',
        },
      ],
    },

    about: {
      section_label: 'Who',
      section_highlight: 'we are',
      intro:
        'Around 20 years of professional experience each gives us a deep understanding of organisations and the sometimes fragile balance between business and the human element.',
      alexia: {
        name: 'Alexia Honig',
        photo: 'assets/images/alexia-honig.png',
        bio:
          'has lived in Africa, Asia and Europe, which has nurtured her deep curiosity for others and strengthened her listening and adaptability skills. Her career as a senior marketing executive in various cosmetics companies (Clarins, Dior, Ioma\u2026) forged her conviction that the energy and commitment of employees are the true assets of any organisation. She values diversity of perspectives and reveals the potential of each individual. She has a unique talent for identifying key transformation levers and creating connections between people.',
        email: 'alexia@avapartners.fr',
        linkedin: 'https://www.linkedin.com/in/alexia-honig-6071851/',
      },
      claire: {
        name: 'Claire de Proc\u00e9-Blanchard',
        photo: 'assets/images/claire-proce-blanchard.png',
        bio:
          'built a career as a journalist in print and digital media, including roles as section editor and editor-in-chief (Prisma Presse, M6\u2026). Convinced that connection heals, she made it an operational and transformative lever within complex organisations, supporting executives and teams to rebuild alignment in service of well-being at work and collective momentum. Her strengths? A sensitive intelligence combined with a demanding approach in service of her clients, a sharp ability to analyse behaviours and find the right words for what is at play.',
        email: 'claire@avapartners.fr',
        linkedin: 'https://www.linkedin.com/in/claire-de-proc\u00e9-blanchard/',
      },
      certifications_label: 'Our certifications:',
      certifications:
        'ICF-accredited Coach (RNCP)\u00a0\u00b7 Coach & Team Transformance Pro\u00a0\u00b7 DISC & Driving Forces\u00a0\u00b7 Transactional Analysis 101\u00a0\u00b7 The Human Element W. Schutz L1 & L2\u00a0\u00b7 Systemic Analysis\u00a0\u00b7 Narrative Practices\u00a0\u00b7 Organisational Coaching\u00a0\u00b7 CoDev.',
    },

    values: {
      section_label: 'Our',
      section_highlight: 'values',
      subtitle:
        'Concrete levers for lasting change, embodied by our duo, they are in service of our clients.',
      items: [
        {
          title: 'Authenticity',
          description: 'fosters trust and openness.',
        },
        {
          title: 'Pleasure',
          description: 'boosts motivation and collective energy.',
        },
        {
          title: 'Humility',
          description: "values our clients' expertise and ways of being.",
        },
        {
          title: 'Abundance',
          description: 'in the sense of sharing, connecting, and cooperating.',
        },
        {
          title: 'Commitment',
          description: 'aims to optimise performance, with attention to detail.',
        },
      ],
    },

    manifesto: {
      title: 'MANIFESTO',
      col_left: [
        'We believe in the dynamic of our duo, which ensures a deeper and more nuanced exploration of the challenges our clients face.',
        'We believe in reciprocal commitment, built over time and tailored to needs. Because deep transformations require consistency, milestones, and pauses.',
      ],
      col_right: [
        'We believe in the systemic approach, which allows us to navigate between emotional and rational needs, ensuring a balance between soft and hard in our support.',
        'We cultivate openness to bring forth a living and fertile collective. It is in this space that questions, constructive confrontations, and more authentic connections can unfold \u2013 strengthening the capacity to adjust, evolve, and face transformations.',
      ],
    },

    testimonials: {
      section_label: 'Client',
      section_highlight: 'testimonials',
      items: [], // English testimonials use same quotes — not re-translated
    },

    contact: {
      title: 'Contact',
      alexia_name: 'Alexia Honig',
      alexia_email: 'alexia@avapartners.fr',
      alexia_linkedin: 'https://www.linkedin.com/in/alexia-honig-6071851/',
      claire_name: 'Claire de Proc\u00e9-Blanchard',
      claire_email: 'claire@avapartners.fr',
      claire_linkedin: 'https://www.linkedin.com/in/claire-de-proc\u00e9-blanchard/',
      address: 'Paris, France',
      form: {
        firstname: 'First name',
        lastname: 'Last name',
        email: 'Email',
        phone: 'Phone',
        message: 'Message',
        submit: 'SEND',
        success: 'Your message has been sent! We will get back to you shortly.',
        error: 'An error occurred. Please try again.',
      },
    },

    footer: {
      legal: 'Legal Notice',
      privacy: 'Privacy Policy',
      copyright: '\u00a9 2025 AvaPartners. All rights reserved.',
    },
  },
};
