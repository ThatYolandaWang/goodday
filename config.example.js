/**
 * 配置文件示例 - 存储API密钥和其他配置信息
 * 使用说明：
 * 1. 复制此文件并重命名为config.js
 * 2. 填入您的API密钥和其他配置选项
 * 3. 本地开发时将使用此文件中的配置
 */

// 设置为全局对象，以便在env-config.js中访问
window.CONFIG = {
    // API密钥 - 请替换为您自己的密钥
    IPINFO_TOKEN: '您的IPINFO_TOKEN',
    UNSPLASH_API_KEY: '您的UNSPLASH_API_KEY',
    
    // 其他配置选项
    DEFAULT_LANGUAGE: 'zh-CN',
    AUTO_REFRESH_INTERVAL: 60000, // 时间刷新间隔（毫秒）
    IMAGE_ORIENTATION: 'landscape',
    USE_BACKUP_IMAGE: true // 在主要图片源失败时使用备用源
}; 