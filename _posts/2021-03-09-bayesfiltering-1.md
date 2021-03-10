---
layout: post
showlist: true
title: "Bayesian Filtering 이야기 (1편): posterior 의 mean, covariance 구하기 (수식 유도)" 
season: Filtering-based SLAM
type: research
categories:
- blog
tags:
- Blog
use_math: true
---
# 개요

SLAM은 filtering-based 와 optimization-based 로 편의상 나눌 수 있다.  
(물론 두 방법이 robot 의 state 를 추정하는데 상보적으로 동시에 쓰일수도 있다.)

<span style="color:gray"> [Factor graph-based SLAM] </span> 에서는  
optimization-based 기반의 SLAM에 대해서 소개하고 있다. 

한편,  <span style="color:gray"> [Filtering-based SLAM] </span> 시리즈에서는  
filtering-based SLAM 에 대해서 소개하려고 하는데,  
이 포스트 (와 몇 편 더) 에서는, 그전에 먼저  
filtering-based SLAM의 근간이 되는 Bayesian analysis 자체에 대해 소개하려고 한다.  
mathmatical machinary 랄까, 기본을 알면 SLAM은 오히려 쉬울 것이다. 
<br>

--- 
# Bayesisan Analysis 란?

## Intro 

Bayesisan Analysis 이 무엇인지 설명하기 전에,  
Bayesisan Analysis 이 왜 필요한지, 예시 상황으로부터 시작해보자. 

우리는 어떤 한 시점에서 로봇의 위치를 알고싶다.  
이 경우 위치를 $\textbf{x}_{i} = (x, y)$ 의 두 값으로 표현할 수 있다. (heading 은 편의상 생략)

- 상황 1: 
  <p style="margin-top:-15px"> </p>
  로봇은 위치를 추정하기 위해서 GPS를 사용했다.   
  GPS는 로봇의 위치가 $(1,2)$ 라고 알려주었다 (measurement, $h_1(\cdot)$).  
  
  그래서 로봇은 자기의 위치를 $(1,2)$ 이라고 생각하고 여러 미션을 수행하려고 한다.  
  
  근데 GPS는 로봇의 위치가 다시 $(1.5, 3)$ 라고 알려주었다 (measurement 2, $h_2(\cdot)$).  
  그래서 로봇은 자기의 위치를 다시 $(1.5, 3)$ 으로 바꿨다.  
  근데 GPS는 로봇의 위치가 다시 $(2.5, 1)$ 라고 알려주었다 (measurement 3, $h_3(\cdot)$).  
  그래서 로봇은 자기의 위치를 다시 $(2.5, 1)$ 으로 바꿨다.  
  
  ... 무한반복 ...  
  로봇은 확신없이 자기 위치를 결국 추정하지 못하고 결국 세월이 다갔다 ...  

  이렇게, 매번 개별 measurement만의 가능도 (likelihood) 를 최대화 해주는 방식으로  
  위치를 추정하는 게 좋은 방법일까?  
  이러면 그때그때 들어오는 measurement 에 biased 된 예측이 내려질 것이다[^likelihood]. 

  [^likelihood]: <a href="https://dtransposed.github.io/blog/Bayesian-Linear-Regression.html" target="_blank"> 이 블로그 </a>의 gif 예제를 보면 이해하기 쉽다. <a href="https://dtransposed.github.io/assets/9/batch_1/Data_Space.gif" target="_blank"> data point들이 sequentially 들어올 때 </a>, 그때그때마다의 measurement에만 최대로 fit하는 예측을 내리게 된다면 <a href="https://dtransposed.github.io/assets/9/batch_1/Likelihood.gif" target="_blank"> 이렇게 들쭉날쭉한 결과를 얻게 될 것이다. </a>

<p id="situ2"> </p>
- 상황 2:  
  <p style="margin-top:-15px"> </p>
  상황1과 똑같이, 로봇은 위치를 추정하기 위해서 GPS를 사용했다.   
  GPS는 로봇의 위치가 $(1,2)$ 라고 알려주었다 (measurement, $h_1(\cdot)$).  

  근데 이 로봇은 자기의 현재 위치가 $(0.5, 2)$ 라고 믿고 있는 상태이다 (prior).  
  이 값은 현재 시점에서 측정 (measurement) 한 것은 아니지만 로봇이 알고있는 어떤 믿음이다. 

  로봇은 이 경우에도 상황1에서와 같이 현재 측정된 정보만을 최대화 하도록  
  자기의 위치를 추정해야할까?  
  흠 근데 그건 좀 unreasonable 해 보인다.  
  prior 와 measurement 두 정보를 모두 고려하는 게 좋을 것 같다.

  근데 만약 prior 와 measurement 두 정보를 모두 고려한다 하더라도,  
  수학적으로 어떻게 융합하여야 하는가? 

