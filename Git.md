1\. 注册账号，注册成功之后去自己的邮箱里面点一下激活的链接方可使用（不能注册或者收不到激活的邮件用自己的手机热点或者切换其他邮箱再次尝试）

2\. github 平台新建仓库，拿到 SSH 协议的地址，执行下面命令

```bash
git clone git@github.com:ifer-itcast/test.git
```

直接从远端克隆到本地的仓库，就是一个仓库啦（意味着不用执行 `git init`），并且此仓库已经和远端仓库建立了连接

3\. 假如是自己电脑新建了一个文件夹

```bash
git init

git remote add origin git@github.com:ifer-itcast/test.git # 当前文件夹和远端仓库建立连接

如果说你之前已经建立过连接了，执行上面的代码会失败的
git remote -v # 查看远程连接
git remote rm origin # 删除之前建立的远程仓库连接
git remote add origin git@github.com:ifer-itcast/test.git # 再来一次
```

4\. 提交代码

```bash
git add .
git commit -m 提交信息

git push -u origin master # 执行这一步的时候会出问题???
```

5\. 怎么解决不能提交代码到远端的问题呢？

```bash
git config --global user.name ifer-itcast # 设置全局的用户名
git config --global user.email yangkangkang@itcast.cn # 设置全局的邮箱

ssh-keygen -t rsa # 生成秘钥，一路敲回车就行了

如果说出现了 `Overwrite`，直接输入 y，继续一路回车

打开 C:\Users\86185\.ssh\id_rsa.pub 并复制里面的文本，粘贴到 github 上面 https://github.com/settings/keys
```

6\. 就可以正常提交啦

```bash
先通过 git branch 命令查看当前处于哪个分支，默认就是 master，所以下面的命令也是提交到 master

git add .
git commit -m 提交描述
git push -u origin master
```

假如后续当前分支（master）又修改了内容，你只需要执行下面命令

```bash
git add .
git commit -m 提交信息
git push
```

7\. 关于分支

```bash
# git branch 01_素材准备
# git checkout 01_素材准备

git checkout -b 01_素材准备 # 创建并切换分支到 01_素材准备，相当于上面两行代码
```

假如在 01_素材准备 分支修改了代码，你只需要执行下面命令

```bash
git add .

git commit -m 提交描述

git push -u origin 01_素材准备

假如在 01_素材准备分支 又修改了代码，你只需要执行下面命令

git add .
git commit -m 提交描述
git push
```

```bash
<!-- 删除GitHub分支 -->
git push origin --delete 远程分支名称
```

```bash
# 改分支名
git branch -m 旧的分支名 新的分支名
```

```bash
当前处于 A 分支，想合并 B 分支

git merge B 分支
git branch -d 分支名
git branch -D 分支名
```