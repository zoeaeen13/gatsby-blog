---
title: 初識 JavaScript
type: coding
category: 程式導師計畫
tags: [JavaScript,Lidemy]
description: JavaScript 基本觀念、變數及運算子
date: '2020-07-03'
---
##JavaScript
早期只能用在瀏覽器，透過它去操控畫面上的東西，瀏覽器會提供給 JS 一些方法。**JS 不能單獨執行，一定要有一個執行環境存在**，目前多數情況不是使用瀏覽器就是用 Node.js：

* Node.js
並非程式語言，而是一種執行環境（Runtime），是可以讓 JS 在非瀏覽器的地方運行，這個執行環境會提供 JS 操控需要的方法，和 Chrome 一樣核心使用高速的 V8 JavaScript 引擎，可以運行於一般常見的各種作業系統平台上。

不同的執行環境（Runtime）會提供不同的功能，或者同樣的方法、但呈現方式不同。

---

> **Q: 如何執行 JS 程式**

1. 在瀏覽器中執行 JavaScript
建立一個 .html 檔，撰寫 `<script>`，並於兩標籤之間撰寫 JavaScript 程式碼、嘗試印出東西，開啟瀏覽器執行，可以從開發者工具 -> Console 看到執行結果。
* 瀏覽器在碰到 `<script>` 時，會停止文件解析，先執行 `<script>` 間的程式碼 ，如果你的 JS 裡面要操作到 DOM 元素，應該將 `<script>` 標籤放在文件最後執行
* 瀏覽器會假設你使用的是 JavaScript 語言，不過你也可以用 HTTP Content-Script-Type 標頭來指定，標頭可以使用 `<meta>` 來摸擬，亦或是可以在 `<script>` 上使用 type 屬性來指定
* 可以不寫在 .html 裡面，將 JavaScript 程式專門撰寫在 .js 檔案，再使用 `<script>` 標籤的 src 屬性指定檔案名稱

```html
// 方法一： HTTP Content
<meta http-equiv="Content-Script-Type" content="text/javascript">

// 方法二：使用 type 屬性來指定
<script type="text/javascript">
    // 你的程式碼
</script>
```

2. 在 Node.js 環境執行程式
* node 指令 + .js 的檔名
* 或是 node 指令進入執行環境（下圖講解）

