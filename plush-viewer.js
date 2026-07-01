// ===== Plush viewer: swipe/arrow gallery over 8 fixed angles =====
const plushFrames = [
  { src: 'https://files.catbox.moe/ta8s4z.jpg', label: 'спереди' },
  { src: 'https://files.catbox.moe/i43ld5.jpg', label: 'три четверти слева' },
  { src: 'https://files.catbox.moe/h553oh.jpg', label: 'профиль слева' },
  { src: 'https://files.catbox.moe/tn9wgq.jpg', label: 'сзади слева' },
  { src: 'https://files.catbox.moe/0eutdn.jpg', label: 'сзади' },
  { src: 'https://files.catbox.moe/4rkslq.jpg', label: 'сзади справа' },
  { src: 'https://files.catbox.moe/urznb3.jpg', label: 'сверху спереди' },
  { src: 'https://files.catbox.moe/gawms1.jpg', label: 'снизу сзади' },
];

(function initPlushViewer() {
  const img = document.getElementById('plush-image');
  const caption = document.getElementById('plush-caption');
  const dotsWrap = document.getElementById('plush-dots');
  const prevBtn = document.getElementById('plush-prev');
  const nextBtn = document.getElementById('plush-next');
  const stage = document.querySelector('.plush-stage');

  if (!img || !stage) return;

  let index = 0;

  // build dots
  plushFrames.forEach((frame, i) => {
    const dot = document.createElement('button');
    dot.className = 'plush-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', frame.label);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function render() {
    const frame = plushFrames[index];
    img.classList.add('switching');
    setTimeout(() => {
      img.src = frame.src;
      img.alt = 'Плюш Юни, вид: ' + frame.label;
      img.classList.remove('switching');
    }, 120);
    caption.textContent = frame.label;
    [...dotsWrap.children].forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function goTo(i) {
    index = (i + plushFrames.length) % plushFrames.length;
    render();
  }

  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));

  // keyboard nav when viewer is focused/hovered
  stage.setAttribute('tabindex', '0');
  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(index - 1);
    if (e.key === 'ArrowRight') goTo(index + 1);
  });

  // swipe support
  let startX = null;
  stage.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) {
      goTo(dx < 0 ? index + 1 : index - 1);
    }
    startX = null;
  });
})();
