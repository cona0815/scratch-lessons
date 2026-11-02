# make_sprite3.py v1.0 · 2026-11-03
# 把一個資料夾的 SVG 打包成 Scratch 角色檔（.sprite3），每個 SVG 一個造型，旋轉中心＝viewBox 中心。
# 用法：python3 -I tools/make_sprite3.py 角色名 輸出.sprite3 圖檔1.svg 圖檔2.svg ...  [--size 50] [--dir 90] [--rot left-right|don't rotate|all around]
import sys, json, hashlib, zipfile, re, os
args=sys.argv[1:]; opt={'--size':'100','--dir':'90','--rot':'all around'}
for k in list(opt):
    if k in args: i=args.index(k); opt[k]=args[i+1]; del args[i:i+2]
name,out,svgs=args[0],args[1],args[2:]
cos=[]; data={}
for f in svgs:
    b=open(f,'rb').read(); md5=hashlib.md5(b).hexdigest()
    vb=re.search(rb'viewBox="([^"]+)"',b); x,y,w,h=[float(v) for v in re.split(r'[ ,]+',vb.group(1).decode().strip())]
    cos.append({'assetId':md5,'name':os.path.splitext(os.path.basename(f))[0],'bitmapResolution':1,'md5ext':md5+'.svg','dataFormat':'svg','rotationCenterX':w/2,'rotationCenterY':h/2})
    data[md5+'.svg']=b
sp={'isStage':False,'name':name,'variables':{},'lists':{},'broadcasts':{},'blocks':{},'comments':{},'currentCostume':0,'costumes':cos,'sounds':[],
    'volume':100,'visible':True,'x':0,'y':0,'size':float(opt['--size']),'direction':float(opt['--dir']),'draggable':False,'rotationStyle':opt['--rot']}
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
    z.writestr('sprite.json',json.dumps(sp,ensure_ascii=False))
    for k,v in data.items(): z.writestr(k,v)
print(out,len(cos),'造型')
