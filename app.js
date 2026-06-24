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
  const counterEl = document.getElementById("kitInterestCounter");

  if (!countdownEl) return;

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
      countdownEl.textContent = "00:00:00";
      return;
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining / (1000 * 60)) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);

    countdownEl.textContent =
      String(hours).padStart(2, "0") + ":" +
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Contador de interés: no declara compras; solo da sensación de actividad de campaña.
  if (counterEl) {
    const storageCounterKey = "kitInterestCounter";
    let current = Number(localStorage.getItem(storageCounterKey)) || 18;
    const max = 34;
    counterEl.textContent = String(current);

    setInterval(() => {
      if (current < max && Math.random() > 0.55) {
        current += 1;
        counterEl.textContent = String(current);
        localStorage.setItem(storageCounterKey, String(current));
      }
    }, 18000);
  }
})();
