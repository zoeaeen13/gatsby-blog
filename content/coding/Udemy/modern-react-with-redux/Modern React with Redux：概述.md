---
title: 'Modern React with Redux：概述'
type: coding
log: 'log'
category: Modern React with Redux
tags: [React, Udemy]
description: '基本觀念、開始建立專案及 React 和 ReactDOM 差別'
date: '2021-06-11'
---

#### Overview

一般初始化 React 專案，會看到這幾行程式碼

```javascript
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

ReactDOM.render(<App />, document.getElementById("root"))
```

`App` 是 React 元件（Component）

元件，用來產出 JSX 語法和處理事件綁定，JSX 是 JavaScript 的一種形式，長得和 HTML 元素很像，用來告訴 React 我們希望呈現的畫面內容

![](https://i.imgur.com/KCW5AQH.png)

回傳 JSX 的時候，React 會去檢視每一個元素：
- 如果是一般的 DOM element，到時會在畫面上創建一個對應的 DOM 元素，像是 `<div></div>` 
- 如果是 component，就再往該函數裡面檢視它的內容，像 `<App />` ，會用 opening 和 closing tag 包住函數名稱（組件名稱都是大寫開頭），會產生 component instance

![](https://i.imgur.com/a6pFPnt.png)

![](https://i.imgur.com/nLGZp11.png)


這些 JSX 沒辦法直接渲染在瀏覽器上，JSX 和 ES6 一樣，需要先經過 webpack+babel 轉譯，所有的 app.js、react.js...會形成一個 JavaScript 檔，才被 `./public` 裡面的 index.html 引用

![](https://i.imgur.com/6StGQqQ.png)

---

需要引用 react 和 react-dom 兩個 library，他們分別有不同的作用

- React

協調器，呼叫組件函數、取得所有的 JSX，決定是渲染 DOM element 或創造一個個組件

- ReactDOM

渲染器，負責處理 JSX，將其轉化成 HTML 展示，和瀏覽器及真實的 DOM 互動
 
最早在 v0.14 之前是沒有 ReactDOM 的，所有功能都包含在 React library 裡面，而分開的原因很簡單，因為後來出現了 ReactNative，於是兩者拆分出來，React library 只包含通用的核心部分，跟 Web DOM 有關的操作就被移到了 ReactDOM library 中

> `ReactDOM.render` 裡面的參數

- 第一個參數，是調用組件函數（通常是 `<App />`）、拿到 JSX
- 第二個參數，決定在 index.html 裡的哪個元素來展現內容

![](https://i.imgur.com/6A9HxeZ.jpg)


---

#### 建立專案

- `npm`：套件管理器，可以將大量的開源專案安裝到自己的專案上
- `install`：sub command
- `-g`：全域
- `create-react-app`：套件名稱，用來產生新的 React 專案

![](https://i.imgur.com/jA6uaOk.png)

```html
npm install -g create-react-app
create-react-app [my-project-name]
```


官方文件是提供以下指令來建立專案，不過可能因 node 過舊而出現版本問題

```javascript
npx create-react-app [my-project-name]
```

---

<br>
<br>

> 初始檔案結構

`/src` 主要開發的地方，開始的預設檔案可以刪掉

`/public` 放置靜態檔案 static files

<br/>


> 基本的 index.js

1. 引入需要的 library
2. 建立 component 組件
    - 可以是 Class 或 Function，他們目的都是產出 JSX
    - 進行事件處理
3. 將其渲染到畫面上，使用 `ReactDOM.render()` 方法

```javascript
// Import the Rract and ReactDOM libraries
import React from "react"
import ReactDOM from "react-dom"

// Create a react component（function based component）
const App = function() {
    return <div>Hi!</div>
}

// Take the react component and show it on the screen
ReactDOM.render(
    <App />,
    // create component instance
    document.querySelector("#root")
    // render inside the <div id="root"></div> element
)
```

![](https://i.imgur.com/W8L4uJy.png)