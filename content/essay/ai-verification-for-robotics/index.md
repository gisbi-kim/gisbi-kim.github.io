---
title: "AI를 잘 쓰는 것보다, AI가 만든 결과를 검증하는 능력이 중요해진다"
subtitle: "AI 경진대회 사례로 본 로봇공학자의 미래 역량"
summary: "AI 활용이 기본값이 된 시대에 로봇공학자의 차별화 요소가 문제 정의, 역할 분해, 실패 통제, 평가 설계와 검증 가능한 증거로 이동하는 이유를 정리한다."
date: 2026-07-24
authors:
  - admin
tags:
  - AI
  - Robotics
  - Research
  - Verification
draft: false
type: essays
math: true
url: "/ai-verification-for-robotics/"
---

## 1. 이 질문을 하게 된 원 사례

최근 약 5,300명이 참여한 AI 활용 경진대회의 결선 결과를 분석한 글이 공유됐다.  
해당 글에서 제시한 결론은 다소 충격적이었다.

> **AI를 잘 활용하는 능력 자체는 상위권과 탈락자를 구분하는 핵심 요인이 아니었다.**

오히려 상위권과 탈락자 사이의 점수 차이가 가장 작았던 항목이 `AI 활용`이었다. 참가자 대부분이 이미 AI를 사용했기 때문에, AI 사용 여부는 더 이상 차별화 요소가 아니라 기본 조건이 됐다는 것이다.

그러나 실제 제출물의 완성도는 높지 않았다.

- 제출물 중 처음부터 끝까지 정상적으로 실행된 비율은 약 41.7%
- 문서와 설명은 갖춰져 있지만 핵심 구현이 비어 있는 사례가 다수 존재
- 인용한 출처 3개 중 1개는 실제 검증에 실패
- 링크는 존재하지만 해당 링크가 주장을 뒷받침하지 않는 사례 존재
- 심사평에서 자주 등장한 표현은 `병목`, `증거`, `구체성`
- AI가 생성한 수치를 별도의 검증 없이 그대로 사용한 사례가 다수 존재

상위권 참가자들의 공통점은 AI를 더 화려하게 사용했다는 것이 아니었다.  
대신 **AI가 잘하는 일과 코드가 담당해야 하는 일을 명확히 분리했다.**

### AI에 맡긴 일

- 애매한 요구사항 해석
- 문서 요약
- 자연어 분류
- 초안 생성
- 예외 상황 후보 도출
- 여러 가능성 탐색

### 코드로 고정한 일

- 금액 계산
- 조건 분기
- 합격·불합격 판정
- 정산
- 중복 검사
- 형식 검증
- 수치 일관성 확인

이 경계를 명확히 하지 않으면 같은 입력에도 결과가 바뀌고, 데모는 가능하지만 제품이나 시스템으로는 신뢰하기 어려워진다.

해당 글에서는 제출물을 평가하기 위해 다음 네 가지를 확인했다고 한다.

1. 새로운 환경에서 처음부터 다시 설치해도 실행되는가
2. 비정상적인 값을 입력했을 때 안전하게 실패하는가
3. 같은 입력을 반복했을 때 동일하거나 일관된 결과가 나오는가
4. 문서에 제시한 숫자와 주장에 실제 근거가 존재하는가

결국 우수한 결과물을 가른 것은 AI 사용량이 아니라 다음이었다.

> **재현성, 실패 처리, 일관성, 근거와 검증**

이 사례를 로봇 연구에 대입하면 중요한 질문이 생긴다.

> AI가 보편화된 이후, 로봇공학자에게 진짜 중요한 역량은 무엇인가?

---

## 2. 핵심 결론

앞으로 로봇공학자에게 중요한 것은 **AI를 잘 사용하는 능력 자체가 아니라, AI가 포함된 로봇 시스템을 검증 가능하게 설계하는 능력**이다.

가치의 중심은 다음과 같이 이동할 가능성이 크다.

> 알고리즘을 직접 구현하는 능력  
> → 문제를 정확히 정의하는 능력  
> → 시스템을 적절히 분해하는 능력  
> → 실패를 통제하는 능력  
> → 성능과 신뢰성을 증명하는 능력

AI 모델을 호출하고 프롬프트를 작성하는 것은 점점 기본 기술이 된다.  
차별화는 AI를 시스템 어디에 배치하고, AI의 출력을 어디까지 신뢰하며, 잘못된 출력이 물리적 행동으로 전파되지 않도록 어떻게 통제하는가에서 발생한다.

---

