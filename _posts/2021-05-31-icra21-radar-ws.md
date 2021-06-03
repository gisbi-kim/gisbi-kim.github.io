---
layout: post
showlist: true
title: "ICRA 2021 Radar in Robotics Workshop 요약" 
season: Radar SLAM
type: research
categories:
- blog
tags:
- Blog
use_math: true
---

# ICRA 2021 Radar in Robotics Workshop

ICRA 21 에서 Radar ws [(웹사이트)](https://sites.google.com/view/radar-robotics/home) 가 5월 31일에 열렸다.  
영국 헤리엇 왓 대학교의 Sen Wang 님과 김아영 교수님이 공동 조직하였다.  
라이브로 진행되어서 좋았다!

<figure id="open">
  <img src="/figs/2021-05-31-icra21-radar-ws/open.png" style="width:80%">
  <figcaption> 
        <center> 시작! </center>
  </figcaption>
</figure>
<br>

구성은  
총 4명의 연사들의 키노트,  
3개의 데이터셋 소개 발표,  
여러개의 워크샵 논문 5분발표,  
그리고 제일 마지막의 패널 디스커션 시간으로 구성되었다. 

피크 때 80명 정도까지 들어온 것 같은데  
평소 학회 워크샵에 한방이 가득차면 100명 정도인 것을 생각하면  
원격 라이브임에도 사람들이 많이 찾아와준 것 같다.   

워크샵 논문들과 비디오는 나중에 다 올라온다고 하는데  
일단 먼저 정리해본다. 

--- 
## Keynote 1 from Benz

첫번째 연사는 벤츠의 Dr. Jürgen Dickmann 였다. 

벤츠가 레이더를 많이 사용하고 있다는 사실을 알 수 있었고  
또 Next Radar Challenge 에 대해 많이 이야기해주셨다.  

- 즉, next generation 의 radar 는 어때야 하는가?  
  - High resolution, Imaging radar 이런 단어들이 보였다. 
  - high resolution radar 를 달성하기 위해서 serial radars (have roughly 200 channels) 라는 말이 나와서 뭔말인지 몰라서 연구실형에게 물어보니 대략 이런 이야기라고 한다. 
    - milliEgo[^ps1] 라는 논문에서 예시 사진을 하나 들고와보았다. 아래와 같이 연구자들은 TI 사의 mmwave radar (여기서는 TI AWR1843) 를 많이 쓰고 있다. 이 레이더 센서에 보면 위에 배선들이 있는데 이게 안테나라고 한다. 이게 몇개 없어서 현재의 mmwave radar 의 <a href="#sparse"> point cloud 가 sparse 하다는 것</a>. 이걸 일렬로 쭉 이을 수 있으면 더 덴스한 데이터를 얻을 수 있을 것이라고 한다. 
    - 이 이상의 자세한 설명은 잘 몰라서 생략... [TI 공홈에 문서들](https://www.ti.com/sensors/mmwave-radar/overview.html)이 좀 있어서 이걸 읽어봐야겠다...  
      <figure id="tiradar">
        <img src="/figs/2021-05-31-icra21-radar-ws/tiradar-full.png" style="width:100%">
        <figcaption> 
              <center> Example: TI Radar </center>
        </figcaption>
      </figure>
      <!-- <br> -->
      <figure id="sparse">
        <img src="/figs/2021-05-31-icra21-radar-ws/tiradar-sparse.png" style="width:90%">
        <figcaption> 
              <center> Example: TI Radar's sparse point cloud </center>
        </figcaption>
      </figure>
      <br>

- 위의 그림처럼 Radar point cloud 는 lidar 에 비해 sparse 하지만 doppler information 을 준다는 것과 foggy 환경에서도 동작할 수 있다는 것이 장점이다. 
  - 현재 연구자들이 쓰는 radar 는 두 종류로 나뉘는 듯하다. 
     - 1) TI radar (sparse but 3D point and doppler information is avaiable) 
     - 2) Navtech radar (dense and long-range but 2D)
        - 에 대해서는 뒤에서 더 소개한다. 


[^ps1]: Lu, Chris Xiaoxuan, et al. "milliEgo: single-chip mmWave radar aided egomotion estimation via deep sensor fusion." Proceedings of the 18th Conference on Embedded Networked Sensor Systems. 2020.

