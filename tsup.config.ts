import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'],
    target: 'node18',
    clean: true,
    sourcemap: true,
    minify: false,
    dts: false,
    // 关键：跳过 node_modules 打包，	skipNodeModulesBundle: true,
    banner: {
        js: '#!/usr/bin/env node'
    },
    esbuildOptions(options) {
        options.platform = 'node'
    }
})
