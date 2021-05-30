---
layout: post
showlist: true
title: "Radar Odometry Results on MulRan dataset" 
season: Radar SLAM
type: research
categories:
- blog
tags:
- Blog
use_math: true
---

# Radar 
- Here, the radar means Navtech radar data.
  - For details, see https://oxford-robotics-institute.github.io/radar-robotcar-dataset/
- Radar is robust to occlusions than LiDAR in urban sites.

--- 
# Yeti Radar Odometry  
- Paper
  - Do We Need to Compensate for Motion Distortion and Doppler Effects in Spinning Radar Navigation? (ICRA 2021)
- Code 
  - https://github.com/keenan-burnett/yeti_radar_odometry
  - Features 
    - implemented cen2018, cen2019 method with motion compensation 
  - Requirements
    - need ray-wise timestamps 

---
# Tutorial: running Yeti on MulRan dataset  
- see this video 
  - link (TBA)

--- 
# Results on MulRan dataset 
- MulRan dataset
  - MulRan: Multimodal Range Dataset for Urban Place Recognition (ICRA 2019)
  - https://sites.google.com/view/mulran-pr/dataset

- Methods 
  - Cen2018: Precise ego-motion estimation with millimeter-wave radar under diverse and challenging conditions (ICRA 2018)
  - Cen2019: Radar-only ego-motion estimation in difficult settings via graph matching (ICRA 2019)

- Result captures [^ps1] [^ps2]
  - Left: Cen2018, Right: Cen2019 
  - The trajectory color means start-blue and red-end. 

[^ps1]: ps. for the visualiation code, see https://github.com/gisbi-kim/yeti_odom_drawer
[^ps2]: ps2. KAIST 01 and Sejong 01 sequences do not provide ray-wise timestamps, so the results are omitted.  

<figure id="KAIST02">
  <img src="/figs/2021-05-30-yeti-radar-odom-mulran1/KAIST02.png" style="width:110%">
  <figcaption> 
        <center> KAIST 02 </center>
  </figcaption>
</figure>
<br>

<figure id="KAIST03">
  <img src="/figs/2021-05-30-yeti-radar-odom-mulran1/KAIST03.png" style="width:110%">
  <figcaption> 
        <center> KAIST 03 </center>
  </figcaption>
</figure>
<br>

<figure id="DCC01">
  <img src="/figs/2021-05-30-yeti-radar-odom-mulran1/DCC01.png" style="width:110%">
  <figcaption> 
        <center> DCC 01 </center>
  </figcaption>
</figure>
<br>

<figure id="DCC02">
  <img src="/figs/2021-05-30-yeti-radar-odom-mulran1/DCC02.png" style="width:110%">
  <figcaption> 
        <center> DCC 02 </center>
  </figcaption>
</figure>
<br>

<figure id="DCC03">
  <img src="/figs/2021-05-30-yeti-radar-odom-mulran1/DCC03.png" style="width:110%">
  <figcaption> 
        <center> DCC 03 </center>
  </figcaption>
</figure>
<br>

<figure id="Riverside01">
  <img src="/figs/2021-05-30-yeti-radar-odom-mulran1/Riverside01.png" style="width:110%">
  <figcaption> 
        <center> Riverside 01 </center>
  </figcaption>
</figure>
<br>

<figure id="Riverside02">
  <img src="/figs/2021-05-30-yeti-radar-odom-mulran1/Riverside02.png" style="width:110%">
  <figcaption> 
        <center> Riverside 02 </center>
  </figcaption>
</figure>
<br>

<figure id="Riverside03">
  <img src="/figs/2021-05-30-yeti-radar-odom-mulran1/Riverside03.png" style="width:110%">
  <figcaption> 
        <center> Riverside 03 </center>
  </figcaption>
</figure>
<br>

<figure id="Sejong02">
  <img src="/figs/2021-05-30-yeti-radar-odom-mulran1/Sejong02.png" style="width:110%">
  <figcaption> 
        <center> Sejong 02 </center>
  </figcaption>
</figure>
<br>

<figure id="Sejong03">
  <img src="/figs/2021-05-30-yeti-radar-odom-mulran1/Sejong03.png" style="width:110%">
  <figcaption> 
        <center> Sejong 03 </center>
  </figcaption>
</figure>
<br>




<!-- SLAM 이란

$$
\begin{align*}
    \text{SLAM} = \text{odometry} + \text{loop closing} 
\end{align*}
$$

이라고 할 수 있다.  
- odometry 는 locally accruate 한 consecutive motion 을 예측하고 
- loop closing 은 odometry에서 누적된 error 를 smoothing 한다. 
    - loop detection 과 pose-graph optimization 으로 구성된다. 