## 3. “AI를 사용했다”는 더 이상 novelty가 아니다

앞으로 논문에서 다음과 같은 주장은 점차 약해질 가능성이 높다.

- LLM을 사용했다
- VLM으로 장면을 이해했다
- 생성형 AI로 instruction을 만들었다
- foundation model을 로봇 시스템에 결합했다
- 자연어 명령을 로봇 행동으로 변환했다

이러한 요소들은 새로운 연구 기여라기보다 구현을 위한 일반적인 선택지가 될 수 있다.

그 결과 novelty의 중심은 다음과 같이 이동한다.

| 약해지는 주장 | 강해지는 주장 |
|---|---|
| VLM을 로봇에 적용했다 | 기존 시스템이 실패하던 새로운 문제를 정의했다 |
| LLM이 명령을 생성한다 | 생성 결과를 실행 가능하게 만드는 grounding·verification 구조가 있다 |
| 평균 성능이 향상됐다 | 어떤 조건에서 왜 향상되고 언제 실패하는지 설명할 수 있다 |
| 실제 환경에서 시연했다 | 반복 실험과 교란 실험을 통해 재현성을 증명했다 |
| AI가 end-to-end로 처리한다 | 불확실성을 감지하고 안전한 fallback을 수행한다 |
| 새로운 prompt를 설계했다 | prompt 변화에도 유지되는 시스템 수준의 robustness가 있다 |
| 더 큰 foundation model을 사용했다 | 더 작은 모델에서도 유지되는 핵심 설계 원리가 있다 |

앞으로 중요한 것은 모델 자체보다 다음과 같은 요소다.

- 문제 설정
- 시스템 인터페이스
- 물리적 grounding
- verification
- failure recovery
- reproducibility
- closed-loop evidence

---

## 4. AI와 deterministic module의 역할을 분리하는 능력

AI 경진대회에서 상위권을 가른 핵심이 역할 분담이었다면, 로봇 시스템에서는 이 역할 분담이 더욱 중요하다.

로봇은 AI의 출력이 단순한 문장이나 추천으로 끝나지 않는다.  
잘못된 출력이 이동, 충돌, 조작 실패, 장비 손상 또는 안전 문제로 이어질 수 있다.

### 4.1 AI에 맡기기 적합한 것

AI는 일반적으로 정답이 하나로 고정되지 않거나, 의미 해석과 가설 생성이 필요한 문제에 적합하다.

- 자연어 명령의 의도 해석
- 장면의 semantic interpretation
- 물체, 장소, 행동 후보 생성
- 애매한 상황에서 여러 hypothesis 생성
- 과거 경험에서 관련 memory retrieval
- 사람에게 물어볼 clarification question 생성
- 장면 변화에 대한 설명 생성
- 고수준 task decomposition
- 새로운 상황에 대한 commonsense reasoning
- 탐색할 후보 영역 또는 행동 후보 제안

### 4.2 코드·최적화·제어기로 고정해야 하는 것

반면 다음 항목은 동일 조건에서 일관된 결과가 나와야 하며, 물리적 제약을 엄격히 만족해야 한다.

- 좌표계 변환
- metric scale 계산
- geometric consistency 검사
- 충돌 검사
- 관절 한계와 동역학 제약
- trajectory feasibility
- graph constraint 구성
- 최적화와 수치 계산
- 시간, 배터리, 자원 계산
- 속도 및 가속도 제한
- 안전 조건
- emergency stop
- 중복 검사
- 형식 검증
- 성공·실패 판정 기준

가장 유망한 시스템 구조는 다음과 같다.

$$
\text{AI Proposal}
\rightarrow
\text{Geometric and Physical Verification}
\rightarrow
\text{Planning}
\rightarrow
\text{Execution}
\rightarrow
\text{Runtime Monitoring}
$$

여기서 가장 중요한 원칙은 다음이다.

> **AI의 출력은 명령이 아니라 proposal로 취급해야 한다.**

예를 들어 VLM이 “왼쪽 복도로 이동하라”고 판단했더라도 이를 즉시 실행해서는 안 된다. 시스템은 최소한 다음을 확인해야 한다.

1. 왼쪽 복도가 실제 지도나 현재 관측에 존재하는가
2. 현재 localization uncertainty에서 해당 복도를 구별할 수 있는가
3. 로봇이 실제로 통과 가능한가
4. 다른 명령 조건과 모순되지 않는가
5. 해당 행동의 위험도가 허용 범위 안에 있는가
6. 실패할 경우 어디에서 중단하거나 복구할 것인가

