import {GEOMETRY as G,LANES,semanticLayout,yearX,smoothPath,starPoints,markerType,markerGeometry,hitRadius} from './geometry.mjs';
import {RESEARCH_TOPICS,topicFor} from './research-topics.mjs';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const COLORS={lidar:'var(--lidar)',vision:'var(--vision)',radar:'var(--radar)',multimodal:'var(--multimodal)'};
const LABELS={lidar:'LiDAR',vision:'Vision',radar:'Radar',multimodal:'Multimodal',language:'Language',learning:'Learning',sonar:'Sonar',simulation:'Simulation'};
const TYPES={journal:'Journal',conference:'Conference',workshop:'Workshop',preprint:'Preprint',book:'Book chapter'};
const state={topic:'all',lead:false,type:'all',search:'',domestic:false,thread:null};
let data,nodes=[],svgNodes=new Map(),lastOpener=null;
const svg=$('#journey-chart'),tooltip=$('#tooltip'),dialog=$('#detail-dialog');
function svgEl(tag,attrs={},parent=svg){const el=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v]of Object.entries(attrs))el.setAttribute(k,v);parent.append(el);return el;}
function txt(text,attrs,parent){const el=svgEl('text',attrs,parent);el.textContent=text;return el;}
function role(p){return p.first&&p.corresponding?'First & corresponding author':p.first?'First / co-first author':p.corresponding?'Corresponding author':'Co-author';}
function typeLabel(p){return (p.region==='domestic'?'Domestic ':'')+TYPES[p.type];}
function isDomesticConference(p){return p.region==='domestic'&&p.type==='conference';}
function inScope(p){return state.domestic||!isDomesticConference(p);}
function matchesOtherFilters(p){return inScope(p)&&(state.topic==='all'||p.tags.includes(state.topic))&&(!state.lead||p.lead)&&(state.type==='all'||p.type===state.type)&&(!state.search||`${p.title} ${p.short} ${p.authors} ${p.venue} ${p.venueFull} ${p.year}`.toLowerCase().includes(state.search));}
function matches(p){return matchesOtherFilters(p)&&(!state.thread||topicFor(p).id===state.thread);}

