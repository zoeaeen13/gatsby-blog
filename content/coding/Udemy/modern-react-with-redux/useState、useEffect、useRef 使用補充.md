---
title: '補充 useEffect、useRef 使用'
type: coding
category: Modern React with Redux
tags: [React, Udemy]
description: 'useEffect 的清理機制、不能放 async function？及 React 事件監聽執行順序'
date: '2021-07-09'
---


Hooks 提供 functional component 可以擁有狀態、類似生命週期的方法

![](https://i.imgur.com/qI4UX9i.png)


---
<br>

#### useEffect
```javascript
useEffect(() => {
  // 要執行的程式碼
}, [])
```
有三種方法可以配置 useEffect 使用，達到生命週期的作用
1. 第一次渲染元件時執行
2. 第一次渲染時、或任何時候 re-render 完執行（不放第二個參數）
3. 第一次渲染時、或在某些數據改變時才執行


![](https://i.imgur.com/dmzIXYt.png)

useEffect 第二個參數是一陣列，裡面放的東西不同，將控制什麼時候執行程式碼。如果放多個元素，只要任一改變就會觸發


<BR>

##### Q: useEffect 裡面放 async function？

注意 useEffect 要執行的程式碼，不能直接寫 async function

```javascript
const [term, setTerm] = useState('')

useEffect(async () => {
  await axios('XXX')... // 🔴
}, [term])
```

可透過以下幾種方式解決：
1. 在 useEffect 裡面定義一個 async function 執行
2. 把 async function 變成 IIFE，立即調用（和上面差不多）
3. 使用 Promise

```javascript
const [term, setTerm] = useState('')

// #1 設一個 helper function
useEffect(() => {
  const search = async () => {
    await axios.get('XXX')
  }
  search()
}, [term])


// #2 和 #1 差不多，只是少掉變數宣告
useEffect(() => {
  (async () => {
    await axios.get('XXX')
  })()

}, [term])

// #3 promise chain
useEffect(() => {
  axios.get('XXX')
  .then((response) => {
    console.log(response.data)
  })

}, [term])
```
---
<BR>

##### Q: useEffect 的 cleanup function 怎麼使用？

常碰到一個情境：使用者停止輸入後，等幾秒才送出搜尋，避免短時間發出多個 request，也就所謂「延遲請求」。

延續上例，可以在 term 改變後設定計時器，每 500 毫秒去 call 一次 API 搜尋，而流程會像下圖，第一次 input 改變時設定一個計時，第二次 input 在 500 毫秒以內改變就取消上一個計時，重新設定下一個...

![](https://i.imgur.com/RAMXi8H.jpg)

使用 setTimeout 創建計時器， setTimeout 會返回一個數字或整數標示計時器，可以利用 clearTimeout 來清除它，這樣裡面的程式碼就不會執行

```javascript
useEffect(() => {
  const search = async () => {
    await axios.get('XXX')
  }
  
  // 每次延遲 500 ms 發出請求
  setTimeout(() => {
    if (term) {
      search()
    }
  }, 500)

}, [term])
```

**但是，清除的時機點是什麼？**

在 useEffect 裡面，只能回傳一個特定類型的值，就是 function，也是所謂的清理函數 `cleanup function`，而它的清理功能

- 會在元件從 UI 中移除之前運行
- 元件渲染多次時，每次執行 useEffect 主要程式碼之前會運行

```javascript
useEffect(
  // main function
  () => {
  const search = async () => {
    await axios.get('XXX')
  }
  const timeoutId = setTimeout(() => {
    if (term) {
      search()
    }
  }, 500)
  
  // cleanup function
  return () => {
    clearTimeout(timeoutId)
  }
}, [term])
```

第一次渲染時，會執行整個 arrow function 的內容，並 return 一個清理函數，React 會將清理函數保留起來。

當要再次執行 arrow function 內容時，React 會先調用清理函數（第一次執行時返回的東西），接著才執行 arrow function，然後回傳清理函數，順序如下

![](https://i.imgur.com/EsMAc3m.png)


---
<BR>

#### useRef 使用
利用 Refs 系統，訪問由 JSX 所產生真正的 DOM element，代替 `document.querySelector` 使用。

ref 是一個 JS 物件，有一個 current 屬性會指向其綁定的 DOM 節點，之前在 class componenet 裡面就是用 `React.createRef()` 設定，在 Hooks 裡面也有提供類似的 useRef 方法。

以設計下拉選單為例，實作點擊頁面其他部分要收起選單：
首先，第一次渲染下拉元件時，在 useEffect 為 body 添加 click 事件監聽，理想來說，當事件最後冒泡到 body 就會執行關閉選單？
```javascript
useEffect(() => {
    document.body.addEventListener('click', () => {
        setOpen(false)
    })
}, [])
```

然而，Dropdown 元件中會執行到 setOpen 的還有其他點擊事件，以為是按照冒泡的順序由下往上傳遞，但實際順序卻和想像不太一樣。

> 因執行順序問題，竟然發生又打開選單的狀況？

**在 JSX 元件上面綁的監聽器，是通過 react 來連結，使用原生 JS 寫法連結的事件反而最先被調用**，所以正確執行順序如下，當點擊 Dropdown 選項時：

```javascript
1 用 addEventListenr 綁定的事件
2 子元件綁定的 click 事件
3 父元件綁定的 click 事件
```


![](https://i.imgur.com/GELW4iO.png)


所以，要排除 click body 的某些情況，可以使用 useRef 去參照到下拉選單的 DOM 元素

```javascript
useEffect(() => {
  document.body.addEventListener('click', (event) => {
    // 確認目前點擊的元素是否在 Dropdown 裡
    if (dropDownRef.current.contains(event.target)) return
    setOpen(false)
  })
})
```


注意監聽器的清理，當元件從 DOM 上消失時，所有添加到內部元素的 ref 會被設定成 null（因為沒有東西可以引用了），但是監聽器仍然存在，有可能造成 `null.current.contains` 的 error

養成良好習慣，記得利用上面提到的 useEffect 清理功能，當元件從畫面上移掉時，關閉監聽器

```javascript
useEffect(() => {
    const onBodyClick = (event) => {
        if (dropDownRef.current.contains(event.target)) return
        setOpen(false)
    })
    
    document.body.addEventListener('click', onBodyClick)
    
    // cleanup function
    return () => {
        document.body.removeEventListener('click', onBodyClick)
    }
})
```



> ###### 補充
React v17 之後，監聽器要加上第三個參數 => `{ capture: true }`，參考 [Fixing Potential Issues](https://reactjs.org/blog/2020/08/10/react-v17-rc.html#fixing-potential-issues)
