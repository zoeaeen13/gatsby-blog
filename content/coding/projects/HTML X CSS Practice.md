---
title: 'HTML X CSS Practice'
type: coding
log: 'list'
tags: [HTML, CSS]
description: 一些切版及練習視覺化的紀錄
date: '2020-08-29'
---



#### 01. 名片設計

<div class="project-skill-tags">
  <text>HTML</text>
  <text>CSS</text>
</div>

<div class="project_wrap project1">
  <div class="mark">NAMECARD</div>
  <a href="https://www.cakeresume.com/zoeaeen13-frontend" alt="" class="namecard">
    <h2>
      老余
      <span>(Zoe)</span>
    </h2>
    <h5>前端工程師</h5>
    <hr/>
    <p>網頁前端開發者，熱愛動腦的過程，也喜歡動手實作</p>
    <p>在一次旅行後開啟自學程式之路，持續學習、精進技術和邏輯思維<br/>期待有一天結合技術能力創造有價值的產品</p>  
    <div class="circle circle1"></div>
    <div class="circle circle2"></div>
  </a>
</div>

- box-shadow 屬性

用來產生陰影效果，可設置 X 軸偏移量、Y 軸偏移量、模糊效果（邊緣是否清晰）、擴散程度（陰影放大縮放）及顏色，其中 Y 值為正、陰影是往下方移動。
```css
/* offset-x | offset-y | blur-radius | spread-radius | color */
box-shadow: 0px 25px 15px -20px rgba(0, 0, 0, 0.2);
```

半圓形，則使用到「絕對定位」及「overflow」屬性。

在卡片上畫兩個 div，圓角 100% 及設定他們為絕對定位，而父層卡片設置 `position: relative`，因為是要以**卡片**本身來定位，參考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)。

接著調整 top、right、bottom、left（根據卡片本身），因圓形半徑為 75px，一個放在卡片右上角，一個對著卡片底部，超過的部分則用 `overflow: hidden;` 處理。

---

#### 02. 動態天氣盒子
<div class="project-skill-tags">
  <text>HTML</text>
  <text>CSS</text>
  <text>SVG</text>
  <text>ANIMATION</text>
</div>

<div class="project_wrap project2">
  <div class="box">
    <label>
      <input type="checkbox" id="switch_night">
        <div class="top" viewbox="0 0 400 400">
          <svg class="temsvg"><circle cx="0" cy="70" r="3"/><text x="0" y="70">32°C</text><circle cx="70" cy="50" r="3"/><text x="70" y="50">34°C</text><circle cx="140" cy="30" r="3"/><text x="140" y="30">34.5°C</text><circle cx="210" cy="60" r="3"/><text x="210" y="60">33°C</text><circle cx="280" cy="70" r="3"/><text x="280" y="70">32.5°C</text><circle cx="350" cy="60" r="3"/><text x="350" y="60">33°C</text><circle cx="420" cy="50" r="3"/><text x="420" y="50">34°C</text><polyline points="0,70 70,50 140,30 210,60 280,70 350,60 420,50" /></svg>
          <div class="moon"></div>
          <div class="cloud">
            <div class="rain rain1"></div>
            <div class="rain rain2"></div>
            <div class="rain rain3"></div>
          </div>
          <div class="text__area">
            <div class="temporature">32°C</div>
            <div class="info">
              <div class="location">台東縣台東市臺東</div>
              <div class="time">星期五 下午5:00</div>
            </div>
          </div>
        </div>
        <div class="bottom">
        <div class="day__weather">
          <h3>MON</h3>
          <svg viewbox="-50 -50 100 100"><circle class="sun" cx="0" cy="0" r="22" /></svg>
        </div>
          <div class="day__weather">
          <h3>TUE</h3>
          <svg viewbox="-50 -50 100 100"><circle class="sun" cx="0" cy="0" r="22" /></svg>
        </div>
          <div class="day__weather">
          <h3>WED</h3>
          <svg viewbox="-50 -50 100 100"><circle class="sun" cx="0" cy="0" r="22" /><circle class="cloud" cx="0" cy="30" r="20"/><circle class="cloud" cx="-15" cy="30" r="20"/><circle class="cloud" cx="-30" cy="30" r="20"/><circle class="cloud" cx="-25" cy="10" r="15"/><circle class="cloud" cx="-7" cy="15" r="15"/></svg>
        </div>
          <div class="day__weather">
          <h3>THU</h3>
          <svg viewbox="-50 -50 100 100"><circle class="sun" cx="0" cy="0" r="22" /></svg>
        </div>
          <div class="day__weather">
          <h3>FRI</h3>
          <svg viewbox="-50 -50 100 100"><circle class="sun" cx="0" cy="0" r="22" /></svg>
        </div>
          <div class="day__weather">
          <h3>SAT</h3>
          <svg viewbox="-63 -30 100 100"><line class="rain" x1="-25" y1="15" x2="-25" y2="35 "/><line class="rain rain2" x1="0" y1="10" x2="0" y2="30"/><line class="rain rain3" x1="-10" y1="20" x2="-10" y2="40 "/><circle class="cloud" cx="0" cy="30" r="20"/><circle class="cloud" cx="-15" cy="30" r="20"/><circle class="cloud" cx="-30" cy="30" r="20"/><circle class="cloud" cx="-25" cy="10" r="15"/><circle class="cloud" cx="-7" cy="15" r="15"/></svg>
        </div>
          <div class="day__weather">
          <h3>SUN</h3>
          <svg viewbox="-63 -30 100 100"><line class="rain" x1="-25" y1="15" x2="-25" y2="35 "/><line class="rain rain2" x1="0" y1="10" x2="0" y2="30"/><line class="rain rain3" x1="-10" y1="20" x2="-10" y2="40 "/><circle class="cloud" cx="0" cy="30" r="20"/><circle class="cloud" cx="-15" cy="30" r="20"/><circle class="cloud" cx="-30" cy="30" r="20"/><circle class="cloud" cx="-25" cy="10" r="15"/><circle class="cloud" cx="-7" cy="15" r="15"/></svg>
        </div>
      </div>
    </label>
  </div>
