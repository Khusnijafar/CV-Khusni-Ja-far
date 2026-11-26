/* ==========================================================================
   Khusni Ja'far — Personal Website & Private Tutoring Script
   ========================================================================== */

// ── Scroll Progress Bar ─────────────────────────────────────────────────────
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
}

// ── Navbar & Mobile Menu ────────────────────────────────────────────────────
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
const allNavA   = navLinks.querySelectorAll('a[href^="#"]');

function closeMobileNav() {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => closeMobileNav());
});

document.addEventListener('click', e => {
  if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
    closeMobileNav();
  }
});

function updateNavbar() {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}

// Active section link highlight
const sections = document.querySelectorAll('main section[id]');
function updateActiveNav() {
  const scrollPos = window.scrollY + 130;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = navLinks.querySelector(`a[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
  });
}

// Smooth anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Subtle Floating Academic Symbols ────────────────────────────────────────
const SYMBOLS = ['∑', 'π', '∫', 'λ', '∞', '√', '∂', 'Δ', 'θ', 'f(x)', 'py'];
const heroSymbols = document.getElementById('heroSymbols');

function createSymbols() {
  if (!heroSymbols) return;
  heroSymbols.innerHTML = '';
  const count = window.innerWidth < 640 ? 6 : 12;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'hero-symbol';
    el.textContent = SYMBOLS[i % SYMBOLS.length];
    const size = 1.1 + Math.random() * 1.9;
    const opacity = 0.035 + Math.random() * 0.06;
    el.style.setProperty('--size', size + 'rem');
    el.style.setProperty('--opacity', opacity.toFixed(3));
    el.style.setProperty('--dur', (12 + Math.random() * 12) + 's');
    el.style.setProperty('--delay', (-Math.random() * 10) + 's');
    el.style.left = (4 + Math.random() * 90) + '%';
    el.style.top  = (6 + Math.random() * 86) + '%';
    heroSymbols.appendChild(el);
  }
}

// ── Typing Effect ───────────────────────────────────────────────────────────
const PHRASES = [
  'Matematika SD, SMP & SMA',
  'Fisika Nasional & Cambridge (IGCSE / A Level)',
  'Coding Python, Algoritma & AI',
  'Persiapan Ujian Sekolah & Olimpiade'
];
const typedEl = document.getElementById('typed');
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;

function typeLoop() {
  if (!typedEl) return;
  const phrase = PHRASES[phraseIndex];
  if (!isDeleting) {
    typedEl.textContent = phrase.slice(0, ++charIndex);
    if (charIndex === phrase.length) {
      isDeleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    typedEl.textContent = phrase.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % PHRASES.length;
    }
  }
  setTimeout(typeLoop, isDeleting ? 38 : 68);
}

// ── Portfolio Category Filter ───────────────────────────────────────────────
const filterButtons  = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filterButtons.forEach(b => b.classList.toggle('active', b === btn));
    portfolioCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !match);
    });
  });
});

// ── Lightbox Modal (Teaching Proofs & Module Previews) ──────────────────────
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc  = document.getElementById('lightboxDesc');
const lightboxClose = document.getElementById('lightboxClose');
let lastFocusedEl   = null;

function openLightbox(src, title, desc) {
  lastFocusedEl = document.activeElement;
  lightboxImg.src = src;
  lightboxImg.alt = title || 'Pratinjau dokumen';
  lightboxTitle.textContent = title || '';
  lightboxDesc.textContent  = desc || '';
  lightboxModal.hidden = false;
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  if (lightboxModal.hidden) return;
  lightboxModal.hidden = true;
  lightboxImg.src = '';
  document.body.style.overflow = '';
  if (lastFocusedEl) lastFocusedEl.focus();
}

document.querySelectorAll('[data-lightbox-src]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    openLightbox(
      trigger.getAttribute('data-lightbox-src'),
      trigger.getAttribute('data-lightbox-title'),
      trigger.getAttribute('data-lightbox-desc')
    );
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxModal.querySelectorAll('[data-lightbox-close]').forEach(el => {
  el.addEventListener('click', closeLightbox);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !lightboxModal.hidden) closeLightbox();
});

// ── Reveal Observer, Language Bars & Stat Counters ──────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');

    entry.target.querySelectorAll('.lang-bar-fill').forEach(fill => {
      const w = fill.getAttribute('data-width') || 0;
      setTimeout(() => { fill.style.width = w + '%'; }, 180);
    });

    const num = entry.target.querySelector('.stat-number[data-target]');
    if (num && !num.dataset.animated) {
      num.dataset.animated = 'true';
      const target = parseInt(num.dataset.target, 10);
      const suffix = num.dataset.suffix || '';
      const steps  = Math.min(target, 40);
      const inc    = target / steps;
      let step     = 0;
      const tick = () => {
        step++;
        const val = step >= steps ? target : Math.round(inc * step);
        num.textContent = val + suffix;
        if (step < steps) setTimeout(tick, 32);
      };
      setTimeout(tick, 200);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Back to Top ─────────────────────────────────────────────────────────────
const backTop = document.getElementById('backTop');
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
function updateBackTop() {
  backTop.classList.toggle('visible', window.scrollY > 420);
}

// ── Scroll Listener ─────────────────────────────────────────────────────────
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

// ── Init ────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  createSymbols();
  typeLoop();
  updateNavbar();
  updateActiveNav();
  updateBackTop();
  updateScrollProgress();
});

window.addEventListener('resize', createSymbols, { passive: true });
