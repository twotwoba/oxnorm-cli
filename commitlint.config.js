export default {
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
}
