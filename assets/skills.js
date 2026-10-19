/* skills.js v1.2 · 2026-10-19（新增第 5 課 北極接水晶 l6）
 * 技能統整（累計）的「唯一資料來源」＋ 首頁渲染邏輯
 * 新增一課時：改 LS（課次）、ALL（積木，新積木的課次填新代號）、OPS、IDEAS，並把上一課的 'l5' 改成正式代號（見 docs/HANDOFF.md）
 * 需要先載入 assets/scratch-blocks.js
 */
/* ---------- 技能統整分頁（累計所有課程） ---------- */
(function(){
  function one(b){
    if(b.bool||b.rep){const w=pw(b)+(b.bool&&b.bool.nw?10:0);const h=b.bool?44:36;return `<svg viewBox="0 0 ${w+8} ${h}" width="${w+8}" height="${h}" role="img" aria-label="積木">${drawParts([b],4,h/2+2,'motion')}</svg>`;}
    return renderScript([b]);
  }
  // ===== 課次（依時間順序；最後一筆 = 最新一課） =====
  // [代號, 課名, 日期或說明, 課程來源]
  const LS=[
    ['l1','小狗追球','9/29','Scratch STEAM 教學'],
    ['l2','貓抓老鼠','','Scratch STEAM 教學'],
    ['l3','計時＋停止全部','10/06','Scratch STEAM 教學'],
    ['lc','10/06 挑戰','','Scratch STEAM 教學'],
    ['l5','森林打蝙蝠','四年級','阿玉的 Scratch 教學網（月球打老鼠改版）'],
    ['l6','北極接水晶','四年級','老師提供的「接水晶」範例']
  ];
  const NEWEST=LS[LS.length-1][0];
  const PAL=[['#E1EEF9','#20507D'],['#F3E8D6','#7A4E12'],['#E0EFE5','#2C6B45'],['#ECE6F7','#56398F'],['#E6F2F2','#1F6363'],['#F7E6EF','#8A2A5C'],['#EEF0D9','#5A5F1A']];
  const pill=l=>{if(l===NEWEST)return 'background:#FDE2E0;color:#B3261E';const i=LS.findIndex(x=>x[0]===l);const c=PAL[i%PAL.length];return `background:${c[0]};color:${c[1]}`;};
  const LN=Object.fromEntries(LS.map(([k,n,d])=>[k,n+(d?' '+d:'')+(k===NEWEST?'（最新）':'')]));
  const H={t:'hat',c:'event',p:['當',{flag:1},'被點擊']};
  const T=v=>({rep:{c:'data',p:[v]}});
  // [分類, 顏色, [積木, 用途, 課次, 這次用在哪]]
  const ALL=[
   ['事件','#FFBF00',[[H,'按下綠旗時開始執行','l1'],[{t:'hat',c:'event',p:['當角色被點擊']},'點到這個角色時開始執行','l5','步驟 4 準心開槍']]],
   ['動作','#4C97FF',[[{t:'s',c:'motion',p:['移動',{n:'10'},'點']},'往面朝的方向走','l1'],
     [{t:'s',c:'motion',p:['面朝',{dd:'鼠標'},'向']},'轉向滑鼠或某個角色','l1'],
     [{t:'s',c:'motion',p:['定位到',{dd:'鼠標'},'位置']},'跳到滑鼠的位置','l1'],
     [{t:'s',c:'motion',p:['迴轉方式設為',{dd:'左-右'}]},'只左右翻面，不會倒立','l1'],
     [{t:'s',c:'motion',p:['定位到 x:',{n:'0'},'y:',{n:'0'}]},'回到指定位置','l2'],
     [{t:'s',c:'motion',p:['碰到邊緣就反彈']},'撞到舞台邊邊就彈回來','l5','步驟 5 蝙蝠亂飛'],
     [{t:'s',c:'motion',p:['面朝',{n:'90'},'度']},'轉到指定方向：90 右、-90 左、180 下','l6','步驟 2 碗左右走']]],
   ['外觀','#9966FF',[[{t:'s',c:'looks',p:['造型換成下一個']},'換下一個造型，做動畫','l1'],
     [{t:'s',c:'looks',p:['隱藏']},'讓角色看不見，程式照樣跑','l3'],
     [{t:'s',c:'looks',p:['造型換成',{dd:'造型2'}]},'換成指定的造型','l5','步驟 4 準心變紅'],
     [{t:'s',c:'looks',p:['圖層移到',{dd:'最上'},'層']},'放到最上面，不被別的角色蓋住','l5','步驟 3 準心'],
     [{t:'s',c:'looks',p:['顯示']},'讓角色出現','l5','步驟 7 蝙蝠躲完再出來'],
     [{t:'s',c:'looks',p:['說出',{n:'Hello!'},'持續',{n:'2'},'秒']},'角色說話，幾秒後收起來','l6','步驟 5 時間到']]],
   ['音效','#CF63CF',[[{t:'s',c:'sound',p:['播放音效',{dd:'collect'}]},'發出聲音，程式不用等它播完','l6','步驟 4 接到水晶']]],
   ['控制','#FFAB19',[[{t:'c',c:'control',cap:1,p:['重複無限次'],in:[]},'嘴巴裡的積木一直做','l1'],
     [{t:'s',c:'control',p:['等待',{n:'1'},'秒']},'停一下再做下一個','l1'],
     [{t:'c',c:'control',p:['如果',{bool:{c:'sensing',p:['']}},'那麼'],in:[]},'條件成立才做','l3'],
     [{t:'s',c:'control',cap:1,p:['停止',{dd:'全部'}]},'全部程式停下來','l3']]],
   ['偵測','#5CB1D6',[[{bool:{c:'sensing',p:['碰到',{dd:'Cat'},'？']}},'有沒有碰到某個角色','l3'],
     [{rep:{c:'sensing',p:['計時器']}},'內建時鐘，停止全部後還會跑','lc'],
     [{t:'s',c:'sensing',p:['計時器重置']},'把內建計時器歸零','lc'],
     [{bool:{c:'sensing',p:['碰到顏色',{color:'#f80000'},'？']}},'有沒有碰到某個顏色','l5','步驟 7 被紅色準心打中'],
     [{bool:{c:'sensing',p:[{dd:'向右'},'鍵被按下？']}},'有沒有按著某個鍵','l6','步驟 2 方向鍵']]],
   ['運算','#59C059',[[{bool:{c:'operators',p:[{bool:{c:'sensing',p:['']}},'或',{bool:{c:'sensing',p:['']}}]}},'兩個條件有一個成立','lc'],
     [{rep:{c:'operators',p:[{n:''},'+',{n:''}]}},'加法（還有 −、×、/）','lc'],
     [{bool:{c:'operators',p:[{n:''},'=',{n:''}]}},'兩邊一樣就成立','l5','步驟 6 時間 = 0']]],
   ['變數','#FF8C1A',[[{t:'s',c:'data',p:['變數',{dd:'時間'},'設為',{n:'0'}]},'把數字直接換掉','l3'],
     [{t:'s',c:'data',p:['變數',{dd:'時間'},'改變',{n:'1'}]},'加上一個數（負數就是減）','l3'],
     [T('時間'),'變數本身，可以放進別的積木','l3']]]
  ];
  const OPS=[['l1','從角色庫新增角色、刪除角色'],['l1','把積木拖進程式區、接起來、放進嘴巴'],['l1','檔案 → 下載到你的電腦存檔'],
    ['l3','用「繪畫」新增空白角色、改角色名稱'],['l3','建立變數，勾選後顯示在舞台'],['l3','點一下六角形積木，看 true／false'],
    ['lc','右鍵複製角色（程式一起複製）'],['lc','到「造型」分頁換造型'],
    ['l5','用「選個背景」換背景'],['l5','改角色的「尺寸」'],['l5','用「上傳角色」放進老師給的檔案'],['l5','在造型分頁複製造型'],['l5','用「填滿」工具幫造型上色'],['l5','用「滴管」選舞台上的顏色'],['l5','點「方向」轉轉盤，改角色方向'],
    ['l6','用「檔案 → 從你的電腦挑選」打開老師給的檔案']];
  const IDEAS=[['l1','一個角色可以同時跑好幾段程式'],['l1','換造型＋等待 ＝ 動畫'],['l2','每個角色有自己的程式，先選對角色再寫'],
    ['l3','變數像貼了名字的盒子，裡面放一個數字'],['l3','條件只有 true 和 false'],['l3','停止全部後，變數停住 ＝ 成績'],['l3','隱藏的角色，程式照樣會跑'],
    ['lc','下拉選單選的角色要存在（Cat 2 問題）'],
    ['l5','兩個造型快速切換 ＝ 開槍效果'],['l5','用「碰到顏色」判斷打中'],['l5','打中後隱藏一下，一槍只算一分'],['l5','時間往下數：比固定時間內誰得分多'],
    ['l6','同一個積木換下拉選項，就有不同功能（定位到 鼠標／企鵝）'],['l6','偵測按鍵要放在重複無限次裡，一直檢查'],['l6','碰到之後要馬上離開，不然會一直加分'],['l6','停止全部要放最後，後面的積木不會做']];
  window.SKILL_ALL=ALL;window.SKILL_ONE=one;
  const card=(b,use,l,where)=>{const isNew=l===NEWEST;const bb=Object.assign({},b);if(isNew&&!bb.bool&&!bb.rep)bb.hl=1;if(isNew&&bb.bool)bb.bool=Object.assign({nw:1},bb.bool);
    return `<div class="kc${isNew?' isnew':''}" data-l="${l}"><div class="b">${one(bb)}</div><p>${use}</p>${where?`<span class="where">${where}</span>`:`<span class="lt" style="${pill(l)}">${LN[l]}</span>`}</div>`;};
  const cnt={};let total=0;const newG=[];let all='';
  ALL.forEach(([cat,col,items])=>{
    all+=`<div class="catrow" style="--c:${col}"><h3>${cat}</h3><div class="kgrid">`;
    items.forEach(([b,use,l,where])=>{total++;cnt[l]=(cnt[l]||0)+1;if(l===NEWEST)newG.push(card(b,use,l,where));all+=card(b,use,l,'');});
    all+='</div></div>';
  });
  const nt=document.getElementById('newestTitle');if(nt)nt.textContent=`最新一課（${LS[LS.length-1][1]}）新學的`;
  document.getElementById('newGrid').innerHTML=newG.join('');
  document.getElementById('allCats').innerHTML=all;
  const li=(arr)=>arr.map(([l,t])=>`<li><span class="lt" style="${pill(l)}">${LN[l]}</span><span>${t}</span></li>`).join('');
  document.getElementById('allOps').innerHTML=li(OPS);document.getElementById('allIdeas').innerHTML=li(IDEAS);
  document.getElementById('newOps').innerHTML=OPS.filter(o=>o[0]===NEWEST).map(([l,t])=>`<li><span class="nb">新</span>${t}</li>`).join('');
  // road
  let acc=0;const blocksOf=l=>ALL.flatMap(([c,col,items])=>items.filter(it=>it[2]===l).map(it=>it[0]));
  document.getElementById('road').innerHTML=LS.map(([k,n,d,src],i)=>{const bs=blocksOf(k);acc+=bs.length;const ops=OPS.filter(o=>o[0]===k).length;
    return `<article class="lesson${k===NEWEST?' now':''}"><div class="lh"><span class="lt" style="${pill(k)}">${i+1}</span><div><h3>${n}${d?`<small>${d}</small>`:''}</h3><p class="src">修改自 ${LS[i][3]}</p><p>新積木 <b>${bs.length}</b> 個・操作 <b>${ops}</b> 項　→　累計 <b class="acc">${acc}</b> 個積木</p></div></div><div class="minis">${bs.map(b=>`<span class="mini">${one(b)}</span>`).join('')}</div></article>`;}).join('');
  document.getElementById('sumrow').innerHTML=`<div><b>${total}</b><span>個積木（累計）</span></div><div><b>${OPS.length}</b><span>項操作技能</span></div><div><b>${LS.length}</b><span>堂課</span></div><div class="hot"><b>${cnt[NEWEST]||0}</b><span>個最新一課新學</span></div>`;
  // filters
  const F=document.getElementById('filters');
  [['all','全部']].concat(LS.map(([k])=>[k,LN[k]])).forEach(([k,v],i)=>{const b=document.createElement('button');b.type='button';b.textContent=k==='all'?`全部（${total}）`:`${v}（${cnt[k]||0}）`;b.setAttribute('aria-pressed',i===0?'true':'false');
    b.onclick=()=>{F.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');
      document.querySelectorAll('#allCats .kc').forEach(c=>c.hidden=!(k==='all'||c.dataset.l===k));
      document.querySelectorAll('#allCats .catrow').forEach(r=>r.hidden=![...r.querySelectorAll('.kc')].some(c=>!c.hidden));};F.appendChild(b);});
  // tabs
  const tabs=document.querySelectorAll('.tabbar button'),Lt=document.getElementById('tabLesson'),S=document.getElementById('tabSkills');
  function go(k){const sk=k==='skills';Lt.hidden=sk;S.hidden=!sk;tabs.forEach(t=>t.setAttribute('aria-selected',String(t.dataset.k===k)));window.scrollTo(0,0);}
  tabs.forEach(t=>t.onclick=()=>go(t.dataset.k));
  if(location.hash==='#skills')go('skills');
})();
