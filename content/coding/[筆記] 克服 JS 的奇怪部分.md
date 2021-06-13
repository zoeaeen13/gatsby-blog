---
title: '[筆記] JavaScript 全攻略：克服 JS 的奇怪部分'
type: coding
log: 'list'
tags: [JavaScript, Udemy]
description: '記錄在 Udemy 上學習《JavaScript: Understanding the Weird Part》過程'
date: '2021-04-02'
---

> 作為前端工程師的第一份工作，希望將基礎打得扎實些
>
> 這篇記錄從 Udemy 上學習《JavaScript: Understanding the Weird Part》的過程，筆記自己新學到、重新理解的 JavaScript 基礎知識。
<br/>

## ch1
**syntax parsers 語法解析器**

電腦不會直接看懂你寫的程式碼，中間需要有一個可以轉換 JavaScript 讓電腦讀懂，例如編譯器或直譯器，會一字一字去讀你的程式碼、確認語法有效的，才會翻譯成電腦看得動的東西

- 把大括號 `{` 接在函數、for loop、if () 後面是為了避免 syntax parsers 自動幫你填入分號
- 空格自由

<br/>

**lexical environments 詞彙環境**

程式寫在哪裡是很重要的，lexical environments 指的是程式碼在開發中所處的位置，這將幫助編譯器決定、考慮它應該被放置哪個記憶體、周圍環境是什麼（寫在函式裡？被包在物件、陣列中？）

=> 影響在執行階段時，它該對應的記憶體位置

<br/>

**execution context 執行環境**

管理目前正在執行的程式碼。

程式碼執行前，先依照 lexical Environment 被解析器轉換、創造並擺到該放的記憶體位置，最後才開始執行，某些特性（例如 JS 中的 hoisting）就是在創造階段產生。

而在執行環境一段正在運行的程式碼，同樣的名稱只會有一個，一個名稱只會對應到一個值
```javascript
// 宣告一個變數名稱 name，它對應的值是 'zoe'
var name = 'zoe'
```

名稱的確可以被定義多次，但在每層 execution context 它只會有一個值

---

<br/>
<br/>

## ch2
在執行時，JS Engine 會創造一個基礎執行環境（base execution context）作為全域環境，同時也創造 `Global Object` 和 `this` 變數， `this` 會參照 `Global Object`
- 瀏覽器的 `Global Object` 指向 window（視窗）
- 瀏覽器的 `this` 同樣指向 window（視窗）
- Node.js 的 `Global Object` => Global

