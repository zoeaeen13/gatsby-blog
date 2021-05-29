---
title: '[第六週] 了解 inline, block 跟 inline-block 的差別'
type: coding
category: 程式導師計畫
tags: [CSS, Lidemy]
description: 用來定義標籤們的顯示方式，透過 CSS 來改變元素預設的顯示方式，進而達到排版目的
date: '2020-08-21'
---

display 這個屬性，是用來定義標籤們的**顯示方式**，每一個 html 元素都會有一個預設的 display 屬性，inline 或 block，可以透過 CSS 來改變元素預設的顯示方式，進而達到排版目的。

常見的顯示方式有兩種：


> Block 區塊元素

* 常見元素標籤：div、ul li、p、h1
* 寬度預設撐到最大，占滿整行容器
* 下個元素會換行呈現，並不會並排
* 水平置中方法：margin : 0 auto

> Inline 行內元素

* 常見元素標籤：span、a、imput、img
* 元素連在一起會在同一行，**不會換行**，圖片或文字均不換行
* **不可設定長寬**，僅依照內容大小顯示
* 很多資料會寫到 margin/padding 不能設定，事實上是指排版不會隨著設定而有所改變，寬高都是依照元素本身大小，但可以設置 margin-left、margin-right、padding-left、padding-right
* 水平置中方法：加上 text-align : center
* 備註： inline 元素不該包住 block 元素

![](https://i.imgur.com/WFByAR7.png)


---
除了預設，當然可以透過 CSS 去改變顯示方式，我們常用的 display 方式還有 none 和 inline-block：

> display: none

設定成 none，表示不顯示該元素，`display: none` 和 `visibility: hidden` 的差別在於 none 會讓這個東西完全不見，不佔空間，而 `visibility : hidden` 只是隱形，實際上還是佔據排版空間

> display: inline-block

inline-block 的作用，就是為了整和名稱裡兩屬性的優缺點。有時候我們不需要占滿整行的元素、想讓它並排，同時又希望它可以設定 Box Model 的狀態，這時候就可以用上 inline-block：
* 外面用 inline 呈現，裡面是 block 屬性
* 意思是可以並排，可以設定元素的寬高/外距/內距