---
##  SC-based LiDAR SLAM

예전에 LiDAR SLAM을 구성하기 위해  
[Scan Context](https://github.com/irapkaist/scancontext) 기반의 loop detection 을 lidar odometry 에 통합한 적이 있다. 
- https://github.com/irapkaist/SC-LeGO-LOAM
- https://github.com/gisbi-kim/SC-LIO-SAM

처음에는 LeGO-LOAM 저자의 pose-graph optimziation 구현 (skeleton) 이 좋아서 거기에 integrate 했었는데,  
사용하다보니 다른 front-end 에 물렸으면 싶을 때가 종종 있다.  
- ex. LeGO-LOAM은 range image 상에서 feature 를 찾기 때문에, roll pitch motion 이 왕왕 큰 hand-held 에서 A-LOAM보다 경험적으로 잘 안된다던지 그런 현상들을 좀 겪는다. 


--- 
##  SC-based Pose-graph SLAM

그래서 loop detection 및 pose-graph optimization 부분만  
별도의 ros node 로 구성해보았다.  
- [laserPosegraphOptimization.cpp](https://github.com/gisbi-kim/SC-A-LOAM/blob/main/src/laserPosegraphOptimization.cpp)

사용자는 임의의 lidar odometry 를 실행하고,  
그 임의의 lidar odometry 프로그램은 time t에서의 odometry 와 point cloud topic 을 publish 시켜주기만 하면된다. 

그럼 위의 laserPosegraphOptimization.cpp node 는 그 odometry (locally errornous한) 와 point cloud topic 을 subscribe 해서  
내부적으로 loop 를 찾고 pose graph optimization 을 수행한다. 
- 결과적으로는 보정된 odometry (및 path) 와 error 가 해소된 global map 을 publish 한다. Rviz 로 이를 확인할 수 있다. 

laserPosegraphOptimization.cpp 모듈을 SC-PGO라고 부른다면,  
LiDAR SLAM의 전체 파이프라인은 아래와 같다. 
<figure id="scfastlio">
  <img src="/figs/2021-05-17-sclidarslam/anypipe.png" style="width:90%">
  <figcaption> 
        <center> <a href="https://github.com/gisbi-kim/SC-A-LOAM"> Code Link </a> </center>
  </figcaption>
</figure>
<br>

이 리포지토리에서는 존재하는 open source 중 가장 간단한 lidar odometry인  
A-LOAM과 결합하여 바로 사용할 수 있도록 하였다.  
- 코드: [SC-A-LOAM (github)](https://github.com/gisbi-kim/SC-A-LOAM)
- 예시: 
<figure id="scfastlio">
  <img src="/figs/2021-05-17-sclidarslam/riverside01.png" style="width:90%">
  <figcaption> 
        <center> <a href="https://youtu.be/FwAVX5TVm04?t=303"> Youtube Link (대전 갑천)</a> </center>
  </figcaption>
</figure>
<br>



--- 
## Generic and Modular 

하지만 SC-PGO (laserPosegraphOptimization.cpp) 는  
lidar odometry algorithm에 완전히 독립적인 모듈이기 때문에  
어떤 lidar odometry front-end 와도 결합될 수 있다.  
- 따라서 SC-based Generic (modular) Pose-graph SLAM 라고 부를 수 있겠다. 

예시로, FAST-LIO라는 ESKF 기반 최신 LIO 와도 물려보았다 (아래 예시 비디오).  
<figure id="scfastlio">
  <img src="/figs/2021-05-17-sclidarslam/scfastlio.png" style="width:85%">
  <figcaption> 
        <center> <a href="https://youtu.be/Fw9S6D6HozA?t=1708"> Youtube Link (including step-by-step tutorial) </a> </center>
  </figcaption>
</figure>
<br>
(당연한 이야기지만) odometry only 일 때 누적된 에러를 "쉽게" 보정할 수 있다 -- 사용자는 odometry 와 loop closing 의 결합에 대해 고민할 필요없이, 단순히 두 node 를 각각 실행해주는 것으로 LiDAR SLAM을 완성할 수 있다. 

- ps. 이 예제에서 알 수 있듯이 Scan Context 는 livox lidar (전방 70도만 봄) 에서도 잘 작동함을 알 수 있다. 
- ps 2. 또한 odometry topic 은 특성 sensor 에 dependent하지 않기 때문에 꼭 lidar odometry가 아니라 vo, wheel odometry 등 다양한 source 와도 쉽게 결합할 수 있을 것으로 생각된다. 
 -->


---
### Comments