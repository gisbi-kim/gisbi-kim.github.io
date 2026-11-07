# Giseop Kim — Publication Journey

A standalone research page for Giseop Kim at [Publication Journey](https://gisbi-kim.github.io/publication-journey/), with an editorial layout inspired by [Waymo's Waypoint blog](https://waymo.com/blog/). The first Research & Teaching card on the homepage opens this page.

The updated design keeps the broad gray masthead, large type, section rules, and blue accents. The interactive research timeline leads the page, followed by the compact **Places. Maps. Memory.** cards (Scan Context, LT-mapper, LT-Mem), then the full research index. Timeline bands are neutral gray/white; markers use blue for LiDAR, orange for Vision, violet for Radar, and green for Multimodal, with no marker shadows. Lead-author works use solid fills; co-author works use white fills with thick colored outlines. The larger color legend and explicit modality text in tooltips aid identification. The five distinct publication shapes are retained. Top and index search fields stay synchronized; Enter in the top search jumps to results.

The masthead is text-only. Research figures come from the user's public project pages and APRL publication assets. Waymo's logo, photography, and proprietary font are not included. DM Sans and Roboto Mono provide the typography. Source images are displayed as CSS-sized local assets.

## Preview and validation

This directory is published unchanged by Hugo. From the repository root, run `hugo server` and open `/publication-journey/` on its local preview URL. No page-specific dependencies or build step are required. JavaScript modules must be served over HTTP.

```sh
node --check static/publication-journey/app.js
node scripts/check-publication-journey.mjs
hugo --gc --minify
```

## What is included

- 50 research entries from 2018–2026, including journal and conference papers, preprints, workshops, domestic publications, and one book chapter. The default graph and index show 43 works; the seven domestic conference papers are included only when the Domestic conf toggle is on. Toggling recomputes the layout and counts while preserving other filters. Reset filters and page reload return to the default scope. Domestic journal entries remain in the default view.
- 32 entries with Giseop Kim explicitly listed as first/co-first or corresponding author.
- Three curated themes: Place Recognition, Mapping & Perception, and Embodied Autonomy.
- Nine curated research-question rows inside those themes. Related work occupies the same row across years; selecting a row highlights its papers, shows the research question and year range, and filters the publication list. This combines with modality, author-role, type, search, and domestic-conference controls. Selecting the same row again, Clear topic, or Reset filters clears the topic selection.
- Topic and author-role filters, title/author/venue search, publication-type filter, paper dialogs, source links, and awards.
- Keyboard-operable dots and dialogs. On small screens the chart scrolls horizontally while the rest of the page fits the viewport.
- Distinct publication shapes: circle for journals, diamond for conferences, triangle for workshops/domestic entries, hexagon for preprints, and square for book chapters. Domestic entries use the triangle regardless of journal/conference subtype. Chart and legend share the same shape renderer.
- A dotted trail connecting six selected milestones. This is an editorial selection, not a causal dependency graph.

## Source and adaptation

Read and adapted the actual implementation of [Hyesu Jang's research graph](https://github.com/hyesu-jang/hyesu-jang.github.io/blob/main/assets/js/research-graph.js), its [Liquid template](https://github.com/hyesu-jang/hyesu-jang.github.io/blob/main/_includes/research_graph.liquid), [SCSS](https://github.com/hyesu-jang/hyesu-jang.github.io/blob/main/_sass/_research-graph.scss), and [journey configuration](https://github.com/hyesu-jang/hyesu-jang.github.io/blob/main/_data/research_journey.yml). Reference repository revision inspected: `8e29acc04f26ec1768b499290096646871813d98`.

The reference reads rendered Jekyll publication markup and draws an SVG with domain bands, sensor colors, author-role fills, type-dependent sizes, award markers, and a smooth dotted trail. This version uses a local structured data snapshot, new theme bands, year-bounded collision avoidance, search, and persistent detail dialogs. The reference repository's MIT license is retained in `THIRD_PARTY_LICENSE.txt`.

Content was fetched on **November 7, 2026** from:

- [APRL publications source](https://github.com/team-aprl/team-aprl.github.io/blob/main/publications.html), blob `763e75b9dc836a90c7b2e0a90431add5ad048236`.
- [Personal awards data](https://github.com/gisbi-kim/gisbi-kim.github.io/blob/master/static/data/profile-sections.json).
- [Personal homepage](https://gisbi-kim.github.io/) for biography and career dates.

Titles, authors, author-role markers, venues, publication types, and links follow the source entries. Theme and modality labels are editorial classifications for this visualization. The count is source entries rather than deduplicated intellectual works: a workshop and later full paper remain separate. Years follow the APRL list; for example, HeLiPR is grouped under 2023 there, although its displayed journal bibliographic information refers to a later volume. Dates are not inferred when only a year is given. Horizontal bands encode years; vertical rows encode curated research questions. Month is only a secondary ordering cue within a year/topic group, not a spatial axis. Each group is centered and packed without overlapping click targets; a second line is used only when needed. Year widths are unequal, with 2026 expanded for readability. The chart explains both the thematic rows and unequal year widths.

This is a snapshot, not an automatic live synchronization. It is hosted on the personal homepage; the APRL publication source remains independently maintained. Images are local snapshots of the user's public research figures and portrait. Google Fonts is optional; system fonts are used if it cannot load.

## Files

| File | Purpose |
| --- | --- |
| `index.html`, `styles.css` | Page structure and responsive presentation |
| `app.js` | Filters, chart rendering, research index, dialogs |
| `geometry.mjs` | Collision-free layout constrained by year and research question; trail geometry |
| `research-topics.mjs` | Explicit editorial topic assignments and research-question descriptions |
| `data.json` | Editable research records, awards, and milestone selections |
| `assets/` | Local research figures and portrait |

To edit classifications or add a paper, edit `data.json`. Every paper needs a unique `id`, a supported `lane` and `lens`, year/type/author metadata, and its source link. Assign its ID to exactly one matching-lane topic in `research-topics.mjs`. These groupings are editorial interpretations of the source titles and scope, not embedding distances or claims that one paper derives from another. Keep the `trail` identifiers in sync. The commands above check JavaScript syntax, data/topic coverage, local images, trail references, and layout bounds and collisions.

## Validation history

Verified 50 unique records, source author inclusion, 32 lead-author entries, all six trail references, local image files, and zero overlapping publication markers. Browser checks cover topic and author filters, research search, empty search results, publication-type filtering, detail dialogs, and a 390px mobile layout. The editorial redesign was additionally checked for featured-story dialogs, synchronized search fields, Enter-to-results navigation, all five marker shapes (7 circles, 19 diamonds, 19 triangles, 4 hexagons, 1 square), and mobile page overflow. No application console errors were observed during the checked flows. External links are preserved from the source; their destinations were not all independently audited.

The research-question layout was checked for exactly one matching-lane topic assignment per paper, year/topic bounds, all trail references, and non-overlapping hit targets in both the 43-work default and 50-work domestic-enabled views. Browser checks covered topic highlighting, question/year-range summaries, combined topic/modality/type filters, keyboard selection, domestic toggling, clearing/resetting, paper dialogs, and mobile overflow.
