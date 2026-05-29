const links = [...document.querySelectorAll("[data-section-link]")];
const sections = links
  .map((link) => document.getElementById(link.dataset.sectionLink))
  .filter(Boolean);
const readingProgress = document.getElementById("readingProgress");

function setActive(id) {
  for (const link of links) {
    link.classList.toggle("active", link.dataset.sectionLink === id);
  }
}

function updateActiveByScroll() {
  let current = sections[0]?.id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 170) current = section.id;
  }
  if (current) setActive(current);
}

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActive(visible.target.id);
  },
  { rootMargin: "-18% 0px -68% 0px", threshold: [0.12, 0.35, 0.6] },
);

for (const section of sections) observer.observe(section);

function updateReadingProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? Math.min(1, scrollTop / max) : 0;
  readingProgress.style.width = `${ratio * 100}%`;
  updateActiveByScroll();
}

function copyPrompt(button) {
  const target = document.getElementById(button.dataset.copyTarget);
  if (!target) return;
  const text = target.innerText.trim();
  navigator.clipboard.writeText(text).then(() => {
    const original = button.textContent;
    button.textContent = "복사됨";
    window.setTimeout(() => {
      button.textContent = original;
    }, 1400);
  });
}

for (const button of document.querySelectorAll("[data-copy-target]")) {
  button.addEventListener("click", () => copyPrompt(button));
}

for (const link of links) {
  link.addEventListener("click", () => {
    setActive(link.dataset.sectionLink);
    window.setTimeout(updateActiveByScroll, 300);
  });
}

window.addEventListener("scroll", updateReadingProgress, { passive: true });
updateReadingProgress();
if (sections[0]) setActive(sections[0].id);
