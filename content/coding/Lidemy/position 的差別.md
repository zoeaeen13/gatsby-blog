---
title: '[第六週] 了解 position: static, relative, absolute 跟 fixed 的差別'
type: coding
category: 程式導師計畫
tags: [CSS, Lidemy]
description: 用來指定一個元素的定位方式，透過 top、right、bottom 和 left 特性來「特別定位」元素，是經過計算後得到的位置
date: '2020-08-23'
---

相較於屬性 display 定義元素與其它元素之間的排版關係、整體呈現方式，position 是透過 top、right、bottom 和 left 特性來「特別定位」元素，是經過計算後得到的位置。

常見定位元素有以下分類：
* 相對定位元素（relatively）
* 絕對定位元素（absolutely）：absolute 或 fixed 的元素
* 黏性定位元素（stickily）

---
<BR>

要對元素進行定位，需要設置 position 才能指定定位元素，如果沒有特別設置，預設按照正常的排版布局
##### 1. Static 預設
* 照著瀏覽器預設的配置自動排版
* 使用 top, right, bottom, left 和 z-index 属性無效，因為它非定位元素
```css
/* 預設位置 */
position: static;
```
![](https://i.imgur.com/MAc1m4y.png)

##### 2. Relative 相對定位
* 預設表現會和 static 一樣，除非你設置 top, right, bottom, left 等屬性
* 根據原位置，原位置「相對地」調整原本該出現的所在位置
* 不影響其他元素 => 脫離正常的文件流進行移動，原位置仍留空
```css
.item {
  position: relative;
  top: 40px; left: 40px;
}
```
![](https://i.imgur.com/d9r8MFA.png)


##### 3. Absolute 絕對定位
* 不會和 reletive 一樣預留空間，排版流視絕對定位的元素不存在
* 絕對定位的元素，會往上找到**定義為非 static 的父層**元素，根據它來進行偏移，確定元素位置
* 如果父層都沒有定義，那麽就一路找到整個文檔 body 定位
```css
.item {
  position: absolute;
  top: 40px; left: 40px;
}
/* 從下圖可以看到方塊黃被擠出正常的排版，定位的基準點是父層非static元素 */
```
![](https://i.imgur.com/MyfFnGp.png)

#### 4. Fixed 固定定位
* 和 absolute 相似，只是它根據的不是父層元素，而是 viewport 屏幕位置
* 相對於瀏覽器視窗來定位，即使頁面捲動依然在同一位置
* 通常配合 z-index 一起來使用


---

> 補充：z-index 物件的層疊順序
* 用一個整數來定義堆疊的層次，整數值越大，則被層疊在越上面
* 父子關係是無法用 z-index 來設定上下關係 的，一定是子級在上父級在下
* 用 static 定位時，無效

##### 參考資料：
* [MDN position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)
* [關於 position 屬性](https://zh-tw.learnlayout.com/position.html)
* [CSS 屬性篇(一)：relative與absolute](https://www.jishuwen.com/d/2A5E/zh-tw)

