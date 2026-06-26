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

// Cerrar barra inferior del Sistema Banda Sonora
(function () {
  const sticky = document.querySelector('.kit-v25-sticky');
  const close = document.querySelector('.kit-v25-sticky-close');

  if (!sticky || !close) return;

  close.addEventListener('click', () => {
    sticky.style.display = 'none';
    document.body.style.paddingBottom = '0px';

    if (typeof window.clarity === 'function') {
      window.clarity('event', 'cerrar_sticky_sistema');
    }
  });
})();

// Medición de clics hacia Hotmart en Microsoft Clarity
(function () {
  const checkoutLinks = document.querySelectorAll('a[href*="pay.hotmart.com"]');

  checkoutLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const ctaName = link.dataset.hotmartCta || 'checkout_hotmart';

      if (typeof window.clarity === 'function') {
        window.clarity('event', `click_${ctaName}`);
      }
    });
  });
})();
