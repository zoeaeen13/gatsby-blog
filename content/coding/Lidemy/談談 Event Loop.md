---
title: 談談 Event Loop
type: coding
category: 程式導師計畫
tags: [JavaScript,Lidemy,Event Loop]
description: 了解 JavaScript 執行特性及 Event Loop 事件循環機制
date: '2020-11-12'
---

本篇將透過解釋 Event Loop 機制，理解以下常見的名詞及 JS 執行特性

```html
Single Thread 單執行緒
Call stack 呼叫堆疊
Blocking 阻塞
Event loop 事件循環
Callback 回調
Callback Queue 回調序列
```

---

##Call Stack 執行堆疊
JS 是一個單執行緒的語言，有一個單執行緒的 Runtime（執行環境系統），執行緒可以想像成執行工作的單位，單執行緒意味著它一次只能做一件事。在程式碼運行前，JS 的 Runtime（記憶體堆疊、默認執行環境、執行環境堆疊）會被建立。

之後依序執行，一旦呼叫到其他函式，Global EC 會幫呼叫到的函式產生新的 Execution Context 放到 stack 上，當多個函式被呼叫就會產生多個 EC，依序堆疊上去，這被稱為執行堆疊（call stack）。

call stack 的特性是後進先出，最後被堆上去的 EC 會作為目前的執行環境先被執行，因為單執行緒的特性，一次只會執行一個程式碼片段，要等到該函式執行完畢 reurn 後，它的 EC 才會自動從執行堆疊的頂端抽掉（pop off），再執行底下一層的程式碼。

