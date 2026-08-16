(() => {
  const buildPaperSections = () => {
    const article = document.querySelector(".article-style");

    if (!article || !article.querySelector(".ssi-hero") || article.dataset.ssiPaperReady) {
      return;
    }

    article.dataset.ssiPaperReady = "true";
    document.body.classList.add("ssi-paper-page");

    const sourceNodes = Array.from(article.childNodes);
    const papers = document.createDocumentFragment();
    let paper = document.createElement("section");
    paper.className = "ssi-sheet ssi-sheet--intro";

    const appendPaper = () => {
      if (paper.childNodes.length > 0) {
        papers.appendChild(paper);
      }
    };

    sourceNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node;

        if (element.matches("hr.ssi-section-divider")) {
          return;
        }

        if (element.matches("script[src*='ssi-paper-sections.js']")) {
          return;
        }

        if (element.matches("h2")) {
          appendPaper();
          paper = document.createElement("section");
          paper.className = "ssi-sheet";
        }
      }

      paper.appendChild(node);
    });

    appendPaper();
    article.replaceChildren(papers);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildPaperSections, { once: true });
  } else {
    buildPaperSections();
  }
})();
