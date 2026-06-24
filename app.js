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
  const countdownEls = document.querySelectorAll('[data-kit-countdown], #kitCountdown, #kitStickyCountdown');
  const liveNumberEls = document.querySelectorAll('[data-kit-live-number], #kitLiveNumber');
  const legacyCounterEl = document.getElementById('kitInterestCounter');
  const activityEl = document.querySelector('[data-kit-activity]');

  if (!countdownEls.length && !liveNumberEls.length && !legacyCounterEl) return;

  const checkoutUrl = 'https://pay.hotmart.com/W106077396L?checkoutMode=0&bid=1782328955549';
  const countdownStorageKey = 'kitPromoEndTimeV19';
  const liveStorageKey = 'kitLiveViewCounterV19';
  const activityStorageKey = 'kitLiveActivityIndexV19';

  // Ventana promocional personal: menos rígida que 06:00:00 y más creíble.
  const minDuration = 135 * 60 * 1000; // 2h15
  const maxDuration = 209 * 60 * 1000; // 3h29

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

    return (
      String(hours).padStart(2, '0') + ':' +
      String(minutes).padStart(2, '0') + ':' +
      String(seconds).padStart(2, '0')
    );
  }

  function updateCountdown() {
    const formatted = formatTime(endTime - Date.now());
    countdownEls.forEach((el) => {
      el.textContent = formatted;
    });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Contador de actividad: no afirma compras; comunica interés actual en la landing.
  let current = Number(localStorage.getItem(liveStorageKey));
  if (!current) {
    current = 24 + Math.floor(Math.random() * 8); // 24–31
    localStorage.setItem(liveStorageKey, String(current));
  }

  const minLive = 23;
  const maxLive = 37;

  function renderLiveNumber(value, animate = false) {
    const targets = liveNumberEls.length ? Array.from(liveNumberEls) : (legacyCounterEl ? [legacyCounterEl] : []);
    targets.forEach((el) => {
      el.textContent = String(value);
      if (animate) {
        el.classList.add('bump');
        setTimeout(() => el.classList.remove('bump'), 380);
      }
    });
  }

  renderLiveNumber(current);

  // Primer movimiento visible: sube una unidad para que se perciba actividad.
  setTimeout(() => {
    if (current < maxLive) current += 1;
    localStorage.setItem(liveStorageKey, String(current));
    renderLiveNumber(current, true);
  }, 6500);

  // Luego fluctúa de manera más realista: a veces sube, a veces baja.
  function scheduleNextLiveChange() {
    const delay = 22000 + Math.floor(Math.random() * 26000);
    setTimeout(() => {
      const shouldGoUp = Math.random() > 0.32;
      const delta = shouldGoUp ? 1 : -1;
      current = Math.max(minLive, Math.min(maxLive, current + delta));
      localStorage.setItem(liveStorageKey, String(current));
      renderLiveNumber(current, true);
      scheduleNextLiveChange();
    }, delay);
  }
  scheduleNextLiveChange();

  const activities = [
    'Último acceso registrado hace 3 minutos.',
    'Una pareja de Asunción está organizando su playlist.',
    'Alguien acaba de revisar el test musical.',
    'Nueva pareja preparando su ceremonia ahora.',
    'Una novia está revisando los momentos musicales.'
  ];

  let activityIndex = Number(localStorage.getItem(activityStorageKey)) || 0;
  function updateActivity() {
    if (!activityEl) return;
    activityEl.textContent = activities[activityIndex % activities.length];
    localStorage.setItem(activityStorageKey, String(activityIndex));
    activityIndex += 1;
  }

  updateActivity();
  if (activityEl) setInterval(updateActivity, 28000);

  window.kitCheckoutUrl = checkoutUrl;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initKitPromo);
} else {
  initKitPromo();
}
