---
layout: post
showlist: true
title: "SLAM Back-end 공부자료 5개 추천" 
season: SLAM Study
type: research
categories:
- blog
tags:
- Blog
use_math: true
---

## SLAM 문제란?
SLAM은 robot(의 시간에 따른 궤적)과 주변환경(environment)의  
물리적(및 의미론적) 특성값(state)들을 예측하는 작업이라 요약할 수 있다.  

따라서 수학적으로는 하나의 vector 에 모든 state element 들을 담은 다음에  
최적화 (cost 최소화)과정을 통해 최적의 state 값을 예측하게 된다. 

2000년대 초반까지 널리 쓰이던 (물론 지금도 널리 쓰이는) filtering 기반 방법과 비교[^ps1]하여  
이렇게 minimization 을 통해 robot 의 궤적과 주변환경의 특성 (예: 위치, 방향)  
들을 예측하게 되는 계열을 편의상 modern SLAM이라고 부르고 싶다.  

[^ps1]: 물론 Kamlan filter 의 경우, 예측값과 실측값 차이의 variance 를 최소화 하는 방향으로 업데이트 하기 때문에 (Kalman filter original 논문의 유도 참고) 그 유도 과정에서 least square optimization 이 쓰인 것이라고 이야기할수도 있다. 따라서 filtering 이냐 혹은 modern SLAM의 smoothing (전체 궤적의 state들을 혹은 많은 수의 landmark들을 함께 업데이트) 이냐 를 구분 짓는 차이는 가장 최근의 state 만을 추적할 것인지 past state history 들도 함께 최적화 할 것인지 차이로 이해할 수 있다. 물론 이 둘이 함께 쓰일 수도 있다. https://github.com/gisbi-kim/FAST_LIO_SLAM 참고 (가장 최근의 pose 를 추정하기 위해서는 filtering 을 활용하여 initial pose-graph 를 construct하고, 전반적인 trajectory smoothing 을 위해서는 pose-graph optimization을 활용함). 

---
## 소개하는 자료의 대상 독자 
그렇다면 이러한 optimization 기반 SLAM을 이해하기 위해서는  
어떤 자료로 공부를 하면 좋을까?  

이 글에서는 다음과 같은 분들을 위한 자료들을 소개하고자 한다. 
- SLAM open source들 (ORB-SLAM, LeGO-LOAM 등)을 몇 개 실행해보고,  
SLAM이 무엇인지에 대해서도 대강 느낀 바가 있지만,  
논문을 읽어보면 어려운 수식들에 막히는 상태 

경험상 논문은 지면의 제약이 크기 때문에, (ICRA, IROS 이상 급에서는)  
수학적 background에 대해 독자들이 대체로 이해하고 있다고 내용을 전개하는 편이 많아서  
논문을 통해서 SLAM의 기본 단에 대해 이해하기는 어려웠었다.  

흔히 하는 실수로써  
'SLAM 수식에서는 linera algebra 나 optimization 지식이 뭔가 많이 요구되는 것 같아 보여서  
관련 수학분야 교과서 (수백쪽) 를 함께 공부해야겠다'는 접근으로 공부를 하게되면  
실질적으로 그 책들의 모든 내용들이 SLAM에 필요한 것이 아니기 때문에 쉽게 지치기 쉽다.  

또한 우리는 보통 SLAM의 theory 를 세계최초로 개발하고 싶다기 보다는,  
현재 SLAM의 역사와 최신 SLAM의 이론적 배경에 대해 '빠르게' 이해하여  
코드를 읽을 때 각 부분이 어떤 부분에 해당하는지 빠르게 grasp 하기 위함이기 때문에  
실질적으로 SLAM에 필요한 기본기만을 빠르게 다질 수 있다면 좋을 것이다. 

이런 상황에서 논문을 읽기 전에 수학적 기본기를 다지기 위해  
약간은 교과서에 가까운 (70~100쪽 규모), 도움이 되었던 자료들을 소개하고자 한다. 


