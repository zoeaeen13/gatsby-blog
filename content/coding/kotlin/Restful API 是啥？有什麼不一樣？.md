---
title: Restful API 是啥？有什麼不一樣？
type: coding
category: Android
tags: [Kotlin, API]
description: 認識 API、HTTP 協定和方法
date: '2020-03-10'
---

> 什麼是 API？

全名 Application Programming Interface，是讓第三方可以開發、應用在自身的溝通介面，幫助開發者能夠和外部互動的接口就是 API。常常聽到 Restful API 這個名詞，那它到底是什麼？和一般 Web API 的差異又有哪些？這麼做有哪些好處呢？筆記一下！

在解釋 Restful API 前，我們先來認識一下 HTTP 協定和它的請求方法：

### HTTP 協定
全名 Hypertext Transfer Protocol（超文本傳輸協定）為了讓客戶端和伺服器端的要求回應的規格統一，而出現的一定規範
* 客戶端 Client side：發送要求 Request
* 伺服器端 Server side：接收 Request，給出回應 Response


#### HTTP Method 請求方法

常見有 GET / POST / PUT / DELETE 幾種方法，正好會對應到資料庫基本操作 CRUD 增刪查改

簡單來說，**不同的 Method 就是對同一件事情做不同的操作**，例如讀取和上傳資料就是不同的動作，自然會用呼叫方法的差異來設計

| 請求方法 | 使用 |狀態 |
| -------- | -------- |  -------- | 
| GET | 讀取特定資源或集合 |safe & idempotent|
| PUT | 完整更新資源。如果識別碼是已知的，也可用於創建特定資源 |idempotent|
| PUTCH | 在現有的資料欄，增加或**部分更新**一筆資料||
| POST | 創建新資源 |
| DELETE | 通過識別碼刪除/刪除特定資源 |idempotent|

> PATCH 和 PUT 的差別在於，PATCH 並不是把原有的資料全部取出然後針對要更新的部分修改再送回，而**僅送出要修改部分**的參數

---

**HTTP方法狀態描述**
* safe
該操作本身就不會改變原本的資源狀態，不論請求一次或多次都只是讀取，並且同樣的結果是可以被快取（Cache）
* idempotent
指 Client 端的該操作不管做一遍、兩遍或多遍，都會得到同樣的資源狀態結果，即對 server 端的影響結果不變


更詳細的資料，請參考[這篇](https://progressbar.tw/posts/53)或[ HTTP 協議的Idempotent Methods](https://matthung0807.blogspot.com/2019/02/http-idempotent-methods.html)

---

### Restful API

REST，全名 Representational State Transfer（具象狀態傳輸）是一種設計風格，Restful 只是轉為形容詞，Restful API 則是形容以此規範設計的 API。

目的是幫助在世界各地不同軟體、程式在網際網路中能夠互相傳遞訊息。而每一個網頁都可視為一個資源（Resource）提供使用者使用，通過通用的介面（Interface）對資源進行操作

* Resource：資源
* Representational：表現形式，如 JSON，XML
* State Transfer：狀態變化。即上述講到的可利用 **HTTP 動詞**來做呼叫動作

簡單來說，Restful API 是讓人能看懂，能單從一個 HTTP 要求所包含的資訊，預期會收到的資料型態。


**一個 Resource 由一個 global identifier（即URI）所表示**
每一個網頁都可視為一個資源提供使用者使用，以資源操作的概念（指對某項 Resource 指派動作），結合 url path 與 HTTP Method，

> 為了操作這些資源（Resources），網路的 components（即 clients 跟servers）透過標準化的介面（即 HTTP）來溝通並交換這些資源的 representations


#### RESTful API 三種組成
1. Nouns 名詞
定義資源位置的 URL，每個資源在網路上都會有**唯一位置**，就如每戶人家都有唯一的地址一樣
2. Verbs 動詞
對資源要做的動作，例如常用動作有 GET / POST / PUT / DELETE
3. Content Types
資源呈現方式，API 資源可以以多種方式表現，最常用的是 JSON，較輕量、也好處理

```java
//以前的一般API
獲得資料GET    /getData
新增資料POST   /createData
刪除資料DELETE /deleteData/1


//RESTful API
獲得資料GET     /data
新增資料POST    /data
刪除資料DELETE  /data/1
```

用一個唯一的 URL 定位資源，將不同動作藏在 HTTP 的方法裡面

---

#### RESTful API 優點

* 統一 API 接口：唯一 URL 表示 Resource 資源位置
以往的一般 API 可能會分別向 A、B、C 三者請求，從不同的對方來完成動作，RESTful API 的優點是，是讓上述不同的請求動作由同一位完成</br>

* 使 url path 更為簡潔、容易被理解

* 無狀態 (stateless) 
處理請求的必要狀態包含在請求本身內，例如 Client 端需自行保存狀態，請求 Server 的時候，一併附上給 Server 端</br>

* 使用 URI 作為資源標識符的請求中標識各資源
即所有資源可以用 URI 定位，而且這個定位與其他資源無關，也不會因為其他資源的變化而變化，資源相互的依賴性降低</br>


#### URI 名詞
URI 由 prefix + API endpoint 組成。API endpoint 的設計重點：
* 一般資源會用複數名詞
* 唯一資源（即對於 client 而言只有一份的資源）用單數名詞。例如 user 就是指目前使用者
* 資源的層級架構。例如 `/books/123/chapters/2`


#### Status Code 狀態碼
* 2xx = Success（成功）
* 3xx = Redirect（重定向）
* 4xx = User error（客戶端錯誤）
* 5xx = Server error（伺服器端錯誤）

HTTP 狀態碼表明一個 HTTP 要求是否已經被完成，代表 **API 層的執行狀態**，回應分為五種：資訊回應、成功回應、重定向、用戶端錯誤及伺服器端錯誤。

以下記錄遇過的幾種狀況，另可參考[這篇](https://tw.twincl.com/programming/*641y)：

* `400 Bad Request` 伺服器因為收到無效語法，而無法理解請求
* `401 Unauthorized`  指用戶端尚未驗證，也就是unauthenticated 需要授權以回應請求，有點像 403，但這裡的授權是有可能辦到的，之前接 API 經驗是有可能為"**拼字錯誤**" （Bearer 要大寫）
* `403 Forbidden`
無訪問權限，例如已經驗證過、但未被授權，所以伺服器拒絕給予應有的回應。不同於 401，伺服端知道用戶端的身份

* `404 Not Found` 
伺服器找不到請求的資源，可能是**路徑錯誤**

* `429 Too Many Requests`
用戶在給定的時間內（rate limiting）發送了過多的請求。用 **ngrok 會有一分鐘 40 次的限制**，之前做 side-project 曾設定錯誤的發送間隔，把合作後端的兩支 API 都打爆...

* `500 Internal Server Error`
伺服器端發生未知或無法處理的錯誤



#### 參考資料
1. [API 是什麼? RESTful API 又是什麼?](https://medium.com/itsems-frontend/api-%E6%98%AF%E4%BB%80%E9%BA%BC-restful-api-%E5%8F%88%E6%98%AF%E4%BB%80%E9%BA%BC-a001a85ab638) 
2. [什麼是 REST? RESTful?](https://medium.com/@cindyliu923/%E4%BB%80%E9%BA%BC%E6%98%AF-rest-restful-7667b3054371)
3. [休息(REST)式架構? 寧靜式(RESTful)的Web API是現在的潮流？](https://progressbar.tw/posts/53)
4. [什麼是 REST 跟 RESTful?](https://ihower.tw/blog/archives/1542)