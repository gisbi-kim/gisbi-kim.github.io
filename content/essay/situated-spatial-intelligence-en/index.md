---
title: "APRL's Research Program and Situated Spatial Intelligence"
subtitle: "Spatial Intelligence Is Completed in the Real World"
summary: "APRL develops Situated Spatial Intelligence by integrating geometric understanding, reality-grounded perception, spatial memory, communication with people, and reliable physical action."
date: 2026-08-02T23:37:15+09:00
authors:
  - admin
tags:
  - Robotics
  - Spatial AI
  - APRL
  - Embodied AI
draft: false
type: essays
url: "/situated-spatial-intelligence/en/"
build:
  list: never
  render: always
---

<figure class="ssi-hero">
  <img src="/images/essays/situated-spatial-intelligence-cycle.png" alt="The APRL Situated Spatial Intelligence loop: Model Space, Ground Reality, Remember Change, Share Understanding, and Execute Intent" width="1672" height="941" loading="eager" fetchpriority="high">
</figure>

<nav class="ssi-language-switch" aria-label="Language">
  <a href="/situated-spatial-intelligence/" lang="ko">한국어</a>
  <a class="is-active" href="/situated-spatial-intelligence/en/" lang="en" aria-current="page">English</a>
</nav>

Spatial intelligence is more than building a map or estimating a robot's location. For a robot to work with people over long periods in the real world, it must understand the structure of space and know whether that understanding can be trusted outside the laboratory. It must also remember how the world changes, share its spatial understanding with people, and turn agreed intent into physical action.

The goal is not to reproduce the world in as much detail as possible. A robot must identify the spatial information required by the current task and human intent, then revise that understanding as time passes and actions change the world. In this essay, **task relevance** is not a new module or a sixth research pillar. It is a shared rule across all five pillars: never lose sight of what matters for the task at hand.

<aside class="ssi-note ssi-task-note" aria-label="Examples of task relevance">
  <div class="ssi-note__label">Examples</div>
  <p class="ssi-note__title">Different tasks require different spatial information.</p>
  <div class="ssi-note__rows">
    <div class="ssi-note__row"><strong>Home assistance</strong><span>The robot must understand private and shared areas, habitual object locations, household routines, and what has changed that day.</span></div>
    <div class="ssi-note__row"><strong>Healthcare</strong><span>Patient and staff locations, clean and restricted zones, unobstructed routes, and emergency paths matter.</span></div>
    <div class="ssi-note__row"><strong>Guidance</strong><span>The robot needs entrances, waiting and queueing areas, meeting points, accessible routes, and the flow of people.</span></div>
    <div class="ssi-note__row"><strong>Delivery</strong><span>Entrances, elevators, access rules, handoff locations, busy times, and human traffic patterns all matter.</span></div>
    <div class="ssi-note__row"><strong>Driving</strong><span>Drivable space, lanes and boundaries, traffic signals, and the motion of nearby vehicles and pedestrians matter.</span></div>
    <div class="ssi-note__row"><strong>Rescue and exploration</strong><span>The robot needs the locations of people and hazards, blocked passages, unseen regions, and safe routes for entry and return.</span></div>
  </div>
  <p class="ssi-note__conclusion">Even in the same environment, a different task calls for a different map, memory, set of questions, and course of action.</p>
</aside>

