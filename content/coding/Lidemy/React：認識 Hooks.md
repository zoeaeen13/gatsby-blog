---
title: React：認識 Hooks
type: coding
category: 程式導師計畫
tags: [React,Lidemy]
description: Hook 是一種重複使用邏輯的方法，讓 function component 可以擁有 state 的功能。
date: '2020-12-07'
---
###什麼是 Hook？
Hook 是一種重複使用邏輯的方法，能用來在不同的 Component 之間重複使用邏輯，也讓 function component 擁有 state 或 class component 的功能。
* 不能在迴圈、判斷式、或是嵌套 function 中呼叫 Hook
* **只在 React function component 呼叫 Hook**（自定義的 Hook 也是），不要在一般 JavaScript function 中呼叫 Hook，因為這關連到它們連結的問題
* Custom Hook：指的是用 `use` 開頭的方法，且有呼叫到其他 Hook，等於說可以將好幾種功能封裝在一起

---

>**Q: React 怎麼知道哪個 component 對應哪個 state？ Hooks 如何與 component 關聯？**

每一個 component 有一個「memory cell」的內部列表。

它們是我們可以放入一些資料的 JavaScript object，當你呼叫像是 `useState()` 的 Hook，它會讀取目前的 cell（或因為是第一次 render 而初始化它），每次重新渲染的時候都可以從這個地方拿到該狀態，並將指標移動到下一個 state，讓 function Component 可以保存自己的狀態。

就算多個 `useState()` 的呼叫，它們都能取得自己獨有的 local state。

---

###1 內建 Hook：useState
```jsx
const [state, setState] = useState(initialState);
// 會回傳一個 state 的值（value），以及更新該 state 的方法（setter function）
```
* 呼叫用途：宣告了一個會被 React 保留的變數
* 參數：唯一的參數要放初始值，可以是 string、number、object 各種型態
* 回傳：一對數值，目前的 state 值和可以讓你更新 state 的方法（可以從 event handler 或其他地方呼叫它來更新），setState 方法接收先前的 state，並回傳一個已更新的值

```jsx
import React, { useState } from 'react'; // destructuring

function Example() {
  // 宣告一個新的 state 變數「count」及更新變數的方法是「setCount」
  const [count, setCount] = useState(0);

  return (
    ...
    );
}
```

從 React 引入 `useState` Hook API，呼叫它是用來在 function component 裡面保留 local state。

舉例來說，在 `<Example />` 元件中我們呼叫了 useState 去宣告一個名為 count 的變數，一般情況下，變數會在 function 結束時就消失，但 state 變數卻會被 React 保留起來，即 React 在 re-render 元件時仍會記住目前的值，保留著這些 state，讓 function component 可以管理它的內部狀態，使用 setCount 方法將會更新 count 的值，給一個 newState 直接取代。

在一個 Component 之中可以宣告多個 State，不再需要把各種無關的 State 硬是列在同一個 Object，操作 setState 時也不用同時考慮所有狀態該如何調整。

注意：由於 **setState 並非即時更新、是非同步的**，因此接下來也會用別的 hook 來解決這個問題。

<BR>

> **補充：initialState**

initialState 參數只會在初始 render 時使用，在後續 render 時會被忽略。
如果初始 state 需要通過複雜的計算來獲得，你可以傳入一個 function，它回傳的東西將成為初始值，只在初始 render 時被調用：
```jsx
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```
> **跳過 state 更新**

如果 React 偵測到 state 值有所變化就會 re-render 該元件，反之如果還是傳入一樣的值，React 將會跳過子元件的 render 及 effect 的執行，不過它還是需要在跳過 render 之前先渲染它本身的 Component。

---

###2 內建 Hook：useEffect
```jsx
useEffect(didUpdate);
// 傳入一個指令
```

預設情況下，`useEffect` 會在每一個完整 render 結束後執行裡面的程式碼。

###為什麼要呼叫 useEffect
使用這個 Hook，React 就知道你的 component 在 render 後要做什麼事情，而在 component 內部呼叫 useEffect，讓我們可以拿到 state 和任何 props。

有一些操作，比如網路請求、監聽事件、訂閱、或手動改變 DOM 等「side effect」，他們可能會影響其它元件，或是在 render 期間還不能觸發的操作，都會被寫在 `useEffect` 裡面，等到 DOM 更新之後才去執行的程式碼。

###每次 render 完都要呼叫嗎
但每次 render 就執行一次，並不符合實際上的應用，我們可以選擇讓它在某些值改變的時候才執行，類似監聽某個值的變化來設定 useEffect 執行條件。

