# 江坤的多页面网站：更新、独立建库与相互跳转

这份说明适用于账号 `Jiangkun-Xiong`。主站继续使用现有的 `Jiangkun-Xiong.github.io` 仓库。

## 1. 先分清三个位置

| 位置 | 功能 | 应该放什么 |
| --- | --- | --- |
| `Jiangkun-Xiong/Jiangkun-Xiong` | GitHub 个人资料页的 README | 一段简介、精选项目和个人网站链接 |
| `Jiangkun-Xiong/Jiangkun-Xiong.github.io` | 个人网站 | 首页、项目介绍、笔记、背景、图片和样式 |
| 以后创建的 `stroke-autoregulation`、`rnaseq-learning` 等 | 独立项目仓库 | 该项目的 README、代码、环境说明和可分享的成果 |

主站里的每篇项目介绍可以有自己的网址，同时链接到不同的代码仓库。无需为一篇介绍另建一个仓库。

## 2. 这一版有哪些页面

以下路径均相对于主站仓库根目录；网址前缀是 `https://jiangkun-xiong.github.io/`。

| 文件 | 用途 | 对应网址路径 |
| --- | --- | --- |
| `index.html` | 首页 | `/` |
| `research/index.html` | 研究兴趣与已有科研训练 | `/research/` |
| `projects/index.html` | 项目目录，可搜索和分类 | `/projects/` |
| `projects/stroke.html` | 卒中研究 | `/projects/stroke.html` |
| `projects/epihunting.html` | Epihunting | `/projects/epihunting.html` |
| `projects/nanchuan.html` | 南川心理健康项目 | `/projects/nanchuan.html` |
| `projects/hotwind.html` | 热風青年俱乐部 | `/projects/hotwind.html` |
| `learning/index.html` | 计算方法学习计划 | `/learning/` |
| `notes/index.html` | 笔记目录 | `/notes/` |
| `notes/clinical-question-to-model.html` | 科研分析流程笔记 | `/notes/clinical-question-to-model.html` |
| `notes/rna-seq-plan.html` | RNA-seq 练习任务说明，状态为计划开展 | `/notes/rna-seq-plan.html` |
| `about/index.html` | 教育背景、经历和可配置的联系方式 | `/about/` |
| `404.html` | 找不到页面时的提示 | 自动使用 |

所有页面共用 `assets/css/style.css`、`assets/js/main.js` 和 `assets/js/site-config.js`。中文/英文选择会在支持本地存储的浏览器中跨页面保留。

## 3. 如何上传这套代码

如果新版已经发布，直接在线查看即可；以下步骤可用于你以后自己更新，或在其他位置重新部署。

1. 解压代码包，打开里面的 `website` 文件夹。
2. 打开主站仓库：<https://github.com/Jiangkun-Xiong/Jiangkun-Xiong.github.io>。
3. 点击 **Add file → Upload files**。
4. 上传 `website` **里面的内容**。仓库根目录应直接出现 `index.html`、`projects`、`notes`、`assets` 等；不要把整个 `website` 文件夹作为唯一一层上传。
5. 提交修改。若当前界面让你选择新分支，创建分支后发起 Pull Request，检查 Files changed，再合并到 `main`。单人维护且仓库允许时，也可以直接提交到 `main`。
6. 现有主站保持 **Settings → Pages → Deploy from a branch → main → /(root)**。
7. 到 **Actions** 查看最新 Pages 任务；成功后查看网站。通常几分钟内更新，官方说明可能需要约十分钟。

`.nojekyll` 用于直接发布静态文件。网页上传时如果没有选中这个文件，本网站的普通 HTML/CSS/JS 结构仍可工作；不要为它重新创建网站。

网页中点击某个文件再点铅笔图标即可修改，完成后提交。文件夹无需提前创建：在 **Add file → Create new file** 的文件名中输入 `projects/new-project.html`，GitHub 就会建立对应路径。

## 4. 如何独立创建一个项目仓库

建议先整理卒中项目，仓库名使用 `stroke-autoregulation`。这个仓库可以先真实展示研究背景、个人贡献和已公开成果；可公开的代码整理好后再加入。RNA-seq 等练习在实际开始时再建仓库并记录进展。

1. 登录 GitHub，点击右上角 **＋ → New repository**，或打开 <https://github.com/new>。
2. **Owner** 选择 `Jiangkun-Xiong`。
3. **Repository name** 填写 `stroke-autoregulation`。
4. **Description** 可填写：`Research overview and shareable materials on directional sensitivity of cerebral autoregulation in stroke.`
5. 想让导师直接查看就选择 **Public**。仅公开你有权分享的材料，患者原始数据不要上传。
6. 有两种初始化方式，选择其中一种即可：
   - 想先建立空白介绍：勾选 **Add README**，创建后自己修改。
   - 想使用本包模板：不勾选 README，创建后点击 **uploading an existing file**，上传 `starter-repos/stroke-autoregulation` 文件夹**里面的内容**。
7. 点击 **Create repository**，随后上传或编辑文件并提交。
8. 仓库创建成功后，访问地址将是 `https://github.com/Jiangkun-Xiong/stroke-autoregulation`。

代码包中的 `starter-repos` 是供你复制的模板。**把它放在主站仓库里，不会自动生成新的 GitHub 仓库**；需要按上面的步骤单独创建。

## 5. 从个人网站跳到独立项目仓库

打开主站仓库中的 `assets/js/site-config.js`。找到 `stroke`，在建库后填写：

```js
stroke: {
  repository: 'https://github.com/Jiangkun-Xiong/stroke-autoregulation',
  website: ''
},
```

