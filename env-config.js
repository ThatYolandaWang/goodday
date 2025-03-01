/**
 * 环境配置管理文件
 * 为不同的环境提供配置：
 * - 本地开发：从config.js加载配置
 * - Vercel部署：从环境变量加载配置
 */

// 创建环境配置对象
const ENV_CONFIG = {
    // 默认值
    IPINFO_TOKEN: null,
    UNSPLASH_API_KEY: null,
    DEFAULT_LANGUAGE: 'zh-CN',
    AUTO_REFRESH_INTERVAL: 60000,
    IMAGE_ORIENTATION: 'landscape',
    USE_BACKUP_IMAGE: true
};

// 加载本地配置（如果在浏览器环境中可用）
if (typeof window !== 'undefined' && window.CONFIG) {
    console.log('从本地配置加载设置');
    
    // 合并本地配置
    Object.keys(window.CONFIG).forEach(key => {
        if (window.CONFIG[key] !== undefined) {
            ENV_CONFIG[key] = window.CONFIG[key];
        }
    });
}

// 加载环境变量（如果在Vercel环境中）
if (typeof process !== 'undefined' && process.env) {
    console.log('检测到服务器环境，尝试加载环境变量');
    
    // 尝试从环境变量加载API密钥
    if (process.env.IPINFO_TOKEN) {
        ENV_CONFIG.IPINFO_TOKEN = process.env.IPINFO_TOKEN;
    }
    
    if (process.env.UNSPLASH_API_KEY) {
        ENV_CONFIG.UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
    }
}

// 验证配置并发出警告
if (!ENV_CONFIG.IPINFO_TOKEN) {
    console.warn('警告: IPINFO_TOKEN未配置。位置功能可能不可用。');
}

if (!ENV_CONFIG.UNSPLASH_API_KEY) {
    console.warn('警告: UNSPLASH_API_KEY未配置。背景图片功能可能不可用。');
}

// 确保配置对象在全局范围内可用
if (typeof window !== 'undefined') {
    window.ENV_CONFIG = ENV_CONFIG;
} else if (typeof global !== 'undefined') {
    global.ENV_CONFIG = ENV_CONFIG;
} 