이에 대답하기 전에 먼저 아주 간단한 수학을 recap하고 넘어가자. 

## Bayes Rule

Bayesisan Analysis 의 기본 틀은 Bayes Rule 이다.  
대학교 확률과 통계 수업을 들으면  
거의 첫주에 배우는 아주 기초적이고, 제일 먼저 나오는 내용이라고 할 수 있다.  
다들 알다시피 Bayes Rule 을 쓰면 다음과 같다.

$$
\begin{align*}
  p(A \ | \ B) &\propto p(A) \cdot p( B \  | \ A) \\ 
\end{align*}
$$

그런데 robotics (or 여타 estimation 문제) 에서 실제로 중요한 것은  
위에서 $A$와 $B$의 위치가 바뀌는게 베이즈어쩌구구나~ 음~ 외웠어~ 가 아니라   

$A$와 $B$ 자리에 들어가는 것이,  
<u>실 세계에서 어떤 물리적 의미를 지니는지</u>를 이해하는 것이 중요하다.  

## Bayesisan Analysis 란?

Bayesian analysis 는 우리가 알고싶은 parameter (들, variables as vector)의  
posterior probability 를 maximize 하는  
optimal parameter (그래서 maximum a posteriori, MAP) 를 찾는 방법을 말한다.

먼 말인지 차근차근 살펴보자. 

우리는 시스템의 어떤 상태에 대해 알고 싶다  
(예: 로봇의 위치, 로봇의 calibration parameter 등 어떤 것이든.)  

이것을 $\textbf{x}$ 라고 해보자 (state). 

우리는 $\textbf{x}$ 를 예측하기 위한 단서들을 가지고 있다 (measurement).  
로봇은 센서를 가지고 있기 때문에 다양한 측정을 할 수 있다.  
(예: laser 센서로 알려진 랜드마크까지의 거리를 재기, GPS로 위치를 바로 얻기 등)  

robotics 에서 measurement 는 문자로 적을 때는 $\textbf{z}$ 로 많이 적는 편이다. 

따라서 우리가 관심있는 SLAM (i.e., state estimation) 이란 문제는,  

로봇이 가진 센서를 이용해서 얻은 다양한 측정값이 주어졌을 때 (given),  
$\textbf{x}$ 를 추론하는 과정 이 된다 (inference).

이를 수학적으로 표현하면 $p ( \textbf{x} \ \| \ \textbf{z}_{1:k} )$ 로 쓸 수 있다.  

중간의 $\|$ 는 "given" 으로 읽는다.  
$\textbf{z}$의 subscript 인 $1:k$는 총 k개의 measurement 가 있다고 가정하자, 라는 의미인데 간단히 생략되기도 한다.  
문맥에 따라 때로는 time $= 1$ 부터 $t$ 까지의 측정값, 처럼 time 에 걸쳐 얻은 measurement 로 이해되기도 한다.  

따라서 SLAM (state estimation)이란 무엇인가?  
수학적으로:  
$\textbf{z}$가 given 일 때  
$\textbf{x}$의 확률이 최대가 되는 $\textbf{x}$ 값을 구하는 것이다.  

그런데, Practically, 공학적으로는 어지간하면  
우리는 관심있는 random variable 들 ($\textbf{x}$ 등)이  
모두 Gaussian 이라고 가정한다.  
Gaussian 분포는 여러가지 유용한 성질이 있기 때문이다 (후술함). $+\alpha$[^alpha]  

암튼 우리가 최대화하려는 이 확률 $p ( \textbf{x} \ \| \ \textbf{z}_{1:k} )$ 은  
measurement 가 측정이 완료되어서, 주어져야 계산할 수 있기 때문에  
사후확률 (posterior) 이라고 부른다. 

그런데 이 posterior는 Bayes rule 에 의해,  
다음과 같이 두개의 텀으로 분리가 되고, 각각을 prior 와 likelihood 라고 부른다.  

$$
\begin{align*}
  p(\textbf{x} \ | \ \textbf{z}_{1:k}) &\propto p(\textbf{x}) \cdot p(\textbf{z}_{1:k} \ | \ \textbf{x}) \\ 
  \text{posterior} &\propto \text{posterior} \cdot \text{likelihood}
\end{align*}
$$

[^alpha]: Factor graph-based SLAM 에서는 Gaussian noise 를 가정할 경우 Probability의 사뭇 추상적이었던 수식이 Least-square optimization 으로 과 동치가 되고, 문제를 iterative optimization으로 풀 수 있다는 장점이 있기도 하다. <a href="https://link.springer.com/article/10.1023/A:1008854305733"> Lu and Milios 의 1997년 논문</a> 이 optimization-based SLAM의 시초로 평가받는 듯하다. (하지만 이에 대해서 입문용으로는 Square Root SAM 논문이 제일 정석적이고 좋은 듯)


