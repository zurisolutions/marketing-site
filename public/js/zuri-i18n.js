/*
  Zuri Solutions EN / FR translation feature.
  Load AFTER js/main.js on index.html, how-we-work.html, and use-cases.html.
  It preserves language preference, translates current copy, and replaces the diagnostic’s dynamic copy.
*/
(function () {
  'use strict';

  var STORAGE_KEY = 'zuri-language';
  var language = localStorage.getItem(STORAGE_KEY) === 'fr' ? 'fr' : 'en';
  var originalTextNodes = [];
  var originalsCaptured = false;

  var pageMeta = {
    index: {
      en: { title: 'Zuri Solutions — AI Automation & Custom Digital Solutions', description: 'AI automation and custom digital solutions for your business. Find the work your team should not be doing manually.' },
      fr: { title: 'Zuri Solutions — Automatisation IA et solutions numériques sur mesure', description: 'Automatisation IA et solutions numériques sur mesure pour votre entreprise. Identifiez les tâches que votre équipe ne devrait plus faire manuellement.' }
    },
    'how-we-work': {
      en: { title: 'How We Work — Zuri Solutions', description: "You don't pay a dollar until we prove our worth. Our zero-risk process from discovery to delivery." },
      fr: { title: 'Notre méthode — Zuri Solutions', description: 'Vous ne payez rien avant que nous ayons démontré notre valeur. Notre processus sans risque, de la découverte à la livraison.' }
    },
    'use-cases': {
      en: { title: 'Use Cases — Zuri Solutions', description: 'Where we find quick wins. The fastest ROI is usually hiding in boring, repetitive work.' },
      fr: { title: 'Cas d’usage — Zuri Solutions', description: 'Là où nous trouvons des gains rapides. Le ROI le plus rapide se cache souvent dans les tâches répétitives et peu stimulantes.' }
    }
  };

  var fr = {
    'How We Work': 'Notre méthode',
    'Use Cases': 'Cas d’usage',
    'Contact': 'Contact',
    'Get a Free Audit': 'Audit gratuit',
    'AI · Automation · Custom Software': 'IA · AUTOMATISATION · LOGICIEL SUR MESURE',
    'No sales pitch — just a practical workflow conversation': 'Pas de discours commercial — une conversation concrète sur vos processus',
    'We identify opportunities before recommending any build': 'Nous identifions les opportunités avant de recommander une solution',
    'Quick wins first, larger systems later': 'Des gains rapides d’abord, des systèmes plus ambitieux ensuite',
    "I don't like saving money": 'Je n’aime pas faire des économies',
    'FREE AUDIT · NO COMMITMENT · RESULTS IN 8 DAYS': 'AUDIT GRATUIT · SANS ENGAGEMENT · RÉSULTATS EN 8 JOURS',
    'SCROLL': 'DÉFILER',
    'What We Build': 'Ce que nous construisons',
    'AI automation and custom digital solutions': 'Automatisation IA et solutions numériques sur mesure',
    'for your business.': 'pour votre entreprise.',
    'Not generic AI tools. Custom digital systems designed around real business workflows.': 'Pas d’outils IA génériques. Des systèmes numériques conçus autour de vos processus métier réels.',
    'Custom Digital Solutions': 'Solutions numériques sur mesure',
    'Websites, portals, dashboards, internal tools, inventory systems, admin panels, reporting tools, and custom software that help businesses operate faster.': 'Sites web, portails, tableaux de bord, outils internes, systèmes d’inventaire, interfaces d’administration, outils de reporting et logiciels sur mesure qui accélèrent vos opérations.',
    'AI Automation': 'Automatisation par IA',
    'Practical AI systems that reduce repetitive work: email drafting, document generation, data extraction, summarization, customer support assistance, and task routing.': 'Des systèmes IA concrets qui réduisent les tâches répétitives : rédaction d’e-mails, génération de documents, extraction de données, synthèse, aide au support client et routage des tâches.',
    'Workflow Automation': 'Automatisation des processus',
    'Automate handoffs, notifications, approvals, data movement, reporting, and recurring processes across tools your team already uses.': 'Automatisez les transmissions, notifications, validations, flux de données, rapports et processus récurrents entre les outils que votre équipe utilise déjà.',
    'Custom AI Agents': 'Agents IA sur mesure',
    'Targeted AI agents for lookup work, document-heavy tasks, internal support, research, drafting, and operational assistance.': 'Des agents IA ciblés pour les recherches, les tâches documentaires, le support interne, la veille, la rédaction et l’assistance opérationnelle.',
    'Dashboards & Internal Tools': 'Tableaux de bord et outils internes',
    'Systems that give leadership better visibility into operations, performance, inventory, workflows, and team activity.': 'Des systèmes qui donnent à la direction une meilleure visibilité sur les opérations, la performance, les stocks, les processus et l’activité des équipes.',
    'Chrome Extensions & Lightweight Tools': 'Extensions Chrome et outils légers',
    'Browser-based tools and extensions that make everyday work faster without forcing teams into a completely new platform.': 'Des outils et extensions de navigateur qui accélèrent le travail au quotidien sans imposer une plateforme entièrement nouvelle à vos équipes.',
    'Signature Tool': 'Outil signature',
    'The Zuri': 'Le détecteur d’inefficacités',
    'Inefficiency Detective': 'Zuri',
    'Find the work your team should not be doing manually.': 'Identifiez les tâches que votre équipe ne devrait plus faire manuellement.',
    'Mini Operational Diagnostic': 'Mini-diagnostic opérationnel',
    'Answer 9 practical questions and get an instant read on where your business may be leaking time through repetitive tasks, manual processes, lookup work, and disconnected systems.': 'Répondez à 9 questions concrètes et obtenez une première lecture des endroits où votre entreprise perd peut-être du temps à cause de tâches répétitives, de processus manuels, de recherches ou de systèmes déconnectés.',
    'Questions': 'questions',
    'Minutes': 'minutes',
    'Instant': 'Score',
    'Score': 'immédiat',
    'Start the Diagnostic': 'Commencer le diagnostic',
    'Automation Potential Score': 'Score de potentiel d’automatisation',
    'Send My Inefficiency Report to Zuri': 'Envoyer mon rapport d’inefficacités à Zuri',
    'Your score and answers will be included automatically.': 'Votre score et vos réponses seront inclus automatiquement.',
    'Name *': 'Nom *',
    'Company *': 'Entreprise *',
    'Email *': 'E-mail *',
    'Phone': 'Téléphone',
    'What does your business do? *': 'Que fait votre entreprise ? *',
    'What workflow feels most manual right now? *': 'Quel processus semble le plus manuel aujourd’hui ? *',
    'Send My Inefficiency Report to Zuri': 'Envoyer mon rapport d’inefficacités à Zuri',
    '↺ Run the diagnostic again': '↺ Refaire le diagnostic',
    'Report sent.': 'Rapport envoyé.',
    "Thanks — we'll review your workflow and get back to you shortly.": 'Merci — nous allons examiner vos processus et vous recontacter rapidement.',
    'Our Philosophy': 'Notre philosophie',
    'We build': 'Nous construisons',
    'with purpose.': 'avec intention.',
    'Practical before flashy': 'Pratique avant spectaculaire',
    'We prioritize systems that create measurable operational value, not AI experiments that look impressive but do not get used.': 'Nous privilégions les systèmes qui créent une valeur opérationnelle mesurable, pas les expérimentations IA impressionnantes mais inutilisées.',
    'Custom where it matters': 'Du sur mesure là où cela compte',
    "Your business does not run like everyone else's. Your systems should reflect your workflows, team, and constraints.": 'Votre entreprise ne fonctionne pas comme les autres. Vos systèmes doivent refléter vos processus, votre équipe et vos contraintes.',
    'Human-in-the-loop': 'L’humain dans la boucle',
    'We design AI around how people actually work, with approval, visibility, and control where it matters.': 'Nous concevons l’IA autour de la façon dont les personnes travaillent réellement, avec validation, visibilité et contrôle là où c’est nécessaire.',
    'Ultra-speed delivery': 'Livraison à grande vitesse',
    'We are one of the fastest AI and digital solution builders on the market. Most projects go from discovery to first working version in 8 days, not months.': 'Nous sommes parmi les constructeurs de solutions IA et numériques les plus rapides du marché. La plupart des projets passent de la découverte à une première version fonctionnelle en 8 jours, pas en plusieurs mois.',
    '"We find operational waste and build useful systems that remove it. Not because AI is trending — because your team\'s time is worth protecting."': '« Nous identifions les gaspillages opérationnels et construisons des systèmes utiles pour les supprimer. Pas parce que l’IA est à la mode — parce que le temps de votre équipe mérite d’être protégé. »',
    'Get In Touch': 'Nous contacter',
    'Start saving time & money now.': 'Commencez à économiser du temps et de l’argent.',
    'What do you want help with? *': 'De quoi avez-vous besoin ? *',
    'Select a service area': 'Sélectionnez un domaine',
    'Custom digital solution': 'Solution numérique sur mesure',
    'AI automation': 'Automatisation par IA',
    'Workflow automation': 'Automatisation des processus',
    'Internal tool / dashboard': 'Outil interne / tableau de bord',
    'Website / portal': 'Site web / portail',
    'Chrome extension': 'Extension Chrome',
    'Not sure yet': 'Je ne sais pas encore',
    'Message (optional)': 'Message (facultatif)',
    'Contact Zuri': 'Contacter Zuri',
    'Message received.': 'Message reçu.',
    'Ready to start?': 'Prêt à commencer ?',
    'Run the Diagnostic': 'Lancer le diagnostic',
    'AI Integration · Automation · Custom Software': 'Intégration IA · Automatisation · Logiciels sur mesure',
    'All rights reserved.': 'Tous droits réservés.',
    'Zuri Solutions. All rights reserved.': 'Zuri Solutions. Tous droits réservés.',
    "You don't pay a dollar": 'Vous ne payez rien',
    'until we prove our worth.': 'avant que nous ayons démontré notre valeur.',
    'We earn your trust before you spend a cent. Our process starts with understanding your business deeply — then we show you exactly what we can do before any commitment.': 'Nous gagnons votre confiance avant que vous ne dépensiez un centime. Notre processus commence par une compréhension approfondie de votre entreprise — puis nous vous montrons précisément ce que nous pouvons faire avant tout engagement.',
    'Zero Risk Discovery': 'Découverte sans risque',
    'We start with a free, no-obligation workflow audit. We speak with your team, map your bottlenecks, and identify the highest-leverage opportunities — at no cost to you. You only move forward if what we find is worth acting on.': 'Nous commençons par un audit gratuit et sans engagement de vos processus. Nous échangeons avec votre équipe, cartographions vos goulots d’étranglement et identifions les opportunités les plus prometteuses — sans aucun coût pour vous. Vous n’avancez que si ce que nous trouvons mérite d’être mis en œuvre.',
    'Map': 'Cartographier',
    'We turn scattered workflow pain points into a clear picture of how work actually moves through the business — where it slows, where it duplicates, and where it disappears.': 'Nous transformons des irritants dispersés en une vue claire de la façon dont le travail circule réellement dans l’entreprise — là où il ralentit, se duplique ou disparaît.',
    'Prioritize': 'Prioriser',
    'We rank opportunities using impact, effort, adoption risk, and speed to value. We always start with the highest-leverage, lowest-friction win.': 'Nous classons les opportunités selon leur impact, l’effort requis, le risque d’adoption et la rapidité de création de valeur. Nous commençons toujours par le gain le plus important et le moins frictionnel.',
    'Build': 'Construire',
    'We create the right system: AI agent, automation, dashboard, internal tool, extension, website, or custom platform. Built fast, built to be used.': 'Nous créons le bon système : agent IA, automatisation, tableau de bord, outil interne, extension, site web ou plateforme sur mesure. Construit vite, conçu pour être utilisé.',
    'Improve': 'Améliorer',
    'We measure usage, refine the system, and expand into the next highest-value opportunity. The relationship does not end at delivery.': 'Nous mesurons l’utilisation, affinons le système et développons la prochaine opportunité à forte valeur. La relation ne s’arrête pas à la livraison.',
    'Ultra-Speed Delivery': 'Livraison à grande vitesse',
    'From discovery to first working version': 'De la découverte à la première version fonctionnelle',
    'in 8 days.': 'en 8 jours.',
    'Most agencies take weeks just to scope a project. We move differently. Our team is structured for speed without sacrificing quality — most projects go from first call to a working prototype within 8 days. We are one of the fastest AI and digital solution builders on the market.': 'La plupart des agences mettent des semaines à cadrer un projet. Nous fonctionnons autrement. Notre équipe est structurée pour aller vite sans sacrifier la qualité — la plupart de nos projets passent du premier appel à un prototype fonctionnel en 8 jours. Nous sommes parmi les constructeurs de solutions IA et numériques les plus rapides du marché.',
    '8 Days': '8 jours',
    'average time to first working version': 'délai moyen jusqu’à la première version fonctionnelle',
    'custom-built, nothing off-the-shelf': 'entièrement sur mesure, rien de standard',
    'generic templates — everything built around your workflow': 'modèles génériques — tout est conçu autour de vos processus',
    'Get Your Free Audit': 'Obtenez votre audit gratuit',
    'Where we find': 'Là où nous trouvons',
    'quick wins.': 'des gains rapides.',
    'The fastest ROI is usually hiding in boring, repetitive work. Here are the most common places we find immediate value.': 'Le ROI le plus rapide se cache souvent dans les tâches répétitives et peu stimulantes. Voici les domaines où nous trouvons le plus souvent une valeur immédiate.',
    'Manual Data Entry': 'Saisie manuelle de données',
    'Move information between spreadsheets, forms, CRMs, documents, and internal systems without repetitive copy-paste.': 'Déplacez les informations entre feuilles de calcul, formulaires, CRM, documents et systèmes internes sans copier-coller répétitif.',
    'Document Creation': 'Création de documents',
    'Generate drafts, reports, proposals, summaries, checklists, and internal documents from business context.': 'Générez des brouillons, rapports, propositions, synthèses, listes de contrôle et documents internes à partir du contexte de votre entreprise.',
    'Lookup Work': 'Travail de recherche',
    'Search across files, websites, emails, dashboards, and internal tools faster — without switching between six tabs.': 'Recherchez plus rapidement dans les fichiers, sites web, e-mails, tableaux de bord et outils internes — sans passer d’un onglet à l’autre.',
    'Email & Customer Communication': 'E-mails et communication client',
    'Draft replies, summarize customer issues, classify messages, and prepare responses while keeping humans in control.': 'Rédigez des réponses, synthétisez les demandes clients, classez les messages et préparez des réponses tout en gardant les humains aux commandes.',
    'Reporting & Visibility': 'Reporting et visibilité',
    'Build dashboards and internal systems that show what is happening across operations in real time.': 'Construisez des tableaux de bord et systèmes internes qui montrent en temps réel ce qui se passe dans vos opérations.',
    'Workflow Routing': 'Routage des processus',
    'Send the right task, update, request, or alert to the right person or system automatically.': 'Envoyez automatiquement la bonne tâche, mise à jour, demande ou alerte à la bonne personne ou au bon système.',
    'Example Project': 'Exemple de projet',
    'Turning repetitive emails into': 'Transformer les e-mails répétitifs en',
    'ready-to-review drafts.': 'brouillons prêts à être relus.',
    'A business owner was spending multiple hours per day answering similar customer emails. Zuri designed an AI email assistant that reads incoming messages, identifies which ones need a response, drafts replies, and leaves final approval to the human.': 'Un dirigeant passait plusieurs heures par jour à répondre à des e-mails clients similaires. Zuri a conçu un assistant IA qui lit les messages entrants, identifie ceux qui nécessitent une réponse, prépare des brouillons et laisse la validation finale à un humain.',
    'No automatic sending — human approval stays in control': 'Aucun envoi automatique — la validation humaine garde le contrôle',
    'Sensitive messages are flagged instead of answered': 'Les messages sensibles sont signalés plutôt que traités automatiquement',
    'Repetitive replies become ready-to-review drafts': 'Les réponses répétitives deviennent des brouillons prêts à être relus',
    'Daily summary delivered to the owner': 'Un résumé quotidien est envoyé au dirigeant',
    'Implemented without replacing the existing email workflow': 'Implémenté sans remplacer le flux d’e-mails existant',
    'Less typing. Faster replies. More control.': 'Moins de saisie. Des réponses plus rapides. Plus de contrôle.',
    'Find My Quick Wins': 'Trouvez mes gains rapides',
    'AI Email Agent — Human-in-the-loop': 'Agent IA pour les e-mails — humain dans la boucle',
    'Incoming email received': 'E-mail entrant reçu',
    'AI reads & classifies message': 'L’IA lit et classe le message',
    'Draft reply generated': 'Brouillon de réponse généré',
    'Human reviews & approves': 'Un humain relit et valide'
  };

  var attributes = {
    'Your name': 'Votre nom',
    'Company name': 'Nom de l’entreprise',
    'Brief description': 'Brève description',
    'Describe it briefly...': 'Décrivez-le brièvement…',
    "Anything else you'd like us to know about your workflow or goals...": 'Souhaitez-vous nous en dire plus sur vos processus ou vos objectifs ?',
    'Toggle menu': 'Ouvrir ou fermer le menu'
  };

  var questions = {
    en: [
      ['How many people are on your team?', ['1–5', '6–15', '16–50', '51+']],
      ['How often does your team copy information between emails, spreadsheets, CRMs, documents, forms, or internal systems?', ['Rarely', 'Weekly', 'Daily', 'Constantly']],
      ['How much time does your team spend searching for information across emails, files, websites, dashboards, or internal documents?', ['Less than 1 hour per week', '1–5 hours per week', '5–15 hours per week', '15+ hours per week']],
      ['How often do customers, suppliers, or internal team members ask the same questions repeatedly?', ['Rarely', 'Sometimes', 'Often', 'Every day']],
      ['Do employees manually create recurring documents, reports, proposals, summaries, checklists, or updates?', ['No', 'Occasionally', 'Yes, every week', 'Yes, constantly']],
      ['Can leadership clearly see where work gets stuck?', ['Yes, very clearly', 'Somewhat', 'Not really', 'No, it is mostly invisible']],
      ['How many tools does your team use to complete a typical workflow?', ['1–2', '3–4', '5–7', '8+']],
      ['Have you already tried AI or automation tools without getting meaningful ROI?', ['No', 'We experimented a little', 'Yes, but adoption was weak', 'Yes, but the tools did not fit our workflow']],
      ['What would help your business most right now?', ['Save employee time', 'Improve visibility', 'Reduce repetitive admin', 'Automate customer communication', 'Build a custom internal tool', 'Not sure yet']]
    ],
    fr: [
      ['Combien de personnes compte votre équipe ?', ['1–5', '6–15', '16–50', '51+']],
      ['À quelle fréquence votre équipe copie-t-elle des informations entre e-mails, feuilles de calcul, CRM, documents, formulaires ou systèmes internes ?', ['Rarement', 'Chaque semaine', 'Chaque jour', 'En permanence']],
      ['Combien de temps votre équipe consacre-t-elle à chercher des informations dans les e-mails, fichiers, sites web, tableaux de bord ou documents internes ?', ['Moins d’1 heure par semaine', '1–5 heures par semaine', '5–15 heures par semaine', 'Plus de 15 heures par semaine']],
      ['À quelle fréquence des clients, fournisseurs ou membres de l’équipe posent-ils les mêmes questions à répétition ?', ['Rarement', 'Parfois', 'Souvent', 'Chaque jour']],
      ['Les employés créent-ils manuellement des documents, rapports, propositions, synthèses, listes de contrôle ou mises à jour récurrents ?', ['Non', 'Occasionnellement', 'Oui, chaque semaine', 'Oui, en permanence']],
      ['La direction voit-elle clairement où le travail se bloque ?', ['Oui, très clairement', 'En partie', 'Pas vraiment', 'Non, c’est largement invisible']],
      ['Combien d’outils votre équipe utilise-t-elle pour réaliser un processus de travail habituel ?', ['1–2', '3–4', '5–7', '8+']],
      ['Avez-vous déjà essayé des outils d’IA ou d’automatisation sans obtenir de retour sur investissement significatif ?', ['Non', 'Nous avons un peu expérimenté', 'Oui, mais l’adoption a été faible', 'Oui, mais les outils ne correspondaient pas à nos processus']],
      ['Qu’est-ce qui aiderait le plus votre entreprise en ce moment ?', ['Gagner du temps pour les équipes', 'Améliorer la visibilité', 'Réduire l’administratif répétitif', 'Automatiser les échanges clients', 'Construire un outil interne sur mesure', 'Je ne sais pas encore']]
    ]
  };

  var results = {
    en: {
      foundation: ['Foundation Stage', 'You are early in AI and automation adoption. The smartest first step is not building immediately — it is identifying which workflow would actually create value if improved.', ['Identify highest-friction workflows first', 'Map where time is actually being spent', 'Define what measurable ROI looks like for your team'], 'Free Workflow Discovery Session'],
      ready: ['Automation Ready', 'You have clear workflows and some repetitive work that is ready to be improved. A targeted quick win would likely create fast, visible value for your team.', ['Repetitive data entry or document creation', 'Manual communication or follow-up tasks', 'Recurring reporting done by hand'], 'Quick Win Automation Sprint'],
      high: ['High Automation Potential', 'Your team is likely losing meaningful time to repetitive work, lookup tasks, manual reporting, or disconnected systems. A focused automation roadmap would likely create fast value.', ['Disconnected tools creating manual data movement', 'Lookup work consuming significant team hours', 'Lack of operational visibility slowing decisions'], 'Automation Opportunity Mapping'],
      leverage: ['Operational Leverage Opportunity', 'You likely have enough process volume to justify custom AI agents, internal tools, dashboards, or automation infrastructure. You are past AI curiosity. You need targeted systems.', ['High-volume repetitive workflows ready for AI agents', 'Internal tools needed to replace manual coordination', 'Operational bottlenecks creating compounding delays'], 'Custom Automation Roadmap']
    },
    fr: {
      foundation: ['Phase de fondation', 'Vous êtes encore au début de l’adoption de l’IA et de l’automatisation. La première étape la plus pertinente n’est pas de construire tout de suite : il faut identifier le processus qui créerait réellement de la valeur s’il était amélioré.', ['Identifier d’abord les processus qui génèrent le plus de friction', 'Cartographier où le temps est réellement consommé', 'Définir à quoi ressemble un ROI mesurable pour votre équipe'], 'Session gratuite de découverte des processus'],
      ready: ['Prêt pour l’automatisation', 'Vous avez des processus clairs et certaines tâches répétitives prêtes à être améliorées. Un gain rapide et ciblé créerait probablement une valeur visible pour votre équipe.', ['Saisie de données ou création de documents répétitives', 'Communication manuelle ou tâches de suivi', 'Rapports récurrents réalisés manuellement'], 'Sprint d’automatisation à gain rapide'],
      high: ['Fort potentiel d’automatisation', 'Votre équipe perd probablement un temps important à cause de tâches répétitives, de recherches, de rapports manuels ou de systèmes déconnectés. Une feuille de route d’automatisation ciblée créerait sans doute rapidement de la valeur.', ['Outils déconnectés qui imposent des transferts de données manuels', 'Recherches qui consomment un volume important d’heures', 'Manque de visibilité opérationnelle qui ralentit les décisions'], 'Cartographie des opportunités d’automatisation'],
      leverage: ['Opportunité de levier opérationnel', 'Vous avez probablement assez de volume de processus pour justifier des agents IA sur mesure, des outils internes, des tableaux de bord ou une infrastructure d’automatisation. Vous avez dépassé la simple curiosité envers l’IA. Vous avez besoin de systèmes ciblés.', ['Processus répétitifs à fort volume prêts pour des agents IA', 'Outils internes nécessaires pour remplacer la coordination manuelle', 'Goulots d’étranglement opérationnels qui créent des retards cumulatifs'], 'Feuille de route d’automatisation sur mesure']
    }
  };

  var diagnosticState = { current: 0, answers: [], selected: null };

  function currentPageKey() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    if (path === 'how-we-work.html') return 'how-we-work';
    if (path === 'use-cases.html') return 'use-cases';
    return 'index';
  }

  function captureOriginalText() {
    if (originalsCaptured) return;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        return node.parentElement && !['SCRIPT', 'STYLE'].includes(node.parentElement.tagName) && node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var node;
    while ((node = walker.nextNode())) originalTextNodes.push({ node: node, original: node.nodeValue });
    originalsCaptured = true;
  }

  function translateStaticText() {
    captureOriginalText();
    originalTextNodes.forEach(function (item) {
      var padding = item.original.match(/^\s*/)[0];
      var trailing = item.original.match(/\s*$/)[0];
      var key = item.original.trim();
      item.node.nodeValue = padding + (language === 'fr' && fr[key] ? fr[key] : key) + trailing;
    });
    document.querySelectorAll('[placeholder], [aria-label], [alt]').forEach(function (element) {
      ['placeholder', 'aria-label', 'alt'].forEach(function (attribute) {
        var original = element.getAttribute('data-zuri-' + attribute) || element.getAttribute(attribute);
        if (!original) return;
        element.setAttribute('data-zuri-' + attribute, original);
        element.setAttribute(attribute, language === 'fr' && attributes[original] ? attributes[original] : original);
      });
    });
  }

  function renderHero() {
    var hero = document.getElementById('heroHeadline');
    if (!hero) return;
    var lines = language === 'fr' ? ['Identifions les tâches que votre équipe', 'ne devrait plus faire manuellement.'] : ["Let's find the work your team", 'should not be doing manually.'];
    var words = lines[0].split(' ').map(function (word) { return { word: word, accent: false }; }).concat(lines[1].split(' ').map(function (word) { return { word: word, accent: true }; }));
    hero.innerHTML = words.map(function (item, index) {
      return '<span class="word' + (item.accent ? ' pink-text' : '') + ' visible" style="transition-delay:' + (100 + index * 70) + 'ms">' + item.word + '</span>';
    }).join(' ');
  }

  function setDocumentLanguage() {
    var meta = pageMeta[currentPageKey()][language];
    document.documentElement.lang = language;
    document.title = meta.title;
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', meta.description);
  }

  function makeToggle(className) {
    var wrap = document.createElement('div');
    wrap.className = className + ' zuri-language-wrap';
    wrap.innerHTML = '<span class="zuri-language-state" aria-live="polite"></span><div class="zuri-language-switch" role="group"><button type="button" data-language="en">EN</button><span class="zuri-language-divider" aria-hidden="true">/</span><button type="button" data-language="fr">FR</button></div>';
    wrap.querySelectorAll('[data-language]').forEach(function (button) {
      button.addEventListener('click', function () { setLanguage(button.getAttribute('data-language')); });
    });
    return wrap;
  }

  function attachToggles() {
    var nav = document.querySelector('.nav-inner');
    var cta = nav && nav.querySelector('.nav-cta');
    if (nav && cta && !nav.querySelector('.zuri-language-wrap')) nav.insertBefore(makeToggle('zuri-desktop-language'), cta);
    var mobile = document.getElementById('mobileMenu');
    if (mobile && !mobile.querySelector('.zuri-language-wrap')) mobile.insertBefore(makeToggle('zuri-mobile-language'), mobile.firstChild);
  }

  function updateToggles() {
    document.querySelectorAll('.zuri-language-state').forEach(function (state) { state.textContent = (language === 'fr' ? 'LANGUE' : 'LANGUAGE') + ': ' + language.toUpperCase(); });
    document.querySelectorAll('[data-language]').forEach(function (button) { button.setAttribute('aria-pressed', String(button.getAttribute('data-language') === language)); });
  }

  function renderQuestion() {
    var question = questions[language][diagnosticState.current];
    var questionEl = document.getElementById('quizQuestion');
    if (!questionEl) return;
    document.getElementById('quizProgressFill').style.width = (diagnosticState.current / questions[language].length * 100) + '%';
    document.getElementById('quizSteps').innerHTML = questions[language].map(function (_, index) { return '<div class="quiz-step-dot' + (index <= diagnosticState.current ? ' active' : '') + '"></div>'; }).join('');
    questionEl.textContent = question[0];
    document.getElementById('quizOptions').innerHTML = question[1].map(function (option, index) {
      return '<button class="quiz-option' + (diagnosticState.selected === index ? ' selected' : '') + '" type="button" data-option-index="' + index + '"><div class="quiz-option-radio"></div><span>' + option + '</span></button>';
    }).join('');
    document.querySelectorAll('[data-option-index]').forEach(function (button) { button.addEventListener('click', function () { selectOption(Number(button.getAttribute('data-option-index')), button); }); });
    document.getElementById('quizBack').style.visibility = diagnosticState.current === 0 ? 'hidden' : 'visible';
    var next = document.getElementById('quizNext');
    next.textContent = diagnosticState.current === questions[language].length - 1 ? (language === 'fr' ? 'Voir les résultats →' : 'See Results →') : (language === 'fr' ? 'Suivant →' : 'Next →');
    next.disabled = diagnosticState.selected === null;
  }

  function getTier(score) { return score < 30 ? 'foundation' : score < 55 ? 'ready' : score < 75 ? 'high' : 'leverage'; }
  function calculateScore() {
    var weights = [0.5, 1.2, 1.2, 0.8, 1, 1.1, 1, 0.8, 0.4];
    var raw = diagnosticState.answers.reduce(function (sum, answer, index) { return sum + answer * (weights[index] || 1); }, 0);
    var max = questions[language].reduce(function (sum, q, index) { return sum + (q[1].length - 1) * (weights[index] || 1); }, 0);
    return Math.round(raw / max * 100);
  }

  window.startDetective = function () {
    diagnosticState = { current: 0, answers: [], selected: null };
    document.getElementById('detectiveIntro').style.display = 'none';
    document.getElementById('detectiveResults').style.display = 'none';
    document.getElementById('detectiveSubmitted').style.display = 'none';
    document.getElementById('detectiveQuiz').style.display = 'block';
    renderQuestion();
  };
  window.selectOption = function (index, button) {
    diagnosticState.selected = index;
    document.querySelectorAll('.quiz-option').forEach(function (item) { item.classList.remove('selected'); });
    button.classList.add('selected');
    document.getElementById('quizNext').disabled = false;
  };
  window.quizBack = function () {
    if (diagnosticState.current === 0) return;
    diagnosticState.current -= 1;
    diagnosticState.selected = diagnosticState.answers[diagnosticState.current];
    renderQuestion();
  };
  window.quizNext = function () {
    if (diagnosticState.selected === null) return;
    diagnosticState.answers[diagnosticState.current] = diagnosticState.selected;
    if (diagnosticState.current < questions[language].length - 1) {
      diagnosticState.current += 1;
      diagnosticState.selected = null;
      renderQuestion();
    } else showResults();
  };
  window.showResults = function () {
    document.getElementById('detectiveQuiz').style.display = 'none';
    document.getElementById('detectiveResults').style.display = 'block';
    var score = calculateScore();
    var result = results[language][getTier(score)];
    document.getElementById('resultsScore').textContent = score;
    document.getElementById('resultsScoreBar').style.width = score + '%';
    document.getElementById('resultsTierLabel').textContent = result[0];
    document.getElementById('resultsMessage').textContent = result[1];
    document.getElementById('resultsInefficiencies').innerHTML = '<div class="results-ineff-title">' + (language === 'fr' ? 'Les 3 inefficacités les plus probables' : 'Top 3 Likely Inefficiencies') + '</div>' + result[2].map(function (item) { return '<div class="results-ineff-item"><span class="pink-dot" style="margin-top:4px;flex-shrink:0"></span><span>' + item + '</span></div>'; }).join('');
    document.getElementById('resultsRecommended').innerHTML = (language === 'fr' ? 'Première solution recommandée : ' : 'Recommended first solution: ') + '<span>' + result[3] + '</span>';
  };
  window.retakeDetective = function () {
    document.getElementById('detectiveResults').style.display = 'none';
    document.getElementById('detectiveSubmitted').style.display = 'none';
    document.getElementById('detectiveQuiz').style.display = 'none';
    document.getElementById('detectiveIntro').style.display = 'block';
  };

  function setLanguage(nextLanguage) {
    language = nextLanguage === 'fr' ? 'fr' : 'en';
    localStorage.setItem(STORAGE_KEY, language);
    setDocumentLanguage();
    translateStaticText();
    renderHero();
    updateToggles();
    var quiz = document.getElementById('detectiveQuiz');
    var resultsCard = document.getElementById('detectiveResults');
    if (quiz && quiz.style.display !== 'none') renderQuestion();
    if (resultsCard && resultsCard.style.display !== 'none') window.showResults();
  }

  document.addEventListener('DOMContentLoaded', function () {
    attachToggles();
    setLanguage(language);
  });
})();
