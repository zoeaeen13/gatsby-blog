---
title: 認識 JS 型別
type: coding
category: 程式導師計畫
tags: [JavaScript,Lidemy]
description: Primitive type（基本型別）和 Object types（物件型別）
date: '2020-07-03'
---
**變數沒有型別，值才有。**

JavaScript 型別的資訊只在值或物件本身，變數只用來作為取得值或物件的參考。型態主要有兩種，分成 Primitive type（基本型別）和 Object types（物件型別）。

---
---

#### 一、Primitive type 基本型別
內建型別（Built-in Types），只是一個值、並不是物件（物件是名稱 + 值的組合），Primitive 具有不可變的特性，分為以下幾種

| 型別 | 名稱 | 用意 |
| -------- | -------- | -------- |
| undefined | 還不存在 | 這是 JavaScript 給所有變數的初始值，還沒變數定義 |
| null | 其東西不存在 | 指一個不存在的或無效的物件（object），可以使用 null，不是使用 undefined |
| Boolean  | 布林值 | true 和 false 其中一個可能 |
| Number | 數字型別 | JS 只有一種數值型態，就是 number，除了整數和小數字外，特殊數字有 Infinity（無限大）、 -Infinity（負無限大），以及 NaN（不是數值，Not a Number） |
| String | 字串 | 代表文字資料 |
| symbol |符號 | 被使用在 ES6 或 ECMAScript 6，還在建造中，沒被全部瀏覽器支援 |

---
---

#### Object types
物件型別，物件與其子型別（subtype），例如：物件、陣列、函式等等，物件可以看作是一個用來裝數值的容器：
* Object 物件
* Array 陣列
* Function 函式
* Date 日期時間
* RegExp 正規表述式

Array 使用數值化「索引」來儲存值，而非如 Object 是使用屬性來儲存值。Function 函式是指一段程式碼片段，可藉由呼叫其名稱來執行它，可簡化重複進行的工作、包裝特定功能的程式碼。

---
---

> #### Primitive type 和 Object type 大不同
##### 1. Immutable 特性
在 Primitive Type 它是會回傳一個新的，而不是改變它自己，在對 String 做操作的時候要特別注意這些型別的內建函式
```js
var str = 'hello';
str.toUpperCase();   
console.log(str);    // hello

var arr = [1];
arr.push(2);
console.log(arr);    // [1, 2]
```

##### 2. 賦值的陷阱
Primitive Type 存的是值，Object 會先給定一記憶體位置，再去讀取裡面的值
```js
var obj = {
    number: 10,
};

var obj2 = obj;
console.log(obj, obj2);  // 10, 10

obj2.number = 20
console.log(obj, obj2)   // 20, 20
```
要搞清楚重新賦值 `=`和 `.` 的差別
```js
var obj = {
    number: 10,
};

var obj2 = obj;
console.log(obj, obj2);  // 10, 10

// 先給 [30] 一個位置，再把 obj2 換掉記憶體位置，所以兩者指的是不同的位置
obj2 = [30]
console.log(obj, obj2)   // 10, 30
```


#### 資料型別轉換
可以使用 `typeof` 來檢測值的資料型別為何
```js
typeof 'Hello World!'; // 'string'
typeof true; // 'boolean'
typeof 1234567; // 'number'
typeof null; // 'object'
typeof undefined; // 'undefined'
typeof { name: 'Jack' }; // 'object'
typeof Symbol(); // 'symbol'
typeof function() {}; // 'function'
typeof [1, 2, 3]; // 'object'
typeof NaN; // 'number'
```
#### Q: 更多 typeof 使用情境？
有時候會被拿來檢查：變數有沒有被使用到
```js
if (typeof a !== 'undefined') {
    console.log(a);
}
```

#### Q: null 為什麼是 object？它是基本型別嗎？
null 是基本型別之一，但 typeof null 卻得到 object，而非 null！這可說是一個 bug
```js
typeof null         // object (bug in ECMAScript, should be null)
typeof undefined    // undefined
null === undefined  // false  ( === 會判斷類型)
null == undefined   // true   ( == 會執行類型轉換)
```

#### Q: function 是物件的子型別，但 typeof `function() {}` 是得到 function 而非 object？
和陣列依舊得到 object 不一樣，在 JavaScript 覺得 function 太特別了，所以另外給它獨有的回傳值。

<BR>

#### Q: 怎麼檢測陣列？
```js
Array.isArray(H)  //判斷H是不是Array
```
<BR>

#### Q: NaN 表示是無效的數字，但依舊還是 number？
NaN 在 JavaScript 當中是個有趣的存在，字面上來說它不是個數字，但你若用 typeof 運算子來判斷型態，它又會告訴你這是個 number。

不要被字面上的意思「不是數字」（not a number）給弄糊塗了，它依然是數字。另外 NaN 與任何數字運算都會得到 NaN，並且 NaN 不大於、不小於也不等於任何數字，包含 NaN 它自己。

```js
var a = Number('hello');  // 沒辦法轉，會變成 NaN
console.log(a === a)      // NaN
console.log(isNaN(a))     // true，可以用 isNaN() 方法來檢測
```

#### Q: 到底 undefined 和 not defined 差在哪？
在 console 時偶爾會遇到這兩種值，完全是不同的意義
* undefined → 有宣告這個變數，但沒有定義所以沒有設定值
* not defined → 無法參照，代表錯誤，沒有這個變數存在

<BR>

#### Q: 其他的檢測方式？
```js
object.prototype.toString.call(要檢測的東西)
```
* 檢測網站：https://dorey.github.io/JavaScript-Equality-Table/

<BR>

#### Q: 為什麼永遠都用 === ？
因為 `==` 會涉及型態轉換，所以最好的方式就是都用 `===`

而 `===` 永遠只有在兩者**指向同一個記憶體位置**時才會成立，它並不是在比較兩個的值，是比較他們的位置，這也是為什麼 `console.loe([] === [])` 會是 **FALSE** 的原因，因為他們實際上是存到不同的記憶體位置

### 參考資料：
1. [JS基礎：Primitive type v.s Object types](https://medium.com/@jobboy0101/js%E5%9F%BA%E7%A4%8E-primitive-type-v-s-object-types-f88f7c16f225)
2. [JavaScript ：Primitive Types 純值(基本型別)介紹](https://dotblogs.com.tw/susan_code/2017/07/06/162049)
3. [你懂 JavaScript 嗎？#4 型別（Types）](https://cythilya.github.io/2018/10/11/types/)
4. [資料類型(值)](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part3/datatype.html)