즉 앞으로 강한 로봇 시스템은 `AI-driven system`이라기보다 다음에 가까워진다.

> **AI-proposed, verification-constrained robotic system**

---

## 5. 앞으로 가장 귀해질 능력은 평가 프로토콜 설계다

AI 시대에는 구현물과 데모를 만드는 비용이 크게 낮아진다.  
그럴듯한 결과도 쉽게 생성할 수 있다.

따라서 오히려 다음을 판단할 수 있는 사람의 가치가 커진다.

- 무엇을 측정해야 실제 성능인가
- 어떤 baseline과 비교해야 하는가
- 어떤 실패 사례를 포함해야 하는가
- 어떤 조건에서 성능이 무너지는가
- 개선이 실제 알고리즘 때문인지 평가 설정 때문인지
- offline metric이 실제 로봇 성능을 대변하는가

좋은 연구자는 단순히 높은 숫자를 만드는 사람이 아니라, **그 숫자가 무엇을 의미하는지 증명할 수 있는 사람**이 된다.

### 5.1 SLAM 연구에서 중요해지는 평가

SLAM에서는 평균 ATE 하나만으로 시스템의 신뢰성을 설명하기 어렵다.

앞으로 중요해질 평가 요소는 다음과 같다.

- 평균 ATE
- median 및 worst-case error
- catastrophic failure rate
- trajectory completion rate
- scale consistency
- orientation drift
- loop closure false-positive rate
- 잘못된 loop closure 발생 시 시스템 붕괴 여부
- 장시간 운용에서의 drift
- multi-session map consistency
- sensor degradation에 대한 민감도
- localization uncertainty calibration
- 다른 로봇이 생성된 map을 재사용할 수 있는가
- map이 실제 navigation에 충분한가

핵심 질문은 다음과 같다.

> 궤적 오차가 작은가?

보다

> 어떤 환경과 조건까지 안정적으로 작동하고, 어떤 조건부터 실패하는가?

가 더 중요해진다.

### 5.2 VLN 연구에서 중요해지는 평가

VLN에서도 instruction quality나 language metric만으로는 충분하지 않다.

- 실제 closed-loop success rate
- SPL
- instruction following accuracy
- landmark ambiguity에 대한 robustness
- localization error가 존재할 때의 성능
- instruction generation error와 policy execution error의 분리
- 잘못된 instruction을 탐지하고 거부하는 능력
- clarification 요청의 precision과 recall
- unnecessary clarification 비율
- recovery success rate
- unseen environment generalization
- 사람의 명령과 지도 정보가 충돌할 때의 처리
- instruction의 불확실성과 navigation uncertainty의 calibration

특히 `좋은 instruction을 생성했다`와 `로봇이 실제로 목적지에 도달했다`는 서로 다른 주장이다.

$$
\text{Instruction Quality}
\neq
\text{Navigation Success}
$$

따라서 instruction generation 연구도 실제 execution까지 닫힌 평가가 필요하다.

### 5.3 Multi-robot 연구에서 중요해지는 평가

Multi-robot 시스템에서는 평균 성능보다 오류 전파와 시스템 수준의 안정성이 중요하다.

- 통신 단절
- 지연 및 packet loss
- partial observation
- 잘못된 inter-robot correspondence
- heterogeneous sensor configuration
- 로봇별 서로 다른 scale drift
- map inconsistency
- robot footprint 차이
- 로봇 수 증가에 따른 scalability
- 한 로봇의 오류가 전체 fleet에 전파되는지
- centralized module failure 시 동작
- map merge 실패 탐지
- 잘못된 map 정보를 거부하거나 격리할 수 있는지

앞으로 리뷰어가 보고 싶어 하는 것은 단순한 성공 결과가 아니다.

> **어떤 조건까지 작동하고, 어떤 조건부터 무너지며, 그 경계를 어떻게 측정했는가**

가 핵심이 된다.

---

## 6. 재현성의 의미가 더 엄격해진다

AI 경진대회에서는 같은 입력을 세 번 넣었을 때 같은 결과가 나오는지를 확인했다.

그러나 로봇 시스템은 다음과 같은 요소 때문에 완전히 동일한 결과가 나오기 어렵다.

- sensor noise
- actuator variation
- 환경 변화
- GPU nondeterminism
- asynchronous processing
- 네트워크 지연
- localization 초기값
- 사람과 동적 객체의 움직임

따라서 로봇 연구에서는 단순한 결정론적 재현성보다 **통계적 재현성**을 증명해야 한다.

