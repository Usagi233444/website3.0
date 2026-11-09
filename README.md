# 甄明昊作品集

此目录是可通过 GitHub 连接 Cloudflare Pages 部署的静态网站文件。

## 上传到 GitHub

新建一个 GitHub 仓库，然后上传本目录中的全部内容。仓库根目录最终应直接包含：

```text
index.html
css/
js/
assets/
README.md
```

不要只上传 `index.html`，否则样式、交互和电商作品图片会缺失。

## Cloudflare Pages 配置

在 Cloudflare 控制台进入 `Workers & Pages`，选择 `Pages`，连接到该 GitHub 仓库。

```text
Framework preset: None
Build command: 留空
Build output directory: /
Root directory: 留空
Production branch: main
```

保存并部署后，Cloudflare 会自动生成 `*.pages.dev` 访问地址。

## 更新网站

修改本地文件后提交并推送到 GitHub 的 `main` 分支，Cloudflare Pages 会自动重新部署。
