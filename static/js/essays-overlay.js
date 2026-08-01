(function () {
  const originalFetch = window.fetch.bind(window);
  const essays = [
    {
      "Published Date": "2026.08.01",
      "Title": "다 같은 icra 에 오는 논문들이 왜 어떤 논문은 대성하고 어떤 것은 안 될까?",
      "Tags": "Research, ICRA, CVPR, Academic Impact",
      "Link": "https://gisbi-kim.github.io/why-some-icra-papers-thrive/"
    },
    {
      "Published Date": "2026.07.26",
      "Title": "증명 소화불량에서 데모 소화불량으로",
      "Tags": "AI, Mathematics, Physical AI, Robotics, Research",
      "Link": "https://gisbi-kim.github.io/tao-ai-math-for-physical-ai/"
    },
    {
      "Published Date": "2026.07.26",
      "Title": "모두가 AI를 배워야 하지만, 모두가 AI를 전공할 필요는 없다",
      "Tags": "AI, Education, Policy, Systems",
      "Link": "https://gisbi-kim.github.io/ai-university-redesign/"
    },
    {
      "Published Date": "2026.07.24",
      "Title": "AI를 잘 쓰는 것보다, AI가 만든 결과를 검증하는 능력이 중요해진다",
      "Tags": "AI, Robotics, Research, Verification",
      "Link": "https://gisbi-kim.github.io/ai-verification-for-robotics/"
    }
  ];

  window.fetch = async function (input, init) {
    const response = await originalFetch(input, init);
    const requestUrl = typeof input === "string" ? input : String(input && input.url ? input.url : "");

    if (!/\/data\/profile-sections\.json(?:\?|$)/.test(requestUrl)) {
      return response;
    }

    window.fetch = originalFetch;

    const data = await response.clone().json();
    const rows = data && data.sections && data.sections.essays && data.sections.essays.rows;

    if (Array.isArray(rows)) {
      essays
        .slice()
        .reverse()
        .forEach((essay) => {
          if (!rows.some((row) => String(row.Link || "") === essay.Link)) {
            rows.unshift(essay);
          }
        });
    }

    data.updatedAt = "2026-08-01T12:00:00+09:00";

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
