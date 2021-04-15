---
title: 新手上路，如何接 API 呢？
type: coding
category: Android
tags: [Kotlin, API]
description: 學習從 Retrofit 2 下手
date: '2019-11-11'
---

近期挑戰賽需要接 Api，來練習 Retrofit

### 使用 Retrofit
由 Retrofit 2 封裝，後續交由 OkHttp 進行請求操作，操作攔截的話如 Time out 還是在 OkHttpClient 設定
* Retrofit 2 則是遵循 RESTful 的 Http 框架進行封裝
* 網路請求的動作主要由 OkHttp 進行

先看過這些資料再去嘗試：有哪些接 api 的文章可以參考
1. [Retrofit 2 起手式](https://medium.com/%E5%B7%A5%E7%A8%8B%E5%B8%AB%E6%B1%82%E7%94%9F%E6%8C%87%E5%8D%97-sofware-engineer-survival-guide/retrofit-2-%E8%B5%B7%E6%89%8B%E5%BC%8F-212644f33a9a)
2. [這是一份很詳細的 Retrofit 2.0 使用教程](https://blog.csdn.net/carson_ho/article/details/73732076)
3. [Retrofit 操作教學](https://medium.com/@givemepass/retrofit-%E6%93%8D%E4%BD%9C%E6%95%99%E5%AD%B8-26c7851ec154)
4. [Retrofit 網路請求學習筆記](https://www.jianshu.com/p/8203238b4a1d)

</br>

#### 加入第三方資源
[OkHttp 3](https://square.github.io/okhttp/)、[Retrofit2](https://square.github.io/retrofit/) 最新版本參考

```java
implementation 'com.squareup.retrofit2:retrofit:2.6.0'
implementation 'com.squareup.retrofit2:converter-gson:2.6.0'
implementation 'com.squareup.okhttp3:okhttp:4.2.1'
```

裝攔截器，debug 時很方便

```java
implementation "com.squareup.okhttp3:logging-interceptor:4.0.1"
```

#### 開啟網路權限

```java
< uses-permission android:name=”android.permission.INTERNET” />
```

---

### 1. 創建 Retrofit 單例物件

#### 將呼叫 Api 寫成一個全域實例
>一個類只有一個實例，並且該類提供了全域訪問

參考 [Android 設計模式：單例模式](https://code.tutsplus.com/zh-hant/tutorials/android-design-patterns-the-singleton-pattern--cms-29153)，了解很多時候我們都只需要物件的一個實例，像是快取記憶體、OkHttpClient、HttpLoggingInterceptor、Retrofit、Gson、SharedPreferences 和倉庫類等。如果這些類產生多個物件實例，就會遇到許多問題，比如異常的 APP 反應，資源過度使用和其他混亂結果。

```java
object API {
    //by lazy 在需要用到時才建立，只會初始化一次
    val apiInterface: Api_Interface by lazy {  
    
    //攔截器，用以debug (非必要)
    val logging = HttpLoggingInterceptor()
    logging.level = (HttpLoggingInterceptor.Level.BODY)
    
    //建立OkHttpClient
    val myOkHttpClient = OkHttpClient.Builder()
        .readTimeout(10, TimeUnit.SECONDS)
        .addInterceptor(logging)
        .build()

    //retrofit實體
    return@lazy Retrofit.Builder()
        .baseUrl("http://104.155.209.122")  //網址
        .client(myOkHttpClient)
        .addConverterFactory(GsonConverterFactory.create())  //解析Json
        .build()
        .create(Api_Interface::class.java)   //http的請求接口
    }
}
```

#### addInterceptor 攔截器
* 印東西 [Logging Interceptor](https://github.com/square/okhttp/tree/master/okhttp-logging-interceptor)
可以做什麼？
塞東西進去每一個網路請求，可以印出內容如下，印出類型選擇：NONE、BASIC、HEADERS、BODY 等等，代表內容的詳盡程度
![](https://i.imgur.com/6InYSXl.png)

* 夾帶 `@Header`
也可以塞入 Header 類型，這樣每一個網路請求就會帶著，比如 Content-Type、Accept 甚至是 Authorization 
![](https://i.imgur.com/yOj1CAd.png)

那麼在請求接口，就不需要每一個都加上 @Header

```java
    @GET("/api/tags")
//註解 fun showMagic(@Header("Authorization") token: String): Call<MagicList>
    fun showMagic(): Call<MagicList>
```

</br>

#### 請求接口 Api Interface
創立 Http 的請求接口，例如 `@GET` 和 `@POST` 用法，了解 `@Body` 和 `@Query` 參數作用。

該怎麼理解 Interface？
可以想像成一般資料是由後端提供，那前端就要去接這個資料，在 Interface 這個中介站裡面完成溝通，所以需要填入請求的類型、請求的參數、要求返回的資料等等。

可以看到下方寫了三個函式，不同的 url 對應不同的網路請求，有些需要帶特定參數（例如某個 Int 值或 < xxRequest>）有些則不用，要求的回傳資料則用< xxResponse>去接，這個是我們自定義的 Data class，下一步會進行說明：

```java
interface Api_Interface {
    @GET("/api/playerGameStatus")   //url
    fun gameStatus(): Call<PlayerResponse>  //要求回傳資料格式<PlayerResponse >

    @POST("/api/enterGame")
    fun enterGame(@Body enterRequest: EnterRequest): Call<EnterResponse>
    
    @GET("/api/playerGameAnswer")
    fun bomb(@Query( "playerId" ) playerId:Int): Call<BombResponse>
```

</br>

### 2. 定義資料格式

和後端溝通所需的資料型態，以便於對接。如果要接的資料長這個樣子，可能還比較好拆解：
![](https://i.imgur.com/0Q8Hnll.png)

但如果今天看到要接的 API 長這樣，可能有些難以進行：

![](https://i.imgur.com/h3xiidC.png)

這時我們可利用一些小工具來完成資料格式：
* 開 Postman 查看
* 線上版 [JsonEditorOnline](https://jsoneditoronline.org/)
![](https://i.imgur.com/hzZv6YZ.png)

* 安裝 [JSON To Kotlin Class](https://plugins.jetbrains.com/plugin/9960-json-to-kotlin-class-jsontokotlinclass-) 套件
在 Android Studio 點選左上角 code>> generate>> Kotlin Data Classes from JSON（或直接鍵盤 alt+K）直接生成格式
![](https://i.imgur.com/5MvgY9L.png)

</br>

把請求參數 **Request** 和回傳資料 **Response** 的格式寫好，就是用來填入請求 Call 的資料格式

```java
data class EnterRequest(
    val enterTime: Int,
    val name: String,
    val position: Int
)
data class EnterResponse(
    val endTime: String,
    val playerId: Int,
    val players: List<PlayInfo>,
    val yourName: String
)
```

</br>

### 3. 在 Activtiy.kt 實作接後端資料（異步請求）

執行 Call function 的 **enqueue** 方法，需帶入 Callback 處理回傳結果，從回傳結果（onResponse）裡面可拿到 Service 回傳的資料

```java
enqueue(callback: Callback)
```

要注意，用這方法 OkHttp 是自行產生一個執行緒，在裡面執行 Call 的 execute 方法（參考[這篇](https://ithelp.ithome.com.tw/articles/10207954)）

>不需要自己另開 Thread 來執行請求，Callback 也會在該 Thread 中執行。
但若需變更 UI 介面就需要用 runOnUiThread 方法由主執行緒處理。

</br>

通常我們需要的資訊會在 Response 的 body() 喔！

```java
API1.apiInterface.gameStatus().enqueue(object: Callback<PlayerResponse>{
    override fun onFailure(call: Call<PlayerResponse>, t: Throwable) {
        println("=============$t")
    }

    override fun onResponse(call: Call<PlayerResponse>, response: Response<PlayerResponse>) {
        if (response.code() == 200){
            val responsebody = response.body()   //資料就在放在body()
            println("=============$responsebody")
        }
    }
})
```

</br>

#### 🔨使用 http 會被 Android Studio 擋下的問題

如果發送請求一直不過，除了沒開網路權限，還要查看是不是印出以下內容，可能因安全性問題被擋下
```java
UnknownServiceException: 
CLEARTEXT communication to f5234a33.ngrok.io not permitted by network security policy
```
第一種方法就是先開 Postman 查看能不能自行加 s 來解決這個問題
有些自行更成 https 可以過關，有些卻不行

那麼，在不麻煩後端的情況下，可以透過一些設定來修改Android Studio 預設，參考這篇 [http 网络请求的问题](https://www.jianshu.com/p/57047a84e559)來解決
1. 在 res 下新增一個名為 xml 資料夾，然后建立一个.xml 文件，取名 network_security_config

```java
< ?xml version="1.0" encoding="utf-8"?>
< network-security-config>
    < base-config cleartextTrafficPermitted="true" />
< /network-security-config>
```

![](https://i.imgur.com/hOnRc6k.png)

2. 在Manifest 的 **application 標籤**增加属性 `networkSecurityConfig`

![](https://i.imgur.com/i2IyuXI.png)

</br>

---

#### Tips

* 最好在 onFailure 和 onResponse 印出來內容，如果出錯可以看到是什麼原因
* 設條件 `response.isSuccessful` 或判斷狀態碼 `response.code() == 200`，通常 onResponse 有好幾種回傳結果
* onResponse 其實會處理 200~500 的 **ErrorResponse**
* 接到 `response.body()` 之後，再節選做成自己需要的資料就行
* 發生錯誤等非 200 的狀態，是無法從 `response.body()` 取得資料，要從`response.errorBody() 拿
* 非網路回傳的狀態處理，透過 onFailure 的 callback，參考[關於Retrofit的其他小事情](https://medium.com/@jefflin1982/android-%E9%97%9C%E6%96%BCretrofil%E7%9A%84%E5%85%B6%E4%BB%96%E5%B0%8F%E4%BA%8B%E6%83%85-587609eb27e5)

