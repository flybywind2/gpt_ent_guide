import { readFileSync, existsSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (path) => readFileSync(join(root, path), "utf8");
const mustExist = (path) => {
  const target = join(root, path);
  if (!existsSync(target)) throw new Error(`Missing required file: ${path}`);
  return target;
};

const requiredFiles = [
  "index.html",
  "styles.css",
  "script.js",
  ".github/workflows/pages.yml",
  "pages/chat.html",
  "pages/image-generation.html",
  "pages/projects.html",
  "pages/deep-research.html",
  "assets/guide-overview-white.png",
  "assets/guide-chat-white.png",
  "assets/guide-image-generation-white.png",
  "assets/guide-projects-white.png",
  "assets/guide-deep-research-white.png",
];

for (const file of requiredFiles) mustExist(file);

const htmlFiles = [
  "index.html",
  "pages/chat.html",
  "pages/image-generation.html",
  "pages/projects.html",
  "pages/deep-research.html",
];

const index = read("index.html");
for (const id of ["hero", "no-attachments", "features", "workflow", "safety", "codex-updates", "prompt-template", "sources"]) {
  if (!index.includes(`id="${id}"`)) throw new Error(`Missing section id: ${id}`);
}

for (const requiredText of [
  "ChatGPT Enterprise",
  "파일 첨부 불가",
  "Chat",
  "Image Generation",
  "Projects",
  "Deep Research",
  "개인 구독",
  "Codex",
  "Goal mode",
  "https://chatgpt.com/business/enterprise/",
  "https://chatgpt.com/pricing/",
  "https://openai.com/business-data/",
  "https://help.openai.com/en/articles/11084440-chatgpt-image-library",
  "https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt",
  "https://help.openai.com/en/articles/10500283-deep-research-faq",
  "https://help.openai.com/en/articles/11369540",
  "https://help.openai.com/en/articles/6825453-chatgpt-release-notes",
]) {
  if (!index.includes(requiredText)) throw new Error(`Missing required content: ${requiredText}`);
}

const oldAssets = [
  "hero-enterprise.png",
  "personal-vs-enterprise.png",
  "operating-model.png",
  "department-scenarios.png",
  "roadmap-30days.png",
  "user-codex-workflow.png",
];

for (const oldAsset of oldAssets) {
  if (existsSync(join(root, "assets", oldAsset))) throw new Error(`Old dark asset still exists: ${oldAsset}`);
}

for (const file of htmlFiles) {
  const html = read(file);
  if (!html.includes("파일 첨부")) throw new Error(`${file} must state the no-attachment assumption`);
  if (!html.includes("copy-button")) throw new Error(`${file} must include a copyable prompt template`);
  for (const oldAsset of oldAssets) {
    if (html.includes(oldAsset)) throw new Error(`${file} still references old dark asset: ${oldAsset}`);
  }

  const imageRefs = [...html.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/g)];
  if (imageRefs.length < 1) throw new Error(`${file} must include at least one image`);
  for (const match of imageRefs) {
    const tag = match[0];
    const src = match[1].replace("../", "");
    if (!/\salt="[^"]+"/.test(tag)) throw new Error(`Image is missing alt text in ${file}: ${match[1]}`);
    const target = mustExist(src);
    if (statSync(target).size < 100_000) throw new Error(`Image file looks too small: ${src}`);
  }
}

const pageExpectations = [
  ["pages/chat.html", "Chat 기본 템플릿", "guide-chat-white.png"],
  ["pages/image-generation.html", "Image Generation 기본 템플릿", "guide-image-generation-white.png"],
  ["pages/projects.html", "프로젝트 지시문 템플릿", "guide-projects-white.png"],
  ["pages/deep-research.html", "Deep Research 기본 템플릿", "guide-deep-research-white.png"],
];

for (const [file, title, image] of pageExpectations) {
  const html = read(file);
  if (!html.includes(title)) throw new Error(`${file} missing title: ${title}`);
  if (!html.includes(image)) throw new Error(`${file} missing image: ${image}`);
}

const css = read("styles.css");
for (const token of ["--bg: #ffffff", "@media", ".topbar", ".feature-hero", ".prompt-panel", ".side-rail"]) {
  if (!css.includes(token)) throw new Error(`Missing CSS token: ${token}`);
}
for (const darkToken of ["#0b1020", "#101828", "linear-gradient(135deg, #14171f"]) {
  if (css.includes(darkToken)) throw new Error(`CSS still includes dark theme token: ${darkToken}`);
}

const js = read("script.js");
for (const token of ["data-copy-target", "aria-current", "side-rail"]) {
  if (!js.includes(token)) throw new Error(`Missing JS behavior: ${token}`);
}

console.log("Static guide checks passed.");
