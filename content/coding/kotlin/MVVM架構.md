---
title: Android - 第一次 MVVM 就上手
type: coding
category: Android
tags: [Kotlin, MVVM]
description: 了解 Model-View-ViewModel 觀念，與 MVC 架構的不同之處、LiveData 特性及使用方式
date: '2020-03-04'
---
最近專案使用到 MVVM 架構，這裡實作一個簡單的範例，記錄學習。


> 所謂 MVVM，是 **Model、View、ViewModel** 的簡稱

* **Model**
管理資料來源，包括取得、更新資料等操作，資料來源可以是 Web API 或本地 SharedPreference
* **View**
指 Activity、Fragment 及 xml，這些屬於頁面（View），也就是處理顯示 UI 及與使用者互動。
* **ViewModel**
接收 View 的請求，並從Model取得資料。ViewModel 不會持有任何的UI實體。

</br>

為什麼要使用 MVVM 架構？
作為初學，可以簡單理解 MVVM 是進行「**關注點分離**」，讓頁面（View）與該頁面的邏輯處理部分徹底切隔開來，不會全部寫在一起，不再像以前一樣將接受通知、請求資料、UI 更新、整理 response 等全擠在同一 Activity 裡面。

這麼做好處很多，比如...**旋轉頁面**時資料不會輕易消失！

---

為什麼可以做到？來看一段網上資料講解 MVVM 實作

>通過 Activity/Fragment 持有 ViewModel，而 ViewModel 持有各類 LiveData，Activity/Fragment 註冊觀察需要的數據,實現數據與 UI 的同步，而且不會因此發生 Activity 洩漏，甚至可以用 ViewModel 來進行 Activity/Fragment 之間的通訊

是不是有看沒有懂？
初學 MVVM 得花一點時間，網路上解釋很多，想辦法把 ViewModel 和 LiveData 看懂，然後實作一遍。

#### ViewModel，是什麼
讓處理資料的 Model 和處理畫面的 View 分離，ViewModel 以**生命周期**的方式**儲存**和 UI 相關的數據。
* ViewModel 只在 Activity 存活
* 只會創建一次，可以在一個生命週期裡的 `onCreate` 到 `OnDestroy` 之間保存實例，不會受到屏幕旋轉等 Configuration Change 影響
* 當銷毀時，它會主動調用 `onClered`

看下圖更清楚，ViewModel scope 就是跟著 Activity 的生命週期，所以儲存在裡面的資料，不會因為使用跳到別的 APP 或旋轉螢幕而消失掉，在 Activity 沒有被銷毀前，ViewModel 存放資料會一直存在。

