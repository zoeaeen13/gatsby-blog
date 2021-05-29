---
title: '[第七週] 什麼是 DOM？'
type: coding
category: 程式導師計畫
tags: [Lidemy]
description: 提供了一個文件樹的結構化表示法，讓程式可以存取、改變風格和其內容的方法
date: '2020-08-30'
---

文件物件模型（Document Object Model, DOM）是 HTML 的程式介面，它提供了一個文件樹的結構化表示法，讓程式可以存取、改變風格和其內容的方法

![](https://i.imgur.com/jxQ2B4W.png)


##### Q: DOM 的出現，為什麼需要它？
網頁是由瀏覽器負責運行，因為有許多眾多的瀏覽器存在，所以我們需要一些共同的標準，讓瀏覽器可以按照一定規範設計，而 DOM 就是其中一個規範

* 在 DOM 標準下，把文件所有的標籤，包括文字，定義成一個物件
* DOM 是以樹狀結構呈現，會形成節點（node），每一個元素都是一個節點

##### Q: 節點有幾種型態？
* Document：代表整份文件
* Element：所有的標籤（HTML Tag），例如 `<div>`、`<p>`
* Text：文字元素，指被各個標籤包起來的文字，是 Element 的 Text
* Attribute：各個標籤內的相關屬性，class、name 等等

聽起來很複雜，但瀏覽器就是這樣一步一步的把 HTML 解析(parse)成一顆 DOM tree

##### Q: DOM 節點之間的關係？
1. 上下層節點，上層為 Parent Node ，下層為 Child Node
2. 同一層節點，彼此間有 Previous 以及 Next 兩種
![](https://i.imgur.com/UlFKYot.png)

雖然說 DOM 普遍運用在 HTML 相關的物件模型，但它並非專屬於 HTML，DOM API 可拆分為兩部份，一個是核心 DOM API，一個是 HTML DOM API。

前者是一個獨立規範，可以任何語言實現，操作對象是基於 XML 的任何文件。而一般我們使用的 HTML DOM API 就是它的延伸，專門操作 HTML 各種物件對應的形態。

##### Q: 如何操作 DOM 元素？
###### 抓取節點（node）
```js
// 找尋 DOM 中符合此 id 名稱的元素，回傳 element
document.getElementById('id')

// 找尋 DOM 中符合此 tag 的所有元素，回傳 element 集合，集合為 HTMLCollection
document.getElementsBytagName('tag')

// 找尋 DOM 中符合此 class 的所有元素，回傳 element 集合，集合為 HTMLCollection
document.getElementsByClassName('className')

// 與CSS相關的選擇器，可支援複雜的階層選擇，利用 selector 來找尋 DOM 中的元素
document.querySelector('selector')       // 回傳相對應的第一個 element 
document.querySelectorAll('selector')    // 回傳符合條件的所有元素集合，為 NodeList
```

###### HTMLCollection 和 NodeList 到底差在哪？
兩者都是類似陣列的物件，可使用索引值來指定
* **HTMLCollection**：元素集合，Node type 只接受 Element
* **NodeList**：節點集合，因此全部的 Node 都可以存放在 NodeLists 內


> 幾點注意
* 以 `node.childNodes` 方法可以取得子節點，取回的會是 **NodeList 物件**，而以 `node.children` 和 `node.getElementsByXX` 返回 **HTMLCollection 物件**
* document 代表整份文件，而不代表 html 元素節點 => 使用 `document.childNodes[0]` 取得 html 元素
* 想取得 body 元素，可透過 `document.body` 來取得
* 文字也是形成樹狀結構中的元素



#### 參考資料
* [文件物件模型 (DOM)](https://developer.mozilla.org/zh-TW/docs/Web/API/Document_Object_Model)
* [W3C DOM 簡介](https://openhome.cc/Gossip/JavaScript/W3CDOM.html)
* [Day03-深入理解網頁架構：DOM](https://ithelp.ithome.com.tw/articles/10202689)
* [NodeList 和 HTMLCollection之间的关系？](https://www.zhihu.com/question/31576889)