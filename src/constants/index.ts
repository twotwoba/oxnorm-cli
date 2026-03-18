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
    $schema:
        "https://raw.githubusercontent.com/oxc-project/oxc/main/npm/oxlint/configuration_schema.json",
    categories: {
        correctness: "warn",
        suspicious: "warn",
        perf: "warn",
        complexity: "warn",
        style: "warn",
        nursery: "off",
    },
    rules: {},
} as const;

export const LINT_STAGED_CONFIG = {
    "*.{js,jsx,ts,tsx,mjs,cjs,vue}": "npm run lint",
    "*": "oxfmt --no-error-on-unmatched-pattern",
} as const;

export const HUSKY_PRE_COMMIT = `npx lint-staged`;
export const HUSKY_COMMIT_MSG = `npx --no -- commitlint --edit $1`;
