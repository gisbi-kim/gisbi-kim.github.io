// Editorial groupings based on the source titles and research scope.
// These are research questions, not computed similarity scores or claims of lineage.
export const RESEARCH_TOPICS=[
  {id:'language-navigation',lane:'autonomy',label:'Language & navigation',question:'How can robots turn human instructions and readable maps into navigation?',papers:[
    'human-like-navigation-2025','v2l-nav-iros-2026','navirrator','long-horizon-navigation-2026',
    'alpamayo-vla-2026','floorplan-point-language-grounded-navigation','rendezvous-briefing-2026','mapless-zero-shot-autonomous-driving'
  ]},
  {id:'memory-grounding',lane:'autonomy',label:'Memory & grounding',question:'How can robots connect language to places and objects, and remember a changing world?',papers:[
    'lamp-2025','where-to-fuse-2025','lt-mem','hint-object-alignment-2026','vlm-knowledge-fusion-2026'
  ]},
  {id:'field-robotics',lane:'autonomy',label:'Field & planetary robotics',question:'What platforms and simulation environments support autonomy beyond familiar settings?',papers:[
    'marslab-isparo-2026','planetary-robotics-simulation-survey-isparo-2026','planetary-perception-2026','rubiks-cube-wheel-transformable-mobile-robot'
  ]},
  {id:'consistent-maps',lane:'mapping',label:'Consistent & changing maps',question:'How can maps stay useful as scenes change, and consistent across sessions and viewpoints?',papers:[
    'remove-then-revert','lt-mapper-lifelong-mapping','elite-2025','scale-consistent-slam-2025','tran-d-2025','scalemaster-2026','mr-scalemaster-2026'
  ]},
  {id:'geometry-matching',lane:'mapping',label:'Geometry & matching',question:'How can geometric structure and correspondence support reliable matching and motion estimation?',papers:[
    'cnn-opti-acoustic-feature-matching','unsupervised-geometry-aware-deep-lidar-odometry','orora-radar-odometry',
    'fieldmatch-iros-2026','matchercompass','self-supervised-geometry-reasoning-lidar-slam','point-cloud-geometry-2026','rubik-image-matcher-pareto'
  ]},
  {id:'sensing-representations',lane:'mapping',label:'Sensing & representations',question:'Which sensors, datasets and efficient scene representations support robot perception?',papers:[
    'sthereo-dataset','bevrestore','broadbev','magnetic-aware-slam-2026','mag4d-slam-dataset','streamocc','inlier-centric-ptq-2026','lidar-slam-handbook-2026'
  ]},
  {id:'place-descriptors',lane:'place',label:'Place descriptors',question:'What compact spatial signatures let a robot recognize a place again?',papers:[
    'scan-context','learning-scan-context','scan-context-plus-plus','solid-lidar-place-recognition'
  ]},
  {id:'long-term-localization',lane:'place',label:'Long-term localization',question:'How can a robot localize over time and use available maps when conditions change?',papers:[
    'one-day-learning-one-year-localization','openstreetmap-lidar-global-localization','robust-lidar-localization-2025'
  ]},
  {id:'place-evaluation',lane:'place',label:'Datasets & generalization',question:'How well does place recognition transfer across sensors, time and environmental conditions?',papers:[
    'mulran-dataset','helipr-dataset','vpr-distractor-condition-suppression'
  ]}
];
const byPaper=new Map();
for(const topic of RESEARCH_TOPICS)for(const id of topic.papers){
  if(byPaper.has(id))throw new Error('Duplicate research topic assignment: '+id);
  byPaper.set(id,topic);
}
export function topicFor(p){
  const topic=byPaper.get(p.id);
  if(!topic||topic.lane!==p.lane)throw new Error('Missing or inconsistent research topic: '+p.id);
  return topic;
}
