# Icon Gallery

`@cloud-materials/common` 的独立图标预览站，展示所有可从
`@cloud-materials/common/ve-o-iconbox` 消费的图标。

## 本地运行

在仓库根目录执行：

```bash
npm --prefix icon-gallery ci
npm --prefix icon-gallery run dev
```

打开终端输出的本地地址。生产构建命令为：

```bash
npm --prefix icon-gallery run build
```

`node_modules/` 与 `dist/` 均为本地生成文件，不提交到 Git。

### 本地启用 AI 搜索

GitHub Actions 会在部署时注入 AI 代理地址；本地开发需单独创建
`icon-gallery/.env.local`（该文件已被 Git 忽略）：

```bash
VITE_AI_ICON_SEARCH_ENDPOINT=https://cloud-materials-icon-search.15947513567charlie.workers.dev
```

保存后重启 `npm --prefix icon-gallery run dev`。也可以只对单次启动注入：

```bash
VITE_AI_ICON_SEARCH_ENDPOINT=https://cloud-materials-icon-search.15947513567charlie.workers.dev \
  npm --prefix icon-gallery run dev
```

这里填写的是公开的 Worker 地址，绝不能填写 `ARK_API_KEY`。

## AI 语义搜索

搜索框会立刻进行名称关键词匹配；停止输入 650ms 后，页面会通过代理调用火山方舟，
将 AI 推荐图标追加到关键词结果之后，并按图标名称去重。

浏览器不保存 `ARK_API_KEY`。代理代码位于 [`ark-proxy`](./ark-proxy)，负责将用户的
自然语言需求和当前图标目录发送到火山方舟。模型只能推荐目录中已有的 1 至 12 个图标；
代理与前端会再次校验名称，丢弃不存在的结果。

## 部署 Ark 代理（Cloudflare Workers）

### 1. 准备 Wrangler

安装或使用 `npx` 运行 Wrangler，并登录到拥有目标 Worker 权限的 Cloudflare 账户：

```bash
cd icon-gallery/ark-proxy
npx wrangler login
```

首次部署会根据 [`wrangler.toml`](./ark-proxy/wrangler.toml) 创建名为
`cloud-materials-icon-search` 的 Worker。默认模型为
`deepseek-v4-flash-ga-260731`；如需改用已开通的方舟模型，可修改 `ARK_MODEL` 后重新部署。

### 2. 配置方舟密钥

在火山方舟控制台创建 API Key，并以 Cloudflare Worker Secret 的形式保存：

```bash
npx wrangler secret put ARK_API_KEY
```

按提示粘贴 Key。密钥不会显示、不会写入 `wrangler.toml`、`.env` 或 Git。可只检查密钥
名称而不暴露内容：

```bash
npx wrangler secret list
```

若需轮换密钥，重复执行 `wrangler secret put ARK_API_KEY` 即可覆盖旧值。

### 3. 部署与更新

```bash
npx wrangler deploy
```

命令输出中的 `https://<worker>.<account>.workers.dev` 即为 AI 代理地址。当前已部署实例为：

```text
https://cloud-materials-icon-search.15947513567charlie.workers.dev
```

后续每次修改 `ark-proxy/src/index.js` 或 `wrangler.toml` 后，都需要再次执行
`npx wrangler deploy`。

### 4. CORS 与用量防护

代理当前只为 `https://charlie-bu.github.io` 以及任意 `localhost` / `127.0.0.1` 的 HTTP
开发端口返回允许跨域访问的响应。若使用自定义域名或不同 GitHub 账号，请先修改
[`ark-proxy/src/index.js`](./ark-proxy/src/index.js) 中的 `ALLOWED_ORIGINS` 并重新部署。

浏览器 CORS 不是访问控制；Worker URL 仍可能被直接请求。上线前应在 Cloudflare 为该
Worker 配置限流/WAF 规则，以限制单 IP 的请求频率并控制方舟费用。

## 配置 GitHub Pages 使用 AI 代理

部署代理后，在 GitHub 仓库 Settings → Secrets and variables → Actions → **Variables** 中创建：

```text
AI_ICON_SEARCH_ENDPOINT=https://cloud-materials-icon-search.15947513567charlie.workers.dev
```

该变量会由 Pages 工作流在构建时写入前端，因此它必须是公开的 URL，不能填写 API Key。
`ARK_API_KEY` 只能保存在 Cloudflare Worker Secret 中。

变量保存后，重新运行工作流或推送一次 `main`，前端的自动 AI 搜索才会调用该 Worker。

## 部署到 GitHub Pages

`.github/workflows/deploy-icon-gallery.yml` 会在 `main` 分支推送后执行：

1. 在 Linux Runner 上执行 `npm --prefix icon-gallery ci`，安装锁定的构建依赖；
2. 注入 `AI_ICON_SEARCH_ENDPOINT` 并构建静态站点；
3. 上传 `icon-gallery/dist` 并部署到 GitHub Pages。

首次启用时，进入仓库 Settings → Pages → Build and deployment，将 **Source** 设为
**GitHub Actions**。随后提交并推送：

```bash
git add .github/workflows/deploy-icon-gallery.yml icon-gallery README.md .gitignore
git commit -m "feat: add icon gallery with AI search"
git push origin main
```

在仓库的 Actions 页面查看 `Deploy icon gallery to GitHub Pages`；成功后在 job 的
`Deploy to GitHub Pages` 步骤或 Pages 设置页获取最终站点 URL。此仓库的默认地址为：

```text
https://charlie-bu.github.io/cloud-materials-common/
```

若 Actions 失败并提示原生绑定缺失，请确认工作流包含 `npm --prefix icon-gallery ci`；不要在
Linux Runner 上直接使用仓库根目录中为 macOS 提供的离线 `node_modules` 来构建页面。
