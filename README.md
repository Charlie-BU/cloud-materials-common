# @cloud-materials/common 组件库

组件库已作为 GitHub Release 资产发布。消费项目直接安装已发布的 tarball；无需 clone 本仓库、引用源码目录、提交离线 `node_modules`，或配置 Vite alias / TypeScript paths。

## 安装

在消费项目根目录执行：

```bash
pnpm add https://github.com/Charlie-BU/cloud-materials-common/releases/download/release/cloud-materials-common-1.20.1-cdi.0.tgz
```

该命令会将包及其完整性信息写入 `package.json` 和 `pnpm-lock.yaml`。请提交这两个文件，CI 使用 `pnpm install --frozen-lockfile` 安装依赖。

消费项目需要自行安装与应用一致版本的 `react`、`react-dom`，以满足组件库的 peer dependency。

## 使用

安装后无需额外配置：

```tsx
import { Button } from "@cloud-materials/common";
import { IconHouseDashboard } from "@cloud-materials/common/ve-o-iconbox";
import "@cloud-materials/common/dist/css/index.css";
```

### 微前端（Module Federation）

同一页面由宿主与远程模块共同使用该组件库时，宿主和远程模块必须解析到同一版本，并共享以下单例：

```ts
shared: {
  react: { singleton: true },
  "react-dom": { singleton: true },
  "@cloud-materials/common": { singleton: true },
}
```

宿主提供公共组件库；远程模块配置 `"@cloud-materials/common": { singleton: true, import: false }`，避免再次打包该库。普通单体应用不需要这项 Federation 配置。

## Icon Gallery

仓库包含独立的图标预览站，展示所有可通过
`@cloud-materials/common/ve-o-iconbox` 消费的图标。推送到 `main` 后，GitHub
Actions 会自动部署到 GitHub Pages：

<https://charlie-bu.github.io/cloud-materials-common/>

本地预览无需安装依赖：

```bash
npm --prefix icon-gallery run dev
```

### AI 图标搜索（火山方舟）

浏览器不能安全保存 `ARK_API_KEY`，因此图标站通过一个受控的边缘代理调用方舟，
密钥只保存于代理环境变量中。代理实现位于
[`icon-gallery/ark-proxy`](./icon-gallery/ark-proxy)，使用
`https://ark.cn-beijing.volces.com/api/v3/chat/completions`。

部署代理后，在 GitHub 仓库 Settings → Secrets and variables → Actions → Variables 中
创建以下**非敏感**变量；Pages 工作流会在构建时注入它：

```bash
AI_ICON_SEARCH_ENDPOINT=https://<your-worker>.workers.dev
```

在 Worker 环境中设置敏感变量（切勿写入 `.env` 或 Git）：

```bash
wrangler secret put ARK_API_KEY
```

代理会把用户的自然语言需求和当前图标名称目录交给模型；模型只能返回目录中的
1 至 12 个名称，代理与前端都会再次校验名称后才展示。
