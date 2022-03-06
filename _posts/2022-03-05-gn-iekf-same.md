---
layout: post
showlist: true
title: "Gauss-Newton Opt == IEKF update ?" 
season: SLAM Study
type: research
categories:
- blog
tags:
- Blog
use_math: true
---

# 읽은 글

SLAM 공부 블로그 글을 하나 읽고 요약/느낀점을 남깁니다
- IEKF and Gaussian-Newton method equivalence proof
  - [https://zhuanlan.zhihu.com/p/447014586](https://zhuanlan.zhihu.com/p/447014586)
  - 크롬에서 영어번역해서 보시면 됩니다. 대체로 중국어는 영어번역이 매우 깔끔한 경향이 있네요.

# 배경지식1: KF

애초에 KF 가 optimal estimator 라고 불리는 이유를 생각해보면 

KF의 태생은 least sq. 였다. 

estimated (expected) 와 measured 의 차이의 variance 를 minimization 하는 식을 유도하고 (그런데 var 는 정의상 L2 norm 이고 따라서 least square minimisation 문제와 동치가 된 것!) 

- ps. 유도과정에 대해서는 Kalman 의 60몇년도 그 seminal 논문을 봐도 되겠지만 개인적으로는 04 book KALMAN FILTERING AND NEURAL NETWORKS 의 챕터1  설명이 좋았었다.

이 때 Kalman Gain 이라는 치환을 통해 식을 깔끔하게 정리하고 나니 

결과적으로 closed form 으로 KF 라는 engine 이 예쁘게 유도된 것. 

- ps1. 사실 problem size 가 크지 않을 때 hessian 의 inverse 를 곱해서 normal equation 을 바로푸는 것처럼, least square optimization 역시 closed form 으로 바로 풀리긴 한다.
- ps2. Matlab 에서는 $Ax=b$ 를 푸는 몇 가지 다양한 방식을 지원하는 것으로 알고 있는데, 그 중 slash operator 는 QR decomposition-based 로 푸는 것
  - see [here](https://www.mathworks.com/content/dam/mathworks/mathworks-dot-com/moler/leastsquares.pdf)
  - 한 편, $\|Ax-b\|$ 뿐 아니라 $\|x\|$ 도 함께 최소화하도록 하는 regularizer 가 포함된 [lsqminnorm](https://kr.mathworks.com/help/matlab/ref/lsqminnorm.html) 이라는 버전도 지원한다.

# 배경지식2: Iterative nature

그런데 robot (online) state estimation 과 같이 measurement 가 시간에 따라 sequential 한 stream 으로 들어오는 경우 

전체 measurement 를 모아뒀다가 해를 계산하는 batch solution 을 지양하게 되므로 

iterative least square optimization 으로 보통 해를 구하게 된다. 

이 때 iterative 라는 단어의 의미에 대해 좀 더 첨언을 하자면.

원래 $Ax=b$ 를 풀던 것을 $A\delta x = b$를 만족하는 optimal 한 $\delta$${x}^{\*}$를 구하고, $x \leftarrow x \oplus \delta x ^{\*}$ 를 통해 $x$를 업데이트해주는 것. 

$\delta x ^{*}$ 가 사전에 설정한 변화량 threshold 보다 작아지면 수렴한 것으로 보고 이 때의 해 $x$ 를 최종 optimal solution $x^{*}$ 로 확정한다. 

- ps. 이 때 $\delta$$x$ 를 업데이트 하는 1. 방향, 2. 크기 를 어떻게 설정하느냐에 따라 line-search-based or trust-region based 로 나뉘며, 이들의 핵심은 1차미분을 활용하느냐, 2차미분을 활용하느냐 라고 할 수 있겠다.
    - 2차미분 활용방식인 Newton 계열을 개선한 것이 Gauss-Newton 이고, 여기에 damping 을 더하면 LM (Levenberg–Marquardt) 가 된다.
    - 이에 관해서는 다크프로그래머 님의 글이 최고 [https://darkpgmr.tistory.com/149](https://darkpgmr.tistory.com/149)

KF 에서도 이렇게 $\delta x$ 의 최적값을 구하고 nominal state 에 더해주는 (즉,  $x \leftarrow x \oplus \delta x ^{*}$) 방식의 방법이 IEKF (Iterated Kalman Filter) 라고 불린다. 

- 혹은 error-state kf (ESKF) 라고도 불리는 듯.
    - 오늘 읽은 블로그 글 저자의 iekf 에 대한 다른 블로그 글도 좋음
        - [https://cggos.github.io/map-mle-ols-gn-iekf-ekf.html#iekf](https://cggos.github.io/map-mle-ols-gn-iekf-ekf.html#iekf)
        - [https://zhuanlan.zhihu.com/p/66646519](https://zhuanlan.zhihu.com/p/66646519)
    - or 앞선 포스팅 에서 소개한 <a href="{{ site.baseurl }}{% post_url 2021-10-03-slam-textbooks %}#m1"> Joan Sola 님의 자료</a> 도 이에 관한 내용. 
    

# 요약

암튼 오늘 읽은 글이 그 두개가 수학적으로 동치라는 것을 이야기하는 글이었다. 

- [https://zhuanlan.zhihu.com/p/447014586](https://zhuanlan.zhihu.com/p/447014586)
- 대충 요약하자면 residual minimization 문제는 결국 unified state vector 에 대한 Normal distribution 을 따르는 error 가 0이 되도록 하는 것이 목적인 MLE problem 이므로,
    - cost =  residual.transpose() * Covariance * residual 를 최소화하는 것으로 수학적인 모델링이 된다.
    - 이 때 중앙의 covariance 를 어떻게 굽고 삶느냐에 따라 gauss-newton 꼴로 식이 정리되는지, IEKF 꼴로 식이 정리되는지의 차이가 날 뿐이라는 것이 결론이다.
    

# 생각해볼 점

그나저나 블로그 글 마지막에 **Solver $\neq$ Problem Structure** 라는 부분이 좋았다. 한번 생각해볼 가치가 있다. 

지금까지 solver 로써 GN Optimization-based 와 IEKF 가 sovler 로써는 결국 같은 것을 푸는 것이라고 이야기 했다. 

그리고 GN 계열에는 VINS-Mono (VINS-Fusion) 가 대표적 (OKVIS도 있다) 이고, IEKF 계열에는 MSCKF 가 대표적이다. 

- 둘다 인용도 많고, TRO/IJRR 에 오른 쟁쟁한 검증된 방법들이다.
    - MSCKF 2.0: 13 IJRR High-Precision, Consistent EKF-based Visual-Inertial Odometry
    - VINS-mono: 18 TRO Vins-mono: A robust and versatile monocular visual-inertial state estimator

그런데 SLAM 학계에서는 유명한 Visual SLAM: why filter? 라는 논문이 있고, 최근 VINS-Mono 같은 것이 SOTA라고 이해되면서 

filter는 무조건 optimization-based 에 비해 안좋다, 라는 (잘못된?) 인식이 퍼져있는 듯한데, 

그것에 대해 블로그 저자도 이야기를 하고 있다. 

결국 최근 들어 optimization-based 성능이 좋아보이는 것은 problem structure 가 다르기 때문이라는 것. 

“VINS-mono is better than that of MSCKF to a greater extent, not because VINS uses an optimization-based solver and MSCKF uses a filter-based sovle” 

즉, VINS-mono 가 단순히 GN-opt 기반이어서 좋고 MSCKF가 filter-based 라서 안좋은 게 아니라, 

VINS-mono 라는 특정 방법 자체가 MSCKF 보다 더 나은 problem structure (즉, 더 나은 system matrix, $A$) 를 가지고 있기 때문에 좋다는 것.

이것은 단순히 optimization 으로 풀어서 좋다기 보다 VINS-mono 라는 방법론 자체가 contribution 을 가지고 있기 때문으로 이해하는 것이 맞을 것이다. 

그리고 (개인적인 생각으로) 엔지니어링 관점에서 추구하는 바 자체의 차이가 있다고 생각해야 할 듯하다.  

뭔 소린가 하면, 

Optimzation 기반 방법은 initial esatimate 을 어떻게든 아무튼 얻어서, 이것을 GN 상에서 iterative 하게 잡아가는 방식이다. 

따라서 good correspondence 를 제공하는 front-end perception (e.g., feature matching) 등 computer vision method 에 의존하는 바가 크다.   

그래서 VINS-mono 등 GN-Opt 류의 방법들은 bundle optimization (within a sliding window) 를 거의 포함하게 된다. 

반면, (IE)KF 류는 motion model 을 공들여서 잘 세우고, predict and update 라는 2-step 관점에서 돌기 때문에 

IMU fusion 에 좀 더 의도가 적합한 방법이 아닌가 하는 느낌이 든다. 

- 즉 IEKF는 proprioceptive sensor (e.g., IMU) 와 exteroceptive sensor (e.g., GNSS, Camera) 를 융합하는 엔지니어링 디자인을 선택할 때 더 적합한 듯하다.
    - IMU를 motion model for prediction 로 사용하고, gnss 나 camera 등을 update 용으로 사용하는.
        - 이것 역시 SLAM 학계가 개발했다기보다는 이미 항공기 항법 연구자들에서는 IMU+GPS fusion 기반 방법이 이론적으로 잘 수립되어있었던 듯 하다.
            - 08 book AIDED NAVIGATION - GPS with high rate sensors 라는 책이 좋았었다.
    - 하지만 ORB-SLAM (2015) 에 오면서 camera 하나로만으로도 다할 수 있다고? 라는 점에서 (물론 03 Mono-SLAM과 08 PTAM때를 시초로 보기는 하지만 실제로 성숙한것은 15 ORB-SLAM이라고 보여지기 때문에) 학계에 쇼크를 주기는 했지만, ORB-SLAM이 실제로 산업계에서 쓸만한 속도+성능이 만족이 되나? 하면 그렇지 못할 때가 많다. fail 할 때도 많고. 결국 fail-safe 하면서도 가볍고 성능도 좋으려면 imu-fusion 을 안할 이유가 없어진다.
        - 그래서 이후에 ORB-SLAM 의 IMU 버전도 나오긴 했지만 ... MSCKF 계열의 OpenVINS (2020) 가 요즘은 더 국룰이 되어가는 것 같은데 ...

최근에 FAST-LIO (2022 RA-L) 라는 방법은 IEKF 류의 방법인데, 여러 Lidar odometry 들을 돌려본 결과 기존 다른 방법들보다 실험적으로 좋은 듯하다 (lidar 는 3d measurement 가 정밀하기 때문에 BA를 할 필요가 없는 이득을 본 것도 있겠지만).

같은 그룹에서 FAST-LIO 를 backbone 으로 해서 camera fusion 을 하기 위해서 visual-side 에만 local BA를 더한 R2LIVE 라는 방법을 냈는데, 이 논문은 그래서 IEKF 의 적합한 사용처 (lidar-imu odom) 와 Optimization-based solver 의 적합한 사용처 (visual map construction and this-based vo) 를 잘 이해하고 융합한 것이 아닌가 생각이 든다. 최근 본 fusion 논문들 중에 엔지니어링 설계적으로 가장 말이 되는 (가볍고 성능도 좋은) 디자인이 아닌가 싶다. 

# 결론

아무튼 IEKF 가 실제로 from scratch 로 구현하기에는 더 적합한 면이 있어서 사용하기 좋은 듯 하긴 하다. 

- e.g.,
    - https://github.com/hku-mars/IKFoM
    - https://github.com/cggos/imu_x_fusion

하지만 2022 년 현재 ceres 라는 강력하고 쓰기 쉬운 optimization library 가 점점 학계/업계를 삼키고 있는 듯한 느낌이 든다. 

즉, 잘 만들어진 GN or LM-optimization 을 각자 구현하기에 어려움이 있을 수 있는데, 좋은 optimization solver 가 이제 편하게 사용가능하니 

optimization 기반으로 state estimation 을 수행하지 않을 이유도 좀 없어지고 있는 것 같기도 하고. 

예전에 from scratch 로 구현할 때는 Jacobian 을 analytic 하게 다 계산해서 식을 적어주고 이랬어야 되었어서 

nonlinear measurement function 의 경우 자코비안 유도도 어렵고 한 측면이 있었지만 

Ceres (나 tf, pytorch 도 마찬가지고) 는 auto-diff 라고 해서 계산그래프 형태로 variable 들의 Jacobian 을 자동으로 계산하기 때문에 

실제로 사용자가 자코비안을 유도할 일이 없어졌고, 결과적으로 아무 loss term 이나 부담없이 추가할 수 있게 되었다. 

- ps. see [https://wang-yimu.com/ceres-solver/](https://wang-yimu.com/ceres-solver/), and [https://wang-yimu.com/implement-tensorflow-pytorch-from-scratch/](https://wang-yimu.com/implement-tensorflow-pytorch-from-scratch/)

물론 이것을 쓸만하게 잘 구현하는 것은 state estimation application 개발자 입장에서는 시간소요적이고 어려운 일이고, forward pass이냐 backward pass 냐 등 어떻게 구현하냐에 따라 성능도 달라지지만, 아무튼 이것을 이제 Ceres library 가 다 해주기 때문에 2022년 현재로써는 optimization 기반으로 떡칠? 해도 나쁘지 않지않나? 하는 학계의 흐름이 느껴진다. 

실제로 최근 논문들을 보면 전통적인 SLAM 논문이지만 마치 최근의 deep learning 논문들처럼 final loss term = residual_1 + residual_2 + .. 이런식으로 최종 식만 적혀져있고 이것들의 Jacobian 등을 굳이 적어두지 않는 듯하다 (그냥 ceres 를 이용해서 풀었다고 적혀있다 ...). 옛날 논문들을 보면 거대한 system matrix 의 Jacobian 을 적기 위해 많은 공간이 할애되었던 (+독자들에게 위협을 주었던)  것을 생각하면 격세지감이다 ..

**결론**:

- 아무튼 filter-based approach 도 요구사항에 따라 (e.g., IMU fusion), 현재도 여전히 유효하다고 판단되고, 오히려 더 필요하다고 생각된다 (역시 IMU 없이는 아무래도 강인한 state estimation 는 어려워보인다)
- 반면 optimization-based approach 는 최근 Ceres 라는 library 가 널리 사용되면서 (그전에도 matlab, numpy, scipy, opencv 등에서 단순한 Ax=b 를 풀어주는 solver는 존재했지만 — 이들은 계산그래프는 아니고 대신 QR-decomposition 기반으로 알고있다, see [here](https://www.mathworks.com/content/dam/mathworks/mathworks-dot-com/moler/leastsquares.pdf)) 좀 더 임의의 상황에 generic 하게 쓰일 수 있게 되었다.
- 따라서 + 그리고 당연히 filter-based equation 역시 그 출처는 least-square optimization 이기 때문에 최적화 공부를 또 단단하게 해야겠다 (optimization 방법론이 더 대중적으로 쓰이기도 하고).

