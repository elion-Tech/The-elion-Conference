// script.js — Elion Conference 2025

// ===== AOS Init =====
if (window.AOS) {
  AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-out-cubic'
  });
}

// ===== Smooth Scroll for Navigation & Close on Select =====
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const navLinksEl = document.querySelector('.nav-links');
    navLinksEl && navLinksEl.classList.remove('active');
  });
});

// ===== Mobile Menu Toggle (Injected Hamburger) =====
(() => {
  const nav = document.querySelector('nav');
  const links = document.querySelector('.nav-links');
  if (!nav || !links) return;
  const btn = document.createElement('button');
  btn.className = 'menu-toggle';
  btn.setAttribute('aria-label', 'Toggle navigation');
  btn.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(btn);
  btn.addEventListener('click', () => {
    links.classList.toggle('active');
    btn.classList.toggle('open');
  });
})();

// ===== Parallax Effect for Hero =====
(() => {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    hero.style.backgroundPosition = `center calc(50% + ${y * 0.3}px)`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ===== Flash Cards (Flip + Fade + Slide) =====
(() => {
  const cards = Array.from(document.querySelectorAll('.flash-card'));
  if (!cards.length) return;

  let current = 0;
  // Initialize states
  cards.forEach((c, i) => {
    c.style.opacity = i === 0 ? '1' : '0';
    c.style.transform = i === 0 ? 'translateY(0) scale(1) rotateY(0)' : 'translateY(20px) scale(0.9) rotateY(-15deg)';
  });

  const show = idx => {
    cards.forEach((c, i) => {
      const active = i === idx;
      c.style.zIndex = active ? '2' : '1';
      c.style.opacity = active ? '1' : '0';
      c.style.transform = active
        ? 'translateY(0) scale(1) rotateY(0)'
        : 'translateY(20px) scale(0.9) rotateY(15deg)';
    });
  };

  setInterval(() => {
    current = (current + 1) % cards.length;
    show(current);
  }, 1500);
})();

// ===== Animated Counters (Intersection Observer) =====
(() => {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const animate = el => {
    const target = Number(el.getAttribute('data-target') || '0');
    const duration = 1200; // ms
    const start = performance.now();

    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));
})();

// ===== Back to Top =====
(() => {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  const toggle = () => {
    if (window.scrollY > 600) btn.classList.add('show');
    else btn.classList.remove('show');
  };
  window.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  toggle();
})();