</div>

1. 天氣折線圖

使用 SVG 繪製，圓點用 circle 元素、折線使用 polyline，需要注意的是 SVG 屬性名稱有些和 CSS 不同：

|  | CSS | SVG |
| -------- | -------- | -------- |
| 邊框顏色  | border-color  | stroke  |
| 框線粗細  | border-width  | stroke-width    |
| 背景  | background-color |fill    |
|定位  | left/top/bottom/right  | x/y（圓形 cx/cy）  |
| 寬高 | width/height     |width/height    |

在 svg 中有一個 `viewbox` 屬性，放四個參數（x, y, width, height），可以把它想像成整個 svg 圖檔的可視範圍，超過就不會顯示出來，像天氣折線圖中的最後一個圓點因 x 座標超過範圍，不會出現在畫面上。

```html
<svg class="temsvg" viewbox="0 0 400 400">
  <circle cx="0" cy="70" r="3"/>
  <text x="0" y="70">32°C</text>
  <circle cx="70" cy="50" r="3"/>
  <text x="70" y="50">34°C</text>
  <circle cx="140" cy="30" r="3"/>
  <text x="140" y="30">34.5°C</text>
  <circle cx="210" cy="60" r="3"/>
  <text x="210" y="60">33°C</text>
  <circle cx="280" cy="70" r="3"/>
  <text x="280" y="70">32.5°C</text>
  <circle cx="350" cy="60" r="3"/>
  <text x="350" y="60">33°C</text>
  <circle cx="420" cy="50" r="3"/> <!-- 從 x 軸往右 400 以內才是可視區 -->
  <text x="420" y="50">34°C</text>
  <polyline points="0,70 70,50 140,30 210,60 280,70 350,60 420,50" />
</svg>
```
```css
.temsvg {
  width: 100%;
}
.temsvg polyline {
  stroke: #f3f3f3;     /* 框線顏色 */
  stroke-width: 1px;   /* 框線粗細 */
  fill: none;          /* 無填滿 */
}
.temsvg text {
  transform: translate(-10px, 20px);    /* 讓文字在圓點下方 */
  font-size: 10px;
  fill: #f3f3f3;
}
.temsvg circle {
  fill: #f3f3f3;
}
```
動畫部分，一開始讓折線圖文字隱藏、幾乎要看不到點線，等到點擊卡片才變跑出來，最簡單的做法：
- 使用 `opacity` 來調整

```css
/* 初始化設置透明度 */
.temsvg polyline {
  opacity: 0.2;
}
.temsvg text {
  opacity: 0;
}
.temsvg circle {
  opacity: 0.2;
}

/* 動畫時間效果：duration 和 delay 使用 */
.temsvg polyline, .temsvg circle, .temsvg text {
  transition-duration: 0.5s;
}
.temsvg text {
  transition-delay: 1s;
}
.temsvg polyline {
  transition-delay: 0.5s;
}

/* 點擊後才調整透明度 */
#switch_night:checked + .top .temsvg polyline, #switch_night:checked + .top .temsvg circle, #switch_night:checked + .top .temsvg text {
  opacity: 1;
}
```