![](https://i.imgur.com/nJRrWSM.png)

因為是全域，代表任何地方都可以存取到，而瀏覽器每一視窗各自有一個全域物件

- 當你在全域中創建變數和函式，就會和 `Global Object` 連結起來
- 全域環境的 `outer environment` 會是 null => 沒有更外層的執行環境


---

##### 為什麼有 hoisting？
execution context 分成兩個階段：creation 和 execution
1. 創造階段
    - 記憶體有了 `Global object`、`this` 變數和 `outer environment`
    - 把變數和函式放進記憶體 => <span class="highlight">有所謂的 hoisting，是因為在創造階段就為 variable、function 設定好他們的記憶體位置</span>
    - 但變數的值和類型是什麼？**要一直到執行階段才知道**
    - 函式則會先設定好，例如 `a: function()`

<br/>

2. 執行階段：逐步、一行行執行
    - 每呼叫一個函式（invoke），就會在 stack 上堆一層 execution context
    - stack 最上層就是目前正在執行的程式碼

---

##### scope chain 和 outer environment
scope - 可以取用到變數的地方，chain - 對外部環境參照的連結
- 變數會被定義在自己那層的執行環境
- 每一個執行環境在創造階段時，除了 `variable object` 和 `this` 變數外，還會創造它要參照的外部環境連結

在 JavaScript 中，如果你想要呼叫一個在當前執行環境所沒有的變數，會往它的 outer environment 去尋找，這個外部環境參照是怎麼決定的？<span class="highlight">取決於「產生這個執行環境的 function 被寫在哪裡」<span>

outer environment 的參照，**跟 stack 堆疊順序無關，而是跟 function 在哪裡被定義有關**，就是前面提過的 lexical environment（程式碼實際被寫出來的地方）。

- 在當前的執行環境找不到變數時，會到它參照的外部環境去尋找
- 執行環境的創造 => 和 function 被呼叫有關
- 參照的外部環境 => 跟 function 定義位置有關
```javascript
function b() {
        console.log(myVar) // 1，因為 function b 被定義在全域
}
function a() {
        var myVar = 2
        b() // 在 function a 裡面呼叫 b()
}
var myVar = 1
a()
```

參考資料：[[筆記] JavaScript中Scope Chain和outer environment的概念](https://pjchender.blogspot.com/2015/12/javascriptscope-chainouter-environment.html)

##### 執行非同步事件

JS Engine 是單執行緒，一次只做一件事，但它並非獨立存在於環境，在瀏覽器中還有提供其他引擎可以做事，像是處理 HTTP 請求資料、渲染畫面或觸發點擊事件等等，可以讓同一時間點有不只一件事在做，而他們也可以跟 JS Engine 溝通，來達到非同步處理的效果。

當 JS Engine 接收到外部來了一個需要被處理的事件時（asynchronous callback），會先放進事件佇列，優先把 call stack 裡面的東西清空才會去處理事件佇列的東西

詳細的可以參考之前寫過的 [Event Loop](../Lidemy/談談 Event Loop)，了解運作機制




---

<br/>
<br/>

## ch3

##### 型別

和其他靜態型別的語言不同，JS 不需要事先說明型別，在執行時才會知道，也意味著同一變數可以在不同時間擁有不同型別
- 基本型別就是一個值，而不像 object 是 name-value 組合
- 在 JavaScript 中數字只有 number 這個型別（有時候運算會和你想的不太一樣）

###### 認識 undefined
- `undefined` 代表變數只是**尚未被設定、其值不存在**，不代表從未宣告，跟 not defined 不一樣
- `var a` 會在建立執行環境時將 a 放進記憶體
- 是一個內建的值，在創造階段時，所有變數被預設為 `undefined`（相當於是 JS 給的初始值）
- 永遠不要設定變數為 `undefined` => 很難判斷變數是不是你設定，要就設定成 null（空值）

---

##### 運算子
```javascript
var a = 4 + 3   // + 就是一個運算子，函數名稱是寫在兩個參數之間
```
- 特殊的內建函數，通常需要兩個參數來回傳一個結果
- 中綴表示法，運算子放在參數中間


**1. 優先性和相依性**
```javascript
var a = 4 + 3 - 2 // 5
```
JS 是單執行緒，不會一次處理兩個函數，會決定先執行哪一個部分，先呼叫完一個才呼叫第二個，參考 [MDN 的 Precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) 可以了解到它執行的優先序。

```javascript
let b = 2, c = 3, d = 4

b = c = d // 4
```
具有相同的 precedence，則視 Associativity 來決定從哪裡計算起，像等號就是 right-to-left。

<br/>

**2. 強制轉型 coercion**
- 轉換一個值的型別
- 永遠用 `===` 來做相等比較
- 把東西放在 if 判斷式裡面，會被試著強制轉換成 Boolean 值，但要注意數字 0 是會被轉換成 false
```javascript
// 可以拿來做一些判斷，像是「如果 a 存在的話就執行...、如果 a 沒有值則...」
if (a) {
      consol.log('true')
}
```
- 使用 `||` 來給預設值，它會回傳第一個被轉型成 true 的值，讓程式碼變得簡潔，可以用它來建立預設值（default value）
```js
// 早期做法
function greet(name) {
      name = name || 'default name'
      console.log(name)
}
greet()
```

偶爾在框架的 source code 裡面可能會看到這行程式碼，這樣寫的目的在於**檢查全域命名空間**
```js
window.libraryName = window.libraryName || 'lib 2'
```

---

<br/>
<br/>

## ch4
![](https://i.imgur.com/9iZOahx.png)

##### 物件
- 可以用 `new Object` 或 `{}` 來建立物件，但不建議使用前者（詳見第五章節）
- Object 有屬性（property）及方法（method）
- Object 參考的是位置，會取得位置對應的屬性/方法，用 `.` 或 `[]` 來設定或取得都可以（dot/bracket notation），前者會比較簡潔

```javascript
var person = {}

person["firstName"] = "Tony"
person.lastName = "Alice"
// 建立 "firstName" 屬性的記憶體，object 會參考到 "firstName" 的位址

greet(person)
// 將物件作為參數傳入 function greet

greet({ firstName: 'Cathy', lastName: 'Jenny'})
// 也可以在傳入時才建立物件，JS 實際上在執行時會先處理過
```


> 補充：JSON 和 object literal syntax 的關係

過去傳送 XML 耗費不必要的資源，所以有了 JavaScript object notation，形式上和 object literal syntax 相似，但還是有不同之處，比如屬性一定得包在 `""` 引號
```json
{
  "data": {
    "basic": {
      "name": "John",
      "email": "",
      "create_time": 1612247227,
    }
  }
}
```
如果需要轉換兩者，只需透過以下方式
- `JSON.stringify(object)` 轉換成 JSON 字串
- `JSON.parse(JSON)` 轉換成物件

參考資料：[JavaScript中物件(object)和JSON格式的轉換](https://pjchender.blogspot.com/2016/01/javascriptobjectjson.html)

---

<br/>

##### 函式是物件的一種

在 JS 裡面，function 是 object 的一種，可以像其他型別一樣被設定成變數、被傳入其他地方，被快速創造出來使用，這樣的 function 被稱作是 **First-class function**：
- 是一種特殊的物件
- 可以將 function 存成變數
- 可以將 function 當成參數代入另一 function
- 可以在一個 function 中回傳另一個 function
- 跟物件一樣有屬性（property）


![](https://i.imgur.com/lYqVQWY.png)

當 function 被視為物件時，它還有兩個特別的屬性
1. name property：function 的名稱，如果沒有的話就是匿名函式（anonymous function）
2. code property：想像 functions 只是用來裝程式碼的容器，funcition 可以被呼叫、執行環境會被建立，執行裡面的程式碼

```javascript
function greet() {         // 建立名為 greet 的函式
  console.log('Hello')     // code property
}


greet.language = 'english' // 因為是 object，可以添加屬性
greet()                    // name property 加上 () => 呼叫函式
console.log(greet)         // 印出 code property 內容
```

參考資料：[[筆記] JavaScript 中函式就是一種物件 ─ 談談 first class function](https://pjchender.blogspot.com/2016/03/javascriptfunctionobjects.html)

---

<br/>

##### 函式：表達式和聲明式

先來認識表達式和聲明式的差別

1. 表達式

輸入的那串程式執行後能直接回傳一個值（a unit of code that results in a values），一般情況，我們會把 expression 回傳的值存成一個變數，但並不是一定要存。

例如下面都是表達式
```javascript
a = 3           // = 會回傳右邊的 3
1 + 2           // 沒有對該值做任何事
if (a === 3) {} // a === 3 會回傳 true
```
2. 聲明式：會做事情，但不會直接回傳值

```javascript
const b = if (a === 3) {}  // 不能用變數接❌
```
像 `if` 指令就是函式聲明，它並不會直接回傳一個值，也不能將它指定為一個變數

---

<br/>


Function 是物件的一種，它可以透過 expression 或 statements 兩種方式來建立函式：

> ###### 函式聲明式 Function Statements
> 它不會直接回傳任何的值

函式聲明會被提升（hoisting），在創造階段就被放進記憶體儲存，可以在執行這段程式前，就呼叫函式來使用
```javascript
greet()   // it works!

function greeting() {
    console.log('hello')
}
```

![](https://i.imgur.com/77o3UNs.png)




> ###### 函式表達式 Function Expressions
```javascript
const anonymousGreet = function() { // function object
    console.log('hello')
}
```
- 匿名函數物件，同樣在創造階段被放進記憶體
- 而 `anonymousGreet` 變數知道它的位址，所以不需要再寫一個 name property 去參照它
-  在上面的例子中，`function() {...}` 是函式表達式 => <span class="highlight">被執行時會讓函數被創造出來，會回傳一個函數物件</span>

因為是一行一行執行，用 anonymousGreet 去指向函式位址，在還沒有被賦值之前就呼叫的話，會報錯
```javascript
anonymousGreet() // error! 

const anonymousGreet = function() {
    console.log('hello')
}

anonymousGreet() // 變數已經指向它的位置，可以呼叫
```

---

<br/>

##### by value 和 by reference 基本觀念

1. **by value**

在建立 primitive type 的變數，會是用拷貝 value 的方式，拷貝 a 的值填到 b 位址。
```javascript
var a = 3 // 0x001
var b
b = a     // 0x002
```
在不同記憶體位置上，彼此不會互相影響

2. **by reference**

將變數 c 設立成一個 Object，用 **object literal** 的方式指定物件的值，那麼就會是 by value、一樣會在記憶體中給它個位置。
```javascript
var c = { greeting: 'hello'} // 0x001
```
但如果今天要把變數 c 的值等同於 d 時，因為 `=` 運算子知道 c 是指向物件，它不會創造新的記憶體位置給 d，而是讓 d 指向跟 c 一樣的地方
```javascript
var d
d = c  // 0x001
```

而參數，同樣會是用 by reference 的做法，如果將 d 作為參數傳進下方的函式，d 和 c 自身都會被改變
```javascript
function changeGreeting(obj) {
    obj.greeting = 'hola'
}
changeGreeting(d) // 同樣改變 d 和 c
```


參考資料：[談談 JavaScript 中 by reference 和 by value 的重要觀念](https://pjchender.blogspot.com/2016/03/javascriptby-referenceby-value.html)


---

<br/>
<br/>