- 그리고 <a href="#Scenes"> Radar Scenes Dataset </a> 홍보를 하심. 
  - 흔히 automotive 용 mmwave radar 가 sparse point cloud (and noisy) 를 제공한다고 알고있었는데, 아래 그림을 보면 거의 LiDAR 급임. 회사에서는 연구레벨보다 한참 좋은 것들이 이미 다 개발되어 있겠구나를 느꼈고, 그럼에도 데이터라도 이렇게 공개해줘서 되게 기뻤다. 
  - 게다가 radar point cloud 라벨링도 되어 있다고 함. 써봐야 겠다. 
  <figure id="Scenes">
    <img src="/figs/2021-05-31-icra21-radar-ws/scenes.png" style="width:100%">
    <figcaption> 
          <center> Radar Scenes Dataset </center>
    </figcaption>
  </figure>
  <br>


--- 
## Keynote 2 from ETH Zurich

두번째로는 ETH Zurich의 Dr. Dengxin Dai 님이 발표를 해주셨다. 

Depth completion by using radar data 이라던가  
radar 로부터 sound estimation (joint learning?) 등의 computer vision 토픽다운 연구들을 소개해주셨다.  

하지만 나는 state estimation 에 주로 관심이 있어서  
여기에 대한 설명은 생략 ... 

그나저나 CVPR 21에서 Vision for All Seasons WS 가 열린다고 한다. radar sensor 기반 perception의 지향점이 all-weather autonomoy 라는 큰 목표를 위한 것이니 만큼, 관심이 간다. 

--- 
## Keynote 3 Prof. Martin D. Adams

마틴 교수님은 Radar SLAM에서 이미 유명한 교과서 (아래 왼쪽 하늘색 책)의 저자이시다. 

  <figure id="books">
    <img src="/figs/2021-05-31-icra21-radar-ws/books.png" style="width:90%">
    <figcaption> 
          <center> Radar Textbooks </center>
    </figcaption>
  </figure>
  <br>

SLAM 사람들이 카메라도 했다가 lidar 도 했다가  
radar 도 이제 좋아보여서 와 하고 몰려오는 것과 달리  

정말 radar for robot 외길인생을 걸으신 듯한 ...  
- 다양한 프로젝트 사진들 

  <figure id="martin">
    <img src="/figs/2021-05-31-icra21-radar-ws/martin.png" style="width:90%">
    <figcaption> 
          <center> Prof. Martin D. Adams slide </center>
    </figcaption>
  </figure>
  <br>

암튼 톡의 내용은 다음과 같았다. 

(현재까지의) radar 는 sensor 특성상 false alarm 이 많을 수밖에 없는데,  
이는 landmark 매칭 기반의 SLAM (e.g., FastSLAM) 을 취약하게 한다.   

물론 false alarm을 앞단에서 잘 제거해 줄 수도 있겠지만,  
이런게 있을 때도 어떻게 수학적으로 강건한 machinery 를 제공할 수 있을까? 

이를 위해 마틴 교수님은 이게 state 가 Vector 기반으로 표현하지 않고,  
(random finite) set 으로 표현해서 해결했다고 한다 (위 그림의 두번째 책).
RB-PHD SLAM 

정말 멋있다는 생각을 하며 ...  
나중에 시간이 되면 읽어봐야겠다는 생각을 하고 일단 넘어감. 

talk 의 내용과 별개로 워크샵 전반의 분위기를 잘 잡아주신 것 같다.  
인자한 대가 느낌. 덕분에 워크샵이 매우 훈훈한 분위기였다. 

--- 
## Keynote 4 Prof. Tim Barfoot

바로 그 책 그 교과서 state estimation for robotics 의 저자이신 바풋 교수님의 톡이었다. 

아무래도 앞의 분들이 HW에 좀 더 가깝거나, 혹은 CV에 좀 더 가까운 이야기를 했다면,  
바풋 교수님은 robotics 관점에서 중요한 포인트들을 잘 짚어주셨다. 

- There are many different types of radar sensors in robotics ... 라며 이야기를 시작하셨는데  
  - 아마 현재 연구들이 제목에는 같은 radar 로 찍혀 나오지만  
  - 사실 내용을 보면 TI radar 를 사용하는 계열과 Navtech radar 를 사용하는 논문들의 연구방법론이 좀 다른 경향을 알 수 있다.  
  - Doppler 정보를 이용할 수 있느냐가 가장 큰 차이로 보인다. 
  - 바풋교수님의 톡은 Navtech radar 에 관한 것이었다. 
    - 크게 세 가지 내용을 소개하심. 

1. Boreas 라는 dataset 을 준비하고 계신듯하다. 
  - Navtech radar 기반이며 20개가 넘는 시퀀스가 있다고 한다. 
  - 6 month with seasonal variation, including 2 snow storms

