/* index-cards.js v1.0 · 2026-10-13：首頁課程卡片右側列出「這單元的新積木」，依卡片的 data-ls 對應 skills.js 的課次代號 */
(function(){const A=window.SKILL_ALL,one=window.SKILL_ONE;const NM={l1:'',l2:'貓抓老鼠',l3:'計時',lc:'挑戰',l5:'',l6:''};
document.querySelectorAll('.card[data-ls]').forEach(c=>{const ls=c.dataset.ls.split(' ');let n=0,h='';
ls.forEach(l=>{const bs=A.flatMap(([cat,col,items])=>items.filter(it=>it[2]===l).map(it=>it[0]));n+=bs.length;if(!bs.length)return;
if(ls.length>1)h+=`<div class="tag">${NM[l]}</div>`;h+=`<div class="mm">${bs.map(b=>one(b)).join('')}</div>`;});
c.querySelector('.cnew').innerHTML=`<div class="ct">這單元的新積木 <b>${n}</b> 個</div>`+h;});})();
