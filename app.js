const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealItems.forEach(el => observer.observe(el));
} else {
  revealItems.forEach(el => el.classList.add('visible'));
}


const siteMusic = document.getElementById('siteMusic');
if (siteMusic) {
  siteMusic.volume = 0.45;
  const tryPlayMusic = () => {
    siteMusic.play().catch(() => {});
  };
  window.addEventListener('load', tryPlayMusic, { once: true });
  document.addEventListener('click', tryPlayMusic, { once: true });
  document.addEventListener('touchstart', tryPlayMusic, { once: true });
}


// Promo Kit Musical: countdown personal + actividad en vivo ética
function initKitPromo() {
  const countdownStorageKey = 'kitPromoEndTimeV20';
  const liveStorageKey = 'kitLiveViewCounterV20';
  const activityStorageKey = 'kitLiveActivityIndexV20';

  const getCountdownEls = () => Array.from(document.querySelectorAll('[data-kit-countdown], #kitCountdown, #kitStickyCountdown'));
  const getLiveNumberEls = () => {
    const targets = Array.from(document.querySelectorAll('[data-kit-live-number], #kitLiveNumber'));
    const legacy = document.getElementById('kitInterestCounter');
    if (legacy && !targets.includes(legacy)) targets.push(legacy);
    return targets;
  };
  const getActivityEls = () => Array.from(document.querySelectorAll('[data-kit-activity]'));

  if (!getCountdownEls().length && !getLiveNumberEls().length && !getActivityEls().length) return;

  // Ventana promocional personal: evita 06:00:00 redondo y se siente más real.
  const minDuration = 137 * 60 * 1000; // 2h17
  const maxDuration = 214 * 60 * 1000; // 3h34

  let endTime = Number(localStorage.getItem(countdownStorageKey));
  if (!endTime || endTime <= Date.now()) {
    const duration = minDuration + Math.floor(Math.random() * (maxDuration - minDuration));
    endTime = Date.now() + duration;
    localStorage.setItem(countdownStorageKey, String(endTime));
  }

  function formatTime(ms) {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function updateCountdown() {
    const formatted = formatTime(endTime - Date.now());
    getCountdownEls().forEach((el) => { el.textContent = formatted; });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Contador de actividad: NO afirma compras; comunica interés actual en la landing.
  const minLive = 23;
  const maxLive = 37;
  let current = Number(localStorage.getItem(liveStorageKey));
  if (!current || current < minLive || current > maxLive) {
    current = 26 + Math.floor(Math.random() * 5); // 26–30
    localStorage.setItem(liveStorageKey, String(current));
  }

  function renderLiveNumber(value, animate = false) {
    getLiveNumberEls().forEach((el) => {
      el.textContent = String(value);
      if (animate) {
        el.classList.add('bump');
        setTimeout(() => el.classList.remove('bump'), 420);
      }
    });
  }

  renderLiveNumber(current);

  // Primer movimiento visible: sube una unidad para que la pareja vea actividad.
  setTimeout(() => {
    if (current < maxLive) current += 1;
    localStorage.setItem(liveStorageKey, String(current));
    renderLiveNumber(current, true);
  }, 6800);

  function scheduleNextLiveChange() {
    const delay = 24000 + Math.floor(Math.random() * 32000);
    setTimeout(() => {
      const shouldGoUp = Math.random() > 0.36;
      const delta = shouldGoUp ? 1 : -1;
      current = Math.max(minLive, Math.min(maxLive, current + delta));
      localStorage.setItem(liveStorageKey, String(current));
      renderLiveNumber(current, true);
      scheduleNextLiveChange();
    }, delay);
  }
  scheduleNextLiveChange();

  const activities = [
    'Una pareja de Asunción comenzó su planificación musical.',
    'Una pareja de Lima está organizando la música de su ceremonia.',
    'Una pareja de Ciudad de México está descubriendo el Método Banda Sonora.',
    'Una pareja de Buenos Aires está armando su playlist.',
    'Una pareja de Montevideo está preparando la entrada de la novia.',
    'Una pareja de Santiago está revisando los momentos musicales.',
    'Una pareja de Bogotá está explorando el kit para su boda.',
    'Una pareja de Madrid está preparando su banda sonora.',
    'Una pareja de Encarnación acaba de abrir el test musical.',
    'Una pareja de Ciudad del Este está revisando su checklist.'
  ];

  let activityIndex = Number(localStorage.getItem(activityStorageKey));
  if (!activityIndex || activityIndex < 0) activityIndex = 0;

  function renderActivity(animate = false) {
    const els = getActivityEls();
    if (!els.length) return;
    const message = activities[activityIndex % activities.length];
    if (animate) els.forEach((el) => el.classList.add('fade-out'));
    setTimeout(() => {
      els.forEach((el) => {
        el.textContent = message;
        el.classList.remove('fade-out');
      });
    }, animate ? 300 : 0);
    localStorage.setItem(activityStorageKey, String(activityIndex));
  }

  renderActivity(false);
  setInterval(() => {
    activityIndex += 1;
    renderActivity(true);
  }, 9000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initKitPromo);
} else {
  initKitPromo();
}

// v25: cerrar barra inferior del Sistema Banda Sonora
(function(){
  const sticky = document.querySelector('.kit-v25-sticky');
  const close = document.querySelector('.kit-v25-sticky-close');
  if(!sticky || !close) return;
  close.addEventListener('click', () => {
    sticky.style.display = 'none';
    document.body.style.paddingBottom = '0px';
  });
})();
