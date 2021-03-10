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


## Bayesisan Analysis 란?

Bayesian analysis 는 우리가 알고싶은 parameter (들, variables as vector)의  
posterior probability 를 maximize 하는  
optimal parameter (그래서 maximum a posteriori, MAP) 를 찾는 방법을 말한다.

다들 알다시피 Bayes Rule 을 쓰면 다음과 같은데

$$
\begin{align*}
  p(A \ | \ B) &\propto p(A) \cdot p( B \  | \ A) \\ 
\end{align*}
$$

robotics (or 여타 estimation) 에서 실제로 중요한 것은  
위에서 $A$와 $B$의 위치가 바뀌는게 베이즈어쩌구구나~ 가 아니라  
$A$와 $B$ 자리에 어떤 물리적 의미를 지니는 것이 해당하는지가 중요하다.  


$$
\begin{align*}
  p(\theta \ | \ \textbf{y}_{1:t}) &\propto p(\theta) \cdot p(\textbf{y}_{1:t} \ | \ \theta) \\ 
  \text{posterior} &\propto \text{posterior} \cdot \text{likelihood}
\end{align*}
$$

WIP ... 

--- 
# 요약


--- 
## 예고 


--- 
## 생각해보기


---
### 주석