여기서 보통 분모는 normalization 용도 (확률의 정의를 지켜주기 위해서 sum 을 1로 만들어주는 역할)로 생각되기 때문에, 통상적으로 practically 생략하는 편이 많다. 어짜피 우리가 관심이 있는 것은 최대확률값이 아니라, 최대확률이 될 때의 $\textbf{x}$값이기 때문이다 (상수의 곱에 무관하다).

이 때 보통 우리는 prior 와 likelihood 가 둘 다 Gaussian 을 따른다고 가정한다.  
그러면 Gaussian 의 좋은(!) 성질 덕분에 posterior 도 Gaussian이 된다. 

여기서 그럼 다시 물어야 할 것이, posterior가 Gaussian인 것이 (state estimation 관점에서) 왜 중요할까?

- 일단 Gaussian은 optimal argmax 값을 얻기가 편하다 (median이 mean 과 같음).  
- 그리고 Gaussian인 경우, 자연스럽게 recursive 한 estimation 이 가능해진다.  
이게 뭔말이냐면, 현재 턴의 posterior 가 다음턴의 prior 로 쓰인다고 생각해보자.  
앞서, 우리는 prior 가 Gaussian이라고 가정했었다. 그럼 posterior 도 Gaussian이 되고, 다음턴의 prior 도 다시 Gaussian이 되고, 그 턴의 posterior 도 다시 Gaussian이 되고, ... 무한 반복.[^conju]

[^conju]: 우리는 지금 posterior 가 prior 와 같은 분포 패밀리가 되는 것을 원하고 있었다. Gaussian = Gaussian $\times$ Gaussian 인 조합 외에, conjugate distribution이라고 검색해보면 몇개 더 다양한 분포의 조합이 가능함을 알 수 있다. 하지만 practically, Gaussian 말고 별로 다른 조합은 적어도 SLAM에서는 잘 써본 적이 없다 (== Gaussian에 대해서만 일단 잘 알면 된다). 

즉, 현재 시점에서 얻은 사전 정보를 다음턴에 자연스럽게 활용할 수 있다.  
- 심지어 가우시안의 유용한 성질들 덕분에 그 recursive update 조차도 closed form 으로 딱 떨어진다 (곧 증명해본다). 

- 또한, Gaussian은 mean (optimal) 과 더불어 covariance (uncertainty) 도 얻을 수 있다.  
(robotics 는 거의 uncertainty 에 관한 학문이라고 할 수 있을만큼 이 uncertainty 는 다양하게 쓰이고 중요하다)  
예를 들어 앞서 본 <a href="#situ2">예시상황2</a> 에서 prior 와 likelihood 를 어떻게 융합해야하는지에 관한 문제가 있었다. 이 비율의 balancing 이 prior 와 likelihood 각각의 uncertainty 들에 의해 조절된다 (곧 증명해본다)!

## 암튼 정리해보자면  
우리가 state estimation 에서 Bayesian filtering 이라고 부르는 것은 다음과 같은 상황을 의미한다.  
- 로봇은 자신의 위치 (and 속도, 주변 맵 포인트들의 위치, 자신의 내부 상태 등 다양한 어떤 값들) $\textbf{x}$ 를 알고 싶다. 
- 로봇은 센서측정데이터 (measurement) $\textbf{z}_{1:k}$ 를 가지고 있다.  
- 우리는 $ p(\textbf{x} \ \| \ \textbf{z}_{1:k}) $ 를 최대화 하고 싶다.  
  == 우리는 posterior probability 의 mean (== 확률을 최대로 하는 $\textbf{x}$) 과 covariance 를 알고 싶다. 
- 우리는 posterior 를 직접 최대화하는 것이 아니라, 대신 우회적으로 prior 와 likelihood 의 곱을 최대화 한다. 
- prior 와 likelihood의 분포로 Gaussian 을 사용한다.
- covariance는 pior 와 likelihood 를 융합할 때 기여도를 고려하는 역할을 한다.[^cov] 
  
[^cov]: 또한, covariance 는 uncertainty 의 의미로써 그 자체로도 solely 다양한 application에 활용 될 수 있다. 예를 들어 loop closing 을 수행하기 위해 어느 정도 반경 내의 후보 node 들만 검색하는 등 search space 를 줄여줄 수 있다. 

---
# Posterior 의 mean, covariance 구하기 

이번 포스팅에서 원래 하려고했던 걸 이제야 소개한다. 

WIP ... 


--- 
# 요약


--- 
## 예고 


--- 
## 생각해보기


---
### 주석