# @dashscope/claude-code-router-helper

为 claude-code-router 提供 DashScope 默认配置的 Node.js 包。

## 安装

```bash
# 1. 安装 claude-code
npm install -g @anthropic-ai/claude-code

# 2. 安装 claude-code-router
npm install -g @musistudio/claude-code-router

# 3. 安装 DashScope 配置包
npm install -g @dashscope/claude-code-router-helper
```

安装后会请运行配置脚本

```bash
ccr-qwen
```

## 配置

默认配置文件目录为：`~/.claude-code-router/`。

- 主配置文件路径：`~/.claude-code-router/config.json`
- 插件目录路径：`~/.claude-code-router/plugins/`

运行 `ccr-qwen` 后会自动生成上述目录和文件。

### API Key 配置

**方式 1: 环境变量（推荐）**

```bash
export DASHSCOPE_API_KEY="your-api-key-here"
```

**方式 2: 手动修改配置文件**
编辑 `~/.claude-code-router/config.json`，替换 `"api_key"` 字段。

## 使用

配置完成后，运行：

```bash
ccr code
```

## 许可证

MIT
