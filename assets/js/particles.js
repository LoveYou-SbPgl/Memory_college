/* ============================================
   Particles — Custom Canvas Particle System
   Floating warm bokeh/firefly effect
   ============================================ */

(function () {
  'use strict';

  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let width, height;

  // Configuration
  const CONFIG = {
    count: 50,
    minSize: 1,
    maxSize: 3.5,
    minSpeed: 0.15,
    maxSpeed: 0.5,
    colors: [
      'rgba(212, 185, 150, 0.4)',   // accent warm
      'rgba(212, 185, 150, 0.2)',   // accent dim
      'rgba(245, 245, 245, 0.15)',  // soft white
      'rgba(255, 220, 180, 0.25)', // warm gold
    ],
    connectDistance: 120,
    connectOpacity: 0.04,
  };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createParticle() {
    return {
      x: random(0, width),
      y: random(0, height),
      size: random(CONFIG.minSize, CONFIG.maxSize),
      speedX: random(-CONFIG.maxSpeed, CONFIG.maxSpeed),
      speedY: random(-CONFIG.minSpeed, -CONFIG.maxSpeed),
      color: CONFIG.colors[Math.floor(random(0, CONFIG.colors.length))],
      opacity: random(0.3, 1),
      opacityDir: random(0.002, 0.008),
      pulse: random(0, Math.PI * 2),
    };
  }

  function init() {
    resize();
    particles = [];
    // Adjust count for mobile
    const count = width < 768 ? Math.floor(CONFIG.count * 0.5) : CONFIG.count;
    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }
  }

  function update() {
    particles.forEach((p) => {
      // Movement
      p.x += p.speedX;
      p.y += p.speedY;

      // Pulse opacity
      p.pulse += p.opacityDir;
      p.opacity = 0.3 + Math.sin(p.pulse) * 0.5;

      // Wrap around edges
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));
      ctx.fill();

      // Soft glow
      if (p.size > 2) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 3
        );
        gradient.addColorStop(0, 'rgba(212, 185, 150, 0.08)');
        gradient.addColorStop(1, 'rgba(212, 185, 150, 0)');
        ctx.fillStyle = gradient;
        ctx.globalAlpha = p.opacity * 0.5;
        ctx.fill();
      }
    });

    ctx.globalAlpha = 1;
  }

  function animate() {
    update();
    draw();
    animationId = requestAnimationFrame(animate);
  }

  // Initialize
  init();
  animate();

  // Resize handler
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      init();
    }, 200);
  });

  // Pause when tab is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });
})();