--- 
## (Modern) SLAM 문제를 위해 이해해야 하는 요소 

먼저 아래 자료들을 소개하기 전에, 왜 아래 자료들을 선정하였는지에 대해 먼저 말하고자 한다.  

SLAM 을 이해하기 위해서는 아래 내용에 대해 이해하는 것이 요구된다.  
1. Rotation Parametrization
  - 다른 학문들의 최적화문제와 달리 SLAM을 SLAM답게 만드는 것은 우리가 알고자 하는 state 가 사는 공간의 특수성에 있다. 제일 minimal 하게는 우리가 알고싶은 state는 보통 position (ex: x, y, z) 과 orientation (혹은 rotation) 이다. 
  - 이 때, vector 공간에 존재하는 요소에 대해 최적화하는 것은 항상 쉽다. position 은 vector space에 존재한다. 하지만 rotation 은 vector space 에 존재하지 않기 때문에 항상 문제가 된다.  
  - 그렇다면 이 rotation 에 대해 최적화를 하기 위해서 우리는 어떻게 해야할까? 에 대해 알아야 한다. 
  - 이를 위해 rotation 을 우리가 최적화 하기 적합한 형태로 표현할 수 있는데 이 과정을 parametrization (매개변수화) 이라고 한다. 그리고 그 종류에는 크게 3가지 표현법이 존재한다: angle-axis (rotation vector, rotvec 등으로도 불림), quaternion, SO(3) 이다. (Euler angles 라는 parametrization으로 값 3개를 통해 SO(3) 를 표현할 수도 있다)
  - 각 parametrization의 장단점은 무엇일까? 우리는 (최적화를 위해) 어떤 parametrization 을 채택해야 할까? 이것에 대해 잘 설명하는 자료를 소개하고자 한다.  
  - $\rightarrow$ 해당 자료 (* 위주로 먼저 보는 것을 추천):  
    $  \ \ \ \ $ <a href="#m1">*1. Quaternion kinematics for the error-state Kalman filter </a>
2. Least-Square Optimization
  - 당연히 최적화를 위해서는 least square optimization 에 대해 알아야 한다. 
  - 하지만 기존 대학수업에서는 convex optimization 수업 등이 많은데, 이런 책을 공부한다고 해서 바로 SLAM의 최적화에 대해 이해하기는 쉽지 않을 수도 있는 것이 (도움은 물론 되겠지만), SLAM 에서 예측하고자 하는 것들에는 앞서 이야기했든 rotation 등 nonlinear 한 애들이 많이 포함되어 있으므로 전역적으로 (global) 최적인 해(solution)를 구하기는 쉽지 않다. 
  - 따라서 SLAM에서 optimization 이라고 표현하면 거의 항상 iterative update 를 의미한다. 즉, 현재 initial guess 가 있고, 그 state vector 의 최적 delta (변화량) 값을 예측하는 문제로 formulation 하는 것이다. 
  - 이 과정에서 measurement function 에 대한 Jacobian, Gauss-Newton, LM-method 등의 용어가 나온다. 이에 대한 이론적 전개와, 피부로 느낄 수 있는 자료를 소개하고자 한다. 
  - $\rightarrow$ 해당 자료 (* 위주로 먼저 보는 것을 추천):  
    $  \ \ \ \ $  <a href="#m21">*2-1). From Least-Squares to ICP (ICRA 2016 SLAM tutorial)</a>   
    $  \ \ \ \ $  <a href="#m3">*3. Course on SLAM</a>  
    $  \ \ \ \ $  <a href="#m4">4. Factor Graphs for Robot Perception</a>  
    $  \ \ \ \ $  <a href="#m5">5. Bundle Adjustment – A Modern Synthesis</a>
