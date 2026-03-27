---
title: ''
date: 2024-12-01
type: landing

design:
  spacing: '5rem'

sections:
  - block: about.biography
    id: about
    content:
      title: Biography
      username: admin

  - block: experience
    id: experience
    content:
      title: Experience
      items:
        - title: Assistant Professor & PI of APRL
          company: DGIST
          company_url: 'https://www.dgist.ac.kr'
          company_logo: ''
          location: Daegu, South Korea
          date_start: '2024-12-01'
          date_end: ''
          description: |
            Dept. of Robotics and Mechatronics Engineering (Joint: AI, Mechanical Engineering Track).
            Leading the [Autonomy and Perceptual Robotics Lab (APRL)](https://sites.google.com/view/aprl-dgist/home).

        - title: Research Scientist
          company: NAVER LABS
          company_url: 'https://www.naverlabs.com/'
          company_logo: ''
          location: Seongnam, South Korea
          date_start: '2021-12-01'
          date_end: '2024-12-01'
          description: Autonomous Driving Group (2021--2023) and Vision Group (2024).

        - title: Graduate Student Researcher
          company: KAIST
          company_url: 'https://www.kaist.ac.kr'
          company_logo: ''
          location: Daejeon, South Korea
          date_start: '2017-03-01'
          date_end: '2021-08-31'
          description: |
            [IRAP Lab](https://rpm.snu.ac.kr), Dept. of Civil and Environmental Engineering.
    design:
      columns: '1'

  - block: collection
    id: publications
    content:
      title: Selected Publications
      filters:
        folders:
          - publication
      sort_by: 'Date'
      sort_ascending: false
    design:
      view: citation

  - block: markdown
    id: talks
    content:
      title: Invited Talks
      text: |
        <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS1gqbTRqYQP-jMI2xQ1QlI4JoGjGMa6Uw_iKCBCp3Nlxj_f7TobWkSx7o-rqcldBB10TcXKVG1udn0/pubhtml?gid=0&single=true&widget=true&headers=false" width="100%" height="600" frameborder="0" style="border:0; border-radius:8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"></iframe>
    design:
      columns: '1'

  - block: collection
    id: projects
    content:
      title: Funded Projects
      filters:
        folders:
          - project
      sort_by: 'Date'
      sort_ascending: false
    design:
      view: showcase
      columns: 2

  - block: markdown
    id: teaching
    content:
      title: Teaching
      text: |
        ### Lectures at DGIST
        - **MECH307** Introduction to Artificial Intelligence (Fall 2025)
        - **AT603** Introduction to Mobility Engineering (Fall 2025)
        - **BE203** Creative Mechanical Design (Spring 2025)
    design:
      columns: '1'

  - block: markdown
    id: supervision
    content:
      title: Research Supervision
      text: |
        - **Integrated MS--PhD Students (1):** Bokeon Suh (2025 Fall--)
        - **PhD Students (1):** Doyeon Kim (2026 Spring--)
        - **MS Students (5):** Jiseon Kim (2025 Fall--), Yumin Lee (2025 Fall--), Hyoseok Ju (2025 Fall--), Hoyoon Kim (2026 Spring--), Beomsoo Kim (2026 Spring--)
    design:
      columns: '1'

  - block: markdown
    id: service
    content:
      title: Academic Services & Awards
      text: |
        ### Reviewer
        - **Journals:** T-RO, RA-L, IJRR, IJCV, T-ASE, T-II, T-AES, etc.
        - **Conferences:** ICRA, IROS, RSS, CVPR, ICCV, ECCV, UR, etc.

        ### Editorial & Organizing
        - Associate Editor: International Conference on Ubiquitous Robots (UR) (2022--2024)
        - Program Committee: ICROS 2026 (Daegu, South Korea)

        ### Awards
        - Best paper award at ICRA 2018 Workshop on Long-term Autonomy and Deployment of Intelligent Robots in the Real-world

        ### Patents
        - Method and Apparatus for Automation of Urban Visibility Analysis Using 3D Sensor Data (South Korea, 2019)
        - Encoder Frame Device And Vehicle Odometry Measurement System Using The Same (South Korea, 2019)
    design:
      columns: '1'

  - block: collection
    id: posts
    content:
      title: Blog Archive
      filters:
        folders:
          - post
      sort_by: 'Date'
      sort_ascending: false
      count: 5
    design:
      view: compact
---
