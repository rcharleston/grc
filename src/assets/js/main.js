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

// Hero terminal — live compliance-feed simulation.
(function () {
  const feed = document.getElementById("hero-terminal-feed");
  if (!feed || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const lines = [
    ['<span class="t-prompt">$</span> <span class="t-cmd">oscal validate ssp.json --profile fedramp-moderate</span>', null],
    ["✓ 142 controls mapped · 0 gaps", "t-ok"],
    ['<span class="t-prompt">$</span> <span class="t-cmd">opa eval -i input.json -d policy/ &quot;data.compliance.allow&quot;</span>', null],
    ['{ "result": [{ "expressions": [{ "value": true }] }] }', "t-dim"],
    ['<span class="t-prompt">$</span> <span class="t-cmd">grc-agent scan --target prod-vpc-01</span>', null],
    ["⚠ 3 findings · drafting remediation…", "t-warn"],
    ['<span class="t-prompt">$</span> <span class="t-cmd">grc-agent remediate --finding CVE-2026-11824</span>', null],
    ["✓ patch generated · PR #482 opened", "t-ok"],
    ['<span class="t-prompt">$</span> <span class="t-cmd">oscal export --format json --catalog nist-800-53r5</span>', null],
    ["✓ catalog synced · 1,006 controls", "t-ok"],
    ['<span class="t-prompt">$</span> <span class="t-cmd">opa test policy/ -v</span>', null],
    ["PASS: 58/58 · 0.014s", "t-ok"],
  ];

  feed.innerHTML = "";
  const cursor = document.createElement("div");
  cursor.innerHTML = '<span class="t-prompt">$</span> <span class="t-cursor"></span>';
  feed.appendChild(cursor);

  const MAX_LINES = 9;
  let i = 0;

  function tick() {
    const [html, cls] = lines[i % lines.length];
    i++;
    const line = document.createElement("div");
    line.className = "t-line" + (cls ? " " + cls : "");
    line.innerHTML = html;
    feed.insertBefore(line, cursor);

    while (feed.children.length - 1 > MAX_LINES) {
      feed.removeChild(feed.firstChild);
    }
    feed.scrollTop = feed.scrollHeight;
  }

  let timer = setInterval(tick, 2200);
  document.addEventListener("visibilitychange", () => {
    clearInterval(timer);
    if (!document.hidden) timer = setInterval(tick, 2200);
  });
})();

// Hero scroll — parallax fade on scroll, subtle pointer tilt on the terminal.
(function () {
  const hero = document.querySelector(".hero");
  const inner = document.querySelector(".hero-inner");
  const terminal = document.querySelector(".hero-terminal");
  if (!hero || !inner) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let scrollProgress = 0;
  let tiltX = 0;
  let tiltY = 0;
  let scheduled = false;

  function render() {
    inner.style.transform = `translateY(${scrollProgress * 50}px)`;
    inner.style.opacity = String(1 - scrollProgress * 0.9);
    if (terminal) {
      terminal.style.transform =
        `translateY(${scrollProgress * 30}px) ` +
        `scale(${1 - scrollProgress * 0.06}) ` +
        `rotateX(${tiltY + scrollProgress * 6}deg) rotateY(${tiltX}deg)`;
      terminal.style.opacity = String(1 - scrollProgress * 0.75);
    }
    scheduled = false;
  }

  function schedule() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(render);
    }
  }

  function onScroll() {
    const heroHeight = hero.offsetHeight || 1;
    scrollProgress = Math.min(Math.max(-hero.getBoundingClientRect().top / heroHeight, 0), 1);
    schedule();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  if (terminal && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    hero.addEventListener("pointermove", (e) => {
      const rect = terminal.getBoundingClientRect();
      tiltX = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      tiltY = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      schedule();
    });
    hero.addEventListener("pointerleave", () => {
      tiltX = 0;
      tiltY = 0;
      schedule();
    });
  }

  onScroll();
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
