/* ============================================================
   Zuri Solutions — main.js
   Handles: navbar, hero animation, scroll-reveal, detective quiz
   ============================================================ */

/* ── Footer year ───────────────────────────────── */
document.querySelectorAll('#footerYear').forEach(el => {
  el.textContent = new Date().getFullYear();
});

/* ── Navbar scroll effect ──────────────────────── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ── Mobile hamburger ──────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}

/* ── Hero headline word-by-word animation ──────── */
const heroHeadline = document.getElementById('heroHeadline');
if (heroHeadline) {
  const lineA = "Let's find the work your team";
  const lineB = "should not be doing manually.";
  const wordsA = lineA.split(' ');
  const wordsB = lineB.split(' ');

  const allWords = [
    ...wordsA.map(w => ({ text: w, accent: false })),
    ...wordsB.map(w => ({ text: w, accent: true })),
  ];

  heroHeadline.innerHTML = allWords.map((w, i) =>
    `<span class="word${w.accent ? ' pink-text' : ''}" style="transition-delay:${100 + i * 70}ms">${w.text}</span>`
  ).join(' ');

  // Trigger after a short delay
  requestAnimationFrame(() => {
    setTimeout(() => {
      heroHeadline.querySelectorAll('.word').forEach(w => w.classList.add('visible'));
    }, 80);
  });
}

/* ── Scroll-reveal (IntersectionObserver) ──────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up, .fade-in-right').forEach(el => {
  revealObserver.observe(el);
});

/* ── Contact form submission ───────────────────── */
function submitContactForm(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const submitted = document.getElementById('contactSubmitted');
  if (form) form.style.display = 'none';
  if (submitted) submitted.style.display = 'block';
}

/* ═══════════════════════════════════════════════════════
   INEFFICIENCY DETECTIVE — Quiz Logic
═══════════════════════════════════════════════════════ */

const QUESTIONS = [
  {
    text: "How many people are on your team?",
    options: ["1–5", "6–15", "16–50", "51+"],
  },
  {
    text: "How often does your team copy information between emails, spreadsheets, CRMs, documents, forms, or internal systems?",
    options: ["Rarely", "Weekly", "Daily", "Constantly"],
  },
  {
    text: "How much time does your team spend searching for information across emails, files, websites, dashboards, or internal documents?",
    options: ["Less than 1 hour per week", "1–5 hours per week", "5–15 hours per week", "15+ hours per week"],
  },
  {
    text: "How often do customers, suppliers, or internal team members ask the same questions repeatedly?",
    options: ["Rarely", "Sometimes", "Often", "Every day"],
  },
  {
    text: "Do employees manually create recurring documents, reports, proposals, summaries, checklists, or updates?",
    options: ["No", "Occasionally", "Yes, every week", "Yes, constantly"],
  },
  {
    text: "Can leadership clearly see where work gets stuck?",
    options: ["Yes, very clearly", "Somewhat", "Not really", "No, it is mostly invisible"],
  },
  {
    text: "How many tools does your team use to complete a typical workflow?",
    options: ["1–2", "3–4", "5–7", "8+"],
  },
  {
    text: "Have you already tried AI or automation tools without getting meaningful ROI?",
    options: ["No", "We experimented a little", "Yes, but adoption was weak", "Yes, but the tools did not fit our workflow"],
  },
  {
    text: "What would help your business most right now?",
    options: ["Save employee time", "Improve visibility", "Reduce repetitive admin", "Automate customer communication", "Build a custom internal tool", "Not sure yet"],
  },
];

const RESULTS = {
  foundation: {
    label: "Foundation Stage",
    message: "You are early in AI and automation adoption. The smartest first step is not building immediately — it is identifying which workflow would actually create value if improved.",
    inefficiencies: ["Identify highest-friction workflows first", "Map where time is actually being spent", "Define what measurable ROI looks like for your team"],
    recommended: "Free Workflow Discovery Session",
  },
  ready: {
    label: "Automation Ready",
    message: "You have clear workflows and some repetitive work that is ready to be improved. A targeted quick win would likely create fast, visible value for your team.",
    inefficiencies: ["Repetitive data entry or document creation", "Manual communication or follow-up tasks", "Recurring reporting done by hand"],
    recommended: "Quick Win Automation Sprint",
  },
  high: {
    label: "High Automation Potential",
    message: "Your team is likely losing meaningful time to repetitive work, lookup tasks, manual reporting, or disconnected systems. A focused automation roadmap would likely create fast value.",
    inefficiencies: ["Disconnected tools creating manual data movement", "Lookup work consuming significant team hours", "Lack of operational visibility slowing decisions"],
    recommended: "Automation Opportunity Mapping",
  },
  leverage: {
    label: "Operational Leverage Opportunity",
    message: "You likely have enough process volume to justify custom AI agents, internal tools, dashboards, or automation infrastructure. You are past AI curiosity. You need targeted systems.",
    inefficiencies: ["High-volume repetitive workflows ready for AI agents", "Internal tools needed to replace manual coordination", "Operational bottlenecks creating compounding delays"],
    recommended: "Custom Automation Roadmap",
  },
};