3. Exploiting Sparsity 
  - 마지막으로 SLAM 을 가장 SLAM 답게 만들어 주는 개념은 sparsity 이다. 
  - 보통 least square optimization 이라고 하면 $Ax=b$ 를 푸는 것이고 (엄밀하게는 iterative update 를 하므로 $A \Delta x=b$ 라고 적어야 맞겠다), 이를 보통 $A$의 pseudo-inverse 를 이용해서 풀게 된다. 즉  $\(A^{T} A\) \Delta x = A^T b$ 를 풀게 되는데, 이 식을 normal equation 이라고 부른다. 간단하게는 최적해를 $\Delta x^{*} = (A^T A)^{-1}A^T b$ 라고 closed form으로 계산할 수 있겠다.
  - 하지만 SLAM에서는 최적화 하고 싶은 landmark 의 수가 수천, 수십, 수백만개가 될 수도 있고, 각 포인트 하나당 최소 xyz 3개의 값을 요구한다 (rotation 이 포함될 경우 그 이상이 될 수도 있다). 그러면 우리가 풀고자 하는 시스템의 규모 (즉, $A^{T} A$ 행렬의 shape) 는 수백만 x 수백만 의 크기가 될 것이다. 
  - 그러면 이를 일단 메모리에 올리는 것이 어려울 수 있다. 그리고 이것의 inverse 를 어떻게 효율적으로 계산할 수 있을까? 
  - 그런데 <a href="{{ site.baseurl }}{% post_url 2021-03-04-slambackend-1 %}#Axb"> SLAM back-end [1편] </a> 에서 그림으로 소개했듯이, SLAM의 state element 들 사이에는 대체로 sparse 관계만이 존재하기 때문에 (locality 라고 부른다) 결과적으로 $A$ matrix 가 sparse 함을 알 수 있다. 이를 이용하면 효율적인 iterative update 알고리즘을 고안할 수 있지 않을까? 에 대해 고민한(+정립된) 자료들을 소개하고자 한다. 
  - $\rightarrow$ 해당 자료 (* 위주로 먼저 보는 것을 추천):  
    $  \ \ \ \ $ <a href="#m3">3. Course on SLAM</a>  
    $  \ \ \ \ $ <a href="#m4">*4. Factor Graphs for Robot Perception</a>  
    $  \ \ \ \ $ <a href="#m22">*2-2). Graph-Based SLAM and Sparsity (ICRA 2016 SLAM tutorial)</a>  
    $  \ \ \ \ $ <a href="#m5">5. Bundle Adjustment – A Modern Synthesis

- 개인적으로는 위에서 소개한 순서인 1, 2-1, 3, 4, 2-2, 5 의 순서로 이해하는 편이 좋았다.  
  - 하지만 어떤 것을 먼저 읽든 2회독 정도 하면서 모든 내용들이 한데 얽히는 지점을 느끼는 것이 중요하다고 생각된다.  
    - 실제로 modern SLAM 논문을 읽다보면 이들 내용이 모두 요구될 때가 많다. (ex: 2016 TRO, On-Manifold Preintegration for Real-Time Visual-Inertial Odometry) 

---
## SLAM 기본기를 위한 자료들 

<!-- --- -->
<p id="m1"> </p>
### 1. Quaternion kinematics for the error-state Kalman filter
- <a href="/materials/study/soal17eskf.pdf" target="_blank"> Download</a>
- Author: Joan Solà (2017)
- 요약:
  - error-state Kalman filter 를 위한 minimal 한 rotation 표현법인 angle-axis (rotation vector 라고도 부름) 방식의 parametrization 을 소개하고, 이것과 실제 manifold 상에서의 SO(3) 표현법과의 관계 등에 대해 잘 다룬다. 
  - rotation parametrization 공부를 위해서는 챕터4까지만 읽어도 무방할 것으로 생각된다. 
- 선정이유: 
  - 지금까지 본 rotation parametrization 논문 중 가장 친절함. 
    - 인터넷에 존재하는 다른 자료들을 더 안보고 이 것만 2-3번 반복해서 읽는 것이 더 나을 정도. 
  - 실제 SLAM에서는 rotation 의 미소변화에 대한 미분값인 Jacobian 이 필요한데, Jacobian 에 대해서도 빠짐없이 다루어 줌. 

