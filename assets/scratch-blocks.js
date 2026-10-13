/* scratch-blocks.js v1.0 · 2026-10-13
 * 繁中 Scratch 3 積木 SVG 產生器（大橋國小 Scratch 教學網共用）
 * 用法：renderScript([積木, 積木, ...]) 回傳 <svg> 字串
 * 積木格式：{t:'hat'|'s'|'c', c:'event'|'motion'|'looks'|'sound'|'control'|'sensing'|'operators'|'data',
 *            p:[文字 或 參數...], in:[C 型積木嘴巴裡的積木], cap:1(沒有下方凸點，如重複無限次、停止全部), hl:1(新積木：黃框＋「新」)}
 * 參數：{n:'10'} 白色數字框｜{dd:'鼠標'} 下拉｜{flag:1} 綠旗｜{color:'#f80000'} 色塊
 *       {bool:{c:'sensing',p:[...],nw:1}} 六角形條件（nw:1 = 新積木記號）｜{rep:{c:'data',p:['時間']}} 圓角報告積木
 */
/* ---------- Scratch 積木 SVG 產生器 ---------- */
const COL={motion:['#4C97FF','#3373CC'],looks:['#9966FF','#774DCB'],sound:['#CF63CF','#BD42BD'],event:['#FFBF00','#CC9900'],control:['#FFAB19','#CF8B17'],sensing:['#5CB1D6','#2E8EB8'],operators:['#59C059','#389438'],data:['#FF8C1A','#DB6E00']};
const FONT='font-family="Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif" font-size="14"';
function tw(s){let w=0;for(const ch of s){const c=ch.codePointAt(0);w+= c>0x2E80?14.5: /[A-Z0-9]/.test(ch)?8.6:/[-.: ]/.test(ch)?5:8.3;}return w;}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')}
const GAP=6;
function pw(p){
  if(typeof p==='string') return tw(p);
  if(p.flag) return 22;
  if(p.color) return 30;
  if(p.n!==undefined) return Math.max(30,tw(p.n)+20);
  if(p.dd!==undefined) return tw(p.dd)+34;
  if(p.bool) return partsW(p.bool.p)+28;
  if(p.rep) return partsW(p.rep.p)+24;
  return 0;
}
function partsW(ps){return ps.reduce((a,p)=>a+pw(p),0)+GAP*(ps.length-1)}
function drawParts(ps,x,cy,cat){
  let s='';
  for(const p of ps){
    const w=pw(p);
    if(typeof p==='string') s+=`<text x="${x}" y="${cy+5}" fill="#fff" ${FONT} font-weight="500">${esc(p)}</text>`;
    else if(p.flag) s+=`<path d="M${x+4} ${cy+10}V${cy-9}" stroke="#45993D" stroke-width="2.2" stroke-linecap="round"/><path d="M${x+5} ${cy-9}c4-3 7 2 12 0v10c-5 2-8-3-12 0z" fill="#4CBF56" stroke="#45993D" stroke-width="1.2" stroke-linejoin="round"/>`;
    else if(p.color) s+=`<rect x="${x}" y="${cy-11}" width="${w}" height="22" rx="11" fill="${p.color}" stroke="#fff" stroke-width="2"/>`;
    else if(p.n!==undefined) s+=`<rect x="${x}" y="${cy-13}" width="${w}" height="26" rx="13" fill="#fff" stroke="${COL[cat][1]}" stroke-opacity=".35"/><text x="${x+w/2}" y="${cy+5}" text-anchor="middle" fill="#575E75" ${FONT}>${esc(p.n)}</text>`;
    else if(p.dd!==undefined) s+=`<rect x="${x}" y="${cy-13}" width="${w}" height="26" rx="13" fill="${COL[cat][1]}" stroke="${COL[cat][1]}"/><text x="${x+11}" y="${cy+5}" fill="#fff" ${FONT}>${esc(p.dd)}</text><path d="M${x+w-19} ${cy-2}l4 4 4-4" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if(p.bool){const c=p.bool.c,hh=p.bool.p.some(q=>q&&q.bool)?21:16;s+=`<path d="M${x} ${cy}L${x+14} ${cy-hh}H${x+w-14}L${x+w} ${cy}L${x+w-14} ${cy+hh}H${x+14}Z" fill="${COL[c][0]}" stroke="${COL[c][1]}"/>`+drawParts(p.bool.p,x+14,cy,c)+(p.bool.nw?`<circle cx="${x+w-8}" cy="${cy-hh-2}" r="10" fill="#E5323E" stroke="#fff" stroke-width="1.5"/><text x="${x+w-8}" y="${cy-hh+2.5}" text-anchor="middle" font-size="11" font-weight="700" fill="#fff" font-family="Noto Sans TC, sans-serif">新</text>`:'');}
    else if(p.rep){const c=p.rep.c;s+=`<rect x="${x}" y="${cy-15}" width="${w}" height="30" rx="15" fill="${COL[c][0]}" stroke="${COL[c][1]}"/>`+drawParts(p.rep.p,x+12,cy,c);}
    x+=w+GAP;
  }
  return s;
}
function topEdge(x,y,W){return `M${x} ${y+4}q0-4 4-4H${x+12}l4 4h8l4-4H${x+W-4}q4 0 4 4`}
function botEdge(x,yb,tab){return `V${yb-4}q0 4-4 4`+(tab?`H${x+28}l-4 4h-8l-4-4`:'')+`H${x+4}q-4 0-4-4Z`}
function layout(blocks,x,y){
  let svg='',h=0,w=0;
  for(const b of blocks){
    const [f,st]=COL[b.c]; const tW=partsW(b.p)+24;
    let bh,path,W,inner='';
    const row=b.p.some(p=>p&&p.bool&&p.bool.p.some(q=>q&&q.bool))?58:b.p.some(p=>p&&p.bool)?48:40;
    if(b.t==='hat'){W=Math.max(tW,110);bh=56;
      path=`M${x} ${y+16}c25-22 71-22 96 0H${x+W-4}q4 0 4 4V${y+bh-4}q0 4-4 4H${x+28}l-4 4h-8l-4-4H${x+4}q-4 0-4-4Z`;
      inner=drawParts(b.p,x+12,y+36,b.c);
    }else if(b.t==='c'){
      const sub=layout(b.in,x+16,y+row);const ih=Math.max(sub.h,24);
      W=Math.max(tW,160,sub.w+32);const yi=y+row+ih,yb=yi+24;bh=row+ih+24;
      path=topEdge(x,y,W)+`V${y+row-4}q0 4-4 4H${x+44}l-4 4h-8l-4-4H${x+20}q-4 0-4 4V${yi-4}q0 4 4 4H${x+28}l4 4h8l4-4H${x+W-4}q4 0 4 4`+botEdge(x,yb,!b.cap);
      inner=drawParts(b.p,x+12,y+row/2,b.c)+sub.svg;
    }else{W=Math.max(tW,60);bh=row;
      path=topEdge(x,y,W)+botEdge(x,y+bh,!b.cap);
      inner=drawParts(b.p,x+12,y+row/2,b.c);
    }
    const glow=b.hl?`<path d="${path}" fill="none" stroke="#FFD43B" stroke-width="9" stroke-linejoin="round"/>`:'';
    svg+=glow+`<path d="${path}" fill="${f}" stroke="${st}" stroke-width="1"/>`+inner;
    if(b.hl){const by=(b.t==='hat'?y+36:y+row/2);svg+=`<circle cx="${x+W+16}" cy="${by}" r="11" fill="#E5323E"/><text x="${x+W+16}" y="${by+4.5}" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" font-family="Noto Sans TC, sans-serif">新</text>`;}
    y+=bh;h+=bh;w=Math.max(w,W+(b.hl?32:0));
  }
  return {svg,h,w};
}
function renderScript(blocks){
  const L=layout(blocks,8,12);
  const W=L.w+20,H=L.h+22;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="積木程式">${L.svg}</svg>`;
}
