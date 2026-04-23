// Scroll reveal animation — any element with .fade-in fades in once visible.
(function () {
  const els = document.querySelectorAll(".fade-in");
  if (!els.length || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  els.forEach((el) => observer.observe(el));
})();

// Project filter tabs — present on /projects/ only.
(function () {
  const tabs = document.querySelectorAll(".ftab");
  const cards = document.querySelectorAll("[data-difficulty]");
  if (!tabs.length || !cards.length) return;

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabs.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.f;
      cards.forEach((card) => {
        const show = f === "all" || card.dataset.difficulty === f;
        card.style.display = show ? "" : "none";
      });
    });
  });
})();
