/* =============================================
   Khusni Ja'far — Personal Website Script
   ============================================= */

// ── Scroll Progress Bar ───────────────────────
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
}

// ── Navbar ────────────────────────────────────
const navbar   = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
const allNavA   = navLinks.querySelectorAll('a');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

allNavA.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close menu on outside click
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Navbar scroll state
function updateNavbar() {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');
function updateActiveNav() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = navLinks.querySelector(`a[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
  });
}

// ── Smooth scroll for nav links ───────────────
allNavA.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      const top = target.offsetTop - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Hero: Floating Math Symbols ───────────────
const SYMBOLS = ['∑', 'π', '∫', 'λ', '≈', '∞', '√', '∂', 'Δ', 'θ', '≤', '≥', 'ƒ', '→', '</', '/>'];
const heroSymbols = document.getElementById('heroSymbols');

function createSymbols() {
  heroSymbols.innerHTML = '';
  const count = window.innerWidth < 600 ? 8 : 16;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'hero-symbol';
    el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const size = 1 + Math.random() * 2.5;
    const opacity = 0.04 + Math.random() * 0.09;
    el.style.setProperty('--size', size + 'rem');
    el.style.setProperty('--opacity', opacity);
    el.style.setProperty('--dur', (10 + Math.random() * 14) + 's');
    el.style.setProperty('--delay', (-Math.random() * 12) + 's');
    el.style.left = Math.random() * 95 + '%';
    el.style.top  = Math.random() * 95 + '%';
    heroSymbols.appendChild(el);
  }
}

// ── Typing Effect ─────────────────────────────
const PHRASES = [
  'Mathematics',
  'Physics',
  'Programming',
];
const typedEl   = document.getElementById('typed');
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingTimer;

function typeLoop() {
  const phrase = PHRASES[phraseIndex];
  if (!isDeleting) {
    typedEl.textContent = phrase.slice(0, ++charIndex);
    if (charIndex === phrase.length) {
      isDeleting = true;
      typingTimer = setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = phrase.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % PHRASES.length;
    }
  }
  typingTimer = setTimeout(typeLoop, isDeleting ? 55 : 90);
}

// ── Intersection Observer (reveal + counters) ─
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Language bar fill
      const fill = entry.target.querySelector('.lang-bar-fill');
      if (fill) {
        const w = fill.getAttribute('data-width') || 0;
        setTimeout(() => { fill.style.width = w + '%'; }, 200);
      }

      // Stat number counter
      const num = entry.target.querySelector('.stat-number[data-target]');
      if (num && !num.dataset.animated) {
        num.dataset.animated = 'true';
        const target  = parseInt(num.dataset.target, 10);
        const suffix  = num.dataset.suffix || '';
        const duration = 1400;
        const step     = duration / target;
        let current    = 0;
        const tick = () => {
          current++;
          num.textContent = current + suffix;
          if (current < target) setTimeout(tick, step);
        };
        setTimeout(tick, 300);
      }
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Back-to-Top Button ────────────────────────
const backTop = document.getElementById('backTop');
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
function updateBackTop() {
  backTop.classList.toggle('visible', window.scrollY > 400);
}

// ── Throttled scroll handler ──────────────────
let scrollTick = false;
window.addEventListener('scroll', () => {
  if (!scrollTick) {
    requestAnimationFrame(() => {
      updateScrollProgress();
      updateNavbar();
      updateActiveNav();
      updateBackTop();
      scrollTick = false;
    });
    scrollTick = true;
  }
}, { passive: true });

// ── Init ──────────────────────────────────────
window.addEventListener('load', () => {
  createSymbols();
  typeLoop();
  updateNavbar();
  updateActiveNav();
  updateBackTop();
  updateScrollProgress();
  document.body.classList.add('loaded');
});

window.addEventListener('resize', createSymbols, { passive: true });
