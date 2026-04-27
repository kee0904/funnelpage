/* ============================================================
   CLARITY — script.js
   Features: Scroll-reveal, sticky nav, FAQ accordion, form UX
   ============================================================ */

(function () {
  'use strict';

  /* ── Sticky Nav ─────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load


  /* ── Scroll Reveal ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // stagger siblings that enter together
          const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 80, 320);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));


  /* ── FAQ Accordion ───────────────────────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all
      faqItems.forEach((other) => {
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-a').classList.remove('open');
      });

      // Toggle clicked
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });


  /* ── Lead Form ───────────────────────────────────────────── */
  const form = document.getElementById('leadForm');
  const successEl = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const inputs = form.querySelectorAll('input[required], select[required]');
      let valid = true;
      inputs.forEach((input) => {
        input.style.borderColor = '';
        if (!input.value.trim()) {
          input.style.borderColor = '#c9521e';
          valid = false;
        }
      });

      // Email format check
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        emailInput.style.borderColor = '#c9521e';
        valid = false;
      }

      if (!valid) return;

      // Simulate submission (replace with real endpoint)
      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.hidden = true;
        successEl.hidden = false;
        successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1000);
    });
  }


  /* ── Smooth scroll for anchor links ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 68;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── Active nav highlight on scroll ─────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          document.querySelectorAll('.nav a').forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach((s) => sectionObserver.observe(s));

})();