<!-- --- -->
### 2. ICRA 2016 SLAM tutorial 
<p id="m21"> </p>
- 1) From Least-Squares to ICP
  - <a href="/materials/study/icra16tuto/icra16_slam_tutorial_grisetti.pdf" target="_blank"> Download</a>
  - Author: Giorgio Grisetti (2016)
  - 요약 및 선정이유:
    - LS optimization 이 쓰이는 SLAM application 중 가장 간단한 ICP (3 dimension state) 에 대해 Gause-netwon 및 LM update 에 대한 실제 octave (matlab) code 를 보여줌으로써 실제로 이론이 코드로 어떻게 구현되는지 감을 잡기 좋다. 
      - 이 파이프라인 중, iterative optimization 은 J (measurement error Jacobian) 와 e (residual vector) 를 구하는 것이 핵심임을 체감할 수 있음. 
      - 또한, 100쪽씩 되는 분량의 글이 아닌, 수십쪽의 슬라이드 이기 때문에 빠르게 실습해보고 감을 잡을 수 있어 좋다. 
  - ps: 
    - 이 실습 이후 Grisetti 님의 최신 논문 <a href="https://arxiv.org/abs/2002.11051" target="_blank"> Least Squares Optimization: from Theory to Practice</a> 을 같이 읽으면 좋다. ICP외에도 projective error, BA 등 SLAM에서 주로 쓰이는 application 들에 대해서도 J, e 가 어떻게 생겼는지 소개해줌. 
<p id="m22"> </p>
- 2) Graph-Based SLAM and Sparsity
  - <a href="/materials/study/icra16tuto/icra16_slam_tutorial_stachniss.pdf" target="_blank"> Download</a>
  - Author: Cyrill Stachniss (2016)
  - 요약 및 선정이유:
    - 앞서 2-1) Grisetti 교수님의 자료에서는 small example (ICP) 만이 다루어졌는데, 만약에 state vector 가 매우크다면 Jacobian matrix 를 어떻게 운용해야 하는가? 에 대해 생각해볼 수 있음. 많은 그림을 함께 담고 있어 이해하기 좋음. 

<!-- --- -->
<p id="m3"> </p>
### 3. Course on SLAM
- <a href="/materials/study/soal17courseslam.pdf" target="_blank"> Download</a>
- Author: Joan Solà (2017)
- 요약 및 선정이유: 
  - 사실 SLAM에 대해 논하기 위해서는 가장 먼저는 coordinate transform[^ps2]에 대해 이야기해야 한다. 그리고 motion model, observation (measurement) model, 이런 용어들[^ps3]에 대해서도 먼저 소개해야 할 것이다. 공대 기계과 학부 2-3학년 수업이라면 아마 이런것들을 기본적으로 다 다룰 것이라 생각한다. 그래서인지 SLAM tutorial 들을 보면 이런 기초에 대해서는 다루고 있지 않지만 Sola 님의 이 자료에서는 그런것들도 빠르게 다루고 넘어가주는 것 (챕터 2-3)이 친절한 부분이다.  
  - 챕터 4에서는 Grisetti 님이 소개한 iterative optimization 에 대해 친절하게 다루어준다.  
    - 단, 위의 Sola 님의 자료 Quaternion kinematics ... 를 읽고 이 Course on SLAM 를 읽는 것을 추천함. 
  - 심지어 챕터 5에서는 이 다음에 소개할 4. Factor Graphs for Robot Perception 의 내용도 짧게 요약하고 있다. 
    - Factor Graphs for Robot Perception 를 읽기 전에 빠르게 보고가는 것도 좋을 것 같고, 아니면 4. Factor Graphs for Robot Perception (도 되게 친절하고 천천히 설명을 이어나가고 있으므로) 을 먼저 읽고 recap 차원에서 3. Course on SLAM 의 챕터 5로 돌아오는 것도 좋을 듯하다. 
  - Modern Graph-based SLAM에 대해 설명하고자 하면, 이 자료 하나만 보면 될 정도로 core 들이 compact 하지만 detail하게 빠짐없이 잘 수록되어 있다고 할 수 있을 듯하다.  

