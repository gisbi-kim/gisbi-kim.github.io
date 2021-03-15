---
layout: post
showlist: true
title: "Bayesian Filtering 이야기 [2편]: Recursive estimation 의 시작 (칼만필터 유도 1)" 
season: Filter-based SLAM
type: research
categories:
- blog
tags:
- Blog
use_math: true
---

# 개요

<a href="{{ site.baseurl }}{% post_url 2021-03-09-bayesfiltering-1 %}#proofdone"> 앞선 포스팅 </a>에서 우리는 posterior 의 mean 과 covariance 가  
prior 와 likelihood 로부터 closed form 으로 유도됨을 살펴보았다. 

근데 지난포스팅에서도 몇번 이야기 했듯이: 
> Bayesian analysis 의 묘미는 현재 턴의 posterior 가 다음 턴의 prior 로 쓰이는 것

이다. 

<span style="color:gray"> [Filter-based SLAM] </span> 시리즈의 <a href="{{ site.baseurl }}{% post_url 2021-03-09-bayesfiltering-1 %}"> 이전 편 </a> 을 마무리했던 그 식 을 다시 들고와보자. 

$$
\begin{equation}
  p(\textbf{x} | \textbf{z}) = \mathcal{N} \left( \text{mean: } \left(\textbf{P}_0^{-1} + \frac{1}{\sigma^2}\textbf{H}^{T}\textbf{H} \right)^{-1} \left( \textbf{P}_0^{-1} \textbf{m}_0 + \frac{1}{\sigma^2}\textbf{H}^{T}\textbf{z} \right), \\
  \ \text{covariance: } \left(\textbf{P}_0^{-1} + \frac{1}{\sigma^2}\textbf{H}^{T}\textbf{H} \right)^{-1} \right) \tag{eq.1}\label{eq:1}
\end{equation}
$$

이 식은 batch estimation 이었다고 할 수 있다.  
- 즉 measurement ($\textbf{z} = \textbf{z}_{1:k}$) 들이 한번에 모두 주어져있고,  
- 우리가 알고싶은 state $\textbf{x}$ 에 대한 초기 mean $\textbf{m}_0$, covariance $\textbf{P}_0$ 가 initial value 로써 주어지는 상황이었다. 

이번 포스팅에서는 이것을 recursive version 으로 바꾸어 볼 것이다. 

---
# Recursive estimation 

사실 여기서부터는 쉽다.  
"현재 턴의 posterior 가 다음 턴의 prior 로 쓰인다"는 묘미를 기억하자. 

식 \eqref{eq:1} 에서의 posterior의 mean 과 covariance 가  
각각 $\textbf{m}\_{t-1}$, $\textbf{P}\_{t-1}$ 였다고 하자.  

그리고 지금은 time$=t$ 가 되어서,  
새로운 measurement $z_t$ 가 하나 들어온 상황이다.  
(꼭 딱 하나일 필요는 없지만 편의상 하나라고 해보자)


그러면 위의 식 \eqref{eq:1} 에서,  
time$=t-1$의 posterior 가 다음 턴 time$=t$의 prior 로 쓰이기 때문에,  
- $\textbf{P}_0$ 자리에 $\textbf{P}\_{t-1}$ 라고 말만 다시 바꿔달면 된다. 
- $\textbf{m}_0$ 자리에 $\textbf{m}\_{t-1}$ 라고 말만 다시 바꿔달면 된다. 
- measurement $\textbf{z}$ 자리에 $z_{t}$ 라고 말만 다시 쓰면 된다.
- 그리고 measurement 의 jacobian 인 $\textbf{H}$는 현재 턴에 새로 들어온 measurement 의 것이므로 위의 식에서 $\textbf{H}$ 를 $\textbf{H}_{t}$ 라고 써주면 말이 된다. 

그러면 식은 다음과 같다:

$$
\begin{align}
  p(\textbf{x}_{t} | z_t) = \mathcal{N} \left(  \text{mean: } \left(\textbf{P}_{t-1}^{-1} + \frac{1}{\sigma^2}\textbf{H}_{t}^{T}\textbf{H}_{t} \right)^{-1} \left( \textbf{P}_{t-1}^{-1} \textbf{m}_{t-1} + \frac{1}{\sigma^2}\textbf{H}_{t}^{T}z_t \right), \\
   \text{covariance: } \left(\textbf{P}_{t-1}^{-1} + \frac{1}{\sigma^2}\textbf{H}_{t}^{T}\textbf{H}_{t} \right)^{-1} \right) \tag{eq.2}\label{eq:2}
\end{align}
$$

완성! 

참 쉽죠?

우리는 이제 관측 데이터가 순차적으로 하나씩 들어오더라도, 

