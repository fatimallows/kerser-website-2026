const TITLES = [
  "UP CURSOR.",
  "UP Association of\nComputer Science Majors.",
  "Sexy since 1983.",
];

const TYPE_SPEED_MS = 70;
const DELETE_SPEED_MS = 35;
const HOLD_MS = 3000;
const PAUSE_BEFORE_TYPE_MS = 400;

function render(el, text) {
  el.innerHTML = text.replace(/\n/g, "<br>");
}

function startTypingAnimation(el) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    render(el, TITLES[0]);
    return;
  }

  let titleIndex = 0;
  let charIndex = 0;

  function type() {
    const currentTitle = TITLES[titleIndex];
    charIndex++;
    render(el, currentTitle.slice(0, charIndex));

    if (charIndex < currentTitle.length) {
      setTimeout(type, TYPE_SPEED_MS);
    } else {
      setTimeout(erase, HOLD_MS);
    }
  }

  function erase() {
    const currentTitle = TITLES[titleIndex];
    charIndex--;
    render(el, currentTitle.slice(0, charIndex));

    if (charIndex > 0) {
      setTimeout(erase, DELETE_SPEED_MS);
    } else {
      titleIndex = (titleIndex + 1) % TITLES.length;
      setTimeout(type, PAUSE_BEFORE_TYPE_MS);
    }
  }

  setTimeout(type, PAUSE_BEFORE_TYPE_MS);
}

document.addEventListener("DOMContentLoaded", () => {
  const typingEl = document.getElementById("typing-text");
  if (typingEl) {
    startTypingAnimation(typingEl);
  }

  const scrollBtn = document.getElementById("scroll-down-btn");
  const hero = document.querySelector(".hero");
  const heroBg = document.querySelector(".hero__bg");
  if (scrollBtn && hero) {
    scrollBtn.addEventListener("click", () => {
      const targetY = hero.getBoundingClientRect().bottom + window.scrollY;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    });
  }

  if (scrollBtn && heroBg) {
    const blur = () => heroBg.classList.add("is-blurred");
    const unblur = () => heroBg.classList.remove("is-blurred");
    scrollBtn.addEventListener("mouseenter", blur);
    scrollBtn.addEventListener("mouseleave", unblur);
    scrollBtn.addEventListener("focus", blur);
    scrollBtn.addEventListener("blur", unblur);
  }
});