function positionTooltip(el){
  const rect=el.getBoundingClientRect(),box=tooltip.getBoundingClientRect();
  tooltip.style.left=Math.max(10,Math.min(window.innerWidth-box.width-10,rect.x+rect.width/2-box.width/2))+'px';
  let top=rect.y-box.height-12;if(top<10)top=rect.bottom+12;
  tooltip.style.top=Math.max(10,Math.min(window.innerHeight-box.height-10,top))+'px';
}
function showTooltip(p,el){
  if(!matches(p))return;
  tooltip.innerHTML=`<div class="tip-thread">${esc(topicFor(p).label)}</div><div class="tip-meta">${esc(LABELS[p.lens])} · ${esc(p.venue)} · ${p.year} · ${esc(typeLabel(p))}</div><strong>${esc(p.title)}</strong><div class="tip-role">${esc(role(p))}</div>${p.award?`<div class="tip-award">★ ${esc(p.award)}</div>`:''}<div class="tip-action">Click or press Enter for details ↗</div>`;
  tooltip.hidden=false;positionTooltip(el);
}
function hideTooltip(){tooltip.hidden=true;}
function openDialog(html,opener){lastOpener=opener||document.activeElement;hideTooltip();$('#dialog-content').innerHTML=html;dialog.showModal();$('#close-dialog').focus();}
function openPaper(p,opener){
  openDialog(`<p class="detail-kicker">${esc(p.venue)} · ${esc(p.date)} · ${esc(typeLabel(p))}</p><h2 class="detail-title" id="detail-title">${esc(p.title)}</h2><p class="detail-authors">${esc(p.authors).replace(/Giseop Kim|김기섭/g,'<strong>$&</strong>')}</p>${p.award?`<div class="detail-award">★ ${esc(p.award)}</div>`:''}${p.image?`<img class="detail-image" src="${esc(p.image)}" alt="Overview figure for ${esc(p.short)}">`:''}<div class="detail-meta"><span>${esc(role(p))}</span><span>${esc(LANES.find(l=>l.id===p.lane).label)}</span>${p.tags.map(t=>`<span>${esc(LABELS[t]||t)}</span>`).join('')}</div><p class="detail-note">${esc(p.venueFull)}${p.note?'<br>'+esc(p.note):''}</p><div class="detail-links">${p.links.map(l=>`<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join('')}${p.bibtex?'<button id="copy-bib">Copy BibTeX</button>':''}</div><p class="detail-source">Source: <a href="${esc(p.source)}" target="_blank" rel="noopener">APRL publication list ↗</a></p>`,opener);
  $('#copy-bib')?.addEventListener('click',async e=>{try{await navigator.clipboard.writeText(p.bibtex);e.target.textContent='Copied ✓';}catch{e.target.textContent='Copy unavailable';}});
}
function closeDialog(){dialog.close();hideTooltip();lastOpener?.focus();}
$('#close-dialog').addEventListener('click',closeDialog);
dialog.addEventListener('cancel',()=>{hideTooltip();});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')hideTooltip();});
window.addEventListener('scroll',hideTooltip,{passive:true});
window.addEventListener('resize',hideTooltip);
$('.chart-scroll').addEventListener('scroll',hideTooltip,{passive:true});

function renderChart(){
  hideTooltip();
  svg.querySelectorAll(':scope > g, :scope > path').forEach(el=>el.remove());
  svgNodes.clear();
  const chart=semanticLayout(data.papers.filter(inScope));
  nodes=chart.nodes;svg.setAttribute('viewBox',`0 0 ${G.width} ${chart.height}`);
  document.querySelectorAll('[data-marker-legend]').forEach(icon=>{
    icon.replaceChildren();
    const shape=markerGeometry(icon.dataset.markerLegend,12,12,9);
    svgEl(shape.tag,{...shape.attrs,fill:'#77798218',stroke:'#777982','stroke-width':1.4,'stroke-linejoin':'round'},icon);
  });
  const back=svgEl('g',{'aria-hidden':'true'});
  chart.bands.forEach(lane=>{
    svgEl('rect',{x:0,y:lane.y,width:G.width,height:lane.height,rx:4,fill:lane.color},back);
    txt(lane.label,{x:22,y:lane.y+21,class:'lane-label'},back);
    txt('',{x:213,y:lane.y+21,'text-anchor':'end',class:'lane-count',id:'count-'+lane.id},back);
    for(let yr=G.firstYear;yr<=G.lastYear;yr++)svgEl('line',{x1:yearX(yr),x2:yearX(yr),y1:lane.y+30,y2:lane.y+lane.height-7,class:'year-grid'},back);
  });
  chart.rows.forEach(row=>{
    svgEl('rect',{x:10,y:row.y,width:G.width-20,height:row.height,rx:3,class:'semantic-row-band','data-thread-row':row.id},back);
    svgEl('line',{x1:G.left,x2:G.right,y1:row.cy,y2:row.cy,class:'semantic-row-guide'},back);
  });
  for(let yr=G.firstYear;yr<=G.lastYear;yr++)txt(yr,{x:yearX(yr+.5),y:chart.axisY,class:'axis-label'},back);
  const trailNodes=data.trail.map(id=>nodes.find(p=>p.id===id)).filter(Boolean);
  svgEl('path',{d:smoothPath(trailNodes),class:'trail','aria-hidden':'true',id:'research-trail'});
  const controls=svgEl('g',{'aria-label':'Research questions'});
  chart.rows.forEach(row=>{
    const control=svgEl('g',{class:'thread-control',role:'button',tabindex:0,'aria-label':`Explore ${row.label}`,'aria-pressed':'false','data-thread':row.id},controls);
    svgEl('rect',{x:14,y:row.cy-19,width:208,height:38,rx:4},control);
    txt(row.label,{x:22,y:row.cy+4,class:'thread-label'},control);
    txt('',{x:213,y:row.cy+4,'text-anchor':'end',class:'thread-count','data-thread-count':row.id},control);
    const select=()=>{state.thread=state.thread===row.id?null:row.id;applyFilters();};
    const explain=()=>{const works=data.papers.filter(p=>inScope(p)&&topicFor(p).id===row.id);tooltip.innerHTML=`<div class="tip-thread">${esc(row.label)}</div><strong>${esc(row.question)}</strong><div class="tip-meta">${works.length} works · Select to follow this topic across years</div>`;tooltip.hidden=false;positionTooltip(control);};
    control.addEventListener('mouseenter',explain);control.addEventListener('mouseleave',hideTooltip);control.addEventListener('focus',explain);control.addEventListener('blur',hideTooltip);
    control.addEventListener('click',select);control.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select();}});
  });
  const dots=svgEl('g',{});
  nodes.slice().sort((a,b)=>Number(a.lead)-Number(b.lead)).forEach(p=>{
    const group=svgEl('g',{class:'paper-node'+(p.lead?' lead':' coauthor'),tabindex:0,role:'button','aria-label':`${p.short}, ${p.venue} ${p.year}, ${role(p)}. Open details`,'data-paper':p.id},dots);
    svgEl('circle',{cx:p.x,cy:p.y,r:hitRadius(p),fill:'transparent'},group);
    svgEl('circle',{cx:p.x,cy:p.y,r:p.r+5,class:'hover-ring'},group);
    const type=markerType(p),shape=markerGeometry(type,p.x,p.y,p.r);
    const attrs={fill:p.lead?COLORS[p.lens]:'#fff',stroke:COLORS[p.lens],'stroke-width':p.lead?1:2.6,'stroke-linejoin':'round',class:'node-shape','data-marker-type':type,'data-modality':p.lens};
    svgEl(shape.tag,{...shape.attrs,...attrs},group);
    if(p.award){let x=p.x+p.r*.85,y=p.y-p.r*.85;svgEl('circle',{cx:x,cy:y,r:5.5,fill:'#eaf3ff',stroke:'white','stroke-width':1},group);svgEl('polygon',{points:starPoints(x,y,3.7),class:'award-star'},group);}
    group.addEventListener('mouseenter',()=>showTooltip(p,group));group.addEventListener('mouseleave',hideTooltip);
    group.addEventListener('focus',()=>showTooltip(p,group));group.addEventListener('blur',hideTooltip);
    group.addEventListener('click',()=>openPaper(p,group));group.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openPaper(p,group);}});
    svgNodes.set(p.id,group);
  });
  // Sparse labels preserve the original graph's quiet, uncluttered appearance.
  ['scan-context','one-day-learning-one-year-localization','lt-mapper-lifelong-mapping'].forEach(id=>{
    const p=nodes.find(n=>n.id===id);if(!p)return;
    const anchor=id==='scan-context'?'end':id==='one-day-learning-one-year-localization'?'start':'middle';
    const dx=anchor==='end'?12:anchor==='start'?-12:0;
    txt(p.short,{x:p.x+dx,y:p.y+p.r+10,'text-anchor':anchor,class:'milestone-label','data-label':id},dots);
  });
  const years=[...new Set(data.awards.map(a=>Number(a.date.slice(0,4))))].sort();
  years.forEach(year=>{
    const awards=data.awards.filter(a=>Number(a.date.slice(0,4))===year),x=yearX(year+.5),y=24;
    const group=svgEl('g',{class:'award-node',tabindex:0,role:'button','aria-label':`${year}: ${awards.length} award${awards.length>1?'s':''}. Open details`});
    svgEl('circle',{cx:x,cy:y,r:17,fill:'transparent'},group);svgEl('circle',{cx:x,cy:y,r:12,class:'award-bg'},group);svgEl('polygon',{points:starPoints(x,y,6.5),class:'award-star'},group);
    if(awards.length>1)txt('×'+awards.length,{x:x+17,y:y+3,'font-size':9,fill:'#0077ff'},group);
    const show=()=>{tooltip.innerHTML=`<div class="tip-meta">${year} · Recognition</div>${awards.map(a=>`<strong>★ ${esc(a.title)}</strong><div class="tip-meta">${esc(a.event)}</div>`).join('')}`;tooltip.hidden=false;positionTooltip(group);};
    const open=()=>openDialog(`<p class="detail-kicker">RECOGNITION · ${year}</p><h2 class="detail-title" id="detail-title">Milestones & awards</h2><ul class="award-list">${awards.map(a=>`<li><a href="${esc(a.url)}" target="_blank" rel="noopener">${esc(a.title)} ↗</a><small>${esc(a.event)} · ${esc(a.date)}</small>${a.note?`<small>${esc(a.note)}</small>`:''}</li>`).join('')}</ul>`,group);
    group.addEventListener('mouseenter',show);group.addEventListener('mouseleave',hideTooltip);group.addEventListener('focus',show);group.addEventListener('blur',hideTooltip);group.addEventListener('click',open);group.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
  });
}

function renderMilestones(){
  const selected=[
    {id:'scan-context',tag:'PLACE RECOGNITION',description:'A compact spatial signature for recognizing places in a 3D world.'},
    {id:'lt-mapper-lifelong-mapping',tag:'LIFELONG MAPPING',description:'Keeping maps useful as the world around a robot changes.'},
    {id:'lt-mem',tag:'SPATIO-TEMPORAL MEMORY',description:'Remembering a changing world through volatility-aware scene memory.'}
  ];
  $('#milestones').innerHTML=selected.map(s=>{
    const p=data.papers.find(p=>p.id===s.id);
    return `<button class="milestone-card" data-open="${esc(p.id)}" aria-label="Read about ${esc(p.short)}"><span class="milestone-visual"><img src="${esc(p.image)}" alt="${esc(p.short)} research overview" loading="lazy"><span class="milestone-year">${p.year} · ${esc(p.venue)}</span></span><span class="milestone-body"><span class="milestone-meta"><span>${s.tag}</span>${p.award?'<span class="milestone-award">★ BEST PAPER</span>':''}</span><span class="milestone-title" role="heading" aria-level="3">${esc(p.short)}<span class="milestone-arrow" aria-hidden="true">↗</span></span><span class="milestone-description">${s.description}</span></span></button>`;
  }).join('');
  $('#milestones').querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>openPaper(data.papers.find(p=>p.id===b.dataset.open),b)));
}
function renderList(filtered){
  const years=[...new Set(filtered.map(p=>p.year))].sort((a,b)=>b-a);
  $('#paper-list').innerHTML=years.map(year=>{const papers=filtered.filter(p=>p.year===year).sort((a,b)=>(b.month||0)-(a.month||0)||a.sourceIndex-b.sourceIndex);return `<section class="year-group" aria-label="${year} research works"><h3 class="year-heading">${year}<small>${papers.length} work${papers.length>1?'s':''}</small></h3><div>${papers.map(p=>`<button class="paper-row" data-open="${esc(p.id)}"><span class="venue-chip">${esc(p.venue)}</span><span><h3>${esc(p.title)}${p.award?'<span class="row-award">★</span>':''}</h3><p>${esc(typeLabel(p))} · ${esc(role(p))} · ${esc(LANES.find(l=>l.id===p.lane).label)}</p></span><span class="paper-row-arrow">↗</span></button>`).join('')}</div></section>`;}).join('');
  $('#paper-list').querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>openPaper(data.papers.find(p=>p.id===b.dataset.open),b)));
  $('#empty-state').hidden=filtered.length>0;
}
function applyFilters(){
  hideTooltip();const scoped=data.papers.filter(inScope),filtered=scoped.filter(matches);
  for(const p of nodes){const on=matches(p),el=svgNodes.get(p.id);el.classList.toggle('dimmed',!on);el.setAttribute('tabindex',on?'0':'-1');el.setAttribute('aria-hidden',String(!on));}
  document.querySelectorAll('[data-label]').forEach(el=>{el.style.opacity=matches(data.papers.find(p=>p.id===el.dataset.label))?'1':'.1';});
  const active=state.topic!=='all'||state.lead||state.type!=='all'||state.search||state.thread;
  $('#research-trail').style.opacity=active?'.17':'1';
  $('#work-count').textContent=filtered.length;$('#work-label').textContent=active?`of ${scoped.length} works`:'research works';$('#index-count').textContent=filtered.length;
  const available=scoped.filter(matchesOtherFilters);
  LANES.forEach(l=>{$('#count-'+l.id).textContent=available.filter(p=>p.lane===l.id).length;});
  document.querySelectorAll('[data-thread]').forEach(el=>{const on=el.dataset.thread===state.thread;el.classList.toggle('active',on);el.setAttribute('aria-pressed',String(on));});
  document.querySelectorAll('[data-thread-row]').forEach(el=>el.classList.toggle('active',el.dataset.threadRow===state.thread));
  document.querySelectorAll('[data-thread-count]').forEach(el=>{el.textContent=available.filter(p=>topicFor(p).id===el.dataset.threadCount).length;});
  const thread=RESEARCH_TOPICS.find(t=>t.id===state.thread),years=filtered.map(p=>p.year);
  $('#focus-title').textContent=thread?thread.label:'Follow a research question';
  $('#focus-description').textContent=thread?thread.question:'Select a topic label on the left to follow related work across years and filter the publication list.';
  $('#focus-count').textContent=thread?`${filtered.length} works${years.length?' · '+Math.min(...years)+(Math.min(...years)!==Math.max(...years)?'–'+Math.max(...years):''):''}`:'';
  $('#clear-thread').hidden=!thread;$('#thread-focus').classList.toggle('active',Boolean(thread));
  document.querySelectorAll('[data-topic]').forEach(b=>{const on=b.dataset.topic===state.topic;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
  $('#lead-filter').classList.toggle('active',state.lead);$('#lead-filter').setAttribute('aria-pressed',String(state.lead));
  $('#domestic-toggle').classList.toggle('active',state.domestic);$('#domestic-toggle').setAttribute('aria-pressed',String(state.domestic));
  $('#domestic-count').textContent=data.papers.filter(isDomesticConference).length;
  const filters=[thread?.label,state.topic!=='all'?LABELS[state.topic]:null,state.lead?'1st / corresponding author':null,state.type!=='all'?TYPES[state.type]:null,state.search?'“'+state.search+'”':null].filter(Boolean);
  $('#active-summary').textContent=filters.length?`${filtered.length} works · ${filters.join(' · ')}`:`${scoped.length} research works · ${scoped.filter(p=>p.lead).length} as first / corresponding author · Select a work for details`;
  renderList(filtered);
}
function reset(){Object.assign(state,{topic:'all',lead:false,type:'all',search:'',domestic:false,thread:null});$('#search').value='';$('#index-search').value='';$('#type-filter').value='all';renderChart();applyFilters();}
$('#topic-filters').addEventListener('click',e=>{const b=e.target.closest('[data-topic]');if(b){state.topic=b.dataset.topic;applyFilters();}});
$('#lead-filter').addEventListener('click',()=>{state.lead=!state.lead;applyFilters();});
$('#domestic-toggle').addEventListener('click',()=>{state.domestic=!state.domestic;renderChart();applyFilters();});
$('#clear-thread').addEventListener('click',()=>{state.thread=null;applyFilters();});
$('#type-filter').addEventListener('change',e=>{state.type=e.target.value;applyFilters();});
['#search','#index-search'].forEach(selector=>{
  $(selector).addEventListener('input',e=>{
    state.search=e.target.value.trim().toLowerCase();
    $(selector==='#search'?'#index-search':'#search').value=e.target.value;
    applyFilters();
  });
});
$('#search').addEventListener('keydown',e=>{if(e.key==='Enter')$('#publications').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
$('#reset-filters').addEventListener('click',reset);$('#empty-reset').addEventListener('click',reset);
fetch('./data.json').then(r=>{if(!r.ok)throw new Error('Could not fetch research data');return r.json();}).then(d=>{data=d;renderChart();renderMilestones();applyFilters();$('#domestic-toggle').disabled=false;}).catch(err=>{$('#chart-error').hidden=false;console.error(err);});
