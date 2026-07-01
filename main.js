// ===== Tole Tole section markup (injected so JS drives its own content, per file split) =====
const toleSectionHTML = `
<section class="tole-section" id="tole">
  <div class="tole-inner">
    <h1 class="tole-title reveal">
      Мей Мей
      <span class="alt-name">она же Толе Толе</span>
    </h1>
    <p class="tole-sub reveal">
      Рыжая, с огромными глазами, в которых почти всегда написано лёгкое недоумение —
      будто она только что увидела что-то, чего не ожидала. Полная противоположность
      невозмутимому Юни.
    </p>

    <div class="tole-gallery">
      <div class="tole-photo reveal">
        <img src="https://files.catbox.moe/4049pg.png" alt="Толе Толе в костюме пчёлки" loading="lazy">
        <p class="cap">В костюме пчёлки — не по своей воле, но стойко</p>
      </div>
      <div class="tole-photo reveal offset">
        <img src="https://files.catbox.moe/ky97nk.png" alt="Испуганная Толе Толе" loading="lazy">
        <p class="cap">Тот самый взгляд, который не сходит с лица</p>
      </div>
    </div>
  </div>
</section>
`;

document.getElementById('tole-mount').innerHTML = toleSectionHTML;

// ===== scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el) => io.observe(el));

// ===== cursor glow (desktop only, respects reduced motion) =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(pointer: coarse)').matches;

if (!prefersReducedMotion && !isTouch) {
  const glow = document.getElementById('glow');
  let active = false;

  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    if (!active) {
      glow.classList.add('active');
      active = true;
    }
  });

  window.addEventListener('mouseleave', () => {
    glow.classList.remove('active');
    active = false;
  });
}

// ===== plush slot placeholder — ready for future 3D embed =====
// When the 3D model is ready, replace #plush-slot contents with the viewer
// (e.g. a <model-viewer> tag or a Three.js canvas mount point).
