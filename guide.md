# Site Editing Guide

This guide records the local rules for maintaining `gisbi-kim.github.io`.
Use it when cloning the repository later and adding or editing profile sections, especially publications.

## Workflow

- Edit locally first and verify at `http://127.0.0.1:1313/`.
- Do not push until the local page has been checked and the user explicitly asks to push.
- The local Hugo server is expected to run through Docker:

```powershell
docker run -d --name gisbi-hugo-server -p 1313:1313 -v "${PWD}:/src" -w /src hugomods/hugo:0.128.2 hugo server --bind 0.0.0.0 --port 1313 --baseURL http://127.0.0.1:1313/ --disableFastRender --poll 700ms
```

- Before committing, run:

```powershell
python -m json.tool static\data\profile-sections.json > $null
node --check static\js\profile-sections.js
docker run --rm -v "${PWD}:/src" -w /src hugomods/hugo:0.128.2 hugo --minify --destination /tmp/gisbi-build --cleanDestinationDir
```

- Exclude local helper or temporary files such as `scripts/` and `tmp-download-png-contact-sheet.jpg` unless they are intentionally part of the site.

## Data Source

- The main profile sections are rendered from `static/data/profile-sections.json`.
- The renderer is `static/js/profile-sections.js`.
- The relevant styling is in `assets/scss/custom.scss`.
- Do not reintroduce Google Sheet embeds or source-sheet links on the public page.

## Publications Rules

Publication rows live under:

```json
sections.publications.rows
```

Use these columns consistently:

- `Year`
- `Types`: `International` or `Domestic`
- `Category`: `Journal`, `Conference`, `Workshop`, `Book Chap.`, or another deliberate category
- `Venue/Book Title`
- `Title`
- `Authors`
- `Journal Info`
- `Collaboration`
- `Note`
- `Download Link`
- `Website`
- `Figure`

### Authors

- Use `*` for first author.
- Use `†` for corresponding author.
- If `Giseop Kim†` is the last author, the publication should receive the `APRL` badge.
- Domestic Korean publications should use the Korean name `김기섭`, not `Giseop Kim`.
- If `김기섭†` is the last author in a domestic paper, the publication should also receive the `APRL` badge.
- The renderer bolds `Giseop Kim` and `김기섭` in author lines.
- Be careful with PowerShell encoding. If a dagger becomes `?`, replace it with Unicode `\u2020` / `†`.

### Badges and Filters

- `Year`, `Types`, and `Category` are rendered as colored badges before the title.
- The publication filters include:
  - Region: `International`, `Domestic`
  - Type: `Journal`, `Conference`, `Workshop`, `Book`
  - APRL: `APRL`, `Non-APRL`
- Default publication filter is `International`.
- Summary venue chips should use short names where possible, for example `ICRA`, `IROS`, `ICLR`, `ICCV`, `RSS`, `RA-L`, `ICRA WS`, `IROS WS`.
- Clicking summary chips should highlight/filter without making the summary chip list disappear.

### Venue and Details

- Keep `Venue/Book Title` as the full venue/workshop/book title inside each card.
- Use `Website` for project, dataset, workshop, or venue pages.
- Use `Download Link` for paper PDFs or equivalent paper material.
- `Chapter 8: LiDAR SLAM` should label its `Download Link` as `Book (PDF)`, not `Paper`.
- `Journal Info` is for volume, issue, pages, ISSN, DOI, and similar journal metadata.
- `Note` is for short paper-status notes such as `non-archival` or `non-archival; Best Poster Award`.
- `Collaboration` should contain the collaborator only, because the UI labels it as `Collaboration with`.

### Workshop Publications

- Workshop papers use `Category: Workshop`.
- Non-archival workshop papers should include `Note: non-archival`.
- If the workshop has a page, add it under `Website`.
- Examples:
  - `MM-SpatialAI Workshop, ICRA 2026 WS` -> `https://xingxingzuo.github.io/MM-SpatialAI/`
  - `Human-aware Embodied AI (HEAI), IROS 2025 WS` -> `https://heai-iros25-workshop.github.io/`
  - `The 15th Workshop on Planning, Perception and Navigation for Intelligent Vehicles (PPNIV), IROS 2025 WS` -> `https://iros25-ppniv.github.io/`

### Figures

- Each publication should have a `Figure`.
- Store publication figures under:

```text
static/images/publications/
```

- Use lowercase English slug filenames, for example:

```text
static/images/publications/two-stage-hint-object-alignment-text-pointcloud.png
```

- `Figure` values should be site-root paths:

```json
"/images/publications/two-stage-hint-object-alignment-text-pointcloud.png"
```

- Publication cards use a 7:3 text-to-figure layout.
- Clicking a figure should open the image in a new tab.
- If a figure is missing temporarily, use `/images/publication-dummy.svg`.

## Papers Before DGIST

- Page: `content/papers-before-dgist/index.md`
- Title: `Papers before DGIST (at KAIST)`.
- Keep the HTML table intact.
- Do not insert blank lines inside `<tbody>` between `<tr>` rows, because Hugo/Goldmark can escape later rows as raw text.
- Numbering is reverse chronological: latest/top row has the largest index.
- Group rows by year using separator rows.
- Show `1st author` only where needed in the `Role` column.

## Essays

- Full essay list is on `/essays/`.
- The home page should keep only the Essays button/link, not the full essay grid.
- Essays can have comma-separated `Tags`; these are rendered as filter chips.
- Remove empty, obsolete, or trivial posts from the essay grid rather than showing all blog archive entries.

## Talks, Awards, Service, Teaching

- Invited talks should show `Date`, `Event/Session`, `Host / Venue`, and `Invitation From` on separate lines.
- Talk type badges are inferred as `University`, `Research Institute`, `Government`, or `Conference`.
- Teaching cards can show course code as a colored badge to the left of the course title.
- Main teaching courses are highlighted:
  - `Advancded mobile system (고등 모빌리티공학)`
  - `Introduction to Artificial Intelligence (인공지능개론)`
- Awards should show award, recipient, event, and date as meta fields rather than using the date as the title.

## Section Links

- Home section headings have a small `#` copy-link button.
- Clicking the button should:
  - update the current URL hash, e.g. `#publications`
  - copy the same section URI to the clipboard
- Keep this behavior in `static/js/profile-sections.js`.

## Deployment

- GitHub Pages deploys automatically on pushes to `master`.
- After pushing, check the workflow:

```powershell
gh run list --repo gisbi-kim/gisbi-kim.github.io --workflow hugo.yml --limit 2
```

- Confirm the latest run is `completed` and `success`.
