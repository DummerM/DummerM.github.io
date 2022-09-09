(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{596:function(t,s,a){"use strict";a.r(s);var n=a(12),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"本地仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#本地仓库"}},[t._v("#")]),t._v(" 本地仓库")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("git init # 初始化本地git 以下所有操作的前提条件\n\ngit add -A # 添加当前所有变动文件到本地缓存区\ngit commit -m '<commit-word>' # 提交缓存区内容到本地仓库\ngit commit -am '<commit-word>' # 上面两步合并为一步的命令\n\ngit checkout master\ngit checkout -b <feat-name> # 新建feat-name分支并切换到该分支\n\ngit branch -a # 列出所有本地分支和远程分支\ngit branch -D <feat-name> # 删除本地feat-name分支\n\ngit status # 显示当前分支状态\ngit reset --hard # 回滚到最近的commit\ngit config --list # 显示当前的Git配置\n\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br")])]),a("h2",{attrs:{id:"远程仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#远程仓库"}},[t._v("#")]),t._v(" 远程仓库")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("git remote add origin <URL> # 关联远程仓库，以下操作的前提条件\ngit remote -v # 显示远程仓库\ngit branch -vv  # 查看本地分支与远程分支对应关系\n\ngit pull # 拉取远程代码到本地\ngit push -u origin master # 推送本地到远程master分支\ngit push origin :branch-name # 删除远程分支 # 等同于 git push origin --delete [branch-name]\n\ngit merge feat-name # feat-name分支内容合并到当前分支，适合不同分支间commit合并操作\ngit checkout -b devbranch origin/devbranch  # 创建分支并切换分支，同时对应到远程分支\n\ngit pull或者git fetch origin可以拉取所有远程分支\n使用git pull origin devbranch命令可以拉取单远程分支\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br")])]),a("h2",{attrs:{id:"高级"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#高级"}},[t._v("#")]),t._v(" 高级")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("# 变基。\n# 记住，rebase操作永远不在公共分支操作；同时rebase与公共分支名永远不同时出现\n# 场景1:减少同一分支提交记录\n# 交互式合并当前分支最近三次的记录，用于简化提交记录。\n# 注意：不要合并先前提交的东西，也就是已经提交远程分支的纪录。\ngit rebase -i HEAD~3\n\n# 场景2: 把feat-A变得基于feat-B\n# # 把当前A分支的提交commit，变基到A和B分支共同祖先的commit上，然后加上B分支后续的commit。\ngit reabse feat-B\n\n# 子模块\ngit submodule add https://github.com/djyde/ToProgress # 添加子模块\ngit submodule status # 检查子模块状态\ngit submodule update ToProgress # 更新子模块\ngit submodule deinit ToProgress && git rm ToPogress # 删除子模块\n\n# Tag\ngit tag # 查看tag\ngit tag -a <tag-name> -m <comment> # 新建tag\ngit push origin --tags # 推送tag\n    \n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br")])]),a("h2",{attrs:{id:"常用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常用"}},[t._v("#")]),t._v(" 常用")]),t._v(" "),a("h3",{attrs:{id:"部署gh-pages"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#部署gh-pages"}},[t._v("#")]),t._v(" 部署gh-pages")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// 部署gh-pages主页(一直在master分支上执行)\n\n# 1. 把dist分支上传到master分支\nnpm run build && git commit -am 'deploy'\n# 2. 意思是把远程master（注意不是本地master）分支的dist文件夹，\n# 推送到远程的gh-pages分支。\ngit subtree push --prefix dist origin gh-pages\n    \n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br")])]),a("p",[t._v("可以设置deploy命令：")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('"deploy": "npm run build && git commit -am \'deploy\' && git subtree push --prefix dist origin gh-pages",\n    \n')])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[t._v("::tip\n以上是使用原生git命令，实际项目中更推荐"),a("a",{attrs:{href:"https://lq782655835.github.io/blogs/tools/git-command.html",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("gh-pages"),a("OutboundLink")],1),t._v("这样的工具包。\n:::")]),t._v(" "),a("h3",{attrs:{id:"fork仓库同步代码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fork仓库同步代码"}},[t._v("#")]),t._v(" fork仓库同步代码")]),t._v(" "),a("p",[t._v("将源项目代码同步到Fork出来的个人项目上")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("#拉取Fork出来的分支\ngit clone Fork的分支url\n\n#注意：进入项目根目录，执行下面操作\n\n#查看所有远程库(remote repo)的远程url\ngit remote -v\n\n#添加源分支url\ngit remote add upstream 替换成源项目url\n\n#查看所有远程库(remote repo)的远程url\ngit remote -v\n\n#从源分支获取最新的代码\ngit fetch upstream\n\n#切换到主分支\ngit checkout master\n\n#合并本地分支和源分支,本地库和远程的github原仓库同步\ngit merge upstream/master\n\n#push到fork分支,本地的仓库提交到github\ngit push origin master\n    \n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br"),a("span",{staticClass:"line-number"},[t._v("24")]),a("br"),a("span",{staticClass:"line-number"},[t._v("25")]),a("br"),a("span",{staticClass:"line-number"},[t._v("26")]),a("br")])]),a("h3",{attrs:{id:"git-emoji"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-emoji"}},[t._v("#")]),t._v(" git emoji")]),t._v(" "),a("p",[t._v('执行 git commit 时使用 emoji 为本次提交打上一个 "标签", 使得此次 commit 的主要工作得以凸现，也能够使得其在整个提交历史中易于区分与查找。')]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("emoji")]),t._v(" "),a("th",[t._v("emoji 代码")]),t._v(" "),a("th",[t._v("commit 说明")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("🎉 (庆祝)")]),t._v(" "),a("td",[a("code",[t._v(":tada:")])]),t._v(" "),a("td",[t._v("初次提交")])]),t._v(" "),a("tr",[a("td",[t._v("✨ (火花)")]),t._v(" "),a("td",[a("code",[t._v(":sparkles:")])]),t._v(" "),a("td",[t._v("引入新功能")])]),t._v(" "),a("tr",[a("td",[t._v("🔖 (书签)")]),t._v(" "),a("td",[a("code",[t._v(":bookmark:")])]),t._v(" "),a("td",[t._v("发行/版本标签")])]),t._v(" "),a("tr",[a("td",[t._v("🐛 (bug)")]),t._v(" "),a("td",[a("code",[t._v(":bug:")])]),t._v(" "),a("td",[t._v("修复 bug")])]),t._v(" "),a("tr",[a("td",[t._v("🚑 (急救车)")]),t._v(" "),a("td",[a("code",[t._v(":ambulance:")])]),t._v(" "),a("td",[t._v("重要补丁")])]),t._v(" "),a("tr",[a("td",[t._v("🌐 (地球)")]),t._v(" "),a("td",[a("code",[t._v(":globe_with_meridians:")])]),t._v(" "),a("td",[t._v("国际化与本地化")])]),t._v(" "),a("tr",[a("td",[t._v("💄 (口红)")]),t._v(" "),a("td",[a("code",[t._v(":lipstick:")])]),t._v(" "),a("td",[t._v("更新 UI 和样式文件")])]),t._v(" "),a("tr",[a("td",[t._v("🎬 (场记板)")]),t._v(" "),a("td",[a("code",[t._v(":clapper:")])]),t._v(" "),a("td",[t._v("更新演示/示例")])]),t._v(" "),a("tr",[a("td",[t._v("🚨 (警车灯)")]),t._v(" "),a("td",[a("code",[t._v(":rotating_light:")])]),t._v(" "),a("td",[t._v("移除 linter 警告")])]),t._v(" "),a("tr",[a("td",[t._v("🔧 (扳手)")]),t._v(" "),a("td",[a("code",[t._v(":wrench:")])]),t._v(" "),a("td",[t._v("修改配置文件")])]),t._v(" "),a("tr",[a("td",[t._v("➕ (加号)")]),t._v(" "),a("td",[a("code",[t._v(":heavy_plus_sign:")])]),t._v(" "),a("td",[t._v("增加一个依赖")])]),t._v(" "),a("tr",[a("td",[t._v("➖ (减号)")]),t._v(" "),a("td",[a("code",[t._v(":heavy_minus_sign:")])]),t._v(" "),a("td",[t._v("减少一个依赖")])]),t._v(" "),a("tr",[a("td",[t._v("⬆️ (上升箭头)")]),t._v(" "),a("td",[a("code",[t._v(":arrow_up:")])]),t._v(" "),a("td",[t._v("升级依赖")])]),t._v(" "),a("tr",[a("td",[t._v("⬇️ (下降箭头)")]),t._v(" "),a("td",[a("code",[t._v(":arrow_down:")])]),t._v(" "),a("td",[t._v("降级依赖")])]),t._v(" "),a("tr",[a("td",[t._v("⚡️ (闪电)🐎 (赛马)")]),t._v(" "),a("td",[a("code",[t._v(":zap:``:racehorse:")])]),t._v(" "),a("td",[t._v("提升性能")])]),t._v(" "),a("tr",[a("td",[t._v("📈 (上升趋势图)")]),t._v(" "),a("td",[a("code",[t._v(":chart_with_upwards_trend:")])]),t._v(" "),a("td",[t._v("添加分析或跟踪代码")])]),t._v(" "),a("tr",[a("td",[t._v("🚀 (火箭)")]),t._v(" "),a("td",[a("code",[t._v(":rocket:")])]),t._v(" "),a("td",[t._v("部署功能")])]),t._v(" "),a("tr",[a("td",[t._v("✅ (白色复选框)")]),t._v(" "),a("td",[a("code",[t._v(":white_check_mark:")])]),t._v(" "),a("td",[t._v("增加测试")])]),t._v(" "),a("tr",[a("td",[t._v("📝 (备忘录)")]),t._v(" "),a("td",[a("code",[t._v(":memo:")])]),t._v(" "),a("td",[t._v("撰写文档")])]),t._v(" "),a("tr",[a("td",[t._v("🔨 (锤子)")]),t._v(" "),a("td",[a("code",[t._v(":hammer:")])]),t._v(" "),a("td",[t._v("重大重构")])]),t._v(" "),a("tr",[a("td",[t._v("🎨 (调色板)")]),t._v(" "),a("td",[a("code",[t._v(":art:")])]),t._v(" "),a("td",[t._v("改进代码结构/代码格式")])]),t._v(" "),a("tr",[a("td",[t._v("🔥 (火焰)")]),t._v(" "),a("td",[a("code",[t._v(":fire:")])]),t._v(" "),a("td",[t._v("移除代码或文件")])]),t._v(" "),a("tr",[a("td",[t._v("✏️ (铅笔)")]),t._v(" "),a("td",[a("code",[t._v(":pencil2:")])]),t._v(" "),a("td",[t._v("修复 typo")])]),t._v(" "),a("tr",[a("td",[t._v("🚧 (施工)")]),t._v(" "),a("td",[a("code",[t._v(":construction:")])]),t._v(" "),a("td",[t._v("工作进行中")])]),t._v(" "),a("tr",[a("td",[t._v("👷 (工人)")]),t._v(" "),a("td",[a("code",[t._v(":construction_worker:")])]),t._v(" "),a("td",[t._v("添加 CI 构建系统")])]),t._v(" "),a("tr",[a("td",[t._v("💚 (绿心)")]),t._v(" "),a("td",[a("code",[t._v(":green_heart:")])]),t._v(" "),a("td",[t._v("修复 CI 构建问题")])]),t._v(" "),a("tr",[a("td",[t._v("🔒 (锁)")]),t._v(" "),a("td",[a("code",[t._v(":lock:")])]),t._v(" "),a("td",[t._v("修复安全问题")])]),t._v(" "),a("tr",[a("td",[t._v("🐳 (鲸鱼)")]),t._v(" "),a("td",[a("code",[t._v(":whale:")])]),t._v(" "),a("td",[t._v("Docker 相关工作")])]),t._v(" "),a("tr",[a("td",[t._v("🍎 (苹果)")]),t._v(" "),a("td",[a("code",[t._v(":apple:")])]),t._v(" "),a("td",[t._v("修复 macOS 下的问题")])]),t._v(" "),a("tr",[a("td",[t._v("🐧 (企鹅)")]),t._v(" "),a("td",[a("code",[t._v(":penguin:")])]),t._v(" "),a("td",[t._v("修复 Linux 下的问题")])]),t._v(" "),a("tr",[a("td",[t._v("🏁 (旗帜)")]),t._v(" "),a("td",[a("code",[t._v(":checked_flag:")])]),t._v(" "),a("td",[t._v("修复 Windows 下的问题")])])])])])}),[],!1,null,null,null);s.default=e.exports}}]);