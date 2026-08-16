---
title: "APRL의 연구 프로그램과 Situated Spatial Intelligence"
subtitle: "공간지능은 현실 속에서 완성된다"
summary: "APRL은 기하학적 공간 이해, 현실에 근거한 지각, 변화의 기억, 사람과의 공간 이해 공유, 신뢰할 수 있는 행동 실행을 통합하는 Situated Spatial Intelligence를 연구합니다."
date: 2026-08-02T23:37:15+09:00
authors:
  - admin
tags:
  - Robotics
  - Spatial AI
  - APRL
  - Embodied AI
draft: false
type: essays
url: "/situated-spatial-intelligence/"
---

<figure class="ssi-hero">
  <img src="/images/essays/situated-spatial-intelligence-cycle.png" alt="APRL의 Situated Spatial Intelligence 폐루프: Model Space, Ground Reality, Remember Change, Share Understanding, Execute Intent" width="1672" height="941" loading="eager" fetchpriority="high">
</figure>

<nav class="ssi-language-switch" aria-label="언어 선택">
  <a class="is-active" href="/situated-spatial-intelligence/" lang="ko" aria-current="page">한국어</a>
  <a href="/situated-spatial-intelligence/en/" lang="en">English</a>
</nav>

공간지능은 단순히 지도를 만들거나 자신의 위치를 추정하는 능력이 아니다. 로봇이 현실에서 사람과 함께 지속적으로 작동하려면 먼저 공간의 구조를 올바르게 파악하고, 그 이해가 실제 환경에서도 믿을 만한지 검증해야 한다. 또한 변화하는 세계를 기억하고, 자신의 공간적 이해를 사람과 공유하며, 합의된 의도를 실제 행동으로 옮길 수 있어야 한다.

이때 중요한 것은 세계를 가능한 한 자세히 복제하는 것이 아니다. 로봇은 현재의 task와 사람의 의도에 필요한 공간정보를 골라 이해하고, 시간이 지나거나 행동의 결과가 달라지면 그 이해를 고쳐야 한다. 이 글에서 **task relevance**는 새로운 모듈이나 여섯 번째 연구축을 뜻하지 않는다. 다섯 연구축 모두가 “지금 이 task에 무엇이 필요한가”를 놓치지 말아야 한다는 공통 기준이다.

<aside class="ssi-note ssi-task-note" aria-label="task relevance 예시">
  <div class="ssi-note__label">Examples</div>
  <p class="ssi-note__title">task가 달라지면 필요한 공간정보도 달라진다.</p>
  <div class="ssi-note__rows">
    <div class="ssi-note__row"><strong>가정 지원</strong><span>개인 공간과 공용 공간, 물건을 늘 두는 자리, 가족의 생활 동선과 그날 달라진 상황을 이해해야 한다.</span></div>
    <div class="ssi-note__row"><strong>병원·돌봄</strong><span>환자와 의료진의 위치, 청결·제한 구역, 이동을 방해하지 않는 경로와 응급 동선이 중요하다.</span></div>
    <div class="ssi-note__row"><strong>안내·서비스</strong><span>입구와 대기 공간, 줄을 서는 위치, 만남의 장소, 휠체어가 이동할 수 있는 경로와 사람의 흐름을 알아야 한다.</span></div>
    <div class="ssi-note__row"><strong>배송</strong><span>목적지의 입구와 엘리베이터, 출입 규칙, 물건을 전달할 위치, 사람이 붐비는 시간과 동선을 이해해야 한다.</span></div>
    <div class="ssi-note__row"><strong>자율주행</strong><span>주행 가능한 영역, 차선과 경계, 신호, 주변 차량과 보행자의 움직임이 중요하다.</span></div>
    <div class="ssi-note__row"><strong>구조·탐사</strong><span>사람과 위험의 위치, 막힌 통로, 아직 보지 못한 영역, 안전한 진입·복귀 경로를 알아야 한다.</span></div>
  </div>
  <p class="ssi-note__conclusion">같은 환경이라도 task가 바뀌면 필요한 지도와 기억, 질문과 행동도 달라진다.</p>
