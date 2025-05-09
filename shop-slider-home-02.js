(function () {
  const cards = document.querySelectorAll('.shop-card');
  const counterCurrent = document.getElementById('shop-counter-current');
  const counterTotal = document.getElementById('shop-counter-total');
  const btnNext = document.getElementById('shop-next');
  const btnPrev = document.getElementById('shop-prev');

  if (!cards.length || !counterCurrent || !counterTotal || !btnNext || !btnPrev) {
    console.warn("Shop slider elements not found.");
    return;
  }

  let current = 0;
  const total = cards.length;

  function updateSlider() {
    cards.forEach((card, index) => {
      const offset = index - current;
      gsap.to(card, {
        x: offset * 60,
        scale: offset === 0 ? 1 : 0.9,
        opacity: offset === 0 ? 1 : 0.4,
        zIndex: -Math.abs(offset),
        rotateY: offset * -10,
        duration: 0.5,
        ease: 'power3.out'
      });
    });

    counterCurrent.textContent = `${String(current + 1).padStart(2, '0')} `;
    counterTotal.textContent = String(total).padStart(2, '0');
  }

  btnNext.addEventListener('click', () => {
    current = (current + 1) % total;
    updateSlider();
  });

  btnPrev.addEventListener('click', () => {
    current = (current - 1 + total) % total;
    updateSlider();
  });

  updateSlider();
})();
