(function () {
  const originalFetch = window.fetch.bind(window);
  const essayLink = "https://gisbi-kim.github.io/ai-verification-for-robotics/";

  window.fetch = async function (input, init) {
    const response = await originalFetch(input, init);
    const requestUrl = typeof input === "string" ? input : String(input && input.url ? input.url : "");

    if (!/\/data\/profile-sections\.json(?:\?|$)/.test(requestUrl)) {
      return response;
    }

    window.fetch = originalFetch;

    const data = await response.clone().json();
    const rows = data && data.sections && data.sections.essays && data.sections.essays.rows;

    if (Array.isArray(rows) && !rows.some((row) => String(row.Link || "") === essayLink)) {
      rows.unshift({
        "Published Date": "2026.07.24",
        "Title": "AI를 잘 쓰는 것보다, AI가 만든 결과를 검증하는 능력이 중요해진다",
        "Tags": "AI, Robotics, Research, Verification",
        "Link": essayLink
      });
    }

    data.updatedAt = "2026-07-24T10:30:00+09:00";

    const headers = new Headers(response.headers);
    headers.set("content-type", "application/json; charset=utf-8");
    headers.delete("content-length");

    return new Response(JSON.stringify(data), {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  };
})();
