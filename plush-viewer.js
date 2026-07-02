// ===== Plush viewer: swipe/arrow gallery over fixed angles =====
// Reusable factory so both Uni's and Mei Mei's plush can use the same logic.

const uniPlushFrames = [
  { src: 'https://files.catbox.moe/ta8s4z.jpg', label: 'спереди' },
  { src: 'https://files.catbox.moe/i43ld5.jpg', label: 'три четверти слева' },
  { src: 'https://files.catbox.moe/h553oh.jpg', label: 'профиль слева' },
  { src: 'https://files.catbox.moe/tn9wgq.jpg', label: 'сзади слева' },
  { src: 'https://files.catbox.moe/0eutdn.jpg', label: 'сзади' },
  { src: 'https://files.catbox.moe/4rkslq.jpg', label: 'сзади справа' },
  { src: 'https://files.catbox.moe/urznb3.jpg', label: 'сверху спереди' },
  { src: 'https://files.catbox.moe/gawms1.jpg', label: 'снизу сзади' },
];

const meiPlushFrames = [
  { src: 'https://files.catbox.moe/flmdvm.jpg', label: 'спереди' },
  { src: 'https://files.catbox.moe/62w6hc.jpg', label: 'три четверти слева' },
  { src: 'https://files.catbox.moe/186f6j.jpg', label: 'три четверти слева, крупнее' },
  { src: 'https://files.catbox.moe/b90nfk.jpg', label: 'сзади слева' },
  { src: 'https://files.catbox.moe/54xc8z.jpg', label: 'сзади' },
  { src: 'https://files.catbox.moe/or206v.jpg', label: 'сзади справа' },
  { src: 'https://files.catbox.moe/qisyx5.jpg', label: 'снизу спереди' },
  { src: 'https://files.catbox.moe/9lieu9.jpg', label: 'снизу сзади' },
];

function initPlushViewer(rootId, frames, plushName) {
  const root = document.getElementById(rootId);
  if (!root) return;

  const img = root.querySelector('.plush-image');
  const caption = root.querySelector('.plush-caption');
  const dotsWrap = root.querySelector('.plush-dots');
  const prevBtn = root.querySelector('.plush-prev');
  const nextBtn = root.querySelector('.plush-next');
  const stage = root.querySelector('.plush-stage');

  if (!img || !stage) return;

  let index = 0;

  frames.forEach((frame, i) => {
    const dot = document.createElement('button');
    dot.className = 'plush-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', frame.label);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function render() {
    const frame = frames[index];
    img.classList.add('switching');
    setTimeout(() => {
      img.src = frame.src;
      img.alt = 'Плюш ' + plushName + ', вид: ' + frame.label;
      img.classList.remove('switching');
    }, 120);
    caption.textContent = frame.label;
    [...dotsWrap.children].forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function goTo(i) {
    index = (i + frames.length) % frames.length;
    render();
  }

  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));

  stage.setAttribute('tabindex', '0');
  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(index - 1);
    if (e.key === 'ArrowRight') goTo(index + 1);
  });

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
}

initPlushViewer('uni-plush-viewer', uniPlushFrames, 'Юни');
initPlushViewer('mei-plush-viewer', meiPlushFrames, 'Мей Мей');
