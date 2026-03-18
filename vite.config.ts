import { defineConfig } from "vite";
import { resolve } from "pathe";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "oxnorm",
            fileName: "index",
            formats: ["es"],
        },
        outDir: "dist",
        sourcemap: true,
        minify: false,
        rollupOptions: {
            // 只 external Node.js 内置模块
            external: [
                "node:fs",
                "node:path",
                "node:process",
                "node:child_process",
                "node:util",
                "node:os",
                "node:stream",
                "node:events",
                "node:url",
            ],
            output: {
                banner: "#!/usr/bin/env node\n",
            },
        },
        commonjsOptions: {
            include: [/node_modules/],
            transformMixedEsModules: true,
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
});
