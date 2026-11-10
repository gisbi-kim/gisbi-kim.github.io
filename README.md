# Giseop Kim

> **Classical-to-Modern Bridge in Spatial AI.**
> Connecting classical geometric SLAM — Lie groups, probabilistic estimation, optimization — with the Foundation Model era of embodied intelligence.

🌐 **<https://gisbi-kim.github.io/>**

---

## About

This is the source of **Giseop Kim (김기섭)**'s personal website — research, publications, talks, teaching, and notes on SLAM and Spatial AI.

I am an Assistant Professor at **DGIST**, in the Department of Robotics and Mechatronics Engineering, with joint appointments in the Physical AI Center, the Department of AI, and the Mechanical Engineering Track. I lead **APRL** — the *Autonomous Perception and Robot Learning* Lab.

Before DGIST, I received my Ph.D. from **KAIST** and worked as a Research Scientist at **NAVER LABS** (2021–2024).

## Research

APRL works at the intersection of geometry-grounded SLAM and learning-based spatial reasoning:

- **SLAM & spatial AI** — long-term mapping, multi-session localization, robust estimation
- **Place recognition** — global descriptors, evaluation methodology, cross-modal retrieval
- **Multi-robot systems** — distributed mapping, scale-aware rendezvous, communication-disrupted exploration
- **Vision-Language Navigation & embodied AI** — bridging maps, language, and action

Selected contributions:
**Scan Context** (IROS 2018) · **MulRan dataset** (ICRA 2020) · **LT-mapper** (ICRA 2022) · **ScaleMaster** (ICRA 2026)

## What you'll find here

- 📝 **Posts** — research notes, lecture material, occasional essays on AI-native research and academic craft
- 🎤 **Talks** — conference, seminar, and invited talk slides
- 📚 **Publications** — papers with code, data, and supplementary material
- 🧪 **Projects** — APRL research threads and lab software releases
- 🎓 **Teaching** — DGIST courses (RT604 SLAM, MECH301 Robots for Human, ...)

## Stack

Built with [Hugo](https://gohugo.io/) and [Hugo Blox Builder](https://hugoblox.com/).
Source under `content/`, configuration in `hugo.yaml` and `config/_default/`.
Auto-deployed to GitHub Pages on every push to `master`.

Homepage section menus keep smooth scrolling and update the URL fragment (for example, `#talks`), so section addresses can be shared and revisited with browser Back/Forward.

Academic Service includes a collapsed reviewer list, grouped by conferences and journals, with confirmed participation years. Academic service and reviewer records are maintained in `static/data/profile-sections.json`. The companion CV repository checks this data hourly and rebuilds and commits its CV when service changes. GitHub may delay scheduled runs. The workflow does not synchronize other sections. To synchronize locally, run `python scripts/sync_reviewers.py --cv <path-to-cv>` and rebuild the CV; add `--check` to detect drift.

The Awards section includes a bilingual explanation of the 2026 single-year citation indicators and an in-page viewer for the IROS 2025 HEAI award photos. The figures describe a 2025 citation snapshot, not career-long impact.

The header's **CV** menu opens the [current CV PDF](https://github.com/gisbi-kim/cv-giseopkim/blob/main/main.pdf), maintained in the separate CV repository.

## Publication Journey

[Publication Journey](https://gisbi-kim.github.io/publication-journey/) is linked as the first card under **Research & Teaching** (`#publications`). The four homepage cards use two columns on desktop and the existing swipeable row on mobile.

The standalone page lives in `static/publication-journey/`; Hugo publishes it unchanged. It brings together the interactive timeline, **Places. Maps. Memory.** milestones, and a searchable publication index. Years run horizontally; nine curated research-question rows connect related work within three research areas. The November 7, 2026 snapshot contains 50 source entries, with seven domestic conference entries hidden unless enabled. Preprints and later versions count separately; this is not automatic synchronization with APRL.

Maintain paper metadata in `data.json` and assign each ID to one topic in `research-topics.mjs`. Local figures and provenance are documented in [the page README](static/publication-journey/README.md). These are public source records and editorial groupings; the page adds no new CV records.

Validate with `node scripts/check-publication-journey.mjs`, `node --check static/publication-journey/app.js`, and the normal Hugo build. Preview through `hugo server`, then check the homepage card, topic and domestic-conference filters, paper dialogs, and a narrow viewport. The page needs JavaScript for interaction and offers a publication-list link without it. Google Fonts is optional, with system fallbacks.

## Standalone essays

Standalone essay pages live under `static/<slug>/index.html` and are listed by
`static/js/essays-overlay.js` on `/essays/`. Bump the overlay query version in
`content/essays/index.md` when updating the list.

[Let’s Value Taste. Let’s Build It.](https://gisbi-kim.github.io/value-and-build-taste/)
(October 11, 2026) preserves the author's Korean text and provides a complete
[English translation](https://gisbi-kim.github.io/value-and-build-taste/en/).
Both pages reuse the typography, spacing, and light/dark styles of
`static/taste-productization-shipping/index.html`. Language links work without JavaScript.
Validate paragraph completeness, both language links, responsive rendering, and
the Essays card; the Pages workflow builds the full site with Hugo 0.128.2.

## Notes & Summaries

Source-attributed notes live in `content/notes/<slug>/index.md` and appear
automatically on `/notes/`, newest first. Use the existing title, subtitle,
summary, date, authors, tags, and draft front matter.

[IROS 2026 Talks and Discussions](https://gisbi-kim.github.io/iros-2026-talks/)
is linked from the notes collection using `external_link`. It organizes 26 videos
by topic and provides bilingual notes and links to speakers and videos.

[Research-Community Fit](https://gisbi-kim.github.io/notes/research-community-fit/)
(October 11, 2026) connects Sean Ellis's PMF question to research planning and
lasting use. It distinguishes the source image, public PMF references, the
ChatGPT discussion, and editorial clarifications. The unidentified book image
is not redistributed; its bibliographic source and reuse permission remain
unverified. The product's 40% heuristic is not presented as a paper metric.

## License

Code: [MIT](LICENSE).
Content (posts, figures, manuscripts) © Giseop Kim, all rights reserved unless otherwise noted.

## Contact

🌐 [gisbi-kim.github.io](https://gisbi-kim.github.io/) ·
🐙 [@gisbi-kim](https://github.com/gisbi-kim) ·
🏛 APRL @ DGIST