[^ps2]: <a href="http://www.mech.sharif.ir/c/document_library/get_file?uuid=5a4bb247-1430-4e46-942c-d692dead831f&groupId=14040" target="_blank">Introduction to Robotics (J. Craig, 2005)</a> 를 추천 (챕터2만 봐도 된다). <a href="https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=266139534" target="_blank">로보틱스 입문</a> 이라는 이름으로 한국어 번역도 되어 있어 좋다

[^ps3]: 그 유명한 probabilistic robotics 책을 추천. 

<!-- --- -->
<p id="m4"> </p>
### 4. Factor Graphs for Robot Perception 
- <a href="/materials/study/Dellaert17.pdf" target="_blank"> Download</a>
- Author: Frank Dellaert and Michael Kaess (2017)
- 요약 및 선정이유: 
  - 최근 SLAM 시스템을 직접 구현하기 위해서 대부분의 프로젝트들은 solver 로 Ceres 혹은 GTSAM을 채택하고 있다. 즉, 지금까지 이론적으로 iterative optimization 을 공부했다면, 그것을 우리가 실제로 구현하는 것은 아니고 그 solver 는 Ceres 혹은 GTSAM을 사용하는 것이 일반적이다. Frank Dellaert and Michael Kaess 는 GTSAM을 구현한 저자들로써 저자들이 어떤 철학을 가지고 efficient solver 들을 발전시켜왔는지 역사까지 함께 엿볼 수 있는 자료이다. 
  - Square root SAM (2006), iSAM (2008), iSAM2 (2012) 로 이어지는 sparse least-square optimization 을 푸는 방법 발전 순서를 볼 수 있으며 이에 대해서는 다른 자료에서는 거의 언급되지 않았으므로 이 자료의 가치가 있다. 
  - 특히 근본이 되는 Square root SAM 논문 내용에 대해 아주 길고 친절하게 설명이 되어 있으며 (~챕터4, ~67쪽), QR decomposition, fill-in, variable ordering 등 solver 의 computational 효율을 증진하기 위한 주요개념들이 많이 나오므로 꼭 봐두는 것이 좋다. 이 개념은 아래 5번 자료에서 소개할 Bundle adjustment 등에서도 중요한 일반적인 sparse linear algebra 개념이기 때문에 알아두면 좋다. 
  - 또한 이 교과서에서는 이론 외에도 왜 square root matrix 로 풀어야만 하는가? 그것의 의미는 무엇인가? 이런거에 대해서도 (저자직강으로) 인사이트를 제공해주고 있는 점이 좋다 (<a href="/materials/study/icra16tuto/icra16_slam_tutorial_kaess.pdf" target="_blank">12 page 참고 - Efficient Incremental Smoothing, 2016 ICRA tutorial, by Michael Kaess</a>). 즉, Measurement Jacobian matrix 는 사실 factor graph 와 동치이고, information matrix 는 Markov Random Field 이며, Square Root Inf. Matrix는 Bayes Tree 이다, 라는 것. 


