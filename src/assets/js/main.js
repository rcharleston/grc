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

// Mobile nav toggle — hamburger opens/closes the nav links sheet.
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  const navEl = document.querySelector("nav");
  if (!toggle || !menu || !navEl) return;

  const close = () => {
    navEl.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };
  const open = () => {
    navEl.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  toggle.addEventListener("click", () => {
    navEl.classList.contains("open") ? close() : open();
  });
  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navEl.classList.contains("open")) close();
  });
})();