### 6.1 기본적으로 기록해야 하는 것

- 사용한 model과 API version
- model snapshot
- prompt와 system instruction
- temperature와 decoding 설정
- random seed
- dependency version
- container 또는 environment specification
- sensor calibration
- camera intrinsic 및 extrinsic
- timestamp와 synchronization 방법
- raw sensor log
- 초기 pose
- reset condition
- map initialization 방식
- human intervention 횟수
- 실패 trial을 포함한 전체 trial 수
- 평균뿐 아니라 분산과 confidence interval
- retry policy
- timeout
- fallback 발생 횟수

특히 외부 foundation model API를 사용하는 경우 재현성은 다음 요소들의 결합으로 봐야 한다.

$$
\text{Reproducibility}
=
\text{Input Provenance}
+
\text{Model Provenance}
+
\text{Prompt Provenance}
+
\text{Execution Provenance}
$$

논문에 모델 이름만 적는 것으로는 부족하다.

- 어떤 버전의 모델인지
- 언제 호출했는지
- temperature는 얼마인지
- image preprocessing은 어떻게 했는지
- 실패 시 몇 번 재시도했는지
- 응답을 어떻게 parsing했는지
- 출력이 invalid할 때 어떻게 처리했는지

까지 남겨야 한다.

---

## 7. 성공 데모보다 실패를 잘 설계한 연구가 강해진다

로봇 연구에서는 성공 사례를 보여주는 것보다, 실패를 어떻게 감지하고 통제하는지가 점점 중요해진다.

AI가 이상한 값을 생성했을 때 시스템은 최소한 다음 중 하나를 수행할 수 있어야 한다.

- 실행 거부
- 이전 safe state 유지
- classical planner로 fallback
- conservative mode로 전환
- 속도 제한
- human clarification 요청
- 재관측 수행
- active perception 수행
- 추가 센서 정보 요청
- uncertainty가 낮아질 때까지 행동 보류
- 현재 task 중단
- 안전 위치로 복귀
- 해당 memory 또는 observation을 격리
- 다른 agent의 검증 결과 요청

이때 중요한 것은 단순히 fallback이 존재하는가가 아니다.

- 언제 fallback이 작동하는가
- fallback 조건이 명확한가
- false alarm은 얼마나 발생하는가
- 위험한 출력을 얼마나 잘 탐지하는가
- fallback 이후 task를 복구할 수 있는가
- 잘못된 정보가 내부 memory나 map에 남지 않는가

까지 평가해야 한다.

따라서 앞으로 강한 contribution은 단순한 reasoning module보다 다음과 같은 형태가 될 수 있다.

> **A verification-aware architecture that detects unsupported model outputs and prevents their propagation into physical execution.**

또는

> **A failure-aware robotic system that identifies unreliable AI predictions and safely recovers through geometric verification and active re-observation.**

이러한 문제는 학술적 가치뿐 아니라 실제 제품화와 산업 적용에서도 중요하다.

---

## 8. 로봇공학자의 전문성은 사라지는 것이 아니라 상위 단계로 이동한다

AI가 코드를 작성하고 알고리즘 구현을 지원하더라도 로봇공학자의 전문성은 사라지지 않는다.

대신 전문성의 위치가 바뀐다.

### 8.1 문제 정의

- 어떤 문제가 실제로 어려운가
- 기존 방법의 실패가 어디서 발생하는가
- 해당 문제가 산업적·학술적으로 중요한가
- 단순히 모델을 적용한 문제가 아닌가
- 평가 가능한 형태로 문제를 정의할 수 있는가

### 8.2 시스템 아키텍처

- 어떤 부분을 학습시킬 것인가
- 어떤 부분은 deterministic하게 유지할 것인가
- 각 모듈의 입출력 계약은 무엇인가
- uncertainty가 모듈 사이에서 어떻게 전달되는가
- 오류가 전체 시스템으로 전파되지 않도록 어떻게 격리할 것인가

### 8.3 물리적 제약에 대한 이해

- 센서의 관측 가능성
- calibration
- latency
- dynamics
- kinematics
- collision
- actuator limitation
- environment interaction
- uncertainty
- observability
- partial observability

이러한 요소는 언어 모델만으로 해결하기 어렵다.

### 8.4 검증 설계

- 어떤 반례를 만들어야 하는가
- 어떤 edge case가 시스템을 무너뜨리는가
- 어떤 결과가 우연인지
- 어떤 결과가 실제 설계 효과인지
- 시스템의 작동 경계를 어떻게 측정할 것인가

### 8.5 인과적 분석

