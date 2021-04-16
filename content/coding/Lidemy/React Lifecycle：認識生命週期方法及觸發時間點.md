---
title: 'React：認識生命週期方法及觸發時間點'
type: coding
category: 程式導師計畫
tags: [React,Lidemy]
description: 元件從準備、渲染到頁面、狀態更新後等各個階段，組成了所謂的 lifecycle
date: '2020-12-05'
---
> 什麼是 Component 的生命週期？

不同於 function component，class component 是一個物件，裡面有許多內建函式，他們分別對應一個元件從準備、渲染到頁面、狀態更新後重新渲染、從頁面上移除前......等各個階段（時間點），組成了所謂的 Lifecycle。

這些 Lifecycle 方法，讓我們得以掌握元件的生命週期，在開發過程中某些特定時刻能執行我們需要的程式，例如載入完元件後才去非同步抓取資料，更新 props 觸發處理事件。

---

#### 一、生命週期各個階段
##### #1 Mounting 階段：會在元件被建立時被執行
當一個 component 被建立且加入 DOM tree 中時，其生命週期將會依照下列的順序呼叫這些方法：
* constructor()
* static getDerivedStateFromProps()
* render()
* componentDidMount()


##### #2 Updateing 階段
當 prop 或 state 有變化時，就會產生狀態更新。當一個 component 處於更新階段，其生命週期將會依照下列的順序呼叫這些方法：

* getDerivedStateFromProps()
* shouldComponentUpdate()
* render()
* getSnapshotBeforeUpdate()
* componentDidUpdate()

##### #3 Unmounting 階段
當一個 component 被從 DOM 中移除時，以下方法將會被呼叫：
* componentWillUnmount()


##### #4 錯誤處理
當一個 component 在 render 過程、生命週期、或在某個 child component 的 constructor 中發生錯誤時，會呼叫以下方法處理：
* getDerivedStateFromError()
* componentDidCatch()

![](https://iamian.cc/static/56e1ae1a077d66ecc3899de3eec3e5d6/acfc1/react-life.png)

---


#### 二、常用的生命週期方法

##### 1. constructor
會在 mount 之前被呼叫，用來建構並初始化物件，這邊繼承 `React.Component`，當你需要初始化 state 或綁定方法時，才需要實作它。建立 constructor 時，你應該先呼叫 `super()`，帶入 props 參數，否則 `this.props` 的值會出現 undefined 問題。

參考 [Why Do We Write super(props)?](https://https://overreacted.io/why-do-we-write-super-props/) 一文，super 會繼承父類別（指 React.Component），當我們呼叫過後，它才會配置 `this.props = props`，這時才能在建構子中使用 this。

```jsx
constructor(props) {
  super(props);

  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```
* 只有在 constructor 裡面才可以指定 `this.state` 值，其它地方則需要使用到 `this.setState()` 方法
* constructor 裡面只用來設置初始化和綁定方法
* 不要做任何會產生 side effect 或 subscription 的事，那些應該在渲染完之後進行，例如使用 `componentDidMount()`

> **Q: 常見錯誤：直接複製 prop 的值到 state 中！**

```jsx
constructor(props) {
 super(props);
 this.state = { color: props.color }; // don't do that!å


  // 1. 多此一舉，可以直接用 this.props.color
  // 2. 產生 bug，prop 產生的更新根本不會出現在 state 中
  // 3. 不能讓 state 依賴 prop
}
```

##### 2. render
`render()` 是 class component 中唯一一個**必須實作**的方法。

當 render 被呼叫時，它將會檢視 this.props 和 this.state 中的變化，並回傳透過 JSX 建立的 React element、Fragment、Portals 或 null，也就是說使用 setState 方法、更新父元件傳遞的 props，都會執行到 `render()`。

* pure function
* 不會改變 component 的 state，每次呼叫時都會回傳同樣的結果
* 不會直接和瀏覽器有所互動

>**Q: 更新狀態一定會呼叫到 render 嗎？**

大部分都會，唯一的例外情況是當 `shouldComponentUpdate()` 回傳的值為 false 的話，render() 將不會被呼叫到。

##### 3. componentDidMount
在 component 被加入 DOM tree 中後，`componentDidMount()` 會馬上被調用。

可以在該方法裡面呼叫 `setState()`，雖然會觸發一次額外的 render，但是是在瀏覽器畫面更新之前發生，使用者不會看見兩次 render 中過渡時期的狀態，只是可能導致效能上問題。
* 執行 ajax，適合進行網路請求
* 設定 subscription
* 綁定 DOM 事件

##### 4. componentDidUpdate
```jsx
componentDidUpdate(prevProps, prevState, snapshot)
```

用途和 componentDidMount 相似，區別在於它是用在 Updating 階段，可以在這裡寫
1. 對 DOM 進行運作的處理
2. 網路請求

記得設定條件，例如比較前後的 prop，不然每次重新渲染都執行一遍，很影響效能


##### 5. componentWillUnmount
在 component 要從畫面上被移除前（unmount）馬上被呼叫，在這個方法內進行任何狀態的清除，像是取消計時和網路請求或是移除監聽。

常用的生命週期方法大概就這幾種，其它比較少用的可以參考這篇 [React.Component](https://zh-hant.reactjs.org/docs/react-component.html) 和 [State 和生命週期](https://zh-hant.reactjs.org/docs/state-and-lifecycle.html) 有詳細的介紹與範例。


---

### 三、元件渲染順序
* Mounting
父元件先執行到 `render()` 後，再來開始執行子元件的 Mounting 生命週期，最後執行完子元件的 `componentDidMount()` 後，再回頭執行父元件的 `componentDidMount()`

* Updating
父元件執行到 render 後，換子元件執行直到 `getSnapshotBeforeUpdate()`，會再回父元件執行 `getSnapshotBeforeUpdate()`，然後再執行子元件的 `componentDidUpdate()`，再回父元件執行 `componentDidUpdate()`

* UnMounting
父元件先執行 componentWillUnmount，再來是子元件執行


### 參考資料
* [React.Component](https://zh-hant.reactjs.org/docs/react-component.html)
* [React Life Cycle 生命週期更新版，父子元件執行順序](https://https://iamian.cc/reactlife/)