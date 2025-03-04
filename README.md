# 祝福页面项目规划

## 项目概述

这是一个简约精美的Web页面，根据访问用户的IP所在地区和当前时间，生成个性化的祝福语并配上精美图片。界面设计遵循苹果和Instagram平台的设计审美，干净简约。

## 技术框架推荐

考虑到初学者友好性，推荐以下技术框架：

1. **前端框架**：
   - **HTML/CSS/JavaScript**：作为基础
   - **Tailwind CSS**：轻量级CSS框架，便于创建符合苹果风格的简约设计
   - **小型JavaScript库**：如Alpine.js（轻量级响应式框架）

2. **后端/服务**：
   - **Vercel或Netlify**：提供免费托管和serverless函数
   - **IP地理位置API**：如ipinfo.io（有免费额度）
   - **Unsplash API**：提供高质量图片

这个技术栈足够简单，适合初学者，同时能够满足项目需求。

## 界面设计建议

### 苹果/Instagram风格的设计元素
- 极简主义设计，大量留白
- 柔和的中性色调（白色、浅灰色背景）
- 精致的阴影效果
- 圆角元素
- 清晰简约的排版
- 高质量全屏图片作为背景

### 布局建议
- 居中显示的祝福语卡片
- 磨砂玻璃效果（Frosted Glass）背景面板
- 精心选择的优雅字体
- 微妙的动画过渡效果

## 功能扩展建议

除了基本需求外，可以考虑添加以下功能来丰富用户体验：

1. **个性化选项**：
   - 允许用户手动切换主题/风格
   - 提供多种字体选择

2. **互动元素**：
   - 点击或滑动更换背景图片
   - 简单的分享功能（分享到社交媒体）
   - 保存当前祝福卡片为图片

3. **细节考量**：
   - 根据季节变化背景和祝福语
   - 特殊节日专属设计
   - 根据天气API调整氛围（晴天/雨天不同风格）

4. **可访问性**：
   - 支持深色/浅色模式
   - 响应式设计，适应所有设备尺寸

## 项目结构

```
祝福页面/
├── index.html         # 主页面HTML文件
├── styles.css         # 自定义样式
├── script.js          # 页面逻辑和功能实现
├── config.js          # 本地开发配置文件，存储API密钥和其他配置
├── config.example.js  # 配置文件示例，用于指导用户创建自己的config.js
├── env-config.js      # 环境配置管理文件，处理不同环境下的配置获取
└── README.md          # 项目说明文档
```

## 使用说明

### 准备工作

1. API密钥配置：
   - 项目使用了ipinfo.io和Unsplash API
   - 本地开发：
     - 复制`config.example.js`为`config.js`
     - 在`config.js`中填入您的API密钥
   - 部署环境：
     - 在Vercel或Netlify中设置环境变量（见下方"部署到Vercel或Netlify"部分）

2. 配置选项：
   - `config.js`文件中还包含其他配置选项，如：
     - 默认语言
     - 自动刷新间隔
     - 图片方向
     - 备用图片使用开关

### 本地运行

1. 下载项目文件到本地文件夹
2. 确保您已创建并配置好`config.js`文件
3. 使用现代浏览器直接打开`index.html`文件
4. 也可以使用本地开发服务器，如：
   ```
   npx serve
   ```
   或
   ```
   python -m http.server
   ```

### 部署到Vercel或Netlify

1. 将代码推送到GitHub仓库
   - 确保`.gitignore`文件包含`config.js`，防止API密钥被提交
   - `config.example.js`应该包含在提交中作为配置示例

2. 在Vercel或Netlify中设置环境变量：
   - Vercel：
     1. 登录Vercel，选择您的项目
     2. 进入"Settings" > "Environment Variables"
     3. 添加以下环境变量：
        - `IPINFO_TOKEN`：您的ipinfo.io API密钥
        - `UNSPLASH_API_KEY`：您的Unsplash API密钥
   
   - Netlify：
     1. 登录Netlify，选择您的项目
     2. 进入"Site settings" > "Build & deploy" > "Environment"
     3. 添加相同的环境变量

3. 部署项目：
   - 按照平台指引完成部署
   - 环境变量会在构建过程中被注入

### 环境配置工作原理

本项目使用`env-config.js`文件实现灵活的环境配置：
- 在本地开发环境中，配置从`config.js`加载
- 在Vercel或Netlify上，配置从环境变量加载
- 无需修改任何代码即可在不同环境间切换

这种实现方式确保：
1. 本地开发方便直观
2. API密钥不会被提交到版本控制
3. 生产环境使用安全的环境变量

### 安全提示

本项目已实现以下安全实践：
- 使用`.gitignore`排除含有API密钥的`config.js`
- 在生产环境使用环境变量
- 前端代码不会直接暴露API密钥

## 自定义内容

- 可以在`script.js`中修改祝福语模板
- 在`styles.css`中调整颜色主题和动画效果
- 在`index.html`中修改页面结构和文本内容
- 在`config.js`或环境变量中调整配置参数

## 项目更新日志

- **2023-11-01** - 创建项目规划文档
- **2023-11-02** - 实现基础项目代码
- **2023-11-03** - 添加配置文件，分离API密钥
- **2023-11-04** - 实现环境配置系统，支持Vercel部署 