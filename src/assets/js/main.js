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

// Filter by publication status.
(function () {
  const tabs = document.querySelectorAll('.ftab');
  const cards = document.querySelectorAll('[data-status]');
  if (!tabs.length || !cards.length) return;
  const filter = (value) => {
    tabs.forEach(b => { const active = b.dataset.f === value; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
    cards.forEach(card => { card.hidden = value !== 'all' && card.dataset.status !== value; });
  };
  const readFilter = () => {
    const value = window.location.hash.slice(1);
    filter(Array.from(tabs).some(btn => btn.dataset.f === value) ? value : 'all');
  };
  tabs.forEach(btn => btn.addEventListener('click', () => {
    filter(btn.dataset.f);
    history.replaceState(null, '', '#' + btn.dataset.f);
  }));
  window.addEventListener('hashchange', readFilter);
  readFilter();
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
