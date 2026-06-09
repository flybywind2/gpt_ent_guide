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
  "assets/hero-enterprise.png",
  "assets/personal-vs-enterprise.png",
  "assets/operating-model.png",
  "assets/department-scenarios.png",
  "assets/roadmap-30days.png",
  "assets/user-codex-workflow.png",
  "tools/visual-assets.html",
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
for (const id of [
  "hero",
  "overview",
  "quick-start",
  "flow",
  "difference",
  "subscription-difference",
  "enterprise-core",
  "enterprise",
  "operating-model",
  "scenarios",
  "no-attachments",
  "features",
  "workflow",
  "safety",
  "codex-updates",
  "prompt-template",
  "sources",
]) {
  if (!index.includes(`id="${id}"`)) throw new Error(`Missing section id: ${id}`);
}

for (const requiredText of [
  "ChatGPT Enterprise",
  "사용자 가이드 네비게이션",
  "data-guide-link",
  "일반 사용자 중심",
  "작게 맡기고",
  "개요",
  "빠른 시작",
  "차이점",
  "Enterprise 핵심",
  "운영 모델",
  "활용 시나리오",
  "처음 30분은 기능 탐색이 아니라 업무 하나를 끝내는 데 쓴다",
  "보안팀만의 일도 아니고, 현업만의 일도 아니다",
  "파일 첨부",
  "Chat",
  "Image Generation",
  "Projects",
  "Deep Research",
  "개인 구독",
  "Plus/Pro",
  "도메인 검증",
  "SSO",
  "SCIM",
  "중앙 멤버 관리",
  "Company Knowledge",
  "기능이 보이지 않으면",
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

for (const restoredAsset of [
  "hero-enterprise.png",
  "personal-vs-enterprise.png",
  "operating-model.png",
  "department-scenarios.png",
  "roadmap-30days.png",
  "user-codex-workflow.png",
]) {
  if (!index.includes(restoredAsset)) throw new Error(`Restored visual is not referenced in index: ${restoredAsset}`);
}

const heroMatch = index.match(/<section id="hero"[\s\S]*?<\/section>/);
if (!heroMatch) throw new Error("Missing hero section");
for (const removedHeroText of ["파일 첨부 불가 환경 전제", "첨부 없이도"]) {
  if (heroMatch[0].includes(removedHeroText)) {
    throw new Error(`Removed first-screen text is still present: ${removedHeroText}`);
  }
}

for (const file of htmlFiles) {
  const html = read(file);
  if (!html.includes("파일 첨부")) throw new Error(`${file} must state the no-attachment assumption`);
  if (!html.includes("copy-button")) throw new Error(`${file} must include a copyable prompt template`);

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
  if (!html.includes("feature-preview")) throw new Error(`${file} missing large image preview`);
  if (!html.includes("원본 이미지 열기")) throw new Error(`${file} missing original image link`);
  const imageCount = [...html.matchAll(new RegExp(image, "g"))].length;
  if (imageCount < 4) throw new Error(`${file} must show and link ${image} in hero, large preview, and original image link`);
}

const css = read("styles.css");
for (const token of [
  "--bg: #ffffff",
  "@media",
  ".topbar",
  ".guide-sidebar",
  ".feature-hero",
  ".feature-preview",
  ".section-visual",
  ".overview-grid",
  ".difference-grid",
  ".comparison-table",
  ".core-grid",
  ".role-grid",
  ".scenario-grid",
  ".operating-loop",
  ".prompt-panel",
  ".side-rail",
]) {
  if (!css.includes(token)) throw new Error(`Missing CSS token: ${token}`);
}
for (const darkToken of ["#0b1020", "#101828", "linear-gradient(135deg, #14171f"]) {
  if (css.includes(darkToken)) throw new Error(`CSS still includes dark theme token: ${darkToken}`);
}

const js = read("script.js");
for (const token of ["data-copy-target", "aria-current", "side-rail", "data-guide-link"]) {
  if (!js.includes(token)) throw new Error(`Missing JS behavior: ${token}`);
}

console.log("Static guide checks passed.");
