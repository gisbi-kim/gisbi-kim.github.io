(function () {
  const originalFetch = window.fetch.bind(window);
  const essays = [
    {
      "Published Date": "2026.08.16",
      "Title": "Taste, Productization, and Shipping",
      "Tags": "AI, Product Sense, Productization, Shipping",
      "Link": "https://gisbi-kim.github.io/taste-productization-shipping/"
    },
    {
      "Published Date": "2026.08.15",
      "Title": "한쪽은 문장이고, 다른 쪽은 서명이다",
      "Tags": "AI, Authorship, Responsibility, Philosophy",
      "Link": "https://gisbi-kim.github.io/human-owned-authorship/"
    },
    {
      "Published Date": "2026.08.14",
      "Title": "AI 시대, 좋은 로봇 연구자를 가르는 것은 취향이다",
      "Tags": "AI, Robotics, Research, Research Strategy",
      "Link": "https://gisbi-kim.github.io/robotics-research-taste/"
    },
    {
      "Published Date": "2026.08.14",
      "Title": "교수는 매일 무슨 일을 하는가",
      "Tags": "Research, Academia, Lab Management, Leadership",
      "Link": "https://gisbi-kim.github.io/professors-real-work/"
    },
    {
      "Published Date": "2026.08.13",
      "Title": "무엇이 되고 싶은가보다, 어떤 문제를 풀고 싶은가",
      "Tags": "Research, Problem Solving, Academic Career, Strategy",
      "Link": "https://gisbi-kim.github.io/problem-first-guide/"
    },
    {
      "Published Date": "2026.08.13",
      "Title": "연구실 소통 지도 — 설득하고, 가르치고, 설명하는 법",
      "Tags": "Research, Communication, Mentoring, Lab Management",
      "Link": "https://gisbi-kim.github.io/research-communication-guide/"
    },
    {
      "Published Date": "2026.08.05",
      "Title": "논문을 쓰는 사람에서 연구 시스템을 만드는 사람으로",
      "Tags": "Research, Academic Career, Systems, AI",
      "Link": "https://gisbi-kim.github.io/from-paper-writer-to-research-system-builder/"
    },
    {
      "Published Date": "2026.08.02",
      "Title": "APRL의 연구 프로그램과 Situated Spatial Intelligence",
      "Tags": "Robotics, Spatial AI, APRL, Embodied AI",
      "Link": "https://gisbi-kim.github.io/situated-spatial-intelligence/"
    },
    {
      "Published Date": "2026.08.02",
      "Title": "첫 1,000회의 인용",
      "Tags": "Research, Academic Impact, Citations, Strategy",
      "Link": "https://gisbi-kim.github.io/first-1000-citations/"
    },
    {
      "Published Date": "2026.08.02",
      "Title": "이상적인 연구주제란?",
      "Tags": "Research, Lab Management, Strategy, ROIC",
      "Link": "https://gisbi-kim.github.io/ideal-research-topic-roic/"
    },
    {
      "Published Date": "2026.08.02",
      "Title": "연구실경영학 — 승률을 설계하는 연구실",
      "Tags": "Research, Lab Management, Strategy",
      "Link": "https://gisbi-kim.github.io/lab-management-designing-win-rate/"
    },
    {
      "Published Date": "2026.08.02",
      "Title": "손안에 든 새 한마리가 숲속에 있는 두마리보다 낫다",
      "Tags": "Research, Lab Management, Strategy",
      "Link": "https://gisbi-kim.github.io/bird-in-hand-lab-management/"
    },
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

    data.updatedAt = "2026-08-16T00:00:00+09:00";

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
