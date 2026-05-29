# ChatGPT Enterprise Guide Design

## Goal

Create a GitHub Pages guide that helps employees, managers, IT/security teams, and adoption owners understand why ChatGPT Enterprise is different from personal subscriptions and how to operate it inside a company.

## Recommended Approach

Use a single-page static guide, similar to the provided Claude Code lecture page: fixed section index, dark technical training style, long-form sections, timeline blocks, comparison tables, concrete playbooks, and Q&A. This is the best fit because the repo is empty, GitHub Pages can serve it without a build step, and the content should be easy to read in a browser or present in a meeting.

Alternatives considered:

- Markdown-only guide: easy to maintain but too plain for the requested visual style.
- React/Vite app: richer components but unnecessary for a mostly static enablement guide and adds deployment complexity.
- Slide deck: good for a meeting, but weaker as a living internal reference site.

## Information Architecture

1. Hero: one-line message, audience, prerequisites, 60-minute reading/presentation flow.
2. Personal vs Enterprise: practical difference table covering data handling, workspace ownership, admin controls, identity, connectors, analytics, and support.
3. Enterprise capabilities: what the company gains beyond individual productivity.
4. Adoption operating model: owner/admin/champion/user roles, governance loop, security review loop.
5. Department scenarios: development, product, sales, HR, legal/security, support.
6. 30-day rollout roadmap: preparation, pilot, expansion, operationalization, measurement.
7. Policy starter kit: allowed/restricted data, review checkpoints, prompt/GPT lifecycle.
8. Q&A and source links.

## Visual Direction

Dark lecture-note UI with high-contrast Korean typography, teal/green accents, left-side section navigation, technical diagrams, compact cards, and realistic enterprise workflow illustrations generated as PNG assets. Generated images should be used as section anchors, not decorative filler.

Image assets:

- Hero enterprise workspace visual.
- Personal vs Enterprise comparison visual.
- Operating model diagram.
- Department scenario matrix.
- 30-day roadmap visual.

## Content Principles

- Keep claims grounded in OpenAI official pages and help documents.
- Avoid procurement-specific price claims because Enterprise pricing is sales-led and changes over time.
- Explain personal subscriptions as good for individual productivity, while Enterprise is for organizational control, governance, and repeatable adoption.
- Make every section actionable: owner, command, artifact, and verification.

## Deployment

Static files at repository root:

- `index.html`
- `styles.css`
- `script.js`
- `assets/*.png`
- `.github/workflows/pages.yml`

Use GitHub Actions Pages deployment so the site becomes available at `https://flybywind2.github.io/gpt_ent_guide/`.