2. Motion compensation 에 대해 이야기 하셨다. 
  - 현재 Navtech radar 는 4Hz 로써 sensor 가 mechanically spinning 하는 동안 로봇이 움직이기 때문에 모션보정을 해주어야 한다.  
  - 그런데 기존의 cen2018[^cen18], cen2019 논문들은 안하고 걍 하고 있었나봄 
  - cen의 방법과 같은 Sparse (or feature-based) radar odometry 계열에서는 
    - 강건한 feature matching 을 위해 RANSAC이 들어가는데, 
    - 그냥 RANSAC보다 motion compensated RANSAC 걸 제안하고, 성능이 더 오름을 이야기 하심. 
      - 사실 motion compensated RANSAC 에 대해서는 2013 RSS 에서 이미 lidar version 에 대해 이야기한적이 있다고 한다. 그거의 radar version 인 셈인데, 아무튼 이후의 radar for state estimation 연구들은 이 논문의 motion compenstaion을 적용하지 않을 수 없을 듯. 
  - 이 내용은 [2021 ICRA/RAL 논문](https://arxiv.org/abs/2011.03512) 과 [코드](https://github.com/keenan-burnett/yeti_radar_odometry) 도 공개가 되어있다. 
    - Do We Need to Compensate for Motion Distortion and Doppler Effects in Spinning Radar Navigation?, ICRA/RAL 2021

3. Unsupervised feature learning
    - local feature matching 기반의 odometry (sparse, indirect 등으로도 불리는) 는 센서를 불문하고 결국 feature 의 질이 결과를 좌우한다. 
      - 그래서 ORB-SLAM 이후로 딥 시대가 오면서 superpoint/superglue 가 localization 은 짱을 먹고 ... 이런 흐름이 visual sensor 에서 증명이 되었듯이  
      - radar odometry 를 위해서도 feature matching 할 때 그 feature 를 learning 할 수 없을까 이런 생각을 할 수 있다. 
      - 그렇다면 어떻게 학습해야 하는가?
    - HERO (Hybrid Estimate Radar Odometry) 라는 방법을 제안했다고 한다. 이번 RSS 2021이라고 함. 
      - 기존의 conventional 한 factor-graph optimization 과 deep feature learning 을 잘 결합한 것으로 보이는데, 암튼 읽어봐야겠다!
      - [논문](https://arxiv.org/pdf/2105.14152.pdf)과 [코드](https://github.com/utiasASRL/hero_radar_odometry) 도 바로 공개되었다. 

  <figure id="hero">
    <img src="/figs/2021-05-31-icra21-radar-ws/hero.png" style="width:90%">
    <figcaption> 
          <center> Hybrid Estimate Radar Odometry </center>
    </figcaption>
  </figure>
  <br>

[^cen18]: Cen, Sarah H., and Paul Newman. "Precise ego-motion estimation with millimeter-wave radar under diverse and challenging conditions." 2018 IEEE International Conference on Robotics and Automation (ICRA). IEEE, 2018.

- 마지막으로 lesson 들을 이야기 해주신 것도 좋았다. 
  <figure id="lessons">
    <img src="/figs/2021-05-31-icra21-radar-ws/lessons.png" style="width:75%">
    <figcaption> 
          <center> Lessons </center>
    </figcaption>
  </figure>
  <br>

--- 
## Spotlight Talks: Workshop papers 

온라인이라서 별로 없을 줄 알았는데  
생각보다 많은 사람들이 자신들의 논문을 홍보하기 위해 워크샵에 5분 논문 소개 시간을 가졌다.  
내가 석사신입이였다면 radar slam 이 지금시작하기에 괜찮은 토픽이라는 생각도 들었다. 

간단하게 키워드만 요약해본다. 

- Oxford
  - Radar place recognition 을 위해 Self supervised로 contrastive learning 어케 해야하는가 ...
- KAIST
  - Radar enhanced lidar mapping 
- 저장대
  - RaLL (TITS)
    - 코드도 있다
- 스웨덴 CFEAR
  - 레이더 오도메트리
  - top k strongest 만 보고 point-to-line registration 하니까 잘됨. 
    - scan당 200 points 정도 (cen은 900-1000개 쯤 feature point 가 존재했었음) 
  - 속도도 당연히 빨라짐. 80Hz.
- Univ of Colorado (ARPG: Autonomous Robotics and Perception Group)
  - AWR radar sensor 
  - Radar inertial state estimation
  - (그리고 이거였는지는 모르겠는데) sparse radar 로 무려 3D occupancy mapping 을 수행하는 연구도 인상적이었다. 
- CMU-GPR dataset 
  - ground-penetration radar 라는 데이터셋을 공개 
  - 15 traj 포함 
  - indoor localization 에 좋았던듯 
- RadarScenes dataset 
  - 77GHz radar sensor 
  - Res: 0.15m / 0.5-2 deg 
  - radar-scenes.com 

이중에서는 특히 CFEAR 라는 방법이 재밌었다.  
얘들 발표의 그림을 몇개 첨부해본다. 

  <figure id="ws1-1">
    <img src="/figs/2021-05-31-icra21-radar-ws/ws1-1.png" style="width:90%">
    <figcaption> 
          <center> Radar Odometry comparison </center>
    </figcaption>
  </figure>
  <br>

  <figure id="ws1-3">
    <img src="/figs/2021-05-31-icra21-radar-ws/ws1-3.png" style="width:90%">
    <figcaption> 
          <center> A scan with top k intensities </center>
    </figcaption>
  </figure>
  <br>

  <figure id="ws1-2">
    <img src="/figs/2021-05-31-icra21-radar-ws/ws1-2.png" style="width:90%">
    <figcaption> 
          <center> CFEAR pipeline </center>
    </figcaption>
  </figure>
  <br>


--- 
## Dataset session

나는 dataset session 에서 발표를 가졌다. 세 데이터셋 모두 Navtech radar 에 관한 것이다. 

- 나름 초창기에 출시된 데이터셋인 MulRan, Oxford Radar RobotCar, RADIATE dataset 이렇게 세 팀이 10분동안 각각 데이터셋을 홍보하는 시간을 가졌다. 
  1. Oxford Radar RobotCar 는 Oxford RobotCar의 명성을 잇는 느낌이고 (route 도 같음)
  2. RADIATE 은 objet lable 과 snow같은 극한상황에 대한 시퀀스가 포함되어있음을 위주로 어필했다. 
  3. 나는 MulRan 에서 multiple cities, multiple loops 를 강조하며 place recognition 과 SLAM연구에 더 적합함을 어필했다.
    - 그리고 MulRan 에서 함께 제안한 radar scan context 를 이용해서 기존 radar odometry 의 drift 를 해소할 수 있는 [project (navtech-radar-slam)](https://github.com/gisbi-kim/navtech-radar-slam) 도 소개하였다. 
    <figure id="example1">
      <img src="/figs/2021-05-31-icra21-radar-ws/example1.png" style="width:90%">
      <figcaption> 
            <center> Radar SLAM on MulRan dataset - KAIST 03 </center>
      </figcaption>
    </figure>
    <br>
    <figure id="example2">
      <img src="/figs/2021-05-31-icra21-radar-ws/example2.png" style="width:90%">
      <figcaption> 
            <center> Radar SLAM on MulRan dataset - Riverside 02 </center>
      </figcaption>
    </figure>
    <br>
- 바풋교수님네의 dataset 도 곧 나올거같고, Oxford 애들도 여기저기 오지를 다니는 등 추가시퀀스를 더 공개할 것 같다. 앞으로 연구하기 더 재밌는 판이 만들어질 것으로 기대된다. 



--- 
## Panel discussion

몇 가지 기억나는 이야기들 
- 마틴 교수님?: 
  - radar 는 (vision 쪽과는 좀 다른 거 같은게) HW 하는 사람들 signal processing 사람들 robotics 사람들 다 모여서 협업해야한다. 
    - (roboticist 입장에서) 처음에는 data 가 좀 dirty 하다고 느낄 수 있겠지만 알고보면 재밌다
    - radar 는 가치있는 정보를 많이 주는 센서임을 알게된다. 
- 바풋 교수님: 
  - radar data 를 위한 (합의된) interface 가 필요하다. 
    - 예를 들어 TI radar는 sparse point cloud 를 주고 Navtech radar 는 image format 을 준다. 
    - radar 는 intensity ray인가? image 인가? 사실 lidar 도 생각해보면 원래는 intensity ray 인데 top 1 (or up to 2nd) point 만을 추려서 3D point cloud 로 사용자에게 주는 것이다. 그렇게 치면 radar 도 point cloud 처럼 사용해도 무방한가? 이렇게 다들 쓰자고 약속할까? 어떻게 해야할까? 
  - 그리고 더 많은 공개데이터셋들이 아직도 더 필요하고, KITTI와 같이 benchmark를 구성하는 것이 중요할 것이다. 

--- 
## The end 
그렇게 한국시각으로 새벽 1시에 워크샵이 끝이 났다. 재밌었따.
  - radar 를 이용해서 perception and state estimation 을 하기 이전에, Radar 라는 센서를 아직 잘 모르겠다. 공부를 하자!
    - [여기 (awesome-radar-perception)](https://github.com/ZHOUYI1023/awesome-radar-perception) 에 좋은 자료들을 잘 모아둔 것 같다. 
    - 연구실형은 [TI 공식홈피의 tech docu](https://www.ti.com/ko-kr/sensors/mmwave-radar/automotive/technical-documents.html) 들을 추천함   

---
### 주석 