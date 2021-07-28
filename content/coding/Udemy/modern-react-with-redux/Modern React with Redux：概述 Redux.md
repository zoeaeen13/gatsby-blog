---
title: 'Modern React with Redux：Redux 基本用法'
type: coding
category: Modern React with Redux
tags: [React, Udemy]
description: ''
date: '2021-07-28'
---

React 主要用來處理顯示與使用者互動，不是專門用來維護及更新數據，所以很適合搭配 Redux，如果把 Redux 的流程想像成一間保險公司：

![](https://i.imgur.com/ZBbWEkV.png)

```javascript
1. 用戶填寫表格，申請投保、理賠、解約（action creator）
2. 每一張表格都是一個（action）
3. 統一轉交給特定人（dispatch）
4. 表格會派送到各部門受理（reducers）
5. 根據表格內容對不同業務做處理，這些會被統一更新到公司的數據中心（store）
```


- Action Creator：用來創建 JavaScript 物件的 function
- Action：這個 JS 物件會包含兩個屬性： type 和 payload，type 表示我們要對資料做的操作、payload 則是該操作要帶上的參數
- Dispatch：負責轉交 action 的人（和 Redux 溝通的關鍵）
- Reducer：處理資料的 function，可以想像 reducer 是一個個負責不同業務的部門，會接收一個 action 和目前 state，然後根據 action 類型來決定哪一個部門要做事情
- Store：公司的數據中心，每個部門（reducer）創建時的初始資料會被整合到 Store 裡面的 state object，而更新完的資料也會同步到這裡，不用一一去各部門查看

Store 是集中保存數據的地方，整個 App 只會有一個 Store，Redux 提供 `createStore` 這個函數，用来生成 Store。

```javascript
import { createStore } from 'redux';
const store = createStore(fn);
```

要和 Store 溝通，只能透過它提供的少數方法進行操作
- 使用 getState 來獲得資料
- 使用 dispatch 將 action 派送給 Store

```javascript
// 通過 getState() 拿到 Store 裡面的 state object
const state = store.getState()


// 使用 dispatch() 將指令送到 Store
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
}
store.dispatch(action) 
```

Store 在收到 action 後，會計算並返回一個新的 state，這個計算過程就是 reducer。

要使用 store.dispatch() 來觸發 Reducer 的自動執行，在一開始生成 Store 時我們就要將 reducers 作為參數傳入 `createStore` 方法，想像成是註冊 => 讓 Store 知道有哪些 Reducer 函數。

因為整個 Store 只會有一個 state object，裡面包含各式各樣的屬性，不同 Reducer 函數會負責生成不同的 state，為了避免龐大的程式碼，Redux 有提供一個 `combineReducers` 方法用來拆分 Reducer。

只要定義各個子 Reducer 函數，然後用這個方法將他們合成成一個大的 Reducer 就好，根據 State 的 key 去執行對應的子 Reducer，並將結果合併成一個大的 state object 更新。

```javascript
import { createStore, combineReducers } from 'redux'

const ourDepartments = combineReducers({
    accouting: accouting,         // 會記部門
    claimsHistory: claimsHistory, // 理賠部門
    policies: policies,           // 行政部門
})

const store = createStore(ourDepartments)
// 可以將不同的 state 整合一起
// 透過不同的 key name 形成不同的 property，儲存在 store
```

使用 Redux 的好處是，只會有少量方法可以修改到數據，雖然一開始設置很複雜，不過隨著專案變大、數據來源多樣，複雜程度不會像純用 React 到後期會面臨難以管理的問題。

---

<br>

#### 在 React 中使用 Redux
安裝 Redux 和 React-Redux，裡面有很多輔助函數/元件，協助結合兩者
```javascript
npm install --save redux react-redux
```

參考 [Redux 入门教程（三）](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)，React-Redux 將元件分成兩類別
- UI 元件（presentational component）
- 容器元件（container component）

<br>

> container component 負責管理資料和邏輯，如果一個元件除了要顯示 UI、同時又兼具邏輯部分，會被拆分成這樣的架構：「**外層是容器元件，裡面包了一個 UI 元件，前者負責和外部的溝通，將資料傳給後者來顯示**」

從這層觀點切入，來看 Provider 和 Connect 元件的話，就不那麼難理解他們的用法了：

1. 首先在 Store 裡面已存放所有的 state 和 reducers，我們從 react-redux 引入新元件 Provider，將 Store 引用傳給它

```javascript
// index.js
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from "./components/App"
import reducers from "./reducers"

ReactDOM.render(
    <Provider store={createStore(reducers)}>
      <App />
    </Provider>,
    document.getElementById("root")
)
```

這樣一來，所有在 Provider 下面的元件會默認可以從其拿到 Store 裡面的 state，只要讓 Provider 包在根元件外面！原理是利用 React 的context system 🔸，允許父層和底下的子元件直接聯繫、就算中間隔了好幾個元件。

<br>

2. 接著在子元件設置上，使用 connect 函數來讓 UI 元件生成為容器元件

```javascript
import { connect } from 'react-redux'
export default connect()(TodoList)
```

connect 函數會需要接受參數來定義邏輯部分，設置與 Store 的溝通

- 輸入邏輯：外部資料（state object）如何轉換為 UI 元件的參數
- 輸出邏輯：使用者的操作如何轉換成 action，從 UI 元件傳遞給 Store


```javascript
import { connect } from 'react-redux'

const default connect(mapStateToProps, mapDispatchToProps)(TodoList)
```

第一個參數 mapStateToProps

定義 UI 元件如何取得 state object 裡面的資料，映射轉換為它的 props。如果省略 mapStateToProps 參數的話，UI 元件就不会訂閱 Store，也就是說 state 的更新不會引起 UI 上的變化。

```javascript
const mapStateToProps = (state) => { // 拿到 state 參數
  return { songs: state.songsReducer}
}

export default connect(mapStateToProps)(SongList)
// 定義 SongList 元件要從 store 拿的資料，可以不用是全部的 state
// 在 SongList 元件的 props 上會多一個自定義的屬性"songs"
```

第二個參數 mapDispatchToProps

要定義使用者的哪些操作會作為 Action 發送給 Store，將他們映射為 props 來給 UI 元件使用，可以是 function、也可以是 object
```javascript
// function 的話，會得到 dispatch 參數
const mapDispatchToProps = (dispatch) => {
  return {
    addFeatures: (feature) => dispatch(addFeatures(feature)),
    removeFeatures: (feature) => dispatch(removeFeatures(feature)),
  }
}
```

物件的話，其實就是放 Action Creator

```javascript
// 原本 selectSong 只是一個普通函數，沒有和 Redux 串在一起
import { selectSong } from '../actions'

export default connect(mapStateToProps, {
    selectSong: selectSong
})(SongList)
```
直接呼叫 Action Creator 是沒有作用的，只會做為普通的函數執行，Redux 不會沒事通靈、知道你正在調用 Action Creator，所以才要**額外透過 connect 連結起來**。

想更新 State，就得調用 dispatch function 發送到 Store，而這邊透過 connect 連結起來，它會查看第二個參數裡面帶的物件，將物件裡面的函數包裝成另一個 JS function，等於會先自動調用 dispatch，執行發送到 Store。

![](https://i.imgur.com/Rt3fl9p.png)



> 最後補充

所謂 connect 語法，說白了是返回一個函數，我們再接著呼叫這個返回函數，傳入自定義的 UI 元件
```javascript
function connect() {
    return function() {
         return 'hi there!'
    }
}

connect()() // 'hi there!'
``` 

使用 connect 方法後，實際上還是得到元件，不過會擁有一些額外的邏輯設置，可以和 Provider 進行溝通，一旦 Store 的資料有所改變就會自動通知 connect，connect 會將 Store 的東西傳到我們自定義的元件。


---

<br>
<br>

本篇旨在整理 Modern React with Redux 第十七章的內容，非完整的教學文，建議搭配其他資料學習
- [Redux 入门教程（一）：基本用法](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
- [Redux 入门教程（三）：React-Redux 的用法](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)
