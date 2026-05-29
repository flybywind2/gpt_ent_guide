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

for (const file of [
  "index.html",
  "styles.css",
  "script.js",
  ".github/workflows/pages.yml",
  "assets/hero-enterprise.png",
  "assets/personal-vs-enterprise.png",
  "assets/operating-model.png",
  "assets/department-scenarios.png",
  "assets/roadmap-30days.png",
]) {
  mustExist(file);
}

const html = read("index.html");

for (const id of [
  "hero",
  "flow",
  "difference",
  "enterprise",
  "operating-model",
  "scenarios",
  "roadmap",
  "policy",
  "qa",
  "sources",
]) {
  if (!html.includes(`id="${id}"`)) throw new Error(`Missing section id: ${id}`);
}

for (const requiredText of [
  "ChatGPT Enterprise",
  "개인 구독",
  "사내 도입",
  "30일 로드맵",
  "https://chatgpt.com/business/enterprise/",
  "https://chatgpt.com/pricing/",
  "https://openai.com/business-data/",
]) {
  if (!html.includes(requiredText)) throw new Error(`Missing required content: ${requiredText}`);
}

const imageRefs = [...html.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/g)];
if (imageRefs.length < 5) throw new Error(`Expected at least 5 images, found ${imageRefs.length}`);

for (const match of imageRefs) {
  const tag = match[0];
  const src = match[1];
  if (!/\salt="[^"]+"/.test(tag)) throw new Error(`Image is missing alt text: ${src}`);
  const target = mustExist(src);
  if (statSync(target).size < 100_000) throw new Error(`Image file looks too small: ${src}`);
}

const css = read("styles.css");
for (const token of ["--bg", "--accent", "@media", ".side-nav", ".hero"]) {
  if (!css.includes(token)) throw new Error(`Missing CSS token: ${token}`);
}

const js = read("script.js");
for (const token of ["IntersectionObserver", "copyPrompt", "readingProgress"]) {
  if (!js.includes(token)) throw new Error(`Missing JS behavior: ${token}`);
}

console.log("Static guide checks passed.");
