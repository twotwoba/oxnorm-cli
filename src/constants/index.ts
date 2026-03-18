export const MIN_NODE_VERSION = "18.18.0";

export const PACKAGE_NAMES = {
    oxfmt: "oxfmt",
    oxlint: "oxlint",
    husky: "husky",
    lintStaged: "lint-staged",
    commitlint: "@commitlint/cli",
    commitlintConfig: "@commitlint/config-conventional",
} as const;

export const LEGACY_CONFIG_PATTERNS = {
    prettier: [
        ".prettierrc",
        ".prettierrc.json",
        ".prettierrc.yml",
        ".prettierrc.yaml",
        ".prettierrc.toml",
        ".prettierrc.js",
        ".prettierrc.cjs",
        ".prettierignore",
        "prettier.config.js",
        "prettier.config.cjs",
    ],
    eslint: [
        ".eslintrc",
        ".eslintrc.json",
        ".eslintrc.yml",
        ".eslintrc.yaml",
        ".eslintrc.js",
        ".eslintrc.cjs",
        ".eslintignore",
        "eslint.config.js",
        "eslint.config.mjs",
        "eslint.config.cjs",
        "eslint.config.ts",
    ],
    stylelint: [
        ".stylelintrc",
        ".stylelintrc.json",
        ".stylelintrc.yml",
        ".stylelintrc.yaml",
        ".stylelintrc.js",
        ".stylelintrc.cjs",
        ".stylelintignore",
        "stylelint.config.js",
        "stylelint.config.cjs",
        "stylelint.config.mjs",
    ],
} as const;

export const VSCODE_SETTINGS = {
    "oxc.fmt.configPath": ".oxfmtrc.json",
    "editor.defaultFormatter": "oxc.oxc-vscode",
    "editor.formatOnSave": true,
} as const;

export const ZED_SETTINGS = {
    tab_size: 4,
    format_on_save: "on",
    formatter: "language_server",
    languages: {
        TypeScript: {
            formatter: {
                language_server: {
                    name: "oxfmt",
                },
            },
        },
        JavaScript: {
            formatter: {
                language_server: {
                    name: "oxfmt",
                },
            },
        },
        TSX: {
            formatter: {
                language_server: {
                    name: "oxfmt",
                },
            },
        },
        "Vue.js": {
            formatter: {
                language_server: {
                    name: "oxfmt",
                },
            },
        },
        JSON: {
            formatter: {
                language_server: {
                    name: "oxfmt",
                },
            },
        },
        JSONC: {
            formatter: {
                language_server: {
                    name: "oxfmt",
                },
            },
        },
    },
} as const;

export const COMMITLINT_CONFIG = `export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'docs',
                'style',
                'refactor',
                'perf',
                'test',
                'build',
                'ci',
                'chore',
                'revert',
                'release'
            ]
        ],
        'type-empty': [2, 'never'],
        'type-case': [2, 'always', 'lower-case'],
        'subject-empty': [2, 'never'],
        'subject-case': [0, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'body-leading-blank': [1, 'always'],
        'footer-leading-blank': [1, 'always'],
        'header-max-length': [2, 'always', 72]
    },
    prompt: {
        messages: {
            type: '请选择提交类型：',
            scope: '请输入影响范围（可选）：',
            subject: '请输入简短描述（必填）：',
            body: '请输入详细描述（可选）：',
            footer: '请输入关闭的 issue（可选，格式：Closes #123）：',
            confirmCommit: '确认提交以上信息？'
        },
        types: [
            { value: 'feat', name: 'feat:     新功能' },
            { value: 'fix', name: 'fix:      修复 bug' },
            { value: 'docs', name: 'docs:     文档修改' },
            { value: 'style', name: 'style:    代码格式' },
            { value: 'refactor', name: 'refactor: 代码重构' },
            { value: 'perf', name: 'perf:     性能优化' },
            { value: 'test', name: 'test:     测试相关' },
            { value: 'build', name: 'build:    构建/打包' },
            { value: 'ci', name: 'ci:       CI/CD 配置' },
            { value: 'chore', name: 'chore:    杂项修改' },
            { value: 'revert', name: 'revert:   回滚提交' },
            { value: 'release', name: 'release:  发布版本' }
        ],
        skipQuestions: ['scope']
    }
};
`;

