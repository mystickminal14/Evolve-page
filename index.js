/* ─────────────────────────────────────────────
   CAREER PATHWAYS — LBEF  |  index.js
   GSAP Animations + Interactions + Testimonial Dialog
───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Register GSAP Plugins ── */
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  /* ═══════════════════════════════════════
     1. CUSTOM CURSOR
  ════════════════════════════════════════ */
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursorTrail');

  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power2.out' });
  });

  function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    gsap.set(trail, { x: trailX, y: trailY });
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  const hoverTargets = document.querySelectorAll('a, button, .day-card, .testi-card, .curriculum-table tbody tr, .why-card, .highlight-glance-card, .overview-item');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { scale: 2.5, duration: 0.3, ease: 'back.out' });
      gsap.to(trail,  { scale: 1.5, duration: 0.4, ease: 'back.out', opacity: 0.5 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'back.out' });
      gsap.to(trail,  { scale: 1, duration: 0.4, ease: 'back.out', opacity: 1 });
    });
  });


  /* ═══════════════════════════════════════
     2. NAVBAR — scroll glass effect
  ════════════════════════════════════════ */
  const nav = document.getElementById('nav');
  ScrollTrigger.create({
    start: 80,
    onEnter:     () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled'),
  });


  /* ═══════════════════════════════════════
     3. MOBILE MENU
  ════════════════════════════════════════ */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobLinks   = document.querySelectorAll('.mob-link');
  let menuOpen = false;

  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    if (menuOpen) {
      gsap.fromTo('.mobile-menu li',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      );
      gsap.to(hamburger.querySelectorAll('span')[0], { rotation: 45, y: 7,  duration: 0.3 });
      gsap.to(hamburger.querySelectorAll('span')[1], { opacity: 0,          duration: 0.2 });
      gsap.to(hamburger.querySelectorAll('span')[2], { rotation: -45, y: -7, duration: 0.3 });
    } else {
      gsap.to(hamburger.querySelectorAll('span')[0], { rotation: 0, y: 0,  duration: 0.3 });
      gsap.to(hamburger.querySelectorAll('span')[1], { opacity: 1,          duration: 0.2 });
      gsap.to(hamburger.querySelectorAll('span')[2], { rotation: 0, y: 0,  duration: 0.3 });
    }
  });

  mobLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      gsap.to(hamburger.querySelectorAll('span')[0], { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(hamburger.querySelectorAll('span')[1], { opacity: 1,        duration: 0.2 });
      gsap.to(hamburger.querySelectorAll('span')[2], { rotation: 0, y: 0, duration: 0.3 });
    });
  });


  /* ═══════════════════════════════════════
     4. HERO ENTRANCE ANIMATION
  ════════════════════════════════════════ */
  const heroTL = gsap.timeline({ defaults: { ease: 'power4.out' } });

  heroTL
    .to('#heroEyebrow', { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
    .to('.hero-headline .line', {
      y: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out',
    }, '-=0.5')
    .to('#heroSub',     { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
    .to('#heroActions', { opacity: 1, y: 0, duration: 0.7 }, '-=0.6')
    .to('#heroStats',   { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    .to('#heroRight',   { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' }, '-=1.2');

  gsap.to('.orb-1', { y: -60, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });
  gsap.to('.orb-2', { y: 40,  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });


  /* ═══════════════════════════════════════
     5. BUTTERFLIES
  ════════════════════════════════════════ */
  const heroBflies = document.querySelectorAll(
    '.butterfly-h1, .butterfly-h2, .butterfly-h3, .butterfly-h4, .butterfly-h5'
  );
  gsap.to(heroBflies, { opacity: 0.82, duration: 1.2, ease: 'power2.out', stagger: 0.3, delay: 1.4 });

  gsap.to('.butterfly-h1', { y: -80,  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2 } });
  gsap.to('.butterfly-h2', { y: -50,  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });
  gsap.to('.butterfly-h3', { y: -100, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2.5 } });
  gsap.to('.butterfly-h4', { y: -60,  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.8 } });
  gsap.to('.butterfly-h5', { y: -40,  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 } });

  const scrollBflies = [
    { sel: '.butterfly-a1',  trigger: '.about' },
    { sel: '.butterfly-a2',  trigger: '.about' },
    { sel: '.butterfly-w1',  trigger: '.why-join' },
    { sel: '.butterfly-ws1', trigger: '.who-should' },
    { sel: '.butterfly-ov1', trigger: '.overview' },
    { sel: '.butterfly-ov2', trigger: '.overview' },
    { sel: '.butterfly-c1',  trigger: '.curriculum' },
    { sel: '.butterfly-c2',  trigger: '.curriculum' },
    { sel: '.butterfly-t1',  trigger: '.takeaways' },
    { sel: '.butterfly-ts1', trigger: '.testimonials' },
    { sel: '.butterfly-ts2', trigger: '.testimonials' },
    { sel: '.butterfly-hl1', trigger: '.highlights' },
    { sel: '.butterfly-ap1', trigger: '.apply' },
    { sel: '.butterfly-ap2', trigger: '.apply' },
  ];

  scrollBflies.forEach(({ sel, trigger }) => {
    const el = document.querySelector(sel);
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, scale: 0.5, rotation: -20 },
      {
        opacity: 0.82, scale: 1, rotation: 0, duration: 1.4, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: document.querySelector(trigger), start: 'top 75%', once: true }
      }
    );
  });

  document.addEventListener('mousemove', (e) => {
    const xRatio = (e.clientX / window.innerWidth - 0.5);
    const yRatio = (e.clientY / window.innerHeight - 0.5);
    heroBflies.forEach((b, i) => {
      const depth = (i + 1) * 6;
      gsap.to(b, { x: xRatio * depth, y: yRatio * depth, duration: 1.8, ease: 'power1.out' });
    });
  });


  /* ═══════════════════════════════════════
     6. SCROLL REVEAL — Generic Classes
  ════════════════════════════════════════ */
  gsap.utils.toArray('.reveal-up').forEach((el) => {
    gsap.fromTo(el,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        delay: (el.dataset.delay || 0),
      }
    );
  });

  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.fromTo(el,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
    );
  });

  gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.fromTo(el,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
    );
  });


  /* ═══════════════════════════════════════
     7. WHY JOIN CARDS — staggered reveal
  ════════════════════════════════════════ */
  gsap.fromTo('.why-card',
    { y: 60, opacity: 0, scale: 0.96 },
    {
      y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: '.why-grid', start: 'top 80%', once: true }
    }
  );


  /* ═══════════════════════════════════════
     8. OVERVIEW ITEMS — staggered reveal
  ════════════════════════════════════════ */
  gsap.fromTo('.overview-item',
    { y: 40, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: '.overview-grid', start: 'top 80%', once: true }
    }
  );


  /* ═══════════════════════════════════════
     9. HIGHLIGHTS CARDS — staggered reveal
  ════════════════════════════════════════ */
  gsap.fromTo('.highlight-glance-card',
    { y: 50, opacity: 0, scale: 0.97 },
    {
      y: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: '.highlights-grid', start: 'top 80%', once: true }
    }
  );


  /* ═══════════════════════════════════════
     10. CURRICULUM TABLE — row reveal
  ════════════════════════════════════════ */
  gsap.fromTo('.curriculum-table tbody tr',
    { x: -20, opacity: 0 },
    {
      x: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.06,
      scrollTrigger: { trigger: '.curriculum-table-wrap', start: 'top 80%', once: true }
    }
  );


  /* ═══════════════════════════════════════
     11. TESTIMONIAL CARDS — staggered
  ════════════════════════════════════════ */
  gsap.fromTo('.testi-card',
    { y: 80, opacity: 0, scale: 0.96 },
    {
      y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out', stagger: 0.15,
      scrollTrigger: { trigger: '.testi-grid', start: 'top 80%', once: true }
    }
  );


  /* ═══════════════════════════════════════
     12. STAT NUMBER COUNT-UP
  ════════════════════════════════════════ */
  const statTargets = [
    { el: document.querySelectorAll('.stat-num')[0], end: 6,  suffix: '' },
    { el: document.querySelectorAll('.stat-num')[1], end: 8,  suffix: '+' },
  ];

  statTargets.forEach(({ el, end, suffix }) => {
    if (!el) return;
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: end, duration: 1.5, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; }
        });
      }
    });
  });


  /* ═══════════════════════════════════════
     13. APPLY SECTION
  ════════════════════════════════════════ */
  gsap.fromTo('.apply-orb',
    { scale: 0.5, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: '#apply', start: 'top 80%', once: true } }
  );

  gsap.to('.btn-apply', {
    boxShadow: '0 16px 70px rgba(3, 92, 172, 0.7)',
    duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
  });


  /* ═══════════════════════════════════════
     14. SMOOTH SCROLL
  ════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      gsap.to(window, { duration: 1.1, scrollTo: { y: target, offsetY: 70 }, ease: 'power3.inOut' });
    });
  });


  /* ═══════════════════════════════════════
     15. LOCATION CARD — parallax tilt
  ════════════════════════════════════════ */
  const locationCard = document.querySelector('.location-card');
  if (locationCard) {
    locationCard.addEventListener('mousemove', (e) => {
      const rect = locationCard.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      gsap.to(locationCard, { rotationY: dx * 4, rotationX: -dy * 4, transformPerspective: 1000, duration: 0.5, ease: 'power2.out' });
    });
    locationCard.addEventListener('mouseleave', () => {
      gsap.to(locationCard, { rotationY: 0, rotationX: 0, duration: 0.7, ease: 'power3.out' });
    });
  }


  /* ═══════════════════════════════════════
     16. PAGE LOAD
  ════════════════════════════════════════ */
  gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });


  /* ═══════════════════════════════════════
     17. MARQUEE pause on hover
  ════════════════════════════════════════ */
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', () => { marqueeTrack.style.animationPlayState = 'paused'; });
    marqueeTrack.addEventListener('mouseleave', () => { marqueeTrack.style.animationPlayState = 'running'; });
  }


  /* ═══════════════════════════════════════
     18. FOOTER fade-up
  ════════════════════════════════════════ */
  gsap.fromTo('.footer',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.footer', start: 'top 95%', once: true } }
  );


  /* ═══════════════════════════════════════
     19. TESTIMONIAL DIALOG
  ════════════════════════════════════════ */
  const overlay    = document.getElementById('testiDialogOverlay');
  const closeBtn   = document.getElementById('testiDialogClose');
  const bodyEl     = document.getElementById('testiDialogBody');
  const nameEl     = document.getElementById('testiDialogName');
  const roleEl     = document.getElementById('testiDialogRole');
  const avatarWrap = document.getElementById('testiDialogAvatarWrap');

  function openDialog(card) {
    const name     = card.dataset.name;
    const role     = card.dataset.role;
    const avatar   = card.dataset.avatar;
    const initials = card.dataset.initials;
    const full     = card.dataset.full;

    const paragraphs = full.split('||').map(p => p.trim()).filter(Boolean);
    bodyEl.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');

    nameEl.textContent = name;
    roleEl.textContent = role;

    avatarWrap.innerHTML = `
      <img src="${avatar}" alt="${name}"
           style="width:100%;height:100%;object-fit:cover;object-position:center top;"
           onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
      <div class="testi-dialog-avatar-fallback" style="display:none;">${initials}</div>
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    gsap.fromTo('#testiDialog',
      { y: 30, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
    );
  }

  function closeDialog() {
    gsap.to('#testiDialog', {
      y: 16, opacity: 0, scale: 0.97, duration: 0.28, ease: 'power2.in',
      onComplete: () => {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  document.querySelectorAll('.testi-card').forEach(card => {
    card.addEventListener('click', () => openDialog(card));
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDialog(card); }
    });
  });

  closeBtn.addEventListener('click', closeDialog);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeDialog();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeDialog();
  });

});