예전 예측을 반영해서 최적해를 update 해나갈 수 있게 되었다!

---
# Recursive estimation: continued 

식을 조금만 더 수리해보자. 

재밌는게 나올 수 있다. 

위의 recursive 식에서 posterior (즉, update 된) 의 covariance 가  
$\left(\textbf{P}\_{t-1}^{-1} + \frac{1}{\sigma^2}\textbf{H}_{t}^{T}\textbf{H}\_{t} \right)^{-1}$ 였다. 

지금 measurement 의 noise 를 scalar 라고 가정해서 식이 저런건데  
사실은 이렇게 써져있는 거라고 머릿속에서 식의 생김새를 생각해주자

$$
\begin{equation}
    \textbf{P}_{t} = \left(\textbf{P}_{t-1}^{-1} + \textbf{H}_{t}^{T}(\sigma^{-2}\textbf{I})\textbf{H}_{t} \right)^{-1}
    \tag{eq.3}\label{eq:3}
\end{equation}
$$

<span style="color:gray"> (추후에 저 $\sigma^{-2}\textbf{I}$ 자리에 대신 임의의 noise matrix $\textbf{R}$ 같은걸로 교체해주기만 하면된다) </span>

근데 선형대수 꿀팁 중에 matrix inversion lemma 라는 것이 있다 [^woodbury].  

[^woodbury]: Woodbury formula, Woodbury identity 등으로도 알려져있다. <a href="https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf"> 출처 matrix cookbook </a>

대략 이런걸 해준다. 

$$
\begin{equation}
  (\textbf{A} + \textbf{C} \textbf{B} \textbf{C}^{T})^{-1} = \textbf{A}^{-1} - \textbf{A}^{-1}\textbf{C} ( \textbf{C}^{T}\textbf{A}^{-1} \textbf{C} + \textbf{B}^{-1})^{-1} \textbf{C}^{T} \textbf{A}^{-1}
  \tag{eq.4}\label{eq:4}
\end{equation}
$$

근데 우리의 covariance \eqref{eq:3} 가 딱 보니 \eqref{eq:4} 의 좌변의 생김새와 완전히 같지 않은가?

이렇게 치환해서 

$$
\begin{equation}
    \textbf{A} = \textbf{P}_{t-1}^{-1} \\ 
    \textbf{B} = \sigma^{-2}\textbf{I} \\ 
    \textbf{C} = \textbf{H}_{t}^{T}
\end{equation}
$$

식을 쭉 전개하면 

$$
\begin{align}
    \textbf{P}_{t} &= \left(\textbf{P}_{t-1}^{-1} + \textbf{H}_{t}^{T}(\sigma^{-2}\textbf{I})\textbf{H}_{t} \right)^{-1} \\
    &= \textbf{P}_{t-1} - \textbf{P}_{t-1}\textbf{H}_{t}^{T} \left(  \textbf{H}_{t} \textbf{P}_{t-1} \textbf{H}_{t}^{T} + \sigma^{2}  \right)^{-1} \textbf{H}_{t}\textbf{P}_{t-1} \tag{eq.5}\label{eq:5}
\end{align}
$$

\eqref{eq:5} 가 된다!

와~~~


---
# Recursive estimation: Kalman Filter 등장

그래서 어쩌라고? 싶겠지만 

한 번 더 식을 다듬어 보자!