參考 [有條件的觸發 effect](https://zh-hant.reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect)，如果它的依賴有改變才會觸發 `useEffect`，確認 array 裡有包含：
1. 所有在該 component 中會隨時間而變的值（例如 props 和 state）
2. 在該 effect 中使用到的值

```jsx
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],  // 只有當 props.source 改變時才會重新建立 subscription
);
```

> **補充：初始化使用**

如果想要 effect 只執行和清除一次（就是 mount 和 unmount 的時候），比如只會在第一次 render 要呼叫的 API，我們可以在第二參數傳遞一個空陣列 （`[]`），意思是，`useEffect` 沒有依賴任何在 props 或 state 的值，所以它的條件不會改變，它永遠不會被再次執行。


###useEffect 的回傳用途：清除 effect
當元件要被 unmount 時，我們需要清除 effect 所建立的資源時，同樣是使用 `useEffect`，回傳一個 function，告訴 React 在移除元件前要如何「清理/處理」舊的資源
```jsx
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the subscription
    subscription.unsubscribe();
  };
});
```
---

###3 內建 Hook：useContext
讓你不需要巢狀化就可以訂閱 React context，再也不用透過 render props 來得到 value，useContext 則是接收一個 Context 然後直接回傳 Context 裡面的資料。

先在最上層 Component 以 `createContext` 建立一個 Context Component ，並將要傳遞的資料放到它的參數，接著在下層元件或者更下層，便能直接將 Context Component 傳給 useContext，進而取得 value 裡的資料。這個做法解決了：
1. 透過 Props 傳遞資料時常常會經過太多層的問題（Props drilling）
2. 明明不需要該筆資料的 Component 卻擁有資料的情況

```jsx
// 建立一個 Context
const ContextStore = React.createContext({
  todos: []
})
// 使用 ContextStore
function Application() {
  return (
    <ContextStore.Provider value={{todos: ['run']}}>
      <Todos />
    </ContextStore.Provider >
  )
};
```
```jsx
// Todos
function Todos() {
  const value = React.useContext(ContextStore)
  
  return (
    <React.Fragment>
      {
        value.todos.map(todo => <div key={todo}>{todo} </div> )
      }
    </ React.Fragment>
  )
}
```

---

###4 內建 Hook：useRef
主要有兩個功能，一個是存放 mutable 的值，一個是可以抓取 DOM 節點。

###1. 存放可變的值
跟使用 useState 的改變值區別在於，它不會導致 re-render。useRef 回傳一個可變的 ref object，它的 `.current` 屬性被初始化為傳入的參數，回傳的 object 在元件的生命週期都將保持不變。

```jsx
const refContainer = useRef(initialValue);
```
###2. 抓取 DOM
useRef 更多的應用，是可以作為讓我們抓取到 DOM 節點的 hook。

呼叫 useRef 建立出一個物件實體，null 表示初始值設定為 null，將建立好的物件丟入我們要抓取的 DOM 元素的 ref attribute 中，做完這件事可以想像成我們對這個 input 有了控制權，`<input />` 的 DOM 透過 ref 存進 inputRef。

```jsx
const inputRef = useRef(null);
<input ref={inputRef} placeholder="Please input somthing"/>
```
對現在綁定的 DOM node 做操作，需要到 `.current` properity 中
```jsx
// 有了 useRef 就可以做到例如頁面刷新後自動 foucs 在某個欄位
const handleClick = () => {
	inputRef.current.focus();
}
```
---
###5 內建 Hook：useMemo、useCallback 和 memo

在 function Component，容易觸發重新渲染，如果遇到大型的網站，有大量的元件、子元件不斷被 re-render，將造成瀏覽器的重大負擔。而要進行 React 優化，最常見就是透過 useMemo()、memo 和 useCallback() 來搭配使用。

###1. memo

父層狀態變了，底下的每個子元件都會做 re-render，就算它依賴的 props 或 state 沒有改變，React 提供了 `memo` 來幫助我們解決這個問題，**它是專用於 Component 的方法**。

將元件用 `memo` 包起來， memo 會幫忙檢測它的 props 是否有變動，減少元件被渲染的機會，讓 React 幫我們記住原本的 props。
```jsx
cosnt MemoButton = memo(Button)
```
然而，`memo` 是利用 shallowly compare 的方法確認 props 的值是否一樣， shallowly compare 在 props 是 Number 或 String 比較的是數值，基本型態的值不受影響，但當 props 是 Object 時，比較的卻是記憶體位置（reference）。正因為父元件重新渲染時，在父元件宣告的 Object 是會被重新分配記憶體位址，我們在這時候利用 `memo` 來防止重新渲染就會失效。

所以，`memo` 也有提供了第二個參數，讓我們可以自訂比較 props 的方法。

###2. useCallback 使用
除了上述方式，可以利用 `useCallback()` 讓 React 可以自動記住 Object 的記憶體位址
```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
裡面如果傳的是會重新產生的 object 或 function，就是記憶體可能變動的東西，用 `useCallback` 去把該他們包裹，React 幫你記憶起來，用法和 useEffect 有點像，第二個陣列參數放要偵測變動的東西（dependency），在父元件重新渲染時，不重新分配記憶體位址，而造成子元件重複渲染。

而常常讓人搞混的 `useMemo()`，其實和父元件無關，它主要用在讓複雜的程式碼或運算，不要在重新渲染時再次執行。
```jsx
cosnt s = useMemo(() => {
    return {
        color: value? 'red': 'blue',
    }
}, [value]) 
```
---



##參考資料
* [Hook 概觀](https://zh-hant.reactjs.org/docs/hooks-overview.html)
* [使用 State Hook](https://zh-hant.reactjs.org/docs/hooks-state.html)
* [Hooks API 參考](https://zh-hant.reactjs.org/docs/hooks-reference.html#usecontext)
* [使用 Effect Hook](https://zh-hant.reactjs.org/docs/hooks-effect.html)
* [React Hooks (上)-useState&useEffect](https://medium.com/@Lieutenant1992/react-hooks-%E4%B8%8A-usestate-useeffect-37f45056fea8)
* [Day 24】 useRef](https://ithelp.ithome.com.tw/articles/10221937)
* [React 性能優化那件大事，使用 memo、useCallback、useMemo](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-optimize-performance-using-memo-usecallback-usememo-a76b6b272df3)

