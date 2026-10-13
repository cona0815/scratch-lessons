// sb3_run.js v1.0 · 2026-10-13
// 用 scratch-vm 無畫面執行 .sb3 一段時間，每秒印出舞台變數與執行中的程式數，用來確認檔案能載入、計時/停止全部正常。
// 注意：沒有畫面，「碰到」「點擊」「碰到邊緣就反彈」無法測，需老師實際開 Scratch 測。
// 用法：npm i scratch-vm   然後   node tools/sb3_run.js 檔案.sb3 [秒數=10]
const VM=require('scratch-vm');const fs=require('fs');
const file=process.argv[2],secs=+(process.argv[3]||10);
const vm=new VM();
vm.loadProject(fs.readFileSync(file)).then(()=>{
  const st=vm.runtime.getTargetForStage();
  console.log('角色：',vm.runtime.targets.filter(t=>!t.isStage).map(t=>t.sprite.name).join('、'));
  vm.start();vm.greenFlag();let n=0;
  const iv=setInterval(()=>{n++;
    const vars=Object.values(st.variables).map(v=>`${v.name}=${v.value}`).join(' ');
    console.log(`t=${n}s  ${vars}  執行中程式=${vm.runtime.threads.length}`);
    if(n>=secs)process.exit(0);},1000);
}).catch(e=>{console.error('載入失敗',e);process.exit(1);});
