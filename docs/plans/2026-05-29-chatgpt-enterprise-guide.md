# ChatGPT Enterprise Guide Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and publish a visually rich static GitHub Pages guide for adopting ChatGPT Enterprise inside a company.

**Architecture:** A dependency-free static site served from the repository root and deployed through GitHub Pages Actions. The guide is one long-form page with fixed navigation, generated image assets, Korean content, and a small JavaScript enhancement layer for active navigation and copy buttons.

**Tech Stack:** HTML, CSS, vanilla JavaScript, generated PNG assets, GitHub Actions Pages workflow, Node built-in static validation script.

---

### Task 1: Add Static Validation Test

**Files:**
- Create: `tests/static-check.mjs`

**Step 1: Write the failing test**

Create a Node script that asserts required site files, section IDs, official source links, and referenced images exist.

**Step 2: Run test to verify it fails**

Run: `node tests/static-check.mjs`
Expected: FAIL because `index.html` and other site files do not exist yet.

### Task 2: Add Generated Assets

**Files:**
- Create: `assets/hero-enterprise.png`
- Create: `assets/personal-vs-enterprise.png`
- Create: `assets/operating-model.png`
- Create: `assets/department-scenarios.png`
- Create: `assets/roadmap-30days.png`

**Step 1: Copy generated images**

Copy the five generated PNGs from the Codex generated image folder into `assets/` with stable names.

**Step 2: Confirm files exist**

Run: `Get-ChildItem assets`
Expected: five PNG files.

### Task 3: Implement Static Guide

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `script.js`

**Step 1: Add HTML**

Create the one-page guide with the approved information architecture, fixed navigation, image sections, tables, playbooks, and source links.

**Step 2: Add CSS**

Implement the dark technical training style, responsive layout, section cards, tables, code blocks, image frames, and mobile navigation behavior.

**Step 3: Add JS**

Implement active section highlighting, reading progress, and prompt copy buttons.

### Task 4: Add GitHub Pages Workflow

**Files:**
- Create: `.github/workflows/pages.yml`

**Step 1: Add Pages deployment workflow**

Use `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages` to deploy the static root.

### Task 5: Verify Locally

**Files:**
- Test: `tests/static-check.mjs`

**Step 1: Run static validation**

Run: `node tests/static-check.mjs`
Expected: PASS.

**Step 2: Start static server**

Run: `python -m http.server 4173`
Expected: local site available at `http://localhost:4173/`.

**Step 3: Browser visual QA**

Open the page in the in-app browser, inspect desktop and mobile widths, verify images load, navigation works, text does not overlap, and generated visuals are readable.

### Task 6: Publish

**Files:**
- Commit all intended files.

**Step 1: Inspect diff**

Run: `git -c safe.directory=D:/Python/gpt_ent_guide status -sb`
Expected: only guide files, assets, workflow, docs, and tests.

**Step 2: Commit**

Run: `git -c safe.directory=D:/Python/gpt_ent_guide add ...`
Run: `git -c safe.directory=D:/Python/gpt_ent_guide commit -m "Add ChatGPT Enterprise adoption guide"`

**Step 3: Push**

Run: `git -c safe.directory=D:/Python/gpt_ent_guide push -u origin main`

**Step 4: Verify Pages**

Check `https://flybywind2.github.io/gpt_ent_guide/` after the workflow has time to deploy.
