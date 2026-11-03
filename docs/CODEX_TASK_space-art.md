# Codex 任務：太空保衛戰 向量角色素材 40 件

版本 v1.1 · 2026-11-03　｜　委託人：Cona 老師（大橋國小 資訊課，四年級 Scratch）
先讀：`AGENTS.md`、`docs/SPRITE_SPEC.md`（角色規格）。

## 1. 要做什麼

替「太空保衛戰」系列畫一套**原創**的 Scratch 向量造型，**只用在第 5 節「改外型」**（第 1～4 節維持 Scratch 內建圖），讓學生挑選、再用 Scratch 向量模式修改：

| 類別 | 數量 | 資料夾 | 對應角色（SPRITE_SPEC） |
|---|---|---|---|
| 戰機 | 10（A 組 5＋B 組 5） | `art/space/fighters/` | 戰鬥機 |
| 飛彈 | 10 | `art/space/missiles/` | 子彈、超級子彈 |
| 小兵 | 10 | `art/space/minions/` | 外星人、快外星人 |
| BOSS | 5 | `art/space/bosses/` | BOSS |

**戰機分兩組風格**（老師的說法是「5 種男生取向、5 種女生取向」；教材上不寫男女，兩組學生都能自由挑）：
- **A 組・酷炫機甲**：鋒利線條、深色系（深藍、黑灰、紅、橘、螢光綠）、尖翼、雙引擎、鯊魚嘴、閃電、龍角等元素。
- **B 組・夢幻可愛**：圓弧外型、粉彩系（粉紅、薰衣草紫、薄荷綠、天空藍、奶油黃）、愛心、星星、花朵、蝴蝶翅膀、貓耳、彩虹尾焰等元素。

每件都要有明確主題，彼此看得出不一樣。檔名、主題範例（可以改，但要 10 種不同）：

| 檔名 | 主題 |
|---|---|
| `fighter_A1_雷霆鯊.svg` … `fighter_A5_….svg` | 鯊魚、閃電、黑龍、火焰鳳凰（紅橘）、隱形匿蹤 |
| `fighter_B1_愛心號.svg` … `fighter_B5_….svg` | 愛心、星星魔法、花朵、蝴蝶、貓咪 |
| `missile_01_紅白導彈.svg` … `missile_10_….svg` | 普通導彈、三連發、雷射光束、火球、冰晶、星星彈、愛心彈、閃電彈、螺旋鑽頭、能量球 |
| `minion_01_….svg` … `minion_10_….svg` | 小飛碟、觸手怪、獨眼怪、蜘蛛機器、水母、蝙蝠翼、甲蟲、方塊機器人、史萊姆、噴射小魔 |
| `boss_1_….svg` … `boss_5_….svg` | 巨型母艦、外星章魚王、機械龍、水晶魔像、黑洞之眼 |

## 2. 尺寸與方向（讓換造型後遊戲還能直接玩）

| 類別 | viewBox（寬×高） | 舞台實際大小目標 | 方向 |
|---|---|---|---|
| 戰機 | `0 0 120 100` 左右 | 約 60×50 px（Scratch 尺寸 50%） | **機頭朝上** |
| 飛彈 | `0 0 40 90` 左右 | 約 20×45 px（50%） | **彈頭朝上** |
| 小兵 | `0 0 100 90` 左右 | 約 50×45 px（50%） | 正面，朝下看玩家 |
| BOSS | `0 0 300 260` 左右 | 約 150×130 px（50%） | 正面，左右對稱 |

- 圖形置中，**圖的中心＝viewBox 中心**（Scratch 會把旋轉中心放在 viewBox 中心）。
- 四周留 2～4 單位空白，不要貼邊。

## 3. 「匯入 Scratch 後還能編輯」的硬性規定

一定要過 `python3 -I tools/check_svg.py art/space/**/*.svg`（全部 ✓ 才算完成）：

1. 純 SVG 1.1，`<svg>` 要有 `width`、`height`、`viewBox`。
2. **只能用** `path`、`rect`、`circle`、`ellipse`、`polygon`、`polyline`、`line`、`g`，可以用 `linearGradient`／`radialGradient`。
3. **不能有**：`<image>`（含 base64 點陣圖）、`<text>`（字要轉成 path）、`<filter>`（陰影、模糊）、`<mask>`、`<clipPath>`、`<pattern>`、`<use>`／`<symbol>`、`<style>`／CSS `class`、`<script>`、外部連結。
4. 顏色直接寫在屬性：`fill="#FF6FA8" stroke="#3B2A4D" stroke-width="2"`。
5. **每一塊顏色是一個獨立、封閉的形狀**（學生用「填滿」工具點一下就能換色；用「選取」工具能單獨拖動機翼、砲管）。不要把整台戰機畫成一條 path。
6. 圖形數量 20～150 個，檔案 ≤ 120 KB。
7. 線條粗一點（`stroke-width` 2～4），縮小到 50% 還看得清楚。
8. 原創設計，不能仿現有遊戲、卡通角色或品牌。

> 注意：目前老師素材裡 `外星人.svg`、`導彈.svg`、`超級導彈.svg` 其實是包了點陣圖的 SVG（check_svg.py 會報錯），**學生在向量模式改不了**。這次新做的 40 件要取代它們。

## 4. 交付物

1. 40 個 SVG（第 1 節的資料夾與檔名）。
2. 打包成 5 個角色檔，放 `files/space-art/`，檔名帶版本日期：
   ```bash
   python3 -I tools/make_sprite3.py 戰鬥機 files/space-art/戰機10款_v1.0_YYYYMMDD.sprite3 art/space/fighters/*.svg --size 50 --rot left-right
   python3 -I tools/make_sprite3.py 子彈   files/space-art/飛彈10款_v1.0_YYYYMMDD.sprite3 art/space/missiles/*.svg --size 50 --dir 0 --rot "don't rotate"
   python3 -I tools/make_sprite3.py 外星人 files/space-art/小兵10款_v1.0_YYYYMMDD.sprite3 art/space/minions/*.svg --size 50 --dir 180 --rot "don't rotate"
   python3 -I tools/make_sprite3.py BOSS   files/space-art/BOSS5款_v1.0_YYYYMMDD.sprite3 art/space/bosses/*.svg --size 50 --rot left-right
   ```
   （戰機另外各包一次 A 組、B 組也可以。）
3. 一張總覽頁 `art/space/index.html`：40 件縮圖＋檔名＋主題，深色背景，可以列印。
4. 更新 `docs/SPRITE_SPEC.md` 加一節「第 5 節可選造型」，列出 40 件；更新 `docs/HANDOFF.md` 改版紀錄。
5. commit 訊息用繁中，例：「新增太空保衛戰向量造型 40 件（戰機10、飛彈10、小兵10、BOSS5）」。

## 5. 自我檢查

- [ ] `tools/check_svg.py` 全部 ✓
- [ ] 每個 sprite3 用 scratch-vm 載得進去（可參考 `tools/sb3_run.js` 的寫法，或實際拖進 scratch.mit.edu「上傳角色」）
- [ ] 縮成 50% 時看得出是什麼、方向正確（機頭、彈頭朝上）
- [ ] A 組、B 組風格明顯不同；10 款小兵、5 個 BOSS 都不一樣
- [ ] 在 Scratch 向量模式：選取工具能單獨點到機翼／砲管，填滿工具點一下能換色

## 6. 交回後的整合（Claude／老師）
- 素材 commit 到 `art/space/`、`files/space-art/` 後，產生腳本 make_series.py 的第 5 節學生檔要把 40 件加進對應角色的造型（目前第 5 節只放老師 2025 素材）。
