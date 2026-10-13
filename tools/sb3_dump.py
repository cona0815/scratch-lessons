# sb3_dump.py v1.0 · 2026-10-13
# 列出 .sb3 每個角色的造型、音效、變數與每段程式（縮排表示嘴巴裡的積木）
# 用法：先 unzip 檔案.sb3 -d 某資料夾，再 python3 -I tools/sb3_dump.py 某資料夾/project.json
import json,sys
d=json.load(open(sys.argv[1]))
def inp(b,blocks,k):
    v=b['inputs'][k]
    x=v[1]
    if isinstance(x,list): return repr(x[1])
    if x is None: return '_'
    sb=blocks[x]
    if sb.get('shadow') and sb['fields']: return '['+str(list(sb['fields'].values())[0][0])+']'
    return '('+fmt(x,blocks)+')'
def fmt(i,blocks):
    b=blocks[i]; s=b['opcode']
    args=[f"{k}={v[0]}" for k,v in b['fields'].items()]
    for k in b['inputs']:
        if k.startswith('SUBSTACK'): continue
        args.append(f"{k}={inp(b,blocks,k)}")
    return s+' '+' '.join(args)
def walk(i,blocks,ind=0):
    while i:
        b=blocks[i]; print('  '*ind+fmt(i,blocks))
        for k in ('SUBSTACK','SUBSTACK2'):
            if k in b['inputs'] and b['inputs'][k][1]:
                if k=='SUBSTACK2': print('  '*ind+'else:')
                walk(b['inputs'][k][1],blocks,ind+1)
        i=b['next']
for t in d['targets']:
    print('=====',t['name'],'stage' if t['isStage'] else '', {k:t.get(k) for k in ('x','y','size','direction','visible','rotationStyle')})
    print(' vars',list(t['variables'].values()),'bcasts',t['broadcasts'])
    print(' costumes',[(c['name'],c['md5ext']) for c in t['costumes']],'cur',t['currentCostume'])
    print(' sounds',[s['name'] for s in t['sounds']])
    bl=t['blocks']
    for k,b in bl.items():
        if isinstance(b,dict) and b.get('topLevel'): print(' --script'); walk(k,bl,1)
print("monitors",[(m["opcode"],m.get("params"),m["visible"]) for m in d.get("monitors",[])])
