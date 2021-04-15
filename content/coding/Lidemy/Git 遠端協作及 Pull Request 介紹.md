---
title: Git 協作及 Pull Request 介紹
type: coding
category: 程式導師計畫
tags: [git, Lidemy]
description: 發 PR 流程及遠端協作關係
date: '2020-06-05'
---

#### 如何將程式碼從本地放上 Github repository
1. 在 Github 上建立一個 repository
![](https://i.imgur.com/Jm3aBpx.png)
2. 建立後系統會提示你該怎麼做，將 code 複製下來去終端機操作
![](https://i.imgur.com/BZSzARM.png)
3. 操作遠端和本地的溝通

```
#1 指定(-u)將 本地 master 推到 origin 的 master
git push -u origin master

#2 推上本地commit
git push origin master 

#3 推上本地新建的分支
git push origin 分支名稱

#4 拉下遠端的 commit
git pull origin master 
```

特別查一下推上本地的新分支，這個指令會把你手邊的 today 分支的內容，推一份到 origin 這個地方， origin 可能是 GitHub、GitLab 或是公司內部的 Git 伺服器，如果找不到這個分支，它會在 origin 這個地方形成一個同名的分支（today），也就是我們要的，將本地分支內容推到遠端形成分支。

特別去查了一下`git push`，原來 push 指令的完整型態是長這樣
```
$ git push origin master:master
```

意思就是「把本地的 master 分支的內容，推一份到 origin 上，並且在 origin 上建立一個 master 分支」，如果把指令調整一下：
```
$ git push origin master:today
```
意思變成「把本地的 master 分支的內容，推一份到 origin 上，並且在 origin 上建立一個 today 分支」


---

### 使用 Pull Request（PR）

#### **為什麼要使用 PR？**

知乎看到一個[舉例](https://www.zhihu.com/question/21682976)，改寫一下，比喻 Pull Request 過程像是我們在大學時教授出作業：
> 1. 以前助教會在課後幫同學補充上課內容和筆記，大家會在助教課抄寫一份筆記（fork）
> 2. 回家延伸內容及寫題目，完成後會讓助教先批改（發 Pull Request 給助教），由他確認內容沒有問題
> 3. 如需修正就再拿回來修正，一直到修改完成，助教才會收齊這些作業（merge）統一交給教授

而運用到軟體開發上，開發者拿到一項 issue 或工作，會在一個專屬他的分支上進行開發，然後完成新功能後需要將它合併到主要分支上，但就像前面說的
* master 分支需要維持穩定

大型專案不可能時常出問題，而且協作者太多也無法讓所有人有權限、都能拿到遠端的資料庫，因為「權限管理」而衍生出 Pull Request 功能。


#### **PR 主要功能**
* 通知：通知相關人員來檢查功能開發
* 討論：針對某一段 code 在底下進行有效討論，而不會發散
* 延伸功能：貢獻開源專案

而有錯誤或需修正的地方，要求的修改 (follow-up commit) 會標示在這頁


#### **PR 流程**
1. 先 Fork 一份原專案到自己的 GitHub 底下，你就有完整的權限，想怎麼改就怎麼改
2. 改完後，先推回（Push）你自己帳號的專案
3. 然後發 Pull Request 通知原作者知道你有做事，請他看一下。如果他認為 OK，會決定把你這些修改合併（Merge）到他的原專案

參考資料：[與其它開發者的互動 - 使用 Pull Request](https://gitbook.tw/chapters/github/pull-request.html)、[什麼是 Pull Request?](https://medium.com/@shoujhengduan/%E4%BB%80%E9%BA%BC%E6%98%AF-pull-request-b476ee3e0217)