<!-- --- -->
<p id="m5"> </p>
### 5. Bundle Adjustment – A Modern Synthesis
- <a href="/materials/study/Triggs99.pdf" target="_blank"> Download</a>
- Author: Bill Triggs et al. (1999)
- 요약 및 선정이유: 
  - 그러면 지금까지 소개한 내용들이 SLAM으로 인해 2000년대 말 이후에 접어들며 발전된 것이냐? 하면 그게 아니라 이론적인 토대는 이미 다 있었다고 생각이 된다. 특히 photogrametry 나 computer vision 사람들이 풀던 SfM (structure from motion) 이라고도 불리는 bundle adjustment 라는 문제가 있다. SLAM은 종종 Sequential SfM 이라 불리기도 할 정도로 optimization 관점에서 근본을 많이 공유하고 있다. 
  - 하지만 앞에서 소개한 자료들이 좀 더 이론적인 배경을 쌓기에는 좋다고 생각되어 먼저 소개하게 되었다. 이런 이론적 토대를 가지고 bundle adjustment 라는 문제를 풀 때 구체적으로 어떤 요소들을 더 고민해야 하는지에 대해 깊게 들어가기 위해 이 자료를 추천한다[^ps4].

[^ps4]: 이론적 토대는 이미 1999년에 논문이 나올 정도로 구축되어 있었지만, 최근에 Apple 이 <a href="https://developer.apple.com/kr/augmented-reality/object-capture/ " target="_blank">Object Capture</a> 라는 API를 공개한 것이 흥미롭다. <a href="https://youtu.be/IXMCAvocxXc " target="_blank">Polycam</a> 등 상용앱에 bundle adjustment 기능이 들어오기 시작하는 등, 이제는 누구나 높은 accuracy 의 structure from motion을 직접할 수 있는 시대가 되고 있는 듯하다. 

---
## SLAM 기본기를 위한 자료들++ 

- 지금까지 optimization 기반의 SLAM 을 위한 이론적 토대를 다지기 위한 자료들을 소개했다. 
  - 하지만 visual-inertial (2007 ICRA, MSCKF), lidar-inertial (2021 RA-L, FAST-LIO) 등 특정 센서 조합에 대해서는 filtering 기반 방법도 여전히 정확하고 가볍게 쓸 수 있어 좋은 듯하다. 
    이 방법들은 error state 의 최적값을 예측하여, 현재 state 에 더해주는 식으로 현재 state 를 추정 (filtering) 하게 된다. Sola님의 1. Quaternion kinematics for the error-state Kalman filter 자료 뒷부분에 대해서 이 개념에 대해 다루기는 했지만 약간은 설명이 부족했다고 느껴진다. 
  - 그래서 Aided Navigation: GPS with High Rate Sensors 라는 책이 상당히 구체적으로 다루고 있는 듯한데 (대충만 훑어봄), 이 책에 대해 공부해보는 것도 좋을 것 같다. 
    - FAST-LIO 그룹에서 공개한 <a href="/materials/study/ikfom21.pdf" target="_blank">IKFoM (Kalman Filters on Differentiable Manifolds)</a> 논문에도 Related work 이 잘 되어 있어서 함께 보고자 한다.  
- 앞서 소개한 5개의 자료들은 SLAM back-end 의 수학적 기초에 대해 다루었다고 할 수 있다. 
  - 하지만 SLAM은 특정 센서가 센서데이터를 처리하고 요약하여, 해당 센서에 맞는 measurement model 을 정의하는 것부터 시작된다. 이 부분을 front-end 라고 하고 SLAM 의 전 과정을 이해하기 위해서는 빼놓을 수 없다. 
  - 특히, camera 가 SLAM을 위한 가장 널리 쓰이는 센서이기 때문에 visual SLAM을 위한 front-end 에 대해 실습을 통해 공부하는 것은 중요하다. 
  - 이에 대해서 최근(2021년 6월)에  <a href="https://github.com/gaoxiang12/slambook-en/ " target="_blank">slambook 이라는 중국어 교재의 영어번역</a> <a href="/materials/study/slambookEng21.pdf" target="_blank"> (Download) </a>이 끝났다고 한다 <a href="https://www.springer.com/gp/book/9789811649387" target="_blank"> (Springer 를 통해 책이 출간되기도 했다!) </a>. Eigen, opencv 등 실제 C++ 코드를 함께 소개하고 있어 practically 좋은 듯하다. 
    


    

    

---
### 주석 