![](https://i.imgur.com/t0xDDE2.png)



> **為什麼不能在一個函式呼叫它自己？**

無窮迴圈，會造成堆疊爆炸（Stack Overflow）
```js
function foo() {
    return foo();
}

foo();
```

##Blocking 阻塞
然而，有些東西就是跑特別慢，需要等待很長一段時間，比如網路請求、圖片請求、或純粹就是執行過程漫長的程式碼，當這些跑得慢的東西又處在目前的堆疊上，就會造成「Blocking（堵塞）」。

如果現在是同步設定，那麼一旦發生 blocking，畫面就會壞掉、好像「卡住」的現象，這是因為瀏覽器被塞住、無法繼續渲染頁面，變成我們什麼事都做不了，而面對這種狀況，我們就需要「非同步回調（Async Callback）」機制。

簡單來說，就是在需要跑比較久的程式碼中用上非同步方法（Asynchronous），裡面塞一個 callback function（簡稱 cb），這樣就會先執行一段程式碼，然後過段時間再回調裡面的 cb，不會立即執行到而造成阻塞。

##Concurrency 並行機制
那肯定就會好奇，callback function 是怎麼做到會等待一段時間再執行？為什麼它能等到結束做、能監測什麼時候要結束等待？JavaScript Runtime 不是一件只能做一件事嗎？

沒錯，JavaScript 的確是單執行緒，它在執行一段程式碼的時候，就不能同時紀錄 setTimeout 的要求、做 HTTP Request 網路請求，而讓這一切實現的關鍵並不是 JavaScript，而是**瀏覽器**。
瀏覽器額外提供了很多東西，類似各種不同的執行緒，一些你只能經由呼叫、無法取得的執行緒，比如 setTimeout 就是其中一個，它是環境所提供，並非來自 JS Runtime 本身。

當你在 Call Stack 執行這行去呼叫它後，瀏覽器就會為你啟動一個計時器，然後 JS 繼續執行下一行，而 `setTimeout()` 實際上是出現在瀏覽器另外提供的執行緒中進行計時，其他像 AJAX、Fetch、DOM 也都是瀏覽器提供的 API。

![](https://i.imgur.com/TVo3hwu.png)


##Event Loop 和 Callback Queue
那 `setTimeout()` 執行完畢後，裡面的 cb 該怎麼處理？剛剛說到會「回調」，那是丟回堆疊中直接執行嗎？

當然不可能如此簡單粗暴，瀏覽器不會傻呼呼直接丟回堆疊上，這樣根本無法控制它出現的時機，Web APIs 會在執行完 `setTimeout()` 之後將它的 callback function 放到一個名為 Callback Queue 的地方，所有非同步執行的程式碼會被推到這裡等待執行。

而安排 Callback Queue 裡面的任務去到堆疊，是由「Event Loop（事件循環）」負責，你可以想像它就是在辦公大樓上班的警衛，尖峰時端擠滿一堆要上樓的上班族，而大家滑著手機、都在排隊等待電梯，電梯很小，一次只能容納一個人，就是這位警衛來幫他們觀察電梯什麼時候空出來，一旦電梯抵達一樓，就通知排隊的第一個人可以上班了。

**Event Loop 決定事件的執行順序**，它不斷監控 stack 和 queue 的狀態，查到堆疊的狀態是空的，就換檢查 Callback Queue 中有沒有準備好的 cb，就把最前面的 cb 抓起來送到堆疊上執行，所以可以說 JavaScript 可以並行的基礎是因為 Event Loop 的存在。

![](https://i.imgur.com/PBYJawC.png)

##更進一步：認識瀏覽器的運行環境
從上面我們知道了在 JS Runtime 之外，瀏覽器還提供了 Web APIs、Queue、Event Loop 等等東西來幫助任務執行，整個瀏覽器的運作環境，包含 JS 引擎，我們稱為 JS Runtime Environment（JRE）

![](https://ithelp.ithome.com.tw/upload/images/20190928/20106580oVudusuOwX.jpg)


> **Q: 零延遲（Zero delays）是什麼？**

有時候我們會看到將 setTimeout 設成零，這麼做並非表示 callback function 會在 0 毫秒之後立刻執行，從上面 Event Loop 的運作我們了解到：這個 cb 會等待堆疊清空後才被執行到。

呼叫 setTimeout 的使用，不代表過了那段時間就會執行，時間參數只是要求處理的最少等待時間，我們還得考慮到在 Queue 中等待的訊息數量，setTimeout 是讓我們把任務推遲到堆疊的最後再執行。

```js
(function() {

  console.log('this is the start');

  setTimeout(function cb() {
    console.log('this is a msg from call back');
  });

  console.log('this is just a message');

  setTimeout(function cb1() {
    console.log('this is a msg from call back1');
  }, 0);

  console.log('this is the end');

})();

// "this is the start"
// "this is just a message"
// "this is the end"
// "this is a msg from call back"
// "this is a msg from call back1"
```
> **Q: 為什麼說不要做事件阻塞？**

意思是，讓你別在堆疊上放慢到不行的程式碼，這樣會影響瀏覽器最重要的東西 ─ 畫面！

一般來說，瀏覽器會在每 16.6 毫秒（也就是每秒 60 個幀）重新渲染一次畫面，但當堆疊上有程式碼的時候，瀏覽器就不能顯示東西，造成卡住。比如 `forEach()` 裡面的函式就不會做非同步，而是在當前的堆疊中執行，當你對每個元素做緩慢處理的同步迴圈，就會讓瀏覽器的顯示一直被擋住。

```js
// Synchronous
[1, 2, 3, 4].forEach(function (i) {
  console.log(i)
  delay()
})
```

而當你知道**渲染任務的優先權高於 callback function**，你就應該重新思考程式碼的架構，像是將它改為回調函式，當他們同樣都在 Queue 中等待時，瀏覽器就可以自己找到機會安插渲染任務，順利保持流暢的 UI。
```js
// Asynchronous
function asyncForEach(array, cb) {
  array.forEach(function () {
    setTimeout(cb, 0)
  })
}
```

##Q: 為什麼 JavaScript 會是單執行緒的程式語言？
> 為什麼 JavaScript 只能跑在一個 thread 上，一次只做一件事？

與他的用途有關，當初 JavaScript 是為了在瀏覽器上運作，與使用者互動以及操作DOM而設計的，這決定了他只能是單執行緒，否則會帶來很複雜的同步問題。比如同時有兩個執行緒存取到同一個 DOM 節點：
* 一個執行緒在某個 DOM 節點上新增內容
* 另一個執行緒刪除了這個節點

瀏覽器要以哪個為主？為了避免這種麻煩才這樣設計，之前寫過 Android 開發，也發現會要求任何跟 UI 有關的操作都得在主執行緒進行，就是為了避免無法預料的狀況。

##小結
* 堆疊當下的程式碼會執行完畢，過程中不會被 async code 中斷
* 就算 setTimeout() 延遲時間設定為 0，程式也不會立即執行到，依然會被排在 Callback Queue 等待堆疊清空
* JavaScript 只能跑單執行緒，但瀏覽器像是提供了它運作多執行緒的可能，利用 Event Loop 機制去幫助 JavaScript 執行任務
* 瀏覽器中，渲染畫面的優先權高於 callback function


##參考資料
* [Javascript [筆記] 理解 Event Loop,Call Stack, Event & Job Queue in Javascript](hhttps://milletbard.com/2019/11/25/JavaScript-event-loop/)
* [並行模型和事件循環](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/EventLoop)
* [[筆記] 理解 JavaScript 中的事件循環、堆疊、佇列和併發模式](https://pjchender.blogspot.com/2017/08/javascript-learn-event-loop-stack-queue.html)
* [[第十六週] JavaScript 進階：事件迴圈 Event Loop、Stack、Queue](https://yakimhsu.com/project/project_w16_EventLoop.html)
* [Day5 [JavaScript 基礎] Event Loop 機制](https://ithelp.ithome.com.tw/articles/10214017)
* [JS 原力覺醒 Day13 - Event Queue & Event Loop 、Event Table](https://ithelp.ithome.com.tw/articles/10221944)