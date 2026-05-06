/* ============================================
   Timeline — Dynamic Timeline Builder
   Chronological memory entries with scroll reveal
   ============================================ */

(function () {
  'use strict';

  // ---- Timeline Data ----
  const timelineData = [
    {
      date: 'September 2022',
      title: 'The First Glance',
      description:
        'We crossed paths at the BB court — nothing special, just another face in the crowd. But the next day at Foodys, with the whole group playing truth or dare, that\'s when I actually noticed you. The quiet one in a room full of noise. An introvert sitting across from an extrovert — I remember thinking we\'d never be close. Funny how the person you think you\'ll never connect with ends up becoming your entire story.',
    },
    {
      date: 'December 2022',
      title: 'The Call That Changed Everything',
      description:
        'That night, out of nowhere, I called you just to vent about that whole "Ninja Hattori" situation. But somehow, we never stopped talking. One topic led to another, and hours disappeared without either of us noticing. That was the night we properly connected — not as acquaintances, but as real, close friends.',
    },
    {
      date: 'Early 2023',
      title: 'Walls Came Down',
      description:
        'We were both going through different phases of life, but somehow that\'s exactly what brought us closer. We started opening up about everything — the real stuff, the hard stuff, even health struggles we\'d kept hidden. No filters, no pretending.',
    },
    {
      date: 'Mid 2023',
      title: 'A Bond Beyond Words',
      description:
        'This was when it stopped being just friendship and became something deeper. We understood each other in ways that didn\'t need explaining. We shared more, supported more, and somewhere along the way, you became irreplaceable.',
    },
    {
      date: 'Start of 2024',
      title: 'The Low Phase',
      description:
        'I hit my lowest point. Everything felt heavy, and I didn\'t know how to carry it all. But you were there — quietly, consistently, without ever being asked. You held space for me when I couldn\'t hold myself together.',
    },
    {
      date: 'Mid 2024',
      title: 'The Weight I Put On You',
      description:
        'I was mentally broken, and I took it out on the one person who didn\'t deserve it. I made you feel bad — almost every single day. But you never chose to leave. You stayed, you absorbed it, and you kept pulling me through. I\'ll never forget that.',
    },
    {
      date: 'Start of 2025',
      title: 'Pondi & The Unexpected',
      description:
        'And then came Pondicherry — unexpected, unplanned, and unforgettable. We enjoyed every moment of it, but it also brought with it a tension neither of us saw coming. Some trips change things. This one did.',
    },
    {
      date: 'Mid 2025',
      title: 'What I Never Said',
      description:
        'I never told you this — but somewhere around here, what I felt for you grew far beyond friendship. I buried it deep, convinced that saying it out loud would risk everything we\'d built. So I stayed silent, and carried it alone.',
    },
    {
      date: 'October 2025',
      title: 'The Black Saree',
      description:
        'My farewell celebration. You walked in wearing that black saree, and the world went quiet for a second. That was the moment I stopped lying to myself. I had fallen — completely, irreversibly, and in a way I couldn\'t put into words even if I tried.',
    },
    {
      date: 'December 21, 2025',
      title: 'The Day That Stays',
      description:
        'Some dates don\'t leave you. This is one of them. I know it carries a different weight for you — maybe even regret. But for me, it\'s a day etched into memory. Unforgettable. Unchangeable. Forever ours.',
    },
    {
      date: 'Start of 2026',
      title: 'The Storm Before The Calm',
      description:
        'We fought. We disagreed. We talked about space, about distance, about walking away. But even through all of it — we never actually stopped caring. Every fight ended with the same truth: we couldn\'t let go of each other.',
    },
    {
      date: 'Now',
      title: 'The Goodbye We Never Prepared For',
      description:
        'It\'s coming to an end — the everyday meetings, the effortless proximity, the luxury of just being around each other. Now, days will turn into weeks, weeks into months, just to steal a few moments together. But what we had? That doesn\'t end. Not ever.',
    },
  ];

  // ---- Render Timeline ----
  const container = document.getElementById('timeline-container');
  if (!container) return;

  function renderTimeline() {
    const fragment = document.createDocumentFragment();

    timelineData.forEach((item, index) => {
      const timelineItem = document.createElement('div');
      timelineItem.className = 'timeline-item';
      timelineItem.setAttribute('data-aos', index % 2 === 0 ? 'fade-right' : 'fade-left');
      timelineItem.setAttribute('data-aos-duration', '800');
      timelineItem.setAttribute('data-aos-delay', String(index * 100));

      timelineItem.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <span class="timeline-date">${item.date}</span>
          <h3 class="timeline-title">${item.title}</h3>
          <p class="timeline-desc">${item.description}</p>
        </div>
      `;

      fragment.appendChild(timelineItem);
    });

    container.appendChild(fragment);
  }

  // Initialize
  renderTimeline();
})();
