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
  siteMusic.volume = 0.12;
  siteMusic.loop = true;

  const tryPlayMusic = () => {
    const playPromise = siteMusic.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Algunos navegadores bloquean el audio automático hasta la primera interacción.
      });
    }
  };

  // Intenta iniciar Turning Page apenas abre la página.
  window.addEventListener('DOMContentLoaded', tryPlayMusic, { once: true });
  window.addEventListener('load', tryPlayMusic, { once: true });

  // Fallback: si el navegador bloquea autoplay, arranca con la primera interacción sin reiniciarse.
  document.addEventListener('click', tryPlayMusic, { once: true });
  document.addEventListener('touchstart', tryPlayMusic, { once: true });
}

// Barra inferior del Sistema Banda Sonora siempre visible
(function () {
  const sticky = document.querySelector('.kit-v32-sticky');
  if (!sticky) return;
  sticky.classList.add('is-visible');
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


// Mantener visible la barra sticky del Sistema durante toda la experiencia
(function () {
  const sticky = document.querySelector('.kit-v32-sticky');
  if (!sticky) return;
  sticky.classList.add('is-visible');
})();




// v35 · Interacciones minimalistas de Tu Boda Organizada
(function () {
  function ensureMusicStarted() {
    if (!siteMusic) return;
    if (!siteMusic.paused) return;

    const playPromise = siteMusic.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }

  function trackInteraction(name, value) {
    if (typeof window.clarity === 'function') {
      window.clarity('event', name);
      if (value) window.clarity('set', name, value);
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: name,
      value: value || ''
    });
  }

  function activateWithKeyboard(element, handler) {
    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handler(event);
      }
    });
  }

  const painCards = document.querySelectorAll('.kit-v34-choice');
  const painResult = document.querySelector('[data-pain-result]');
  const selectedPains = new Set();

  const defaultPainText = 'Elegí una o más situaciones para ver cómo la plataforma te ayuda.';

  function updatePainResult(lastCard) {
    if (!painResult) return;

    if (!selectedPains.size) {
      painResult.classList.remove('is-active');
      painResult.innerHTML = `<p>${defaultPainText}</p>`;
      return;
    }

    const solution = lastCard?.dataset.solution || 'La plataforma fue creada para ayudarte a ordenar la boda con más claridad.';
    const count = selectedPains.size;

    painResult.classList.add('is-active');

    if (count >= 2) {
      painResult.innerHTML = `
        <p><strong>Parece que esta plataforma puede ayudarte con ${count} desafíos.</strong> ${solution} <a href="#sistema-incluye">Ver qué incluye ↓</a></p>
      `;
    } else {
      painResult.innerHTML = `<p><strong>Esto tiene solución.</strong> ${solution}</p>`;
    }
  }

  painCards.forEach((card) => {
    const handler = () => {
      const key = card.dataset.pain || card.textContent.trim();

      if (card.classList.contains('is-selected')) {
        card.classList.remove('is-selected');
        selectedPains.delete(key);
      } else {
        card.classList.add('is-selected', 'kit-v34-interaction-pulse');
        selectedPains.add(key);
        setTimeout(() => card.classList.remove('kit-v34-interaction-pulse'), 450);
      }

      ensureMusicStarted();
      updatePainResult(card);
      trackInteraction('interaccion_dolor_sistema', key);
    };

    card.addEventListener('click', handler);
    activateWithKeyboard(card, handler);
  });

  const modules = document.querySelectorAll('.kit-v34-module');
  const moduleProgress = document.querySelector('[data-module-progress]');
  const openedModules = new Set();

  function updateModuleProgress() {
    if (!moduleProgress) return;

    const total = modules.length;
    const opened = openedModules.size;

    if (!opened) {
      moduleProgress.textContent = 'Tocá cada módulo para descubrir cómo te ayuda antes de ir al checkout.';
      return;
    }

    if (opened < total) {
      moduleProgress.textContent = `Ya descubriste ${opened} de ${total} módulos del sistema.`;
      return;
    }

    moduleProgress.textContent = 'Ya viste todo lo que incluye. Ahora podés acceder a la plataforma completa.';
  }

  modules.forEach((moduleCard) => {
    const handler = () => {
      const key = moduleCard.dataset.module || moduleCard.textContent.trim();
      const wasOpen = moduleCard.classList.contains('is-open');

      modules.forEach((item) => {
        if (item !== moduleCard) item.classList.remove('is-open');
      });

      moduleCard.classList.toggle('is-open', !wasOpen);
      moduleCard.classList.add('kit-v34-interaction-pulse');
      setTimeout(() => moduleCard.classList.remove('kit-v34-interaction-pulse'), 450);

      if (!wasOpen) openedModules.add(key);

      ensureMusicStarted();
      updateModuleProgress();
      trackInteraction('interaccion_modulo_sistema', key);
    };

    moduleCard.addEventListener('click', handler);
    activateWithKeyboard(moduleCard, handler);
  });
})();