export const OXLINTRC_CONFIG = {
    $schema: "./node_modules/oxlint/configuration_schema.json",
    plugins: ["typescript", "vue"],
    categories: {},
    rules: {
        "constructor-super": "warn",
        "for-direction": "warn",
        "no-async-promise-executor": "warn",
        "no-caller": "warn",
        "no-class-assign": "warn",
        "no-compare-neg-zero": "warn",
        "no-cond-assign": "warn",
        "no-const-assign": "warn",
        "no-constant-binary-expression": "warn",
        "no-constant-condition": "warn",
        "no-control-regex": "warn",
        "no-debugger": "warn",
        "no-delete-var": "warn",
        "no-dupe-class-members": "warn",
        "no-dupe-else-if": "warn",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty-character-class": "warn",
        "no-empty-pattern": "warn",
        "no-empty-static-block": "warn",
        "no-eval": "warn",
        "no-ex-assign": "warn",
        "no-extra-boolean-cast": "warn",
        "no-func-assign": "warn",
        "no-global-assign": "warn",
        "no-import-assign": "warn",
        "no-invalid-regexp": "warn",
        "no-irregular-whitespace": "warn",
        "no-loss-of-precision": "warn",
        "no-new-native-nonconstructor": "warn",
        "no-nonoctal-decimal-escape": "warn",
        "no-obj-calls": "warn",
        "no-self-assign": "warn",
        "no-setter-return": "warn",
        "no-shadow-restricted-names": "warn",
        "no-sparse-arrays": "warn",
        "no-this-before-super": "warn",
        "no-unassigned-vars": "warn",
        "no-undef": "off",
        "no-unsafe-finally": "warn",
        "no-unsafe-negation": "warn",
        "no-unsafe-optional-chaining": "warn",
        "no-unused-expressions": [
            "error",
            {
                allowShortCircuit: true,
                allowTernary: true,
            },
        ],
        "no-unused-labels": "warn",
        "no-unused-private-class-members": "warn",
        "no-unused-vars": [
            "error",
            {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
            },
        ],
        "no-useless-backreference": "warn",
        "no-useless-catch": "warn",
        "no-useless-escape": "warn",
        "no-useless-rename": "warn",
        "no-with": "warn",
        "require-yield": "warn",
        "use-isnan": "warn",
        "valid-typeof": "warn",
        "typescript/await-thenable": "warn",
        "typescript/no-array-delete": "warn",
        "typescript/no-base-to-string": "warn",
        "typescript/no-duplicate-enum-values": "warn",
        "typescript/no-duplicate-type-constituents": "warn",
        "typescript/no-explicit-any": "off",
        "typescript/no-extra-non-null-assertion": "warn",
        "typescript/no-floating-promises": "warn",
        "typescript/no-for-in-array": "error",
        "typescript/no-implied-eval": "warn",
        "typescript/no-meaningless-void-operator": "warn",
        "typescript/no-misused-new": "warn",
        "typescript/no-misused-spread": "warn",
        "typescript/no-non-null-asserted-optional-chain": "warn",
        "typescript/no-redundant-type-constituents": "warn",
        "typescript/no-this-alias": "warn",
        "typescript/no-unnecessary-parameter-property-assignment": "warn",
        "typescript/no-unsafe-declaration-merging": "warn",
        "typescript/no-unsafe-unary-minus": "warn",
        "typescript/no-useless-empty-export": "warn",
        "typescript/no-wrapper-object-types": "warn",
        "typescript/prefer-as-const": "warn",
        "typescript/require-array-sort-compare": "warn",
        "typescript/restrict-template-expressions": "warn",
        "typescript/triple-slash-reference": "warn",
        "typescript/unbound-method": "warn",
        "vue/no-arrow-functions-in-watch": "warn",
        "vue/no-deprecated-destroyed-lifecycle": "warn",
        "vue/no-export-in-script-setup": "warn",
        "vue/no-lifecycle-after-await": "warn",
        "vue/no-this-in-before-route-enter": "warn",
        "vue/prefer-import-from-vue": "warn",
        "vue/valid-define-emits": "warn",
        "vue/valid-define-props": "warn",
        "vue/multi-word-component-names": "off",
    },
    settings: {
        jsdoc: {
            ignorePrivate: false,
            ignoreInternal: false,
            ignoreReplacesDocs: true,
            overrideReplacesDocs: true,
            augmentsExtendsReplacesDocs: false,
            implementsReplacesDocs: false,
            exemptDestructuredRootsFromChecks: false,
            tagNamePreference: {},
        },
        vitest: {
            typecheck: false,
        },
    },
    env: {
        builtin: true,
    },
    globals: {},
    ignorePatterns: [],
} as const;

export const LINT_STAGED_CONFIG = {
    "*.{js,jsx,ts,tsx,mjs,cjs,vue}": "npm run lint",
    "*": "oxfmt --no-error-on-unmatched-pattern",
} as const;

export const HUSKY_PRE_COMMIT = `npx lint-staged`;
export const HUSKY_COMMIT_MSG = `npx --no -- commitlint --edit $1`;
