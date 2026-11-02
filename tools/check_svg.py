# check_svg.py v1.0 · 2026-11-03
# 檢查 SVG 是否「匯入 Scratch 3 之後還能在向量模式編輯」。用法：python3 -I tools/check_svg.py art/space/**/*.svg
# 規則對應 docs/CODEX_TASK_space-art.md 第 3 節。全部通過才 exit 0。
import sys, re, os, glob, xml.etree.ElementTree as ET
BAN = {'image':'不能嵌入點陣圖','text':'文字要轉成 path','filter':'Scratch 不支援濾鏡','mask':'不支援遮罩','pattern':'不支援圖樣填色',
       'style':'不要用 <style>／CSS class，顏色寫在 fill/stroke 屬性','script':'不能有程式','foreignObject':'不支援','clipPath':'不支援剪裁','use':'不要用 <use>，請展開成實際圖形','symbol':'不要用 symbol','marker':'不支援 marker'}
def strip(t): return t.split('}')[-1]
def check(f):
    err=[]; warn=[]
    raw=open(f,'rb').read()
    if len(raw)>120_000: err.append(f'檔案 {len(raw)//1024} KB，太大（上限 120 KB）')
    try: root=ET.fromstring(raw)
    except Exception as e: return [f'XML 解析失敗：{e}'],[]
    if strip(root.tag)!='svg': err.append('根元素不是 <svg>')
    for a in ('width','height','viewBox'):
        if a not in root.attrib: err.append(f'<svg> 缺少 {a}')
    if 'viewBox' in root.attrib:
        vb=[float(x) for x in re.split(r'[ ,]+',root.attrib['viewBox'].strip())]
        if vb[0]!=0 or vb[1]!=0: warn.append('viewBox 建議從 0 0 開始')
    shapes=0
    for el in root.iter():
        t=strip(el.tag)
        if t in BAN: err.append(f'<{t}>：{BAN[t]}')
        if 'class' in el.attrib: err.append(f'<{t} class=…>：不要用 class')
        for k,v in el.attrib.items():
            if 'href' in k and not v.startswith('#'): err.append(f'<{t}> 有外部連結 {v[:40]}')
            if k=='style': warn.append(f'<{t} style=…>：建議改成 fill/stroke 屬性')
        if t in ('path','rect','circle','ellipse','polygon','polyline','line'): shapes+=1
    if shapes==0: err.append('沒有任何圖形')
    if shapes>400: warn.append(f'圖形 {shapes} 個太多，學生不好改（建議 ≤ 200）')
    return err,warn
files=[f for a in sys.argv[1:] for f in (glob.glob(a,recursive=True) or [a])]
bad=0
for f in files:
    e,w=check(f)
    print(('✗ ' if e else '✓ ')+f+''.join('\n    錯誤：'+x for x in e)+''.join('\n    提醒：'+x for x in w))
    bad+=bool(e)
print(f'\n共 {len(files)} 個檔，{bad} 個不合格'); sys.exit(1 if bad else 0)
