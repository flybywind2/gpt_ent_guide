const copyButtons = [...document.querySelectorAll("[data-copy-target]")];
for (const button of copyButtons) {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;
    await navigator.clipboard.writeText(target.innerText.trim());
    const original = button.textContent;
    button.textContent = "복사됨";
    window.setTimeout(() => {
      button.textContent = original;
    }, 1300);
  });
}

const page = document.body.dataset.page;
for (const link of document.querySelectorAll(".topnav a")) {
  if (link.getAttribute("href")?.includes(`${page}.html`)) {
    link.setAttribute("aria-current", "page");
  }
}

const guideLinks = [...document.querySelectorAll(".side-rail a, [data-guide-link]")];
const sections = guideLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateGuideNavigation() {
  let current = sections[0]?.id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 140) current = section.id;
  }
  for (const link of guideLinks) {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  }
}

if (sections.length) {
  window.addEventListener("scroll", updateGuideNavigation, { passive: true });
  updateGuideNavigation();
}
