# Zuri Solutions — French Localization Audit

**Audit date:** 25 August 2026  
**Scope:** Every publicly linked page on [zurisolutions.dev](https://www.zurisolutions.dev/) viewed after switching the site to **FR**, plus the complete nine-question diagnostic and its result/report states.

## Executive finding

The French interface is **partially localized**: navigation, headings, calls to action, form labels, the diagnostic questions, all diagnostic result tiers, and most utility copy are French. However, **36 visitor-facing English strings remain visible** across the three public pages. These are concentrated in body copy and the footer legal notice.

The problem is **not translation quality or missing French source copy**. The public localization script already contains French equivalents for the untranslated strings, but those replacements are not being applied consistently to the rendered text nodes. Therefore, the best remediation is to **fix the application of the existing localization dictionary**, rather than manually adding another set of translations.

> I have interpreted the request as English elements that should be **French** on the French version.

## Coverage

| Public URL / visitor state | Status | Untranslated English items |
|---|---:|---:|
| [Homepage](https://www.zurisolutions.dev/) | Audited in FR | 14 |
| [Notre méthode](https://www.zurisolutions.dev/how-we-work.html) | Audited in FR | 8 |
| [Cas d’usage](https://www.zurisolutions.dev/use-cases.html) | Audited in FR | 14 |
| Homepage interactive diagnostic: entry, all 9 questions, all result tiers, report form | Audited in FR | 0 |
| **Total** | **Complete** | **36** |

## 1. Homepage — `/`

| Location on the French page | Required replacement |
|---|---|
| Under **« Automatisation IA et solutions numériques sur mesure pour votre entreprise. »** | `Not generic AI tools. Custom digital systems designed around real business workflows.` --> `Pas d’outils IA génériques. Des systèmes numériques conçus autour de vos processus métier réels.` |
| **« Solutions numériques sur mesure »** — description | `Websites, portals, dashboards, internal tools, inventory systems, admin panels, reporting tools, and custom software that help businesses operate faster.` --> `Sites web, portails, tableaux de bord, outils internes, systèmes d’inventaire, interfaces d’administration, outils de reporting et logiciels sur mesure qui accélèrent vos opérations.` |
| **« Automatisation par IA »** — description | `Practical AI systems that reduce repetitive work: email drafting, document generation, data extraction, summarization, customer support assistance, and task routing.` --> `Des systèmes IA concrets qui réduisent les tâches répétitives : rédaction d’e-mails, génération de documents, extraction de données, synthèse, aide au support client et routage des tâches.` |
| **« Automatisation des processus »** — description | `Automate handoffs, notifications, approvals, data movement, reporting, and recurring processes across tools your team already uses.` --> `Automatisez les transmissions, notifications, validations, flux de données, rapports et processus récurrents entre les outils que votre équipe utilise déjà.` |
| **« Agents IA sur mesure »** — description | `Targeted AI agents for lookup work, document-heavy tasks, internal support, research, drafting, and operational assistance.` --> `Des agents IA ciblés pour les recherches, les tâches documentaires, le support interne, la veille, la rédaction et l’assistance opérationnelle.` |
| **« Tableaux de bord et outils internes »** — description | `Systems that give leadership better visibility into operations, performance, inventory, workflows, and team activity.` --> `Des systèmes qui donnent à la direction une meilleure visibilité sur les opérations, la performance, les stocks, les processus et l’activité des équipes.` |
| **« Extensions Chrome et outils légers »** — description | `Browser-based tools and extensions that make everyday work faster without forcing teams into a completely new platform.` --> `Des outils et extensions de navigateur qui accélèrent le travail au quotidien sans imposer une plateforme entièrement nouvelle à vos équipes.` |
| **« Mini-diagnostic opérationnel »** — body text | `Answer 9 practical questions and get an instant read on where your business may be leaking time through repetitive tasks, manual processes, lookup work, and disconnected systems.` --> `Répondez à 9 questions concrètes et obtenez une première lecture des endroits où votre entreprise perd peut-être du temps à cause de tâches répétitives, de processus manuels, de recherches ou de systèmes déconnectés.` |
| **« Pratique avant spectaculaire »** — description | `We prioritize systems that create measurable operational value, not AI experiments that look impressive but do not get used.` --> `Nous privilégions les systèmes qui créent une valeur opérationnelle mesurable, pas les expérimentations IA impressionnantes mais inutilisées.` |
| **« Du sur mesure là où cela compte »** — description | `Your business does not run like everyone else's. Your systems should reflect your workflows, team, and constraints.` --> `Votre entreprise ne fonctionne pas comme les autres. Vos systèmes doivent refléter vos processus, votre équipe et vos contraintes.` |
| **« L’humain dans la boucle »** — description | `We design AI around how people actually work, with approval, visibility, and control where it matters.` --> `Nous concevons l’IA autour de la façon dont les personnes travaillent réellement, avec validation, visibilité et contrôle là où c’est nécessaire.` |
| **« Livraison à grande vitesse »** — description | `We are one of the fastest AI and digital solution builders on the market. Most projects go from discovery to first working version in 8 days, not months.` --> `Nous sommes parmi les constructeurs de solutions IA et numériques les plus rapides du marché. La plupart des projets passent de la découverte à une première version fonctionnelle en 8 jours, pas en plusieurs mois.` |
| Quote beneath the philosophy cards | `"We find operational waste and build useful systems that remove it. Not because AI is trending — because your team's time is worth protecting."` --> `« Nous identifions les gaspillages opérationnels et construisons des systèmes utiles pour les supprimer. Pas parce que l’IA est à la mode — parce que le temps de votre équipe mérite d’être protégé. »` |
| Footer legal notice | `© 2026 Zuri Solutions. All rights reserved.` --> `© 2026 Zuri Solutions. Tous droits réservés.` |

## 2. Notre méthode — `/how-we-work.html`

| Location on the French page | Required replacement |
|---|---|
| Introductory paragraph below **« Vous ne payez rien avant que nous ayons démontré notre valeur. »** | `We earn your trust before you spend a cent. Our process starts with understanding your business deeply — then we show you exactly what we can do before any commitment.` --> `Nous gagnons votre confiance avant que vous ne dépensiez un centime. Notre processus commence par une compréhension approfondie de votre entreprise — puis nous vous montrons précisément ce que nous pouvons faire avant tout engagement.` |
| Step 01 — **« Découverte sans risque »** | `We start with a free, no-obligation workflow audit. We speak with your team, map your bottlenecks, and identify the highest-leverage opportunities — at no cost to you. You only move forward if what we find is worth acting on.` --> `Nous commençons par un audit gratuit et sans engagement de vos processus. Nous échangeons avec votre équipe, cartographions vos goulots d’étranglement et identifions les opportunités les plus prometteuses — sans aucun coût pour vous. Vous n’avancez que si ce que nous trouvons mérite d’être mis en œuvre.` |
| Step 02 — **« Cartographier »** | `We turn scattered workflow pain points into a clear picture of how work actually moves through the business — where it slows, where it duplicates, and where it disappears.` --> `Nous transformons des irritants dispersés en une vue claire de la façon dont le travail circule réellement dans l’entreprise — là où il ralentit, se duplique ou disparaît.` |
| Step 03 — **« Prioriser »** | `We rank opportunities using impact, effort, adoption risk, and speed to value. We always start with the highest-leverage, lowest-friction win.` --> `Nous classons les opportunités selon leur impact, l’effort requis, le risque d’adoption et la rapidité de création de valeur. Nous commençons toujours par le gain le plus important et le moins frictionnel.` |
| Step 04 — **« Construire »** | `We create the right system: AI agent, automation, dashboard, internal tool, extension, website, or custom platform. Built fast, built to be used.` --> `Nous créons le bon système : agent IA, automatisation, tableau de bord, outil interne, extension, site web ou plateforme sur mesure. Construit vite, conçu pour être utilisé.` |
| Step 05 — **« Améliorer »** | `We measure usage, refine the system, and expand into the next highest-value opportunity. The relationship does not end at delivery.` --> `Nous mesurons l’utilisation, affinons le système et développons la prochaine opportunité à forte valeur. La relation ne s’arrête pas à la livraison.` |
| **« De la découverte à la première version fonctionnelle en 8 jours. »** — supporting paragraph | `Most agencies take weeks just to scope a project. We move differently. Our team is structured for speed without sacrificing quality — most projects go from first call to a working prototype within 8 days. We are one of the fastest AI and digital solution builders on the market.` --> `La plupart des agences mettent des semaines à cadrer un projet. Nous fonctionnons autrement. Notre équipe est structurée pour aller vite sans sacrifier la qualité — la plupart de nos projets passent du premier appel à un prototype fonctionnel en 8 jours. Nous sommes parmi les constructeurs de solutions IA et numériques les plus rapides du marché.` |
| Footer legal notice | `© 2026 Zuri Solutions. All rights reserved.` --> `© 2026 Zuri Solutions. Tous droits réservés.` |

## 3. Cas d’usage — `/use-cases.html`

| Location on the French page | Required replacement |
|---|---|
| Introductory paragraph below **« Là où nous trouvons des gains rapides. »** | `The fastest ROI is usually hiding in boring, repetitive work. Here are the most common places we find immediate value.` --> `Le ROI le plus rapide se cache souvent dans les tâches répétitives et peu stimulantes. Voici les domaines où nous trouvons le plus souvent une valeur immédiate.` |
| Card 01 — **« Saisie manuelle de données »** | `Move information between spreadsheets, forms, CRMs, documents, and internal systems without repetitive copy-paste.` --> `Déplacez les informations entre feuilles de calcul, formulaires, CRM, documents et systèmes internes sans copier-coller répétitif.` |
| Card 02 — **« Création de documents »** | `Generate drafts, reports, proposals, summaries, checklists, and internal documents from business context.` --> `Générez des brouillons, rapports, propositions, synthèses, listes de contrôle et documents internes à partir du contexte de votre entreprise.` |
| Card 03 — **« Travail de recherche »** | `Search across files, websites, emails, dashboards, and internal tools faster — without switching between six tabs.` --> `Recherchez plus rapidement dans les fichiers, sites web, e-mails, tableaux de bord et outils internes — sans passer d’un onglet à l’autre.` |
| Card 04 — **« E-mails et communication client »** | `Draft replies, summarize customer issues, classify messages, and prepare responses while keeping humans in control.` --> `Rédigez des réponses, synthétisez les demandes clients, classez les messages et préparez des réponses tout en gardant les humains aux commandes.` |
| Card 05 — **« Reporting et visibilité »** | `Build dashboards and internal systems that show what is happening across operations in real time.` --> `Construisez des tableaux de bord et systèmes internes qui montrent en temps réel ce qui se passe dans vos opérations.` |
| Card 06 — **« Routage des processus »** | `Send the right task, update, request, or alert to the right person or system automatically.` --> `Envoyez automatiquement la bonne tâche, mise à jour, demande ou alerte à la bonne personne ou au bon système.` |
| **« Transformer les e-mails répétitifs en brouillons prêts à être relus. »** — project paragraph | `A business owner was spending multiple hours per day answering similar customer emails. Zuri designed an AI email assistant that reads incoming messages, identifies which ones need a response, drafts replies, and leaves final approval to the human.` --> `Un dirigeant passait plusieurs heures par jour à répondre à des e-mails clients similaires. Zuri a conçu un assistant IA qui lit les messages entrants, identifie ceux qui nécessitent une réponse, prépare des brouillons et laisse la validation finale à un humain.` |
| Same project example — bullet 1 | `No automatic sending — human approval stays in control` --> `Aucun envoi automatique — la validation humaine garde le contrôle` |
| Same project example — bullet 2 | `Sensitive messages are flagged instead of answered` --> `Les messages sensibles sont signalés plutôt que traités automatiquement` |
| Same project example — bullet 3 | `Repetitive replies become ready-to-review drafts` --> `Les réponses répétitives deviennent des brouillons prêts à être relus` |
| Same project example — bullet 4 | `Daily summary delivered to the owner` --> `Un résumé quotidien est envoyé au dirigeant` |
| Same project example — bullet 5 | `Implemented without replacing the existing email workflow` --> `Implémenté sans remplacer le flux d’e-mails existant` |
| Footer legal notice | `© 2026 Zuri Solutions. All rights reserved.` --> `© 2026 Zuri Solutions. Tous droits réservés.` |

## Items confirmed as already localized

The following visitor-facing areas were reviewed and do **not** need a French translation change: all core navigation, page titles, hero copy, buttons, contact form labels and choices, diagnostic entry controls, all nine diagnostic questions and answer choices, the **« Voir les résultats »** state, all four result outcomes, the diagnostic report form, and the “report sent” confirmation state.

Brand names and conventions such as **Zuri Solutions**, **LinkedIn**, **Chrome**, the e-mail address, `EN` / `FR`, and international phone-number formatting were deliberately not classified as untranslated copy.

## Recommended implementation fix

The fastest durable fix is to correct the **French text-node replacement mechanism** in the localization layer and then validate the three pages in an incognito session after selecting **FR**. Do not manually copy the French replacements into multiple page templates: that creates a second source of truth and guarantees future drift.

Use the existing French dictionary as the authoritative content source, ensure each rendered string is matched reliably, and add a lightweight localization regression test that switches to FR and fails if an English sentence remains in the visible page text. This is a small engineering fix with material conversion impact: French prospects currently see core credibility and value-proposition paragraphs in English at the exact moment they are evaluating your positioning.

## Reference

[1]: https://www.zurisolutions.dev/ "Zuri Solutions public website"

[1]
