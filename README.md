# 灵犀 AIGC 平台 MVP 原型

这是可继续编辑的 MVP 简版原型，仅保留以下两个视频功能：

- 视频智能替换
- 去字幕 / 水印

图像工具、素材库、文案生成分镜、一键口播、对口型、全能参考和首尾帧均不在本版本中。

## 项目内容

- `src/App.jsx`：页面结构、功能流程和交互状态
- `src/styles.css`：页面布局、颜色和组件样式
- `public/assets/`：原型实际使用的图片素材
- `package.json`：依赖、Node.js 版本和运行命令
- `vercel.json`：Vercel 构建与发布配置

## 本地运行

需要 Node.js 20 或更高版本：

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 上传 GitHub

1. 解压交付包。
2. 在 GitHub 新建空仓库，默认分支使用 `main`。
3. 将解压目录内的全部文件上传到仓库根目录。不要上传压缩包本身。
4. 确认 `package.json`、`src/`、`public/` 和 `vercel.json` 位于仓库根目录。

如果使用 Git 命令：

```bash
git init
git add .
git commit -m "Add Lingxi AIGC MVP prototype"
git branch -M main
git remote add origin https://github.com/你的账号/你的仓库.git
git push -u origin main
```

## 部署到 Vercel

1. 在 Vercel 选择 **Add New → Project**。
2. 导入刚才上传的 GitHub 仓库。
3. Framework Preset 选择 **Vite**。项目已提供 `vercel.json`，通常无需修改构建设置。
4. 点击 Deploy。Vercel 会执行 `npm install` 和 `npm run build`，并发布 `dist/client`。

## 交接说明

- `node_modules/` 未打包，可通过 `npm install` 恢复。
- 源码修改应在 `src/` 和 `public/` 中进行；`dist/` 会在构建时自动生成。
- 当前为前端交互原型，上传、生成、任务和保存均使用模拟状态。
