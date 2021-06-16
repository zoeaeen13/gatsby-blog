---
title: 'CH4/5：Class Component 和 State System'
type: coding
category: Modern React with Redux
tags: [React, Udemy]
description: '使用 Class Component 的不同、State 的初始化及更新'
date: '2021-06-15'
---

在 Hook System 還沒有出現時，早期的 functional component 是沒辦法擁有 state，只能用來展示一些固定的內容，資料往往由父層 props 傳入、在創建的時候 data 已經被決定好了。

<br>

##### 為什麼需要 Class Component？

執行 React 專案時，首先 JS file 被瀏覽器載入，這時候 App component 會被創建，裡面的程式碼一一被執行，然後才是回傳 JSX、被 ReactDOM 渲染到畫面上。

如果那些程式碼是非同步的話，就得用 callback function 才能處理，但結果返回的時候，畫面往往已經渲染完畢，這時候，如何才能跟 component 溝通、去更新畫面呢？

我們需要 class component 來做狀態管理。

它不但可以像 functional component 一樣產生 JSX，還擁有生命週期方法，讓我們能在特定時間點執行程式碼，另外也具備「state system」來管理狀態，可以方便更新畫面。


---

<br>
<br>

在改寫 functional component 為 class component 時，有幾點要留意：
1. 一定是 JavaScript 的類別
2. 一定要繼承 `React.Component`（extends）
3. 一定要定義 `render` 方法，也就是元件要回傳的 JSX

```javascript
// functional component
const App = () => {
  return (
    <div>Hi</div>
  )
}

// class component
class App extends React.Component {
  render() {
    return (
      <div>Hi</div>
    )
  }
}
```
使用 `class` keyword 將在 JS 創建類別，而定義一個 React component 類別，需要讓它繼承 `React.Component`，在 `React.Component` 裡面提供很多方法、我們不需要自己寫，因為繼承的關係能夠直接借用過來（原型繼承）。

我們依照程式的需求再來決定要使用哪些方法，但在 `React.Component` 中有個 subclass 是一定要實作的，就是定義 component 該怎麼渲染的 `render` 方法，和原本寫 functional component 的 return 很相像，都是用在回傳元件需要的 JSX。


---

<br>

#### React State System

- 只有 class component 才能擁有 state（~~這點在 React 16.8 之後被打破~~）
- 初學者容易把它和 props 混淆
- state 是一個 JS 物件，會存放和元件有關的 data
- state 要在創建元件時就被初始化
- state 只能透過 `setState` 方法更新，不能用一般 JavaScript 習慣的賦值
- 更新 state 狀態會促使 component 重新渲染 => 換句話說，想要讓畫面變動，要透過 `setState` 方法來更新 state


<br>

##### 初始化 state

state 要在創造元件時就被初始化，這樣在 `render` 方法就能使用到變數，之後的某個時間點同樣也可以用 `setState` 進行更新來重新渲染。

而要做到這一點，在 JavaScript 中有一個會隨著 class 一同建立並初始化物件的特殊方法、會在進行其他事情之前先被自動調用，很適合拿來初始化 state，那就是 **constructor**（構造函數）。

<br>

> **constructor 構造函數**

參考「 [為什麼我們要寫 super(props) ](https://overreacted.io/zh-hant/why-do-we-write-super-props/)」，當你呼叫 constructor 建構子後、參數帶入父層傳遞的 props，JavaScript 規定必須先呼叫 super function，才能使用 `this`。

原因是，我們現在是借用 `React.Component` 的方法，當我們在 App 裡面呼叫 constructor 時，實際上正在覆蓋掉 `React.Component` 原本的 constructor 設置，為了要確保那些設置可以被正常使用，才會呼叫 super => 指示它去參照父類別的 constructor。

```javascript
super(props)  // 是對父類構造函數的引用
```

在 super 被呼叫前，JavaScript 不允許我們去使用 `this`，是為了避免遇到以下這種情況：

例如：在還沒有設置前就先被呼叫
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}

class PolitePerson extends Person {
  constructor(name) {
    this.greetColleagues(); // 🔴 不被允許
    super(name);
  }
  greetColleagues() {
    alert('My name is ' + this.name + ', nice to meet you!');
  }
}
```

帶入 props 也是類似的形式，讓 constructor 初始化 `this.props`，接下來也可以設置狀態，創建一個 state 物件指派給 `this.state` 變數
```javascript
// React 內部
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { lat: null } // 初始化 state 才會用 assignment
  }

  render() {
    return (
      <div>Latitude: {this.state.lat}</div>
    )
  }
}
```
---

<br>

##### 更新 state

一般跟渲染無關的操作，不會將程式碼寫在 `render` 方法裡面，因為 `render` 方法很常被呼叫，為了避免重複取得執行結果，通常不會將邏輯寫在這裏。

初始化的話，除了之後介紹的生命週期方法，也可以寫在 constructor 裡面：
- 假設有狀態 lat 和 errorMessage 兩個，分別會在獲得不同的結果時更新
- 不需每次更新全部屬性，可以**只針對我們要調整的值**，它不會移除屬性

```javascript
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { lat: null, errorMessage: '' }
    
    window.navigator.geolocation.getCurrentPosition(
        (position) => {
          // call setState method if updating
          this.setState({ lat: position.coords.latitude })
        },
        (err) => {
          // error handling
          this.setState({ errorMessage: err.message })
        }
    );
  }

  render() {
    return (
      <div>Latitude:</div>
    )
  }
}
```

總結，目前流程如下
1. 瀏覽器加載 XML 文件，請求 JavaScript file 然後執行
2. 創建 App
3. class component 先調用的是 `constructor` 函數，呼叫 super 引用 `React.Component` 設定
4. 初始化狀態，創建 state object 並指配給 `this.state` 這個特殊的變數
5. 執行 render 方法，回傳 JSX
6. 如果需要更新狀態，得呼叫 `this.setState` 這個內建的特殊函式，傳入新的狀態
7. 在 `this.setState` 後，React 自動會知道我們已經更新屬性，立即重新渲染元件


<br>

其他參考資料： [Understanding Constructors with React Components](https://www.digitalocean.com/community/tutorials/react-constructors-with-react-components)