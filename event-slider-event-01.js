window.addEventListener("load", () => {
  const cards = document.querySelectorAll(".event-card");
  const counterCurrent = document.getElementById("event-counter-current");
  const counterTotal = document.getElementById("event-counter-total");
  const btnNext = document.getElementById("event-next");
  const btnPrev = document.getElementById("event-prev");

  if (!cards.length || !counterCurrent || !counterTotal || !btnNext || !btnPrev) {
    console.warn("Element slider tidak lengkap.");
    return;
  }

  let current = 2;
  const total = cards.length;
  const visibleRange = 2;

  function updateSlider() {
    cards.forEach((card, index) => {
      const offset = index - current;

      const opacity = Math.abs(offset) <= visibleRange ? 1 : 0;
      const zIndex = Math.abs(offset) <= visibleRange ? 10 - Math.abs(offset) : -1;

      const scale = offset === 0 ? 1 : 0.85;
      const translateX = offset * 220;
      const rotateY = offset * -20;

      gsap.to(card, {
        x: translateX,
        scale,
        rotateY,
        zIndex,
        opacity,
        duration: 0.6,
        ease: "power3.out",
        onStart: () => {
          card.style.display = "block";
        },
        onComplete: () => {
          if (opacity === 0) {
            card.style.display = "none";
          }
        }
      });
    });

    counterCurrent.textContent = String(current + 1).padStart(2, "0");
    counterTotal.textContent = String(total).padStart(2, "0");
  }

  // Set awal tanpa animasi
  cards.forEach((card, index) => {
    const offset = index - current;

    const opacity = Math.abs(offset) <= visibleRange ? 1 : 0;
    const zIndex = Math.abs(offset) <= visibleRange ? 10 - Math.abs(offset) : -1;

    const scale = offset === 0 ? 1 : 0.85;
    const translateX = offset * 220;
    const rotateY = offset * -20;

    gsap.set(card, {
      x: translateX,
      scale,
      rotateY,
      zIndex,
      opacity,
    });

    card.style.display = opacity === 0 ? "none" : "block";
  });

  updateSlider();

  btnNext.addEventListener("click", () => {
    if (current < total - 1) {
      current++;
      updateSlider();
    }
  });

  btnPrev.addEventListener("click", () => {
    if (current > 0) {
      current--;
      updateSlider();
    }
  });
});
