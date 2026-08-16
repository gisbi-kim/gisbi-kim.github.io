(function () {
  const AUTOPLAY_INTERVAL_MS = 2000;
  const carouselControllers = new WeakMap();
  let lightbox;
  let lightboxImage;
  let lightboxPrev;
  let lightboxNext;
  let lightboxCount;
  let lightboxClose;
  let lightboxImages = [];
  let lightboxIndex = 0;
  let lightboxCarousel;
  let previousFocus;

  function imageSource(image) {
    return image.currentSrc || image.src;
  }

  function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    const carouselController = carouselControllers.get(lightboxCarousel);
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.removeAttribute("src");
    lightboxImages = [];
    lightboxCarousel = null;
    document.body.classList.remove("personal-gallery-lightbox-open");
    previousFocus?.focus();
    carouselController?.resume("lightbox");
  }

  function showLightboxImage(index) {
    if (!lightboxImages.length) return;

    lightboxIndex = (index + lightboxImages.length) % lightboxImages.length;
    const image = lightboxImages[lightboxIndex];
    const hasMultipleImages = lightboxImages.length > 1;

    lightboxImage.src = imageSource(image);
    lightboxImage.alt = image.alt || "Gallery image";
    lightboxPrev.hidden = !hasMultipleImages;
    lightboxNext.hidden = !hasMultipleImages;
    lightboxCount.hidden = !hasMultipleImages;
    lightboxCount.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
    carouselControllers.get(lightboxCarousel)?.show(lightboxIndex);
  }

  function ensureLightbox() {
    if (lightbox) return lightbox;

    lightbox = document.createElement("div");
    lightbox.className = "personal-gallery-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-label", "Gallery image viewer");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.tabIndex = -1;

    lightboxImage = document.createElement("img");
    lightboxPrev = document.createElement("button");
    lightboxPrev.type = "button";
    lightboxPrev.className = "personal-gallery-lightbox-button personal-gallery-lightbox-button-prev";
    lightboxPrev.setAttribute("aria-label", "Previous gallery image");
    lightboxPrev.textContent = "‹";

    lightboxNext = document.createElement("button");
    lightboxNext.type = "button";
    lightboxNext.className = "personal-gallery-lightbox-button personal-gallery-lightbox-button-next";
    lightboxNext.setAttribute("aria-label", "Next gallery image");
    lightboxNext.textContent = "›";

    lightboxCount = document.createElement("p");
    lightboxCount.className = "personal-gallery-lightbox-count";
    lightboxCount.setAttribute("aria-live", "polite");

    lightboxClose = document.createElement("button");
    lightboxClose.type = "button";
    lightboxClose.className = "personal-gallery-lightbox-close";
    lightboxClose.setAttribute("aria-label", "Close gallery image viewer");
    lightboxClose.textContent = "×";

    lightbox.append(lightboxImage, lightboxPrev, lightboxNext, lightboxCount, lightboxClose);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    lightboxPrev.addEventListener("click", () => showLightboxImage(lightboxIndex - 1));
    lightboxNext.addEventListener("click", () => showLightboxImage(lightboxIndex + 1));
    lightboxClose.addEventListener("click", closeLightbox);
    document.body.append(lightbox);

    return lightbox;
  }

  function openLightbox(image) {
    ensureLightbox();
    lightboxCarousel = image.closest("[data-gallery-carousel]");
    lightboxImages = lightboxCarousel
      ? Array.from(lightboxCarousel.querySelectorAll(".personal-gallery-slide img"))
      : [image];
    const clickedIndex = lightboxImages.indexOf(image);
    previousFocus = document.activeElement;
    carouselControllers.get(lightboxCarousel)?.pause("lightbox");
    showLightboxImage(clickedIndex >= 0 ? clickedIndex : 0);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("personal-gallery-lightbox-open");
    lightboxClose.focus();
  }

  function initCarousel(root) {
    const slides = Array.from(root.querySelectorAll(".personal-gallery-slide"));
    const current = root.querySelector("[data-gallery-current]");
    const total = root.querySelector("[data-gallery-total]");
    const dotsWrap = root.querySelector(".personal-gallery-dots");
    const prev = root.querySelector(".personal-gallery-button-prev");
    const next = root.querySelector(".personal-gallery-button-next");
    let active = 0;
    let autoplayTimer;
    const pauseReasons = new Set();

    if (!slides.length) return;
    if (total) total.textContent = String(slides.length);

    const dots = slides.map((_slide, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "personal-gallery-dot";
      button.setAttribute("aria-label", `Show gallery image ${index + 1}`);
      button.addEventListener("click", () => select(index));
      dotsWrap?.appendChild(button);
      return button;
    });

    function show(index) {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === active);
      });
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === active);
        dot.setAttribute("aria-current", dotIndex === active ? "true" : "false");
      });
      if (current) current.textContent = String(active + 1);
    }

    function clearAutoplay() {
      if (!autoplayTimer) return;
      window.clearInterval(autoplayTimer);
      autoplayTimer = undefined;
    }

    function startAutoplay() {
      clearAutoplay();
      if (slides.length < 2 || pauseReasons.size || document.hidden) return;
      autoplayTimer = window.setInterval(() => show(active + 1), AUTOPLAY_INTERVAL_MS);
    }

    function pause(reason) {
      pauseReasons.add(reason);
      clearAutoplay();
    }

    function resume(reason) {
      pauseReasons.delete(reason);
      startAutoplay();
    }

    function select(index) {
      show(index);
      startAutoplay();
    }

    prev?.addEventListener("click", () => select(active - 1));
    next?.addEventListener("click", () => select(active + 1));
    root.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        select(active - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        select(active + 1);
      }
    });
    root.addEventListener("mouseenter", () => pause("hover"));
    root.addEventListener("mouseleave", () => resume("hover"));
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) pause("visibility");
      else resume("visibility");
    });
    root.tabIndex = 0;
    show(Math.floor(Math.random() * slides.length));
    carouselControllers.set(root, { pause, resume, show });
    startAutoplay();
  }

  function init() {
    document.querySelectorAll("[data-gallery-carousel]").forEach(initCarousel);
    document.querySelectorAll(".personal-gallery-slide img").forEach((image) => {
      image.addEventListener("click", () => openLightbox(image));
    });
    document.addEventListener("keydown", (event) => {
      if (!lightbox?.classList.contains("is-open")) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft" && lightboxImages.length > 1) {
        event.preventDefault();
        showLightboxImage(lightboxIndex - 1);
      }
      if (event.key === "ArrowRight" && lightboxImages.length > 1) {
        event.preventDefault();
        showLightboxImage(lightboxIndex + 1);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