![](https://i.imgur.com/QTJ7C4C.png)

<br>

###Q: 如何比較好理解 Runtime？

直譯就是運行時間，run（跑、運行）time（時間）是一套比較底層的純 C 語言。在 stackoverflow 上有相關的討論「[What is "runtuime"?](https://stackoverflow.com/questions/3900549/what-is-runtime)」其中一段我認為比較好的解釋：

>*Runtime describes software/instructions that are executed while your program is running, especially those instructions that you did not write explicitly, but are necessary for the proper execution of your code.
>
>*Runtime 描述軟體程式/指令在你的程式運行的時候是如何執行的，尤其是那些你沒有明確寫出來，卻對於正確執行程式碼是必須的指令。*

我個人理解成平常我們可能會使用 JavaScript、OC、Python 各種語言，在執行的時候（Runtime）都會轉成電腦看得懂的形式、和電腦進行合作。
就是像中間的翻譯一樣，我們需要 Runtime Library 來實現程式運行時需要的一切指令，它會對所面對的程式語言，提供其基本**執行時需求**，像是創建類別、屬性方法、支援函式，並與作業系統合作支援例如數學運算、輸入輸出等基本功能。

---

###變數（Variable）
* 資料(值)的存放角色。和常數不同，想像變數是一個**暫時存放值**的盒子，而盒子是打開的，可以更動或抽換裡面的東西
* 記住：**宣告變數**和**定義變數**是分開的
    - 宣告變數：`var foo`、`let foo`、`const foo`，ES6 之後有三種[宣告方式](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Grammar_and_types)，之前只有定義變數沒有定義常數的方式
    - 定義變數：`foo = 1`、`foo = '1'`、`foo = true`
    - 定義變數稱為**賦值**，宣告變數時如果沒有賦值的話，預設是 undefined


####變數的命名規則
* 數字不可用於開頭字元
* 不可使用 JavaScript [保留字](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Future_reserved_keywords)，如 var、return 等
* 又稱為 identifier，取名稱要有**識別性**，最好讓人一眼判斷這個變數代表什麼、要做什麼事

命名有很大的學問，可以幫助其他人理解程式碼，參考 [好的變數(函式、類別)命名](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part3/var_const_naming.html#%E5%A5%BD%E7%9A%84%E8%AE%8A%E6%95%B8%E5%87%BD%E5%BC%8F%E3%80%81%E9%A1%9E%E5%88%A5%E5%91%BD%E5%90%8D)

```js
- 變數和函式 -> 小駝峰式(camelCase)： bookName、cardItem...
- 類別 -> 巴斯卡(PascalCase)： ItemDecoration、CustomView...

// 常見的 Boolean 布林值命名（形容詞）
isEmpty、hasBasket、isPass，有是否之意

// 常見的 String 字串命名（名詞）
name、description、label、text

// 常用的函式開頭（動詞+名詞）
setColor、removeAll、printText、addItem
```
####基本符號

| 符號 | 名稱 | 用法 |
| -------- | -------- | -------- |
| （） | 圓括號| 函式呼叫、包括流程敘述、分隔運算的優先順序 |
| ［］ | 中括號| 主要用於表示 JavaScript 中的陣列（Array）|
| ｛｝ | 大括號| 區塊，用於程式敘述的區域分隔（函式、迴圈、流程條件），另外也用在物件實字（Object Literals） |
| "" | 雙引號 | 用於字串的宣告 |
| '' | 單引號 | 在 JavaScript 中也用於字串的宣告 |

####運算子（Operators）

對變數或值進行操作的字元，例如 `x + y = z` 其中的 = 和 + 符號。


| 符號| 名稱| 定義 | 用法 |
| -------- | -------- | -------- | -------- |
| `=` |指定運算子（assignment）| 進行「指定、賦值」的工作 | `a = b + 1`，就是將 b + 1 的結果放到 a |
| `+-*/` |算數運算子（math） | 進行加、減、乘、除的運算 ||
| `+=` `-=` `*=` `/=` |複合指定運算子（compound assignment） | 結合算數及指定的性質 ||
| `++`和`--`|遞增運算子（increment/decrement） | 遞增或遞減 1 ||
|  |邏輯運算子（logical） | 表達複合條件、設定初始值 |And、Or、Not|
| `>`、`<`、`>=`和 `<=`|比較運算子（comparison） | 比較結果 -> 布林值||
|`==` `===` `!=` `!==` |相等性運算子（equality） | 差異 -> 比較時是否會做強制轉型||

> Q: 位元運算好難理解？

5 & 1 會被看成 0101 & 0001，得到結果 0001，回傳 1


> Q: 關於 a++ 和 ++a 的差異

* `a++` 執行完整句，才跑 ++
* `++a` 先執行完這個 ++，再去執行整句

參考這篇 [i++ 與 ++i可以怎麼理解？](https://ithelp.ithome.com.tw/articles/10192800)，做完練習之後好理解很多，在一般迴圈裡看起來一樣的結果，但是透過表示式就可以看出差別。


> Q: 更多運算子介紹？

1. 存取運算子（object property access:）：物件特性，利用 `.` 或 `[ ]` 方式存取物件的特性，記得：存取運算子優先於其他運算子執行！
例如 `obj.a` 或 `obj['a']`，點記號法簡單好使用，但 `[ ]` 卻可在索引值是變數或有特殊字元時能**保證完成值的存取**，例如：`obj['h e l l o']`（字串中間有空白）、`obj['#$%^&']`（特殊字元）、`obj['123']`（開頭為數字時）


2. 字串運算子（string）：`+` 可串接兩字元並回傳結果，通常用於連接變數與字串。補充：如果數字要轉字串，除了調用函式外，也可以透過這個方式

```js
// 字串運算子
var A = 3
var B = A + ''     //加上一空字串
console.log(B)     //"3"

// 字串模板，使用 ${ variable_name } 代入變數
console.log(${A})  //"3"
```
3. 三元運算子（conditional / ternary）：又稱條件運算子，接受兩個運算元作為值且一個運算元作為條件。若條件為 true，運算子回傳「A值」，否則回傳「B值」

```js
//條件?A值:B值
condition ? A(true) : B(false)
```

4. 一元運算子（unary）：只需要一個運算元的運算，例如邏輯否（`!`）、遞增遞減（`++`/`--`）和 typeof 等等都是屬於一元運算子，可以參考這篇 [JavaScript Unary Operators: Simple and Useful](https://scotch.io/tutorials/javascript-unary-operators-simple-and-useful#toc-summary-of-all-unary-operators)
5. 關係運算子（relational）：比較兩運算元，並根據比較結果回傳布林值。例如 `in` 運算子可得知特定屬性是否存在於物件中

```js
var product = {
  name: 'apple',
  price: 100,
};

'name' in product; // true
'date' in product; // false
```

> Q: 至於以上運算子的執行優先順序，可參考[資料](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table)

####參考資料：
1. [What is “runtime”?](https://stackoverflow.com/questions/3900549/what-is-runtime)
2. [深入淺出Runtime (一) 什么是Runtime？ 定义？](https://www.struggle3g.com/2018/09/07/%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BARuntime%20(%E4%B8%80)%20%E4%BB%80%E4%B9%88%E6%98%AFRuntime%EF%BC%9F%20%E5%AE%9A%E4%B9%89%EF%BC%9F/)
3. [運行時（runtime）是什么意思？應該怎樣深入且直觀地理解？](https://www.zhihu.com/question/20607178)
4. [script 標籤](https://openhome.cc/Gossip/JavaScript/ScriptTag.html)
5. [運算式與運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_Operators#%E4%B8%80%E5%85%83%E9%81%8B%E7%AE%97%E5%AD%90)
