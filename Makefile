.PHONY: install build dev lint lint-fix format fmt-check test test-run test-coverage clean preview release-patch release-minor release-major release-custom release-dry version help

# 默认目标
.DEFAULT_GOAL := help

# 变量
NODE := node
NPM := npm
PNPM := pnpm

## install: 安装依赖
install:
	$(PNPM) install

## build: 构建项目
build:
	$(PNPM) build

## dev: 开发模式（监听文件变化）
dev:
	$(PNPM) dev

## lint: 运行 oxlint 检查
lint:
	$(PNPM) lint

## lint-fix: 运行 oxlint 并自动修复
lint-fix:
	$(PNPM) lint:fix

## format: 格式化代码
format:
	$(PNPM) format

## fmt-check: 检查代码格式
fmt-check:
	$(PNPM) fmt:check

## test: 运行测试
test:
	$(PNPM) test

## test-run: 运行测试（单次）
test-run:
	$(PNPM) test:run

## test-coverage: 运行测试并生成覆盖率报告
test-coverage:
	$(PNPM) test:coverage

## clean: 清理构建产物
clean:
	rm -rf dist
	rm -rf coverage
	rm -rf node_modules/.cache

## preview: 预览构建产物
preview:
	$(PNPM) preview

## release-patch: 发布补丁版本 (v1.0.0 -> v1.0.1)
release-patch:
	@echo "Bumping patch version..."
	$(NPM) version patch
	@echo "Pushing tag to trigger release..."
	git push --follow-tags

## release-minor: 发布次版本 (v1.0.0 -> v1.1.0)
release-minor:
	@echo "Bumping minor version..."
	$(NPM) version minor
	@echo "Pushing tag to trigger release..."
	git push --follow-tags

## release-major: 发布主版本 (v1.0.0 -> v2.0.0)
release-major:
	@echo "Bumping major version..."
	$(NPM) version major
	@echo "Pushing tag to trigger release..."
	git push --follow-tags

## release-custom VERSION=x.x.x: 发布指定版本
release-custom:
	@if [ -z "$(VERSION)" ]; then \
		echo "Error: VERSION is required. Usage: make release-custom VERSION=1.2.3"; \
		exit 1; \
	fi
	@echo "Setting version to $(VERSION)..."
	$(NPM) version $(VERSION)
	@echo "Pushing tag to trigger release..."
	git push --follow-tags

## release-dry: 模拟发布（本地预览）
release-dry: build
	$(NPM) publish --dry-run

## version: 查看当前版本
version:
	@echo "oxnorm-cli v$$(node -p "require('./package.json').version")"

## help: 显示帮助信息
help:
	@echo "oxnorm-cli Makefile"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^## ' $(MAKEFILE_LIST) | sed 's/## /  /'
