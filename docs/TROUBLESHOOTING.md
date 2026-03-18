# 构建问题解决记录

## 问题1: string-width 正则表达式 v 标志不支持

### 错误信息
```
SyntaxError: Invalid regular expression flags
const zeroWidthClusterRegex = /^(?:\p{Default_Ignorable_Code_Point}|\p{Control}|\p{Format}|\p{Mark}|\p{Surrogate})+$/v;
```

### 原因
`string-width@8.2.0` 使用了正则表达式的 `v` 标志，该标志需要 Node.js 20+ 才支持。

### 解决方案
在 `package.json` 中添加 pnpm overrides：
```json
{
  "pnpm": {
    "overrides": {
      "string-width": "^7.2.0"
    }
  }
}
```

---

## 问题2: Vite 8 构建 Node.js CLI 失败

### 错误信息
```
[MISSING_EXPORT] Error: "default" is not exported by "execa"
```

### 原因
Vite 8 (rolldown) 对 Node.js CLI 构建的支持有问题，无法正确处理 CommonJS 和 ESM 混合模块。

### 解决方案
改用 `tsup` 构建工具，它专门为 Node.js 库和 CLI 设计：
```bash
pnpm add -D tsup
```

创建 `tsup.config.ts`：
```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node18",
  clean: true,
  sourcemap: true,
  minify: false,
  dts: false,
  skipNodeModulesBundle: true,
  banner: {
    js: "#!/usr/bin/env node",
  },
  esbuildOptions(options) {
    options.platform = "node";
  },
});
```

---

## 问题3: 动态 require 不支持

### 错误信息
```
Error: Dynamic require of "events" is not supported
```

### 原因
`commander` 等包是 CommonJS 模块，tsup 打包成 ESM 时无法正确处理动态 `require`。

### 解决方案
在 tsup 配置中添加 `skipNodeModulesBundle: true`，让 tsup 不打包 node_modules，而是直接引用它们。

---

## 问题4: fs-extra 命名导出不可用

### 错误信息
```
SyntaxError: Named export 'existsSync' not found. The requested module 'fs-extra' is a CommonJS module
```

### 原因
`fs-extra` 是 CommonJS 模块，在 ESM 模式下无法使用命名导入（named exports）。

### 错误写法
```typescript
import { existsSync, readJsonSync } from "fs-extra";
```

### 正确写法
```typescript
import fs from "fs-extra";
const { existsSync, readJsonSync } = fs;
```

### 解决方案
修改所有使用 `fs-extra` 的文件，将命名导入改为默认导入后解构。

---

## 问题5: execa 导入方式

### 错误信息
```
[MISSING_EXPORT] Error: "default" is not exported by "execa"
```

### 原因
`execa@9` 使用命名导出而非默认导出。

### 错误写法
```typescript
import execa from "execa";
```

### 正确写法
```typescript
import { execa } from "execa";
```

---

## 总结

构建 Node.js ESM CLI 的最佳实践：

1. **使用 tsup 而非 Vite**：tsup 对 Node.js CLI 构建支持更好
2. **skipNodeModulesBundle: true**：避免 CJS/ESM 兼容问题
3. **CommonJS 模块使用默认导入**：`import fs from "fs-extra"; const { xxx } = fs;`
4. **检查包的导出方式**：新版本包可能使用命名导出而非默认导出
5. **注意 Node.js 版本兼容性**：某些包的新特性需要更高版本的 Node.js
