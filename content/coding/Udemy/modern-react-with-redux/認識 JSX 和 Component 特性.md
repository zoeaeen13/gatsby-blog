---
title: '認識 JSX 和 Component 特性'
type: coding
log: 'log'
category: Modern React with Redux
tags: [React, Udemy]
description: 'JSX 和 HTML 的差別、認識 Component 的複用性與巢狀結構'
date: '2021-06-14'
---

#### 認識 JSX
前面說過元件會回傳 JSX，JSX 不是新的語言，它只是 React 提供的語法糖，開發 React 並不一定要使用 JSX，它只是讓我們能更方便、快速建立 HTML 內容（並非真的在撰寫 HTML），瀏覽器是無法辨識 JSX 的，所以需要經由 babel 轉換成正常的 JavaScript 來執行。

用 https://babeljs.io/ 進行測試，可以發現這段 JSX 會被 babel 變成下面的形式

**呼叫 React.createElement 方法**
1. 第一個參數，要創建的元素類型，例如 div、input、img 等等
2. 第二個參數，object，放入該元素的屬性
3. 第三個參數，元素裡面要放的內容 text

```javascript
// before
const Button = () => {
	return <button type="button">submit</button>
}

// after babel
const Button = () => {
  return React.createElement(
      "button",            // the type of element
      { type: "button" },  // the properties of element
      "submit"             // the text to show inside the element
  )
}

```

---

<br />

#### 和 html 的不同

1. **添加樣式的方式**
    - 要寫 inline-style 得使用 `{{}}`，外層括號表示要在 JSX 引入 JavaScript 變量
    - 內層括號，放 JavsScript 物件
    - JSX 內的標籤、名稱等一般字串是用雙引號，對於非 JSX 的變數建議使用單引號

![](https://i.imgur.com/LinjW1d.png)

2. **不要使用 class、for 或某些屬性名稱**

React 會查看元素的一些屬性

偶爾你可能會在 devTool 看到 `invalid property` 的提醒字樣，這是因為那些字在 JavaScript 中屬於 keyword，像是 class、for 等等，為了避免衝突所以一律使用 `className`、`htmlFor` 及其他 React 建議的文字代替

<br>

3. **可以引用 JavsScript 的變量，用 `{}` 包裹起來**

基本上在 JSX 裡面要使用到 JavaScript 變量，就是用 `{}` 來標示，可以放入變數、甚至放執行 function 後的結果

```javascript

function getTime() {
    return (new Date()).toLocaleTimeString()
}

const App = () => {
    return (
        <div className="container">
            <div>Current Time:</div>
            <h3>{getTime()}</h3>  // 使用 getTime 執行的結果作為變量
        </div>
    );
}
```
---

<br/>
<br/>

#### component 的三個特性

![](https://i.imgur.com/5cl40K4.png)

> ###### Component Nesting


1. 將 JSX 拆出來變成一個元件，給予一個好的、有意義的名字
2. 在 `./component` 資料夾底下新建一個檔案來寫，檔名和元件名稱一樣（都以大寫開頭）
    - 寫好元件，把它 export 出去
    - 在 import 時，後面不需要加上 .js 或副檔名，webpack 會自動幫你處理這塊
    ![](https://i.imgur.com/eWBbo67.png)
    - 不用另外寫 `{}`，在一個元件裡面放另一元件時只需要使用 JSX tag 包起來

![](https://i.imgur.com/skLnC5o.png)

---
<br>

> ###### Component Configurable

當 `App` 是用來顯示下面的 `CommentDetail`、或說 `CommentDetail` 被崁套在 `App` 時，我們會稱上層是父元件、下層的是子元件，這就是元件的層級架構（Component Hierarchy）。

![](https://i.imgur.com/jW2r5xx.png)

而「**Props(Properties) System**」指的是將 data 從父元件傳遞到子元件的機制，讓子元件的顯示內容和行為可以被父元件決定：

1. 父元件提供東西給子元件

跟設定 HTML 屬性很相像，在元件上寫 props 名稱及它對應到的 value，可以自行定義 props 的名稱，像是 `author="Sam"`、`author="Alex"`

每個子元件都是獨立存在，有同樣的屬性名稱，但接受到父層傳遞不同 value，並不會跟其他子元件共用，當我們使用 JSX tag 創建子元件時，實際上是創造一個新的 compoenent instance。

```javascript
const App = () => {
  return (
    <div>
      <CommentDetail author="Sam" />
      <CommentDetail author="Alex" />
      <CommentDetail author="John" />
    </div>
  )
}
```

<br>

2. 子元件接收父層的東西

function component 第一個參數是名為 `props` 的物件，裡面放著從父元件傳遞過來的所有資訊，以 key-value 形式存在，可以直接拿、或是先經過解構

```javascript
const CommentDetail = (props) => {
  console.log(props)  // { name: 'Sam' }
  return (
    <div>
      <p class="comment__name">{props.name}</p>
    </div>
  )
}
```

---

<br>

> ###### Component Reusable


還有另一個特別的屬性，同樣能傳遞東西給到子元件。

當今天 component 不是使用 self-closing tag，而是有嵌套其他元素或元件時，它裡面包裹的東西會以「children」屬性存在 props 中，所以我們能利用這項特性，做到抽換內容、讓元件重複使用。

```javascript
const ApprovalCard = (props) => {
  return (
    <div>
      <div class="card__conttent">
          {props.children}  // 會是 ComponentDetail 這個元件
      </div>
      <button class="card__green_btn">Agree</button>
      <button class="card__red_btn">Reject</button>
    </div>
  )
}

const App = () => {
  return (
    <ApprovalCard>
      <CommentDetail
        author="Sam"
        content="Nice blog post!"
        avatar={faker.image.avatar()}
      />
    </ApprovalCard>
  )
}
```


其他參考資料：[React 和 ReactDOM 的區別](https://www.cnblogs.com/chenwenhao/p/12548263.html#_label0)
