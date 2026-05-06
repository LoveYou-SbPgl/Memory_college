/* ============================================
   Music — Background Audio Controller
   Ambient soundtrack with smooth controls
   ============================================ */

(function () {
  'use strict';

  const audio = document.getElementById('bg-music');
  const toggleBtn = document.getElementById('music-toggle');
  if (!audio || !toggleBtn) return;

  let isPlaying = false;
  const FADE_DURATION = 2000; // ms
  const MAX_VOLUME = 0.4; // Keep background music subtle
  let fadeInterval = null;

  // ---- Volume Fade ----
  function fadeVolume(targetVolume, duration, callback) {
    if (fadeInterval) clearInterval(fadeInterval);

    const startVolume = audio.volume;
    const diff = targetVolume - startVolume;
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    fadeInterval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      audio.volume = Math.max(0, Math.min(1, startVolume + diff * eased));

      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        fadeInterval = null;
        audio.volume = targetVolume;
        if (callback) callback();
      }
    }, stepTime);
  }

  // ---- Play ----
  function play() {
    audio.volume = 0;
    const promise = audio.play();

    if (promise !== undefined) {
      promise
        .then(() => {
          isPlaying = true;
          toggleBtn.classList.add('playing');
          fadeVolume(MAX_VOLUME, FADE_DURATION);
        })
        .catch((err) => {
          // Autoplay blocked — wait for user interaction
          console.log('Audio play blocked:', err.message);
          isPlaying = false;
          toggleBtn.classList.remove('playing');
        });
    }
  }

  // ---- Pause ----
  function pause() {
    fadeVolume(0, FADE_DURATION / 2, () => {
      audio.pause();
      isPlaying = false;
      toggleBtn.classList.remove('playing');
    });
  }

  // ---- Toggle ----
  function toggle() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  // ---- Event Listeners ----
  toggleBtn.addEventListener('click', toggle);

  // Keyboard support
  toggleBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });

  // Pause when tab hidden, resume when visible
  document.addEventListener('visibilitychange', () => {
    if (!isPlaying) return;
    if (document.hidden) {
      audio.volume = 0;
    } else {
      fadeVolume(MAX_VOLUME, 800);
    }
  });
})();
