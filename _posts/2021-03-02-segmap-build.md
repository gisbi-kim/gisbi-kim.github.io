---
layout: post
showlist: true
title: SegMap 빌드하기 
season: SLAM 잡담 
type: research
categories:
- blog
---
- NOTE: [미디엄 블로그](https://gisbi.medium.com/segmap-%EB%B9%8C%EB%93%9C%ED%95%98%EA%B8%B0-220d6d9b4ef6) 이전중입니다 


# 목표 
- segmap 을 빌드해보자.
- 작업환경: Ubuntu18.04, ROS 는 root (not virtual)로 설치한 상황이며 나머지 디펜던시는 모두 virtualenv에서 진행 (아래에 자세히 설명함)

# 배경지식
- 원래는 segmatch라는 리포였다가 (17 ICRA 시절) 이름이 segmap (18 RSS 시절) 으로 바뀌었다.
- segmap 공식 리포 (ethz-asl/segmap) 의 경우 빌드하려면 딥러닝 기반 segmap말고 안딥러닝인 segmatch를 쓰고 싶어도 tensorflow_ros_cpp 를 무적권 빌드해야해서 너무 불키하다.
- 그래서 인터넷에 segmatch 포크본들이 돌아다니고 있어서 해보니까 왠지 안된다.
- 그래서 그냥 공식리포본에서 tensorflow_ros_cpp 를 빌드를 어찌저찌 해내기로 결심하였다.

# 과정
- 수많은 삽질들이 있었으나 작동하는 사항만을 아래 기술해보자.
- 일단 모든 과정들을 virtual env 에서 하면 된다. (모든 캣킨 빌드들 및 로스실행 포함). tf 를 virtualenv 에서 설치하는 게 편하기 때문.
- 일단 segmap 저자의 리드미에서 하라는 순서로 해도되지만, 내 기준에 먼저 해놓으면 좋은것부터 이제 설명해보자.
-  일단 작업할 virtual environment 를 만들자.

<!-- ```  -->
{% highlight bash %}
$ virtualenv ~/segmapenv # 하면 만들어지고
$ source ~/segmapenv/bin/activate # 하면 접속됨 (conda activate 같은 것 같다). 그러면 앞에 (env name) 이 뜬다
(segmapenv)$ # 예시 
{% endhighlight %}
<!-- ```  -->

- 그럼 ~/segmapenv 에 대충 mkdir home 해서 home 밑에서 작업해보자
- 이제 tensorflow 를 설치해야 한다.
- 간편하게 pip install 하면 안되냐 싶겠지만 segmap 이 쓰고 있는 tensorflow_ros_cpp 라는 모듈이 그러면 안된다.
- 간단히 이유를 설명하자면 tf를 설치하는 방법에는 세가지가 있다. 1. pip, 2. bazel, 3. tensorflow_catkin
- 1은 잘 알테고 (하지만 지금 이걸로 설치하면 마지막에 API가 달라서? segmapper 가 링크가 안된다 — 다른 디펜던시 컴파일 20분(-j32의 경우)~2시간 겨우겨우 기다리고 마지막에 빌드 에러나는 환장하는 상황을 볼 수 있다), 3은 몰라도 되고 (궁금하면 따로 찾아보자)
- 결론은 2번 방법인 bazel 로 설치해야 한다. bazel은 구글이 만든 빌드툴 어쩌구 저쩌구... 그렇다고 한다. 뭐 자세히 알필요는 없고
- 암튼 2로 해야 하는이유는 tensorflow_ros_cpp 의 깃 리포에 가보면 표들이 있는데 https://github.com/tradr-project/tensorflow_ros_cpp
- Ubuntu 18.04 64bits, Python 2.7.6, ROS Melodic 의 경우 1.8.0 tf version을 사용할 시 bazel cpu 및 gpu 에만 체크표시가 되어있다. 여기 보면 ABI difference problems 라는 말이 나오는데 이게 위에서 말한 20분 기다리고 마지막에 에러날때 볼 수 있는 현상이다. 이 고생을 안하려면 무적권 bazel 로 설치하자.
- https://github.com/tradr-project/tensorflow_ros_cpp#custom-compilation-of-tensorflow-using-bazel 를 읽어보자.
- 그나저나 일단 tf src를 받아야 한다. https://www.tensorflow.org/install/source?hl=ko 여기 잘 나와있음.
- 그래도 굳이 명령어들을 다시 적어주자면
- cd ~/sgmapenv/home하고, 여기다가 tensorflow 를 받자

{% highlight bash %}
(segmapenv)$ git clone https://github.com/tensorflow/tensorflow.git
{% endhighlight %}

- segmap저자는 1.8.0 을 쓰라고 하니 (언제적 버전이지만...) 시키는 대로 하자. 해당 브랜치로 변경해주어야 한다.
{% highlight bash %}
(segmapenv)$ git checkout r1.8
{% endhighlight %}

- 직접 빌드하는경우 configuration 을 정해줘야 하므로 ./configure 하자. 근데 계속 엔터를 갈기면 된다. 즉 디폴트 옵션으로 하면됨.
- 우리는 1.8.0 을 빌드할것이므로
- 그리고 cpu 버전으로 일단 빌드하고 있다. 내 목표는 segmap까지도 필요없고 segmatch만 쓰는 것이므로...
- 따라서 다음 명령어를 해주면 된다. 고 나와있다. (근데 일케 하지마시오)

{% highlight bash %}
(segmapenv)$ bazel build --config=opt //tensorflow/tools/pip_package:build_pip_package # 이 때 저 // 까지 모두 포함해서 한줄로 써주면 된다. 헷갈리면 다시 여기를 보자 https://www.tensorflow.org/install/source?hl=ko
{% endhighlight %}

- 근데 이대로 하면 안됨. 안된다. 안된다. 안된다. 안된다. 안된다.
- https://www.tensorflow.org/install/source?hl=ko 여기서 하려고 하는거는 빌드를 직접 내 입맛에 맞는 configuration 으로 해서 결국에는 pip 패키지를 만들려고 하는건데
- 우리의 목표는 아예 pip 패키지 아니기 때문. segmap 리드미에 pip 로 설치하라 되어있는데 안됨
- 그래서 tensorflow_ros_cpp 의 리드미를 잘 읽어야 한다. 진짜루
- https://github.com/tradr-project/tensorflow_ros_cpp#custom-compilation-of-tensorflow-using-bazel
- 이걸 미리 읽지않고 이틀을 날린 내 자신에게 반성을...
- 여기보면 뭐라 되어있냐면

> Follow the Installing TensorFlow from Sources guide up to “Configure the installation” (including), and build the C++ library with the following command:
``` bazel build --config=opt --define framework_shared_object=false tensorflow:libtensorflow_cc.so ``` You don’t need to continue with the guide building or installing the pip package (but you might be interested, because a custom-built tensorflow can provide you with higher performance even in Python).

- 그니껜 bazel을 쓰긴 쓸건데 https://www.tensorflow.org/install/source?hl=ko 있는대로 할필요 없다는 뜻임
- 그리고 bazel build 뒤에 붙은 옵션들도 tf site에 있는 것과 다른데 절대 위의 명령어로 해주어야 한다.
- 중요하니까 한번더 복붙

{% highlight bash %}
(segmapenv)$ bazel build --config=opt --define framework_shared_object=false tensorflow:libtensorflow_cc.so
{% endhighlight %}

- 근데 이 bazel build 라는 놈이 안될수 있다. 왜냐하면 bazel 이라는게 2018년 부터 발전해와서 API가 엄청 달라진듯 버전마다 (뇌피셜)
- 암튼 여기 잘나와 있다 http://nblog.syszone.co.kr/archives/9751
- 한줄요약 하면 tensorflow-1.8.0 를 bazel로 빌드하려면 Bazel 0.10.0 을 써야됨
- 다양한 bazel 버전들은 bazel 공식 깃 리포에 있으며 0.10.0 버전은 https://github.com/bazelbuild/bazel/releases/tag/0.10.0
- 여기서 아마 bazel-0.10.0-without-jdk-installer-linux-x86_64.sh 이거 아니면 bazel-0.10.0-installer-linux-x86_64.sh 이거를 설치하면 됨
- 나는 앞에걸로 한듯 — 근데 암튼 bazel 디펜던시로 jdk 설치해줘야 하는거같다 https://docs.bazel.build/versions/3.3.0/install.html 여기 보면 sudo apt install openjdk-11-jdk 해주자
- 일단 지금 다시 상기하자면 지금 virtualenv 가 activate 된 home 에서 하고 있음
- chmod +x bazel-0.10.0-without-jdk-installer-linux-x86_64.sh 하고 ./bazel-0.10.0-without-jdk-installer-linux-x86_64.sh 하면 금방 깔린다.
- 그리고 나서 이제 다시 아까 하려면 걸 다시해주면 (아래 명령어)

{% highlight bash %}
(segmapenv)$ bazel build --config=opt --define framework_shared_object=false tensorflow:libtensorflow_cc.so
{% endhighlight %}

- 이거는 거의 1분 안되어서 금방 끝난다. 컴퓨터 사양마다 다를수있음.
- 암튼 이러면 어딘가에 libtensorflow_cc.so 가 생성되어있다. tensorflow_ros_cpp 는 cmakelist.txt 에 보면 이 so 파일을 찾아다가 빌드하는 식이다.
- ㅇㅋ 그럼 이제는 tensorflow_ros_cpp 를 빌드해야 하니까 catkin ws 밑에 src에 이 리포를 받아주자
- 근데 여기서부터는 segmap저자가 필요한 디펜던시들을 한방에 모조리 git clone 해올수 있도록 wstool 로 잘 해놨으니 tensorflow_ros_cpp 도 받는 김에 다 받아오자.

{% highlight bash %}
(segmapenv)$ mkdir -p YOUR_VIRTUAL_ENV_PATH/home/segmap_ws/src
(segmapenv)$ cd YOUR_VIRTUAL_ENV_PATH/home/segmap_ws/
(segmapenv)$ catkin init
(segmapenv)$ catkin config --merge-devel
(segmapenv)$ catkin config --cmake-args -DCMAKE_BUILD_TYPE=Release
(segmapenv)$ cd src
(segmapenv)$ git clone https://github.com/ethz-asl/segmap.git
(segmapenv)$ wstool init
(segmapenv)$ wstool merge segmap/dependencies.rosinstall
(segmapenv)$ wstool update
{% endhighlight %}

- 이제 segmap_ws위치에서 catkin build tensorflow_ros_cpp 를 해서 tensorflow_ros_cpp 만 컴파일 해준다.
- segmap 저자가 시키는대로 하면 https://github.com/ethz-asl/segmap/wiki/FAQ#q-issues-compiling-tensorflow_ros_cpp

{% highlight bash %}
(segmappyenv)$ catkin build tensorflow_ros_cpp --cmake-args -DFORCE_TF_PIP_SEARCH="ON"
{% endhighlight %}

- 라고 해서 뒤에 이상한 옵션들이 더 붙는데 이거는 pip 도 찾긴찾을래? 라는 거 므로 사실 ON으로 하면 안된다. segmap_ws/src/tensorflow_ros_cpp 밑에 CMakeLists.txt 가 있는데 거기서 bazel 말고 다른애들을 찾을 가능성을 다 off 해주자. 즉

{% highlight cmake %}
# variables affecting the search for the tensorflow library
set(FORCE_TF_PIP_SEARCH OFF CACHE BOOL “Whether to search for pip-installed Tensorflow even on systems using C++11 ABI”)
set(DISABLE_TF_PIP_SEARCH ON CACHE BOOL “Whether to skip search for pip-installed Tensorflow”)
set(FORCE_TF_BAZEL_SEARCH ON CACHE BOOL “Whether to search for bazel-compiled Tensorflow even if tensorflow was already found”)
set(DISABLE_TF_BAZEL_SEARCH OFF CACHE BOOL “Whether to skip search for bazel-compiled Tensorflow”)
set(FORCE_TF_CATKIN_SEARCH OFF CACHE BOOL “Whether to search for tensorflow_catkin even if tensorflow was already found”)
set(DISABLE_TF_CATKIN_SEARCH ON CACHE BOOL “Whether to skip search for tensorflow_catkin”)
{% endhighlight %}

- 그리고 그 좀 아래에 보면 bazel로 tensorflow_ros_cpp를 빌드 할때 두 가지를 얘가 끌어다가 쓰는 걸 알수있다.

{% highlight cmake %}
# variables affecting bazel search
set(TF_BAZEL_LIBRARY “{CATKIN_DEVEL_PREFIX}/../libtensorflow_cc.so” CACHE STRING “Path to the bazel-compiled Tensorflow C++ library”) 
set(TF_BAZEL_SRC_DIR “{CATKIN_DEVEL_PREFIX}/../tensorflow-include-base” CACHE STRING “Path to the Tensorflow sources directory”)
{% endhighlight %}

- 즉 .so 파일과 tensorflow source 가 필요한건데 tensorflow source 의 경로는 지금 어쩌구...../tensorflow-include-base 라고 되어있는데 귀찮으니까 절대경로로 바꿔주자. 아까 tensorflow git clone 했던 그 디렉토리를 해주면 된다.
- 그럼 이제 아까 bazel build 로 만든 .so 파일이 어딘가 있는데 일단 대충 탐색기에서보면 못찾겠다. 이때 find 명령어를 써주자

{% highlight bash %}
(segmapenv)$ cd / 
(segmapenv)$ sudo find . -name *libtensorflow_cc.so*
{% endhighlight %}

- 해주니까 이상한 bazel의 숨김폴더 밑에 존재하는 걸 확인할 수 있었다.

{% highlight bash %}
./home/user/.cache/bazel/_bazel_user/f61ec775ae98149c983e28ce5aff1318/execroot/org_tensorflow/bazel-out/k8-opt/bin/tensorflow/libtensorflow_cc.so.runfiles/org_tensorflow/tensorflow/libtensorflow_cc.so
./home/user/.cache/bazel/_bazel_user/f61ec775ae98149c983e28ce5aff1318/execroot/org_tensorflow/bazel-out/k8-opt/bin/tensorflow/libtensorflow_cc.so
{% endhighlight %}

{% highlight bash %}
(segmapenv)$ sudo cp ./home/user/.cache/bazel/_bazel_user/f61ec775ae98149c983e28ce5aff1318/execroot/org_tensorflow/bazel-out/k8-opt/bin/tensorflow/libtensorflow_cc.so {어딘가붙여넣을경로}
{% endhighlight %}

- 해서 보기좋은 곳으로 옮겨주자
- 그리고 다시 segmap_ws/src/tensorflow_ros_cpp 의 CMakeLists.txt 로 돌아가서 .so 를 찾는 라인에 경로를 저 내가 복사해놓은 어딘가붙여넣을 경로 로 바꿔주면 된다.
- 근데 기본적으로 {CATKIN_DEVEL_PREFIX}/../libtensorflow_cc.so 라고 되어 있는데 이거는 catkin workspace (devel, build, src있는 그 경로) 경로를 의미한다. 나는 cmakelist 에 저 - - 라인을 바꾸기 귀찮아서 so파일을 아예 workspace (devel build src와 같은 위치) 에 복사해버림.
- 그러고 나서 (아참 catkin_tools 를 미리 설치해야 함 그래야 catkin build 를 쓸수있음)

{% highlight bash %}
(segmapenv)$ catkin build tensorflow_ros_cpp
{% endhighlight %}

- 하니까 한 30초 안걸려서 빌드가 다 됐다.
- 이제 진짜 마지막으로 아래 명령어를 해주면

{% highlight bash %}
(segmapenv)$ catkin build segmapper
{% endhighlight %}

- segmapper 및 segmapper 가 필요로 하는 디펜던시들이 모두 컴파일이 된다.
- 근데 pcl_catkin 이랑 gtsam이 진짜 개오래 걸린다. 그래서 조금이라도 더 빨리 해주기 위해서
- 나는 i9–9900 을 사용중이어서 코어가 16개 (virtual로는 총 32개) 여서

{% highlight bash %}
(segmapenv)$ catkin build segmapper -j32
{% endhighlight %}

- 라고 해주었다.
- 그러면 20분정도 걸린다. 램은 많이 쓸때는 40G까지 올라간듯 (64기가 장착중)
- 코어가 많아도 램딸리면 터질수있으니 이거는 자기 시스템에 맞게 조절바람.
- 그러면 마지막에

- 이런 화면이 뜨면 모두가 잘 빌드가 된것이다! ㅠㅠ
<figure>
  <img src="/figs/2021-03-02-segmap-build/img1.png" alt="img1" style="width:100%">
  <figcaption> </figcaption>
</figure>
<span></span>
<!-- <p align="center"><img src="/figs/2021-03-02-segmap-build/img1.png" width=700></p> -->
<!-- ![dsf](/logo.png) -->

{% highlight bash %}
(segmapenv)$ source devel/setup.bash
{% endhighlight %}

- 를 해주고
- 저자가 올려둔 데이터 (KITTI 00 번과 05번, 각 16G, 10G) 를 http://robotics.ethz.ch/~asl-datasets/segmap/segmap_data/ 여기서 받아서 적절한 위치에 bag file 을 놓아두고

{% highlight bash %}
(segmapenv)$ roslaunch segmapper kitti_loop_closure.launch
{% endhighlight %}

- 하면 되는데 gedit kitti_loop_closure.launch 해서 여기보면 bagfile 경로를 지정하게 되어있다. 그거를 내가 위치시킨 경로로 바꿔주면 아마 실행 될것임.
- 참고로 kitti_loop_closure.launch 가 17 ICRA의 segmatch이고 cnn_kitti_loop_closure.launch가 18 RSS의 segmap 이다. (암튼 segmatch를 쓰고싶어도 tensorflow_ros_cpp를 컴파일해야했던 ㅠㅠ)
- 근데 틀면 기본적으로 rviz 에서는 아무것도 안보여지는데 저자가 올려둔 rviz config 파일을 같이 틀어야 아마 보여질듯 http://robotics.ethz.ch/~asl-datasets/segmap/segmap_data/kitti/
- 근데 귀찮으니까 그냥 왼쪽 아래에서 add 해주고 target/representation인가...? 이거를 틀면 잘 실행되고 있음을 알 수 있다. 자세한건 정광욱님의 플레이 영상을 보면 참고가 됨. https://www.youtube.com/watch?v=Hb7Agk8fs10&t=3s
- 05번을 다 돌아보았다.

<figure>
  <img src="/figs/2021-03-02-segmap-build/img2.png" alt="img2" style="width:100%">
  <figcaption> </figcaption>
</figure>
<span></span>

- 그나저나 다 돌고 런치파일을 실행한 터미널을 ctrl+C 하면 알아서 로그 파일과 결과파일을 /tmp/ 어딘가에 저장해준다. (어디 저장했다고 경로가 뜸)
- 암튼 돌리기 성공!

# 결론
- segmatch를 돌려보았다.
