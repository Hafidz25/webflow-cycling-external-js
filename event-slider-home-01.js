// swiper-config.js

function initializeSwiper() {
  // Remove hide-slide class from all slides
  var swiperSlides = document.querySelectorAll('.swiper-slide');
  
  swiperSlides.forEach(function(slide) {
    slide.classList.remove('hide-slide');
  });

  // Initialize Swiper
  let photoSwiper = new Swiper(".swiper.is-photos", {
    effect: "cards",
    grabCursor: true,
    loop: false,
    keyboard: true,
    navigation: {
      nextEl: ".arrow.is-right",
      prevEl: ".arrow.is-left"
    },
    on: {
      slideChange: function () {
        let activeIndex = this.activeIndex;

        // Function to handle text elements
        function handleTextElements(className) {
          document.querySelectorAll(className).forEach(function(text) {
            text.style.opacity = '0';
            text.style.display = 'none';
          });
          let activeElement = document.querySelector(className + '[data-index="' + activeIndex + '"]');
          if (activeElement) {
            activeElement.style.opacity = '1';
            activeElement.style.display = 'block';
          }
        }

        // Handle all text elements
        handleTextElements('.text-slide');
        handleTextElements('.text-slide-name');
        handleTextElements('.text-slide-job');
      }
    }
  });

  // Expose goToSlide function globally
  window.goToSlide = function(slideIndex) {
    photoSwiper.slideTo(slideIndex);
  };
}

// Load Swiper resources and initialize
function loadSwiperResources() {
  // Check if Swiper is already loaded
  if (typeof Swiper === 'function') {
    initializeSwiper();
    return;
  }

  // Load CSS
  const swiperCSS = document.createElement('link');
  swiperCSS.rel = 'stylesheet';
  swiperCSS.href = 'https://unpkg.com/swiper@8/swiper-bundle.min.css';
  document.head.appendChild(swiperCSS);

  // Load JS
  const swiperJS = document.createElement('script');
  swiperJS.src = 'https://unpkg.com/swiper@8/swiper-bundle.min.js';
  swiperJS.onload = initializeSwiper;
  document.head.appendChild(swiperJS);
}

// Start loading when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSwiperResources);
} else {
  loadSwiperResources();
}
