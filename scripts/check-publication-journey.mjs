import fs from 'node:fs';
import assert from 'node:assert/strict';
import {semanticLayout,hitRadius,yearX} from '../static/publication-journey/geometry.mjs';
import {RESEARCH_TOPICS,topicFor} from '../static/publication-journey/research-topics.mjs';

const root=new URL('../static/publication-journey/',import.meta.url);
const data=JSON.parse(fs.readFileSync(new URL('data.json',root),'utf8'));
const ids=data.papers.map(p=>p.id);
const assignments=RESEARCH_TOPICS.flatMap(t=>t.papers);
assert.equal(new Set(ids).size,ids.length,'Paper IDs must be unique');
assert.equal(new Set(assignments).size,assignments.length,'Each paper must belong to exactly one topic');
assert.deepEqual([...assignments].sort(),[...ids].sort(),'Topics must cover the paper list exactly');
for(const p of data.papers){
  assert.equal(topicFor(p).lane,p.lane,`${p.id} has a mismatched research area`);
  if(p.image)assert(fs.existsSync(new URL(p.image,root)),`Missing figure for ${p.id}`);
  for(const link of [p.source,...p.links.map(l=>l.url)])assert(/^https?:\/\//.test(link),`Invalid link for ${p.id}`);
}
assert(fs.existsSync(new URL('assets/avatar.png',root)));
for(const domestic of [false,true]){
  const papers=data.papers.filter(p=>domestic||p.region!=='domestic'||p.type!=='conference');
  const chart=semanticLayout(papers);
  assert.equal(chart.nodes.length,papers.length);
  assert.equal(chart.rows.length,RESEARCH_TOPICS.length);
  let clearance=Infinity;
  for(const [i,p] of chart.nodes.entries()){
    const row=chart.rows.find(r=>r.id===topicFor(p).id),r=hitRadius(p);
    assert(p.x-r>=yearX(p.year)-.001&&p.x+r<=yearX(p.year+1)+.001,`${p.id} escaped its year`);
    assert(p.y-r>=row.y&&p.y+r<=row.y+row.height,`${p.id} escaped its topic`);
    for(const other of chart.nodes.slice(i+1)){
      const distance=Math.hypot(p.x-other.x,p.y-other.y)-r-hitRadius(other);
      clearance=Math.min(clearance,distance);
      assert(distance>=0,`${p.id} overlaps ${other.id}`);
    }
  }
  assert(data.trail.every(id=>chart.nodes.some(p=>p.id===id)),'Missing trail milestone');
  console.log(JSON.stringify({domestic,nodes:chart.nodes.length,topics:chart.rows.length,minHitClearance:clearance}));
}