This direction grows from research questions APRL has developed over time. In [APRL Research Vision](https://gisbi-kim.github.io/aprl-research-vision/en/), we asked what world state a robot must maintain in order to act, before asking for a better map or a higher perception score. [VLA Runtime Harnessing](https://gisbi-kim.github.io/vla-runtime-harnessing/en/) brought that question into execution: a robot must detect uncertainty, observe more when needed, retrieve relevant memories, and verify its own judgment. Spatial understanding is not a static product completed before action begins. It is selected by task and intent, tested during execution, and rebuilt through failure and new observation. Situated Spatial Intelligence is APRL's integrated research program for studying these questions in one closed loop.

Spatial intelligence therefore cannot be completed by any single algorithm or capability. A robot's spatial model is revised as experience accumulates, aligned through dialogue with people, and checked through the consequences of physical action. Trust cannot be established by one final test. It must be examined while the robot understands, remembers, communicates, and acts.

APRL is developing five research pillars for this process.

<ul class="ssi-pillar-grid" aria-label="APRL's five research pillars">
  <li><strong>GSI</strong><span>Geometric Spatial Intelligence</span></li>
  <li><strong>RGP</strong><span>Reality-Grounded Perception</span></li>
  <li><strong>ASM</strong><span>Agentic Spatial Memory</span></li>
  <li><strong>CSI</strong><span>Communicative Spatial Intelligence</span></li>
  <li><strong>ESI</strong><span>Executable Spatial Intelligence</span></li>
</ul>

All five pillars share task relevance as a common criterion. GSI, ASM, CSI, and ESI provide four capabilities: understanding space, remembering change, sharing understanding with people, and acting on intent. RGP asks whether all of them remain trustworthy in the real world.

Together, these five pillars lead toward **SSI: Situated Spatial Intelligence**.

Let us now examine what each pillar means.

<hr class="ssi-section-divider">

## GSI: Intelligence That Understands the Structure of Space

Before a robot can act in space, it must know where it is and how the surrounding world is structured. Connecting observations from different viewpoints and sensors into one coherent space—and reasoning about distance, direction, shape, and motion—provides the foundation for everything that follows.

APRL has studied these questions through localization, mapping, place recognition, and 3D reconstruction. More recently, we have been examining whether spatial representations produced by learning-based vision models faithfully reflect the geometry of the physical world, and whether those representations are consistent and reliable enough to support robot judgment and action.

Producing a visually plausible space is not the same as understanding a space that a robot can use. A powerful learning model may capture rich spatial cues, but we must still test whether it preserves a consistent structure across observations, accurately reflects the physical world, and supports action.

We call this research pillar **GSI: Geometric Spatial Intelligence**.

GSI does not choose between classical geometry and modern learning-based models. It combines their strengths to build spatial representations that remain geometrically consistent under incomplete and diverse observations and can be used for real action.

GSI asks a fundamental question.

<blockquote class="ssi-emphasis">
  <p><strong>Where am I, and what spatial structure does the world I observe have?</strong></p>
</blockquote>

GSI provides the geometric foundation for APRL's other research pillars. Making GSI explicit also means continuing APRL's work in SLAM, mapping, place recognition, and geometry while connecting that lineage to modern learned spatial representations.

<hr class="ssi-section-divider">

## RGP: Perception We Can Trust in Reality

A geometrically consistent spatial model does not always reflect reality correctly. Lighting, weather, season, viewpoint, sensors, and robot platforms all change. A model that scores highly on a curated benchmark may fail in an entirely different way under an unexpected real-world condition.

A robot must therefore do more than understand space. It must know when that understanding can be trusted.

APRL identifies when perception models fail as lighting, weather, sensors, and environments change, and develops evaluation methods for real robots. When a condition is dangerous or difficult to reproduce in reality, we use physically grounded simulation and diverse test environments to examine perception and action.

We call this research pillar **RGP: Reality-Grounded Perception**.

RGP is not about raising an average score. It asks what evidence a model uses to understand the world, where that understanding breaks, and whether it preserves the information needed for the task in a real environment.

RGP is not a check performed once after GSI is complete. A GSI spatial model must remain accurate as conditions change. ASM memory must track real changes in the environment. CSI explanations must honestly reflect what the robot knows and does not know. ESI actions must produce reliable results on a physical robot.

<blockquote class="ssi-emphasis">
  <p><strong>A claim of spatial understanding must hold in reality.</strong></p>
</blockquote>

RGP checks whether spatial models, memories, explanations, and actions match reality across every research pillar. The important question is not the dataset score itself, but whether a robot can safely rely on its understanding when acting in the real world.

<aside class="ssi-note" aria-label="The difference between GSI and RGP">
  <div class="ssi-note__label">Note</div>
  <p class="ssi-note__title">How are GSI and RGP different?</p>
  <div class="ssi-note__rows">
    <div class="ssi-note__row"><strong>GSI</strong><span>What geometric spatial state should be estimated, and how?</span></div>
    <div class="ssi-note__row"><strong>RGP</strong><span>When can that estimated state be trusted in the real world?</span></div>
  </div>
  <p class="ssi-note__conclusion">The questions are connected, but they are not the same. GSI builds a spatial model; RGP asks whether that model can be trusted in reality.</p>
</aside>

<hr class="ssi-section-divider">

## ASM: Spatial Memory That Persists over Time

Reality is not fixed at the moment it is observed. People and objects move, and the state and function of a space change. Some changes are temporary; others remain for a long time.

A long-running robot cannot treat the world as if it were seeing everything for the first time. Nor should it accumulate every observation indefinitely in one map. It must determine what stayed the same, what changed, and which changes matter.

APRL does not view spatial memory as a warehouse of past data. Spatial memory is the robot's current understanding, continually rewritten as the world changes. A robot must decide what to remember, revise, and forget, and which experience to use for its current judgment and next action.

We call this research pillar **ASM: Agentic Spatial Memory**.

ASM is not about storing more information. It is about organizing past experience so it remains useful for present judgment and future action. This requires reasoning about not only spatial change, but also its duration, importance, and uncertainty.

<blockquote class="ssi-emphasis">
  <p><strong>Spatial memory should not be a record that merely accumulates the past. It should be an understanding continually revised with a changing reality.</strong></p>
</blockquote>

When the spatial understanding produced by GSI and tested by RGP is combined with ASM, a robot can understand not just a single scene but a world that changes over time.

<hr class="ssi-section-divider">

## CSI: Spatial Understanding Shared with People

Even a robot with an accurate spatial model and rich memory cannot collaborate well if people cannot understand or correct what it knows.

This matters especially when robots enter homes, hospitals, schools, and workplaces. Geometry alone is not enough in spaces where people live. People understand space through place names, landmarks, habits, purposes, and accumulated experience. The same physical area may be a passage, a place to stay, or an area requiring care depending on who uses it, when, and for what purpose. The way people use space also tells a robot what matters now.

Robots represent space with coordinates, probabilities, and precise geometric maps. People say “by the front door,” “where we always leave things,” or “the path people usually take.” If a robot cannot understand this difference, it may parse the words correctly while missing the intent behind them.

APRL studies how robots can understand the ways people describe and use space, and communicate with people on the basis of that experience. A robot must understand language, sketches, landmarks, and cues from everyday life. It must also explain its location and judgment in a form people can understand, and ask questions when an instruction is ambiguous or when human and robot understanding do not match.

We call this research pillar **CSI: Communicative Spatial Intelligence**.

CSI is not complete when an explanation is added to a robot's decision. What matters is whether, after the robot understands human spatial experience and a conversation takes place, people and robots come to understand the place and situation more similarly.

Maps and language are not merely tools for displaying robot output. They become a shared language through which people and robots check what each knows, find differences, and correct them together.

<blockquote class="ssi-emphasis">
  <p><strong>Spatial intelligence must understand not only the shape of a space, but also how people name, use, and remember it.</strong></p>
</blockquote>

<hr class="ssi-section-divider">

## ESI: Intelligence That Completes Understanding through Action

Understanding space and turning that understanding into correct physical action are different problems.

Even when a robot understands a person's intent and destination, it must decide what to do, how far to move, and when to stop or reconsider. Producing a plausible direction or action is not enough. Spatial understanding must lead to actions that remain reliable when repeated in the real world.

APRL studies how spatial intent expressed through language and surrounding context can be turned into actions a robot can actually perform. Beyond understanding an instruction, the robot must decide how far to move, when to observe again, and how to revise its plan when the result differs from expectation.

We call this research pillar **ESI: Executable Spatial Intelligence**.

ESI asks a clear question.

<blockquote class="ssi-emphasis">
  <p><strong>How can spatial understanding be completed as reliable physical action?</strong></p>
</blockquote>

ESI is not about producing a plausible answer. It is about carrying shared spatial intent through to completion in the real world.

<hr class="ssi-section-divider">

## One Closed Loop Formed by Five Research Pillars

The five pillars do not operate one after another in a straight line. GSI finds spatial structure in observations. ASM remembers and revises that understanding over time. CSI helps people and robots understand space in similar ways. ESI turns agreed intent into physical action. RGP checks whether every part remains trustworthy in reality.

The process does not move in only one direction. Memory changes how a new scene is interpreted. Human feedback revises the robot's understanding and next action. Action changes the world, and the result returns as a new observation and memory. RGP checks whether the entire process matches reality, while task relevance continually asks what truly matters for the current intent and action.

APRL's research philosophy can be stated in one passage.

<blockquote class="ssi-emphasis">
  <p><strong>Spatial intelligence must build a consistent spatial structure across observations and remain trustworthy in reality. It must persist over time, share understanding with people, and ultimately lead to physical action.</strong></p>
</blockquote>

<hr class="ssi-section-divider">

## The Destination: Situated Spatial Intelligence

The five research pillars converge on **SSI: Situated Spatial Intelligence**.

Here, *situated* does not merely mean that a robot exists in a particular place. It means that intelligence is formed and developed within a physical environment, accumulated experience, relationships with people, and the consequences of the robot's own actions.

SSI can be defined as follows.

<blockquote class="ssi-emphasis">
  <p><strong>Situated Spatial Intelligence is the ability of an embodied agent to construct a geometrically coherent, reality-grounded, task-relevant, and temporally persistent understanding of space, align that understanding with humans, and transform shared spatial intent into reliable physical action.</strong></p>
</blockquote>

In other words, Situated Spatial Intelligence is the ability of an embodied robot to build an understanding of space that is consistent across observations, trustworthy in reality, relevant to the current task, and persistent over time. The robot must share that understanding with people and turn agreed intent into reliable action.

Traditional Spatial AI has often asked, “Where am I?” and “Where should I go?” SSI asks a longer set of questions.

Is the space constructed by the robot geometrically consistent? Can its spatial understanding be trusted in reality? Does memory update when the world changes? Can people understand what the robot knows and does not know? Do people and robots share a sufficiently close understanding of the same place and goal? Does shared intent lead to reliable action? Can the robot revise its understanding from the consequences of that action?

Spatial intelligence becomes intelligence that can operate continuously in reality only when these questions can be answered together.

<hr class="ssi-section-divider">

## What APRL Aims to Build—and What Comes Next

APRL does not treat localization, mapping, perception, memory, human–robot interaction, and navigation only as separate problems. We study the full loop: constructing space, testing it in reality, remembering it over time, sharing it with people, and completing it through action.

We aim to build robots that understand spatial structure, experience real-world change, share how they understand space with people, and complete agreed intent through physical action. These robots do not remain on a static map performing one task. They accumulate experience in a changing world, align understanding with people, and keep learning from the consequences of action.

In its most concise form:

<blockquote class="ssi-emphasis">
  <p><strong>APRL develops Situated Spatial Intelligence: robots that model space geometrically, ground their understanding in reality, remember how the world changes, communicate spatial understanding with people, and transform shared intent into reliable physical action.</strong></p>
</blockquote>

APRL's five research pillars can be summarized in five lines.

<blockquote class="ssi-emphasis">
  <p><strong>Model Space.</strong></p>
  <p><strong>Ground Reality.</strong></p>
  <p><strong>Remember Change.</strong></p>
  <p><strong>Share Understanding.</strong></p>
  <p><strong>Execute Intent.</strong></p>
</blockquote>

<hr class="ssi-section-divider">

### Lifelong Spatial Adaptation: Intelligence That Learns from Outcomes

In the long term, SSI must do more than receive the outcome of an action. It must use that outcome to improve how it perceives, remembers, communicates, and acts. If a robot remembers a failure but behaves the same way next time, it is difficult to say that the intelligence is learning from experience.

APRL calls this direction **LSA: Lifelong Spatial Adaptation**. LSA is the ability to continually improve how a robot sees space, remembers, communicates, and acts from accumulated experience and action outcomes.

For now, LSA is not an independent sixth research pillar. It is closer to a learning flow that sends experience back through all five pillars. The robot revises spatial representations for new environments and sensors, incorporates discovered failures into later evaluation and models, and changes memory, communication, and action from human feedback and execution results. As this body of research grows, LSA may develop into an independent research program.

<hr class="ssi-section-divider">

### Distributed Spatial Intelligence: Extending SSI across Multiple Agents

The long-term vision of SSI does not end with a single robot. Robots with different sensors and mobility should share spatial understanding and memory, divide roles, and act together with people.

APRL calls this direction **DSI: Distributed Spatial Intelligence**. If a single robot equipped with GSI, ASM, CSI, and ESI is the basic form of SSI, DSI distributes those capabilities across multiple collaborating robots. At present, it is better understood not as a new research pillar, but as the direction in which SSI grows from one robot to many.

Future problems include aligning spatial understanding among robots, sharing memory, communicating across different bodies and sensors, and jointly deciding actions and roles. **Shared Spatial Understanding** is therefore not only a conclusion of CSI or a separate slogan. It is a broader goal required for people and multiple robots to check and revise one another's understanding and act together.

When LSA and DSI come together, robots can do more than accumulate experience and failure independently. They can learn from one another. Learning from real outcomes and sharing that learning among people and multiple robots is a direction in which Situated Spatial Intelligence can continue to grow.

<hr class="ssi-section-divider">

## Conclusion

Spatial intelligence is not completed inside a map. It is completed in a closed loop: understanding spatial structure, experiencing reality, remembering that experience, aligning understanding with people, and receiving the consequences of action.

**Situated Spatial Intelligence is APRL's research program toward that complete closed loop.**

<script defer src="/js/ssi-paper-sections.js"></script>
