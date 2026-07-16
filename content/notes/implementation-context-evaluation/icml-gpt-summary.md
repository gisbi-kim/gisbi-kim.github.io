---
title: "ICML 2026 GPT 정리 원문"
---

ICML 2026에서 느낀 **머신러닝 연구 트렌드**를 정리한 글이야. 핵심은 크게 네 가지야.

## 1. 연구 수행 방식이 “자동화된 공장”처럼 바뀌고 있음

### AI 연구자 자동화가 뜨고 있음

Google의 MARS 같은 자동 연구 에이전트나 “AI Scientist”가 많이 등장하고 있지만, 저자는 아직 **마케팅 대비 실제 성과는 제한적**이라고 봐.

특히 아직 AI가 안정적으로 못 하는 건:

* 좋은 연구 방향 선택
* 연구 주장 검증
* 결과의 중요성 판단
* 실패해도 방향을 수정하며 끝까지 밀고 가는 능력

즉, 실험과 코딩은 자동화되고 있지만, **연구를 무엇에 집중할지 결정하는 능력은 아직 부족하다**는 얘기야.

### 연구가 파이프라인화됨

코드 생성 비용이 낮아지면서 연구가 다음과 같은 반복 구조로 바뀌고 있대.

> 아이디어 생성 → 데이터 생성 → 학습 → LLM 평가 → 실패 분석 → 다시 생성

그래서 앞으로는 한두 개의 실험보다는, 수백 개의 조건을 자동으로 생성하고 검증하는 **generator loop 형태의 연구**가 늘어날 거라는 전망이야.

---

## 2. 가장 중요한 문제는 연구자의 “taste”

여기서 taste는 단순 취향이 아니라,

> 어떤 문제가 중요한지, 어떤 가설이 가치가 있는지, 어떤 실험 결과를 더 파고들어야 하는지 알아보는 연구 감각

을 뜻해.

LLM은 지식은 많지만 다음을 잘 못해.

* 이 아이디어가 이미 포화된 주제인지
* 기술적으로 가능하지만 논문 가치가 없는지
* 단순한 성능 개선인지 새로운 문제 정의인지
* 지금 연구 커뮤니티가 실제로 필요로 하는 질문인지

그래서 자동 연구 시대에도 교수나 시니어 연구자의 핵심 역할은 줄어들기보다, 오히려 **연구 방향을 선택하고 압축하는 역할로 이동할 가능성**이 크다는 얘기야.

`InnoEval` 같은 연구 아이디어 평가 벤치마크가 이런 research taste를 수치화하려는 초기 시도라고 소개하고 있어.

---

## 3. 연구의 중심이 모델 개발에서 평가로 이동 중

가장 중요한 문장은 사실 이거야.

> 만드는 것이 쉬워질수록, 무엇을 평가해야 하는지를 결정하는 것이 더 어려워진다.

이제 모델을 만들고 코드를 짜는 것은 상대적으로 쉬워졌기 때문에, 연구의 병목이 다음으로 이동하고 있다는 거야.

* 무엇을 측정할 것인가
* 어떤 실패를 구별해야 하는가
* 실제 deployment에서 중요한 조건이 무엇인가
* 기존 benchmark가 놓치는 능력이 무엇인가

### Benchmark saturation 문제

많은 벤치마크가 이미 포화되고 있고, 공개 benchmark 점수가 실제 능력을 제대로 반영하지 못한다는 지적이야.

모델은 자신이 학습된 분포에서는 잘하지만, 다른 task로의 일반화는 제한적이라는 거지.

따라서:

* 공개 benchmark에서 점수가 높은 것
* 실제 사용 환경에서 좋은 것

은 다를 수 있어.

프런티어 기업들은 이 차이를 줄이기 위해 공개 벤치마크뿐 아니라:

* 내부 사용자 로그
* 대규모 private environment
* 실제 서비스 실패 사례
* 다양한 agent interaction task

를 평가에 사용한다는 설명이야.

이건 교수님 연구에도 직접적인 시사점이 있어. 예를 들어 VPR에서 기존 Recall@K가 포화돼도, **distractor가 있는 실제 retrieval setting을 새로 정의하는 것**이 모델 하나를 더 만드는 것보다 연구 가치가 클 수 있다는 논리와 정확히 연결돼.

### LLM judge도 고도화 중

LLM judge를 단순히 “A가 B보다 낫다”를 고르게 하는 수준에서 벗어나:

* calibration된 reward scorer로 학습
* 명시적인 rubric 사용
* 학습 중 rubric 자체를 점진적으로 고도화

하는 방향으로 발전 중이래.

