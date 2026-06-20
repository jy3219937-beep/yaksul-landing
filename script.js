// ============================================================
// 정율사관학원 · 약술논술 랜딩페이지 인터랙션
// ============================================================

(() => {
  // ---------- 1. 카운트업 ----------
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();
    const startVal = 0;
    const isLarge = target >= 1000;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(startVal + (target - startVal) * eased);
      el.textContent = isLarge ? v.toLocaleString() : v.toString();
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const countObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCount(e.target);
          countObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((c) => countObs.observe(c));

  // ---------- 2. reveal on scroll ----------
  const revealTargets = document.querySelectorAll(
    '.section-head, .compare-card, .callout, .why-card, .uni, .persona, .pillar, .trend, .cohort, .voice, .t-item, .program, .timetable, .faq details, .cta-card, .teacher-photo, .teacher-info, .gr-mark, .gr-trend, .wall-item, .summer-band, .materials-head, .material, .materials-foot'
  );
  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 6) * 60}ms`;
  });
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealTargets.forEach((el) => revealObs.observe(el));

  // ---------- 3. nav shadow on scroll ----------
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 20) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