提交后，主站的卒中详情页会出现“查看项目仓库”按钮。`website` 留空时，独立网站按钮隐藏。

其他项目用同样的方法填写对应字段：`epihunting`、`nanchuan`、`hotwind`。RNA-seq 练习填写 `rnaseq`，对应按钮会出现在学习路线与 RNA-seq 任务说明页。每个字段都应该填写你已经创建并确认能访问的完整地址。

配置文件只控制仓库、联系方式等链接；修改页面正文时编辑对应 HTML 文件。HTML 中 `data-en` 是英文，`data-zh` 是中文，标签里面的文字是默认英文内容，修改时保持三处一致。

## 6. 从独立仓库跳回个人网站

在新仓库的 `README.md` 中加入：

```md
[个人主页](https://jiangkun-xiong.github.io/)

[阅读本项目介绍](https://jiangkun-xiong.github.io/projects/stroke.html)
```

README 使用 Markdown 链接。访问者在 GitHub 查看代码时，就能回到你的主站。模板已经包含这两个链接。

## 7. 如果还想给独立仓库增加自己的展示网站

只有在需要单独的项目网站时才启用这一步。**普通代码仓库不需要开启 Pages，也能从主站跳转过去。**

模板的 `docs/index.html` 是一个独立的静态项目展示页，可以脱离主站运行：

1. 确认新仓库根目录下面有 `docs` 文件夹，里面有 `index.html`。
2. 进入这个**新仓库**的 **Settings → Pages**。
3. **Source** 选择 **Deploy from a branch**。
4. **Branch** 选择 **main**，右侧文件夹选择 **/docs**，点击 **Save**。
5. 查看 **Actions**，等待 Pages 部署成功。
6. 项目网站网址为 `https://jiangkun-xiong.github.io/stroke-autoregulation/`。这个网址成立的前提是仓库确实叫 `stroke-autoregulation`，且 Pages 已成功启用。
7. 确认项目网站能访问，再把主站配置改成：

```js
stroke: {
  repository: 'https://github.com/Jiangkun-Xiong/stroke-autoregulation',
  website: 'https://jiangkun-xiong.github.io/stroke-autoregulation/'
},
```

这样，主站卒中页面会有“查看项目仓库”和“打开独立项目网站”两个不同按钮。独立项目页中的“返回个人主页”已经写好。

`rnaseq-learning` 模板的操作相同，Pages 地址把最后一段换成 `/rnaseq-learning/`。它明确标注为学习计划，真实完成分析后再更新状态。

## 8. 三种跳转写法

| 跳转目标 | 从哪里写 | 示例 |
| --- | --- | --- |
| 主站内部的另一页 | HTML | `<a href="projects/stroke.html">卒中研究</a>`，此写法适用于主站首页 |
| 从项目详情页返回主站首页 | HTML | `<a href="../index.html">返回首页</a>`，此写法适用于 `projects/stroke.html` |
| 跳到另一个代码仓库 | HTML | `<a href="https://github.com/Jiangkun-Xiong/stroke-autoregulation">项目仓库</a>` |
| 跳到另一个项目网站 | HTML | `<a href="https://jiangkun-xiong.github.io/stroke-autoregulation/">项目网站</a>` |
| 从 README 跳回主站 | Markdown | `[个人主页](https://jiangkun-xiong.github.io/)` |

同一个网站里的页面使用相对路径；不同仓库、不同网站之间使用完整 URL。`github.com` 打开代码仓库，`github.io` 打开展示网站。

独立项目网站的资源路径要包含项目目录。例如它引用自己 `docs/assets/style.css` 时，写 `assets/style.css`；从项目页写 `/assets/style.css` 会去主站根目录寻找资源。模板把样式写在 HTML 中，因此没有这项资源配置工作。

## 9. 添加简历、作品集、照片和邮箱

先把 PDF 或图片上传到主站仓库的对应目录，再修改 `assets/js/site-config.js`：

```js
email: '你愿意公开的邮箱',
cvFile: 'assets/files/jiangkun-xiong-cv.pdf',
portfolioFile: 'assets/files/portfolio.pdf',
portraitFile: 'assets/images/portrait.jpg',
```

不用的项目保留空字符串 `''`，页面会隐藏对应按钮。不要仅填写一个不存在的文件路径。

## 10. 常见问题

- **首页出现了，但子页面 404：** 检查文件是否在正确目录、已提交到 `main`，以及文件名大小写是否与链接一致。
- **网页没有样式：** 检查是否上传了整个 `assets` 文件夹，是否误把代码多套了一层 `website` 目录。
- **创建了新仓库，主站按钮仍没出现：** 需要手动填写主站的 `assets/js/site-config.js`，并等待主站重新部署。
- **仓库能打开，项目网站打不开：** 检查是否在那个项目仓库启用了 Pages，以及发布源是否选了实际存放 `index.html` 的 `/docs`。
- **提交后暂时没变化：** 先看 Actions 中最新一次部署是否完成，再刷新网页；必要时使用 Ctrl + F5。
- **只上传一个 ZIP 没有网页：** GitHub Pages 不会自动解压 ZIP。必须先解压并上传其中的文件和目录。
- **以后新增页面：** 可以复制现有同目录的项目页作为起点，修改标题、正文与目录链接；保留共用 CSS/JS 引用。

## 官方参考

- 新建仓库：<https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository>
- 上传文件：<https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository>
- 配置 Pages 发布来源：<https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>
- Pages 入口、额外页面与部署时间：<https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site>