</aside>

이러한 방향은 APRL이 축적해 온 연구 질문에서 출발한다. APRL은 [APRL Research Vision](https://gisbi-kim.github.io/aprl-research-vision/)에서 좋은 지도나 높은 인식 점수보다 먼저, 로봇이 행동하기 위해 어떤 세계 상태를 유지해야 하는지를 물었다. [VLA Runtime Harnessing](https://gisbi-kim.github.io/vla-runtime-harnessing/)에서는 그 질문을 실행의 순간으로 가져가, 로봇이 불확실성을 감지하고 더 관측하며 기억을 찾고 자신의 판단을 검증해야 한다고 보았다. 공간 이해는 행동 이전에 완성되어 전달되는 정적인 결과물이 아니다. task와 의도에 따라 선택되고, 실행 중에 시험받으며, 실패와 새로운 관측을 통해 다시 만들어지는 상태다. Situated Spatial Intelligence는 이 질문들을 하나의 폐루프 안에서 다루기 위한 APRL의 통합 연구 프로그램이다.

그래서 공간지능은 어느 하나의 알고리즘이나 기능만으로 완성되지 않는다. 로봇의 공간모델은 경험이 쌓일 때마다 고쳐지고, 사람과 대화하며 다시 맞춰지며, 실제로 움직인 결과를 통해 확인된다. 그리고 로봇의 이해를 현실에서 믿을 수 있는지는 마지막에 한 번 확인하고 끝나는 문제가 아니다. 공간을 이해하고, 기억하고, 사람과 소통하고, 행동하는 모든 과정에서 계속 확인해야 한다.

APRL은 이 전체 과정에 필요한 능력을 다섯 가지 연구축으로 발전시키고 있다.

<ul class="ssi-pillar-grid" aria-label="APRL의 다섯 연구축">
  <li><strong>GSI</strong><span>Geometric Spatial Intelligence</span></li>
  <li><strong>RGP</strong><span>Reality-Grounded Perception</span></li>
  <li><strong>ASM</strong><span>Agentic Spatial Memory</span></li>
  <li><strong>CSI</strong><span>Communicative Spatial Intelligence</span></li>
  <li><strong>ESI</strong><span>Executable Spatial Intelligence</span></li>
</ul>

다섯 연구축은 모두 task relevance를 공통 기준으로 삼는다. GSI·ASM·CSI·ESI는 공간을 이해하고, 기억하고, 사람과 나누고, 행동으로 옮기는 네 가지 능력이다. RGP는 이 모든 능력을 현실에서도 믿을 수 있는지 확인한다.

이 다섯 연구축이 함께 향하는 곳이 **SSI: Situated Spatial Intelligence**다.

이제 다섯 연구축이 각각 무엇을 의미하는지 하나씩 살펴보자.

<hr class="ssi-section-divider">

## GSI: 공간의 구조를 이해하는 지능

로봇이 공간에서 행동하려면 가장 먼저 자신이 어디에 있고, 주변 세계가 어떤 구조를 가지고 있는지 알아야 한다. 여러 시점과 다양한 센서로부터 얻은 관측을 하나의 일관된 공간으로 연결하고, 거리와 방향, 형태와 움직임을 추론하는 능력은 모든 후속 공간지능의 기초가 된다.

APRL은 localization, mapping, place recognition과 3D reconstruction을 중심으로 이러한 문제를 연구해 왔다. 최근에는 학습 기반 시각 모델이 만들어내는 공간표현이 실제 세계의 기하학적 구조를 얼마나 충실하게 반영하는지, 그리고 그러한 표현이 로봇의 판단과 행동에 필요한 일관성과 신뢰성을 갖추고 있는지를 탐구하고 있다.

시각적으로 그럴듯한 공간을 만드는 것과 로봇이 실제로 사용할 수 있는 공간을 이해하는 것은 같지 않다. 강력한 학습 모델이 공간에 관한 풍부한 단서를 찾아내더라도, 서로 다른 관측에서 일관된 공간 구조를 유지하고 실제 세계를 정확히 반영하며 행동에 쓸 수 있는지는 따로 확인해야 한다.

이 연구축을 **GSI: Geometric Spatial Intelligence**라고 부른다.

GSI는 전통적인 geometry와 최신 학습 모델 중 하나를 고르는 연구가 아니다. 두 접근의 장점을 함께 사용해, 불완전하고 서로 다른 관측에서도 일관된 공간 구조를 유지하며 실제 행동에 쓸 수 있는 공간표현을 만드는 방법을 연구한다.

GSI가 답하려는 가장 근본적인 질문은 다음과 같다.

<blockquote class="ssi-emphasis">
  <p><strong>나는 어디에 있으며, 내가 보고 있는 세계는 어떤 공간적 구조를 가지고 있는가?</strong></p>
</blockquote>

GSI는 APRL의 다른 연구축들이 출발할 수 있는 기하학적 토대를 제공한다. GSI를 하나의 연구축으로 분명히 두는 것은 APRL이 이어온 SLAM, mapping, place recognition과 geometry 연구를 계속 발전시키고, 이를 최신 학습 기반 공간표현과 연결하겠다는 뜻이다.

<hr class="ssi-section-divider">

## RGP: 현실에서 믿을 수 있는 지각

기하학적으로 일관된 공간모델을 만들었다고 해서 그것이 언제나 현실을 정확히 반영하는 것은 아니다. 실제 환경에서는 조명과 날씨, 계절과 시점이 달라지고, 센서와 로봇 플랫폼도 변한다. 잘 정리된 벤치마크에서 높은 성능을 보인 모델이 예상하지 못한 현실 조건에서는 전혀 다른 방식으로 실패할 수 있다.

따라서 로봇은 공간을 이해하는 데서 그치지 않고, 그 이해를 언제 믿어도 되는지 알아야 한다.

APRL은 조명과 날씨, 센서와 환경이 달라질 때 지각 모델이 언제 실패하는지 찾아내고, 실제 로봇에 필요한 평가 방법을 만들고 있다. 현실에서 반복하기 어렵거나 위험한 상황은 물리 법칙에 맞는 시뮬레이션과 여러 시험 환경을 활용해 지각과 행동을 확인한다.

이 연구축을 **RGP: Reality-Grounded Perception**이라고 부른다.

RGP의 목표는 단순히 평균 점수를 높이는 것이 아니다. 모델이 무엇을 보고 세계를 이해하는지, 어떤 상황에서 그 이해가 무너지는지, 실제 환경에서도 task에 필요한 정보를 놓치지 않는지를 밝히는 것이다.

RGP는 GSI가 끝난 뒤 한 번 거치는 검사가 아니다. GSI의 공간모델은 환경이 달라져도 정확해야 하고, ASM의 기억은 현실의 변화를 제대로 따라가야 한다. CSI의 설명은 로봇이 실제로 알고 있는 것과 모르는 것을 솔직하게 보여줘야 하며, ESI의 행동은 실제 로봇에서도 같은 결과로 이어져야 한다.

<blockquote class="ssi-emphasis">
  <p><strong>공간을 이해했다는 주장은 현실에서도 성립해야 한다.</strong></p>
</blockquote>

그래서 RGP는 공간모델과 기억, 설명과 행동이 현실과 맞는지를 모든 연구축에서 함께 확인한다. 중요한 것은 데이터셋의 점수 자체가 아니라, 로봇이 실제 환경에서 그 이해를 믿고 행동해도 되는지를 보여주는 것이다.

<aside class="ssi-note" aria-label="GSI와 RGP의 차이">
  <div class="ssi-note__label">Note</div>
  <p class="ssi-note__title">GSI와 RGP는 무엇이 다른가?</p>
  <div class="ssi-note__rows">
    <div class="ssi-note__row"><strong>GSI</strong><span>어떤 기하학적 공간상태를 어떻게 추정할 것인가?</span></div>
    <div class="ssi-note__row"><strong>RGP</strong><span>그렇게 추정한 상태를 현실에서 언제 신뢰할 수 있는가?</span></div>
  </div>
  <p class="ssi-note__conclusion">두 질문은 서로 이어져 있지만 같은 질문은 아니다. GSI가 공간모델을 만든다면, RGP는 그 모델을 현실에서도 믿을 수 있는지를 묻는다.</p>
</aside>

<hr class="ssi-section-divider">

## ASM: 시간에 걸쳐 지속되는 공간기억

현실은 한 번 관측한 모습으로 고정되어 있지 않다. 물체와 사람은 이동하고, 공간의 상태와 기능도 달라진다. 어떤 변화는 일시적이며 어떤 변화는 오랫동안 유지된다.

장기간 작동하는 로봇은 매 순간 세계를 처음 보는 것처럼 이해해서는 안 된다. 그렇다고 모든 관측을 하나의 지도에 무제한으로 누적하는 것도 바람직하지 않다. 로봇은 무엇이 변하지 않았는지, 무엇이 달라졌는지, 어떤 변화가 중요한지를 판단해야 한다.

APRL은 공간기억을 과거 데이터를 쌓아두는 창고로 보지 않는다. 공간기억은 변화하는 세계를 따라 로봇이 계속 고쳐 쓰는 현재의 이해다. 로봇은 무엇을 기억하고, 무엇을 고치고, 무엇을 잊으며, 지금의 판단과 다음 행동에 어떤 경험을 쓸지 선택할 수 있어야 한다.

이 연구축을 **ASM: Agentic Spatial Memory**라고 부른다.

ASM의 핵심은 더 많은 정보를 저장하는 데 있지 않다. 과거의 경험을 현재의 판단과 미래의 행동에 유용한 형태로 조직하는 데 있다. 이를 위해서는 공간의 변화뿐 아니라 변화의 지속성, 중요성, 불확실성까지 함께 다룰 수 있어야 한다.

<blockquote class="ssi-emphasis">
  <p><strong>공간기억은 과거를 쌓아두는 기록이 아니라, 변화하는 현실을 따라 계속 고쳐지는 이해여야 한다.</strong></p>
</blockquote>

GSI와 RGP를 통해 얻은 공간적 이해가 ASM과 결합하면 로봇은 단일한 장면이 아니라 시간에 따라 변화하는 세계를 이해할 수 있다.

<hr class="ssi-section-divider">

## CSI: 사람과 공유되는 공간적 이해

로봇이 정확한 공간모델과 풍부한 기억을 가지고 있더라도, 사람이 그 내용을 이해하거나 수정할 수 없다면 협력에는 한계가 있다.

특히 로봇이 집과 병원, 학교와 일터처럼 사람이 살아가는 공간에 들어오려면 기하학적 구조만 알아서는 부족하다. 사람은 공간을 장소의 이름과 랜드마크, 생활 습관과 목적, 그곳에서 쌓은 경험을 통해 이해한다. 같은 물리적 공간도 누가 언제 무엇을 하느냐에 따라 통로가 되거나 머무는 곳이 되고, 조심해야 할 곳이 되기도 한다. 사람이 공간을 사용하는 방식은 로봇에게 지금 무엇을 중요하게 보아야 하는지도 알려준다.

로봇은 좌표와 확률, 정밀한 기하학적 지도를 사용한다. 반면 사람은 “현관 앞”, “늘 물건을 두는 곳”, “사람들이 자주 지나는 길”처럼 공간을 생활의 경험과 자연어로 표현한다. 로봇이 이런 차이를 이해하지 못하면 사람의 말을 글자 그대로 해석하더라도 그 안의 의도는 놓칠 수 있다.

APRL은 로봇이 사람이 공간을 표현하고 사용하는 방식을 이해하고, 그 경험에 근거해 사람과 소통하는 방법을 연구한다. 로봇은 사람이 사용하는 언어와 약도, 랜드마크와 생활의 단서를 이해해야 한다. 동시에 자신의 위치와 판단을 사람이 이해할 수 있게 설명하고, 말이 모호하거나 서로의 이해가 다를 때는 질문과 피드백을 통해 다시 맞출 수 있어야 한다.

이 연구축을 **CSI: Communicative Spatial Intelligence**라고 부른다.

CSI는 로봇의 판단에 설명을 하나 덧붙이는 데서 끝나지 않는다. 사람의 공간 경험을 이해하고 그 위에서 대화를 나눈 뒤, 사람과 로봇이 장소와 상황을 더 비슷하게 이해하게 되었는지가 중요하다.

지도와 언어는 로봇의 결과를 보여주는 도구에 머물지 않는다. 사람과 로봇이 서로 무엇을 알고 있는지 확인하고, 다른 부분을 찾아 함께 고치는 공통 언어가 된다.

<blockquote class="ssi-emphasis">
  <p><strong>공간지능은 공간의 모양뿐 아니라, 사람이 그 공간을 어떻게 부르고 사용하고 기억하는지도 이해해야 한다.</strong></p>
</blockquote>

<hr class="ssi-section-divider">

## ESI: 이해를 행동으로 완성하는 지능

공간을 이해하는 것과 그 이해를 올바른 물리 행동으로 옮기는 것은 서로 다른 문제다.

로봇이 사람의 의도와 목적지를 이해했더라도 실제 환경에서는 무엇을 해야 하고, 어디까지 이동하며, 언제 멈추거나 다시 판단할지를 정해야 한다. 그럴듯한 방향이나 행동을 내놓는 것만으로는 충분하지 않다. 공간에 대한 이해가 실제 환경에서 여러 번 수행해도 믿을 수 있는 행동으로 이어져야 한다.

APRL은 사람의 말과 주변 상황에 담긴 공간적 의도를 로봇이 실제로 할 수 있는 행동으로 바꾸는 방법을 연구한다. 지시를 이해하는 것뿐 아니라 어디까지 움직일지, 언제 다시 주변을 볼지, 결과가 예상과 다를 때 계획을 어떻게 바꿀지도 중요하다.

이 연구축을 **ESI: Executable Spatial Intelligence**라고 부른다.

ESI가 묻는 질문은 명확하다.

<blockquote class="ssi-emphasis">
  <p><strong>공간에 대한 이해를 어떻게 신뢰할 수 있는 물리 행동으로 완성할 것인가?</strong></p>
</blockquote>

ESI의 목표는 그럴듯한 답을 내놓는 것이 아니다. 사람과 로봇이 공유한 공간적 의도를 현실에서 실제로 끝까지 수행하는 것이다.

<hr class="ssi-section-divider">

## 다섯 연구축이 만드는 하나의 폐루프

다섯 연구축은 한 줄로 차례차례 작동하지 않는다. GSI는 관측에서 공간의 구조를 찾고, ASM은 그 이해를 시간에 따라 기억하고 고친다. CSI는 사람과 로봇이 공간을 비슷하게 이해하도록 돕고, ESI는 함께 정한 의도를 실제 행동으로 옮긴다. RGP는 이 모든 과정이 현실에서도 믿을 만한지 확인한다.

이 과정은 한 방향으로만 흐르지 않는다. 기억은 새로운 장면을 해석하는 방식을 바꾸고, 사람의 피드백은 로봇의 이해와 다음 행동을 고친다. 행동은 다시 세계를 바꾸고, 그 결과는 새로운 관측과 기억으로 돌아온다. RGP는 이 모든 과정이 현실과 맞는지 확인하고, task relevance는 지금의 의도와 행동에 정말 필요한 것이 무엇인지를 계속 묻는다.

따라서 APRL의 연구철학은 하나의 문장으로 정리된다.

<blockquote class="ssi-emphasis">
  <p><strong>공간지능은 여러 관측에서 일관된 공간 구조를 만들고 현실에서도 믿을 수 있어야 한다. 시간에 따라 이어지고, 사람과 이해를 나누며, 끝내 실제 행동으로 이어져야 한다.</strong></p>
</blockquote>

<hr class="ssi-section-divider">

## 최종 목적지: Situated Spatial Intelligence

다섯 연구축이 함께 향하는 최종 목적지는 **SSI: Situated Spatial Intelligence**다.

여기서 *situated*는 로봇이 단순히 특정 장소에 존재한다는 뜻이 아니다. 로봇의 지능이 실제 물리환경, 축적된 경험, 사람과의 관계, 그리고 자신의 행동이 만드는 결과 속에서 형성되고 발전한다는 의미다.

SSI는 다음과 같이 정의할 수 있다.

<blockquote class="ssi-emphasis">
  <p><strong>Situated Spatial Intelligence is the ability of an embodied agent to construct a geometrically coherent, reality-grounded, task-relevant, and temporally persistent understanding of space, align that understanding with humans, and transform shared spatial intent into reliable physical action.</strong></p>
</blockquote>

즉, Situated Spatial Intelligence는 몸을 가진 로봇이 여러 관측에서 일관되고 현실에서 믿을 수 있으며, 지금의 task에 필요하고 시간이 지나도 이어지는 공간 이해를 만드는 능력이다. 로봇은 그 이해를 사람과 나누고, 함께 정한 의도를 믿을 수 있는 행동으로 옮길 수 있어야 한다.

기존의 Spatial AI가 주로 “어디에 있는가”와 “어디로 갈 것인가”를 물었다면, SSI는 더 긴 질문을 던진다.

로봇이 구성한 공간은 기하학적으로 일관된가. 그 공간적 이해는 현실에서도 믿을 수 있는가. 세계가 변할 때 기억도 함께 갱신되는가. 사람은 로봇이 무엇을 알고 무엇을 모르는지 이해할 수 있는가. 사람과 로봇은 같은 장소와 목적에 관해 충분히 가까운 이해를 공유하고 있는가. 공유된 의도는 실제 환경에서 신뢰할 수 있는 행동으로 이어지는가. 그리고 행동의 결과를 바탕으로 로봇은 자신의 이해를 다시 수정할 수 있는가.

이 질문들에 함께 답할 수 있을 때 공간지능은 개별적인 기술을 넘어 현실 속에서 지속적으로 작동하는 지능이 된다.

<hr class="ssi-section-divider">

## APRL이 만들고자 하는 것과 다음 확장

APRL은 localization, mapping, perception, memory, human–robot interaction과 navigation을 서로 분리된 문제로만 다루지 않는다. 공간을 구성하고, 현실에서 검증하고, 시간 속에서 기억하며, 사람과 공유하고, 행동으로 완성하는 전체 폐루프를 하나의 연구대상으로 본다.

우리가 만들고자 하는 것은 공간의 구조를 이해하고, 현실의 변화를 경험하며, 자신이 공간을 어떻게 이해하고 있는지 사람과 나누고, 함께 정한 의도를 실제 행동으로 완성하는 로봇이다. 이러한 로봇은 정적인 지도 위에서 한 번의 task를 수행하는 데 머물지 않는다. 변화하는 세계에서 경험을 쌓고, 사람과 서로의 이해를 맞추며, 행동의 결과를 통해 계속 배운다.

이를 가장 압축적으로 표현하면 다음과 같다.

<blockquote class="ssi-emphasis">
  <p><strong>APRL develops Situated Spatial Intelligence: robots that model space geometrically, ground their understanding in reality, remember how the world changes, communicate spatial understanding with people, and transform shared intent into reliable physical action.</strong></p>
</blockquote>

APRL의 다섯 연구축은 다섯 문장으로 요약할 수 있다.

<blockquote class="ssi-emphasis">
  <p><strong>Model Space.</strong></p>
  <p><strong>Ground Reality.</strong></p>
  <p><strong>Remember Change.</strong></p>
  <p><strong>Share Understanding.</strong></p>
  <p><strong>Execute Intent.</strong></p>
</blockquote>

<hr class="ssi-section-divider">

### Lifelong Spatial Adaptation: 결과로부터 나아지는 지능

장기적으로 SSI는 행동의 결과를 받아들이는 데서 멈추지 않고, 그 결과를 이용해 앞으로 지각하고 기억하고 소통하고 행동하는 방식 자체를 개선해야 한다. 실패를 기억해도 다음에 같은 방식으로 행동한다면, 경험을 통해 성장하는 지능이라고 보기 어렵다.

APRL은 이 방향을 **LSA: Lifelong Spatial Adaptation**으로 확장하고자 한다. LSA는 쌓인 경험과 행동 결과를 바탕으로 로봇이 공간을 보고, 기억하고, 소통하고, 행동하는 방식을 계속 개선하는 능력이다.

현재 LSA는 독립된 여섯 번째 연구축이라기보다, 경험을 다시 다섯 연구축으로 돌려보내는 학습의 흐름에 가깝다. 새로운 환경과 센서에 맞춰 공간표현을 고치고, 발견된 실패를 다음 검증과 모델에 반영하며, 사람의 피드백과 실행 결과로 기억과 소통, 행동 방식을 바꾼다. 이런 연구가 충분히 쌓이면 LSA는 독립적인 연구 프로그램으로 발전할 수 있다.

<hr class="ssi-section-divider">

### Distributed Spatial Intelligence: 여러 agent로 확장되는 SSI

SSI의 장기 비전은 하나의 로봇에서 끝나지 않는다. 서로 다른 센서와 이동능력을 가진 여러 로봇이 공간에 대한 이해와 기억을 나누고, 역할을 나누며, 사람과 함께 행동하는 방향으로 확장되어야 한다.

APRL은 이 방향을 **DSI: Distributed Spatial Intelligence**라고 부른다. 하나의 로봇이 GSI·ASM·CSI·ESI를 갖추는 것이 SSI의 기본형이라면, DSI는 그 능력을 여러 로봇이 나누어 갖고 협력하는 형태다. 지금은 새로운 연구축이라기보다 SSI가 한 대의 로봇에서 여러 로봇으로 넓어지는 방향에 가깝다.

앞으로는 로봇끼리 공간 이해를 맞추고, 기억을 나누며, 서로 다른 몸과 센서를 가진 로봇들이 소통하고, 행동과 역할을 함께 정하는 문제가 중요해질 것이다. 이때 **Shared Spatial Understanding**은 CSI만의 결론이나 별도 표어가 아니다. 사람과 여러 로봇이 서로의 이해를 확인하고 고치며 함께 행동하기 위해 필요한 더 큰 목표다.

LSA와 DSI가 결합하면 로봇들은 경험과 실패를 각자 쌓는 데 그치지 않고, 서로의 경험을 통해 함께 배울 수 있다. 현실의 결과에서 배우고 그 배움을 사람과 여러 로봇이 나누는 것이 Situated Spatial Intelligence가 앞으로 나아갈 방향이다.

<hr class="ssi-section-divider">

## 결론

공간지능은 지도 안에서 완성되지 않는다. 공간의 구조를 이해하고, 현실을 경험하고, 그 경험을 기억하며, 사람과 서로의 이해를 맞추고, 행동의 결과를 다시 받아들이는 폐루프 안에서 완성된다.

**Situated Spatial Intelligence는 그 완성된 폐루프를 향한 APRL의 연구 프로그램이다.**

<script defer src="/js/ssi-paper-sections.js"></script>
