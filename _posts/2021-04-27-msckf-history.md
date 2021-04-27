---
layout: post
showlist: true
title: "Filter-based VIO [1편] — MSCKF 계열 history 정리" 
season: Visual SLAM
type: research
categories:
- blog
tags:
- Blog
use_math: true
---

<span style="color:gray"> NOTE: 아래 내용들은 김연조 et al 의 "속도증분벡터를 활용한 ORB-SLAM 및 관성항법 결합 알고리즘 연구 (2019)" 논문의 관련연구 섹션을 참고하였습니다. </span>

--- 
MSCKF 계열은 Tightly-coupled Filter-based[^note1] 라고 할 수 있다. 
- 특징
    1. 많은 특징점 또는 이미지 패치를 필요로 하지 않는다. 
    2. Optimization-based VIO보다 적은연산량을 필요로 한다.  
    3. 따라서 가벼운 onboard platform에서 선호된다. 

[^note1]: 이외에 Loosely coupled filter-based 도 있는데, loosely coupled 는 일반적으로 VO 알고리즘의 해를 칼만 필터의 측정치(measurement)로 사용하여 결합한다. <br> 따라서 특징점 수에 상관없이 항상 같은 수준의 계산 복잡도를 가진다. <br> 이러한 약결합 방식은 강결합 방식에 비해 필터 구조가 간단하기 때문에, 다른 센서를 융합함으로써 성능을 향상시키기 용이하다 <br> 논문: <br> — 11 ICRA Real-time metric state estimation for modular vision-inertial systems (스케일 팩터를 상태변수에 추가함), <br> — 13 ICRA Stereo vision and IMU based real-time ego-motion and depth image computation on a handheld device (스테레오 버전), <br> — 13 IROS A robust and modular multi-sensor fusion approach applied to MAV navigation and 14 ICRA Multi-Sensor Fusion for Robust Autonomous Flight in Indoor and Outdoor Environments with a Rotorcraft MAV (IMU, laser scanner, stereo cameras, pressure altimeter, magnetometer, and a GPS 등 다양한 다른 센서를 융합한 버전)

---

## MSCKF (2007)
{% highlight python %}
요약: 특징점 대신 지난 시점의 카메라 포즈를 상태변수에 포함
{% endhighlight %}
- 특징점의 확률분포를 가우시안 분포로 근사할 필요가 없기 때문에, 더욱 고정밀의 포즈 추정이 가능
- 논문[^note2]
    - 07 ICRA A. I. Mourikis and S. I. Roumeliotis, “A multi-state constraint Kalman filter for vision-aided inertial navigation”

[^note2]: 이 논문을 이해하기 위해서는 IMU model과 quaternion에 대한 기초지식이 요구된다. <br> — 이에 대해서는 Trawny, Nikolas, and Stergios I. Roumeliotis. "Indirect Kalman filter for 3D attitude estimation. (2005) 를 추천한다 (note: MSCKF논문의 교신저자인 Roumeliotis가 여기서도 교신저자이다).  <br> — 또는 최근 문서인 Joan Sola의 Quaternion kinematics for the error-state Kalman filter (2017) 도 되게 잘 설명하고 있다.


## MSCKF의 후속 (2012, 2013)
{% highlight python %}
요약: camera와 IMU 사이 캘리브레이션 파라미터 역시 상태변수에 포함
{% endhighlight %}
- 캘리브레이션 파라미터와 요(yaw) 각에 대한 가관측성 (Observability) 분석도 수행함.
    - 필터의 일관성 (consistency)을 향상
    - 결과적으로 추정된 상태변수의 불확실성(uncertainty)과 실제 불확실성을 일치시키려 함 
- 논문
    - note: MSCKF 1저자인 Mourikis가 교신저자
    - 12 ICRA (학회버전) M. Li and A. I. Mourikis, “Improving the accuracy of EKF-based visual-inertial odometry”
    - 13 IJRR (저널버전) M. Li and A. I. Mourikis, “High-precision, consistent EKF-based visual-inertial odometry”

## MSCKF의 후속2 (2015-)
{% highlight python %}
요약: 특징점(geometric error) 대신 패치의 photometric error 를 사용 
{% endhighlight %}
- 특징점을 사용하지 않기 때문에, 모션블러 또는 텍스쳐가 적은 환경에 강인하다는 특징을 갖는다.
- 논문
    - 15 IROS P. Tanskanen, T. Naegeli, M. Pollefeys, and O. Hilliges, “Semi-direct EKF-based monocular visual-inertial odometry”
    - 15 IROS M. Bloesch, S. Omari, M. Hutter, and R. Siegwart, “Robust visual inertial odometry using a direct EKF-based approach”
    - 17 IJRR M. Bloesch, M. Burri, S. Omari, M. Hutter, and R. Siegwart, “Iterated extended Kalman filter based visual-inertial odometry using direct photometric feedback”

## MSCKF의 후속3 (2018) 
{% highlight python %}
요약: steroe version 
{% endhighlight %}
- 논문
    - 18 RAL Robust stereo visual inertial odometry for fast autonomous flight


--- 
### 주석