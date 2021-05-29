---
title: '[第六週] 認識 CSS 的 flexbox 排版'
type: coding
category: 程式導師計畫
tags: [CSS, Lidemy]
description: 一種新的布局方式，是為了適應不同螢幕和設備尺寸而誕生的佈局模式
date: '2020-08-22'
---


相較於塊狀佈局（Block layout）以垂直方向為準、行內佈局（Inline layout）以水平方向為準，這是一種新的布局方式，是為了適應不同螢幕和設備尺寸而誕生的佈局模式：

* 多數瀏覽器已有支援 flexbox 
* 沒有固定水平、垂直，而是利用**主軸**（main axis）和**切軸**（cross axis）的概念
* 彈性盒子適用不同的排版演算法，有些屬性在這裡無作用，例如 vertical-align
* **動態變更**的能力，更改該項目的長/高，以貼合任何顯示空間，擴張及收縮元素

![](https://i.imgur.com/GScIb0H.png)


> 舉例來說
>
> flex-direction 是 column，主軸會充當垂直、而切軸則為水平，和我們習慣相似。但參考下圖，它是一個 `flex-direction: row` 的彈性容器，也就是基於主軸作水平排列

![](https://developer.mozilla.org/files/3739/flex_terms.png)

---
<br>
<br>

那麼要如何使用 flexbox 來實作排版？
##### 一、設定彈性容器 flex container
首先，需要定義使用 flexbox 的區塊，將包裹住所有元素的父層容器，它的 display 設定成 `flex` 或 `inline-flex`，作為彈性容器 Flex container
```css
display: flex
display: inline-flex  /* 能讓父層保有 inline-block 的特性 */
```
如此一來，在彈性容器內的所有元素都會變成彈性項目（Flex item），我們可以利用一些屬性設定主軸，對 Flex item 進行排版

##### 二、建立彈性容器的排版規則（外部）
設定主軸，是跟隨彈性項目順序的軸、而切軸是垂直於主軸的軸
1. **flex-direction：啟用主軸，決定子元件的排序方向**
```css
row             /* 主軸從左至右（預設） */
row-reverse     /* 主軸從右至左 */
column          /* 主軸由上至下 */
column-reverse  /* 主軸由下至上 */
```
2. **flex-wrap：決定了子物件是否可以換行**
```css
nowrap          /* 不換行（預設） */
wrap            /* 為換行 */
wrap-reverse    /* 換行且排序方式與 wrap 相反 */
```

> **小技巧：flex-direction 和 flex-wrap 可以合併簡寫為 flex-flow 屬性**
```css
flex-flow: (flex-direction value) (flex-wrap value)
```


3. **justify-content：依據主軸，彈性項目如何擺放**
它會依照我們設定的主軸方向，去移動子物件的對齊位置，因為排版方式眾多，以網路範例圖來展示，更好理解

![](https://i.imgur.com/5EACcpY.png)

4. **align-items：依據切軸的項目如何擺放**
也就是說，對齊方向與 justify-content 相反。舉例來說，當依照預設 `flex-direction: row` 設定主軸為橫向、副軸為縱向
```css
stretch        /* 自動將子元素的高度延展成一樣高度 */
flex-start     /* 靠上*/
flex-end       /* 靠下*/
center         /* 垂直置中*/
baseline       /* 依照基準線對齊*/
```
另外還有 align-content 屬性，與 align-items 類似，差別在於它適用於多行元素，如當設置 `flex-wrap: wrap` 時產生的多行元素

5. **設置 gap 屬性：行列的間距**

![](https://i.imgur.com/CPbP4Xd.png)

---
<br>
<br>

剛剛講的這些都是外容器，前面提過，彈性盒子有一特別屬性是「動態變更」運用在內容器，更能體現「flex」特性：

1. flex-grow：元件的伸展性，空間分配還有剩餘時的當前元件的伸展性。預設是 0，也就是不會縮放

![](https://i.imgur.com/8ISzDfl.png)

2. flex-shrink：元件的收縮性，空間分配還不足時的當前元件的收縮性
3. flex-basis：元件的基準值，可使用不同的單位

> 筆記：grow、shrink 計算概念 => 填入整數，按比例分配剩餘空間
* 先將剩餘的空間計算出來，依據比例（flex-grow）
* 是分配 剩餘的空間，已經佔用的空間不會重新分配


#### 參考資料：
* [MDN CSS 彈性盒子用法](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)
* [CSS Flexbox 新手入門教學](https://medium.com/@a0988891318/css-flexbox-%E6%96%B0%E6%89%8B%E5%85%A5%E9%96%80%E6%95%99%E5%AD%B8-5ad3502e4f40)
* [第一次用 Flex 切版就上手](https://5xruby.tw/posts/flex/)
* [Flex 空間計算規則](https://wcc723.github.io/css/2020/03/08/flex-size/)

