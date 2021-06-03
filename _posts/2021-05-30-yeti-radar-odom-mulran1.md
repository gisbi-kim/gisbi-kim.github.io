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


---
### Comments