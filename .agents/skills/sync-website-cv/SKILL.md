---
name: sync-website-cv
description: Update Giseop Kim's academic website and companion CV together for appointments, service, awards, publications, education, teaching, funding, and talks; rebuild and verify main.pdf.
---

# Synchronize website and CV

## Locate current content

- Website: `gisbi-kim/gisbi-kim.github.io`, branch `master` (verify before writing).
- Homepage: `content/_index.md`; biography: `content/authors/admin/_index.md`.
- Service, awards, talks: `static/data/profile-sections.json`, under `sections`. Preserve columns and row keys; inspect `static/js/profile-sections.js` for rendering.
- CV: `gisbi-kim/cv-giseopkim`, branch `main` (verify before writing). Read its `AGENTS.md` and `.agents/skills/verify-cv/SKILL.md`.
- Source: `main.tex`; generated tracked outputs: `main.pdf`, `README.md`, `revision.tex`.

## Update both sources

1. Inspect both heads and local changes; use isolated checkouts when needed. Preserve unrelated edits. Never force-push.
2. Verify role, venue, date, and acceptance from user-supplied evidence or relevant mail. Publish only authorized biographical facts, never mail bodies, private addresses, registration links, or review assignments.
3. Check for existing entries to avoid duplicates. Distinguish conference year from appointment start: RSS Area Chair belongs to RSS 2027; RA-L Associate Editor began October 2026, area Localization and Mapping. Do not infer term end dates.
4. Update website and corresponding CV section with equivalent facts, preserving full venue names and layout. Update JSON `updatedAt` and use Asia/Seoul for revision dates.
5. Record the narrow change and evidence type/date in CV `CHANGELOG.md`. Do not imply unrelated facts were reverified.
6. Assess CV relevance for styling, navigation, essays, and personal projects; these normally need no CV edit. State that assessment rather than inventing a CV change.

## Build and verify

Run from the CV root, replacing the date with the actual revision date:

```sh
python scripts/build.py --date YYYY-MM-DD
python scripts/verify_cv.py
git diff --check
```

Use the existing XeLaTeX/latexmk toolchain with Charter and DejaVu fonts; contact fonts are bundled. Discover tools before installing dependencies. Generate README from TeX; never edit it independently. Run the live roster check only for membership changes or requested membership verification.

Inspect build warnings, extract PDF text to confirm changed facts/date, and render changed pages to inspect clipping, headings and page breaks. Confirm equivalent records in JSON, TeX, README and PDF. Parse JSON and check unaffected rows. Build Hugo locally or verify the existing Pages workflow on the published commit; inspect the actual service cards in a browser.

## Publish and confirm

Commit the CV source, generated PDF, README, revision date and changelog together. Commit website changes and repository skill/instructions. Publish both within the user's existing authorization, staging only intended files. If local Git is unavailable, use GitHub connector tree/commit/ref tools with the current base tree and expected head.

Verify remote source and PDF blob hashes against tested files. Confirm Pages deployment and live content. Inspect the existing CV link and preserve its canonical destination in the CV repository. Report each repository separately if one fails. Never declare synchronization complete after only editing TeX or adding a workflow.

This skill directs future agent work; it is not an unattended synchronization service.
