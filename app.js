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


// Promo Kit Musical: cuenta regresiva real por sesión + contador visual de interés
(function () {
  const countdownEl = document.getElementById("kitCountdown");
  const stickyCountdownEl = document.getElementById("kitStickyCountdown");
  const counterEl = document.getElementById("kitInterestCounter");

  if (!countdownEl && !stickyCountdownEl) return;

  const sixHours = 6 * 60 * 60 * 1000;
  const storageKey = "kitPromoEndTime";

  let endTime = Number(localStorage.getItem(storageKey));

  if (!endTime || endTime < Date.now()) {
    endTime = Date.now() + sixHours;
    localStorage.setItem(storageKey, String(endTime));
  }

  function updateCountdown() {
    const remaining = endTime - Date.now();

    if (remaining <= 0) {
      if (countdownEl) countdownEl.textContent = "00:00:00";
      if (stickyCountdownEl) stickyCountdownEl.textContent = "00:00:00";
      return;
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining / (1000 * 60)) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);

    const formatted =
      String(hours).padStart(2, "0") + ":" +
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0");

    if (countdownEl) countdownEl.textContent = formatted;
    if (stickyCountdownEl) stickyCountdownEl.textContent = formatted;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // V17: contador en vivo. No declara compras; muestra interés en la landing.
  const liveNumberEl = document.getElementById("kitLiveNumber");
  if (liveNumberEl) {
    const storageLiveKey = "kitLiveViewCounter";
    let current = Number(localStorage.getItem(storageLiveKey)) || 19;
    const max = 27;

    const renderLiveNumber = (value, animate = false) => {
      liveNumberEl.textContent = String(value);
      if (animate) {
        liveNumberEl.classList.add("bump");
        setTimeout(() => liveNumberEl.classList.remove("bump"), 360);
      }
    };

    renderLiveNumber(current);

    // Primera subida visible para que la pareja perciba actividad: 19 → 20.
    setTimeout(() => {
      if (current < 20) {
        current = 20;
        localStorage.setItem(storageLiveKey, String(current));
        renderLiveNumber(current, true);
      }
    }, 7000);

    // Luego sigue subiendo de forma espaciada y sutil durante la sesión.
    setInterval(() => {
      if (current < max && Math.random() > 0.62) {
        current += 1;
        localStorage.setItem(storageLiveKey, String(current));
        renderLiveNumber(current, true);
      }
    }, 26000);
  }

  // Compatibilidad con versiones anteriores del contador, si existe en algún bloque.
  if (counterEl && !document.getElementById("kitLiveNumber")) {
    let current = 19;
    counterEl.textContent = String(current);
    setTimeout(() => {
      current = 20;
      counterEl.textContent = String(current);
    }, 7000);
  }
})();
