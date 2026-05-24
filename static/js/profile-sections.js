(function () {
  const linkColumns = new Set(["Download Link", "Slide Link", "Lecture Material Links", "Link", "Tutorial Site", "Explorer", "Event Link", "Website"]);
  const compactColumns = new Set(["Year", "Date", "Published Date", "Semester", "Code", "Types", "Category"]);
  const linkLabels = {
    "Download Link": "Paper",
    "Lecture Material Links": "Material",
    "Link": "Blog",
    "Tutorial Site": "Tutorial Site",
    "Explorer": "Explorer",
    "Event Link": "Event",
    "Website": "Website",
  };
  const publicationBadgeColumns = ["Year", "Types", "Category"];
  const publicationFilters = {
    type: [
      { value: "all", label: "All" },
      { value: "International", label: "International" },
      { value: "Domestic", label: "Domestic" },
    ],
    category: [
      { value: "all", label: "All" },
      { value: "Journal", label: "Journal" },
      { value: "Conference", label: "Conference" },
      { value: "Workshop", label: "Workshop" },
      { value: "Book", label: "Book" },
    ],
    aprl: [
      { value: "all", label: "All" },
      { value: "yes", label: "APRL" },
      { value: "no", label: "Non-APRL" },
    ],
  };

  const state = {
    data: null,
    filters: {},
  };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function isUrl(value) {
    return /^https?:\/\//i.test(String(value || "").trim());
  }

  function hostLabel(value) {
    try {
      return new URL(value).hostname.replace(/^www\./, "");
    } catch (_error) {
      return "Open";
    }
  }

  function renderValue(column, value, labelOverride) {
    if (!value) return "";
    const text = String(value).trim();
    if (linkColumns.has(column) && isUrl(text)) {
      const host = hostLabel(text);
      const label = labelOverride || linkLabels[column] || (host.includes("dropbox.com") ? "Material" : `Open ${host}`);
      return `<a class="profile-data-link" href="${escapeHtml(text)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`;
    }
    if (isUrl(text)) {
      return `<a href="${escapeHtml(text)}" target="_blank" rel="noopener">${escapeHtml(text)}</a>`;
    }
    return escapeHtml(text);
  }

  function renderAuthors(value) {
    return escapeHtml(value)
      .replace(/\bGiseop Kim\b/g, "<strong>Giseop Kim</strong>")
      .replace(/김기섭/g, "<strong>김기섭</strong>");
  }

  function renderTeachingCourse(value) {
    const text = String(value || "").trim();
    const match = text.match(/^(.*?)\s*\(([^()]*)\)$/);
    if (!match) return escapeHtml(text);
    return `${escapeHtml(match[1])}<br><span class="profile-data-course-korean">(${escapeHtml(match[2])})</span>`;
  }

  function renderTeachingTa(value) {
    return escapeHtml(value)
      .replace(
        /\bBokeon Suh\b/g,
        '<a href="https://bksuh.github.io/" target="_blank" rel="noopener">Bokeon Suh</a>'
      )
      .replace(
        /\bJiseon Kim\b/g,
        '<a href="https://scholar.google.com/citations?hl=en&amp;user=KK3SC5sAAAAJ" target="_blank" rel="noopener">Jiseon Kim</a>'
      );
  }

  function renderRecipient(value) {
    return escapeHtml(value).replace(
      /\bJiseon Kim\b/g,
      '<a href="https://scholar.google.com/citations?hl=en&amp;user=KK3SC5sAAAAJ" target="_blank" rel="noopener">Jiseon Kim</a>'
    );
  }

  function renderEvent(row) {
    const event = String(row.Event || "").trim();
    const link = String(row["Event Link"] || "").trim();
    if (link && isUrl(link)) {
      return `<a href="${escapeHtml(link)}" target="_blank" rel="noopener">${escapeHtml(event)}</a>`;
    }
    return escapeHtml(event);
  }

  function renderTalkInvitation(value) {
    return escapeHtml(value)
      .replace(
        /\bDaeun Song\b/g,
        '<a href="https://robotics.ewha.ac.kr/" target="_blank" rel="noopener">Daeun Song</a>'
      )
      .replace(
        /\bWansoo Kim\b/g,
        '<a href="https://harco.hanyang.ac.kr/" target="_blank" rel="noopener">Wansoo Kim</a>'
      )
      .replace(
        /\bSunglok Choi\b/g,
        '<a href="https://mint-lab.github.io/" target="_blank" rel="noopener">Sunglok Choi</a>'
      )
      .replace(
        /\bHyeonwoo Yu\b/g,
        '<a href="https://sites.google.com/view/hyeonwooyu/" target="_blank" rel="noopener">Hyeonwoo Yu</a>'
      )
      .replace(
        /\bYounghun Cho\b/g,
        '<a href="https://dudgnsrj.github.io/" target="_blank" rel="noopener">Younghun Cho</a>'
      )
      .replace(
        /\bTae-Hyuk Kwon\b/g,
        '<a href="https://kwon.kaist.ac.kr/" target="_blank" rel="noopener">Tae-Hyuk Kwon</a>'
      );
  }

  function publicationFigure(row) {
    const figure = String(row.Figure || "/images/publication-dummy.svg").trim();
    const alt = `Figure for ${String(row.Title || "publication").trim()}`;
    return `<a class="profile-data-publication-figure" href="${escapeHtml(figure)}" target="_blank" rel="noopener"><img src="${escapeHtml(figure)}" alt="${escapeHtml(alt)}" loading="lazy"></a>`;
  }

  function cardFigure(row, fallback, label) {
    const figure = String(row.Figure || fallback).trim();
    const alt = `Figure for ${String(row.Project || row.Title || label).trim()}`;
    return `<a class="profile-data-publication-figure" href="${escapeHtml(figure)}" target="_blank" rel="noopener"><img src="${escapeHtml(figure)}" alt="${escapeHtml(alt)}" loading="lazy"></a>`;
  }

  function titleColumn(columns) {
    return columns.find((column) => ["Project", "Title", "Course"].includes(column)) || columns[0];
  }

  function metaColumns(columns, primary) {
    return columns.filter((column) => column !== primary && !linkColumns.has(column));
  }

  function actionColumns(columns) {
    return columns.filter((column) => linkColumns.has(column));
  }

  function visibleRows(rows) {
    return rows.filter((row) => !Object.values(row).some((value) => String(value || "").trim() === "EOL"));
  }

  function filtersFor(key) {
    if (!state.filters[key]) {
      state.filters[key] = {
        type: key === "publications" ? "International" : "all",
        category: key === "publications" ? ["Journal", "Conference", "Book"] : "all",
        aprl: "all",
        year: "all",
        venue: "all",
        tag: "all",
      };
    }
    return state.filters[key];
  }

  function selectedCategories(filters) {
    return Array.isArray(filters.category) ? filters.category : [];
  }

  function publicationBaseMatch(row, filters) {
    const typeMatch = filters.type === "all" || row.Types === filters.type;
    const category = String(row.Category || "");
    const categories = selectedCategories(filters);
    const categoryMatch =
      filters.category === "all" || !categories.length || categories.some((selected) => category.includes(selected));
    const aprl = isAprlPublication(row);
    const aprlMatch = filters.aprl === "all" || (filters.aprl === "yes" ? aprl : !aprl);
    return typeMatch && categoryMatch && aprlMatch;
  }

  function applyPublicationFilters(rows, filters) {
    return rows.filter((row) => {
      const baseMatch = publicationBaseMatch(row, filters);
      const yearMatch = filters.year === "all" || publicationYear(row) === filters.year;
      const venueMatch = filters.venue === "all" || venueShortName(row["Venue/Book Title"]) === filters.venue;
      return baseMatch && yearMatch && venueMatch;
    });
  }

  function applyPublicationBaseFilters(rows, filters) {
    return rows.filter((row) => publicationBaseMatch(row, filters));
  }

  function essayTags(row) {
    return String(row.Tags || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  function applyEssayFilters(rows, filters) {
    return filters.tag === "all" ? rows : rows.filter((row) => essayTags(row).includes(filters.tag));
  }

  function talkType(row) {
    const talkContext = `${row["Event/Session"] || ""} ${row["Invitation From"] || ""}`;
    if (/(KRoC|ICEIC|Conference|Summer School|Award Session)/i.test(talkContext)) return "Conference";
    if (/Hyundai Motor Company|Mobile Robotics Team/i.test(`${row["Host / Venue"] || ""} ${row["Invitation From"] || ""}`)) return "Industry";
    if (/Daegu's Innovation, Moving Towards a Robot and Future Mobility City/i.test(String(row.Title || ""))) return "Public Sector";
    if (/^Prof\./i.test(String(row["Invitation From"] || "").trim())) return "University";
    if (/^Dr\./i.test(String(row["Invitation From"] || "").trim())) return "Research Institute";
    return "Other";
  }

  function applyTalkFilters(rows, filters) {
    return rows.filter((row) => {
      const matchesType = !filters.talkType || filters.talkType === "all" || talkType(row) === filters.talkType;
      const matchesYear = !filters.talkYear || filters.talkYear === "all" || rowYear({ title: "Invited Talks" }, row) === filters.talkYear;
      return matchesType && matchesYear;
    });
  }

  function renderSegmentedFilter(key, group, label, options, activeValue) {
    const buttons = options
      .map((option) => {
        const active = option.value === activeValue ? " is-active" : "";
        const pressed = option.value === activeValue ? "true" : "false";
        return `<button class="profile-data-filter-button${active}" type="button" data-profile-key="${escapeHtml(key)}" data-profile-filter="${escapeHtml(group)}" data-profile-filter-value="${escapeHtml(option.value)}" aria-pressed="${pressed}">${escapeHtml(option.label)}</button>`;
      })
      .join("");
    return `<div class="profile-data-filter-group"><span>${escapeHtml(label)}</span><div class="profile-data-filter-buttons">${buttons}</div></div>`;
  }

  function renderMultiSelectFilter(key, group, label, options, activeValue) {
    const values = Array.isArray(activeValue) ? activeValue : [];
    const buttons = options
      .map((option) => {
        const active = option.value === "all" ? activeValue === "all" : activeValue !== "all" && values.includes(option.value);
        return `<button class="profile-data-filter-button${active ? " is-active" : ""}" type="button" data-profile-key="${escapeHtml(key)}" data-profile-filter="${escapeHtml(group)}" data-profile-filter-value="${escapeHtml(option.value)}" data-profile-filter-multi="true" aria-pressed="${active ? "true" : "false"}">${escapeHtml(option.label)}</button>`;
      })
      .join("");
    return `<div class="profile-data-filter-group"><span>${escapeHtml(label)}</span><div class="profile-data-filter-buttons">${buttons}</div></div>`;
  }

  function renderPublicationFilters(key, filters) {
    return `<div class="profile-data-filters" aria-label="Publication filters">
      ${renderSegmentedFilter(key, "type", "Region", publicationFilters.type, filters.type)}
      ${renderMultiSelectFilter(key, "category", "Type", publicationFilters.category, filters.category)}
      ${renderSegmentedFilter(key, "aprl", "APRL", publicationFilters.aprl, filters.aprl)}
    </div>`;
  }

  function renderEssayFilters(key, rows, filters) {
    const tags = Array.from(new Set(rows.flatMap(essayTags))).sort((a, b) => a.localeCompare(b));
    const options = [{ value: "all", label: "All" }, ...tags.map((tag) => ({ value: tag, label: tag }))];
    return `<div class="profile-data-filters" aria-label="Essay filters">
      ${renderSegmentedFilter(key, "tag", "Tag", options, filters.tag)}
    </div>`;
  }

  function renderTalkFilters(key, rows, filters) {
    const preferred = ["Conference", "University", "Research Institute", "Industry", "Public Sector", "Other"];
    const present = new Set(rows.map(talkType));
    const options = [{ value: "all", label: "All" }, ...preferred.filter((type) => present.has(type)).map((type) => ({ value: type, label: type }))];
    const years = Array.from(new Set(rows.map((row) => rowYear({ title: "Invited Talks" }, row)).filter(Boolean))).sort((a, b) => Number(b) - Number(a));
    const yearOptions = [{ value: "all", label: "All" }, ...years.map((year) => ({ value: year, label: year }))];
    return `<div class="profile-data-filters" aria-label="Invited talk filters">
      ${renderSegmentedFilter(key, "talkYear", "Year", yearOptions, filters.talkYear || "all")}
      ${renderSegmentedFilter(key, "talkType", "Type", options, filters.talkType || "all")}
    </div>`;
  }

  function countBy(rows, column) {
    return rows.reduce((counts, row) => {
      const value = String(row[column] || "").trim();
      if (!value) return counts;
      counts[value] = (counts[value] || 0) + 1;
      return counts;
    }, {});
  }

  function sortedEntries(counts) {
    return Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }

  function publicationYear(row) {
    const match = String(row.Year || "").match(/\d{4}/);
    return match ? match[0] : String(row.Year || "").trim();
  }

  function countPublicationYears(rows) {
    return rows.reduce((counts, row) => {
      const year = publicationYear(row);
      if (!year) return counts;
      counts[year] = (counts[year] || 0) + 1;
      return counts;
    }, {});
  }

  function venueShortName(venue) {
    const text = String(venue || "").replace(/\s+/g, " ").trim();
    if (text.includes("Robotics: Science and Systems")) return "RSS";
    if (text.includes("IFAC")) return "IFAC";
    if (text.includes("Robotics and Automation Letters")) return "RA-L";
    if (text.includes("International Conference on Robotics and Automation")) return "ICRA";
    if (text.includes("International Conference on Intelligent Robots and Systems")) return "IROS";
    if (text.includes("International Conference on Computer Vision")) return "ICCV";
    if (text.includes("International Conference on Learning Representations")) return "ICLR";
    if (text.includes("ICRA 2026 WS")) return "ICRA WS";
    if (text.includes("IROS 2025 WS")) return "IROS WS";
    if (text.includes("SLAM Handbook")) return "SLAM Handbook";
    return text;
  }

  function renderPublicationMetaValue(column, row) {
    if (column === "Authors") return renderAuthors(row[column]);
    if (column === "Venue/Book Title") return escapeHtml(String(row[column] || "").replace(/\s+/g, " ").trim());
    return renderValue(column, row[column]);
  }

  function metaLabel(column) {
    if (column === "Collaboration") return "Collaboration with";
    return column;
  }

  function isAprlPublication(row) {
    return /(?:\bGiseop Kim|김기섭)\s*[*†]*\s*$/.test(String(row.Authors || "").trim());
  }

  function countVenues(rows) {
    return rows.reduce((counts, row) => {
      const venue = venueShortName(row["Venue/Book Title"]);
      if (!venue) return counts;
      counts[venue] = (counts[venue] || 0) + 1;
      return counts;
    }, {});
  }

  function renderSummaryButton(key, group, value, label, count, activeValue) {
    const active = value === activeValue ? " is-active" : "";
    const pressed = value === activeValue ? "true" : "false";
    return `<button class="profile-data-summary-chip${active}" type="button" data-profile-key="${escapeHtml(key)}" data-profile-filter="${escapeHtml(group)}" data-profile-filter-value="${escapeHtml(value)}" data-profile-filter-toggle="true" aria-pressed="${pressed}"><b>${escapeHtml(label)}</b>${escapeHtml(count)}</button>`;
  }

  function renderPublicationSummary(key, rows, filters) {
    if (!rows.length) {
      return '<div class="profile-data-summary"><span>No publications match the current filters.</span></div>';
    }
    const byYear = sortedEntries(countPublicationYears(rows))
      .sort((a, b) => Number(b[0]) - Number(a[0]) || b[1] - a[1])
      .map(([year, count]) => renderSummaryButton(key, "year", year, year, count, filters.year))
      .join("");
    const byVenue = sortedEntries(countVenues(rows))
      .map(([venue, count]) => renderSummaryButton(key, "venue", venue, venue, count, filters.venue))
      .join("");
    return `<div class="profile-data-summary" aria-label="Publication summary">
      <div><strong>Year</strong>${byYear}</div>
      <div><strong>Venue</strong>${byVenue}</div>
    </div>`;
  }

  function renderFundedSummary(rows) {
    const currentRows = rows.filter((row) => String(row.Status || "").trim() === "Current");
    const totals = currentRows.reduce(
      (acc, row) => {
        const role = String(row.Role || "");
        const piMatch = role.match(/(\d+)\s*책/);
        const coMatch = role.match(/(\d+)\s*공/);
        const pi = piMatch ? Number(piMatch[1]) : 0;
        const co = coMatch ? Number(coMatch[1]) : 0;
        acc.pi += pi;
        acc.co += pi + co;
        return acc;
      },
      { pi: 0, co: 0 }
    );
    return `<div class="profile-data-summary profile-data-summary-funded" aria-label="Current funded project summary">
      <div><strong>Current</strong><span class="profile-data-summary-chip"><b>${totals.pi}책</b>${totals.co}공</span></div>
    </div>`;
  }

  function rowYear(section, row) {
    if (section.title === "Publications/Patents") return publicationYear(row);
    if (section.title === "Teaching") return String(row.Year || "").trim();
    if (section.title === "Funded Projects") return String(row.Status || "").trim();
    const date = section.title === "Essays" ? row["Published Date"] : row.Date;
    const match = String(date || "").match(/\d{4}/);
    return match ? match[0] : "";
  }

  function renderCards(section) {
    const columns = section.columns || [];
    const isAwardsSection = section.title === "Awards";
    const primary = isAwardsSection ? "" : titleColumn(columns);
    const actions = actionColumns(columns);
    const isPublicationSection = section.title === "Publications/Patents";
    const isTalksSection = section.title === "Invited Talks";
    const isTeachingSection = section.title === "Teaching";
    const isEssaysSection = section.title === "Essays";
    const isPersonalProjectsSection = section.title === "Personal Projects";
    const isFundedProjectsSection = section.title === "Funded Projects";
    const showYearSeparators = ["Publications/Patents", "Invited Talks", "Awards", "Academic Service", "Teaching", "Essays", "Funded Projects"].includes(section.title);
    const metas = metaColumns(columns, primary).filter((column) => {
      if (isPublicationSection && ["Types", "Category"].includes(column)) return false;
      if (isEssaysSection && column === "Tags") return false;
      if (isFundedProjectsSection && column === "Status") return false;
      if (isFundedProjectsSection && column === "Figure") return false;
      return true;
    });
    let previousYear = "";

    return section.rows
      .map((row) => {
        const year = showYearSeparators ? rowYear(section, row) : "";
        const separator =
          showYearSeparators && year && year !== previousYear
            ? `<div class="profile-data-year-separator"><span>${escapeHtml(year)}</span></div>`
            : "";
        if (year) previousYear = year;
        const publicationBadges = isPublicationSection
          ? publicationBadgeColumns
              .filter((column) => row[column])
              .map((column) => `<span class="profile-data-badge profile-data-badge-${column.toLowerCase()}">${renderValue(column, row[column])}</span>`)
              .join("")
          : "";
        const aprlBadge =
          isPublicationSection && isAprlPublication(row)
            ? '<span class="profile-data-badge profile-data-badge-aprl">APRL</span>'
            : "";
        const essayTagBadges =
          isEssaysSection && row.Tags
            ? String(row.Tags)
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
                .map((tag) => `<span class="profile-data-badge profile-data-badge-essay-tag">${escapeHtml(tag)}</span>`)
                .join("")
            : "";
        const currentTalkType = isTalksSection ? talkType(row) : "";
        const talksBadge =
          currentTalkType === "University"
            ? '<span class="profile-data-badge profile-data-badge-university">University</span>'
            : "";
        const researchInstituteBadge =
          currentTalkType === "Research Institute"
            ? '<span class="profile-data-badge profile-data-badge-research-institute">Research Institute</span>'
            : "";
        const governmentBadge =
          currentTalkType === "Public Sector"
            ? '<span class="profile-data-badge profile-data-badge-government">Public Sector</span>'
            : "";
        const conferenceBadge = currentTalkType === "Conference" ? '<span class="profile-data-badge profile-data-badge-conference">Conference</span>' : "";
        const industryBadge = currentTalkType === "Industry" ? '<span class="profile-data-badge profile-data-badge-industry">Industry</span>' : "";
        const fundedStatusBadge =
          isFundedProjectsSection && row.Status
            ? `<span class="profile-data-badge profile-data-badge-funded-${String(row.Status).toLowerCase()}">${escapeHtml(String(row.Status))}</span>`
            : "";
        const isMainTeaching =
          isTeachingSection &&
          /(Advancded mobile system|Introduction to Artificial Intelligence)/i.test(String(row.Course || ""));
        const teachingCodeBadge =
          isTeachingSection && row.Code
            ? `<span class="profile-data-badge profile-data-badge-code">${renderValue("Code", row.Code)}</span>`
            : "";
        const mainTeachingBadge = isMainTeaching ? '<span class="profile-data-badge profile-data-badge-main">Main</span>' : "";
        const badgeHtml = `${publicationBadges}${aprlBadge}${essayTagBadges}${conferenceBadge}${talksBadge}${researchInstituteBadge}${industryBadge}${governmentBadge}${fundedStatusBadge}${teachingCodeBadge}${mainTeachingBadge}`;
        const metaHtml = metas
          .filter((column) => row[column] && !(isTeachingSection && column === "Code"))
          .map((column) => {
            const compact = compactColumns.has(column) ? " profile-data-meta-compact" : "";
            const author = isPublicationSection && column === "Authors" ? " profile-data-meta-author" : "";
            const fullLine = isTalksSection && ["Date", "Event/Session", "Host / Venue", "Invitation From"].includes(column) ? " profile-data-meta-full" : "";
            const value = isPublicationSection
              ? renderPublicationMetaValue(column, row)
              : isAwardsSection && column === "Recipient"
                ? renderRecipient(row[column])
              : isAwardsSection && column === "Event"
                ? renderEvent(row)
              : isTeachingSection && column === "TA"
                ? renderTeachingTa(row[column])
                : isTalksSection && column === "Invitation From"
                  ? renderTalkInvitation(row[column])
                : renderValue(column, row[column]);
            return `<span class="profile-data-meta${compact}${author}${fullLine}"><b>${escapeHtml(metaLabel(column))}</b>${value}</span>`;
          })
          .join("");
        const actionHtml = actions
          .filter((column) => row[column] && !(isAwardsSection && column === "Event Link"))
          .map((column) =>
            renderValue(
              column,
              row[column],
              isPublicationSection && column === "Download Link" && row.Title === "Chapter 8: LiDAR SLAM"
                ? "Book (PDF)"
                : isPersonalProjectsSection && column === "Link"
                  ? "Website"
                  : ""
            )
          )
          .join(", ");
        const actionsBlock = actionHtml ? `<div class="profile-data-action">${actionHtml}</div>` : "";
        const hasCardFigure = isPublicationSection || isFundedProjectsSection;
        const fundedStatusClass =
          isFundedProjectsSection && row.Status
            ? ` profile-data-card-funded-${String(row.Status).toLowerCase()}`
            : "";
        const cardClass = `profile-data-card${hasCardFigure ? " profile-data-card-publication" : ""}${fundedStatusClass}${isMainTeaching ? " profile-data-card-main" : ""}`;
        const titleValue = isTeachingSection && primary === "Course" ? renderTeachingCourse(row[primary]) : renderValue(primary, row[primary]);
        const titleRow = primary ? `<div class="profile-data-title-row">${badgeHtml}<h3>${titleValue}</h3></div>` : "";
        const contentBlock = `<div class="profile-data-publication-body">
            ${titleRow}
            <div class="profile-data-meta-row">${metaHtml}</div>
            ${actionsBlock}
          </div>`;
        return `${separator}<article class="${cardClass}">
          ${contentBlock}
          ${isPublicationSection ? publicationFigure(row) : ""}
          ${isFundedProjectsSection ? cardFigure(row, "/images/publication-dummy.svg", "funded project") : ""}
        </article>`;
      })
      .join("");
  }

  function renderTable(section) {
    const columns = section.columns || [];
    const header = columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("");
    const rows = section.rows
      .map((row) => `<tr>${columns.map((column) => `<td>${renderValue(column, row[column])}</td>`).join("")}</tr>`)
      .join("");
    return `<div class="profile-data-table-wrap"><table class="profile-data-table"><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  function renderMount(mount) {
    const key = mount.getAttribute("data-profile-section");
    const section = state.data && state.data.sections && state.data.sections[key];
    if (!section) {
      mount.innerHTML = '<p class="profile-data-status">Data is not available.</p>';
      return;
    }

    const view = mount.getAttribute("data-profile-view") || "cards";
    const updatedAt = state.data.updatedAt ? new Date(state.data.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "";
    const filters = filtersFor(key);
    const baseRows = visibleRows(section.rows);
    const rows =
      key === "publications"
        ? applyPublicationFilters(baseRows, filters)
        : key === "talks"
          ? applyTalkFilters(baseRows, filters)
        : key === "essays"
          ? applyEssayFilters(baseRows, filters)
          : baseRows;
    const summaryRows = key === "publications" ? applyPublicationBaseFilters(baseRows, filters) : rows;
    const renderedSection = { ...section, rows };
    const countText = (key === "publications" || key === "talks" || key === "essays") && rows.length !== baseRows.length ? `${rows.length} of ${baseRows.length}` : baseRows.length;

    mount.innerHTML = `
      <div class="profile-data-toolbar">
        <span>${countText} entries${updatedAt ? ` · updated ${escapeHtml(updatedAt)}` : ""}</span>
      </div>
      ${key === "publications" ? renderPublicationFilters(key, filters) : ""}
      ${key === "publications" ? renderPublicationSummary(key, summaryRows, filters) : ""}
      ${key === "funded_projects" ? renderFundedSummary(baseRows) : ""}
      ${key === "talks" ? renderTalkFilters(key, baseRows, filters) : ""}
      ${key === "essays" ? renderEssayFilters(key, baseRows, filters) : ""}
      ${view === "table" ? renderTable(renderedSection) : `<div class="profile-data-grid profile-data-grid-${escapeHtml(key)}">${renderCards(renderedSection)}</div>`}
    `;

    mount.querySelectorAll("[data-profile-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        const filterKey = button.getAttribute("data-profile-key");
        const group = button.getAttribute("data-profile-filter");
        const value = button.getAttribute("data-profile-filter-value");
        const currentFilters = filtersFor(filterKey);
        if (button.getAttribute("data-profile-filter-multi") === "true") {
          if (value === "all") {
            currentFilters[group] = "all";
          } else {
            const next = currentFilters[group] === "all" ? [] : [...selectedCategories(currentFilters)];
            const index = next.indexOf(value);
            if (index >= 0) {
              next.splice(index, 1);
            } else {
              next.push(value);
            }
            currentFilters[group] = next.length ? next : "all";
          }
        } else {
          currentFilters[group] = button.getAttribute("data-profile-filter-toggle") === "true" && currentFilters[group] === value ? "all" : value;
        }
        renderMount(mount);
      });
    });

  }

  function copySectionUri(section) {
    const url = new URL(window.location.href);
    url.hash = section.id;
    const sectionUrl = url.toString();
    if (window.location.hash !== `#${section.id}`) {
      window.history.pushState(null, "", `#${section.id}`);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(sectionUrl).catch(() => {});
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = sectionUrl;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (_error) {
      // Ignore copy failures; clicking the heading should never disrupt the page.
    }
    document.body.removeChild(textarea);
  }

  function initSectionHeadingCopy() {
    document.querySelectorAll("section.home-section[id] .section-heading :is(h1, h2, h3), #about .col-lg-8 > h1").forEach((heading) => {
      const section = heading.closest("section.home-section[id]");
      if (!section) return;
      if (heading.querySelector(".section-copy-link")) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "section-copy-link";
      button.setAttribute("aria-label", `Copy link to ${heading.textContent.trim()}`);
      button.setAttribute("title", "Copy section link");
      button.textContent = "#";
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        copySectionUri(section);
      });
      button.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        event.stopPropagation();
        copySectionUri(section);
      });
      heading.appendChild(button);
    });
  }

  function initProfileAffiliationLinks() {
    document.querySelectorAll(".portrait-title h3 a").forEach((link) => {
      if (link.textContent.replace(/\s+/g, " ").trim() !== "APRL | DGIST") return;
      link.outerHTML = [
        '<a href="https://aprl.dgist.ac.kr" target="_blank" rel="noopener">APRL</a>',
        '<span class="profile-affiliation-separator"> | </span>',
        '<a href="https://www.dgist.ac.kr" target="_blank" rel="noopener">DGIST</a>',
      ].join("");
    });
  }

  function initProfileEmailLink() {
    document.querySelectorAll(".portrait-title").forEach((title) => {
      if (title.querySelector(".profile-email-link")) return;
      const email = document.createElement("a");
      email.className = "profile-email-link";
      email.href = "mailto:gsk@dgist.ac.kr";
      email.textContent = "gsk@dgist.ac.kr";
      title.appendChild(email);
    });
  }

  function initScholarIconFallback() {
    document.querySelectorAll('.network-icon a[aria-label="google-scholar"]').forEach((link) => {
      if (link.querySelector(".profile-scholar-fallback")) return;
      link.innerHTML = '<i class="fas fa-graduation-cap big-icon profile-scholar-fallback" aria-hidden="true"></i>';
    });
  }

  function initNavbarCleanup() {
    document.querySelectorAll("#navbar-main .nav-link").forEach((link) => {
      if (link.textContent.replace(/\s+/g, " ").trim() !== "Home") return;
      const href = link.getAttribute("href") || "";
      const target = link.getAttribute("data-target") || "";
      if (href.endsWith("#about") || target === "#about") {
        link.closest(".nav-item")?.remove();
      }
    });
  }

  function init() {
    const mounts = Array.from(document.querySelectorAll("[data-profile-section]"));
    initSectionHeadingCopy();
    initProfileAffiliationLinks();
    initProfileEmailLink();
    initScholarIconFallback();
    initNavbarCleanup();
    if (!mounts.length) return;

    fetch("/data/profile-sections.json", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        state.data = data;
        mounts.forEach(renderMount);
      })
      .catch((error) => {
        mounts.forEach((mount) => {
          mount.innerHTML = `<p class="profile-data-status">Could not load local JSON data: ${escapeHtml(error.message)}</p>`;
        });
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
