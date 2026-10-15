/* Zuri Solutions · shared behaviour for the mockup pages */
(() => {
  // asset base resolved from this script's location, so pages in sub-folders (fr/) load the same images
  const ASSET = new URL('../', document.currentScript.src).href;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // UI strings: English defaults, overridden by window.ZURI.i18n on translated pages
  const T = Object.assign({
    menu: 'Menu', close: 'Close',
    automated: '+1 automated', coffee: 'coffee', gameStart: 'click to start', gameJump: 'click or Space to jump',
    types: { event: 'Trigger', task: 'By hand', check: 'Check', sys: 'Tool' },
    intro: 'This is how a supplier invoice moves today. It works, but something is missing. Click any step, or run the scan.',
    scan: "▶ Scan for what's missing", who: 'Who', tool: 'Tool',
    stats: { findings: 'Findings', missing: 'Missing links', twice: 'Typed twice', neck: 'Bottlenecks', steps: 'Steps', people: 'People', tools: 'Tools' }
  }, window.ZURI && window.ZURI.i18n);


  // Mobile menu
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (menuBtn && menu) {
  const setMenu = open => { menu.hidden = !open; menuBtn.setAttribute('aria-expanded', open); menuBtn.textContent = open ? T.close : T.menu; };
  menuBtn.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); } });
  }

  // ── Site config: where leads go, and the booking page ──
  const CONFIG = {
    // Booking page (Cal.com, Calendly, Google Calendar…). Empty: the "Book" buttons open the contact form.
    bookingUrl: '',
    // Web3Forms access key (web3forms.com, free): every request is emailed to the address the key was created with.
    web3formsKey: '8de26666-75be-4922-be96-37a388010958',
    // Existing Google Form, kept as a copy in its Google Sheet
    formAction: 'https://docs.google.com/forms/d/e/1FAIpQLSfF-r3-FCEE_uj0uXPLfzsuHwhwF3HGfOxRQ7ApnLJT6zTtuA/formResponse',
    formFields: { name: 'entry.334027758', company: 'entry.1013693672', email: 'entry.392384361', phone: 'entry.468573154', service: 'entry.121792333', message: 'entry.1089196283' },
    // The Google Form makes company, phone and "What do you want help with?" required: without them
    // Google silently rejects the answer. "service" must be one of the form's own choices.
    formDefaults: { company: 'Not provided', phone: 'Not provided', service: 'Not sure yet' }
  };
  const FR = document.documentElement.lang === 'fr';
  const S = FR ? {
    tags: { call: 'Demande d\'appel gratuit', training: 'Demande de programme de formation', quiz: 'Diagnostic' },
    sending: 'Envoi…', thanks: 'Merci, message bien reçu.', thanksSub: 'Nous revenons vers vous par email très vite.', ok: 'Fermer',
    error: 'L\'envoi a échoué. Écrivez-nous à contact@zurisolutions.dev.',
    bookTitle: 'Réserver mon appel gratuit', bookAlt: 'La page ne s\'affiche pas ? Ouvrir l\'agenda dans un nouvel onglet →',
    qTitle: 'Découvrez où votre équipe perd du temps.', qSub: '9 questions · ~3 minutes · score immédiat',
    qIntro: 'Répondez à 9 questions concrètes et obtenez une première lecture des endroits où votre entreprise perd du temps.',
    start: 'Commencer →', question: 'Question', back: '← Retour', next: 'Suivant →', see: 'Voir mon score →',
    top3: 'Là où vous perdez probablement du temps', leadTitle: 'Recevez vos résultats',
    leadSub: 'Laissez vos coordonnées : nous passons vos réponses en revue avec vous lors d\'un appel gratuit.',
    name: 'Nom', email: 'Email', company: 'Entreprise', opt: 'facultatif', send: 'Envoyer mes résultats →',
    consent: 'En envoyant ce formulaire, vous acceptez notre <a href="confidentialite.html">politique de confidentialité</a>.',
    doneTitle: 'Merci, nous avons bien reçu vos résultats.',
    doneSub: 'Prochaine étape : un appel gratuit pour les regarder ensemble et trouver votre premier quick win.',
    doneMail: 'Nous revenons vers vous par email pour fixer cet appel.', book: 'Choisir un créneau →', retry: 'Refaire le diagnostic'
  } : {
    tags: { call: 'Free call request', training: 'Training program request', quiz: 'Diagnostic' },
    sending: 'Sending…', thanks: 'Thanks, message received.', thanksSub: 'We\'ll get back to you by email very soon.', ok: 'Close',
    error: 'Sending failed. Please email us at contact@zurisolutions.dev.',
    bookTitle: 'Book my free call', bookAlt: 'Page not loading? Open the calendar in a new tab →',
    qTitle: 'Find out where your team loses time.', qSub: '9 questions · ~3 minutes · instant score',
    qIntro: 'Answer 9 practical questions and get a first read on where your business is losing time.',
    start: 'Start →', question: 'Question', back: '← Back', next: 'Next →', see: 'See my score →',
    top3: 'Where you are probably losing time', leadTitle: 'Get your results',
    leadSub: 'Leave your details and we\'ll go through your answers with you on a free call.',
    name: 'Name', email: 'Email', company: 'Company', opt: 'optional', send: 'Send my results →',
    consent: 'By sending this form you agree to our <a href="privacy.html">privacy policy</a>.',
    doneTitle: 'Thanks, we\'ve got your results.',
    doneSub: 'Next step: a free call to go through them together and find your first quick win.',
    doneMail: 'We\'ll get back to you by email to set up the call.', book: 'Pick a time →', retry: 'Retake the check'
  };

  // Leads: emailed through Web3Forms (its answer is checked), and copied to the Google Form
  // (no-cors there: Google's answer can't be read, so it never blocks the visitor)
  const toGoogle = data => {
    const body = new URLSearchParams();
    Object.entries(CONFIG.formFields).forEach(([k, id]) => { const v = data[k] || CONFIG.formDefaults[k]; if (v) body.append(id, v); });
    return fetch(CONFIG.formAction, { method: 'POST', mode: 'no-cors', body });
  };
  const sendLead = data => {
    if (!CONFIG.web3formsKey) return toGoogle(data);
    toGoogle(data).catch(() => {});
    return fetch('https://api.web3forms.com/submit', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: CONFIG.web3formsKey, subject: `Zuri Solutions · ${data.tag}`, from_name: 'zurisolutions.dev',
        name: data.name, email: data.email, company: data.company || '—', message: data.message
      })
    }).then(r => r.json()).then(j => { if (!j.success) throw new Error(j.message); });
  };
  const esc = v => String(v).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // Dialogs (diagnostic, contact, training, booking)
  const bindClose = d => d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-close]')) d.close(); });
  const openBooking = () => {
    let d = document.getElementById('booking-dialog');
    if (!d) {
      d = document.createElement('dialog');
      d.className = 'modal modal--wide'; d.id = 'booking-dialog'; d.setAttribute('aria-label', S.bookTitle);
      d.innerHTML = `<div class="px-bar"><span>${FR ? 'reserver-audit.exe' : 'book-a-call.exe'}</span><button type="button" data-close aria-label="${T.close}">✕</button></div>
        <iframe class="booking-frame" src="${esc(CONFIG.bookingUrl)}" title="${S.bookTitle}" loading="lazy"></iframe>
        <p class="booking-alt"><a href="${esc(CONFIG.bookingUrl)}" target="_blank" rel="noopener">${S.bookAlt}</a></p>`;
      document.body.appendChild(d); bindClose(d);
    }
    d.showModal();
  };
  const openDialog = id => {
    if (id === 'contact-dialog' && CONFIG.bookingUrl) return openBooking();
    const d = document.getElementById(id);
    if (d && d.showModal) d.showModal();
  };
  document.querySelectorAll('[data-dialog]').forEach(a => a.addEventListener('click', e => {
    if (document.getElementById(a.dataset.dialog) || (a.dataset.dialog === 'contact-dialog' && CONFIG.bookingUrl)) { e.preventDefault(); openDialog(a.dataset.dialog); }
  }));
  document.querySelectorAll('dialog').forEach(bindClose);

  // Contact + training forms
  const submitForm = (f, tag, extra) => {
    if (f.elements.hp && f.elements.hp.value) return Promise.resolve();   // honeypot: bots fill it
    const v = n => (f.elements[n] ? f.elements[n].value.trim() : '');
    const btn = f.querySelector('[type="submit"]'), status = f.querySelector('.form-status');
    btn.disabled = true; if (status) status.textContent = S.sending;
    // fields marked data-k (website, activity, team size…) are sent as labelled lines of the message
    const details = [...f.querySelectorAll('[data-k]')].filter(el => el.value.trim()).map(el => `${el.dataset.k}: ${el.value.trim()}`).join('\n');
    const message = `[${tag}] ${location.pathname}\n\n${extra || details || v('message')}`;
    return sendLead({ tag, name: v('name'), email: v('email'), company: v('company'), message })
      .catch(err => { btn.disabled = false; if (status) status.textContent = S.error; throw err; });
  };
  document.querySelectorAll('form[data-form]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    submitForm(f, S.tags[f.dataset.form]).then(() => {
      f.innerHTML = `<h2 tabindex="-1">${S.thanks}</h2><p class="sub">${S.thanksSub}</p><button type="button" class="btn btn-primary" data-close>${S.ok}</button>`;
      f.querySelector('h2').focus();
    }, () => {});
  }));

  // Diagnostic ("Inefficiency Detective"): 9 questions, weighted score, results, lead form
  const quiz = document.querySelector('[data-quiz]');
  if (quiz) {
    const Q = FR ? [
      ['Combien de personnes compte votre équipe ?', ['1–5', '6–15', '16–50', '51+']],
      ['À quelle fréquence votre équipe copie-t-elle des informations entre e-mails, feuilles de calcul, CRM, documents, formulaires ou systèmes internes ?', ['Rarement', 'Chaque semaine', 'Chaque jour', 'En permanence']],
      ['Combien de temps votre équipe consacre-t-elle à chercher des informations dans les e-mails, fichiers, sites web, tableaux de bord ou documents internes ?', ['Moins d’1 heure par semaine', '1–5 heures par semaine', '5–15 heures par semaine', 'Plus de 15 heures par semaine']],
      ['À quelle fréquence des clients, fournisseurs ou membres de l’équipe posent-ils les mêmes questions à répétition ?', ['Rarement', 'Parfois', 'Souvent', 'Chaque jour']],
      ['Les employés créent-ils manuellement des documents, rapports, propositions, synthèses, listes de contrôle ou mises à jour récurrents ?', ['Non', 'Occasionnellement', 'Oui, chaque semaine', 'Oui, en permanence']],
      ['La direction voit-elle clairement où le travail se bloque ?', ['Oui, très clairement', 'En partie', 'Pas vraiment', 'Non, c’est largement invisible']],
      ['Combien d’outils votre équipe utilise-t-elle pour réaliser un processus de travail habituel ?', ['1–2', '3–4', '5–7', '8+']],
      ['Avez-vous déjà essayé des outils d’IA ou d’automatisation sans obtenir de retour sur investissement significatif ?', ['Non', 'Nous avons un peu expérimenté', 'Oui, mais l’adoption a été faible', 'Oui, mais les outils ne correspondaient pas à nos processus']],
      ['Qu’est-ce qui aiderait le plus votre entreprise en ce moment ?', ['Gagner du temps pour les équipes', 'Améliorer la visibilité', 'Réduire l’administratif répétitif', 'Automatiser les échanges clients', 'Construire un outil interne sur mesure', 'Je ne sais pas encore']]
    ] : [
      ['How many people are on your team?', ['1–5', '6–15', '16–50', '51+']],
      ['How often does your team copy information between emails, spreadsheets, CRMs, documents, forms, or internal systems?', ['Rarely', 'Weekly', 'Daily', 'Constantly']],
      ['How much time does your team spend searching for information across emails, files, websites, dashboards, or internal documents?', ['Less than 1 hour per week', '1–5 hours per week', '5–15 hours per week', '15+ hours per week']],
      ['How often do customers, suppliers, or internal team members ask the same questions repeatedly?', ['Rarely', 'Sometimes', 'Often', 'Every day']],
      ['Do employees manually create recurring documents, reports, proposals, summaries, checklists, or updates?', ['No', 'Occasionally', 'Yes, every week', 'Yes, constantly']],
      ['Can leadership clearly see where work gets stuck?', ['Yes, very clearly', 'Somewhat', 'Not really', 'No, it is mostly invisible']],
      ['How many tools does your team use to complete a typical workflow?', ['1–2', '3–4', '5–7', '8+']],
      ['Have you already tried AI or automation tools without getting meaningful results?', ['No', 'We experimented a little', 'Yes, but adoption was weak', 'Yes, but the tools did not fit our workflow']],
      ['What would help your business most right now?', ['Save employee time', 'Improve visibility', 'Reduce repetitive admin', 'Automate customer communication', 'Build a custom internal tool', 'Not sure yet']]
    ];
    const R = FR ? {
      foundation: ['Phase de fondation', 'Vous êtes encore au début de l’adoption de l’IA et de l’automatisation. La première étape la plus pertinente n’est pas de construire tout de suite : il faut identifier le processus qui créerait réellement de la valeur s’il était amélioré.', ['Identifier d’abord les processus qui génèrent le plus de friction', 'Cartographier où le temps est réellement consommé', 'Définir à quoi ressemble un gain mesurable pour votre équipe']],
      ready: ['Prêt pour l’automatisation', 'Vous avez des processus clairs et certaines tâches répétitives prêtes à être améliorées. Un gain rapide et ciblé créerait probablement une valeur visible pour votre équipe.', ['Saisie de données ou création de documents répétitives', 'Communication manuelle ou tâches de suivi', 'Rapports récurrents réalisés manuellement']],
      high: ['Fort potentiel d’automatisation', 'Votre équipe perd probablement un temps important à cause de tâches répétitives, de recherches, de rapports manuels ou de systèmes déconnectés. Une feuille de route d’automatisation ciblée créerait sans doute rapidement de la valeur.', ['Outils déconnectés qui imposent des transferts de données manuels', 'Recherches qui consomment un volume important d’heures', 'Manque de visibilité opérationnelle qui ralentit les décisions']],
      leverage: ['Opportunité de levier opérationnel', 'Vous avez probablement assez de volume pour justifier des agents IA sur mesure, des outils internes, des tableaux de bord ou une infrastructure d’automatisation. Vous avez dépassé la simple curiosité envers l’IA : il vous faut des systèmes ciblés.', ['Processus répétitifs à fort volume prêts pour des agents IA', 'Outils internes nécessaires pour remplacer la coordination manuelle', 'Goulots d’étranglement qui créent des retards cumulatifs']]
    } : {
      foundation: ['Foundation stage', 'You are early in AI and automation adoption. The smartest first step is not to build right away, but to find which workflow would actually create value if improved.', ['Identify the workflows with the most friction first', 'Map where time is really being spent', 'Define what a measurable gain looks like for your team']],
      ready: ['Automation ready', 'You have clear workflows and some repetitive work that is ready to be improved. A targeted quick win would likely create fast, visible value for your team.', ['Repetitive data entry or document creation', 'Manual communication or follow-up tasks', 'Recurring reports done by hand']],
      high: ['High automation potential', 'Your team is likely losing real time to repetitive work, lookups, manual reporting or disconnected systems. A focused automation roadmap would likely create value fast.', ['Disconnected tools forcing manual data movement', 'Lookups eating a significant number of hours', 'Lack of visibility slowing decisions down']],
      leverage: ['Operational leverage opportunity', 'You likely have enough volume to justify custom AI agents, internal tools, dashboards or automation infrastructure. You are past AI curiosity: you need targeted systems.', ['High-volume repetitive workflows ready for AI agents', 'Internal tools needed to replace manual coordination', 'Bottlenecks creating compounding delays']]
    };
    const W = [0.5, 1.2, 1.2, 0.8, 1.0, 1.1, 1.0, 0.8, 0.4];   // weights from the previous site
    let cur = 0, ans = [], score = 0, tier = null;

    const top = () => `<div class="quiz-top"><span>${S.question} ${Math.min(cur + 1, Q.length)} / ${Q.length}</span><span>Inefficiency Detective</span></div>`;
    const field = (n, type, ac, req) => `<div class="field"><label for="q-${n}">${S[n]}${req ? '' : ` <small>(${S.opt})</small>`}</label><input id="q-${n}" name="${n}" type="${type}" autocomplete="${ac}"${req ? ' required' : ''}></div>`;
    const render = html => { quiz.innerHTML = html; const h = quiz.querySelector('h2, h3'); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); } };
    const intro = () => render(`<h2 id="diag-title">${S.qTitle}</h2><p class="sub">${S.qSub}</p><p class="quiz-intro">${S.qIntro}</p>
      <button type="button" class="btn btn-primary" data-start>${S.start}</button>`);
    const question = () => {
      const [text, opts] = Q[cur];
      render(`<h2 id="diag-title" class="sr-only">${S.qTitle}</h2>${top()}<div class="bar"><i style="width:${cur / Q.length * 100}%"></i></div>
        <h3 id="diag-q">${text}</h3>
        <div class="opts" role="group" aria-labelledby="diag-q">${opts.map((o, i) => `<button type="button" class="opt${ans[cur] === i ? ' is-on' : ''}" aria-pressed="${ans[cur] === i}" data-i="${i}">${o}</button>`).join('')}</div>
        <div class="quiz-nav"><button type="button" class="btn btn-ghost" data-back${cur ? '' : ' style="visibility:hidden"'}>${S.back}</button>
        <button type="button" class="btn btn-primary" data-next${ans[cur] == null ? ' disabled' : ''}>${cur === Q.length - 1 ? S.see : S.next}</button></div>`);
    };
    const result = () => {
      let raw = 0, max = 0;
      Q.forEach((q, i) => { raw += ans[i] * W[i]; max += (q[1].length - 1) * W[i]; });
      score = Math.round(raw / max * 100);
      tier = score < 30 ? 'foundation' : score < 55 ? 'ready' : score < 75 ? 'high' : 'leverage';
      const [label, msg, list] = R[tier];
      render(`<div class="quiz-score"><b>${score}</b><span>/100</span></div>
        <h2 id="diag-title">${label}</h2><p class="sub">${msg}</p>
        <h4 class="quiz-k">${S.top3}</h4><ul class="sol-ex">${list.map(x => `<li>${x}</li>`).join('')}</ul>
        <form class="quiz-lead">
          <h3>${S.leadTitle}</h3><p class="sub">${S.leadSub}</p>
          ${field('name', 'text', 'name', true)}${field('email', 'email', 'email', true)}${field('company', 'text', 'organization', false)}
          <div class="hp" aria-hidden="true"><label for="q-hp">Leave empty</label><input id="q-hp" name="hp" tabindex="-1" autocomplete="off"></div>
          <p class="consent">${S.consent}</p>
          <button class="btn btn-primary" type="submit">${S.send}</button>
          <p class="form-status" role="status"></p>
        </form>`);
      quiz.querySelector('h2').focus({ preventScroll: true });
      quiz.scrollTop = 0;
    };
    const done = () => render(`<h2 id="diag-title">${S.doneTitle}</h2><p class="sub">${S.doneSub}</p>
      ${CONFIG.bookingUrl ? `<button type="button" class="btn btn-primary" data-book>${S.book}</button>` : `<p class="quiz-intro">${S.doneMail}</p>`}
      <p><button type="button" class="link-btn" data-start>${S.retry}</button></p>`);

    quiz.addEventListener('click', e => {
      const o = e.target.closest('.opt');
      if (o) {
        ans[cur] = +o.dataset.i;
        quiz.querySelectorAll('.opt').forEach(b => { const on = b === o; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
        quiz.querySelector('[data-next]').disabled = false;
        return;
      }
      if (e.target.closest('[data-start]')) { cur = 0; ans = []; question(); }
      else if (e.target.closest('[data-back]')) { cur--; question(); }
      else if (e.target.closest('[data-next]')) { if (cur < Q.length - 1) { cur++; question(); } else result(); }
      else if (e.target.closest('[data-book]')) { quiz.closest('dialog').close(); openBooking(); }
    });
    quiz.addEventListener('submit', e => {
      e.preventDefault();
      const answers = Q.map((q, i) => `${i + 1}. ${q[0]}\n   → ${q[1][ans[i]]}`).join('\n');
      submitForm(e.target, S.tags.quiz, `Score: ${score}/100 · ${R[tier][0]}\n\n${answers}`).then(done, () => {});
    });
    intro();
    // deep link: /#diagnostic (and the previous site's #detective) opens the check
    if (location.hash === '#diagnostic' || location.hash === '#detective') openDialog('diagnostic');
  }

  // Hero runner game: the player jumps (click / Space) over the tasks; the Zuri machine on the
  // left swallows every task that gets past. Touching a task = game over, with a retry button.
  const run = document.querySelector('.run');
  if (run && !reduce) {
    const world = run.querySelector('.run-world');
    const runner = run.querySelector('.runner');
    const machine = run.querySelector('.machine');
    const scoreEl = run.querySelector('.score');
    const coffeeEl = run.querySelector('.coffee');
    const hint = run.querySelector('.run-hint');
    const over = run.querySelector('.game-over');
    const overN = run.querySelector('.go-n');
    const retry = run.querySelector('.go-retry');
    const TASKS = ['papers', 'spreadsheet', 'clock', 'document', 'agents', 'dashboard', 'robot'];
    const JUMP = 0.62, HEIGHT = 80;     // jump duration (s) and height (px)
    const items = [];                   // { el, x, kind }
    let state = 'idle';                 // idle | play | over
    let score = 0, coffee = 0, last = performance.now(), jumpT = -1, visible = true;
    let nextTask = 0.9, nextMug = 3.5, nextDecor = 0;

    const add = (src, cls, kind, x) => {
      const img = document.createElement('img');
      img.src = src; img.alt = ''; img.className = `sprite pixel-img ${cls}`;
      world.appendChild(img);
      const it = { el: img, x: x ?? world.clientWidth + 40, kind };
      img.style.transform = `translateX(${it.x}px)`;
      items.push(it);
      return it;
    };
    const pop = (html, x, y) => {
      const p = document.createElement('span');
      p.className = 'pop'; p.innerHTML = html;
      p.style.left = x + 'px'; p.style.bottom = y + 'px';
      world.appendChild(p);
      setTimeout(() => p.remove(), 900);
    };
    const decor = x => {
      const r = Math.random();
      if (r < .5) add(`${ASSET}img/sprites/grass.svg`, 'decor grass', 'decor', x);
      else if (r < .85) add(`${ASSET}img/sprites/pebble.svg`, 'decor pebble', 'decor', x);
      else add(`${ASSET}img/cloud.svg`, 'decor cloud-s', 'decor', x);
    };
    for (let x = 60; x < world.clientWidth; x += 140 + Math.random() * 160) decor(x);   // pre-fill the ground

    const pad = (n, w) => String(n).padStart(w, '0');
    const start = () => {
      for (let i = items.length - 1; i >= 0; i--) if (items[i].kind !== 'decor') { items[i].el.remove(); items.splice(i, 1); }
      score = 0; coffee = 0; scoreEl.textContent = '000'; coffeeEl.textContent = '00';
      nextTask = 0.9; nextMug = 3.5; jumpT = -1;
      over.hidden = true; run.classList.remove('is-over'); run.classList.add('is-play');
      hint.textContent = T.gameJump; state = 'play'; last = performance.now();
    };
    const gameOver = () => {
      state = 'over'; overN.textContent = pad(score, 3);
      over.hidden = false; run.classList.add('is-over'); run.classList.remove('is-play');
      retry.focus({ preventScroll: true });
    };
    const press = () => {
      if (state === 'idle') start();
      else if (state === 'play' && jumpT < 0) jumpT = 0;
    };
    run.addEventListener('click', e => { if (!e.target.closest('.go-retry')) press(); });
    run.addEventListener('keydown', e => {
      if ((e.key === ' ' || e.key === 'ArrowUp' || e.key === 'Enter') && !e.target.closest('.go-retry')) { e.preventDefault(); press(); }
    });
    retry.addEventListener('click', e => { e.stopPropagation(); start(); run.focus({ preventScroll: true }); });
    hint.textContent = T.gameStart;

    // skip work when the hero is scrolled far away
    window.addEventListener('scroll', () => { const v = run.getBoundingClientRect().top < window.innerHeight + 200; if (v && !visible) last = performance.now(); visible = v; }, { passive: true });

    const tick = now => {
      const dt = Math.max(0, Math.min(0.05, (now - last) / 1000)); last = now;
      if (visible && state !== 'over') {
        const playing = state === 'play';
        const speed = playing ? Math.min(380, 230 + score * 6) : 90;      // idle: slow stroll, ground only
        const rx = runner.offsetLeft, rw = runner.offsetWidth;
        const mRight = machine.offsetLeft + machine.offsetWidth * 0.7;
        nextDecor -= dt;
        if (nextDecor <= 0) { decor(); nextDecor = (playing ? 0.6 : 1.6) + Math.random() * 0.8; }
        if (playing) {
          nextTask -= dt; nextMug -= dt;
          if (nextTask <= 0) { add(`${ASSET}img/icons/${TASKS[Math.floor(Math.random() * TASKS.length)]}.svg`, 'obstacle', 'task'); nextTask = 1.1 + Math.random() * 1.4; }
          if (nextMug <= 0) { add(`${ASSET}img/sprites/mug.svg`, 'mug', 'mug'); nextMug = 4 + Math.random() * 4; }
        }

        let y = 0;
        if (jumpT >= 0) {
          jumpT += dt;
          const p = jumpT / JUMP;
          y = 4 * HEIGHT * p * (1 - p);
          if (p >= 1) { jumpT = -1; y = 0; }
        }

        for (let i = items.length - 1; i >= 0; i--) {
          const it = items[i];
          it.x -= speed * (it.kind === 'decor' && it.el.classList.contains('cloud-s') ? 0.35 : 1) * dt;
          it.el.style.transform = `translateX(${it.x}px)`;
          if (it.kind === 'task') {
            const hit = it.x + 8 < rx + rw - 12 && it.x + 28 > rx + 12 && y < 26;   // forgiving hitbox
            if (hit) { gameOver(); break; }
            if (it.x < mRight) {                                                   // the machine swallows it
              score++; scoreEl.textContent = pad(score, 3);
              machine.classList.remove('chomp'); void machine.offsetWidth; machine.classList.add('chomp');
              pop(T.automated, machine.offsetLeft + 6, 66);
              it.el.remove(); items.splice(i, 1); continue;
            }
          }
          if (it.kind === 'mug' && it.x < rx + rw && it.x + 30 > rx && y > 40) {
            coffee++; coffeeEl.textContent = pad(coffee, 2);
            pop(`<img class="pixel-img" src="${ASSET}img/sprites/spark.svg" alt=""> ` + T.coffee, rx, 90);
            it.el.remove(); items.splice(i, 1); continue;
          }
          if (it.x < -80) { it.el.remove(); items.splice(i, 1); }
        }
        const bob = jumpT < 0 && Math.floor(now / 120) % 2 ? 2 : 0;
        runner.style.transform = `translateY(${-y - bob}px)`;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // Sample mapping: one fictional process, then a "scan" that reveals what's missing
  const PM = (window.ZURI && window.ZURI.pm) || null;

  const pm = document.getElementById('pm');
  if (pm && PM) {
    const grid = pm.querySelector('.pm-grid');
    const wires = pm.querySelector('.pm-wires');
    const canvas = pm.querySelector('.pm-canvas');
    const detail = pm.querySelector('.pm-detail');
    const stats = pm.querySelector('.pm-stats');
    const NS = 'http://www.w3.org/2000/svg';
    const TYPE = T.types;
    const nodesById = {};
    const hitNum = {};
    PM.findings.forEach((f, i) => f.nodes.forEach(id => { if (!(id in hitNum)) hitNum[id] = i + 1; }));

    const intro = () => {
      detail.classList.remove('is-list');
      detail.innerHTML = `<div class="pm-cta" style="grid-column:1/-1"><p>${PM.intro || T.intro}</p><button type="button" class="btn btn-primary" data-scan>${T.scan}</button></div>`;
      detail.querySelector('[data-scan]').addEventListener('click', () => setView('scan'));
    };
    const showNode = n => {
      grid.querySelectorAll('.pm-node').forEach(b => b.setAttribute('aria-pressed', b.dataset.id === n.id));
      detail.classList.remove('is-list');
      detail.innerHTML = `<div><span class="pm-flag neutral">${TYPE[n.type]}</span></div><div><h4>${n.label}</h4><dl><dt>${T.who}</dt><dd>${n.who}</dd><dt>${T.tool}</dt><dd>${n.tool}</dd></dl></div>`;
    };
    const focusFinding = i => {
      grid.querySelectorAll('.pm-node').forEach(b => b.classList.toggle('focus', i >= 0 && PM.findings[i].nodes.includes(b.dataset.id)));
      detail.querySelectorAll('.pm-findings button').forEach((b, k) => b.setAttribute('aria-pressed', k === i));
    };
    const findings = () => {
      detail.classList.add('is-list');
      detail.innerHTML = `<ol class="pm-findings">${PM.findings.map((f, i) =>
        `<li><button type="button" aria-pressed="false"><span class="n">${i + 1}</span><span class="tag">${f.tag}</span><b>${f.title}</b><small>${f.text}</small></button></li>`).join('')}</ol>`;
      detail.querySelectorAll('.pm-findings button').forEach((b, i) => {
        b.addEventListener('click', () => focusFinding(i));
        b.addEventListener('mouseenter', () => focusFinding(i));
      });
    };

    const draw = () => {
      const box = canvas.getBoundingClientRect();
      wires.innerHTML = `<defs>${['manual', 'email', 'broken'].map(t =>
        `<marker id="pm-a-${t}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${t === 'broken' ? 'var(--pink)' : 'var(--ink)'}"/></marker>`).join('')}</defs>`;
      PM.edges.forEach(([a, b, type, label]) => {
        const ra = nodesById[a].getBoundingClientRect(), rb = nodesById[b].getBoundingClientRect();
        let x1, y1, x2, y2, c1, c2;
        const sameRow = Math.abs((ra.top + ra.height / 2) - (rb.top + rb.height / 2)) < 12;
        if (sameRow && rb.left - ra.right > ra.width) {            // same lane, far apart: route underneath
          x1 = ra.left - box.left + ra.width / 2; y1 = ra.bottom - box.top;
          x2 = rb.left - box.left + rb.width / 2; y2 = rb.bottom - box.top + 2;
          c1 = [x1, y1 + 34]; c2 = [x2, y2 + 34];
        } else if (rb.left > ra.right) {
          x1 = ra.right - box.left; y1 = ra.top + ra.height / 2 - box.top;
          x2 = rb.left - box.left - 2; y2 = rb.top + rb.height / 2 - box.top;
          const dx = Math.max(24, (x2 - x1) / 2); c1 = [x1 + dx, y1]; c2 = [x2 - dx, y2];
        } else {                                                    // same column: vertical
          const down = rb.top > ra.top;
          x1 = ra.left - box.left + ra.width / 2; y1 = (down ? ra.bottom : ra.top) - box.top;
          x2 = rb.left - box.left + rb.width / 2; y2 = (down ? rb.top - 2 : rb.bottom + 2) - box.top;
          const dy = (y2 - y1) / 2; c1 = [x1, y1 + dy]; c2 = [x2, y2 - dy];
        }
        const path = document.createElementNS(NS, 'path');
        path.setAttribute('d', `M${x1} ${y1} C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${x2} ${y2}`);
        path.setAttribute('class', type);
        path.setAttribute('marker-end', `url(#pm-a-${type})`);
        wires.appendChild(path);
        const mid = path.getPointAtLength(path.getTotalLength() / 2);
        if (type === 'broken') {
          const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'x');
          g.innerHTML = `<rect x="${mid.x - 9}" y="${mid.y - 9}" width="18" height="18"/><text x="${mid.x}" y="${mid.y + 4}" text-anchor="middle">✕</text>`;
          wires.appendChild(g);
        }
        if (label) {
          const t = document.createElementNS(NS, 'text');
          t.setAttribute('class', type === 'broken' ? 'lbl-x' : 'lbl');
          t.setAttribute('x', mid.x); t.setAttribute('y', mid.y + (type === 'broken' ? 24 : -7)); t.setAttribute('text-anchor', 'middle');
          t.textContent = label; wires.appendChild(t);
        }
      });
    };

    const build = () => {
      PM.lanes.forEach((L, i) => {
        const band = document.createElement('div');
        band.className = 'pm-band' + (i % 2 ? ' alt' : '');
        band.style.setProperty('--r', i + 1);
        grid.appendChild(band);
        const lane = document.createElement('div');
        lane.className = 'pm-lane';
        lane.style.gridRow = i + 1;
        lane.innerHTML = `${L.label}<small>${L.sub}</small>`;
        grid.appendChild(lane);
      });
      PM.nodes.forEach(n => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = `pm-node ${n.type}` + (n.id in hitNum ? ' hit' : '');
        b.dataset.id = n.id;
        b.setAttribute('aria-pressed', 'false');
        b.style.gridRow = PM.lanes.findIndex(L => L.id === n.lane) + 1;
        b.style.gridColumn = n.col + 1;
        b.innerHTML = `<span class="t">${TYPE[n.type]}</span>${n.label}${n.id in hitNum ? `<span class="num">${hitNum[n.id]}</span>` : ''}`;
        b.addEventListener('click', () => {
          if (pm.classList.contains('is-scan') && n.id in hitNum) focusFinding(hitNum[n.id] - 1);
          else showNode(n);
        });
        grid.appendChild(b);
        nodesById[n.id] = b;
      });
    };

    const setView = v => {
      pm.querySelectorAll('.pm-toggle button').forEach(x => x.setAttribute('aria-pressed', x.dataset.view === v));
      const scan = v === 'scan';
      pm.classList.toggle('is-scan', scan);
      grid.querySelectorAll('.pm-node').forEach(b => { b.setAttribute('aria-pressed', 'false'); b.classList.remove('focus'); });
      const broken = PM.edges.filter(e => e[2] === 'broken').length;
      const twice = PM.findings.filter(f => f.kind === 'twice').length;
      const neck = PM.findings.filter(f => f.kind === 'neck').length;
      stats.innerHTML = scan
        ? `<li>${T.stats.findings}<b>${PM.findings.length}</b></li><li>${T.stats.missing}<b>${broken}</b></li><li>${T.stats.twice}<b>${twice}</b></li><li>${T.stats.neck}<b>${neck}</b></li>`
        : `<li>${T.stats.steps}<b>${PM.nodes.filter(n => n.type !== 'sys').length}</b></li><li>${T.stats.people}<b>${PM.people || 3}</b></li><li>${T.stats.tools}<b>${PM.nodes.filter(n => n.type === 'sys').length}</b></li>`;
      scan ? findings() : intro();
    };

    pm.querySelectorAll('.pm-toggle button').forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.view)));
    build();
    setView('map');
    requestAnimationFrame(draw);
    window.addEventListener('resize', () => requestAnimationFrame(draw));
    if (document.fonts) document.fonts.ready.then(() => requestAnimationFrame(draw));
  }

  // Understand hero: scanner sweeps the process icons and flags the broken steps
  const scan = document.querySelector('.scan');
  if (scan) {
    const world = scan.querySelector('.scan-world');
    const lens = scan.querySelector('.scanner');
    const items = [...scan.querySelectorAll('.scan-item')];
    const out = scan.querySelector('.found');
    if (reduce) {
      items.filter(i => i.classList.contains('flag')).forEach(i => i.classList.add('found'));
      out.textContent = items.filter(i => i.classList.contains('found')).length;
    } else {
      const LOOP = 9;                      // seconds per sweep
      let t0 = performance.now();
      const tick = now => {
        const w = world.clientWidth;
        const p = ((now - t0) / 1000) % LOOP / LOOP;
        if (p < 0.01 && items.some(i => i.classList.contains('found'))) {
          items.forEach(i => i.classList.remove('found')); out.textContent = '0';
        }
        const x = -60 + p * (w + 120);
        lens.style.transform = `translateX(${x}px)`;
        const cx = x + lens.offsetWidth / 2;
        items.forEach(i => {
          if (i.classList.contains('flag') && !i.classList.contains('found') && cx > i.offsetLeft + 18) {
            i.classList.add('found');
            out.textContent = items.filter(n => n.classList.contains('found')).length;
          }
        });
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }

  // Solution explorer (landing): accessible tabs
  document.querySelectorAll('[data-sol]').forEach(sol => {
    const tabs = [...sol.querySelectorAll('[role="tab"]')];
    const show = t => tabs.forEach(x => {
      const on = x === t;
      x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
      document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
    });
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => show(t));
      t.addEventListener('keydown', e => {
        const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (d) { e.preventDefault(); const n = tabs[(i + d + tabs.length) % tabs.length]; show(n); n.focus(); }
      });
    });
    show(tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0]);
  });

  // Build hero: day 1 → day 8 bar
  const daybar = document.querySelector('.daybar');
  if (daybar) {
    const cells = [...daybar.querySelectorAll('.days li')];
    const tasks = JSON.parse(daybar.dataset.tasks);
    const dayEl = daybar.querySelector('.db-day'), taskEl = daybar.querySelector('.db-task');
    const set = d => {
      cells.forEach((c, i) => c.classList.toggle('on', i < d));
      dayEl.textContent = d; taskEl.textContent = tasks[d - 1] + (d === 8 ? ' ✓' : '');
      daybar.classList.toggle('live', d === 8);
    };
    if (reduce) set(8);
    else { let d = 1; set(d); setInterval(() => { d = d === 8 ? 1 : d + 1; set(d); }, 1100); }
  }

  // Build page: clickable sample tool (approve / ask supplier)
  document.querySelectorAll('[data-app]').forEach(app => {
    const todo = app.querySelector('.todo');
    const foot = app.querySelector('.app-foot');
    app.querySelectorAll('.acts button').forEach(b => b.addEventListener('click', () => {
      const li = b.closest('li');
      li.classList.remove('gap'); li.classList.add('done');
      li.querySelector('.st').textContent = '✓';
      const label = b.dataset.act === 'ok' ? foot.dataset.doneLabel : foot.dataset.askLabel;
      li.querySelector('.acts').outerHTML = `<em>${label}</em>`;
      todo.textContent = app.querySelectorAll('.inv .gap').length;
    }));
  });

  // Method progress line + scroll reveal
  const seq = document.querySelector('.seq');
  const fill = seq && seq.querySelector('.seq-line i');
  let pending = [...document.querySelectorAll('.reveal')];
  let ticking = false;
  const paint = () => {
    ticking = false;
    const vh = window.innerHeight;
    if (fill) {
      const r = seq.getBoundingClientRect();
      const h = Math.min(r.height, Math.max(0, vh * 0.55 - r.top));
      fill.style.height = h + 'px';
      fill.style.setProperty('--tip', h + 'px');
    }
    if (pending.length) {
      pending = pending.filter(el => {
        if (el.getBoundingClientRect().top < vh * 0.9) { el.classList.add('in'); return false; }
        return true;
      });
    }
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  paint();

  // Reduced motion: keep videos on their poster
  if (reduce) document.querySelectorAll('video').forEach(v => { v.removeAttribute('autoplay'); v.pause(); });
})();
