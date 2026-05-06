/* ============================================
   Main — Core Application Controller
   Loader, scroll tracking, section observer,
   GSAP hero animations, final message overlay
   ============================================ */

(function () {
  'use strict';

  // ---- DOM References ----
  const loader = document.getElementById('loader');
  const progressBar = document.getElementById('scroll-progress-bar');
  const navDots = document.querySelectorAll('.nav-dot');
  const lastThingBtn = document.getElementById('last-thing-btn');
  const finalOverlay = document.getElementById('final-overlay');
  const finalCloseBtn = document.getElementById('final-close-btn');
  const sections = document.querySelectorAll('.section');

  // =============================================
  // 1. LOADING SCREEN
  // =============================================
  function hideLoader() {
    if (!loader) return;
    loader.classList.add('hidden');
    // Remove from DOM after transition
    setTimeout(() => {
      loader.style.display = 'none';
    }, 1000);
  }

  window.addEventListener('load', () => {
    // Minimum 1.5s display for emotional pacing
    setTimeout(hideLoader, 1500);
  });

  // Fallback if load takes too long
  setTimeout(hideLoader, 5000);

  // =============================================
  // 2. AOS INITIALIZATION
  // =============================================
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: false,
    });
  }

  // =============================================
  // 3. SCROLL PROGRESS BAR
  // =============================================
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = progress + '%';
    }
  }

  // =============================================
  // 4. SECTION NAVIGATION OBSERVER
  // =============================================
  function setupSectionObserver() {
    if (!sections.length || !navDots.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            // Update nav dots
            navDots.forEach((dot) => {
              dot.classList.toggle('active', dot.getAttribute('data-section') === id);
            });
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Smooth scroll for nav dots
  navDots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = dot.getAttribute('data-section');
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // =============================================
  // 5. GSAP HERO PARALLAX (optional enhancement)
  // =============================================
  function setupGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero background parallax
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      gsap.to(heroBg, {
        y: 150,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Hero content fade out on scroll
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      gsap.to(heroContent, {
        y: -60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: '60% top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // One More Year — atmospheric text movement
    const omyLines = document.querySelectorAll('.one-more-year-lines p');
    omyLines.forEach((line, i) => {
      gsap.from(line, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: i * 0.2,
        scrollTrigger: {
          trigger: '#one-more-year',
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  // =============================================
  // 6. FINAL MESSAGE OVERLAY
  // =============================================
  function setupFinalMessage() {
    if (!lastThingBtn || !finalOverlay) return;

    lastThingBtn.addEventListener('click', () => {
      finalOverlay.classList.add('visible');
      document.body.style.overflow = 'hidden';
    });

    if (finalCloseBtn) {
      finalCloseBtn.addEventListener('click', () => {
        finalOverlay.classList.remove('visible');
        document.body.style.overflow = '';
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && finalOverlay.classList.contains('visible')) {
        finalOverlay.classList.remove('visible');
        document.body.style.overflow = '';
      }
    });
  }

  // =============================================
  // 7. SCROLL EVENT (throttled)
  // =============================================
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        ticking = false;
      });
      ticking = true;
    }
  });

  // =============================================
  // 8. INITIALIZE
  // =============================================
  function init() {
    updateScrollProgress();
    setupSectionObserver();
    setupGSAP();
    setupFinalMessage();
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
