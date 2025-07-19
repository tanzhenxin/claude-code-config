# @dashscope/claude-code-router-helper

A Node.js package that provides default DashScope configuration for claude-code-router.

## Installation

```bash
# 1. Install claude-code
npm install -g @anthropic-ai/claude-code

# 2. Install claude-code-router
npm install -g @musistudio/claude-code-router

# 3. Install DashScope configuration package
npm install -g @dashscope/claude-code-router-helper
```

After installation, run the configuration script:

```bash
ccr-qwen
```

## Configuration

The default configuration directory is: `~/.claude-code-router/`.

- Main config file: `~/.claude-code-router/config.json`
- Plugins directory: `~/.claude-code-router/plugins/`

Running `ccr-qwen` will automatically generate the above directories and files.

### API Key Configuration

**Method 1: Environment Variable (Recommended)**

```bash
export DASHSCOPE_API_KEY="your-api-key-here"
```

**Method 2: Manual Configuration File Edit**
Edit `~/.claude-code-router/config.json` and replace the `"api_key"` field.

## Usage

After configuration, run:

```bash
ccr code
```

## License

MIT
