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

The header's **CV** menu opens the [current CV PDF](https://github.com/gisbi-kim/cv-giseopkim/blob/main/main.pdf), maintained in the separate CV repository.

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

## License

Code: [MIT](LICENSE).
Content (posts, figures, manuscripts) © Giseop Kim, all rights reserved unless otherwise noted.

## Contact

🌐 [gisbi-kim.github.io](https://gisbi-kim.github.io/) ·
🐙 [@gisbi-kim](https://github.com/gisbi-kim) ·
🏛 APRL @ DGIST
