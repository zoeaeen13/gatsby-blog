---
title: Command Line 及 git 指令
type: coding
category: 程式導師計畫
tags: [git, Lidemy]
description: 用 CLI 對電腦下指令及如何進行版本控制
date: '2020-06-05'
---

### Command Line Interface

對電腦下指令，CLI 是一種操縱電腦的方法，不像 GUI 圖形使用者介面可點擊，是用文字形式
* 有些功能只能用 Command Line 操作程式，且比較快
* Git、執行 JS
* 連結 server 會用到（因為沒有畫面）

| 指令 | 名稱 | 功能 |
| -------- | -------- | -------- |
| pwd | Print Working Directory | 顯示目前目錄的絕對路徑 |
| ls | List | 列出檔案清單 |
| cd | Change Directory | 切換資料夾 |
| cd . . |  | `cd ..`切換到上一層，`cd ~` home目錄，`cd/`根目錄 |
| clear | Clear | 清除畫面 |
| touch |  | 建立檔案/最後修改時間 |
| clear | Clear | 清除畫面 |
| rm | Remove | 刪除檔案 |
| rmdir | Remove Directory | 刪除資料夾|
| mv | Move | 移動或改名|
| grep | | 抓關鍵字（$grep keyword file）|
| echo |  | 產生字串|
| cat | Catenate | 顯示檔案內容|
| less |  | 分頁顯示檔案內容|


#### 💡 **mv**
1. 移動
可以使用相對路徑（同一資料夾底下）或絕對路徑（/）
```
$mv happy.txt today    //把 happy.txt 移到 today 資料夾
$mv happy.txt ..       //把 happy.txt 移到上一層
```
2. 改名
可以想像成是 happy.txt 內容，移動到 sad 檔案下，原來的自動消失
```
$mv happy.txt sad     //把 happy.txt 改名成 sad 檔案
```


