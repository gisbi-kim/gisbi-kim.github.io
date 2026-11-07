// Layout inspired by Hyesu Jang's research-graph.js (MIT; see THIRD_PARTY_LICENSE.txt).
// Years run horizontally; research questions determine the rows inside each lane.
import {RESEARCH_TOPICS,topicFor} from './research-topics.mjs';
export const GEOMETRY={width:1180,left:232,right:1154,top:48,gap:12,firstYear:2018,lastYear:2026};
const YEAR_WEIGHTS=[1,1,1,1,1,1,1,1.2,3.6];
export const LANES=[
  {id:'autonomy',label:'Embodied Autonomy',subtitle:'Language, memory & action',color:'#f5f5f5'},
  {id:'mapping',label:'Mapping & Perception',subtitle:'Geometry, SLAM & a changing world',color:'#ffffff'},
  {id:'place',label:'Place Recognition',subtitle:'Recognizing where we are',color:'#f5f5f5'}
];
export function radius(p){return p.region==='domestic'?9:p.type==='journal'?13:p.type==='conference'?11:p.type==='preprint'?10:p.type==='book'?9:8.5;}
export function hitRadius(p){return Math.max(p.r+6,16);}
export function markerType(p){return p.region==='domestic'||p.type==='workshop'?'triangle':({journal:'circle',conference:'diamond',preprint:'hexagon',book:'square'}[p.type]||'circle');}
export function markerGeometry(type,x,y,r){
  if(type==='circle')return {tag:'circle',attrs:{cx:x,cy:y,r}};
  if(type==='square'){const half=r/Math.SQRT2;return {tag:'rect',attrs:{x:x-half,y:y-half,width:half*2,height:half*2}};}
  const sides=type==='triangle'?3:type==='diamond'?4:6;
  const start=type==='hexagon'?0:-Math.PI/2;
  const points=Array.from({length:sides},(_,i)=>{const a=start+i*Math.PI*2/sides;return `${x+r*Math.cos(a)},${y+r*Math.sin(a)}`;}).join(' ');
  return {tag:'polygon',attrs:{points}};
}
export function yearX(year){
  const g=GEOMETRY,offset=Math.max(0,Math.min(YEAR_WEIGHTS.length,year-g.firstYear)),index=Math.floor(offset);
  const weight=YEAR_WEIGHTS.slice(0,index).reduce((sum,w)=>sum+w,0)+(offset-index)*(YEAR_WEIGHTS[index]||0);
  return g.left+weight/YEAR_WEIGHTS.reduce((sum,w)=>sum+w,0)*(g.right-g.left);
}
export function layout(papers){return semanticLayout(papers).nodes;}
export function semanticLayout(papers){
  const g=GEOMETRY,nodes=papers.map(p=>({...p,r:radius(p),thread:topicFor(p).id})),bands=[],rows=[];
  let top=g.top;
  for(const lane of LANES){
    const band={...lane,y:top,rows:[]};
    let rowTop=top+30;
    for(const topic of RESEARCH_TOPICS.filter(t=>t.lane===lane.id)){
      const members=nodes.filter(p=>p.thread===topic.id),groups=[];
      let maxRows=1;
      const maxHit=Math.max(16,...members.map(hitRadius)),step=maxHit*2+6;
      for(let year=g.firstYear;year<=g.lastYear;year++){
        const inYear=members.filter(p=>p.year===year).sort((a,b)=>(a.month||6)-(b.month||6)||a.sourceIndex-b.sourceIndex);
        if(!inYear.length)continue;
        const width=yearX(year+1)-yearX(year),packed=[[]];
        let used=0;
        for(const p of inYear){
          const size=hitRadius(p)*2,extra=packed.at(-1).length?6:0;
          if(size>width)throw new Error('Year band is too narrow for '+p.id);
          if(used+extra+size>width){packed.push([]);used=0;}
          used+=(packed.at(-1).length?6:0)+size;packed.at(-1).push(p);
        }
        maxRows=Math.max(maxRows,packed.length);groups.push({year,packed});
      }
      const height=Math.max(52,(maxRows-1)*step+maxHit*2+10);
      const row={...topic,y:rowTop,height,cy:rowTop+height/2};
      for(const {year,packed} of groups)packed.forEach((line,index)=>{
        const width=line.reduce((sum,p)=>sum+hitRadius(p)*2,0)+(line.length-1)*6;
        let x=yearX(year)+(yearX(year+1)-yearX(year)-width)/2;
        for(const p of line){p.x=x+hitRadius(p);p.y=row.cy+(index-(packed.length-1)/2)*step;x+=hitRadius(p)*2+6;}
      });
      rows.push(row);band.rows.push(row);rowTop+=height;
    }
    band.height=rowTop-top+8;bands.push(band);top=rowTop+8+g.gap;
  }
  const axisY=top-g.gap+27;
  return {nodes,bands,rows,axisY,height:axisY+26};
}
// Catmull–Rom to cubic Bézier, following the reference's trail implementation.
export function smoothPath(points){
  if(points.length<2)return '';
  let d=`M${points[0].x},${points[0].y}`;
  for(let i=0;i<points.length-1;i++){
    const p0=points[i-1]||points[i],p1=points[i],p2=points[i+1],p3=points[i+2]||p2;
    d+=` C${p1.x+(p2.x-p0.x)/6},${p1.y+(p2.y-p0.y)/6} ${p2.x-(p3.x-p1.x)/6},${p2.y-(p3.y-p1.y)/6} ${p2.x},${p2.y}`;
  }
  return d;
}
export function starPoints(x,y,r=6){return Array.from({length:10},(_,i)=>{const a=-Math.PI/2+i*Math.PI/5,k=i%2?r*.44:r;return `${x+k*Math.cos(a)},${y+k*Math.sin(a)}`;}).join(' ');}