2. 雲朵和雲

雲朵可以用 SVG 做，但這邊紀錄另一種做法 ── 使用「**偽元素**」，先設定半橢圓的底部，再用上 ::before、::after 變成兩圓形，內部添加細長條的雨滴，最後根據父層的雲朵調整內部位置。

![](https://i.imgur.com/Zs6slzu.png)

```html
<!-- 一朵雲和它的雨 -->
<div class="cloud">
  <div class="rain rain1"></div>
  <div class="rain rain2"></div>
  <div class="rain rain3"></div>
</div>
```
動畫方面，雲和雨是設置上下移動：
1. 寫一組影格動畫 cloudAnim，設置 `translateY`
2. 把動畫分配給雲朵，設置以 4 秒為一次的無限循環
3. 另一組雨的動畫則另外加上淡出效果

```css
.cloud {
  animation: cloudAnim 4s infinite;
  animation-delay: -0.2s;   /* 為了在進入頁面前就看到移動，設置負數開始播放 */
}
@keyframes cloudAnim {
  0% { transform: translateY(0px); }    /* 動畫進度 0% 要做到的事 */
  50% { transform: translateY(-10px); } /* 動畫進度 50% 要做到的事 */
  100% { transform: translateY(0px); }  /* 動畫進度 100% 要做到的事 */
}

.rain {
  animation: rainAnim 1s infinite linear;  /* linear 等速播動畫 */
}
@keyframes rainAnim {
  0% { transform: translateY(0px); }
  100% { transform: translateY(50px); opacity: 0; }  /* 漸漸淡出 */
}

.rain2 {
  animation-delay: -0.4s; /* 同樣從負數開始播放 */
}
.rain3 {
  animation-delay: -0.7s;
}
```

3. 月亮

做法超級神奇！運用位移來創造出陰晴圓缺效果，本身只是圓形加上一個偏移很多的陰影，但只要把本體框線拿掉就會發現是弦月的形狀

![](https://i.imgur.com/N4ZG9uf.png)

```html
<div class="moon"></div>
```

利用本體和陰影的移動，來創造視差

```css
.moon {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  box-shadow: 15px -15px;              /* 陰影 */
  animation: moonmove 20s infinite;    /* 每 20 秒一次的動畫 */
}

@keyframes moonmove {
  0% {
    box-shadow: 15px -15px #FFD633;    /* 陰影的開始位置 */
    transform: translate(-15px, 15px); /* 本身位移，抵銷陰影的移動 */
  }
  100% {
    box-shadow: -25px 25px #FFD633;    /* 陰影的結束位置 */
    transform: translate(25px, -25px); /* 本身位移，抵銷陰影的移動 */
  }
}
```

4. 太陽

太陽做法同樣巧妙，利用加粗的邊框和「虛線」來繪製周圍的光暈，這邊紀錄 stroke 的幾種屬性：

| stroke 五個設定 |  |  |
| -------- | -------- | -------- |
| stroke | 邊框顏色  |   |
| stroke-width | 邊框的寬度  |   |
| stroke-linecap | 邊框端點  | butt（預設）、square、round |
| stroke-linejoin | 邊框接合尖角 | miter（預設）、round、bevel  |
| stroke-dasharray | 虛線  | 放入一陣列 `"2, 5, 4"`，設定線段長度與虛線間隔 |

![](http://www.oxxostudio.tw/img/articles/201406/20140613_1_03.png)

```html
<!-- 以 (-50,-50) 為起點，往右邊和下面看 100 -->
<!-- 圓形設置 (0,0) 自然會在 svg 視覺中央 -->
<svg viewbox="-50 -50 100 100">
  <circle class="sun" cx="0" cy="0" r="22" />
</svg>
```

```css
.sun {
  fill: #FFD633;
  stroke: rgba(255, 214, 51, 0.3);
  stroke-width: 30px;
  stroke-dasharray: 5px;   /* 每一段虛線 */
}
```

5. 底部卡片展開

一開始就先讓底部高度只留一點，hover 時再調整回原高，天氣小圖也是一樣，只不過是調整位移和 transition 來做到往上升的效果

```css
.bottom {
  height: 10px
}
.day__weather {
  text-align: center;
  width: calc(100% / 7 - 5px);  /* CSS 可用 calc 算數 */
  opacity: 0;
  top: 20px;
  transition: 0.5s;
}

/* hover */
.box:hover .bottom {
  height: 100px;
}
.box:hover .bottom .day__weather {
  opacity: 1;
  top: 0px;
}
```


---