즉, 앞으로는 LLM judge를 썼다는 것만으로는 부족하고:

* judge calibration
* human agreement
* rubric validity
* judge robustness
* adversarial bias

를 증명해야 한다는 흐름이야.

---

## 4. Synthetic data는 더 이상 단순한 데이터 증강이 아님

Synthetic data의 품질·다양성·난도가 빠르게 좋아지고 있다는 얘기야.

예로 든 `Less is Enough`는 기존 30만 개 샘플과 비슷한 성능을, 특정 feature를 정교하게 겨냥한 2천 개 synthetic sample로 달성했다고 해.

중요한 변화는 synthetic data 생성이 단순히:

> 기존 데이터와 비슷한 샘플 생성

이 아니라,

> 모델의 실패 능력을 진단한 뒤, 그 실패를 겨냥한 environment와 task를 생성

하는 방향으로 가고 있다는 거야.

즉, dataset generation보다 **environment generation**이 중요해지고 있다는 말이야.

로보틱스로 치면 단순히 이미지나 trajectory를 synthetic하게 늘리는 게 아니라:

* failure mode가 발생하는 장면
* ambiguity가 있는 language instruction
* 장기 기억이 필요한 multi-session scenario
* sensor degradation
* distractor가 있는 localization environment

를 자동 생성하는 방향이 더 중요해진다는 뜻이야.

---

## 5. Memory가 agent personalization과 장기 행동의 핵심

메모리 관련 연구가 상당히 많았다고 해.

질문은 단순히 “기억을 저장하느냐”가 아니라:

* 무엇을 기억할 것인가
* 무엇을 삭제할 것인가
* 어느 시점에 망각할 것인가
* episodic / semantic / procedural memory를 어떻게 나눌 것인가
* 여러 세션에 걸쳐 기억이 실제로 유지되는가
* 잘못된 기억을 어떻게 수정할 것인가

로 발전하고 있대.

### Memory가 agent를 개인화함

같은 foundation model이라도 사용자 이력과 선호, 이전 작업을 기억하면 사용자별로 다른 agent가 되기 때문에,

> memory is what makes an agent yours

라고 표현한 거야.

### 하지만 memory는 공격 표면이기도 함

장기 메모리가 persistent storage가 되면 공격자가 가장 조작하고 싶은 곳도 그 메모리야.

예를 들면 공격자가 agent memory에 다음을 심을 수 있어.

* 거짓 사용자 선호
* 악성 instruction
* 잘못된 task history
* 특정 도구를 우선 사용하라는 편향
* 보안 정보를 외부로 보내라는 규칙

그래서 memory poisoning과 방어가 중요한 연구 주제로 등장했다는 거야.

교수님 LT-Mem이나 AIMS 연구와 거의 직접 연결되는 흐름이야. 특히 앞으로는 단순 memory retrieval 성능뿐 아니라:

* cross-session consistency
* memory correction
* selective forgetting
* poisoning robustness
* volatility-aware retention

까지 포함해야 연구가 더 강해질 가능성이 커.

---

## 6. tau-bench 관련 자랑과 채용 홍보

마지막 부분은 본인 연구 홍보야.

저자 팀은 ICML에서:

* `tau2-bench`
* `tau-Knowledge`
* `tau-Voice`

세 논문을 발표했고, tau2-bench는 약 24,000개 제출 논문 중 168개 oral, 상위 0.7%였다고 말해.

tau-bench가 여러 논문과 초청 강연에서 인용되고, 다양한 국가의 연구자들이 활용하고 있어서 보람을 느꼈다는 내용이야. 마지막에는 agent evaluation, voice, benchmarking 연구자들과 교류하고 싶고 채용 중이라고 홍보해.

---

# 한 문장으로 요약하면

이 글의 메시지는 이거야.

> AI가 코딩·실험·데이터 생성을 자동화할수록, 연구의 핵심 경쟁력은 모델을 만드는 능력보다 중요한 문제를 선택하는 연구 감각, 실제 배포 조건을 반영한 평가 설계, 그리고 장기적이고 안전한 memory system 설계로 이동하고 있다.

교수님 연구 관점에서는 특히 **새 모델을 하나 더 제안하는 것보다, 기존 연구가 놓친 evaluation regime을 정의하는 연구가 강해지고 있다**는 점이 가장 중요한 시사점이야. DAR처럼 기존 Recall@K가 숨기던 실패를 드러내거나, LT-Mem처럼 single-session 평가가 놓친 장기 volatility와 forgetting 문제를 정의하는 방향이 현재 ICML 흐름과 상당히 잘 맞아.