![](https://i.imgur.com/78lwCP7.png)


#### 用法
宣告一個 ViewModel 類，裡面會有 LiveData 變數，會通過 Activity/Fragment 持有 ViewModel 實例


#### LiveData，又是什麼？
它具有**生命週期感知**的功能，LiveData 行為跟 View 無關，是跟著  ViewModel、跟著整個生命週期，而感知功能是指 LiveData 會讓 Activity、Fragment 在活耀狀態時接收到資料的變化。
* 在 ViewModel 中創建，然後可以通過 getter 方法在 Activity/Fragment 中取得
* LiveData 是資料的包裝，包裝對象可以是任何資料型態，包括集合（比如List）
* 當生命週期處於 `onStop` 或者 `onPause` 時，LiveData 不會回調資料更新，直至生命週期為 `onResume` 時，立即回調
* 生命週期處於 `onDestory` 時，觀察者會自動刪除，防止內存洩漏

#### 用法
宣告一個某資料型態的 LiveData，通常在 ViewModel 創建，當 Model 中有東西要儲存，就會放到 ViewModel 裡面的 LiveData

---

### 來實作基本 MVVM 架構
搭配 Retrofit，以 [JSONPlaceholder](https://jsonplaceholder.typicode.com/) 提供的 API，來練習 MVVM 架構。

這次使用的資料格式很簡單，只有三項：

```java
{
  "userId": 1,
  "id": 1,
  "title": "quidem molestiae enim"
}

//baseUrl：https://jsonplaceholder.typicode.com/albums/1
```

首先建立 **Data Model**

```java
data class TestData(
    val id: Int,
    val title: String,
    val userId: Int
)
```

**Api Interface**

```java
interface Api_Interface {
    @GET("albums/1")
    fun getAlbums(): Call<TestData>
}
```

**請求接口**
如果不清楚 Retrofit 操作可以看 [如何接API](../如何接API)

```java
object ApiService {
    val mClient= OkHttpClient.Builder().build()

    val mApiClent: Api_Interface by lazy {
        val mRetrofit= Retrofit.Builder()
            .baseUrl("https://jsonplaceholder.typicode.com")
            .addConverterFactory(GsonConverterFactory.create())
            .client(mClient)
            .build()

        mRetrofit.create(Api_Interface::class.java)
    }
}
```

---

API 基本寫好了，因為資料只有三項，我們在 XML 就放一個 TextView 來顯示資料的 title


要開始來建立 MVVM 架構，先看下圖的流程，首先 View（Activity/Fragment）會先向 ViewModel 請求，ViewModel 接受請求後從 Model 取得資料，也就是**把 Model 要儲存的東西會放到 ViewModel 裡面的 LiveData**（利用 setter 方法塞值給 LiveData）

LiveData 有了值之後，就會通知在各頁面（Activity/Fragment）有訂閱該 LiveData 的觀察者們，進行相對應的 UI 處理，ViewModel 是不會持有任何 UI 實體的。


![](https://i.imgur.com/NLEtOgx.png)

#### Model

稍微對流程有概念後，我們要建立一個 Model 來管理資料來源，這次以 API 來練習，就是執行取得和更新資料的地方，拿 API 回傳的 Response：

寫一個類別來放執行 API 連線後的 Callback，這就是我們的 Model 
```java
class ApiFunction{
    fun requestTestData(viewModel: TestViewModel){
        val call = ApiService.mApiClent.getAlbums()
        call.enqueue(object: Callback<TestData>{
            override fun onFailure(call: Call<TestData>?, t: Throwable?) {

            }
            override fun onResponse(call: Call<TestData>?, response: Response<TestData>?) {
                if (response!!.code() == 200){
                    val responseBody = response.body()
                    
                    //待會解釋！
                    viewModel.setTestData(responseBody!!)
                }
            }
        })
    }
}
```
#### ViewModel

ViewModel，就是要用來儲存 UI 需要的數據。

還記得前面寫的 LiveData 特性嗎？
我們就把 ViewModel 裡面放的數據全部改用 `MutableLiveData` 包裝，`MutableLiveData` 是 LiveData 提供的一個特別子類，可以調用方法 `setValue()` 或 `postValue()`，不僅可變，且線程是安全的。

這兩種方法都可用來修改/更新儲存在 LiveData 中的資料，差別在於執行緒
* LiveData.setValue()  在主執行緒同步調用
* LiveData.postValue() 在背景執行緒同步調用

</br>

寫一個 TestViewModel，繼承 ViewModel

* 宣告一個資料型態為< TestData> 的 `MutableLiveData`</br>
* 函式 requestTestData() 是給頁面 View 請求資料
裡面實際上就是執行剛剛 Model 連線後的 Callback，為什麼要多繞一層呢？
一般可直接把 call API 寫在 ViewModel，目前只有一支 API 看上去並不複雜，但如果考量到實際運作會有 N 個 API 要接，我會傾向把所有接 API 的程式碼寫在一起，而不是分散在各個 ViewModel</br>

```java
class TestViewModel: ViewModel() {
    //定義一個 MutableLiveData 的變數
    private var testData = MutableLiveData< TestData>()

    //給View請求api用
    fun requestTestData(){
        ApiFunction.requestTestData(this)　//從Model取資料的動作
    }

    //讓Model呼叫，用來把資料儲存在LiveData
    fun setTestData(result: TestData){
        testData.postValue = result  //給testData塞值
    }

    //給Observer觀察，會回傳LiveData
    // fun getTestData(): MutableLiveData<TestData> {
    //     return testData
    // }
}
```
* 函式 setTestData() 是給 Model 呼叫來塞值，使用 `postValue()`
同上，因為把 call API 拉出去寫，所以另寫一個給 Model 呼叫塞值的函式</br>
* 最後一個函式可寫可不寫
如果不把 testData 設成 private 的話，就可以從外面呼叫到 LiveData</br>

</br>

所以現在回去看 Model，應該就能理解為什麼這樣寫
```java
override fun onResponse(call: Call<TestData>?, response: Response<TestData>?) {
    if (response!!.code() == 200){
        val responseBody = response.body()

        //因為要塞值給LiveData
        viewModel.setTestData(responseBody!!)
    }
}
```

</br>

#### View

最後的 View ，它到底要做什麼？
View 是負責處理顯示 UI 及與使用者互動，在這裡會用到一個東西叫「**Observer** (觀察者)」

Observer 定義了 `onChange()` 方法，這個方法是控制 LiveData 中資料發生變化時，頁面要做的動作（比如更新畫面），我們在裡面寫「當資料改變時要更新 TextView 顯示」。

而這個更新動作，會通過 `observe()` 方法來連接 Observer 和 LiveData，訂閱 LiveData 中的資料

#### Observer 使用

**MainActivity.kt**

```java
//聲明一個observer
lateinit var testViewModel: ViewModel
lateinit var testObserver: Observer<TestData>
...
    //實例化ViewModel和Observer
    testViewModel = ViewModelProviders.of(this).get(TestViewModel::class.java)
    testObserver = Observer{
        TextView.text = it.title //寫當資料發生變化時，UI要做的動作
    }
    
    //call API
    testViewModel.requestTestData()

    //在需要的地方訂閱ViewModel裡的 testData
    testViewModel.testData.observe(this, testObserver)

```

一旦資料通過 `setValue` 方法更新後，LiveData 就通知所有訂閱它的 Observer（處於 Active 狀態的）
這也是為何會說可以用 ViewModel 來進行 Activity/Fragment 之間的通訊，因為他們共享數據。


### Q&A
> Activity Stop 之後，不會崩潰？

LiveData 把 Activity 生命周期合併分成了 Inactive 與Active 兩種狀態（`onStart` 與 `onResume` 為 Active，其他為 inactive）。處於非活躍狀態的話，是不會收到 Livedata 任何事件的變更。

</br>

> 為什麼使用 ViewModel 去保存數據？

在 activity 銷毀重建時，可以用 Activity 的 `onSaveInstanceState()` 機制保存和恢復數據，但缺點明顯，只適合保存少量可以被序列化、反序列化的資料

</br>

>了解為什麼整個生命周期方式很重要？

App 需要頻繁非同步請求資料，比如請求網路調介面，這些都是相當耗時。又 Activity 被銷毀後介面請求才返回，考慮到記憶體洩漏情況，會給我們增添好多複雜工作。
但現在我們利用 ViewModel 處理資料回傳，可以解決此問題，意思只要繼承我們的 ViewModel 後，可能會出現的 bug，google 都幫我們處理了。

</br>

>LiveData 是怎麼判斷該 Observer 處於 Active 狀態？

通過`observe()` 方法裡的第一個參數 LifecycleOwner，來獲取生命週期，判斷時候是否 DESTROYED 狀態，是的話直接 return，等於綁定了生命週期。


##### 參考資料
1. [LiveData的分析與簡單使用](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/705679/#outline__2)
2. [Android MVVM 架構](https://ithelp.ithome.com.tw/articles/10224442)
