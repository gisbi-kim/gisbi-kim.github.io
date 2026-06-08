(function () {
  function initCarousel(root) {
    const slides = Array.from(root.querySelectorAll(".personal-gallery-slide"));
    const current = root.querySelector("[data-gallery-current]");
    const total = root.querySelector("[data-gallery-total]");
    const dotsWrap = root.querySelector(".personal-gallery-dots");
    const prev = root.querySelector(".personal-gallery-button-prev");
    const next = root.querySelector(".personal-gallery-button-next");
    let active = 0;

    if (!slides.length) return;
    if (total) total.textContent = String(slides.length);

    const dots = slides.map((_slide, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "personal-gallery-dot";
      button.setAttribute("aria-label", `Show gallery image ${index + 1}`);
      button.addEventListener("click", () => show(index));
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

    prev?.addEventListener("click", () => show(active - 1));
    next?.addEventListener("click", () => show(active + 1));
    root.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") show(active - 1);
      if (event.key === "ArrowRight") show(active + 1);
    });
    root.tabIndex = 0;
    show(0);
  }

  function init() {
    document.querySelectorAll("[data-gallery-carousel]").forEach(initCarousel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