#### 💡 **Vim 操作**
* 參考 [超簡明 Vim 操作介紹](https://gitbook.tw/chapters/command-line/vim-introduction.html)
* `i` -> 進入輸入模式
* `esc` -> 一般模式，無法輸入文字，能複製、貼上、存檔或離開
* `:wq` 存檔離開
* 常用來**編輯 Commit 訊息**

![](https://i.imgur.com/s3Kool3.png)



### 組合指令
* pipe：將前面印出來的東西，交給 grep hi 這個指令（|）
```
cat file.txt | grep hi
//假設 cat file.txt 印出了 123hihi，輸入"123hihi", grep hi
```

* Redirect：重新導向（>），把 file.md 的內容輸入到另一個檔案
```
echo file.md > print.txt
```

---
## Git 
用來做**版本控制**。一般人做版本控制都是以「檔案」為單位，例如複製貼上，**不直觀**，因為寫程式時，需要知道程式碼誰寫的、什麼時候改的、為什麼要改這行
* 希望每一個版本被保存起來，檔案多了要管理
* 在軟體開發常用
* 透過 commit message 可以看到以前的歷史紀錄、和上一版差異
* 分支功能 branch -> 協作、新功能
* 主分支 master -> 要保持穩定

| Windows | 指令 | 操作  | 備註說明 |
| -------- | -------- | -------- | -------- |
| git init | 初始化目錄 |  | 開始版控，建立 `.git` 目錄，所有版控記錄都會在裡面 |
| git status | 查詢狀態 |  | 查詢確認當前檔案的狀況 |
| git add | 加入版控追蹤 | git add +`檔名` | 追蹤檔案加入至暫存區，從工作目錄加入至 staging |
| [git commit](https://git-scm.com/docs/git-commit) | 創建一新版本 | git commit -m "訊息" | 新版本及 commit message |
| git log | 檢視 Commit 紀錄 |  | 可加 `--oneline` 簡短一行查看 |
| git diff | 查看差異 |  | 查看本次與上一回的差異 |
| git checkout | 回到某次 Commit 紀錄 | git checkout + `分支亂碼` | git checkout master 回到最新狀態 |
| .gitignore | 忽略 |  |  |

> 一些 Git 問題

#### Q: 開始進行版控？
* `git init` 會在資料夾建立一個 .git 目錄，整個版控的精華就在這裡面
* 空的目錄是無法被提交的，因為 Git 在計算、產生物件的時候，是根據「檔案變化的內容」去做計算的，內容不可以為空
```
$ git  init
Initialized empty Git repository
```

---
#### Q: 版控的流程，暫存區和儲存區？
用來查詢現在這個目錄的「狀態」
```
$ git status
```
新增一個檔案會是 Untracked 狀態，一旦下面這個指令
```
$ git add X.html
```
開始追蹤此檔案，變成 new file 狀態。表示這個檔案已經被安置到暫存區（Staging Area），暫存區也稱之索引（index）
```
//萬用字元*，把所有附檔名是 html 的檔案全部都加到暫存區
$ git add *.html

//加入全部
$ git add --all 或 git add .
```
---
#### Q: 到底 git add --all 和 git add . 指令差別在？
差別在於，使用 Git 版本不同以及**執行指令的目錄位置**，後者只將當前目錄的所有檔案和子目錄內的檔案變更加入，前者是無論目前處於哪一層目錄，專案裡所有的異動都會被加至暫存區

---
#### Q: 如果在 git add 之後又修改了那個檔案？
編輯內容並沒有再次被加到暫存區，得再次使用 git add 指令加至暫存區

---
#### Q: 存放到儲存區（Repository）？
要完成 commit 指令才算是完成整個流程，而 commit 都只會處理暫存區（Staging Area）裡的內容
* 加參數 `-m` 訊息，則不用進入 VIM 就能 commit
不小心跳入 VIM 視窗的話，參考[簡易操作Vim](https://gitbook.tw/chapters/command-line/vim-introduction.html)
* 預設一定要輸入訊息才能 commit，如不想輸入訊息可加上 `--allow-empty-message` 參數(通常不會這樣做)
* `git add -am "message"` 合併 `git add` 和 `git commit` 兩個指令

---
#### Q: 如何刪除檔案？
在 Git 裡，不管是刪除檔案或是變更檔名，對 Git 來說都是一種「修改」
1. 系統指令 `rm`，刪除檔案 X.html
```
$ rm X.html
```
查看會發現該檔案狀態為「deleted」，還需要把這次修改再加到暫存區
```
$ git status
On branch master
Changes not staged for commit:

	deleted:    X.html
```
2. 使用 `git rm` 指令，讓 Git 幫你完成。
完成後直接在暫存區了，不需要再自己 add 一次
```
$ git rm X.html
rm 'X.html'
```

3. 加上 `–cached` 參數
隱藏忽略的意思，把檔案從 Git 目錄移除，不再追蹤(非刪除)，因為系統的 `rm` 或是 `git rm` 指令，都會真的把這個檔案從工作目錄裡刪掉，如果只是想解除版控，可以加上這個參數
```
$ git rm X.html --cached
rm 'X.html'
```
X.html 的狀態從原本已經在目錄裡的 tracked 變成 Untracked 了

---
#### Q: 什麼時候應該要 Commit？
* 完成一個「任務」的時候
* 下班的時候，可能還沒完全搞定任務，但至少先 Commit 今天進度，除了備份之外，也讓公司知道你今天有在努力工作(?)
* 你想要 Commit 的時候就可以
* 盡量細切 commit，把每個小功能做一次 commit
---
#### Q: 更改 Commit 紀錄，使用 `--amend` 參數
修改近期一次的 Commit Message
改訊息就是修改了一次的歷史，**盡量不要在已經 Push 出去之後再修改**，可能會造成其它協作者困擾
```
$ git commit --amend -m "NEW Message"
```
把單一檔案追加到最後一次的 Commit，`--no-edit` 是指「我不要編輯 Commit 訊息」，所以就不會跳出 Vim 編輯器的視窗
```
$ git commit --amend --no-edit
```

---
#### Q: 用 git log 查詢 commit
查詢某些人的 Commit，例如協作者名為「Meng」
```
$ git log --oneline --author="Meng22"
```
搜尋包含某文字的 commit：查詢 Commit 訊息有"hahaha"
```
$ git log --oneline --grep="hahaha"
```

---
#### Q: 如何邊緣某些檔案
```
touch .gitignore   建立 .gitignore 檔案
vim .gitignore     編輯內容，哪些檔案不要放進版本控制
---

# 忽略名為text的檔案(檔名)
text.txt
*.log*  忽略
*.swp   忽略暫存檔

# 忽略 config 目錄下的 database.yml 檔案
config/database.yml

# 忽略所有 db 目錄下附檔名是 .sqlite3 的檔案
/db/*.sqlite3
```

---
#### Q: 拿到一個新專案的步驟
1. 加入版本控制 git init
2. 建立 .gitignore 排除需要忽略的檔案，.gitignore 檔案也需要加入版控（其他協作者才知道）
3. 用 `git add .` 加入檔案，因為是新增的檔案，不能直接用`git comiit -am` （他們還不在 staging 區）
4. 但如果是已經加入過、修改的檔案，可直接用上面那個合併指令
---
### 認識 branch
在增加新功能、修正 Bug，或是想試一些新做法時，都可以另外做一個分支來進行，待做完確認沒問題之後再合併回來，不會影響正在運行的功能

```
$ git branch　　      //印出目前這個專案有哪些分支
  dog          　　   //* 表示在哪個分支上
* master


$ git branch -v      //參數-v，意思是--no-abbrev
  dog    f95a13f init
* master f95a13f init
```

**新增分支 cat**
```
git branch cat    //新增分支cat
```
**分支改名**
完全不會影響檔案或目錄，使用的是 `-m `參數，把分支名稱由 cat 改成 tiger（master 想改名也可以改喔）
```
git branch -m cat tiger
```
**刪除分支**
使用 `-d` 參數來刪除
```
git branch -d tiger
Deleted branch tiger (was 08a6af4).
```
**合併分支**
切回主要分支(master)，輸入你要合併的分支名稱。所謂的 merge 並非真的指合併分支，合併是**合併「該分支所指向的那些 Commit」**
```
git merge tiger
```

---
#### Q: Merge 合併時發生衝突（Conflict）
```
git merge bear
CONFLICT (add/add): Merge conflict in .gitignore
Auto-merging .gitignore
Automatic merge failed; fix conflicts and then commit the result.
```
這時候用 `git status` 查看，會看到 Unmerged paths
```
You have unmerged paths.

Unmerged paths:
  (use "git add <file>..." to mark resolution)
  ...
```

這時候需要人工手動修改（可使用 vim 介面），Git 已經把有衝突的段落標記出來
* 上半部是 HEAD（>>>>>）也就是目前所在的主分支
* 中間用分隔線（======）區別
* 下面是被合併分支的內容（<<<<<）

修改完之後把檔案加到暫存區，再 Commit
```
Changes not staged for commit:
    modified:   .gitignore
```

---
#### Q: 我剛剛 Commit 了，但我想要拿掉！
```
$ git reset
```

很多人誤會是重新設定，但 Reset 指令比較像是「前往」或「變成」
```
git reset HEAD~2  //我要變成兩個 Commit 之前的狀態
```
很難理解嗎？
假設 HEAD 和 MASTER 目前都是指向 `e12d8ef` 這個 Commit 上
```
git reset e12d8ef^  
git reset master^
git reset HEAD^     

//^代表前次，這些都是同個意思，表示回到前一次Commit

git reset e12d8ef^^  //往前兩次
git reset e12d8ef~5  //往前五次
```
Reset 指令可以搭配參數使用，有三種模式：
* `--mixed` 
預設，把暫存區的檔案丟掉，但不會動到工作目錄的檔案
* `--soft`
工作目錄跟暫存區的檔案都不會被丟掉，所以看起來就只有 HEAD 的移動
* `--hard`
工作目錄和暫存區的檔案都會丟掉。