let currentQ = 0;
let answers = [];
let selectedOption = null;

function getResultTier(score) {
  if (score < 30) return 'foundation';
  if (score < 55) return 'ready';
  if (score < 75) return 'high';
  return 'leverage';
}

function calculateScore() {
  // Weight answers: later questions (data movement, tools, visibility) carry more weight
  const weights = [0.5, 1.2, 1.2, 0.8, 1.0, 1.1, 1.0, 0.8, 0.4];
  let raw = 0;
  let maxRaw = 0;
  answers.forEach((ans, qi) => {
    const q = QUESTIONS[qi];
    const idx = q.options.indexOf(ans);
    const w = weights[qi] || 1;
    raw += idx * w;
    maxRaw += (q.options.length - 1) * w;
  });
  return Math.round((raw / maxRaw) * 100);
}

function startDetective() {
  currentQ = 0;
  answers = [];
  selectedOption = null;
  document.getElementById('detectiveIntro').style.display = 'none';
  document.getElementById('detectiveQuiz').style.display = 'block';
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[currentQ];
  selectedOption = null;

  // Progress bar
  const pct = (currentQ / QUESTIONS.length) * 100;
  document.getElementById('quizProgressFill').style.width = pct + '%';

  // Step dots
  const stepsEl = document.getElementById('quizSteps');
  stepsEl.innerHTML = QUESTIONS.map((_, i) =>
    `<div class="quiz-step-dot${i <= currentQ ? ' active' : ''}"></div>`
  ).join('');

  // Question text
  document.getElementById('quizQuestion').textContent = q.text;

  // Options
  const optionsEl = document.getElementById('quizOptions');
  optionsEl.innerHTML = q.options.map((opt, i) =>
    `<button class="quiz-option" onclick="selectOption(${i}, this)">
      <div class="quiz-option-radio"></div>
      <span>${opt}</span>
    </button>`
  ).join('');

  // Nav buttons
  document.getElementById('quizBack').style.visibility = currentQ === 0 ? 'hidden' : 'visible';
  const nextBtn = document.getElementById('quizNext');
  nextBtn.textContent = currentQ === QUESTIONS.length - 1 ? 'See Results →' : 'Next →';
  nextBtn.disabled = true;
}

function selectOption(idx, btn) {
  document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedOption = QUESTIONS[currentQ].options[idx];
  document.getElementById('quizNext').disabled = false;
}

function quizNext() {
  if (selectedOption === null) return;
  answers[currentQ] = selectedOption;
  if (currentQ < QUESTIONS.length - 1) {
    currentQ++;
    renderQuestion();
  } else {
    showResults();
  }
}

function quizBack() {
  if (currentQ > 0) {
    currentQ--;
    renderQuestion();
    // Re-select previous answer if exists
    if (answers[currentQ]) {
      const opts = document.querySelectorAll('.quiz-option');
      const idx = QUESTIONS[currentQ].options.indexOf(answers[currentQ]);
      if (opts[idx]) {
        opts[idx].classList.add('selected');
        selectedOption = answers[currentQ];
        document.getElementById('quizNext').disabled = false;
      }
    }
  }
}

function showResults() {
  document.getElementById('detectiveQuiz').style.display = 'none';
  document.getElementById('detectiveResults').style.display = 'block';

  const score = calculateScore();
  const tier = getResultTier(score);
  const result = RESULTS[tier];

  // Animate score counter
  const scoreEl = document.getElementById('resultsScore');
  const barEl = document.getElementById('resultsScoreBar');
  let count = 0;
  const interval = setInterval(() => {
    count = Math.min(count + 2, score);
    scoreEl.textContent = count;
    if (count >= score) clearInterval(interval);
  }, 18);
  setTimeout(() => { barEl.style.width = score + '%'; }, 100);

  document.getElementById('resultsTierLabel').textContent = result.label;
  document.getElementById('resultsMessage').textContent = result.message;

  // Inefficiencies
  document.getElementById('resultsInefficiencies').innerHTML = `
    <div class="results-ineff-title">Top 3 Likely Inefficiencies</div>
    ${result.inefficiencies.map(item =>
      `<div class="results-ineff-item"><span class="pink-dot" style="margin-top:4px;flex-shrink:0"></span><span>${item}</span></div>`
    ).join('')}
  `;

  document.getElementById('resultsRecommended').innerHTML =
    `Recommended first solution: <span>${result.recommended}</span>`;
}

function submitDetectiveForm(e) {
  e.preventDefault();
  document.getElementById('detectiveResults').style.display = 'none';
  document.getElementById('detectiveSubmitted').style.display = 'block';
}

function retakeDetective() {
  document.getElementById('detectiveResults').style.display = 'none';
  document.getElementById('detectiveSubmitted').style.display = 'none';
  document.getElementById('detectiveIntro').style.display = 'block';
}
