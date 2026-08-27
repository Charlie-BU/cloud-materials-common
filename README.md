# @cloud-materials/common 组件库

> 离线消费说明：此仓库已附带 `@cloud-materials/common@1.20.1` 的运行时依赖树，供外网前端项目直接消费；无需、也不要在本仓库执行 `pnpm install`，否则会尝试解析原始依赖中的字节内部包。

## 外网项目使用

在消费项目根目录执行安装脚本：

```bash
bash /path/to/cloud-materials-common/setup-consumer.sh .
```

脚本会完成以下操作：

1. 通过 SSH 将本仓库 clone 到消费项目根目录的 `cloud-materials-common/`；
2. 校验组件库和离线 pnpm 依赖树是否完整；
3. 将 `/cloud-materials-common/` 写入消费项目的 `.gitignore`。

也可以手动完成同样的操作：

```bash
git clone git@github.com:Charlie-BU/cloud-materials-common.git ./cloud-materials-common
printf '\n/cloud-materials-common/\n' >> .gitignore
```

### 配置 Vite

在消费项目的 `vite.config.ts` 中配置 alias。`new URL(..., import.meta.url)`
以 Vite 配置文件所在的项目根目录为基准，因此会指向刚刚 clone 的目录：

```ts
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

const cloudMaterialsPath = fileURLToPath(
    new URL("./cloud-materials-common/@cloud-materials/common", import.meta.url)
);

export default defineConfig({
    resolve: {
        alias: {
            "@cloud-materials/common": cloudMaterialsPath,
        },
        // 避免组件库自带的 React 16 与消费项目的 React 重复加载。
        dedupe: ["react", "react-dom"],
    },
});
```

该 alias 会同时覆盖以下导入形式：

```ts
import { Button } from "@cloud-materials/common";
import { IconHouseDashboard } from "@cloud-materials/common/ve-o-iconbox";
import "@cloud-materials/common/dist/css/index.css";
```

### 配置 TypeScript

Vite alias 只负责运行时和打包解析。为了让 `tsc` 找到类型声明，还需要在
`tsconfig.app.json`（或项目实际使用的 tsconfig）中增加：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@cloud-materials/common": [
        "cloud-materials-common/@cloud-materials/common"
      ],
      "@cloud-materials/common/*": [
        "cloud-materials-common/@cloud-materials/common/*"
      ]
    }
  }
}
```

仓库根目录 `node_modules/.pnpm` 和其中的符号链接是离线运行时依赖，必须一并保留。它们使 Vite 可以按标准 Node 解析规则找到组件库依赖，因此不会访问字节内网 registry。

组件库目录固定在消费项目根目录，不需要配置任何额外环境变量。