성능 향상의 원인이 무엇인지 분리할 수 있어야 한다.

- 모델 크기 때문인가
- 데이터 증가 때문인가
- prompt engineering 때문인가
- 평가 데이터 leakage 때문인가
- preprocessing 때문인가
- 더 좋은 localization 때문인가
- 더 많은 human intervention 때문인가
- 유리한 환경 선택 때문인가

### 8.6 증거 생성

연구 결과를 주장하는 것과 증명하는 것은 다르다.

필요한 증거는 다음과 같다.

- log
- raw data
- repeated trials
- ablation
- perturbation test
- counterexample
- failure case
- statistical analysis
- reproducible code
- dataset
- system configuration
- independent verification

결국 앞으로 학생에게도 단순히 “코드를 많이 짜라”라고 지도하는 것만으로는 부족하다.

더 중요한 훈련은 다음이다.

> **명세를 작성하고, 실패 조건을 정의하고, 검증기를 만들고, 증거를 남기는 훈련**

---

## 9. 앞으로 논문에서 실제로 점수를 가를 요소

AI가 보편화되면 구현 자체의 희소성은 낮아진다.  
논문을 가르는 요소는 다음과 같은 순서로 이동할 가능성이 높다.

### 9.1 Problem Significance

- 실제로 중요한 문제인가
- 기존 연구가 해결하지 못한 문제인가
- AI 모델을 붙이기 위해 인위적으로 만든 문제는 아닌가

### 9.2 System Decomposition

- AI와 geometry, planning, control, safety의 역할 분담이 타당한가
- 각 모듈의 책임과 실패 범위가 명확한가

### 9.3 Closed-loop Evidence

- offline metric만 개선된 것이 아닌가
- 실제 로봇의 perception–planning–action loop에서 효과가 있는가
- 행동 결과까지 검증했는가

### 9.4 Failure Characterization

- 실패 사례를 숨기지 않았는가
- 실패 원인을 분류했는가
- 시스템의 작동 경계를 분석했는가

### 9.5 Reproducibility

- 다른 연구자가 다시 실행할 수 있는가
- 동일 조건에서 통계적으로 유사한 결과가 나오는가

### 9.6 Deployment Robustness

- 모델 업데이트에 민감하지 않은가
- API 오류를 처리할 수 있는가
- 센서 이상과 통신 단절을 처리하는가
- 장시간 운용에서도 안정적인가

### 9.7 Scientific Attribution

- 어떤 구성 요소가 성능 향상을 만들었는가
- 적절한 ablation이 존재하는가
- 단순한 모델 크기 증가와 설계 기여를 분리했는가

---

## 10. 앞으로 강한 로봇 연구의 기본 구조

앞으로 경쟁력 있는 연구는 다음 네 요소를 갖출 가능성이 높다.

### 10.1 Proposal

AI가 semantic interpretation, hypothesis 또는 candidate action을 생성한다.

### 10.2 Verification

geometry, physics, map, memory, sensor evidence를 이용해 제안의 타당성을 검사한다.

### 10.3 Execution

검증된 결과만 planning과 control에 전달한다.

### 10.4 Evidence

전체 과정의 입력, 판단, 실패, fallback, 실행 결과를 기록하고 재현 가능하게 만든다.

이를 하나의 구조로 정리하면 다음과 같다.

$$
\text{Generative Intelligence}
+
\text{Deterministic Verification}
+
\text{Physical Execution}
+
\text{Reproducible Evidence}
$$

---

## 11. 결론

앞으로 강한 로봇공학자는 AI보다 코드를 더 잘 짜는 사람도 아니고, AI를 가장 많이 사용하는 사람도 아니다.

진짜 중요한 사람은 다음을 할 수 있는 사람이다.

- AI가 맡아야 할 문제와 맡기면 안 되는 문제를 구분한다
- AI 출력을 검증 가능한 proposal로 다룬다
- 물리적·기하학적 제약으로 실행 가능성을 확인한다
- 실패 조건과 fallback을 사전에 설계한다
- 반복 실험과 교란 실험으로 신뢰성을 증명한다
- 결과의 원인을 분석하고 재현 가능한 증거를 남긴다
- 시스템이 언제 믿을 만하고 언제 믿으면 안 되는지를 정량화한다

결국 미래의 로봇공학자에게 가장 중요한 역량은 다음 문장으로 정리할 수 있다.

> **AI가 물리 세계에서 언제 믿을 만한지를 정의하고, 그 신뢰성을 시스템과 실험으로 증명하는 능력**
