#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const os = require("os");

class ClaudeCodeRouterConfig {
  constructor() {
    this.homeDir = os.homedir();
    this.configDir = path.join(this.homeDir, ".claude-code-router");
    this.configFile = path.join(this.configDir, "config.json");
    this.pluginsDir = path.join(this.configDir, "plugins");
    this.transformerFile = path.join(
      this.pluginsDir,
      "dashscope-transformer.js"
    );
  }

  async setup() {
    try {
      console.log("🚀 正在配置 claude-code-router...");

      // 检查环境变量
      const hasEnvApiKey = !!process.env.DASHSCOPE_API_KEY;
      if (hasEnvApiKey) {
        console.log(
          "🔑 检测到环境变量 DASHSCOPE_API_KEY，将使用环境变量中的 API Key"
        );
      } else {
        console.log("⚠️  未检测到环境变量 DASHSCOPE_API_KEY，将使用默认配置");
      }

      // 创建配置目录
      await this.createDirectories();

      // 创建配置文件
      await this.createConfigFile();

      // 创建插件文件
      await this.createTransformerFile();

      console.log("✅ claude-code-router 配置完成！");
      console.log("📁 配置文件位置:", this.configDir);
      console.log("");
      console.log("📝 使用说明:");
      console.log("1. 请确保已安装 @anthropic-ai/claude-code");
      console.log("2. 请确保已安装 @musistudio/claude-code-router");

      if (!hasEnvApiKey) {
        console.log("3. ⚠️  请手动配置你的 DashScope API Key:");
        console.log(`   cd ${this.configDir}`);
        console.log(`   open config.json  # macOS`);
        console.log(`   # 或者用你喜欢的编辑器打开 config.json`);
        console.log(`   # 将 "api_key" 字段替换为你的 DashScope API Key`);
      } else {
        console.log("3. ✅ API Key 已从环境变量自动配置");
      }

      console.log("4. 运行 claude-code 开始使用");
    } catch (error) {
      console.error("❌ 配置失败:", error.message);
      process.exit(1);
    }
  }

  async createDirectories() {
    // 创建主配置目录
    await fs.ensureDir(this.configDir);

    // 创建插件目录
    await fs.ensureDir(this.pluginsDir);

    console.log("📁 创建目录:", this.configDir);
  }

  async createConfigFile() {
    // 优先使用环境变量中的 API Key
    const dashscopeApiKey = process.env.DASHSCOPE_API_KEY;

    const configContent = {
      LOG: true,
      OPENAI_API_KEY: "",
      OPENAI_BASE_URL: "",
      OPENAI_MODEL: "",
      transformers: [
        {
          path: path.join(
            this.configDir,
            "plugins",
            "dashscope-transformer.js"
          ),
          options: {
            enable_thinking: false,
            stream: true,
          },
        },
      ],
      Providers: [
        {
          name: "dashscope",
          api_base_url:
            "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
          api_key: dashscopeApiKey,
          models: ["qwen3-235b-a22b"],
          transformer: {
            use: ["dashscope"],
          },
        },
      ],
      Router: {
        default: "dashscope,qwen3-235b-a22b",
        think: "dashscope,qwen3-235b-a22b",
        background: "dashscope,qwen3-235b-a22b",
        longContext: "dashscope,qwen3-235b-a22b",
      },
    };

    await fs.writeJson(this.configFile, configContent, { spaces: 2 });
    console.log("📄 创建配置文件:", this.configFile);
  }

  async createTransformerFile() {
    const transformerContent = `class DashScopeTransformer {
  name = "dashscope";

  constructor(options) {
    this.max_tokens = options.max_tokens || 8192;
    this.enable_thinking = options.enable_thinking || false;
    this.stream = options.stream || true;
  }

  async transformRequestIn(request, provider) {
    request.max_tokens = this.max_tokens;
    request.enable_thinking = this.enable_thinking;
    request.stream = this.stream;
    return request;
  }
}

module.exports = DashScopeTransformer;`;

    await fs.writeFile(this.transformerFile, transformerContent);
    console.log("🔧 创建插件文件:", this.transformerFile);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  const config = new ClaudeCodeRouterConfig();
  config.setup();
}

module.exports = ClaudeCodeRouterConfig;
