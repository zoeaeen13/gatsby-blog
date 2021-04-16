---
title: React：Class component 與 Functional component 的差別
type: coding
category: 程式導師計畫
tags: [React,Lidemy]
description: 談談兩者在渲染、效能、生命週期實現的異同
date: '2020-12-10'
---
在 hook 出來以前，其實就有 class component 和 function component 兩種寫法，不過當時只有前者可以擁有 state 和 lifecycle，function component 只用來單純呈現資料，內容寫死或是透過 props 傳入。

但是，**hook 的出現改變了一切**，解決了 function component 不能擁有 state 的問題，也變相讓它擁有類似生命週期方法的操作。[前面](../React：認識 Hooks)已經分別介紹過生命週期和 hook，以下就他們的差別：


#### 1. 兩者在渲染上的差別
function component 就是一個單純回傳 JSX 的函式，而 class component 是一個繼承 `React.Component` 的 JS 物件，它裡面必須調用一個 `render()` 方法，這個方法會回傳 JSX。

#### 2. props 傳遞
```jsx
<Component name="Molly" />
```
* 在 function component 是作為引數 props 傳入
* 在 class component 因為是物件，呼叫 `constructor()` 來建構並初始化，使用 this 來引用

```jsx
// function component
const FunctionComponent = ({ name }) => {
 return <h1>Hello, {name}</h1>;
};

// class component
class ClassComponent extends React.Component {
  constructor(props) {
  super(props);
}
  render() {
    const { name } = this.props;
    return <h1>Hello, { name }</h1>;
 }
}
```

#### 3. 如何處理 state
在以前 funciton component 是沒有狀態的，直到 `useState` 這個 hook 出現解決了這個問題，我們得以寫成 **stateful** function component。

參考 [React hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)，以 hook API 將元件的行為/狀態和它本身連結起來，利用陣列去做狀態管理，當呼叫 `useState` 時，會傳入初始值，然後回傳一個陣列，陣列裡面分別是狀態的 value 和它的 setter function：

1. 初始化時，建立兩個空陣列 setters 和 state，設定指標為 0
2. 第一次渲染時，會將 setter function 和一個指標位置放到 setters 陣列，狀態放到 state 陣列
3. 每次更新渲染，指標就會重置，然後根據指標（cursor）去讀取陣列裡的值
4. 每一個 setter 都有一個指標位置，所以觸發 setter 的時候就會去變更陣列中對應 state 的值

之所以「**不能在條件式或迴圈調用 Hook**」，正因為它是依賴 cursor 來取得陣列中的值，如果改變了順序那麼資料和 setter 就不對

#### 4. 優化效能提升
* class component：即使狀態沒變化，只要調用到 setstate 就會觸發重新渲染
* function component：會進行檢測，只有狀態值真正改變時，才會觸發渲染，換句話說就是提升了整體效能

#### 5. 生命週期方法的實現
不像 class component 是繼承 `React.Component`，function component 沒辦法擁有那些內建的生命週期方法，例如 `componentDidMount()` 來處理 side effect，我們會希望在更新 DOM 之後執行我們的 effect，像是網路請求資料、設定 subscription 和 event handler 或手動改變 DOM 等等。

###### * 無需清除的 Effect
在 React 更新 DOM 之後執行一些額外的程式碼。網路請求、手動變更 DOM、和 logging，直接執行，就不用再去記得它

* class component：將 side effect 放入 `componentDidMount()` 和 `componentDidUpdate()`

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

// 因為希望在 mount 和 update 階段都會發生（每次 render 後），這裡得寫兩次
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    ...
  }
}
```
* funciton component
在元件之內呼叫，透過使用這個 Hook，你告訴 React 你的元件需要在 render 後做一些事情。React 將記住你傳遞的 effect，並在執行 DOM 更新之後呼叫它。

    - 在 component 內部呼叫 useEffect，**可直接存取到 state 和 props**，因為它已經在 function 範圍內了，且 **React 保證 DOM 在執行 effect 時已被更新**
    - 雖然預設 DOM 更新後呼叫，也可以透過 useEffect 第二個參數的設置來優化效能，規定比對條件才執行，而不是每次重新渲染就呼叫
    - 使用多個 Effect 來分離關注點
    - 想執行一個 effect 並且僅（在 mount 和 unmount 時）將其清除一次，則可以傳遞一個空 array（`[]`）作為第二個參數 => effect 不依賴於任何 props 或 state 的值，因此它不需要重新執行


```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    ...
  );
}
```

> **Q: 每次 render 後都會執行 useEffect 嗎？**

把 useEffect 視為 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 的組合，與其把 useEffect 考慮在 mount 或 update 階段都執行，不如認為它是每次 render 後就執行。

###### * 需要清除的 Effect
有些設定對某些外部資料來源的 subscription，需要進行清除，以免造成 memory leak
* class component：寫在 componentWillUnmount 方法裡面，在元件移出畫面前清除

```jsx
componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
}
```
* function component：可選的清除機制

每個 effect 都可以選擇是否回傳一個會在它之後執行清除的 function。我們可以把新增和移除 subscription 的邏輯保持靠近，因為它們都屬於同一個 effect！

```jsx
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // 指定如何在這個 effect 之後執行清除：
    return function cleanup() {
      ChatAPI.unsubscribeFromStatus(props.friend.id, handleStatusChange);
    };
  });
```

> 2020/01/08：補充 @minw 助教的解答

- class component 是透過 ES6 Class 語法來實作基於 OOP 的元件
- function component 則是利用閉包來管理狀態

前者由於 this 並非 immutable，導致 state、props 都會是最新的結果，對於一些 callback 操作的處理會比較複雜，例如：setTimeout；而後者則由於不需要使用 this、且保持 function 的特性讓**共同邏輯更容易抽取出來共用**，容易測試。

當然，前者提供更多 lifecycle 方法讓比較複雜的元件狀態更好管理。

---

### 參考資料
* [React.Component](https://zh-hant.reactjs.org/docs/react-component.html)
* [【Day 8】Class component && Functional component](https://ithelp.ithome.com.tw/articles/10214751)
* [Understanding Functional Components vs. Class Components in React](https://www.twilio.com/blog/react-choose-functional-components)
* [React Hooks 不是黑魔法，只是陣列](https://andyyou.github.io/2019/07/29/hooks-not-magic-just-arrays/)