$$
\begin{align}
    \textbf{P}_{t} &= \left(\textbf{P}_{t-1}^{-1} + \textbf{H}_{t}^{T}(\sigma^{-2}\textbf{I})\textbf{H}_{t} \right)^{-1} \\
    &= \textbf{P}_{t-1} - \underbrace{ \textbf{P}_{t-1}\textbf{H}_{t}^{T} \left( \underbrace{ \textbf{H}_{t} \textbf{P}_{t-1} \textbf{H}_{t}^{T} + \sigma^{2} }_{\textbf{S}_t} \right)^{-1} }_{\textbf{K}_t} \textbf{H}_{t}\textbf{P}_{t-1}  \\
    &= \textbf{P}_{t-1} - \textbf{K}_t \textbf{S}_t  \textbf{K}_t^{T} \  \text{ // or } \\ 
    &= \textbf{P}_{t-1} - \textbf{K}_t \textbf{H}_t \textbf{P}_{t-1} \  \text{ // seems more frequently used form} \\ 
    &= ( \textbf{I} - \textbf{K}_t \textbf{H}_t)  \textbf{P}_{t-1} 
    \tag{eq.6}\label{eq:6}
\end{align}
$$

covariance 에 대한 update 식이 조금 더 깔쌈하게 만들어진 것을 알 수 있다. 

근데 이거 어디서 좀 본 모양 같은데...? 

학부 기계전기 등 로보틱스 관련수업에서 무조건 배우는 Kalman Filter 아닌가 ...? 

호옴 ...

mean 에 대한 update 식도 좀 더 다듬어 보자. 

$$
\begin{align}
\textbf{m}_{t} &= \textbf{P}_t \left( \textbf{P}_{t-1}^{-1}\textbf{m}_{t-1} + \frac{1}{\sigma^2}\textbf{H}_{t}^{T}z_t \right) \\ 
    &= ( \textbf{I} - \textbf{K}_t \textbf{H}_t)  \textbf{P}_{t-1}  \left( \textbf{P}_{t-1}^{-1}\textbf{m}_{t-1} + \frac{1}{\sigma^2}\textbf{H}_{t}^{T}z_t \right) \\ 
    &= ( \textbf{I} - \textbf{K}_t \textbf{H}_t)  \left( \textbf{P}_{t-1}\textbf{P}_{t-1}^{-1}\textbf{m}_{t-1} + \textbf{P}_{t-1}\frac{1}{\sigma^2}\textbf{H}_{t}^{T}z_t \right) \\ 
    &= ( \textbf{I} - \textbf{K}_t \textbf{H}_t)  \left( \textbf{m}_{t-1} + \frac{1}{\sigma^2}\textbf{P}_{t-1}\textbf{H}_{t}^{T} z_t \right) \\
    &= \textbf{m}_{t-1} - \textbf{K}_t \textbf{H}_t \textbf{m}_{t-1} + \frac{1}{\sigma^{2}}( \textbf{I} - \textbf{K}_t \textbf{H}_t) (\textbf{P}_{t-1}\textbf{H}_{t}^{T}) z_t
    \tag{eq.7}\label{eq:7}
\end{align}
$$
 
근데 재밌는게 

$$
\begin{align}
    \frac{1}{\sigma^{2}}( \textbf{I} - \textbf{K}_t \textbf{H}_t) (\textbf{P}_{t-1}\textbf{H}_{t}^{T}) = \textbf{K}_t
    \tag{eq.8}\label{eq:8}
\end{align}
$$ 

이다!  
양변에 곱하고 빼고 요리조리하면 direct 증명이 쉽게 가능하지만 굳이 또 적어보자면:

$$
\begin{align}
    \frac{1}{\sigma^{2}}( \textbf{I} - \textbf{K}_t \textbf{H}_t) (\textbf{P}_{t-1}\textbf{H}_{t}^{T}) &= \textbf{K}_t \\
    ( \textbf{I} - \textbf{K}_t \textbf{H}_t) (\textbf{P}_{t-1}\textbf{H}_{t}^{T}) &= \sigma^{2}\textbf{K}_t \\ 
    \textbf{P}_{t-1}\textbf{H}_{t}^{T} - \textbf{K}_t \textbf{H}_t \textbf{P}_{t-1}\textbf{H}_{t}^{T} &= \sigma^{2}\textbf{K}_t \\ 
    \textbf{P}_{t-1}\textbf{H}_{t}^{T} &= \textbf{K}_t \textbf{H}_t \textbf{P}_{t-1}\textbf{H}_{t}^{T} + \sigma^{2}\textbf{K}_t \\ 
    \textbf{P}_{t-1}\textbf{H}_{t}^{T} &= \textbf{K}_t \left( \textbf{H}_t \textbf{P}_{t-1}\textbf{H}_{t}^{T} + \sigma^{2} \right) \\ 
    \textbf{P}_{t-1}\textbf{H}_{t}^{T} &= \textbf{K}_t \textbf{S}_t \\ 
    \textbf{P}_{t-1}\textbf{H}_{t}^{T}\textbf{S}_t^{-1} &= \textbf{K}_t    
\end{align}
$$

마지막 줄은 $\textbf{K}_t$의 정의였으므로 자명하고 따라서 성립한다. 

암튼 그래서 \eqref{eq:8} 을 \eqref{eq:7} 에 대입하면, 

$$
\begin{align}
\textbf{m}_{t} &= \textbf{m}_{t-1} - \textbf{K}_t \textbf{H}_t \textbf{m}_{t-1} + \textbf{K}_t z_t \\
    &= \textbf{m}_{t-1} + \textbf{K}_t \left( z_t - \textbf{H}_t \textbf{m}_{t-1} \right)
    \tag{eq.9}\label{eq:9} 
\end{align}
$$

오잉 근데 이거도 어디서 좀 많이 본 거 같은데 ...? 

<a href="http://ais.informatik.uni-freiburg.de/teaching/ws13/mapping/pdf/slam04-ekf.pdf" > Cyrill 교수님의 강의자료 </a>를 보면

<figure id="kf">
  <img src="/figs/2021-03-12-bayesfiltering-2/kf.png" style="width:90%">
  <figcaption> 
        <center> <a href="#kf"> Figure: KF equation </a> </center>
  </figcaption>
</figure>
<span> </span>

4, 5, 6 번째 줄이 우리가 방금 유도한 $\textbf{K}_t$, $\textbf{m}_t$, $\textbf{P}_t$ 와 생김새가 같음을 알 수 있다!

그렇다면 <a href="#kf"> 위의 slide </a> 에서 2, 3번째 줄은 뭘까?  
- 바로 Kalman filter 에서 prediction step 이라 불리는 부분이다. 

그리고 우리가 오늘 유도한 것은  
- Kalman filter 의 update step 에 해당하는 부분이다. 

즉, 우리는 
- <a href="{{ site.baseurl }}{% post_url 2021-03-09-bayesfiltering-1 %}#proofdone"> 지난 포스팅 </a> 에서 batch 로 bayesian update 를 수행했고,  
- 이것이 자연스럽게 recursive 한 식이 됨을 이번 포스팅 앞 부분에서 소개했고,  
- 그것의 모양을 요래조래 하다보니 Kalman filter 의 update step 와 동일하다는 사실까지 오게되었다. 

즉, 오늘 우리는 그 유명한 Kalman filter 의 special 버전 (i.e., update step만 있는) 을 유도했다. 

근데 update step만 있다는 것은 무슨 의미일까? 

바로 우리가 예측하고자 하는 state $\textbf{x}$ 값이 들어오는 measurement 에 관계없이 "고정" 된 상태라는 뜻이다. 

예를 들어서 line fitting 할 때 line 의 계수 같은 게 될 수 있을 것이다. 

하지만 그 $\textbf{x}$ 가 "움직이는" robot 의 위치처럼, 계속 바뀌는 값이라면?  

이 때 바로 prediction step 이 필요하게 된다.

--- 
## 예고 

- 다음 편에서는 칼만필터를 완성해보겠습니다 [^book].

[^book]: 이번편의 유도방식은 다음 책의 chapter 3.2 를 참고했습니다: Särkkä, Simo. Bayesian filtering and smoothing. No. 3. Cambridge University Press, 2013. <a href="https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.461.4042&rep=rep1&type=pdf"> PDF link <a>


--- 
## P.S.

mean update 식을 다시 보면, 

$$
\begin{align}
\textbf{m}_{t} &= \textbf{m}_{t-1} - \textbf{K}_t \textbf{H}_t \textbf{m}_{t-1} + \textbf{K}_t z_t \\
    &= \textbf{m}_{t-1} + \textbf{K}_t \left( z_t - \textbf{H}_t \textbf{m}_{t-1} \right)
\end{align}
$$

$\textbf{H}\_t \textbf{m}\_{t-1}$ 가 보이는데,  
이는 앞선 포스팅에서 소개한 <a href="{{ site.baseurl }}{% post_url 2021-03-09-bayesfiltering-1 %}#zmodel"> measurement model </a> 이다. 즉, $\textbf{H}\_t \textbf{m}\_{t-1} = \hat{z\_{t}}$  
(hat 은 예측값이라는 의미)


따라서 위의 식을 의미상 다음과 같이 다시 적을 수 있는데:

$$
\begin{align}
\textbf{m}_{t} &= \textbf{m}_{t-1} - \textbf{K}_t \textbf{H}_t \textbf{m}_{t-1} + \textbf{K}_t z_t \\
    &= \textbf{m}_{t-1} + \textbf{K}_t \left( z_t - \hat{z_{t}} \right)
\end{align}
$$

여기서 어떤 냄새를 맡을 수 있다.  

hat 은 예측값이라는 의미이기 때문에, $z\_t - \hat{z\_{t}}$ 의 의미는 예측값과 실측값의 차이라는 것을 알 수 있다. 

<a href="#kf"> 위의 slide </a> 에서 5번째 줄을 보면  
updated 될 mean 값은: 초벌로 먼저 predicted 한 mean (hyphen이 그어져있는 게 predicted 란 의미) 에 어떤 값을 보상해주는 것으로 해석할 수 있다. 

그리고 그 보상의 정도는 $\textbf{K}$ 에 실측값과 예측값의 차이가 곱해진 정도이다. 

이 때 그 보상의 정도를 조절하는 $\textbf{K}$ 가 바로 칼만필터에서 kalman gain 이라 불리는 것이다. 

>다음 편에서 계속 ... 

---
### 주석


